import {shoppingDefaults,validShopping} from './shopping.js';
import {validDevice,migrateDevice} from './device-ownership.js';
import {digitalDefaults,validDigital} from './digital-life.js';
import {plannerDefaults,validPlanner} from './planner-state.js';
import {populationDefaults,validPopulation} from './population.js';
import {validImportantJournal} from './important-events.js';
import {DEFAULT_AVATAR,validAvatar} from './avatar.js';
import {inspectSaves,persistSave} from './save-store.js';
import {DEFAULT_DIFFICULTY,validDifficulty,difficultyOf} from './difficulty.js';
import {agingDefaults,validateAging,retired,ended} from './aging-state.js';
import {recoveryDefaults,validateRecovery,incarcerated} from './recovery-state.js';
import {legalDefaults,validateLegal} from './legal-state.js';
import {syncLegal} from './legal.js';
import {healthDefaults,validateHealth,recordFood,recordHealthAction} from './health-state.js';
import {storyDefaults,validateStory} from './story.js';
import {quote,goodsPrice,assetPrice,wageQuote,rateQuote,actionCash,economyAt,vacancyOpen} from './economy.js';
import {businessDefaults,validateBusiness} from './business-state.js';
import {bankingDefaults,validateBanking} from './banking-state.js';
import {familyDefaults,validateFamily} from './family.js';
import {socialDefaults,validateSocial} from './social.js';
import {transportDefaults,validateTransport} from './transport-state.js';
import {housingDefaults,validateHousing,residence} from './housing-state.js';
import {financeDefaults,migrateFinance,validatePersonalFinance,liquid} from './personal-finance.js';
import {careerDefaults,validateCareer} from './career.js';
import {educationDefaults,validateEducation,practice} from './education.js';
import {survivalDefaults,validateSurvival,cashChange,completeRoutine,workMinutesToday,survivalDay} from './survival-state.js';
import {catalogs,record,config,city} from './master-data.js';
import {spawn,clamp,walkable,places,migrateUrbanSave} from './world.js';
import {LIFE_FIELDS,MAX_MINUTES,lifeDefaults,advanceTime,day,hhmm,isOpen,scheduleLabel,settleDebt,log} from './life.js';
export {day};
export const SAVE_KEY='fromzero.save.v1';
export const PREF_KEY='fromzero.prefs.v1';
export const fresh=(name='Minh',difficulty=DEFAULT_DIFFICULTY,minutes=config.minutes)=>({schema:1,urbanLayout:9,appearance:{...DEFAULT_AVATAR},difficulty:validDifficulty(difficulty)?difficulty:DEFAULT_DIFFICULTY,name:String(name).trim().slice(0,24)||'Minh',pos:{...spawn},cash:difficultyOf({difficulty}).startingCash,minutes,energy:config.energy,hunger:config.hunger,happy:config.happy,rentUntil:0,bike:false,riding:false,shifts:0,journal:[`Bạn đến thành phố ${city.name} với ${difficultyOf({difficulty}).startingCash.toLocaleString('vi-VN')}đ.`],...lifeDefaults({bike:false,minutes},true),...survivalDefaults({minutes},true),...educationDefaults(),...careerDefaults(),...financeDefaults({minutes},true),...housingDefaults(),...transportDefaults(),...socialDefaults(),...familyDefaults(),...bankingDefaults(),...businessDefaults(),...storyDefaults({minutes}),...healthDefaults({minutes}),...legalDefaults(),...recoveryDefaults(),...agingDefaults(),population:populationDefaults(minutes),planner:plannerDefaults(),digital:digitalDefaults(),device:null,shopping:shoppingDefaults()});
export function validate(s){s=migrateUrbanSave(s);if(!s||!validImportantJournal(s)||s.schema!==1||typeof s.name!=='string'||!s.name.trim()||s.name.length>24||!s.pos||!Number.isFinite(s.pos.x)||!Number.isFinite(s.pos.z)||!walkable(s.pos.x,s.pos.z)||!Number.isSafeInteger(s.cash)||s.cash<0||!Number.isSafeInteger(s.minutes)||s.minutes<0||s.minutes>MAX_MINUTES||!['energy','hunger','happy'].every(k=>Number.isFinite(s[k])&&s[k]>=0&&s[k]<=100)||!Number.isSafeInteger(s.rentUntil)||s.rentUntil<0||!Number.isSafeInteger(s.shifts)||s.shifts<0||typeof s.bike!=='boolean'||typeof s.riding!=='boolean'||s.riding&&!s.bike||!Array.isArray(s.journal)||s.journal.length>40||!s.journal.every(x=>typeof x==='string'&&x.length<=300))return null;
 s=migrateDevice(s); const migrated={appearance:{...DEFAULT_AVATAR},difficulty:DEFAULT_DIFFICULTY,...lifeDefaults(s),...survivalDefaults(s),...educationDefaults(),...careerDefaults(),...housingDefaults(),...transportDefaults(),...socialDefaults(),...familyDefaults(),...bankingDefaults(),...businessDefaults(),...storyDefaults(s,true),...healthDefaults(s),...legalDefaults(),...recoveryDefaults(),...agingDefaults(),population:populationDefaults(s.minutes),planner:plannerDefaults(),digital:digitalDefaults(),shopping:shoppingDefaults(),...s};if(!validShopping(migrated)||!validDevice(migrated.device,migrated.minutes)||!validDigital(migrated.digital,migrated.minutes)||!validPlanner(migrated.planner,migrated.minutes)||!validPopulation(migrated.population,migrated.minutes)||!validAvatar(migrated.appearance)||!validDifficulty(migrated.difficulty)||!validateSurvival(migrated)||!validateEducation(migrated)||!validateCareer(migrated))return null;if(!Object.hasOwn(s,'transport')&&s.bike)migrated.transport.bikePos={...s.pos};if(!Object.hasOwn(s,'personalFinance'))migrateFinance(migrated);if(!validateHousing(migrated)||!validatePersonalFinance(migrated)||!validateTransport(migrated)||!validateSocial(migrated)||!validateFamily(migrated)||!validateBanking(migrated)||!validateBusiness(migrated)||!validateStory(migrated)||!validateHealth(migrated))return null;if(!validateLegal(migrated)||!validateRecovery(migrated)||!validateAging(migrated))return null;if(!Object.hasOwn(s,'legal')){const copy=structuredClone(migrated);syncLegal(copy);return validate(copy);}if(!LIFE_FIELDS.every(k=>Number.isFinite(migrated[k])&&migrated[k]>=0&&migrated[k]<=100)||typeof migrated.autoRent!=='boolean'||!['bikeDue','maintenanceDebt','aidDay'].every(k=>Number.isSafeInteger(migrated[k])&&migrated[k]>=0)||migrated.aidDay>day(s)||(!s.bike&&(migrated.bikeDue!==0||migrated.maintenanceDebt!==0))||(s.bike&&migrated.bikeDue<=s.minutes))return null;return structuredClone(migrated)}
