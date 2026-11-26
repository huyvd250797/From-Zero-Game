import {economicEvent,employerHiring,localPropertyFactor} from './city-evolution.js';
import {expenseFactor,incomeFactor} from './difficulty.js';
import {record} from './master-data.js';
export const ECON_MONTH=30*1440;
const bound=(n,a,b)=>Math.max(a,Math.min(b,n));
const round=n=>Math.round(n*10000)/10000;
// Pure time-derived model: no random rerolls, no new save clock, bounded for 200 years.
const cache=new Map();
export function legacyEconomyAt(minutes){
 const month=Math.max(0,Math.floor(minutes/ECON_MONTH));
 if(cache.has(month))return cache.get(month);
 const stages=['ECO_BOOM','ECO_INFLATION','ECO_RECESSION','ECO_RECOVERY'].map(record);
 let stage=record('ECO_STABLE'),phaseMonth=0;
 if(month>=stage.durationMonths){let n=(month-stage.durationMonths)%stages.reduce((sum,p)=>sum+p.durationMonths,0);for(const p of stages){if(n<p.durationMonths){stage=p;phaseMonth=n;break;}n-=p.durationMonths;}}
 const growth=1+Math.min(.65,month*.0025),cpi=round(growth*stage.priceMultiplier);
 const result=Object.freeze({month,phase:stage.id==='ECO_STABLE'?'stable':stage.id==='ECO_RECOVERY'?'recovery':stage.id,name:stage.name,description:stage.description,phaseMonth:phaseMonth+1,phaseLength:stage.durationMonths,cpi,wage:round(growth*stage.wageMultiplier),activity:stage.activity,unemployment:stage.unemployment,demand:stage.demand,supply:stage.supply,competition:stage.competition,rate:stage.rateBps/10000,property:round(growth*stage.property),vehicle:round(growth*stage.vehicle),inputs:round(cpi/stage.supply),fuel:round(cpi*stage.fuelMultiplier),stock:stage.activity});
 if(cache.size>=120)cache.delete(cache.keys().next().value);cache.set(month,result);return result;
}
const evolvedCache=new Map();
export function economyAt(minutes){const old=legacyEconomyAt(minutes);if(evolvedCache.has(old.month))return evolvedCache.get(old.month);const event=economicEvent(minutes);const cpi=round(bound(old.cpi*event.cpi,1,2)),supply=round(old.supply*event.supply);const e=Object.freeze({...old,cpi,supply,demand:round(old.demand*event.demand),activity:round(old.activity*event.activity),unemployment:round(bound(old.unemployment+(1-event.activity)*25,2,18)),property:round(old.property*event.property),inputs:event.id==='none'?old.inputs:round(cpi/supply),fuel:round(old.fuel*cpi/old.cpi),stock:round(old.stock*event.activity),event:event.id,eventName:event.name});if(evolvedCache.size>=120)evolvedCache.delete(evolvedCache.keys().next().value);evolvedCache.set(old.month,e);return e;}
export function inflationYoY(minutes){const e=economyAt(minutes);return e.month<12?null:round(e.cpi/economyAt((e.month-12)*ECON_MONTH).cpi-1);}
const econ=s=>economyAt(typeof s==='number'?s:s?.minutes??0);
export const quote=(s,base,kind='cpi')=>Math.max(0,Math.round(base*(econ(s)[kind]??1)));
export const livingQuote=(s,base,kind='cpi')=>Math.max(0,Math.round(quote(s,base,kind)*expenseFactor(s)));
export const goodsPrice=(s,r)=>r.id.startsWith('FOOD_')||r.category==='ingredient'||r.category==='consumable'?livingQuote(s,r.price,r.category==='ingredient'?'inputs':'cpi'):quote(s,r.price);
const assetKind=r=>r.id.startsWith('PROP_')?'property':r.id.startsWith('VEH_')?'vehicle':'cpi';
export const legacyAssetPrice=(s,r)=>Math.max(0,Math.round(r.price*legacyEconomyAt(typeof s==='number'?s:s?.minutes??0)[assetKind(r)]));
export const assetPrice=(s,r)=>Math.max(0,Math.round(quote(s,r.price,assetKind(r))*(r.id.startsWith('PROP_')?localPropertyFactor(typeof s==='number'?s:s?.minutes??0,r.building):1)));
export const wageQuote=(s,j)=>Math.round(quote(s,j.pay,'wage')*incomeFactor(s));
export const rateQuote=(s,p)=>round(bound(p.annualRate+econ(s).rate,.005,.35));
export const actionCash=(s,a)=>a.rule==='work'?Math.round(quote(s,a.cash,'wage')*incomeFactor(s)):a.cash<0?-(a.rule==='buybike'?quote(s,-a.cash,'vehicle'):livingQuote(s,-a.cash)):a.cash;
// Deterministic subset of vacancies closes during recession (some roles remain open).
export function vacancyOpen(s,id){const e=econ(s);if(!employerHiring(typeof s==='number'?s:s?.minutes??0,id))return false;if(e.phase!=='ECO_RECESSION')return true;let hash=0;for(const ch of id)hash=(hash*31+ch.charCodeAt(0))>>>0;return (hash+Math.floor(e.month/3))%4!==0;}
export const economyHistory=(s,count=12)=>{const m=econ(s).month;return Array.from({length:Math.min(count,m+1)},(_,i)=>economyAt((Math.max(0,m-count+1)+i)*ECON_MONTH));};
