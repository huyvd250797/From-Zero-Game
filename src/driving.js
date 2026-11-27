// Transient presentation/control state: no changes to the canonical vehicle or save schema.
import {clamp,sites,walkable} from './world.js';
import {distance,moveSwept,advanceRoute,routeLength} from './navigation.js';
export const wrapYaw=a=>Math.atan2(Math.sin(a),Math.cos(a));
export const yawDelta=(a,b)=>wrapYaw(b-a);
export const drivingState=()=>({id:null,speed:0,yaw:0,steer:0,distance:0,braking:false,indicator:0});
export function resetDriving(d,id=null,yaw=0){Object.assign(d,drivingState(),{id,yaw:wrapYaw(yaw)});return d;}
export function drivingProfile(id,max){const two=id==='VEH_BIKE'||id==='VEH_MOTO';return {vehicle:id,max,accel:max/(two?1.2:2),brake:max/(two?.40:.60),turn:two?5.5:3.4,radius:two?.32:.28};}
const approach=(a,b,amount)=>a+clamp(b-a,-amount,amount);
export function driveStep(d,pos,path,input,dt,profile,limit=Infinity){
 dt=clamp(dt,0,.2);const old={...pos},before=d.speed,manual=Math.hypot(input.x,input.z)>.01,route=!manual&&path.length>0&&!input.brake;
 let target=manual?Math.atan2(input.x,input.z):route?Math.atan2(path[0].x-pos.x,path[0].z-pos.z):d.yaw;
 let delta=yawDelta(d.yaw,target);let wanted=input.brake?0:manual?profile.max*Math.min(1,Math.hypot(input.x,input.z)):route?Math.min(profile.max,Math.sqrt(2*profile.brake*routeLength(pos,path))):0;
 if(route&&path.length>1){const a=path[0],b=path[1],turn=Math.abs(yawDelta(target,Math.atan2(b.x-a.x,b.z-a.z)));if(turn>.25)wanted=Math.min(wanted,Math.sqrt((profile.max*.22)**2+2*profile.brake*distance(pos,a)));}
 if(manual&&Math.abs(delta)>.55)wanted*=Math.max(.16,Math.cos(Math.min(Math.PI/2,Math.abs(delta))));
 d.yaw=wrapYaw(d.yaw+clamp(delta,-profile.turn*dt,profile.turn*dt));d.steer=approach(d.steer,clamp(delta,-.65,.65),dt*4);d.indicator=Math.abs(delta)>.35?Math.sign(delta):0;
 const decel=!input.brake&&!manual&&!route?profile.brake*.45:profile.brake;d.speed=approach(d.speed,wanted,(wanted<d.speed?decel:profile.accel)*dt);let budget=Math.min(Math.max(0,limit),Math.max(0,(before+d.speed)*.5*dt));
 // Route movement keeps exact legacy waypoints and collision sweep; no overshoot.
 let moved=0,blocked=false,reached=false;
 if(route){const r=advanceRoute(pos,path,budget,profile.vehicle);moved=r.moved;blocked=r.blocked;reached=!path.length;if(reached)d.speed=0;}
 else if(budget>0){moved=moveSwept(pos,Math.sin(d.yaw)*budget,Math.cos(d.yaw)*budget,false,profile.vehicle);blocked=moved<budget-1e-6;}
 if(blocked||limit<=0)d.speed=0;
 d.distance+=moved;d.braking=input.brake||wanted<before-.01||blocked||reached;
 return {moved,blocked,reached,dx:pos.x-old.x,dz:pos.z-old.z};
}

// Match the existing painted stall lines. Wide vehicles occupy two adjacent bays.
export function parkingTargets(id,pos,parked=[]){const wide=id==='VEH_TRUCK'||id==='VEH_LUX',width=wide?2.9:1.45;const out=[];for(const lot of sites.filter(s=>s.style==='parking')){const lines=[];for(let x=-lot.w/2+.8;x<lot.w/2;x+=1.45)lines.push(x);for(let i=0;i+(wide?2:1)<lines.length;i++){const target={x:lot.x+lines[i]+width/2,z:lot.z};const hw=id==='VEH_TRUCK'?.9:id==='VEH_LUX'?.78:id==='VEH_BIKE'||id==='VEH_MOTO'?.4:.72,hl=id==='VEH_TRUCK'?2:id==='VEH_LUX'?1.65:id==='VEH_BIKE'||id==='VEH_MOTO'?1:1.45;if(!walkable(target.x,target.z)||![-1,1].every(x=>[-1,1].every(z=>walkable(target.x+x*hw,target.z+z*hl)))||parked.some(v=>Math.abs(v.pos.z-target.z)<3.5&&Math.abs(v.pos.x-target.x)<(wide||v.id==='VEH_TRUCK'||v.id==='VEH_LUX'?2.2:1.5)))continue;out.push({id:lot.id,target,name:lot.name,distance:distance(pos,target)});}}return out.sort((a,b)=>a.distance-b.distance);}
