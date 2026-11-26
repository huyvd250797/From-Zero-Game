# V1.8.0 — Weather & Atmosphere

## Phạm vi và điều khiển
Cài đặt → Chế độ thời tiết (hình ảnh): Tự động, Trời quang, Nhiều mây, Mưa, Mưa lớn, Sương mù. Tự động là mặc định; các chế độ khác là xem thử được lưu trong preferences trên thiết bị. Tắt hiệu ứng để chỉ giữ ánh sáng ngày/đêm của trời quang. HUD báo thời tiết mô phỏng (kể cả khi tắt hiệu ứng), rê chuột lên ngày để xem pha ngày/đêm. Không thêm API, dependency, schema hoặc Master Data. Không ảnh hưởng chi phí, bệnh tật, di chuyển, lịch NPC, công việc, tai nạn, đường đi.

## Climate
Khí hậu hư cấu xác định từ đồng hồ game, ngày 01/01/2026; mỗi 180 phút có một trạng thái mục tiêu. Chuyển cloud/rain/fog/wind bằng smoothstep trong 24 phút đầu mỗi khoảng. Mùa mưa tháng 5–11 có xác suất mưa cao hơn mùa khô tháng 12–4. Cache tối đa 64 khoảng thời tiết, không cần lưu lịch sử. Ẩm mặt đường giữ dư lượng mưa của tối đa ba khoảng trước, giảm theo hàm mũ với hằng số 140 phút; preview chọn trạng thái tức thời. Thời tiết được khôi phục xác định theo thời gian khi reload hoặc nhảy thời gian.

## Hình ảnh và hiệu năng
| Preset | Rain cap | Local lamps (Three.js) | Headlights (Three.js) | Puddles cap | Tree sway (Three.js) |
|---|---:|---:|---:|---:|---|
| Low | 90 | 0 | 0 | 12 | Không |
| Medium | 190 | 2 | 1 | 24 | Có |
| High | 340 | 4 | 2 | 40 | Có |
| Ultra | 480 | 6 | 2 | 56 | Có |

Rain: screen-space particles vẽ bằng canvas riêng, một stroke cho cả hệ thống, dừng chuyển động khi pause/modal/tab ẩn; không render overlay ngoài trời khi trong phòng. `prefers-reduced-motion` tắt hạt mưa. Hạt mưa không mô phỏng va chạm, không che HUD/nhãn, không chặn input. Puddles: mesh tám tam giác/vũng, vị trí cố định dọc đường, loại bỏ giao lộ, kích thước theo độ ẩm. Không có gương phản chiếu thật, bề mặt chỉ mô phỏng độ ướt. Three.js dùng MeshStandardMaterial đổi roughness và màu đường, Fog theo camera-space, PointLight cho các cột đèn gần camera, SpotLight cho xe đang sử dụng (không có shadow riêng), cây ven đường instanced shear nhẹ. Không chiếu đèn pha cho mọi xe AI, không gió vật lý hay tia chớp. Fallback có mưa, haze, puddles, cloud tint, WebGL2 wet shader / Canvas wet colour; không chiếu đèn cục bộ hoặc gió cây. Kính giữ emissive hiện có. Sky là màu nền biến đổi, chưa có sky dome/mây 3D.

## QA
`npm test` (452 independent tests), `npm run build:native-preview`, `npm run verify:release -- dist-native-preview`, `npm run smoke:http -- dist-native-preview`, `npm run simulate:balance`. Production `npm ci` và `npm run build` cần registry Three.js r180; không publish native preview. 12 bài integration Three.js được giữ làm build gate, chưa chạy tại môi trường thiếu dependency. Nghiệm thu sau deploy: thử các weather mode ở ngày/đêm và lái ô tô; kiểm tra mặt đường, fog, đèn cục bộ, FPS, pause, nội thất, cập nhật PWA và save cũ. Kiểm thử browser ở đây chỉ dùng Canvas fallback với module build, chưa kiểm thử iPhone/GPU thật. Xuất JSON sao lưu trước update; rollback về V1.7.0 giữ schema save.
