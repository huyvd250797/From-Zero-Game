# V0.22.0 — Content Expansion & Game Balance

## Nội dung và độ khó
- Dễ: 800.000đ; thu nhập lao động 110%; chi phí sinh hoạt/học tập 85%.
- Bình thường: 500.000đ; 100%; 100%. Save cũ tự bổ sung chế độ này, không đổi số dư.
- Khó: 300.000đ; 90%; 120%. Chọn khi tạo nhân vật, không đổi trong lượt chơi bằng UI. Thế hệ kế tiếp giữ độ khó. Báo cáo kết cục ghi chế độ.
- Hệ số được áp dụng sau báo giá kinh tế: thức ăn/nguyên liệu, các hoạt động trả phí (trừ mua xe), thuê nhà, duy trì nhà/xe, nhiên liệu, vận tải, sinh hoạt gia đình, điều trị và học phí. Thu nhập áp dụng cho ca thời vụ và lương đề nghị mới. Lương/lãi suất đã ký, giá mua bán tài sản, đầu tư, lương hưu, doanh nghiệp và tiền sự kiện cốt truyện không đổi theo độ khó. Không điều chỉnh giá nền tài sản một cách tùy tiện.
- 28 địa điểm (3 mới: thư viện cộng đồng, vườn cộng đồng, cửa hàng tiện lợi); 24 NPC (72 tuyến), 15 khóa học (2 chứng chỉ tài chính và giao tiếp), 26 biến cố, 55 lựa chọn. Mốc mới kích hoạt theo sở hữu hiện tại hoặc nghỉ hưu, không tái dựng lịch sử chưa ghi nhận.
- Dự toán sinh tồn: 2 ca làm 6 giờ, 3 suất ăn và thuê phòng; chỉ dự toán theo báo giá hiện tại, không đảm bảo đủ điều kiện hay đủ thời gian. Ca thời vụ cần ít nhất 20 điểm nước uống.
- Dự toán doanh nghiệp: doanh thu theo nhu cầu/tồn kho, giá vốn lịch sử và phí vận hành nửa đêm tới; không bao gồm các chi phí marketing, vay hay nâng cấp phát sinh thêm. Hòa vốn theo giá vốn bình quân (hoặc giá nhập mới nếu kho trống). Không thay đổi save.

## Kiểm thử mô phỏng
`npm run simulate:balance` chạy lịch 30 ngày ở ba chế độ; `npm run simulate:balance -- --long` chạy lịch Bình thường tối đa 30.000 ngày và tổng kết khi đến tuổi 100. Kịch bản dùng `perform`, `advanceTime`, A* và thời gian đi lại xấp xỉ độ dài tuyến/6; gán vị trí sau khi tiến thời gian, không phải test điều khiển renderer. Hai ca thời vụ 6 giờ mỗi ngày, 3 suất ăn, thuê phòng, nước miễn phí, đi dạo, vệ sinh, nghỉ ngơi, ngủ 8h; không có gia đình, khoản vay, học tập, đầu tư hoặc doanh nghiệp.

| Chế độ | Vốn đầu | Tiền mặt cuối 30 ngày | Sức khỏe | Nợ ngủ | Bệnh |
|---|---:|---:|---:|---:|---:|
| Dễ | 800000 | 5180000 | 100 | 0 | 0 |
| Bình thường | 500000 | 3050000 | 100 | 0 | 0 |
| Khó | 300000 | 705000 | 100 | 0 | 0 |

Cuối ngày 30 bao gồm ngủ qua sáng ngày 31 và tiền gia hạn tương ứng. Kịch bản dài hạn Bình thường hoàn thành ở tuổi 100, 59.898 ca thời vụ, tiền mặt 3.796.852.115đ, sức khỏe 100, không nợ ngủ/bệnh, kết cục END_FAILURE_07 (giàu có nhưng cô độc). Đây là lịch lý tưởng làm 365 ngày/năm, không phải dự báo kết quả chơi thông thường. Một kịch bản bỏ mặc nhân vật, tiến thời gian không hoạt động, kết thúc vì sức khỏe ở tuổi 75. Không chứng minh cân bằng toàn bộ 39 kết cục hoặc các đường chơi phức tạp. Chưa triển khai nghề công chức, AI thế hệ, cạnh tranh mua bán thực tế hoặc nội dung trại giam 3D. Cần playtest thêm ở V0.23.0.
