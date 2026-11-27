# V3.16.0 — Audio Engine Recovery

## Changes
- Web Audio remains default. Preview audio survives the silent settings scene for 1.65 audio-clock seconds. Repeated tests cancel prior voices. Optional panner failure no longer aborts the graph. Trusted touchend/pointerup/click requests playback session on browsers supporting navigator.audioSession.
- Explicit HTML Audio fallback reuses a single media element and does not require AudioContext. Eight original mono PCM WAV files are bundled and included in the release integrity inventory. `scripts/generate-audio-fallback.py` regenerates them using NumPy (not required for build). Fallback plays a single selected scene layer; it is not a polyphonic spatial mixer and horn is available as a test, not a simultaneous traffic event. iOS may ignore programmable media volume; use hardware media volume.
- Dedicated controls for engine, horn, NPC conversation, environment, weather, music, activity and UI, plus master. Existing values migrate without changing save schema. Nearby engines include idle, use a higher filter cutoff to improve small-speaker audibility, and remain bounded to two slots. Cues remain bounded to 20 voices. The synthesized NPC conversation is not intelligible recorded speech.
- PWA caches support WAV byte-range responses (206/416) after the full release asset is integrity-checked. Local preview server also serves WAV ranges. No external audio service.

## iPhone acceptance procedure
1. Deploy using npm ci and npm run build; accept the new PWA update, confirm V3.16.0. No need to delete app data or reset game.
2. Settings > Âm thanh & nhạc nền: enable audio, set master and UI volume high. Select Web Audio and tap Bật / nghe thử. Record whether a tone is audible, context state and signal level. A running context or nonzero RMS does not prove audible device output.
3. If no tone, tap Thử HTML Audio. Record whether playback advances (seconds and readyState in diagnostics) and whether tone is audible. Try each engine, horn, NPC and rain button.
4. Return to game, approach moving vehicles and talking NPCs. On Web Audio, multiple layers can play; on HTML Audio only the prioritized scene layer plays.
5. Test after app switching and screen lock. Use hardware media volume; check silent mode and Bluetooth output route. If no audible output in either backend, send screenshot of diagnostic text and report whether other apps play audio. Do not delete game data.

## Release gates
- Focused test suite 43/43 passed on Node 22.16.0, including nine newly added tests (four audio graph/mixer tests, five media/range tests).
- Native Preview 144 assets, SHA-256 and HTTP validation pass. Local HTTP WAV range returned 206. Chromium localhost blocked by administrator. No audible device acceptance performed.
- Production build blocked by missing Three.js 0.180.0; npm offline ENOTCACHED. No build gates removed. Full unit regression is not certified on this release unless separately completed.
