# Changelog

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
