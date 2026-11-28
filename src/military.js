import {MILITARY_HQ,MILITARY_BASE,SERVICE_DAYS,DAY_MINUTES,MILITARY_MODES,DUTIES,militaryData,militaryActive,finishMilitary} from './military-state.js';
import {places} from './world.js';
import {ageOf,retired,ended} from './aging-state.js';
import {incarcerated} from './recovery-state.js';
import {driving} from './transport-state.js';
import {advanceTime,MAX_MINUTES,log} from './life.js';
import {cashChange,workMinutesToday,survivalDay,completeRoutine} from './survival-state.js';
import {config} from './master-data.js';
const near=(s,id)=>{const p=places.find(x=>x.id===id);return !!p&&Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])<=2.5;};
const open=s=>s.minutes%1440>=420&&s.minutes%1440<960;
const blocked=s=>ended(s)||retired(s)||incarcerated(s)||driving(s);
export function screenReason(s){if(blocked(s)||militaryActive(s))return 'Không thể khám lúc này.';if(!near(s,MILITARY_HQ)||!open(s))return 'Đến ban chỉ huy 07:00–16:00, đi bộ.';if(s.health<60)return 'Sức khỏe trong game cần ≥60.';if(ageOf(s)<18||ageOf(s)>45)return 'Độ tuổi mô phỏng 18–45.';return '';}
export function militaryScreening(s){if(screenReason(s))return false;militaryData(s).screenedAt=s.minutes;log(s,'Đã đạt kiểm tra sức khỏe quân sự mô phỏng.');return true;}
export function enlistReason(s,mode){if(!Object.hasOwn(MILITARY_MODES,mode))return 'Hình thức không hợp lệ.';const why=screenReason(s);if(why)return why;const f=s.cityServices?.military;if(f?.screenedAt==null||s.minutes-f.screenedAt>7*DAY_MINUTES)return 'Cần kiểm tra sức khỏe trong 7 ngày game.';if(s.career?.contract)return 'Cần kết thúc hợp đồng dân sự trước.';if(mode==='service'&&f.serviceCompleted)return 'Đã hoàn thành nghĩa vụ mô phỏng.';if(mode==='service'&&s.minutes+SERVICE_DAYS*DAY_MINUTES>MAX_MINUTES)return 'Không đủ thời gian mô phỏng.';return '';}
export function enlistMilitary(s,mode){if(enlistReason(s,mode))return false;militaryData(s).active={mode,start:s.minutes,until:mode==='service'?s.minutes+SERVICE_DAYS*DAY_MINUTES:null,duties:0,lastDay:-1,earned:0};s.career.application=null;log(s,'Bắt đầu '+MILITARY_MODES[mode]+' tại An Lạc.');return true;}
export function dutyReason(s,id){const a=s.cityServices?.military?.active,d=DUTIES[id];if(!Object.hasOwn(DUTIES,id)||!a||blocked(s))return 'Không thể nhận nhiệm vụ.';if(!near(s,MILITARY_BASE)||!open(s)||s.minutes%1440+d.minutes>960)return 'Đến doanh trại trong giờ 07:00–16:00.';if(a.lastDay===Math.floor(s.minutes/DAY_MINUTES))return 'Đã nhận nhiệm vụ hôm nay.';if(s.health<35||s.energy<40||s.hunger<35||s.hydration<35)return 'Cần nghỉ ngơi và bổ sung nhu cầu.';if(workMinutesToday(s)+d.minutes>config.dailyWorkLimit||s.minutes+d.minutes>MAX_MINUTES||a.until!==null&&s.minutes+d.minutes>a.until)return 'Không đủ thời gian nhận nhiệm vụ.';return '';}
export function militaryDuty(s,id){if(dutyReason(s,id))return false;const a=s.cityServices.military.active,d=DUTIES[id],pay=d.pay*(a.mode==='career'?2:1);if(!cashChange(s,pay,'INC_WAGE','Phụ cấp nhiệm vụ '+d.label))return false;a.duties++;a.lastDay=Math.floor(s.minutes/DAY_MINUTES);a.earned+=pay;s.workMinutes=workMinutesToday(s)+d.minutes;s.workDay=survivalDay(s);advanceTime(s,d.minutes);s.energy=Math.max(0,s.energy-8);completeRoutine(s,'work');log(s,'Hoàn thành nhiệm vụ '+d.label+'.');return true;}
export function leaveMilitary(s){if(blocked(s)||!near(s,MILITARY_HQ)||!open(s)||s.cityServices?.military?.active?.mode!=='career')return false;finishMilitary(s,'resigned');log(s,'Kết thúc công việc quân nhân; có thể tìm việc dân sự.');return true;}
