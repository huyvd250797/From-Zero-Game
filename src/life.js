import {bankingTick} from './banking.js';
import {familyTick,familyHousingOK,familySize,childAge} from './family.js';
import {vehicleTick} from './transport.js';
import {housingTick} from './housing.js';
import {pruneDetails} from './personal-finance.js';
import {careerMidnight} from './career.js';
import {cashChange,pruneFinance} from './survival-state.js';
import {catalogs,config,record} from './master-data.js';
export const SPEEDS=Object.freeze([1,2,4,8,16]);
export const MAX_MINUTES=200*366*1440;
export const LIFE_FIELDS=Object.freeze(['energy','hunger','happy','hygiene','health','stress','hydration']);
export const LIFE_DEFAULTS=Object.freeze(Object.fromEntries(['hygiene','health','stress','hydration'].map(k=>[k,record('ATR_'+k.toUpperCase()).initial])));
const clamp=v=>Math.min(100,Math.max(0,v));
const start=Date.UTC(config.startYear,0,1);
const bikeMaintenance=record('MNT_BIKE');
const rent=record('PROP_ROOM').rentDaily;
export const day=s=>Math.floor(s.minutes/1440)+1;
export function calendar(s){const d=new Date(start+Math.floor(s.minutes/1440)*86400000);return {year:d.getUTCFullYear(),month:d.getUTCMonth()+1,date:d.getUTCDate(),age:config.age+d.getUTCFullYear()-config.startYear};}
export const hhmm=m=>`${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`;
export function dateLabel(s){const d=calendar(s);return `${String(d.date).padStart(2,'0')}/${String(d.month).padStart(2,'0')}/${d.year}`;}
export const phase=s=>{const h=s.minutes%1440/60;return h>=6&&h<8?'Bình minh':h>=8&&h<17?'Ban ngày':h>=17&&h<19?'Hoàng hôn':'Ban đêm'};
export function light(s){const h=s.minutes%1440/60;const t=h<5.5||h>=19.5?0:h<8?(h-5.5)/2.5:h<17?1:(19.5-h)/2.5;return [.42+.58*t,.50+.50*t,.72+.28*t];}
export function log(s,message){s.journal.unshift(`Ngày ${day(s)}: ${message}`);s.journal=s.journal.slice(0,20);}
export function lifeDefaults(s,renew=false){return {...LIFE_DEFAULTS,autoRent:renew,bikeDue:s.bike?s.minutes+bikeMaintenance.intervalDays*1440:0,maintenanceDebt:0,aidDay:0};}
const scheduleByPlace=new Map(catalogs.World_Schedules.map(r=>[record(r.building).legacyId,r]));
export const schedule=place=>scheduleByPlace.get(place);
export function isOpen(place,minutes,duration=0){const r=schedule(place);if(!r)return false;if(r.opens===0&&r.closes===1440)return true;const m=minutes%1440;return m>=r.opens&&m<r.closes&&m+duration<=r.closes;}
export function scheduleLabel(place){const r=schedule(place);return !r?'Chưa có lịch':r.opens===0&&r.closes===1440?'24/24':`${hhmm(r.opens)}–${hhmm(r.closes)}`;}
export function untilOpen(place,minutes){const r=schedule(place);if(!r||isOpen(place,minutes))return 0;const m=minutes%1440;return (r.opens-m+1440)%1440;}
export function settleDebt(s){if(s.maintenanceDebt>0&&s.cash>=s.maintenanceDebt){if(!cashChange(s,-s.maintenanceDebt,'EXP_TRANSPORT','Thanh toán bảo dưỡng xe đạp'))return;log(s,`Đã thanh toán phí bảo dưỡng ${s.maintenanceDebt.toLocaleString('vi-VN')}đ.`);s.maintenanceDebt=0;}}
const needKeys={ATR_ENERGY:'energy',ATR_HUNGER:'hunger',ATR_HYGIENE:'hygiene',ATR_HYDRATION:'hydration'};
export function advanceTime(s,minutes,{resting=false}={}){
 if(!Number.isSafeInteger(minutes)||minutes<0||minutes>10080)throw RangeError('Thời lượng không hợp lệ');
 const end=Math.min(MAX_MINUTES,s.minutes+minutes);
 while(s.minutes<end){s.minutes++;
  if(s.minutes%1440===0)careerMidnight(s);
  for(const r of catalogs.Needs_Rules){const k=needKeys[r.attribute];if(k&&s.minutes%r.intervalMinutes===0&&!(resting&&k==='energy'))s[k]=clamp(s[k]+r.delta);}
  if(s.minutes%60===0){const critical=['energy','hunger','hygiene','hydration'].filter(k=>s[k]<config.criticalNeedThreshold).length;if(critical){s.health=clamp(s.health-critical*2);s.happy=clamp(s.happy-critical);s.stress=clamp(s.stress+critical*2);}else if(s.hunger>=45&&s.energy>=40&&s.hygiene>=40){s.stress=clamp(s.stress-1);if(resting)s.health=clamp(s.health+1);}if(s.stress>=85){s.health=clamp(s.health-1);s.happy=clamp(s.happy-1);}}
  if(s.rentUntil&&s.minutes===s.rentUntil){if(s.autoRent&&s.cash>=rent&&cashChange(s,-rent,'EXP_RENT','Gia hạn phòng trọ')){s.rentUntil+=config.rentMinutes;log(s,`Gia hạn phòng trọ: −${rent.toLocaleString('vi-VN')}đ.`);}else{log(s,s.autoRent?'Không đủ tiền gia hạn phòng trọ. Bạn đã mất chỗ ở.':'Hết hạn phòng trọ.');}}
  housingTick(s);vehicleTick(s);familyTick(s);bankingTick(s);
  if(s.bike&&s.bikeDue>0&&s.minutes===s.bikeDue){s.bikeDue+=bikeMaintenance.intervalDays*1440;s.maintenanceDebt+=bikeMaintenance.cost;log(s,`Đến hạn bảo dưỡng xe đạp: ${bikeMaintenance.cost.toLocaleString('vi-VN')}đ.`);settleDebt(s);}
  if(s.minutes%1440===0){pruneFinance(s);pruneDetails(s);}
  if(s.minutes%1440===0&&calendar(s).month===1&&calendar(s).date===1)log(s,`Chúc mừng sinh nhật ${calendar(s).age} tuổi!`);
 }
 return s;
}
export function warnings(s){const list=[];if(s.health<config.criticalHealthThreshold)list.push('Sức khỏe nguy kịch – cần nghỉ hoặc điều trị, chưa thể làm việc.');for(const [k,n] of [['hunger','Đói'],['energy','Kiệt sức'],['hygiene','Vệ sinh thấp'],['hydration','Thiếu nước']])if(s[k]<config.criticalNeedThreshold)list.push(n+' – ảnh hưởng sức khỏe.');if(s.stress>=85)list.push('Căng thẳng cao.');if(s.maintenanceDebt)list.push('Có phí bảo dưỡng chưa thanh toán.');if(s.family?.debt)list.push('Có nợ sinh hoạt gia đình.');if(familySize(s)>1&&!familyHousingOK(s))list.push('Gia đình thiếu chỗ ở phù hợp.');if(s.family?.children.some(c=>childAge(s,c)<18&&c.care<25))list.push('Con cần được chăm sóc.');return list;}
// The accumulator is runtime-only; simulation speed affects the calendar, not physical movement.
export function tickClock(s,remainder,seconds,speed){if(!SPEEDS.includes(speed)||!Number.isFinite(seconds)||seconds<0||!Number.isFinite(remainder)||remainder<0)throw RangeError('Đồng hồ không hợp lệ');const total=remainder+seconds*speed/config.realSecondsPerMinute;const whole=Math.floor(total+1e-9);if(whole)advanceTime(s,whole);return Math.max(0,total-whole);}
