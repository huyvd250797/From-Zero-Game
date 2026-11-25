# From Zero — Từ hai bàn tay trắng
**V0.17.0 — Story & Consequence Engine**

Game mô phỏng cuộc đời single-player, thành phố 3D low-poly nhìn từ trên cao. Prototype có 25 địa điểm tương tác, nhân vật 18 tuổi với 500.000đ, công việc thời vụ, ăn uống, thuê trọ, xe đạp và nhật ký. Không cần backend, database, tài khoản hoặc API key.

## V0.17.0 — Story & Consequence Engine
- 12 chương không tuyến tính, 20 biến cố (19 có thể kích hoạt, 1 dữ liệu nền cho tái hòa nhập sau này), 38 lựa chọn. Điều kiện dựa trên nghề nghiệp, học tập, bạn bè, gia đình, tài chính, doanh nghiệp, tuổi và kinh tế; cơ hội cộng đồng giả ngẫu nhiên xác định theo ngày/tên nhân vật, không đổi khi tải lại.
- 4 tab Câu chuyện cuộc đời: Biến cố, Chương cuộc đời, Hậu quả, Nhật ký. Nút HUD hiển thị số biến cố chờ quyết định, không ép mở modal. Tối đa 8 biến cố thường chờ; hậu quả đến hạn ưu tiên, không bị chặn bởi hàng đợi thường.
- Lựa chọn thay đổi tiền, hạnh phúc, sức khỏe, căng thẳng, uy tín, đạo đức, hạnh phúc gia đình (nếu có) và tin tưởng NPC ở nhánh giúp bạn. Điểm đạo đức bắt đầu 50/100. Giao dịch ghi đúng sổ tài chính, không nhận lặp.
- Hậu quả trì hoãn: lời cảm ơn sau 14 ngày, cơ hội người hướng dẫn sau 30 ngày, thông báo rủi ro pháp lý sau 365 ngày (−8 uy tín, +10 căng thẳng khi đến hạn). Có lựa chọn hợp pháp miễn phí trong biến cố kinh doanh; không hướng dẫn hành vi sai trái. Chưa có điều tra, xét xử, phạt, tù, kết thúc cuộc đời hoặc nghỉ hưu tự động.
- Master Data V2.4.0: 60 danh mục, 641 bản ghi. Save schema 1 giữ nguyên; save cũ bổ sung cốt truyện, không hồi tố các quyết định, không phát lại biến cố đến thành phố hoặc ca đầu đã làm. 248/248 test (226 hồi quy + 22 mới), production build, UI Chromium Canvas/storage mô phỏng. Xem docs/STORY.md. Chưa xác minh Vercel thực tế, WebGL hoặc offline PWA.

## V0.16.0 — Dynamic City Economy
- Kinh tế An Lạc có 5 trạng thái: ổn định 1 tháng đầu, sau đó lặp chu kỳ tăng trưởng 12 tháng, lạm phát 12 tháng, suy thoái 6 tháng và phục hồi 3 tháng. Mỗi tháng kinh tế = 30 ngày game. Giá gốc giữ trong tháng đầu; xu hướng dài hạn bị giới hạn, không có giá ngẫu nhiên sau khi tải save.
- Giá thức ăn/vật phẩm, hoạt động mất phí, tiền thuê, phí nhà, bảo dưỡng, nhiên liệu, vé xe, chi phí gia đình, giá nhà/xe và định giá tài sản thay đổi. Lương thời vụ và lương hợp đồng mới thay đổi; một số vị trí tạm ngừng tuyển khi suy thoái. Lương hợp đồng hiện tại không bị đổi.
- Lãi suất tiết kiệm và vay mới biến động; sổ/khoản vay khóa lãi suất lúc ký, kể cả save cũ. Khoản vay mua nhà/xe sử dụng giá mua thị trường, vẫn giới hạn LTV 70% tại thời điểm ký. Cổ phiếu gắn với hoạt động kinh tế, vàng gắn với chỉ số giá; giữ quy tắc cổ tức trước đây.
- Vốn khởi nghiệp, giá nhập, giá bán tham chiếu, phí vận hành, lương nhân sự, marketing và mở rộng doanh nghiệp dùng giá động. Nhu cầu có hệ số kinh tế và cạnh tranh. Tồn kho lưu giá vốn lịch sử, xuất kho theo bình quân gia quyền, không tự định giá lại.
- 4 tab Kinh tế thành phố: Tổng quan, Giá thị trường, Việc làm & vốn, Lịch sử 12 tháng. Chỉ số thất nghiệp và nguồn cung là chỉ số mô phỏng, chưa phải số liệu từ từng NPC hoặc thị trường cung cầu tự cân bằng. Học phí, một số phí sự kiện xã hội/gia đình, cứu hộ và trợ giúp vẫn dùng giá nền.
- Master Data V2.3.0: 60 danh mục, 602 bản ghi, 5 cấu hình kinh tế. Save schema 1 giữ nguyên. 226/226 test (212 ca cũ, cập nhật 8 kỳ vọng giá động, 14 ca mới), build và UI Chromium Canvas/storage mô phỏng. Xem docs/ECONOMY.md. Không cần database/SQL/env; chưa xác minh deploy thật, WebGL hoặc offline PWA.

