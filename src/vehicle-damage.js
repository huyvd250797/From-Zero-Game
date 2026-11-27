import {VEHICLE_DYNAMICS} from './driving.js';
import {record} from './master-data.js';
import {clamp} from './world.js';
export const DAMAGE_PARTS=['body','engine','wheels','glass','lights'];
export const freshCondition=()=>Object.fromEntries(DAMAGE_PARTS.map(k=>[k,100]));
export const damageDefaults=()=>({vehicleDamage:{conditions:{},history:[]}});
const validId=id=>Object.hasOwn(VEHICLE_DYNAMICS,id)&&id!=='BUS'&&id!=='TAXI';
export const conditionOf=(s,id)=>s?.vehicleDamage?.conditions?.[id]||freshCondition();
export const conditionScore=c=>Math.round(DAMAGE_PARTS.reduce((a,k)=>a+c[k],0)/DAMAGE_PARTS.length);
export const broken=c=>c.engine<=8||c.wheels<=5||c.body<=3;
export function validateDamage(s){const d=s.vehicleDamage;return !!d&&!!d.conditions&&typeof d.conditions==='object'&&!Array.isArray(d.conditions)&&Object.entries(d.conditions).every(([id,c])=>validId(id)&&c&&Object.keys(c).length===DAMAGE_PARTS.length&&DAMAGE_PARTS.every(k=>Number.isInteger(c[k])&&c[k]>=0&&c[k]<=100))&&Array.isArray(d.history)&&d.history.length<=60&&d.history.every((h,i)=>h&&validId(h.id)&&Number.isInteger(h.at)&&h.at>=0&&h.at<=s.minutes&&(!i||h.at<=d.history[i-1].at)&&['vehicle','pedestrian','object'].includes(h.kind)&&typeof h.target==='string'&&h.target.length<=100&&Number.isFinite(h.energy)&&h.energy>=0&&Number.isInteger(h.damage)&&h.damage>=0&&h.damage<=100);}
export function damagedProfile(profile,c){if(broken(c))return {...profile,max:0,accel:0};const motor=.35+.65*c.engine/100,grip=.4+.6*c.wheels/100;return {...profile,max:profile.max*Math.min(motor,.45+.55*c.body/100),accel:profile.accel*motor,brake:profile.brake*grip,grip:profile.grip*grip,turn:profile.turn*grip};}
export const impactEnergy=(id,speed,otherId,otherSpeed=0)=>{const a=VEHICLE_DYNAMICS[id]?.mass||1450,b=otherId==='pedestrian'?75:VEHICLE_DYNAMICS[otherId]?.mass||Infinity,m=Number.isFinite(b)?a*b/(a+b):a;return .5*m*Math.max(0,speed-otherSpeed)**2;};
export function applyImpact(s,id,{kind,target,energy,side='front'}){if(!validId(id)||!Number.isFinite(energy)||energy<120)return 0;s.vehicleDamage??=damageDefaults().vehicleDamage;const c={...conditionOf(s,id)},damage=clamp(Math.round(Math.sqrt(energy/95)),1,100),f=side==='front'?1:.42;c.body=Math.max(0,c.body-damage);c.engine=Math.max(0,c.engine-Math.round(damage*f*.8));c.wheels=Math.max(0,c.wheels-Math.round(damage*(side==='side'?.8:.27)));c.glass=Math.max(0,c.glass-Math.round(damage*.55));c.lights=Math.max(0,c.lights-Math.round(damage*.9));s.vehicleDamage.conditions[id]=c;s.vehicleDamage.history.unshift({id,at:s.minutes,kind,target:String(target).slice(0,100),energy:Math.round(energy),damage});s.vehicleDamage.history=s.vehicleDamage.history.slice(0,60);if(Number.isFinite(s.health))s.health=Math.max(0,s.health-Math.round(damage*.18));return damage;}
export function wearCondition(s,id){const prior=conditionOf(s,id);if(prior.engine===100&&prior.wheels===100)return;const c={...prior};c.engine=Math.min(100,c.engine+3);c.wheels=Math.min(100,c.wheels+4);s.vehicleDamage??=damageDefaults().vehicleDamage;s.vehicleDamage.conditions[id]=c;}
export function repairBase(s,id){const c=conditionOf(s,id),r=record(id);return Math.ceil((r.price||r.maintenanceMonthly*20||1000000)*DAMAGE_PARTS.reduce((sum,k)=>sum+(100-c[k]),0)/500*.12);}
export function resetCondition(s,id){if(s.vehicleDamage)delete s.vehicleDamage.conditions[id];}
