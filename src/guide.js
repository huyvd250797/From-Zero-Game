// Release onboarding: read-only suggestions, never award money/XP or move the player.
import {activities,money,hasRoom} from './game.js';
import {actionCash,assetPrice} from './economy.js';
import {record} from './master-data.js';
import {retired} from './aging-state.js';
import {routineStatus} from './survival-state.js';
const action=(s,place,id)=>activities[place]?.find(a=>a.id===id);
const price=(s,place,id)=>Math.abs(actionCash(s,action(s,place,id)));
export function guideSteps(s){
 const done=new Set(routineStatus(s).filter(r=>r.done).map(r=>r.id));
 const worked=s.shifts>0||Object.values(s.career.experience).some(n=>n>0)||retired(s);
 return [
 {id:'work',title:'Kiếm thu nhập đầu tiên',detail:`Cửa hàng tiện lợi ở khu dân cư: ca 4 giờ, nhận ${money(price(s,'shop','work'))}. Kiểm tra sức khỏe, độ no và nước trước khi làm.`,place:'shop',done:worked},
 {id:'meal',title:'Ăn uống và uống nước',detail:`Cơm hộp ${money(price(s,'shop','meal'))}; nước uống miễn phí tại công viên. Ăn và uống trước khi các chỉ số xuống thấp.`,place:'park',done:done.has('eat')&&done.has('drink')},
 {id:'home',title:'Tìm chỗ nghỉ',detail:`Phòng trọ ${money(price(s,'room','rent'))}/tháng (30 ngày game). Có thể nghỉ miễn phí ở công viên khi thiếu tiền. Kiểm tra gia hạn tự động.`,place:'room',done:hasRoom(s)},
 {id:'study',title:'Phát triển kỹ năng',detail:'Tự học tại thư viện hoặc đăng ký khóa học phù hợp; học tập mở cơ hội tuyển dụng mới.',place:'library',done:s.education.completed.length>0||Object.values(s.education.xp).some(n=>n>0)},
 {id:'vehicle',title:'Chuẩn bị phương tiện',detail:`Xe đạp hiện có giá ${money(assetPrice(s,record('VEH_BIKE')))}. Chỉ mua sau khi đủ tiền sinh hoạt; chưa cần mua ngay.`,place:'bike',done:s.bike||s.transport.vehicles.length>0},
 ];
}
