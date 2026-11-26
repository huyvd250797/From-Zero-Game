import {syncLegal} from './legal.js';
import {catalogs,record,config} from './master-data.js';
import {cashChange} from './survival-state.js';
import {report,liquid} from './personal-finance.js';
import {residence} from './housing-state.js';
import {economyAt} from './economy.js';
import {trust} from './social.js';
const DAY=1440, LIMIT=8, FORCED_LIMIT=24, MAX=200*366*DAY;
const events=new Map(catalogs.Story_Events.map(e=>[e.id,e]));
const choices=new Map(catalogs.Event_Choices.map(c=>[c.id,c]));
const chapters=new Set(catalogs.Story_Chapters.map(c=>c.id));
const int=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
const obj=x=>x&&typeof x==='object'&&!Array.isArray(x);
const cap=x=>Math.max(0,Math.min(100,x));
const age=s=>config.age+new Date(Date.UTC(config.startYear,0,1)+Math.floor(s.minutes/DAY)*86400000).getUTCFullYear()-config.startYear;
export const storyDefaults=(s,legacy=false)=>({story:{started:s.minutes,legacy,hadShift:legacy&&((s.shifts||0)+Object.values(s.career?.experience||{}).reduce((a,b)=>a+b,0)>0),ethics:50,pending:[],scheduled:[],resolved:{},chapters:[],history:[],offenses:[]}});
const evt=id=>events.get(id);
export const eventChoices=id=>catalogs.Event_Choices.filter(c=>c.event===id);
const addHistory=(s,item)=>{s.story.history.unshift(item);s.story.history=s.story.history.slice(0,120)};
function note(s,msg){s.journal.unshift(`Ngày ${Math.floor(s.minutes/DAY)+1}: ${msg}`);s.journal=s.journal.slice(0,20)}
const eligible=(s,e)=>{const r=s.story.resolved[e.id];return !s.story.pending.some(p=>p.event===e.id)&&(!r||e.repeatable&&s.minutes-r.at>=e.cooldownDays*DAY)};
function enqueue(s,e,context=null,origin=null){if(s.story.pending.length>=(origin?FORCED_LIMIT:LIMIT)||!eligible(s,e))return false;s.story.pending.push({event:e.id,at:s.minutes,context,origin});if(!s.story.chapters.includes(e.chapter))s.story.chapters.push(e.chapter);if(e.id==='EVT_LEGAL'){s.social.reputation=cap(s.social.reputation-8);s.stress=cap(s.stress+10);}addHistory(s,{kind:'event',event:e.id,choice:null,at:s.minutes,context});note(s,'Biến cố: '+e.name);return true;}
function match(s,e){const d=Math.floor(s.minutes/DAY)+1,p=s.story;switch(e.trigger){
 case 'arrival':return !p.legacy&&d===1;
 case 'first_shift':return !p.hadShift&&s.shifts+Object.values(s.career?.experience||{}).reduce((a,b)=>a+b,0)>0;
 case 'hardship':return d>=3&&liquid(s)<60000&&!residence(s);
 case 'friend_request':return Object.keys(s.social.contacts).sort().find(id=>trust(s,id)>=30&&!s.social.contacts[id].conflict)||false;
 case 'graduation':return s.education.completed.length>0;
 case 'enterprise':return !!s.business.active;
 case 'business_crisis':return !!s.business.active&&(s.business.debt>0||s.business.active.revenue<s.business.active.costs&&s.business.active.cash<5000000);
 case 'overspending':{const r=report(s);return (r.expenses.EXP_FUN||0)>=2000000&&r.expense>r.income;}
 case 'job_loss':return !s.career.contract&&s.career.history.some(r=>r.reason==='dismissed'&&s.minutes-r.ended<=7*DAY&&(!p.resolved[e.id]||r.ended>p.resolved[e.id].at));
 case 'family_strain':return s.family.partner?.stage==='married'&&s.family.happiness<40;
 case 'debt_pressure':return s.banking.loans.some(l=>l.overduePrincipal>0||l.interestDue>0);
 case 'recession':return economyAt(s.minutes).phase==='ECO_RECESSION';
 case 'community':{let h=(d^0x9e3779b9)>>>0;for(const ch of s.name)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;h=Math.imul(h^(h>>>16),0x85ebca6b)>>>0;return d>=7&&h%11===0&&s.social.reputation>=40;}
 case 'recovery':return !!(p.resolved.EVT_HARDSHIP||p.resolved.EVT_JOB_LOSS)&&liquid(s)>=300000&&!!residence(s);
 case 'health_crisis':return !!s.wellness?.conditions.length;
 case 'habit_recovery':return !!s.wellness?.dependent.length;
 case 'retirement':return age(s)>=60;
 case 'legacy':return age(s)>=70;
 default:return false;
}}
// Narrative choices never interrupt an existing action or modal. Due consequences are processed once.
export function storyDue(s){if(!s.story)return;for(const q of [...s.story.scheduled]){if(q.due>s.minutes)continue;const e=evt(q.event);if(!eligible(s,e)){s.story.scheduled.splice(s.story.scheduled.indexOf(q),1);continue;}if(enqueue(s,e,q.context,q.choice))s.story.scheduled.splice(s.story.scheduled.indexOf(q),1);}}
export function storyScan(s){if(!s.story)return;storyDue(s);const a=age(s);for(const e of events.values()){if(s.story.pending.length>=LIMIT)break;if(a<e.minAge||a>e.maxAge||!eligible(s,e))continue;const m=match(s,e);if(m)enqueue(s,e,typeof m==='string'?m:null);}}
export function storyTick(s){if(!s.story)return;if(s.story.scheduled.some(q=>q.due<=s.minutes))storyDue(s);if(s.minutes%DAY===0)storyScan(s);}
export function choiceReason(s,id){const c=choices.get(id),p=s.story?.pending.find(p=>p.event===c?.event);if(!c||!p)return 'Sự kiện không còn chờ quyết định.';if(c.event==='EVT_CRISIS'&&id!=='CHO_CRISIS_DECLINE'&&!s.business.active)return 'Doanh nghiệp đã đóng cửa; hãy từ chối đề xuất.';if(!Number.isSafeInteger(s.cash+c.cashDelta)||s.cash+c.cashDelta<0)return 'Không đủ tiền mặt.';if(c.delayDays>0&&(s.minutes+c.delayDays*DAY>MAX||s.story.scheduled.length>=16))return 'Không thể tạo thêm hậu quả trì hoãn.';return '';}
export function chooseStory(s,id){if(choiceReason(s,id))return false;const c=choices.get(id),p=s.story.pending.find(p=>p.event===c.event),e=evt(c.event),f=s.story;
 const category=c.cashDelta>0?'INC_STORY':e.id==='EVT_FRIEND'?'EXP_SOCIAL':['EVT_SHIFT','EVT_PARTY'].includes(e.id)?'EXP_FUN':'EXP_STORY';if(c.cashDelta&&!cashChange(s,c.cashDelta,category,e.name+' · '+c.name))return false;
 s.happy=cap(s.happy+c.happyDelta);s.health=cap(s.health+c.healthDelta);s.stress=cap(s.stress+c.stressDelta);s.social.reputation=cap(s.social.reputation+c.reputationDelta);f.ethics=cap(f.ethics+c.ethicsDelta);if(s.family.partner?.stage==='married'||s.family.children.length)s.family.happiness=cap(s.family.happiness+c.familyDelta);
 if(c.id==='CHO_FRIEND_HELP'&&p.context&&s.social.contacts[p.context]){const contact=s.social.contacts[p.context],old=trust(s,p.context);contact.trust=cap(old+5);contact.last=s.minutes;contact.helped=true;contact.memory.unshift({action:'help',minute:s.minutes,delta:contact.trust-old});contact.memory=contact.memory.slice(0,24);}
 if(c.offense)f.offenses.push({id:c.offense,choice:c.id,at:s.minutes});
 const previous=f.resolved[e.id];f.resolved[e.id]={at:s.minutes,count:(previous?.count||0)+1,choice:id};f.pending.splice(f.pending.indexOf(p),1);addHistory(s,{kind:'choice',event:e.id,choice:id,at:s.minutes,context:p.context});
 if(c.nextEvent&&c.delayDays>0)f.scheduled.push({event:c.nextEvent,choice:id,due:s.minutes+c.delayDays*DAY,context:p.context});
 // Arrival -> first shift is condition-based, never grants experience or wages.
 note(s,'Lựa chọn: '+c.name+' · '+e.name);syncLegal(s);storyScan(s);return true;
}
export function validateStory(s){const f=s.story;if(!obj(f)||!int(f.started,0,s.minutes)||typeof f.legacy!=='boolean'||typeof f.hadShift!=='boolean'||!int(f.ethics,0,100)||!Array.isArray(f.pending)||f.pending.length>FORCED_LIMIT||!Array.isArray(f.scheduled)||f.scheduled.length>16||!obj(f.resolved)||!Array.isArray(f.chapters)||new Set(f.chapters).size!==f.chapters.length||!f.chapters.every(x=>chapters.has(x))||!Array.isArray(f.history)||f.history.length>120||!Array.isArray(f.offenses)||f.offenses.length>20)return false;
 const ctx=x=>x===null||catalogs.NPC_Master.some(n=>n.id===x);const validChoice=(id,event)=>choices.get(id)?.event===event;
 for(const [id,r] of Object.entries(f.resolved)){const e=evt(id);if(!e||!obj(r)||!int(r.at,f.started,s.minutes)||!int(r.count,1,e.repeatable?MAX/DAY:1)||!validChoice(r.choice,id)||!f.chapters.includes(e.chapter))return false;}
 if(new Set(f.pending.map(p=>p?.event)).size!==f.pending.length)return false;
 for(const p of f.pending){const e=evt(p?.event),r=f.resolved[p?.event];if(!e||!int(p.at,f.started,s.minutes)||!ctx(p.context)||!f.chapters.includes(e.chapter)||r&&(!e.repeatable||p.at-r.at<e.cooldownDays*DAY)||!(p.origin===null||choices.get(p.origin)?.nextEvent===p.event&&choices.get(p.origin)?.delayDays>0))return false;}
 if(new Set(f.scheduled.map(q=>q?.event)).size!==f.scheduled.length)return false;
 for(const q of f.scheduled){const c=choices.get(q?.choice),r=f.resolved[c?.event];if(!c||!r||r.choice!==c.id||!c.delayDays||c.nextEvent!==q.event||q.due!==r.at+c.delayDays*DAY||!int(q.due,f.started,MAX)||!ctx(q.context)||f.pending.some(p=>p.event===q.event)||f.resolved[q.event])return false;}
 let prev=s.minutes;for(const h of f.history){if(!evt(h?.event)||!['event','choice'].includes(h.kind)||!int(h.at,f.started,prev)||!ctx(h.context)||(h.kind==='event'?h.choice!==null:!validChoice(h.choice,h.event)))return false;prev=h.at;}
 return f.offenses.every(o=>o&&choices.get(o.choice)?.offense===o.id&&int(o.at,f.started,s.minutes)&&f.resolved[choices.get(o.choice).event]?.choice===o.choice);
}
