import {spawn} from 'node:child_process';
import {createInterface} from 'node:readline';
import {readdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
export function failureNames(lines){return [...new Set(lines.filter(l=>/^✖\s+/.test(l)&&!/^✖\s+(failing tests:|tests |fail |duration_ms )/.test(l)).map(l=>l.replace(/^✖\s+/,'').replace(/\s+\(\d+(?:\.\d+)?ms\)\s*$/,'')))];}
export async function runRegression(files){
 const env={...process.env};delete env.NODE_TEST_CONTEXT;
 const child=spawn(process.execPath,['--test','--test-reporter=spec',...files],{stdio:['ignore','pipe','pipe'],env});const lines=[];
 const streams=[child.stdout,child.stderr].map((stream,i)=>new Promise(resolve=>{const rl=createInterface({input:stream});rl.on('line',line=>{lines.push(line);(i?console.error:console.log)(line);});rl.on('close',resolve);}));
 const result=await new Promise(resolve=>{child.once('error',e=>resolve({code:1,error:e.message}));child.once('close',(code,signal)=>resolve({code,signal}));});await Promise.all(streams);
 if(result.code!==0){console.error('\n[REGRESSION FAILED]');for(const name of failureNames(lines))console.error('[FAILED TEST] '+name);console.error('[REGRESSION FAILED] '+(result.error||result.signal||`exit ${result.code}`));return 1;}console.log('[REGRESSION PASS] All selected test files passed.');return 0;
}
if(process.argv[1]&&import.meta.url===pathToFileURL(path.resolve(process.argv[1])).href){const files=process.argv.slice(2);process.exitCode=await runRegression(files.length?files:readdirSync('tests').filter(f=>f.endsWith('.test.mjs')).sort().map(f=>'tests/'+f));}
