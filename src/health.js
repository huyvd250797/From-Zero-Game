import {incarcerated} from './recovery-state.js';
import {catalogs,record} from './master-data.js';
import {places} from './world.js';
import {livingQuote} from './economy.js';
import {cashChange} from './survival-state.js';
import {advanceTime,isOpen,MAX_MINUTES,log} from './life.js';
import {recordHabit,healthNote} from './health-state.js';
const cap=n=>Math.max(0,Math.min(100,n));
const near=(s,id)=>{const p=places.find(x=>x.id===id);return !!p&&Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])<=2.5;};
const day=s=>Math.floor(s.minutes/1440)+1;
const check=(s,place,time,cost)=>!near(s,place)?'Cần đến đúng địa điểm.':!isOpen(place,s.minutes,time)?'Ngoài giờ phục vụ hoặc không đủ thời gian.':s.minutes+time>MAX_MINUTES||s.minutes%1440+time>=1440?'Không đủ thời gian trong ngày.':s.cash<cost?'Không đủ tiền mặt.':'';
export const habitActivities=Object.freeze([{id:'HAB_PARTY',place:'mall',minutes:180,cost:600000,happy:20,stress:5},{id:'HAB_DRINK',place:'cafe',minutes:60,cost:150000,happy:6,stress:3},{id:'HAB_SMOKE',place:'shop',minutes:10,cost:30000,happy:0,stress:3},{id:'HAB_GAMBLE',place:'mall',minutes:60,cost:100000,happy:-5,stress:8}]);
export const habitCost=(s,id)=>livingQuote(s,habitActivities.find(a=>a.id===id)?.cost||0);
export function habitReason(s,id){if(incarcerated(s))return 'Đang chấp hành án.';const a=habitActivities.find(a=>a.id===id);if(!a)return 'Hoạt động không tồn tại.';if(s.wellness.daily.day===day(s)&&s.wellness.daily.used.includes(id))return 'Đã ghi nhận hôm nay.';return check(s,a.place,a.minutes,habitCost(s,id));}
export function habitActivity(s,id){if(habitReason(s,id))return false;const a=habitActivities.find(a=>a.id===id),h=record(id);if(!cashChange(s,-habitCost(s,id),'EXP_FUN',h.name))return false;advanceTime(s,a.minutes);recordHabit(s,id);s.health=cap(s.health+h.healthDelta);s.happy=cap(s.happy+a.happy);s.stress=cap(s.stress+a.stress);s.wellness.discipline=cap(s.wellness.discipline+h.disciplineDelta);healthNote(s,`Thói quen: ${h.name}.`);log(s,`Ghi nhận ${h.name.toLowerCase()} và hậu quả.`);return true;}
export const treatmentDays=id=>id==='DIS_COLD'?1:id==='DIS_FATIGUE'?3:7;
export function treatmentReason(s,id){if(incarcerated(s))return 'Đang chấp hành án.';const t=catalogs.Treatments.find(x=>x.id===id),c=s.wellness.conditions.find(x=>x.id===t?.disease);if(!c)return 'Không có tình trạng cần điều trị tương ứng.';if(c.treated)return 'Đang trong thời gian phục hồi.';if(c.id!=='DIS_CHRONIC'&&c.until<=s.minutes+60)return 'Đợt theo dõi sắp kết thúc; nghỉ ngơi và kiểm tra lại.';return check(s,c.id==='DIS_CHRONIC'?'hospital':'clinic',60,livingQuote(s,t.cost));}
export function treat(s,id){if(treatmentReason(s,id))return false;const t=record(id),c=s.wellness.conditions.find(x=>x.id===t.disease);if(!cashChange(s,-livingQuote(s,t.cost),'EXP_HEALTH',t.name))return false;advanceTime(s,60,{resting:true});c.treated=true;c.until=s.minutes+treatmentDays(c.id)*1440;s.health=cap(s.health+t.healthGain);healthNote(s,`Bắt đầu đợt phục hồi: ${record(c.id).name}.`);log(s,t.name+' – đang phục hồi.');return true;}
export const supportOptions=Object.freeze([{id:'clinic',name:'Tư vấn tại phòng khám',place:'clinic',minutes:60,cost:50000},{id:'park',name:'Hỗ trợ cộng đồng',place:'park',minutes:60,cost:0}]);
export function supportReason(s,id){if(incarcerated(s))return 'Đang chấp hành án.';const a=supportOptions.find(x=>x.id===id);if(!a)return 'Không tìm thấy dịch vụ.';if(s.wellness.daily.day===day(s)&&s.wellness.daily.support)return 'Đã nhận hỗ trợ hôm nay.';return check(s,a.place,a.minutes,livingQuote(s,a.cost));}
export function support(s,id){if(supportReason(s,id))return false;const a=supportOptions.find(x=>x.id===id);if(a.cost&&!cashChange(s,-livingQuote(s,a.cost),'EXP_HEALTH',a.name))return false;advanceTime(s,a.minutes,{resting:true});s.wellness.daily.support=true;s.wellness.mental=cap(s.wellness.mental+8);s.stress=cap(s.stress-12);s.wellness.daily.rest=Math.min(1440,s.wellness.daily.rest+60);healthNote(s,a.name+' – tăng hiệu quả phục hồi nếu tránh thói quen có hại hôm nay.');return true;}
