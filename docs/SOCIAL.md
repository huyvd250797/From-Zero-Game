# V0.12.0 — NPC & Social World

## Mô hình
`NPC_Master.json`: 16 NPC, ID cũ giữ nguyên; `home`, `homeDistrict`, `workplace`, `leisure`, `workStart`, `workEnd`, `fullName`, `age`, `gender`, `occupation`, `color`, `dialogue`. Tính cách tham chiếu `Character_Traits`. 3 mức uy tín dùng `Social_Reputation`. Ngưỡng tình bạn 30/70 dùng `Relationships`; delta giúp đỡ và mâu thuẫn lấy từ `Relationship_Events`.

`src/social.js`: vị trí xác định từ phút mô phỏng, 3 chặng/NPC (nhà→nơi làm/học→điểm thư giãn→nhà). Mỗi chặng tối đa 60 phút giả lập; A* + line-of-sight, cache 48 tuyến. Vị trí nội suy theo chiều dài đường đi; cập nhật mỗi phút game, không phụ thuộc tốc độ render. NPC đứng tại các điểm ngoài công trình. Ngày lặp 24h, chưa có ngày nghỉ. Tuổi tăng theo năm mô phỏng, chưa mô phỏng tử vong.

`state.social` = `{reputation:50,contacts:{}}`. Mỗi contact chứa `trust`, `last`, `helped`, `conflict`, `daily`, `memory` (24 mục). Save cũ tự bổ sung; không thay đổi tài sản hay số dư. Hỗ trợ một lần/NPC; ký ức quan trọng lưu qua cờ, không bị mất khi lịch sử rút gọn.

## Hành động
| Hành động | Phút | Tin tưởng | Uy tín |
|---|---:|---:|---:|
| Chào hỏi | 5 | +6 | 0 |
| Trò chuyện | 15 | +8 (hòa đồng +2, nếu không hòa đồng thì đồng nghiệp +1) | +1 |
| Giúp đỡ | 20 | +10 | +3 |
| Bất đồng quan điểm | 5 | -10 | -2 |
| Xin lỗi | 10 | +6 | +1 |

Mỗi hành động một lần/ngày theo ngày bắt đầu; cần tới gần trong 3 đơn vị, không có vật cản, xuống xe, sức khỏe/năng lượng >=10. Chào hỏi trước; hỗ trợ cần tin tưởng >=15, 30.000đ, một lần/NPC; xin lỗi chỉ khi còn cờ mâu thuẫn. Hành động tua thời gian, NPC có thể đổi vị trí và cần gặp lại. Tin tưởng giảm 1 điểm/tuần đầy đủ sau 7 ngày không tương tác. Quan hệ: người lạ, quen biết, bạn bè (>=30), bạn thân (>=70). Đồng nghiệp là nhãn độc lập, dựa vào hợp đồng hiện có. Uy tín thay đổi trong [0,100]; chưa tác động tuyển dụng hoặc pháp luật.

## Giao diện
Nút Quan hệ xã hội: Mọi người, Danh bạ, Gần đây (20 đơn vị), Uy tín và hồ sơ chi tiết; tìm theo tên/nghề, bộ lọc quan hệ; đi đến NPC, cập nhật đích khi NPC di chuyển; mở hồ sơ lúc đến gần. Chạm nhãn tím trên bản đồ. Chấm tím minimap. Render chi tiết trong tầm nhìn, mô hình giản lược khi zoom thấp/quality low. Khoản hỗ trợ được ghi sổ EXP_SOCIAL và ngân sách tương ứng.

## Kiểm thử và giới hạn
158 unit tests (143 regression, 15 social); 48 tuyến và vị trí mẫu từng 5 phút, migration, tình bạn, đồng nghiệp, chi phí, giới hạn, ký ức. Kiểm thử Chromium bằng import map và storage mô phỏng: tìm NPC đang đi, gặp, chào, chat, giúp, danh bạ, uy tín, nạp save ở mobile. URL test bị chính sách môi trường chặn; chưa xác minh WebGL thiết bị thật, PWA offline, Vercel thật.
NPC chưa có va chạm động, mô phỏng nội thất riêng, nhu cầu cá nhân, tự kết bạn với nhau, lịch ngày nghỉ, hội thoại AI hay cốt truyện độc lập. Tình yêu và gia đình thuộc V0.13.0. Vị trí mô phỏng cập nhật từng phút, có thể thấy bước nhảy khi tua nhanh. Một số NPC có chung loại mô hình, chủ yếu khác màu và tóc. Không thay đổi hình học thành phố.

## Deploy
`npm ci --offline`, `npm run data:validate`, `npm test`, `npm run build`; Vercel preset Other, output `dist`, install `npm ci`, build `npm run build`. Không env/database/SQL. Export save trước update; rollback dùng save trước V0.12.0.
