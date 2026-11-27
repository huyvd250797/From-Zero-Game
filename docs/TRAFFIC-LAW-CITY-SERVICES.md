# V3.12.0 — Traffic Law & City Services

Baseline: V3.11.1 hotfix. All laws, amounts and license classes below are fictional gameplay rules, not legal advice or a reproduction of current Vietnamese regulations.

## Gameplay
- Phương tiện → Dịch vụ đô thị (also Menu and phone): license A/B/C, three-question exam, 12 points, 7-day cooldown for reissue when points reach zero, traffic records and payment.
- Manual driving: speeding (> limit + 3 km/h for 1 second), wrong-side travel for 1.25 seconds on detected axial lanes, red stop-line crossings, no valid license. Explicit or automatic dismount in restricted parking zones is recorded; cooldowns suppress repetitive notices. Camera/patrol proximity labels the source; system monitoring also detects offences outside those zones. No police chase, arrest or physical ticket interaction.
- Fines: speed 80k/1 point; red 150k/2; wrong way 120k/2; parking 50k/0; no license 180k/0. New and migrated saves have no initial license. Fees paid explicitly from cash; no duplicate payment; older unpaid records are moved to aggregate debt, not discarded.
- 33 camera meshes and two police patrol actors at 08:00. Patrols use existing persistent AI routes. Cameras are gameplay sensors, not video recording.
- New impact reports are captured at collision time, including coverage snapshot. Insurance active 30 days; premium max(30k, 0.15% vehicle list price). Claim pays 65% of incremental base damage estimate once. No retroactive coverage; historical pre-release damage is not converted into new claims.
- Tow/ambulance dispatch: one service at a time, path from garage/hospital to request position, visible service vehicle with distinct geometry. Close modal to advance clock, stay near incident, then accept. Tow transfers via existing service, ambulance transfers to hospital after 20 game minutes (80k), hospital treatment 30 minutes (120k; +35 health capped at 100). No fully animated return towing/transport or police chase. Priority AI slows and attempts lane return; emergency vehicle remains route/time driven, not a complete collision-safe priority simulation.

## Bus stabilization
- Three lines, six directions, 14 stops, 28 platforms, 30 directed legs, 24 seats, existing headways and fares retained. Bus departure and arrival headings constrained to platform direction, U-turn edge transitions disallowed, legal graph connections checked, redundant backward hooks removed and safe turns rounded. Max waypoint heading change measured 32.73 degrees; previously nearly 180 degrees. A leg may take a longer legal route where an immediate U-turn was previously generated.
- Shared distance-time profile used by rider and ambient bus: 30 km/h maximum; 1.35 m/s² acceleration; 1.8 m/s² braking; 1 rad/s max heading rate; reduced speed near stops (profile vertices within 4 units capped at 2 m/s), full stop and existing dwell. Timetable durations recalculated; player and visible scheduled bus share the same trajectory. Game fast-forward still accelerates game clock; no dynamic schedule replanning/traffic avoidance for buses, no guarantee of zero collisions with all other actors. Global schedule can have more simultaneous trips due to slower movement; visible bus budget retained.

## QA
Final source focused suites: 8 new + 20 bus/mobility + 32 traffic/collision/vehicle + 12 release/branding = 72 pass, zero failures in those runs. Mixed-version full regression stopped after 461 passing tests, no observed failures; not a final full-suite result. Syntax and master data compile pass; native preview exact SHA-256 and HTTP 130/130. `npm run build` reaches syntax PASS then stops at missing Three.js dependency; offline npm ci ENOTCACHED. Production gate remains unchanged; no browser, FPS or Vercel deployment verification.

Schema 1 and urban layout 9 retained; cityServices defaults inserted only for older saves missing the field. Export a JSON backup before deployment. No DB migration or environment variables.
