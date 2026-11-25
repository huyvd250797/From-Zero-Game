import {homeAccess} from './housing-state.js';
import {catalogs,record,config} from './master-data.js';
import {places} from './world.js';
import {advanceTime,isOpen,MAX_MINUTES,log,settleDebt} from './life.js';
import {goods,itemCount,cashChange,completeRoutine} from './survival-state.js';
const byId=new Map(goods.map(r=>[r.id,r]));
export const recipes=Object.freeze(catalogs.Food_Drinks.filter(r=>r.ingredients.length));
export const goodsAt=place=>goods.filter(r=>r.shops.some(id=>record(id).legacyId===place));
const near=(s,place)=>{const p=places.find(p=>p.id===place);return !!p&&Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])<=2.5};
const fitsTime=(s,time)=>s.minutes+time<=MAX_MINUTES;
export function buyReason(s,place,id,qty=1){const r=byId.get(id);if(!r||!goodsAt(place).includes(r))return 'Không bán tại địa điểm này.';if(!Number.isSafeInteger(qty)||qty<1||qty>config.inventoryCapacity)return 'Số lượng không hợp lệ.';if(!near(s,place))return 'Cần đến cửa hàng.';if(!fitsTime(s,5)||!isOpen(place,s.minutes,5))return 'Cửa hàng đã đóng hoặc sắp đóng cửa.';if(itemCount(s)+qty>config.inventoryCapacity)return 'Túi đồ đã đầy.';if(s.cash<r.price*qty)return 'Không đủ tiền.';return '';}
export function buyItem(s,place,id,qty=1){if(buyReason(s,place,id,qty))return false;const r=byId.get(id);if(!cashChange(s,-r.price*qty,id.startsWith('FOOD_')||r.category==='ingredient'?'EXP_FOOD':'EXP_SUPPLIES',`Mua ${qty} × ${r.name}`))return false;s.inventory[id]=(s.inventory[id]||0)+qty;advanceTime(s,5);log(s,`Mua ${qty} × ${r.name}.`);return true;}
function remove(s,id,qty=1){s.inventory[id]-=qty;if(!s.inventory[id])delete s.inventory[id];}
const clamp=v=>Math.max(0,Math.min(100,v));
export function useReason(s,id){const r=byId.get(id);if(!r||!(s.inventory[id]>0))return 'Không có vật phẩm.';if(!r.useMinutes)return 'Vật phẩm không dùng trực tiếp.';if(!fitsTime(s,r.useMinutes))return 'Đã đạt giới hạn mô phỏng.';return '';}
export function useItem(s,id){if(useReason(s,id))return false;const r=byId.get(id);remove(s,id);advanceTime(s,r.useMinutes);for(const k of ['hunger','energy','happy','hydration','hygiene'])s[k]=clamp(s[k]+(r[k]||0));if(r.hunger>0)completeRoutine(s,'eat');if(r.hydration>=15)completeRoutine(s,'drink');if(r.hygiene>0)completeRoutine(s,'wash');log(s,`Sử dụng ${r.name}.`);return true;}
export function discardItem(s,id){if(!byId.has(id)||!(s.inventory[id]>0))return false;remove(s,id);log(s,`Bỏ 1 ${byId.get(id).name}.`);return true;}
export function cookReason(s,id){const r=recipes.find(r=>r.id===id);if(!r)return 'Không có công thức.';if(!homeAccess(s))return 'Cần đến nơi ở đang sử dụng.';if(!homeAccess(s,r.cookMinutes))return 'Thời hạn thuê không đủ để nấu.';if(!fitsTime(s,r.cookMinutes))return 'Đã đạt giới hạn mô phỏng.';if(r.ingredients.some(id=>!s.inventory[id]))return 'Thiếu nguyên liệu.';return '';}
export function cookItem(s,id){if(cookReason(s,id))return false;const r=byId.get(id);for(const i of r.ingredients)remove(s,i);advanceTime(s,r.cookMinutes);s.inventory[id]=(s.inventory[id]||0)+1;log(s,`Nấu xong ${r.name}. Món ăn đã vào túi đồ.`);return true;}
