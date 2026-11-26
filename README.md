# From Zero — Từ hai bàn tay trắng
**V1.2.1 — Three.js Engine Migration** · 26/11/2026

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

## Gameplay kế thừa V1.0.0
- Thành phố 3D cách điệu 192 × 192, 10 phân khu, 28 địa điểm tương tác, 24 NPC định danh và lịch sinh hoạt.
- Sinh tồn, giáo dục (15 khóa học), nghề nghiệp, tài chính, nhà ở và phương tiện, quan hệ, hôn nhân và con cái.
- Ngân hàng, tiết kiệm, vay vốn, cổ phiếu/vàng giả lập, 6 loại hình kinh doanh, kinh tế biến động.
- 26 biến cố, 55 lựa chọn cốt truyện; sức khỏe dài hạn, thói quen, pháp luật, chấp hành án, thanh lý và phục hồi.
- Lão hóa, lương hưu, di sản, 40 kết cục trong dữ liệu (39 có quy tắc đánh giá), Hall of Fame, 3 mức độ khó.
- Bốn cấp độ đồ họa, cache A*, ba lớp lưu trữ, cảnh báo xung đột tab, PWA fingerprint và precache SHA-256.
- V1.0.0: onboarding có dẫn đường thật, bảo vệ xác nhận thay thế save, hỗ trợ điều hướng bàn phím trong modal, đồng bộ branding.

## Three.js Engine Migration V1.2.1
- Three.js r180 (`three@0.180.0`) là renderer ưu tiên mặc định, sử dụng WebGL 2. `package-lock.json` ghim chính xác tarball và integrity. Native WebGL 2 V1.2.0, WebGL 1 và Canvas là fallback độc lập; lựa chọn Legacy cũ được giữ nguyên. Cài đặt hiển thị renderer đang hoạt động và nguyên nhân fallback.
- Bridge chuyển hình học hiện tại thành `BufferGeometry`, 7 `MeshStandardMaterial` với màu linear, roughness/metalness, texture procedural nội bộ, contact shading tùy chọn; giữ camera, vùng va chạm và tọa độ thành phố. `InstancedMesh` dùng cho cây ven đường, LOD theo vùng, cache tối đa 44 phân vùng/mức LOD. NPC và phương tiện vẫn dùng hình học hiện tại.
- Ánh sáng Directional/Hemisphere, bóng PCF, ACES tone mapping, EffectComposer với Bloom/FXAA/OutputPass, bốn preset và adaptive resolution. GLTFLoader chính thức cho ghế GLB mẫu; SkeletonUtils và AnimationMixer sẵn sàng cho V1.3.0, chưa gắn vào nhân vật hiện tại. Chưa có SSAO thật, texture PBR độc lập hay mô hình nhân vật rig hoàn chỉnh.
- Production build **yêu cầu npm ci thành công**; tự kiểm thử với Three.js thật (camera, geometry, GLB, mixer, graph), đóng gói các module vendor và LICENSE vào fingerprint, đưa vào SHA-256 precache. Không dùng CDN lúc chơi. Không có dependency giả. Xem [THREE-JS-MIGRATION](docs/THREE-JS-MIGRATION.md).
- **Trạng thái bàn giao:** 383/383 test không cần dependency đạt, build native QA và kiểm thử fallback đạt. npm không truy cập được Registry tại môi trường xây dựng nên chưa chạy 5 test runtime Three.js, chưa xác nhận production build, WebGL 2 Three.js hoặc PWA thật. Native preview nằm riêng `dist-native-preview/`, không phải output Vercel và không đăng ký Service Worker. Chỉ nghiệm thu chuyển đổi sau khi build và kiểm tra thiết bị thật.

## Thành phố An Lạc V1.2.0
- 62 công trình và 17 lô đất mở dùng 12 mẫu kiến trúc/cảnh quan procedural, 10 palette phân khu. Nhà phố có mái ngói, ban công, mặt tiền theo hướng cửa; cửa hàng có kính, mái che, biển chữ hình học tiếng Việt; chung cư, văn phòng, cơ sở công cộng và nhà xưởng có kiểu riêng.
- Vỉa hè, bó vỉa, vạch đường, lối tiếp cận cửa, cây dạng tán tròn và cây cau cách điệu, cột đèn, thùng rác, ghế, bồn hoa, đài nước, luống cây và sân thể thao. Các vật trang trí không có collision/hoạt động riêng; đèn chưa phát sáng cục bộ. Hình học dùng chung WebGL 2/WebGL 1/Canvas. Canvas Low/Medium ưu tiên LOD thấp.
- Không thay đổi master data, vị trí, collision, gameplay, save schema. Dùng lại GLB ghế của V1.1.0; chưa thêm bộ mô hình Blender hoặc texture ngoài. Xem [Immersive City](docs/IMMERSIVE-CITY.md).

