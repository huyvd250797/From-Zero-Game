import {catalogs,record} from './master-data.js';
export const businessTypes=catalogs.Business_Types;
export const businessProduct=id=>catalogs.Business_Products.find(p=>p.business===id);
export const businessOps=id=>catalogs.Business_Operations.find(p=>p.business===id);
export const businessPlace=id=>record(record(id)?.building)?.legacyId;
export const businessDefaults=()=>({business:{active:null,debt:0,history:[]}});
export const businessStockValue=b=>b?b.stock*businessProduct(b.type).unitCost:0;
export const businessValue=s=>s.business?.active?s.business.active.cash+businessStockValue(s.business.active):0;
export const businessDebt=s=>s.business?.debt||0;
export const businessProfit=b=>b.revenue-b.costs;
export const distributable=b=>Math.max(0,Math.min(b.cash,businessProfit(b)-b.distributed));
export const businessMonthlyCost=b=>businessOps(b.type).monthlyFixedCost+b.staff*record(record(b.type).staffRole).monthlyPay;
const int=(n,min=0,max=1e14)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
export function validateBusiness(s){const b=s.business;if(!b||!int(b.debt)||!Array.isArray(b.history)||b.history.length>30||!b.history.every(r=>r&&businessTypes.some(t=>t.id===r.type)&&typeof r.name==='string'&&r.name.length<=48&&int(r.at,0,s.minutes)&&int(r.revenue)&&int(r.costs)&&int(r.distributed)))return false;const a=b.active;if(a===null)return true;const t=businessTypes.find(t=>t.id===a?.type);return !!t&&typeof a.name==='string'&&a.name.trim()&&a.name.length<=48&&int(a.cash)&&int(a.stock,0,10000*a.level)&&int(a.level,1,3)&&int(a.staff,0,Math.min(t.maxStaff,a.level*t.staffPerLevel))&&int(a.price,Math.ceil(businessProduct(t.id).salePrice*.7),Math.floor(businessProduct(t.id).salePrice*1.5))&&int(a.started,0,s.minutes)&&int(a.lastDay,0,Math.floor(s.minutes/1440)+1)&&int(a.marketingUntil,0,Math.floor(s.minutes/1440)+8)&&int(a.revenue)&&int(a.costs)&&int(a.distributed)&&int(a.sold)&&Array.isArray(a.logs)&&a.logs.length<=60&&a.logs.every(l=>l&&int(l.at,0,s.minutes)&&typeof l.note==='string'&&l.note.length<=160&&int(l.amount,-1e14,1e14));}
