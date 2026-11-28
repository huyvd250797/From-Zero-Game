import {SCHOOLS,schoolForAge,schoolById} from './school-life-data.js';
import {places} from './world.js';
import {cashChange} from './survival-state.js';
import {isOpen,log} from './life.js';
import {incarcerated} from './recovery-state.js';
import {driving} from './transport-state.js';
const day=s=>Math.floor(s.minutes/1440),age=(s,c)=>Math.floor((s.minutes-c.born)/(365*1440));
export const SCHOOL_FEES={kindergarten:250000,primary:120000,secondary:160000,high:220000};
export function childSchoolProfile(s,c){const school=schoolForAge(age(s,c)),r=c.school;return {school,registered:!!school&&r?.id===school.id,attendance:r&&school&&r.id===school.id?r.attendance:0,missed:r&&school&&r.id===school.id?r.missed:0,fee:school?SCHOOL_FEES[school.level]:0};}
export function childEnrollmentReason(s,id){const c=s.family.children.find(x=>x.id===id);if(!c)return 'Không tìm thấy con.';const r=childSchoolProfile(s,c),p=places.find(b=>b.id===r.school?.id);if(!p)return 'Chưa đến độ tuổi đi học phổ thông / đã trưởng thành.';if(r.registered)return 'Đã ghi danh cấp học này.';if(driving(s)||incarcerated(s)||s.aging?.ending)return 'Không thể ghi danh lúc này.';if(Math.hypot(s.pos.x-p.door[0],s.pos.z-p.door[1])>2.5||!isOpen(p.id,s.minutes))return 'Cần đến đúng trường trong giờ mở cửa.';if(s.cash<r.fee)return 'Không đủ phí ghi danh.';return '';}
export function enrollChild(s,id){if(childEnrollmentReason(s,id))return false;const c=s.family.children.find(x=>x.id===id),p=childSchoolProfile(s,c);if(!cashChange(s,-p.fee,'EXP_EDU','Ghi danh '+c.name+' - '+p.school.name))return false;c.school={id:p.school.id,enrolled:day(s),attendance:0,missed:0};log(s,`${c.name} ghi danh ${p.school.name}.`);return true;}
export function validChildSchool(c,minutes){const r=c.school;if(r===undefined)return true;const school=schoolById(r?.id);return !!school&&school.min<18&&Number.isSafeInteger(r.enrolled)&&r.enrolled>=Math.floor(c.born/1440)&&r.enrolled<=Math.floor(minutes/1440)&&['attendance','missed'].every(k=>Number.isSafeInteger(r[k])&&r[k]>=0)&&r.attendance+r.missed<=Math.floor(minutes/1440)-r.enrolled;}
export function settleChildSchool(s,c,d,eligible){const r=c.school,p=childSchoolProfile(s,c);if(!p.registered||d<=r.enrolled)return false;if(eligible)r.attendance++;else r.missed++;return eligible;}