## Nền tảng đồ họa native V1.1.0–V1.2.0 (fallback kế thừa)
- WebGL 2 native, shader vật liệu theo mô hình chiếu sáng microfacet; bề mặt procedural theo tọa độ thế giới, bóng đổ depth map PCF, ánh sáng ngày/đêm, phản xạ giả lập và phát sáng cửa kính.
- Low/Medium/High/Ultra; bật/tắt riêng bóng đổ, bóng tiếp xúc gần mặt đất (không phải SSAO), bloom và AA hậu kỳ đơn giản. Độ phân giải thích ứng có ngưỡng và hysteresis.
- GLB ghế đá mẫu tự tạo, bộ đọc GLB 2.0 tĩnh có giới hạn, fallback mô hình code khi tải thất bại. Renderer native không sử dụng CDN hay dependency ngoài.
- Nếu không có WebGL 2 hoặc lỗi khởi tạo, tự chọn WebGL 1/Canvas. Có thể chọn Legacy trong Cài đặt rồi lưu và tải lại. Khi lỗi renderer lúc chơi, tạm dừng và lưu/xuất JSON trước khi chuyển Legacy.
- Ở V1.1.0–V1.2.0, chưa tích hợp Three.js; V1.2.0 cải tiến hình học procedural, chưa thay thế bằng mô hình GLB riêng từng công trình. Không có full GLTF loader, texture PBR riêng từng file, SSAO, skeletal animation hay instancing GPU mới. Xem [Graphics Engine](docs/GRAPHICS-ENGINE.md).

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

Khi repo liên kết Vercel, push branch production theo thiết lập hiện tại. Giữ cùng domain để truy cập bản lưu cũ. Không phải Next.js, không cần routes-manifest.json. Source đã kiểm thử ở chế độ native QA, production build cần cài Three.js qua npm ci. Chưa deploy Vercel.

## Chạy local và kiểm tra
```sh
npm ci
npm run release:check
npm run preview
```
Mở `http://localhost:5173`. `npm run dev` dành cho phát triển. Không mở trực tiếp index.html bằng file://. `npm run release:check` chạy npm ci (cần Registry nếu cache trống), test, production build có 5 test Three.js runtime, kiểm tra SHA-256, HTTP và 30 ngày sinh tồn. `npm run test:three` chạy riêng test runtime sau cài đặt. Nếu Registry chưa truy cập được, `npm test` và `npm run build:native-preview` chỉ dùng QA native, không phải nghiệm thu production. `node scripts/serve.mjs dist-native-preview` chạy preview ở origin/port riêng. Các test dài hạn riêng: `npm run simulate:balance -- --long`; benchmark cache A*: `npm run benchmark:navigation`.

## Save và cập nhật
Save schema 1 giữ nguyên: `fromzero.save.v1`, `fromzero.backup.v1`, `fromzero.checkpoint.v1`. Chỉ có một cuộc đời đang chơi, Hall of Fame lưu trong save. Autosave khoảng 12 giây, sau hoạt động và khi rời trang; **Cài đặt → Xuất bản lưu JSON** trước cập nhật/đổi thiết bị. Chỉ chơi một tab. Khi có bản cập nhật PWA, xác nhận lưu và cập nhật. Đừng xóa dữ liệu trình duyệt để ép update; nếu cần, đóng hết tab rồi mở lại. Bản lưu là dữ liệu cục bộ, không phải cloud. Quota, xóa dữ liệu hoặc đổi origin có thể ảnh hưởng truy cập save. Cài đặt có nhập JSON, xuất/khôi phục backup và checkpoint.

## PWA và giới hạn
HTTPS hoặc localhost, mở online lần đầu và chờ cache được chuẩn bị. Chrome/Edge có thể có nút cài đặt; iOS Safari → Chia sẻ → Thêm vào màn hình chính. Low giới hạn 30 FPS; Medium/High/Ultra giới hạn 60 FPS với WebGL 2, thích ứng độ phân giải khi bật. Fallback WebGL 1 áp dụng chất lượng cơ bản. Không đảm bảo FPS trên mọi thiết bị. Canvas fallback luôn tối đa 30 FPS. Các chỉ số kinh tế, sức khỏe, pháp luật, lương hưu đều là mô phỏng hư cấu, không phải tư vấn ngoài đời.

Đã hoàn thành roadmap nền tảng V1.0.0, còn giới hạn: AI NPC/nhân viên cơ bản, nhà tù là giao diện quản lý riêng, thừa kế quy đổi tiền và timeline mới, 1 kết cục chưa có nghề tương ứng, chưa thử tất cả hành trình. Cần kiểm thử PWA thật, Safari/Edge, WebGL GPU và hiệu năng thiết bị thật trước khi phát hành rộng rãi. Xem [checklist nghiệm thu](docs/OFFICIAL-RELEASE.md).

## Kỹ thuật và tài liệu
JavaScript ES Modules, Three.js 0.180.0 / WebGL 2 native / WebGL 1 / Canvas 2D, build Node.js với npm dependency được ghim. Master Data V2.9.0 (60 danh mục, 693 bản ghi), validate và compile từ `master-data/`; `src/` là simulation và UI; `public/` là manifest, icon, worker; `scripts/` là công cụ build/test; `tests/` là regression. Giữ nguyên các module nghiệp vụ V1.0.0. `docs/` và [CHANGELOG](CHANGELOG.md) chứa tài liệu theo từng phiên bản; các mục "chưa triển khai" ở tài liệu lịch sử mô tả thời điểm phát hành phiên bản tương ứng, không phải trạng thái hiện tại.
