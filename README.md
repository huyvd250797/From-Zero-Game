# From Zero — Từ hai bàn tay trắng
**V1.0.0 — Official Release** · 26/11/2026

Game mô phỏng cuộc đời single-player tại thành phố An Lạc. Nhân vật bắt đầu ở tuổi 18, với vốn 300.000–800.000đ theo độ khó; tự lựa chọn sinh tồn, học tập, sự nghiệp, gia đình, tài sản, đầu tư, kinh doanh, phục hồi và kết thúc cuộc đời. Không cần tài khoản, API key, database hoặc backend.

## Bắt đầu
1. Chọn **Bắt đầu cuộc đời mới**, nhập tên, chọn Dễ/Bình thường/Khó. Save cũ giữ nguyên độ khó đã có; save từ trước V0.22.0 mặc định Bình thường.
2. Hướng dẫn khởi đầu tự mở. Chọn **Đến nơi** để nhân vật tự tìm đường; đến cửa và tương tác với hoạt động. Có thể đóng hướng dẫn và tự do khám phá.
3. Kiếm thu nhập tại cửa hàng khu dân cư (ca 4 giờ); mua cơm tại cửa hàng, uống nước/ nghỉ miễn phí ở công viên, thuê trọ khi có đủ tiền. Giá theo thời gian và độ khó. Dùng Sinh tồn & phục hồi để xem dự toán. Không có phần thưởng chỉ vì mở hướng dẫn.
4. Học miễn phí tại thư viện hoặc đăng ký khóa học; ứng tuyển khi đủ kỹ năng. Quản lý nhà ở, phương tiện, quan hệ, sức khỏe, tài chính và các biến cố qua menu chức năng.
5. Duy trì nhu cầu và kiểm tra chi phí định kỳ. Tua nhanh thời gian không bỏ qua các nghĩa vụ. Phá sản/đi tù vẫn có cơ hội phục hồi. Từ 60 tuổi có thể nghỉ hưu; kết thúc lượt chơi qua Aging & Legacy, lưu Hall of Fame.

## Điều khiển
| PC | Mobile |
|---|---|
| WASD/mũi tên, Shift chạy | Joystick, nút CHẠY |
| Chọn địa điểm hoặc chạm bản đồ để tìm đường | Chạm địa điểm / bản đồ |
| E tương tác, B lên/xuống xe | Nút Tương tác, Phương tiện |
| F bám nhân vật, Z/X xoay, cuộn zoom | Nút xoay/zoom, pinch, kéo camera |
| Esc hủy đường/đóng modal; Space tạm dừng | Nút đóng, Hủy tuyến đường, tạm dừng |
| Menu chức năng bên trái | ☰ thu gọn menu, mở lại khi cần |

Thời gian chạy khi gameplay hoạt động. Modal, tạm dừng và tab ẩn dừng mô phỏng; chọn ×1/2/4/8/16 để điều chỉnh nhịp game.

## Nội dung V1.0.0
- Thành phố low-poly 192 × 192, 10 phân khu, 28 địa điểm tương tác, 24 NPC định danh và lịch sinh hoạt.
- Sinh tồn, giáo dục (15 khóa học), nghề nghiệp, tài chính, nhà ở và phương tiện, quan hệ, hôn nhân và con cái.
- Ngân hàng, tiết kiệm, vay vốn, cổ phiếu/vàng giả lập, 6 loại hình kinh doanh, kinh tế biến động.
- 26 biến cố, 55 lựa chọn cốt truyện; sức khỏe dài hạn, thói quen, pháp luật, chấp hành án, thanh lý và phục hồi.
- Lão hóa, lương hưu, di sản, 40 kết cục trong dữ liệu (39 có quy tắc đánh giá), Hall of Fame, 3 mức độ khó.
- Hai chế độ đồ họa, cache A*, ba lớp lưu trữ, cảnh báo xung đột tab, PWA fingerprint và precache SHA-256.
- V1.0.0: onboarding có dẫn đường thật, bảo vệ xác nhận thay thế save, hỗ trợ điều hướng bàn phím trong modal, đồng bộ branding.

