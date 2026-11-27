# V3.1.0 — Premium Identity & UX

Baseline: uploaded FromZero V3.0.0 Advanced Life Simulation, schema 1, Master Data 3.1.0. Presentation-only release, no dependency or database migration. Keep V3.2+ gameplay scope unchanged.

## Identity
- `src/assets/brand/fz-ascend.png` is the exact approved 1254×1254 PNG (SHA-256 `a6fceb4bfc538f006bb19e790195dc00b0b6481ab2baab680bbb2fbbf39014a5`). The title, splash and HUD reference that same versioned asset. PNG 192 and 512 are Lanczos resizes; maskable 512 adds safe-zone margin. The old SVG favicon route is retained as a self-contained embedding of the resized PNG; HTML uses the PNG directly. Manifest identity/scope/start URL unchanged.
- Emerald Glass design tokens in `src/premium.css`, champagne primary actions, ivory text, accessible focus rings, shared SVG quick icons. No external fonts or network assets. Keep existing status colors.

## Boot and menu
- `boot.js` imports the game and surfaces module/renderer errors with Retry (reload, no data deletion). Three actual stages: module graph, renderer and initialization, first rendered world frame. No fake timing or forced delay. Loading also covers opening new, imported, restored and inherited lives through the existing `start` path; ended/custody/save-failure branches dismiss it without waiting for a blocked world render.
- Main menu uses existing city renderer, slow visual-only camera and lighting cycle, capped at 15 FPS. Low/Eco/Canvas fallback/reduced-motion render a static view; resize/settings changes invalidate it. Allow at most 12 settling frames for pending Three chunks. No simulation clock or save changes from the title preview. Menus pause preview. The main menu exposes direct Save Management, reusing guarded import/restore/export/PWA actions rather than duplicating save logic.

## Camera and HUD
- Preserve exactly eight controls in order: `overview` (city overview), `mobileMap` (city map), `rotateL`, `zoomOut`, `zoomIn`, `rotateR`, `tiltDown`, `tiltUp`. No crosshair inside panel. Keep camera mode and HUD toggle. On phones the expanded dock spans available width; 8 equal-width CSS grid columns, single row, no horizontal scrolling. On desktop the city-map control is also visible.
- `follow` remains the original camera follow operation but is a separate HUD button. F shortcut preserved. Interior has independent focus button, disabled in decoration edit mode. Focus changes camera only, not character location, route, money or simulation time. Existing third-person vehicle-camera upgrade remains scheduled for V3.8.0.
- Existing quick actions and need thresholds retained; compact SVG icons, wider Vietnamese labels, safe-area-aware layout. Modal headers remain sticky; root close actions (and preceding primary where adjacent) grouped into sticky footer, existing avatar/room footers retained. Custom full-screen interior/activities preserved. Not every module has a separate footer if it only has context-specific actions.

## Acceptance
- `npm test` and `npm run build:native-preview`; verify and HTTP smoke on `dist-native-preview`. Do not deploy native preview.
- Desktop 1280×800 and mobile 390×844 Chromium QA using built modules with blob import map and mocked storage (loopback navigation was blocked by browser policy). Verify logo/splash, title, continue, save manager, camera layout and overview/focus/map, menu scroll with visible header/footer. Widths 320/360/390/430 and landscape 844×390 checked across browser QA passes. Canvas fallback only, not actual GPU or installed PWA. 320 px buttons are ~35 px wide, 44 px tall; fixed one-row layout is prioritized over 44 px width for all 8 controls. Device safe areas and iOS need real-device verification.
- `npm ci` offline was ENOTCACHED; online registry DNS EAI_AGAIN. Production build must still require real Three.js r180 and existing integration tests. GitHub release QA workflow preserved. No claim that GPU FPS, animated Three menu, actual PWA installation or all module UI layouts were fully tested. No deploy performed.
