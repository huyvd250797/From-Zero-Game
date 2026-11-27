# From Zero V3.5.0 — Urban Planning 4.0

## Data and geometry
- Canonical master data stays at 3.1.0: 61 files unchanged, 60 interactive places, 18 districts, 24 existing road IDs, 12 river bridges, 229 original sites and 206 original solid buildings. Runtime adds 3 non-interactive secondary houses (232 sites, 209 solids).
- `urban-planning.js` derives deterministic sin-squared centreline offsets (2–5 units) in 100 road sections. Samples check building/river clearance; existing entrance locations are retained. Bridge approaches stay straight; ring approaches reserve their full envelope.
- Seven ring roads at (16,304), (112,272), (240,112), (272,336), (304,208), (336,80), (368,304). Outer radius 8.6, circulation radius 6.3, island radius 2.6 plus 0.65 movement clearance. Exact swept-circle test prevents tunneling into island.
- 72 pedestrian access alleys between plots and 90 landscaped side/rear setbacks. Small additional houses occupy safe vacant space. Ordinary building facade direction continues to follow the canonical door. The underlying arterial grid and the majority of existing footprints remain; this is a compatibility-first retrofit, not complete replacement with irregular blocks. Some large standalone lots remain. No guarantee that every ordinary plot has eliminated four-road adjacency.

## Routing and rendering
- `urban-routing.js`: 3,705 sampled nodes, 3,832 edges including 168 directed ring links. All 28 roundabout approach ports attach to the ring. Multi-source shortest path with endpoint access, collision verification and bounded route cache; local short trips and unreachable endpoint access may use existing walkable navigation. Curved sidewalk candidates retain collision-safe fallback. Alleys are pedestrian passages, not new motor-vehicle lanes.
- `urban-geometry.js` bends the common city mesh and renders ring road, central island, alleys and yards. Same shared geometry for Three.js, native and Canvas renderers. 144 chunks; 184,508 low and 432,356 high triangles with street trees, max 12,672 triangles per high chunk (below existing budgets). City map uses same road profiles.
- Background traffic uses arc-length samples on curved lanes, with circular through movement around islands. Signal rendering excludes roundabouts; real vehicle yielding, traffic jams and physics are outside scope. Streetlights and wet reflections use changed road position. Audio distance uses road profile.
- Existing bus timetable and stop-at-destination model are unchanged except road routes. Proper roadside bus bays, new route network and passenger transfer UX remain V3.7.0. Additional road classes and highways remain V3.6.0.

## Saves
- Save schema remains 1. `urbanLayout:4` marks current coordinates. Legacy saves that were valid under the former map but land inside new island/annex solids have only affected player/parked vehicle positions moved to the nearest valid point. Active car and rider coordinates remain aligned. Invalid original coordinates or mismatched active vehicle coordinates are rejected; no automatic cash/asset changes. No SQL migration.
- Export JSON backup before upgrade; new saved positions may not be suitable for rollback if they were relocated.

## QA
- 746 unit tests pass, including 13 new urban planning tests. Existing geometry-specific checks now compare runtime additions against canonical counts and actual curved lane positions rather than the former straight axes. Ring clearance, lane continuity, all 60 doors and graph connectivity checked. Existing 3,540 ordered door-pair walkability test remains.
- Native preview build and exact SHA-256/HTTP verification of 109 assets pass. Balance simulation (30 days): easy 5,180,000 VND; normal 3,050,000 VND; hard 705,000 VND; health 100 in all three.
- Desktop (1280x800) and mobile (390x844) Chromium tested with actual built modules loaded through an import map, LocalStorage mock and Canvas fallback; old position in ring migrated, HUD and city map display. No JavaScript page errors in those scenarios. Not a production GPU or installed PWA test.
- Production build remains blocked by Three.js 0.180.0 missing in offline npm cache (ENOTCACHED). The production test and vendor gates remain enabled. Run `npm ci`, `npm run build`, `npm run verify:release`, and `npm run smoke:http` with registry access on GitHub/Vercel before release acceptance.
