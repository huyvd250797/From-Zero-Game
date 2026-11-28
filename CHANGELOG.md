# V3.18.2 — Realistic 3D Vehicle Assets

- Actual local GLB pipeline: 27 original interim body assets, indexed geometry, smooth normals, UVs, PBR material roles and clearcoat. Curved near-LOD body/roof and revised fascia details. Not OEM CAD or photoreal models.
- GLTFLoader, bounded reusable slots, dynamic wheels and lighting, fallback for damaged or unavailable assets. Mobile active GLB body cap 1 (0 under pressure); PC 1–4. Shared tiny metallic paint surface maps on high-quality desktop.
- Software depth-buffer showroom, GLB diagnostics and repeatable asset inventory. No save/master-data or physics changes. Licensed high-fidelity assets and production/device acceptance remain pending. See docs/REALISTIC-3D-VEHICLE-ASSETS.md.

# V3.18.1 — Signature Vehicle Models

- Nine independent pre-baked vehicle body meshes per three LODs; individual front, rear, side and roof styling, wheel arches, wraps and model-specific lamps.
- Shared city/showroom geometry. Existing vehicle physics and save schema unchanged.
- Focused regression 39/39; native preview 150 asset integrity PASS; production build blocked by missing Three.js.

# V3.18.0 — Vietnamese Vehicle Collection

Nine original procedural vehicle interpretations: Honda City, Civic, Kia K3, K5, Toyota Vios, Fortuner, VinFast VF 6/7/8. Adds canonical catalog rows, distinct profiles, vehicle physics, safe parking, shared PBR, NPC traffic and lightweight 360° preview. All specifications and prices are fictional gameplay balance values. Previous save IDs remain valid. See docs/VIETNAMESE-VEHICLE-COLLECTION.md.

## V3.17.0 — Next-Gen Vehicle Graphics (28/11/2026)

- Separate vehicle triangle stream into shared semantic PBR material groups; one reusable dynamic GPU buffer.
- Sculpt sedan, EV, luxury and taxi silhouettes within existing dimensions; improve wheel/rim, windows, mirrors, grille, lighting and plate detail. Add near-detail trim to bus, truck and motorbike.
- Four paint finishes, optional saved cosmetic settings per owned motor vehicle, and garage paint controls; no changes to economy or physics.
- Three detail tiers, mobile clamps, one generated environment map, material reuse and cleanup; no realtime city reflection or ray tracing.
- Keep V3.16.0 audio systems, master data, schema 1 and Three.js r180. Production rendering and iPhone acceptance remain pending.

## V3.16.0 — Audio Engine Recovery (28/11/2026)

- Protect playback tests from silent modal scene ticks and improve optional stereo panner compatibility.
- Add independent single-element HTML Audio fallback, eight synthesized PCM WAV files, and individual sample tests in audio settings.
- Persist selected backend and separate horn and NPC conversation volume; preserve legacy audio preferences and save schema.
- Request playback audio session on supported browsers from trusted gestures; improve nearby engine harmonics and idle sound.
- Serve cached WAV byte ranges for iOS PWA playback; keep asset integrity checks and production build gates.
- Actual iPhone audio acceptance and Three.js production build remain pending.

## V3.15.1 — Navigation, Immersion & Mobile UX Refinement (27/11/2026)

- Bounded lane miters, local hook removal, rounded validated turns, turn speed lookahead and cumulative GPS turn detection. Direct legal routes to nearby building doors within eight world units.
- Map pinch/pan with a world-space anchor, selected pin and immediate destination action beside the map; compact GPS and icon vehicle controls.
- Add 12 ready-to-use foods and drinks, seven recipes and nine ingredients; integrate shopping, food storage, health and eating/drinking interaction.
- Isolate audio input from scheduled bus lookup; sanitize non-finite spatial data, recover suspended context, add two continuous spatial engine slots, throttled horn and synthesized NPC chatter; honor existing volume/mute settings.
- One-handed NPC umbrella grip on procedural and Three.js avatar paths, with umbrella handle placed near the right hand. Mobile rendering budgets retained.
- Save schema 1, urban layout 9, Three.js r180 unchanged. Device and Three.js production acceptance remain pending.

## V3.15.0 — Realistic Life Balance & Optimization (27/11/2026)

- 30-day rental cycles; monthly base rent is ten times the old daily tariff. Preserve existing paid rental expiry on load.
- 90-day maintenance cycles; preserve existing next-due dates and fee amounts.
- Shared chassis footprint clearance and continuous relative sweeps, AI reservation checks, and delayed bus and taxi motion; retain manual collision damage.
- Preserve mobile rendering budgets, save schema 1, urban layout 9 and Three.js r180.
- Update canonical data, housing and finance UI, balance simulation and regression coverage. Production/browser/device acceptance pending.

## V3.14.0 — Living Buildings & Household (27/11/2026)

- Per-property food storage, spoilage, refrigerator capacity, cleaning and laundry, time-based household activities.
- Demand-based buses with named resident bookings and player ticket reservations; 60-minute departure slots, 06:00–20:00 planned operating window, staggered routes and platform spacing checks.
- Swept player protection for bus movement and visible road actors; player pedestrian blocking, compact GPS and guarded red-light override.
- Interactive map zoom/pan, precise place selection and place-type filters; nearby-only world building labels.
- Remove automated fine cameras; patrol-based driving enforcement remains. Breakdown only below 10% aggregate condition.
- Retain V3.13 mobile governor, save schema 1 and Three.js r180. Full unit regression 848/848 PASS; native preview 134 assets PASS. Production and device acceptance pending. See QA notes for verified scope and limitations.

## V3.13.0 — Dynamic Weather & NPC Behavior (27/11/2026)

- Deterministic temperature, humidity, wind, visibility and six-hour in-game forecast; smartphone app and HUD integration.
- Weather-aware leisure schedules, lightweight umbrella geometry for pedestrians, outdoor needs and AI/automatic driving speed adjustment.
- Storm-day bus timetable with 0.75 speed factor and shared offsets, preserving V3.12.0 controlled bus motion.
- Mobile cool/balanced/smooth modes, pressure governor, DPR/pixel caps, lower weather/actor/lighting budget, reduced HUD refresh and stationary title camera; fixed-step gameplay preserved.
- Save schema 1, layout 9, Three.js r180 retained. Full unit regression 841/841 PASS; native preview 132 SHA-256/HTTP resources PASS; production/physical phone thermal acceptance pending. See docs/DYNAMIC-WEATHER-MOBILE.md and QA report.

## V3.12.0 — Traffic Law & City Services (27/11/2026)

