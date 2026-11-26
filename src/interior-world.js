import {roomLayout,PUBLIC_INTERIORS,InteriorWalk} from './interiors.js';
import {currentHome,homeAccess,nearPlace,currentHomePlace,homeAt} from './housing-state.js';
import {places} from './world.js';
import {isOpen} from './life.js';
import {ended} from './aging-state.js';
import {incarcerated} from './recovery-state.js';
import {catalogs,record} from './master-data.js';
import {makeSpace,attachSpace,resolveLayout,applyDecor,decorFor,entryFor,boundsFor,gridFree,changeDecor} from './housing-design.js';
import {cameraBasis,screenToWorldDelta} from './camera-control.js';
const aliases={east_market:'market',central_shop:'shop',east_cafe:'cafe',central_mall:'mall',tech_hub:'office',finance_hub:'bank',east_school:'school',east_library:'library',new_factory:'factory',new_warehouse:'warehouse',campus_shop:'shop',industry_shop:'shop',industry_office:'office',south_shop:'shop',tanphu_market:'market',phuan_market:'market',river_cafe:'cafe',tanphu_office:'office',tanphu_library:'library',tanphu_cafe:'cafe',cityhall:'office',court:'office',police:'office',bike:'shop',sport:'school',farm:'factory',south_farm:'factory'};
export const INTERACTIVE_BUILDINGS=Object.freeze([...PUBLIC_INTERIORS,...Object.keys(aliases)]);
const modules=new Set(['shop','career','finance','banking','recovery','education','study','health','furniture','cook','legal','transport']);
export function buildingAccess(s,id,home=false){return !ended(s)&&!incarcerated(s)&&(home?currentHomePlace(s)===id&&homeAccess(s):INTERACTIVE_BUILDINGS.includes(id)&&nearPlace(s,id)&&isOpen(id,s.minutes));}
const shift=(f,r)=>({...f,x:f.x+r.x,z:f.z+r.z,station:{x:f.station.x+r.x,z:f.station.z+r.z}});
const fixture=(id,name,kind,x,z,w,d,sx,sz,color)=>({id,name,kind,x,z,w,d,station:{x:sx,z:sz},actions:[],color});
export function homeBase(s){const p=currentHome(s);if(!p)return null;const large=p.capacity>=4,cols=p.capacity>=2?2:1,rows=large?2:1,space=makeSpace(cols,rows,large?['Phòng khách','Phòng ngủ','Bếp & ăn','Phòng tắm & làm việc']:cols===2?['Sinh hoạt chung','Phòng ngủ & tắm']:['Phòng trọ']);const items=roomLayout(s,currentHomePlace(s),true).map(f=>{const room=large?(['bed'].includes(f.id)?1:f.id==='kitchen'?2:['bath','desk'].includes(f.id)?3:0):cols===2&&['bed','bath'].includes(f.id)?1:0;return shift(f.id==='ac'&&large?{...f,x:6,z:0,station:{x:6,z:1}}:f,space.rooms[room]);});
 if(cols===2){items.push(shift(fixture('tv','Kệ TV','tv',0,0,2,1,1,1,'#9a7758'),space.rooms[0]));items.push(shift(fixture('wardrobe','Tủ quần áo','wardrobe',0,4,2,1,2,4,'#b89c7a'),space.rooms[1]));}
 if(large){items.push(shift(fixture('plant','Cây cảnh','plant',8,0,1,1,7,0,'#668c5e'),space.rooms[0]));items.push(shift(fixture('dining','Bàn ăn','table',1,0,3,2,3,2,'#aa825b'),space.rooms[2]));items.push(shift(fixture('washer','Máy giặt','washer',0,0,1,1,1,0,'#d6e2df'),space.rooms[3]));}
 return attachSpace(items,space);}

