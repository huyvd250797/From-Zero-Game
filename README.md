# From Zero — Từ hai bàn tay trắng
**V0.7.0 — Education & Skills**

Game mô phỏng cuộc đời single-player, thành phố 3D low-poly nhìn từ trên cao. Prototype có 22 địa điểm tương tác, nhân vật 18 tuổi với 500.000đ, công việc thời vụ, ăn uống, thuê trọ, xe đạp và nhật ký. Không cần backend, database, tài khoản hoặc API key.

## Deploy GitHub → Vercel
1. Giải nén ZIP. Đưa **nội dung bên trong** (package.json, package-lock.json, src/, master-data/, public/, scripts/, index.html, vercel.json...) vào thư mục gốc repository GitHub.
2. Trên Vercel chọn Add New → Project, import repository. Dùng Root Directory là repository root (hoặc thư mục chứa package.json nếu là monorepo).
3. Framework Preset: Other. Install Command: `npm ci`. Build Command: `npm run build`. Output Directory: `dist`. Node.js: 22.x hoặc phiên bản hỗ trợ >=20. Không có Environment Variables.
4. Deploy, sau đó mở URL được Vercel cấp. Khi repo đã liên kết, lần push tiếp theo vào production branch sẽ tự deploy theo cấu hình của Vercel.

Không cần Next.js, `.next`, `out` hay `routes-manifest.json`. File `vercel.json` cung cấp cấu hình build. Nếu project từng là Next.js, chỉnh lại Framework Preset thành Other và Output Directory thành dist.

## Chạy trên máy
```bash
npm ci
npm test
npm run build
npm run preview
```
Mở http://localhost:5173. `npm run dev` cũng dùng được. Không double-click index.html: module ES cần HTTP server. Không cần cài dependency bên ngoài. Không commit thư mục dist.

## Chơi
- New Game → đặt tên. Nhân vật bắt đầu ở khu dân cư An Lạc.
- WASD hoặc mũi tên để đi bộ, giữ Shift để chạy (nhanh gấp 1,65 lần khi đủ năng lượng); click/chạm bản đồ hoặc nhãn địa điểm để tự tìm đường. Esc hoặc Hủy tuyến đường để dừng; điều khiển tay cũng hủy tuyến. Chọn địa điểm từ danh sách ở PC hoặc nút Địa điểm trên mobile.
- Chọn địa điểm để tự đi tới cửa và tự mở bảng tương tác. Nhấn E khi đứng gần cửa, hoặc nút Tương tác, để mở thủ công. Cửa hàng tiện lợi: làm thời vụ +200.000đ/4 giờ hoặc mua cơm. Khu phòng trọ: thuê 120.000đ/24 giờ, ngủ khi còn đủ thời hạn. Công viên: nghỉ miễn phí. Quán cà phê: mua cà phê.
- Cửa hàng xe đạp: mua 350.000đ và dùng ngay. B / nút Lên xuống xe để đổi chế độ di chuyển; xe đạp prototype đi theo nhân vật, chưa có chỗ đỗ độc lập. Xe đạp nhanh hơn đi bộ.
- Cuộn chuột hoặc nút +/- để zoom, Z/X hoặc ↶/↷ để xoay, kéo bản đồ để dịch camera, F để bám nhân vật. Mobile: joystick analog 360° (độ nghiêng điều chỉnh tốc độ), nút CHẠY bật/tắt, chạm bản đồ, pinch zoom và xoay hai ngón.
- Space / nút Pause để tạm dừng; thời gian chạy liên tục cả khi đứng yên. Chọn ×1/2/4/8/16 trên HUD; tạm dừng khi mở modal hoặc ẩn tab. Làm việc/ngủ/chờ mở cửa tua nhanh ngay, tính đầy đủ nhu cầu và phí.
- Game có 1 save slot localStorage. Autosave định kỳ 12 giây, sau hoạt động quan trọng và khi rời trang; lưu thủ công hoặc xuất JSON trong Cài đặt. Nếu xóa dữ liệu trình duyệt hoặc đổi thiết bị/domain, cần nhập bản sao lưu. Không có cloud sync.
- WebGL là renderer chính; Canvas projection là fallback. Manifest + service worker cơ bản, offline sau khi cache thành công. Cần HTTPS (Vercel cung cấp) hoặc localhost cho service worker.