- Add schema-compatible traffic records, fictional fines, license quiz and points, camera/patrol attribution, accident reports, insurance and claims.
- Add city-service menu and phone shortcuts, route-based emergency dispatch actors, reception, existing tow transfer, and hospital treatment. AI reacts to priority vehicles using bounded yielding heuristics.
- Replace bus route calculation with direction-aware directed-edge search, safe hook removal and rounded transitions. All 30 legs share a kinematic timetable for NPC buses and riders; max 30 km/h, acceleration 1.35 m/s², braking 1.8 m/s², yaw rate 1 rad/s, controlled stops.
- Save schema 1, layout 9, Three.js r180 and all three public bus lines retained. No new backend dependency.
- Final focused tests 72/72 across four disjoint runs; native preview 130 SHA-256/HTTP resources. Mixed-version full regression stopped at 461 successful tests; final full regression not certified. Production dependency not installed in this environment (ENOTCACHED); no production/browser acceptance.

## V3.11.1 — Deployment & Regression Fix

- Synchronize the Three.js night-light integration fixture with the renderer vehicle-lamp contract, including the active light count, independent weather toggle and cleanup.
- Report failing build stage explicitly and retain all production test gates.
- No save schema, master data or gameplay migration.

## V3.11.0 — Intelligent Traffic AI (27/11/2026)
- Add session-persistent ambient traffic, spatially indexed following, lane-change and yield heuristics, contact stops, congestion-aware local ETA and render interpolation.
- Preserve straight lane alignment at intersections, remove redundant centerline hooks, smooth validated motorway transitions and guard motorway access.
- Separate overlapping ramp and ring road geometry to reduce depth fighting.
- Replace player labels with directional chevron and geometry-derived dashed occlusion silhouette.
- Preserve save schema 1, layout 9, Three.js r180. Focused tests 49/49; native preview 127 assets verified. Full regression on final source and production/browser acceptance remain pending.

## V3.10.0 — Collision & Vehicle Damage (27/11/2026)
- Add player vehicle swept collision checks, impact energy, five-part damage condition, breakdown and saved accident history.
- Add paid garage repair, towing service and maintenance effects. Preserve layout 9 and schema 1.
- Add condition-aware night headlights, rear/brake and reverse lights, Three.js spotlights, additive light footprints and native preview approximation.
- Add focused damage, collision, transaction and geometry tests. Three.js production and full browser rendering remain pending where dependencies are unavailable.

## V3.9.0 — Advanced Vehicle Dynamics (27/11/2026)
- Add eight kinematic vehicle profiles, power/weight and grip based driving, braking, reverse, roll, wheel phase, EV regeneration and load-sensitive sound.
- Replace decorative highway with a connected four-lane perimeter ring, eight entry/exit points, two extra river bridges and persistent background trips.
- Prefer right-hand lanes and sidewalks for automatic routing; keep manual steering free. Retain bus lines and schedule model.
- Layout 9 migration; preserve schema 1 and all canonical destination IDs. Add eight focused tests and adapt historical geometry assertions to the new layout.
- Native preview and targeted QA pass; full final regression and Three.js production acceptance pending. See docs/ADVANCED-VEHICLE-DYNAMICS.md.

## V3.8.0 — Smart Navigation & Camera (27/11/2026)
- Add navigation snapshot, maneuvers, route estimates and independent HUD with full-journey ETA, bus phases and cancellation.
- Preserve destination during manual steering and braking; recalculate after release; clone cached sidewalk paths to prevent route consumption corrupting future lookups.
- Prefer validated marked pedestrian crossings with bounded detours; enhance route geometry and persistent final destination marker. Extend map to remaining transit itinerary.
- Adaptive orthographic vehicle camera, manual heading override, device-local preferences and per-session destination history.
- Add 12 targeted regression tests, keep existing source QA and production Three.js gate. No save migration or master-data changes.

## V3.7.0 — Public Transport 4.0 (27/11/2026)
- Add 14 physical curbside stations with 28 directional shelters, number signs, benches, boarding-side vehicle positions and route-specific vehicle signs.
- Reuse the three canonical fixed bus lines; integrate scheduled walking, queueing, board/alight legs, up to three boardings, trip manifests, capacity-aware departures and per-boarding fares.
- Add route map overlay, capacity/ETA details and boarding/alighting HUD. Keep taxi and personal transport behavior.
- Unify zebra placement with actual at-grade junctions and roundabout approaches; remove legacy overlapping paint, interrupt lane marks and curbs at crossings, align automatic signal stop targets.
- Add nine focused tests, update outdated geometry and branding assertions; preserve layout 8 and schema 1, Three.js r180 production build gate and Vercel configuration.

## V3.6.0 — Advanced Road Network (27/11/2026)
- Road hierarchy, directed routing, lane geometry, speed limits, east expressway and two ramp connections, motorway restrictions, road signs and crossing paint.
- Preserve river and all canonical IDs; layout 8 safely migrates valid layout 7 saves.
- Add ten focused road network tests and retain production QA gate.

## V3.5.3 — Natural Urban Masterplan & Realistic Water (27/11/2026)
- Replan city with strong meanders, two continuous bank roads, straight axes, five diagonals, two long arcs, five roundabouts and four bridges. Remove redundant and flooded road sections; all crossings form graph junctions.
- Relocate existing parcels and 28 whole terraces; preserve IDs, interaction districts, assets and schema 1. Layout 7 migration handles layout 6 and older saves.
- Arc-length flow, animated foam and rain effects, colored shore strips, subdued map styling. Six new unit tests; keep pinned Three.js production QA gate.

## V3.5.2 — Organic City & Living River (27/11/2026)
- Replace straight river with shared meandering channel, exact water collision and animated water surface.
- Add ten real diagonal road links, remove seven redundant local segments; retain formal city zones and replot waterfront parcels.
- Preserve all canonical IDs, interaction doors and save data; migrate layout 5 → 6.
- Add ten unit tests and a real Three.js integration test. Production build remains gated on pinned Three.js.

## V3.5.1 — Organic Neighborhoods & Street Layout (27/11/2026)
- Replace local grid stretches in five neighborhoods with merged blocks, long bends and S curve; replat non-interactive lots as contiguous 3/4/6/8-home clusters and right-angle shared alleys.
- Shared road cuts for meshes, map, route graph, traffic and light placement; preserve interactive properties, all canonical IDs, bridge and roundabout network. Extend static chunk culling for long bends.
- Save layout 5 migration, seven new regression tests; retain production Three.js checks.

## V3.5.0 — Urban Planning 4.0 (27/11/2026)
- 100 collision-checked curved sections, seven one-way roundabout rings with solid islands, 72 pedestrian alleys, 90 green setbacks and three derived annex buildings. All canonical records and doors retained.
- Route graph with 3,705 nodes and 3,832 edges; shared map and chunk geometry, arc-length traffic movement, curved sidewalk candidates, road-aligned lighting and audio distances.
- Legacy position migration only when a newly added solid obstructs an originally valid location; preserve cash, property and vehicle data. 13 new tests and updated legacy geometry expectations.

