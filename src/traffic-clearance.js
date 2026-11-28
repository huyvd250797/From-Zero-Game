import {COLLECTION_IDS,collectionFootprint} from './vehicle-collection.js';
// Shared chassis clearance for all traffic. All positions in game-world metres.
// Three overlapping discs approximate the footprint without blocking an entire adjacent lane.
const sizes={...Object.fromEntries(COLLECTION_IDS.map(id=>[id,collectionFootprint(id)])),pedestrian:[.26,.26],VEH_BIKE:[.28,.9],VEH_MOTO:[.32,.95],VEH_CAR:[.7,1.48],VEH_EV:[.7,1.48],VEH_LUX:[.75,1.65],VEH_TRUCK:[.86,2],BUS:[.86,2.34],TAXI:[.7,1.48]};
export const CLEARANCE=.45;
const size=a=>sizes[a.kind==='pedestrian'?'pedestrian':a.id]||sizes.VEH_CAR;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
function discs(a){const [r,l]=size(a),d=Math.max(0,l-r),s=Math.sin(a.yaw||0),c=Math.cos(a.yaw||0);return (d?[-d,0,d]:[0]).map(k=>({x:a.pos.x+s*k,z:a.pos.z+c*k,r}));}
export function footprintGap(a,b){if(!a?.pos||!b?.pos)return Infinity;if(distance(a.pos,b.pos)>10)return distance(a.pos,b.pos)-size(a)[1]-size(b)[1];let gap=Infinity;for(const x of discs(a))for(const y of discs(b))gap=Math.min(gap,distance(x,y)-x.r-y.r);return gap;}
const angle=(a,b)=>Math.atan2(Math.sin(b-a),Math.cos(b-a));
function pose(a,b,t){return {...b,pos:{x:a.pos.x+(b.pos.x-a.pos.x)*t,z:a.pos.z+(b.pos.z-a.pos.z)*t},yaw:(a.yaw||0)+angle(a.yaw||0,b.yaw||0)*t};}
function minRelative(a,b,c,d){const x=a.x-c.x,z=a.z-c.z,dx=(b.x-a.x)-(d.x-c.x),dz=(b.z-a.z)-(d.z-c.z),v=dx*dx+dz*dz,t=v?Math.max(0,Math.min(1,-(x*dx+z*dz)/v)):0;return Math.hypot(x+dx*t,z+dz*t)-a.r-c.r;}
// Continuous relative sweep with turn subdivision. If actors begin overlapping, only
// allow motion which increases separation and never crosses to the other side.
export function sweptClearance(a,b,c,d=c,margin=CLEARANCE){if(!a?.pos||!b?.pos||!c?.pos||!d?.pos)return true;if(a.key!=null&&a.key===c.key)return true;const travel=distance(a.pos,b.pos)+distance(c.pos,d.pos);if(distance(a.pos,c.pos)>travel+size(a)[1]+size(c)[1]+margin+.5)return true;const initial=footprintGap(a,c),end=footprintGap(b,d);if(travel<1e-8&&Math.abs(angle(a.yaw||0,b.yaw||0))+Math.abs(angle(c.yaw||0,d.yaw||0))<1e-6)return initial>=margin;const steps=Math.max(1,Math.ceil(Math.max(Math.abs(angle(a.yaw||0,b.yaw||0)),Math.abs(angle(c.yaw||0,d.yaw||0)))/.12));let least=Infinity;for(let i=0;i<steps;i++){const aa=discs(pose(a,b,i/steps)),bb=discs(pose(a,b,(i+1)/steps)),cc=discs(pose(c,d,i/steps)),dd=discs(pose(c,d,(i+1)/steps));for(let j=0;j<aa.length;j++)for(let k=0;k<cc.length;k++)least=Math.min(least,minRelative(aa[j],bb[j],cc[k],dd[k]));}return least>=margin-1e-6||(initial<margin&&end>initial+.0001&&least>=initial-.0001);}
export function clearMovement(a,b,actors,margin=CLEARANCE){return actors.every(c=>!c?.pos||c.key!=null&&c.key===a.key||sweptClearance(a,b,c,c,margin));}
