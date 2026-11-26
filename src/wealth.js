import {balanceSheet,report,monthKey} from './personal-finance.js';
import {portfolio} from './banking-state.js';
import {businessValue} from './business-state.js';
export function wealthOverview(s,period=monthKey(s.minutes)){
 const sheet=balanceSheet(s),business=businessValue(s),investments=portfolio(s),r=report(s,period);
 const allocation=[['Tiền mặt',sheet.cash],['Tài khoản',sheet.account],['Tiết kiệm',sheet.savings],['Đầu tư',sheet.investments],['Doanh nghiệp',business],['Nhà, xe và vật dụng',sheet.property-business],['Lương phải thu',sheet.receivable]];
 const passive=['INC_INTEREST','INC_DIVIDEND','INC_RENT','INC_PENSION'].reduce((n,id)=>n+(r.incomes[id]||0),0);
 return {sheet,allocation,investments,income:r.income,expense:r.expense,passive,businessIncome:r.incomes.INC_BUSINESS||0,investmentCost:investments.reduce((n,p)=>n+p.cost,0),rent:s.banking.rentReceived||0};
}
