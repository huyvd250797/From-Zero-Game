import {AnimationMixer} from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
export function disposeModel(root){const geometries=new Set(),materials=new Set(),textures=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}if(o.skeleton?.boneTexture)textures.add(o.skeleton.boneTexture);});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();}
export class ThreeAssets{
 constructor(loader=new GLTFLoader()){this.loader=loader;this.cache=new Map();this.closed=false;}
 load(url){if(this.closed)return Promise.reject(Error('Asset manager disposed'));const u=new URL(url,import.meta.url);if(u.origin!==new URL(import.meta.url).origin)return Promise.reject(Error('Only local assets are supported'));const key=u.href;if(!this.cache.has(key)){const pending=this.loader.loadAsync(key).then(g=>{if(this.closed){disposeModel(g.scene);throw Error('Asset manager disposed');}return g;}).catch(e=>{if(this.cache.get(key)===pending)this.cache.delete(key);throw e;});this.cache.set(key,pending);}return this.cache.get(key);}
 async instance(url){const g=await this.load(url);return {scene:clone(g.scene),animations:g.animations};}
 // Only callers that own all clones of this URL may evict it.
 evict(url){const key=new URL(url,import.meta.url).href,p=this.cache.get(key);if(!p)return false;this.cache.delete(key);p.then(g=>disposeModel(g.scene)).catch(()=>{});return true;}
 clear(){this.closed=true;for(const p of this.cache.values())p.then(g=>disposeModel(g.scene)).catch(()=>{});this.cache.clear();}
}
// AnimationMixer drives each avatar skeleton; transitions use a short cross-fade.
export class ClipPlayer{
 constructor(root,clips=[]){this.root=root;this.clips=clips;this.mixer=new AnimationMixer(root);this.current=null;this.fading=new Map();this.time=0;}
 play(name,fade=.18){const clip=this.clips.find(c=>c.name===name);if(!clip)return false;const action=this.mixer.clipAction(clip);if(action===this.current)return true;this.fading.delete(action);action.reset().setEffectiveWeight(1).play();if(this.current){if(fade>0){this.current.fadeOut(fade);this.fading.set(this.current,this.time+fade);action.fadeIn(fade);}else{this.current.stop();for(const a of this.fading.keys())a.stop();this.fading.clear();}}this.current=action;return true;}
 update(dt){const delta=Math.max(0,Math.min(.25,dt));this.time+=delta;this.mixer.update(delta);for(const [action,end] of this.fading)if(this.time>=end){if(action!==this.current)action.stop();this.fading.delete(action);}}
 dispose(){this.fading.clear();this.mixer.stopAllAction();this.mixer.uncacheRoot(this.root);}
}
