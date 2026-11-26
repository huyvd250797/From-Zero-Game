// Bounded, deterministic lane traffic. Each block is traversed during its axis's green phase.
// Traffic is cosmetic: no fines, damage or changes to the player's simulation ledger.
import {roadsX,roadsZ,SIZE} from './world.js';
const mod=(v,m)=>((v%m)+m)%m;
export const SIGNAL_CYCLE=20, GREEN=8;
export function signalPhase(t,axis){const p=mod(t+(axis==='x'?0:10),SIGNAL_CYCLE);return p<GREEN?'green':p<10?'amber':'red';}
const centers=[-16,...roadsX.map(r=>r.center).sort((a,b)=>a-b),SIZE+16];
export const intersections=roadsX.flatMap(x=>roadsZ.map(z=>({x:x.center,z:z.center,wx:x.width,wz:z.width})));
const colors=['#e4e5df','#bb6761','#d7ae55','#789bb8','#586b72','#a2aaba'];
const reversed=[...centers].reverse();
const lanes=[[roadsX,'x'],[roadsZ,'z']].flatMap(([roads,axis])=>roads.flatMap((r,i)=>[-1,1].map(dir=>({axis,dir,offset:i*2+(dir===1?0:3),sequence:dir===1?centers:reversed,lane:r.center+(axis==='x'?-dir:dir)*r.width*.25,key:`${r.id}:${dir}`,id:(i+Number(dir===1))%5===0?'TAXI':(i+Number(dir===1))%5===1?'VEH_TRUCK':'VEH_CAR',color:colors[(i+Number(dir===1)*2)%colors.length],yaw:axis==='x'?(dir===1?0:Math.PI):(dir===1?Math.PI/2:-Math.PI/2)}))));
export function trafficSnapshot(t){const result=[],phases={};for(const axis of ['x','z']){const local=t-(axis==='x'?0:10),cycle=Math.floor(local/SIGNAL_CYCLE),phase=mod(local,SIGNAL_CYCLE),f=Math.min(1,phase/GREEN);phases[axis]={cycle,phase,f,ease:f*f*(3-2*f)};}
 for(const {axis,dir,offset,sequence,lane,key,id,color,yaw} of lanes){const {cycle,phase,f,ease}=phases[axis],j=mod(cycle+offset,sequence.length-1),a=sequence[j],b=sequence[j+1],stop=8.5,coord=a-dir*stop+(b-a)*ease;if(coord<3||coord>SIZE-3)continue;
 result.push({key,id,color,pos:axis==='x'?{x:lane,z:coord}:{x:coord,z:lane},yaw,distance:Math.abs(coord-(sequence[0]-dir*stop)),speed:phase<GREEN?Math.abs(b-a)*6*f*(1-f)/GREEN:0,braking:phase>=GREEN*.5,steer:0,indicator:0});}return result;}

// Automatic drivers slow for peak traffic and stop before a red/amber crossing.
// Manual driving retains control, and a vehicle already inside the junction may clear it.
export function trafficLoad(minute){const m=((minute%1440)+1440)%1440;return m>=420&&m<540||m>=990&&m<1140?'peak':m>=360&&m<1320?'normal':'light';}
export function trafficConstraint(pos,next,t,minute,max){const load=trafficLoad(minute),factor=load==='peak'?.72:load==='normal'?.9:1;let speed=max*factor,limit=Infinity,signal=null;if(!next)return {speed,limit,signal,load};const dx=next.x-pos.x,dz=next.z-pos.z,axis=Math.abs(dz)>Math.abs(dx)?'x':'z',along=axis==='x'?dz:dx,cross=axis==='x'?dx:dz;if(Math.abs(along)<.01||Math.abs(cross)>Math.abs(along)*.13)return {speed,limit,signal,load};const dir=Math.sign(along),road=(axis==='x'?roadsX:roadsZ).find(r=>Math.abs((axis==='x'?pos.x:pos.z)-r.center)<=r.width/2+.15);if(!road)return {speed,limit,signal,load};for(const r of axis==='x'?roadsZ:roadsX){const d=(r.center-(axis==='x'?pos.z:pos.x))*dir,stop=d-r.width/2-.6;if(stop<-.04||d>Math.abs(along)+r.width/2||stop>Math.max(18,speed))continue;const phase=signalPhase(t,axis);if(phase==='green')continue;const gap=Math.max(0,stop);if(gap<limit){limit=gap;signal=phase;speed=Math.min(speed,Math.sqrt(2*Math.max(1,max/.6)*gap));}}return {speed,limit,signal,load};}
