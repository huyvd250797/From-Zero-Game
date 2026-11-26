import {validDecor} from './housing-design.js';
import {livingQuote,quote,goodsPrice,assetPrice,wageQuote,rateQuote,actionCash,economyAt,vacancyOpen} from './economy.js';
import {catalogs,record} from './master-data.js';
import {places} from './world.js';
export const homes=catalogs.Properties;
export const furniture=catalogs.Furniture;
export const DAY=1440, HOME_CYCLE=30*DAY;
export const homePlace=id=>record(homes.find(p=>p.id===id)?.building)?.legacyId;
export const homeAt=place=>homes.find(p=>homePlace(p.id)===place);
export const housingDefaults=()=>({housing:{residence:null,furniture:[],debt:0,ever:false}});
export function residence(s){const h=s.housing?.residence;if(h&&(h.mode==='owned'||h.until>s.minutes))return h;if(s.rentUntil>s.minutes)return {id:'PROP_ROOM',mode:'rent',until:s.rentUntil,due:0};return null;}
export const currentHome=s=>homes.find(p=>p.id===residence(s)?.id);
export const currentHomePlace=s=>homePlace(residence(s)?.id);
export const nearPlace=(s,place)=>{const p=places.find(p=>p.id===place);return !!p&&Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])<=2.5;};
export function homeAccess(s,minutes=0){const h=residence(s);return !!h&&(h.mode==='owned'||h.until>=s.minutes+minutes)&&nearPlace(s,homePlace(h.id));}
export const monthlyHomeCost=(p,s)=>livingQuote(s,p.maintenanceMonthly+p.utilitiesMonthly);
export const salePrice=(p,s)=>Math.floor(assetPrice(s,p)*.9);
export const homeComfort=s=>{const p=currentHome(s);return p?Math.min(100,15*p.capacity+(s.housing?.furniture||[]).reduce((n,id)=>n+record(id).comfort,0)):0;};
export function validateHousing(s){const h=s.housing,validInt=n=>Number.isSafeInteger(n)&&n>=0;if(!h||typeof h!=='object'||Array.isArray(h)||typeof h.ever!=='boolean'||!validInt(h.debt)||!Array.isArray(h.furniture)||new Set(h.furniture).size!==h.furniture.length||!h.furniture.every(id=>furniture.some(f=>f.id===id)))return false;if(h.decorations!==undefined&&(!h.decorations||typeof h.decorations!=='object'||Array.isArray(h.decorations)||Object.entries(h.decorations).some(([id,d])=>!homes.some(p=>p.id===id)||!validDecor(d))))return false;const r=h.residence;if(r===null)return true;if(!r||!homes.some(p=>p.id===r.id&&p.id!=='PROP_ROOM')||!['owned','rent'].includes(r.mode)||!validInt(r.until)||!validInt(r.due)||!h.ever||s.rentUntil>s.minutes)return false;return r.mode==='rent'?r.until>s.minutes&&r.due===0:r.until===0&&r.due>s.minutes;}
