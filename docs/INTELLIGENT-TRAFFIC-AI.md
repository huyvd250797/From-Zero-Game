# V3.11.0 — Intelligent Traffic AI

## Implemented
- Sixteen closed route templates, including eight ring circuits. Session agent identities persist during normal continuous simulation; large time jumps and reloads reinitialize traffic. Initial density is 16/24/32 agents according to game time.
- Spatial grid broad phase, 0.1 s simulation steps, interpolated render poses, following-distance and speed constraints, lane-change checks, passing and intersection/merge/roundabout yield heuristics. Contact events stop agents and increment a cooldown-limited counter.
- Signal compliance and pedestrian crossing detection; the player autopilot reads live traffic constraints and local ETA factor. Manual movement is not forced into a lane.
- Straight lane preservation, validated direct segments, redundant endpoint hook removal and validated ramp corner rounding. Motorway access is restricted to eight gates; vehicle body clearance is included in manual movement.
- Ramp and ring geometry uses separate surface elevations to address coplanar depth fighting.
- A downward chevron replaces player text. Occluded actors show a dashed contour extracted from their actual projected vehicle/character geometry; the Three.js renderer supplies skinned avatar vertices when available.

## Scope and compatibility
Save schema 1, city layout 9, Three.js r180 and canonical data retained. Existing scheduled buses and named NPC vehicles are external traffic objects; ambient agents respond to them, but bus schedules do not dynamically reschedule. Initial rush-hour density is not continuously adjusted by spawning/despawning. Contact response is not full rigid-body simulation or persistent NPC damage. Local ETA is an estimate. Heuristic lane changes and yielding do not guarantee deadlock-free traffic. Actual visual acceptance for the dashed silhouette, ramp surfaces and night rendering on mobile remains pending.

## QA
49/49 focused tests passed, including nine new tests. Native Preview build, SHA-256 and HTTP checks passed for 127 assets. Full regression was started during development, not a clean final-source run. Three.js npm dependency unavailable (offline cache miss and DNS EAI_AGAIN). Local browser preview blocked by ERR_BLOCKED_BY_ADMINISTRATOR. Production build, browser visual verification and FPS measurements are not claimed.
