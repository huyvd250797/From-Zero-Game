// A journey owns its final destination; routing legs never replace it.
export class Journey {
 constructor(){this.clear()}
 clear(){this.final=null;this.vehicle=null;this.stage=null;}
 begin(place,vehicle=null){this.final=place;this.vehicle=vehicle;this.stage=vehicle?'pickup':'travel';}
 boarded(id){if(this.stage!=='pickup'||id!==this.vehicle)return false;this.stage='travel';return true;}
}
export function journeyVehicles(state,vehicles,plan,drive,goal){return vehicles.filter(v=>v.id==='VEH_BIKE'||v.fuel>0).map(v=>({v,walk:plan(state.pos,v.pos),ride:drive(v.pos,goal,v.id)})).filter(x=>x.walk&&x.ride).sort((a,b)=>a.walk.path.length-b.walk.path.length).map(x=>x.v);}
export function nearbyLabel(previous,distance){return Number.isFinite(distance)&&distance<=(previous?8:6);}
