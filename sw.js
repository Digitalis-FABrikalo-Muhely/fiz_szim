// Minden módosítás után írd át a verziószámot (v1 -> v2, v2 -> v3, stb.)
const CACHE_NAME = 'digifab-v4';

const ASSETS = [
  './',
  './index.html',
  './icon.png',
  './manifest.json'
];

// Telepítéskor az új verzió azonnal letöltődik a háttérben
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Kényszerítjük az azonnali frissítést
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Aktiváláskor töröljük a régi, elavult fájlokat (pl. a v1-et)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// A fájlok kiszolgálása a gyorsítótárból (offline mód)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

