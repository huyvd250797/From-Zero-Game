# Changelog

## V0.19.0 — Law, Crime & Justice (2026-11-26)
- Legal state, 6 vi phạm, 5 giai đoạn, phán quyết giả lập, hồ sơ kiểm tra không đủ căn cứ.
- Hợp tác, tư vấn, nghĩa vụ phạt/hoàn trả, thanh toán từng phần, tích hợp tài sản ròng, vay vốn, nghề nghiệp, doanh nghiệp và gia đình.
- 4 tab pháp luật, lưu án tích và án tù chờ V0.20.0. Master Data V2.6.0, 658 bản ghi; tương thích schema 1.

## V0.18.0 — Health, Habits & Addiction (2026-11-26)
- Wellness state: dinh dưỡng, thể lực, tinh thần, kỷ luật, nợ ngủ, nhật ký ngày. Kết nối ngủ, ăn, vận động, công việc và tiết kiệm.
- 3 tình trạng bệnh, 3 dịch vụ điều trị, 7 thói quen, 4 dạng lệ thuộc, 2 phương án hỗ trợ. Chi phí động và phục hồi theo thời gian.
- Tác động tới hiệu suất nghề, doanh nghiệp, hạnh phúc gia đình; 2 biến cố cốt truyện mới. 4 tab UI và cảnh báo HUD.
- Master Data 2.5.0 (651 records), 269/269 tests và production build. Tương thích schema 1, không hồi tố. Xem docs/HEALTH.md.

## V0.17.0 — Story & Consequence Engine (2026-11-25)
- Bộ máy 12 chương, 20 biến cố và 38 lựa chọn; kích hoạt theo hoàn cảnh, chu kỳ, tuổi và cơ hội cộng đồng xác định.
- Hậu quả tức thời và trì hoãn 14/30/365 ngày, đạo đức, hành vi sai trái, ghi sổ tài chính, ký ức giúp đỡ NPC; bảo toàn save, không cộng trùng.
- 4 tab, số biến cố trên HUD, nhật ký 120 mục, quyết định đã xử lý và hậu quả đang chờ được lưu riêng.
- Master Data V2.4.0 (60 danh mục, 641 bản ghi); 248/248 tests, production build và Chromium Canvas/storage mô phỏng.
- Pháp lý mới là ghi nhận rủi ro, chưa xét xử/án phạt; nghỉ hưu, di sản là sự kiện suy ngẫm, chưa có kết thúc.

## V0.16.0 — Dynamic City Economy (2026-11-25)
- 5 trạng thái kinh tế, giá, lương, nhu cầu, nguồn cung, cạnh tranh, lãi suất và định giá động theo tháng 30 ngày.
- Khóa lương/lãi suất hợp đồng, giá mua tài sản bảo đảm; bình quân giá vốn tồn kho; tương thích save schema 1.
- Dashboard 4 tab, báo giá hiện tại và biểu đồ 12 tháng, nhật ký chuyển chu kỳ.
- Master Data V2.3.0 (60 danh mục, 602 bản ghi); 226/226 test và build, UI Chromium Canvas/storage mô phỏng.
- Chưa có kinh tế cân bằng theo giao dịch NPC, thất nghiệp thực tế từng NPC, thuế doanh nghiệp, deploy hoặc PWA offline kiểm chứng.

## V0.15.0 — Business & Entrepreneurship (2026-11-25)
- Kích hoạt 6 mô hình kinh doanh, sản phẩm, địa điểm, tên và nhãn bản đồ, điều kiện vốn/kỹ năng.
- Vốn lưu động, kho, giá bán, nhân viên, marketing, ca vận hành và kinh nghiệm, 3 cấp mở rộng.
- Chi phí mỗi ngày, nợ, lợi nhuận, góp vốn, thanh lý, lịch sử, tài sản ròng; vay kinh doanh.
- Master Data V2.2.0 (60 danh mục, 600 bản ghi), save migration tự động; 212/212 tests, build và UI Chromium Canvas/storage mô phỏng.
- Chưa có khách hàng/nhân viên AI riêng, nhiều doanh nghiệp, thuế kinh doanh, thị trường động hoặc deploy thật.

## V0.14.0 — Banking & Investment (2026-11-25)
- Tiết kiệm kỳ hạn, tín dụng, vay tiêu dùng và mua nhà/xe trả góp, lịch trả nợ, quá hạn và tất toán.
- Thị trường cổ phiếu/vàng giả lập, cổ tức, danh mục và lãi/lỗ. Tích hợp ledger và tài sản ròng, khóa tài sản bảo đảm.
- Save migration tự động, Master Data V2.1.0 (598 bản ghi), 195/195 tests, production build.
- Kiểm thử Chromium Canvas/storage mô phỏng; chưa xác minh WebGL/PWA/deploy thật.

## V0.13.0 — Love, Marriage & Family (2026-11-25)
- Tình cảm riêng với tin tưởng; hẹn hò, quà, tỏ tình, đính hôn, kết hôn, hòa giải, ly hôn.
- Vợ/chồng đổi lịch về nhà; thành viên hiển thị trong nội thất. Kế hoạch đón con 270 ngày, hồ sơ, chăm sóc và tuổi tác.
- Hạnh phúc, hậu quả bỏ bê, chi phí/nợ gia đình, EXP_FAMILY, báo cáo tài sản ròng; tự bổ sung save cũ.
- Master Data V2.0.0 (60 danh mục, 595 bản ghi), 177/177 tests, build, kiểm thử Chromium Canvas/storage mô phỏng.
- Chưa xác minh WebGL, PWA offline hay deploy Vercel thực tế.