## V3.4.0 — Realistic Shopping & Inventory (27/11/2026)
- Retail cart with quantity control, search/filter, per-store daily stock, price confirmation and 60 receipts. One five-minute atomic checkout with accurate ledger categories; stale quotes rejected.
- Existing single-item and automated shopping share stock and checkout. Save schema 1 migration preserves prior assets.

## V3.3.0 — Smartphone & Device Ownership (27/11/2026)
- Device purchases, used devices, resale, battery, prepaid plan and capability gates. Platform-specific icons and shells; legacy phones migrate to basic devices.

## V3.2.0 — Immersive Audio Engine (27/11/2026)
- Recover interrupted Web Audio and bound pending resume; add retry, diagnostics and tone preview.
- Distinct vehicle profiles, spatial traffic cues, wet footsteps, indoor detail and weather. Preserve mobile HUD, saves, master data and production build gate.

## V3.1.1 — Mobile HUD Refinement (27/11/2026)
- Align mobile camera, vehicle and recenter controls; reserve independent bottom corners and compact taskbar.
- Icon-only interaction/run; accessible labels; vehicle gray/green state and short mount/dismount feedback. No gameplay or data migration.

## V3.1.0 — Premium Identity & UX (27/11/2026)
- Exact approved image logo, updated app/PWA/favicons, splash and real initialization stages with retry. Premium Emerald Glass palette and compact icon system.
- Actual renderer title preview with visual-only time, static low/eco/fallback/reduced-motion mode; dedicated save management using existing guarded operations.
- Eight original camera controls in one row, independent HUD focus and interior focus, sticky management headers/footers and responsive refinements.
- No gameplay/Master Data/schema/dependency changes. Ten new UI-specific regression tests; production Three.js gate preserved.

## V3.0.0 — Advanced Life Simulation (27/11/2026)
- Continuous inheritance: preserve world date, economy, NPC population and heir age; retain independent and legacy restart. Validate birth-year anchor against archived heir, enforce timeline capacity and keep retirement/story/calendar consistent.
- Retain all prior save schema and asset IDs; no new dependency. Add generation roundtrip and financial regression tests, five-year simulation gate, GitHub Actions production QA and release acceptance documentation.
- Update app, package, manifest and build branding to V3.0.0; keep native preview explicitly non-production. Production acceptance requires real Three.js installation and device testing.

## V2.14.0 — Digital Life, Performance & Polish (27/11/2026)
- Local in-game smartphone with 15 entries, read-only dashboard, confirmed canonical wallet transfers, scripted NPC conversations and persistent categorized notifications.
- Explicit current-state checkpoint, storage readback and additional stale-token check, slot diagnostics and opt-in browser persistence request. Preserve schema 1 and existing PWA integrity/update gates.
- Cache static culling corners, camera projection basis and annual ambient cohorts; stop city rendering while the phone is open and throttle management-modal HUD updates. CPU benchmark and exact culling regression coverage.
- 12 new unit tests, 674 total; Native QA 99 assets. No new dependency, Master Data or SQL. Production GPU verification pending.

## V2.13.0 — Evolving City & Economy (26/11/2026)
- Deterministic annual district evolution, dynamic ambient population, synthetic establishment openings/closures and employer hiring status.
- Four periodic economic shocks; sector stock effects, local property and branch-weighted demand, indexed resident daily finances, 12-year city history and 12-period inflation.
- Preserve historic collateral validation, canonical data, existing salary/rate contracts, save schema and production build gate.

## V2.12.0 — Living Families & Generations (26/11/2026)
- Independent spouse career, retirement, contribution and optional childcare.
- Family spending ledger, budget target, child education and adult finances, family tree.
- Split estate across eligible adult children; selected heir receives own share plus private savings.
- Preserve schema 1, canonical Master Data, and production build gates.

## V2.11.0 — Business & Wealth Simulation (26/11/2026)
- Lease up to two branches at existing venues, with aggregate staffing and centralized cash/stock. Add supplier tiers, configurable restock and opt-in staffed operation with daily deduplication and reserve/debt guards.
- Add HR, supplier, branches, 7/30/90-day P&L and cash-flow reporting, and unified wealth allocation. Activate canonical land asset with simulated periodic rent, existing liquidation and inheritance treatment.
- Keep previous Master Data and saves, no SQL, no Three.js dependency change. 13 new unit tests; 634 total. Native QA 96 assets; production gate preserved.

## V2.10.0 — Advanced Careers & Education (26/11/2026)
- Labor market: daily deterministic simulated applicants, competitive interview thresholds and offer salary snapshots; existing contracts remain fixed.
- Career goal planner, qualification/XP/experience gaps, training suggestions and goal vacancy filter; salary premium up to 30%; job satisfaction, specialization labels and credential counts.
- Automation supports explicit or goal-directed study skill selection, stops studying automatically when all minimum skills are met; preserves legacy default.
- 621/621 unit tests; Native QA 94 assets, desktop/mobile UI flow verified in Chromium Canvas fallback. Three.js production unavailable in current environment.

## V2.9.0 — Life Planning & Automation (26/11/2026)
- Add recurrence-aware task editor, day/week/30-day plan views, conditional rules, three templates and separate occurrence history.
- Opt-in automation using real movement and existing actions; estimated fastest eligible route, direct expense budget and cash reserve, canonical action preflight and interruption handling.
- Optional planner save state, bounded history, manual override and safe reload; 14 new unit tests. Retain Three.js integration gate and V2.7.1 cache fix.

## V2.8.0 — Interactive Buildings & Housing (26/11/2026)
- Full-screen 3D interior with camera-relative continuous keyboard/joystick movement, click-to-route, low cutaway walls, multiple connected rooms, zoom/orbit/overview, route line and actor ring.
- 41 public interior templates and 11 property layouts; canonical actions and access checks retained, central mall accepts existing furniture purchases.
- Per-property decoration: move and rotate furniture, change floors/walls, validate overlap/entry/reachability, save/cancel/reset. Added built-in TV, wardrobe, dining table, washer, plant geometry for larger homes. No new Master Data or economy changes.
- Existing Three.js rig-cache hotfix and production build gate retained; add expanded apartment Three projection test. Native preview and browser Canvas QA; production verification still required.

## V2.7.1 — Smart Mobility & Rig Cache Stability Fix (26/11/2026)
- Correct real Three integration test fixture and expectations for the 65-NPC population and 16-hidden-rig retention budget. Add crowded-cache and rider visibility regression coverage; retain all production checks. No gameplay or save changes.

