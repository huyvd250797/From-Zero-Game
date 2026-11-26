// Presentation data only: fixed enumerations, backward-compatible schema 1.
export const APPEARANCE=Object.freeze({body:['male','female'],face:['oval','round','angular'],skin:['#e5b28c','#c68c66','#98684b','#f0c8a7'],hair:['short','side','long','bun'],hairColor:['#293334','#50382e','#754b32','#bfa878'],shirt:['#e6ba60','#487a9c','#59866e','#b56a79','#e4e4da','#424952'],pants:['#304b60','#48494d','#9b886b','#52665a'],shoe:['#263a3e','#e9e5db','#785844'],accessory:['bag','none','glasses']});
export const DEFAULT_AVATAR=Object.freeze({body:'male',face:'oval',skin:APPEARANCE.skin[0],hair:'short',hairColor:APPEARANCE.hairColor[0],shirt:APPEARANCE.shirt[0],pants:APPEARANCE.pants[0],shoe:APPEARANCE.shoe[0],accessory:'bag'});
export function validAvatar(a){return !!a&&typeof a==='object'&&!Array.isArray(a)&&Object.keys(a).length===Object.keys(APPEARANCE).length&&Object.entries(APPEARANCE).every(([k,v])=>v.includes(a[k]));}
export function avatarOf(s){return validAvatar(s?.appearance)?s.appearance:DEFAULT_AVATAR;}
export function npcAvatar(n){let h=0;for(const c of n.id||'npc')h=(Math.imul(h,31)+c.charCodeAt(0))>>>0;const pick=(key,shift)=>APPEARANCE[key][(h>>>shift)%APPEARANCE[key].length];return {...DEFAULT_AVATAR,body:n.gender==='female'?'female':'male',face:pick('face',1),skin:pick('skin',2),hair:n.gender==='female'?['side','long','bun'][h%3]:['short','side'][h%2],hairColor:pick('hairColor',4),shirt:pick('shirt',6),pants:pick('pants',8),shoe:pick('shoe',10),accessory:h%5===0?'glasses':'none'};}
export function visualAge(age=18){return age>=75?'elder':age>=55?'senior':age>=40?'mature':'young';}
const mix=(a,b,t)=>'#'+[1,3,5].map(i=>Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t).toString(16).padStart(2,'0')).join('');
export function agedHair(a,age){return mix(a.hairColor,'#d4d3cb',({young:0,mature:.14,senior:.62,elder:.92})[visualAge(age)]);}
// Rigid-weight skeletal hierarchy. Joint offsets are in parent coordinates. +Z is forward.
export const JOINTS=Object.freeze([
 ['hips',-1,0,0.91,0],['spine',0,0,.10,0],['head',1,0,.60,0],
 ['armL',1,-.30,.49,0],['forearmL',3,0,-.30,0],['armR',1,.30,.49,0],['forearmR',5,0,-.30,0],
 ['thighL',0,-.145,0,0],['shinL',7,0,-.40,0],['footL',8,0,-.39,0],['thighR',0,.145,0,0],['shinR',10,0,-.40,0],['footR',11,0,-.39,0]
].map(Object.freeze));
export const MODES=Object.freeze(['idle','walk','run','ride','sit','wave']);
export const NPC_MODES=Object.freeze(['talk','work','read','eat','shop']);
export const DURATIONS=Object.freeze({idle:2.4,walk:.85,run:.56,ride:.8,sit:1.4,wave:1.5,talk:1.8,work:1.2,read:2.6,eat:2.2,shop:2.1});
export function pose(mode='idle',phase=0,age=18){const p=JOINTS.map(()=>[0,0,0]);const s=Math.sin(phase),c=Math.cos(phase),old=age>=75?.72:age>=55?.88:1;let bob=0,raise=0;
 if(mode==='walk'||mode==='run'){const r=mode==='run',amp=(r?.83:.48)*old;p[1][0]=r?.14:.035;p[7][0]=s*amp;p[10][0]=-s*amp;p[8][0]=Math.max(0,-s)*amp*.95;p[11][0]=Math.max(0,s)*amp*.95;p[3][0]=-s*amp*.85;p[5][0]=s*amp*.85;p[4][0]=p[6][0]=r?-.85:-.16;p[9][0]=-p[8][0]*.35;p[12][0]=-p[11][0]*.35;bob=Math.abs(c)*(r?.045:.022);}
 else if(mode==='ride'||mode==='sit'){p[7][0]=p[10][0]=-1.16;p[8][0]=p[11][0]=1.42;p[3][0]=p[5][0]=-.82;p[4][0]=p[6][0]=-.35;p[1][0]=.17;raise=mode==='ride'?-.12:-.38;if(mode==='ride'){p[7][0]+=s*.27;p[10][0]-=s*.27;}}
 else if(mode==='talk'){p[3][0]=-.25-s*.16;p[4][0]=-.65-c*.2;p[5][2]=.15+s*.18;p[6][0]=-.45;p[2][1]=s*.11;}
 else if(mode==='work'){p[3][0]=p[5][0]=-.55;p[4][0]=-.7+s*.15;p[6][0]=-.7-s*.15;p[2][0]=.12;}
 else if(mode==='read'){p[3][0]=p[5][0]=-.45;p[4][0]=p[6][0]=-.95;p[2][0]=.22+s*.025;}
 else if(mode==='eat'){p[5][0]=-.45;p[6][0]=-.9-s*.4;p[3][0]=-.25;p[4][0]=-.6;p[2][0]=.08+c*.05;}
 else if(mode==='shop'){p[5][0]=-.3-s*.2;p[6][0]=-.5;p[2][1]=s*.25;}
 else if(mode==='wave'){p[5][2]=1.95;p[6][2]=.25+s*.42;p[2][1]=s*.10;}
 else {p[1][0]=s*.012;p[3][2]=-.055;p[5][2]=.055;p[2][1]=s*.045;bob=(1+c)*.007;}
 p[1][0]+=age>=75?.105:age>=55?.045:0;p[2][0]+=-p[1][0]*.40;return {rot:p,bob:bob+raise};}
