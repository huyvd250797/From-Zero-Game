import {catalogs,record,config,city} from './master-data.js';
import {spawn,clamp,walkable,nearestWalkable} from './world.js';
export const SAVE_KEY='fromzero.save.v1';
export const PREF_KEY='fromzero.prefs.v1';
export const fresh=(name='Minh')=>({schema:1,name:String(name).trim().slice(0,24)||'Minh',pos:{...spawn},cash:config.cash,minutes:config.minutes,energy:config.energy,hunger:config.hunger,happy:config.happy,rentUntil:0,bike:false,riding:false,shifts:0,journal:[`Bạn đến thành phố ${city.name} với ${config.cash.toLocaleString('vi-VN')}đ.`]});
export function validate(s){if(!s||s.schema!==1||typeof s.name!=='string'||!s.name.trim()||s.name.length>24||!s.pos||!Number.isFinite(s.pos.x)||!Number.isFinite(s.pos.z)||!walkable(s.pos.x,s.pos.z)||!Number.isSafeInteger(s.cash)||s.cash<0||!Number.isSafeInteger(s.minutes)||s.minutes<0||!['energy','hunger','happy'].every(k=>Number.isFinite(s[k])&&s[k]>=0&&s[k]<=100)||!Number.isSafeInteger(s.rentUntil)||s.rentUntil<0||!Number.isSafeInteger(s.shifts)||s.shifts<0||typeof s.bike!=='boolean'||typeof s.riding!=='boolean'||s.riding&&!s.bike||!Array.isArray(s.journal)||s.journal.length>40||!s.journal.every(x=>typeof x==='string'&&x.length<=300))return null;return structuredClone(s)}
export function readSave(storage){try{const raw=storage.getItem(SAVE_KEY);if(!raw)return null;return validate(JSON.parse(raw))}catch{return null}}
export function writeSave(storage,s){try{if(!validate(s))return false;storage.setItem(SAVE_KEY,JSON.stringify(s));return true}catch{return false}}
export function day(s){return Math.floor(s.minutes/config.dayMinutes)+1}
export function clock(s){const m=s.minutes%config.dayMinutes;return `Ngày ${day(s)} · ${String(Math.floor(m/60)).padStart(2,'0')}:${String(m%60).padStart(2,'0')}`}
export const money=n=>n.toLocaleString('vi-VN')+' đ';
export const hasRoom=s=>s.rentUntil>s.minutes;
const checks={work:(s,a)=>s.energy>=-a.energy&&s.hunger>=-a.hunger,rent:s=>!hasRoom(s),sleep:(s,a)=>hasRoom(s)&&s.rentUntil>=s.minutes+a.time,buybike:s=>!s.bike,ride:s=>s.bike};
export const activities=Object.create(null);
for(const row of catalogs.Location_Actions){const building=record(row.building);const action={...row,id:row.legacyId,masterId:row.id,label:row.name};if(checks[row.rule])action.check=s=>checks[row.rule](s,action);(activities[building.legacyId]??=[]).push(Object.freeze(action));}
for(const list of Object.values(activities))Object.freeze(list);Object.freeze(activities);
export function available(s,a){return !!a&&s.cash+a.cash>=0&&(!a.check||a.check(s))}
export function perform(s,place,id){const a=activities[place]?.find(a=>a.id===id);if(!available(s,a))return false;s.cash+=a.cash;s.minutes+=a.time;for(const k of ['energy','hunger','happy'])s[k]=clamp(s[k]+(a[k]??0),0,100);if(id==='work')s.shifts++;if(id==='rent')s.rentUntil=s.minutes+config.rentMinutes;if(id==='buybike'){s.bike=true;s.riding=true}if(id==='ride')s.riding=!s.riding;s.journal.unshift(`Ngày ${day(s)}: ${a.log}`);s.journal=s.journal.slice(0,20);return true}
