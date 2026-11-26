// Original compact SVG pictograms, one per canonical item. No remote assets or OS emoji.
const icons={
 FOOD_MEAL:'<rect x="7" y="10" width="34" height="29" rx="5" fill="#d8b087"/><rect x="10" y="13" width="13" height="22" rx="3" fill="#fff1cc"/><path d="M26 14h12v9H26z" fill="#74ad65"/><path d="M26 26h12v9H26z" fill="#c97950"/>',
 FOOD_COFFEE:'<path d="M10 16h25v17q-2 8-12 8T10 33z" fill="#d6aa85"/><path d="M35 20h4q8 4 0 11h-4" fill="none" stroke="#d6aa85" stroke-width="4"/><ellipse cx="22" cy="16" rx="12" ry="4" fill="#70472f"/><path d="M19 11q-5-5 0-8m8 8q5-5 0-8" stroke="#e4e4d8" fill="none" stroke-width="2"/>',
 FOOD_WATER:'<rect x="18" y="5" width="12" height="6" rx="2" fill="#629fd1"/><path d="M17 12h14l5 9v17q0 5-5 5H17q-5 0-5-5V21z" fill="#9cd4ec"/><rect x="12" y="23" width="24" height="11" fill="#e1f3f6"/><path d="M24 24q-9 10 0 10t0-10" fill="#4d9cc7"/>',
 FOOD_NOODLES:'<path d="M5 23h38l-7 15H12z" fill="#bf6957"/><ellipse cx="24" cy="23" rx="19" ry="6" fill="#f0c86d"/><path d="M12 24q7-8 11 0t12-2M29 18L39 4m-4 15L45 6" fill="none" stroke="#86583f" stroke-width="2.5"/>',
 FOOD_FRUIT:'<circle cx="18" cy="28" r="12" fill="#d85e51"/><circle cx="32" cy="31" r="10" fill="#efb94e"/><path d="M18 17q-1-7 5-10m-4 6q7-7 13-2-6 6-13 2" fill="#6ea768" stroke="#6e8652" stroke-width="2"/>',
 FOOD_BREAD:'<path d="M8 33Q3 20 17 12Q39 1 42 18T27 39Q14 45 8 33" fill="#dfac62"/><path d="M17 13l8 8m1-13 8 8M11 22l8 8" stroke="#fff0c7" stroke-width="3" stroke-linecap="round"/>',
 FOOD_MILK:'<path d="M13 13l7-8h15l4 9v28H13z" fill="#e9f4ed"/><path d="M13 14h26L35 5H20z" fill="#9cc6e1"/><rect x="13" y="22" width="26" height="13" fill="#74a9cf"/><path d="M26 23q-12 14 0 12t0-12" fill="#fff"/>',
 FOOD_HOME_RICE:'<ellipse cx="24" cy="28" rx="21" ry="12" fill="#bdd7ca"/><ellipse cx="24" cy="26" rx="17" ry="9" fill="#fff4d9"/><circle cx="15" cy="25" r="7" fill="#f8ecd3"/><path d="M25 20q15-5 12 11H25z" fill="#8dbb62"/><circle cx="30" cy="29" r="5" fill="#c17b50"/>',
 FOOD_HOME_NOODLES:'<path d="M4 24h40l-8 15H12z" fill="#8bb1ad"/><ellipse cx="24" cy="23" rx="20" ry="7" fill="#eac177"/><ellipse cx="29" cy="23" rx="9" ry="6" fill="#fff4d6"/><circle cx="29" cy="23" r="4" fill="#e3a739"/><path d="M10 21l8-4 3 6" stroke="#649b64" stroke-width="3" fill="none"/>',
 ITM_PHONE:'<rect x="13" y="3" width="23" height="42" rx="5" fill="#344f60"/><rect x="16" y="8" width="17" height="29" rx="2" fill="#82b7d1"/><circle cx="24" cy="41" r="2" fill="#e1e7e2"/>',
 ITM_BAG:'<path d="M17 13V8q7-6 14 0v5" fill="none" stroke="#a4c4b5" stroke-width="4"/><rect x="9" y="11" width="30" height="32" rx="9" fill="#648e80"/><rect x="14" y="28" width="20" height="11" rx="4" fill="#d4b477"/><path d="M14 20h20" stroke="#c7e0d1" stroke-width="2"/>',
 ITM_BOOK:'<path d="M5 9q13-4 19 3 6-7 19-3v31q-13-4-19 2-6-6-19-2z" fill="#d6c099"/><path d="M24 12v29M10 17h9m-9 6h9m10-6h9m-9 6h9" stroke="#947658" stroke-width="2"/>',
 ITM_LAPTOP:'<rect x="8" y="6" width="32" height="28" rx="3" fill="#536d7b"/><rect x="11" y="9" width="26" height="21" fill="#9cc9d7"/><path d="M8 34h32l6 8H2z" fill="#aebec2"/><path d="M19 38h10" stroke="#657c84" stroke-width="2"/>',
 ITM_HELMET:'<path d="M5 28Q5 7 24 7t19 21v8H25l-4-8z" fill="#d5a761"/><path d="M24 18h17v13H24z" fill="#58798b"/><path d="M10 36q6 9 16 4" fill="none" stroke="#51636a" stroke-width="3"/>',
 ITM_RICE:'<path d="M13 7h22l-3 8q12 15 7 25H9q-5-10 7-25z" fill="#cbb28a"/><rect x="12" y="24" width="24" height="12" rx="3" fill="#f1e3be"/><path d="M20 26l4 4m3-4 4 4m-13 2 4 2" stroke="#c4a875" stroke-width="2"/>',
 ITM_EGG:'<path d="M13 29q0-20 11-23 11 3 11 23t-11 13-11-13" fill="#e9d2b4"/><ellipse cx="20" cy="21" rx="4" ry="7" fill="#fff1d9" opacity=".7"/>',
 ITM_VEG:'<path d="M24 40Q2 28 7 13q12 0 17 13Q15 8 24 4q10 8 3 22 5-13 14-13 5 15-17 27" fill="#76a866"/><path d="M24 43V19m0 13L13 22m11 12 10-13" stroke="#c0d5a1" fill="none" stroke-width="2"/>',
 ITM_DRY_NOODLE:'<path d="M8 7h32l-2 6 2 28H8l2-28z" fill="#d89d4e"/><rect x="12" y="14" width="24" height="21" rx="3" fill="#f1d898"/><path d="M15 19q5-6 9 0t9 0m-18 6q5-6 9 0t9 0m-18 6q5-6 9 0t9 0" fill="none" stroke="#a77a43" stroke-width="2"/>',
 ITM_WIPES:'<rect x="5" y="17" width="38" height="24" rx="7" fill="#89b7c4"/><ellipse cx="24" cy="19" rx="12" ry="5" fill="#567f8f"/><path d="M19 20l-4-13 13 3 8-5-5 15z" fill="#e9f2ed"/>'
};
export const ITEM_ICON_IDS=Object.freeze(Object.keys(icons));
export function itemIconSvg(id){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" aria-hidden="true">${icons[id]||'<circle cx="24" cy="24" r="15" fill="#9eb5a7"/>'}</svg>`;}
export function itemIcon(id){const e=document.createElement('span');e.className='inventory-icon item-svg';e.innerHTML=itemIconSvg(id);return e;}