## V0.15.0 — Business & Entrepreneurship
- 6 loại hình khởi nghiệp tại 6 công trình có sẵn; một doanh nghiệp đồng thời. Tên riêng, vị trí, nhãn bản đồ/minimap, điều kiện vốn và kỹ năng. 20% vốn thành lập là chi phí, 80% chuyển vào vốn lưu động.
- 5 tab: Tổng quan, Khởi nghiệp, Vận hành, Tài chính, Lịch sử. Kho hàng riêng, giá bán 70–150% giá tham chiếu, nhân viên, marketing 7 ngày, mở rộng 3 cấp. Ca vận hành tại mặt bằng 4 giờ, tối đa 1 lần/ngày, dùng chung giới hạn 8 giờ làm việc và cộng XP kỹ năng.
- Nhu cầu giả lập theo ngày, giá, nhân viên, cấp doanh nghiệp, marketing và kỹ năng quản lý. Không có doanh thu nếu không vận hành; doanh thu giới hạn theo tồn kho. Chi phí cố định và lương phát sinh mỗi ngày, kể cả không bán; nợ vận hành chặn ca mới.
- Góp vốn, rút lợi nhuận đã thực hiện, thanh lý tồn kho 70% giá vốn; giữ nợ vận hành và khoản vay khi đóng cửa. Giá trị doanh nghiệp bằng tiền + tồn kho theo giá vốn, trừ nợ trong tổng tài sản ròng. Kích hoạt LOAN_BIZ (500 triệu, 11%/năm, 60 kỳ) cho chủ doanh nghiệp đang có hợp đồng chính thức và đủ tín dụng.
- Master Data V2.2.0 (60 danh mục, 600 bản ghi); save schema 1 tự bổ sung business. Không cần database/SQL/env. 212/212 tests, production build và UI Chromium Canvas/storage mô phỏng. Chưa xác minh WebGL/PWA offline/deploy thực tế. Xem docs/BUSINESS.md.

## V0.14.0 — Banking & Investment
- Ngân hàng & đầu tư: tổng quan, tiết kiệm, khoản vay, thị trường, danh mục. Hai ngân hàng, chung quầy An Lạc 08:00–17:00; giao dịch tài khoản thanh toán giữ nguyên V0.9.0.
- Gửi kỳ hạn 90/360 ngày, 4%/5,5% năm; gốc từ tài khoản khả dụng, đáo hạn gốc về tài khoản, lãi về tiền mặt, tất toán sớm không lãi.
- Vay tiêu dùng, vay mua nhà/xe; tối đa 70% giá tài sản, gốc đều, lãi theo dư nợ, kỳ 30 ngày, tự trừ tiền mặt. Tín dụng 300–850, điều kiện lương và kinh nghiệm. Khóa bán tài sản bảo đảm cho đến khi trả hết. Lịch dự kiến từng kỳ; không thu lãi trước hạn chưa phát sinh.
- 2 cổ phiếu và vàng giả lập, giá theo ngày, cổ tức mỗi 90 ngày nếu đủ thời gian nắm giữ, danh mục và giá vốn bình quân. Đất ngoại ô, vay kinh doanh vẫn là dữ liệu nền.
- Sổ giao dịch phân biệt chuyển gốc và chi phí lãi, cập nhật tài sản ròng; tiền đầu tư mua/bán ghi theo dòng tiền. Tự bổ sung banking vào save schema 1. Master Data V2.1.0, 60 danh mục, 598 bản ghi.
- 195/195 tests, build thành công. Kiểm thử UI trên Chromium Canvas với storage mô phỏng. Xem docs/BANKING.md. Chưa xác minh WebGL, PWA offline, Vercel thực tế; toàn bộ giá, lãi suất và điều kiện là giả lập.

