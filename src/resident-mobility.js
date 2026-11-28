import {COLLECTION,collectionModel} from './vehicle-collection.js';
// Deterministic pre-owned vehicles; no purchase or asset value is inferred from NPC cash.
import {distance} from './navigation.js';
export const MOBILITY_COST={...Object.fromEntries(Object.entries(COLLECTION).map(([id,p])=>[id,p.electric?105:p.segment==='D'?185:150])),VEH_BIKE:8,VEH_MOTO:55,VEH_CAR:150}; // simulated VND/world unit, includes energy/wear
export const MOBILITY_SPEED={...Object.fromEntries(Object.keys(COLLECTION).map(id=>[id,17])),VEH_BIKE:7,VEH_MOTO:13,VEH_CAR:17};
const hash=id=>[...id].reduce((h,c)=>(Math.imul(h,31)+c.charCodeAt(0))>>>0,0);
export function residentVehicle(n){const h=hash(n.id)%10;if(n.age>=30&&['work','service'].includes(n.behavior)&&h===0){const tier=n.age>=45?['VEH_K5','VEH_FORTUNER','VEH_VF8']:n.age>=35?['VEH_CIVIC','VEH_K3','VEH_VF7']:['VEH_CITY','VEH_VIOS','VEH_VF6'];return tier[Math.floor(hash(n.id)/10)%tier.length];}if(n.age>=18&&['work','service'].includes(n.behavior)&&h>=5)return 'VEH_MOTO';if(h===1||h===4||h>=6)return 'VEH_BIKE';return null;}
export function residentMode(n,decision,home,work,leisure){const vehicle=residentVehicle(n);if(!decision||!vehicle||decision.plan==='save'||decision.needs.health<35)return 'walk';const length=decision.off?distance(home,leisure)*2:distance(home,work)+distance(work,leisure)+distance(leisure,home);const limit=vehicle==='VEH_BIKE'?85:vehicle==='VEH_MOTO'?120:150;return length>=limit&&decision.cash>=Math.max(100000,length*MOBILITY_COST[vehicle]*2)?vehicle:'walk';}
export const commuteExpense=schedule=>Math.ceil(schedule.reduce((sum,l)=>sum+(MOBILITY_COST[l.vehicle]||0)*(l.length||0),0));
