import {validPaint,validFinish} from './vehicle-design.js';
import {conditionOf,conditionScore} from "./vehicle-damage.js";
import {quote,goodsPrice,assetPrice,wageQuote,rateQuote,actionCash,economyAt,vacancyOpen} from './economy.js';
import {catalogs,record} from './master-data.js';
import {walkable} from './world.js';
export const vehicleTypes=catalogs.Vehicles;
export const transportDefaults=()=>({transport:{bikePos:null,bikeYaw:0,vehicles:[],active:null,debt:0}});
export const activeVehicle=s=>s.transport?.vehicles.find(v=>v.id===s.transport.active)||null;
export const driving=s=>!!activeVehicle(s)||!!s.riding;
export const bikePosition=s=>s.transport?.bikePos||s.pos;
export const vehicleValue=(v,s)=>Math.floor(assetPrice(s,record(v.id))*Math.max(.45,1-v.distance/100000)*(.4+.6*conditionScore(conditionOf(s,v.id))/100));
export const vehicleSale=(v,s)=>Math.floor(vehicleValue(v,s)*.9);
export const vehicleDebt=s=>s.transport?.debt||0;
export const parkedVehicles=s=>[...(s.bike&&!s.riding?[{id:'VEH_BIKE',pos:bikePosition(s),yaw:s.transport?.bikeYaw||0}]:[]),...(s.transport?.vehicles||[]).filter(v=>v.id!==s.transport.active)];
const point=p=>p&&walkable(p.x,p.z), integer=n=>Number.isSafeInteger(n)&&n>=0;
export function validateTransport(s){const t=s.transport;if(!t||!Array.isArray(t.vehicles)||t.vehicles.length>5||!integer(t.debt)||!Number.isFinite(t.bikeYaw)||Math.abs(t.bikeYaw)>Math.PI*2||t.bikePos!==null&&!point(t.bikePos)||!s.bike&&t.bikePos!==null||t.active!==null&&!t.vehicles.some(v=>v.id===t.active)||t.active&&s.riding)return false;const ids=new Set();for(const v of t.vehicles){const r=vehicleTypes.find(r=>r.id===v.id&&r.id!=='VEH_BIKE');if(!r||v.color!==undefined&&!validPaint(v.color)||v.finish!==undefined&&!validFinish(v.finish)||ids.has(v.id)||!point(v.pos)||!Number.isFinite(v.yaw)||Math.abs(v.yaw)>Math.PI*2||!Number.isFinite(v.fuel)||v.fuel<0||v.fuel>r.capacity||!Number.isFinite(v.distance)||v.distance<0||v.distance>1e9||!integer(v.due)||v.due<=s.minutes)return false;ids.add(v.id);if(t.active===v.id&&Math.hypot(v.pos.x-s.pos.x,v.pos.z-s.pos.z)>.001)return false;}return true;}

// Cosmetic configuration only: no changes to performance or ownership.
export function setVehiclePaint(s,id,color,finish){const v=s.transport?.vehicles.find(v=>v.id===id);if(!v||!validPaint(color)||!validFinish(finish))return false;v.color=color.toLowerCase();v.finish=finish;return true;}