## V0.13.0 — Love, Marriage & Family
- Nút Tình yêu & gia đình: Gia đình, Tình cảm, Con cái, Nhật ký; từ hồ sơ NPC có thể mở thẳng tình cảm. Một mối quan hệ tại một thời điểm, tình cảm riêng với tin tưởng; quan tâm, hẹn hò, quà, tỏ tình, đính hôn, kết hôn, mâu thuẫn, hòa giải, ly hôn.
- Cần đồng thuận theo điểm tin tưởng/tình cảm, thời gian và nhà đủ sức chứa. Vợ/chồng dùng NPC hiện có, lịch về nhà đổi theo nơi ở của người chơi. Thành viên hiển thị trong nội thất 2D.
- Kế hoạch đón con 270 ngày, tối đa 3 con; ID, tên, tuổi, chăm sóc, sức khỏe và chi phí. Chăm sóc tại nhà hoặc công viên hỗ trợ. Nợ và con vẫn giữ sau ly hôn; không tự mất quyền sở hữu nhà hay con.
- Chi phí mỗi ngày, nợ gia đình, cảnh báo, EXP_FAMILY, tài sản ròng. Hạnh phúc gia đình và hậu quả bỏ bê. Master Data V2.0.0 (60 danh mục, 595 bản ghi); save schema 1 tự thêm family. Xem docs/FAMILY.md.
- 177/177 tests, Chromium Canvas/storage mô phỏng, production build. Chưa xác minh WebGL, offline hoặc deploy thật; chưa có thu nhập riêng của vợ/chồng, phân chia tài sản khi ly hôn, AI trẻ em ngoài nhà hoặc giáo dục con. Mọi quy tắc kinh tế, gia đình là mô phỏng hư cấu.

## V0.12.0 — NPC & Social World
- 16 NPC định danh, 6 tính cách, tên đầy đủ, tuổi, nghề, nhà, nơi làm/học, nơi thư giãn, màu áo riêng; lịch 24 giờ lặp mỗi ngày. Tìm đường A* cho 48 chặng, vị trí xác định theo thời gian game, không lưu đường đi rời rạc. NPC xuất hiện ở điểm công cộng bên ngoài công trình, không vào nội thất riêng.
- Quan hệ xã hội: Mọi người, Danh bạ, Gần đây, Uy tín. Tìm theo tên/nghề (không dấu), lọc bạn bè, đồng nghiệp, người lạ; xem hồ sơ, lịch, ký ức; chọn Đi đến để tự bám vị trí NPC; cần đứng gần (3 đơn vị, không bị công trình chắn), xuống xe. Chấm tím trên minimap và nhãn NPC trên bản đồ.
- Chào hỏi, trò chuyện, hỗ trợ 30.000đ một lần/NPC khi đủ tin tưởng, bất đồng, xin lỗi; mỗi hành động tối đa một lần/ngày/NPC. Tính cách hòa đồng và đồng nghiệp có thưởng khi trò chuyện. Ký ức 24 hành động gần nhất/NPC; cờ hỗ trợ/mâu thuẫn lưu riêng. Tin tưởng 0–100, quen biết/bạn bè từ 30/bạn thân từ 70; giảm 1 điểm mỗi tuần hoàn chỉnh sau 7 ngày không tương tác. Uy tín khởi đầu 50, thay đổi theo hành động, chưa tác động tuyển dụng.
- Save schema 1 tự bổ sung social. Giao dịch giúp đỡ dùng EXP_SOCIAL, không tạo tiền; giữ nguyên tài sản, thời gian, tiến trình cũ. Không cần database, SQL hoặc env. Master Data V1.9.0 (60 danh mục, 583 bản ghi). Xem docs/SOCIAL.md.
- 158/158 tests, kiểm thử Chromium Canvas + storage mô phỏng, production build. Chưa xác minh WebGL, offline, Vercel thực tế. NPC không có va chạm động, lịch ngày nghỉ, nhà riêng bên trong, hành vi tự quyết định hoặc hội thoại AI; tình yêu/hôn nhân thuộc V0.13.0.

