# V3.19.0 — Police & Public Security

All service names, police procedures and fees are fictional game mechanics in An Lạc, not a representation of current Vietnamese legal procedures. This release extends the existing law, traffic and emergency-service implementation. It does not add camera-based enforcement.

## Patrol units

- CSGT 01: white CB250P-inspired motorcycle using the canonical `VEH_MOTO` chassis. Additional fairing, windscreen, panniers, lights and an approximate uniformed rider are rendered in the common vehicle geometry layer.
- Tuần tra 02: white Lux A2.0-inspired sedan using `VEH_LUX`, stripe and lightbar. Both designs are interim original geometry, not exact OEM models or professional GLB assets.
- Two closed, collision-checked routes begin at (125,105) and (131,105) near the existing police station (door 128,105). Their lengths are approximately 140.67 and 142.88 world units. Regular patrols obey ordinary traffic rules and do not flash lights or play sirens. Shift labels rotate 06–14, 14–22, 22–06; vehicle identity and simulation continue across the shift boundary. There is not yet a separate named-officer household/career schedule, parking/handover animation or a separate CSGT building.
- Replace the two old generic police slots rather than increasing the peak AI fleet. The tested peak sample contains 32 traffic actors including both units and all nine civilian collection models. Existing clearance and adaptive rendering still apply.

## Player workflow

Open Phương tiện & giao thông → Dịch vụ đô thị → Công an & CSGT, or interact with the existing police station. Accident records also provide a link to the accident report category. Choose Tai nạn giao thông, Sự cố an ninh, or Hỗ trợ tại hiện trường. Submit a local report at the station, or request a response to the player's current position while on foot. Only one city dispatch can be active (shared with tow and ambulance). Report acceptance/cancellation is recorded, not a fine or conviction. The scene request has no fee. The location of an old accident is not automatically reused: remote dispatch targets the current player location.

The responding car starts at the station, follows the existing road-route and scheduled motion system, and has priority while travelling. Existing AI yields safely where possible; collision clearance still applies. UI completion requires the ETA to have elapsed AND the actual rendered service actor to be within 4 world units of the scene; player also must remain within 4 units. If blocked, the UI displays waiting/approaching; cancel and re-request if the route cannot clear. The shared scripted service routing is not a full real-time dispatch/path replanning system. Ordinary police patrols use existing proximity-based law enforcement; no additional traffic-stop dialogue, automatic accident detection/dispatch, investigation AI or police career in this release.

## Audio and rendering

A synthetic two-tone siren is played through the existing horn volume group in Web Audio, with spatial attenuation; the HTML Audio fallback has a bundled 16-bit mono PCM siren WAV and selects it only for an audible priority police actor. No new WebGL context or dynamic light pool. The police station retains its canonical footprint with added CSGT signage. The original 27 vehicle GLBs and all other GLBs are unchanged.

## Compatibility / QA

Save schema 1 and urban layout 9 unchanged. `cityServices.security` is an optional extension; old saves without it are accepted and it is created on report write. New reports are bounded to 60, and an in-flight police report is tied to the dispatch ID, position and time. No database migration or environment variables. Master Data is unchanged. Historical saves remain forward-compatible; do not assume a new save with an active police dispatch can be read by older versions.

139 focused Node tests passed, including 8 new police tests; native preview syntax and integrity 190/190 and HTTP 190/190 passed. Production `npm run build` stops at missing Three.js r180; offline npm install reports ENOTCACHED. Chromium navigation to local server was blocked by administrator policy, so actual browser UI, WebGL Three.js, device audio and performance acceptance remain pending. Full unit suite was not rerun in this release. No gates were disabled.
