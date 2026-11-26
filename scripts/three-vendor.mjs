import {readFile} from 'node:fs/promises';
import path from 'node:path';
export const THREE_VERSION='0.180.0';
export const THREE_ENTRIES=['build/three.module.js','examples/jsm/loaders/GLTFLoader.js','examples/jsm/utils/SkeletonUtils.js','examples/jsm/postprocessing/EffectComposer.js','examples/jsm/postprocessing/RenderPass.js','examples/jsm/postprocessing/UnrealBloomPass.js','examples/jsm/postprocessing/ShaderPass.js','examples/jsm/postprocessing/OutputPass.js','examples/jsm/shaders/FXAAShader.js'];
// Include the entire static transitive ESM graph of the selected official modules, preserving relative paths.
export function importsOf(source){return [...new Set([...source.matchAll(/^\s*(?:import|export)\s+(?:(?:[\w$*,{}\s]+?)\s+from\s*)?['"]([^'"\r\n]+)['"]/gm)].map(m=>m[1]))];}
export function modulePath(parent,spec){if(spec==='three')return 'build/three.module.js';if(spec.startsWith('three/addons/'))return 'examples/jsm/'+spec.slice(13);if(spec.startsWith('.')){const p=path.posix.normalize(path.posix.join(path.posix.dirname(parent),spec));if(p.startsWith('../')||p.startsWith('/')||!p.endsWith('.js'))throw Error(`Unsupported Three.js import ${spec}`);return p;}return null;}
export async function vendorInventory(root='node_modules/three'){
 let pkg;try{pkg=JSON.parse(await readFile(path.join(root,'package.json'),'utf8'));}catch{throw Error('Three.js dependency missing. Run npm ci with npm Registry access. Use build:native-preview only for local fallback QA.');}
 if(pkg.version!==THREE_VERSION)throw Error(`Expected Three.js ${THREE_VERSION}, got ${pkg.version}`);
 const out=new Map(),pending=[...THREE_ENTRIES];while(pending.length){const f=pending.pop();if(out.has(f))continue;const bytes=await readFile(path.join(root,f));out.set(f,bytes);for(const spec of importsOf(bytes.toString('utf8'))){const child=modulePath(f,spec);if(child){if(!out.has(child))pending.push(child);}else if(!/^(?:https?:|data:|#)/.test(spec))throw Error(`Unsupported external Three.js dependency: ${spec} in ${f}`);}}
 out.set('LICENSE',await readFile(path.join(root,'LICENSE')));return new Map([...out].sort(([a],[b])=>a.localeCompare(b)));
}
