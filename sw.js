const CACHE_NAME = 'pl300-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/portal-core.js',
  '/portal-style.css',
  '/style.css',
  '/simulado/simulado.html',
  '/simulado/simulado.js',
  '/simulado/simulado.css',
  '/manifest.json',
  '/icons/icon-192.svg',
  '/icons/icon-512.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const acceptHeader = event.request.headers.get('Accept') || '';
  // Navigation request -> try network, fallback to cache, then offline page
  if (event.request.mode === 'navigate' || acceptHeader.includes('text/html')) {
    event.respondWith(
      fetch(event.request).then(res => {
        // Put a copy in cache
        const copy = res.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return res;
      }).catch(() => caches.match(event.request).then(r => r || caches.match('/offline.html')))
    );
    return;
  }

  // For other requests: cache-first, then network, then fallback
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(resp => {
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, resp.clone()));
      return resp;
    }).catch(() => cached))
  );
});
