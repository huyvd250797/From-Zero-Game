import test from 'node:test';
import assert from 'node:assert/strict';
import {fresh} from '../src/game.js';
import {NpcPresentation} from '../src/living-npc.js';
import {COLLECTION,isCabinVehicle} from '../src/vehicle-collection.js';
import {readFileSync} from 'node:fs';
test('real morning NPC schedule supports bicycle and cabin commuter with current vehicle catalog',()=>{
 const rows=new NpcPresentation().update(450,fresh(),1/60);
 assert(rows.some(n=>n.vehicleId==='VEH_BIKE'),'bicycle fixture');
 assert(rows.some(n=>isCabinVehicle(n.vehicleId)),'cabin commuter fixture');
 assert(rows.some(n=>Object.hasOwn(COLLECTION,n.vehicleId)),'new collection is used by named commuters');
 for(const id of ['VEH_CAR','VEH_EV','VEH_LUX','VEH_TRUCK',...Object.keys(COLLECTION)])assert(isCabinVehicle(id),id);
 for(const id of [null,'VEH_BIKE','VEH_MOTO'])assert(!isCabinVehicle(id),String(id));
});
test('production build keeps unit, official Three.js runtime and copied graph verification gates',()=>{
 const build=readFileSync('scripts/build.mjs','utf8');
 assert.match(build,/runStage\('Unit regression tests'/);
 assert.match(build,/runStage\('Three\.js runtime integration'/);
 assert.match(build,/await vendorInventory\(\)/);
 assert.match(build,/\[BUILD FAILED\] Copied Three\.js module graph/);
 assert.match(build,/runStage\('Release integrity'/);
 const config=JSON.parse(readFileSync('vercel.json','utf8'));
 assert.equal(config.buildCommand,'npm run build');assert.equal(config.installCommand,'npm ci');assert.equal(config.outputDirectory,'dist');
});
