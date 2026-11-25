import {catalogs,record} from './master-data.js';
export const BANK_CYCLE=30*1440;
export const BANK_TRANSFERS=Object.freeze({deposit:'Nạp tài khoản',withdraw:'Rút tiền mặt',saving_open:'Gửi tiết kiệm',saving_close:'Hoàn gốc tiết kiệm',loan_draw:'Giải ngân khoản vay',loan_principal:'Trả gốc khoản vay'});
export const bankingDefaults=()=>({banking:{nextId:1,credit:650,deposits:[],loans:[],holdings:{},realized:0,dividends:0}});
export const marketAssets=()=>catalogs.Investment_Assets.filter(a=>a.type!=='property');
const int=(n,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(n)&&n>=min&&n<=max;
export const pledged=(s,id)=>s.banking?.loans.some(l=>l.collateral===id)||false;
export const bankDebt=s=>(s.banking?.loans||[]).reduce((n,l)=>n+l.principal+l.interestDue,0);
export const savingValue=s=>(s.banking?.deposits||[]).reduce((n,d)=>n+d.principal,0);
export const installment=l=>Math.min(l.principal,Math.ceil(l.original/record(l.product).months));
export const monthlyInterest=l=>Math.round(l.principal*record(l.product).annualRate/12);
export const loanDue=l=>l.overduePrincipal+l.interestDue;
export const nextPayment=l=>Math.min(l.principal-l.overduePrincipal,installment(l))+monthlyInterest(l);
// Forecast assumes overdue amounts cleared now and future installments paid on time.
export function repaymentPlan(l){let principal=l.principal-l.overduePrincipal,at=l.due;const rows=[],p=record(l.product),fixed=Math.ceil(l.original/p.months);while(principal>0){const g=Math.min(principal,fixed),interest=Math.round(principal*p.annualRate/12);principal-=g;rows.push({at,principal:g,interest,total:g+interest,remaining:principal});at+=BANK_CYCLE;}return rows;}

// Bounded, reproducible prices independent of save/reload and wall-clock time.
export function marketPrice(id,minutes){const a=record(id);if(!a||!['stock','gold'].includes(a.type))return 0;const d=Math.floor(minutes/1440),seed=id==='INV_TECH'?17:id==='INV_BANK'?43:79;const wave=(Math.sin(d*.041+seed)-Math.sin(seed))*.5;const noise=d===0?0:Math.sin(d*2.718+seed)*.09;const trend=Math.min(.7,d/3650);return Math.max(1,Math.round(a.price*Math.max(.35,1+trend+(wave+noise)*a.risk/100)));}
export const portfolio=s=>marketAssets().flatMap(a=>{const h=s.banking?.holdings[a.id];return h?[{id:a.id,name:a.name,quantity:h.quantity,value:h.quantity*marketPrice(a.id,s.minutes),cost:h.cost}]:[]});
export function validateBanking(s){const b=s.banking;if(!b||!int(b.nextId,1)||!int(b.credit,300,850)||!Array.isArray(b.deposits)||b.deposits.length>12||!Array.isArray(b.loans)||b.loans.length>8||!b.holdings||typeof b.holdings!=='object'||Array.isArray(b.holdings)||!Number.isSafeInteger(b.realized)||!int(b.dividends))return false;const ids=new Set(),collateral=new Set();const unique=x=>int(x.id,1,b.nextId-1)&&!ids.has(x.id)&&(ids.add(x.id),true);for(const d of b.deposits){const p=catalogs.Saving_Products.find(p=>p.id===d.product);if(!p||!unique(d)||!int(d.principal,p.minimum,1e12)||!int(d.start,0,s.minutes)||d.due!==d.start+p.months*BANK_CYCLE||d.due<=s.minutes)return false;}
 for(const l of b.loans){const p=catalogs.Loan_Products.find(p=>p.id===l.product);if(!p||p.id==='LOAN_BIZ'||!unique(l)||!int(l.original,1,p.maxPrincipal)||!int(l.principal,1,l.original)||!int(l.overduePrincipal,0,l.principal)||!int(l.interestDue)||!int(l.missed,0)||!int(l.due,s.minutes+1)||!int(l.started,0,s.minutes)||l.due<=l.started||(l.due-l.started)%BANK_CYCLE!==0)return false;if(p.id==='LOAN_HOME'||p.id==='LOAN_VEHICLE'){if(!record(l.collateral)||l.original>Math.floor(record(l.collateral).price*.7)||collateral.has(l.collateral)||!(p.id==='LOAN_HOME'?s.housing?.residence?.mode==='owned'&&s.housing.residence.id===l.collateral:s.transport?.vehicles.some(v=>v.id===l.collateral)))return false;collateral.add(l.collateral);}else if(l.collateral!==null)return false;}
 return Object.entries(b.holdings).every(([id,h])=>marketAssets().some(a=>a.id===id)&&h&&int(h.quantity,1,1000000)&&int(h.cost,1,1e13)&&int(h.lastBuy,0,s.minutes))&&Number.isSafeInteger(bankDebt(s)+savingValue(s)+portfolio(s).reduce((n,p)=>n+p.value,0));}
