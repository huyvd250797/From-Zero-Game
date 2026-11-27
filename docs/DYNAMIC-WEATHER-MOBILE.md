# V3.13.0 — Dynamic Weather & NPC Behavior

Base: V3.12.0, save schema 1, urban layout 9, Three.js r180. No new runtime dependency or network weather API. Calendar and deterministic climate are the gameplay authority; the weather graphics override remains a visual/audio preview. Temperature, humidity, wind, visibility and rain category are derived from the simulation, with a bounded minute cache and six-hour in-game forecast.

## Living world
- Residents with outdoor park/sports leisure plans return home instead on days when the leisure window forecast indicates heavy rain or storm. Planning is fixed for the day to avoid teleporting on weather changes. Work/school and financial state remain canonical. This is not a dynamic nearest-shelter pathfinder.
- Named and ambient outdoor pedestrians display low-poly umbrella geometry in rain. Vehicle occupants do not carry umbrellas. NPC animations remain the existing system; umbrella grip animation and detailed wind physics are not included.
- During active outdoor simulation, every crossed 30-minute boundary applies a small hydration penalty in heat, hygiene/stress penalty in heavy rain. Enclosed vehicles are protected. Modal fast-forward activities do not receive these outdoor penalties.
- AI ambient vehicles and automatic player driving reduce speed with wetness/rain/fog. Manual steering is free, subject to existing physical grip and road constraints.
- On days forecast to have a storm during service hours, bus timetable uses a 0.75 speed factor, extending each leg and recalculating offsets. Same day-specific timetable for route planner, NPC bus, passenger, stop information; unchanged fare/headway/dwell. Daily fixed timetable avoids discontinuous bus position, not live weather-triggered route rescheduling. Existing controlled arrival, yaw and braking profiles preserved. Non-storm days use V3.12.0 timetable.

## Mobile budgets
- Default coarse pointer: balanced (30 FPS); cool (24 FPS); smooth (45 FPS); desktop opt-out. Explicit eco or renderer fallback may cap smooth at 30 FPS.
- All mobile modes cap effective graphics quality at medium (cool at low), disable shadow/bloom/AO/AA. Render DPR <= 0.85/1/1 respectively before adaptive scale; pixels <= 600k/600k/850k. Sustained pressure lowers cap to 24 then 20 FPS, pixels to 430k then 300k, DPR to 0.8 then 0.65.
- Pressure sampled from completed frame spacing and CPU render time; recovery requires five healthy windows. No direct temperature reading. Device temperature, power and frame-rate benchmarks require real-device acceptance.
- Low weather budget, rain particles 90/65/45, overlay target 20/12 Hz, ambient NPC 6/3, simplified ambient geometry rather than skinned rigs, cap vehicle light points to 64 while retaining nearby actual headlight sources. Disable title camera animation, slower HUD update, interior target 24 FPS. Hidden tab render disabled. Gameplay fixed movement step remains 1/60 s.
- Desktop presets retained. Graphics preference storage is independent of character save. No migration.

## Acceptance
Run `npm ci`, `npm run build`, `npm run verify:release`, `npm run smoke:http` with npm registry access. Production gates remain mandatory. See QA results. Test on iOS Safari/PWA and Android Chrome: 15–30 min city drive, rain/night and bus transitions; record FPS, frame time, temperature trend and battery drain. No production rendering or thermal test is claimed from native preview.
