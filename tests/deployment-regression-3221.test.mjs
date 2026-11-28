import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,mkdirSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
import {releaseBranding} from '../scripts/release-branding.mjs';
import {failureNames} from '../scripts/run-regression.mjs';
const files=['package.json','package-lock.json','public/manifest.webmanifest','index.html'];
test('release branding accepts future consistent versions and rejects each stale file',()=>{
 const root=mkdtempSync(path.join(tmpdir(),'fz-brand-'));try{mkdirSync(path.join(root,'public'));const current=releaseBranding();const future='9.99.1',copy={};for(const f of files){copy[f]=readFileSync(f,'utf8').replaceAll(current.version,future);writeFileSync(path.join(root,f),copy[f]);}assert.equal(releaseBranding(root).version,future);
 for(const f of files){writeFileSync(path.join(root,f),readFileSync(f));assert.throws(()=>releaseBranding(root),/Release/);writeFileSync(path.join(root,f),copy[f]);}assert.equal(releaseBranding(root).version,future);
 }finally{rmSync(root,{recursive:true,force:true});}
});
test('regression summary excludes passing failed-loading scenario and retains failing test names',()=>{assert.deepEqual(failureNames(['✔ failed loading displays error and retry, a retry does not delete data (0.39ms)','✖ release branding matches manifest (1.2ms)','✖ failing tests:','✖ release branding matches manifest (1.2ms)']),['release branding matches manifest']);});
test('regression runner preserves exit status and names actual failing test',()=>{const root=mkdtempSync(path.join(tmpdir(),'fz-reg-'));try{const file=path.join(root,'fixture.test.mjs');writeFileSync(file,"import test from 'node:test';import assert from 'node:assert/strict';test('failed loading example',()=>assert.ok(true));test('intentional regression fixture',()=>assert.equal(1,2));");const fail=spawnSync(process.execPath,['scripts/run-regression.mjs',file],{encoding:'utf8'});assert.equal(fail.status,1);assert.match(fail.stderr,/\[FAILED TEST\] intentional regression fixture/);assert.doesNotMatch(fail.stderr,/\[FAILED TEST\] failed loading example/);assert.match(fail.stdout,/failed loading example/);writeFileSync(file,"import test from 'node:test';test('success',()=>{});");const pass=spawnSync(process.execPath,['scripts/run-regression.mjs',file],{encoding:'utf8'});assert.equal(pass.status,0);assert.match(pass.stdout,/\[REGRESSION PASS\]/);}finally{rmSync(root,{recursive:true,force:true});}});
