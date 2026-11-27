// Urban Planning 4.0: immutable derived geometry; canonical IDs/coordinates are retained.
const key=(x,z)=>`${x}:${z}`;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
export function createUrbanPlan(roads,sites,size,river,spawn,districts){
 const axes={x:roads.filter(r=>r.axis==='x'),z:roads.filter(r=>r.axis==='z')};
 const curves=new Map(),roundabouts=[],ringMap=new Map(),infill=[],alleys=[],yards=[];
 const clear=(x,z,rx,rz,plots=sites)=>x-rx>0&&x+rx<size&&z-rz>0&&z+rz<size&&(x+rx<river.minX||x-rx>river.maxX)&&!plots.some(b=>Math.abs(x-b.x)<rx+b.w/2+.35&&Math.abs(z-b.z)<rz+b.d/2+.35);
 // Distributed roundabouts at quiet junctions, clear of buildings, doors and river.
 for(const a of axes.x)for(const b of axes.z){const x=a.center,z=b.center;if(x<96&&z<96||Math.abs(x-river.minX)<28||((x-16)/32+(z-16)/32*3)%11!==5||!clear(x,z,8.5,8.5)||sites.some(p=>p.door&&dist({x,z},{x:p.door[0],z:p.door[1]})<12))continue;
  const ring=Object.freeze({id:`ROUND_${x}_${z}`,x,z,radius:6.3,island:2.6,outer:8.6});roundabouts.push(ring);ringMap.set(key(x,z),ring);
 }
 // Preserve bridge approaches and keep all canonical building doors accessible.
 for(const r of roads){const other=axes[r.axis==='x'?'z':'x'];const list=[];for(let i=0;i<other.length-1;i++){
  const a=other[i],b=other[i+1],ringA=ringMap.get(key(r.axis==='x'?r.center:a.center,r.axis==='x'?a.center:r.center)),ringB=ringMap.get(key(r.axis==='x'?r.center:b.center,r.axis==='x'?b.center:r.center)),lo=a.center+Math.max(a.width/2+2,ringA?ringA.outer+.4:0),hi=b.center-Math.max(b.width/2+2,ringB?ringB.outer+.4:0);if(hi-lo<12)continue;
  const mid=(lo+hi)/2,x=r.axis==='x'?r.center:mid,z=r.axis==='x'?mid:r.center;
  if(r.axis==='z'&&a.center<river.maxX+8&&b.center>river.minX-8||r.axis==='x'&&Math.abs(r.center-river.minX)<12)continue;
  if((Math.round(r.center/32)+i)%3===0)continue;
  const sign=(Math.round(r.center/32)+i)%2?1:-1;let chosen=0;
  for(const amp of [sign*5,-sign*5,sign*3.5,-sign*3.5,sign*2,-sign*2]){
   let ok=true;for(let k=lo;k<=hi;k+=.5){const o=amp*Math.sin(Math.PI*(k-lo)/(hi-lo))**2,p=r.axis==='x'?{x:r.center+o,z:k}:{x:k,z:r.center+o};const margin=r.width/2+1.45;
    if(!clear(p.x,p.z,r.axis==='x'?margin:.65,r.axis==='z'?margin:.65)){ok=false;break;}}
   if(ok&&sites.every(p=>{if(!p.door)return true;const k=r.axis==='x'?p.door[1]:p.door[0],lat=(r.axis==='x'?p.door[0]:p.door[1])-r.center;if(k<=lo||k>=hi||Math.abs(lat)<=r.width/2+.1)return true;return Math.abs(lat-amp*Math.sin(Math.PI*(k-lo)/(hi-lo))**2)>r.width/2+.1;})){chosen=amp;break;}}
  if(chosen)list.push(Object.freeze({lo,hi,amp:chosen}));
 }curves.set(r.id,Object.freeze(list));}
 const offset=(r,k)=>{const c=curves.get(r.id)?.find(a=>k>a.lo&&k<a.hi);return c?c.amp*Math.sin(Math.PI*(k-c.lo)/(c.hi-c.lo))**2:0;};
 const point=(r,k,lateral=0)=>r.axis==='x'?{x:r.center+offset(r,k)+lateral,z:k}:{x:k,z:r.center+offset(r,k)+lateral};
 // Insert small secondary houses in generous single-building blocks, plus landscaped forecourts.
 // Never move or resize canonical buildings. Only new secondary buildings are collision solids.
 for(let ix=0;ix<axes.x.length-1;ix++)for(let iz=0;iz<axes.z.length-1;iz++){
  const l=axes.x[ix],r=axes.x[ix+1],t=axes.z[iz],b=axes.z[iz+1],cx=(l.center+r.center)/2,cz=(t.center+b.center)/2;
  if(cx>river.minX-16&&cx<river.maxX+16)continue;
  const block=sites.filter(p=>p.x>l.center&&p.x<r.center&&p.z>t.center&&p.z<b.center);if(!block.some(p=>p.h))continue;
  const roadClear=(x,z,rx,rz)=>[z-rz,z,z+rz].every(k=>x-rx>l.center+offset(l,k)+l.width/2+1.5&&x+rx<r.center+offset(r,k)-r.width/2-1.5)&&[x-rx,x,x+rx].every(k=>z-rz>t.center+offset(t,k)+t.width/2+1.5&&z+rz<b.center+offset(b,k)-b.width/2-1.5);
  // Offset pocket yards on the rear sides, not four road-facing facades.
  for(const p of block){if(!p.h)continue;const side=p.door?Math.abs(p.door[0]-p.x)/p.w>Math.abs(p.door[1]-p.z)/p.d?'x':'z':'z';const sign=p.door?Math.sign((side==='x'?p.door[0]-p.x:p.door[1]-p.z))||1:1;const q={x:p.x-(side==='x'?sign*(p.w/2+1.3):0),z:p.z-(side==='z'?sign*(p.d/2+1.3):0),w:side==='x'?1.7:Math.min(p.w,8),d:side==='z'?1.7:Math.min(p.d,8)};if(roadClear(q.x,q.z,q.w/2,q.d/2)&&clear(q.x,q.z,q.w/2,q.d/2))yards.push(q);}
  if(cx<96&&cz<96||block.filter(p=>p.h).length!==1)continue;
  let found=false;for(const dx of [-9,9,-8,8,-7,7,-6,6,-5,5,-4,4,0]){if(found)break;for(const dz of [-9,9,-8,8,-7,7,-6,6,-5,5,-4,4,0]){const x=cx+dx,z=cz+dz,w=3.8,d=4.8;if(!roadClear(x,z,w/2+.7,d/2+.7)||!clear(x,z,w/2+1.1,d/2+1.1,[...sites,...infill])||sites.some(p=>p.door&&dist({x,z},{x:p.door[0],z:p.door[1]})<5.5)||dist({x,z},spawn)<8)continue;
   const id=`urban_annex_${ix}_${iz}`;infill.push({id,kind:id,masterId:id,name:'Nhà liền kề',district:districts.find(d=>x>=d.minX&&x<d.maxX&&z>=d.minZ&&z<d.maxZ).id,x,z,w,d,h:3.6+(ix+iz)%2,style:'rowhouse',color:'#d3bea4',interactive:false,urbanAnnex:true});found=true;break;}}
 }
 // Shared pedestrian access alleys between existing adjacent plots. They are not arterial lanes.
 for(let ix=0;ix<axes.x.length-1;ix++)for(let iz=0;iz<axes.z.length-1;iz++){
  const l=axes.x[ix],r=axes.x[ix+1],t=axes.z[iz],b=axes.z[iz+1],cx=(l.center+r.center)/2,cz=(t.center+b.center)/2;if(cx>river.minX-16&&cx<river.maxX+16)continue;
  const row=[...sites,...infill].filter(p=>p.h&&p.x>l.center&&p.x<r.center&&p.z>t.center&&p.z<b.center);if(row.length<2)continue;
  for(const x of [cx,cx-1,cx+1]){const z1=t.center+offset(t,x)+t.width/2+.65,z2=b.center+offset(b,x)-b.width/2-.65;if(row.some(p=>Math.abs(x-p.x)<p.w/2+.95&&p.z+p.d/2>z1&&p.z-p.d/2<z2))continue;
   if(sites.some(p=>!p.h&&Math.abs(x-p.x)<p.w/2+1&&p.z+p.d/2>z1&&p.z-p.d/2<z2))continue;
   alleys.push({id:`ALLEY_${ix}_${iz}`,x,z1,z2,width:1.8});break;}
 }
 return Object.freeze({curves,roundabouts:Object.freeze(roundabouts),infill:Object.freeze(infill),alleys:Object.freeze(alleys),yards:Object.freeze(yards),offset,point,ringAt:(x,z)=>ringMap.get(key(x,z)),stats:Object.freeze({curvedSegments:[...curves.values()].reduce((n,c)=>n+c.length,0),roundabouts:roundabouts.length,annexes:infill.length,alleys:alleys.length,yards:yards.length})});
}
