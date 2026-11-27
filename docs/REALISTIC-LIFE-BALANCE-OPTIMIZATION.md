# V3.15.0 — Realistic Life Balance & Optimization

Baseline V3.14.0. Save schema 1, urban layout 9, Three.js r180 retained.

## Rules
- Rent paid upfront for 43,200 game minutes (30 days). The new monthly base is 10× the previous daily amount, an affordability choice. Existing paid expiry is preserved; no retroactive debit. Renewal uses the economy quote at the due date.
- Maintenance every 129,600 game minutes (90 days); unchanged base fee, previously stored next due date preserved. Repairs are separate.
- Shared three-disc chassis approximation with a 0.45 world-unit margin. Relative swept checks prevent crossing even when destination points are free; AI reservations avoid simultaneous conflicts. Bus delays preserve the booked trip and passenger timeline. Player automatic movement waits; taxi quote shifts when blocked. Manual impacts remain supported.
- Existing mobile thermal-pressure governor stays in place. The 24/30/45 FPS settings are targets, not device benchmarks.

## Scope and acceptance
The traffic model is still a bounded approximation, not a global rigid-body solver. Scripted NPC positions are guarded in the presentation layer, bus and taxi checks use available actor snapshots, and complete traffic deadlock avoidance is not guaranteed. Broader career, business and investment formulas remain unchanged. No real phone temperature, FPS or Three.js browser acceptance is claimed.

Run `npm test`, `npm run simulate:balance`, `npm run build` and the device acceptance checklist before production release. `npm run build:native-preview` is a separate non-production validation path; it does not replace the Three.js build.
