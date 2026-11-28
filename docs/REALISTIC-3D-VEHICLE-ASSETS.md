# V3.18.2 — Realistic 3D Vehicle Assets (asset pipeline & original interim models)

Baseline V3.18.1. The upload contains original coachwork geometry, not licensed high-detail OEM CAD/Blender models. This release builds a real local glTF 2.0 binary pipeline and improves that coachwork. The nine models remain original, reference-inspired approximations, not exact replicas; do not represent this release as photographic fidelity or third-party licensed assets. No external model files were obtained.

## Assets and rendering

- 27 indexed GLB files in `src/assets/vehicles/`, with SHA-256/triangle/byte inventory. Generated reproducibly by `node scripts/bake-realistic-vehicles.mjs`. Each contains a body shell with named material roles, positions, normals, UVs and indices. No runtime network dependency beyond the local game assets.
- Near LOD coachwork uses interpolated body/roof curves, more arch samples, grille inserts, lens strips and door creases. Smooth weighted normals preserve material boundaries and sharp creases. LOD2 retains the lightweight approximate shape.
- GLTFLoader loads same-origin assets asynchronously through `ThreeAssets`. `VehicleAssetScene` reuses geometry and bounded slots; paint and lamps are updated without changing simulation. It only replaces the coachwork, not dynamic wheels/steering, registration digits, reverse/indicator lights, light beams, or collision. Severe damage, service-specific vehicles, failed/unavailable assets and exhausted budget use the existing batch fallback. Legacy vehicles unaffected.
- Three.js materials support the four existing paint finishes. GLB contains base-color/metallic/roughness factors, KHR_materials_clearcoat, normal and UV attributes. High-detail desktop metallic paint adds shared 32x32 procedural normal and roughness/metalness maps. No authored photo textures, no texture atlas/AO/emissive texture files; lighting uses material emissive. No Draco/Meshopt/KTX2 encoders are installed; GLB is indexed but not compressed with those codecs.
- The showroom uses the refined geometry and software depth-buffer rendering when the angle or color changes; no second WebGL context. It is not a full Three.js PBR showroom. The accompanying PNG is an offline geometry preview of LOD0 GLBs plus dynamic wheels, not a runtime screenshot.
- Mobile uses at most one active GLB body; if pixel budget is <=430,000, no GLB body (batch fallback). PC uses 1/2/4 depending on quality. At most two concurrent load requests, at most 27 cached local templates. Reused geometry, bounded cloned materials; cleanup on renderer disposal. Mobile NPCs keep LOD2, the player may use LOD1 if the existing LOD budget permits. Existing FPS targets and weather/audio systems remain. No actual device benchmark.
- Settings shows currently rendered GLB body count, cached assets and load errors. Production renderer needs Three.js r180. Native preview does not execute GLTFLoader.

## Artist asset contract

Future licensed, independently authored replacement assets can be integrated as local GLB files after matching the existing gameplay footprint, +Z forward, Y up, root at ground, zero transforms, and role-named materials `paint`, `glass`, `trim`, `chrome` (optional), `head`, `tail`, `plate`. Body excludes animated wheels and dynamic registration/indicator overlays. Keep per-LOD geometry, UV, bounding and material budgets; update inventory and run real loader tests. Do not include brand logos or third-party assets without appropriate permission. Replacing the generated interim models with high-fidelity meshes remains open.

## Compatibility

No Master Data, save schema, map layout, physics, prices, energy, NPC schedules, audio preferences, backend or migration changes. See QA results for verified status. Native preview is not production acceptance; iOS audio and graphics remain unverified.
