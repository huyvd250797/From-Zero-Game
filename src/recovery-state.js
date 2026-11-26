export const RECOVERY_DAY=1440;
export const recoveryDefaults=()=>({recovery:{custody:null,served:{},releasedAt:null,discipline:50,shortfall:0,bankruptcies:[],journal:[]}});
export const incarcerated=s=>!!s.recovery?.custody;
export const servedCase=(s,c)=>Object.hasOwn(s.recovery?.served||{},c.id);
export const recoveryDebt=s=>s.recovery?.shortfall||0;
const int=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
export function validateRecovery(s){const r=s.recovery;if(!r||!int(r.discipline,0,100)||!int(r.shortfall)||!r.served||typeof r.served!=='object'||Array.isArray(r.served)||r.releasedAt!==null&&!int(r.releasedAt,0,s.minutes)||!Array.isArray(r.bankruptcies)||r.bankruptcies.length>30||!Array.isArray(r.journal)||r.journal.length>60)return false;
 const cases=s.legal.cases;for(const [id,a] of Object.entries(r.served)){const c=cases.find(c=>c.id===id);if(!c||c.verdict!=='guilty'||!c.prisonMonths||!int(a.start,c.verdictAt,s.minutes)||a.end!==a.start+c.prisonMonths*30*RECOVERY_DAY||a.end>s.minutes)return false;}
 if(r.custody!==null){const a=r.custody,c=cases.find(c=>c.id===a?.id);if(!c||c.verdict!=='guilty'||!c.prisonMonths||servedCase(s,c)||!int(a.start,c.verdictAt,s.minutes)||a.end!==a.start+c.prisonMonths*30*RECOVERY_DAY||a.end<=s.minutes||!int(a.day,0,Math.floor(s.minutes/RECOVERY_DAY)+1)||!Array.isArray(a.used)||new Set(a.used).size!==a.used.length||!a.used.every(id=>['REH_READ','REH_TRAIN','REH_FAMILY','REH_SUPPORT','meal','wash','rest','labor','medical'].includes(id))||s.riding||s.transport.active||s.career.contract)return false;}
 return r.bankruptcies.every(b=>b&&int(b.at,0,s.minutes)&&int(b.proceeds)&&int(b.paid)&&int(b.remaining)&&int(b.before,-Number.MAX_SAFE_INTEGER,-1)&&int(b.after,-Number.MAX_SAFE_INTEGER)&&Array.isArray(b.assets)&&b.assets.length<=64&&b.assets.every(a=>typeof a.name==='string'&&a.name.length<=120&&int(a.amount)))&&r.bankruptcies.every(b=>b.secured===undefined||Array.isArray(b.secured)&&b.secured.length<=8&&b.secured.every(q=>q&&int(q.id,1)&&typeof q.asset==='string'&&int(q.paid)&&int(q.remaining)))&&r.journal.every(j=>j&&int(j.at,0,s.minutes)&&typeof j.text==='string'&&j.text.length<=160);
}
