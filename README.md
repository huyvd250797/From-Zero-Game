# From Zero — Từ hai bàn tay trắng
**V2.9.0 — Life Planning & Automation** · 26/11/2026

Game mô phỏng cuộc đời single-player tại thành phố An Lạc. Nhân vật bắt đầu ở tuổi 18, với vốn 300.000–800.000đ theo độ khó; tự lựa chọn sinh tồn, học tập, sự nghiệp, gia đình, tài sản, đầu tư, kinh doanh, phục hồi và kết thúc cuộc đời. Không cần tài khoản, API key, database hoặc backend.

## V2.9.0 — Life Planning & Automation
- Menu → Kế hoạch & tự động hóa (also available in Lịch sinh hoạt). Separate opt-in schedule of up to 24 activities with daily, weekly, monthly and one-time recurrence; daily / 7-day / 30-day previews, editable time/window, mode, condition; three templates.
- 13 actions reuse canonical work, school, study, survival, shopping, healthcare and housing rules. Routes use walking, owned vehicle pickup, scheduled bus and taxi. Normal gameplay movement to the destination, no teleport; wait until 08:00 for formal work; block after 09:00. Auto mode chooses estimated fastest eligible option, subject to fare and action budget.
- Daily direct automation expense limit (default 150,000đ), cash reserve (60,000đ), atomic action preflight on cloned state; stop on critical needs, failed action, route loss or save failure. Paid transit fares not refunded on interruption. Regular automatic rent/debts and fuel depletion are not counted as direct automation expenses. One occurrence per task/day, history capped at 120; do not replay missed days or auto resume after loading. Manual input or opening menus stops automation. Runs at 1× and only in active foreground gameplay. Long actions apply canonical time advancement rather than live interior animations.
- Optional planner in schema 1; no changes to Master Data, Three.js, graphics, interiors or rig cache fix. 608 unit tests (14 new); Native QA 93 assets. Production Three.js build still requires npm ci. See docs/LIFE-PLANNING-AUTOMATION.md.

## V2.8.0 — Interactive Buildings & Housing
- Vào 41 công trình công cộng và 11 nhà ở bằng cảnh 3D toàn màn hình, giữ camera trực giao từ trên cao, Mesh và mô hình avatar/animation dùng chung với thành phố. Cảnh nhà nhiều phòng có cửa, vách cắt thấp, va chạm, đi bộ liên tục, WASD/Shift, joystick, bấm sàn/đồ vật để tìm đường, xoay/zoom và xem toàn nhà. Đồng hồ tiếp tục chạy khi ở cảnh nội thất, tạm dừng trong menu và chế độ bố trí.
- Ba mẫu quy mô nhà (1, 2 hoặc 4 khu vực), kệ TV, tủ quần áo, bàn ăn, máy giặt, cây cảnh ở nhà lớn; đồ sở hữu vẫn mua theo Master Data. Bố trí đồ vật theo lưới, xoay 90°, 4 kiểu sàn và 4 màu tường; lưu riêng theo property ID, kiểm tra trùng đồ và lối đi, có hủy và khôi phục mặc định. Không thay đổi giá, tiện nghi, dữ liệu gia đình hay tọa độ ngoài trời.
- Cảnh chỉ dựng nội thất hiện tại, không dựng thành phố song song; giới hạn 6 thành viên gia đình, 3 NPC công cộng, DPR và FPS theo preset. Production Three.js dùng cùng bộ xương; Canvas fallback vẫn chiếu tam giác 3D nhưng không phải GPU renderer.
- Save schema 1 giữ nguyên với `housing.decorations` tùy chọn; dữ liệu canonical không đổi. Tiến trình di chuyển trong phòng là trạng thái phiên, khi tải lại sẽ ở cửa ngoài. Không có SQL migration.
- 594/594 unit tests PASS, Native QA 91/91; bắt buộc chạy gate Three.js thật trước deploy. Không dùng native preview làm production.

## V2.7.1 — Smart Mobility & Rig Cache Stability Fix
- Production integration test regression: isolate a named pedestrian for brief offscreen reuse; exercise >16 named offscreen rigs separately and assert eviction, recreation and disposal. Verify NPC riders are rendered only with selected vehicles; hide car occupants. Runtime rendering/cache policy and mobility gameplay remain unchanged.
- Production gate remains mandatory; dependency installation requires registry access.

