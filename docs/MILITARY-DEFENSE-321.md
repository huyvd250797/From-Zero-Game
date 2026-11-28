# V3.21.0 — Military & National Defense

Non-combat life-simulation module. All eligibility, pay, service duration and ranks are invented for An Lạc, not Vietnamese legislation or medical advice.

## Controls
- Open Phương tiện & giao thông → Dịch vụ đô thị → Quân sự & quốc phòng, or interact with Ban chỉ huy quân sự / Doanh trại.
- HQ (96,169): walk to the door during 07:00–16:00, check game health (≥60), age 18–45, then choose service or career. Screening valid 7 game days. Existing civilian employment must be ended. Neither enlistment mode is mandatory.
- Base (96,189): one non-combat duty each day, 07:00–16:00, subject to needs and existing 8-hour work cap. Fitness 60 min / 20,000; logistics or community assistance 120 min / 40,000. Professional career earns twice those amounts. Cash is recorded as INC_WAGE. Duties use time and energy; no automatic pay for idle days. Ranks are fictional progression labels (8, 20 duties).
- Service ends automatically after 30 game days, provided no earlier medical/custody exit. No repeated completed service. Career can be ended at HQ; no civilian contract or casual shift during active military service. The system never locks movement or forces residence.
- Military history is bounded at 30 records, with a persistent completion flag. Old schema-1 saves without the optional cityServices.military extension remain valid. No database migration.
- Olive supply truck replaces AI:0:0, follows a short closed route near the base; normal traffic physics, no emergency priority. No armed vehicles or weapons. This is an approximated vehicle model, not a professional external asset.

## Limits
Schedule is a reference timetable; duties are menu-based, not an interactive physical training minigame. No separate military residential interior, player uniform, independent military personnel NPC lifecycle, combat, automatic emergency deployments, or official military rank/benefit system. No changes to the frozen Master Data, layout footprint, or existing GLBs. Production Three.js and browser/device acceptance are separate from Native Preview.
