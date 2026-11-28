import {SCHOOLS} from './school-life-data.js';
import {MILITARY_HQ,MILITARY_BASE} from './military-state.js';
import {classifyAxis,highwayPoint,RING_ACCESS} from './road-standards.js';
import {createRiver,createLegacyRiver,waterStrips} from './river-layout.js';
import {naturalMasterplan,BRIDGE_Z} from './natural-masterplan.js';
import {riversideLayout} from './riverside-planning.js';
import {catalogs,record,config,city} from './master-data.js';
import {organicLayout} from './organic-neighborhoods.js';
import {createUrbanPlan} from './urban-planning.js';
export const SIZE=city.size, CHUNK=city.chunkSize;
export const districts=catalogs.Districts.filter(d=>d.city===city.id);
export const districtAt=(x,z)=>districts.find(d=>x>=d.minX&&x<d.maxX&&z>=d.minZ&&z<d.maxZ);
const canonicalRoads=catalogs.Road_Network.filter(r=>r.city===city.id);
export const roadNetwork=canonicalRoads.map(classifyAxis);
export const roads=roadNetwork.filter(r=>r.axis==='x').map(r=>r.center);
export const roadsX=roadNetwork.filter(r=>r.axis==='x'), roadsZ=roadNetwork.filter(r=>r.axis==='z');
const all=catalogs.Building_Instances.filter(b=>record(b.district).city===city.id).map(b=>({...b,id:b.legacyId,door:b.door?[record(b.door).x,record(b.door).z]:undefined,kind:b.legacyId,masterId:b.id,style:record(b.type).style}));