## V2.7.0 — Smart Mobility & Transportation
- Three bidirectional bus lines, 14 existing stops, terminal departures 06:00–22:00, 12/15 minute headways; route planner searches timetable transfers and walking links, with up to 90-minute wait per boarding. Scheduled bus visuals and passenger journey use identical trip times and path sampling. Taxi pickup at valid outdoor positions with 3–6 minute wait and distance fare. Choose walking, owned vehicle, bus or taxi in the destination dialog; advance public journeys by game clock. Fare paid once upfront; cancel/reload does not refund or resume the session-only journey.
- Stable NPC vehicle ownership derived from identity, daily mode (walk/bicycle/motorbike/car) chosen from route distance, needs and cash. Existing daily schedules use road paths for vehicles; daily transport expense included in NPC spending and optional cumulative transportSpent. Moving NPC vehicles and nearby parked vehicles use bounded viewport budgets; social interactions require NPC not riding. Parking planner excludes NPC and player occupied bays; rechecks at arrival. Roadside parking remains available.
- Automatic player vehicles slow at peak hours and respect aligned road stop lines on red/amber. Existing manual driving and lane background traffic retained; no collision/fine/traffic-capacity simulation. Prefer sidewalk connectors when valid and reasonably short; fallback to canonical pathfinder. No map or Master Data changes. 582 unit tests, 88 native QA resources; production Three.js still requires npm access. See `docs/SMART-MOBILITY-TRANSPORTATION.md`.

## V2.6.0 — Autonomous NPC & Population
- 65 named NPCs (40 additions, all previous 25 records unchanged); 90 deterministic non-interactive background walkers (5 candidates per district, fewer at night). All 18 districts have named residents and/or workplace/study destinations; residential homes assigned to added NPCs.
- Each named resident keeps independent cash, cumulative income/expenses, six needs, daily plan, day-off flag, days worked and bounded symmetric neighbor relations. World clock settles the previous day at midnight, then selects the next plan using utility scores. NPC schedules reflect work/study, rest at home, leisure, supplies and library visits. No camera-driven gameplay mutations, no player ledger mutations or notification spam.
- Social menu includes district filter, population summary and resident profile. Render preparation only for viewport plus margin / nearby player; ambient render budgets Eco/Low 8, Medium 16, High 24, Ultra 32; background actors low LOD and no labels or contacts. Named NPC positions remain accessible everywhere.
- Master Data 3.1.0 (1028 entries / 60 catalogs); optional population state initialized at current day for legacy save schema 1. 571 independent tests; Native QA only, production dependency not cached. See `docs/AUTONOMOUS-NPC-POPULATION.md`.

## V2.5.0 — Greater An Lac City
- Expand to 384×384 (four times the area); 18 districts, 229 plots, 206 solid buildings, 60 interactive destinations, 24 road axes, 144 intersections, 12 bridge corridors over the An Bình river. All 79 old plot records, 29 navigation nodes, 10 old districts and 12 old road records remain unchanged. New districts extend east and south, no coordinate rescaling.
- Add 32 scheduled local activities, 19 employers with existing job types, six properties and two courses at a new vocational training center. Link shops to existing goods. Require presence at expansion locations, use existing financial ledger and simulation. Bus stops increase from 6 to 14; taxi routing remains dynamic. No new NPC autonomy, jobs categories or new interiors in this release.
- River is a collision barrier except at bridges. Shared obstacle spatial buckets, typed occupancy grid and reusable A* arrays with generation stamps, 128-entry route cache. 144 chunks of 32×32; preserve viewport rendering, macro chunks, LOD, cache and light policies. Searchable full-city map, district filter and adaptive labels. Orthographic view only.
- Master Data 3.0.0: 60 catalogs, 988 records. Save schema 1 unchanged. Existing saves accepted; do not roll back a save containing new coordinates/IDs without restoring backup. 561 independent tests, native QA build and HTTP integrity verified; Three.js production and physical GPU acceptance pending. See `docs/GREATER-AN-LAC-CITY.md`.

## V2.4.0 — Advanced Lighting & Atmosphere
- Improved day/night palette, hemisphere ground bounce approximation, exposure and cloud-dependent soft shadow strength. Keep orthographic view and stable shadow coordinates.
- Dedicated emissive material for canonical facade glass, daytime off and late-night dimming; no extra lights per window. Sky gradient in Three.js and Canvas; moving soft ground cloud footprints on Three.js.
- Every visible streetlamp retains its base glow and bulb; wet roads receive bounded road-aligned glow streaks, PBR roughness and darkening, plus animated puddle ripples. These are simulated highlights, not ray-traced or screen-space reflections.
- Deterministic soft lightning pulse and delayed procedural thunder on existing weather audio bus, only at normal simulation speed. Flash setting and reduced-motion suppression. Manual weather changes interpolate over 1.6 seconds, automatic climate keeps existing deterministic schedule.
- Quality/eco limits for cloud, rain, ripple, reflection and overlay DPR. No changes to Master Data, save schema or gameplay. See `docs/ADVANCED-LIGHTING-ATMOSPHERE.md`.

