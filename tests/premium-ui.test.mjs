import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {CAMERA_BUTTON_IDS,titlePreview,titleMotionAllowed,loadingStage,loadingDone,loadingFailed,setUiIcon} from '../src/premium-ui.js';
const read=f=>readFileSync(f,'utf8'),html=read('index.html'),main=read('src/main.js'),css=read('src/premium.css');
test('approved original logo is retained byte for byte and shared across title, splash, HUD',()=>{
 const image=readFileSync('src/assets/brand/fz-ascend.png');assert.equal(createHash('sha256').update(image).digest('hex'),'a6fceb4bfc538f006bb19e790195dc00b0b6481ab2baab680bbb2fbbf39014a5');
 for(const cls of ['start-logo','splash-logo','mark brand-mark'])assert(html.includes(`class="${cls}" src="./src/assets/brand/fz-ascend.png"`));
});
test('PWA keeps identity and PNG dimensions for normal and maskable icons',()=>{
 const m=JSON.parse(read('public/manifest.webmanifest'));assert.equal(m.id,'./');assert.equal(m.start_url,'./');assert.equal(m.scope,'./');
 for(const icon of m.icons){const b=readFileSync('public/'+icon.src),n=Number(icon.sizes.split('x')[0]);assert.equal(b.subarray(1,4).toString(),'PNG');assert.equal(b.readUInt32BE(16),n);assert.equal(b.readUInt32BE(20),n);}
 assert(m.icons.some(i=>i.purpose==='maskable'));assert(html.includes('rel="icon" type="image/png" href="./icon-192.png"'));assert(html.includes('rel="apple-touch-icon" href="./icon-192.png"'));
});
test('camera controls preserve eight ordered IDs, recenter outside panel and map on both layouts',()=>{
 const panel=html.match(/<div class="camera-buttons">(.*?)<\/div>/s)[1];assert.deepEqual([...panel.matchAll(/<button id="([^"]+)"/g)].map(x=>x[1]),CAMERA_BUTTON_IDS);assert(!panel.includes('id="follow"'));assert.equal([...html.matchAll(/id="follow"/g)].length,1);assert.match(html,/<div class="camera-dock"><button id="follow"/);assert(!panel.includes('mobile-only'));assert(css.includes('grid-template-columns:repeat(8,minmax(0,1fr))'));
});
test('focus remains presentation-only; interior focus does not replace or cancel journey',()=>{
 const event=main.match(/\$\('follow'\)\.onclick=\(\)=>\{([^}]+)\}/)[1];assert.match(event,/cameraMode\('follow'\)/);assert(!/cancelRoute|state\.pos\s*=|advanceTime|save\(/.test(event));assert.match(main,/roomFocus=modalButton\(stage,'',\(\)=>\{if\(!can\(\)\|\|edit\)return;wide=false;follow=\{\.\.\.walk\.pos\};zoom=1;/);
});
test('cinematic title camera and visual minute are bounded, static mode fixed',()=>{
 assert.deepEqual(titlePreview(0,false),titlePreview(9999,false));for(let t=0;t<600;t+=.25){const v=titlePreview(t);assert(v.minute>=0&&v.minute<1440);assert(v.camera.x>=126&&v.camera.x<=150);assert(v.camera.z>=99&&v.camera.z<=117);assert(v.camera.yaw>=26&&v.camera.yaw<=50);assert(v.camera.zoom>0);}
 assert.notDeepEqual(titlePreview(0),titlePreview(30));assert.match(main,/const visualState=\{\.\.\.state,\.\.\.\(titleView\?\{minutes:titleView.minute\}:\{\}\)/);
});
test('title animation disabled for low, eco, fallback and reduced-motion',()=>{
 assert(titleMotionAllowed({quality:1}));for(const options of [{quality:0},{quality:2,eco:true},{quality:3,fallback:true},{quality:1,reduced:true}])assert.equal(titleMotionAllowed(options),false);
});
function fakeDoc(){const nodes={};for(const id of ['splash','loadRetry','loadProgress','loadStatus','loadTip','start']){const names=new Set(id==='loadRetry'?['hidden']:[]);nodes[id]={inert:id==='start',textContent:'',value:0,classList:{add:v=>names.add(v),remove:v=>names.delete(v),contains:v=>names.has(v)}};}return {nodes,getElementById:id=>nodes[id]};}
test('loading progresses from actual initialization phases, completes and unlocks menu',()=>{
 const d=fakeDoc();loadingStage(d,1,'Renderer');assert.equal(d.nodes.loadProgress.value,1);assert.equal(d.nodes.loadStatus.textContent,'Renderer');loadingStage(d,2,'City','Tip');assert.equal(d.nodes.loadProgress.value,2);assert.equal(d.nodes.loadTip.textContent,'Tip');assert(!d.nodes.splash.classList.contains('hidden'));loadingDone(d);assert.equal(d.nodes.loadProgress.value,3);assert(d.nodes.splash.classList.contains('hidden'));assert.equal(d.nodes.start.inert,false);assert.match(main,/if\(sceneLoading\)\{sceneLoading=false;loadingDone\(document\);\}/);
});
test('failed loading displays error and retry, a retry does not delete data',()=>{
 const d=fakeDoc();loadingStage(d,1,'Renderer');loadingFailed(d,new Error('GPU'));assert.match(d.nodes.loadStatus.textContent,/GPU/);assert(!d.nodes.loadRetry.classList.contains('hidden'));assert(!d.nodes.splash.classList.contains('hidden'));const boot=read('src/boot.js');assert.match(boot,/retry.onclick=\(\)=>location.reload\(\)/);assert.match(boot,/catch\(error\)/);assert(!boot.includes('removeItem'));
});
test('camera icons are static accessible SVGs and unknown icons do not inject markup',()=>{
 for(const id of [...CAMERA_BUTTON_IDS,'follow','camera','energy','phoneQuick']){const e={};assert(setUiIcon(e,id));assert.match(e.innerHTML,/<svg .*aria-hidden="true"/);assert(!e.innerHTML.includes('<script'));}const e={innerHTML:'keep'};assert.equal(setUiIcon(e,'<script>'),false);assert.equal(e.innerHTML,'keep');
});
test('title save management reuses guarded import and recovery without a new storage key',()=>{
 assert.match(main,/\$\('startSaveOpen'\)\.onclick=saveManagement/);assert.match(main,/appendSaveControls\(b,settings\)/);assert.match(main,/appendSaveControls\(b,saveManagement\)/);assert.match(main,/if\(confirmSnapshot\(snapshot.raw\)\)start\(s,true\)/);assert.match(main,/if\(!stored\|\|ended\(state\)\|\|incarcerated\(state\)\)\{sceneLoading=false;loadingDone\(document\);\}/);
});