## V2.7.0 — Smart Mobility & Transportation (26/11/2026)
- Scheduled bus network AL01–AL03, 14 stops, bidirectional service and transfer-aware journeys; street taxi pickup, fare and wait estimates. Destination chooser and timetable/parking screens.
- NPC deterministic vehicle ownership, daily mode decisions and transport expense; viewport-capped moving/parked resident vehicles; occupied parking bay filtering and arrival recheck.
- Prefer validated sidewalk links; peak-hour slowdown and red/amber stop lines for automatic player driving. Preserve orthographic camera, schema 1, Master Data 3.1.0 and 65 NPC identities.
- 582 unit tests, Native QA build and HTTP verification 88 resources; production Three.js not certified locally.

## V2.6.0 — Autonomous NPC & Population (26/11/2026)
- 40 new named residents; 65 total; 90 background pedestrians distributed across 18 districts. Preserve 25 original identities.
- Persistent independent daily needs, cash, income/expense, plans and neighbor relations; midnight settlement and utility decisions feed daily movement routes. Residential assignment for new residents, work/study in all 18 districts.
- Population explorer, district filter, resident needs/financial profile and social links. Viewport-limited presentation, ambient low LOD and configurable preset budgets. No ordinary NPC event notifications.
- Master Data 3.1.0, save schema 1 with optional population extension; 571 tests, 85 native assets. Three.js production not certified locally.

## V2.5.0 — Greater An Lac City (26/11/2026)
- Expanded canonical city 192×192 → 384×384; 18 districts, 229 plots, 206 solid buildings, 60 destinations; An Bình river and 12 bridge corridors. Preserve legacy records and spawn.
- Add 32 local actions, 19 employers, six properties, two courses and eight bus stops, reuse existing simulation and financial rules.
- Collision-aware river crossings, spatial obstacle index, reusable A* arrays and 128-entry cache; adaptive overview and searchable district map. Retain chunk/LOD/lighting policies.
- 561 unit tests, native preview and HTTP integrity; Master Data 3.0.0, schema 1 save compatibility. Production Three.js still requires npm dependency access.

## V2.4.0 — Advanced Lighting & Atmosphere (26/11/2026)
- Day/night sky gradient, color/exposure grading, hemisphere ground fill, cloud-dependent directional soft shadows, zoom-aware fog.
- Separate facade-window emission group, 82 preserved lamps with all-viewport base glow, road-aligned wet highlights, bounded clouds and puddle ripples.
- Manual weather interpolation, accessible soft lightning toggle, delayed procedural thunder and quality-aware weather budgets. No game simulation or Master Data changes.
- 551 independent tests; 84 native-preview resources verified. Production Three.js gate remains required.

## V2.3.0 — City Graphics 3.0 (26/11/2026)
- Stable visual profile registry for all canonical plots; refined Vietnamese housing, commercial, office, institutional and industrial geometry, selected Vietnamese rooftop signs.
- Optimized road paint and pavement geometry, continuous crosswalks, separated intersection surfaces, drainage details, signs, landscaping and stable tree placements across LOD.
- Refined procedural surface maps; keep shared materials, instancing and viewport lamps. Static High LOD triangle total reduced; Low LOD increased modestly with denser consistent tree placement.
- 540 unit tests, native QA and asset integrity pass; real Three.js production and physical GPU validation pending. Master Data and save schema unchanged.

## V2.2.0 — Advanced Character Models (26/11/2026)
- Original four GLB templates; improved body/face/hair, age shading, context wardrobe and LOD hysteresis. Shared 13-joint skeleton and 19 clips; diagnostics report actual loaded GLB templates/actors.
- Distance-based NPC commute durations and walking cadence; 25 residents, Vietnamese full names, NPC_SAO one year younger than the player. Existing IDs retained.
- NPC portrait and rounded schedule display; save schema 1 unchanged, only NPC catalog and minimum age validation changed. 531 unit tests; native QA, production Three.js pending.

## V2.1.0 — Visual Fidelity & Smooth Experience (26/11/2026)
- Orthographic spring camera; interpolated movement phase, heading and vehicle state; reset clocks after visibility changes.
- Predictive chunk preparation with low LOD fallback, bounded queue work, zoom hysteresis and distance LOD; 128px procedural textures and preset anisotropy, refined contact shading, quantized shadow extent, smaller adaptive resolution steps.
- Important-only notification center and visible journal; separate bounded event history, legacy filtering, warning transitions and transient action error feedback.
- Graphics diagnostics (1% low, long frames, CPU preparation) and JSON export. No change to canonical Master Data or simulation balance. 523 unit tests; native QA build verified; Three.js production blocked by missing dependency.

## V2.0.1 — Gameplay Experience & Stability (26/11/2026)
- Preserve final destination through vehicle pickup, automatic boarding, vehicle routing and arrival.
- Viewport-aware instanced street-lamp glow + bulbs, stable LOD placement, fading local PointLight handoff; approximate fallback lighting.
- Nearby NPC name hysteresis, max three, line-of-sight; default hidden minimap with suspended drawing, compact four-button quick bar, context controls and floating joystick.
- 19 individual item SVGs. Fixed movement timestep and interpolated presentation, phase-preserving FPS limiter, close-camera pitch hold, texel-snapped shadow center.
- Keep Master Data V2.9.0 and save schema 1. 511 independent tests; native QA only. Production Three.js dependency not cached locally.

## V1.12.0 — Visual Performance & Polish

## V2.0.0 — Immersive Life Simulation (26/11/2026)
- Official second-generation branding, final integration and release verification gate.
- Refresh cached shadows on camera yaw/pitch changes; pause/resume Three.js actor animation without catch-up; p95 completed-frame intervals.
- Recheck current save token for storage events to avoid stale-event false conflicts. Preserve save schema and canonical data.
- Production dependency and physical-device acceptance remain separate gates. See release documentation.
- Direct typed-array geometry conversion, macro batching at overview, bounded cache, internal pixel budgets and optional battery mode.
- Throttled shadow pass, invisible daytime lights, NPC rig reuse and shared clips, completed crossfade cleanup; precomputed traffic lane metadata and offscreen geometry filtering.
- Preserve one prior fingerprinted cache during version transition; failed installs clean incomplete cache, update failures surfaced. No save schema or master data changes.
- Native QA and benchmark results in `docs/VISUAL-PERFORMANCE-POLISH.md`; Three.js production requires real dependency and device acceptance.

## V1.11.0 — Game UI & HUD 2.0
- Game-first HUD, seven compact need meters, six quick actions, grouped module menu, mobile collapsible camera, visible minimap and dynamic layout offsets.
- Calendar weekday and today/tomorrow contractual shift preview; inventory grid with real item filters, character profile, dialogue bubble and context-specific interaction label, bounded notification history, pause menu.
- Prevent browser document zoom while retaining camera pointer pinch and modal single-touch scrolling. Form inputs use 16px to reduce automatic iOS input focus zoom. No save migration or new dependency.
- 483 independent unit tests. Native QA build; physical iOS PWA and production Three.js need acceptance.

