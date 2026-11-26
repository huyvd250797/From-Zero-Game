import {performance} from 'node:perf_hooks';import {places,spawn,findPath,routeCacheSize} from '../src/world.js';
const routes=places.map(p=>({x:p.door[0],z:p.door[1]}));function run(rounds){const t=performance.now();for(let i=0;i<rounds;i++)for(const p of routes)findPath(spawn,p);return Math.round((performance.now()-t)*100)/100;}
console.log(JSON.stringify({routes:routes.length,coldMs:run(1),warmQueries:routes.length*20,warmMs:run(20),cached:routeCacheSize()},null,2));
