# Education & Skills — V0.7.0

## Quy tắc
- Trình độ xuất phát THPT (giả định thiết kế cho nhân vật 18 tuổi và save cũ). 6 mức canonical: chưa có bằng chuyên môn, THPT, nghề, cao đẳng, đại học, sau đại học. Bản này có đường học lên nghề, cao đẳng, đại học; sau đại học chỉ là seed.
- 3 đơn vị đào tạo dùng 2 địa điểm tương tác sẵn có: Trường nghề An Lạc và Đại học An Lạc dùng chung campus `school` (07:00–18:00); Trung tâm kỹ năng đặt tại thư viện `library` (08:00–20:00). Không bổ sung tọa độ/công trình. Người chơi phải đến cửa trong phạm vi 2,5 đơn vị để ghi danh, học, nhận văn bằng.
- 13 chương trình (6 chứng chỉ, 7 chương trình văn bằng). Chỉ 1 chương trình đang học. Ghi danh 15 phút, đóng toàn bộ học phí một lần vào `EXP_EDU`; không tự vay, không trừ tiền nếu không đủ. Dừng học không hoàn học phí, giữ XP thực học. Có thể ghi danh lại chương trình đã bỏ; không học lại chương trình đã hoàn tất.
- Buổi học 60 hoặc 120 phút, tối đa 1 buổi chương trình/ngày. Mỗi buổi +10 XP kỹ năng; nhận thưởng hoàn thành theo `gain × xpPerLevel`. Phải đủ cả số buổi và thời gian tối thiểu kể từ ghi danh; nhận bằng tại cơ sở (15 phút), không tốt nghiệp tự động. Các ngày đào tạo là thời gian giả lập rút gọn, không tương ứng chương trình đào tạo thật.
- Tự học: thư viện 60 phút/+10 XP (miễn phí); sách 60 phút/+15 XP (80.000đ); laptop 90 phút/+25 XP (7.000.000đ). Sách/laptop không bị tiêu hao; dùng ở thư viện trong giờ mở cửa hoặc phòng trọ còn đủ thời hạn. Không cấp bằng từ tự học.
- 15 kỹ năng, mỗi cấp 100 XP, tối đa cấp 10. Kiến thức = tổng XP kỹ năng đã lưu; tối đa 15.000 XP. 5 công việc thời vụ cho XP tương ứng và XP kinh nghiệm thực hành; không thay đổi mức lương.
- Tổng thời gian học chính quy + tự học tối đa 240 phút/ngày; kết thúc trước nửa đêm. Cần năng lượng, no và đủ nước >=25, sức khỏe >=20. Học tiêu hao nhu cầu theo Life Engine, thêm năng lượng `ceil(minutes/10)`, stress `ceil(minutes/30)`. Chi phí thuê phòng/bảo dưỡng vẫn tính khi tua thời gian. Giữ giới hạn làm việc 480 phút/ngày.
- 19 nghề có điều kiện học vấn và cấp kỹ năng. Kiểm tra chỉ xác nhận điều kiện đào tạo, chưa tuyển dụng/thăng tiến/lương tháng; hệ thống tuyển dụng V0.8.0 sẽ bổ sung các điều kiện còn lại. Bằng cấp so sánh theo rank, kỹ năng theo từng nghề, chưa kiểm tra chuyên ngành hoặc giấy phép hành nghề.

## Chương trình và mức giá (hư cấu)

| Chương trình | Học phí | Ngày tối thiểu | Buổi | Phút/buổi | Văn bằng |
|---|---:|---:|---:|---:|---|
| Phục vụ cơ bản | 300,000đ | 7 | 3 | 60 | Chứng chỉ |
| Lập trình nhập môn | 3,000,000đ | 60 | 12 | 120 | Chứng chỉ |
| Kế toán cơ bản | 1,500,000đ | 30 | 8 | 60 | Chứng chỉ |
| Nghề bếp | 2,000,000đ | 45 | 10 | 120 | Chứng chỉ |
| Quản trị | 12,000,000đ | 180 | 24 | 120 | Chứng chỉ |
| Sửa chữa xe | 2,500,000đ | 60 | 12 | 120 | Chứng chỉ |
| Chương trình nghề CNTT | 6,000,000đ | 90 | 18 | 120 | Học nghề |
| Chương trình nghề đầu bếp | 4,500,000đ | 90 | 18 | 120 | Học nghề |
| Cao đẳng kế toán | 10,000,000đ | 180 | 36 | 120 | Cao đẳng |
| Đại học quản trị kinh doanh | 24,000,000đ | 365 | 72 | 120 | Đại học |
| Đại học sư phạm | 22,000,000đ | 365 | 72 | 120 | Đại học |
| Cao đẳng điều dưỡng | 14,000,000đ | 180 | 36 | 120 | Cao đẳng |
| Chương trình nghề thiết kế | 6,500,000đ | 90 | 18 | 120 | Học nghề |

## Save và kiểm thử
- Giữ `fromzero.save.v1` và schema 1; thêm đối tượng `education` với `active`, `completed`, `xp`, `practiceXp`, `studyDay`, `studyMinutes`. Save trước V0.7.0 nhận giá trị mặc định, không thay đổi tài sản, tiền, nhu cầu, tọa độ hoặc sổ thu chi. Không khôi phục XP từ ca làm cũ.
- Master Data schema V1.4.0, 60 danh mục / 552 bản ghi, bổ sung trường cho Schools/Courses/Jobs/Game_Config. Không cần SQL, tài khoản hay môi trường server.
- Kiểm thử: 62 regression + 18 Education = 80; kiểm tra các giới hạn, bằng cấp, XP, thu chi, dữ liệu và roundtrip. Smoke test UI Chromium Canvas với storage mô phỏng, module build nạp trực tiếp; chưa kiểm thử Vercel thật, WebGL, thiết bị thật hoặc offline service worker.
