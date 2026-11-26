import {springStep} from './visual-fidelity.js';
// Presentation only: orthographic camera coordinates in world metres, yaw/elevation in degrees.
import {SIZE,buildings,clamp} from './world.js';
const RAD=Math.PI/180,N=Math.hypot(.83,.55);
export const DEFAULT_PITCH=Math.atan2(.55,.83)/RAD;
export const CAMERA_MODES=Object.freeze(['overview','follow','close','free']);
export const MODE_LABELS=Object.freeze({overview:'Toàn cảnh',follow:'Theo nhân vật',close:'Cận cảnh',free:'Tự do'});
export function cameraBasis(camera){const pitch=Number.isFinite(camera.pitch)?clamp(camera.pitch,20,82):DEFAULT_PITCH;return {c:N*Math.cos(pitch*RAD),s:N*Math.sin(pitch*RAD),n:N};}
export function angleDelta(a,b){return ((b-a+180)%360+360)%360-180;}
export function zoomLimit(z){return clamp(Number.isFinite(z)?z:1,.09,7);}
export function screenToWorldDelta(dx,dy,camera,unit){const a=camera.yaw*RAD,{s}=cameraBasis(camera),rx=dx/Math.max(.001,unit),rz=dy/Math.max(.001,unit)/s;return {x:rx*Math.cos(a)+rz*Math.sin(a),z:-rx*Math.sin(a)+rz*Math.cos(a)};}
// Intersect a horizontal ray from the actor towards the orthographic camera with each footprint.
// Return distance to entry; inside/edge cases are bounded to avoid divide-by-zero.
export function rayEntry(pos,yaw,b){const a=yaw*RAD,dir=[Math.sin(a),Math.cos(a)];let lo=0,hi=80;for(const [p,d,min,max] of [[pos.x,dir[0],b.x-b.w/2-.12,b.x+b.w/2+.12],[pos.z,dir[1],b.z-b.d/2-.12,b.z+b.d/2+.12]]){if(Math.abs(d)<1e-9){if(p<min||p>max)return null;continue;}const v=(min-p)/d,w=(max-p)/d;lo=Math.max(lo,Math.min(v,w));hi=Math.min(hi,Math.max(v,w));if(lo>hi)return null;}return hi>=0?Math.max(.1,lo):null;}
export function clearancePitch(pos,yaw,base,obstacles=buildings){let required=base;for(const b of obstacles){const d=rayEntry(pos,yaw,b);if(d===null)continue;required=Math.max(required,Math.atan2(Math.max(0,b.h+1.2-1.15),d)/RAD+1.2);}return required;}
export class CameraControl{
 constructor(camera,mode='follow'){this.reset(camera,mode);}
 reset(camera,mode='follow'){this.mode=mode;this.goal={...camera,pitch:camera.pitch??DEFAULT_PITCH};this.basePitch=this.goal.pitch;this.occluded=false;this.lifted=false;this.moving=false;this.liftHold=0;this.velocity={x:0,z:0,zoom:0,pitch:0};}
 setMode(mode,camera,pos,width,height){if(!CAMERA_MODES.includes(mode))return;this.reset(camera,mode);const mobile=width<650;if(mode==='overview'){this.goal.x=this.goal.z=SIZE/2;const base=Math.max(.001,Math.min(width/100,height/61)),a=camera.yaw*RAD,span=SIZE*(Math.abs(Math.sin(a))+Math.abs(Math.cos(a))),{s,c}=cameraBasis({pitch:50}),top=Math.max(...buildings.map(b=>b.h+3.5));this.goal.zoom=clamp(Math.min((width-36)/(span*base),(height-210)/((span*s+2*top*c)*base)),.09,.46);this.basePitch=50;}else if(mode==='follow'||mode==='close'){this.goal.x=pos.x;this.goal.z=pos.z;this.goal.zoom=mode==='close'?(mobile?6.2:4.8):(mobile?1.75:1.28);this.basePitch=mode==='close'?24:DEFAULT_PITCH;}this.goal.pitch=this.basePitch;}
 focus(camera,x,z){this.reset(camera,'free');this.goal.x=clamp(x,0,SIZE);this.goal.z=clamp(z,0,SIZE);}
 zoom(factor){if(Number.isFinite(factor)&&factor>0)this.goal.zoom=zoomLimit(this.goal.zoom*factor);}
 rotate(delta){if(Number.isFinite(delta))this.goal.yaw=((this.goal.yaw+delta)%360+360)%360;}
 tilt(delta){if(Number.isFinite(delta))this.basePitch=clamp(this.basePitch+delta,20,82);}
 pan(camera,dx,dy,unit){if(this.mode!=='free')this.reset(camera,'free');const d=screenToWorldDelta(dx,dy,camera,unit);this.goal.x=clamp(this.goal.x-d.x,0,SIZE);this.goal.z=clamp(this.goal.z-d.z,0,SIZE);}
 update(camera,pos,dt,{reduce=false,obstacles=buildings}={}){const tracking=this.mode==='follow'||this.mode==='close';if(tracking){this.goal.x=pos.x;this.goal.z=pos.z;}const desired=tracking&&this.mode==='close'?clearancePitch(pos,camera.yaw,this.basePitch,obstacles):this.basePitch;const target=clamp(desired,20,82);if(this.mode==='close'&&tracking&&!reduce){if(target>this.goal.pitch+.6){this.goal.pitch=target;this.liftHold=.35;}else{this.liftHold=Math.max(0,this.liftHold-dt);if(!this.liftHold&&target<this.goal.pitch-.6)this.goal.pitch=Math.max(target,this.goal.pitch-22*dt);}}else{this.goal.pitch=target;this.liftHold=0;}this.lifted=this.goal.pitch>this.basePitch+.5;const k=reduce?1:1-Math.exp(-Math.min(.25,Math.max(0,dt))*9);const yaw=angleDelta(camera.yaw,this.goal.yaw);this.moving=Math.abs(yaw)>.1||['x','z','zoom','pitch'].some(key=>Math.abs((camera[key]??DEFAULT_PITCH)-this.goal[key])>.003);for(const key of ['x','z','zoom','pitch']){const v=camera[key]??DEFAULT_PITCH,d=this.goal[key]-v;const r=reduce?{value:this.goal[key],velocity:0}:springStep(v,this.velocity[key]||0,this.goal[key],dt,key==='x'||key==='z'?20:14);camera[key]=key==='zoom'?zoomLimit(r.value):key==='pitch'?clamp(r.value,20,82):clamp(r.value,0,SIZE);this.velocity[key]=r.value===camera[key]?r.velocity:0;}camera.yaw=((camera.yaw+yaw*k)%360+360)%360;this.occluded=tracking&&clearancePitch(pos,camera.yaw,20,obstacles)>camera.pitch+.8;return this.moving;}
}
// Gesture state independent of DOM. Once multi-touch or canceled, never generate a tap.
export class CameraGesture{
 constructor(){this.reset();}
 reset(){this.points=new Map();this.drag=null;this.pinched=false;this.lastPair=null;}
 down(id,x,y,button=0){if(this.points.has(id)||this.points.size>=2)return false;this.points.set(id,{x,y});if(this.points.size===1&&!this.pinched)this.drag={x,y,lastX:x,lastY:y,button,moved:false};if(this.points.size===2){this.pinched=true;this.lastPair=this.pair();}return true;}
 pair(){const [a,b]=this.points.values();return {dist:Math.hypot(a.x-b.x,a.y-b.y),angle:Math.atan2(b.y-a.y,b.x-a.x)/RAD};}
 move(id,x,y){if(!this.points.has(id))return null;this.points.set(id,{x,y});if(this.points.size===2){const cur=this.pair(),prev=this.lastPair;this.lastPair=cur;return prev&&prev.dist>8&&cur.dist>8?{kind:'pinch',factor:clamp(cur.dist/prev.dist,.65,1.55),angle:angleDelta(prev.angle,cur.angle)}:null;}if(this.pinched||!this.drag)return null;const d=this.drag;if(Math.hypot(x-d.x,y-d.y)>6)d.moved=true;const result=d.moved?{kind:'drag',dx:x-d.lastX,dy:y-d.lastY,button:d.button}:null;if(d.moved){d.lastX=x;d.lastY=y;}return result;}
 end(id,x,y,cancel=false){if(!this.points.has(id))return null;const d=this.drag,tap=!cancel&&!this.pinched&&this.points.size===1&&d&&!d.moved&&d.button===0&&Math.hypot(x-d.x,y-d.y)<=6;this.points.delete(id);if(!this.points.size)this.reset();else{this.pinched=true;this.lastPair=null;}return tap?{x,y}:null;}
}
