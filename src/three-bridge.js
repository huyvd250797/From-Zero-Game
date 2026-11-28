import {isBuildingGlass} from './atmosphere-detail.js';
import {cameraBasis} from './camera-control.js';
import {surfaceGeometry} from './graphics.js';
// Presentation-only conversion. Canonical game coordinates, colours and triangle surfaces remain intact.
export const MATERIALS=Object.freeze([
 {name:'Concrete',roughness:.85,metalness:0}, {name:'Asphalt',roughness:.96,metalness:0},
 {name:'Pavement',roughness:.87,metalness:0}, {name:'Glass',roughness:.19,metalness:.25},
 {name:'Metal',roughness:.38,metalness:.55}, {name:'Wood',roughness:.68,metalness:0},
 {name:'Vegetation',roughness:.98,metalness:0}
].map(Object.freeze));
export const linear=c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4;
// Single-pass conversion of the normal stream; no per-vertex arrays or subarray views.
export function meshArrays(raw,{grouped=true,ao=false,withUV=true,windowLighting=false,materialIds=null,materialCount=0}={}){
 const stream=surfaceGeometry(raw),count=stream.length/10,position=new Float32Array(count*3),normal=new Float32Array(count*3),color=new Float32Array(count*3),uv=withUV?new Float32Array(count*2):null,index=new Uint32Array(count),groups=[],counts=new Uint32Array(materialIds?materialCount:grouped?(windowLighting?8:7):1),offsets=new Uint32Array(counts.length);
 const groupAt=i=>materialIds?materialIds[i/3]:!grouped?0:windowLighting&&stream[i*10+9]===3&&isBuildingGlass(stream[i*10+3],stream[i*10+4],stream[i*10+5])?7:stream[i*10+9];
 for(let i=0;i<count;i+=3)counts[groupAt(i)]+=3;
 let offset=0;for(let id=0;id<counts.length;id++){offsets[id]=offset;if(counts[id])groups.push({start:offset,count:counts[id],materialIndex:id});offset+=counts[id];}
 for(let i=0;i<count;i+=3){const off=i*10,id=groupAt(i);
  for(let k=0;k<3;k++){const s=off+k*10,j=(i+k)*3,x=stream[s],y=stream[s+1],z=stream[s+2],nx=stream[s+6],ny=stream[s+7],nz=stream[s+8];position[j]=x;position[j+1]=y;position[j+2]=z;normal[j]=nx;normal[j+1]=ny;normal[j+2]=nz;const contact=ao?(Math.abs(ny)<.65?.78+.22*Math.max(0,Math.min(1,(y-.08)/1.6)):.94+.06*Math.max(0,Math.min(1,y))):1;for(let l=0;l<3;l++)color[j+l]=linear(stream[s+3+l])*contact;if(uv){const q=(i+k)*2;uv[q]=Math.abs(ny)>.6?x:Math.abs(nx)>.6?z:x;uv[q+1]=Math.abs(ny)>.6?z:y;}}
  const j=i*3,ax=position[j+3]-position[j],ay=position[j+4]-position[j+1],az=position[j+5]-position[j+2],bx=position[j+6]-position[j],by=position[j+7]-position[j+1],bz=position[j+8]-position[j+2];const dot=(ay*bz-az*by)*normal[j]+(az*bx-ax*bz)*normal[j+1]+(ax*by-ay*bx)*normal[j+2],k=offsets[id];index[k]=i;index[k+1]=i+(dot<0?2:1);index[k+2]=i+(dot<0?1:2);offsets[id]+=3;
 }
 return {position,normal,color,uv,index,groups,count};
}
export function cameraSpec(camera,width,height,unit){const a=camera.yaw*Math.PI/180,{c,s,n}=cameraBasis(camera),d=480;return {target:[camera.x,0,camera.z],position:[camera.x+d*Math.sin(a)*c/n,d*s/n,camera.z+d*Math.cos(a)*c/n],halfWidth:width/(2*unit),halfHeight:height/(2*unit*n),near:.1,far:1000};}
export function treeBatches(items){const groups=[[],[],[]];for(const item of items)groups[item.type].push(item);return groups;}
// Same-origin only, no CDN or remote model URL. Deterministic grayscale surface texture.
export function texturePixels(kind,size=64){const bytes=new Uint8Array(size*size*4);const noise=(x,y)=>{let h=Math.imul(x+kind*97,374761393)^Math.imul(y+51,668265263);return (Math.imul(h^(h>>>13),1274126177)>>>0)%256;};for(let y=0;y<size;y++)for(let x=0;x<size;x++){const n=noise(x,y),coarse=noise(Math.floor(x/4),Math.floor(y/4));let v=230+n%19+coarse%7;if(kind===1){v=218+n%27+(coarse%9);if(n<7)v-=20;}else if(kind===2){const tile=Math.max(4,size/4),seam=Math.max(1,size/64);if(x%tile<seam||y%tile<seam)v=177+coarse%12;else v=226+(noise(Math.floor(x/tile),Math.floor(y/tile))%18)+n%7;}else if(kind===5){v=218+Math.round(16*Math.sin(x*.49+2*Math.sin(y/size*Math.PI*2)))+n%9;}else if(kind===6)v=216+n%23+coarse%15;v=Math.max(0,Math.min(255,v));bytes.set([v,v,v,255],(y*size+x)*4);}return bytes;}
