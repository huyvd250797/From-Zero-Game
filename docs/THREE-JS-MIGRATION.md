# V1.2.1 — Three.js Engine Migration

## Baseline and scope
V1.2.0 Immersive City. Keep world.js, Master Data V2.9.0, 28 places, 24 NPCs, 62 buildings, 17 landscapes, collision, navigation, simulation and save schema unchanged. The only renderer geometry change is the optional extraction of roadside trees from the shared makeChunk stream (default remains unchanged for native renderers).

## Renderer selection
`graphicsPrefs` keeps previous `next` token, now automatic Three.js first; existing `legacy` preference remains. `native` explicitly chooses the V1.2.0 renderer. `renderer-select.js` dynamically imports the real Three.js adapter and creates its own candidate canvas. If import/init fails, native renderer gets an untouched canvas; native itself falls back to WebGL 1/Canvas. Actual engine and fallback reason shown in settings. Reload after preference changes, with save protection. Runtime graphics failure uses existing pause/save/export/reload notice; Three.js can switch to native. No claim of transparent hot recovery after GPU context loss.

## Graphics implementation
`three-bridge.js` translates shared triangle streams into positions/normals/linear RGB/UV and grouped triangle indices, maintaining face orientation. `renderer-three.js` creates orthographic camera matching legacy project/unproject equations, grouped MeshStandardMaterial surfaces (7 categories, heuristic mapping inherited), deterministic 64×64 local textures, height-based contact shading (not SSAO), hemisphere/directional lights with clock-dependent emissive glass, PCF shadows, ACES, optional EffectComposer Bloom/FXAA. ResolutionController and 4 preset caps retained. Chunk cache 44 entries; two LODs; static geometry shared; roadside trees InstancedMesh per type/chunk with shared prototype geometry; moving objects use reusable dynamic buffers. Actual FPS and memory need measurement; grouping may increase draw calls relative to native batching.

`three-assets.js` uses official GLTFLoader, same-origin model URL, cache, SkeletonUtils cloning, disposal. The existing local bench.glb is loaded into the scene; on failure use procedural bench. No new character rig, animation clips, draco/ktx2 decoders or complete texture pack yet. AnimationMixer helper can play named clips and blend for V1.3.0; current player animation remains procedural.

## Installation, dependency and PWA
Pinned `three@0.180.0`, MIT. Integrity from two publicly visible lockfiles with identical `node_modules/three` entries (https://github.com/SamG-Coder/ThreeMuseum/blob/main/package-lock.json and https://huggingface.co/spaces/Xenova/fruit-fly-simulation/blob/main/package-lock.json). Package bytes not accessible in the build environment; npm verifies the integrity when installing. No CDN fallback or fabricated module. `npm ci` requires npm Registry access when cache is empty. `npm run build` fails if package missing/wrong version or runtime tests fail. It copies the selected official ESM dependency graph plus LICENSE into `dist/assets/<fingerprint>/vendor/three`, rewrites import map to local modules, imports the copied graph as a sanity check, includes vendor bytes in fingerprint and exact SHA-256 inventory. `dist-native-preview` is explicitly separate, has no production meta or registration of service worker, and is for native QA only; use separate origin from real installed PWA. Never deploy it.

## Test results at handoff
- 383/383 dependency-independent tests pass, including 374 inherited plus 9 migration tests.
- Three runtime integration suite: 5 tests written, not run due missing package. `npm run build` runs this suite as a required gate (real Three revision, module closure, camera projection, geometry, GLB Loader, animation).
- Registry EAI_AGAIN / cache ENOTCACHED. Production build blocked at missing dependency; native-preview build passed. Native preview 56 resources SHA-256 and HTTP integrity passed. No production Three.js cache manifest verified yet.
- Chromium desktop 1200×800 and mobile 390×844 emulation: fallback canvas, 4 presets, selector persistence, modal and no page errors. Blob module graph + localStorage mock, no actual WebGL 2. No Three.js render benchmark or actual PWA installation/offline/real device test performed. 30-day balance same as V1.2.0 (5,180,000/3,050,000/705,000 VND, health 100).

## Vercel acceptance checklist (required before V1.3.0)
1. Export JSON save first. Push full ZIP contents, no dist/node_modules. Vercel Other, npm ci, npm run build, dist, Node 22. Check dependency install and all 5 actual Three runtime tests; do not switch build command to preview to bypass failure.
2. Open production domain on WebGL 2 capable Chrome/Edge. Settings must report `Three.js r180 · WebGL 2`, not native or Canvas. Verify GLB status loaded and roadside instances nonzero in appropriate location. If fallback, record reason and screenshot.
3. Check camera/labels, click-to-move, zoom/rotate/joystick, daytime and nighttime, 4 presets, shadows, bloom/FXAA, textures, bench, city traversal. Native and Legacy explicitly selectable. Test lost context recovery path without losing save.
4. Verify existing save and backups, new save, PWA precache and offline reload, update from V1.2.0 on same origin without data loss. Test Chrome Android/iOS Safari and FPS/VRAM on same scene for native vs Three.js. Performance is not yet benchmarked.
5. Only accept migration when actual renderer and tests are confirmed. V1.3.0 stays Character & Animation; no promise of skeletal player animation in V1.2.1.
