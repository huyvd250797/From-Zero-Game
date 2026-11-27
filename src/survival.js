import {goodsAt,cartQuote,checkoutCart} from './shopping.js';
export {goodsAt};
import {incarcerated} from './recovery-state.js';
import {recordFood} from './health-state.js';
import {quote,goodsPrice,assetPrice,wageQuote,rateQuote,actionCash,economyAt,vacancyOpen} from './economy.js';
import {homeAccess} from './housing-state.js';
import {catalogs,record,config} from './master-data.js';
import {places} from './world.js';
import {advanceTime,isOpen,MAX_MINUTES,log,settleDebt} from './life.js';
import {goods,itemCount,cashChange,completeRoutine} from './survival-state.js';
const byId=new Map(goods.map(r=>[r.id,r]));
export const recipes=Object.freeze(catalogs.Food_Drinks.filter(r=>r.ingredients.length));
const fitsTime=(s,time)=>s.minutes+time<=MAX_MINUTES;
export function buyReason(s,place,id,qty=1){return cartQuote(s,place,[{id,qty}]).reason;}
export function buyItem(s,place,id,qty=1){const items=[{id,qty}];return checkoutCart(s,place,items,cartQuote(s,place,items));}
function remove(s,id,qty=1){s.inventory[id]-=qty;if(!s.inventory[id])delete s.inventory[id];}
const clamp=v=>Math.max(0,Math.min(100,v));
export function useReason(s,id){if(incarcerated(s))return 'Đang chấp hành án.';const r=byId.get(id);if(!r||!(s.inventory[id]>0))return 'Không có vật phẩm.';if(!r.useMinutes)return 'Vật phẩm không dùng trực tiếp.';if(!fitsTime(s,r.useMinutes))return 'Đã đạt giới hạn mô phỏng.';return '';}
export function useItem(s,id){if(useReason(s,id))return false;const r=byId.get(id);remove(s,id);advanceTime(s,r.useMinutes);recordFood(s,id);for(const k of ['hunger','energy','happy','hydration','hygiene'])s[k]=clamp(s[k]+(r[k]||0));if(r.hunger>0)completeRoutine(s,'eat');if(r.hydration>=15)completeRoutine(s,'drink');if(r.hygiene>0)completeRoutine(s,'wash');log(s,`Sử dụng ${r.name}.`);return true;}
export function discardItem(s,id){if(!byId.has(id)||!(s.inventory[id]>0))return false;remove(s,id);log(s,`Bỏ 1 ${byId.get(id).name}.`);return true;}
export function cookReason(s,id){if(incarcerated(s))return 'Đang chấp hành án.';const r=recipes.find(r=>r.id===id);if(!r)return 'Không có công thức.';if(!homeAccess(s))return 'Cần đến nơi ở đang sử dụng.';if(!homeAccess(s,r.cookMinutes))return 'Thời hạn thuê không đủ để nấu.';if(!fitsTime(s,r.cookMinutes))return 'Đã đạt giới hạn mô phỏng.';if(r.ingredients.some(id=>!s.inventory[id]))return 'Thiếu nguyên liệu.';return '';}
export function cookItem(s,id){if(cookReason(s,id))return false;const r=byId.get(id);for(const i of r.ingredients)remove(s,i);advanceTime(s,r.cookMinutes);s.inventory[id]=(s.inventory[id]||0)+1;log(s,`Nấu xong ${r.name}. Món ăn đã vào túi đồ.`);return true;}
