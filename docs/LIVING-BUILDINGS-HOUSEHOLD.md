# Living Buildings & Household — 3.14.0

## Household
Existing interiors, family, furniture, household bills and cooking are retained. Food can move between bag and storage for each residence, with 12 portions normally and 30 with refrigerator. Perishables expire after 1 game day or 3 refrigerated days; other foods after 30 days. Cleaning and laundry take 20 game minutes, with a 12-hour cooldown. Indoor family figures use time-based activity locations. This is not a full utility-meter or autonomous indoor simulation.

## Transit
Planned service window 06:00–20:00, one departure slot per direction per 60 game minutes, staggered by route/direction. A trip is activated by an eligible named resident commute reservation or a paid player reservation. No synthetic random passenger list. The 18-minute platform reservation spacing check is best effort; delays or provisional multi-leg reservations can still change actual gaps. Trips finish at the terminal; delayed active trips may finish after closing. Named NPC participation is a subset of eligible commuters, not a full population transit economy. Bus movement holds before intersecting the player and resumes when clear. Own bus is excluded during boarding/riding. Delays are shared with the journey timeline; missed transfers attempt rebooking.

## UI and road safety
Map zoom 100–500%, pan, place search/type/district filters, precise click/tap selection and explicit navigation. Nearby-only city labels; GPS compact at upper right. No fine cameras; patrol and other traffic rules remain. Red-light override is a game-only action, with a guarded detour on suitable multi-lane roads when clear; otherwise wait. Road actor protection is partly a presentation guard, and not a complete collision solver for all agents. The displayed aggregate vehicle condition is the rounded mean of five parts; breakdown below 10% only.

## Performance and acceptance
Retain mobile 24/30/45 FPS budgets and 24 FPS interior target. No device thermal measurements or live browser acceptance. Production needs Three.js r180. Save schema remains 1; new optional household state is initialized when needed.
