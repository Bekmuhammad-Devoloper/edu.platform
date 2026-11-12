/* yuksalish.dev — oddiy service worker: interfeys fayllari keshda, API har doim tarmoqdan */
const CACHE = 'yd-shell-v4';
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

// Push-bildirishnoma: uyga vazifa berildi / tekshirildi (ilova yopiq bo'lsa ham keladi)
self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch { d = { body: e.data ? e.data.text() : '' }; }
  e.waitUntil(self.registration.showNotification(d.title || 'yuksalish.dev', {
    body: d.body || '',
    icon: '/img/icon-192.png?v=2',
    badge: '/img/icon-192.png?v=2',
    data: { link: d.link || '#/' },
  }));
});

// Bildirishnoma bosilganda: ochiq oyna bo'lsa — o'sha sahifaga o'tadi, bo'lmasa ilova ochiladi
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const link = (e.notification.data && e.notification.data.link) || '#/';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
    const w = wins.find((c) => new URL(c.url).origin === self.location.origin);
    if (w) { w.postMessage({ type: 'open', link }); return w.focus(); }
    return self.clients.openWindow('/' + link);
  }));
});