## V0.12.0 — NPC & Social World (2026-11-25)
- 16 NPC với hồ sơ, lịch sinh hoạt, tuyến đi lại, mô hình low-poly, nhãn bản đồ và chấm minimap.
- Danh bạ, tìm/lọc, hồ sơ, gặp mặt, hội thoại theo ký ức, tin tưởng, uy tín, giúp đỡ, mâu thuẫn và hòa giải; nhận diện đồng nghiệp theo hợp đồng.
- Master Data V1.9.0 (60 danh mục, 583 bản ghi), thêm EXP_SOCIAL và migration save tự động.
- 158/158 tests, build và kiểm thử Chromium Canvas/storage mô phỏng; chưa xác minh WebGL, offline hoặc Vercel thật.

## V0.11.0 — Vehicles & Transportation (2026-11-25)
- 6 mẫu phương tiện, gara, mua/bán, lưu vị trí riêng, lên/xuống, điều khiển và tuyến tự động ưu tiên đường.
- Nhiên liệu/pin, cứu hộ, bảo dưỡng định kỳ, nợ và giá trị giảm theo quãng đường; tích hợp sổ thu chi và tài sản ròng.
- Xe buýt 6 điểm dừng, taxi, thanh toán trước và di chuyển trực tiếp.
- Master Data V1.8.0 (60 danh mục, 574 bản ghi); tự bổ sung save cũ.
- 143/143 tests, build và kiểm thử Chromium Canvas/storage mô phỏng; chưa xác minh WebGL, offline hoặc Vercel thật.

## V0.10.0 — Housing & Interior (2026-11-25)
- Thị trường 5 loại nhà, thuê/mua/bán/trả nhà, đánh dấu nhà trên bản đồ.
- Nội thất 2D top-down, đường đi trong phòng, ngủ, tắm, thư giãn, nấu ăn và tự học. 5 loại nội thất có thể mua.
- Tích hợp tài chính, tiền thuê, phí điện nước/bảo trì, nợ và tài sản ròng.
- Save cũ tương thích; Master Data V1.7.0 (60 danh mục, 573 bản ghi).
- 130/130 test, kiểm thử giao diện Chromium Canvas với storage mô phỏng, production build. Chưa kiểm thử WebGL, offline hoặc deploy Vercel thực tế.

## V0.9.0 — Personal Finance (2026-11-25)
- Tài chính 6 tab: tổng quan, tài khoản nội bộ, giao dịch, ngân sách, mục tiêu, báo cáo. HUD có số dư tài khoản.
- Tách lương, thưởng, thời vụ; lịch sử chi tiết có loại/danh mục/thời gian, giữ tổng hợp tháng/năm và sổ 1/7/30 ngày.
- Theo dõi giá trị tài sản hữu hình, lương phải thu, nợ, chi phí định kỳ; ngân sách cảnh báo; mục tiêu dành tiền không cộng trùng.
- Migration save cũ tự động, không hồi tố giao dịch thiếu. Master Data V1.6.0, 60 danh mục / 560 bản ghi.
- 114/114 bài test logic; kiểm thử Chromium Canvas/storage mô phỏng; production build. Chưa deploy Vercel, chưa kiểm thử WebGL, PWA offline thực tế.

## V0.8.0 — Career & Employment (2026-11-25)
- 19 vị trí tại 10 nhà tuyển dụng, CV tự sinh, lọc việc, nộp hồ sơ, phỏng vấn, ký hợp đồng.
- Lịch ca chính thức, lương tích lũy, thưởng, hiệu suất, XP nghề, tăng lương, thăng chức, nghỉ việc, chuyển việc, sa thải và tái ứng tuyển.
- Tích hợp sổ thu chi, lịch ngày, giới hạn giờ làm, save cũ; Master Data V1.5.0, 60 danh mục / 559 bản ghi.
- Giữ nguyên bản đồ, renderer và kiến trúc deploy tĩnh.

## V0.7.0 — Education & Skills (2026-11-25)
- 13 chương trình (6 chứng chỉ, 7 văn bằng), 3 đơn vị đào tạo dùng 2 địa điểm hiện có. Học phí, lịch học, tiến độ, nhận bằng và dừng học.
- 15 kỹ năng, XP tự học thư viện/sách/laptop, XP từ 5 ca thời vụ, giới hạn học 4 giờ/ngày và kiểm tra nhu cầu.
- Điều kiện học vấn/kỹ năng cho 19 nghề; chưa triển khai tuyển dụng.
- 5 tab học tập responsive, Save schema 1 tự bổ sung hồ sơ giáo dục, giữ dữ liệu cũ.
- Master Data V1.4.0, 60 danh mục / 552 bản ghi; 80/80 test logic và smoke test Chromium Canvas/storage mô phỏng, production build.

## V0.6.0 — Survival & Daily Activities (2026-11-25)
- Túi đồ, mua theo số lượng, tiêu dùng, bỏ vật phẩm và hai công thức nấu ăn.
- 5 loại ca thời vụ, giới hạn 8 giờ/ngày, đủ nước, thể dục và giải trí.
- Lịch ngày lặp lại, ghi nhận hoạt động, sổ thu chi 30 ngày, hỗ trợ nghèo khó và mất chỗ ở.
- Master Data V1.3.0, 60 danh mục / 545 bản ghi; tự bổ sung trường mới cho save cũ.
- 62 bài kiểm thử logic, build offline, kiểm thử giao diện Chromium Canvas và storage mô phỏng.

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
