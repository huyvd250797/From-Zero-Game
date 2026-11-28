// Deterministic annual city cohorts and monthly shocks. No new save data or wall-clock RNG.
import {catalogs,record} from './master-data.js';
export const CITY_MONTH=43200, CITY_YEAR=12*CITY_MONTH;
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
const round=n=>Math.round(n*10000)/10000;
const hash=s=>[...s].reduce((h,c)=>(Math.imul(h^c.charCodeAt(0),16777619)>>>0),2166136261);
export const cityMonth=m=>clamp(Math.floor((Number.isFinite(m)?m:0)/CITY_MONTH),0,2440);
export const cityYear=m=>Math.floor(cityMonth(m)/12);
const districts=catalogs.Districts, employers=catalogs.Employers;
const byPlace=new Map(catalogs.Building_Instances.filter(b=>b.legacyId).map(b=>[b.legacyId,b]));
const byDistrict=new Map(districts.map(d=>[d.id,{employers:employers.filter(e=>record(e.building).district===d.id).length,named:catalogs.NPC_Master.filter(n=>n.homeDistrict===d.id).length,buildings:catalogs.Building_Instances.filter(b=>b.district===d.id&&b.interactive).length}]));
const base=districts.map(d=>{const a=byDistrict.get(d.id);return Object.freeze({id:d.id,name:d.name,population:5,opened:0,closed:0,establishments:Math.max(2,a.employers+a.buildings),named:a.named,development:100,demand:1,competition:1,property:1});});
const history=[Object.freeze(base)];
const events=[{id:'supply',name:'Gián đoạn nguồn cung',description:'Giá nguyên liệu và sinh hoạt tăng, sức mua giảm.',cpi:1.035,supply:.94,demand:.96,activity:.97,property:.99,tech:.96,bank:.98},{id:'investment',name:'Làn sóng đầu tư',description:'Sức mua và giá trị tài sản tăng.',cpi:1.01,supply:1.02,demand:1.07,activity:1.04,property:1.05,tech:1.08,bank:1.04},{id:'credit',name:'Thị trường tín dụng thận trọng',description:'Đầu tư và nhu cầu suy yếu.',cpi:1,supply:1,demand:.95,activity:.96,property:.96,tech:.95,bank:.92},{id:'productivity',name:'Cải thiện năng suất',description:'Nguồn cung tăng và giá hàng hóa dịu lại.',cpi:.985,supply:1.06,demand:1.025,activity:1.03,property:1.01,tech:1.06,bank:1.025}].map(Object.freeze);
const quiet=Object.freeze({id:'none',name:'Không có biến cố đặc biệt',description:'Thị trường vận động theo chu kỳ cơ sở.',cpi:1,supply:1,demand:1,activity:1,property:1,tech:1,bank:1});
export function economicEvent(minutes){const m=cityMonth(minutes);return m>=12&&m%6<2?events[hash('event:'+Math.floor(m/6))%events.length]:quiet;}
// Annual flows reconcile exactly. These are synthetic neighborhood businesses, not named employers or physical buildings.
function nextYear(previous,year){const event=economicEvent(year*CITY_YEAR);return Object.freeze(previous.map(d=>{const h=hash(d.id+':'+year),p=clamp(d.population+(h%5===0?-1:h%3===0?1:0)+(event.id==='investment'?1:0),3,9);const opened=Math.min(2+(h%3===0?1:0),Math.max(0,30-d.establishments));const closed=Math.min(d.establishments-1,h%4+(event.id==='credit'?1:0));const establishments=d.establishments+opened-closed;const development=clamp(d.development+(p-d.population)*2+(opened-closed)*2+(h%3-1),65,150);return Object.freeze({...d,population:p,opened,closed,establishments,development,demand:round(clamp(1+(p-5)*.045+(development-100)*.002,.8,1.3)),competition:round(clamp(1+(establishments-base.find(b=>b.id===d.id).establishments)*.025,.75,1.35)),property:round(clamp(1+(development-100)*.003,.85,1.15))});}));}
export function cityDistricts(minutes){const year=cityYear(minutes);while(history.length<=year)history.push(nextYear(history.at(-1),history.length));return history[year];}
export function districtMarket(minutes,id){return cityDistricts(minutes).find(d=>d.id===id)||null;}
export function localBusinessFactor(minutes,building,branches=[]){const factor=b=>{const d=districtMarket(minutes,b?.district);return d?d.demand/d.competition:1;};return (factor(record(building))+.6*branches.reduce((sum,id)=>sum+factor(byPlace.get(id)),0))/(1+.6*branches.length);}
export function localPropertyFactor(minutes,building){return districtMarket(minutes,record(building)?.district)?.property??1;}
export function employerStatus(minutes,id){const e=record(id),year=cityYear(minutes);if(!e||!e.jobs)return 'unknown';if(!year)return 'normal';const d=districtMarket(minutes,record(e.building).district),h=hash(id+':'+year)%100;if(h<10+(d.development<90?12:0))return 'paused';if(h<35)return 'restructuring';if(h>72)return 'expanding';return 'normal';}
export const employerLabels={normal:'Ổn định',paused:'Tạm ngừng tuyển',restructuring:'Tái cơ cấu',expanding:'Mở rộng',unknown:'Không xác định'};
export function employerHiring(minutes,id){const [employer]=id.split(':');const status=employerStatus(minutes,employer);return status!=='paused'&&(status!=='restructuring'||hash(id+':'+cityYear(minutes))%3!==0);}
export const scheduledPopulation=d=>d.population+5;
export function cityStatistics(minutes){const rows=cityDistricts(minutes),year=cityYear(minutes),statuses=employers.map(e=>employerStatus(minutes,e.id));return {year,ambient:rows.reduce((n,d)=>n+scheduledPopulation(d),0),named:catalogs.NPC_Master.length,establishments:rows.reduce((n,d)=>n+d.establishments,0),opened:rows.reduce((n,d)=>n+d.opened,0),closed:rows.reduce((n,d)=>n+d.closed,0),development:round(rows.reduce((n,d)=>n+d.development,0)/rows.length),paused:statuses.filter(x=>x==='paused').length,restructuring:statuses.filter(x=>x==='restructuring').length,expanding:statuses.filter(x=>x==='expanding').length};}
export function cityHistory(minutes,count=12){const y=cityYear(minutes),n=clamp(Math.floor(count)||1,1,204);return Array.from({length:Math.min(n,y+1)},(_,i)=>cityStatistics((Math.max(0,y-n+1)+i)*CITY_YEAR));}
export function sectorMultiplier(minutes,id){const e=economicEvent(minutes);return id==='INV_TECH'?e.tech:id==='INV_BANK'?e.bank:1;}
