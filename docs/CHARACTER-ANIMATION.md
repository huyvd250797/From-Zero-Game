# V1.3.0 — Character & Animation

## Kiến trúc
- `avatar.js`: enum ngoại hình, mặc định, NPC xác định theo ID, nhóm tuổi, 13 khớp, sáu pose, mesh local, rigid skin weights, CPU transform cache 64 mẫu.
- `character.js`: renderer fallback, giữ marker, xe đạp, đường đi; NPC xa dùng proxy cũ.
- `three-character.js`: SkinnedMesh, Bone, Skeleton, quaternion keyframe tracks, AnimationMixer qua ClipPlayer, actor theo người chơi và NPC trong khung hình (tối đa 25), giải phóng tài nguyên khi rời cảnh hoặc đổi ngoại hình/LOD. Mesh động cũ không dựng trùng actor. NPC di chuyển vẫn dựa vào lịch và game clock, chưa có nội suy vị trí độc lập.
- `avatar-preview.js`: preview Canvas bằng phép chiếu hình học thực tế của nhân vật, không phải ảnh AI. Sit/Wave chỉ thử trong editor; hoạt động đời sống chưa được chuyển thành chuỗi animation. Chuyển tiếp Three.js 0,18 giây; fallback dùng pose và motion blend CPU.

## Save
`appearance` gồm body, face, skin, hair, hairColor, shirt, pants, shoe, accessory. Chỉ chấp nhận enum. Schema 1 giữ nguyên; save thiếu appearance nhận mặc định. Chỉnh ngoại hình miễn phí và chỉ trực quan, không đổi nghiệp vụ giới tính hoặc quan hệ. Nhân vật thế hệ mới dùng mặc định nếu không tùy chỉnh. Export JSON lưu cả ngoại hình. Rollback V1.2.1 dùng save sao lưu trước upgrade.

## Kiểm thử/triển khai
- `npm test`: 393 tests không cần dependency; thêm 10 test avatar.
- `npm run build:native-preview` chỉ cho QA, không có Three.js, không đăng ký PWA, output riêng. Kiểm tra `node scripts/verify-release.mjs dist-native-preview` và `node scripts/smoke-http.mjs dist-native-preview`.
- `npm ci && npm run build` bắt buộc tải Three.js 0.180.0, chạy 7 integration tests (2 mới cho rig và actor lifecycle) trước đóng gói vendor. Không bỏ qua production gate. `npm run release:check` kiểm tra đầy đủ.
- Cài đặt hiện tại báo EAI_AGAIN registry.npmjs.org; chưa chạy được 7 test Three thật, chưa render WebGL Three.js hoặc deploy Vercel. Kiểm thử UI bằng Chromium Canvas fallback và localStorage mô phỏng, không đại diện GPU thực. Chưa đo FPS, VRAM, PWA offline và thiết bị thật.
- Vercel Other; root ./; npm ci; npm run build; dist; Node22.x. Không cần DB/SQL/env.

## Giới hạn
Mô hình low-poly procedural, trọng số cứng theo từng khớp (không smooth skinning giữa các khớp); không có asset nhân vật Blender, facial animation, trang phục dạng vật lý, motion capture, IK, seated interaction hoặc animation nghề nghiệp. Camera & Player Control thuộc V1.4.0. Bảo toàn thế giới và quy tắc mô phỏng V1.2.1.
