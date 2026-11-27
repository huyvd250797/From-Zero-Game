import {SIZE,roadNetwork,roadsX,roadsZ,urbanPlan,roadPoint,walkable} from './world.js';
import {distance,planRoute,segmentClear,routeLength} from './navigation.js';
const coordKey=p=>`${p.x.toFixed(4)}:${p.z.toFixed(4)}`;
const at=(r,k)=>roadPoint(r,k);
let graph;
export function roadGraph(){if(graph)return graph;const nodes=[],keys=new Map(),edges=[];
 const node=p=>{const key=coordKey(p);if(keys.has(key))return keys.get(key);const id=nodes.length;nodes.push({id,...p,links:[]});keys.set(key,id);return id;};
 const connect=(a,b,oneWay=false)=>{if(a===b)return;const p=nodes[a],q=nodes[b];if(!segmentClear(p,q))throw Error(`Invalid urban graph edge ${coordKey(p)} -> ${coordKey(q)}`);const length=distance(p,q);p.links.push({to:b,length});if(!oneWay)q.links.push({to:a,length});edges.push({a,b,length,oneWay});};
 const strips=[];
 for(const r of roadNetwork){const other=r.axis==='x'?roadsZ:roadsX;let start=1;const ranges=[];
  for(const o of other){if(!urbanPlan.active(r,o.center)||!urbanPlan.active(o,r.center))continue;const ring=urbanPlan.ringAt(r.axis==='x'?r.center:o.center,r.axis==='x'?o.center:r.center);if(ring){ranges.push([start,o.center-ring.radius]);start=o.center+ring.radius;}else{ranges.push([start,o.center]);start=o.center;}}ranges.push([start,SIZE-1]);
  for(const [a,b] of ranges.flatMap(([a,b])=>urbanPlan.ranges(r,a,b))){if(b-a>1e-5)strips.push({a:at(r,a),b:at(r,b),ts:[0,1]});}
 }
 for(const d of urbanPlan.diagonals)for(let i=1;i<d.points.length;i++){const a=d.points[i-1],b=d.points[i];if(a.z<1||b.z>SIZE-1)continue;strips.push({a,b,ts:[0,1]});}
 // Split every at-grade crossing into a shared graph node. No orphaned diagonal crossing.
 for(let i=0;i<strips.length;i++){const p=strips[i],u={x:p.b.x-p.a.x,z:p.b.z-p.a.z};for(let j=i+1;j<strips.length;j++){const q=strips[j];if(Math.max(p.a.x,p.b.x)+1e-5<Math.min(q.a.x,q.b.x)||Math.max(q.a.x,q.b.x)+1e-5<Math.min(p.a.x,p.b.x)||Math.max(p.a.z,p.b.z)+1e-5<Math.min(q.a.z,q.b.z)||Math.max(q.a.z,q.b.z)+1e-5<Math.min(p.a.z,p.b.z))continue;const v={x:q.b.x-q.a.x,z:q.b.z-q.a.z},w={x:q.a.x-p.a.x,z:q.a.z-p.a.z},den=u.x*v.z-u.z*v.x;if(Math.abs(den)<1e-9)continue;const t=(w.x*v.z-w.z*v.x)/den,k=(w.x*u.z-w.z*u.x)/den;if(t>=-1e-6&&t<=1+1e-6&&k>=-1e-6&&k<=1+1e-6){p.ts.push(Math.max(0,Math.min(1,t)));q.ts.push(Math.max(0,Math.min(1,k)));}}}
 const edgeKeys=new Set();for(const s of strips){const ts=[...s.ts].sort((a,b)=>a-b).filter((t,i,a)=>!i||t-a[i-1]>1e-7);const at=t=>({x:s.a.x+(s.b.x-s.a.x)*t,z:s.a.z+(s.b.z-s.a.z)*t});for(let i=1;i<ts.length;i++){const a=ts[i-1],b=ts[i],n=Math.max(1,Math.ceil(distance(at(a),at(b))/2.5));let prev=node(at(a));for(let j=1;j<=n;j++){const next=node(at(a+(b-a)*j/n)),key=[prev,next].sort((a,b)=>a-b).join(':');if(!edgeKeys.has(key)){connect(prev,next);edgeKeys.add(key);}prev=next;}}}
 for(const r of urbanPlan.roundabouts){const ring=[];for(let i=0;i<24;i++){const a=-i*Math.PI/12;ring.push(node({x:r.x+r.radius*Math.cos(a),z:r.z+r.radius*Math.sin(a)}));}for(let i=0;i<24;i++)connect(ring[i],ring[(i+1)%24],true);}
 graph={nodes,edges};return graph;}
