# From Zero — Từ hai bàn tay trắng
**V0.2.0 — Canonical Master Data**

Game mô phỏng cuộc đời single-player, thành phố 3D low-poly nhìn từ trên cao. Prototype có 8 địa điểm tương tác, nhân vật 18 tuổi với 500.000đ, công việc thời vụ, ăn uống, thuê trọ, xe đạp và nhật ký. Không cần backend, database, tài khoản hoặc API key.

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
- New Game → đặt tên. Nhân vật bắt đầu ở khu trung tâm An Lạc.
- WASD hoặc mũi tên để đi bộ, click/chạm bản đồ hoặc nhãn địa điểm để tự tìm đường A*; không đi xuyên công trình. Chọn địa điểm từ danh sách ở PC hoặc nút Địa điểm trên mobile.
- Nhấn E khi đứng gần cửa, hoặc nút Tương tác. Cửa hàng tiện lợi: làm thời vụ +200.000đ/4 giờ hoặc mua cơm. Khu phòng trọ: thuê 120.000đ/24 giờ, ngủ khi còn đủ thời hạn. Công viên: nghỉ miễn phí. Quán cà phê: mua cà phê.
- Cửa hàng xe đạp: mua 350.000đ và dùng ngay. B / nút Lên xuống xe để đổi chế độ di chuyển; xe đạp prototype đi theo nhân vật, chưa có chỗ đỗ độc lập. Xe đạp nhanh hơn đi bộ.
- Cuộn chuột hoặc nút +/- để zoom, Z/X hoặc ↶/↷ để xoay, kéo bản đồ để dịch camera, F để bám nhân vật. Mobile: nút hướng, chạm bản đồ, pinch zoom và xoay hai ngón.
- Space / nút Pause để tạm dừng; thời gian tăng khi di chuyển và thực hiện hoạt động, không tự tăng khi đứng yên trong bản prototype.
- Game có 1 save slot localStorage. Autosave định kỳ 12 giây, sau hoạt động quan trọng và khi rời trang; lưu thủ công hoặc xuất JSON trong Cài đặt. Nếu xóa dữ liệu trình duyệt hoặc đổi thiết bị/domain, cần nhập bản sao lưu. Không có cloud sync.
- WebGL là renderer chính; Canvas projection là fallback. Manifest + service worker cơ bản, offline sau khi cache thành công. Cần HTTPS (Vercel cung cấp) hoặc localhost cho service worker.

## Kiến trúc
- `src/world.js`: dữ liệu khu phố, địa điểm, collision, A*.
- `src/game.js`: trạng thái nhân vật, quy tắc hoạt động, save validation.
- `src/renderer.js`: geometry 3D, orthographic camera, WebGL/Canvas fallback.
- `src/main.js`: UI, input, simulation loop, save, interaction.
- `public/`: manifest, icon, offline worker.
- `scripts/`: build tĩnh, HTTP dev server, syntax checks.
- `tests/`: kiểm thử Node.js built-in.

## Phạm vi và giới hạn
Đây là prototype nền tảng, không phải toàn bộ roadmap. Chưa có mua nhà/ô tô, nội thất 3D có thể bước vào, đỗ xe, nghề nghiệp đầy đủ, kinh doanh, NPC có AI, pháp luật, nhà tù, lão hóa và các kết thúc. NPC trang trí đơn giản; xe đường phố trang trí. Văn phòng/ngân hàng/phòng khám có tương tác thông tin, chưa có hệ nghiệp vụ. Đồ họa dùng geometry lập trình, không phải bản concept minh họa trước đó.

Do môi trường phát triển không truy cập npm registry, phiên bản này dùng ES module JavaScript + WebGL/Canvas + Node build không dependency, thay cho Vite/React/Three.js/TypeScript. Save dùng localStorage phiên bản 1 thay cho IndexedDB; có validation và export/import. Những thay đổi này được lựa chọn để build được offline và không phụ thuộc tài nguyên bên ngoài. Có thể thay renderer hoặc framework về sau mà vẫn giữ module gameplay độc lập.

## Master Data V1.0.0
- 60 danh mục JSON, 393 bản ghi seed; xem `docs/MASTER-DATA.md` để biết danh sách, đơn vị, phạm vi và 5 bảng được gộp.
- `npm run data:validate`: validate ID, trường, kiểu, tham chiếu, miền giá trị, đối chiếu giá/tiền công, chu trình và dữ liệu map. Tự biên dịch bundle chỉ đọc dùng trong trình duyệt.
- Bản build không phụ thuộc mạng/npm ngoài. Toàn bộ dữ liệu gameplay gốc (bản đồ, vị trí, hoạt động, cấu hình nhân vật, tốc độ và nhu cầu di chuyển) đã lấy từ Master Data. Các nhóm mở rộng chỉ là dữ liệu seed cho roadmap.
- Mở Cài đặt → Tra cứu Master Data: lọc theo danh mục, tìm theo tên/ID, mở bản ghi JSON.
- Giữ nguyên save key `fromzero.save.v1`, schema 1; không cần migration hoặc database.

## Kiểm thử đã thực hiện
- `npm ci --offline`, `npm test` (18/18 bài), `npm run build` (bao gồm validator và syntax check): thành công.
- Chromium Canvas fallback với module production nạp inline, storage mô phỏng: mở danh mục, tìm kiếm kết thúc, tạo game, lưu và tiếp tục; không lỗi JS trong smoke test.
- Điều hướng localhost bị chặn trong môi trường kiểm thử; chưa kiểm tra HTTP browser thực tế, WebGL, PWA/offline, iOS thiết bị thật hoặc deploy Vercel.

## Phiên bản kế tiếp
V0.3.0 — World & City Engine: mở rộng bản đồ và phân khu, công trình, hệ thống đường, minimap, tải khu vực dựa trên Master Data.
