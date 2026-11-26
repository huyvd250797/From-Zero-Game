# V1.7.0 — Advanced Transportation

## Controls
- Mount and park using B or the existing vehicle button. Go to a parked vehicle first (2.5 m existing access condition). Vehicle ownership/finance rules unchanged.
- WASD, arrows or joystick choose a camera-relative heading. The vehicle accelerates and turns toward that heading; release to coast. Hold G to brake, or toggle Phanh on mobile. Brake cancels the current auto route. Tap a destination to resume automatic driving. Cancel/Esc stops the automatic route. Pause, lost focus, modal and reload clear transient velocity.
- Camera xe switches to vehicle-follow (3.4× desktop / 5.6× mobile); it is still an orthographic camera. Bãi đỗ finds a free reachable painted stall; routes to it and parks at arrival with heading aligned along the stall. Manual park at current position remains supported.
- HUD speed is converted from the game's world-distance units per real second to km/h. It is not a realistic road speed limit. Nearest intersection signal is advisory. Bus/taxi continue using existing paid journeys and fares.

## Design
- `driving.js`: transient acceleration, coasting, braking, steering, swept collision, route following, stall selection. Maximum speed uses canonical vehicle record, vehicle fuel and odometer use only actual movement; no saved velocity. Current collision model is inherited center-point swept clearance, not a full vehicle-body physics system. Parking checks footprint corners and approximate space around owned vehicles. Wide vehicles use two marked bays; no parking fee or parking reservation.
- `vehicle-visual.js`: shared geometry with 8 model variants, circular wheels with rotating rims, front steering, simplified brake/indicator/headlamp geometry. Motorcycle uses seated rig; no transition animation entering/exiting the vehicle. No actual emissive lighting on surroundings.
- `traffic.js`: one deterministic vehicle per direction per road (maximum 24 visible), right-side lane centers. 36 intersections, 4 signal heads each when in view. All intersections use the same 20-second cycle tied to the simulation clock: vertical and horizontal phases alternate; 8 s green, 2 s amber, 10 s red per axis. Each lane travels one block during green with smoothstep acceleration/deceleration and stops before next intersection. Loop discontinuities occur outside map. Since 1 real second = 1 simulation minute at ×1, phases accelerate with game speed. Traffic does not change the simulation ledger and does not collide with player or pedestrians; automatic player routes still use road centrelines, not lane-level traffic AI. No overtaking or autonomous turn routes yet.
- `renderer.js` / `character.js`: shared geometry used by Three.js, WebGL 2 native, WebGL 1 and Canvas; cull off-screen ambient vehicles/signals. Geometry is generated per visible frame; no new dependency. Motorbike rider uses existing pose rather than a vehicle-specific rig.

## Validation
- `npm test`: 441 independent tests (428 retained + 13 added). Includes acceleration, coasting, braking, route endpoint, sweep collision, fuel, heading, lane directions, signal phase, traffic continuity, mesh and parking.
- `npm run build:native-preview`, `node scripts/verify-release.mjs dist-native-preview`, `node scripts/smoke-http.mjs dist-native-preview`: 67 assets. Native preview is not a production deployment.
- `npm run simulate:balance`: 30 days each difficulty retains baseline cash 5,180,000 / 3,050,000 / 705,000 and health 100.
- Actual Three.js runtime test added in `tests/three-runtime.integration.mjs`. Local npm offline cache lacks Three.js 0.180.0; run `npm ci && npm run build` in network-enabled environment. Browser GPU, iOS/Android physical device FPS, WebGL2 and PWA offline must be verified after deploy. Production build fails intentionally if dependency/runtime test fails.

## Release checklist
1. Export JSON from V1.6.0; keep domain unchanged and push full source. Install `npm ci`, build `npm run build`, output `dist`, Node 22.x.
2. Open settings and confirm Three.js r180 / WebGL 2. Buy/mount bike/motorbike/car and verify actual motion, turn, wheel/stop, brake and fuel. Try parking, reload, remount and ensure saved position.
3. Observe signals and ambient traffic at ×1 and other time speeds, pause/resume. Inspect vehicle geometry and frame time on physical phone. Test bus and taxi trips. Verify PWA updates/offline when appropriate.