export function buildingLayout(s,id,home=false){if(home){const base=homeBase(s);if(!base)return [];const saved=decorFor(s,currentHome(s).id),exact=applyDecor(base,saved);if(exact)return exact;const safe={...saved,positions:{}};for(const [id,pos] of Object.entries(saved.positions)){const next={...safe,positions:{...safe.positions,[id]:pos}};if(applyDecor(base,next))safe.positions=next.positions;}return applyDecor(base,safe);}
 const type=aliases[id]||id;if(!INTERACTIVE_BUILDINGS.includes(id))return [];const place=places.find(p=>p.id===id);
 const base=roomLayout(s,type),large=['mall','market','hospital','school','factory','warehouse','office','bank'].includes(type),space=makeSpace(large?2:1,1,[place?.name||'Khu chính',type==='school'?'Phòng học':type==='hospital'?'Phòng khám':type==='warehouse'||type==='factory'?'Khu vận hành':type==='mall'||type==='market'?'Khu hàng hóa':'Khu làm việc']);
 const canonical=catalogs.Location_Actions.filter(a=>a.building===place?.masterId);const localIds=new Set(canonical.map(a=>a.legacyId));const localActions=canonical.map(a=>a.legacyId).filter(Boolean);let items=base.map((f,i)=>{const actions=f.actions.flatMap(k=>modules.has(k)?[k]:localIds.has(k)?[k]:localActions.filter(a=>a.endsWith('_'+k)));return shift({...f,actions:[...new Set(actions)]},space.rooms[large&&i===0?1:0]);});
 // Every existing canonical action remains available at a physical service station, except vehicle mount/purchase.
 const missing=localActions.filter(k=>!['buybike','ride'].includes(k)&&!items.some(f=>f.actions.includes(k)));if(items.length){items[0].actions.push(...missing);if(['court','police','cityhall'].includes(id))items[0].actions.push('legal');if(id==='bike')items[0].actions.push('transport');}
 return resolveLayout(items,space)||[];
}
export function saveHomeDesign(s,id,draft){const p=currentHome(s),base=homeBase(s);return !!p&&p.id===id&&homeAccess(s)&&!ended(s)&&!incarcerated(s)&&!!base&&changeDecor(s,id,base,draft);}
// Continuous local motion uses the exterior camera basis, bounded substeps and radius collision.
export function localClear(layout,x,z,r=.20){if(!Number.isFinite(x)||!Number.isFinite(z))return false;for(const dx of [-r,r])for(const dz of [-r,r])if(!gridFree(layout,Math.floor(x+dx),Math.floor(z+dz)))return false;return true;}
export class BuildingWalk extends InteriorWalk{
 constructor(layout,start=entryFor(layout)){super(layout,start);this.manual=false;this.running=false;}
 get moving(){return this.manual||this.route.length>0;}
 go(target){this.manual=false;this.running=false; // settle to a valid cell before a new click route; no teleport through a wall
 this.cell={x:Math.floor(this.pos.x),z:Math.floor(this.pos.z)};this.route=[];if(!target||!gridFree(this.layout,target.x,target.z))return false;
 const center={x:this.cell.x+.5,z:this.cell.z+.5};if(Math.hypot(this.pos.x-center.x,this.pos.z-center.z)>.02)this.route=[{...this.cell}];const lead=this.route;this.route=[];const ok=super.go(target);if(ok)this.route=[...lead,...this.route];return ok;}
 steer(x,z,dt,run=false){const len=Math.hypot(x,z);if(len<.04){this.manual=false;this.running=false;return false;}this.route=[];this.manual=false;this.running=run;const step=Math.max(0,Math.min(.1,dt))*(run?4.8:2.5),dx=x/Math.max(1,len)*step,dz=z/Math.max(1,len)*step,n=Math.max(1,Math.ceil(Math.hypot(dx,dz)/.10));let moved=0;for(let i=0;i<n;i++){const old={...this.pos},nx=dx/n,nz=dz/n;if(localClear(this.layout,this.pos.x+nx,this.pos.z))this.pos.x+=nx;if(localClear(this.layout,this.pos.x,this.pos.z+nz))this.pos.z+=nz;moved+=Math.hypot(this.pos.x-old.x,this.pos.z-old.z);}this.cell={x:Math.floor(this.pos.x),z:Math.floor(this.pos.z)};if(moved>1e-6){this.yaw=Math.atan2(x,z);this.phase+=moved*3.5;this.manual=true;}return this.manual;}
 step(dt){this.manual=false;this.running=false;return super.step(dt);}
}
export function localDirection(x,z,camera){const d=screenToWorldDelta(x,z,camera,1),n=Math.hypot(d.x,d.z)||1;return {x:d.x/n*Math.min(1,Math.hypot(x,z)),z:d.z/n*Math.min(1,Math.hypot(x,z))};}
export function buildingView(width,height,layout,focus,zoom=1,yaw=38,wide=false){const {width:w,depth:d}=boundsFor(layout),camera={x:wide?w/2:focus.x,z:wide?d/2:focus.z,yaw,pitch:56},a=yaw*Math.PI/180,{s,c}=cameraBasis(camera),spanX=Math.abs(Math.cos(a))*w+Math.abs(Math.sin(a))*d,spanZ=Math.abs(Math.sin(a))*w+Math.abs(Math.cos(a))*d,unit=wide?Math.min(width/(spanX+1.6),height/(spanZ*s+3)):Math.min(width/10.2,height/9)*zoom;return {camera,width,height,unit,project(x,y,z){const dx=x-camera.x,dz=z-camera.z,rx=dx*Math.cos(a)-dz*Math.sin(a),rz=dx*Math.sin(a)+dz*Math.cos(a);return {x:width/2+rx*unit,y:height/2+(rz*s-y*c)*unit,depth:rz*c+y*s};},pick(x,y){const d=screenToWorldDelta(x-width/2,y-height/2,camera,unit);return {x:camera.x+d.x,z:camera.z+d.z};}};}
