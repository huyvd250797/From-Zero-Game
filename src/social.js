import {incarcerated} from './recovery-state.js';
import {currentHome} from './housing-state.js';
import {catalogs,record,config} from './master-data.js';
import {sites,nearestWalkable,clamp} from './world.js';
import {planRoute,routeLength,distance,segmentClear} from './navigation.js';
import {advanceTime,MAX_MINUTES,log} from './life.js';
import {cashChange} from './survival-state.js';
import {driving} from './transport-state.js';
import {workPlace} from './career.js';
export const npcs=catalogs.NPC_Master;
const byId=new Map(npcs.map(n=>[n.id,n])), schedules=new Map();
const site=id=>sites.find(b=>b.masterId===id);
// All NPC locations are public outdoor anchors. No NPC uses a player's private interior.
function anchor(id,i){const b=site(id),p=b.door?{x:b.door[0],z:b.door[1]}:{x:b.x,z:b.z+b.d/2+1.1};const a=nearestWalkable(p.x+(i%3-1)*2,p.z+(Math.floor(i/3)%3-1)*1.5);return a||nearestWalkable(p.x,p.z)}
function leg(a,b,start,end,label){const r=planRoute(a,b);if(!r)throw Error('NPC route unavailable');return {a,b,start,end,label,path:r.path,length:routeLength(a,r.path)}}
export function npcSchedule(id,state){const n=byId.get(id);if(!n)return null;const homeId=state?.family?.partner?.id===id&&state.family.partner.stage==='married'?currentHome(state)?.building||n.home:n.home,key=id+':'+homeId;if(schedules.has(key))return schedules.get(key);const i=npcs.indexOf(n),home=anchor(homeId,i),work=anchor(n.workplace,i),leisure=anchor(n.leisure,i),lunch=Math.min(720,n.workEnd-60),leave=Math.min(1260,catalogs.World_Schedules.find(r=>r.building===n.leisure)?.closes??1260);const result=[
 {start:0,end:n.workStart-60,a:home,label:'Ở gần nhà',place:homeId},
 {...leg(home,work,n.workStart-60,n.workStart,'Đang đi làm / học'),place:n.workplace},
 {start:n.workStart,end:lunch,a:work,label:n.behavior==='study'?'Đang học':'Đang làm việc',place:n.workplace},
 {start:lunch,end:lunch+60,a:work,label:'Nghỉ trưa',place:n.workplace},
 {start:lunch+60,end:n.workEnd,a:work,label:n.behavior==='study'?'Đang học':'Đang làm việc',place:n.workplace},
 {...leg(work,leisure,n.workEnd,n.workEnd+60,'Đang đi thư giãn'),place:n.leisure},
 {start:n.workEnd+60,end:leave,a:leisure,label:'Thư giãn',place:n.leisure},
 {...leg(leisure,home,leave,leave+60,'Đang về nhà'),place:homeId},
 {start:leave+60,end:1440,a:home,label:'Ở gần nhà',place:homeId}];
 // A schedule is deterministic, so fast-forward and reload derive identical locations.
 schedules.set(key,result);return result;}
