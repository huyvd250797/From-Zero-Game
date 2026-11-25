# V0.11.0 — Vehicles & Transportation

## Controls
- Gara → Đến xe; đứng cạnh xe chọn Lên xe / B. WASD, mũi tên hoặc joystick để lái. Chọn điểm đến để dùng tuyến tự động. B để đỗ; đến địa điểm tự đỗ, giữ xe ở tọa độ đến. Marker xe đã đỗ trên bản đồ/minimap.
- Mua/bán tại cửa hàng phương tiện, dùng tiền mặt; một xe/mẫu. Bán yêu cầu đưa xe tới cửa hàng và xuống xe.
- Xe cơ giới có nhiên liệu, quãng đường, hướng, vị trí, kỳ bảo dưỡng. Xe đạp tương thích trường bike/riding/bikeDue của save trước. Tài sản và khoản nợ không bị cộng trùng.

## Economy
Tất cả giá, tốc độ, khoảng cách và mức tiêu hao là giá trị giả lập. Giá trị xe cơ giới = floor(price × max(0.45, 1 − distance/100000)). Giá bán = floor(value × 0.9). Xe đạp định giá cố định và bán 90%. Nợ bảo dưỡng không bị xóa khi bán.

Nạp đầy xăng/pin tại kho logistics/trung tâm thương mại; giá bằng phần thiếu × đơn giá, làm tròn lên. Cứu hộ dưới 10% khi đứng cạnh xe: 30.000đ, 15 phút, nạp tới 15%. Bảo dưỡng mỗi 30 ngày, trừ tiền mặt nếu đủ hoặc ghi nợ. Xe buýt 7.000đ giữa shop, office, market, school, hospital, mall; taxi 12.000đ + 120đ/đơn vị tuyến. Hủy/tải lại chuyến đang đi không hoàn phí.

## Boundaries
Không thay đổi kích thước bản đồ, xây dựng tuyến ưu tiên đường trung tâm và kết nối cửa công trình bằng đường tránh vật cản; nếu không tìm được dùng tuyến đi bộ. Điều khiển thủ công dùng cùng bộ va chạm điểm trung tâm với nhân vật, không ép làn; thân xe có thể chạm mô hình ở góc hẹp. Xe nền trang trí, không có va chạm động. Đỗ ở điểm đến, chưa có slot gara/bãi đỗ chuyên dụng. Trạm xăng/sạc dùng công trình hiện có; chưa có hư hỏng chi tiết, biển số, bằng lái, giới hạn tốc độ, lịch xe buýt nhiều chặng. Chuyến công cộng là di chuyển trực tiếp, không lưu lại tuyến đang chạy khi reload. Chưa kiểm chứng Vercel/WebGL/PWA offline thực tế.

## Validation
npm ci --offline; npm run check; npm run data:validate; npm test; npm run build. 130 regression + 13 transport tests. Chromium Canvas fallback via built modules with simulated storage: buy car, mount, manual movement, consume fuel, park, reload save on mobile viewport, bus fare and arrival. Source ZIP excludes dist/node_modules. Preserve save backup before updating; rollback with prior save.
