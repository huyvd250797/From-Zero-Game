# V0.18.0 — Health, Habits & Addiction

Các con số dưới đây là quy tắc giả lập của game, không phải chỉ định y tế hoặc mô hình chẩn đoán ngoài đời.

## Truy cập
- Nút **Sức khỏe & thói quen** trong panel bên trái. Bốn tab Tổng quan, Thói quen, Điều trị, Lịch sử. Có đường dẫn từ phòng khám, bệnh viện, công viên, khu thể thao và địa điểm tương ứng của hoạt động.
- Cảnh báo trên HUD khi có tình trạng bệnh, thiếu ngủ từ 240 phút, sức khỏe tinh thần dưới 35, hoặc lệ thuộc. Mở từ phương tiện riêng đang lái sẽ đỗ xe trước; không giao dịch sức khỏe khi đang đi xe buýt/taxi.

## Wellness State
- `wellness`: nutrition 75, fitness 50, mental 75, discipline 50, sleepDebt 0, poorDays/stressDays 0; 7 habit scores, dependent IDs, conditions, daily, history, journal.
- Bản lưu schema 1: nếu thiếu wellness thì khởi tạo tại ngày hiện tại, giữ nguyên các chỉ số cũ, tiền, nghề nghiệp, nhà, xe, gia đình, đầu tư và story. Không hồi tố sức khỏe/lịch sử. Dữ liệu wellness được kiểm tra khi lưu/đọc.
- Lịch sử 30 ngày, nhật ký 60 mục; không tạo ngày lịch sử khi chưa mô phỏng. Ngày khởi tạo đầu tiên có thể chỉ chứa một phần thời gian trong ngày; ngưỡng ngày vẫn áp dụng.

## Dinh dưỡng, ngủ, vận động
- Ngủ qua `advanceTime(...,{resting:true,sleeping:true})`, đếm từng phút và chia qua nửa đêm. Ngủ ở nhà, phòng trọ, chợp mắt và ngủ tại công viên đều được tính; thư giãn không tính là ngủ. Sleep debt = giới hạn 0–1440 phút của nợ cũ +420 − phút ngủ hôm đó; ngủ hơn mục tiêu giảm nợ.
- Điểm món ăn thực dùng: cơm hộp 25, mì 8, trái cây 18, bánh mì 10, sữa 16, cơm tự nấu 35, mì trứng tự nấu 18; đồ uống nước/cà phê 0. Tổng điểm/ngày tối đa 100; từ 50 tăng dinh dưỡng 4, 25–49 giữ nguyên, dưới 25 giảm 5. Không dùng để đánh giá dinh dưỡng thật.
- Vận động từ 30 phút/ngày tăng thể lực 3; không đủ giảm 1. Bài tập thể thao 45 phút, đi dạo 30 phút. Stress từ 75 giảm tinh thần 6/ngày; dưới 40 tăng 2; thư giãn từ 30 phút thêm 3; tinh thần dưới 35 giảm hạnh phúc 2 mỗi ngày.
- Thói quen tập luyện, tiết kiệm (nạp tài khoản), quá sức (làm đủ 480 phút và ngủ dưới 360 phút) tăng 8 điểm khi có điều kiện, giảm 4 khi không có. Điều chỉnh kỷ luật theo master; quá sức từ 40 điểm giảm 2 sức khỏe/ngày nếu tiếp tục quá sức.

## Tình trạng sức khỏe
- Cảm nhẹ: 3 ngày điều kiện thiếu chăm sóc kéo dài, kèm vệ sinh dưới 25. Điều kiện thiếu chăm sóc: dinh dưỡng dưới 40, nợ ngủ từ 720, hoặc vệ sinh dưới 20.
- Kiệt sức: nợ ngủ từ 840 phút và stress từ 75 trong 3 ngày liên tiếp.
- Bệnh mạn tính giả lập: thiếu chăm sóc 10 ngày liên tiếp hoặc có lệ thuộc và stress cao 10 ngày liên tiếp.
- Khi phát sinh: sức khỏe giảm 5/15/20 tương ứng. Nếu chưa điều trị: giảm thêm 1/ngày với cảm/kiệt sức, 3/ngày với bệnh mạn tính giả lập. Cảm/kiệt sức có thể kết thúc tự nhiên sau 3/7 ngày; bệnh mạn tính cần điều trị, 30 ngày trong master chỉ là mốc theo dõi nền. Nếu nguyên nhân tiếp tục, tình trạng có thể tái phát.
- Điều trị trực tiếp tại phòng khám (cảm, kiệt sức) hoặc bệnh viện (mạn tính), 60 phút, tiền mặt và trong giờ mở cửa. Giá nền 150.000/500.000/1.000.000đ, theo Economy Engine. Cộng sức khỏe 5/15/10 khi điều trị, theo dõi 1/3/7 ngày. Không tính phí lần hai khi đang phục hồi. Kết thúc theo phút game; reset streak rủi ro khi hoàn tất điều trị, không reset toàn bộ thói quen. Không có thuốc riêng, liều lượng hay tử vong ở release này. Điều trị chung 50.000đ và cứu trợ miễn phí cũ vẫn hoạt động nhưng không thay thế điều trị tình trạng cụ thể.

