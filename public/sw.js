// Build inserts an exact inventory with SHA-256 integrity for each release asset.
const CACHE='__FZ_CACHE__';
const INTEGRITY=/*__FZ_INTEGRITY__*/{};
const scope=self.registration.scope;
const urls=new Map(Object.entries(INTEGRITY).map(([p,hash])=>[new URL(p,scope).href,hash]));
const shell=new URL('./index.html',scope).href;
const verifiedRequest=url=>new Request(url,{cache:'reload',integrity:urls.get(url)});
self.addEventListener('install',event=>event.waitUntil((async()=>{if(!urls.size)throw Error('Missing build inventory');const cache=await caches.open(CACHE);await cache.addAll([...urls.keys()].map(verifiedRequest));})()));
// Wait for confirmation or for all old clients to close.
self.addEventListener('message',event=>{if(event.data?.type==='ACTIVATE_UPDATE')event.waitUntil(self.skipWaiting());});
self.addEventListener('activate',event=>event.waitUntil((async()=>{await self.clients.claim();const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('fromzero-')&&k!==CACHE).map(k=>caches.delete(k)));})()));
async function cachedAsset(url){const cache=await caches.open(CACHE),hit=await cache.match(url);if(hit)return hit;try{const response=await fetch(verifiedRequest(url));if(!response.ok)return Response.error();await cache.put(url,response.clone());return response;}catch{return Response.error();}}
self.addEventListener('fetch',event=>{const r=event.request,url=new URL(r.url);if(r.method!=='GET'||url.origin!==self.location.origin)return;if(r.mode==='navigate'&&(url.pathname===new URL(scope).pathname||url.pathname===new URL(shell).pathname)){event.respondWith(cachedAsset(shell));return;}if(urls.has(url.href))event.respondWith(cachedAsset(url.href));});
