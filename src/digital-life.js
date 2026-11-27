// Local in-game smartphone. No external accounts, network, or AI service.
import {catalogs} from './master-data.js';
import {npcAt,trust} from './social.js';
import {retired,ended} from './aging-state.js';
import {incarcerated} from './recovery-state.js';
import {driving} from './transport-state.js';
import {dayPlan} from './hud.js';
import {currentJob,monthlySalary} from './career.js';
import {accountAvailable,balanceSheet} from './personal-finance.js';
import {importantEvent} from './important-events.js';
export const NOTICE_LIMIT=80, MESSAGE_LIMIT=80;
export const NOTICE_FILTERS=Object.freeze({all:'Tất cả',unread:'Chưa đọc',warning:'Cảnh báo',life:'Cuộc đời',economy:'Kinh tế'});
export const MESSAGE_TOPICS=Object.freeze({checkin:'Bạn khỏe không?',location:'Bạn đang ở đâu?',schedule:'Hôm nay bạn làm gì?'});
const ids=new Set(catalogs.NPC_Master.map(n=>n.id));
const kinds=['warning','life','economy'];
const validTime=(v,m)=>Number.isSafeInteger(v)&&v>=0&&v<=m;
const string=(v,max)=>typeof v==='string'&&v.trim().length>0&&v.length<=max;
export function digitalDefaults(){return {notices:[],messages:[]};}
export function validDigital(d,minutes){return !!d&&Array.isArray(d.notices)&&d.notices.length<=NOTICE_LIMIT&&Array.isArray(d.messages)&&d.messages.length<=MESSAGE_LIMIT&&d.notices.every(n=>n&&string(n.message,300)&&validTime(n.time,minutes)&&kinds.includes(n.kind)&&typeof n.read==='boolean')&&d.messages.every(n=>n&&ids.has(n.id)&&Object.hasOwn(MESSAGE_TOPICS,n.topic)&&validTime(n.time,minutes)&&string(n.reply,240))&&d.notices.every((n,i)=>!i||n.time<=d.notices[i-1].time)&&d.messages.every((n,i)=>!i||n.time<=d.messages[i-1].time);}
export function noticeKind(message){return /^(?:Ngày \d+:\s*)?Biến cố kinh tế:/iu.test(message)?'economy':/(?:nguy kịch|kiệt sức|cảnh báo|quá hạn|thiếu|nợ|không đủ|hỏng|dừng tự động|phá sản|thanh lý|chưa thanh toán|chi vượt thu|căng thẳng|hết năng lượng|xung đột)/iu.test(message)?'warning':'life';}
export function addNotice(s,message,force=false){message=String(message??'').trim().slice(0,300);if(!message||!force&&!importantEvent(message))return false;const d=s.digital??=digitalDefaults();if(d.notices.some(r=>r.message===message&&r.time===s.minutes))return false;d.notices.unshift({message,time:s.minutes,kind:force&&!importantEvent(message)?'warning':noticeKind(message),read:false});d.notices.length=Math.min(d.notices.length,NOTICE_LIMIT);return true;}
export function unreadNotices(s){return (s.digital?.notices||[]).filter(n=>!n.read).length;}
export function noticeRows(s,filter='all'){return (s.digital?.notices||[]).filter(n=>filter==='all'||filter==='unread'&&!n.read||n.kind===filter);}
export function readNotices(s,filter='all'){for(const n of noticeRows(s,filter))n.read=true;}
export function phoneContacts(s){return catalogs.NPC_Master.filter(n=>Object.hasOwn(s.social?.contacts||{},n.id)).map(n=>({id:n.id,name:n.name,trust:trust(s,n.id)})).sort((a,b)=>a.name.localeCompare(b.name,'vi'));}
export function messageReason(s,id,topic){if(ended(s)||incarcerated(s))return 'Không thể liên lạc trong trạng thái hiện tại.';if(driving(s))return 'Hãy đỗ xe và xuống xe trước.';if(!ids.has(id)||!Object.hasOwn(s.social?.contacts||{},id))return 'Hãy gặp và làm quen trực tiếp trước.';if(!Object.hasOwn(MESSAGE_TOPICS,topic))return 'Chủ đề không hợp lệ.';if((s.digital?.messages||[]).some(n=>n.id===id&&Math.floor(n.time/1440)===Math.floor(s.minutes/1440)))return 'Đã liên lạc với người này hôm nay.';return '';}
export function sendMessage(s,id,topic){if(messageReason(s,id,topic))return false;const n=npcAt(id,s.minutes,s),resident=s.population?.people[id];if(!n)return false;let reply;if(topic==='checkin')reply=(resident?.needs?.health??100)<40?'Mình đang không khỏe, cần nghỉ ngơi.':'Mình vẫn ổn. '+n.status+'.';else if(topic==='location')reply='Mình '+(n.moving?'đang trên đường đến ':'đang ở khu vực ')+n.placeName+'.';else reply='Hiện tại: '+n.status+' · '+n.placeName+'.';const d=s.digital??=digitalDefaults();d.messages.unshift({id,topic,time:s.minutes,reply:reply.slice(0,240)});d.messages.length=Math.min(d.messages.length,MESSAGE_LIMIT);return true;}
export function phoneOverview(s){const sheet=balanceSheet(s);return {cash:s.cash,account:s.personalFinance.account,available:accountAvailable(s),net:sheet.net,job:retired(s)?'Nghỉ hưu':currentJob(s)?.name||'Chưa có việc chính thức',salary:monthlySalary(s),plan:dayPlan(s).label,unread:unreadNotices(s),contacts:phoneContacts(s).length,health:Math.round(s.health)};}
