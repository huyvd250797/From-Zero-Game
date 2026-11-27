// Transient presentation/control state: no changes to the canonical vehicle or save schema.
import {clamp,sites,walkable} from './world.js';
import {distance,moveSwept,advanceRoute,routeLength} from './navigation.js';
export const wrapYaw=a=>Math.atan2(Math.sin(a),Math.cos(a));
export const yawDelta=(a,b)=>wrapYaw(b-a);
export const drivingState=()=>({id:null,speed:0,yaw:0,steer:0,distance:0,braking:false,indicator:0,gear:1,roll:0,regen:0,acceleration:0,wheelDistance:0,grip:1});
export function resetDriving(d,id=null,yaw=0){Object.assign(d,drivingState(),{id,yaw:wrapYaw(yaw)});return d;}
export const VEHICLE_DYNAMICS=Object.freeze({
 VEH_BIKE:{mass:90,power:0.35,accel:2.4,brake:4.5,wheelbase:1.35,steer:.68,roll:.55,grip:.9,reverse:false},
 VEH_MOTO:{mass:180,power:18,accel:5.5,brake:7.5,wheelbase:1.4,steer:.65,roll:.60,grip:1,reverse:false},
 VEH_CAR:{mass:1450,power:95,accel:3.8,brake:8,wheelbase:2.1,steer:.62,roll:.12,grip:1,reverse:true},
 VEH_EV:{mass:1900,power:180,accel:5.6,brake:8,wheelbase:2.2,steer:.6,roll:.09,grip:1,reverse:true,regen:true},
 VEH_LUX:{mass:1750,power:160,accel:4.8,brake:8.5,wheelbase:2.4,steer:.58,roll:.08,grip:1,reverse:true},
 VEH_TRUCK:{mass:6500,power:160,accel:1.8,brake:5,wheelbase:3.1,steer:.50,roll:.17,grip:.88,reverse:true},
 BUS:{mass:8500,power:180,accel:1.6,brake:5,wheelbase:3.3,steer:.5,roll:.14,grip:.9,reverse:true},
 TAXI:{mass:1450,power:95,accel:3.8,brake:8,wheelbase:2.1,steer:.62,roll:.12,grip:1,reverse:true}
});
export function drivingProfile(id,max,{wetness=0,surface='asphalt'}={}){const p=VEHICLE_DYNAMICS[id]||VEHICLE_DYNAMICS.VEH_CAR,grip=p.grip*(1-.42*clamp(wetness,0,1))*(surface==='asphalt'?1:.65);return {...p,vehicle:id,max:Math.max(0,max),accel:Math.min(p.accel,p.power*1000/p.mass/2)*Math.sqrt(grip),brake:p.brake*grip,turn:Math.tan(p.steer)/p.wheelbase, radius:p.wheelbase/Math.tan(p.steer),grip};}
export function setGear(d,reverse,profile){if(d.speed>.15||reverse&&!profile.reverse)return false;d.gear=reverse?-1:1;return true;}
const approach=(a,b,amount)=>a+clamp(b-a,-amount,amount);
export function driveStep(d,pos,path,input,dt,profile,limit=Infinity){
 dt=clamp(dt,0,.2);const old={...pos},before=d.speed,manual=Math.hypot(input.x,input.z)>.01,route=!manual&&path.length>0&&!input.brake;
 if(route)d.gear=1;const reverse=manual&&d.gear===-1;d.grip=profile.grip;let target=manual?wrapYaw(Math.atan2(input.x,input.z)+(reverse?Math.PI:0)):route?Math.atan2(path[0].x-pos.x,path[0].z-pos.z):d.yaw;
 let delta=yawDelta(d.yaw,target);let wanted=input.brake?0:manual?profile.max*Math.min(1,Math.hypot(input.x,input.z)):route?Math.min(profile.max,Math.sqrt(2*profile.brake*routeLength(pos,path))):0;
 if(d.gear===-1)wanted=Math.min(wanted,3);if(route&&path.length>1){const a=path[0],b=path[1],turn=Math.abs(yawDelta(target,Math.atan2(b.x-a.x,b.z-a.z)));if(turn>.25)wanted=Math.min(wanted,Math.sqrt((profile.max*.22)**2+2*profile.brake*distance(pos,a)));}
 if(manual&&Math.abs(delta)>.55)wanted*=Math.max(.16,Math.cos(Math.min(Math.PI/2,Math.abs(delta))));
 const turnRate=route?Math.max(2,profile.turn*d.speed):Math.max(.7,Math.min(3.5,profile.turn*Math.max(1,d.speed)))*profile.grip;d.yaw=wrapYaw(d.yaw+clamp(delta,-turnRate*dt,turnRate*dt));d.steer=approach(d.steer,clamp(delta,-profile.steer,profile.steer),dt*4);d.roll=approach(d.roll,clamp(-d.steer*d.speed*.12,-1,1)*profile.roll,dt*2);d.indicator=Math.abs(delta)>.35?Math.sign(delta):0;
 const decel=!input.brake&&!manual&&!route?profile.brake*.18:profile.brake;const traction=Math.min(profile.accel,profile.power*1000/Math.max(1,profile.mass*Math.max(2,d.speed)))*(.55+.45*profile.grip);d.speed=approach(d.speed,wanted,(wanted<d.speed?decel:traction)*dt);let budget=Math.min(Math.max(0,limit),Math.max(0,(before+d.speed)*.5*dt));
 // Route movement keeps exact legacy waypoints and collision sweep; no overshoot.
 let moved=0,blocked=false,reached=false;
 if(route){const r=advanceRoute(pos,path,budget,profile.vehicle);moved=r.moved;blocked=r.blocked;reached=!path.length;if(reached)d.speed=0;}
 else if(budget>0){moved=moveSwept(pos,Math.sin(d.yaw)*budget*d.gear,Math.cos(d.yaw)*budget*d.gear,false,profile.vehicle);blocked=moved<budget-1e-6;}
 if(blocked||limit<=0)d.speed=0;
 d.acceleration=(d.speed-before)/Math.max(dt,.001);d.regen=profile.regen&&moved>0&&!blocked?Math.min(.012,Math.max(0,before*before-d.speed*d.speed)*profile.mass/7200000*.65):0;d.distance+=moved;d.wheelDistance+=moved*d.gear;d.braking=input.brake||wanted<before-.01||blocked||reached;
 return {moved,blocked,reached,dx:pos.x-old.x,dz:pos.z-old.z};
}

