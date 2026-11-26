// Presentation only: derives calendar, planning and inventory from existing save.
import {calendar,dateLabel} from './life.js';
import {scheduledDay,currentJob} from './career.js';
import {retired,ended} from './aging-state.js';
export const WEEKDAYS=Object.freeze(['Chủ nhật','Thứ Hai','Thứ Ba','Thứ Tư','Thứ Năm','Thứ Sáu','Thứ Bảy']);
export function weekday(s){const d=calendar(s);return WEEKDAYS[new Date(Date.UTC(d.year,d.month-1,d.date)).getUTCDay()];}
export function dayPlan(s,offset=0){const minutes=(Math.floor(s.minutes/1440)+offset)*1440, day={...s,minutes};const job=currentJob(s),working=!!job&&!retired(s)&&!ended(s)&&scheduledDay(s,minutes);return {weekday:weekday(day),date:dateLabel(day),working,label:working?'Ca làm 08:00 · nhận ca đến 09:00':retired(s)?'Đã nghỉ hưu':job?'Không có ca theo lịch':'Chưa có hợp đồng lao động'};}
export const NEEDS=Object.freeze([['energy','Năng lượng','⚡'],['hunger','Độ no','🍴'],['hydration','Đủ nước','💧'],['health','Sức khỏe','✚'],['hygiene','Vệ sinh','◈'],['happy','Hạnh phúc','♥'],['stress','Căng thẳng','!']]);
export function needLevel(key,value){return key==='stress'?value>=80?'critical':value>=60?'warn':'ok':value<=20?'critical':value<=40?'warn':'ok';}
export function inventoryCategory(g){return g.id.startsWith('FOOD_')?'food':g.category==='ingredient'?'ingredient':g.useMinutes?'consumable':'durable';}
export function inventoryRows(goods,inventory,filter='all'){return goods.filter(g=>inventory[g.id]>0&&(filter==='all'||inventoryCategory(g)===filter));}
export class NotificationLog{constructor(limit=40){this.limit=limit;this.rows=[];this.unread=0;} add(message,time){message=String(message);if(!message.trim()||this.rows[0]?.message===message&&this.rows[0]?.time===time)return false;this.rows.unshift({message,time});this.rows.length=Math.min(this.rows.length,this.limit);this.unread=Math.min(this.rows.length,this.unread+1);return true;} read(){this.unread=0;} clear(){this.rows=[];this.unread=0;}}
// Preserve the game's Pointer Events camera gestures; only cancel browser defaults.
export function installPageZoomGuard(doc= document){const prevent=e=>{if(e.cancelable)e.preventDefault();};const multi=e=>{if(e.touches?.length>1)prevent(e);};const wheel=e=>{if(e.ctrlKey||e.metaKey)prevent(e);};const key=e=>{if((e.ctrlKey||e.metaKey)&&['+','=','-','0'].includes(e.key))prevent(e);};const events=[['gesturestart',prevent],['gesturechange',prevent],['gestureend',prevent],['touchstart',multi],['touchmove',multi],['wheel',wheel],['keydown',key]];for(const [name,fn] of events)doc.addEventListener(name,fn,{capture:true,passive:false});return ()=>{for(const [name,fn] of events)doc.removeEventListener(name,fn,true);};}
