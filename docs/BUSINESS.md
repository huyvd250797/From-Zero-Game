# V0.15.0 — Business & Entrepreneurship

## Cách chơi
1. Mở Doanh nghiệp → Khởi nghiệp, chọn loại hình, đi đến mặt bằng trong giờ mở cửa. Cần vốn tiền mặt, kỹ năng, không có doanh nghiệp/nợ vận hành cũ. Đặt tên, xác nhận; 30 phút game.
2. 20% vốn là phí thành lập, 80% vào quỹ doanh nghiệp. Vào Vận hành để nhập hàng, định giá, tuyển nhân sự, chạy marketing và mở rộng. Không tự sinh tiền khi bỏ mặc.
3. Vận hành 4 giờ tại mặt bằng, tối đa một lần/ngày, đủ sức khỏe ≥20, năng lượng ≥30, độ no và đủ nước ≥25. Dùng chung giới hạn 8 giờ/ngày với việc chính thức/thời vụ. +12 XP cho quản lý và kỹ năng ngành (không cộng trùng nếu cùng kỹ năng).
4. Nhu cầu = floor((baseDemand × level + staffDemand × staff) × max(0,25; 1 − 1,4 × (price/reference − 1)) × dao động ngày 0,85–1,15 × hệ số marketing 1,25 nếu hiệu lực × (1 + cấp quản lý × 0,025)); tối thiểu 1. Bán không vượt hàng tồn, doanh thu về doanh nghiệp, ghi giá vốn vào chi phí. Giá bán 70–150% tham chiếu.
5. Nhân viên có vai trò và mức lương cố định; tuyển trả ngay một ngày lương, sau đó lương và mặt bằng tính vào mỗi nửa đêm (phân bổ phí 30 ngày theo ngày, làm tròn). Nhân viên chỉ tăng năng lực bán trong ca chủ trực tiếp quản lý. Marketing 7 ngày, không chồng chiến dịch. Mở rộng cấp 2/3 tốn 20%/40% vốn ban đầu, tăng nhu cầu và giới hạn nhân sự/kho; không có công trình mới.
6. Nếu thiếu vốn, ghi nợ vận hành và chặn ca mới. Góp thêm tiền ở mặt bằng, trả nợ từ quỹ doanh nghiệp tại mặt bằng hoặc tiền cá nhân tại ngân hàng. Có thể đóng cửa để thanh lý hàng tồn 70% giá vốn, dùng tiền thu để trả nợ, phần còn lại về tiền mặt. Giữ nợ chưa trả, khoản vay và 30 hồ sơ đóng cửa.

## Tài chính
- Tài sản doanh nghiệp = tiền quỹ + tồn kho theo giá vốn; chi phí thành lập, marketing, mở rộng là chi phí chìm. Nợ vận hành trừ một lần trong tổng tài sản ròng. Không cộng doanh thu như tiền cá nhân. Góp vốn và hoàn vốn/thanh lý là giao dịch chuyển nội bộ, không tính thu/chi cá nhân; lợi nhuận phân phối vào INC_BUSINESS. Chỉ rút tối đa min(tiền quỹ, lợi nhuận lũy kế chưa phân phối), không rút khi nợ vận hành. Khi thanh lý, toàn bộ tiền còn lại (bao gồm phần lợi nhuận chưa phân phối nếu có) được ghi như hoàn vốn; kết quả kinh doanh ở hồ sơ đóng cửa. Thanh toán nợ vận hành bằng tiền cá nhân ghi EXP_BUSINESS.
- LOAN_BIZ: tại ngân hàng, cần doanh nghiệp đang hoạt động, hợp đồng chính thức ≥10 ca, tín dụng ≥600, không quá hạn, tổng kỳ trả ≤45% lương. 1–500 triệu, 11%/năm, 60 kỳ, gốc đều. Tiền vay về ví cá nhân; tự góp vốn vào doanh nghiệp. Không phải khoản vay thành lập ban đầu. Nợ không mất khi đóng cửa.

## Giới hạn
Một doanh nghiệp tại một thời điểm; 6 mặt bằng dùng chung công trình sẵn có, không chiếm quyền sở hữu cả công trình; nhân viên là số lượng theo vai trò, khách hàng là nhu cầu giả lập, chưa có AI riêng hoặc nội thất cửa hàng. Mỗi ngành một sản phẩm (phần mềm mô phỏng theo đơn vị dịch vụ). Giá vốn cố định, không có thuế, giấy phép, vận chuyển nguyên liệu, nhiều chi nhánh, kinh tế động, tịch thu hoặc phá sản. Nhật ký 60 mục gần nhất, báo cáo lũy kế, không có báo cáo doanh nghiệp riêng theo tháng/năm. Các dữ liệu hoàn toàn hư cấu.

## Kiểm thử và triển khai
195 bài hồi quy + 17 bài mới = 212. UI đã thử mở quầy, nhập hàng, tuyển, marketing, bán hàng, mở tài chính/lịch sử, đóng cửa, mobile giả lập trong Chromium (module build qua import map/blob, Canvas fallback, storage mô phỏng). Chưa kiểm thử WebGL trên thiết bị thật, offline Service Worker hoặc deploy Vercel. `npm ci --offline`, `npm run build`, `npm test`. Deploy cấu hình giữ nguyên, `dist`. Save schema 1 tự bổ sung business; nên xuất save cũ trước nâng cấp và dùng save đó nếu rollback.
