// Fictional in-game product catalogue, no network, external accounts or device APIs.
import {config} from './master-data.js';
import {places} from './world.js';
import {isOpen,MAX_MINUTES,advanceTime} from './life.js';
import {livingQuote} from './economy.js';
import {cashChange} from './survival-state.js';
import {ended} from './aging-state.js';
import {incarcerated} from './recovery-state.js';
import {driving} from './transport-state.js';
import {homeAccess} from './housing-state.js';
import {transfer} from './personal-finance.js';
export const PHONE_STORES=Object.freeze(['market','mall','east_market','central_mall','tanphu_market','phuan_market']);
export const DEVICES=Object.freeze([
 {id:'basic',name:'Điện thoại phổ thông',platform:'basic',price:350000,standby:10080,used:false},
 {id:'basic_used',name:'Điện thoại phổ thông cũ',platform:'basic',price:250000,standby:7200,used:true},
 {id:'galaxy_a',name:'Samsung Galaxy A',platform:'android',price:4500000,standby:2880,used:false},
 {id:'galaxy_a_used',name:'Samsung Galaxy A cũ',platform:'android',price:2500000,standby:2160,used:true},
 {id:'galaxy_s',name:'Samsung Galaxy S',platform:'android',price:18000000,standby:2880,used:false},
 {id:'iphone',name:'iPhone',platform:'ios',price:14500000,standby:2400,used:false},
 {id:'iphone_used',name:'iPhone cũ',platform:'ios',price:8500000,standby:1800,used:true},
 {id:'iphone_pro',name:'iPhone Pro',platform:'ios',price:29000000,standby:2880,used:false}
].map(Object.freeze));
export const deviceModel=s=>DEVICES.find(d=>d.id===s.device?.id)||null;
const int=(v,min,max)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
export function validDevice(d,m){return d===null||!!d&&DEVICES.some(x=>x.id===d.id)&&int(d.boughtAt,0,m)&&int(d.chargedAt,d.boughtAt,m)&&int(d.charge,0,100)&&int(d.planUntil,d.boughtAt,MAX_MINUTES);}
export function migrateDevice(s){if(Object.hasOwn(s,'device'))return s;const d={...s,device:null};if(Number.isSafeInteger(s.inventory?.ITM_PHONE)&&s.inventory.ITM_PHONE>0&&s.inventory.ITM_PHONE<=config.inventoryCapacity){d.inventory={...s.inventory};if(--d.inventory.ITM_PHONE===0)delete d.inventory.ITM_PHONE;d.device={id:'basic_used',boughtAt:s.minutes,chargedAt:s.minutes,charge:100,planUntil:Math.min(MAX_MINUTES,s.minutes+30*1440)};}return d;}
export function battery(s){const m=deviceModel(s);return m?Math.max(0,Math.floor(s.device.charge-(s.minutes-s.device.chargedAt)*100/m.standby)):0;}
export const planActive=s=>!!deviceModel(s)&&s.minutes<s.device.planUntil;
export const devicePrice=(s,id)=>{const m=DEVICES.find(d=>d.id===id);return m?livingQuote(s,m.price):0;};
export function deviceValue(s){const m=deviceModel(s);return m?Math.floor(devicePrice(s,m.id)*Math.max(.25,.7-Math.floor((s.minutes-s.device.boughtAt)/43200)*.025)):0;}
export function phoneReason(s,capability='basic'){if(ended(s)||incarcerated(s))return 'Không thể sử dụng điện thoại lúc này.';if(driving(s))return 'Hãy đỗ xe và xuống xe trước.';const m=deviceModel(s);if(!m)return 'Bạn chưa sở hữu điện thoại.';if(battery(s)<=0)return 'Điện thoại hết pin. Hãy sạc pin.';if(['smart','data'].includes(capability)&&m.platform==='basic')return 'Cần điện thoại thông minh Samsung hoặc iPhone.';if(['call','data'].includes(capability)&&!planActive(s))return 'Gói cước đã hết hạn. Hãy gia hạn tại cửa hàng.';return '';}
const atStore=(s,place)=>PHONE_STORES.includes(place)&&places.some(p=>p.id===place&&Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])<=2.5)&&isOpen(place,s.minutes,5)&&s.minutes+5<=MAX_MINUTES;
const tradeReason=(s,place)=>ended(s)||incarcerated(s)||driving(s)?'Không thể giao dịch lúc này.':!atStore(s,place)?'Đến quầy điện thoại trong giờ phục vụ.':'';
export function buyDeviceReason(s,place,id){const why=tradeReason(s,place);if(why)return why;if(!DEVICES.some(d=>d.id===id))return 'Thiết bị không hợp lệ.';if(s.device)return 'Hãy bán điện thoại đang sở hữu trước.';if(s.cash<devicePrice(s,id))return 'Không đủ tiền mặt.';return '';}
export function buyDevice(s,place,id){if(buyDeviceReason(s,place,id))return false;const m=DEVICES.find(d=>d.id===id);if(!cashChange(s,-devicePrice(s,id),'EXP_SUPPLIES','Mua '+m.name))return false;s.device={id,boughtAt:s.minutes,chargedAt:s.minutes,charge:100,planUntil:Math.min(MAX_MINUTES,s.minutes+30*1440)};return true;}
export function sellDevice(s,place){if(tradeReason(s,place)||!deviceModel(s))return false;if(!cashChange(s,deviceValue(s),'INC_LIQUIDATION','Bán '+deviceModel(s).name))return false;s.device=null;return true;}
export const planPrice=s=>livingQuote(s,deviceModel(s)?.platform==='basic'?30000:70000);
export function renewPlan(s,place){if(tradeReason(s,place)||!deviceModel(s)||s.device.planUntil-s.minutes>30*1440||Math.max(s.minutes,s.device.planUntil)+30*1440>MAX_MINUTES)return false;if(!cashChange(s,-planPrice(s),'EXP_SUPPLIES','Gia hạn gói cước điện thoại'))return false;s.device.planUntil=Math.max(s.minutes,s.device.planUntil)+30*1440;return true;}
export function chargeReason(s,place){if(!deviceModel(s))return 'Chưa có điện thoại.';if(ended(s)||incarcerated(s)||driving(s))return 'Không thể sạc lúc này.';if(battery(s)>=100)return 'Pin đã đầy.';if(s.minutes+30>MAX_MINUTES)return 'Đã đạt giới hạn mô phỏng.';if(homeAccess(s,30))return '';if(!atStore(s,place)||!isOpen(place,s.minutes,30))return 'Đến nhà đang sử dụng hoặc quầy điện thoại trong giờ mở cửa.';if(s.cash<livingQuote(s,10000))return 'Không đủ phí sạc.';return '';}
export function chargeDevice(s,place){if(chargeReason(s,place))return false;if(!homeAccess(s,30)&&!cashChange(s,-livingQuote(s,10000),'EXP_SUPPLIES','Sạc điện thoại'))return false;advanceTime(s,30,{resting:true});s.device.charge=100;s.device.chargedAt=s.minutes;return true;}
export function consumeBattery(s,amount=1){if(!deviceModel(s)||!int(amount,1,100))return false;s.device.charge=Math.max(0,battery(s)-amount);s.device.chargedAt=s.minutes;return true;}
export function phoneTransfer(s,direction,amount){if(phoneReason(s,'data')||!transfer(s,direction,amount))return false;consumeBattery(s);return true;}
