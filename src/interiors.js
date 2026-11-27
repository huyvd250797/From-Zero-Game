import {boundsFor,entryFor,partitionCell,FLOOR_STYLES,WALL_STYLES} from './housing-design.js';
import {avatarTriangles,npcAvatar} from './avatar.js';
import {interiorLayout,interiorPath,interiorWalkable,ENTRY} from './housing.js';
import {homeAccess,nearPlace,currentHomePlace} from './housing-state.js';
import {isOpen} from './life.js';
import {incarcerated} from './recovery-state.js';
import {ended} from './aging-state.js';
import {Mesh} from './renderer.js';
import {cameraBasis,screenToWorldDelta} from './camera-control.js';
export const ROOM_WIDTH=9, ROOM_DEPTH=6;
// All coordinates are local presentation-only cells. Exterior position remains at the entrance.
const item=(id,name,kind,x,z,w,d,sx,sz,actions,color)=>({id,name,kind,x,z,w,d,station:{x:sx,z:sz},actions,color});
const desk=(name,actions)=>item('desk',name,'desk',0,0,2,2,2,1,actions,'#9b7859');
const counter=(name,actions)=>item('counter',name,'counter',6,0,3,2,5,1,actions,'#7da39a');
const shelf=(name,actions)=>item('shelf',name,'shelf',0,3,2,2,2,3,actions,'#b89c70');
const seat=(name,actions)=>item('seat',name,'seat',6,3,3,2,5,3,actions,'#759b82');
const machine=(name,actions)=>item('machine',name,'machine',6,3,3,2,5,3,actions,'#78959e');
const layouts={
 shop:[shelf('Kệ hàng',['shop']),counter('Quầy thu ngân',['career','work','meal'])],
 mini_mart:[shelf('Kệ hàng',['shop']),counter('Quầy thanh toán',['mini_visit'])],
 market:[shelf('Kệ siêu thị',['shop']),counter('Quầy thu ngân',['career','market_shift','visit_market'])],
 mall:[shelf('Khu nội thất',['furniture','shop']),counter('Quầy dịch vụ',['visit_mall']),seat('Rạp chiếu phim',['cinema'])],
 cafe:[counter('Quầy pha chế',['career','cafe_shift']),item('seat','Bàn cà phê','table',6,3,3,2,5,3,['coffee','shop'],'#b18c65')],
 office:[desk('Bàn làm việc',['career','ask']),counter('Lễ tân',['career'])],
 bank:[counter('Quầy giao dịch',['banking','bankinfo']),desk('Bàn tư vấn',['finance','recovery'])],
 school:[desk('Bàn học',['education']),counter('Phòng đào tạo',['education','visit_school'])],
 library:[shelf('Kệ sách',['study']),desk('Bàn đọc sách',['study','education','visit_library'])],
 library_annex:[shelf('Kệ sách cộng đồng',['study']),desk('Bàn tự học',['study','education','annex_visit'])],
 clinic:[counter('Quầy tiếp nhận',['health','clinicinfo']),item('bed','Giường khám','bed',0,3,2,2,2,3,['treatment','relief','health'],'#b1cfd0')],
 hospital:[counter('Quầy tiếp nhận',['health','visit_hospital']),item('bed','Giường bệnh','bed',0,3,2,2,2,3,['health'],'#b1cfd0')],
 factory:[desk('Bàn quản lý',['career','visit_factory']),machine('Dây chuyền sản xuất',['career'])],
 warehouse:[counter('Bàn điều phối',['career','warehouse_shift']),machine('Khu hàng hóa',['visit_warehouse','career'])]
};
export const PUBLIC_INTERIORS=Object.freeze(Object.keys(layouts));
export function interiorAccess(s,id,home=false){return !incarcerated(s)&&!ended(s)&&(home?currentHomePlace(s)===id&&homeAccess(s):PUBLIC_INTERIORS.includes(id)&&nearPlace(s,id)&&isOpen(id,s.minutes));}
const homeActions={bed:['sleep'],bath:['shower','laundryHome'],kitchen:['cook','homeStorage'],desk:['study'],living:['relax','cleanHome'],ac:['relax']};
export function roomLayout(s,id,home=false){return home?interiorLayout(s).map(o=>({...o,kind:o.id,actions:homeActions[o.id]||[]})):(layouts[id]||[]).map(o=>({...o,station:{...o.station},actions:[...o.actions]}));}
export function stationAt(layout,cell){return layout.find(o=>o.station.x===cell.x&&o.station.z===cell.z)||null;}
export function targetCell(layout,x,z){const cell={x:Math.floor(x),z:Math.floor(z)};const obj=layout.find(o=>cell.x>=o.x&&cell.x<o.x+o.w&&cell.z>=o.z&&cell.z<o.z+o.d);return obj?{...obj.station}:interiorWalkable(layout,cell.x,cell.z)?cell:null;}
export class InteriorWalk {
 constructor(layout,start=ENTRY){this.layout=layout;this.cell=interiorWalkable(layout,start.x,start.z)?{...start}:{...entryFor(layout)};this.pos={x:this.cell.x+.5,z:this.cell.z+.5};this.route=[];this.yaw=0;this.phase=0;}
 get moving(){return this.route.length>0;}
 go(target){if(this.moving||!target)return false;const path=interiorPath(this.layout,this.cell,target);if(path===null)return false;this.route=path;return true;}
 step(dt){let budget=Math.max(0,Math.min(.1,dt))*4.8;while(this.route.length&&budget>0){const t=this.route[0],dx=t.x+.5-this.pos.x,dz=t.z+.5-this.pos.z,d=Math.hypot(dx,dz);if(d>1e-6)this.yaw=Math.atan2(dx,dz);if(d<=budget){this.pos={x:t.x+.5,z:t.z+.5};this.cell={...t};this.route.shift();budget-=d;}else{this.pos.x+=dx*budget/d;this.pos.z+=dz*budget/d;budget=0;}this.phase+=Math.min(d,4.8*dt)*3.5;}return !this.moving;}
}
export function interiorView(width,height,focus=null){const camera={x:focus?.x??4.5,z:focus?.z??3,yaw:25,pitch:58};const unit=Math.min(width/(focus?6.4:12.8),height/(focus?5.35:10.7));const a=camera.yaw*Math.PI/180,{s,c}=cameraBasis(camera);return {camera,unit,width,height,project(x,y,z){const dx=x-camera.x,dz=z-camera.z,rx=dx*Math.cos(a)-dz*Math.sin(a),rz=dx*Math.sin(a)+dz*Math.cos(a);return {x:width/2+rx*unit,y:height/2+(rz*s-y*c)*unit,depth:rz*c+y*s};},pick(x,y){const d=screenToWorldDelta(x-width/2,y-height/2,camera,unit);return {x:camera.x+d.x,z:camera.z+d.z};}};}
// Shared physical furniture mesh; no roof or front walls to obscure the character.
export function roomGeometry(layout,home=false,people=[]){const m=new Mesh(),box=(x,y,z,w,h,d,c)=>m.box(x,y,z,w,h,d,c);if(layout.space){const space=layout.space,{width:w,depth:d}=space,colors=FLOOR_STYLES[space.floor],wall=WALL_STYLES[space.wall];box(w/2,-.24,d/2,w+.3,.24,d+.3,'#8c8070');for(let z=0;z<d;z++)for(let x=0;x<w;x++){const c=colors[(x+z)%2];m.quad([x+.012,.027,z+.012],[x+.988,.027,z+.012],[x+.988,.027,z+.988],[x+.012,.027,z+.988],[parseInt(c.slice(1,3),16)/255,parseInt(c.slice(3,5),16)/255,parseInt(c.slice(5,7),16)/255]);if(partitionCell(space,x,z)){box(x+.5,.03,z+.5,x%10===9?.18:1,.62,z%7===6?.18:1,wall);box(x+.5,.65,z+.5,x%10===9?.22:1,.065,z%7===6?.22:1,'#f1e6d2');}}
 // Roofless cutaway, low external walls and threshold; no view-obscuring foreground facade.
 box(w/2,.027,-.08,w+.24,.88,.16,wall);box(-.08,.027,d/2,.16,.62,d,wall);box(w+.08,.027,d/2,.16,.62,d,wall);const e=space.entry;for(const [x,W] of [[e.x/2,e.x],[((e.x+1)+w)/2,w-e.x-1]])if(W>0)box(x,.027,d+.08,W,.38,.16,wall);box(e.x+.5,.035,d-.1,.88,.035,.22,'#426c59');for(const r of space.rooms){box(r.x+4.5,.53,r.z===0?-.10:r.z+.10,2.25,.32,.09,'#8ab5c3');if(r.z===0)for(const x of [r.x+3.4,r.x+4.5,r.x+5.6])box(x,.51,-.04,.045,.38,.10,'#f0eee2');}
 }else{box(4.5,-.24,3,9.3,.24,6.3,'#8c8070');for(let z=0;z<6;z++)for(let x=0;x<9;x++)box(x+.5,.001,z+.5,.98,.025,.98,(x+z)%2?'#d6c5aa':'#e5d4b9');box(4.5,.025,-.08,9.3,1.8,.17,'#c6d2c4');box(-.08,.025,3,.17,1.8,6.1,'#b8c8b9');box(4.5,1.14,-.18,2.5,.55,.05,'#739da9');for(const x of [3.26,4.5,5.74])box(x,1.12,-.14,.06,.6,.06,'#e6e6db');box(4.5,.03,5.99,1,.045,.20,'#426c59');}
 for(const f of layout){const start=m.v.length,x=f.x+f.w/2,z=f.z+f.d/2,w=(f.turn?f.d:f.w)-.16,d=(f.turn?f.w:f.d)-.16,c=f.color||'#a8b9a4';const B=(y,W,H,D,col,dx=0,dz=0)=>box(x+dx,y,z+dz,W,H,D,col);const legs=(h=.65)=>{for(const dx of [-w*.4,w*.4])for(const dz of [-d*.4,d*.4])B(.05,.12,h,.12,'#69594a',dx,dz);};switch(f.kind){
 case 'bed':B(.05,w,.30,d,'#8d7054');B(.35,w*.94,.19,d*.95,'#eee9dc');B(.54,w*.91,.12,d*.60,c,0,d*.16);B(.55,w*.72,.14,d*.24,'#f7f4e7',0,-d*.34);B(.05,w,.91,.12,'#8d7054',0,-d*.46);break;
 case 'bath':B(.05,w*.56,.38,d*.84,'#e8f0eb',-w*.19,0);B(.43,w*.44,.03,d*.70,'#91b8c0',-w*.19,0);B(.05,w*.28,.48,d*.31,'#f4f5ee',w*.30,d*.16);B(.50,w*.26,.10,d*.27,'#c0d5d6',w*.30,d*.16);B(.05,w*.31,.85,d*.28,'#c1c7ba',w*.28,-d*.30);break;
 case 'kitchen':case 'counter':B(.05,w,.83,d*.82,c);B(.88,w+.04,.10,d*.87,'#d9d7c9');B(.98,w*.32,.04,d*.46,'#34484b',-w*.24);B(.98,w*.29,.10,d*.38,'#aabfc0',w*.25);if(f.name.includes('tủ lạnh'))B(.05,.48,1.45,d*.45,'#e2e9e4',w*.32,-d*.2);break;
 case 'desk':legs();B(.70,w,.12,d,'#a97b54');B(.82,w*.38,.045,d*.28,'#eee8cc',-w*.24);B(.82,w*.38,.40,.08,'#394d52',w*.22,-d*.20);B(.82,w*.30,.055,d*.25,'#45595c',w*.22,d*.12);break;
 case 'table':B(.05,.22,.68,.22,'#645b4f');B(.73,w*.52,.10,d*.54,'#aa825b');for(const side of [-1,1]){B(.05,.43,.35,.46,'#749686',side*w*.36,0);B(.40,.47,.14,.48,'#749686',side*w*.36,0);B(.50,.12,.32,.48,'#567a68',side*w*.44,0);}B(.83,.15,.14,.15,'#efe7d1',.16,0);B(.83,.15,.14,.15,'#efe7d1',-.16,0);break;
 case 'living':case 'seat':B(.05,w,.34,d,c);B(.39,w*.82,.18,d*.83,c);B(.45,w,.52,d*.23,c,0,-d*.39);for(const side of [-1,1])B(.4,w*.12,.31,d,c,side*w*.44);break;
 case 'ac':B(layout.space?1.4:.65,w,.38,d*.48,'#e2e8e5');B(layout.space?1.44:.69,w*.87,.07,d*.5,'#829594');break;
 case 'tv':B(.04,w,.38,d,'#927354');B(.42,w*.86,.06,d*.85,'#bf9c77');B(.48,w*.7,.06,.25,'#3b484e');B(.54,w*.83,.65,.075,'#34494f',0,-d*.12);B(.60,w*.74,.53,.018,'#52727e',0,-d*.075);for(const dx of [-w*.3,w*.3])B(.16,w*.07,.035,.04,'#e1c59a',dx,d*.49);break;
 case 'wardrobe':B(.04,w,1.58,d,c);B(.06,.025,1.5,.025,'#685c50',0,d*.505);for(const side of [-1,1])B(.76,.035,.17,.06,'#e2d0b2',side*.1,d*.52);B(1.62,w+.04,.06,d+.04,'#c1a886');break;
 case 'washer':B(.04,w,.86,d,c);B(.10,w*.78,.64,.05,'#a9bbbd',0,d*.48);B(.21,w*.56,.45,.045,'#596e78',0,d*.52);B(.26,w*.42,.35,.015,'#7995a4',0,d*.55);B(.78,w*.8,.06,.05,'#f2f3e9',0,d*.5);B(.81,.09,.07,.06,'#6d8792',w*.28,d*.52);break;
 case 'plant':B(.03,w*.56,.34,d*.56,'#bd8a67');B(.37,w*.49,.055,d*.49,'#6d5742');B(.41,.09,.68,.09,'#7f7050');for(const [dx,dz,y] of [[-.16,-.12,.55],[.15,.1,.72],[0,-.11,.88],[.09,.16,.98]])m.cone(x+dx,y,z+dz,.22,.4,'#568456',7);break;
 case 'shelf':for(const side of [-1,1])B(.05,.12,1.62,d,'#927b60',side*w*.46);for(let y=.10;y<1.6;y+=.47){B(y,w,.08,d,'#b9a182');for(let i=0;i<4;i++)B(y+.08,w*.18,.27,d*.42,['#b77b54','#7d9b84','#5c8596','#e4cb8c'][i],(i-1.5)*w*.22,0);}break;
 case 'machine':B(.05,w,.72,d,c);B(.77,w*.8,.22,d*.75,'#43575c');for(let i=0;i<3;i++)B(.99,w*.22,.38,d*.47,'#b7a080',(i-1)*w*.28);break;
 }if(f.turn)for(let i=start;i<m.v.length;i+=6){const dx=m.v[i]-x,dz=m.v[i+2]-z;m.v[i]=x-dz;m.v[i+2]=z+dx;} }for(const member of people){const raw=avatarTriangles(npcAvatar(member),member.age,{mode:member.mode||'idle',phase:0,blend:1,idleTime:0},true),scale=member.child?Math.min(.52,.28+member.age*.014):.62;for(let i=0;i<raw.length;i+=6)m.v.push(raw[i]*scale+member.cell.x+.5,raw[i+1]*scale+.04,raw[i+2]*scale+member.cell.z+.5,raw[i+3],raw[i+4],raw[i+5]);}return new Float32Array(m.v);}
