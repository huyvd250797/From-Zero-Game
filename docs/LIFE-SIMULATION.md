# V0.5.0 — Time & Life Simulation

## Đồng hồ và lịch
- Bắt đầu 07:00 ngày 01/01/2026, 18 tuổi. Lịch Gregorian UTC độc lập múi giờ máy. Sinh nhật mỗi 01/01, không có năm giả 360 ngày. Mốc năm là quyết định thiết kế, có thể đổi tại Game_Config cho game mới; không đổi mốc khi đang dùng save hiện hữu.
- 1 giây thực = 1 phút game ở ×1. ×2/4/8/16 chỉ tăng tốc đồng hồ, không tăng tốc nhân vật. Đồng hồ chạy cả khi đứng yên. Pause, modal, tab ẩn hoặc thoát game không cộng thời gian. Giới hạn 1 giây delta cho khung hình rất chậm để tránh bước nhảy lớn. Không mô phỏng offline. Giới hạn kỹ thuật 200×366 ngày, chưa có tử vong.
- Mọi hoạt động gọi chung advanceTime, kể cả chờ mở cửa. Làm việc/ ngủ được tua ngay khi chọn, không cần ngồi chờ; toàn bộ thời lượng được tính vào nhu cầu, lịch và phí định kỳ. Chi phí hành động trả trước, thu nhập trả sau khi hoàn thành. Nút tốc độ mặc định ×1 mỗi lần vào game.
- Ánh sáng WebGL dùng uniform RGB, Canvas fallback dùng cùng hệ số màu; chuyển tiếp lúc sáng sớm/chiều tối. Chưa có đèn đường phát sáng, bóng động hoặc nội thất.

## Chỉ số
- Giữ energy, hunger (độ no), happy; bổ sung health, hygiene, stress. Khoảng 0–100; stress càng cao càng bất lợi.
- Mỗi 30 phút giảm năng lượng và độ no 1; vệ sinh giảm 1 mỗi 45 phút. Ngủ, chợp mắt và nghỉ công viên không giảm năng lượng thụ động trong thời lượng đó. Hiệu ứng hành động cộng cuối hoạt động.
- Mỗi giờ: mỗi nhu cầu energy/hunger/hygiene dưới 15 làm giảm sức khỏe 2, hạnh phúc 1 và tăng stress 2. Nhu cầu ổn định giúp giảm stress; nghỉ khi nhu cầu tốt giúp hồi sức. Stress ≥85 làm giảm sức khỏe và hạnh phúc thêm. Sức khỏe dưới 20 không được làm việc. Không Game Over ở bản này; có thể phục hồi bằng ăn, tắm, nghỉ, khám.
- Thêm tắm phòng trọ, rửa mặt công viên, suất ăn hỗ trợ (1 lần/ngày khi tiền dưới 30.000 hoặc độ no dưới 20), chợp mắt, khám 50.000đ. Các mức giá là dữ liệu cân bằng hư cấu.

## Công trình và chi phí
- 22 lịch mở/đóng cửa lấy từ World_Schedules. Mọi ngày giống nhau ở V0.5.0; không có cuối tuần/ngày lễ. Địa điểm 24/24 chấp nhận hoạt động qua nửa đêm. Địa điểm khác không bắt đầu nếu hành động kết thúc sau giờ đóng. Vẫn có thể di chuyển đến công trình đóng cửa, chờ tới giờ mở bằng nút trong modal.
- Phòng trọ 120.000đ/24h tính từ lúc thuê xong. Bật/tắt tự gia hạn ở hồ sơ. Game mới bật mặc định; save cũ tắt mặc định để tránh tự trừ tiền ngoài ý muốn. Nếu thiếu tiền khi đến hạn, mất quyền sử dụng phòng; không âm tiền. Ngủ/tắm yêu cầu đủ thời hạn thuê đã trả.
- Xe đạp 10.000đ/30 ngày từ lúc mua. Nếu không đủ tiền thì ghi nợ bảo dưỡng; khi đủ toàn bộ nợ (sau thu nhập hoặc giao dịch) thanh toán tự động. Chưa mô phỏng hao mòn hay hỏng xe. Không phát sinh chi phí nếu chưa sở hữu.

## Save
- Giữ schema 1 và key fromzero.save.v1. Khi đọc/import: thêm health=100, hygiene=80, stress=20, autoRent=false, maintenanceDebt=0, aidDay=0. Xe đạp đã sở hữu được đặt hạn bảo dưỡng mới sau 30 ngày, không truy thu quá khứ. Không sửa vị trí, tài sản, tiền, ngày/giờ, nhật ký gốc.
- Cần xuất JSON trước update nếu muốn rollback. Save tiếp tục được lưu tự động trên localStorage; không cần SQL, Supabase, hay server.

## Kiểm thử
- npm ci --offline, npm test (47 bài), npm run build.
- Chromium headless, Canvas fallback, module production qua blob, localStorage mô phỏng: đồng hồ đứng yên ×16, pause, tự đi đến cửa hàng, tua ca làm, nạp save, ban ngày/ban đêm, ngân hàng đóng cửa/chờ/mở, chọn tốc độ trên màn hình mobile. Kiểm thử HTTP bị chặn; chưa xác minh WebGL thiết bị thật, PWA offline hoặc Vercel thực tế.