## Education & Skills V0.7.0
- Mở **Học tập & kỹ năng** ở panel bên trái hoặc tương tác tại trường nghề/thư viện. 5 tab: Hồ sơ, Đào tạo, Tự học, Kỹ năng, Nghề nghiệp.
- 13 chương trình, 6 chứng chỉ và 7 văn bằng; 3 đơn vị sử dụng 2 địa điểm hiện có. Phải đóng học phí, học đủ buổi và đủ thời gian trước khi nhận bằng. Dừng học không hoàn phí.
- 15 kỹ năng, 100 XP/cấp, tối đa 10 cấp. Đọc thư viện miễn phí, học bằng sách/laptop đã sở hữu; giới hạn 4 giờ học/ngày. 5 ca thời vụ cấp XP thực hành.
- Kiểm tra điều kiện học vấn và kỹ năng cho 19 nghề. Tuyển dụng và lương tháng chưa kích hoạt (V0.8.0).
- Save cũ tự bổ sung hồ sơ THPT và XP trống, giữ tài sản. Master Data V1.4.0: 60 danh mục, 552 bản ghi. 80/80 test logic. Xem `docs/EDUCATION.md`.

## Survival & Daily Activities V0.6.0 (kế thừa)
- Túi đồ 30 đơn vị, 19 loại vật phẩm/thức ăn, mua theo số lượng 1/2/3/5, dùng hoặc bỏ; New Game có điện thoại cũ và ba lô. Save cũ bắt đầu với túi trống, không suy diễn tài sản đã sở hữu.
- Siêu thị bán nhu yếu phẩm, nguyên liệu, đồ cá nhân; cửa hàng tiện lợi và quán cà phê có hàng phù hợp. Mua mất 5 phút, kiểm tra vị trí, giờ mở cửa, sức chứa, số dư. Thức ăn có thể dùng trực tiếp từ túi.
- Phòng trọ có hai công thức nấu ăn: cơm trứng rau (15.000đ nguyên liệu) và mì trứng (9.000đ). Món nấu được đưa vào túi; chỉ nấu tại phòng đang thuê và còn đủ thời hạn.
- 5 ca thời vụ: cửa hàng 200.000đ/4h, cà phê 95.000đ/2h, siêu thị 160.000đ/3h, kho 260.000đ/5h, nông trại 180.000đ/4h. Giới hạn 8 giờ/ngày, kết thúc trước nửa đêm.
- Chỉ số đủ nước, nước miễn phí, tập thể dục, đi dạo, xem phim, nghỉ đêm hỗ trợ, khám hỗ trợ miễn phí nếu nguy kịch và thiếu tiền.
- Lịch ngày gồm 6 hoạt động; tùy chỉnh giờ, bật/tắt nhắc, tự ghi nhận khi thực hiện. Không tự chạy lịch hay phát thông báo nền.
- Sổ thu chi hôm nay/7/30 ngày, nhóm chi tiêu, bao gồm gia hạn phòng và bảo dưỡng. Chỉ ghi nhận giao dịch từ bản này, không dựng lại giao dịch cũ.
- Master Data V1.3.0: 60 danh mục, 545 bản ghi. Save schema 1 tự bổ sung trường mới; không cần SQL migration. Xem `docs/SURVIVAL.md`.

## Time & Life Simulation V0.5.0 (kế thừa)
- Lịch Gregorian, tuổi tác, ngày đêm, 5 tốc độ, 6 chỉ số cuộc sống, lịch phục vụ 22 địa điểm.
- Tự gia hạn phòng trọ, phí bảo dưỡng xe đạp, cảnh báo nhu cầu, hành động hồi phục và hỗ trợ khi thiếu tiền.
- Chi tiết quy tắc và migration tương thích xem `docs/LIFE-SIMULATION.md`.

