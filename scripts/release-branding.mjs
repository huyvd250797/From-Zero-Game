import {readFileSync} from 'node:fs';
export function releaseBranding(root='.'){
 const read=f=>readFileSync(`${root}/${f}`,'utf8');
 const pkg=JSON.parse(read('package.json')),lock=JSON.parse(read('package-lock.json')),manifest=JSON.parse(read('public/manifest.webmanifest')),html=read('index.html');
 const expected=`From Zero V${pkg.version} — `;
 if(!/^\d+\.\d+\.\d+$/.test(pkg.version)||lock.version!==pkg.version||lock.packages?.['']?.version!==pkg.version)throw Error('Release version mismatch: package.json / package-lock.json');
 if(!manifest.description.startsWith(expected)||!manifest.description.endsWith(' tại An Lạc'))throw Error('Release version mismatch: manifest description');
 const name=manifest.description.slice(expected.length,-' tại An Lạc'.length);
 if(!name.trim())throw Error('Missing release name');
 const label=`V${pkg.version} · ${name}`;
 if(html.split(label).length-1!==2||!html.includes(`<div class="start-footer">${label}</div>`)||!html.includes(`<small>${label}</small>`))throw Error('Release branding mismatch: start footer / splash');
 return {version:pkg.version,name,label};
}