## Thói quen có hại và phục hồi
- 4 hành vi được mô phỏng tại địa điểm hiện có, mỗi loại tối đa một lượt/ngày: tiệc tùng mall 600.000đ/180p; rượu cafe 150.000đ/60p; thuốc lá shop 30.000đ/10p; chi tiêu cờ bạc mall 100.000đ/60p. Tất cả giá động theo nền kinh tế, ghi EXP_FUN; không có phần thưởng tiền, đặt cược hay mua sản phẩm ngoài đời. Mô phỏng cờ bạc chỉ ghi nhận thất thoát và hậu quả.
- Tiệc tùng +18 điểm thói quen, 3 nhóm còn lại +15. Ngưỡng 70 cho giải trí quá mức và 65 cho rượu/thuốc lá/cờ bạc. Một ngày không thực hiện: −4; nếu nhận hỗ trợ cùng ngày: −12. Trạng thái lệ thuộc duy trì cho đến khi điểm dưới 20. Khi lệ thuộc còn tồn tại: −2 sức khỏe, −2 tinh thần, +2 stress, −2 hạnh phúc gia đình (nếu kết hôn) mỗi ngày cho mỗi loại.
- Tư vấn phòng khám 50.000đ giá nền hoặc công viên miễn phí, 60 phút, dùng chung 1 lượt/ngày. Tinh thần +8, stress −12, tăng tốc giảm lệ thuộc cho những hành vi đã tránh trong ngày. Không tự chữa bệnh hoặc xóa hậu quả tài chính.

## Liên kết gameplay
- Điểm phạt hiệu suất tối đa 30: 6 mỗi bệnh, floor(nợ ngủ/120), 3 mỗi lệ thuộc, cộng phần tinh thần dưới 50, dinh dưỡng dưới 40, thể lực dưới 30. Trừ vào điểm mỗi ca chính thức; doanh nghiệp giảm tỷ lệ nhu cầu theo số điểm này. Các quy tắc sức khỏe/năng lượng tối thiểu, đi muộn, cảnh báo và sa thải cũ giữ nguyên.
- Thói quen gây lệ thuộc ảnh hưởng hạnh phúc gia đình. Chi phí điều trị vào EXP_HEALTH, thói quen có hại vào EXP_FUN; không tự phát sinh chi phí tuần. Hai sự kiện mới: Sức khỏe cần được quan tâm, Cơ hội thay đổi thói quen, có thể lặp sau 30 ngày. Lựa chọn cốt truyện không thay thế hoạt động điều trị thực tế.
- Không mở rộng cơ chế pháp luật, phá sản hoặc tử vong; theo roadmap V0.19–V0.21. Chưa mô phỏng chẩn đoán y khoa, thuốc/liều riêng, cai nghiện lâm sàng hoặc NPC có thói quen độc lập.

## QA và triển khai
- Master Data 2.5.0, 60 catalog/651 records, 22 story events/42 choices, 269/269 tests (248 kế thừa, 21 mới); cập nhật kỳ vọng số biến cố/lựa chọn và fixture nhân viên đã hồi phục hoàn toàn trong career/personal-finance tests. Không bỏ test cũ.
- Chromium Canvas fallback với import map blob và localStorage mô phỏng do môi trường chặn URL: 4 tab desktop, điều trị, tư vấn, kiểm tra số dư lưu, mobile 390×844. Chưa test WebGL thiết bị thật/PWA offline/deploy Vercel.
- `npm ci`, `npm run build`, `npm test`, output `dist`, Vercel Other, Node 22.x (package >=20). Không env, backend, database, SQL. Xuất save trước khi nâng cấp/rollback; bản cũ không hiểu wellness và hai sự kiện mới.
