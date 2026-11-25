export const SIZE=96;
export const roads=[16,48,80];
export const places=[
{id:'shop',name:'Cửa hàng tiện lợi',icon:'▣',x:26,z:26,w:10,d:9,h:5,color:'#e8c08a',door:[26,32],kind:'shop'},
{id:'room',name:'Khu phòng trọ',icon:'⌂',x:6,z:31,w:8,d:12,h:5,color:'#d6b49b',door:[11,32],kind:'room'},
{id:'cafe',name:'Quán cà phê',icon:'☕',x:37,z:38,w:10,d:8,h:4,color:'#c99469',door:[37,43],kind:'cafe'},
{id:'park',name:'Công viên An Lạc',icon:'♣',x:27,z:63,w:13,d:13,h:0,color:'#8db67b',door:[27,54],kind:'park'},
{id:'office',name:'Công ty An Phát',icon:'▥',x:60,z:27,w:13,d:12,h:13,color:'#87aebd',door:[60,34],kind:'office'},
{id:'bank',name:'Ngân hàng',icon:'▤',x:69,z:39,w:12,d:8,h:7,color:'#d8d3ba',door:[69,44],kind:'bank'},
{id:'bike',name:'Cửa hàng xe đạp',icon:'◇',x:60,z:58,w:11,d:9,h:5,color:'#b1b7ce',door:[60,52],kind:'bike'},
{id:'clinic',name:'Phòng khám',icon:'✚',x:70,z:70,w:11,d:10,h:6,color:'#d9e4dd',door:[70,64],kind:'clinic'}];
const extras=[ [6,6,8,9,4],[29,6,16,9,7],[61,6,16,9,8],[90,7,8,12,6],[6,60,8,14,5],[6,91,8,7,4],[31,90,18,8,5],[60,90,13,8,9],[90,26,8,12,7],[90,60,8,14,5],[90,90,8,8,4],[38,25,8,8,8],[68,57,5,7,5]];
export const buildings=[...places.filter(p=>p.h>0),...extras.map(([x,z,w,d,h],i)=>({id:'b'+i,x,z,w,d,h,color:['#d4c4a9','#b2c2bc','#c3aeb0','#a9bdca'][i%4]}))];
export const spawn={x:21,z:36};
export const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export function walkable(x,z){return x>=1&&z>=1&&x<=95&&z<=95&&!buildings.some(b=>Math.abs(x-b.x)<b.w/2+.65&&Math.abs(z-b.z)<b.d/2+.65)}
export function nearestWalkable(x,z){x=clamp(Math.round(x),1,95);z=clamp(Math.round(z),1,95);for(let r=0;r<12;r++){let best=null,dist=Infinity;for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;const a=x+dx,b=z+dz;if(walkable(a,b)&&dx*dx+dz*dz<dist){best={x:a,z:b};dist=dx*dx+dz*dz}}if(best)return best}return null}
export function findPath(start,end){const a=nearestWalkable(start.x,start.z),b=nearestWalkable(end.x,end.z);if(!a||!b)return [];const key=(x,z)=>z*97+x;const h=(x,z)=>Math.abs(x-b.x)+Math.abs(z-b.z);const first=key(a.x,a.z),goal=key(b.x,b.z);const open=[{...a,k:first,g:0,f:h(a.x,a.z)}],cost=new Map([[first,0]]),prev=new Map();let visited=0;while(open.length&&visited++<15000){open.sort((p,q)=>q.f-p.f||q.g-p.g);const cur=open.pop();if(cur.g!==cost.get(cur.k))continue;if(cur.k===goal){const path=[];let k=goal;while(k!==first){path.push({x:k%97,z:Math.floor(k/97)});k=prev.get(k)}path.reverse();return path}for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=cur.x+dx,z=cur.z+dz,k=key(x,z),g=cur.g+1;if(!walkable(x,z)||g>=(cost.get(k)??Infinity))continue;cost.set(k,g);prev.set(k,cur.k);open.push({x,z,k,g,f:g+h(x,z)})}}return []}
export function closestPlace(pos,range=3){return places.find(p=>Math.hypot(pos.x-p.door[0],pos.z-p.door[1])<=range)||null}
