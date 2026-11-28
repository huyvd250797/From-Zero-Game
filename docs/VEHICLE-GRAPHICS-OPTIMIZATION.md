# V3.18.10 — Vehicle Graphics Optimization

Rendering-only optimization on V3.18.9. All 27 existing vehicle GLBs, master data, physics and saves remain unchanged. No professional assets added.

- Three.js vehicle LOD hysteresis: enter LOD0 at >=9 projected unit scale and distance <22 (unless owned); retain down to 8 and distance <26. LOD1 enter >=5 and <65; retain >=4.5 and <72. Mobile permits only owned nearby LOD1, with existing pixel limits. Hard quality and pressure caps override the history. State expires after 120 unseen frames, capped at 512 entries. Native renderer retains its previous LOD rule.
- VehiclePressure uses completed frame intervals and CPU work time (not actual thermal readings). 2-second sample windows, >30% bad frames raise one level, four consecutive good windows reduce one. Existing mobile resolution/pacing pressure still applies. Adaptive desktop policy respects the adaptive preference.
- GLB templates: LRU by use, maximum 12 desktop / 6 mobile normally, 8 / 4 under pressure. In-flight requests capped at 2 desktop / 1 mobile (no new requests at pressure 2). Clones share geometry; inactive slot materials are reused by key when possible. Eviction protects slots and releases loader-owned geometry/materials/textures. Cache limits are entry counts, not exact VRAM limits. Browser/PWA disk cache is unaffected.
- Frustum uses the actual active orthographic or cockpit camera and conservative bounding spheres. Only presentation is culled; traffic, collisions, NPC state and navigation remain unchanged. Prioritize player first, then parked vehicles and moving vehicles ordered by distance to player within each category.
- Direct tagged triangle upload fills persistent position/normal/color/index buffers without intermediate full-size typed arrays; same legacy surface groups, normals and winding. Shared fallback mesh has at most ten material groups. No promise of fixed total draw calls for GLB meshes.
- Reduce reflection intensity to 65% / 35% at pressure 1 / 2; disable high-detail metallic maps under pressure. Limit dynamic headlamp spotlights; emissive lamps and approximate light footprints remain. Keep existing mobile FPS targets 24/30/45 and 20 severe-pressure cap. No temperature sensor or real device benchmark.
- Software showroom skips identical redraws, coalesces controls to rAF and avoids allocating flattened vertex bounds and sorting depth (z-buffer handles visibility).
- Settings shows render pressure, culled vehicles, loaded/allowed GLB templates, eviction and reuse counters. Export existing JSON performance report for device diagnostics.

CPU-only benchmark: `npm run benchmark:vehicles` (12 vehicles, 8733 triangles; warm-up and alternating trials). Excludes simulation, mesh assembly, GPU upload and drawing; not FPS. See QA results for measured values.

Not implemented: Meshopt/Draco/KTX2, full scene instancing of imported bodies, new high-fidelity artist models or device thermal measurement. Production Three.js integration and iPhone testing must be completed separately. Next main release: V3.19.0 Police & Public Security.
