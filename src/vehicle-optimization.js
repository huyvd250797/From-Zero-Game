// Presentation-only policies. No simulation actor is removed or modified.
export function vehicleRenderBudget(mobile,quality,pixels=Infinity,pressure=0){
 const p=Math.max(0,Math.min(2,pressure|0));
 const base=mobile?(pixels<=430000?0:1):quality===0?1:quality===1?2:4;
 return {pressure:p,assets:p===2?0:p===1?Math.min(1,base):base,cache:mobile?(p?4:6):(p?8:12),loads:p===2?0:mobile||p?1:2,reflection:p===2?.35:p===1?.65:1,lights:mobile?(p===2?0:p===1?1:2):(p===2?1:p===1?2:Infinity),detail:p===0};
}
// Require sustained pressure to degrade; recovery is deliberately slower.
export class VehiclePressure {
 constructor(){this.reset();}
 reset(){this.level=0;this.count=0;this.bad=0;this.good=0;}
 sample(gap,work,target){if(!Number.isFinite(gap)||!Number.isFinite(work)||!(target>0)||gap<=0||gap>500)return this.level;const budget=1000/target;this.count++;if(gap>budget*1.35||work>budget*.8)this.bad++;if(this.count>=Math.max(24,Math.round(target*2))){const ratio=this.bad/this.count;if(ratio>.3){this.level=Math.min(2,this.level+1);this.good=0;}else if(ratio<.08){if(++this.good>=4){this.level=Math.max(0,this.level-1);this.good=0;}}else this.good=0;this.count=this.bad=0;}return this.level;}
}
// Hysteresis only at soft boundaries; hard device/quality limits always win.
export class VehicleLODHistory {
 constructor(){this.rows=new Map();this.frame=0;}
 begin(){this.frame++;}
 choose(key,{pixels,distance,mobile,quality,owned,pressure=0,pixelBudget=Infinity}){const old=this.rows.get(key)?.lod;let lod=2;
 if(quality>0&&pressure<2&&pixels>=3.5&&distance<=90){if(mobile){if(owned&&pixelBudget>430000&&pressure===0&&pixels>=(old===1?8:9))lod=1;}else{if(pixels>=(old===0?8:9)&&(owned||distance<(old===0?26:22))&&quality>=2&&pressure===0)lod=0;else if(pixels>=(old===1||old===0?4.5:5)&&distance<(old===1||old===0?72:65))lod=1;}}
 if(key!=null)this.rows.set(key,{lod,frame:this.frame});return lod;}
 end(){for(const [key,value] of this.rows)if(this.frame-value.frame>120)this.rows.delete(key);while(this.rows.size>512)this.rows.delete(this.rows.keys().next().value);}
}
export function evictVehicleTemplates(cache,protectedKeys,limit,release){let removed=0;for(const [key,entry] of cache){if(cache.size<=Math.max(limit,protectedKeys.size))break;if(protectedKeys.has(key))continue;cache.delete(key);release(entry,key);removed++;}return removed;}
// Conservative sphere / frustum test is supplied by the active Three camera.
export function vehicleBounds(v,dimensions){const {w,d}=dimensions(v.id);return {x:v.pos.x,y:.8,z:v.pos.z,radius:Math.hypot(w*.7,d*.65,1.4)+.7};}

// Write tagged triangles straight into the persistent GPU upload arrays. Unlike the
// general city conversion, vehicle surface tags already identify every material.
const srgb=c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4;
export function fillVehicleBuffers(raw,tags,out,materialCount){
 const count=raw.length/6;if(raw.length%18||tags.length!==count/3)throw Error('Invalid vehicle triangle stream');
 const counts=new Uint32Array(materialCount),offsets=new Uint32Array(materialCount),groups=[];
 for(const id of tags){if(!Number.isInteger(id)||id<0||id>=materialCount)throw Error('Invalid vehicle surface');counts[id]+=3;}
 let offset=0;for(let id=0;id<materialCount;id++){offsets[id]=offset;if(counts[id])groups.push({start:offset,count:counts[id],materialIndex:id});offset+=counts[id];}
 for(let i=0,j=0;i<raw.length;i+=18,j+=9){const f=Math.fround,ax=f(raw[i+6])-f(raw[i]),ay=f(raw[i+7])-f(raw[i+1]),az=f(raw[i+8])-f(raw[i+2]),bx=f(raw[i+12])-f(raw[i]),by=f(raw[i+13])-f(raw[i+1]),bz=f(raw[i+14])-f(raw[i+2]);let nx=az*by-ay*bz,ny=ax*bz-az*bx,nz=ay*bx-ax*by;const len=Math.hypot(nx,ny,nz)||1;nx/=len;ny/=len;nz/=len;if((f(raw[i+1])+f(raw[i+7])+f(raw[i+13]))/3<.17&&ny<-.8){nx=-nx;ny=-ny;nz=-nz;}for(let k=0;k<3;k++){const q=i+k*6,d=j+k*3;out.position[d]=raw[q];out.position[d+1]=raw[q+1];out.position[d+2]=raw[q+2];out.normal[d]=nx;out.normal[d+1]=ny;out.normal[d+2]=nz;out.color[d]=srgb(f(raw[q+3]));out.color[d+1]=srgb(f(raw[q+4]));out.color[d+2]=srgb(f(raw[q+5]));}const id=tags[i/18],k=offsets[id],v=j/3,flip=(ay*bz-az*by)*f(nx)+(az*bx-ax*bz)*f(ny)+(ax*by-ay*bx)*f(nz)<0;out.index[k]=v;out.index[k+1]=v+(flip?2:1);out.index[k+2]=v+(flip?1:2);offsets[id]+=3;}
 return {count,groups};
}