// Match the existing painted stall lines. Wide vehicles occupy two adjacent bays.
export function parkingTargets(id,pos,parked=[]){const wide=id==='VEH_TRUCK'||id==='VEH_LUX',width=wide?2.9:1.45;const out=[];for(const lot of sites.filter(s=>s.style==='parking')){const lines=[];for(let x=-lot.w/2+.8;x<lot.w/2;x+=1.45)lines.push(x);for(let i=0;i+(wide?2:1)<lines.length;i++){const target={x:lot.x+lines[i]+width/2,z:lot.z};const hw=id==='VEH_TRUCK'?.9:id==='VEH_LUX'?.78:id==='VEH_BIKE'||id==='VEH_MOTO'?.4:.72,hl=id==='VEH_TRUCK'?2:id==='VEH_LUX'?1.65:id==='VEH_BIKE'||id==='VEH_MOTO'?1:1.45;if(!walkable(target.x,target.z)||![-1,1].every(x=>[-1,1].every(z=>walkable(target.x+x*hw,target.z+z*hl)))||parked.some(v=>Math.abs(v.pos.z-target.z)<3.5&&Math.abs(v.pos.x-target.x)<(wide||v.id==='VEH_TRUCK'||v.id==='VEH_LUX'?2.2:1.5)))continue;out.push({id:lot.id,target,name:lot.name,distance:distance(pos,target)});}}return out.sort((a,b)=>a.distance-b.distance);}
