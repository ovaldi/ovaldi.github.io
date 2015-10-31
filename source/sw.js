var self = this;
var CACHE_NAME = 'ovaldi-blog-v1';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      });
  );
});

self.addEventListener('fetch', function(event) {
  var cachedResponse = caches.match(event.request).catch(function() {
    return fetch(event.request).then(function(response) {
      return caches.open(CACHE_NAME).then(function(cache) {
        cache.put(event.request, response.clone());
        return response;
      });
    });
  });
  console.log("fetch");
  event.respondWith(cachedResponse);
});