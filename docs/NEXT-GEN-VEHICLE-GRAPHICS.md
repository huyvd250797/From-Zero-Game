# V3.17.0 — Next-Gen Vehicle Graphics

Baseline V3.16.0. Rendering only: existing vehicle IDs, collision/physics, price, sound and city layout are unchanged. Vehicles are procedural and unbranded; V3.18.0 is the planned model-specific collection.

## Shared PBR pipeline

`vehicle-design.js` defines profiles, material roles, paint presets, detail policy and a tiny deterministic environment texture. `vehicle-visual.js` draws lofted, chamfered bodies for existing passenger vehicle types with local +Z forward and existing dimensions; the native renderer uses the same shapes with flat color. `renderer.js` partitions vehicles into a tagged batch only in Three.js mode. `three-vehicles.js` allocates ten shared materials (four paint finishes, glass, rubber, chrome, trim, lamp, emissive), a reusable indexed buffer and a single PMREM environment map derived from a local 128×64 texture. Existing lighting and beam positions remain in `vehicle-lights.js`. There is no real-time reflection of adjacent buildings. Emissive lens geometry is separate from the existing bounded headlight light pool.

Paint is cosmetic; set it in Vehicles → Garage → Paint & finish. Optional `color` and `finish` fields are validated; missing fields in older saves are supported. No money is charged for paint in this release. The garage swatch is a CSS preview, not a 3D showroom. Existing color palettes and gameplay IDs are retained. Plates are stylized graphic marks, not registered unique numbers. Near desktop models include simple seats/dashboard and tinted transparent glass; mobile uses opaque glass. Damage effects are approximate, not physical panel deformation.

## Mobile budget

LOD 0: near high-quality desktop cars; 16 wheel segments, interior and exterior detail. LOD 1: medium desktop or nearby player vehicle on mobile with sufficient budget; 12 wheel segments. LOD 2: far/background or constrained mobile, 8 wheel segments and simplified body. Bus/truck/motorbike retain base geometry with near trim. No new dynamic light pool, texture downloads, shadow map or FPS target. Materials shared across all colors. PMREM generated once, reduced clearcoat and no iridescence on mobile; buffer and materials disposed on renderer shutdown. A fixed number of surface groups (up to ten) trades extra draw calls for actual material separation; real GPU cost still needs device profiling.

## Acceptance

Run `npm ci`, `npm test`, `npm run build`, then `npm run verify:release` and `npm run smoke:http`. Native preview is not Three.js production. Verify near/far cars, night lights, weather, paint color and finish in garage, old saves, and 15–30 minute mobile session. Confirm audible output separately using V3.16.0 diagnostics. Do not delete saved data or bypass production test gates.

### Verified in the release workspace

Focused Node test run: 67/67 (including eight new graphics tests and audio recovery, transport, collision, renderer and release regression). JavaScript syntax and native preview build passed; 146 assets verified by SHA-256 and HTTP. Three.js dependency install failed with `EAI_AGAIN` online and `ENOTCACHED` offline. Production build stopped at dependency inventory; the actual Three integration test was added but not executed. Full unit regression was started, not certified complete at packaging. No device benchmark was performed. No build gates were bypassed.

Sedan triangle counts without damage/animation extras: high 1434, medium 814, low 406; previous low 468. Bus/truck/motorbike low triangle counts remain 636/356/206. These are geometry counts, not measured FPS or thermals.
