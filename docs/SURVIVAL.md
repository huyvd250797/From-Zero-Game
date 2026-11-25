# Survival & Daily Activities — V0.6.0

## Quy tắc
- Sức chứa chung 30 đơn vị (không tính theo trọng lượng). Hàng hóa trong Items / Food_Drinks có danh sách cửa hàng, giá và hiệu ứng; không giả lập tồn kho/hết hạn. Điện thoại, ba lô, sách, laptop, mũ bảo hiểm chỉ là vật sở hữu ở bản này.
- Mua cần ở trong phạm vi 2,5 đơn vị cửa công trình, đủ tiền, cửa hàng mở đủ 5 phút, còn sức chứa. Dùng thực phẩm hoặc khăn ướt mất thời gian tương ứng. Không dùng nguyên liệu sống trực tiếp. Bỏ vật phẩm không hoàn tiền.
- Nấu cần phòng còn hiệu lực đủ thời lượng, đủ nguyên liệu, đúng địa điểm. Thành phẩm đưa vào túi. Không có nội thất tương tác 3D hoặc animation nấu ăn.
- Nước giảm 2 điểm mỗi 45 phút; thiếu nước dưới 15 góp phần làm giảm sức khỏe, tăng stress theo Life Engine. Nước công cộng phục hồi 40 điểm miễn phí.
- Làm thời vụ tối đa 480 phút/ngày, phải đủ điều kiện sức khỏe/năng lượng/độ no và kết thúc trước nửa đêm. Thu nhập ghi nhận lúc hoàn thành. Không mô phỏng hợp đồng hay thăng chức ở bản này.
- Phòng trọ 120.000đ/24h không đổi. Nếu không gia hạn, mất quyền sử dụng; không xóa đồ, tiền, xe. Ngưỡng cảnh báo khó khăn 60.000đ. Công viên cung cấp ăn hỗ trợ 1 lần/ngày theo điều kiện cũ, nước, vệ sinh, nghỉ tạm; phòng khám có hỗ trợ 1 lần/ngày nếu sức khỏe dưới 20 và tiền dưới 50.000đ. Không có Game Over do sức khỏe ở bản này.
- Lịch ngày gồm ăn, uống, làm việc, vệ sinh, thư giãn, ngủ. Nhắc qua trạng thái nút Lịch ngày; không push notification. Hoàn thành theo hành động đã thực hiện, reset theo ngày. Có thể sửa giờ và tắt nhắc.
- Sổ thu chi ghi nhận thay đổi tiền thực tế, nhóm chi phí, tổng thu, chi, chênh lệch và tiền mặt. 30 ngày cuốn chiếu; tiền khởi tạo/save cũ không phải thu nhập. Nợ bảo dưỡng chưa thanh toán không tính chi cho đến khi trả.

## Tương thích và kiểm thử
Save key/schema không đổi. Save cũ nhận hydration mặc định, túi trống, lịch mặc định, lịch sử thu chi trống, bộ đếm ca/hoàn thành mới. Không thể khôi phục lịch sử giao dịch trước V0.6.0. Nên xuất bản lưu trước khi cập nhật. Không cần backend/database.

`npm test` chạy 47 hồi quy và 15 bài sinh tồn mới. `npm run build` kiểm tra schema và cú pháp, tạo dist. Các thử nghiệm giao diện dùng Chromium Canvas fallback và localStorage mô phỏng; chưa test WebGL/GPU thiết bị thật, service worker offline và deploy Vercel thực tế.
