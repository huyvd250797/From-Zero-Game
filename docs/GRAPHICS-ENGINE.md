# V1.1.0 — Next-Gen Graphics Engine

## Architecture
`renderer-next.js` implements a WebGL 2 adapter while retaining `renderer.js` for legacy WebGL 1 and Canvas 2D. Both share the canonical static chunks, dynamic geometry, camera projection and simulation data. The adapter tries a separate cloned canvas so a failed WebGL 2 initialization does not consume the legacy context on the original canvas. The selected canvas is bound to the existing controls. `graphics.js` handles preferences, presets, adaptive resolution, sun and material vertex conversion. `graphics-assets.js` provides a limited static GLB 2.0 loader. The original bench asset is in `src/assets/bench.glb` and is included in fingerprint and SHA-256 precache. No external downloads are required at runtime. No changes to world collision, pathfinding, save schema or gameplay.

## Graphics presets
|Preset|FPS cap|DPR cap|Default shadow|Contact shading|Bloom|Post AA|
|---|---:|---:|---:|---|---|---|
|Low|30|1.0|Off|Off|Off|Off|
|Medium|60|1.25|1024|On|Off|On|
|High|60|1.5|2048|On|On|On|
|Ultra|60|2.0|4096|On|On|On|
Hardware maximum caps shadow and framebuffer sizes; on failed target allocation the effect is disabled. Preset changes reset overrides. Old prefs 0/1 map to Low/Medium. Render scale has preset-specific lower bounds (0.65/0.70/0.75/0.80) and updates only on active gameplay render timing, with 2-second windows and slower recovery. FPS caps are not benchmarks. Fallback uses legacy 2 quality levels and does not expose unsupported WebGL 2 controls.

## Rendering
- Shared vertex stream positions/colors + normals/material indices. Seven heuristic surface groups (concrete/general, asphalt, paving, glass, dark metal, wood, vegetation); shader patterns are procedural, not imported texture/normal maps. Colors and geometry remain stylized low-poly.
- Directional sun, sky ambient, microfacet-inspired diffuse/specular, tone curve, day/night window emission. No full PBR environment maps, real local lights or weather engine.
- Real depth texture shadow pass with 3x3 PCF, camera-relative orthographic shadow region. Contact shading based on height is not screen-space AO.
- Basic screen-space brightness spread and edge smoothing. No full HDR bloom chain, temporal AA or full color grading pipeline.
- Chunk frustum filtering, shared/batched geometry, bounded cache, reusable dynamic buffer, VAOs, framebuffer cleanup on resize and explicit dispose. No hardware instancing yet. GLB parser supports one uncompressed static mesh with one node, POSITION float32 and optional unsigned 16/32-bit indices, material baseColorFactor. No glTF JSON files, transforms, animation, texture mapping, skinning, external buffers or compressed extensions. Original sample is a bench placed as decorative geometry; procedural substitute on failure. No collision changes.

## Verification
Node regression, graphics tests, SHA-256/HTTP build check and survival simulation. Chromium in this environment cannot create WebGL 2 even with software renderer requested; UI tested in Canvas fallback on desktop/mobile with module build and mock localStorage. The six GLSL shaders were compiled and three programs linked on Mesa OpenGL ES 3.2 llvmpipe. Separate GLES harness rendered canonical city geometry, player/NPCs and bench using real scene/depth shaders. Screenshots are isolated GLES test output, not browser screenshots, and do not establish browser renderer integration or FPS. Post-processing shaders compile/link; no full browser post-processing test. Real browser WebGL 2, actual GLB fetch/render in browser, GPU context recovery, performance/VRAM, PWA install/offline, Safari/Edge and Vercel deploy remain to verify.

## Acceptance on target devices
Export save JSON first. On the same domain deploy the ZIP; open Settings, verify WebGL 2 Next-Gen on compatible device and GLB status, try Low/Medium/High/Ultra, enable/disable effects, zoom and move/rotate camera, use map clicks/route and NPC/vehicle actions. Observe frame time, draw calls and scale in Settings. Check day/night transition, switch Legacy and reload, verify save/backup and update/offline. If renderer fails, export and reload Legacy. Keep V1.0.0 source as rollback and same save origin. Do not clear browser data.
