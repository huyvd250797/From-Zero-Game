import {record} from './master-data.js';
export const ECON_MONTH=30*1440;
const bound=(n,a,b)=>Math.max(a,Math.min(b,n));
const round=n=>Math.round(n*10000)/10000;
// Pure time-derived model: no random rerolls, no new save clock, bounded for 200 years.
const cache=new Map();
export function economyAt(minutes){
 const month=Math.max(0,Math.floor(minutes/ECON_MONTH));
 if(cache.has(month))return cache.get(month);
 const stages=['ECO_BOOM','ECO_INFLATION','ECO_RECESSION','ECO_RECOVERY'].map(record);
 let stage=record('ECO_STABLE'),phaseMonth=0;
 if(month>=stage.durationMonths){let n=(month-stage.durationMonths)%stages.reduce((sum,p)=>sum+p.durationMonths,0);for(const p of stages){if(n<p.durationMonths){stage=p;phaseMonth=n;break;}n-=p.durationMonths;}}
 const growth=1+Math.min(.65,month*.0025),cpi=round(growth*stage.priceMultiplier);
 const result=Object.freeze({month,phase:stage.id==='ECO_STABLE'?'stable':stage.id==='ECO_RECOVERY'?'recovery':stage.id,name:stage.name,description:stage.description,phaseMonth:phaseMonth+1,phaseLength:stage.durationMonths,cpi,wage:round(growth*stage.wageMultiplier),activity:stage.activity,unemployment:stage.unemployment,demand:stage.demand,supply:stage.supply,competition:stage.competition,rate:stage.rateBps/10000,property:round(growth*stage.property),vehicle:round(growth*stage.vehicle),inputs:round(cpi/stage.supply),fuel:round(cpi*stage.fuelMultiplier),stock:stage.activity});
 if(cache.size>=120)cache.delete(cache.keys().next().value);cache.set(month,result);return result;
}
const econ=s=>economyAt(typeof s==='number'?s:s?.minutes??0);
export const quote=(s,base,kind='cpi')=>Math.max(0,Math.round(base*(econ(s)[kind]??1)));
export const goodsPrice=(s,r)=>quote(s,r.price,r.category==='ingredient'?'inputs':'cpi');
export const assetPrice=(s,r)=>quote(s,r.price,r.id.startsWith('PROP_')?'property':r.id.startsWith('VEH_')?'vehicle':'cpi');
export const wageQuote=(s,j)=>quote(s,j.pay,'wage');
export const rateQuote=(s,p)=>round(bound(p.annualRate+econ(s).rate,.005,.35));
export const actionCash=(s,a)=>a.rule==='work'?quote(s,a.cash,'wage'):a.cash<0?-quote(s,-a.cash,a.rule==='buybike'?'vehicle':'cpi'):a.cash;
// Deterministic subset of vacancies closes during recession (some roles remain open).
export function vacancyOpen(s,id){const e=econ(s);if(e.phase!=='ECO_RECESSION')return true;let hash=0;for(const ch of id)hash=(hash*31+ch.charCodeAt(0))>>>0;return (hash+Math.floor(e.month/3))%4!==0;}
export const economyHistory=(s,count=12)=>{const m=econ(s).month;return Array.from({length:Math.min(count,m+1)},(_,i)=>economyAt((Math.max(0,m-count+1)+i)*ECON_MONTH));};