## V1.10.0 — Audio & Soundscape
- Web Audio mixer: master + six channels, bounded voices, offline original procedural loops/tones, compressor, scene-aware ambience, distance/stereo cues, speed-linked engine and distance-linked footsteps. Original day/night music, activity and UI cues.
- Persist audio preferences separately, support explicit gesture-based playback unlock, mute, preview, reset, page visibility and pause. Audio failures do not alter simulation.
- 10 new independent tests, 475 total; native QA 72 assets; actual Chromium signal and zero signal after mute measured. Production Three.js dependency unavailable locally; no new npm dependencies or save migration.

## V1.9.0 — Immersive Activities
- ActivityRun presentation controller, exact-once completion, cancellation, progress and selectable ×1/×2/×4 preview rates. Existing action functions remain authoritative.
- Eight additional skeletal clips and shared bone-attached props; sleeping and seated furniture anchors, close-up camera with full-room toggle. Connect station actions, item use, shop, cooking, work, study and NPC social interactions. Outdoor activities use a local visual scene.
- No Master Data, dependency, gameplay formula or save schema change. Production Three.js remains gated by actual install and runtime tests.

## V1.8.0 — Weather & Atmosphere
- Deterministic visual climate with five states, wet/dry seasons, smooth cloud/rain/fog/wind transitions and road drying; fractional game time used for lighting.
- Batched animated rain, fog, puddle geometry, wet road roughness/darkening, golden-hour and cloud shading. Screen-space particles pause, respect reduced motion and never intercept input.
- Three.js local light pools for nearby existing lamps and player vehicle headlights, fog, wet PBR and small instanced street-tree sway. Legacy fallback retains rain, haze, puddles, basic lighting without Three.js local lamps.
- Weather status in HUD, automatic/preview settings and visual effects toggle. No changes to gameplay/save/Master Data. 11 new unit tests (452 total); one gated Three.js integration test added; 70 native-preview assets verified. Production Three.js unavailable locally due to missing dependency.

## V1.7.0 — Advanced Transportation
- Shared vehicle geometry: 6 owned types plus bus/taxi, circular rolling wheels, steering, distinct bodywork, brake lights and indicators; motorcycle rider and player marker.
- Acceleration, coasting, brake control, bounded yaw and braking near route endpoints. Existing movement sweep and distance-based consumption preserved; no save or Master Data change.
- Lane-based deterministic traffic, 36 intersections with phase-driven signals, red/amber stops and off-map reentry; traffic is visual only.
- Speed HUD, brake (G / touch toggle), vehicle-follow camera, nearest free marked parking bay with auto route and park. Restores heading from saved vehicle on continue.
- 13 new independent tests; 441 total. Native QA SHA-256/HTTP 67 assets. Three.js production integration test added but dependency unavailable locally.

## V1.6.0 — Living NPC World
- Frame-level fractional time sampling for NPC route motion; smoothed yaw, distance-based gait rate, shared geometry/label snapshot and pause/time-skip handling.
- Five additional NPC skeletal gestures, paired leisure conversations, short obstacle-checked local strolls, companion markers, bounded smoothed personal-space offsets.
- Scheduled public interior residents (up to three) near furniture, independent rigs or Canvas poses, non-interactive labels with activity roster, disposal on exit.
- Preserve 24 canonical schedules, 693 Master Data records and save schema. 11 additional unit tests, one additional gated Three.js integration test. Native preview QA passes; production blocked by Registry DNS.

## V1.5.0 — Interactive Interiors
- Thêm scene nội thất 3D mở mái cho nhà đang sử dụng và 14 địa điểm công cộng, geometry đồ đạc dùng chung Three.js/Canvas.
- Di chuyển theo BFS nội bộ, nội suy vị trí, chạm sàn và nhãn đồ vật, WASD/mũi tên; chỉ mở thao tác ở đúng trạm.
- Giữ nghiệp vụ và save cũ, kiểm tra cửa, giờ mở cửa, quyền sử dụng nhà; không thay đổi world position hoặc thời gian khi đi bộ nội thất.
- Giải phóng tài nguyên khi đóng modal, dự phòng Canvas nếu renderer nội thất gặp lỗi; tạm ngừng render thành phố khi room scene hoạt động.
- Thêm 11 unit test và 1 integration test Three.js (cần dependency thật).

## V1.4.0 — Camera & Player Control
- Four orthographic camera modes; smoothed pan, yaw, elevation, zoom and tracking. Close mode automatic building sightline elevation; explicit occluded marker when pitch cap prevents clearance.
- Shared projection/picking across renderers; tap uses last rendered projection. Multi-pointer gesture state, drag threshold, lost capture cleanup; no ghost taps after pinch.
- Focus HUD toggle, nearby interaction outline, keyboard shortcuts and compact mobile toolbar. Preserve gameplay, save and Master Data; no new dependency. 13 camera unit tests, one additional gated real Three integration test.

## V1.3.0 — Character & Animation
- Nhân vật procedural dáng nam/nữ, khuôn mặt, tóc, màu da, trang phục và phụ kiện. Character Creator và chỉnh ngoại hình trong game với preview xoay, sáu động tác và footer xác nhận.
- 13 khớp; Three.js SkinnedMesh, Skeleton, sáu AnimationClip, crossfade; kết nối Idle/Walk/Run/Ride, preview Sit/Wave. Ngoại hình NPC xác định theo ID, tóc bạc và dáng theo tuổi, hai LOD.
- Renderer dự phòng dùng cùng hình học và pose CPU; tách actor khỏi mesh động Three.js, giải phóng skeleton/geometry/material khi đổi hoặc rời vùng nhìn. Save schema 1 thêm appearance mặc định cho save cũ; không đổi Master Data.
- 393 unit tests PASS (383 + 10); native preview 59 tài nguyên, UI Chromium Canvas desktop/mobile. npm Registry EAI_AGAIN: 7 integration tests cần Three.js thật chưa chạy, production build chưa xác nhận. Xem docs/CHARACTER-ANIMATION.md.

## V1.2.0 — Immersive City

## V1.2.1 — Three.js Engine Migration
- Pin Three.js 0.180.0; ưu tiên renderer Three.js, fallback native WebGL 2 → WebGL 1 → Canvas. Giữ preset, save schema và Master Data.
- BufferGeometry, MeshStandardMaterial, procedural texture, directional/hemisphere lighting, shadow, bloom/FXAA, camera bridge và adaptive resolution; instancing cây ven đường. GLTFLoader, SkeletonUtils, AnimationMixer foundation.
- Vendor module graph + LICENSE trong fingerprint/precache, production gate dùng 5 test runtime Three.js. Build native QA riêng, không dùng làm output deploy.
- 383 test độc lập dependency PASS (374 + 9); native QA 56 tài nguyên SHA-256/HTTP, fallback desktop/mobile PASS. npm Registry bị chặn, production build chưa xác nhận, 5 test runtime chưa chạy, GPU/browser Three.js chưa nghiệm thu. Không thay thế Three.js bằng renderer giả.

