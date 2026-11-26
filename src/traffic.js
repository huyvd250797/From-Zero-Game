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
const lanes=[[roadsX,'x'],[roadsZ,'z']].flatMap(([roads,axis])=>roads.flatMap((r,i)=>[-1,1].map(dir=>({axis,dir,offset:i*2+(dir===1?0:3),sequence:dir===1?centers:reversed,lane:r.center+(axis==='x'?-dir:dir)*r.width*.25,key:`${r.id}:${dir}`,id:(i+Number(dir===1))%5===0?'BUS':(i+Number(dir===1))%5===1?'VEH_TRUCK':'VEH_CAR',color:colors[(i+Number(dir===1)*2)%colors.length],yaw:axis==='x'?(dir===1?0:Math.PI):(dir===1?Math.PI/2:-Math.PI/2)}))));
export function trafficSnapshot(t){const result=[],phases={};for(const axis of ['x','z']){const local=t-(axis==='x'?0:10),cycle=Math.floor(local/SIGNAL_CYCLE),phase=mod(local,SIGNAL_CYCLE),f=Math.min(1,phase/GREEN);phases[axis]={cycle,phase,f,ease:f*f*(3-2*f)};}
 for(const {axis,dir,offset,sequence,lane,key,id,color,yaw} of lanes){const {cycle,phase,f,ease}=phases[axis],j=mod(cycle+offset,sequence.length-1),a=sequence[j],b=sequence[j+1],stop=8.5,coord=a-dir*stop+(b-a)*ease;if(coord<3||coord>SIZE-3)continue;
 result.push({key,id,color,pos:axis==='x'?{x:lane,z:coord}:{x:coord,z:lane},yaw,distance:Math.abs(coord-(sequence[0]-dir*stop)),speed:phase<GREEN?Math.abs(b-a)*6*f*(1-f)/GREEN:0,braking:phase>=GREEN*.5,steer:0,indicator:0});}return result;}