## V2.3.0 — City Graphics 3.0
- Visual design registry covers all 79 plots, with 27 derived visual profiles and 21 landmark overrides. Keep 62 solid buildings, 28 interactive destinations, 192×192 map, all canonical IDs and entrance positions.
- Vietnamese rowhouses: roof tanks, balcony planters, ventilation details and AC units. Separate mall/market, café, store/showroom, office/apartment, institutional and industrial façade details; Vietnamese rooftop identification on selected landmarks. Existing procedural stylized meshes, not imported architectural GLBs.
- Flat road markings and sidewalk tile surfaces, separated intersecting asphalt strips, crosswalks and stop lines at both LODs, drainage grates, roadside signs, park planting and improved bench details. Tree stations stable at both LODs; keep all 82 lamp coordinates unchanged. Decorative props are visual only.
- Improved 128px procedural surface texture patterns; preserve existing shared material grouping, instanced street trees, LOD hysteresis, predictive preparation and chunk cache. Total static city triangles High 116,108 vs 123,570; Low 40,148 vs 36,962, with 240 rather than 120 street trees at both levels. These are CPU geometry counts, not GPU FPS or draw-call measurements.
- 540 independent tests and 83 Native QA assets; Desktop/Mobile Chromium Canvas smoke and offline mesh preview. Real Three.js dependency unavailable in local cache; production GPU validation pending. No database, migration, new dependency or Master Data change.

## V2.2.0 — Advanced Character Models
- Four original skinned GLB templates (male/female, high/low); official GLTFLoader and SkeletonUtils clone in Three.js, same named 13 joints and 19 procedural clips. Customized models use shared geometry generator and the template rig; fallback works if GLB fails. No external model assets.
- Smaller head, more natural torso and limbs, smoother normals, face details, eight hair styles and eight shirt colors, age details and NPC work/study wardrobe. NPC profile uses CPU geometry preview. Original art remains stylized and rigid-weighted.
- All 25 residents use stable Vietnamese full names, 3 or 4 words. Existing IDs unchanged; new NPC_SAO (Đào Thị Sao, initial age 17, fictional student) remains one year younger than the player. Existing adult relationship age gate stays enforced.
- NPC walking duration uses route length and a stable individual pace (1.55–1.82 world units / second at 1× for current population); short commutes arrive early, long commutes depart earlier, no slow-motion 60-minute fixed leg. Walk cadence follows displacement; high game speed remains accelerated. Normal schedule and interactions still deterministic.
- 531 unit tests, native QA verified; official Three.js integration and hardware performance pending. Save schema 1 unchanged. NPC catalog and its minimum age validation intentionally updated; other Master Data files unchanged. Export backup before update; a save with NPC_SAO contacts cannot be loaded safely by V2.1.0.

## V2.1.0 — Visual Fidelity & Smooth Experience
- Existing orthographic camera only: critically damped spring for position, zoom and pitch; interpolated player and vehicle motion from the fixed 60 Hz movement step. Reset presentation on visibility changes. Preserve existing yaw interpolation, journey, proximity labels, floating joystick and PWA zoom guard.
- Three renderer: predictive viewport translation, low LOD fallback, cooperative preparation of one CPU chunk per rendered frame, bounded LRU, zoom LOD hysteresis, distance-based low-detail selection. Mandatory visible geometry may be generated synchronously; actual GPU upload is not time-budgeted. No geometry holes intended; hardware QA pending.
- 128×128 generated textures, anisotropic filtering per preset, refined approximate vertex contact shading, quantized shadow extent and existing texel snapping, smaller adaptive-resolution steps. Preserve existing FXAA and viewport lamps. No SSAO, new character assets or third-person camera.
- Notification center and HUD journal show significant events only. Routine receipts are retained internally for existing business logic; optional `importantJournal` (max 40 entries) persists key events separately in schema 1, with legacy journal filtering. Current health/financial warnings alert on transition rather than every refresh. Direct error feedback stays transient.
- Settings include 1% low FPS, long frames, prepared chunk counts and JSON diagnostics. CPU timings are not GPU timings. 523 unit tests, native QA only; production Three.js requires npm ci and device validation.

## V2.0.1 — Gameplay Experience & Stability
- Smart Journey: choose walking or a reachable parked vehicle, walk to it, automatically board, replan the vehicle route and park at the destination. Keep the final destination when manually interrupting walking; cancel explicitly to discard it. Journey is session-local, not a save migration.
- Viewport lighting: every visible street lamp receives an instanced bulb and soft world-space ground glow (Three.js), independent of the bounded supplemental PointLight pool; fade supplemental lights before reassigning. Stable lamp coordinates across LOD. Native/Canvas use approximate colored geometry. No per-lamp shadow maps.
- NPC proximity labels (6 m enter / 8 m exit), max three nearby names, line-of-sight and viewport filters. Minimap hidden and drawing suspended by default; full map retained. Four visible quick actions, collapsible camera, context-dependent controls and default floating joystick; fixed joystick and minimap options in settings.
- 19 original SVG item pictograms, shared by inventory, store and recipe screens.
- Fractional frame pacing, fixed 60 Hz movement substeps and shared interpolated actor/camera position; occlusion pitch hold/rate limit; texel-snapped directional shadow center. No change to time/economic simulation or save schema. See `docs/GAMEPLAY-EXPERIENCE-STABILITY.md`.

