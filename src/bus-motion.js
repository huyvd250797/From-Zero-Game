// Timetable kinematics shared by the rider and the visible bus. Units: world metres/real simulation second.
import {distance} from './navigation.js';
import {roadAt} from './road-rules.js';
export const BUS_MAX_SPEED=30/3.6, BUS_ACCEL=1.35, BUS_BRAKE=1.8, BUS_YAW_RATE=1.0;
const angle=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
const heading=(a,b)=>Math.atan2(b.x-a.x,b.z-a.z);
// Subdivide long straights so acceleration and the final approach are bounded everywhere.
export function busMotion(start,path,startYaw,endYaw){
 const pts=[start],waypoints=[];for(const b of path){const a=pts.at(-1),len=distance(a,b),n=Math.max(2,Math.ceil(len/1.25));if(len>1e-7)for(let i=1;i<=n;i++)pts.push({x:a.x+(b.x-a.x)*i/n,z:a.z+(b.z-a.z)*i/n});waypoints.push(pts.length-1);}
 const ds=[0],v=pts.map((p,i)=>Math.min(BUS_MAX_SPEED,(roadAt(p)?.kmh||25)/3.6,i===0||i===pts.length-1?0:Infinity));
 for(let i=1;i<pts.length;i++)ds.push(ds[i-1]+distance(pts[i-1],pts[i]));
 for(let i=1;i<pts.length-1;i++){const bend=Math.abs(angle(heading(pts[i-1],pts[i]),heading(pts[i],pts[i+1])));if(bend>.12)v[i]=Math.min(v[i],Math.max(.65,2.5/(1+bend)));v[i]=Math.min(v[i],Math.sqrt(2*BUS_ACCEL*ds[i]),Math.sqrt(2*BUS_BRAKE*(ds.at(-1)-ds[i])));if(ds[i]<=4.001||ds.at(-1)-ds[i]<=4.001)v[i]=Math.min(v[i],2.0);}
 const yaw=pts.map((p,i)=>i===0?startYaw:i===pts.length-1?endYaw:heading(pts[i-1],p)+angle(heading(pts[i-1],p),heading(p,pts[i+1]))*.5);
 for(let i=1;i<pts.length;i++){const turn=Math.abs(angle(yaw[i-1],yaw[i]));if(turn>.001){const cap=BUS_YAW_RATE*(ds[i]-ds[i-1])/turn;v[i]=Math.min(v[i],cap);v[i-1]=Math.min(v[i-1],cap);}}
 for(let i=1;i<v.length;i++)v[i]=Math.min(v[i],Math.sqrt(v[i-1]**2+2*BUS_ACCEL*(ds[i]-ds[i-1])));
 for(let i=v.length-2;i>=0;i--)v[i]=Math.min(v[i],Math.sqrt(v[i+1]**2+2*BUS_BRAKE*(ds[i+1]-ds[i])));
 const ts=[0];for(let i=1;i<pts.length;i++)ts.push(ts[i-1]+2*(ds[i]-ds[i-1])/Math.max(.001,v[i]+v[i-1]));

 return {pts,ds,v,ts,yaw,waypointDistances:waypoints.map(i=>ds[i]),seconds:ts.at(-1),length:ds.at(-1)};
}
export function sampleBusMotion(m,f){const t=Math.max(0,Math.min(1,f))*m.seconds;let lo=0,hi=m.ts.length-1;while(hi-lo>1){const mid=(hi+lo)>>1;if(m.ts[mid]<=t)lo=mid;else hi=mid;}const dt=m.ts[hi]-m.ts[lo],u=Math.max(0,Math.min(dt,t-m.ts[lo])),acc=(m.v[hi]-m.v[lo])/(dt||1),travel=m.v[lo]*u+.5*acc*u*u,gap=m.ds[hi]-m.ds[lo],k=Math.max(0,Math.min(1,travel/(gap||1))),a=m.pts[lo],b=m.pts[hi];return {pos:{x:a.x+(b.x-a.x)*k,z:a.z+(b.z-a.z)*k},yaw:m.yaw[lo]+angle(m.yaw[lo],m.yaw[hi])*k,distance:m.ds[lo]+travel,speed:Math.max(0,m.v[lo]+acc*u),braking:acc<-.05};}
