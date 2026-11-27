// Run with the extracted V2.13.0 as argument. CPU-only; does not measure GPU or FPS.
import {pathToFileURL} from 'node:url';import {resolve} from 'node:path';import assert from 'node:assert/strict';
import {Renderer,chunks,chunkVisible} from '../src/renderer.js';import {ambientSnapshot} from '../src/population.js';
if(!process.argv[2])throw Error('Usage: node scripts/benchmark-digital.mjs /path/to/V2.13.0');
const base=pathToFileURL(resolve(process.argv[2])+'/'),old=await import(new URL('src/renderer.js',base)),oldPop=await import(new URL('src/population.js',base));
const poses=Array.from({length:64},(_,i)=>({x:i*53%384,z:i*79%384,yaw:i*37%360,pitch:20+i%63,zoom:1}));
const oldR=new old.Renderer(null,{defer:true}),newR=new Renderer(null,{defer:true});for(const r of [oldR,newR]){r.width=1024;r.height=768;r.unit=20;}
function cull(r,cs,visible,loops){let count=0;for(let n=0;n<loops;n++)for(const camera of poses){r.camera=camera;const project=(x,y,z)=>r.project(x,y,z);for(const c of cs)for(const p of [24,80])if(visible(c,project,r.width,r.height,p))count++;}return count;}
function ambient(fn,loops){let sum=0;for(let i=0;i<loops;i++){const rows=fn(518400*10+360+(i%900)*.91);sum+=rows.length;}return sum;}
for(let i=0;i<64;i++){oldR.camera=newR.camera=poses[i];for(let j=0;j<chunks.length;j++)for(const p of [24,80])assert.equal(old.chunkVisible(old.chunks[j],(...a)=>oldR.project(...a),1024,768,p),chunkVisible(chunks[j],(...a)=>newR.project(...a),1024,768,p));}
for(const t of [0,360,720,1320,518400*10+720,518400*50+720,720])assert.deepEqual(oldPop.ambientSnapshot(t),ambientSnapshot(t));
const median=a=>[...a].sort((a,b)=>a-b)[Math.floor(a.length/2)],measure=fn=>{const t=performance.now(),count=fn();return {ms:performance.now()-t,count};};
function compare(a,b){for(let i=0;i<3;i++){a();b();}const x=[],y=[];let count;for(let i=0;i<7;i++){const first=i%2?b:a,second=i%2?a:b,A=measure(first),B=measure(second);assert.equal(A.count,B.count);count=A.count;x.push(i%2?B.ms:A.ms);y.push(i%2?A.ms:B.ms);}return {medianBefore:median(x),medianAfter:median(y),count,samples:7};}
console.log(JSON.stringify({culling:compare(()=>cull(oldR,old.chunks,old.chunkVisible,10),()=>cull(newR,chunks,chunkVisible,10)),ambient:compare(()=>ambient(oldPop.ambientSnapshot,5000),()=>ambient(ambientSnapshot,5000)),views:64,chunks:chunks.length,checksPerCullingSample:64*144*2*10},null,2));
