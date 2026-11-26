# From Zero V2.0.0 — Immersive Life Simulation

Baseline: FromZero-V1.12.0-Visual-Performance-and-Polish.zip. Official generation-2 source, local acceptance limited to Native QA; production approval requires dependency and real browser GPU/device tests. No new dependency, no DB, no migration. Three.js 0.180.0 (r180), save schema 1, master data 2.9.0, PWA id and storage keys remain unchanged. The game is fictional and single-player.

## Final polish
- V2.0.0 branding in title screen, package/lock, manifest description, document title and UI modal versions. Native preview explicitly marked and never a production substitute.
- Shadow scheduler invalidates on yaw (>3 degrees shortest-angle) and pitch (>2 degrees), in addition to existing position/zoom/chunk thresholds. NPC and player Three.js mixers receive zero delta while gameplay is paused; resume starts with zero delta. Existing visual rigs, animations, traffic, lighting, weather, interiors and sound retained.
- FrameMeter reports nearest-rank p95 interval between completed render frames over the existing ~2 second window. Suspended gaps >2s reset measurement. FPS and CPU render+labels time remain distinct metrics; no GPU timing or thermal claim.
- Storage event handler re-reads primary token before freezing, to avoid outdated queued events. Actual compare-before-write, checkpoint and rolling backup protections retained. This is not a transactional cross-tab lock. Back up JSON externally; clearing site storage removes local saves.
- Production build requires pinned real Three.js, all independent unit tests, Three.js integration tests and exact precache SHA-256/HTML inventory verification. Native QA output remains separate. Service Worker keeps V1.12.0's verified cache installation and one previous fingerprinted version. PWA identity unchanged.

## Verified locally (Node 22.16.0, Chromium Canvas fallback)
- 499/499 independent unit tests passed (494 inherited + 5 new); 0 failed/skipped. Syntax and canonical data validator pass. Native QA build, exact SHA-256 and HTTP integrity 73/73 pass. 30-day survival unchanged across easy/normal/hard: 5,180,000 / 3,050,000 / 705,000 VND; health 100 each. Desktop 1280×900 and mobile 390×844 Chromium: HUD, weekday, day plan, eco settings persistence, pause, camera zoom and controls. Mobile pinch: 10 camera callbacks; page scale 1.00 before and after. No page errors in these flows.
- Production `npm ci --offline` returns ENOTCACHED; network npm ci returns EAI_AGAIN registry.npmjs.org; build fails explicitly at missing Three.js, so the 16 real-Three integration cases are not verified. Real service worker browser test blocked by Chromium ERR_BLOCKED_BY_ADMINISTRATOR at localhost; existing worker lifecycle mock tests pass, but actual offline installation/reload is not verified. No Vercel deploy, physical-device FPS, p95, heat, memory, audio listening, Safari PWA acceptance claimed.
- V1.12.0 measured CPU mesh conversion gains are historical baseline evidence only. No new measured GPU improvement.

## Release / deployment gate
1. Export JSON backup using the existing Settings screen. Keep old ZIP for rollback.
2. Replace full repository source, including package lock. Vercel Other framework, root ./, Node 22.x, npm ci, npm run build, output dist. No env/API keys. Never deploy dist-native-preview.
3. On a network-enabled machine run `npm run release:check` (dependency, unit tests, production build, Three tests, integrity, HTTP and balance). Resolve failures before promoting deployment.
4. Test Chrome/Edge PC, iPhone Safari and standalone PWA, Android Chrome: renderer status Three.js r180; city/near/far camera, NPC walk/crossfade, pause/resume, vehicle acceleration and lights, weather, interiors, activity completion/cancel, audio and HUD. Check touch gestures distinguish camera zoom from page zoom. Confirm weekday/next-day work plan.
5. Record FPS and p95 in same preset/scene after at least 2 s active play, before opening Settings; compare after 30 min active play, with eco on/off. Observe device temperature and battery separately. Target 30–60 FPS depending on device, not guaranteed.
6. Install PWA, wait for worker control, reload offline and continue save. Reconnect and verify update from V1.12.0 with two tabs, recovery after corrupt primary, backup/checkpoint, export/import, and conflict protection. No real device approval until all pass. If update fails, keep existing cache/save, export JSON, rollback to V1.12.0 source and redeploy; don't clear site storage casually.

## Scope limitations
Procedural stylized geometry and rigid skinning, no AAA assets, no fully seamless activities, no deep crowd/traffic physics, no HRTF, no true real-time road reflections. Preserve 693 canonical records and existing rules. Roadmap source delivery can be 13/13 while production acceptance is still pending.