## V2.0.0 — Immersive Life Simulation
- Nhận diện thế hệ thứ hai, giữ nguyên Three.js r180, save schema 1, Master Data V2.9.0 và các hệ thống cuộc đời.
- Shadow scheduler cập nhật khi xoay/nghiêng camera; animation Three.js dừng khi gameplay tạm dừng, không bù thời gian animation lúc tiếp tục. Giảm báo xung đột lưu trữ giả bằng kiểm tra token hiện tại.
- Thêm p95 khoảng cách giữa khung hình đã hoàn thành vào chẩn đoán hiệu năng; build tự kiểm tra toàn vẹn tài nguyên. Không coi Native QA là production.
- Hướng dẫn nghiệm thu và rollback: `docs/IMMERSIVE-LIFE-SIMULATION.md`.

## V1.12.0 — Visual Performance & Polish
- CPU mesh conversion uses direct typed-array writes and skips UVs for untextured dynamic geometry. Overview merges low-LOD 2×2 regions into nine macro batches with shared tree instances; near-camera keeps individual chunks. Active regions are never evicted; cache limits are 18/28/44, expanded if the visible set exceeds the limit.
- Adaptive internal render pixel budgets, 30 FPS optional battery mode, capped shadows and weather in battery mode; shadow passes refresh at 10–20 Hz or on major view changes. HUD and camera coordinates remain CSS-pixel based. NPC rigs retained for up to six seconds offscreen, clips cached by age, old crossfaded actions stopped. Traffic lanes precomputed; hidden vehicle geometry and duplicate NPC pass avoided.
- Retain one previous fingerprinted PWA cache for old tabs during update, remove newly created incomplete cache after failed install, preserve current shell and save schema. No migration or new dependency.
- See `docs/VISUAL-PERFORMANCE-POLISH.md` for benchmark, limitations and V2.0.0 acceptance checklist. Production Three.js still requires dependency install and runtime tests.

## V1.11.0 — Game UI & HUD 2.0
- Compact HUD mặc định ẩn hai bảng phụ, thanh 7 chỉ số, minimap và 6 lối tắt. Menu cuộc đời gom toàn bộ chức năng; nút Camera mở thêm điều khiển mobile. Phím V vẫn bật/tắt bảng phụ.
- Hiển thị thứ theo lịch mô phỏng; Lịch và Hồ sơ nhân vật có ngày hôm nay/ngày mai, ca bắt đầu 08:00, nhận ca đến 09:00 theo hợp đồng, không tự thay đổi lịch. Túi đồ dạng lưới với bộ lọc, hội thoại NPC, menu tương tác và trung tâm thông báo phiên chơi + nhật ký.
- Chặn zoom tài liệu bằng viewport, touch-action và hủy default gesture đa điểm/zoom modifier; vẫn dùng pointer events cho pinch/rotate camera. Scroll modal một ngón giữ nguyên. Cần nghiệm thu iOS standalone trên thiết bị thật.
- Nút Pause mở menu tạm dừng; tiếp tục, lưu, cài đặt, hướng dẫn, về màn hình chính. Đóng menu không tự chạy lại đồng hồ. Space giữ cơ chế bật/tắt pause.
- Không thay đổi save schema, Master Data hoặc dependency. 483 unit tests, native preview 73 tài nguyên. Production Three.js chưa xác minh tại môi trường hiện tại. Xem `docs/GAME-UI-HUD.md`.

## V1.10.0 — Audio & Soundscape
- Original procedural Web Audio mixer, offline without media downloads: day/night ambience, rain/wind, distance-panned traffic/NPC cues, footsteps by traveled distance, vehicle engine pitch, interior ambience, activity sound cues, original day/night synth music and UI cues.
- Settings → Âm thanh & nhạc nền: master and six independent groups, enable/mute, stereo toggle, test and reset. Preferences in `fromzero.audio.v1` separate from character saves. Audio unlocks after trusted gesture, pauses in background and resumes if supported; no microphone or external requests.
- Synthesized cues are stylized rather than recorded environmental audio. See `docs/AUDIO-SOUNDSCAPE.md`. 475 independent tests; 72 native preview assets; actual Web Audio signal measured in Chromium desktop/mobile emulation. Production Three.js dependency unavailable locally, physical iPhone audio and offline reload still need acceptance.

## V1.9.0 — Immersive Activities
- Animated activity scenes tied to existing room stations and business actions; outdoor actions use a local illustrative scene. Close-up camera and full-room toggle, eight new skeletal clips, handheld props, ×1/×2/×4, finish now or cancel. Original simulation action runs once only on completion; no partial changes on cancellation, no new save fields. See `docs/IMMERSIVE-ACTIVITIES.md`.
- Three.js r180 remains required for production; Canvas preview is available for QA. Three.js runtime is not verified locally because dependency is absent from npm cache.

