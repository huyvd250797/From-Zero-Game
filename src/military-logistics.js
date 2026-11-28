import {urbanRoadRoute,smoothRampTurns} from './urban-routing.js';
import {segmentClear,distance} from './navigation.js';
import {accessSegment} from './road-standards.js';
// Short fictional supply shuttle; normal traffic rules, no priority or weapons.
export const MILITARY_TRUCK=Object.freeze({key:'MILITARY:LOGISTICS-01',id:'VEH_TRUCK',model:'Xe vận tải quân sự',color:'#65734a',service:'military',priority:false});
let cache;
export function militaryRoute(){if(cache)return cache;const origin={x:100,z:189},turn={x:112,z:192},out=urbanRoadRoute(origin,turn,'VEH_TRUCK'),back=urbanRoadRoute(turn,origin,'VEH_TRUCK');if(!out||!back)throw Error('Missing military supply route');const pts=[origin,...smoothRampTurns(origin,[...out.path,...back.path],'VEH_TRUCK',true)].filter((p,i,a)=>!i||distance(p,a[i-1])>.001);if(!pts.every((p,i)=>!i||segmentClear(pts[i-1],p)&&accessSegment(pts[i-1],p,'VEH_TRUCK')))throw Error('Invalid military supply route');const lengths=[0];for(let i=1;i<pts.length;i++)lengths.push(lengths.at(-1)+distance(pts[i-1],pts[i]));return cache={pts,lengths,length:lengths.at(-1),ring:false};}