## Character & Navigation V0.4.0 (kế thừa)
- Avatar low-poly có tóc, khuôn mặt, balo, tay chân riêng, xoay theo hướng vận tốc thực tế; idle/đi/chạy/đạp xe, tay chân vung theo quãng đường, chuyển động đứng yên nhẹ. Không cần tải model ngoài.
- Tìm đường dùng kiểm tra đoạn thẳng với footprint công trình + khoảng hở 0,65; nếu đường thẳng bị chặn, tìm điểm nối lưới hợp lệ, chạy A* và rút gọn waypoint bằng line-of-sight. Kiểm thử 462 tuyến cửa-đến-cửa: tổng chiều dài 57.108 → 52.588,9 đơn vị (giảm ~7,9%), không phải benchmark tốc độ xử lý.
- Swept movement kiểm tra từng đoạn nhỏ, đi trượt theo trục còn trống khi điều khiển tay; tự tìm lại tuyến tối đa một lần nếu bị chặn. Không tránh động NPC/xe/cây trang trí, chưa mô phỏng giao thông thực tế.
- Tuyến màu vàng liên tục, vòng điểm đến, khoảng cách còn lại (1 đơn vị mô phỏng hiển thị như 1 m), trạng thái chuyển động và nút hủy. Tuyến đồng bộ minimap và bản đồ lớn.
- Chọn nhãn/danh sách địa điểm: tự mở modal khi đến cửa. Chọn vị trí bất kỳ: chỉ di chuyển, không tự mở modal. Điều khiển tay hủy tuyến. Pause/modal/blur/ẩn tab dừng input, joystick tự trở tâm khi thả.
- Camera follow dùng exponential damping độc lập tốc độ khung hình; F chuyển về theo dõi mượt mà. Giữ nguyên zoom/xoay và bản đồ V0.3.0.
- 60 danh mục, 499 bản ghi tại V0.4.0, save schema 1 và khóa localStorage không đổi; các trạng thái route/animation chỉ tồn tại trong phiên chơi, không cần migration. Xe đạp vẫn đi theo nhân vật theo thiết kế prototype.
- Đã kiểm thử 34 unit tests và trình duyệt Chromium headless (Canvas fallback, ES module qua blob, localStorage mô phỏng); chưa xác minh WebGL, thiết bị thật, PWA offline hay Vercel thực tế.

## City Engine V0.3.0 (kế thừa)
- 192×192 đơn vị, diện tích gấp 4 bản cũ; 10 phân khu, 79 khu/công trình, 24 loại và 22 địa điểm tương tác. 12 trục đường, đường 2/4 làn, vạch đường, cây xanh, xe và người đi bộ trang trí.
- Chọn phân khu từ bộ lọc địa điểm. Nút ▧ để xem toàn cảnh, F để quay lại nhân vật. Mở bản đồ lớn từ minimap hoặc nút ▤ trên mobile; đổi chế độ xem khu vực/đi đến điểm. Màu phân khu, chấm địa điểm, tuyến A*, vị trí nhân vật và khung camera đồng bộ.
- 36 chunk, geometry tạo theo nhu cầu, culling theo camera, LOD theo zoom/chất lượng, cache LRU; minimap tĩnh cache riêng. A* dùng priority heap và lưới collision. Xe/NPC là hiệu ứng nền, không phải engine giao thông đầy đủ.
- 14 địa điểm mới có hành động tham quan. Các hệ thống như học nghề, mua căn hộ, y tế, pháp luật và sản xuất chưa kích hoạt. Nhà tù mới chỉ là công trình nền.
- Giữ bản lưu schema 1 và các tọa độ cũ; 1 công trình nền cũ được thu nhỏ nhẹ để tránh lấn đường. Không cần migration.

