import {catalogs,record,config,city} from './master-data.js';
export const SIZE=city.size;
export const roads=catalogs.Road_Network.filter(r=>r.axis==='x').map(r=>r.center);
const all=catalogs.Building_Instances.map(b=>({id:b.legacyId,name:b.name,icon:b.icon,x:b.x,z:b.z,w:b.w,d:b.d,h:b.h,color:b.color,door:b.door?[record(b.door).x,record(b.door).z]:undefined,kind:b.legacyId,interactive:b.interactive,masterId:b.id}));
export const places=all.filter(p=>p.interactive);
export const buildings=all.filter(p=>p.h>0);
const start=record(config.spawn);
export const spawn={x:start.x,z:start.z};
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export function walkable(x,z){return x>=1&&z>=1&&x<=SIZE-1&&z<=SIZE-1&&!buildings.some(b=>Math.abs(x-b.x)<b.w/2+.65&&Math.abs(z-b.z)<b.d/2+.65)}
export function nearestWalkable(x,z){x=clamp(Math.round(x),1,SIZE-1);z=clamp(Math.round(z),1,SIZE-1);for(let r=0;r<12;r++){let best=null,dist=Infinity;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;const a=x+dx,b=z+dz;if(walkable(a,b)&&dx*dx+dz*dz<dist){best={x:a,z:b};dist=dx*dx+dz*dz}}if(best)return best}return null}
export function findPath(start,end){const a=nearestWalkable(start.x,start.z),b=nearestWalkable(end.x,end.z);if(!a||!b)return [];const key=(x,z)=>z*(SIZE+1)+x;const h=(x,z)=>Math.abs(x-b.x)+Math.abs(z-b.z);const first=key(a.x,a.z),goal=key(b.x,b.z);const open=[{...a,k:first,g:0,f:h(a.x,a.z)}],cost=new Map([[first,0]]),prev=new Map();let visited=0;while(open.length&&visited++<15000){open.sort((p,q)=>q.f-p.f||q.g-p.g);const cur=open.pop();if(cur.g!==cost.get(cur.k))continue;if(cur.k===goal){const path=[];let k=goal;while(k!==first){path.push({x:k%(SIZE+1),z:Math.floor(k/(SIZE+1))});k=prev.get(k)}path.reverse();return path}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=cur.x+dx,z=cur.z+dz,k=key(x,z),g=cur.g+1;if(!walkable(x,z)||g>=(cost.get(k)??Infinity))continue;cost.set(k,g);prev.set(k,cur.k);open.push({x,z,k,g,f:g+h(x,z)})}}return []}
export function closestPlace(pos,range=3){return places.find(p=>Math.hypot(pos.x-p.door[0],pos.z-p.door[1])<=range)||null}
