// Layout 5. Preserve civic/interactive anchors; replat only decorative parcels.
// A district can contain merged blocks, long bends and L-shaped pedestrian access.
const regions=[
 {id:'DONG_AN_BINH',x0:240,x1:304,z0:16,z1:80,axis:272,amp:16},
 {id:'NAM_AN',x0:16,x1:80,z0:240,z1:304,axis:48,amp:15},
 {id:'RIVERSIDE',x0:240,x1:304,z0:240,z1:304,axis:272,amp:15},
 {id:'TAN_PHU',x0:304,x1:368,z0:240,z1:304,axis:336,amp:-15},
 {id:'NAM_AN_SOUTH',x0:16,x1:80,z0:304,z1:368,axis:48,amp:-17,s:true}
];
const overlap=(a,b,pad=0)=>Math.abs(a.x-b.x)<(a.w+b.w)/2+pad&&Math.abs(a.z-b.z)<(a.d+b.d)/2+pad;
const inside=(p,r)=>p.x>r.x0&&p.x<r.x1&&p.z>r.z0&&p.z<r.z1;
export function organicLayout(roads,sites,base,districts){
 const cuts=new Map(),curves=new Map([...base.curves].map(([id,list])=>[id,[...list]])),clusters=[],alleys=[],added=[],replatted=new Map();
 for(const region of regions){const {x0,x1,z0,z1,axis,amp,s}=region,mid=(z0+z1)/2,rx=roads.find(r=>r.axis==='x'&&r.center===axis),rz=roads.find(r=>r.axis==='z'&&r.center===mid);
  const curve={lo:z0+5,hi:z1-5,amp,shape:s?'s':'long'};
  curves.set(rx.id,[...curves.get(rx.id).filter(c=>c.hi<=z0||c.lo>=z1),curve]);
  cuts.set(rz.id,[...(cuts.get(rz.id)||[]),[x0,x1]]);curves.set(rz.id,curves.get(rz.id).filter(c=>c.hi<=x0||c.lo>=x1));
 }
 const offset=(r,k)=>{const c=curves.get(r.id)?.find(a=>k>a.lo&&k<a.hi);if(!c)return 0;const t=(k-c.lo)/(c.hi-c.lo);return c.amp*(c.shape==='s'?Math.sin(2*Math.PI*t)*Math.sin(Math.PI*t):Math.sin(Math.PI*t)**2);};
 const point=(r,k,lateral=0)=>r.axis==='x'?{x:r.center+offset(r,k)+lateral,z:k}:{x:k,z:r.center+offset(r,k)+lateral};
 const active=(r,k)=>!(cuts.get(r.id)||[]).some(([a,b])=>k>a+1e-6&&k<b-1e-6);
 const ranges=(r,a,b)=>{let cursor=a,out=[];for(const [lo,hi] of (cuts.get(r.id)||[]).slice().sort((a,b)=>a[0]-b[0])){if(hi<=cursor||lo>=b)continue;if(lo>cursor)out.push([cursor,Math.min(lo,b)]);cursor=Math.max(cursor,hi);}if(cursor<b)out.push([cursor,b]);return out;};
 const roadClear=p=>{for(const r of roads){const k=r.axis==='x'?p.z:p.x,half=r.axis==='x'?p.d/2:p.w/2,lat=r.axis==='x'?p.x:p.z,wide=r.axis==='x'?p.w/2:p.d/2;for(let v=k-half-1;v<=k+half+1.01;v+=.5){if(!active(r,v))continue;if(Math.abs(lat-r.center-offset(r,v))<wide+r.width/2+1.65)return false;}}return !base.roundabouts.some(r=>Math.hypot(Math.max(0,Math.abs(r.x-p.x)-p.w/2),Math.max(0,Math.abs(r.z-p.z)-p.d/2))<r.outer+1);};
 const retained=sites.filter(p=>p.interactive||!regions.some(r=>inside(p,r))||!p.h),occupied=[...retained,...base.infill.filter(p=>!regions.some(r=>inside(p,r)))];
 const palette=['#d9bb97','#c5c8b5','#c99c83','#d0c3a8','#b6c4bc','#e0c6a1'];
 for(const [ri,r] of regions.entries()){
  const originals=sites.filter(p=>inside(p,r)&&!p.interactive&&p.h),placed=[];let n=0;
  // Whole rows on shared parcels; 3/4-house rows and two-row courts of 6/8 houses.
  for(const count of [8,6,4,3,4,3]){let found=null;const cols=count>=6?count/2:count,rows=count>=6?2:1,w=3.2,d=5.2,pitch=3.55,rowPitch=9.0;
   for(let z=r.z0+10;z<=r.z1-9&&!found;z+=2)for(let x=r.x0+9;x<=r.x1-9&&!found;x+=1){const group=[];for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)group.push({x:x+(i-(cols-1)/2)*pitch,z:z+j*rowPitch,w,d});if(group.some(p=>p.x-p.w/2<r.x0+6||p.x+p.w/2>r.x1-6||p.z+p.d/2>r.z1-6||!roadClear(p)||occupied.some(q=>overlap(p,q,1.45))||alleys.some(a=>Math.min(a.a.x,a.b.x)<p.x+p.w/2+1.1&&Math.max(a.a.x,a.b.x)>p.x-p.w/2-1.1&&Math.min(a.a.z,a.b.z)<p.z+p.d/2+1.1&&Math.max(a.a.z,a.b.z)>p.z-p.d/2-1.1)||sites.some(q=>q.door&&Math.abs(q.door[0]-p.x)<p.w/2+2&&Math.abs(q.door[1]-p.z)<p.d/2+2)))continue;
    // Leave a continuous shared aisle and a right-angle alley from a nearby road shoulder.
    const left=x-(cols-1)/2*pitch-w/2,right=x+(cols-1)/2*pitch+w/2,az=z+(rows===2?rowPitch/2:d/2+1.6);

    // Instead of forcing an alley through other buildings, search a clear L connection to either side road.
    const collides=(a,b,q)=>Math.min(a.x,b.x)<q.x+q.w/2+.9&&Math.max(a.x,b.x)>q.x-q.w/2-.9&&Math.min(a.z,b.z)<q.z+q.d/2+.9&&Math.max(a.z,b.z)>q.z-q.d/2-.9;
    const opts=[];for(const side of [-1,1]){const ex=side<0?left-1.4:right+1.4;for(const boundary of [r.z0,r.z1]){const road=roads.find(q=>q.axis==='z'&&q.center===boundary),end=point(road,ex,(boundary===r.z0?1:-1)*(road.width/2+1.05));opts.push([{x:x,z:az},{x:ex,z:az},end]);}for(const boundary of [r.x0,r.x1]){const k=az+side*5,road=roads.find(q=>q.axis==='x'&&q.center===boundary),end=point(road,k,(boundary===r.x0?1:-1)*(road.width/2+1.05));opts.push([{x:x,z:az},{x:ex,z:az},{x:ex,z:k},end]);}}
    const access=opts.find(ps=>ps.every((p,i)=>i===0||![...occupied,...group].some(q=>collides(ps[i-1],p,q)))&&ps.every(p=>inside(p,r)));if(!access)continue;
    found={group,access};}
   if(!found)continue;const clusterId=`ROW_${r.id}_${clusters.length}`;const ids=[];for(const [i,p] of found.group.entries()){const old=originals[n],id=old?.id||`organic_${r.id}_${n}`,b={...old,...p,id,kind:id,masterId:old?.masterId||id,style:'rowhouse',h:3.6+(n%3)*.85,name:'Nhà liền kề',color:palette[(n+ri)%palette.length],interactive:false,door:undefined,district:districts.find(d=>p.x>=d.minX&&p.x<d.maxX&&p.z>=d.minZ&&p.z<d.maxZ).id,urbanAnnex:!old,organicFront:found.group.length>=6&&i>=found.group.length/2?-1:1,organicCluster:clusterId};n++;ids.push(id);occupied.push(b);placed.push(b);if(old)replatted.set(old.id,b);else added.push(b);}
   clusters.push({id:clusterId,region:r.id,homes:ids,frontages:1});for(let j=1;j<found.access.length;j++){const a=found.access[j-1],b=found.access[j];alleys.push({id:`${clusterId}_${j}`,a,b,width:1.8});} }
  // Preserve canonical decorative IDs not used by rows, shrink/move to a free parcel.
  for(const old of originals.slice(n)){let found=null;for(let z=r.z0+8;z<r.z1-7&&!found;z+=2)for(let x=r.x0+8;x<r.x1-7&&!found;x+=2){const p={...old,x,z,w:3.4,d:5,h:4,style:'rowhouse'};if(roadClear(p)&&!occupied.some(q=>overlap(p,q,1.5))&&!alleys.some(a=>Math.min(a.a.x,a.b.x)<x+p.w/2+1.2&&Math.max(a.a.x,a.b.x)>x-p.w/2-1.2&&Math.min(a.a.z,a.b.z)<z+p.d/2+1.2&&Math.max(a.a.z,a.b.z)>z-p.d/2-1.2)&&!sites.some(q=>q.door&&Math.abs(q.door[0]-x)<p.w/2+2&&Math.abs(q.door[1]-z)<p.d/2+2))found=p;}if(!found)throw Error('Cannot replot '+old.id);occupied.push(found);replatted.set(old.id,found);}
 }
 const originalAlleys=base.alleys.filter(a=>!regions.some(r=>inside({x:a.x,z:(a.z1+a.z2)/2},r))),yards=base.yards.filter(p=>!regions.some(r=>inside(p,r))),infill=[...base.infill.filter(p=>!regions.some(r=>inside(p,r))),...added];
 return {...base,curves,offset,point,active,ranges,cuts,regions,clusters,organicAlleys:alleys,replatted,infill,alleys:originalAlleys,yards,stats:{...base.stats,curvedSegments:[...curves.values()].reduce((n,a)=>n+a.length,0),annexes:infill.length,alleys:originalAlleys.length+alleys.length,yards:yards.length,mergedRegions:regions.length,terraceClusters:clusters.length,removedRoadLength:[...cuts.values()].flat().reduce((n,[a,b])=>n+b-a,0)}};
}