## Deploy GitHub → Vercel
Giải nén ZIP, đưa **nội dung bên trong** vào root repo. Không commit dist hoặc node_modules. Cấu hình `vercel.json` đã có:

| Setting | Value |
|---|---|
| Framework Preset | Other |
| Root Directory | ./ |
| Install Command | npm ci |
| Build Command | npm run build |
| Output Directory | dist |
| Node.js | 22.x (engine >=20) |
| Env / DB / SQL migration | Không cần |

Khi repo liên kết Vercel, push branch production theo thiết lập hiện tại. Giữ cùng domain để truy cập bản lưu cũ. Không phải Next.js, không cần routes-manifest.json. Đây là source đã build, chưa tự deploy lên Vercel.

## Chạy local và kiểm tra
```sh
npm ci
npm run release:check
npm run preview
```
Mở `http://localhost:5173`. `npm run dev` dành cho phát triển. Không mở trực tiếp index.html bằng file://. Bộ kiểm tra không cần tải dependency ngoài; `npm run release:check` chạy install offline, test, production build, kiểm tra SHA-256, HTTP và 30 ngày sinh tồn. Các test dài hạn riêng: `npm run simulate:balance -- --long`; benchmark cache A*: `npm run benchmark:navigation`.

## Save và cập nhật
Save schema 1 giữ nguyên: `fromzero.save.v1`, `fromzero.backup.v1`, `fromzero.checkpoint.v1`. Chỉ có một cuộc đời đang chơi, Hall of Fame lưu trong save. Autosave khoảng 12 giây, sau hoạt động và khi rời trang; **Cài đặt → Xuất bản lưu JSON** trước cập nhật/đổi thiết bị. Chỉ chơi một tab. Khi có bản cập nhật PWA, xác nhận lưu và cập nhật. Đừng xóa dữ liệu trình duyệt để ép update; nếu cần, đóng hết tab rồi mở lại. Bản lưu là dữ liệu cục bộ, không phải cloud. Quota, xóa dữ liệu hoặc đổi origin có thể ảnh hưởng truy cập save. Cài đặt có nhập JSON, xuất/khôi phục backup và checkpoint.

## PWA và giới hạn
HTTPS hoặc localhost, mở online lần đầu và chờ cache được chuẩn bị. Chrome/Edge có thể có nút cài đặt; iOS Safari → Chia sẻ → Thêm vào màn hình chính. Chế độ Tiết kiệm giới hạn 30 FPS, Tiêu chuẩn mục tiêu 60 FPS WebGL; không đảm bảo FPS trên mọi thiết bị. Canvas fallback luôn tối đa 30 FPS. Các chỉ số kinh tế, sức khỏe, pháp luật, lương hưu đều là mô phỏng hư cấu, không phải tư vấn ngoài đời.

Đã hoàn thành roadmap nền tảng V1.0.0, còn giới hạn: AI NPC/nhân viên cơ bản, nhà tù là giao diện quản lý riêng, thừa kế quy đổi tiền và timeline mới, 1 kết cục chưa có nghề tương ứng, chưa thử tất cả hành trình. Cần kiểm thử PWA thật, Safari/Edge, WebGL GPU và hiệu năng thiết bị thật trước khi phát hành rộng rãi. Xem [checklist nghiệm thu](docs/OFFICIAL-RELEASE.md).

## Kỹ thuật và tài liệu
JavaScript ES Modules, WebGL/Canvas, build Node.js không dependency. Master Data V2.9.0 (60 danh mục, 693 bản ghi), validate và compile từ `master-data/`; `src/` là simulation và UI; `public/` là manifest, icon, worker; `scripts/` là công cụ build/test; `tests/` là regression. Giữ nguyên các module nghiệp vụ V0.23.0. `docs/` và [CHANGELOG](CHANGELOG.md) chứa tài liệu theo từng phiên bản; các mục "chưa triển khai" ở tài liệu lịch sử mô tả thời điểm phát hành phiên bản tương ứng, không phải trạng thái hiện tại.
