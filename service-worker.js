/* Spiltag Master — somente recursos estáticos; operações e dados permanecem online. */
const CACHE='spiltag-master-static-172';
const ASSETS=['./fundo-spiltag.png','./logo-spiltag.png','./icon-192.png','./icon-512.png','./manifest.json'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>Promise.allSettled(ASSETS.map(path=>cache.add(path)))));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('spiltag-master-static-')&&k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
if(req.mode==='navigate'){event.respondWith(fetch(req));return;}
if(ASSETS.some(path=>new URL(path,self.registration.scope).href===req.url)){event.respondWith(caches.match(req).then(cached=>cached||fetch(req)));}
});
