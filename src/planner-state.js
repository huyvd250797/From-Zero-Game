import {catalogs} from './master-data.js';
const studyChoices=new Set(['goal',...catalogs.Skills.map(s=>s.id)]);
// Save schema 1 extension, intentionally independent from gameplay modules.
export const PLAN_LIMIT=24,HISTORY_LIMIT=120;
export const PLAN_ACTIONS=Object.freeze({work:'Đi làm theo hợp đồng',temp:'Làm việc thời vụ',class:'Đi học theo chương trình',study:'Tự học tại thư viện',meal:'Ăn uống',water:'Uống nước',sleep:'Ngủ',wash:'Vệ sinh',relax:'Thư giãn',shopFood:'Mua cơm hộp',shopWater:'Mua nước uống',health:'Khám phục hồi',home:'Về nhà'});
export const PLAN_MODES=['auto','walk','owned','bus','taxi'];
export const PLAN_REPEAT=['daily','weekly','monthly','once'];
export const PLAN_CONDITIONS=['always','need','workday'];
export const PLAN_STATUS=['running','done','skipped','missed','blocked','interrupted'];
const int=(x,a,b)=>Number.isSafeInteger(x)&&x>=a&&x<=b;
export function plannerDefaults(){return {enabled:false,tasks:[],history:[],nextId:1,budget:150000,reserve:60000,spentDay:0,spent:0};}
export function validTask(t){return !!t&&int(t.id,1,1000000000)&&Object.hasOwn(PLAN_ACTIONS,t.action)&&int(t.minute,0,1439)&&PLAN_REPEAT.includes(t.repeat)&&int(t.weekdays,1,127)&&int(t.monthDay,1,31)&&int(t.onceDay,0,73200)&&int(t.grace,15,360)&&PLAN_MODES.includes(t.mode)&&PLAN_CONDITIONS.includes(t.condition)&&typeof t.enabled==='boolean'&&(t.studySkill===undefined||studyChoices.has(t.studySkill));}
export function validPlanner(p,minutes){return p!==null&&typeof p==='object'&&typeof p.enabled==='boolean'&&int(p.nextId,1,1000000000)&&int(p.budget,0,1000000000)&&int(p.reserve,0,1000000000)&&int(p.spentDay,0,Math.floor(minutes/1440))&&int(p.spent,0,1000000000)&&Array.isArray(p.tasks)&&p.tasks.length<=PLAN_LIMIT&&p.tasks.every(validTask)&&new Set(p.tasks.map(t=>t.id)).size===p.tasks.length&&p.tasks.every(t=>t.id<p.nextId)&&Array.isArray(p.history)&&p.history.length<=HISTORY_LIMIT&&p.history.every(h=>h&&int(h.id,1,p.nextId-1)&&int(h.day,0,Math.floor(minutes/1440))&&PLAN_STATUS.includes(h.status)&&Object.hasOwn(PLAN_ACTIONS,h.action)&&int(h.at,0,minutes)&&typeof h.detail==='string'&&h.detail.length<=220)&&new Set(p.history.map(h=>h.id+':'+h.day)).size===p.history.length;}
export function putTask(p,draft){const id=draft.id??p.nextId,t={id,action:'meal',minute:420,repeat:'daily',weekdays:62,monthDay:1,onceDay:0,grace:120,mode:'auto',condition:'always',enabled:true,...draft};if(!validTask(t)||(!p.tasks.some(a=>a.id===id)&&(p.tasks.length>=PLAN_LIMIT||id!==p.nextId||p.nextId>=1000000000)))return false;const i=p.tasks.findIndex(a=>a.id===id);if(i>=0)p.tasks[i]=t;else{p.tasks.push(t);p.nextId++;}return true;}
export function finishTask(p,task,day,status,minutes,detail=''){const h={id:task.id,action:task.action,day,status,at:minutes,detail:String(detail).slice(0,220)};p.history=[h,...p.history.filter(x=>x.id!==task.id||x.day!==day)].slice(0,HISTORY_LIMIT);return h;}
export const taskResult=(p,t,d)=>p.history.find(h=>h.id===t.id&&h.day===d);
export const spentToday=(p,minutes)=>p.spentDay===Math.floor(minutes/1440)?p.spent:0;
export function remainingBudget(s){const p=s.planner;return Math.max(0,Math.min(p.budget-spentToday(p,s.minutes),s.cash-p.reserve));}
export function spendPlan(p,minutes,cost){const d=Math.floor(minutes/1440);p.spent=spentToday(p,minutes)+cost;p.spentDay=d;}
export function suspendLoadedPlan(s){const p=s.planner;p.enabled=false;for(const h of p.history)if(h.status==='running'){h.status='interrupted';h.detail='Phiên chơi trước kết thúc; không tự chạy lại hoặc hoàn tiền.';h.at=s.minutes;}}
