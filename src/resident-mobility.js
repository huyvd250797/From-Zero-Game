import {COLLECTION,collectionModel} from './vehicle-collection.js';
// Deterministic pre-owned vehicles; no purchase or asset value is inferred from NPC cash.
import {distance} from './navigation.js';
export const MOBILITY_COST={...Object.fromEntries(Object.entries(COLLECTION).map(([id,p])=>[id,p.electric?105:p.segment==='D'?185:150])),VEH_BIKE:8,VEH_MOTO:55,VEH_CAR:150}; // simulated VND/world unit, includes energy/wear
export const MOBILITY_SPEED={...Object.fromEntries(Object.keys(COLLECTION).map(id=>[id,17])),VEH_BIKE:7,VEH_MOTO:13,VEH_CAR:17};
const hash=id=>[...id].reduce((h,c)=>(Math.imul(h,31)+c.charCodeAt(0))>>>0,0);
export function residentTier(n){const h=hash(n.id)%10;return n.age<18?'student':n.age>=30&&['work','service'].includes(n.behavior)&&h<=2?'affluent':h<=5?'middle':'budget';}
export function residentVehicle(n){const h=hash(n.id),tier=residentTier(n);if(tier==='affluent')return ['VEH_K5','VEH_FORTUNER','VEH_VF8','VEH_VF7','VEH_CIVIC'][Math.floor(h/10)%5];if(tier==='middle'&&n.age>=30&&h%3===0)return ['VEH_CITY','VEH_VIOS','VEH_K3','VEH_VF6'][Math.floor(h/10)%4];if(n.age>=18&&h%5!==0)return 'VEH_MOTO';if(h%3!==0)return 'VEH_BIKE';return null;}
export function residentMode(n,decision,home,work,leisure){const vehicle=residentVehicle(n);if(n.id==='NPC_AL_012')return 'walk';if(!decision||!vehicle||decision.plan==='save'||decision.needs.health<35)return 'walk';const length=decision.off?distance(home,leisure)*2:distance(home,work)+distance(work,leisure)+distance(leisure,home);const limit=vehicle==='VEH_BIKE'?18:vehicle==='VEH_MOTO'?28:35;return length>=limit&&decision.cash>=Math.max(100000,length*MOBILITY_COST[vehicle]*2)?vehicle:'walk';}
export const commuteExpense=schedule=>Math.ceil(schedule.reduce((sum,l)=>sum+(MOBILITY_COST[l.vehicle]||0)*(l.length||0),0));
