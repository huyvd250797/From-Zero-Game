# V0.17.0 — Story & Consequence Engine

## Model
Story_Chapters, Story_Events, Event_Choices are canonical, schema 2.4.0. Chapters are discovered in the order events actually occur; they are not sequential quests. 20 event records (EVT_RELEASE is dormant until rehabilitation mechanics) and 38 choices. Story state is separate from other domains and persisted in schema 1: started, legacy, hadShift, ethics, pending, scheduled, resolved, chapters, history and offenses. Old saves retain all previous systems and start a new narrative log, without reconstructing past choices.

## Triggers
| Event | Condition |
|---|---|
| ARRIVE | New game, day 1 |
| SHIFT | First completed temporary or formal shift; no replay for migrated saves that already worked |
| FRIEND | Known contact with trust >=30 and no conflict |
| CRISIS | Active business, operating debt or loss and working cash <5m |
| PARTY | Current calendar month entertainment >=2m and expenses exceed income; 30-day cooldown |
| HARDSHIP | Day >=3, liquid cash+account <60k and no home |
| GRADUATE | Completed training |
| JOB_LOSS | Dismissal within 7 days, no current contract; 30-day cooldown, new dismissal required |
| FAMILY_STRAIN | Married, family happiness <40; 30-day cooldown |
| DEBT_PRESSURE | Bank overdue principal or interest due; 30-day cooldown |
| RECESSION | Economic recession, 990-day cooldown |
| ENTERPRISE | Active enterprise |
| COMMUNITY | Day >=7, reputation >=40, deterministic hash of name and day; 30-day cooldown |
| RECOVERY | Resolved HARDSHIP or JOB_LOSS, liquid >=300k and housing |
| RETIRE | Age >=60 (reflection only) |
| LEGACY | Age >=70 (reflection only) |
| FRIEND_RETURN | 14 days after CHO_FRIEND_HELP |
| MENTOR | 30 days after CHO_GRADUATE_MENTOR |
| LEGAL | 365 days after CHO_CRISIS_FRAUD |
| RELEASE | Reserved for V0.20.0; not reachable |

Age limits are defined per event. Followups are processed even after age limit, at due time. On game midnight, time simulation scans conditions; UI refresh also scans (including after action completion). No network or wall clock, no automatic modal. 8 ordinary pending events max, followups may exceed that limit (absolute cap 24). Pending events are historical snapshots, remain pending even if circumstances change; business monetary choices are blocked after closure. No automatic time cost for narrative decisions. Some choices change only scores, not actual contracts/skills/house. Free lawful alternative to fraud is always available. No physical meeting required for narrative decisions; ordinary NPC interactions remain proximity-gated.

## Consequences
- Immediate changes to cash (ledger), happiness, health, stress, social reputation, ethics, family happiness where applicable. Help friend: expense 1m, contact trust +5, updates NPC memory; later return event may give 300k. Training connection: optional 150k support at followup. No money granted automatically merely by unlocking events.
- Fictional wrongful business choice: abstract +10m, ethics −20, reputation −5, OFF_TAX narrative record. After 365 game days, one legal risk notice automatically applies −8 reputation and +10 stress, even if normal queue is full. No actual investigation, fine, prosecution, detention or instructions for wrongdoing. No offense erased by cooperation. V0.19.0/V0.20.0 are reserved for law and recovery.
- All cash changes through cashChange. INC_STORY and EXP_STORY plus existing EXP_SOCIAL and EXP_FUN. Repeated choice blocked, cooldown measured from decision, no reset after reload. History 120 entries, resolved counters and offense records persist independently.

## Verify and deploy
`npm ci --offline`, `npm test`, `npm run build`; Vercel Other, Node 22.x, root ./, npm ci, npm run build, dist. No database, SQL or env. Service worker caches story.js. Save export before upgrading; rollback with pre-upgrade save. Tests cover condition gates, migration, finances, trust, deterministic opportunity, delayed consequences, queue pressure and invalid save data. Chromium UI test via import map/blob modules, Canvas fallback and mocked storage; real device WebGL, actual deploy and offline service-worker runtime not verified.
