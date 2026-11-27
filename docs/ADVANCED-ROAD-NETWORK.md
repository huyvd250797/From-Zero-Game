# V3.6.0 — Advanced Road Network

Baseline: V3.5.3. Layout marker 8; save schema 1. The river profile, four bridges, five roundabouts, 28 residential clusters and 60 interaction IDs remain. Road widening and the eastern corridor require replanning 70 parcels, including five interaction doors (clinic, tech_hub, east_cafe, campus_shop, phuan_apartment). Legacy layout 7 door anchors are recognized during migration; invalidated positions are relocated to safe ground. Ownership and financial data are unchanged.

## Network

- 24 original axes: six local (width 5.5, 2 lanes, 30 km/h), ten street (7, 2, 50), six avenue (9, 4, 60), two boulevard (11, 6, 60). Shore roads 6.4/2/40; pedestrian alleys width 1.8. Widths are compressed game-world units, not real engineering dimensions.
- Eastern expressway x=379, z=36..248: length 212, four lanes, 90 km/h. Two bidirectional at-grade access ramps (40 km/h) to the parallel city street. No elevated interchange or dynamic merging behavior. Side connections removed. Car-class routes may use expressway; bicycles, motorcycles and pedestrians may not. Manual movement checks the restricted mainline strip; ramp footprint enforcement is not exhaustive.
- Two one-way urban sections: X48 z16..48 and Z48 x48..80, positive direction. Routing uses directed edges, class-specific access, time weights and lane offsets when safe; center points retained around junctions. Manual one-way/speed violations and police enforcement are reserved for later versions.
- Graph: 4,657 nodes, 4,816 edges; 12,432 directed lane spans. Existing NPC, taxi, bus and player vehicle routing integrated. Bus and NPC schedules use conservative route speed bounds, not per-lane traffic simulation. Bus routing prefers exact destination stops when applicable.
- Shared mesh markings and signs, 66 additional crossing locations, motorway distinction on the map, and up to eight visual motorway traffic actors. These actors are not persistent vehicles, and do not yet simulate ramp merging. Crossings are geometry, not pedestrian priority AI.

## Validation and limits

Regression suite: 779 unit tests (769 existing plus 10 new); targeted road, routing, migration and geometry suite: 77. All 60 interaction locations reachable from spawn by each supported personal vehicle class and on foot. Automatic highway route tested through both ramps. Static triangles: Low 158,442; High 437,006; largest High chunk 11,872. Native preview and integrity checks cover 118 resources. Three.js production build requires npm dependency 0.180.0; unavailable in this environment (ENOTCACHED). No GPU/physical mobile/PWA runtime acceptance claimed. Keep the production build gate intact.

Traffic collisions, lane changing, queueing, yielding, traffic law enforcement, detailed vehicle dynamics and curbside public transport remain subsequent roadmap work. No database migration required. Export a JSON save before updating.
