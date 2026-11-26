// Rendering frequency is independent of simulation frequency.
export function frameInterval({fallback=false,quality=1,eco=false,active=true,hidden=false,blocked=false}={}){if(hidden||blocked)return Infinity;if(!active)return 250;return fallback||eco||quality===0?1000/30:1000/60;}
// Windowed measurements of completed frames, not an estimate of GPU execution time.
export class FrameMeter{
 constructor(){this.reset();}
 reset(){this.since=null;this.previous=null;this.count=0;this.total=0;this.intervals=[];this.fps=null;this.ms=null;this.p95=null;}
 sample(now,duration){if(!Number.isFinite(now)||!Number.isFinite(duration)||duration<0)return;if(this.since===null){this.since=this.previous=now;return;}const gap=now-this.previous;if(gap<=0)return;if(gap>2000){this.reset();this.since=this.previous=now;return;}this.previous=now;this.count++;this.total+=duration;this.intervals.push(gap);const elapsed=now-this.since;if(elapsed>=2000){this.fps=Math.round(this.count*1000/elapsed);this.ms=Math.round(this.total/this.count*10)/10;const sorted=this.intervals.sort((a,b)=>a-b);this.p95=Math.round(sorted[Math.ceil(sorted.length*.95)-1]*10)/10;this.since=now;this.count=0;this.total=0;this.intervals=[];}}
}

// Bound internal render pixels, preserving CSS coordinates and camera picking.
export function renderScale(w,h,dpr,maxSize,pixelBudget){return Math.min(dpr,maxSize/w,maxSize/h,Math.sqrt(pixelBudget/(w*h)));}
export function pixelBudget(quality,eco=false){return eco?900000:[1000000,1800000,3000000,5000000][quality]||1800000;}
// Group four canonical chunks without changing their geometry or road/tree placement.
export function chunkGroups(chunks,size=64){const groups=new Map();for(const c of chunks){const x=Math.floor(c.x/size)*size,z=Math.floor(c.z/size)*size,key=`${x}:${z}`;if(!groups.has(key))groups.set(key,{id:`macro:${key}`,members:[]});groups.get(key).members.push(c);}return [...groups.values()];}
export function trimCache(cache,active,limit,dispose){for(const [key,value] of cache){if(cache.size<=Math.max(limit,active.size))break;if(active.has(key))continue;dispose(value);cache.delete(key);}}
// Cache the shadow pass for a bounded time, but refresh immediately on visible set / major camera change.
export class ShadowScheduler{constructor(){this.reset();}reset(){this.last=null;}update(now,camera,key,quality,enabled=true){if(!enabled){this.reset();return false;}const p=this.last,interval=quality>=3?50:quality===2?67:100;if(!p||now-p.now>=interval||p.key!==key||Math.hypot(camera.x-p.x,camera.z-p.z)>1||Math.abs(camera.zoom-p.zoom)>.12||angleDifference(camera.yaw,p.yaw)>3||Math.abs((camera.pitch??0)-p.pitch)>2){this.last={now,x:camera.x,z:camera.z,zoom:camera.zoom,yaw:camera.yaw??0,pitch:camera.pitch??0,key};return true;}return false;}}

function angleDifference(a=0,b=0){return Math.abs((((a-b)%360)+540)%360-180);}
