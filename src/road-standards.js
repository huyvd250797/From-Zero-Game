// V3.6.0: compressed world scale; km/h is the in-game speedometer unit.
const carOnly=['VEH_CAR','VEH_LUX','VEH_EV','VEH_TRUCK','TAXI','BUS','taxi','bus'];
export const ROAD_CLASSES=Object.freeze({alley:{name:'Hẻm đi bộ',lanes:0,kmh:0},local:{name:'Đường nội bộ',lanes:2,kmh:30},street:{name:'Đường đô thị',lanes:2,kmh:50},avenue:{name:'Đại lộ',lanes:4,kmh:60},boulevard:{name:'Đại lộ lớn',lanes:6,kmh:60},shore:{name:'Đường ven sông',lanes:2,kmh:40},highway:{name:'Cao tốc An Lạc',lanes:4,kmh:90},ramp:{name:'Lối nhập / thoát cao tốc',lanes:2,kmh:40},roundabout:{name:'Vòng xoay',lanes:1,kmh:25}});
export const HIGHWAY={id:'AL_EXPRESS_EAST',x:379,z0:36,z1:248,width:7,entry:{x:368,z:20},exit:{x:368,z:264}};
const narrow=new Set(['ROD_X_48','ROD_X_80','ROD_X_272','ROD_Z_48','ROD_Z_176','ROD_Z_208']);
export const ONE_WAYS=Object.freeze([{id:'ROD_X_48',from:16,to:48,dir:1},{id:'ROD_Z_48',from:48,to:80,dir:1}]);
export function classifyAxis(r){const roadClass=r.kind==='avenue'?(r.width>=11?'boulevard':'avenue'):narrow.has(r.id)?'local':'street';return {...r,width:narrow.has(r.id)?5.5:r.width,roadClass,lanes:ROAD_CLASSES[roadClass].lanes,kmh:ROAD_CLASSES[roadClass].kmh};}
export function roadSpec(r){const roadClass=r.roadClass||({shore:'shore',arc:'street',diagonal:'street',highway:'highway',ramp:'ramp',avenue:'avenue',local:'local',roundabout:'roundabout'})[r.kind]||'street';return {...ROAD_CLASSES[roadClass],roadClass,width:r.width||0,lanes:r.lanes??ROAD_CLASSES[roadClass].lanes,kmh:r.kmh??ROAD_CLASSES[roadClass].kmh};}
export function oneWay(r,coord){return ONE_WAYS.find(o=>o.id===r.id&&coord>o.from+1e-6&&coord<o.to-1e-6)?.dir||0;}
export function allowedVehicle(spec,id='VEH_CAR'){return spec.roadClass==='alley'?id==='walk':spec.roadClass==='highway'||spec.roadClass==='ramp'?carOnly.includes(id):true;}
export function legacyHighwayCorridors(){const h=HIGHWAY,lerp=(a,b,t)=>a+(b-a)*t,curve=(a,b)=>Array.from({length:17},(_,i)=>{const t=i/16;return {x:lerp(a.x,b.x,t*t*(3-2*t)),z:lerp(a.z,b.z,t)}});const main=Array.from({length:107},(_,i)=>({x:h.x,z:lerp(h.z0,h.z1,i/106)}));return [{id:h.id,kind:'highway',roadClass:'highway',width:h.width,lanes:4,points:main,a:main[0],b:main.at(-1)},{id:'AL_RAMP_N',kind:'ramp',width:5.2,points:curve(h.entry,main[0]),a:h.entry,b:main[0]},{id:'AL_RAMP_S',kind:'ramp',width:5.2,points:curve(main.at(-1),h.exit),a:main.at(-1),b:h.exit}];}
// Closed perimeter motorway, with at-grade ramp junctions only at designated access roads.
export const RING_MIN=5,RING_MAX=379;
export const RING_ACCESS=Object.freeze([
 {id:'W_N',city:{x:16,z:80},ring:{x:5,z:80}}, {id:'W_S',city:{x:16,z:272},ring:{x:5,z:272}},
 {id:'E_N',city:{x:368,z:80},ring:{x:379,z:80}}, {id:'E_S',city:{x:368,z:272},ring:{x:379,z:272}},
 {id:'N_W',city:{x:80,z:16},ring:{x:80,z:5}}, {id:'N_E',city:{x:336,z:16},ring:{x:336,z:5}},
 {id:'S_W',city:{x:80,z:368},ring:{x:80,z:379}}, {id:'S_E',city:{x:304,z:368},ring:{x:304,z:379}}
]);
const interpolate=(a,b)=>{const n=Math.ceil(Math.hypot(b.x-a.x,b.z-a.z)/2);return Array.from({length:n+1},(_,i)=>({x:a.x+(b.x-a.x)*i/n,z:a.z+(b.z-a.z)*i/n}));};
export function highwayCorridors(){const corners=[{x:5,z:5},{x:379,z:5},{x:379,z:379},{x:5,z:379},{x:5,z:5}];const points=corners.slice(1).flatMap((b,i)=>interpolate(corners[i],b).slice(i?1:0));return [{id:HIGHWAY.id,kind:'highway',roadClass:'highway',width:7,lanes:4,points,a:points[0],b:points.at(-1)},...RING_ACCESS.map(r=>({id:'AL_RAMP_'+r.id,kind:'ramp',width:5.2,points:interpolate(r.city,r.ring),a:r.city,b:r.ring}))];}
export function highwayPoint(p){return p.x<8.5||p.x>375.5||p.z<8.5||p.z>375.5;}
export function highwaySegment(a,b){return highwayPoint(a)||highwayPoint(b);}
export const restrictedActor=id=>!carOnly.includes(id);
export function accessSegment(a,b,id){if(!highwaySegment(a,b))return true;if(restrictedActor(id))return false;if(highwayPoint(a)===highwayPoint(b))return true;const dx=b.x-a.x,dz=b.z-a.z;return RING_ACCESS.some(r=>{const vertical=r.city.x===r.ring.x;const bound=vertical?(r.ring.z===5?8.5:375.5):(r.ring.x===5?8.5:375.5);const t=vertical?(bound-a.z)/dz:(bound-a.x)/dx;return t>=0&&t<=1&&Math.abs((vertical?a.x+dx*t:a.z+dz*t)-(vertical?r.ring.x:r.ring.z))<=3;});}
export function laneOffsets(r,dir,coord){const s=roadSpec(r),one=oneWay(r,coord);if(one&&one!==dir)return [];const n=one?s.lanes:Math.max(1,Math.floor(s.lanes/2)),w=s.width/Math.max(1,s.lanes);return Array.from({length:n},(_,i)=>one?(-s.width/2+w*(i+.5)):w*(i+.5));}
