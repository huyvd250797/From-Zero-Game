// Retail shopping: deterministic daily replenishment, one atomic checkout, bounded receipts.
import {catalogs,record,config} from './master-data.js';
import {places} from './world.js';
import {goods,itemCount,cashChange} from './survival-state.js';
import {goodsPrice} from './economy.js';
import {advanceTime,isOpen,MAX_MINUTES,log} from './life.js';
import {incarcerated} from './recovery-state.js';
import {ended} from './aging-state.js';
import {driving} from './transport-state.js';
const int=(v,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(v)&&v>=min&&v<=max;
const obj=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const day=s=>Math.floor(s.minutes/1440);
let cachedCatalog;
const catalog=()=>cachedCatalog??=new Map(places.map(p=>[p.id,Object.freeze(goods.filter(r=>r.id!=='ITM_PHONE'&&r.shops.some(id=>record(id).legacyId===p.id)))]).filter(([,g])=>g.length));
export const goodsAt=place=>catalog().get(place)||[];
export const SHOP_RECEIPT_LIMIT=60;
export const shoppingDefaults=()=>({nextId:1,stockDay:0,sold:{},receipts:[]});
export const shopCategory=r=>r.id.startsWith('FOOD_')?'food':r.category==='ingredient'?'ingredient':r.useMinutes?'consumable':'durable';
export const shopSearch=(r,search='')=>{const norm=x=>String(x).toLowerCase().normalize('NFD').replace(/\p{M}/gu,'').replace(/đ/g,'d');return norm(r.name).includes(norm(search.trim()));};
export function stockCapacity(place,id){const r=goodsAt(place).find(r=>r.id===id);if(!r)return 0;const large=goodsAt(place).length>=10,c=shopCategory(r);return c==='food'?(large?80:40):c==='durable'?(large?12:6):(large?60:30);}
export function stockAvailable(s,place,id){const q=s.shopping;return Math.max(0,stockCapacity(place,id)-(q?.stockDay===day(s)?q.sold[place]?.[id]||0:0));}
export function validShopping(s){const q=s.shopping;if(!obj(q)||!int(q.nextId,1)||!int(q.stockDay,0,day(s))||!obj(q.sold)||!Array.isArray(q.receipts)||q.receipts.length>SHOP_RECEIPT_LIMIT)return false;
 for(const [place,rows] of Object.entries(q.sold)){if(!catalog().has(place)||!obj(rows)||!Object.keys(rows).length)return false;for(const [id,n] of Object.entries(rows))if(!int(n,1,stockCapacity(place,id)))return false;}
 let prev=0,at=0;for(const r of q.receipts){if(!obj(r)||!int(r.id,prev+1,q.nextId-1)||!int(r.at,at,s.minutes)||!catalog().has(r.place)||!Array.isArray(r.lines)||!r.lines.length||r.lines.length>config.inventoryCapacity)return false;let total=0,count=0;const ids=new Set();for(const l of r.lines){if(!obj(l)||!goodsAt(r.place).some(g=>g.id===l.id)||ids.has(l.id)||!int(l.qty,1,config.inventoryCapacity)||!int(l.unit,1))return false;ids.add(l.id);count+=l.qty;total+=l.qty*l.unit;}if(!int(count,1,config.inventoryCapacity)||!int(total,1)||r.total!==total)return false;prev=r.id;at=r.at;}
 return true;}
export function cartQuote(s,place,items){const q={id:s.shopping?.nextId??1,at:s.minutes,place,lines:[],count:0,total:0,reason:''};const fail=reason=>({...q,reason});
 if(!Array.isArray(items)||!items.length||items.length>config.inventoryCapacity)return fail('Giỏ hàng trống hoặc không hợp lệ.');const seen=new Set();for(const item of items){const r=goodsAt(place).find(r=>r.id===item?.id);if(!r||seen.has(r.id)||!int(item.qty,1,config.inventoryCapacity))return fail('Sản phẩm hoặc số lượng không hợp lệ.');seen.add(r.id);const unit=goodsPrice(s,r);q.lines.push({id:r.id,qty:item.qty,unit});q.count+=item.qty;q.total+=unit*item.qty;}
 if(!int(q.total,1)||!int(q.id,1,Number.MAX_SAFE_INTEGER-1))return fail('Vượt giới hạn giao dịch.');if(ended(s))return fail('Cuộc đời đã kết thúc.');if(incarcerated(s))return fail('Đang chấp hành án.');if(driving(s))return fail('Hãy xuống xe trước khi mua sắm.');const p=places.find(p=>p.id===place);if(!p||Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])>2.5)return fail('Cần đến cửa hàng.');if(s.minutes+5>MAX_MINUTES||!isOpen(place,s.minutes,5))return fail('Cửa hàng đã đóng hoặc sắp đóng cửa.');
 for(const l of q.lines)if(l.qty>stockAvailable(s,place,l.id))return fail('Không đủ hàng: '+record(l.id).name+'.');if(itemCount(s)+q.count>config.inventoryCapacity)return fail('Túi đồ không đủ chỗ.');if(s.cash<q.total)return fail('Không đủ tiền mặt.');return q;}
export function checkoutReason(s,place,items,expected){const q=cartQuote(s,place,items);if(q.reason)return q.reason;if(!expected||expected.reason||expected.id!==q.id||expected.at!==q.at||expected.place!==place||expected.total!==q.total||JSON.stringify(expected.lines)!==JSON.stringify(q.lines))return 'Giỏ hàng hoặc giá đã thay đổi. Hãy kiểm tra lại.';return '';}
export function checkoutCart(s,place,items,expected){if(checkoutReason(s,place,items,expected))return false;const q=cartQuote(s,place,items),n=structuredClone(s);n.shopping??=shoppingDefaults();const shop=n.shopping;
 if(shop.stockDay!==day(n)){shop.stockDay=day(n);shop.sold={};}const totals={};for(const l of q.lines){const r=record(l.id),category=shopCategory(r)==='food'||r.category==='ingredient'?'EXP_FOOD':'EXP_SUPPLIES';totals[category]=(totals[category]||0)+l.unit*l.qty;}
 // Multiple ledger categories, one checkout. Do all changes on a draft first.
 for(const [cat,total] of Object.entries(totals)){const note=q.lines.length===1?`Mua ${q.lines[0].qty} × ${record(q.lines[0].id).name}`:`Giỏ hàng #${q.id} · ${places.find(p=>p.id===place).name}`;if(!cashChange(n,-total,cat,note))return false;}
 const sold=shop.sold[place]??={};for(const l of q.lines){n.inventory[l.id]=(n.inventory[l.id]||0)+l.qty;sold[l.id]=(sold[l.id]||0)+l.qty;}
 shop.receipts.push({id:shop.nextId++,at:q.at,place,lines:q.lines,total:q.total});if(shop.receipts.length>SHOP_RECEIPT_LIMIT)shop.receipts.shift();advanceTime(n,5);log(n,q.lines.length===1?`Mua ${q.lines[0].qty} × ${record(q.lines[0].id).name}.`:`Mua ${q.count} sản phẩm · ${q.total.toLocaleString('vi-VN')}đ.`);Object.assign(s,n);return true;}
