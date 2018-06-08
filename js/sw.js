const CACHE_NAME = 'mws-restaurant-cache';
const urlsToCache = [
  '/',
  '/restaurant.html/',
  '/css/',
  '/js/'
];

self.addEventListener('install', function(event) {
  // Perform install steps
  console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  console.log("[ServiceWorker] Fetch");
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});


self.addEventListener('activate', function(event) {
console.log("[ServiceWorker] Activate")
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