export function placeRoomPeople(layout,people){const free=[];const {width,depth}=boundsFor(layout),entry=entryFor(layout);for(let z=0;z<depth;z++)for(let x=0;x<width;x++){if(interiorWalkable(layout,x,z)&&!(x===entry.x&&z===entry.z)&&!stationAt(layout,{x,z}))free.push({x,z});}return people.slice(0,free.length).map((p,i)=>{const f=p.fixture&&layout.find(f=>f.id===p.fixture);if(f)free.sort((a,b)=>Math.hypot(a.x-f.station.x,a.z-f.station.z)-Math.hypot(b.x-f.station.x,b.z-f.station.z));return {...p,cell:free.shift()};});}

// Public residents occupy non-interactive cells close to the furniture matching their current activity.
export function placeRoomResidents(layout,residents){const available=placeRoomPeople(layout,Array.from({length:54},(_,i)=>({id:String(i)}))).map(p=>p.cell);return residents.slice(0,3).flatMap(n=>{const kinds=({work:['desk','counter','machine'],read:['desk','shelf'],eat:['table','counter','seat'],shop:['shelf'],talk:['table','seat']})[n.activity]||[];const f=layout.find(o=>kinds.includes(o.kind));const tx=f?f.x+f.w/2:4.5,tz=f?f.z+f.d/2:3;available.sort((a,b)=>Math.hypot(a.x+.5-tx,a.z+.5-tz)-Math.hypot(b.x+.5-tx,b.z+.5-tz));const cell=available.shift();return cell?[{...n,cell,yaw:Math.atan2(tx-cell.x-.5,tz-cell.z-.5)}]:[];});}
