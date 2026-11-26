import {DEFAULT_AVATAR,JOINTS,visualAge,bindGeometry,cachedParts} from './avatar.js';
import {meshArrays} from './three-bridge.js';
export const TEMPLATE_KEYS=Object.freeze(['male-high','male-low','female-high','female-low']);
export const templateKey=(a,low)=>`${a.body}-${low?'low':'high'}`;
export function templateAppearance(body){return {...DEFAULT_AVATAR,body};}
// Smooth normals across coincident vertices of the same rigid-weight joint, preserving separate seams.
const dataCache=new Map();
export function characterGeometryData(a,age,low){const cacheKey=JSON.stringify(a)+':'+visualAge(age)+':'+low;const cached=dataCache.get(cacheKey);if(cached){dataCache.delete(cacheKey);dataCache.set(cacheKey,cached);return cached;}const skin=bindGeometry(cachedParts(a,age,low)),d=meshArrays(skin.raw,{grouped:false,withUV:false}),sum=new Map(),keys=[];for(let i=0;i<d.count;i++){const j=i*3,key=skin.skinIndex[i*4]+':'+[d.position[j],d.position[j+1],d.position[j+2]].map(v=>Math.round(v*100000)).join(',');keys.push(key);const n=sum.get(key)||[0,0,0];for(let k=0;k<3;k++)n[k]+=d.normal[j+k];sum.set(key,n);}for(let i=0;i<d.count;i++){const n=sum.get(keys[i]),len=Math.hypot(...n);if(len>1e-6)for(let k=0;k<3;k++)d.normal[i*3+k]=n[k]/len;}const result={...d,skinIndex:skin.skinIndex,skinWeight:skin.skinWeight};dataCache.set(cacheKey,result);if(dataCache.size>16)dataCache.delete(dataCache.keys().next().value);return result;}
export function chooseCharacterLOD(quality,zoom,unit,prior=false){if(quality===0)return true;const pixels=Number.isFinite(unit)?unit*1.9:zoom*24;const enter=quality===1?48:32;return prior?pixels<enter+8:pixels<enter-8;}
export function templateBoneOffsets(){return JOINTS.map(([name,parent,x,y,z])=>({name,parent,translation:[x,y,z]}));}
