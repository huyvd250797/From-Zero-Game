// V3.1.0: presentation helpers only. No simulation or save mutations.
export const CAMERA_BUTTON_IDS=Object.freeze(['overview','mobileMap','rotateL','zoomOut','zoomIn','rotateR','tiltDown','tiltUp']);
export const BRAND_IMAGE='./assets/brand/fz-ascend.png';
export function titlePreview(seconds,animated=true){
 const t=animated&&Number.isFinite(seconds)?Math.max(0,seconds):0;
 const a=t*Math.PI*2/96;
 return {camera:{x:138+12*Math.sin(a),z:99+9*(1-Math.cos(a)),yaw:38+12*Math.sin(a*.7),zoom:.78,pitch:50},minute:animated?(510+t*8)%1440:510};
}
export function titleMotionAllowed({eco=false,quality=0,fallback=false,reduced=false}={}){return !eco&&quality>0&&!fallback&&!reduced;}
const paths={
 overview:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 9l12 12M3 3l18 18M9 3l12 12M15 3l6 6M3 15l6 6"/>',
 mobileMap:'<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M3 7h18M3 11h18M3 15h18M3 19h18"/>',
 rotateL:'<path d="M5 10a7 7 0 1 1 11 6v5M5 10V4M5 10h6"/>',rotateR:'<path d="M19 10a7 7 0 1 0-11 6v5M19 10V4M19 10h-6"/>',
 zoomOut:'<path d="M5 12h14"/>',zoomIn:'<path d="M5 12h14M12 5v14"/>',tiltDown:'<path d="M12 4v16m-7-7 7 7 7-7"/>',tiltUp:'<path d="M12 20V4m-7 7 7-7 7 7"/>',
 follow:'<circle cx="12" cy="12" r="6"/><path d="M12 2v5m0 10v5M2 12h5m10 0h5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
 camera:'<rect x="2.5" y="6" width="19" height="14" rx="2"/><path d="m8 6 2-3h4l2 3"/><circle cx="12" cy="13" r="4"/>',
 bagQuick:'<rect x="5" y="7" width="14" height="15" rx="3"/><path d="M9 7V4h6v3M5 14h14M9 17h6"/>',mapQuick:'<path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2zM9 3v16M15 5v16"/>',noticeQuick:'<path d="M18 8a6 6 0 0 0-12 0c0 7-2 7-2 9h16c0-2-2-2-2-9M10 21h4"/>',phoneQuick:'<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 18h4"/>',menuQuick:'<path d="M4 6h16M4 12h16M4 18h16"/>',profileQuick:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-3a8 8 0 0 1 16 0v3"/>',planQuick:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6m10-6v6M3 11h18"/>',
 energy:'<path d="m13 2-9 12h7l-1 8 10-12h-7z"/>',hunger:'<path d="M5 2v8m4-8v8M3 10h8M7 10v12M19 2c-4 4-5 8-5 12h5m0-12v20"/>',hydration:'<path d="M12 2C9 7 5 11 5 15a7 7 0 0 0 14 0c0-4-4-8-7-13z"/>',health:'<path d="M3 12h5l2-5 4 10 2-5h5M12 21C4 16 2 13 2 8a5 5 0 0 1 10-1A5 5 0 0 1 22 8c0 5-2 8-10 13z"/>',hygiene:'<path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2zM20 16v6m-3-3h6"/>',happy:'<circle cx="12" cy="12" r="9"/><path d="M8 10h.1M16 10h.1M8 14q4 5 8 0"/>',stress:'<circle cx="12" cy="12" r="9"/><path d="M12 7v6m0 4h.1"/>'
};
// Only static, developer-authored SVG path markup; no user input.
export function setUiIcon(el,id){if(!Object.hasOwn(paths,id))return false;const path=paths[id];el.innerHTML=`<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;return true;}
export function loadingStage(doc,value,message,tip){const layer=doc.getElementById('splash');if(!layer)return;layer.classList.remove('hidden');doc.getElementById('loadRetry').classList.add('hidden');doc.getElementById('loadProgress').value=Math.max(0,Math.min(3,value));doc.getElementById('loadStatus').textContent=message;if(tip)doc.getElementById('loadTip').textContent=tip;}
export function loadingDone(doc){doc.getElementById('loadProgress').value=3;doc.getElementById('splash').classList.add('hidden');doc.getElementById('start').inert=false;}
export function loadingFailed(doc,error){const layer=doc.getElementById('splash');layer.classList.remove('hidden');doc.getElementById('loadStatus').textContent='Không thể khởi tạo: '+String(error?.message||error).slice(0,220);doc.getElementById('loadTip').textContent='Kiểm tra kết nối hoặc cài đặt trình duyệt, sau đó thử lại. Bản lưu không bị xóa.';doc.getElementById('loadRetry').classList.remove('hidden');}