export function readSave(storage){const r=inspectSaves(storage,SAVE_KEY,validate);return r.primary||r.backup||r.checkpoint;}
export function writeSave(storage,s){return persistSave(storage,SAVE_KEY,s,validate).ok;}
export function clock(s){return `Ngày ${day(s)} · ${hhmm(s.minutes%config.dayMinutes)}`}
export const money=n=>n.toLocaleString('vi-VN')+' đ';
export const hasRoom=s=>!!residence(s);
const checks={work:(s,a)=>s.energy>=-a.energy&&s.hunger>=-a.hunger&&s.hydration>=20&&s.health>=config.criticalHealthThreshold,rent:s=>!hasRoom(s),sleep:(s,a)=>s.rentUntil>s.minutes&&s.rentUntil>=s.minutes+a.time,room:(s,a)=>s.rentUntil>s.minutes&&s.rentUntil>=s.minutes+a.time,buybike:s=>!s.bike,ride:s=>s.bike,aid:s=>s.aidDay!==day(s)&&(liquid(s)<30000||s.hunger<20),relief:s=>s.reliefDay!==day(s)&&liquid(s)<50000&&s.health<config.criticalHealthThreshold};
export const activities=Object.create(null);
for(const row of catalogs.Location_Actions){const building=record(row.building);const action={...row,id:row.legacyId,masterId:row.id,label:row.name,place:building.legacyId};if(checks[row.rule])action.check=s=>checks[row.rule](s,action);(activities[building.legacyId]??=[]).push(Object.freeze(action));}
for(const list of Object.values(activities))Object.freeze(list);Object.freeze(activities);
export function unavailableReason(s,a){if(ended(s))return 'Cuộc đời đã kết thúc.';if(incarcerated(s))return 'Đang chấp hành án.';if(retired(s)&&a?.rule==='work')return 'Đã nghỉ hưu.';if(!a)return 'Hoạt động không tồn tại';if(a.id.startsWith('gac_')){const p=places.find(p=>p.id===a.place);if(!p||Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])>2.5)return 'Cần đến địa điểm.';}if(!isOpen(a.place,s.minutes,a.time))return `Ngoài giờ phục vụ (${scheduleLabel(a.place)}) hoặc không đủ thời gian trước khi đóng cửa.`;if(s.minutes+a.time>MAX_MINUTES)return 'Đã đạt giới hạn mô phỏng.';if(s.cash+actionCash(s,a)<0)return 'Không đủ tiền.';if(!Number.isSafeInteger(s.cash+actionCash(s,a)))return 'Vượt giới hạn tiền mô phỏng.';if(a.rule==='work'&&(workMinutesToday(s)+a.time>config.dailyWorkLimit||s.minutes%1440+a.time>=1440))return 'Tối đa 8 giờ làm mỗi ngày (chính thức và thời vụ); ca phải kết thúc trước nửa đêm.';if(a.rule==='relief'&&!a.check(s))return 'Hỗ trợ một lần/ngày khi sức khỏe nguy kịch và thiếu tiền.';if(a.check&&!a.check(s))return a.rule==='work'?'Cần đủ sức khỏe, năng lượng, độ no và nước uống.':a.rule==='aid'?'Chỉ hỗ trợ một lần/ngày khi thiếu tiền hoặc quá đói.':'Chưa đủ điều kiện (quyền sở hữu hoặc thời hạn thuê phòng).';return '';}
export const available=(s,a)=>!unavailableReason(s,a);
export function perform(s,place,id){const a=activities[place]?.find(a=>a.id===id);if(!available(s,a))return false;
 if(id.startsWith('gac_'+place+'_'))id=id.slice(('gac_'+place+'_').length);
 const amount=actionCash(s,a);const expense=id==='rent'?'EXP_RENT':id==='buybike'?'EXP_TRANSPORT':id==='treatment'?'EXP_HEALTH':['cinema','coffee'].includes(id)?'EXP_FUN':'EXP_FOOD';if(amount<0&&!cashChange(s,amount,expense,a.label))return false;if(a.rule==='work'){s.workMinutes=workMinutesToday(s)+a.time;s.workDay=survivalDay(s);}if(id==='aid')s.aidDay=day(s);if(id==='relief')s.reliefDay=day(s);
 advanceTime(s,a.time,{resting:['sleep','nap','rest','shelter','garden_rest'].includes(id),sleeping:['sleep','nap','shelter'].includes(id)});
 if(amount>0)cashChange(s,amount,'INC_TEMP',a.label);
 for(const k of LIFE_FIELDS)s[k]=clamp(s[k]+(a[k]??0),0,100);
 if(a.asset?.startsWith('FOOD_'))recordFood(s,a.asset);recordHealthAction(s,id,a.time);if(a.rule==='work'){s.shifts++;practice(s,a.job);if(!s.career?.contract)completeRoutine(s,'work');}if(['sleep','shelter','nap'].includes(id))completeRoutine(s,'sleep');if(['meal','aid'].includes(id))completeRoutine(s,'eat');if(['free_water','aid','garden_water'].includes(id))completeRoutine(s,'drink');if(['shower','wash'].includes(id))completeRoutine(s,'wash');if(['rest','coffee','cinema','exercise','walk_park','garden_walk','garden_rest'].includes(id))completeRoutine(s,'relax');if(id==='rent')s.rentUntil=s.minutes+config.rentMinutes;if(id==='buybike'){s.bike=true;s.riding=true;if(s.transport)s.transport.bikePos={...s.pos};s.bikeDue=s.minutes+record('MNT_BIKE').intervalDays*1440;}if(id==='ride'){s.riding=!s.riding;if(s.transport)s.transport.bikePos={...s.pos};}settleDebt(s);log(s,a.log);return true;}