## V1.8.0 — Weather & Atmosphere
- Five deterministic climate states (clear, cloudy, rain, heavy rain, fog), three-hour slots and 24-minute transitions. Wet season May–November and dry season December–April; purely visual fictional climate, no external weather API. Road wetness decays after rain. Golden-hour colour and cloud-dependent sun strength.
- Animated screen-space rain on a pointer-transparent canvas, batched in a single stroke, with quality-dependent caps and pause/reduced-motion handling; fog via Three.js Fog and fallback canvas haze. Puddles are procedural geometry on road surfaces; wet asphalt PBR roughness/darkening in Three.js and native shader, basic darkening in Canvas. No real-time reflection or rain physics.
- Three.js bounded local lighting: up to six street lamps, two active vehicle/transit headlights; no extra shadow maps. Existing glass emissive and street-tree InstancedMesh wind shear. No real-time local lights in fallback.
- Settings: automatic weather or explicit preview, effects on/off; weather displayed in HUD. Preferences only; saves, economy, navigation, NPC schedules and Master Data unchanged. See `docs/WEATHER-ATMOSPHERE.md`.
- 452 independent unit tests; native preview 70 assets. Three.js integration remains gated by actual dependency install; production build not verified here.

## V1.7.0 — Advanced Transportation
- 8 shared procedural vehicle meshes (6 owned models, bus and taxi); rolling wheels and front-wheel steering, vehicle lights including brake and flashing turn-indicator colors. No external assets. The motorcycle rider uses the existing ride pose; vehicle lamps are colored geometry, not local light sources.
- Continuous acceleration, coasting, stronger explicit braking and bounded yaw for owned vehicles; canonical maximum speed unchanged. Route following retains collision sweep and fuel cost per actual distance. G holds brake, mobile Phanh toggles; braking cancels auto route. Camera xe follows vehicle at a closer zoom; B parks/mounts as before. Bãi đỗ finds a reachable painted stall at one of the 3 existing lots, drives to it and parks. The saved position/yaw remains the existing schema.
- Deterministic ambient right-hand traffic across 12 roads and 36 intersections; up to 24 ambient vehicles, shared signal cycle (8 green + 2 amber + 10 red simulation seconds per axis). Cars stop during amber/red and cross on green. Traffic is a visual simulation only: no player traffic penalties, no NPC vehicle collisions, no dynamic overtaking. Existing player auto routes use road centrelines and do not enforce signal phases.
- See `docs/ADVANCED-TRANSPORTATION.md`. Three.js r180 unchanged; 441 unit tests; native preview 67 assets. Production requires actual Three.js dependency (`npm ci`).

## V1.6.0 — Living NPC World
- NPC exterior positions sample the fractional simulation clock per render frame, with shortest-angle heading interpolation and distance-based gait pacing. Geometry, Three.js actors and labels consume the same snapshot. Paused gameplay freezes the snapshot; time skips reset presentation without replaying travel.
- Existing 24 residents retain their canonical schedules, social interactions and save format. Added deterministic leisure strolls, paired conversations, nearby same-direction companion markers, bounded obstacle-checked personal-space offsets and five skeletal gesture loops: talk, work, read, eat, shop.
- Public interiors show up to three residents derived from current venue schedule/opening hours. Residents are animated at free cells near furniture; they do not occupy action stations. Roster rebuilds on room re-entry and after direct time-advancing public activities. Social interaction remains at the exterior rendezvous point; interior residents are visual representations, not independent agents or physical inventory transactions.
- `npm run benchmark:npc` reports max frame displacement and zero-motion frames for an illustrative 120-sample 60 Hz commute at each game speed (not measured device FPS). See `docs/LIVING-NPC-WORLD.md`.
- Three.js r180 unchanged. 428 unit tests; native QA preview 64 assets. Production dependency installation blocked locally; run npm ci and production build on Vercel before GPU acceptance.

## V1.5.0 — Interactive Interiors
- Vào nội thất mở mái tại nhà đang có quyền sử dụng và 14 địa điểm công cộng; nút “Vào bên trong · 3D” xuất hiện tại cửa.
- Chạm nhãn đồ vật/sàn hoặc dùng WASD, phím mũi tên và bốn nút điều hướng để đi theo lưới 9×6 tránh đồ đạc. Chức năng tại vật dụng chỉ xuất hiện khi đến ô tương tác; E kích hoạt thao tác đầu tiên.
- Phòng trọ/nhà dùng nội thất từ dữ liệu đã có; ngủ, tắm, thư giãn, nấu ăn, học tập. Các địa điểm công cộng chuyển tới đúng nghiệp vụ mua hàng, làm việc, học tập, ngân hàng, y tế. Giao dịch hiện vẫn dùng bảng xác nhận nghiệp vụ cũ.
- Three.js r180: scene/camera riêng, MeshStandardMaterial và rig nhân vật, có fallback Canvas dựng từ cùng hình học; giải phóng scene khi rời phòng, không render lại thành phố trong lúc ở bên trong.
- Không đổi save schema, Master Data hoặc collision ngoài thành phố. Vị trí trong phòng là trạng thái tạm thời; lưu/reload sẽ trở về cửa ngoài. Không tính thời gian đi bộ trong phòng (giống nội thất cũ), các hoạt động vẫn tính thời gian/chi phí theo quy tắc gốc.
- Chưa có nội thất riêng theo từng loại nhà, hoạt động animation chuyên sâu hoặc nhà tù 3D. Production Three.js cần `npm ci` với Registry truy cập được; kiểm thử fallback không thay thế nghiệm thu GPU thực.
- Chi tiết: `docs/INTERACTIVE-INTERIORS.md`.