export function motionPose(m={},age=18,riding=false){const mode=riding?'ride':(MODES.includes(m.mode)||NPC_MODES.includes(m.mode))?m.mode:'idle',a=pose(mode,mode==='idle'?(m.idleTime||0)*2.4:m.phase||0,age);if(mode==='walk'||mode==='run'){const idle=pose('idle',(m.idleTime||0)*2.4,age),b=Math.max(0,Math.min(1,m.blend??1));a.rot=a.rot.map((r,i)=>r.map((v,j)=>idle.rot[i][j]+(v-idle.rot[i][j])*b));a.bob*=b;}return a;}
// Build local ring meshes instead of rectangular limbs. Vertices are weighted 100% to their joint.
function rgb(hex){return [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16)/255);}
function ringPart(bone,center,rings,color,n=8){const [x,y,z]=center,v=[],col=rgb(color);const points=rings.map(([dy,rx,rz])=>Array.from({length:n},(_,i)=>{const a=i*2*Math.PI/n;return [x+Math.cos(a)*rx,y+dy,z+Math.sin(a)*rz]}));const tri=(a,b,c,k=1)=>{for(const p of [a,b,c])v.push(...p,...col.map(x=>Math.min(1,x*k)));};for(let j=0;j<points.length-1;j++)for(let i=0;i<n;i++){const k=(i+1)%n,a=points[j][i],b=points[j+1][i],c=points[j+1][k],d=points[j][k];const shade=.81+.19*Math.sin((i+.5)*2*Math.PI/n)**2;tri(a,b,c,shade);tri(a,c,d,shade);}for(let i=1;i<n-1;i++){tri(points[0][0],points[0][i],points[0][i+1],.82);const top=points.at(-1);tri(top[0],top[i+1],top[i],1);}return {bone,v:new Float32Array(v)};}
export function avatarParts(a=DEFAULT_AVATAR,age=18,low=false){const out=[],f=a.body==='female',n=low?5:8,hair=agedHair(a,age);const shape=(bone,x,y,z,rx,ry,rz,col,segments=n)=>out.push(ringPart(bone,[x,y,z],[[-ry,.55*rx,.55*rz],[-ry*.68,rx,rz],[ry*.63,rx,rz],[ry,.58*rx,.58*rz]],col,segments));const tube=(bone,x,y,z,h,r1,r2,col)=>out.push(ringPart(bone,[x,y,z],[[-h,r2,r2*.87],[-h*.66,r2*1.12,r2],[-.02,r1,r1*.88]],col,n));
 shape(0,0,.035,0,f?.265:.24,.135,.19,a.pants);shape(1,0,.26,0,f?.245:.29,.30,.175,a.shirt);shape(1,0,.58,0,.088,.09,.09,a.skin);const faceX=a.face==='round'?.207:a.face==='angular'?.185:.19,faceY=a.face==='round'?.19:a.face==='angular'?.224:.215;shape(2,0,.12,.01,faceX,faceY,.174,a.skin,a.face==='angular'&&!low?6:n);shape(2,0,.265,-.012,faceX+.023,.11,.192,hair);shape(2,0,.095,-.132,.19,.15,.08,hair);
 if(a.hair==='side')shape(2,.065,.225,.10,.132,.067,.10,hair);if(a.hair==='long')shape(2,0,-.065,-.165,.20,.225,.091,hair);if(a.hair==='bun')shape(2,0,.30,-.15,.106,.09,.106,hair);
 if(!low){for(const x of [-.092,.092]){shape(2,x,.147,.169,.024,.020,.012,'#283334',5);shape(2,x,.192,.168,.047,.012,.009,hair,5);}shape(2,0,.105,.179,.035,.04,.037,a.skin,5);shape(2,0,.044,.163,.053,.012,.012,'#985b50',5);}
 for(const [arm,fore,thigh,shin,foot] of [[3,4,7,8,9],[5,6,10,11,12]]){tube(arm,0,0,0,.18,.108,.09,a.shirt);tube(arm,0,-.17,0,.14,.082,.068,a.skin);tube(fore,0,0,0,.255,.069,.047,a.skin);shape(fore,0,-.269,.014,.060,.065,.048,a.skin,low?5:7);tube(thigh,0,0,0,.40,.131,.096,a.pants);tube(shin,0,0,0,.39,.098,.067,a.pants);shape(foot,0,-.042,.067,.092,.074,.167,a.shoe);}
 if(a.accessory==='bag')shape(1,0,.25,-.22,.20,.255,.09,'#557870');if(a.accessory==='glasses'&&!low){for(const x of [-.092,.092])shape(2,x,.147,.181,.061,.047,.013,'#354c55',6);shape(2,0,.15,.18,.04,.013,.013,'#354c55',5);}
 return out;}
