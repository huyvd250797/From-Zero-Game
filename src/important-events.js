// Notification policy is presentation-only. The existing internal journal remains an action receipt.
const strip=s=>String(s??'').replace(/^Ngày \d+:\s*/,'').trim();
const major=/^(?:Bạn đến thành phố|Biến cố:|Lựa chọn:|Chúc mừng sinh nhật|Ký hợp đồng|Bị sa thải|Thăng chức|Chuyển công tác|Nghỉ việc:|Được tăng lương|Nhận chức vụ|Hoàn thành .+\. Nhận |Gia đình đón thêm thành viên|Kết hôn|Ly hôn|Đã thành lập|Đã đóng cửa|Nghỉ hưu:|Kết thúc hành trình|Bắt đầu chấp hành án|Đã chấp hành xong án|Phán quyết giả lập|Tiếp nhận hồ sơ:|Có yêu cầu kiểm tra hồ sơ|Đã hoàn thành nghĩa vụ pháp lý|Đã mua (?:nhà|căn hộ|xe|ô tô)|Đã bán (?:nhà|căn hộ|xe|ô tô))/iu;
const danger=/(?:nguy kịch|kiệt sức|ảnh hưởng sức khỏe|căng thẳng cao|quá hạn|mất chỗ ở|phát sinh nợ|thiếu chỗ ở|cần được chăm sóc|không đủ tiền gia hạn|chưa thanh toán|đến hạn bảo dưỡng|hết năng lượng|cảnh báo \d+\/|phá sản|thanh lý tài sản|xung đột bản lưu|bản lưu.*hỏng)/iu;
export function importantEvent(message){const s=strip(message);return major.test(s)||danger.test(s);}
export function actionFeedback(message){return /^(?:Không |Chưa |Hãy |Cần |Vui lòng|Lỗi |Đã lưu\.|Đã kiểm tra\.|Đã xuất|Đã sao lưu|Đã nhập)/iu.test(strip(message));}
export function importantEntries(s){return (s.importantJournal??s.journal??[]).filter(importantEvent);}
export function recordJournal(s,message){const previous=importantEntries(s);if(!s.importantJournal)s.importantJournal=previous.slice(0,40);if(importantEvent(message)&&s.importantJournal[0]!==message)s.importantJournal=[message,...s.importantJournal].slice(0,40);s.journal=[message,...s.journal].slice(0,20);}
export function validImportantJournal(s){return s.importantJournal===undefined||Array.isArray(s.importantJournal)&&s.importantJournal.length<=40&&s.importantJournal.every(x=>typeof x==='string'&&x.length<=300&&importantEvent(x));}
// Only newly active warnings, not every HUD refresh. Clearing a condition rearms it.
export class AlertTransitions{constructor(){this.clear();}clear(){this.active=new Set();}update(messages){const next=new Set(messages),fresh=[...next].filter(x=>!this.active.has(x));this.active=next;return fresh;}}
