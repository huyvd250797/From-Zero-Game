import assert from 'node:assert/strict';
import {starterScenario} from './simulate-balance.mjs';
import {validate} from '../src/game.js';
import {calendar} from '../src/life.js';
import {cityStatistics} from '../src/city-evolution.js';
const s=starterScenario('DIF_NORMAL',1825);
assert(validate(s),'long-term save must remain valid');
assert.equal(s.health,100);assert(s.cash>0);assert(cityStatistics(s.minutes).year>=5);
console.log(JSON.stringify({days:1825,calendar:calendar(s),cash:s.cash,health:s.health,city:cityStatistics(s.minutes)},null,2));
