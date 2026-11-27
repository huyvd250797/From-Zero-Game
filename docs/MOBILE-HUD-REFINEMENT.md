# V3.1.1 — Mobile HUD Refinement
Baseline V3.1.0. Supplemental patch, not a new V4 roadmap milestone.

- On mobile, camera / vehicle / focus use 44×44 CSS pixel controls in a fixed right column, spaced 6 px apart. Focus is a gold circular target icon and shares the taskbar's centerline; run is a gold running-person icon in the opposite bottom corner (left), following the previously approved visual layout. The last textual request mentions right for both run and focus, so the chosen left location avoids a collision and follows the image.
- Camera mode picker and all eight original controls remain; expanded camera panel remains responsive. The interaction control uses a door/action icon, with context retained as accessible name and title. No hand-pointer icon. No new taskbar actions. Vehicle context visibility remains unchanged.
- Vehicle icon is gray on foot and green while actually mounted, never an independent toggle. Explicit successful mount/dismount via the existing handler shows a separate 1.8-second non-modal live-status toast; no notification journal entry. Guard paused, ending, custody, transit, save conflict and graphics-loss states. No automatic mounting feedback spam.
- Same game data, simulation, logo assets, schema, dependencies and production gate. Canvas fallback browser QA is not Three.js GPU or real iPhone acceptance.