export const canonicalSites=all;
const start=record(config.spawn);
export const spawn={x:start.x,z:start.z};
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
// The river is a real collision barrier, with a crossing at every east-west road.
export const river=createRiver(city.riverMinX,city.riverMaxX,SIZE);
const oldRiver=createLegacyRiver(city.riverMinX,city.riverMaxX,SIZE);
const priorPlan=createUrbanPlan(canonicalRoads,all,SIZE,oldRiver,spawn,districts);
const previousPlan=organicLayout(canonicalRoads,all,priorPlan,districts);
const layout6=riversideLayout(canonicalRoads,all,previousPlan,oldRiver,districts,SIZE);
let layout7;
const priorLayout7=()=>layout7??=naturalMasterplan(canonicalRoads,all,layout6,river,districts,SIZE);
let layout8;
const priorLayout8=()=>layout8??=naturalMasterplan(roadNetwork,all,layout6,river,districts,SIZE,true);
export const urbanPlan=naturalMasterplan(roadNetwork,all,layout6,river,districts,SIZE,'ring');
export const sites=[...all.map(p=>urbanPlan.replatted.get(p.id)||p),...urbanPlan.infill];
// Reuse an existing civic footprint: no collision or layout migration.
const fireSite=sites.find(p=>p.id==='lot_100_124');
if(fireSite)sites[sites.indexOf(fireSite)]={...fireSite,name:'Trạm PCCC & CNCH An Lạc',door:[100,119],interactive:true,icon:'🚒',fireStation:true};
for(const [id,name,door,role] of [[MILITARY_HQ,'Ban chỉ huy quân sự An Lạc',[96,169],'hq'],[MILITARY_BASE,'Doanh trại An Lạc',[96,189],'base']]){const b=sites.find(p=>p.id===id);if(b)sites[sites.indexOf(b)]={...b,name,door,interactive:true,icon:'🛡️',militaryRole:role};}
for(const school of SCHOOLS){const b=sites.find(p=>p.id===school.id);if(b)sites[sites.indexOf(b)]={...b,name:school.name,door:school.door||b.door,interactive:true,type:'BTY_SCHOOL',icon:'🎓',schoolLevel:school.level,schoolSign:school.sign,schoolColor:school.color};}
export const places=sites.filter(p=>p.interactive);
export const buildings=sites.filter(p=>p.h>0);
export const roadOffset=urbanPlan.offset,roadPoint=urbanPlan.point;
export const bridges=Object.freeze([...roadsZ.filter(r=>BRIDGE_Z.includes(r.center)).map(r=>Object.freeze({id:'BRG_'+r.center,z:r.center,width:r.width+2.6,road:r.id})),... [5,379].map(z=>Object.freeze({id:'BRG_RING_'+z,z,width:9,road:'AL_EXPRESS_EAST'}))]);
export const riverWater=(x,z)=>river.contains(x,z)&&!bridges.some(b=>Math.abs(z-b.z)<=b.width/2);
const blockedWater=waterStrips(river,bridges,SIZE);
// Shared rectangle index for point collision and segment sweeping.
const cellSize=8,buckets=new Map();
export const obstacles=[...buildings.map(b=>({minX:b.x-b.w/2-.65,maxX:b.x+b.w/2+.65,minZ:b.z-b.d/2-.65,maxZ:b.z+b.d/2+.65})),...blockedWater,...urbanPlan.roundabouts.map(r=>({minX:r.x-r.island-.65,maxX:r.x+r.island+.65,minZ:r.z-r.island-.65,maxZ:r.z+r.island+.65,roundabout:r}))];
for(const b of obstacles){for(let ix=Math.floor(b.minX/cellSize);ix<=Math.floor(b.maxX/cellSize);ix++)for(let iz=Math.floor(b.minZ/cellSize);iz<=Math.floor(b.maxZ/cellSize);iz++){const key=ix+':'+iz;if(!buckets.has(key))buckets.set(key,[]);buckets.get(key).push(b);}}
export function segmentObstacles(a,b){const x=Math.floor(Math.min(a.x,b.x)/cellSize),X=Math.floor(Math.max(a.x,b.x)/cellSize),z=Math.floor(Math.min(a.z,b.z)/cellSize),Z=Math.floor(Math.max(a.z,b.z)/cellSize);if((X-x+1)*(Z-z+1)>48)return obstacles;const out=new Set();for(let ix=x;ix<=X;ix++)for(let iz=z;iz<=Z;iz++)for(const o of buckets.get(ix+':'+iz)||[])out.add(o);return out;}
export function walkable(x,z){return Number.isFinite(x)&&Number.isFinite(z)&&x>=1&&z>=1&&x<=SIZE-1&&z<=SIZE-1&&!riverWater(x,z)&&!(buckets.get(Math.floor(x/cellSize)+':'+Math.floor(z/cellSize))||[]).some(b=>b.water?false:b.roundabout?Math.hypot(x-b.roundabout.x,z-b.roundabout.z)<b.roundabout.island+.65:x>b.minX&&x<b.maxX&&z>b.minZ&&z<b.maxZ)}
export function nearestWalkable(x,z){if(!Number.isFinite(x)||!Number.isFinite(z))return null;x=clamp(Math.round(x),1,SIZE-1);z=clamp(Math.round(z),1,SIZE-1);for(let r=0;r<=64;r++){let best=null,dist=Infinity;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;const a=x+dx,b=z+dz;if(walkable(a,b)&&dx*dx+dz*dz<dist){best={x:a,z:b};dist=dx*dx+dz*dz}}if(best)return best}return null}
const stride=SIZE+1, total=stride*stride, occupancy=new Uint8Array(total);
for(let z=1;z<SIZE;z++)for(let x=1;x<SIZE;x++)occupancy[z*stride+x]=walkable(x,z)?1:0;
class Heap{constructor(){this.a=[]}less(a,b){return a.f<b.f||a.f===b.f&&a.g>b.g}push(v){const a=this.a;let i=a.length;a.push(v);while(i){const p=(i-1)>>1;if(!this.less(v,a[p]))break;a[i]=a[p];i=p}a[i]=v}pop(){const a=this.a,first=a[0],v=a.pop();if(a.length){let i=0;while(i*2+1<a.length){let j=i*2+1;if(j+1<a.length&&this.less(a[j+1],a[j]))j++;if(!this.less(a[j],v))break;a[i]=a[j];i=j}a[i]=v}return first}}
const routeCache=new Map(), ROUTE_LIMIT=128;
export const routeCacheSize=()=>routeCache.size;
export function findPath(start,end,avoidHighway=false){const a=nearestWalkable(start.x,start.z),b=nearestWalkable(end.x,end.z);if(!a||!b)return [];const key=`${a.x},${a.z}:${b.x},${b.z}:${avoidHighway}`;let result=routeCache.get(key);if(result){routeCache.delete(key);}else{result=searchPath(a,b,avoidHighway);}routeCache.set(key,result);if(routeCache.size>ROUTE_LIMIT)routeCache.delete(routeCache.keys().next().value);return result.map(p=>({...p}));}
const pathCost=new Float64Array(total),pathPrev=new Int32Array(total),pathStamp=new Uint32Array(total);let generation=0;
function searchPath(start,end,avoidHighway=false){const a=nearestWalkable(start.x,start.z),b=nearestWalkable(end.x,end.z);if(!a||!b)return [];const key=(x,z)=>z*stride+x,h=(x,z)=>Math.abs(x-b.x)+Math.abs(z-b.z);const first=key(a.x,a.z),goal=key(b.x,b.z);const heap=new Heap(),cost=pathCost,prev=pathPrev;generation=(generation+1)>>>0;if(!generation){pathStamp.fill(0);generation=1;}cost[first]=0;pathStamp[first]=generation;heap.push({...a,k:first,g:0,f:h(a.x,a.z)});while(heap.a.length){const cur=heap.pop();if(cur.g!==cost[cur.k])continue;if(cur.k===goal){const path=[];let k=goal;while(k!==first){path.push({x:k%stride,z:Math.floor(k/stride)});k=prev[k]}return path.reverse()}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=cur.x+dx,z=cur.z+dz,k=key(x,z),g=cur.g+1;if(x<1||z<1||x>=SIZE||z>=SIZE||!occupancy[k]||avoidHighway&&highwayPoint({x,z})||(pathStamp[k]===generation&&g>=cost[k]))continue;pathStamp[k]=generation;cost[k]=g;prev[k]=cur.k;heap.push({x,z,k,g,f:g+h(x,z)})}}return []}
export function closestPlace(pos,range=3){let best=null,dist=range;for(const p of places){const d=Math.hypot(pos.x-p.door[0],pos.z-p.door[1]);if(d<=dist){best=p;dist=d}}return best}