export function npcAt(id,minutes,state){const n=byId.get(id),schedule=npcSchedule(id,state);if(!n||!Number.isFinite(minutes))return null;const minute=((minutes%1440)+1440)%1440,seg=schedule.find(s=>minute>=s.start&&minute<s.end);let pos={...seg.a},yaw=0,travel=0,moving=false;if(seg.path?.length&&seg.length>0){travel=seg.length*(minute-seg.start)/(seg.end-seg.start);let left=travel,prev=seg.a;for(const next of seg.path){const len=distance(prev,next);if(left<=len&&len>0){pos={x:prev.x+(next.x-prev.x)*left/len,z:prev.z+(next.z-prev.z)*left/len};yaw=Math.atan2(next.x-prev.x,next.z-prev.z);moving=true;break}left-=len;prev=next;pos={...next}}}return {id,npc:n,pos,yaw,moving,phase:travel*7,status:seg.label,place:seg.place,placeName:record(seg.place).name}}
let cacheKey='',cacheList=[];export function npcWorld(minutes,state){const key=minutes+':'+(state?.family?.partner?.stage==='married'?state.family.partner.id+':'+currentHome(state)?.id:'');if(key!==cacheKey){cacheKey=key;cacheList=npcs.map(n=>npcAt(n.id,minutes,state));}return cacheList}
const day=m=>Math.floor(m/1440);
const actions={greet:{name:'Chào hỏi',minutes:5,trust:6,rep:0,happy:2,stress:-1},chat:{name:'Trò chuyện',minutes:15,trust:8,rep:1,happy:5,stress:-3},help:{name:'Giúp đỡ',minutes:20,trust:record('REV_HELP').trustDelta,rep:3,happy:3,stress:-2,cash:30000},disagree:{name:'Bất đồng quan điểm',minutes:5,trust:record('REV_CONFLICT').trustDelta,rep:-2,happy:-3,stress:4},apologize:{name:'Xin lỗi',minutes:10,trust:6,rep:1,happy:2,stress:-2}};
export const socialActions=Object.freeze(Object.entries(actions).map(([id,a])=>Object.freeze({id,...a})));
export function socialDefaults(){return {social:{reputation:record('ATR_REPUTATION').initial,contacts:{}}}}
export function validateSocial(s){const v=s.social;if(!v||!Number.isSafeInteger(v.reputation)||v.reputation<0||v.reputation>100||!v.contacts||typeof v.contacts!=='object'||Array.isArray(v.contacts)||Object.keys(v.contacts).length>npcs.length)return false;for(const [id,c] of Object.entries(v.contacts)){if(!byId.has(id)||!c||!Number.isSafeInteger(c.trust)||c.trust<0||c.trust>100||!Number.isSafeInteger(c.last)||c.last<0||c.last>s.minutes||typeof c.helped!=='boolean'||typeof c.conflict!=='boolean'||!c.daily||typeof c.daily!=='object'||Array.isArray(c.daily)||Object.entries(c.daily).some(([a,d])=>!Object.hasOwn(actions,a)||!Number.isSafeInteger(d)||d<0||d>day(s.minutes))||!Array.isArray(c.memory)||!c.memory.length||c.memory.length>24||c.memory.some(m=>!m||!Object.hasOwn(actions,m.action)||!Number.isSafeInteger(m.minute)||m.minute<0||m.minute>c.last||typeof m.delta!=='number'||!Number.isInteger(m.delta)||m.delta< -100||m.delta>100))return false;}return true}
export function trust(s,id){const c=s.social?.contacts[id];return c?Math.max(0,c.trust-Math.max(0,Math.floor((day(s.minutes)-day(c.last)-7)/7))):0}
export function relationship(s,id){const p=s.family?.partner;if(p?.id===id)return ({courting:'Đang tìm hiểu',dating:'Người yêu',engaged:'Đã đính hôn',married:'Vợ/chồng'})[p.stage];if(!s.social?.contacts[id])return 'Người lạ';const t=trust(s,id);return t>=record('REL_CLOSE').minTrust?'Bạn thân':t>=record('REL_FRIEND').minTrust?'Bạn bè':'Quen biết'}
export function reputationLabel(s){return catalogs.Social_Reputation.find(r=>s.social.reputation>=r.min&&s.social.reputation<=r.max)?.name||'Bình thường'}
export function colleague(s,id){return !!s.career?.contract&&workPlace(s)===record(byId.get(id)?.workplace)?.legacyId}
export function npcAge(n,minutes){return n.age+new Date(Date.UTC(config.startYear,0,1)+Math.floor(minutes/1440)*86400000).getUTCFullYear()-config.startYear;}
export function nearNPC(s,id){const n=npcAt(id,s.minutes,s);return !!n&&distance(s.pos,n.pos)<=3&&segmentClear(s.pos,n.pos)}
export function socialReason(s,id,action){if(incarcerated(s))return 'Đang chấp hành án.';const a=Object.hasOwn(actions,action)?actions[action]:null,n=byId.get(id),c=s.social?.contacts[id];if(!a||!n)return 'Không tìm thấy tương tác.';if(driving(s))return 'Hãy đỗ xe và xuống xe trước.';if(!nearNPC(s,id))return 'Cần đến gần nhân vật (trong 3 đơn vị, không có vật cản).';if(s.minutes+a.minutes>MAX_MINUTES)return 'Đã đạt giới hạn thời gian.';if(s.energy<10||s.health<10)return 'Cần nghỉ ngơi trước.';if(!c&&action!=='greet')return 'Hãy chào hỏi để làm quen trước.';if(c?.daily[action]===day(s.minutes))return 'Đã thực hiện hành động này hôm nay.';if(action==='help'&&(c.helped||trust(s,id)<15))return c.helped?'Đã hoàn thành sự kiện giúp đỡ.':'Cần ít nhất 15 điểm tin tưởng.';if(action==='apologize'&&!c.conflict)return 'Chưa có mâu thuẫn cần hòa giải.';if(a.cash&&s.cash<a.cash)return 'Không đủ tiền hỗ trợ.';return ''}
export function socialInteract(s,id,action){if(socialReason(s,id,action))return false;const a=actions[action],n=byId.get(id),oldTrust=trust(s,id),c=s.social.contacts[id]??={trust:0,last:s.minutes,helped:false,conflict:false,daily:{},memory:[]};if(a.cash&&!cashChange(s,-a.cash,'EXP_SOCIAL','Giúp đỡ '+n.name))return false;const start=s.minutes,bonus=action==='chat'&&n.personality==='TRA_SOCIAL'?2:action==='chat'&&colleague(s,id)?1:0;c.daily[action]=day(start);advanceTime(s,a.minutes);c.trust=clamp(oldTrust+a.trust+bonus,0,100);c.last=s.minutes;if(action==='help')c.helped=true;if(action==='disagree')c.conflict=true;if(action==='apologize')c.conflict=false;c.memory.unshift({action,minute:s.minutes,delta:c.trust-oldTrust});c.memory=c.memory.slice(0,24);s.social.reputation=clamp(s.social.reputation+a.rep,0,100);s.happy=clamp(s.happy+a.happy,0,100);s.stress=clamp(s.stress+a.stress,0,100);log(s,`${a.name} với ${n.name} · tin tưởng ${c.trust}/100.`);return true}
export function dialogue(s,id){const n=byId.get(id),c=s.social?.contacts[id];if(!n)return '';if(c?.conflict)return 'Tôi vẫn còn buồn vì chuyện lần trước. Chúng ta có thể nói chuyện lại không?';if(c?.helped)return 'Tôi vẫn nhớ lúc bạn giúp tôi. Cảm ơn bạn nhé!';if(trust(s,id)>=70)return 'Thật vui vì chúng ta đã trở thành bạn thân. '+n.dialogue;if(colleague(s,id))return 'Chào đồng nghiệp! '+n.dialogue;return n.dialogue}
