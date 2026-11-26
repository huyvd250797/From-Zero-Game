# V0.23.0 Release Candidate

## Phạm vi và quyết định
- Không thay đổi Master Data V2.9.0, giá/thu nhập, độ khó, thời gian game hoặc schema save 1. Không có backend/SQL migration.
- Chất lượng 0: DPR tối đa 1 và mục tiêu tối đa 30 FPS; chất lượng 1: DPR tối đa 1,65 và mục tiêu tối đa 60 FPS WebGL. Canvas fallback luôn tối đa 30 FPS. Khi menu/modal/tạm dừng, render khoảng 4 FPS; tab ẩn, chấp hành án, kết thúc game hoặc mất context không dựng hình. FPS chỉ đo trong gameplay hoạt động, trên cửa sổ khoảng 2 giây, thời gian đo gồm JS renderer và nhãn DOM, không phải thời gian GPU.
- Cache A* 128 tuyến, cache minimap 4 kích thước, cache lịch NPC 96 mục, static chunks LRU kế thừa. Không tăng tốc đồng hồ bằng cách bỏ qua quy tắc theo phút. Chưa có benchmark heap lâu dài trên thiết bị thật.
- Save chính `fromzero.save.v1`, backup `fromzero.backup.v1`, checkpoint `fromzero.checkpoint.v1`. Bản chính hợp lệ mới thay được backup; checkpoint giữ bản chính trước lần thay thế gần nhất. Ưu tiên đọc chính, backup, checkpoint. Khôi phục có xác nhận; save JSON gốc tương thích. Cảnh báo khi quota/quyền lưu trữ/validation lỗi. Giới hạn JSON 2 MB; backup có thể làm tăng dung lượng localStorage, nếu quota không đủ sẽ từ chối ghi thay vì xóa bản chính. Xuất JSON định kỳ; xóa dữ liệu trình duyệt sẽ mất cả ba bản. Không phải lưu cloud. Xung đột tab phát hiện bằng so sánh bản chính và sự kiện storage, không phải khóa nguyên tử cho các lần ghi đồng thời tuyệt đối. Chỉ chơi một tab.
- WebGL context loss: tạm dừng, cố lưu, khóa thao tác và cho phép xuất JSON hoặc tải lại có xác nhận. Không tự dựng lại context. Nếu thiết bị không hỗ trợ WebGL ngay khi khởi động, Canvas fallback kế thừa.
- Build tạo đường dẫn JS/CSS theo fingerprint và cache SHA-256. Worker cài tất cả tài nguyên trước khi điều khiển, cache-first, cache miss chỉ tải nội dung đúng integrity. Cập nhật chờ khi còn client cũ, hoặc kích hoạt theo nút Cập nhật sau khi lưu; các tab đã được worker điều khiển tải lại sau controllerchange nếu lưu thành công. Worker cũ V0.22.0 chưa có nút này, có thể cần đóng hết tab và mở lại trong lần nâng cấp đầu tiên. Dev không đăng ký worker mới. PWA offline chỉ khả dụng sau lần online hoàn tất cache trên HTTPS/localhost; trình duyệt có thể tự thu hồi cache.

## Kiểm thử có thể chạy lại
```sh
npm ci
npm test
npm run build
npm run verify:release
npm run smoke:http
npm run benchmark:navigation
npm run simulate:balance
npm run preview
```
`verify:release` kiểm tra danh mục, SHA-256 và HTML references. `smoke:http` tải các tài nguyên qua HTTP bằng Fetch integrity. Các test worker dùng harness Node giả lập CacheStorage và event lifecycle, không thay thế kiểm thử Service Worker thật.

## Kiểm tra nghiệm thu trước V1.0.0 (thiết bị thật)
1. Xuất JSON V0.22.0 trước cập nhật; dùng origin hiện tại khi deploy. Mở game, kiểm tra dữ liệu, thực hiện hoạt động có giao dịch, lưu và reload.
2. Chrome/Edge HTTPS: mở DevTools Application, kiểm tra worker activated và controller, đủ cache version. Tắt mạng, reload từ URL root và tiếp tục game, lưu, reload lại, thực hiện hoạt động. Bật mạng. Kiểm tra cài đặt standalone bằng menu trình duyệt.
3. Safari iOS: thêm vào Màn hình chính, mở lần online, thử airplane mode/reload, kiểm tra safe area, bàn phím, joystick, pinch, xoay màn hình. Kiểm tra Chrome Android trên thiết bị thật.
4. Deploy một build thay đổi fingerprint (staging). Giữ tab cũ, kiểm tra thông báo update; trước xác nhận phải chạy bộ mã cũ. Xác nhận lưu/cập nhật, kiểm tra cache mới, save giữ nguyên; thử hai tab và xung đột save. Thử update mất mạng giữa chừng: bản cũ vẫn hoạt động. Không rollback bằng cách xóa storage.
5. Chạy 30–60 phút di chuyển giữa phân khu, đổi camera/zoom/chất lượng, mở nhiều modal; ghi FPS, frame times, heap và GPU memory. Kiểm tra context lost/restore, tab hidden/resume, thiết bị yếu. Kiểm tra không phát sinh tiền/XP do thay đổi đồ họa.
6. Sao lưu, nhập JSON, cố tình làm lỗi bản chính ở profile test, phục hồi backup/checkpoint, thử quota đầy. Không thử trên save cá nhân chưa sao lưu.

## Trạng thái kiểm chứng
332 test kế thừa + 14 RC = 346; build/inventory/HTTP integrity đạt. Chromium 1440×900 và 390×844: nạp module build bằng Blob/import map, storage mô phỏng; tạo nhân vật, cài đặt, phục hồi save lỗi/checkpoint, thu gọn mobile menu và mô phỏng sự kiện xung đột storage. Không có pageerror. Truy cập localhost từ Chromium bị chặn ERR_BLOCKED_BY_ADMINISTRATOR, dù HTTP từ Node/Python hoạt động. Chưa chứng nhận Service Worker thật, reload offline, install standalone, WebGL GPU thật, Safari/Edge, thời gian chơi dài trên thiết bị thật hoặc Vercel. Đây là RC kỹ thuật, chưa phải xác nhận production toàn diện.
