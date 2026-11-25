# V0.10.0 — Housing & Interior

## Gameplay
Nhà ở → Thị trường: chọn Đến xem nhà, đi tới cửa, chọn Thị trường nhà ở và thuê/mua. Nơi ở của tôi → Về nhà, Vào bên trong nhà. Trong nội thất, bấm ô sàn hoặc đồ nội thất; nhân vật tự tìm đường qua ô trống. Khi tới điểm tương tác, nút hoạt động xuất hiện. Ra ngoài trả về cửa nhà trên bản đồ. Có thể ngủ, tắm, thư giãn, nấu ăn (cần nguyên liệu), tự học (cần sách/laptop). Nội thất là cảnh 2D riêng trong modal, không có thời gian trôi khi di chuyển trong phòng; hoạt động tua thời gian theo quy tắc cũ. Đóng modal/đổi màn hình thoát cảnh; vị trí trong phòng không lưu.

| Nhà | Thuê/24 giờ | Mua | Điện nước + bảo trì/30 ngày |
|---|---:|---:|---:|
| Phòng trọ | 120.000 | Không bán | Gộp tiền thuê |
| Nhà nhỏ | 250.000 | 500.000.000 | 800.000 |
| Căn hộ | 450.000 | 1.500.000.000 | 1.850.000 |
| Nhà phố | 800.000 | 3.000.000.000 | 3.000.000 |
| Biệt thự | 2.000.000 | 10.000.000.000 | 9.000.000 |

Một nơi ở chính, mua tiền mặt, không vay. Bán nhà nhận 90% giá Master Data; tiền thu/chi mua bán ghi vào báo cáo dòng tiền, không phải lợi nhuận ròng kế toán. Giá trị nhà trong bảng tài sản theo giá mua Master Data. Thuê 24 giờ, trả trước, không hoàn tiền khi trả nhà sớm. Không đủ tiền gia hạn hoặc tắt tự gia hạn thì mất quyền sử dụng. Tiền trong tài khoản không tự chuyển. Nhà sở hữu chịu phí 30 ngày kể từ mua; thiếu tiền sẽ phát sinh nợ, thanh toán trong Nhà ở/Tài chính. Nợ giữ lại sau bán; chưa tịch thu nhà.

Mua nội thất ở trung tâm thương mại (09:00–22:00), tự đưa về nơi ở, một món mỗi loại. Giường, bàn học, tủ lạnh, máy lạnh, sofa tăng tiện nghi và được định giá theo Master Data. Tiện nghi = min(100, 15 × sức chứa + tổng comfort nội thất); tác động hạnh phúc khi ngủ, tắm và thư giãn. Cả 5 loại nhà dùng sơ đồ nội thất 9×6 cơ sở, màu sàn khác nhau; không có xây/chỉnh bố trí, cho thuê nhiều nhà hay gia đình ở chung trong phiên bản này.

## Data & save
Properties liên kết 5 công trình. Ba công trình nền kích hoạt thành địa điểm, không di chuyển footprint. Các danh mục tài chính thêm INC_PROPERTY_SALE, EXP_PROPERTY, EXP_HOME, EXP_FURNITURE. Save schema 1 giữ khóa `fromzero.save.v1`, bổ sung `housing` gồm residence, furniture, debt, ever. Legacy rentUntil được bảo toàn. Không có SQL. Không rollback save mới sang phiên bản cũ nếu chưa sao lưu.

## QA
`npm ci --offline`, `npm test`, `npm run build`. 114 test hồi quy (cập nhật đúng kỳ vọng số địa điểm từ 22 lên 25), 16 test mới. Chromium Canvas fallback với HTML/module từ dist được nạp trực tiếp bằng import map và storage mô phỏng do môi trường chặn URL. Desktop 1440×900 và mobile viewport 390×844: mua/bán nhà, vào nhà, di chuyển, ngủ, nấu, tắm, thư giãn, mua giường và lưu. Dùng save thử nghiệm có đủ tiền để kiểm tra; không phải tiền mặc định. Chưa kiểm thử WebGL, service worker offline, thiết bị thật hoặc Vercel production.
