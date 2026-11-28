# V3.18.4 — High-Fidelity Vehicle Asset Integration

## Status: integration framework, not a high-fidelity art delivery
The baseline contains 27 internally generated GLBs. No independently authored professional vehicle asset is included in this release. All nine remain on the original fallback until approved models are imported. Never label the baked fallback as licensed third-party art. No model downloaded, purchased, or licensed in this release.

## Artist handoff
Supply the exterior of the exact requested generation of each model, as 3 GLB 2.0 files, static geometry, +Z front, +Y up, origin centered at ground level. Keep the wheels separate: the game renders rotating wheels, so shell exports must exclude wheels. Align wheel arches to existing game centers ±w*0.46, ±d*0.32, wheel radius 0.28. Use width/depth/roof in `src/vehicle-collection.js`; preserve these game units instead of real-world meters. Verify alignment of existing plates and turn/reverse lamps manually. Apply transforms and triangulate in Blender; export one scene, no animations, no skins, no compression, no external textures. Each material must use one of paint, glass, chrome, trim, head, tail, plate. Include paint (clearcoat), glass, trim, head, tail, plate in all LODs. Use neutral base color on paint for in-game tint. PNG/JPEG textures must be embedded; UVs and unit normals required. Max 12 draw groups, 8 images. Remove branding if rights do not cover it. More detailed source files (FBX, Blend, OBJ) must be prepared/exported first; the CLI is not a decimator or general importer.

| LOD | triangles max (shell) | GLB size max | texture dimension max |
|---|---:|---:|---:|
| 0 | 18000 | 6 MiB | 2048 |
| 1 | 9000 | 2 MiB | 1024 |
| 2 | 4000 | 0.5 MiB | 512 |

## Import
Copy `vehicle-spec.example.json` beside the three normalized GLBs. Edit the id, file paths and provenance, including permission to distribute the browser-delivered model and modify it. A regular marketplace license may not permit distributing raw downloadable assets in a web game. Verify terms and manufacturer IP separately. Do not include credentials, order numbers or private data in this public provenance file.

```
npm run vehicle:import -- /path/to/vehicle-spec.json
npm run vehicle:verify
npm run build
```

All three files are checked before updating the content-addressed registry. The original assets stay intact. The build verifies registered hashes and geometry again. Registry and local GLB files are included in the versioned PWA. Credits appear in showroom. On load failure Three.js falls back to the original shell. Software showroom displays the imported triangles and material colors, not texture/PBR shading. Existing mobile caps remain: at most one GLB body; some NPCs use the old lightweight fallback. No new compression decoder added. Manual visual and licensing review remains mandatory; validator cannot verify actual resemblance/ownership/rights or full glTF compliance.

## Candidate sourcing (not acquired or approved)
- City Mk6, Nieve5677: https://sketchfab.com/3d-models/honda-city-mk6-hq-interior-f8580ca731e9402f9fe014863115f0af — page lists CC Attribution; generation check required.
- Civic 2022, Ricy: https://sketchfab.com/3d-models/honda-civic-2022-free-download-d5ca29a5d2f341b691118ffb5560b19b — page lists CC Attribution, ~63k tris; retopology required.
- Fortuner 2021, Asadawut.Kaewma: https://sketchfab.com/3d-models/toyota-fortuner-2021-a70b997f11b7482e9affbf318a508f85 — page lists CC Attribution.
- K5 2025, UZBEK 3D: https://sketchfab.com/3d-models/kia-k5-2025-1fa025db826442f18db0401757f5695a — CC Attribution on page, ~295k tris; verify generation and optimize.
- VF6: https://3dmodels.org/ja/3d-models/vinfast-vf6-2024/ — vendor candidate, license must be checked before purchase/distribution.
- VF7: https://hum2d.com/clipart/vinfast-vf7-2024/ — vendor candidate, license must be checked before purchase/distribution.
- VF8: https://www.cgtrader.com/3d-models/car/suv/car-vinfast-vf32 — vendor candidate, generation and license must be checked.
- K3 and Vios: no vetted correct-generation source yet; commission original models or supply licensed files.

No external service calls at runtime. Sketchfab download attempt from this environment failed DNS. No third-party downloads occurred.