## V1.4.0 — Camera & Player Control
- 4 chế độ camera: Toàn cảnh, Theo nhân vật, Cận cảnh và Tự do; zoom .18–7, góc nghiêng 20–82°, xoay và bám theo mượt. Phép chiếu trực giao thống nhất Three.js, WebGL native và Canvas. Cận cảnh tự nâng góc khi tòa nhà chắn nhân vật; nếu vẫn khuất hiển thị cảnh báo.
- Kéo chuột/trượt một ngón để pan; kéo chuột phải hoặc kéo ở chế độ Cận cảnh để orbit. Hai ngón pinch và twist; không phát sinh tap khi nhấc ngón sau pinch. Chạm đất sử dụng phép chiếu của khung hình cuối, không đổi A*. Camera tự do không tự bám lại khi nhân vật di chuyển. F: theo, C: cận cảnh, Q/R: nghiêng, Z/X: xoay, V: ẩn/hiện HUD phụ.
- HUD phụ ẩn được, toolbar hai hàng responsive, địa điểm gần được làm nổi bật. Giữ nguyên simulation, save schema 1, Master Data, dependency Three.js 0.180.0. Xem docs/CAMERA-PLAYER-CONTROL.md.
- 406 unit tests; native preview 60 tài nguyên. Production build yêu cầu npm ci và test Three.js thật.

## Bắt đầu
1. Chọn **Bắt đầu cuộc đời mới**, nhập tên, chọn Dễ/Bình thường/Khó và tùy chỉnh ngoại hình. Save cũ giữ nguyên độ khó đã có; save từ trước V0.22.0 mặc định Bình thường.
2. Hướng dẫn khởi đầu tự mở. Chọn **Đến nơi** để nhân vật tự tìm đường; đến cửa và tương tác với hoạt động. Có thể đóng hướng dẫn và tự do khám phá.
3. Kiếm thu nhập tại cửa hàng khu dân cư (ca 4 giờ); mua cơm tại cửa hàng, uống nước/ nghỉ miễn phí ở công viên, thuê trọ khi có đủ tiền. Giá theo thời gian và độ khó. Dùng Sinh tồn & phục hồi để xem dự toán. Không có phần thưởng chỉ vì mở hướng dẫn.
4. Học miễn phí tại thư viện hoặc đăng ký khóa học; ứng tuyển khi đủ kỹ năng. Quản lý nhà ở, phương tiện, quan hệ, sức khỏe, tài chính và các biến cố qua menu chức năng.
5. Duy trì nhu cầu và kiểm tra chi phí định kỳ. Tua nhanh thời gian không bỏ qua các nghĩa vụ. Phá sản/đi tù vẫn có cơ hội phục hồi. Từ 60 tuổi có thể nghỉ hưu; kết thúc lượt chơi qua Aging & Legacy, lưu Hall of Fame.

## Điều khiển
| PC | Mobile |
|---|---|
| WASD/mũi tên, Shift chạy | Joystick, nút CHẠY |
| Chọn địa điểm hoặc chạm bản đồ để tìm đường | Chạm địa điểm / bản đồ |
| E tương tác, B lên/xuống xe | Nút Tương tác, Phương tiện |
| F bám nhân vật, Z/X xoay, cuộn zoom | Nút xoay/zoom, pinch, kéo camera |
| Esc hủy đường/đóng modal; Space tạm dừng | Nút đóng, Hủy tuyến đường, tạm dừng |
| Menu chức năng bên trái | ☰ thu gọn menu, mở lại khi cần |

Thời gian chạy khi gameplay hoạt động. Modal, tạm dừng và tab ẩn dừng mô phỏng; chọn ×1/2/4/8/16 để điều chỉnh nhịp game.

## Gameplay kế thừa V1.0.0
- Thành phố 3D cách điệu 192 × 192, 10 phân khu, 28 địa điểm tương tác, 24 NPC định danh và lịch sinh hoạt.
- Sinh tồn, giáo dục (15 khóa học), nghề nghiệp, tài chính, nhà ở và phương tiện, quan hệ, hôn nhân và con cái.
- Ngân hàng, tiết kiệm, vay vốn, cổ phiếu/vàng giả lập, 6 loại hình kinh doanh, kinh tế biến động.
- 26 biến cố, 55 lựa chọn cốt truyện; sức khỏe dài hạn, thói quen, pháp luật, chấp hành án, thanh lý và phục hồi.
- Lão hóa, lương hưu, di sản, 40 kết cục trong dữ liệu (39 có quy tắc đánh giá), Hall of Fame, 3 mức độ khó.
- Bốn cấp độ đồ họa, cache A*, ba lớp lưu trữ, cảnh báo xung đột tab, PWA fingerprint và precache SHA-256.
- V1.0.0: onboarding có dẫn đường thật, bảo vệ xác nhận thay thế save, hỗ trợ điều hướng bàn phím trong modal, đồng bộ branding.

