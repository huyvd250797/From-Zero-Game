// Physical interior blueprints, independent of exterior coordinates. No economy data changes.
export const FLOOR_STYLES=Object.freeze({wood:['#d7b58c','#e4c6a2'],tile:['#c8d4d0','#e0e8e3'],stone:['#aeb8be','#c8cfd1'],warm:['#d8c4ae','#eedcc5']});
export const WALL_STYLES=Object.freeze({sage:'#b9cdbd',cream:'#e5d9bf',blue:'#b3cbd6',grey:'#c0c5c7'});
export const MOVABLE=Object.freeze(['bed','desk','living','ac','kitchen','tv','wardrobe','dining','washer','plant']);
export const DEFAULT_DECOR=Object.freeze({floor:'wood',wall:'sage',positions:{}});
export function makeSpace(cols=1,rows=1,names=[],floor='wood',wall='sage'){
 const width=cols*10-1,depth=rows*7-1,entry={x:4,z:depth-1},rooms=[];for(let r=0;r<rows;r++)for(let c=0;c<cols;c++)rooms.push({id:r*cols+c,x:c*10,z:r*7,w:9,d:6,name:names[r*cols+c]||'Phòng '+(r*cols+c+1)});
 return {width,depth,cols,rows,entry,rooms,floor,wall};
}
export function partitionCell(space,x,z){if(!space)return false;const vertical=x%10===9,horizontal=z%7===6;return (vertical&&![2,3].includes(z%7))||(horizontal&&![4,5].includes(x%10));}
export function roomAt(space,x,z){return space?.rooms.find(r=>x>=r.x&&x<r.x+r.w&&z>=r.z&&z<r.z+r.d)||null;}
export function attachSpace(items,space){Object.defineProperty(items,'space',{value:space,enumerable:false});return items;}
export const entryFor=layout=>layout.space?.entry||{x:4,z:5};
export const boundsFor=layout=>layout.space||{width:9,depth:6};
export function validDecor(d){return !!d&&typeof d==='object'&&!Array.isArray(d)&&Object.hasOwn(FLOOR_STYLES,d.floor)&&Object.hasOwn(WALL_STYLES,d.wall)&&!!d.positions&&typeof d.positions==='object'&&!Array.isArray(d.positions)&&Object.keys(d.positions).length<=MOVABLE.length&&Object.entries(d.positions).every(([id,p])=>MOVABLE.includes(id)&&p&&Number.isInteger(p.x)&&p.x>=0&&p.x<19&&Number.isInteger(p.z)&&p.z>=0&&p.z<13&&[0,1].includes(p.turn));}
export function decorFor(s,id){const d=s.housing?.decorations?.[id];return validDecor(d)?structuredClone(d):structuredClone(DEFAULT_DECOR);}
export function relocate(item,p){const oldTurn=item.turn||0,turn=p.turn,w=oldTurn===turn?item.w:item.d,d=oldTurn===turn?item.d:item.w;return {...item,x:p.x,z:p.z,w,d,turn};}
export function gridFree(layout,x,z){const {width,depth}=boundsFor(layout);return Number.isInteger(x)&&Number.isInteger(z)&&x>=0&&x<width&&z>=0&&z<depth&&!partitionCell(layout.space,x,z)&&!layout.some(o=>x>=o.x&&x<o.x+o.w&&z>=o.z&&z<o.z+o.d);}
export function reachableCells(layout,start=entryFor(layout)){if(!gridFree(layout,start.x,start.z))return new Set();const k=(x,z)=>x+','+z,seen=new Set([k(start.x,start.z)]),queue=[start];for(let i=0;i<queue.length;i++){const p=queue[i];for(const [dx,dz] of [[1,0],[-1,0],[0,1],[0,-1]]){const x=p.x+dx,z=p.z+dz,key=k(x,z);if(!seen.has(key)&&gridFree(layout,x,z)){seen.add(key);queue.push({x,z});}}}return seen;}
// Recompute unique interaction positions for edited objects, and reject blocked doors/rooms.
export function resolveLayout(items,space,{reassign=false}={}){const l=attachSpace(items.map(o=>({...o,station:{...o.station},actions:[...o.actions]})),space),occupied=new Set(),entry=entryFor(l),key=(x,z)=>x+','+z;
 for(const f of l)for(let z=f.z;z<f.z+f.d;z++)for(let x=f.x;x<f.x+f.w;x++){const k=key(x,z);if(x<0||z<0||x>=space.width||z>=space.depth||partitionCell(space,x,z)||x%10===9||z%7===6||occupied.has(k)||x===entry.x&&z===entry.z)return null;occupied.add(k);}
 const seen=reachableCells(l);if(!seen.size||space.rooms.some(r=>!seen.has(key(r.x+4,r.z+2))))return null;
 // Each object needs an adjacent, unique reachable station. Preserve its old station where possible.
 const used=new Set([key(entry.x,entry.z)]);for(const f of l){const candidates=[];for(let z=f.z-1;z<=f.z+f.d;z++)for(let x=f.x-1;x<=f.x+f.w;x++){const adj=(x>=f.x&&x<f.x+f.w&&(z===f.z-1||z===f.z+f.d))||(z>=f.z&&z<f.z+f.d&&(x===f.x-1||x===f.x+f.w));if(adj&&seen.has(key(x,z))&&!used.has(key(x,z)))candidates.push({x,z});}candidates.sort((a,b)=>Math.abs(a.x-f.station.x)+Math.abs(a.z-f.station.z)-Math.abs(b.x-f.station.x)-Math.abs(b.z-f.station.z));if(!candidates.length)return null;f.station=candidates[0];used.add(key(f.station.x,f.station.z));}return l;
}
export function applyDecor(base,decor){const space={...base.space,floor:decor.floor,wall:decor.wall};return resolveLayout(base.map(f=>decor.positions[f.id]&&MOVABLE.includes(f.id)?relocate(f,decor.positions[f.id]):f),space);}
export function changeDecor(s,property,base,draft){if(!validDecor(draft)||!applyDecor(base,draft))return false;s.housing.decorations={...(s.housing.decorations||{}),[property]:structuredClone(draft)};return true;}
