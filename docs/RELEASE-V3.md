# From Zero V3.0.0 — Advanced Life Simulation

## Scope and compatibility
Baseline: V2.14.0. No change to Master Data 3.1.0, the 384 × 384 map, 65 named NPCs, the 5 GLB assets or Three.js 0.180.0. Save schema remains 1 and legacy saves without `aging.birthYear` use their original age calculation. No backend or migration.

## Continuous generations
At the ending screen select “Tiếp tục tại An Lạc”. The selected heir begins at their recorded age and the previous life's game minute. The world economy and district development derive from that minute; population is cloned from the parent save. The heir receives only their own inheritance share (using the existing transfer ratio) and private cash. Hall of Fame is copied; the personal state starts clean, including employment, education, owned objects, housing, family, relationships, business and planner. The existing legacy choice starts a new timeline at 18. The world clock is bounded by the existing 200 × 366 day cap; continuity is unavailable if insufficient years remain before age 100. Named NPC identities persist, and no new mortality/replacement simulation is introduced. Ages use calendar years as before. No automatic physical transfer of a parent’s house, vehicle or business.

## Verification
- `npm test`: unit and integration-like gameplay tests without GPU.
- `npm run simulate:balance`: 30-day survival in Easy, Normal, Hard.
- `npm run simulate:long-term`: 1,825-day Normal survival with valid save, health 100, economy year >= 5.
- `npm run simulate:balance -- --long`: optional full-lifetime scenario through age 100.
- `npm ci && npm run build && npm run verify:release && npm run smoke:http`: real production dependency, real Three.js integration and exact SHA-256 assets. GitHub Actions `release-qa.yml` automates this sequence plus simulations. Workflow is supplied, not yet executed remotely.
- `npm run build:native-preview`: local fallback QA ONLY. Never deploy `dist-native-preview` as production.

## Release acceptance checklist
1. Run production CI with Node 22 and network access; all unit and Three.js tests must pass.
2. Deploy `dist` on Vercel. Check renderer shows Three.js r180, not fallback, on supported devices. Check startup, NPC rig cache, interiors, motion, transit and graphics restoration.
3. Test on real desktop and iOS/Android: camera, touch, 3D movement, heat, FPS, memory, save recovery and complete inheritance.
4. Install PWA online, then start offline, verify resources, update with active save and confirm previous data retained. Export JSON before testing destructive recovery. Test both existing and new saves.
5. Only call the deployed release production-accepted after completing these steps. Source roadmap completion is not device acceptance.

## Known limits
No NPC replacement/death lifecycle, cloud sync, or new physical construction. The full-lifetime benchmark is one scripted survival path, not coverage of every career/family/business combination. Browser QA in the current environment uses Canvas projection and in-memory storage, not genuine WebGL or installed PWA. Three.js dependency installation is blocked by registry DNS/cache, so production build is not verified here.
