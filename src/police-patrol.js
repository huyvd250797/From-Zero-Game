import {places} from './world.js';
import {urbanRoadRoute,smoothRampTurns} from './urban-routing.js';
import {segmentClear,distance} from './navigation.js';
import {accessSegment} from './road-standards.js';
// Fictional An Lạc units. Reuse canonical chassis IDs for collision and routing.
export const POLICE_UNITS=Object.freeze([
 Object.freeze({key:'POLICE:CSGT-01',id:'VEH_MOTO',model:'Honda CB250P',name:'CSGT 01',color:'#f4f3ea',origin:{x:125,z:105},waypoints:[[112,112],[112,80],[144,80],[144,112]]}),
 Object.freeze({key:'POLICE:AN-02',id:'VEH_LUX',model:'VinFast Lux A2.0',name:'Tuần tra 02',color:'#eef2ef',origin:{x:131,z:105},waypoints:[[144,112],[144,144],[112,144],[112,112]]})
]);
export const policeStation=()=>places.find(p=>p.id==='police');
export function policeShift(minute){const h=((Math.floor(minute/60)%24)+24)%24;return h>=6&&h<14?{id:'A',label:'06:00–14:00'}:h>=14&&h<22?{id:'B',label:'14:00–22:00'}:{id:'C',label:'22:00–06:00'};}
let cache;
export function policeRoutes(){if(cache)return cache;const result=POLICE_UNITS.map(u=>{const stops=[u.origin,...u.waypoints.map(([x,z])=>({x,z})),u.origin],pts=[stops[0]];for(let i=1;i<stops.length;i++){const r=urbanRoadRoute(stops[i-1],stops[i],u.id);if(!r)throw Error('Missing patrol route '+u.key);pts.push(...r.path);}const path=[pts[0],...smoothRampTurns(pts[0],pts.slice(1),u.id,true)].filter((p,i,a)=>!i||distance(a[i-1],p)>.001);if(!path.every((p,i)=>!i||segmentClear(path[i-1],p)&&accessSegment(path[i-1],p,u.id)))throw Error('Invalid patrol route '+u.key);const lengths=[0];for(let i=1;i<path.length;i++)lengths.push(lengths.at(-1)+distance(path[i-1],path[i]));return {unit:u,pts:path,lengths,length:lengths.at(-1),ring:false};});cache=result;return cache;}
export function patrolRoster(minute,actors=[]){const shift=policeShift(minute);return POLICE_UNITS.map(u=>{const a=actors.find(v=>v.key===u.key);return {...u,shift:shift.label,officer:u.name+' · Ca '+shift.id,status:a?(a.speed>.3?'Đang tuần tra':'Đang dừng'):'Chưa có dữ liệu trực tiếp'};});}
