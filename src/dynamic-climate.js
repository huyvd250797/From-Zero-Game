// Deterministic simulation climate. Independent of graphics overrides and device quality.
import {weatherAt,weatherHash} from './weather.js';
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const cache=new Map();
export function climateAt(minutes){const m=Math.max(0,Number.isFinite(minutes)?minutes:0),key=Math.floor(m);if(cache.has(key))return cache.get(key);const w=weatherAt(key),hour=key%1440/60,day=Math.floor(key/1440),temperature= Math.round((26+5*Math.cos((hour-14)*Math.PI/12)+2*weatherHash(day+772)-3*w.rain-1.5*w.cloud)*10)/10,humidity=Math.round(clamp(58+32*w.rain+11*w.cloud+6*w.night,40,99));const result={...w,temperature,humidity,windKmh:Math.round(3+22*w.wind),visibility:Math.round(100*(1-.55*w.fog-.28*w.rain)),rainLabel:w.rain<.12?'Không mưa':w.rain<.45?'Mưa nhỏ':w.rain<.8?'Mưa vừa':'Mưa lớn'};Object.freeze(result);cache.set(key,result);if(cache.size>180)cache.delete(cache.keys().next().value);return result;}
export function forecast(minutes,hours=6){const start=Math.floor(minutes/60)*60;return Array.from({length:clamp(Math.floor(hours)||6,1,24)},(_,i)=>climateAt(start+i*60));}
export function weatherSpeedFactor(w){return clamp(1-.30*(w?.rain||0)-.16*(w?.wetness||0)-.20*(w?.fog||0),.48,1);}
export function outdoorRisk(w){return w.storm>.6||w.rain>.78?'shelter':w.rain>.15?'umbrella':w.temperature>=32?'heat':'normal';}
// Stable day-level leisure planning: do not teleport residents when a shower starts mid-commute.
export function wetLeisureDay(minutes,off=false){const base=Math.floor(Math.max(0,minutes)/1440)*1440;return (off?[600,780,960,1080]:[1020,1140,1260]).some(m=>{const w=climateAt(base+m);return w.storm>.65||w.rain>.8;});}
export function weatherResident(n,w){if(n.vehicleId)return n;const risk=outdoorRisk(w);return {...n,umbrella:risk==='umbrella'||risk==='shelter',weatherActivity:risk==='shelter'?'Mưa lớn · Dùng ô':risk==='umbrella'?'Dùng ô':risk==='heat'?'Trời nóng':null};}
// Only actual outdoor play time invokes this function, not skipped indoor activities.
export function weatherNeeds(s,minutes,{covered=false,vehicle=false}={}){if(covered||vehicle||minutes%30!==0)return false;const w=climateAt(minutes);if(w.temperature>=32)s.hydration=Math.max(0,s.hydration-1);if(w.rain>.65){s.hygiene=Math.max(0,s.hygiene-1);s.stress=Math.min(100,s.stress+1);}return true;}
const busDays=new Map();
export function busWeatherFactor(day){if(busDays.has(day))return busDays.get(day);const wet=forecast(day*1440+360,17).some(w=>w.storm>.65||w.rain>.8),factor=wet?.75:1;busDays.set(day,factor);if(busDays.size>32)busDays.delete(busDays.keys().next().value);return factor;}
