import {AnimationMixer} from 'three';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
export function disposeModel(root){const geometries=new Set(),materials=new Set(),textures=new Set();root.traverse(o=>{if(o.geometry)geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:o.material?[o.material]:[]){materials.add(m);for(const v of Object.values(m))if(v?.isTexture)textures.add(v);}if(o.skeleton?.boneTexture)textures.add(o.skeleton.boneTexture);});for(const g of geometries)g.dispose();for(const m of materials)m.dispose();for(const t of textures)t.dispose();}
export class ThreeAssets{
 constructor(loader=new GLTFLoader()){this.loader=loader;this.cache=new Map();this.closed=false;}
 load(url){if(this.closed)return Promise.reject(Error('Asset manager disposed'));const u=new URL(url,import.meta.url);if(u.origin!==new URL(import.meta.url).origin)return Promise.reject(Error('Only local assets are supported'));const key=u.href;if(!this.cache.has(key)){const pending=this.loader.loadAsync(key).then(g=>{if(this.closed){disposeModel(g.scene);throw Error('Asset manager disposed');}return g;}).catch(e=>{this.cache.delete(key);throw e;});this.cache.set(key,pending);}return this.cache.get(key);}
 async instance(url){const g=await this.load(url);return {scene:clone(g.scene),animations:g.animations};}
 clear(){this.closed=true;for(const p of this.cache.values())p.then(g=>disposeModel(g.scene)).catch(()=>{});this.cache.clear();}
}
// Prepared for V1.3.0: actual AnimationMixer, not yet bound to the procedural player.
export class ClipPlayer{constructor(root,clips=[]){this.root=root;this.clips=clips;this.mixer=new AnimationMixer(root);this.current=null;}play(name,fade=.18){const clip=this.clips.find(c=>c.name===name);if(!clip)return false;const action=this.mixer.clipAction(clip);if(action===this.current)return true;action.reset().play();if(this.current){this.current.fadeOut(fade);action.fadeIn(fade);}this.current=action;return true;}update(dt){this.mixer.update(Math.max(0,Math.min(.25,dt)));}dispose(){this.mixer.stopAllAction();this.mixer.uncacheRoot(this.root);}}
