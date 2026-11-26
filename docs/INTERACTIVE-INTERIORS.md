# V1.5.0 — Interactive Interiors

## Cách chơi
1. Đến cửa địa điểm như trước. Chọn **Vào bên trong · 3D**; tại nhà đang thuê/sở hữu chọn **Vào bên trong nhà**.
2. Chạm nhãn đồ vật hoặc ô sàn, dùng WASD/phím mũi tên hoặc nút hướng. Nhân vật đi theo lưới 9×6; ô đồ đạc bị chặn, nhãn dẫn tới ô đứng bên cạnh.
3. Tại trạm, chọn hoạt động được mở khóa. E kích hoạt nút khả dụng đầu tiên. Ngủ/tắm/thư giãn và hành động địa điểm chạy nghiệp vụ gốc; chức năng phức tạp mở UI mua hàng, học, làm, ngân hàng, y tế. Trở lại nội thất bằng nút **← Trở lại nội thất** trong các modal nghiệp vụ sử dụng header chuẩn; nếu thao tác đóng hẳn modal, người chơi vào lại từ cửa.
4. **Ra ngoài** hoặc Esc đóng cảnh. Không mất tiến trình, ngoại cảnh vẫn ở cửa. Không lưu vị trí nội thất; thời gian đi bộ trong phòng không tính vào mô phỏng như phiên bản nội thất 2D cũ. Hoạt động có thời gian/chi phí vẫn áp dụng đúng nghiệp vụ.

## Phạm vi
- Nhà đang thuê/sở hữu: giường, tắm, bếp, bàn học, góc nghỉ, máy lạnh khi có nâng cấp; cùng sơ đồ cơ sở cho 5 loại nhà. Có nút gia đình, túi đồ, nơi ở; thành viên tại nhà được dựng mô hình tĩnh 3D với nhãn mở hồ sơ gia đình. Chưa có AI di chuyển hoặc va chạm riêng cho thành viên.
- Công cộng (14 địa điểm): shop, mini_mart, market, mall, cafe, office, bank, school, library, library_annex, clinic, hospital, factory, warehouse. Không thay đổi cửa/giờ mở, không đi xuyên qua đồ đạc. Nhà tù, tòa án, công an, công trình khác vẫn dùng luồng cũ.
- Cảnh nội thất là một phòng cắt mái với hình học procedural, không phải mặt bằng thật từng tầng; không thay đổi hình học thành phố. Hoạt động ngồi/ăn/ngủ theo animation cụ thể chưa triển khai, dự kiến V1.9.0.

## Kỹ thuật
`interiors.js` chứa layout, geometry, local BFS và projection. `interior-view.js` fallback Canvas, `interior-three.js` tạo WebGLRenderer riêng với rig và vật liệu, đồng bộ camera trực giao. Khi đóng/thay modal, scene/rig/geometry/material được dispose; thành phố ngừng render trong lúc nội thất mở. Nếu context nội thất lỗi thì chuyển Canvas. Không thêm dependency hoặc save fields.

## Nghiệm thu
`npm test`, `npm run build`, `npm run verify:release`, `npm run smoke:http`; production cần Three.js r180 qua `npm ci`. Local fallback QA dùng `npm run build:native-preview` và `node scripts/verify-release.mjs dist-native-preview`. Không deploy preview.
Kiểm thử thêm trên iPhone/Android/PC: vào/ra liên tục, chạm sàn/nhãn, mở module, hết giờ/thuê, GPU context, FPS và offline. Ảnh chụp fallback không chứng minh renderer Three.js nội thất đã chạy. Nên xuất JSON trước nâng cấp.
