/* yuksalish.dev — oddiy service worker: interfeys fayllari keshda, API har doim tarmoqdan */
const CACHE = 'yd-shell-v3';
const SHELL = ['/', '/app.css', '/app.js', '/img/yuksalish-logo-light.png', '/img/icon-192.png?v=2', '/img/background.jpg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // API, materiallar va fayllar — faqat tarmoqdan (shaxsiy ma'lumotlar keshlanmaydi)
  if (/^\/(api|m|avatars|market-img)\//.test(url.pathname)) return;
  // interfeys: avval tarmoq, bo'lmasa kesh (oflaynda ham ochiladi)
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(e.request, copy)); }
      return res;
    }).catch(() => caches.match(e.request).then((r) => r || caches.match('/')))
  );
});
