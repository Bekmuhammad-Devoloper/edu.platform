/* Brauzer zoom'ini tenglashtirish: kompyuterda Ctrl + bilan kattalashtirilgan bo'lsa ham sahifa 100% dagidek ko'rinsin.
 * O'chirish: localStorage.setItem('yd-zoomfix', '0') */
(function () {
  var STEPS = [1.1, 1.25, 1.33, 1.5, 1.75, 2, 2.5, 3];
  function fixZoom() {
    var z = 1;
    try {
      var off = localStorage.getItem('yd-zoomfix') === '0';
      var r = window.outerWidth / window.innerWidth;
      var step = STEPS.filter(function (s) { return Math.abs(r - s) / s < 0.035; })[0];
      if (!off && step && matchMedia('(pointer: fine)').matches && window.outerWidth >= 1000) z = 1 / step;
    } catch (e) { /* o'zgartirmaymiz */ }
    var root = document.documentElement;
    root.style.zoom = z === 1 ? '' : String(z);
    root.style.setProperty('--zf', String(z));
    var w = window.innerWidth / z;
    root.classList.toggle('zf-desk', z !== 1 && w > 1080);
    root.classList.toggle('zf-tab', z !== 1 && w > 640);
  }
  fixZoom();
  window.addEventListener('resize', fixZoom);
})();

/* yuksalish.dev — ilovani o'rnatish sahifasi */
(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var ua = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var isMobile = isIOS || isAndroid;
  var inApp = /Telegram|Instagram|FBAN|FBAV|Line\/|TikTok|; wv\)/i.test(ua);
  var isSafari = isIOS && /Safari/.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS|YaBrowser/.test(ua) && !inApp;
  var standalone = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;
  var deferred = null;

  document.getElementById('yr').textContent = new Date().getFullYear();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(function () {});

  var label = $('#installLabel'), hint = $('#installHint');
  var os = isIOS ? 'ios' : isAndroid ? 'android' : 'pc';
  if (isMobile) document.body.classList.add('is-mobile');

  // Ko'rsatma tablari
  function showOs(name) {
    document.querySelectorAll('.seg button').forEach(function (b) { b.classList.toggle('on', b.dataset.os === name); });
    document.querySelectorAll('.steps').forEach(function (p) { p.hidden = p.dataset.pane !== name; });
  }
  document.querySelectorAll('.seg button').forEach(function (b) { b.addEventListener('click', function () { showOs(b.dataset.os); }); });
  showOs(os);

  if (inApp) {
    $('#inapp').hidden = false;
    $('#inappTarget').textContent = isIOS ? "«Safari'da ochish»" : '«Brauzerda ochish»';
  }

  function toast(t) {
    var el = $('#toast'); el.textContent = t; el.hidden = false;
    clearTimeout(toast.t); toast.t = setTimeout(function () { el.hidden = true; }, 3800);
  }
  function setInstalled() {
    label.textContent = 'Ilovani ochish';
    hint.textContent = "Ilova o'rnatilgan — bosh ekrandan oching";
    document.body.classList.add('installed');
  }
  if (standalone) { location.replace('/#/'); return; }
  if (isIOS) hint.textContent = isSafari ? "Safari → Ulashish → «Bosh ekranga qo'shish»" : "iPhone'da Safari orqali o'rnatiladi";

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault(); deferred = e;
    hint.textContent = 'Bir bosishda o\'rnatiladi — bepul';
    document.body.classList.add('can-install');
  });
  window.addEventListener('appinstalled', function () {
    deferred = null; setInstalled(); toast("Ilova o'rnatildi! Bosh ekranda yuksalish.dev belgisini qidiring");
  });

  var sheet = $('#iosSheet');
  function openSheet() { $('#iosNote').hidden = isSafari; sheet.hidden = false; document.body.style.overflow = 'hidden'; }
  function closeSheet() { sheet.hidden = true; document.body.style.overflow = ''; }
  sheet.addEventListener('click', function (e) { if (e.target === sheet || e.target.closest('[data-close]')) closeSheet(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !sheet.hidden) closeSheet(); });

  function install() {
    if (document.body.classList.contains('installed')) { location.href = '/#/'; return; }
    if (deferred) {
      deferred.prompt();
      deferred.userChoice.then(function (r) {
        if (r.outcome === 'accepted') setInstalled();
        deferred = null;
      });
      return;
    }
    if (isIOS) { openSheet(); return; }
    // Brauzer o'zi taklif qilmadi — qo'lda o'rnatish ko'rsatmasi
    showOs(os);
    document.getElementById('how').scrollIntoView({ behavior: 'smooth', block: 'start' });
    toast(inApp ? 'Avval sahifani brauzerda oching, so\'ng qayta bosing'
      : isAndroid ? "⋮ menyusidan «Ilovani o'rnatish» yoki «Bosh ekranga qo'shish»ni tanlang"
      : "Manzil satridagi «O'rnatish» belgisini bosing (Chrome yoki Edge)");
  }
  $('#installBtn').addEventListener('click', install);
  document.querySelectorAll('[data-install]').forEach(function (b) { b.addEventListener('click', install); });

  // Ilova allaqachon o'rnatilgan bo'lsa (Chrome Android) — tugma «Ochish»ga aylanadi
  if (navigator.getInstalledRelatedApps) {
    navigator.getInstalledRelatedApps().then(function (a) { if (a && a.length) setInstalled(); }).catch(function () {});
  }

  // Ekranga kirganda yumshoq paydo bo'lish
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('[data-rv]').forEach(function (el) { el.classList.add('rv'); io.observe(el); });
  }
})();
