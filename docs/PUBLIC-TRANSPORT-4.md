# V3.7.0 — Public Transport 4.0

Baseline: source archive `FromZero-V3.6.0-Advanced-Road-Network(3).zip`. Save schema 1, urban layout 8, world geometry, 60 interactive destinations and previous financial and ownership data preserved. No DB or environment variable changes.

## Bus network

Three two-way lines retained from V3.6.0. The 14 logical stations now each have two physical platforms. Placement is deterministic: select the closest feasible two-way axial street, outside crossing and ring clearances; verify road lane, four-unit directional approach/exit, sidewalk waiting area and shelter footprint are walkable and not on another road or highway. A few stations are farther from their namesake building (e.g. office ~26 world units); the itinerary walks the player between the door and platform. World units are compressed game units, not surveyed distances.

| Line | Fixed route | Headway |
|---|---|---|
| AL01 | shop → office → mall → market → school → hospital | 12 min |
| AL02 | mall → east_market → tech_hub → new_factory → east_school → hospital | 15 min |
| AL03 | school → south_farm → phuan_market → river_park → tanphu_market → new_factory | 15 min |

Departure window 06:00–22:00 at the origin; last runs can finish later. Both directions are independent fixed services. Bus legs use V3.6.0 urban routing and an explicit curb-lane approach and exit; bus duration is conservative using the minimum road limit, not a live congestion prediction. At a terminal the bus is visible during boarding and alighting. One game minute dwell per intermediate station. No dedicated bus pull-out bay, turnaround depot or fleet assignment across successive runs.

## Gameplay

The time-dependent search uses labels by stop, arrival direction and number of boardings; it searches up to 3 boardings (2 transfers), rejects unavailable seats on any required segment, advances to a later departure if needed and limits wait to 90 game minutes per boarding. Walk → wait on sidewalk → board → ride → dwell or alight → transfer/final walk. Time and spatial continuity are preserved. One base fare 7,000 VND per boarding adjusted by existing livingQuote fuel factor; paid once up-front using the existing EXP_TRANSPORT ledger. Cancellation remains nonrefundable. No fare change to taxis.

Ambient NPC passenger manifests are generated deterministically by trip key, boarding station and destination station. Each bus holds up to 24 riders, with alighting before boarding, excess demand denied, and player itinerary requiring one remaining seat for all relevant segments. Render a bounded sample of ambient passengers waiting, moving to board and alighting at the platform. These are simulated anonymous commuters, not the named persistent resident profiles; overflow can abandon the trip, rather than carrying a persistent queue to the next bus. A bus is not an inventory asset. Interior seats, boarding ticket animation, live traffic delays and collisions are not simulated. Active trips are transient in the same way as the previous version; export a save before updating and finish/cancel travel before quitting.

## Road paint

`junction-layout.js` is the single geometric source of truth for crossings. Build undirected physical junction approaches from the directed graph (including incoming-only approaches), and separate roundabout branch approaches. Search outside the cross-road footprint for an entire walkable zebra width, two walkable shoulder endpoints and clearance for stop lines. Reject motorway/ramp crossings, ring interiors and overlapping candidate centers. Short or unsafe approaches are intentionally left unmarked. No old `intersectionPaint` pass remains. Axial and diagonal lane paint use the same clearance geometry; raised curbs are interrupted near zebras and diagonal mouths. Varying road widths determine stripe count and incoming stop line width. Automatic signal constraints use the new axial stop-line location. Background traffic and scheduled buses still follow their baseline cosmetic/scheduled model, not pedestrian yielding or collision avoidance. Pedestrian route planning still prefers sidewalks but does not enforce legal crossing usage.

## UI and deployment

Open Phương tiện → Xe buýt/Taxi → Bản đồ tuyến xe buýt. Filter all routes or AL01/02/03; continuous line = outbound, dashed = return, white dots = stations, colored squares = bus positions. Route details list next departures per direction and per-stop leg seat availability. HUD reports board/alight phases and occupancy including the player. Existing single-player save, menus and PWA configuration preserved.

Production: push the entire ZIP source to the existing repository, keep lockfile and `vercel.json` (`npm ci`, `npm run build`, output `dist`, no framework preset). `npm run build` requires actual Three.js 0.180.0 and all official QA tests; native preview is separate (`npm run build:native-preview`) and must not replace the production deployment. No database migration.

## QA thực tế (27/11/2026)

- Node.js v22.16.0. Full `npm test`: **788/788 PASS**, 0 fail, 0 skipped (238.38 seconds); master data 60 catalogs, 1,028 records. Nine new Public Transport tests; targeted regression 32/32 PASS.
- Additional reachability at 08:00: 182/182 directed pairs between the 14 stations returned a continuous itinerary. 82 one boarding, 79 two boardings, 21 three boardings. Peak occupancy 24; overflow exercised.
- Static geometry all chunks: Low 157,696 triangles; High 433,048; largest High chunk 11,824; within existing budgets. Crossings 565 including 19 roundabout approach crossings.
- `npm run build:native-preview`: PASS; JavaScript syntax, 121 assets SHA-256 and HTTP integrity PASS. This is not the production build.
- Production `npm ci` failed both offline (ENOTCACHED) and network (EAI_AGAIN registry.npmjs.org). `npm run build` correctly stopped because real Three.js r180 was unavailable. Chromium local URL was blocked by administrator (ERR_BLOCKED_BY_ADMINISTRATOR); no visual browser, physical-device, GPU, or PWA installation acceptance claim. No GitHub push or Vercel deployment performed.
