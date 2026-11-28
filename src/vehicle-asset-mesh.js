import {COLLECTION} from './vehicle-collection.js';
import {authorCoachwork} from './vehicle-coachwork.js';
// Shared canonical asset source: curved coachwork, original reference-inspired models.
const cache=new Map();
export function realisticCoachwork(id,lod=1){const key=id+':'+lod,p=COLLECTION[id];if(!p)return null;if(!cache.has(key)){const groups={};authorCoachwork({add(role,...pts){(groups[role]??=[]).push(...pts.flat().map(x=>Math.round(x*100000)/100000));}},id,p.w,p.d,lod,true);cache.set(key,groups);}return cache.get(key);}
export const vehicleAssetURL=(id,lod)=>COLLECTION[id]&&[0,1,2].includes(lod)?new URL(`./assets/vehicles/${id.toLowerCase()}-lod${lod}.glb`,import.meta.url):null;
export function assetBudget(mobile,quality,pixels=Infinity){return mobile?(pixels<=430000?0:1):quality===0?1:quality===1?2:4;}
// Do not replace damage or service-specific graphics with a pristine static body.
export function canUseVehicleAsset(v){return !!COLLECTION[v.id]&&!v.service&&(!v.condition||((v.condition.body??100)>=88&&(v.condition.glass??100)>=75&&(v.condition.lights??100)>=45));}