// Only relocate positions made invalid by newly added planning solids. Never repair legacy corruption.
const oldBridges=roadsZ.map(r=>({z:r.center,width:r.width+2.6}));
const oldSitesFor=plan=>[...all.map(p=>plan.replatted?.get(p.id)||p),...plan.infill];
const oldLayouts=new Map([[4,oldSitesFor(priorPlan)],[5,oldSitesFor(previousPlan)],[6,oldSitesFor(layout6)]]);
function oldWalkable(x,z,layout){if(layout===8&&!oldLayouts.has(8))oldLayouts.set(8,oldSitesFor(priorLayout8()));if(layout===7&&!oldLayouts.has(7))oldLayouts.set(7,oldSitesFor(priorLayout7()));if(!Number.isFinite(x)||!Number.isFinite(z)||x<1||z<1||x>SIZE-1||z>SIZE-1)return false;const water=layout>=7?river.contains(x,z):layout===6?oldRiver.contains(x,z):x>=city.riverMinX&&x<=city.riverMaxX;if(water&&!(layout>=7?bridges.filter(b=>!b.id.startsWith('BRG_RING')):oldBridges).some(b=>Math.abs(z-b.z)<=b.width/2))return false;const plan=layout===8?priorLayout8():layout===7?priorLayout7():layout===6?layout6:layout===5?previousPlan:layout===4?priorPlan:null;return !(oldLayouts.get(layout)||all).some(b=>b.h&&Math.abs(x-b.x)<b.w/2+.65&&Math.abs(z-b.z)<b.d/2+.65)&&!plan?.roundabouts.some(r=>Math.hypot(x-r.x,z-r.z)<r.island+.65);}
export function legacyWalkable(x,z){return oldWalkable(x,z,undefined);}
export function migrateUrbanSave(s){if(!s||typeof s!=='object')return s;if(s.urbanLayout===9){if(s.pos&&walkable(s.pos.x,s.pos.z)&&highwayPoint(s.pos)&&!s.transport?.active){const q=RING_ACCESS.map(r=>r.city).filter(p=>walkable(p.x,p.z)).sort((a,b)=>Math.hypot(a.x-s.pos.x,a.z-s.pos.z)-Math.hypot(b.x-s.pos.x,b.z-s.pos.z))[0];if(!q||highwayPoint(q))return null;const c=structuredClone(s);c.pos=q;if(c.riding&&c.transport?.bikePos)c.transport.bikePos={...q};return c;}return s;}if(![undefined,4,5,6,7,8].includes(s.urbanLayout))return null;const points=[s.pos,s.transport?.bikePos,...(Array.isArray(s.transport?.vehicles)?s.transport.vehicles.map(v=>v?.pos):[])].filter(Boolean);if(points.some(p=>!oldWalkable(p.x,p.z,s.urbanLayout)))return null;const active=s.transport?.vehicles?.find?.(v=>v?.id===s.transport.active);if(active&&(!s.pos||!active.pos||Math.hypot(active.pos.x-s.pos.x,active.pos.z-s.pos.z)>.001))return null;const copy=structuredClone(s),fix=(p,restricted=true)=>{if(!p)return p;const oldPlace=(s.urbanLayout>=7?oldLayouts.get(s.urbanLayout):all).find(b=>b.door&&Math.hypot(p.x-b.door[0],p.z-b.door[1])<=2);if(oldPlace){const dest=places.find(b=>b.id===oldPlace.id);if(dest&&walkable(...dest.door))return {x:dest.door[0],z:dest.door[1]};}if(restricted&&highwayPoint(p)){const q=RING_ACCESS.map(r=>r.city).filter(q=>walkable(q.x,q.z)).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))[0];if(q)return {...q};}return walkable(p.x,p.z)?p:nearestWalkable(p.x,p.z);};copy.pos=fix(copy.pos);if(!copy.pos)return null;if(copy.transport){if(copy.transport.bikePos)copy.transport.bikePos=fix(copy.transport.bikePos);for(const v of Array.isArray(copy.transport.vehicles)?copy.transport.vehicles:[])if(v?.pos)v.pos=fix(v.pos);if(copy.riding&&copy.transport.bikePos)copy.transport.bikePos={...copy.pos};const active=copy.transport.vehicles?.find?.(v=>v?.id===copy.transport.active);if(active)active.pos={...copy.pos};}copy.urbanLayout=9;return copy;}