## Character & Animation V1.3.0
- Hai dáng người, ba dạng khuôn mặt, bốn màu da, bốn kiểu tóc, bốn màu tóc, sáu màu áo, bốn màu quần, ba màu giày và ba phụ kiện. Chỉnh khi tạo nhân vật hoặc qua Ngoại hình nhân vật; miễn phí, không ảnh hưởng giới tính nghiệp vụ, chỉ số hay tài sản. Preview 3D procedural bằng Canvas chiếu các tam giác, có xoay và sáu động tác.
- Mô hình tạo bằng code, 13 khớp phân cấp. Three.js `SkinnedMesh`, `Bone`, `Skeleton`, trọng số cứng một khớp/đỉnh, `AnimationMixer` và crossfade 0,18 giây. Idle/Walk/Run/Ride kết nối trạng thái di chuyển, Sit/Wave chỉ xem trước. NPC có ngoại hình xác định từ ID, theo tuổi và LOD, không thay đổi hành vi. Native/Canvas dùng chung hình học và pose CPU.
- Tóc bạc và dáng người theo bốn nhóm tuổi (18–39, 40–54, 55–74, 75+). Save schema 1 thêm `appearance`, save cũ nhận mặc định; thay đổi ngoại hình không thay đổi gameplay. Không có mesh Blender, rig biến dạng mềm, biểu cảm động, quần áo vật lý hoặc animation tương tác đầy đủ.
- **393/393 unit tests** đã chạy tại môi trường này. Native QA build (59 tài nguyên) và UI Chromium Canvas với storage mô phỏng được kiểm tra. npm Registry lỗi DNS EAI_AGAIN: 7 test runtime thật và production build Three.js chưa chạy được. Không phát hành `dist-native-preview` lên Vercel. Xem [Character & Animation](docs/CHARACTER-ANIMATION.md).

## Three.js Engine Migration V1.2.1 (kế thừa)
- Three.js r180 (`three@0.180.0`) là renderer ưu tiên mặc định; fallback native WebGL 2 → WebGL 1 → Canvas. Giữ vật liệu, ánh sáng, GLTFLoader, hậu kỳ, bốn preset, instancing cây ven đường, LOD, camera và vùng va chạm.
- Production build yêu cầu npm ci, kiểm thử runtime Three.js, đóng gói module vendor và LICENSE trong fingerprint, SHA-256 precache. Không dùng CDN khi chơi. Xem [THREE-JS-MIGRATION](docs/THREE-JS-MIGRATION.md) (báo cáo lịch sử V1.2.1).

## Thành phố An Lạc V1.2.0
- 62 công trình và 17 lô đất mở dùng 12 mẫu kiến trúc/cảnh quan procedural, 10 palette phân khu. Nhà phố có mái ngói, ban công, mặt tiền theo hướng cửa; cửa hàng có kính, mái che, biển chữ hình học tiếng Việt; chung cư, văn phòng, cơ sở công cộng và nhà xưởng có kiểu riêng.
- Vỉa hè, bó vỉa, vạch đường, lối tiếp cận cửa, cây dạng tán tròn và cây cau cách điệu, cột đèn, thùng rác, ghế, bồn hoa, đài nước, luống cây và sân thể thao. Các vật trang trí không có collision/hoạt động riêng; đèn chưa phát sáng cục bộ. Hình học dùng chung WebGL 2/WebGL 1/Canvas. Canvas Low/Medium ưu tiên LOD thấp.
- Không thay đổi master data, vị trí, collision, gameplay, save schema. Dùng lại GLB ghế của V1.1.0; chưa thêm bộ mô hình Blender hoặc texture ngoài. Xem [Immersive City](docs/IMMERSIVE-CITY.md).

## Nền tảng đồ họa native V1.1.0–V1.2.0 (fallback kế thừa)
- WebGL 2 native, shader vật liệu theo mô hình chiếu sáng microfacet; bề mặt procedural theo tọa độ thế giới, bóng đổ depth map PCF, ánh sáng ngày/đêm, phản xạ giả lập và phát sáng cửa kính.
- Low/Medium/High/Ultra; bật/tắt riêng bóng đổ, bóng tiếp xúc gần mặt đất (không phải SSAO), bloom và AA hậu kỳ đơn giản. Độ phân giải thích ứng có ngưỡng và hysteresis.
- GLB ghế đá mẫu tự tạo, bộ đọc GLB 2.0 tĩnh có giới hạn, fallback mô hình code khi tải thất bại. Renderer native không sử dụng CDN hay dependency ngoài.
- Nếu không có WebGL 2 hoặc lỗi khởi tạo, tự chọn WebGL 1/Canvas. Có thể chọn Legacy trong Cài đặt rồi lưu và tải lại. Khi lỗi renderer lúc chơi, tạm dừng và lưu/xuất JSON trước khi chuyển Legacy.
- Ở V1.1.0–V1.2.0, chưa tích hợp Three.js; V1.2.0 cải tiến hình học procedural, chưa thay thế bằng mô hình GLB riêng từng công trình. Không có full GLTF loader, texture PBR riêng từng file, SSAO, skeletal animation hay instancing GPU mới. Xem [Graphics Engine](docs/GRAPHICS-ENGINE.md).

