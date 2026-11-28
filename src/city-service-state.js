import {COLLECTION_IDS} from './vehicle-collection.js';
// Optional schema-1 extension. All fees/points are fictional An Lạc game rules.
export const LAW_RULES=Object.freeze({speed:{label:'Quá tốc độ',fine:80000,points:1},red:{label:'Vượt đèn đỏ',fine:150000,points:2},wrong:{label:'Đi ngược chiều',fine:120000,points:2},parking:{label:'Đỗ xe sai quy định',fine:50000,points:0},license:{label:'Không có giấy phép hợp lệ',fine:180000,points:0}});
export const LICENSE_CLASSES=['A','B','C'];
export const licenseClass=id=>id==='VEH_BIKE'?null:id==='VEH_MOTO'?'A':id==='VEH_TRUCK'?'C':'B';
export const cityServiceDefaults=()=>({cityServices:{licenses:{},violations:[],archivedDebt:0,nextId:1,cooldowns:{},policies:{},reports:[],dispatch:null}});
const plain=x=>x&&typeof x==='object'&&!Array.isArray(x),int=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max,ids=[...COLLECTION_IDS,'VEH_BIKE','VEH_MOTO','VEH_CAR','VEH_EV','VEH_LUX','VEH_TRUCK'];
const point=p=>plain(p)&&Number.isFinite(p.x)&&Number.isFinite(p.z)&&p.x>=0&&p.x<=384&&p.z>=0&&p.z<=384;
export function validCityServices(s){const c=s.cityServices;if(!plain(c)||!plain(c.licenses)||!plain(c.cooldowns)||!plain(c.policies)||!int(c.archivedDebt)||!int(c.nextId,1)||!Array.isArray(c.violations)||c.violations.length>120||!Array.isArray(c.reports)||c.reports.length>60)return false;
 if(!Object.entries(c.licenses).every(([k,v])=>LICENSE_CLASSES.includes(k)&&plain(v)&&int(v.issued,0,s.minutes)&&int(v.points,0,12)&&int(v.restoreAt,0,s.minutes+10080)))return false;
 if(!Object.entries(c.cooldowns).every(([k,v])=>Object.hasOwn(LAW_RULES,k)&&int(v,0,s.minutes)))return false;
 if(!Object.entries(c.policies).every(([k,v])=>ids.includes(k)&&plain(v)&&int(v.start,0,s.minutes)&&int(v.until,v.start+1,v.start+43200)))return false;
 const common=r=>plain(r)&&int(r.id,1,c.nextId-1)&&ids.includes(r.vehicle)&&int(r.at,0,s.minutes)&&point(r.pos);
 if(!c.violations.every(r=>common(r)&&Object.hasOwn(LAW_RULES,r.kind)&&int(r.fine,1)&&int(r.points,0,12)&&typeof r.paid==='boolean'&&['camera','patrol','system'].includes(r.source)))return false;
 if(!c.reports.every(r=>common(r)&&int(r.damage,1,100)&&typeof r.target==='string'&&r.target.length<=100&&int(r.energy)&&int(r.cover,0)&&typeof r.claimed==='boolean'))return false;
 if(new Set([...c.violations,...c.reports].map(r=>r.id)).size!==c.violations.length+c.reports.length)return false;
 const d=c.dispatch;return d===null||plain(d)&&['tow','ambulance'].includes(d.kind)&&(d.kind==='ambulance'?d.vehicle===null:ids.includes(d.vehicle))&&int(d.start,0,s.minutes)&&int(d.arrive,d.start+1,d.start+2000)&&point(d.target)&&point(d.origin)&&Array.isArray(d.path)&&d.path.length>=1&&d.path.length<=600&&d.path.every(point)&&Math.hypot(d.path.at(-1).x-d.target.x,d.path.at(-1).z-d.target.z)<.01;
}
export const cityData=s=>s.cityServices??=(cityServiceDefaults().cityServices);
export const hasLicense=(s,id)=>{const k=licenseClass(id);return !k||!!(s.cityServices?.licenses?.[k]?.points>0||(k==='B'&&s.cityServices?.licenses?.C?.points>0));};
export const applicableLicense=(s,id)=>{const k=licenseClass(id);return k==='B'&&!(s.cityServices?.licenses?.B?.points>0)&&s.cityServices?.licenses?.C?.points>0?'C':k;};
export const unpaidFines=s=>(s.cityServices?.archivedDebt||0)+(s.cityServices?.violations||[]).reduce((a,v)=>a+(v.paid?0:v.fine),0);
export function recordViolation(s,kind,vehicle,source='system',cooldown=30){const rule=LAW_RULES[kind];if(!rule||!ids.includes(vehicle)||!point(s.pos))return null;const c=cityData(s);if(s.minutes-(c.cooldowns[kind]??-1e6)<cooldown)return null;c.cooldowns[kind]=s.minutes;const k=applicableLicense(s,vehicle),l=c.licenses[k],points=l?Math.min(l.points,rule.points):0;if(l&&points){l.points-=points;if(!l.points)l.restoreAt=s.minutes+10080;}const row={id:c.nextId++,at:s.minutes,vehicle,kind,fine:rule.fine,points,paid:false,source,pos:{...s.pos}};c.violations.unshift(row);if(c.violations.length>120){const old=c.violations.pop();if(!old.paid)c.archivedDebt+=old.fine;}return row;}
export function recordAccident(s,vehicle,{target,energy,damage,cover=0}){if(!ids.includes(vehicle)||!point(s.pos)||!int(damage,1,100))return null;const c=cityData(s),p=c.policies[vehicle],row={id:c.nextId++,at:s.minutes,vehicle,pos:{...s.pos},target:String(target).slice(0,100),energy:Math.max(0,Math.round(energy)),damage,cover:p&&p.start<=s.minutes&&p.until>s.minutes?Math.max(0,Math.round(cover)):0,claimed:false};c.reports.unshift(row);c.reports=c.reports.slice(0,60);return row;}