## V0.11.0 — Phương tiện & giao thông
- Nút Phương tiện: Gara, Mua xe, Bảo dưỡng & năng lượng, Xe buýt / Taxi. 6 mẫu xe có thể mua, sở hữu tối đa một xe mỗi mẫu. Mua/bán tại cửa hàng phương tiện (địa chỉ cũ cửa hàng xe đạp), dùng tiền mặt. Xe mới đỗ tại cửa hàng; vị trí xe được lưu riêng với nhân vật.
- Đến gần xe trong 2,5 đơn vị và chọn Lên xe hoặc phím B; B để đỗ và xuống xe. Nhấn WASD/joystick để lái; chọn địa điểm để tự đi ưu tiên mạng đường, khi đến công trình tự đỗ và mở tương tác. Marker xe và minimap cho biết vị trí đỗ. Có thể tự tìm đường đến xe từ gara.
- Xe đạp không dùng nhiên liệu; xe máy, ô tô và xe tải dùng xăng; xe điện dùng pin. Tiêu hao theo quãng đường thực di chuyển. Trạm xăng ở kho logistics, trạm sạc tại trung tâm thương mại; nạp đầy tính tiền theo năng lượng còn thiếu. Hết năng lượng tự đỗ; cứu hộ tại chỗ khi dưới 10%, phí 30.000đ, nạp tới 15% sau 15 phút game.
- Bảo dưỡng mỗi 30 ngày, phát sinh nợ nếu thiếu tiền. Giá trị xe cơ giới giảm theo quãng đường (tối thiểu 45% giá gốc); bán 90% giá trị hiện tại. Xe đạp giữ định giá cũ. Nợ không mất khi bán xe. Ghi sổ thu chi và tài sản ròng.
- Xe buýt đi trực tiếp giữa 6 điểm dừng, 7.000đ/lượt; taxi giữa các địa điểm tương tác, 12.000đ + 120đ/đơn vị quãng đường. Di chuyển trên bản đồ; hủy chuyến không hoàn phí; tải lại giữa chuyến giữ vị trí cuối và không khôi phục hành trình đang chạy.
- Save schema 1 tự bổ sung transport; xe đạp cũ chưa lưu vị trí được đặt tại vị trí nhân vật trong save. Không cần SQL. Xuất save trước cập nhật; rollback dùng bản lưu trước V0.11.0.
- Master Data V1.8.0: 60 danh mục, 574 bản ghi. 143/143 test. Chi tiết tại docs/TRANSPORT.md.
- Giới hạn: giao thông arcade, dùng va chạm điểm trung tâm với công trình; điều khiển tay chưa bắt buộc bám làn đường, chưa có va chạm xe/NPC, ô đỗ chuyên dụng, bằng lái, giao thông đèn tín hiệu, lịch tuyến buýt nhiều chặng hay hư hỏng từng bộ phận. Cơ sở tiếp năng lượng dùng công trình hiện có. Kiểm thử Chromium Canvas + storage mô phỏng; chưa xác minh WebGL thiết bị thật, offline, Vercel thực tế.

## V0.10.0 — Nhà ở & nội thất
- Nút Nhà ở: Thị trường, Nơi ở của tôi, Nội thất. 5 loại nhà, 5 địa chỉ thực, 3 công trình nền được kích hoạt; giữ nguyên tọa độ và hình học thành phố.
- Một nơi ở chính: thuê theo 24 giờ hoặc mua bằng tiền mặt. Đến nhà để giao dịch; trả nhà không hoàn tiền thuê; bán nhà nhận 90% giá Master Data. Nội thất và nợ vẫn giữ khi chuyển nhà.
- Nhà thuê tự gia hạn nếu bật và đủ tiền mặt; nhà sở hữu tính điện nước và bảo trì mỗi 30 ngày, phí chưa thanh toán thành nợ, chưa có tịch thu nhà. Phòng trọ cũ giữ nguyên logic và save.
- Nhân vật vào nội thất bằng màn hình top-down 2D, chạm sàn hoặc nội thất để tự đi theo lưới có tránh vật cản. Ngủ, tắm, thư giãn, nấu ăn, tự học kết nối gameplay hiện có; mua 5 loại nội thất tại trung tâm thương mại để nâng tiện nghi. Các nhà dùng một sơ đồ cơ sở với màu sàn/tiện nghi khác nhau, chưa có tùy chỉnh bố trí hoặc nội thất 3D.
- Tích hợp sổ thu chi, giá trị nhà/nội thất, nợ nhà ở, HUD, bản đồ, minimap, lịch sinh hoạt. Master Data V1.7.0 (60 danh mục, 573 bản ghi). 130/130 bài test. Xem docs/HOUSING.md.
- Save schema 1 bổ sung housing tự động, không cần SQL. Xuất save trước cập nhật; rollback nên dùng bản lưu trước V0.10.0.

