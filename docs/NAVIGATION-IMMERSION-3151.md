# V3.15.1 — Navigation, Immersion & Mobile UX Refinement

Baseline V3.15.0. This supplemental release does not change the 16-release roadmap. No new dependency or migration. Save schema 1 and urban layout 9 are preserved.

## Navigation
- Limit miter distance by road width rather than graph sampling length; avoid centerline entrance hooks; trim short local reverse hooks only if the replacement is legal, clear and outside protected ramp/roundabout/highway surfaces.
- Local direct door route <=8 world units if building, obstacle, highway access and one-way checks permit it. No change to actual interaction range (2.5 units).
- Rounded turns validated against the existing geometry and access rules. Slow before curves; detect cumulative turns in HUD.
- Not a guarantee of collision-free routing in every traffic situation. Existing collision/damage/traffic clearance remains active.

## Map and HUD
- Two pointer pinch to zoom, center-anchored pan, single tap selection, red pin and action directly below the canvas. Wheel and +/- remain. Icon controls include accessible names and keyboard shortcuts.
- Shorten frequent descriptions, retain warnings (payments, saves, safety). Not an exhaustive text rewrite.

## Foods
- 12 additional ready-to-use foods/drinks, seven recipes, nine ingredients (28 new master-data records; 1,056 total in 60 catalogs). Includes shopping, consumption, nutrition and per-home storage. New food and ingredient icons have distinct SVG silhouettes or toppings.

## Audio and umbrella
- Preserve user's saved audio settings and explicit iOS gesture unlock; retry suspended contexts when visible. Use actual collision/render traffic actors instead of querying a second bus timetable, sanitize non-finite values. Two continuous nearby engine oscillators, 20 short voice limit unchanged; horn when traffic is impeded, nearby conversational sound synthesized, not recorded Vietnamese speech.
- Right forearm raised and left arm retains normal movement. Shared procedural umbrella handle position based on joint transform; Three.js bones overridden while raining. Exact visual hand alignment on a real device still requires acceptance.

## QA
- 298 legal near-door approaches checked against straight distance. Native preview and unit checks are not proof of real iOS rendering/audio or Three.js production build. Production requires the pinned dependency via npm ci; never bypass test gates.
