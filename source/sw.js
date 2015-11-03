var self        = this;
var CACHE_NAME  = 'ovaldi-blog-v1';
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
      })
  );
});

self.addEventListener('fetch', function(event) {
  var cachedResponse = caches.match(event.request)
  .then(function(response){
    if(response){
      return response;
    }

    var fetchRequest = event.request.clone();

    return fetch(fetchRequest)
    .then(function(response) {
      // Check if we received a valid response
      if(!response || response.status !== 200 || response.type !== 'basic') {
        return response;
      }

      // IMPORTANT: Clone the response. A response is a stream
      // and because we want the browser to consume the response
      // as well as the cache consuming the response, we need
      // to clone it so we have 2 stream.
      var responseToCache = response.clone();

      caches.open(CACHE_NAME)
        .then(function(cache) {
          cache.put(event.request, responseToCache);
        });

      return response;
    });
  });

  event.respondWith(cachedResponse);
});