const cacheName = 'v1';
const cacheFiles = [
  '/',
  'https://use.fontawesome.com/releases/v5.15.1/css/all.css'
];

self.addEventListener('install', async event => {
  console.log('Service Worker: Installed');

  const cache = await caches.open(cacheName);
  console.log('Service Worker: Caching Files');
  await cache.addAll(cacheFiles);
});

self.addEventListener('fetch', async event => {
  console.log('Service Worker: Fetching');

  const response = await caches.match(event.request);
  if (response) {
    console.log('Service Worker: Found in Cache', event.request.url);
    return response;
  }

  console.log('Service Worker: Not Found in Cache', event.request.url);
  return fetch(event.request);
});
