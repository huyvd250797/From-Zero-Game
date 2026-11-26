// Build inserts an exact inventory with SHA-256 integrity for each release asset.
const CACHE='__FZ_CACHE__';
const INTEGRITY=/*__FZ_INTEGRITY__*/{};
const scope=self.registration.scope;
const urls=new Map(Object.entries(INTEGRITY).map(([p,hash])=>[new URL(p,scope).href,hash]));
const shell=new URL('./index.html',scope).href;
const verifiedRequest=url=>new Request(url,{cache:'reload',integrity:urls.get(url)});
self.addEventListener('install',event=>event.waitUntil((async()=>{if(!urls.size)throw Error('Missing build inventory');const existed=(await caches.keys()).includes(CACHE),cache=await caches.open(CACHE);try{await cache.addAll([...urls.keys()].map(verifiedRequest));}catch(e){if(!existed)await caches.delete(CACHE);throw e;}})()));
// Wait for confirmation or for all old clients to close.
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')event.waitUntil(self.skipWaiting());});
self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim();const keys=await caches.keys(),old=keys.filter(k=>k!==CACHE&&/^fromzero-v[\d.]+-[a-f0-9]{16}$/.test(k));let previous=null;for(const k of old.reverse()){if(await (await caches.open(k)).match(shell)){previous=k;break;}}await Promise.all(keys.filter(k=>k.startsWith('fromzero-')&&k!==CACHE&&k!==previous).map(k=>caches.delete(k)));})()));
async function cachedAsset(url){const cache=await caches.open(CACHE),hit=await cache.match(url);if(hit)return hit;try{const response=await fetch(verifiedRequest(url));if(!response.ok)return Response.error();try{await cache.put(url,response.clone());}catch{}return response;}catch{return Response.error();}}
self.addEventListener('fetch',event=>{const r=event.request,url=new URL(r.url);if(r.method!=='GET'||url.origin!==self.location.origin)return;if(r.mode==='navigate'&&(url.pathname===new URL(scope).pathname||url.pathname===new URL(shell).pathname)){event.respondWith(cachedAsset(shell));return;}if(urls.has(url.href)){event.respondWith(cachedAsset(url.href));return;}const prefix=new URL('./assets/',scope).pathname;if(url.pathname.startsWith(prefix)&&/^[a-f0-9]{16}\//.test(url.pathname.slice(prefix.length)))event.respondWith((async()=>{for(const k of await caches.keys()){if(k===CACHE||!/^fromzero-v[\d.]+-[a-f0-9]{16}$/.test(k))continue;const hit=await (await caches.open(k)).match(url.href);if(hit)return hit;}return Response.error();})());});
