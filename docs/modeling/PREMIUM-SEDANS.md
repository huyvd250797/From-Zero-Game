# V3.18.6 — Premium Sedan Collection

Actual delivery: four revised original, reference-inspired sedan exteriors; NOT commissioned high-fidelity assets, CAD or photo scans. The approved professional registry remains empty. Honda City RS pilot is still not professionally authored. No Blender runtime or 3D generation service was available. The source geometry is still algorithmically built from explicit per-model profiles. Do not treat this as photo-realistic or as an approved replica.

| Vehicle | Target generation | Distinct art direction |
|---|---|---|
| Civic | 2022 RS | Lower bonnet, extended sloping rear glass, horizontal upper grille, discrete rear lights |
| K3 | 2022 facelift | Tiger-nose grille, angular lamps, horizontal rear strip, separate side pillars |
| K5 | 2022 DL3 | Fastback roofline, wide grille, angular lamp signature and rear strip |
| Vios | 2023 facelift | Compact taller cabin, narrow upper and broad lower grille, separated tail lamps |

All retain existing gameplay dimensions, animated wheels, paint tint, lamp roles, damage behavior and save IDs. Revised GLB shells and native fallback use the same authored profile. Mobile limits unchanged. Existing non-target 15 GLBs are byte-identical. No license to distribute manufacturer intellectual property is implied.

## Artist handoff
Four job templates in this directory (civic, k3, k5, vios) plus `sedan-studios.json` carry existing game-unit dimensions, wheels and target reference generations. Use actual legally sourced references before creating a model. To create an EMPTY workbench in Blender:

```
blender -b --factory-startup --python-exit-code 1 -P scripts/modeling/create-sedan-studio.py -- VEH_CIVIC /work/civic-studio.blend
```

Supported IDs: VEH_CIVIC, VEH_K3, VEH_K5, VEH_VIOS. Follow modeling/README.md for extraction, preparing and review-gated publication. All templates deliberately have blank rights declarations and cannot be published unmodified. Retopology and texture baking still require the artist. Do not register the revised fallback models as professional artwork.
