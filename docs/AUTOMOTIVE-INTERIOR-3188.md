# V3.18.8 — Automotive Interior & Animation

## Usage
- Vehicle shop → open a collection vehicle preview → **Xem nội thất**. Inspect the independent cutaway cabin, rotate the view, open/close both front doors and turn the steering wheel slider. The original exterior view remains available.
- While driving any of the nine collection cars in Three.js, press **Cabin** to enter the perspective driving view. Press **Thoát cabin**, the original vehicle camera button, or change camera mode to return to the original world view. The view automatically exits when the player is no longer driving a supported car. In Native Preview, only the cutaway inspection is available.
- In the driving view, joystick/WASD directions are vehicle-relative (reverse gear changes forward input to reverse travel). Map routing and physics remain the original system. Ground click/pinch and orthographic labels are suppressed while the cockpit is active; use the map or return to exterior camera for destination selection.
- Steering spokes track steering angle, digital km/h follows simulated speed, and wipers sweep with rain. Reduced-motion setting parks wipers and snaps inspection doors. The scene uses the existing WebGL renderer, no second context.

## Boundaries
- These are compact original cabin studies, not OEM interiors. The animated front panels are independent in the cutaway showroom, not rigged doors on the actual GLB exterior. No exterior doors, character entry/exit clips, NPC boarding clips, mirror folding, trunk, functional infotainment or cabin damage simulation are introduced.
- The nine collection vehicles are supported; legacy generic vehicles, trucks, buses and motorcycles keep their existing presentation. First-person rendering deliberately replaces the player's static shell with a partial cabin/hood so opaque GLB glass cannot obscure the road.
- Existing 27 GLBs, professional registry, data, save schema, gameplay economy, ownership, collision and audio are retained. No professional model has been added.
- Driving view uses one perspective camera, bypasses post-processing, selects bounded nearby chunks with low detail (45 m mobile/75 m desktop far plane), and builds only the active driver's cockpit. The showroom software render only updates during interaction or the 400 ms hinge animation. Actual browser visuals, camera coverage, controls and device temperature still require acceptance testing.