export function rotateXYZ(p,r){let [x,y,z]=p;const [a,b,c]=r;let co=Math.cos(c),si=Math.sin(c);[x,y]=[x*co-y*si,x*si+y*co];co=Math.cos(b);si=Math.sin(b);[x,z]=[x*co+z*si,z*co-x*si];co=Math.cos(a);si=Math.sin(a);[y,z]=[y*co-z*si,y*si+z*co];return [x,y,z];}
export function jointPoint(bone,p,rot){let i=bone;while(i>=0){const j=JOINTS[i];p=rotateXYZ(p,rot[i]);p=[p[0]+j[2],p[1]+j[3],p[2]+j[4]];i=j[1];}return p;}
const zero=JOINTS.map(()=>[0,0,0]);
export function bindGeometry(parts){let count=0;for(const p of parts)count+=p.v.length/6;const raw=new Float32Array(count*6),skinIndex=new Uint16Array(count*4),skinWeight=new Float32Array(count*4);let k=0;for(const part of parts)for(let i=0;i<part.v.length;i+=6,k++){raw.set(jointPoint(part.bone,Array.from(part.v.subarray(i,i+3)),zero),k*6);raw.set(part.v.subarray(i+3,i+6),k*6+3);skinIndex[k*4]=part.bone;skinWeight[k*4]=1;}return {raw,skinIndex,skinWeight};}
const cache=new Map();export function cachedParts(a,age,low){const key=JSON.stringify(a)+':'+visualAge(age)+':'+low;let p=cache.get(key);if(p)cache.delete(key);else p=avatarParts(a,age,low);cache.set(key,p);if(cache.size>64)cache.delete(cache.keys().next().value);return p;}
export function avatarTriangles(a,age,motion,low=false,riding=false){const p=motionPose(motion,age,riding),parts=cachedParts(a,age,low),out=new Float32Array(parts.reduce((n,q)=>n+q.v.length,0));const transforms=JOINTS.map((_,i)=>{const o=jointPoint(i,[0,0,0],p.rot),axes=[[1,0,0],[0,1,0],[0,0,1]].map(v=>jointPoint(i,v,p.rot).map((x,j)=>x-o[j]));return {o,axes};});let offset=0;for(const part of parts){const {o,axes:[u,v,w]}=transforms[part.bone],q=part.v;for(let i=0;i<q.length;i+=6){const x=q[i],y=q[i+1],z=q[i+2];out.set([o[0]+u[0]*x+v[0]*y+w[0]*z,o[1]+u[1]*x+v[1]*y+w[1]*z+p.bob,o[2]+u[2]*x+v[2]*y+w[2]*z,q[i+3],q[i+4],q[i+5]],offset);offset+=6;}}return out;}
