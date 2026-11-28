# V3.18.5 — Professional 3D Modeling Pipeline

**Status: engineering handoff, not professional art delivery.** No new hand-modeled Honda City RS or other professionally authored model is included. The 27 original fallback GLBs are unchanged, and the professional registry has zero entries. Blender is not installed in the release environment; the Blender scripts were syntax-checked only. The offline packer and review gate are independently tested with the old City shell as a QA fixture, never registered as professional art.

## City RS pilot (first approval before the other eight)
Target: 2023-generation Honda City RS exterior for the An Lạc simulation, chosen as an art reference, not a claim of OEM engineering fidelity. Use lawful, consistent front, rear, side, top, and three-quarter references of the same trim/year. Do not mix generations. Compare roofline, windshield angle, hood/boot transitions, arches, shoulder line, RS grille, headlamp outline, rear light signature, spoiler and wheel placement. Model the primary surfaces with clean topology, then details. Do not reuse the original procedural shell as a professional master. Existing game proportions are approximate; if a truthful model cannot fit, request a separate approved gameplay dimension/wheel revision instead of distorting the asset.

### Artist workflow (Blender 4.2+ target, runtime not tested)
1. Optional: create the **empty** workbench with game-unit wheel anchors, bounds and orthographic review cameras. No car mesh is generated:
   ```sh
   blender -b --factory-startup --python-exit-code 1 -P scripts/modeling/create-city-studio.py -- /work/city-studio.blend
   ```
2. Import/attach licensed references in Blender; sculpt a separate `CITY_MASTER`. Keep high-poly source, references and any commercial license documents outside the public web source. Create an exterior-only mesh, then manually retopologize/bake three LOD collections `CITY_LOD0`, `CITY_LOD1`, `CITY_LOD2`. Do not include wheels/tires (game animates those separately), interior or collision proxies in shell collections. Mark explicitly excluded mesh objects with custom property `fz_exclude_shell = true`. Apply transforms, ensure outward face normals, correct UV seams, and check each material role. The exporter bakes object transforms and evaluated modifiers, including mirrored winding. It does not perform automatic retopology, baking, high-poly sculpting, photogrammetry or AI generation.
3. Use seven named surface roles (paint, glass, trim, chrome optional, head, tail, plate). Material aliases are allowed through `materialRoles`. Materials merged into the same role must use one baked UV atlas per role; packer emits one indexed draw group per role. Paint baseColor must be neutral so gameplay tint remains valid. Optional role-specific baked textures: baseColor (sRGB), normal (tangent-space), ORM (R=AO/G=roughness/B=metallic). Use PNG/JPEG; no external files in GLB. Normal map quality requires review with correct tangents in Three.js. Color entries for non-paint materials must be linear RGBA. Texture maps are per LOD; manually bake and resize before export. No Draco, Meshopt or KTX2 decoder in this release.
4. Copy `city-rs.job.example.json` to your own job and fill real provenance, artist-marked source frame and wheel centers. Coordinates in the job use game/glTF axes (+X right, +Y up, +Z front), whereas Blender scene uses +X right, +Z up, -Y front. The template anchors use game dimensions, not measurements of a real car. Set the source frame to the master width, ground-to-roof height and bumper-to-bumper length before normalization. All three LODs must share this frame. If references require a different shape, align or revise game dimensions explicitly; normalization refuses a scale spread greater than 35%. Wheel anchors must be in four quadrants and near existing animated wheel positions.
5. Export evaluated mesh geometry. Copy baked image files to the output job directory and set `lodMaterials[lod][role].maps` paths relative to that directory (e.g. `textures/paint-lod0.png`).
   ```sh
   blender -b /work/city-studio.blend --python-exit-code 1 -P scripts/modeling/export-blender.py -- /work/city-job.json /work/city-extracted
   npm run vehicle:prepare -- /work/city-extracted/job.json /work/city-staged
   ```
6. Packer writes three content-addressed GLBs, `asset-spec.json` and `review.json`; does not modify registry. Validate front/rear/side/3-quarter against references, no wheels in shell, animation clearance, registration/lamps alignment, paint/texture, mobile rendering, rights. Mark the nine review booleans only after actual inspection and add reviewer. The gate checks hash binding to approved GLB bytes and specification; it cannot independently certify the review or legal rights. For final publication, run:
   ```sh
   npm run vehicle:publish -- /work/city-staged
   npm run vehicle:verify
   npm run build
   ```
   The existing V3.18.4 low-level `vehicle:import` remains a legacy manual import, not a substitute for the new review workflow. The new workflow does not disable it. Keep authoring artifacts outside public assets; only approved optimized GLBs and public credits are shipped.

| Target | Triangle limit (shell) | Max image dimension | Max GLB |
|---|---:|---:|---:|
| Master (offline aspiration) | 100k–500k | 4K | Not deployed |
| LOD 0 | 18k | 2048 | 6 MiB |
| LOD 1 | 9k | 1024 | 2 MiB |
| LOD 2 | 4k | 512 | 0.5 MiB |

The game retains the existing mobile max-one-GLB body cap, 24/30/45 FPS target modes and old geometry fallback. No graphics improvement is visible until an approved real model is installed. A future renderer pass may add showroom-only higher-quality assets, compression and wheel/rim-specific assets after device measurement. No commercial rights are implied by authoring or acquiring a file; manufacturer IP and browser redistribution permissions must be considered separately.
