# Changelog

## V0.5.0 — Time & Life Simulation (2026-11-25)
- Đồng hồ chạy liên tục, ×1/2/4/8/16, lịch Gregorian và sinh nhật; pause/modal/ẩn tab dừng mô phỏng.
- Ngày đêm chuyển màu liên tục ở cả WebGL và Canvas; giao thông nền theo thời gian game.
- Sáu chỉ số cuộc sống, hao hụt nhu cầu, hậu quả sức khỏe, stress, cảnh báo và 5 hoạt động hồi phục.
- Lịch mở/đóng 22 địa điểm, điều kiện thời lượng hoạt động và nút chờ mở cửa.
- Gia hạn phòng 120.000đ/24h có thể tắt; phí xe đạp 10.000đ/30 ngày và ghi nợ khi thiếu tiền.
- Save cũ tự bổ sung trường mới; giữ map và navigation, 60 catalog / 519 bản ghi, Master Data V1.2.0.
- 47/47 unit tests, build offline; smoke test Chromium Canvas với storage mô phỏng. Không xác minh deploy thật.

## V0.4.0 — Character & Navigation (2026-11-25)
- Low-poly avatar có khớp tay/chân, hướng quay và animation idle/walk/run/ride.
- Shift chạy, joystick analog với dead zone và nút chạy, tự reset khi mất input.
- Direct line-of-sight + A* + rút gọn đường, kiểm tra collision liên tục, slide và replan giới hạn.
- Route ribbon, marker đích, khoảng cách còn lại, hủy tuyến; tự mở tương tác khi đến cửa địa điểm.
- Camera follow exponential damping. Giữ 192×192, 22 địa điểm, toàn bộ 60 danh mục/499 bản ghi và save schema 1.
- Cập nhật service worker cache và build version, thêm 9 test; tổng 34/34 đạt.

## V0.3.0 — World & City Engine (2026-11-25)
- Thành phố 192×192, 10 phân khu, 79 công trình/khu chức năng, 24 loại, 12 trục đường, 22 điểm tương tác.
- Công trình theo kiểu kiến trúc Master Data, đường 2/4 làn, vạch qua đường, cảnh quan, giao thông nền.
- 36 chunk tạo geometry theo nhu cầu, culling, LOD, cache LRU, A* heap và spatial collision index.
- Minimap có màu phân khu, tuyến đi và camera; bản đồ lớn, lọc phân khu, toàn cảnh.
- Master Data schema 1.1.0, 60 danh mục, 499 bản ghi, validator hình học. Save schema 1 giữ nguyên.
- 25 bài kiểm thử Node, kiểm thử Canvas desktop/mobile mô phỏng; chưa deploy thật hoặc xác minh WebGL/PWA trên thiết bị thật.

## V0.2.0 — Canonical Master Data (2026-11-25)
- 60 danh mục JSON, 393 bản ghi, schema V1.0.0 và Master Data Validator.
- Gộp 5 khái niệm liên quan để khớp số danh mục đã chốt.
- Biên dịch bundle read-only, chuyển cấu hình, địa điểm, hình học, hành động và nhu cầu di chuyển sang dữ liệu chuẩn.
- Tra cứu danh mục trực tiếp trong Cài đặt; cập nhật version và offline cache.
- Giữ schema save v1 và khả năng deploy static Vercel; 18 bài test đạt.
- Nội dung mở rộng là seed chưa kích hoạt các engine tương lai.


## V0.1.0 — Foundation & Playable City Prototype
- Initial UI, new game/continue/settings, low-poly 3D city, orthographic camera and minimap.
- Character movement, A* navigation, collision, desktop and mobile controls.
- Eight places, starter work/food/rent/rest/bicycle activities, cash and journal.
- Local save, validation, import/export, PWA manifest and cache worker.
- Dependency-free static build and Vercel configuration.
