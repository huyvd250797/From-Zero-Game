import {fresh,perform,validate,activities,unavailableReason} from '../src/game.js';
import {advanceTime,day,hhmm} from '../src/life.js';
import {places,walkable} from '../src/world.js';
import {planRoute,routeLength} from '../src/navigation.js';
import {balanceSheet,report} from '../src/personal-finance.js';
import {record} from '../src/master-data.js';
import {livingQuote} from '../src/economy.js';
const routes=new Map();
const go=(s,p)=>{const place=places.find(x=>x.id===p),dest={x:place.door[0],z:place.door[1]};const key=JSON.stringify([s.pos,dest]);if(!routes.has(key)){const route=planRoute(s.pos,dest);if(!route)throw Error('route');routes.set(key,Math.ceil(routeLength(s.pos,route.path)/6));}const mins=routes.get(key);advanceTime(s,mins);s.pos=dest;};
const act=(s,p,id)=>{go(s,p);if(!perform(s,p,id))throw Error(`${s.difficulty} D${day(s)} ${hhmm(s.minutes%1440)} ${p}/${id}: ${unavailableReason(s,activities[p].find(a=>a.id===id))} ${JSON.stringify({cash:s.cash,hunger:s.hunger,hydration:s.hydration,energy:s.energy,health:s.health})}`)};
const until=(s,t)=>{if(s.minutes<t)advanceTime(s,t-s.minutes);};
export function starterScenario(mode='DIF_NORMAL',days=30,{progress=false}={}){const s=fresh('QA',mode);for(let i=0;i<days;i++){const start=i*1440;until(s,start+420);if(s.rentUntil<=s.minutes&&s.cash>=livingQuote(s,record('PROP_ROOM').rentMonthly)+150000)act(s,'room','rent');act(s,'park','free_water');act(s,'park','wash');act(s,'shop','meal');act(s,'shop','work');act(s,'park','free_water');act(s,'shop','meal');act(s,'cafe','cafe_shift');act(s,'park','free_water');act(s,'park_east','walk_park');act(s,'shop','meal');act(s,'park','wash');act(s,'park','rest');act(s,'park','free_water');if(s.rentUntil>=start+1350+480){go(s,'room');until(s,start+1350);if(!perform(s,'room','sleep'))throw Error('sleep: '+unavailableReason(s,activities.room.find(a=>a.id==='sleep')));}else{go(s,'park');until(s,start+1350);if(!perform(s,'park','shelter')||!perform(s,'park','nap'))throw Error('shelter');}if((i%365===364||i===days-1)&&!validate(s))throw Error('invalid save after day '+i);if(progress&&i%3650===3649)console.log('year',Math.round((i+1)/365),s.cash,s.health,s.wellness.nutrition);if(endingDue(s)){if(!endLife(s)||!validate(s))throw Error('invalid ending');break;}}return s;}
import {endingDue,endLife} from '../src/aging.js';
import {pathToFileURL} from 'node:url';
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){const long=process.argv.includes('--long');for(const mode of long?['DIF_NORMAL']:['DIF_EASY','DIF_NORMAL','DIF_HARD']){const s=starterScenario(mode,long?30000:30,{progress:long});console.log(JSON.stringify({mode,cash:s.cash,minutes:s.minutes,health:s.health,nutrition:s.wellness.nutrition,mental:s.wellness.mental,sleepDebt:s.wellness.sleepDebt,conditions:s.wellness.conditions.length,ending:s.aging.ending}));}}