- Kit hình học procedural 12 phong cách cho toàn bộ 79 lô (62 công trình, 17 cảnh quan), 10 palette phân khu; mặt tiền theo hướng cửa; mái ngói, ban công, cửa kính, biển chữ Việt, mái nhà xưởng, chi tiết hành chính và y tế.
- Cải thiện đường/vỉa hè, lối tiếp cận, cây, cột đèn, bồn hoa, đài nước, luống cây, sân thể thao, bãi xe, vật dụng đường phố. Vật trang trí không thay đổi collision; đèn chưa có ánh sáng cục bộ.
- Hai LOD dùng chung renderer; tối giản cửa sổ, biển, bó vỉa và cây ở LOD thấp. Canvas Low/Medium ưu tiên LOD thấp. Nhận diện vật liệu kính cao trên shader.
- Giữ nguyên Master Data V2.9.0, gameplay, schema save 1 và hệ thống PWA. 11 test mới, tổng 374.
- Hạn chế: kiến trúc procedural cách điệu; chưa có GLB riêng từng công trình, nội thất 3D hoặc giao thông/thời tiết nâng cao. Chưa xác minh WebGL 2 trên trình duyệt thật.

## V1.1.0 — Next-Gen Graphics Engine

- Native WebGL 2 renderer, material shaders, depth shadows, lighting, procedural surfaces, basic bloom/AA, adaptive resolution.
- Four graphics presets, fallback renderer selection, static GLB sample and cache.
- Preserve simulation, world coordinates, save schema and Master Data.
- Three.js unavailable in build environment; use dependency-free renderer. See `docs/GRAPHICS-ENGINE.md` for scope and acceptance gaps.

# Changelog

## V1.0.0 — Official Release (2026-11-26)
- Chuẩn hóa version package, lockfile, giao diện, build/cache. Giữ toàn bộ Master Data V2.9.0 và save schema 1.
- Hướng dẫn người chơi mới tự mở sau khi tạo nhân vật, tra cứu lại từ menu/Cài đặt; 5 mục tiêu dựa trên trạng thái thật, báo giá động, dẫn đường đến địa điểm, không cấp tiền/XP.
- Đọc trạng thái save và token so sánh trong cùng snapshot; xác nhận tạo mới/nhập/khôi phục kiểm tra bản chính chưa thay đổi; bỏ qua kết quả đọc file khi hộp thoại đã đóng hoặc thay thế. Không thông báo phục hồi thành công khi ghi thất bại.
- Hỗ trợ phím Esc/Tab và trả focus sau khi đóng modal, giá xe trong mục tiêu theo thị trường, nhận diện cả xe cơ giới.
- 346 bài hồi quy + 7 bài mới; kiểm thử UI bằng Chromium Canvas/storage mô phỏng, kiểm tra HTTP/SHA-256. `npm run release:check` chạy các bước tự động. Thiết bị thật/WebGL/PWA offline/update thực tế vẫn cần nghiệm thu. Xem docs/OFFICIAL-RELEASE.md.

## V0.23.0 — Performance, PWA & Release Candidate (2026-11-26)
- Giới hạn nhịp dựng hình theo chất lượng và trạng thái UI, đo FPS, cache tuyến đường và tái sử dụng buffer WebGL; menu mobile thu gọn, cải thiện safe area và modal.
- Backup xoay vòng, checkpoint, phục hồi JSON, cảnh báo lỗi/quyền lưu trữ/xung đột tab, xử lý mất context không tự tải lại.
- Asset fingerprint, manifest PNG/maskable, precache SHA-256, update có xác nhận, kiểm tra HTTP và inventory build. Giữ schema 1 và Master Data V2.9.0.
- 332 ca hồi quy và 14 ca RC mới. Browser UI bằng Chromium Canvas và storage mô phỏng; truy cập localhost bị chặn nên chưa chứng nhận PWA offline thực tế.

## V0.22.0 — Content Expansion & Game Balance (2026-11-26)
- Kích hoạt ba độ khó, mở ba địa điểm, tám NPC, hai khóa học và bốn biến cố (tám lựa chọn).
- Dự toán sinh tồn, doanh thu/giá vốn/hòa vốn, yêu cầu nước uống cho ca thời vụ, đỗ phương tiện khi vào nhà, lưu độ khó trong báo cáo kết cục.
- 60 danh mục, 693 bản ghi, Master Data V2.9.0; schema save 1. Thêm mô phỏng sinh tồn và vòng đời có thể chạy lại.

## V0.21.0 — Aging, Legacy & Endings (2026-11-26)
- Lão hóa, nghỉ hưu tự nguyện, lương hưu, tổng kết tự động hoặc chủ động; 39 quy tắc kết cục trên 40 bản ghi canonical.
- Di sản ròng, kế thừa một người con trưởng thành qua timeline mới, thành tựu, báo cáo và Hall of Fame.
- Master Data V2.8.0, 660 bản ghi, schema save 1.

## V0.20.0 — Prison, Bankruptcy & Recovery (2026-11-26)
- Thi hành án tuần tự, giao diện cải tạo riêng, 9 hoạt động, thời gian và chi phí tiếp tục, ghi án đã chấp hành.
- Thanh lý tài sản có dự toán và xác nhận, ưu tiên nợ có bảo đảm, giữ nợ thiếu hụt, đóng cửa doanh nghiệp, hồ sơ lịch sử.
- Kích hoạt tái hòa nhập và chương Second Chance. Master Data V2.7.0, 659 bản ghi; save schema 1.

## V0.19.0 — Law, Crime & Justice (2026-11-26)
- Legal state, 6 vi phạm, 5 giai đoạn, phán quyết giả lập, hồ sơ kiểm tra không đủ căn cứ.
- Hợp tác, tư vấn, nghĩa vụ phạt/hoàn trả, thanh toán từng phần, tích hợp tài sản ròng, vay vốn, nghề nghiệp, doanh nghiệp và gia đình.
- 4 tab pháp luật, lưu án tích và án tù chờ V0.20.0. Master Data V2.6.0, 658 bản ghi; tương thích schema 1.

## V0.18.0 — Health, Habits & Addiction (2026-11-26)
- Wellness state: dinh dưỡng, thể lực, tinh thần, kỷ luật, nợ ngủ, nhật ký ngày. Kết nối ngủ, ăn, vận động, công việc và tiết kiệm.
- 3 tình trạng bệnh, 3 dịch vụ điều trị, 7 thói quen, 4 dạng lệ thuộc, 2 phương án hỗ trợ. Chi phí động và phục hồi theo thời gian.
- Tác động tới hiệu suất nghề, doanh nghiệp, hạnh phúc gia đình; 2 biến cố cốt truyện mới. 4 tab UI và cảnh báo HUD.
- Master Data 2.5.0 (651 records), 269/269 tests và production build. Tương thích schema 1, không hồi tố. Xem docs/HEALTH.md.

