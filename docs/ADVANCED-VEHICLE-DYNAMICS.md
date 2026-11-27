# V3.9.0 — Advanced Vehicle Dynamics

Baseline V3.8.0. Save schema 1; urban layout 9 (automatic migration for valid older saves). Export a save before upgrading. Canonical data and destination IDs retained.

## Driving
Eight kinematic profiles (bike, motorcycle, car, EV, luxury car, truck, bus, taxi). Mass/power, acceleration, braking, steering, wheelbase, roll and grip are game tuning constants, not manufacturer specs. Wetness reduces grip by up to 42%; offroad multiplies grip by 0.65. Manual gear D/R via H or HUD when stopped; reverse limited to 3 m/s, unavailable on two-wheel vehicles. G or HUD brakes. EV regeneration derives from kinetic energy change; credited recovery is capped at 60% of gross energy use for that movement update. Existing parking waypoint logic retained; no parking sensors or full rigid-body solver. Automatic steering visuals and speed use the new dynamics, but actual movement follows validated waypoints. Bus/taxi/background schedules do not become fully physical vehicle agents. Wheel and body animations share the renderer geometry; visual acceptance pending.

## Road network
384 x 384 map, 1,496-unit perimeter centerline, four lanes, eight bidirectional at-grade ramp connections and two extra river bridges. Two former edge roundabouts removed; three interior roundabouts remain. Some parcels/doors relocated; logical IDs retained. Eight persistent background vehicles loop through local streets, highway, exit and city return. No full lane-change, traffic congestion, vehicle-to-vehicle collision, damage or insurance simulation yet. Automatic paths prefer the right lane on straight segments and right sidewalk where viable; junctions and blocked approaches may use safe center/fallback routes. Manual control is unrestricted by lane preference but still respects static obstacle and highway access checks. The highway has no grade-separated interchange model.

## QA
- 31/31 focused road/transport/dynamics tests pass.
- 94 compatibility tests: 92 passed on first rerun; remaining two updated for intentional bank truncation/ramp layout changes. Separate 3/3 rerun passed including those two and fractional-position navigation.
- First complete development run: 783/800 passed, 17 failed before final geometry and test updates. All previously failing cases subsequently covered by focused/compatibility/patch reruns; final full-suite run not completed. Do not claim 800/800.
- Native preview build, syntax, SHA-256 and HTTP verification: 122/122 assets. No Three.js runtime included in native preview.
- Offline npm install failed ENOTCACHED for three@0.180.0. Production build, real browser rendering and FPS acceptance not verified. Normal Vercel build remains npm run build, output dist.

## Next
V3.10.0 Collision & Vehicle Damage: collision detection, impact/damage states, repair, recovery; reserve advanced traffic AI and law enforcement for V3.11.0 and V3.12.0.
