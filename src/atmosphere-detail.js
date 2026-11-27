import {SIZE} from './world.js';
// Visual-only atmospheric profiles, deterministic and bounded for mobile.
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
export function atmosphereHash(n){let h=Math.imul(n|0,374761393);h=Math.imul(h^(h>>>13),1274126177);return ((h^(h>>>16))>>>0)/4294967296;}
export function atmosphereBudget(quality,eco=false){const q=eco?Math.min(1,quality):quality;return [{clouds:4,ripples:0,reflection:false,cloudHz:8,overlayDpr:1},{clouds:8,ripples:8,reflection:true,cloudHz:10,overlayDpr:1},{clouds:12,ripples:16,reflection:true,cloudHz:15,overlayDpr:1.25},{clouds:16,ripples:24,reflection:true,cloudHz:20,overlayDpr:1.25}][q]||{clouds:8,ripples:8,reflection:true,cloudHz:10,overlayDpr:1};}
// Switches in Settings fade from the current visual state, without changing deterministic game weather.
export class WeatherTransition{
 constructor(){this.reset();}reset(){this.mode=null;this.current=null;this.from=null;this.elapsed=0;}
 update(target,mode,dt,instant=false){if(!this.current||instant){this.current={...target};this.mode=mode;this.from=null;return this.current;}if(mode!==this.mode){this.from={...this.current};this.mode=mode;this.elapsed=0;}if(!this.from){this.current={...target};return this.current;}this.elapsed+=clamp(dt,0,.25);const t=smooth(this.elapsed/1.6);this.current={...target};for(const k of ['cloud','rain','fog','wind','wetness','storm'])this.current[k]=mix(this.from[k]||0,target[k]||0,t);if(t>=1)this.from=null;return this.current;}
}
// One soft pulse per deterministic 24-second visual slot, no rapid strobe or gameplay damage.
export function lightningAt(seconds,storm,reduce=false){if(reduce||!Number.isFinite(seconds)||storm<.45)return 0;const slot=Math.floor(seconds/24),offset=4+atmosphereHash(slot+197)*14,t=seconds-slot*24-offset;if(t<0||t>=.8)return 0;return Math.sin(Math.PI*t/.8)**2*.42*smooth((storm-.45)/.55);}
export function skyPalette(l,w){const c=l.background,cloud=w.cloud||0;return {top:c.map((x,i)=>clamp(x*(.70+.14*cloud)+[.015,.026,.045][i])),bottom:c.map((x,i)=>clamp(x*(1.13-.07*cloud)+[.037,.042,.040][i]))};}
export function skyPixels(palette,size=32){const bytes=new Uint8Array(size*4);for(let i=0;i<size;i++){const t=i/(size-1||1);for(let k=0;k<3;k++)bytes[i*4+k]=Math.round(255*mix(palette.bottom[k],palette.top[k],t));bytes[i*4+3]=255;}return bytes;}
export function windowLighting(minutes,night){const h=((minutes%1440)+1440)%1440/60;const late=smooth((h-21)/3)+1-smooth(h/5);return clamp(night)*(.25+.7*(1-clamp(late)*.75));}
export function fogRange(fog,worldSpan){const strength=clamp(fog),span=clamp(worldSpan,30,300);return {near:480-span*(.35+.45*strength)+190*(1-strength),far:480+span*(1.5-.85*strength)+260*(1-strength)};}
// Broad, soft cloud-shadow footprints move in world coordinates. No physical light or shadow-map allocation.
export function cloudFootprints(seconds,count,size=SIZE){const wrap=v=>((v%(size+64))+(size+64))%(size+64)-32;return Array.from({length:count},(_,i)=>({x:wrap(atmosphereHash(i+440)* (size+64)+seconds*.33),z:wrap(atmosphereHash(i+551)*(size+64)+seconds*.12),rx:18+atmosphereHash(i+660)*15,rz:11+atmosphereHash(i+770)*11}));}
export function softTexture(size=64,kind='lamp'){const bytes=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){const u=(x+.5-size/2)/(size/2),v=(y+.5-size/2)/(size/2),d=Math.hypot(u,v),a=Math.max(0,1-d);const rgb=kind==='cloud'?[25,38,56]:kind==='reflection'?[255,214,147]:kind==='vehicle'?[255,255,255]:[255,226,170];bytes.set([...rgb,Math.round(255*a*a*(kind==='reflection'?.7+.3*Math.cos(v*42)**2:1))],(y*size+x)*4);}return bytes;}
export function wetRoad(w,enabled=true){const wet=enabled?clamp(w.wetness):0;return {wet,roughness:mix(.96,.22,wet),brightness:1-wet*.29,reflection:wet*clamp(w.night)*.46};}
export function isBuildingGlass(r,g,b){return [1,.68,.75,.85,.95].some(k=>Math.abs(r-100*k/255)<.001&&Math.abs(g-141*k/255)<.001&&Math.abs(b-166*k/255)<.001);}
// Thunder follows the visual storm's scheduled pulse, independently of the flash accessibility option.
export function thunderSlotAt(seconds,storm){if(!Number.isFinite(seconds)||storm<.55)return null;const slot=Math.floor(seconds/24),offset=4+atmosphereHash(slot+197)*14+1.1,t=seconds-slot*24-offset;return t>=0&&t<1?slot:null;}
