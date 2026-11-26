# V2.7.1 — Smart Mobility & Rig Cache Stability Fix

Reported production failure: `tests/three-runtime.integration.mjs:29:495` — reading `rig` from an undefined actor after all projected NPCs leave the viewport.

Root cause: the previous fixture projects all NPCs to the same visible pixel. At minute 450 with fresh state, 65 named NPCs are present, 29 without a vehicle. `CharacterScene.update` intentionally limits retention to 16 additional offscreen rigs and removes expired rigs after 6 seconds. When the fixture projects the entire crowd offscreen, the original first actor can be evicted. The old assertion assumes that actor must survive, conflicting with the existing memory policy. This is an integration test regression, not evidence of a runtime crash.

Fix: isolate NPC_LAN for the brief offscreen reuse contract, assert reuse and visibility explicitly, then assert expiration. Add separate actual Three crowd test asserting bounded hidden cache, eviction, recreation and disposal; add rider visibility test (bike appears only when selected vehicle is rendered; car occupant remains hidden). No change to `src/three-character.js`, game state, navigation, population, or master data. Build still runs all unit and actual Three integration tests and verifies the vendor graph. No test skipping, mock Three module or weakened gate. No SQL migration.

Validation: npm test, native QA build, archive integrity. Actual Three integration/production build requires npm ci. In this environment offline installation fails ENOTCACHED and online installation fails EAI_AGAIN. The new Three integration tests must run on Vercel or a machine with the pinned package installed.
