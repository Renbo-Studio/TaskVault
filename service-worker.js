const cacheName = 'v1';
const cacheFiles = [
  '/',
  '/index.html',
  '/Includes/css/row.css',
  '/Includes/css/style.css',
  '/Includes/fontawesome-free-5.15.4-web/css/all.css',
  '/Includes/js/app.js'
];

self.addEventListener('install', function(e) {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('Service Worker: Caching Files');
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('Service Worker: Fetching');
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        console.log('Service Worker: Found in Cache', e.request.url);
        return response;
      }
      console.log('Service Worker: Not Found in Cache', e.request.url);
      return fetch(e.request);
    })
  );
});