## V0.9.0 — Tài chính cá nhân
- Mở nút Tài chính hoặc tới ngân hàng: Tổng quan, Tài khoản, Giao dịch, Ngân sách, Mục tiêu, Báo cáo. HUD hiển thị tiền mặt và số dư tài khoản.
- Nạp/rút tài khoản giả lập không mất phí, không phát sinh thu chi. Mọi lương/thưởng/thời vụ nhận tiền mặt; mua sắm, học phí, chi phí tự động dùng tiền mặt. Chưa có ngân hàng sinh lãi, thẻ, khoản vay hoặc đầu tư (V0.14.0).
- Sổ tài chính theo giao dịch: thời điểm, loại, danh mục, số tiền, mô tả; lọc kỳ tháng/năm, loại, danh mục; 20 dòng/trang. Giữ tối đa 2.000 dòng chi tiết trong 365 ngày, lưu tổng tháng/năm theo toàn bộ thời gian mô phỏng. Giữ báo cáo 1/7/30 ngày.
- Lương, thưởng, thời vụ phân loại riêng. Báo cáo theo tiền thực nhận/chi; lương chưa nhận được trình bày là khoản phải thu. Tài sản ròng = tiền mặt + tài khoản + giá trị đồ dùng bền/xe + lương chưa nhận − nợ bảo dưỡng. Giá Master Data, không khấu hao, không cộng trùng tiền dành cho mục tiêu.
- Ngân sách theo danh mục lặp hằng tháng, nhắc từ 80%, vượt 100% không khóa chi tiêu. Tối đa 12 mục tiêu; dành tiền từ tài khoản, chỉ rút phần chưa dành. Có thể giải phóng hoặc xóa mục tiêu, không tạo thu chi.
- Save schema 1: tự chuyển tổng thu/chi theo ngày còn giữ ở V0.8.0 (tối đa 30 ngày), thu nhập cũ gắn nhãn chưa phân loại, không suy đoán dữ liệu đã mất hoặc hồi tố lương. Giữ nguyên số dư và tài sản. Nên xuất file save trước khi cập nhật; rollback bản cũ không có khả năng quản lý tiền tài khoản/mục tiêu.
- Master Data V1.6.0: 60 danh mục, 560 bản ghi. Xem docs/PERSONAL-FINANCE.md. Không đổi stack, không cần SQL/biến môi trường.

## V0.8.0 — Sự nghiệp & việc làm
- Mở Sự nghiệp & việc làm: Hợp đồng, Tuyển dụng, Hồ sơ, Lương & thưởng, Lịch sử. 19 vị trí, 14 nghề chính thức, 10 nhà tuyển dụng. Đến nơi để phỏng vấn, ký và làm việc.
- Ca thứ Hai–thứ Sáu, bắt đầu 08:00–09:00, sau 08:15 tính đi muộn. Hợp đồng mới bắt đầu từ ngày kế tiếp có lịch làm. Tối đa 8 giờ làm/ngày chung với thời vụ.
- Lương tính theo ngày làm thực tế, thanh toán đầu tháng sau; thưởng 10% nếu đủ 10 ca, điểm ca trung bình ≥80, không bỏ ca. Khi kết thúc hợp đồng, quyết toán lương đã tích lũy, không thưởng chưa đến kỳ.
- Ba cảnh báo liên tiếp do bỏ ca, đi muộn hoặc điểm ca dưới 55 dẫn đến sa thải. Ca tốt xóa chuỗi cảnh báo. Có thể ứng tuyển khi còn hợp đồng, xin nghỉ ngay hoặc chuyển công tác khi ký hợp đồng mới.
- Tăng lương 10% lương gốc mỗi lần (tối đa 3), cần 20 ca kể từ lần xét, hiệu suất ≥80 và không cảnh báo. Thăng chức theo Career_Paths, học vấn, kỹ năng và kinh nghiệm tích lũy.
- Save cũ tự thêm career, giữ dữ liệu và schema 1. Không cần SQL. Master Data V1.5.0 (60 danh mục, 559 bản ghi). Xem docs/CAREER.md.
- Quy tắc lao động và mức lương hoàn toàn giả lập; chưa có thuế, bảo hiểm, phép năm, thời gian báo trước hoặc thị trường tuyển dụng động. Nên tích lũy tiền sinh hoạt trước khi nhận việc tháng.

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
