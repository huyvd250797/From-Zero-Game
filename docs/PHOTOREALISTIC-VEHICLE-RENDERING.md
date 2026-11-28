# V3.18.9 — Photorealistic Vehicle Rendering

This release improves rendering, not the underlying reference-inspired vehicle geometry. There are still 0/9 professional imported models. No photorealistic claim is made.

- `automotive-rendering.js`: deterministic 256×128 linear synthetic HDR, 9 wetness levels, PBR paint/glass/chrome/rubber/trim profiles, bounded lamp parameters and CPU studio lighting.
- `three-vehicles.js`: shared half-float environment converted to PMREM once per renderer, LDR fallback if creation throws; scalar wetness updates in place. No realtime city reflections. `three-vehicle-assets.js`: same paint response for loaded body shells, existing shared metallic texture enlarged to 64×64 on high desktop LOD only; imported nonpaint texture maps preserved.
- `three-weather.js`: existing light pool retained, smaller lens proxy and wet glow footprint. Existing shadow and post-processing policies retained. No new shadow maps or WebGL context.
- Showroom: load validated local LOD0 GLB (external model preferred, local fallback), interpolate vertex shading in CPU z-buffer, choose Studio / Night / Wet. This is a lighting approximation without full PBR texture sampling. No second WebGL context; draw on interaction only. In case of loading failure use geometry fallback. Cabin unchanged.
- Diagnostic Settings: environment mode and quantized wetness. Weather effects off disables wetness updates.
- No rain droplets or wiped windshield texture, HDR photo, real raytracing, new cabin illumination, or professional model. Existing 27 GLBs remain byte-identical. Mobile clearcoat <= .35, no iridescence; existing LOD/asset budgets remain unchanged. Real device FPS, GPU memory, heat and visual quality not measured.
