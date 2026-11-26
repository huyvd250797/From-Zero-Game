import {createRenderer as createNative} from './renderer-next.js';
// A separate canvas for each failed GPU context. Explicit native/legacy never imports Three.js.
export async function createPreferredRenderer(canvas,prefs,{loadThree=()=>import('./renderer-three.js'),native=createNative}={}){
 if(prefs.engine!=='next')return native(canvas,prefs);
 let candidate;try{candidate=canvas.cloneNode(false);const {ThreeRenderer}=await loadThree();const renderer=new ThreeRenderer(candidate,prefs);canvas.replaceWith(candidate);return renderer;}catch(e){console.warn('Three.js fallback:',e.message);try{candidate?.getContext('webgl2')?.getExtension('WEBGL_lose_context')?.loseContext();}catch{}const r=native(canvas,{...prefs,engine:'native'});r.engineFallback=`Three.js không khởi tạo: ${e.message}`;return r;}
}
