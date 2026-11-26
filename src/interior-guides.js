// World-space presentation data; navigation grid and collision are authoritative elsewhere.
export function guidePoints(walk){if(!walk.route?.length)return [];return [{x:walk.pos.x,z:walk.pos.z},...walk.route.map(p=>({x:p.x+.5,z:p.z+.5}))];}