## Kiến trúc
- `src/world.js`: dữ liệu khu phố, địa điểm, collision, A*.
- `src/life.js`: đồng hồ, lịch, nhu cầu, giờ phục vụ, phí định kỳ.
- `src/game.js`: trạng thái nhân vật, quy tắc hoạt động, save validation.
- `src/renderer.js`: geometry 3D, orthographic camera, WebGL/Canvas fallback.
- `src/city-map.js`: minimap, bản đồ lớn, lớp nền cache.
- `src/main.js`: UI, input, simulation loop, save, interaction.
- `src/navigation.js`: lập tuyến, swept collision, joystick, motion state và camera damping.
- `src/character.js`: geometry nhân vật có khớp, tuyến đường và marker.
- `public/`: manifest, icon, offline worker.
- `scripts/`: build tĩnh, HTTP dev server, syntax checks.
- `tests/`: kiểm thử Node.js built-in.

## Phạm vi và giới hạn
Đây là prototype nền tảng, không phải toàn bộ roadmap. Chưa có mua nhà/ô tô, nội thất 3D có thể bước vào, đỗ xe, nghề nghiệp đầy đủ, kinh doanh, NPC có AI, pháp luật, nhà tù, lão hóa thể chất và các kết thúc. NPC trang trí đơn giản; xe đường phố trang trí. Văn phòng/ngân hàng có tương tác thông tin; phòng khám có hành động hồi phục cơ bản, chưa có hệ nghiệp vụ đầy đủ. Đồ họa dùng geometry lập trình, không phải bản concept minh họa trước đó.

Do môi trường phát triển không truy cập npm registry, phiên bản này dùng ES module JavaScript + WebGL/Canvas + Node build không dependency, thay cho Vite/React/Three.js/TypeScript. Save dùng localStorage phiên bản 1 thay cho IndexedDB; có validation và export/import. Những thay đổi này được lựa chọn để build được offline và không phụ thuộc tài nguyên bên ngoài. Có thể thay renderer hoặc framework về sau mà vẫn giữ module gameplay độc lập.

## Master Data V1.2.0
- 60 danh mục JSON, 519 bản ghi seed; xem `docs/MASTER-DATA.md` để biết danh sách, đơn vị, phạm vi và 5 bảng được gộp.
- `npm run data:validate`: validate ID, trường, kiểu, tham chiếu, miền giá trị, đối chiếu giá/tiền công, chu trình và dữ liệu map. Tự biên dịch bundle chỉ đọc dùng trong trình duyệt.
- Bản build không phụ thuộc mạng/npm ngoài. Toàn bộ dữ liệu gameplay gốc (bản đồ, vị trí, hoạt động, cấu hình nhân vật, tốc độ, nhu cầu liên tục và lịch mở cửa) đã lấy từ Master Data. Các nhóm mở rộng chỉ là dữ liệu seed cho roadmap.
- Mở Cài đặt → Tra cứu Master Data: lọc theo danh mục, tìm theo tên/ID, mở bản ghi JSON.
- Giữ nguyên save key `fromzero.save.v1`, schema 1; tự bổ sung các trường mới khi đọc save cũ, không cần database hay migration thủ công.

## Kiểm thử đã thực hiện
- `npm ci --offline`, `npm test` (47/47 bài), `npm run build` (validator và syntax check): thành công.
- Chromium headless Canvas fallback, module production qua blob, storage mô phỏng: đồng hồ liên tục, ×16, Pause, tua ca làm việc, load save, ngày/đêm, đóng cửa/chờ mở, mobile speed control. Không lỗi JS trong smoke test.
- Điều hướng HTTP bị chặn trong môi trường kiểm thử; chưa xác minh WebGL, PWA offline, thiết bị thật hay deploy Vercel.

## Phiên bản kế tiếp
V0.8.0 — Career & Employment: tuyển dụng, phỏng vấn, hợp đồng, lương, kinh nghiệm và thăng tiến.