## V0.17.0 — Story & Consequence Engine (2026-11-25)
- Bộ máy 12 chương, 20 biến cố và 38 lựa chọn; kích hoạt theo hoàn cảnh, chu kỳ, tuổi và cơ hội cộng đồng xác định.
- Hậu quả tức thời và trì hoãn 14/30/365 ngày, đạo đức, hành vi sai trái, ghi sổ tài chính, ký ức giúp đỡ NPC; bảo toàn save, không cộng trùng.
- 4 tab, số biến cố trên HUD, nhật ký 120 mục, quyết định đã xử lý và hậu quả đang chờ được lưu riêng.
- Master Data V2.4.0 (60 danh mục, 641 bản ghi); 248/248 tests, production build và Chromium Canvas/storage mô phỏng.
- Pháp lý mới là ghi nhận rủi ro, chưa xét xử/án phạt; nghỉ hưu, di sản là sự kiện suy ngẫm, chưa có kết thúc.

## V0.16.0 — Dynamic City Economy (2026-11-25)
- 5 trạng thái kinh tế, giá, lương, nhu cầu, nguồn cung, cạnh tranh, lãi suất và định giá động theo tháng 30 ngày.
- Khóa lương/lãi suất hợp đồng, giá mua tài sản bảo đảm; bình quân giá vốn tồn kho; tương thích save schema 1.
- Dashboard 4 tab, báo giá hiện tại và biểu đồ 12 tháng, nhật ký chuyển chu kỳ.
- Master Data V2.3.0 (60 danh mục, 602 bản ghi); 226/226 test và build, UI Chromium Canvas/storage mô phỏng.
- Chưa có kinh tế cân bằng theo giao dịch NPC, thất nghiệp thực tế từng NPC, thuế doanh nghiệp, deploy hoặc PWA offline kiểm chứng.

## V0.15.0 — Business & Entrepreneurship (2026-11-25)
- Kích hoạt 6 mô hình kinh doanh, sản phẩm, địa điểm, tên và nhãn bản đồ, điều kiện vốn/kỹ năng.
- Vốn lưu động, kho, giá bán, nhân viên, marketing, ca vận hành và kinh nghiệm, 3 cấp mở rộng.
- Chi phí mỗi ngày, nợ, lợi nhuận, góp vốn, thanh lý, lịch sử, tài sản ròng; vay kinh doanh.
- Master Data V2.2.0 (60 danh mục, 600 bản ghi), save migration tự động; 212/212 tests, build và UI Chromium Canvas/storage mô phỏng.
- Chưa có khách hàng/nhân viên AI riêng, nhiều doanh nghiệp, thuế kinh doanh, thị trường động hoặc deploy thật.

## V0.14.0 — Banking & Investment (2026-11-25)
- Tiết kiệm kỳ hạn, tín dụng, vay tiêu dùng và mua nhà/xe trả góp, lịch trả nợ, quá hạn và tất toán.
- Thị trường cổ phiếu/vàng giả lập, cổ tức, danh mục và lãi/lỗ. Tích hợp ledger và tài sản ròng, khóa tài sản bảo đảm.
- Save migration tự động, Master Data V2.1.0 (598 bản ghi), 195/195 tests, production build.
- Kiểm thử Chromium Canvas/storage mô phỏng; chưa xác minh WebGL/PWA/deploy thật.

## V0.13.0 — Love, Marriage & Family (2026-11-25)
- Tình cảm riêng với tin tưởng; hẹn hò, quà, tỏ tình, đính hôn, kết hôn, hòa giải, ly hôn.
- Vợ/chồng đổi lịch về nhà; thành viên hiển thị trong nội thất. Kế hoạch đón con 270 ngày, hồ sơ, chăm sóc và tuổi tác.
- Hạnh phúc, hậu quả bỏ bê, chi phí/nợ gia đình, EXP_FAMILY, báo cáo tài sản ròng; tự bổ sung save cũ.
- Master Data V2.0.0 (60 danh mục, 595 bản ghi), 177/177 tests, build, kiểm thử Chromium Canvas/storage mô phỏng.
- Chưa xác minh WebGL, PWA offline hay deploy Vercel thực tế.

## V0.12.0 — NPC & Social World (2026-11-25)
- 16 NPC với hồ sơ, lịch sinh hoạt, tuyến đi lại, mô hình low-poly, nhãn bản đồ và chấm minimap.
- Danh bạ, tìm/lọc, hồ sơ, gặp mặt, hội thoại theo ký ức, tin tưởng, uy tín, giúp đỡ, mâu thuẫn và hòa giải; nhận diện đồng nghiệp theo hợp đồng.
- Master Data V1.9.0 (60 danh mục, 583 bản ghi), thêm EXP_SOCIAL và migration save tự động.
- 158/158 tests, build và kiểm thử Chromium Canvas/storage mô phỏng; chưa xác minh WebGL, offline hoặc Vercel thật.

## V0.11.0 — Vehicles & Transportation (2026-11-25)
- 6 mẫu phương tiện, gara, mua/bán, lưu vị trí riêng, lên/xuống, điều khiển và tuyến tự động ưu tiên đường.
- Nhiên liệu/pin, cứu hộ, bảo dưỡng định kỳ, nợ và giá trị giảm theo quãng đường; tích hợp sổ thu chi và tài sản ròng.
- Xe buýt 6 điểm dừng, taxi, thanh toán trước và di chuyển trực tiếp.
- Master Data V1.8.0 (60 danh mục, 574 bản ghi); tự bổ sung save cũ.
- 143/143 tests, build và kiểm thử Chromium Canvas/storage mô phỏng; chưa xác minh WebGL, offline hoặc Vercel thật.

## V0.10.0 — Housing & Interior (2026-11-25)
- Thị trường 5 loại nhà, thuê/mua/bán/trả nhà, đánh dấu nhà trên bản đồ.
- Nội thất 2D top-down, đường đi trong phòng, ngủ, tắm, thư giãn, nấu ăn và tự học. 5 loại nội thất có thể mua.
- Tích hợp tài chính, tiền thuê, phí điện nước/bảo trì, nợ và tài sản ròng.
- Save cũ tương thích; Master Data V1.7.0 (60 danh mục, 573 bản ghi).
- 130/130 test, kiểm thử giao diện Chromium Canvas với storage mô phỏng, production build. Chưa kiểm thử WebGL, offline hoặc deploy Vercel thực tế.

