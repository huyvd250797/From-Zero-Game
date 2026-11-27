import {catalogs,config} from './master-data.js';
import {homeAccess,residence,homes} from './housing-state.js';
import {itemCount} from './survival-state.js';
import {advanceTime,MAX_MINUTES,log} from './life.js';
import {incarcerated} from './recovery-state.js';
const foods=new Set([...catalogs.Food_Drinks.map(r=>r.id),...catalogs.Food_Drinks.flatMap(r=>r.ingredients)]);
const perish=new Set(['FOOD_MEAL','FOOD_MILK','FOOD_FRUIT','FOOD_HOME_RICE','FOOD_HOME_NOODLES','ITM_EGG','ITM_VEG','FOOD_BREAD',...catalogs.Food_Drinks.filter(r=>r.ingredients.length||['FOOD_PHO','FOOD_BUN','FOOD_PORRIDGE','FOOD_STICKY_RICE','FOOD_SALAD','FOOD_YOGURT','FOOD_ORANGE','FOOD_SOY','FOOD_SMOOTHIE','FOOD_COCONUT','FOOD_SOUP'].includes(r.id)).map(r=>r.id),...['CHICKEN','PORK','FISH','TOFU','TOMATO','POTATO','BEEF','ONION','FRUIT'].map(x=>'ITM_'+x)]);
export const storableFood=id=>foods.has(id);
const key=s=>residence(s)?.id;
export const storageCapacity=s=>s.housing.furniture.includes('FUR_FRIDGE')?30:12;
export const homeStorage=s=>s.housing.householdWorld?.[key(s)]||{items:[],cleanedAt:null,laundryAt:null};
function access(s){return !incarcerated(s)&&homeAccess(s)&&!!key(s);}
function mutable(s){s.housing.householdWorld??={};return s.housing.householdWorld[key(s)]??={items:[],cleanedAt:null,laundryAt:null};}
export function storeFood(s,id){if(!access(s)||!storableFood(id)||!s.inventory[id]||homeStorage(s).items.length>=storageCapacity(s))return false;const refrigerated=s.housing.furniture.includes('FUR_FRIDGE'),ttl=perish.has(id)?(refrigerated?3:1)*1440:30*1440;mutable(s).items.push({id,stored:s.minutes,expires:s.minutes+ttl});if(--s.inventory[id]===0)delete s.inventory[id];return true;}
export function takeFood(s,index){const row=homeStorage(s).items[index];if(!access(s)||!row||row.expires<=s.minutes||itemCount(s)>=config.inventoryCapacity)return false;mutable(s).items.splice(index,1);s.inventory[row.id]=(s.inventory[row.id]||0)+1;return true;}
export function discardStored(s,index){if(!access(s)||!homeStorage(s).items[index])return false;mutable(s).items.splice(index,1);return true;}
export function validHouseholdWorld(s){const w=s.housing.householdWorld;if(w===undefined)return true;if(!w||Array.isArray(w)||typeof w!=='object')return false;return Object.entries(w).every(([k,v])=>homes.some(h=>h.id===k)&&v&&Array.isArray(v.items)&&v.items.length<=30&&v.items.every(r=>r&&foods.has(r.id)&&Number.isSafeInteger(r.stored)&&r.stored>=0&&r.stored<=s.minutes&&Number.isSafeInteger(r.expires)&&r.expires>r.stored&&r.expires-r.stored<=43200)&&['cleanedAt','laundryAt'].every(k=>v[k]===null||Number.isSafeInteger(v[k])&&v[k]>=0&&v[k]<=s.minutes));}
export function choreReason(s,kind){if(!access(s)||!['clean','laundry'].includes(kind))return 'Cần ở nhà đang sử dụng.';const k=kind==='clean'?'cleanedAt':'laundryAt',last=homeStorage(s)[k];if(last!==null&&s.minutes-last<720)return 'Đã thực hiện trong 12 giờ qua.';if(s.minutes+20>MAX_MINUTES||!homeAccess(s,20))return 'Không đủ thời gian sử dụng nhà.';return '';}
export function doChore(s,kind){if(choreReason(s,kind))return false;advanceTime(s,20);const h=mutable(s);h[kind==='clean'?'cleanedAt':'laundryAt']=s.minutes;s.hygiene=Math.min(100,s.hygiene+(kind==='laundry'?12:5));s.happy=Math.min(100,s.happy+3);log(s,kind==='clean'?'Đã dọn dẹp nhà cửa.':'Đã giặt quần áo.');return true;}
export function householdActivity(minute,age=30){const m=((minute%1440)+1440)%1440;if(m<360||m>=1320)return {activity:'rest',mode:'idle',fixture:'bed',label:'Nghỉ ngơi'};if(m<480||m>=1080&&m<1200||m>=720&&m<780)return {activity:'eat',mode:'eat',fixture:'kitchen',label:'Ăn uống'};if(age>=6&&age<18&&m>=480&&m<1020)return {activity:'read',mode:'read',fixture:'desk',label:'Học tập tại nhà'};return {activity:'rest',mode:'idle',fixture:'living',label:'Sinh hoạt'};}
