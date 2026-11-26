# V1.11.0 — Game UI & HUD 2.0

## UX
- HUD mặc định chỉ gồm thời gian/thứ/ngày/thời tiết, tiền, tốc độ, pause/menu/settings, thanh 7 nhu cầu và minimap. Thanh chức năng: Nhân vật, Túi đồ, Lịch, Bản đồ, Thông báo, Menu. Tất cả các nghiệp vụ cũ vẫn vào được từ Menu cuộc đời. V hoặc Camera → Hiện HUD mở hai bảng chi tiết cũ.
- Nhân vật: hồ sơ, tuổi, nghề, nhu cầu, tiền, tài khoản, nhà và xe, truy cập ngoại hình, sức khỏe, nghề, tài chính.
- Lịch: `dayPlan` lấy lịch UTC mô phỏng từ `calendar`, hợp đồng từ `scheduledDay` và trạng thái nghỉ hưu/kết thúc. Hôm nay và ngày mai là dự báo theo hợp đồng hiện tại, không đảm bảo hợp đồng còn hiệu lực nếu người chơi thay đổi trạng thái. Không có hợp đồng không đồng nghĩa không thể làm việc thời vụ.
- Túi đồ: lọc thức ăn/nguyên liệu/tiêu hao/đồ dùng, dùng/bỏ từng đơn vị, giữ nguyên nghiệp vụ `useItem`/`discardItem` và trình diễn V1.9.0. Chỉ vật phẩm đang có được hiển thị.
- Thông báo: tối đa 40 thông báo toast trong phiên chơi, đánh dấu đã đọc khi mở; nhật ký và cảnh báo được lấy từ save hiện tại. Lịch sử toast không lưu qua reload; nhật ký nghiệp vụ cũ vẫn lưu.
- Dialogue: tên người nói, bubble thoại và lựa chọn phản hồi rõ nghĩa. Không thay đổi trust/relationship/giờ hoạt động. Context menu mở các hành động hiện có theo địa điểm.
- Pause: nút HUD mở menu, đóng menu vẫn pause; Tiếp tục hoặc Space mới khôi phục đồng hồ.

## Chặn zoom web, giữ zoom game
`meta viewport` khóa scale, CSS touch-action trên tài liệu (pan-y) và canvas (none), chặn gesture Safari và thao tác đa điểm native bằng preventDefault với passive:false. Ctrl/Cmd+wheel và phím zoom được chặn default; camera nhận pointer events như trước (pinch/rotate), wheel trên canvas vẫn thay đổi zoom game. Không stopPropagation các pointer events. Modal cuộn dọc bằng một ngón. Cỡ chữ form >=16px giảm auto zoom khi focus trên iOS. Hệ điều hành vẫn có thể phóng to bằng tính năng trợ năng; Safari có thể bỏ qua một số giới hạn viewport.

## QA
`npm test`, `npm run build:native-preview`, `node scripts/verify-release.mjs dist-native-preview`, `node scripts/smoke-http.mjs dist-native-preview`, `npm run simulate:balance`. Không dùng native-preview làm production. Three.js r180 yêu cầu npm ci, production build và kiểm thử thiết bị thật. iPhone PWA: mở game, chụm/tách hai ngón trên canvas, kiểm tra camera thay đổi nhưng thanh HUD không phóng; lặp lại trên modal, thử double tap và nhập ô text, cuộn dọc; kiểm tra portrait/landscape và không mất save. 
