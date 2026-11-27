# V3.8.0 — Smart Navigation & Camera

Baseline: V3.7.0 Public Transport 4.0. Save schema 1, city layout 8, pinned Three.js 0.180.0, master data, existing fares and road network remain unchanged.

## User workflow
- Select a named place: compare available walking, owned-vehicle, bus and taxi options; time is in game minutes, energy costs are estimates, not an immediate cash debit. Public fares use the existing one-time payment.
- GPS card shows the current maneuver/phase, distance, destination, game-clock ETA, map and cancel. GPS 3D uses green walking/blue vehicle geometry and a separate gold final target. Waiting or pickup does not create a fake line to the final target.
- WASD/joystick or brake suspends automatic navigation with the same target. Release to recalculate; Esc or GPS cancel explicitly ends the route. A failed recalculation stops the route. A scheduled bus/taxi cannot be manually steered, and must be canceled before choosing a new ground point.
- Map shows remaining public itinerary. Up to 12 completed named destinations appear under session history; a new/reloaded life clears the history.
- Existing four camera modes and one-tap return remain. Select Camera xe for speed-adaptive zoom, automatic-route heading and footprint avoidance. Rotate manually to override heading. Re-select Camera xe to restore auto-heading. Preferences in GPS & camera can enable/disable route rendering, adaptive zoom and heading; save zoom/yaw for normal follow. These settings are local to the browser and not part of the save schema.

## Implementation
- `smart-navigation.js`: pure maneuver classification, ETA from capped speed/peak factor and scheduled phases, bounded destination history, immutable rerouting, crossing preference.
- `main.js`: route suspension/resumption, comparison, HUD, session history, camera wiring, independent preferences; `mobility.js`: immutable cached walking routes; `character.js`/`renderer.js`: route geometry, chevrons and target across renderer backends; `camera-control.js`: adaptive orthographic vehicle camera.
- Pedestrian preference selects a nearby marked crossing only if detour has safe segments, no highway intersection and bounded cost. Falls back to existing pathfinder where no reasonable crossing is found. Existing transit walks use the prior sidewalk/station routing. This is not an exclusive pedestrian graph or universal pedestrian-law enforcement.
- ETA is a forecast, not a guarantee: speed-limit and peak factors do not predict individual signals, traffic incidents, collisions or future NPC congestion. Game time and real seconds are separate concepts.
- Camera remains orthographic, footprint-based; no full mesh collision, perspective chase camera, transparent roofs or cabin view. Full vehicle dynamics and traffic AI are later roadmap items.

## Verification commands
`npm test`; `npm run build`; `npm run verify:release`; `npm run smoke:http` with pinned Three.js installed. For native QA only: `npm run build:native-preview`, `node scripts/verify-release.mjs dist-native-preview`, `node scripts/smoke-http.mjs dist-native-preview`. Native preview is not the production artifact.
