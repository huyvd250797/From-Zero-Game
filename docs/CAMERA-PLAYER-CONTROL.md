# V1.4.0 — Camera & Player Control

## Modes
- Toàn cảnh: centers An Lạc and fits the map to viewport at preset elevation; user may zoom/rotate afterward.
- Theo nhân vật: standard tracking. F resets tracking zoom and elevation.
- Cận cảnh: orthographic close view, 4.8x desktop / 6.2x mobile. Camera pitch defaults to 24° and rises when building footprints block the line of sight. If the maximum elevation of 82° cannot clear a building, the player label reports occlusion. This is not a roof-cutaway, transparent building, or full physical camera collision system.
- Tự do: pan anywhere in map bounds; moving actor or route no longer forces tracking. Minimap focus switches to free.

## Inputs
WASD/arrows and joystick move; Shift/run button run; E interact; B mount/park; C toggles close/follow; F follow; Z/X rotate; Q/R pitch; V toggles auxiliary HUD; Space pause; Esc cancel route or dismiss modal. Wheel zoom; left drag pans except in close mode (orbit); right drag or close-mode swipe orbits; two-finger pinch zoom and twist rotate. Single tap routes using last rendered projection; drag/pinch/cancel cannot generate a tap. Pause still permits camera adjustment but not movement. Modal/blur/custody/save conflict clears input. No change to route collision or pathfinding.

## Architecture
`camera-control.js`: pure controller and pointer gesture state; common camera basis. All renderers share projection; Three orthographic camera spec, both native GLSL paths and Canvas depth sort use pitch. Reduced-motion preference snaps camera instead of interpolating. Occlusion only uses existing building footprints, not individual decoration meshes; no perspective, roof fading or interior changes in this release. Camera state is session-only, does not modify save schema.

## Release verification
`npm test` (406), `npm run check`, `npm run build:native-preview`, `node scripts/verify-release.mjs dist-native-preview`, `node scripts/smoke-http.mjs dist-native-preview`, `npm run simulate:balance`. Native QA is not production. `npm ci` then `npm run build` require real Three.js r180, vendor graph and eight integration tests. Local npm DNS EAI_AGAIN prevents true production build. Validate on deployed iPhone and PC: select modes, rotate/pitch/pinch, tap routes, move while free, hide/restore HUD, blocked player indicator, save/reload, offline. V1.3.0 iPhone screenshot confirmed real Three.js previously, not V1.4.0. No deploy performed.