## V0.9.0 — Personal Finance (2026-11-25)
- Tài chính 6 tab: tổng quan, tài khoản nội bộ, giao dịch, ngân sách, mục tiêu, báo cáo. HUD có số dư tài khoản.
- Tách lương, thưởng, thời vụ; lịch sử chi tiết có loại/danh mục/thời gian, giữ tổng hợp tháng/năm và sổ 1/7/30 ngày.
- Theo dõi giá trị tài sản hữu hình, lương phải thu, nợ, chi phí định kỳ; ngân sách cảnh báo; mục tiêu dành tiền không cộng trùng.
- Migration save cũ tự động, không hồi tố giao dịch thiếu. Master Data V1.6.0, 60 danh mục / 560 bản ghi.
- 114/114 bài test logic; kiểm thử Chromium Canvas/storage mô phỏng; production build. Chưa deploy Vercel, chưa kiểm thử WebGL, PWA offline thực tế.

## V0.8.0 — Career & Employment (2026-11-25)
- 19 vị trí tại 10 nhà tuyển dụng, CV tự sinh, lọc việc, nộp hồ sơ, phỏng vấn, ký hợp đồng.
- Lịch ca chính thức, lương tích lũy, thưởng, hiệu suất, XP nghề, tăng lương, thăng chức, nghỉ việc, chuyển việc, sa thải và tái ứng tuyển.
- Tích hợp sổ thu chi, lịch ngày, giới hạn giờ làm, save cũ; Master Data V1.5.0, 60 danh mục / 559 bản ghi.
- Giữ nguyên bản đồ, renderer và kiến trúc deploy tĩnh.

## V0.7.0 — Education & Skills (2026-11-25)
- 13 chương trình (6 chứng chỉ, 7 văn bằng), 3 đơn vị đào tạo dùng 2 địa điểm hiện có. Học phí, lịch học, tiến độ, nhận bằng và dừng học.
- 15 kỹ năng, XP tự học thư viện/sách/laptop, XP từ 5 ca thời vụ, giới hạn học 4 giờ/ngày và kiểm tra nhu cầu.
- Điều kiện học vấn/kỹ năng cho 19 nghề; chưa triển khai tuyển dụng.
- 5 tab học tập responsive, Save schema 1 tự bổ sung hồ sơ giáo dục, giữ dữ liệu cũ.
- Master Data V1.4.0, 60 danh mục / 552 bản ghi; 80/80 test logic và smoke test Chromium Canvas/storage mô phỏng, production build.

## V0.6.0 — Survival & Daily Activities (2026-11-25)
- Túi đồ, mua theo số lượng, tiêu dùng, bỏ vật phẩm và hai công thức nấu ăn.
- 5 loại ca thời vụ, giới hạn 8 giờ/ngày, đủ nước, thể dục và giải trí.
- Lịch ngày lặp lại, ghi nhận hoạt động, sổ thu chi 30 ngày, hỗ trợ nghèo khó và mất chỗ ở.
- Master Data V1.3.0, 60 danh mục / 545 bản ghi; tự bổ sung trường mới cho save cũ.
- 62 bài kiểm thử logic, build offline, kiểm thử giao diện Chromium Canvas và storage mô phỏng.

## V0.5.0 — Time & Life Simulation (2026-11-25)
- Đồng hồ chạy liên tục, ×1/2/4/8/16, lịch Gregorian và sinh nhật; pause/modal/ẩn tab dừng mô phỏng.
- Ngày đêm chuyển màu liên tục ở cả WebGL và Canvas; giao thông nền theo thời gian game.
- Sáu chỉ số cuộc sống, hao hụt nhu cầu, hậu quả sức khỏe, stress, cảnh báo và 5 hoạt động hồi phục.
- Lịch mở/đóng 22 địa điểm, điều kiện thời lượng hoạt động và nút chờ mở cửa.
- Gia hạn phòng 120.000đ/24h có thể tắt; phí xe đạp 10.000đ/30 ngày và ghi nợ khi thiếu tiền.
- Save cũ tự bổ sung trường mới; giữ map và navigation, 60 catalog / 519 bản ghi, Master Data V1.2.0.
- 47/47 unit tests, build offline; smoke test Chromium Canvas với storage mô phỏng. Không xác minh deploy thật.

## V0.4.0 — Character & Navigation (2026-11-25)
- Low-poly avatar có khớp tay/chân, hướng quay và animation idle/walk/run/ride.
- Shift chạy, joystick analog với dead zone và nút chạy, tự reset khi mất input.
- Direct line-of-sight + A* + rút gọn đường, kiểm tra collision liên tục, slide và replan giới hạn.
- Route ribbon, marker đích, khoảng cách còn lại, hủy tuyến; tự mở tương tác khi đến cửa địa điểm.
- Camera follow exponential damping. Giữ 192×192, 22 địa điểm, toàn bộ 60 danh mục/499 bản ghi và save schema 1.
- Cập nhật service worker cache và build version, thêm 9 test; tổng 34/34 đạt.

## V0.3.0 — World & City Engine (2026-11-25)
- Thành phố 192×192, 10 phân khu, 79 công trình/khu chức năng, 24 loại, 12 trục đường, 22 điểm tương tác.
- Công trình theo kiểu kiến trúc Master Data, đường 2/4 làn, vạch qua đường, cảnh quan, giao thông nền.
- 36 chunk tạo geometry theo nhu cầu, culling, LOD, cache LRU, A* heap và spatial collision index.
- Minimap có màu phân khu, tuyến đi và camera; bản đồ lớn, lọc phân khu, toàn cảnh.
- Master Data schema 1.1.0, 60 danh mục, 499 bản ghi, validator hình học. Save schema 1 giữ nguyên.
- 25 bài kiểm thử Node, kiểm thử Canvas desktop/mobile mô phỏng; chưa deploy thật hoặc xác minh WebGL/PWA trên thiết bị thật.

## V0.2.0 — Canonical Master Data (2026-11-25)
- 60 danh mục JSON, 393 bản ghi, schema V1.0.0 và Master Data Validator.
- Gộp 5 khái niệm liên quan để khớp số danh mục đã chốt.
- Biên dịch bundle read-only, chuyển cấu hình, địa điểm, hình học, hành động và nhu cầu di chuyển sang dữ liệu chuẩn.
- Tra cứu danh mục trực tiếp trong Cài đặt; cập nhật version và offline cache.
- Giữ schema save v1 và khả năng deploy static Vercel; 18 bài test đạt.
- Nội dung mở rộng là seed chưa kích hoạt các engine tương lai.


## V0.1.0 — Foundation & Playable City Prototype
- Initial UI, new game/continue/settings, low-poly 3D city, orthographic camera and minimap.
- Character movement, A* navigation, collision, desktop and mobile controls.
- Eight places, starter work/food/rent/rest/bicycle activities, cash and journal.
- Local save, validation, import/export, PWA manifest and cache worker.
- Dependency-free static build and Vercel configuration.
