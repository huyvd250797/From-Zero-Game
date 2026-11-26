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
export function meshArrays(raw,{grouped=true,ao=false,withUV=true}={}){
 const stream=surfaceGeometry(raw),count=stream.length/10,position=new Float32Array(count*3),normal=new Float32Array(count*3),color=new Float32Array(count*3),uv=withUV?new Float32Array(count*2):null,index=new Uint32Array(count),groups=[],counts=new Uint32Array(grouped?7:1),offsets=new Uint32Array(counts.length);
 for(let i=0;i<count;i+=3)counts[grouped?stream[i*10+9]:0]+=3;
 let offset=0;for(let id=0;id<counts.length;id++){offsets[id]=offset;if(counts[id])groups.push({start:offset,count:counts[id],materialIndex:id});offset+=counts[id];}
 for(let i=0;i<count;i+=3){const off=i*10,id=grouped?stream[off+9]:0;
  for(let k=0;k<3;k++){const s=off+k*10,j=(i+k)*3,x=stream[s],y=stream[s+1],z=stream[s+2],nx=stream[s+6],ny=stream[s+7],nz=stream[s+8];position[j]=x;position[j+1]=y;position[j+2]=z;normal[j]=nx;normal[j+1]=ny;normal[j+2]=nz;const contact=ao?(Math.abs(ny)<.65?.78+.22*Math.max(0,Math.min(1,(y-.08)/1.6)):.94+.06*Math.max(0,Math.min(1,y))):1;for(let l=0;l<3;l++)color[j+l]=linear(stream[s+3+l])*contact;if(uv){const q=(i+k)*2;uv[q]=Math.abs(ny)>.6?x:Math.abs(nx)>.6?z:x;uv[q+1]=Math.abs(ny)>.6?z:y;}}
  const j=i*3,ax=position[j+3]-position[j],ay=position[j+4]-position[j+1],az=position[j+5]-position[j+2],bx=position[j+6]-position[j],by=position[j+7]-position[j+1],bz=position[j+8]-position[j+2];const dot=(ay*bz-az*by)*normal[j]+(az*bx-ax*bz)*normal[j+1]+(ax*by-ay*bx)*normal[j+2],k=offsets[id];index[k]=i;index[k+1]=i+(dot<0?2:1);index[k+2]=i+(dot<0?1:2);offsets[id]+=3;
 }
 return {position,normal,color,uv,index,groups,count};
}
export function cameraSpec(camera,width,height,unit){const a=camera.yaw*Math.PI/180,{c,s,n}=cameraBasis(camera),d=480;return {target:[camera.x,0,camera.z],position:[camera.x+d*Math.sin(a)*c/n,d*s/n,camera.z+d*Math.cos(a)*c/n],halfWidth:width/(2*unit),halfHeight:height/(2*unit*n),near:.1,far:1000};}
export function treeBatches(items){const groups=[[],[],[]];for(const item of items)groups[item.type].push(item);return groups;}
// Same-origin only, no CDN or remote model URL. Deterministic grayscale surface texture.
export function texturePixels(kind,size=64){const bytes=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){let h=Math.imul(x+kind*97,374761393)^Math.imul(y+51,668265263);h=Math.imul(h^(h>>>13),1274126177);let v=232+((h>>>0)%24);if(kind===2&&(x%(size/4)<Math.max(1,size/64)||y%(size/4)<Math.max(1,size/64)))v=180;if(kind===5)v=210+((Math.imul(x+1,53)>>>0)%37)+((h>>>0)%8);if(kind===1)v=214+((h>>>0)%42);if(kind===6)v=219+((h>>>0)%36);bytes.set([v,v,v,255],(y*size+x)*4);}return bytes;}
