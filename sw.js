var staticCacheName = "pwa";
var ghpath = "/greek_lex_searcher"; 
self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(staticCacheName).then(function (cache) {
      return cache.addAll([`${ghpath}/index.html`, `${ghpath}/static/style.css`, `${ghpath}/static/dict_data.js`, `${ghpath}/yew-app-6df...d54)bg.wasm`, `${ghpath}/yew-app-6df...3583ec8d54.js`]);
    })
  );
});
 
self.addEventListener("fetch", function (event) {
  console.log(event.request.url);
 
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});
