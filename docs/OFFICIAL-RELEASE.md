# From Zero V1.0.0 — Official Release

## Phạm vi
Baseline: FromZero-V0.23.0-Performance-PWA-and-Release-Candidate(1).zip. V1.0.0 giữ nguyên gameplay, Master Data V2.9.0, schema save 1, origin/key và các hợp đồng đã ký. Không migration, không dependency mới. Mục tiêu đóng gói phát hành, sửa rủi ro UI/save và onboarding, không mở module lớn.

## Kiểm tra tự động
`npm run release:check` (Node >=20, khuyến nghị 22.x): install offline, 353 test (346 kế thừa + 7 mới), build, inventory SHA-256, HTTP integrity, 30 ngày sinh tồn. Kịch bản 30 ngày giữ đúng kết quả V0.22.0/V0.23.0: Dễ 5.180.000đ; Bình thường 3.050.000đ; Khó 705.000đ. Cả ba sức khỏe 100, dinh dưỡng 100, tinh thần 100, nợ ngủ 0, không bệnh. 47 tài nguyên precache. Kịch bản 82 năm có sẵn từ V0.22.0, không chạy lại toàn bộ ở V1.0.0. Benchmark navigation không đổi thuật toán.

## UI kiểm thử
Chromium headless 1440×900 và 390×844 cảm ứng giả lập, actual production JS qua Blob/importmap, Canvas fallback và localStorage giả lập. Đạt: title V1.0.0, hướng dẫn title, focus Tab/Esc và trả focus, tạo mới mức Khó 300.000đ, tự mở hướng dẫn, dẫn đường thật đến cửa hàng, mở Cài đặt, phục hồi primary lỗi từ backup, chặn thao tác tạo mới khi primary đã thay đổi, mobile guide, thu gọn menu, mặc định chất lượng 0, cảnh báo xung đột. Không pageerror. Không đánh đồng với WebGL hoặc PWA thật.

## Checklist nghiệm thu trên staging / production
- [ ] Sao lưu save RC thành JSON; deploy staging trước nếu có. Dùng trình duyệt riêng hoặc profile test, không làm hỏng save thật.
- [ ] Chrome/Edge desktop: mở URL HTTPS, tạo mới và tiếp tục, thực hiện giao dịch, save/reload; chạy 30–60 phút; ghi FPS, heap, context loss.
- [ ] Android Chrome và iPhone Safari: điều khiển joystick, pinch, bàn phím, safe area, xoay màn hình, đóng modal, thu gọn menu; xác minh touch và WebGL GPU.
- [ ] PWA: kiểm tra worker activated/controller và cache đủ 47 tài nguyên; cài standalone, tắt mạng, reload root và tiếp tục game, lưu, reload lần nữa; bật mạng lại.
- [ ] Update RC → V1.0.0 giữ cùng origin: giữ tab cũ, đợi thông báo, xác nhận cập nhật sau lưu; kiểm tra save, version và cache. Thử update đứt mạng trong profile test. Không xóa storage để ép update. Xem docs/RELEASE-CANDIDATE.md.
- [ ] Kiểm tra nhập/xuất JSON, backup/checkpoint, quota và hai tab trong profile test. Snapshot check không phải khóa nguyên tử giữa các tab; chỉ chơi một tab.
- [ ] Kiểm tra các nhánh nghề, gia đình, đầu tư, kinh doanh, điều trị, pháp lý, chấp hành án, phá sản và kết cục trong các save riêng; không coi unit test là toàn bộ playthrough.

## Giới hạn nghiệm thu
Local HTTP Node truy cập thành công nhưng Chromium bị chặn `ERR_BLOCKED_BY_ADMINISTRATOR` khi điều hướng localhost, nên chưa chứng nhận worker thật, cài PWA, offline reload, cập nhật online thực tế, Safari/Edge, WebGL GPU, thiết bị vật lý, long-session RAM/FPS hay deploy Vercel. Không có cam kết 60 FPS trên mọi máy. Các điều kiện trên là checklist cần hoàn thành trước phát hành rộng rãi. Phiên bản 1.0.0 là gói source chính thức theo roadmap, không đồng nghĩa chứng nhận production toàn diện.

## Rollback
Xuất JSON trước cập nhật, lưu ZIP RC và V1.0.0. Khi rollback dùng bản ZIP RC đồng bộ đầy đủ (không trộn tài nguyên build), giữ origin, tải lại sau worker đổi phiên bản. Giữ bản JSON trước nâng cấp nếu cần phục hồi; không xóa dữ liệu trình duyệt. Không có SQL migration. Sau V1.0.0, ưu tiên hotfix theo lỗi thực tế, roadmap mới chưa chốt.
