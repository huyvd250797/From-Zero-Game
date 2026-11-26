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
export function meshArrays(raw,{grouped=true,ao=false}={}){
 const stream=surfaceGeometry(raw),count=stream.length/10,position=new Float32Array(count*3),normal=new Float32Array(count*3),color=new Float32Array(count*3),uv=new Float32Array(count*2),indices=Array.from({length:grouped?7:1},()=>[]);
 for(let i=0;i<count;i+=3){const off=i*10,id=grouped?stream[off+9]:0;
  for(let k=0;k<3;k++){const s=off+k*10,j=i+k,x=stream[s],y=stream[s+1],z=stream[s+2],nx=stream[s+6],ny=stream[s+7],nz=stream[s+8];position.set([x,y,z],j*3);normal.set([nx,ny,nz],j*3);const contact=ao?.76+.24*Math.max(0,Math.min(1,(y-.1)/1)):1;for(let l=0;l<3;l++)color[j*3+l]=linear(stream[s+3+l])*contact;uv.set(Math.abs(ny)>.6?[x,z]:Math.abs(nx)>.6?[z,y]:[x,y],j*2);}
  // Preserve intended face normal; reverse clockwise legacy faces before Three's front-face test.
  const a=position.subarray(i*3,i*3+3),b=position.subarray(i*3+3,i*3+6),c=position.subarray(i*3+6,i*3+9),u=[b[0]-a[0],b[1]-a[1],b[2]-a[2]],v=[c[0]-a[0],c[1]-a[1],c[2]-a[2]];
  const dot=(u[1]*v[2]-u[2]*v[1])*normal[i*3]+(u[2]*v[0]-u[0]*v[2])*normal[i*3+1]+(u[0]*v[1]-u[1]*v[0])*normal[i*3+2];indices[id].push(i,i+(dot<0?2:1),i+(dot<0?1:2));
 }
 const index=new Uint32Array(count),groups=[];let offset=0;indices.forEach((a,id)=>{if(a.length){index.set(a,offset);groups.push({start:offset,count:a.length,materialIndex:id});offset+=a.length;}});return {position,normal,color,uv,index,groups,count};
}
export function cameraSpec(camera,width,height,unit){const a=camera.yaw*Math.PI/180,{c,s,n}=cameraBasis(camera),d=480;return {target:[camera.x,0,camera.z],position:[camera.x+d*Math.sin(a)*c/n,d*s/n,camera.z+d*Math.cos(a)*c/n],halfWidth:width/(2*unit),halfHeight:height/(2*unit*n),near:.1,far:1000};}
export function treeBatches(items){const groups=[[],[],[]];for(const item of items)groups[item.type].push(item);return groups;}
// Same-origin only, no CDN or remote model URL. Deterministic grayscale surface texture.
export function texturePixels(kind,size=64){const bytes=new Uint8Array(size*size*4);for(let y=0;y<size;y++)for(let x=0;x<size;x++){let h=Math.imul(x+kind*97,374761393)^Math.imul(y+51,668265263);h=Math.imul(h^(h>>>13),1274126177);let v=232+((h>>>0)%24);if(kind===2&&(x<2||y<2))v=155;if(kind===5)v=210+((Math.imul(x+1,53)>>>0)%37)+((h>>>0)%8);if(kind===1)v=218+((h>>>0)%36);if(kind===6)v=219+((h>>>0)%36);bytes.set([v,v,v,255],(y*size+x)*4);}return bytes;}
