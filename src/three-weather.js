import * as T from 'three';
import {weatherBudget,atmosphereLighting} from './weather.js';
import {nearbyLamps} from './weather-world.js';
import {activeVehicle} from './transport-state.js';
// Fixed, bounded light pools. No point/spot shadow maps to protect mobile GPU.
export class ThreeAtmosphere{
 constructor(scene){this.scene=scene;this.fog=new T.Fog(0xb4c6d1,430,850);scene.fog=this.fog;this.lamps=Array.from({length:6},()=>new T.PointLight(0xffd597,0,11,2));this.heads=Array.from({length:2},()=>new T.SpotLight(0xfff1cf,0,17,Math.PI/6,.55,2));for(const l of this.lamps)scene.add(l);for(const l of this.heads)scene.add(l,l.target);this.matrix=new T.Matrix4();this.lastWind=null;}
 update(w,r,state,motion,entries,t){const budget=weatherBudget(r.weatherQuality??r.prefs.quality),enabled=r.weatherEffects!==false,night=w.night,view=r.camera;const haze=enabled?w.fog:0;this.fog.color.setRGB(...atmosphereLighting(w.minutes,w).background,T.SRGBColorSpace);this.fog.near=850-510*haze;this.fog.far=1000-570*haze; // fog is camera-space, centered around the orthographic view distance
 const road=r.materials[1];road.roughness=T.MathUtils.lerp(.96,.22,enabled?w.wetness:0);road.color.setScalar(1-(enabled?w.wetness:0)*.29);
 const spots=enabled&&night>.08?nearbyLamps(view,budget.lamps,r.metrics.low):[];
 this.lamps.forEach((l,i)=>{const p=spots[i];l.visible=enabled&&night>.08&&i<budget.lamps;l.intensity=p?34*night*Math.max(0,1-Math.hypot(p.x-view.x,p.z-view.z)/40):0;if(p)l.position.set(p.x,p.y,p.z);});
 const v=activeVehicle(state)||(state.transitVisual?{id:state.transitVisual==='bus'?'BUS':'TAXI',pos:state.pos}:null),yaw=motion?.yaw??v?.yaw??0,car=v&&!['VEH_MOTO','VEH_BIKE'].includes(v.id),count=v&&night>.08?Math.min(budget.heads,car?2:1):0;
 this.heads.forEach((l,i)=>{l.visible=enabled&&i<count;l.intensity=enabled&&i<count?65*night:0;if(i<count){const side=car&&count===2?(i===0?-.56:.56):0,front=car?1.7:.85,x=v.pos.x+Math.sin(yaw)*front+Math.cos(yaw)*side,z=v.pos.z+Math.cos(yaw)*front-Math.sin(yaw)*side;l.position.set(x,car?.68:.9,z);l.target.position.set(x+Math.sin(yaw)*11,.12,z+Math.cos(yaw)*11);l.target.updateMatrixWorld();}});
 // Small sway at the base of instanced street trees; no changes to game coordinates.
 const wind=enabled&&budget.wind?w.wind:0;for(const e of entries)for(const inst of e.instances){const trees=inst.userData.windTrees;if(!trees)continue;const bucket=wind>0?Math.floor(t*12):0,stamp=`${bucket}:${wind.toFixed(2)}`;if(inst.userData.windStamp===stamp)continue;inst.userData.windStamp=stamp;trees.forEach((p,i)=>{const sway=wind*.037*Math.sin(t*2.1+p.x*.19+p.z*.11);this.matrix.makeTranslation(p.x,0,p.z);this.matrix.elements[4]=sway;this.matrix.elements[6]=sway*.48;inst.setMatrixAt(i,this.matrix);});inst.instanceMatrix.needsUpdate=true;}
 return {lamps:spots.length,headlights:enabled?count:0,wetness:w.wetness};}
 dispose(){for(const l of [...this.lamps,...this.heads]){this.scene.remove(l);if(l.target)this.scene.remove(l.target);l.dispose();}if(this.scene.fog===this.fog)this.scene.fog=null;}
}