## Deploy GitHub → Vercel
Giải nén ZIP, đưa **nội dung bên trong** vào root repo. Không commit dist hoặc node_modules. Cấu hình `vercel.json` đã có:

| Setting | Value |
|---|---|
| Framework Preset | Other |
| Root Directory | ./ |
| Install Command | npm ci |
| Build Command | npm run build |
| Output Directory | dist |
| Node.js | 22.x (engine >=20) |
| Env / DB / SQL migration | Không cần |

Khi repo liên kết Vercel, push branch production theo thiết lập hiện tại. Giữ cùng domain để truy cập bản lưu cũ. Không phải Next.js, không cần routes-manifest.json. Source đã kiểm thử ở chế độ native QA, production build cần cài Three.js qua npm ci. Chưa deploy Vercel.

## Chạy local và kiểm tra
```sh
npm ci
npm run release:check
npm run preview
```
Mở `http://localhost:5173`. `npm run dev` dành cho phát triển. Không mở trực tiếp index.html bằng file://. `npm run release:check` chạy npm ci (cần Registry nếu cache trống), test, production build có 5 test Three.js runtime, kiểm tra SHA-256, HTTP và 30 ngày sinh tồn. `npm run test:three` chạy riêng test runtime sau cài đặt. Nếu Registry chưa truy cập được, `npm test` và `npm run build:native-preview` chỉ dùng QA native, không phải nghiệm thu production. `node scripts/serve.mjs dist-native-preview` chạy preview ở origin/port riêng. Các test dài hạn riêng: `npm run simulate:balance -- --long`; benchmark cache A*: `npm run benchmark:navigation`.

## Save và cập nhật
Save schema 1 giữ nguyên: `fromzero.save.v1`, `fromzero.backup.v1`, `fromzero.checkpoint.v1`. Chỉ có một cuộc đời đang chơi, Hall of Fame lưu trong save. Autosave khoảng 12 giây, sau hoạt động và khi rời trang; **Cài đặt → Xuất bản lưu JSON** trước cập nhật/đổi thiết bị. Chỉ chơi một tab. Khi có bản cập nhật PWA, xác nhận lưu và cập nhật. Đừng xóa dữ liệu trình duyệt để ép update; nếu cần, đóng hết tab rồi mở lại. Bản lưu là dữ liệu cục bộ, không phải cloud. Quota, xóa dữ liệu hoặc đổi origin có thể ảnh hưởng truy cập save. Cài đặt có nhập JSON, xuất/khôi phục backup và checkpoint.

## PWA và giới hạn
HTTPS hoặc localhost, mở online lần đầu và chờ cache được chuẩn bị. Chrome/Edge có thể có nút cài đặt; iOS Safari → Chia sẻ → Thêm vào màn hình chính. Low giới hạn 30 FPS; Medium/High/Ultra giới hạn 60 FPS với WebGL 2, thích ứng độ phân giải khi bật. Fallback WebGL 1 áp dụng chất lượng cơ bản. Không đảm bảo FPS trên mọi thiết bị. Canvas fallback luôn tối đa 30 FPS. Các chỉ số kinh tế, sức khỏe, pháp luật, lương hưu đều là mô phỏng hư cấu, không phải tư vấn ngoài đời.

Đã hoàn thành roadmap nền tảng V1.0.0, còn giới hạn: AI NPC/nhân viên cơ bản, nhà tù là giao diện quản lý riêng, thừa kế quy đổi tiền và timeline mới, 1 kết cục chưa có nghề tương ứng, chưa thử tất cả hành trình. Cần kiểm thử PWA thật, Safari/Edge, WebGL GPU và hiệu năng thiết bị thật trước khi phát hành rộng rãi. Xem [checklist nghiệm thu](docs/OFFICIAL-RELEASE.md).

## Kỹ thuật và tài liệu
JavaScript ES Modules, Three.js 0.180.0 / WebGL 2 native / WebGL 1 / Canvas 2D, build Node.js với npm dependency được ghim. Master Data V2.9.0 (60 danh mục, 693 bản ghi), validate và compile từ `master-data/`; `src/` là simulation và UI; `public/` là manifest, icon, worker; `scripts/` là công cụ build/test; `tests/` là regression. Giữ nguyên các module nghiệp vụ V1.0.0. `docs/` và [CHANGELOG](CHANGELOG.md) chứa tài liệu theo từng phiên bản; các mục "chưa triển khai" ở tài liệu lịch sử mô tả thời điểm phát hành phiên bản tương ứng, không phải trạng thái hiện tại.
