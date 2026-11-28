import {isElectric} from './vehicle-collection.js';
// Independent HTMLMediaElement output for devices where Web Audio is inaudible.
// One reusable element, no additional AudioContext or microphone permissions.
import {audioPrefs,nearestAudible,requestPlaybackSession} from './audio.js';
export const MEDIA_TRACKS=Object.freeze({tone:'ui',music:'music',engine:'vehicles',ev:'vehicles',horn:'horn',npc:'conversation',rain:'weather',ambient:'ambient'});
const url=kind=>new URL(`./audio/${kind}.wav`,import.meta.url).href;
export function mediaScene(input,prefs){if(input.scene==='silent')return null;if(input.scene==='title')return prefs.music>0?'music':null;if(input.scene==='world'){const near=nearestAudible(input.pos,(input.traffic||[]).filter(a=>a.id!=='VEH_BIKE'),input.yaw,24,1)[0];const vehicle=input.vehicle&&input.vehicle!=='VEH_BIKE'?input.vehicle:near?.actor.id;if(vehicle&&prefs.vehicles>0)return isElectric(vehicle)?'ev':'engine';if(prefs.conversation>0&&nearestAudible(input.pos,input.talkers||[],input.yaw,12,1).length)return 'npc';}if((input.weather?.rain||0)>.2&&prefs.weather>0)return 'rain';return prefs.ambient>0?'ambient':prefs.music>0?'music':null;}
export class MediaAudio {
 constructor(prefs={},factory=()=>new Audio(),clock=()=>Date.now()){this.prefs=audioPrefs(prefs);this.factory=factory;this.clock=clock;this.element=null;this.track='';this.status='locked';this.lastError='';this.hidden=false;this.unlocked=false;this.testUntil=0;this.generation=0;this.pending=null;this.lastAttempt=0;this.lastScene=null;}
 get ready(){return this.unlocked&&this.prefs.enabled&&!this.hidden;}
 get ctx(){return null;}
 get voices(){return {size:this.element&&!this.element.paused?1:0};}
 signalLevel(){return 0;} // Media element has no independent analyser; do not fabricate a signal reading.
 configure(p){this.prefs=audioPrefs(p);this.applyVolume();if(!this.prefs.enabled||this.prefs.master===0)this.element?.pause();}
 applyVolume(){if(!this.element)return;const group=MEDIA_TRACKS[this.track]||'ui',volume=this.prefs.master/100*this.prefs[group]/100;try{this.element.volume=volume;this.element.muted=!this.prefs.enabled||this.hidden||volume===0;}catch{}}
 ensure(){if(!this.element){this.element=this.factory();this.element.preload='auto';this.element.playsInline=true;this.element.setAttribute?.('playsinline','');this.element.addEventListener?.('error',()=>{this.lastError=`Media error ${this.element?.error?.code||'unknown'}`;this.status='blocked';this.unlocked=false;});}return this.element;}
 play(kind,{loop=false,gesture=false}={}){if(!this.prefs.enabled||this.hidden||this.prefs.master===0||!this.prefs[MEDIA_TRACKS[kind]])return Promise.resolve(false);const token=++this.generation;this.lastAttempt=this.clock();try{if(gesture)requestPlaybackSession();const e=this.ensure();if(this.track!==kind){e.src=url(kind);this.track=kind;}else if(!loop){try{e.currentTime=0;}catch{}}e.loop=loop;this.applyVolume();this.status='resuming';// invoke play synchronously within click/touch
 const p=Promise.resolve(e.play()).then(()=>{if(token!==this.generation){if(this.hidden||!this.prefs.enabled)e.pause();return false;}if(this.hidden||!this.prefs.enabled){e.pause();return false;}this.unlocked=true;this.status='running';this.lastError='';return true;},err=>{if(token===this.generation){this.unlocked=false;this.status='blocked';this.lastError=String(err?.message||err);}return false;}).finally(()=>{if(token===this.generation)this.pending=null;});this.pending=p;return p;}catch(e){this.status='blocked';this.lastError=String(e?.message||e);this.unlocked=false;return Promise.resolve(false);}}
 unlock({gesture=false}={}){if(this.ready)return Promise.resolve(true);if(!gesture)return this.pending||Promise.resolve(false);return this.preview('tone');}
 preview(kind='tone'){this.testUntil=this.clock()+(kind==='tone'||kind==='horn'?2200:4200);const p=this.play(kind,{gesture:true});p.then(ok=>{if(!ok)this.testUntil=0;});return p;}
 update(input){this.lastScene=input;if(!this.ready||this.clock()<this.testUntil||this.pending)return;const kind=mediaScene(input,this.prefs);if(!kind){this.element?.pause();return;}if(this.track!==kind||this.element?.paused)this.play(kind,{loop:true});else if(this.element)this.element.loop=true;}
 ui(){} // no polyphony in fallback, avoid interrupting ongoing environmental sound
 setHidden(hidden){this.hidden=!!hidden;this.testUntil=0;if(hidden){++this.generation;this.pending=null;this.element?.pause();this.status='hidden';}else{this.applyVolume();this.status=this.unlocked?'running':'locked';}}
 recover(){++this.generation;this.pending=null;this.element?.pause();this.unlocked=false;this.testUntil=0;this.status='locked';this.lastError='';}
 dispose(){this.recover();if(this.element){this.element.removeAttribute?.('src');this.element.load?.();}this.element=null;}
}
