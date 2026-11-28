# V3.18.7 — Premium SUV & EV Collection

Four revised **original interim** coachwork designs, not professional artist models or OEM CAD. Toyota Fortuner 2021 facelift; VinFast VF6, VF7 and VF8 2024 Plus are art targets, not certified model years or trim fidelity.

- Fortuner: tall roof, more upright rear glass, multi-bar front grille, rails, chrome bumper accent.
- VF6: compact rounded roof, upright split lower headlamps, short nose, curved rear glazing.
- VF7: lower swept roof, angular wheel opening, longer taper, sharper V light line and low lamps.
- VF8: taller wide roof, central panoramic glazing, wider headlamp profile and different lower bumper.
- Shared improvements only for these four: separated pillars, frame strips, cladding following the lower body sections, front/rear fascia points projected onto shell sections, repositioned mirrors, rear bumper trim. Three LODs re-baked in GLB and native assets. Panoramic glass is exterior-only, not an animated roof.
- Physics, energy, AI, dimensions, mobile limits and all 15 sedan GLBs unchanged. Existing 27 interim GLBs remain; professional registry is empty.

## Artist workflow

Use `blender -b --factory-startup --python-exit-code 1 -P scripts/modeling/create-suv-studio.py -- VEH_VF6 vf6-studio.blend` (other IDs: VEH_FORTUNER, VEH_VF7, VEH_VF8). This produces an EMPTY guide workspace. See corresponding `*.job.example.json` and existing modeling README. Add lawful references, sculpt master, author three LODs, bake PBR maps, export, prepare, visual-review and publish. Rights flags default to false. Blender runtime not available in the current build environment.

No professional 3D artist assets have been sourced or created. Visual likeness remains approximate. No new interior or door animation; no device FPS or thermal certification.
