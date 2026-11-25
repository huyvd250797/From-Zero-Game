# V0.16.0 — Dynamic City Economy

## Quy tắc
Một tháng kinh tế bằng 30 ngày (không phải tháng Gregorian trên HUD). Tháng đầu ổn định; tiếp theo chu kỳ 33 tháng: tăng trưởng 12, lạm phát 12, suy thoái 6, phục hồi 3. Năm cấu hình trong `master-data/Economy_Events.json`. Chỉ số gốc 100, hệ số xu hướng dài hạn `1 + min(0.65, month * 0.0025)` với month bắt đầu từ 0. Chỉ số giá = xu hướng × priceMultiplier. Nguyên liệu = chỉ số giá / nguồn cung. Giá nhiên liệu = chỉ số giá × fuelMultiplier. Chỉ số lương = xu hướng × wageMultiplier. Giá nhà/xe = xu hướng × hệ số tương ứng. Suy thoái đóng một tập vị trí tuyển dụng theo hash ID và nhóm 3 tháng, điểm phỏng vấn tối thiểu 72 thay vì 65; không tự sa thải hợp đồng đang có. Hồ sơ đã được mời ký vẫn có thể ký nếu còn hiệu lực. Chỉ số thất nghiệp mô phỏng không phải tổng số NPC thất nghiệp.

## Tích hợp
- `economy.js` là nguồn báo giá; chỉ số lấy từ phút game, cache 120 tháng, không lưu thêm đồng hồ. Lịch sử được tái dựng khi xem.
- Giá và thu nhập phát sinh tại thời điểm bắt đầu hoạt động; các khoản định kỳ dùng giá tại hạn thanh toán. Chi phí gia đình hằng ngày được điều chỉnh. Một số khoản học phí, sự kiện xã hội, cưới hỏi, cứu hộ, trợ cấp vẫn cố định.
- Nhà và xe định giá theo thị trường; xe cơ giới khấu hao quãng đường như trước. Giá bán 90% giá trị thị trường hiện tại, không xóa khoản nợ. Khoản vay bảo đảm lưu purchasePrice tại giải ngân; không thay đổi hạn mức hợp đồng cũ.
- Hợp đồng lao động mới lưu basePay, khoản vay và sổ tiết kiệm lưu rate. Save cũ thiếu field dùng lương và lãi suất Master Data. Không hồi tố lịch sử, không tự tăng nợ gốc. Lãi suất mới thay đổi tối đa theo cấu hình và được khóa tại lúc ký.
- Giá cổ phiếu dùng công thức ngày cũ × chỉ số hoạt động; vàng × chỉ số giá. Đây là giá giả lập. Cổ tức không đổi.
- Vốn khởi nghiệp, marketing, mở rộng, chi phí cố định, tiền lương nhân sự doanh nghiệp và giá nhập chịu tác động kinh tế. Giá bán do chủ thiết lập; giới hạn 70–150% giá tham chiếu hiện tại khi cập nhật. Tồn kho giữ tổng giá vốn (`stockCost`), xuất kho bình quân gia quyền, xuất hết trừ toàn bộ phần giá vốn còn lại. Hàng tồn cũ thiếu field được định giá theo giá vốn nền lịch sử. Nhu cầu = công thức cũ × nhu cầu kinh tế / cạnh tranh. Không có doanh thu tự động.

## UI và test
Nút Kinh tế thành phố có 4 tab: tổng quan, giá thị trường, việc làm & vốn, lịch sử (biểu đồ 12 tháng). Vào các màn hình giao dịch để sử dụng báo giá. 14 ca economy mới, 212 ca kế thừa (8 ca đổi kỳ vọng từ giá cố định sang giá động). Browser smoke test qua import map của dist, Chromium Canvas, localStorage mô phỏng; kiểm tra bốn tab, tạm ngừng tuyển dụng, mở sổ tiết kiệm 6% khi lạm phát, mobile giả lập.

## Giới hạn
Mô hình chu kỳ xác định, không phải nền kinh tế agent-based có cung cầu nội sinh, chưa có ngẫu nhiên, tiền tệ ngân hàng trung ương, nhiều đối thủ AI, thất nghiệp riêng từng NPC, hoặc thuế doanh nghiệp. Chỉ số kinh tế không bị thay đổi bởi từng giao dịch của người chơi. Giá chỉ đổi tại mốc tháng (thị trường đầu tư còn dao động từng ngày). Chưa xác minh WebGL trên thiết bị thật, PWA offline, deploy Vercel thật. Không cần SQL. Nên xuất save V0.15.0 trước khi cập nhật; không rollback bằng save chứa hợp đồng giá động hoặc tồn kho giá vốn mới.
