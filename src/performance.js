// Rendering frequency is independent of simulation frequency.
export function frameInterval({fallback=false,quality=1,eco=false,active=true,hidden=false,blocked=false}={}){if(hidden||blocked)return Infinity;if(!active)return 250;return fallback||eco||quality===0?1000/30:1000/60;}
export class FrameMeter{constructor(){this.reset();}reset(){this.since=null;this.count=0;this.total=0;this.fps=null;this.ms=null;}sample(now,duration){if(this.since===null){this.since=now;return;}this.count++;this.total+=duration;const elapsed=now-this.since;if(elapsed>=2000){this.fps=Math.round(this.count*1000/elapsed);this.ms=Math.round(this.total/this.count*10)/10;this.since=now;this.count=0;this.total=0;}}}

// Bound internal render pixels, preserving CSS coordinates and camera picking.
export function renderScale(w,h,dpr,maxSize,pixelBudget){return Math.min(dpr,maxSize/w,maxSize/h,Math.sqrt(pixelBudget/(w*h)));}
export function pixelBudget(quality,eco=false){return eco?900000:[1000000,1800000,3000000,5000000][quality]||1800000;}
// Group four canonical chunks without changing their geometry or road/tree placement.
export function chunkGroups(chunks,size=64){const groups=new Map();for(const c of chunks){const x=Math.floor(c.x/size)*size,z=Math.floor(c.z/size)*size,key=`${x}:${z}`;if(!groups.has(key))groups.set(key,{id:`macro:${key}`,members:[]});groups.get(key).members.push(c);}return [...groups.values()];}
export function trimCache(cache,active,limit,dispose){for(const [key,value] of cache){if(cache.size<=Math.max(limit,active.size))break;if(active.has(key))continue;dispose(value);cache.delete(key);}}
// Cache the shadow pass for a bounded time, but refresh immediately on visible set / major camera change.
export class ShadowScheduler{constructor(){this.reset();}reset(){this.last=null;}update(now,camera,key,quality,enabled=true){if(!enabled){this.reset();return false;}const p=this.last,interval=quality>=3?50:quality===2?67:100;if(!p||now-p.now>=interval||p.key!==key||Math.hypot(camera.x-p.x,camera.z-p.z)>1||Math.abs(camera.zoom-p.zoom)>.12){this.last={now,x:camera.x,z:camera.z,zoom:camera.zoom,key};return true;}return false;}}
