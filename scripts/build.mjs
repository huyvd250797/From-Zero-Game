import {compileMaster} from './master-data.mjs';
import {cp,mkdir,rm,readFile,writeFile,readdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {spawnSync} from 'node:child_process';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {vendorInventory,THREE_ENTRIES} from './three-vendor.mjs';
const preview=process.argv.includes('--native-preview'),dist=preview?'dist-native-preview':'dist';
await compileMaster();
const check=spawnSync(process.execPath,['scripts/check.mjs'],{stdio:'inherit'});if(check.status!==0)process.exit(1);
const vendor=preview?new Map():await vendorInventory();
if(!preview){const runtime=spawnSync(process.execPath,['--test','tests/three-runtime.integration.mjs'],{stdio:'inherit'});if(runtime.status!==0)process.exit(1);}
const entries=async dir=>(await readdir(dir,{recursive:true,withFileTypes:true})).filter(x=>x.isFile()).map(x=>`${x.parentPath||x.path}/${x.name}`.replaceAll('\\','/')).sort();
const version=JSON.parse(await readFile('package.json','utf8')).version;
const hash=createHash('sha256').update(version).update(preview?'native-preview':'three-production');for(const file of [...await entries('src'),...await entries('public'),'index.html','scripts/build.mjs','scripts/three-vendor.mjs','package-lock.json'])hash.update(file).update(await readFile(file));for(const [file,bytes] of vendor)hash.update(file).update(bytes);
const fingerprint=hash.digest('hex').slice(0,16),assetDir=`assets/${fingerprint}`,cache=`fromzero-v${version}-${fingerprint}`;
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});await cp('src',`${dist}/${assetDir}`,{recursive:true});await cp('public',dist,{recursive:true});
for(const [file,bytes] of vendor){const target=`${dist}/${assetDir}/vendor/three/${file}`;await mkdir(path.dirname(target),{recursive:true});await writeFile(target,bytes);}
// Validate the actual copied module graph too (relative imports must exist inside fingerprinted vendor).
if(!preview)for(const file of THREE_ENTRIES)await import(pathToFileURL(path.resolve(dist,assetDir,'vendor/three',file)).href);
let html=(await readFile('index.html','utf8')).replaceAll('./src/',`./${assetDir}/`);
if(preview){html=html.replace(/<script type="importmap">.*?<\/script>/s,'').replace('</head>','<meta name="fz-native-preview" content="1"></head>').replace('V1.6.0 · Living NPC World','V1.6.0 · Native QA preview (không phải bản production)');}else html=html.replaceAll('./node_modules/three/',`./${assetDir}/vendor/three/`).replace('</head>','<meta name="fz-production" content="1"></head>');
await writeFile(`${dist}/index.html`,html);
const files=(await entries(dist)).map(x=>x.slice(dist.length+1)).filter(x=>x!=='sw.js');const integrity={};for(const file of files)integrity['./'+file]='sha256-'+createHash('sha256').update(await readFile(`${dist}/${file}`)).digest('base64');
const template=await readFile('public/sw.js','utf8');const sw=template.replace('__FZ_CACHE__',cache).replace('/*__FZ_INTEGRITY__*/{}',JSON.stringify(integrity));await writeFile(`${dist}/sw.js`,sw);console.log(`From Zero v${version} → ${dist}/ · ${files.length} files · ${vendor.size} Three.js files · ${preview?'NATIVE PREVIEW ONLY (no production PWA)':'THREE.JS PRODUCTION'}`);