class Heap{constructor(){this.a=[]}push(e){let i=this.a.length;this.a.push(e);while(i){const p=(i-1)>>1;if(this.a[p].cost<=e.cost)break;this.a[i]=this.a[p];i=p}this.a[i]=e;}pop(){const a=this.a,f=a[0],v=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let j=i*2+1;if(j+1<a.length&&a[j+1].cost<a[j].cost)j++;if(a[j].cost>=v.cost)break;a[i]=a[j];i=j}a[i]=v;}return f;}}
const cache=new Map();
function access(p,nodes){const ranked=nodes.map(n=>({n,d:distance(n,p)})).sort((a,b)=>a.d-b.d).slice(0,20);const out=[];for(const {n,d} of ranked){if(d>18&&out.length)break;if(segmentClear(p,n)){out.push({id:n.id,path:d>.001?[{x:n.x,z:n.z}]:[],length:d});if(out.length>=5)break;}}
 if(!out.length)for(const {n} of ranked.slice(0,4)){const r=planRoute(p,n);if(r)out.push({id:n.id,path:r.path.map(({x,z})=>({x,z})),length:routeLength(p,r.path)});}
 return out;}
// Preserve every curved waypoint and ring arc; only remove collinear intermediate samples.
function simplify(start,path){const out=[];for(const p of path){if(distance(out.at(-1)||start,p)<1e-6)continue;while(out.length){const a=out.length>1?out.at(-2):start,b=out.at(-1);const cross=(b.x-a.x)*(p.z-b.z)-(b.z-a.z)*(p.x-b.x),dot=(b.x-a.x)*(p.x-b.x)+(b.z-a.z)*(p.z-b.z);if(Math.abs(cross)>1e-6||dot<0||!segmentClear(a,p))break;out.pop();}out.push({x:p.x,z:p.z});}return out;}
export function urbanRoadRoute(start,end){if(!walkable(start.x,start.z)||!walkable(end.x,end.z))return planRoute(start,end);if(distance(start,end)<10&&segmentClear(start,end))return {...planRoute(start,end),length:distance(start,end)};const k=`${start.x},${start.z}:${end.x},${end.z}`;if(cache.has(k)){const r=cache.get(k);return {target:{...r.target},path:r.path.map(p=>({...p})),length:r.length,urban:true};}
 const {nodes}=roadGraph(),from=access(start,nodes),to=access(end,nodes);if(!from.length||!to.length)return planRoute(start,end);
 const costs=new Float64Array(nodes.length).fill(Infinity),prev=new Int32Array(nodes.length).fill(-1),source=new Int32Array(nodes.length).fill(-1),heap=new Heap(),dest=new Map(to.map(a=>[a.id,a]));
 for(const [i,a] of from.entries()){costs[a.id]=a.length;source[a.id]=i;heap.push({id:a.id,cost:a.length});}
 let best=Infinity,finish=-1;
 while(heap.a.length){const c=heap.pop();if(c.cost!==costs[c.id])continue;if(c.cost>=best)break;const t=dest.get(c.id);if(t&&c.cost+t.length<best){best=c.cost+t.length;finish=c.id;}for(const e of nodes[c.id].links){const n=c.cost+e.length;if(n<costs[e.to]){costs[e.to]=n;prev[e.to]=c.id;source[e.to]=source[c.id];heap.push({id:e.to,cost:n});}}}
 if(finish<0)return planRoute(start,end);const ids=[];for(let i=finish;i>=0;i=prev[i])ids.push(i);ids.reverse();const a=from[source[finish]],b=dest.get(finish),tail=[end,...b.path].reverse().slice(1);const path=simplify(start,[...a.path,...ids.map(id=>nodes[id]),...tail,end]);const r={target:{...end},path,length:routeLength(start,path),urban:true};cache.set(k,r);if(cache.size>240)cache.delete(cache.keys().next().value);return {target:{...r.target},path:path.map(p=>({...p})),length:r.length,urban:true};}
// A sidewalk candidate follows the actual curved shoulder rather than the old axis.
export function curvedSidewalkPath(start,path){const result=[];let prev=start;for(const p of path){const dx=p.x-prev.x,dz=p.z-prev.z,len=distance(prev,p),vertical=Math.abs(dz)>Math.abs(dx);const roads=vertical?roadsX:roadsZ,at=(vertical?prev.z:prev.x);const r=roads.find(r=>Math.abs((vertical?prev.x:prev.z)-r.center)>r.width/2&&Math.abs((vertical?prev.x:prev.z)-r.center)<r.width/2+1.5&&Math.abs((vertical?p.x:p.z)-(vertical?prev.x:prev.z))<.01);if(r&&len>2){const side=(vertical?prev.x:prev.z)-r.center,n=Math.ceil(len/2);for(let i=1;i<n;i++){const q=roadPoint(r,at+(vertical?dz:dx)*i/n,side);result.push(q);}}result.push({...p});prev=p;}return result;}
