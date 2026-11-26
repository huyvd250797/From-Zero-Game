import {catalogs,record,config,city} from './master-data.js';
export const SIZE=city.size, CHUNK=city.chunkSize;
export const districts=catalogs.Districts.filter(d=>d.city===city.id);
export const districtAt=(x,z)=>districts.find(d=>x>=d.minX&&x<d.maxX&&z>=d.minZ&&z<d.maxZ);
export const roadNetwork=catalogs.Road_Network.filter(r=>r.city===city.id);
export const roads=roadNetwork.filter(r=>r.axis==='x').map(r=>r.center);
export const roadsX=roadNetwork.filter(r=>r.axis==='x'), roadsZ=roadNetwork.filter(r=>r.axis==='z');
const all=catalogs.Building_Instances.filter(b=>record(b.district).city===city.id).map(b=>({...b,id:b.legacyId,door:b.door?[record(b.door).x,record(b.door).z]:undefined,kind:b.legacyId,masterId:b.id,style:record(b.type).style}));
export const places=all.filter(p=>p.interactive);
export const sites=all;
export const buildings=all.filter(p=>p.h>0);
const start=record(config.spawn);
export const spawn={x:start.x,z:start.z};
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
// Index solid footprints in small buckets; continuous movement and A* use same collision rule.
const cellSize=8, buckets=new Map();
for(const b of buildings){for(let ix=Math.floor((b.x-b.w/2-.65)/cellSize);ix<=Math.floor((b.x+b.w/2+.65)/cellSize);ix++)for(let iz=Math.floor((b.z-b.d/2-.65)/cellSize);iz<=Math.floor((b.z+b.d/2+.65)/cellSize);iz++){const key=ix+':'+iz;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(b)}}
export function walkable(x,z){return Number.isFinite(x)&&Number.isFinite(z)&&x>=1&&z>=1&&x<=SIZE-1&&z<=SIZE-1&&!(buckets.get(Math.floor(x/cellSize)+':'+Math.floor(z/cellSize))||[]).some(b=>Math.abs(x-b.x)<b.w/2+.65&&Math.abs(z-b.z)<b.d/2+.65)}
export function nearestWalkable(x,z){if(!Number.isFinite(x)||!Number.isFinite(z))return null;x=clamp(Math.round(x),1,SIZE-1);z=clamp(Math.round(z),1,SIZE-1);for(let r=0;r<=32;r++){let best=null,dist=Infinity;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;const a=x+dx,b=z+dz;if(walkable(a,b)&&dx*dx+dz*dz<dist){best={x:a,z:b};dist=dx*dx+dz*dz}}if(best)return best}return null}
const stride=SIZE+1, total=stride*stride, occupancy=new Uint8Array(total);
for(let z=1;z<SIZE;z++)for(let x=1;x<SIZE;x++)occupancy[z*stride+x]=walkable(x,z)?1:0;
class Heap{constructor(){this.a=[]}less(a,b){return a.f<b.f||a.f===b.f&&a.g>b.g}push(v){const a=this.a;let i=a.length;a.push(v);while(i){const p=(i-1)>>1;if(!this.less(v,a[p]))break;a[i]=a[p];i=p}a[i]=v}pop(){const a=this.a,first=a[0],v=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let j=i*2+1;if(j+1<a.length&&this.less(a[j+1],a[j]))j++;if(!this.less(a[j],v))break;a[i]=a[j];i=j}a[i]=v}return first}}
const routeCache=new Map(), ROUTE_LIMIT=128;
export const routeCacheSize=()=>routeCache.size;
export function findPath(start,end){const a=nearestWalkable(start.x,start.z),b=nearestWalkable(end.x,end.z);if(!a||!b)return [];const key=`${a.x},${a.z}:${b.x},${b.z}`;let result=routeCache.get(key);if(result){routeCache.delete(key);}else{result=searchPath(a,b);}routeCache.set(key,result);if(routeCache.size>ROUTE_LIMIT)routeCache.delete(routeCache.keys().next().value);return result.map(p=>({...p}));}
function searchPath(start,end){const a=nearestWalkable(start.x,start.z),b=nearestWalkable(end.x,end.z);if(!a||!b)return [];const key=(x,z)=>z*stride+x,h=(x,z)=>Math.abs(x-b.x)+Math.abs(z-b.z);const first=key(a.x,a.z),goal=key(b.x,b.z);const heap=new Heap(),cost=new Float64Array(total).fill(Infinity),prev=new Int32Array(total).fill(-1);cost[first]=0;heap.push({...a,k:first,g:0,f:h(a.x,a.z)});while(heap.a.length){const cur=heap.pop();if(cur.g!==cost[cur.k])continue;if(cur.k===goal){const path=[];let k=goal;while(k!==first){path.push({x:k%stride,z:Math.floor(k/stride)});k=prev[k]}return path.reverse()}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=cur.x+dx,z=cur.z+dz,k=key(x,z),g=cur.g+1;if(x<1||z<1||x>=SIZE||z>=SIZE||!occupancy[k]||g>=cost[k])continue;cost[k]=g;prev[k]=cur.k;heap.push({x,z,k,g,f:g+h(x,z)})}}return []}
export function closestPlace(pos,range=3){let best=null,dist=range;for(const p of places){const d=Math.hypot(pos.x-p.door[0],pos.z-p.door[1]);if(d<=dist){best=p;dist=d}}return best}
