import {places,roadNetwork,roadPoint,urbanPlan,walkable,SIZE} from './world.js';
import {oneWay,highwayPoint} from './road-standards.js';
import {roadSurfaces,pedestrianCrossings} from './junction-layout.js';
import {distance,segmentClear} from './navigation.js';
export const BUS_LINES=Object.freeze([
 {id:'AL01',name:'Trung tâm – Tây An Lạc',color:'#3489c2',headway:12,stops:['shop','office','mall','market','school','hospital']},
 {id:'AL02',name:'Trung tâm – Đông An Bình',color:'#d6a64c',headway:15,stops:['mall','east_market','tech_hub','new_factory','east_school','hospital']},
 {id:'AL03',name:'Nam An Lạc – Tân Phú',color:'#5caa80',headway:15,stops:['school','south_farm','phuan_market','river_park','tanphu_market','new_factory']}
].map(l=>Object.freeze({...l,stops:Object.freeze(l.stops)})));
export const BUS_STOP_IDS=Object.freeze([...new Set(BUS_LINES.flatMap(l=>l.stops))]);
let cache;
export function busStations(){if(cache)return cache;const out=[];for(const id of BUS_STOP_IDS){const place=places.find(p=>p.id===id),door={x:place.door[0],z:place.door[1]},candidates=[];for(const r of roadNetwork){const axis=r.axis==='x'?'z':'x',k0=Math.round(door[axis]);if(Math.abs((r.axis==='x'?door.x:door.z)-r.center)>65)continue;for(let k=Math.max(8,k0-45);k<=Math.min(SIZE-8,k0+45);k+=1){if(![k-4,k,k+4].every(t=>urbanPlan.active(r,t)&&!oneWay(r,t)))continue;const center=roadPoint(r,k);if(urbanPlan.roundabouts.some(a=>distance(a,center)<a.outer+8)||pedestrianCrossings().some(a=>distance(a,center)<6)||out.some(a=>distance(a.center,center)<7))continue;const platforms=[];let ok=true;for(const dir of [1,-1]){const side=(r.axis==='x'?-dir:dir),l=side*(r.width/2-r.width/r.lanes/2),pos=roadPoint(r,k,l),wait=roadPoint(r,k,side*(r.width/2+.8)),shelter=roadPoint(r,k,side*(r.width/2+1.3)),approach=roadPoint(r,k-dir*4,l),exit=roadPoint(r,k+dir*4,l);const footprint=[];for(const along of [-2.2,0,2.2])for(const off of [.55,1.65])footprint.push(roadPoint(r,k+along,side*(r.width/2+off)));if([pos,wait,shelter,approach,exit,...footprint].some(p=>!walkable(p.x,p.z)||highwayPoint(p))||[approach,pos,exit].some(p=>!roadSurfaces(p).some(s=>s.road.id===r.id)||roadSurfaces(p,.35).some(s=>s.road.id!==r.id))||footprint.some(p=>roadSurfaces(p,.05).length)||!segmentClear(wait,pos)||!segmentClear(approach,pos)||!segmentClear(pos,exit)){ok=false;break;}platforms.push({id:`${id}:${dir}`,station:id,dir,side,axis:r.axis,pos,wait,shelter,approach,exit,yaw:r.axis==='x'?(dir===1?0:Math.PI):(dir===1?Math.PI/2:-Math.PI/2)});}if(ok)candidates.push({id,name:place.name,door,center,roadId:r.id,platforms,lines:BUS_LINES.filter(l=>l.stops.includes(id)).map(l=>l.id),score:distance(door,center)});}}
 candidates.sort((a,b)=>a.score-b.score);if(!candidates.length)throw Error('No safe curbside stop: '+id);out.push(candidates[0]);}return cache=out;}
export const station=id=>busStations().find(s=>s.id===id);
export const platform=(id,dir)=>station(id).platforms.find(p=>p.dir===dir);

export function shelterNear(x,z){return busStations().some(s=>s.platforms.some(p=>Math.abs(p.shelter.x-x)<(p.axis==='x'?.9:2.2)&&Math.abs(p.shelter.z-z)<(p.axis==='x'?2.2:.9)));}
