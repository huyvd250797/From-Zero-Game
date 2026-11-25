# V0.9.0 — Personal Finance

## Kiến trúc
`src/personal-finance.js` quản lý tài khoản, lịch sử, tổng tháng, ngân sách, mục tiêu, bảng cân đối và cảnh báo. `cashChange` tiếp tục là điểm ghi nhận chung của hoạt động sinh tồn, học phí, mua sắm, lương và phí định kỳ. Sổ theo ngày cũ được giữ để báo cáo 1/7/30 ngày. Không ghi trực tiếp số dư vào Master Data.

## Quy tắc
- Tiền mặt là nguồn thanh toán duy nhất trong V0.9.0; tài khoản nội bộ không phí/lãi. Nạp/rút không làm thay đổi tổng tiền hay thu/chi. Lương chính thức và thưởng được ghi riêng khi thực trả; lương chưa nhận là khoản phải thu. Vốn ban đầu không phải thu nhập.
- Tổng tháng theo lịch game (UTC để không lệch múi giờ), năm là tổng các tháng. Tổng thu chi vẫn giữ khi lịch sử chi tiết được rút gọn sau 365 ngày hoặc vượt 2.000 dòng. Giao dịch cũ chuyển thành tổng ngày, không có giờ thật. Thu nhập cũ dùng INC_LEGACY; không lấy thêm payroll cũ để tránh cộng trùng. Giao dịch nội bộ cũ bị rút gọn không có trong tổng thu/chi.
- Ngân sách là giới hạn chi theo danh mục mỗi tháng, 0 = bỏ hạn mức, tự áp dụng tháng sau; cảnh báo ở ≥80% và vượt hạn mức. Không chặn hành động. Ngân sách là cấu hình hiện tại, không lưu lịch sử hạn mức từng tháng.
- Mục tiêu (tối đa 12): tên, giá trị mục tiêu, tiền đã dành. Tiền dành là một phần của tài khoản; không được phân bổ vượt tiền khả dụng hoặc giá trị mục tiêu. Giải phóng/xóa không làm mất tiền, không ghi thu chi. Tài khoản có thể rút = tài khoản − tổng tiền dành.
- Tài sản hữu hình là xe đạp và đồ dùng bền trong Inventory theo giá Master Data; thức ăn/nguyên liệu và quyền thuê trọ không tính. Chưa có giá bán thị trường/khấu hao. Tài sản ròng = tiền mặt + tài khoản + tài sản hữu hình + lương chưa nhận − nợ bảo dưỡng. Không tính tiền dành mục tiêu lần thứ hai.
- Cảnh báo chi > thu tháng, tiền mặt < 60.000đ, vượt hoặc đạt 80% ngân sách, thiếu tiền mặt cho khoản định kỳ đến hạn trong 24 giờ và nợ bảo dưỡng. Hỗ trợ nghèo khó xét tổng tiền mặt + tài khoản theo điều kiện của từng hoạt động, giữ lối thoát khi nhân vật đói/sức khỏe thấp. Chi phí tự động vẫn chỉ dùng tiền mặt.
- Mỗi thao tác tài chính được lưu cùng save. Không thay đổi thời gian game khi chuyển tiền, đặt ngân sách/mục tiêu. Không có thao tác nhập giao dịch tùy ý để tạo tiền.

## Save và rollback
Save schema 1 có trường `personalFinance`. Nếu chưa có, nhập các dòng `finance` còn giữ (tối đa 30 ngày), lưu mốc bao phủ dữ liệu và ghi rõ tổng thu cũ chưa phân loại. Giữ số dư tiền mặt, tài sản, hồ sơ học tập, hợp đồng và tiến trình. Tài khoản khởi tạo 0. Không tạo thêm tiền. Không cần SQL. Trước cập nhật nên xuất save gốc; trước rollback nên giữ save mới riêng và dùng save cũ tương ứng hoặc giải phóng mục tiêu/rút hết tài khoản về tiền mặt rồi xuất. V0.8.0 không hiểu các chức năng tài chính mới; không bảo đảm giữ dữ liệu mới nếu tiếp tục chơi ở bản cũ.

## QA
`npm ci --offline`, `npm test`, `npm run build`: kiểm thử 98 hồi quy và 16 tài chính (114/114). Giao diện được kiểm thử trên Chromium bằng module đã build nạp trực tiếp, Canvas fallback và storage mô phỏng do URL localhost bị chặn. Chưa kiểm thử trình duyệt WebGL, PWA offline, thiết bị thật hay Vercel production.
