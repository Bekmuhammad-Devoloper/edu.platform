/* Yuksalish Academy LMS — interfeys (vanilla JS, hash router) */
'use strict';

// ------------------------------------------------------------------ yordamchilar
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
const MONTHS = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek'];
const MONTHS_FULL = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const WEEKDAYS = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
const DAY_NAMES = ['', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'];
const ROLE = { dev: 'Egasi (Dev)', admin: 'Administrator', teacher: "O'qituvchi", student: "O'quvchi", parent: 'Ota-ona' };
// Kirgan foydalanuvchi 'dev' bo'lsa — barcha admin ekranlari ishlashi uchun rolni 'admin' qilamiz,
// asl egalik rolini is_dev bilan belgilab qo'yamiz (nishon va huquqlar uchun).
function adoptUser(u) {
  if (u && u.role === 'dev') { u.is_dev = true; u.role = 'admin'; }
  return u;
}
// ko'rsatiladigan rol: egasi uchun 'dev', aks holda asl rol
const dispRole = (u) => (u && u.is_dev ? 'dev' : u && u.role);
const STATUS = {
  berilmagan: 'Berilmagan', kutilmoqda: 'Topshirilmagan', bajarilmagan: 'Bajarilmagan',
  tekshirilmoqda: 'Tekshirilmoqda', qaytarilgan: 'Qaytarilgan', qabul: 'Qabul qilingan',
};
const todayStr = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

// server UTC "YYYY-MM-DD HH:MM:SS" saqlaydi
const parseUtc = (s) => new Date(String(s).replace(' ', 'T') + 'Z');
function fmtDate(s, withTime) {
  if (!s) return '—';
  const m = String(s).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return esc(s);
  if (withTime && String(s).length > 10) {
    const d = parseUtc(s);
    return `${d.getDate()} ${MONTHS[d.getMonth()]}, ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
  }
  return `${+m[3]} ${MONTHS[+m[2] - 1]} ${m[1]}`;
}
function ago(s) {
  const sec = (Date.now() - parseUtc(s).getTime()) / 1000;
  if (sec < 60) return 'hozirgina';
  if (sec < 3600) return `${Math.floor(sec / 60)} daqiqa oldin`;
  if (sec < 86400) return `${Math.floor(sec / 3600)} soat oldin`;
  if (sec < 86400 * 7) return `${Math.floor(sec / 86400)} kun oldin`;
  return fmtDate(s, true);
}
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 86400000);
function deadlineChip(deadline) {
  if (!deadline) return '';
  const n = daysBetween(todayStr(), deadline);
  if (n < 0) return `<span class="chip bad">${-n} kun kechikdi</span>`;
  if (n === 0) return '<span class="chip warn">bugun oxirgi kun</span>';
  if (n === 1) return '<span class="chip warn">ertaga</span>';
  return `<span class="chip info">${n} kun qoldi</span>`;
}
const daysText = (d) => String(d || '').split(',').map((x) => DAY_NAMES[+x]).filter(Boolean).join(', ');
const badge = (st) => `<span class="badge st-${esc(st)}">${esc(STATUS[st] || st)}</span>`;
const initials = (n) => String(n || '?').split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
// Profil rasmi bo'lmasa — rolga mos ikonka (administrator / o'qituvchi / o'quvchi)
const ROLE_ICON = { dev: 'code', admin: 'shieldCheck', teacher: 'presentation', student: 'graduation', parent: 'heart' };
const avatar = (name, uid, cls = '', role = 'student', photo = null) => (photo
  ? `<span class="avatar ${cls} has-photo" title="${esc(name)}"><img src="${esc(photo)}" alt="" loading="lazy"></span>`
  : `<span class="avatar ${cls} av-${ROLE_ICON[role] ? role : 'student'}" title="${esc(name)} · ${ROLE[role] || ''}">${ic(ROLE_ICON[role] || 'graduation')}</span>`);
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const greeting = () => { const h = new Date().getHours(); return h < 5 ? 'Xayrli tun' : h < 11 ? 'Xayrli tong' : h < 17 ? 'Xayrli kun' : h < 22 ? 'Xayrli kech' : 'Xayrli tun'; };
const todayLong = () => { const d = new Date(); return `${WEEKDAYS[d.getDay()]}, ${d.getDate()}-${MONTHS_FULL[d.getMonth()]}`; };

// ------------------------------------------------------------------ ikonlar (lucide uslubi)
const ICONS = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  settings: '<line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
  edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
  trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  check: '<polyline points="20 6 9 17 4 12"/>',
  checkCircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  chart: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
  trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  left: '<polyline points="15 18 9 12 15 6"/>',
  right: '<polyline points="9 18 15 12 9 6"/>',
  menu: '<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>',
  search: '<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>',
  clipboard: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/>',
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
  alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
  send: '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>',
  maximize: '<path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/>',
  code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  target: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
  refresh: '<polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>',
  key: '<circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3L22 7l-3-3"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
  unlock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/>',
  lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
  shieldCheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  presentation: '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
  graduation: '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  gift: '<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>',
  coin: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5.5"/><path d="M12 9.5v5"/>',
  crown: '<path d="m2 6 4 12h12l4-12-6 5-4-7-4 7z"/>',
  bag: '<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>',
  smartphone: '<rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
  wallet: '<path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/><path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/><path d="M18 12a2 2 0 0 0 0 4h4v-4z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
  quiz: '<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
  printer: '<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>',
  play: '<polygon points="6 3 20 12 6 21 6 3"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
};
const ic = (n, cls = '') => `<svg class="i ${cls}" viewBox="0 0 24 24">${ICONS[n] || ''}</svg>`;
const COURSE_STYLE = { 'it-kursi': ['c-it', 'monitor'], 'ai-prompt': ['c-ai', 'sparkles'], 'nodejs-backend': ['c-node', 'code'] };
const courseStyle = (slug) => COURSE_STYLE[slug] || ['', 'book'];

// ------------------------------------------------------------------ API, toast, modal
async function api(method, url, body) {
  const res = await fetch(url, {
    method, credentials: 'same-origin',
    headers: body ? { 'Content-Type': 'application/json' } : {},
    body: body ? JSON.stringify(body) : undefined,
  });
  let data = {};
  try { data = await res.json(); } catch { /* bo'sh javob */ }
  if (res.status === 401 && !url.endsWith('/api/login')) { state.user = null; go('#/login'); throw new Error(data.error || 'Tizimga kiring'); }
  if (!res.ok) throw new Error(data.error || `Xatolik (${res.status})`);
  return data;
}

let toastTimer;
function toast(msg, err) {
  const t = $('#toast');
  t.innerHTML = `${ic(err ? 'alert' : 'checkCircle')}<span>${esc(msg)}</span>`;
  t.className = 'toast show' + (err ? ' err' : '');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => { t.className = 'toast'; }, 3400);
}
const go = (hash) => { if (location.hash !== hash) location.hash = hash; else route(); };

function modal(title, bodyHtml, onSubmit, submitText = 'Saqlash', subtitle = '') {
  const bg = document.createElement('div');
  bg.className = 'modal-bg';
  bg.innerHTML = `<form class="modal">
    <div class="modal-head"><div><h2>${esc(title)}</h2>${subtitle ? `<p>${esc(subtitle)}</p>` : ''}</div><button type="button" class="icon-btn sm" data-close title="Yopish">${ic('x')}</button></div>
    <div class="modal-body">${bodyHtml}</div>
    <div class="actions">${onSubmit ? `<button type="button" class="btn ghost" data-close>Bekor qilish</button><button class="btn primary">${esc(submitText)}</button>` : '<button type="button" class="btn primary" data-close>Yopish</button>'}</div></form>`;
  document.body.appendChild(bg);
  const close = () => { bg.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  bg.addEventListener('mousedown', (e) => { if (e.target === bg) close(); });
  bg.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) close(); });
  const form = $('form', bg);
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!onSubmit) return close();
    const btn = $('button.primary', form); btn.disabled = true;
    try { await onSubmit(form, close); } catch (err) { toast(err.message, true); } finally { btn.disabled = false; }
  });
  const first = $('input:not([type=hidden]), select, textarea', form); if (first) first.focus();
  return form;
}
const formData = (form) => Object.fromEntries(new FormData(form).entries());

// ------------------------------------------------------------------ grafiklar
function barChart(data) {
  const W = 700, H = 210, pad = 22, bw = (W - pad * 2) / data.length;
  const max = Math.max(4, ...data.map((d) => d.n));
  const bars = data.map((d, i) => {
    const h = Math.round(((H - 50) * d.n) / max);
    const x = pad + i * bw + bw * 0.18, w = bw * 0.64, y = H - 26 - h;
    const day = +d.date.slice(8);
    const isToday = d.date === todayStr();
    return `<rect class="bar-bg" x="${x}" y="14" width="${w}" height="${H - 40}" rx="7"/>
      ${d.n ? `<rect class="bar-r" x="${x}" y="${y}" width="${w}" height="${h}" rx="7"><title>${fmtDate(d.date)}: ${d.n} ta</title></rect><text class="val" x="${x + w / 2}" y="${y - 5}" text-anchor="middle">${d.n}</text>` : ''}
      <text x="${x + w / 2}" y="${H - 8}" text-anchor="middle" ${isToday ? 'style="fill:#fff;font-weight:700"' : ''}>${day}</text>`;
  }).join('');
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none">${bars}</svg>`;
}
function ring(p, size = 76, label) {
  const r = 32, c = 2 * Math.PI * r;
  return `<div class="ring" style="--s:${size}px"><svg viewBox="0 0 80 80"><circle class="bg" cx="40" cy="40" r="${r}"/>
    <circle class="fg" cx="40" cy="40" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - Math.min(100, p) / 100)}"/></svg><b>${label ?? p + '%'}</b></div>`;
}
const statInner = (tone, icon, value, label, sub) => `<div class="stat-top"><span class="stat-label">${label}</span><span class="ico">${ic(icon)}</span></div><b class="stat-val">${value}</b>${sub ? `<small>${sub}</small>` : ''}`;
const stat = (tone, icon, value, label, sub) => `<div class="stat t-${tone}">${statInner(tone, icon, value, label, sub)}</div>`;
const cardHead = (icon, title, extra = '') => `<div class="card-head"><h2>${ic(icon)}${title}</h2><span class="spacer"></span>${extra}</div>`;
const empty = (text, icon = 'inbox') => `<div class="empty">${ic(icon)}${text}</div>`;

// ------------------------------------------------------------------ holat va layout
const state = { user: null, unread: 0, coins: null };
const NAV = {
  admin: [['#/', 'home', 'Bosh sahifa'], ['#/groups', 'users', 'Guruhlar'], ['#/schedule', 'calendar', 'Dars jadvali'], ['#/courses', 'book', 'Kurslar'], ['#/users', 'shield', 'Foydalanuvchilar'], ['#/payments', 'wallet', "To'lovlar"], ['#/market', 'gift', 'Market'], ['#/rating', 'trophy', 'Reyting'], ['#/activity', 'clock', 'Faoliyat tarixi'], ['#/ai', 'sparkles', 'AI sozlamalari'], ['#/news', 'megaphone', "E'lonlar"], ['#/profile', 'settings', 'Profil']],
  parent: [['#/', 'home', 'Bosh sahifa'], ['#/p/attendance', 'checkCircle', 'Davomat'], ['#/p/tasks', 'clipboard', 'Vazifalar va baholar'], ['#/p/pay', 'wallet', "To'lovlar"], ['#/p/messages', 'message', "O'qituvchi bilan"], ['#/news', 'megaphone', "E'lonlar"], ['#/profile', 'settings', 'Profil']],
  teacher: [['#/', 'home', 'Bosh sahifa'], ['#/groups', 'users', 'Mening guruhlarim'], ['#/inbox', 'message', 'Ota-onalar'], ['#/schedule', 'calendar', 'Dars jadvali'], ['#/courses', 'book', 'Kurslar'], ['#/rating', 'trophy', 'Reyting'], ['#/news', 'megaphone', "E'lonlar"], ['#/profile', 'settings', 'Profil']],
  student: [['#/', 'home', 'Bosh sahifa'], ['#/groups', 'layers', 'Mening kurslarim'], ['#/schedule', 'calendar', 'Dars jadvali'], ['#/rating', 'trophy', 'Reyting'], ['#/market', 'gift', 'Market'], ['#/coins', 'coin', 'Coinlarim'], ['#/achievements', 'award', 'Yutuqlar'], ['#/news', 'megaphone', "E'lonlar"], ['#/profile', 'settings', "Profil va to'lovlar"]],
};
// telefonda o'quvchi uchun pastki menyu (ilova kabi)
const PTABBAR = [['#/', 'home', 'Asosiy'], ['#/p/attendance', 'checkCircle', 'Davomat'], ['#/p/tasks', 'clipboard', 'Baholar'], ['#/p/pay', 'wallet', "To'lov"], ['#/p/messages', 'message', 'Xabar']];
const TABBAR = [['#/', 'home', 'Asosiy'], ['#/groups', 'layers', 'Kurslar'], ['#/rating', 'trophy', 'Reyting'], ['#/market', 'gift', 'Market'], ['#/profile', 'user', 'Profil']];
const coinHtml = (n, cls = '') => `<span class="coin ${cls}"><i></i>${Number(n || 0).toLocaleString('ru-RU')}</span>`;

function layout(html) {
  document.body.classList.remove('chat-open');
  const u = state.user;
  const hash = location.hash || '#/';
  const nav = NAV[u.role].map(([h, icon, t]) => {
    const active = h === '#/' ? (hash === '#/' || hash === '#') : hash.startsWith(h);
    return `<a href="${h}" class="${active ? 'active' : ''}">${ic(icon)}${t}</a>`;
  }).join('');
  const isSt = u.role === 'student', isPa = u.role === 'parent';
  const coinPill = isSt ? `<a href="#/coins" class="coin-pill" data-coins title="Coinlarim">${coinHtml(state.coins ?? 0)}</a>` : '';
  const tabbar = isSt || isPa ? `<nav class="tabbar">${(isPa ? PTABBAR : TABBAR).map(([h, icon, t]) => { const a = h === '#/' ? (hash === '#/' || hash === '#') : hash.startsWith(h) || (h === '#/groups' && hash.startsWith('#/tests')); return `<a href="${h}" class="${a ? 'active' : ''}">${ic(icon)}<span>${t}</span></a>`; }).join('')}</nav>` : '';
  document.body.classList.toggle('app-student', isSt || isPa);
  document.body.classList.toggle('is-home', hash === '#/' || hash === '#');
  const bell = `<button class="icon-btn" data-bell title="Bildirishnomalar">${ic('bell')}${state.unread ? `<span class="dot">${state.unread > 99 ? '99+' : state.unread}</span>` : ''}</button>`;
  $('#app').innerHTML = `
  <div class="layout">
    <aside class="sidebar" id="sidebar">
      <div class="brand"><span class="logo-glow"><img src="/img/yuksalish-logo-light.png" alt=""></span><div>yuksalish<span class="dot-dev">.dev</span></div></div>
      <div class="nav-label">Menyu</div>
      <nav class="nav">${nav}</nav>
      <div class="me">${avatar(u.name, u.id, '', dispRole(u), u.avatar)}<div class="who"><b>${esc(u.name)}</b><span class="role-${dispRole(u)}">${ROLE[dispRole(u)]}</span></div>
        <button class="icon-btn" id="logout" title="Chiqish">${ic('logout')}</button></div>
    </aside>
    <div style="min-width:0">
      <div class="topbar"><button class="icon-btn" id="menuBtn">${ic('menu')}</button><span class="logo-glow sm"><img src="/img/yuksalish-logo-light.png" alt=""></span><b>yuksalish<span class="dot-dev">.dev</span></b>${coinPill}${bell}</div>
      <main class="main" id="main">
        <div class="topline"><span class="today">${ic('calendar')}${todayLong()}</span><span class="spacer"></span>${coinPill}${bell}
          <a href="#/profile" class="top-av" title="Profil">${avatar(u.name, u.id, '', u.role, u.avatar)}</a></div>
        ${html}
      </main>
    </div>
  </div>${tabbar}`;
  $('#logout').onclick = async () => { await api('POST', '/api/logout').catch(() => {}); state.user = null; go('#/login'); };
  $('#menuBtn').onclick = (e) => { e.stopPropagation(); $('#sidebar').classList.toggle('open'); };
  $$('[data-bell]').forEach((b) => { b.onclick = (e) => { e.stopPropagation(); toggleNotifications(); }; });
}

// ------------------------------------------------------------------ bildirishnomalar
const NOTIF_STYLE = { submit: ['t-blue', 'upload'], grade: ['t-green', 'checkCircle'], comment: ['t-violet', 'message'], announce: ['t-amber', 'megaphone'], open: ['t-teal', 'unlock'], test: ['t-violet', 'quiz'], pay: ['t-green', 'wallet'], cert: ['t-amber', 'award'], group: ['t-violet', 'users'], task: ['t-blue', 'clipboard'], video: ['t-rose', 'play'], coin: ['t-amber', 'coin'], market: ['t-violet', 'gift'], badge: ['t-amber', 'award'], ai: ['t-violet', 'sparkles'], absent: ['t-rose', 'alert'], pmsg: ['t-blue', 'message'] };
const money = (n) => `${Number(n || 0).toLocaleString('ru-RU')} so'm`;
const moneyVal = (n) => `${Number(n || 0).toLocaleString('ru-RU')}<em>so'm</em>`;
const shortVal = (n) => (n >= 1e6 ? `${String(Math.round(n / 1e5) / 10).replace('.', ',')}<em>mln so'm</em>` : n >= 1e3 ? `${Math.round(n / 1e3)}<em>ming so'm</em>` : moneyVal(n));
const shortMoney = (n) => (n >= 1e6 ? `${String(Math.round(n / 1e5) / 10).replace('.', ',')} mln` : n >= 1e3 ? `${Math.round(n / 1e3)} ming` : money(n));
const monthName = (m) => { const [y, mm] = String(m).split('-'); return `${MONTHS_FULL[+mm - 1] || ''} ${y}`; };
function paintBell() {
  const n = state.unread;
  $$('[data-bell]').forEach((b) => {
    const d = $('.dot', b);
    if (!n) { if (d) d.remove(); return; }
    const txt = n > 99 ? '99+' : String(n);
    if (d) d.textContent = txt; else b.insertAdjacentHTML('beforeend', `<span class="dot">${txt}</span>`);
  });
}
async function refreshUnread() {
  if (!state.user) return;
  try {
    const r = await api('GET', '/api/notifications');
    state.unread = r.unread; paintBell();
    if (r.coins !== null && r.coins !== undefined) { state.coins = r.coins; $$('[data-coins]').forEach((el) => { el.innerHTML = coinHtml(r.coins); }); }
  } catch { /* jim */ }
}
async function toggleNotifications() {
  const old = $('.notif-panel');
  if (old) { old.remove(); return; }
  const { items } = await api('GET', '/api/notifications');
  const p = document.createElement('div');
  p.className = 'notif-panel';
  p.innerHTML = `<header>${ic('bell')}&nbsp; Bildirishnomalar<span class="spacer"></span>${items.some((n) => !n.read) ? '<button class="btn sm ghost" data-readall>Hammasini o\'qildi</button>' : ''}</header>
    <div class="items">${items.length ? items.map((n) => {
      const [tone, icon] = NOTIF_STYLE[n.kind] || ['t-blue', 'bell'];
      return `<div class="notif ${n.read ? '' : 'unread'}" data-n="${n.id}" data-link="${esc(n.link || '')}"><div class="ni ${tone}">${ic(icon)}</div>
        <div><div class="tx">${esc(n.text)}</div><div class="tm">${ago(n.created_at)}</div></div></div>`;
    }).join('') : empty("Hozircha bildirishnoma yo'q", 'bell')}</div>`;
  document.body.appendChild(p);
  p.addEventListener('click', async (e) => {
    e.stopPropagation();
    const ra = e.target.closest('[data-readall]');
    if (ra) {
      await api('POST', '/api/notifications/read', {});
      $$('.notif.unread', p).forEach((x) => x.classList.remove('unread'));
      ra.remove(); state.unread = 0; paintBell(); return;
    }
    const n = e.target.closest('.notif');
    if (!n) return;
    api('POST', '/api/notifications/read', { id: Number(n.dataset.n) }).then(refreshUnread);
    p.remove();
    if (n.dataset.link) go(n.dataset.link);
  });
}
document.addEventListener('click', (e) => {
  const p = $('.notif-panel'); if (p && !p.contains(e.target)) p.remove();
  const sb = $('#sidebar'); if (sb && sb.classList.contains('open') && !sb.contains(e.target)) sb.classList.remove('open');
});
setInterval(refreshUnread, 45000);
window.addEventListener('scroll', () => { const t = $('.topbar'); if (t) t.classList.toggle('scrolled', window.scrollY > 8); }, { passive: true });

// ------------------------------------------------------------------ login
function viewLogin() {
  $('#app').innerHTML = `
  <div class="login-wrap"><div class="login-split"><div class="login-art" role="img" aria-label="yuksalish.dev"></div><div class="card login">
    <span class="logo-glow lg"><img src="/img/yuksalish-logo-light.png" alt="Yuksalish"></span>
    <h1>yuksalish<span class="dot-dev">.dev</span></h1><p class="muted">O'quv platformasiga xush kelibsiz</p>
    <form id="loginForm">
      <label class="f"><span>Login</span><input name="login" autocomplete="username" required placeholder="loginingiz"></label>
      <label class="f"><span>Parol</span><div class="pw"><input name="password" type="password" autocomplete="current-password" required placeholder="••••••••">
        <button type="button" id="pwEye" title="Ko'rsatish">${ic('eye')}</button></div></label>
      <button class="btn primary" style="width:100%;padding:12px">Kirish</button>
    </form>
    ${isStandalone() ? '' : `<a class="app-dl" href="/ilova/">${ic('smartphone')}<span><b>Telefon ilovasini o'rnating</b><small>Android va iPhone — bepul</small></span>${ic('download')}</a>`}
    <div class="roles-row"><span class="chip">${ic('shieldCheck')} Administrator</span><span class="chip">${ic('presentation')} O'qituvchi</span><span class="chip">${ic('graduation')} O'quvchi</span><span class="chip">${ic('heart')} Ota-ona</span></div>
  </div></div></div>`;
  $('#pwEye').onclick = () => { const i = $('input[name=password]'); i.type = i.type === 'password' ? 'text' : 'password'; };
  $('#loginForm').onsubmit = async (e) => {
    e.preventDefault();
    try { const r = await api('POST', '/api/login', formData(e.target)); state.user = adoptUser(r.user); state.unread = 0; go('#/'); refreshUnread(); }
    catch (err) { toast(err.message, true); }
  };
}

// ------------------------------------------------------------------ umumiy bloklar
function newsHtml(list) {
  if (!list.length) return empty("Hozircha e'lon yo'q", 'megaphone');
  const u = state.user;
  return list.map((a) => `<div class="news"><h4>${ic('megaphone')}${esc(a.title)}<span class="spacer"></span>
      ${u.role === 'admin' || a.author_id === u.id ? `<button class="btn sm ghost" data-del-news="${a.id}" title="O'chirish">${ic('trash')}</button>` : ''}</h4>
      ${a.text ? `<p>${esc(a.text)}</p>` : ''}
      <div class="m"><span>${esc(a.author)}</span>·<span>${a.group_name ? esc(a.group_name) : '<span class="chip warn">Hammaga</span>'}</span>·<span>${ago(a.created_at)}</span></div></div>`).join('');
}
function bindNewsDelete(after) {
  $$('[data-del-news]').forEach((b) => {
    b.onclick = async () => {
      if (!confirm("E'lon o'chirilsinmi?")) return;
      await api('DELETE', `/api/announcements/${b.dataset.delNews}`); toast("E'lon o'chirildi"); after();
    };
  });
}
async function newsForm(groupId, after) {
  const u = state.user;
  let groupSelect = '';
  if (!groupId) {
    const { groups } = await api('GET', '/api/groups');
    groupSelect = `<label class="f"><span>Kimga</span><select name="group_id">${u.role === 'admin' ? '<option value="">Hamma foydalanuvchilarga</option>' : ''}
      ${groups.filter((g) => g.active).map((g) => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select></label>`;
  }
  modal("Yangi e'lon", `${groupSelect}
    <label class="f"><span>Sarlavha</span><input name="title" required maxlength="200" placeholder="Masalan: Ertangi dars 15:00 da"></label>
    <label class="f"><span>Matn</span><textarea name="text" placeholder="Batafsil ma'lumot..."></textarea></label>
    <p class="hint">E'lon o'quvchilarga bildirishnoma sifatida ham yuboriladi.</p>`,
  async (form, close) => {
    const f = formData(form);
    await api('POST', '/api/announcements', { title: f.title, text: f.text, group_id: groupId || (f.group_id ? Number(f.group_id) : null) });
    close(); toast("E'lon yuborildi"); after();
  }, 'Yuborish');
}
function groupsTable(groups) {
  if (!groups.length) return empty("Faol guruh yo'q", 'users');
  return `<div class="table-wrap"><table><tr><th>Guruh</th><th>O'qituvchi</th><th>O'quvchi</th><th>O'tilgan darslar</th><th>Vazifalar bajarilishi</th><th>O'rtacha ball</th><th>Tekshirish</th></tr>
    ${groups.map((g) => `<tr class="click" data-href="#/groups/${g.id}">
      <td><b>${esc(g.name)}</b><div class="small muted">${esc(g.course_title)}</div></td>
      <td class="small">${esc(g.teacher_name || '—')}</td><td>${g.student_count}</td>
      <td style="min-width:150px"><div class="row" style="flex-wrap:nowrap"><div class="bar violet"><i style="width:${pct(g.given, g.total)}%"></i></div><span class="pct">${g.given}/${g.total}</span></div></td>
      <td style="min-width:150px"><div class="row" style="flex-wrap:nowrap"><div class="bar"><i style="width:${g.done_pct}%"></i></div><span class="pct">${g.done_pct}%</span></div></td>
      <td>${g.avg_score ?? '—'}</td>
      <td>${g.pending ? `<span class="badge st-tekshirilmoqda">${g.pending}</span>` : '<span class="muted">—</span>'}</td></tr>`).join('')}</table></div>`;
}
const subItem = (r, extra = '') => `<a class="li" href="#/groups/${r.group_id}/lessons/${r.lesson_id}">${avatar(r.student, r.student_id, 'sm', 'student', r.student_avatar)}
  <div class="grow"><div class="t">${esc(r.student)}</div><div class="s">${esc(r.lesson)} · ${esc(r.group_name)}</div></div>${extra}</a>`;
const WD_SHORT = ['Yak', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha'];
const relDay = (date) => {
  const n = daysBetween(todayStr(), date);
  if (n === 0) return '<span class="chip ok">bugun</span>';
  if (n === 1) return '<span class="chip warn">ertaga</span>';
  if (n < 0) return `<span class="chip">${-n} kun oldin</span>`;
  return `<span class="chip">${n} kundan keyin</span>`;
};
const lessonItem = (r, extra) => {
  const dt = new Date((r.date || todayStr()) + 'T00:00:00');
  const isToday = r.date === todayStr();
  return `<a class="li lesson-li" href="#/groups/${r.group_id}/lessons/${r.lesson_id}">
    <div class="date-box ${isToday ? 'today' : ''}"><span>${WD_SHORT[dt.getDay()]}</span><b>${dt.getDate()}</b><span>${MONTHS[dt.getMonth()]}</span></div>
    <div class="grow"><div class="t">${r.num ? `<span class="num">${String(r.num).padStart(2, '0')}</span>` : ''}${esc(r.lesson)}</div>
      <div class="s">${esc(r.group_name)}${r.module_title ? ' · ' + esc(r.module_title) : ''}</div></div>
    <div class="li-right">${r.time ? `<span class="li-time">${ic('clock')}${esc(r.time)}</span>` : ''}${extra ?? relDay(r.date)}</div></a>`;
};

// ------------------------------------------------------------------ bosh sahifa
// ------------------------------------------------------------------ bosh sahifa slayderi: profil + dars kalendari
const ymdOf = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const calState = { y: 0, m: 0, items: [], sel: null };
async function loadCal(y, m) {
  const first = new Date(y, m, 1);
  const r = await api('GET', `/api/schedule?from=${ymdOf(first)}&days=42`);
  calState.y = y; calState.m = m; calState.items = r.items;
}
function calHtml() {
  const { y, m, items } = calState;
  const t = todayStr();
  const byDay = {};
  for (const it of items) (byDay[it.date] = byDay[it.date] || []).push(it);
  const first = new Date(y, m, 1);
  const start = new Date(first); start.setDate(1 - ((first.getDay() + 6) % 7)); // dushanbadan
  let cells = '';
  for (let i = 0; i < 42; i++) {
    const d = new Date(start); d.setDate(start.getDate() + i);
    if (i >= 35 && d.getMonth() !== m) break; // 6-qator kerak bo'lmasa
    const k = ymdOf(d), has = byDay[k];
    const cls = [d.getMonth() !== m ? 'out' : '', k === t ? 'today' : '', has ? 'lesson' : '', has && k < t ? 'past' : '', calState.sel === k ? 'sel' : ''].join(' ');
    cells += `<button type="button" class="cal-d ${cls}" data-day="${k}">${d.getDate()}${has ? `<i>${has.length > 1 ? has.length : ''}</i>` : ''}</button>`;
  }
  const monthCount = items.filter((x) => x.date.startsWith(`${y}-${String(m + 1).padStart(2, '0')}`)).length;
  const sel = calState.sel && byDay[calState.sel];
  const next = items.filter((x) => x.date >= t).sort((a, b) => a.date.localeCompare(b.date))[0];
  const info = sel ? sel.map((x) => `<a href="#/groups/${x.group_id}/lessons/${x.lesson_id}" class="cal-info">${ic('clock')}<b>${esc(x.time || '')}</b><span>${esc(x.lesson)}</span></a>`).join('')
    : calState.sel ? `<div class="cal-info muted">${ic('calendar')}<span>Bu kunda dars yo'q</span></div>`
    : next ? `<a href="#/groups/${next.group_id}/lessons/${next.lesson_id}" class="cal-info">${ic('right')}<b>${next.date === t ? 'Bugun' : fmtDate(next.date).replace(/ \d{4}$/, '')}${next.time ? ' · ' + esc(next.time) : ''}</b><span>${esc(next.lesson)}</span></a>`
    : `<div class="cal-info muted">${ic('calendar')}<span>Bu oyda dars yo'q</span></div>`;
  return `<div class="cal-head"><button type="button" class="cal-nav" data-cal="-1" title="Oldingi oy">${ic('left')}</button>
      <div><b>${MONTHS_FULL[m].replace(/^./, (c) => c.toUpperCase())} ${y}</b><span>${monthCount} ta dars</span></div>
      <button type="button" class="cal-nav" data-cal="1" title="Keyingi oy">${ic('right')}</button></div>
    <div class="cal-grid">${['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((w) => `<span class="cal-w">${w}</span>`).join('')}${cells}</div>
    ${info}`;
}
function bindCal() {
  const box = $('#calSlide'); if (!box) return;
  box.innerHTML = calHtml();
  $$('[data-cal]', box).forEach((b) => {
    b.onclick = async () => {
      const d = new Date(calState.y, calState.m + Number(b.dataset.cal), 1);
      calState.sel = null;
      try { await loadCal(d.getFullYear(), d.getMonth()); bindCal(); } catch (e) { toast(e.message, true); }
    };
  });
  $$('[data-day]', box).forEach((b) => { b.onclick = () => { calState.sel = calState.sel === b.dataset.day ? null : b.dataset.day; bindCal(); }; });
}
let sliderTimer;
function initHeroSlider() {
  clearInterval(sliderTimer);
  const track = $('#heroTrack'); if (!track) return;
  const dots = $$('.hs-dots button');
  const go2 = (i) => { track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' }); };
  const cur = () => Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
  const slides = [...track.children];
  // slayder balandligi ko'rinib turgan kartaga teng (katta ekranda yonma-yon — moslash shart emas)
  const fit = () => { track.style.height = window.innerWidth >= 1100 ? '' : `${slides[Math.min(cur(), slides.length - 1)].offsetHeight}px`; };
  let ft; track.addEventListener('scroll', () => { const i = cur(); dots.forEach((d, k) => d.classList.toggle('on', k === i)); clearTimeout(ft); ft = setTimeout(fit, 60); }, { passive: true });
  window.addEventListener('resize', fit);
  new ResizeObserver(fit).observe(slides[slides.length - 1]);
  fit();
  dots.forEach((d, k) => { d.onclick = () => { go2(k); restart(); }; });
  let paused = false;
  const restart = () => { clearInterval(sliderTimer); sliderTimer = setInterval(() => { if (!paused && document.body.contains(track)) go2((cur() + 1) % dots.length); else if (!document.body.contains(track)) clearInterval(sliderTimer); }, 7000); };
  ['pointerdown', 'touchstart', 'focusin'].forEach((ev) => track.addEventListener(ev, () => { paused = true; restart(); setTimeout(() => { paused = false; }, 12000); }, { passive: true }));
  restart();
}

async function viewDashboard() {
  const d = await api('GET', '/api/dashboard');
  if (state.user.role === 'student') { const n = new Date(); calState.sel = null; try { await loadCal(n.getFullYear(), n.getMonth()); } catch { calState.items = []; } }
  const u = state.user;
  const first = esc(u.name.split(' ')[0]);
  const news = `<div class="card">${cardHead('megaphone', "E'lonlar", `${u.role !== 'student' ? `<button class="btn sm" id="addNews">${ic('plus')}E'lon</button>` : ''}<a class="more" href="#/news">Barchasi</a>`)}${newsHtml(d.announcements)}</div>`;

  if (u.role === 'admin') {
    const s = d.stats;
    const total14 = d.activity.reduce((a, x) => a + x.n, 0);
    layout(`<div class="page-head"><div><h1>${greeting()}, ${first}!</h1><p>Platformaning umumiy holati</p></div>
      <div class="row"><button class="btn primary" id="qGroup">${ic('plus')}Guruh</button><a class="btn" href="#/users">${ic('user')}Foydalanuvchilar</a></div></div>
      <div class="stats">
        ${stat('blue', 'layers', s.students, "Faol o'quvchilar", `${s.teachers} ta o'qituvchi`)}
        ${stat('violet', 'users', s.groups, 'Faol guruhlar', `bugun ${s.today} ta dars`)}
        ${stat('teal', 'book', s.courses, 'Kurslar', `${s.lessons} ta dars`)}
        ${stat('amber', 'inbox', s.pending, 'Tekshiruvda', `bu hafta: ${s.week} ta yangi`)}
        <a class="stat t-green" href="#/payments">${statInner('green', 'wallet', moneyVal(d.payments.received), `${MONTHS_FULL[+d.payments.month.slice(5) - 1].replace(/^./, (c) => c.toUpperCase())} tushumi`, d.payments.debt ? `qarzdorlik: ${money(d.payments.debt)}` : 'qarzdorlik yo\x27q')}</a>
      </div>
      <div class="grid two">
        <div class="card">${cardHead('chart', 'Faollik', `<span class="muted small">so'nggi 14 kun · ${total14} ta topshiriq</span>`)}${barChart(d.activity)}</div>
        <div class="card">${cardHead('trophy', "Eng faol o'quvchilar")}
          ${d.top.length ? `<div class="list">${d.top.map((t, i) => `<div class="li"><span class="rank r${i + 1}">${i + 1}</span>${avatar(t.name, t.id, 'sm')}
            <div class="grow"><div class="t">${esc(t.name)}</div><div class="s">${esc(t.group_name)} · ${t.accepted} ta vazifa</div></div><span class="points">${t.points}</span></div>`).join('')}</div>` : empty("Hali baholangan vazifa yo'q", 'trophy')}</div>
      </div>
      <div class="card section">${cardHead('users', 'Guruhlar holati', '<a class="more" href="#/groups">Barchasi</a>')}${groupsTable(d.groups)}</div>
      <div class="grid half section">
        <div class="card">${cardHead('upload', "So'nggi topshiriqlar")}
          ${d.recent.length ? `<div class="list">${d.recent.map((r) => subItem(r, `<div style="text-align:right">${badge(r.status)}<div class="small muted">${ago(r.submitted_at)}</div></div>`)).join('')}</div>` : empty("Hozircha topshiriq yo'q")}</div>
        ${news}
      </div>`);
    $('#qGroup').onclick = () => groupForm();
  } else if (u.role === 'teacher') {
    const s = d.stats;
    layout(`<div class="page-head"><div><h1>${greeting()}, ${first}!</h1><p>Bugungi ishlaringiz</p></div></div>
      <div class="stats">
        ${stat('violet', 'users', s.groups, 'Guruhlar')}
        ${stat('blue', 'layers', s.students, "O'quvchilar")}
        ${stat('amber', 'inbox', s.pending, 'Tekshirish kerak')}
        ${stat('green', 'upload', s.week, 'Bu hafta topshirildi')}
      </div>
      <div class="grid half">
        <div class="card">${cardHead('inbox', `Tekshirish kerak <span class="chip warn">${d.pending.length}</span>`)}
          ${d.pending.length ? `<div class="list">${d.pending.slice(0, 8).map((r) => subItem(r, `<span class="small muted nowrap">${ago(r.submitted_at)}</span>`)).join('')}</div>` : empty("Tekshiriladigan vazifa yo'q — zo'r!", 'checkCircle')}</div>
        <div class="card">${cardHead('calendar', 'Darslar', `<a class="more" href="#/schedule">To'liq jadval ${ic('right')}</a>`)}
          ${d.today.length ? `<div class="fs-title">Bugun</div><div class="list">${d.today.map((r) => lessonItem(r)).join('')}</div>` : ''}
          ${d.upcoming.length ? `<div class="fs-title">Keyingi darslar</div><div class="list">${d.upcoming.slice(0, 5).map((r) => lessonItem(r)).join('')}</div>` : (d.today.length ? '' : empty("Rejada dars yo'q", 'calendar'))}</div>
      </div>
      <div class="card section">${cardHead('users', 'Guruhlarim', '<a class="more" href="#/groups">Barchasi</a>')}${groupsTable(d.groups)}</div>
      <div class="grid half section">
        <div class="card">${cardHead('chart', 'Faollik', "<span class=\"muted small\">so'nggi 14 kun</span>")}${barChart(d.activity)}</div>
        ${news}
      </div>`);
  } else {
    const s = d.stats;
    state.coins = s.coins;
    const L = d.game.level, SK = d.game.streak;
    const R = 35, C = 2 * Math.PI * R;
    const hasGroup = d.courses.length > 0;
    const myRank = hasGroup ? Math.min(...d.courses.map((c) => c.rank || 999)) : null;
    const nextLesson = d.courses.filter((c) => c.next).map((c) => ({ ...c.next, group: c.name, gid: c.id })).sort((a, b) => a.date.localeCompare(b.date))[0];
    const sec = (title, link, linkText = 'Barchasi') => `<div class="sec-head"><h2>${title}</h2>${link ? `<a href="${link}">${linkText}${ic('right')}</a>` : ''}</div>`;
    const QA = [['#/groups', 'layers', 'Kurslarim', 'qa-blue'], ['#/schedule', 'calendar', 'Jadval', 'qa-teal'], ['#/achievements', 'award', 'Yutuqlar', 'qa-amber'], ['#/market', 'gift', 'Market', 'qa-violet']];
    const nd = nextLesson ? new Date(nextLesson.date + 'T00:00:00') : null;
    layout(`
      <div class="hero-slider"><div class="hs-track" id="heroTrack">
      <section class="hero2 hs-slide ${lvlClass(L.level)} ${lvlStyle(L.level) ? 'has-img' : ''}" ${lvlStyle(L.level)}>
        <div class="hero2-top">
          <a href="#/achievements" class="av-ring" title="${L.xp} / ${L.next} XP">
            <svg viewBox="0 0 80 80"><circle class="bg" cx="40" cy="40" r="${R}"/><circle class="fg" cx="40" cy="40" r="${R}" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - L.pct / 100)}"/></svg>
            ${avatar(u.name, u.id, 'md', u.role, u.avatar)}<span class="av-lvl">${L.level}</span></a>
          <div class="grow"><span class="h2-greet">${greeting()}</span><h1>${first}</h1>
            <span class="h2-lvl">${esc(L.name)} <i></i> ${L.xp}/${L.next} XP</span></div>
        </div>
        <div class="hero2-stats">
          <a href="#/coins">${coinHtml(s.coins)}<small>Coin</small></a>
          <a href="#/achievements" class="${SK.today ? 'fire' : ''}"><b>${ic('flame')}${SK.current}</b><small>Seriya</small></a>
          <a href="#/achievements"><b>${ic('award')}${d.game.earned_count}</b><small>Nishon</small></a>
          <a href="#/rating"><b>${ic('trophy')}${myRank && myRank < 999 ? myRank : '—'}</b><small>Reyting</small></a>
        </div>
      </section>
      <section class="hero2 hs-slide cal-slide ${lvlClass(L.level)} ${lvlStyle(L.level) ? 'has-img' : ''}" ${lvlStyle(L.level)} id="calSlide"></section>
      </div><div class="hs-dots"><button type="button" class="on" aria-label="Profil"></button><button type="button" aria-label="Kalendar"></button></div></div>
      <nav class="qa-grid">${QA.map(([h, icon, t, cls]) => {
        const lb = h === '#/achievements' && d.game.last;
        const img = lb && state.assets && state.assets.badges[lb.key];
        return `<a href="${h}" class="qa ${cls} ${img ? 'qa-medal' : ''}" ${lb ? `title="Oxirgi yutuq: ${esc(lb.title)}"` : ''}><span>${img ? `<img src="${esc(img)}" alt="">` : ic(lb ? lb.icon : icon)}</span><em>${lb ? esc(lb.title) : t}</em></a>`;
      }).join('')}</nav>
      ${installCard()}
      ${!hasGroup ? `<div class="onb card">
          <div class="onb-ico">${ic('users')}</div>
          <h3>Guruhga hali qo'shilmagansiz</h3>
          <p>O'qituvchingiz yoki administrator sizni guruhga qo'shgach, darslar, vazifalar va testlar shu yerda paydo bo'ladi.</p>
          <div class="onb-list">
            <a href="#/profile" class="li">${ic('camera')}<div class="grow"><div class="t">Profil rasmini qo'ying</div><div class="s">O'qituvchi va guruhdoshlaringiz sizni tanisin</div></div>${ic('right')}</a>
            <a href="#/achievements" class="li">${ic('award')}<div class="grow"><div class="t">Yutuqlar bilan tanishing</div><div class="s">${d.game.badges.length} ta nishon, har biri +${d.game.bonus} coin</div></div>${ic('right')}</a>
            <a href="#/market" class="li">${ic('gift')}<div class="grow"><div class="t">Marketni ko'ring</div><div class="s">Coinlarni sovg'alarga almashtiring</div></div>${ic('right')}</a>
          </div></div>` : `
        ${nextLesson ? `<a class="next-card" href="#/groups/${nextLesson.gid}/lessons/${nextLesson.id}">
            <div class="nc-date"><span>${WD_SHORT[nd.getDay()]}</span><b>${nd.getDate()}</b><span>${MONTHS[nd.getMonth()]}</span></div>
            <div class="grow"><small>Keyingi dars ${nextLesson.date === todayStr() ? '· bugun' : ''}</small><div class="t">${esc(nextLesson.title)}</div><div class="s">${esc(nextLesson.group)}</div></div>${ic('right')}</a>` : ''}
        <div class="mini-stats">
          <div class="ms"><span class="ms-ico t-green">${ic('checkCircle')}</span><b>${s.accepted}</b><span>Qabul qilingan</span></div>
          <div class="ms ${s.overdue ? 'bad' : ''}"><span class="ms-ico t-rose">${ic('clock')}</span><b>${s.overdue}</b><span>Kechikkan</span></div>
          <div class="ms"><span class="ms-ico t-violet">${ic('star')}</span><b>${s.avg_score ?? '—'}</b><span>O'rtacha ball</span></div>
        </div>
        ${d.tests.length ? sec(`Testlar <span class="cnt">${d.tests.length}</span>`) + `<div class="list section-list">${d.tests.map((t) => `<a class="li" href="#/tests/${t.id}"><div class="ni-ico t-violet">${ic('quiz')}</div><div class="grow"><div class="t">${esc(t.title)}</div>
            <div class="s">${t.count} savol · ${t.duration_min} daqiqa</div></div><span class="btn sm primary">${ic('play')}Boshlash</span></a>`).join('')}</div>` : ''}
        ${sec(`Vazifalar ${d.todo.length ? `<span class="cnt">${d.todo.length}</span>` : ''}`, d.todo.length ? '#/groups' : '')}
        ${d.todo.length ? `<div class="list section-list">${d.todo.map((r) => `<a class="li" href="#/groups/${r.group_id}/lessons/${r.lesson_id}"><div class="ni-ico ${r.deadline && r.deadline < todayStr() ? 't-rose' : 't-blue'}">${ic('clipboard')}</div><div class="grow"><div class="t">${esc(r.lesson)}</div>
            <div class="s">${r.status === 'qaytarilgan' ? 'qayta ishlash kerak · ' : ''}muddat ${fmtDate(r.deadline)}</div></div>${deadlineChip(r.deadline)}</a>`).join('')}</div>`
          : `<div class="all-done">${ic('checkCircle')}<div><b>Hammasi topshirilgan</b><span>Yangi vazifa berilganda bildirishnoma keladi</span></div></div>`}
        ${sec('Kurslarim', '#/groups')}
        <div class="grid cols-3 section-list">${d.courses.map((c) => {
          const [cls, icon] = courseStyle(c.slug);
          return `<a class="gcard ${cls}" href="#/groups/${c.id}"><div class="top"><div class="cico">${ic(icon)}</div><div class="grow"><h3>${esc(c.course_title)}</h3><div class="meta">${esc(c.name)}</div></div>${ring(pct(c.accepted, c.total), 56)}</div>
            <div class="row small"><span class="chip">${ic('book')} ${c.given}/${c.total} dars</span><span class="chip">${ic('star')} ${c.points} ball</span></div></a>`;
        }).join('')}</div>
        ${d.graded.length ? sec("So'nggi baholar") + `<div class="list section-list">${d.graded.map((r) => `<a class="li" href="#/groups/${r.group_id}/lessons/${r.lesson_id}"><div class="grow"><div class="t">${esc(r.lesson)}</div><div class="s">${ago(r.graded_at)}</div></div>
            ${r.score !== null ? `<span class="score-pill">${r.score}</span>` : ''}${badge(r.status)}</a>`).join('')}</div>` : ''}`}
      ${d.announcements.length ? sec("E'lonlar", '#/news') + `<div class="section-list">${newsHtml(d.announcements.slice(0, 2))}</div>` : ''}`);
  }
  bindInstall();
  if (state.user.role === 'student') { bindCal(); initHeroSlider(); celebrateLevel(d.game.level); }
  const an = $('#addNews'); if (an) an.onclick = () => newsForm(null, viewDashboard);
  bindNewsDelete(viewDashboard);
}

// ------------------------------------------------------------------ e'lonlar sahifasi
async function viewNews() {
  const { announcements } = await api('GET', '/api/announcements');
  layout(`<div class="page-head"><div><h1>E'lonlar</h1><p>Guruh va markaz yangiliklari</p></div>
    ${state.user.role !== 'student' ? `<button class="btn primary" id="addNews">${ic('plus')}Yangi e'lon</button>` : ''}</div>
    <div class="card">${newsHtml(announcements)}</div>`);
  const b = $('#addNews'); if (b) b.onclick = () => newsForm(null, viewNews);
  bindNewsDelete(viewNews);
}

// ------------------------------------------------------------------ guruhlar ro'yxati
async function viewGroups() {
  const u = state.user;
  const [{ groups }, arch] = await Promise.all([api('GET', '/api/groups'), u.role === 'admin' ? api('GET', '/api/groups-archive') : Promise.resolve({ groups: [] })]);
  const title = u.role === 'student' ? 'Mening kurslarim' : u.role === 'teacher' ? 'Mening guruhlarim' : 'Guruhlar';
  layout(`<div class="page-head"><div><h1>${title}</h1><p>${groups.length} ta guruh</p></div>
    ${u.role !== 'student' ? `<button class="btn primary" id="newGroup">${ic('plus')}Yangi guruh</button>` : ''}</div>
    ${u.role === 'admin' ? `<div class="tabs"><a href="#/groups" class="active">${ic('users')}Faol guruhlar (${groups.length})</a><a href="#/groups/archive">${ic('trash')}Arxiv (${arch.groups.length})</a></div>` : ''}
    ${groups.length ? `<div class="grid cols-3">${groups.map((g) => {
      const [cls, icon] = courseStyle(g.slug);
      return `<a class="gcard ${cls}" href="#/groups/${g.id}">
        <div class="top"><div class="cico">${ic(icon)}</div><div><h3>${esc(g.name)}</h3><div class="meta">${esc(g.course_title)}</div></div></div>
        <div class="meta">${ic('calendar')}${daysText(g.days)} ${esc(g.time || '')} · ${fmtDate(g.start_date)} dan</div>
        <div class="meta">${ic('user')}${esc(g.teacher_name || "o'qituvchi biriktirilmagan")}</div>
        ${u.role === 'admin' && g.created_by_name ? `<div class="meta">${ic('plus')}Yaratgan: ${esc(g.created_by_name)} · ${fmtDate(g.created_at)}</div>` : ''}
        <div class="foot"><span class="chip">${ic('users')} ${g.student_count} o'quvchi</span>${g.active ? '<span class="chip ok">faol</span>' : '<span class="chip">yopilgan</span>'}</div>
      </a>`;
    }).join('')}</div>` : empty(u.role !== 'student' ? "Hali guruh yo'q. «Yangi guruh» tugmasini bosing." : 'Siz hali hech qaysi guruhga biriktirilmagansiz.', 'users')}`);
  if (u.role !== 'student') $('#newGroup').onclick = () => groupForm();
}

async function groupForm(g) {
  const isAdmin = state.user.role === 'admin';
  const [{ courses }, { users: teachers }] = await Promise.all([api('GET', '/api/courses?all=1'), isAdmin ? api('GET', '/api/users?role=teacher') : Promise.resolve({ users: [] })]);
  const days = (g ? g.days : '1,3,5').split(',');
  const body = `
    <div class="fs-title">Asosiy ma'lumot</div>
    <label class="f"><span>Guruh nomi</span><input name="name" required value="${esc(g?.name || '')}" placeholder="Masalan: IT-01"></label>
    <div class="${isAdmin ? 'form-grid' : ''}">
      <label class="f"><span>Kurs</span><select name="course_id" required>${courses.map((c) => `<option value="${c.id}" data-n="${c.lesson_count}" ${g?.course_id === c.id ? 'selected' : ''}>${esc(c.title)}</option>`).join('')}</select></label>
      ${isAdmin ? `<label class="f"><span>O'qituvchi</span><select name="teacher_id"><option value="">Tanlanmagan</option>${teachers.filter((t) => t.active).map((t) => `<option value="${t.id}" ${g?.teacher_id === t.id ? 'selected' : ''}>${esc(t.name)}</option>`).join('')}</select></label>` : ''}
    </div>
    <div class="fs-title">Dars jadvali</div>
    <div class="form-grid">
      <label class="f"><span>Boshlanish sanasi</span><input type="date" name="start_date" required value="${esc(g?.start_date || todayStr())}"></label>
      <label class="f"><span>Dars vaqti</span><input type="time" name="time" value="${esc(g?.time || '14:00')}"></label>
    </div>
    <div class="f"><span class="f-label">Dars kunlari</span><div class="days pills">${[1, 2, 3, 4, 5, 6, 7].map((d) => `<label><input type="checkbox" name="d${d}" ${days.includes(String(d)) ? 'checked' : ''}>${DAY_NAMES[d]}</label>`).join('')}</div></div>
    <div class="info-line" id="schedInfo"></div>
    ${isAdmin ? `<div class="fs-title">To'lov</div>
    <label class="f"><span>Vazifani necha marta topshirish mumkin</span><select name="max_attempts">${[[0, 'Cheklanmagan'], [1, '1 marta'], [2, '2 marta'], [3, '3 marta'], [5, '5 marta']].map(([v, t]) => `<option value="${v}" ${(g?.max_attempts ?? 0) === v ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    <p class="hint">Barcha darslarga amal qiladi. Har bir dars uchun alohida ham o'zgartirish mumkin. Urinishlar tugagach, vazifani faqat o'qituvchi qayta ochadi.</p>
    <label class="f"><span>Oylik to'lov</span><div class="suffix"><input type="number" name="price" min="0" step="10000" value="${g?.price ?? 0}"><em>so'm</em></div></label>
    <p class="hint">0 kiritilsa — guruh bepul, qarzdorlik hisoblanmaydi.</p>` : ''}
    ${g ? `<label class="switch-row"><input type="checkbox" class="switch" name="active" ${g.active ? 'checked' : ''}><span><b>Guruh faol</b><small>Yopilgan guruh ro'yxatlarda pastda turadi</small></span></label>` : ''}`;
  modal(g ? 'Guruhni tahrirlash' : 'Yangi guruh', body, async (form, close) => {
    const f = formData(form);
    const payload = {
      name: f.name, course_id: Number(f.course_id), teacher_id: f.teacher_id ? Number(f.teacher_id) : null,
      start_date: f.start_date, time: f.time, days: [1, 2, 3, 4, 5, 6, 7].filter((d) => f['d' + d]), price: Number(f.price) || 0, max_attempts: Number(f.max_attempts) || 0,
    };
    if (g) payload.active = !!f.active;
    const r = g ? await api('PATCH', `/api/groups/${g.id}`, payload) : await api('POST', '/api/groups', payload);
    close(); toast('Saqlandi'); go(`#/groups/${r.group.id}`);
  }, g ? 'Saqlash' : 'Guruh yaratish', g ? "Sana yoki dars kunlari o'zgarsa, jadval qayta hisoblanadi" : "Dars jadvali sana va kunlar bo'yicha avtomatik tuziladi");
  // jadval bo'yicha jonli hisob: haftada necha dars, qachon tugaydi
  const info = $('#schedInfo');
  const calc = () => {
    const f = formData(info.closest('form'));
    const ds = [1, 2, 3, 4, 5, 6, 7].filter((d) => f['d' + d]);
    const n = Number($('select[name=course_id]').selectedOptions[0]?.dataset.n || 0);
    if (!ds.length || !f.start_date) { info.innerHTML = `${ic('alert')}Kamida bitta dars kunini tanlang`; info.classList.add('warn'); return; }
    info.classList.remove('warn');
    const d = new Date(f.start_date + 'T00:00:00'); let k = 0;
    for (let i = 0; i < 2000 && k < n; i++) { const wd = d.getDay() || 7; if (ds.includes(wd)) k++; if (k < n) d.setDate(d.getDate() + 1); }
    info.innerHTML = `${ic('calendar')}Haftada ${ds.length} ta dars · ${n} ta dars · taxminan <b>${d.getDate()}-${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}</b> da tugaydi`;
  };
  $$('input, select', info.closest('form')).forEach((el) => el.addEventListener('change', calc));
  calc();
}

async function studentsForm(group, current) {
  const { users } = await api('GET', '/api/users?role=student');
  const ids = new Set(current.map((s) => s.id));
  modal(`O'quvchilar: ${group.name}`, `
    <div class="search" style="margin-bottom:10px">${ic('search')}<input id="stFilter" placeholder="Ism yoki login bo'yicha qidirish..."></div>
    <div class="check-list">${users.filter((u) => u.active).map((u) => `<label data-name="${esc(u.name.toLowerCase())} ${esc(u.login)}"><input type="checkbox" name="s${u.id}" ${ids.has(u.id) ? 'checked' : ''}> ${avatar(u.name, u.id, 'sm', 'student', u.avatar)} ${esc(u.name)} <span class="muted small">${esc(u.login)}</span></label>`).join('') || empty("O'quvchilar yo'q — avval «Foydalanuvchilar» bo'limida qo'shing")}</div>
    <p class="hint" style="margin-top:10px">Yangi o'quvchilarni tez qo'shish: «Foydalanuvchilar» → «Ro'yxatdan qo'shish».</p>`,
  async (form, close) => {
    const student_ids = Object.keys(formData(form)).filter((k) => /^s\d+$/.test(k)).map((k) => Number(k.slice(1)));
    await api('PUT', `/api/groups/${group.id}/students`, { student_ids });
    close(); toast("O'quvchilar ro'yxati saqlandi"); route();
  });
  $('#stFilter').oninput = (e) => { const q = e.target.value.toLowerCase(); $$('.check-list label').forEach((l) => { l.style.display = l.dataset.name.includes(q) ? '' : 'none'; }); };
}

// ------------------------------------------------------------------ guruh sahifasi
function rankingHtml(list) {
  if (!list.length) return empty("Guruhda o'quvchi yo'q", 'users');
  const max = Math.max(1, ...list.map((r) => r.points));
  return `<div class="list">${list.map((r) => `<div class="li" ${r.id === state.user.id ? 'style="border-color:rgba(255,209,102,.5);background:rgba(255,209,102,.07)"' : ''}>
    <span class="rank ${r.rank <= 3 && r.points ? 'r' + r.rank : ''}">${r.rank}</span>${avatar(r.name, r.id, 'sm', 'student', r.avatar)}
    <div class="grow"><div class="t">${esc(r.name)}${r.id === state.user.id ? ' <span class="chip warn">siz</span>' : ''}</div>
      <div class="bar" style="margin-top:6px;max-width:320px"><i style="width:${pct(r.points, max)}%"></i></div></div>
    <div style="text-align:right"><div class="points">${r.points} ball</div><div class="small muted">${r.accepted} ta qabul · o'rt. ${r.avg_score ?? '—'}</div></div></div>`).join('')}</div>`;
}

async function viewGroup(gid, tab) {
  const u = state.user;
  const [d, rk] = await Promise.all([api('GET', `/api/groups/${gid}`), api('GET', `/api/groups/${gid}/ranking`)]);
  const g = d.group;
  const base = `#/groups/${gid}`;
  const crumbs = `<div class="crumbs"><a href="#/groups">${u.role === 'student' ? 'Kurslarim' : 'Guruhlar'}</a>${ic('right')}<span>${esc(g.name)}</span></div>`;
  const actions = `<div class="row">${g.plan_url ? `<a class="btn" href="${esc(g.plan_url)}" target="_blank" rel="noopener">${ic('clipboard')}O'quv reja</a>` : ''}
    ${u.role !== 'student' ? `<a class="btn" href="/api/groups/${gid}/export.csv">${ic('download')}Excel (CSV)</a>` : ''}
    ${u.role !== 'student' && !g.deleted_at ? `<button class="btn" id="editGroup">${ic('edit')}Tahrirlash</button><button class="btn" id="editStudents">${ic('users')}O'quvchilar</button><button class="btn danger" id="delGroup" title="Guruhni o'chirish">${ic('trash')}</button>` : ''}
    ${g.deleted_at ? `<button class="btn success" id="restoreGroup">${ic('refresh')}Tiklash</button>` : ''}</div>`;
  const given = d.lessons.filter((l) => l.available).length;

  let hero, tabs;
  if (u.role === 'student') {
    const me = rk.ranking.find((r) => r.id === u.id) || {};
    const accepted = d.lessons.filter((l) => l.status === 'qabul').length;
    const [gcls, gicon] = courseStyle(g.slug);
    const gp = pct(accepted, d.lessons.length);
    const passPct = pct(given, d.lessons.length);
    hero = `<section class="gp-hero ${gcls}">
      <div class="gp-top"><span class="gp-ico">${ic(gicon)}</span>
        <div class="grow"><span class="gp-course">${esc(g.course_title)}</span><h1>${esc(g.name)}</h1></div></div>
      <div class="gp-meta"><span>${ic('calendar')}${daysText(g.days)}${g.time ? ' · ' + esc(g.time) : ''}</span><span>${ic('user')}${esc(g.teacher_name || '—')}</span></div>
      <div class="gp-panel">
        <div class="gp-prog-top"><span>${given} / ${d.lessons.length} dars o'tildi</span><b>${passPct}%</b></div>
        <div class="gp-bar"><i style="width:${Math.max(passPct, given ? 2 : 0)}%"></i></div>
        <div class="gp-mini">
          <a href="${base}">${ic('checkCircle')}<b>${accepted}</b><em>Qabul</em></a>
          <a href="${base}/rating">${ic('trophy')}<b>${me.rank || '—'}<small>/${rk.ranking.length}</small></b><em>O'rin</em></a>
          <a href="${base}/rating">${ic('star')}<b>${me.points || 0}</b><em>Ball</em></a>
        </div>
      </div>
      ${d.certificate ? `<a class="btn primary gp-cert" href="#/cert/${esc(d.certificate.code)}">${ic('award')}Sertifikatim</a>` : ''}
    </section>`;
    tabs = [['lessons', 'book', 'Darslar'], ['tests', 'quiz', 'Testlar'], ['rating', 'trophy', 'Reyting'], ['news', 'megaphone', "E'lonlar"]];
  } else {
    const pending = d.lessons.reduce((a, l) => a + (l.pending || 0), 0);
    const scores = d.students.map((s) => s.avg_score).filter((x) => x !== null);
    hero = `<div class="card hero">${ring(pct(given, d.lessons.length), 84)}
      <div class="grow"><h2 style="font-size:1.2rem">${esc(g.course_title)}</h2><div class="muted small">${daysText(g.days)} ${esc(g.time || '')} · ${fmtDate(g.start_date)} dan · o'qituvchi: ${esc(g.teacher_name || '—')}</div></div>
      <div class="hero-stats"><div><b>${d.students.length}</b><span>o'quvchi</span></div><div><b>${given}/${d.lessons.length}</b><span>o'tilgan dars</span></div>
        <div><b>${pending}</b><span>tekshirish kerak</span></div><div><b>${scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : '—'}</b><span>o'rtacha ball</span></div></div></div>`;
    tabs = [['lessons', 'calendar', 'Dars jadvali'], ['students', 'users', `O'quvchilar (${d.students.length})`], ['grades', 'grid', 'Baholar jurnali'], ['tests', 'quiz', 'Testlar'], ['rating', 'trophy', 'Reyting'], ['news', 'megaphone', "E'lonlar"]];
  }
  const active = tab || 'lessons';
  const tabsHtml = `<div class="tabs ${u.role === 'student' ? 'gp-tabs' : ''}" style="margin-top:18px">${tabs.map(([k, icon, t]) => `<a href="${base}${k === 'lessons' ? '' : '/' + k}" class="${k === active ? 'active' : ''}">${ic(icon)}${t}</a>`).join('')}</div>`;
  const archived = g.deleted_at ? `<div class="info-line warn" style="margin:0 0 16px">${ic('alert')}Bu guruh <b>${fmtDate(g.deleted_at, true)}</b> da o'chirilgan va arxivda turibdi. O'quvchilar uni ko'rmaydi.</div>` : '';
  const head = u.role === 'student' ? crumbs + hero + tabsHtml : crumbs + `<div class="page-head"><div><h1>${esc(g.name)}</h1></div>${actions}</div>` + archived + hero + tabsHtml;

  let body = '';
  if (active === 'tests') {
    const { tests } = await api('GET', `/api/groups/${gid}/tests`);
    const teacher = u.role !== 'student';
    body = `<div class="card">${cardHead('quiz', 'Testlar va imtihonlar', teacher ? `<button class="btn sm primary" id="newTest">${ic('plus')}Yangi test</button>` : '')}
      ${tests.length ? `<div class="list">${tests.map((t) => {
        let right;
        if (teacher) right = `${t.published ? '<span class="chip ok">e\'lon qilingan</span>' : '<span class="chip">qoralama</span>'}<span class="chip">${t.done}/${d.students.length} topshirdi</span>${t.avg_score !== null ? `<span class="points">${t.avg_score}%</span>` : ''}`;
        else if (t.finished_at) right = `<span class="points">${t.score}%</span><span class="chip ok">topshirilgan</span>`;
        else if (t.started_at) right = '<span class="chip warn">davom etmoqda</span>';
        else right = `<span class="btn sm primary">${ic('play')}Boshlash</span>`;
        return `<a class="li" href="#/tests/${t.id}"><div class="ni-ico t-violet">${ic('quiz')}</div><div class="grow"><div class="t">${esc(t.title)}</div>
          <div class="s">${t.count} savol · ${t.duration_min} daqiqa · ${fmtDate(t.created_at)}</div></div><div class="row" style="flex-wrap:nowrap">${right}</div></a>`;
      }).join('')}</div>` : empty(teacher ? "Hali test yo'q. «Yangi test» tugmasi bilan yarating." : "Hozircha test yo'q", 'quiz')}</div>`;
  } else if (active === 'rating') {
    const lb = await api('GET', `/api/leaderboard?scope=group&group_id=${gid}`);
    body = groupRatingHtml(lb, u);
  } else if (active === 'news') {
    const { announcements } = await api('GET', `/api/announcements?group_id=${gid}`);
    body = `<div class="card">${cardHead('megaphone', "Guruh e'lonlari", u.role !== 'student' ? `<button class="btn sm primary" id="addNews">${ic('plus')}E'lon</button>` : '')}${newsHtml(announcements)}</div>`;
  } else if (active === 'grades' && u.role !== 'student') {
    const gb = await api('GET', `/api/groups/${gid}/gradebook`);
    const rmap = Object.fromEntries(rk.ranking.map((r) => [r.id, r]));
    const SYM = { qabul: '✓', tekshirilmoqda: '•', qaytarilgan: '↺', bajarilmagan: '✕', kutilmoqda: '' };
    body = gb.lessons.length && gb.students.length ? `<div class="card"><div class="table-wrap"><table class="gb">
      <tr><th>O'quvchi</th>${gb.lessons.map((l) => `<th title="${esc(l.title)}">${l.module_position}.${l.num}</th>`).join('')}<th>Ball</th></tr>
      ${gb.students.map((s) => `<tr><td><div class="user-cell">${avatar(s.name, s.id, 'sm')}${esc(s.name)}</div></td>
        ${gb.lessons.map((l) => { const c = s.cells[l.id]; return `<td class="g-${c.status}"><a href="#/groups/${gid}/lessons/${l.id}" title="${esc(l.title)} — ${STATUS[c.status]}${c.present === 0 ? " · darsda yo'q" : ''}">${c.score ?? SYM[c.status]}</a></td>`; }).join('')}
        <td class="tot">${rmap[s.id]?.points ?? 0}</td></tr>`).join('')}
    </table></div>
    <div class="legend"><span><i style="background:rgba(46,204,64,.6)"></i>Qabul (ball)</span><span><i style="background:#3b82f6"></i>Tekshirilmoqda</span>
      <span><i style="background:#f59e0b"></i>Qaytarilgan</span><span><i style="background:rgba(255,59,31,.7)"></i>Bajarilmagan</span><span><i style="background:rgba(255,255,255,.15)"></i>Muddat davom etmoqda</span></div></div>`
      : empty("Jurnal bo'sh: hali ochilgan dars yoki o'quvchi yo'q", 'grid');
  } else if (active === 'students' && u.role !== 'student') {
    body = d.students.length ? `<div class="card table-wrap"><table><tr><th>O'quvchi</th><th>Telefon</th><th>Topshirgan</th><th>Qabul</th><th>O'rtacha ball</th><th>Davomat</th><th>Bajarilish</th><th></th></tr>
      ${d.students.map((s) => {
        const p = pct(s.accepted, s.given);
        return `<tr><td class="click" data-href="#/students/${s.id}" style="cursor:pointer"><div class="user-cell">${avatar(s.name, s.id, 'sm', 'student', s.avatar)}<div>${esc(s.name)}<div class="small muted mono">${esc(s.login)}</div></div></div></td>
          <td class="small">${esc(s.phone || '—')}</td><td>${s.submitted}/${s.given}</td><td>${s.accepted}</td>
          <td>${s.avg_score ?? '—'}</td><td>${s.att_total ? `${pct(s.att_present, s.att_total)}% <span class="small muted">(${s.att_present}/${s.att_total})</span>` : '—'}</td>
          <td style="min-width:150px"><div class="row" style="flex-wrap:nowrap"><div class="bar"><i style="width:${p}%"></i></div><span class="pct">${p}%</span></div></td>
          <td class="nowrap"><button class="btn sm" data-coin="${s.id}" title="Coin berish">${ic('coin')}Coin</button> ${s.certificate ? `<a class="btn sm" href="#/cert/${esc(s.certificate)}">${ic('award')}Ko'rish</a>` : `<button class="btn sm" data-cert="${s.id}" title="Kursni tugatganlik sertifikati">${ic('award')}Berish</button>`}</td></tr>`;
      }).join('')}</table></div>` : empty(`Guruhda o'quvchi yo'q${u.role === 'admin' ? " — «O'quvchilar» tugmasi orqali qo'shing" : ''}`, 'users');
  } else if (u.role === 'student') {
    let lastModule = null;
    let lm2 = null;
    const mobList = `<div class="mob-only">${d.lessons.map((l) => {
      const mod = l.module_title !== lm2 ? `<div class="fs-title" style="margin-top:14px">${esc(l.module_title)}</div>` : '';
      lm2 = l.module_title;
      return mod + `<a class="li m-lesson" href="${base}/lessons/${l.id}"><span class="num">${String(l.num).padStart(2, '0')}</span><div class="grow"><div class="t">${esc(l.title)}</div><div class="s">${fmtDate(l.date)}${l.comment_count ? ` · ${l.comment_count} izoh` : ''}${l.score !== null ? ` · <b class="points">${l.score} ball</b>` : ''}</div></div>${badge(l.status)}</a>`;
    }).join('')}</div>`;
    body = mobList + `<div class="card table-wrap desk-only"><table><tr><th>Mavzu</th><th>Izohlar</th><th>Holat</th><th>Ball</th><th>Topshirilgan</th><th>Dars sanasi</th></tr>
      ${d.lessons.map((l) => {
        const mod = l.module_title !== lastModule ? `<tr class="module-row"><td colspan="6">${esc(l.module_title)}</td></tr>` : '';
        lastModule = l.module_title;
        return mod + `<tr class="click" data-href="${base}/lessons/${l.id}">
          <td><span class="num">${String(l.num).padStart(2, '0')}</span>${esc(l.title)}${l.tag ? `<span class="tag">${esc(l.tag)}</span>` : ''}</td>
          <td><span class="pill ${l.comment_count ? '' : 'zero'}">${l.comment_count}</span></td><td>${badge(l.status)}</td>
          <td>${l.score !== null ? `<span class="points">${l.score}</span>` : '<span class="muted">—</span>'}</td>
          <td class="small">${l.submitted_at ? fmtDate(l.submitted_at, true) : '—'}</td><td class="small">${fmtDate(l.date)}</td></tr>`;
      }).join('')}</table></div>`;
  } else {
    let lastModule = null;
    const n = d.students.length;
    const allOpen = d.lessons.length && d.lessons.every((l) => l.available);
    const opened = d.lessons.filter((l) => l.available).length;
    body = `<div class="card toolbar"><div class="grow"><b>${opened} / ${d.lessons.length}</b> ta dars o'quvchilarga ochiq
        <div class="small muted">${allOpen ? "Butun dars rejasi ochiq — o'quvchilar barcha materiallarni ko'radi." : "Darslar jadvaldagi sanada avtomatik ochiladi. Xohlasangiz hammasini hoziroq oching."}</div></div>
      ${allOpen ? `<button class="btn" id="openAll" data-v="0">${ic('calendar')}Jadval bo'yicha ochish</button>` : `<button class="btn primary" id="openAll" data-v="1">${ic('unlock')}Barcha darslarni ochish</button>`}</div>
      <div class="card table-wrap"><table><tr><th>Dars</th><th>Sana</th><th>Muddat</th><th>Holat</th><th>Topshirgan</th><th>Tekshirish</th><th></th></tr>
      ${d.lessons.map((l) => {
        const mod = l.module_title !== lastModule ? `<tr class="module-row"><td colspan="7">${esc(l.module_title)}</td></tr>` : '';
        lastModule = l.module_title;
        return mod + `<tr>
          <td class="click" data-href="${base}/lessons/${l.id}" style="cursor:pointer"><span class="num">${String(l.num).padStart(2, '0')}</span>${esc(l.title)}${l.tag ? `<span class="tag">${esc(l.tag)}</span>` : ''}</td>
          <td><input type="date" value="${esc(l.date || '')}" data-l="${l.id}" data-f="date" style="min-width:140px"></td>
          <td><input type="date" value="${esc(l.deadline || '')}" data-l="${l.id}" data-f="deadline" style="min-width:140px"></td>
          <td>${l.available ? `<span class="badge st-open">Ochiq</span>` : `<button class="btn sm" data-open="${l.id}" title="Sanadan oldin ochish">${ic('lock')}Ochish</button>`}</td>
          <td style="min-width:110px"><div class="row" style="flex-wrap:nowrap"><div class="bar"><i style="width:${pct(l.submitted, n)}%"></i></div><span class="pct">${l.submitted}/${n}</span></div></td>
          <td>${l.pending ? `<span class="badge st-tekshirilmoqda">${l.pending}</span>` : '<span class="muted">—</span>'}</td>
          <td><a class="btn sm" href="${base}/lessons/${l.id}" title="Ko'rish">${ic('eye')}</a></td></tr>`;
      }).join('')}</table></div>`;
  }
  layout(head + body);

  $$('input[data-l]').forEach((inp) => {
    inp.onchange = async () => {
      try { await api('PATCH', `/api/groups/${gid}/lessons/${inp.dataset.l}`, { [inp.dataset.f]: inp.value }); toast('Jadval yangilandi'); }
      catch (e) { toast(e.message, true); }
    };
  });
  $$('[data-open]').forEach((b) => {
    b.onclick = async () => { await api('PATCH', `/api/groups/${gid}/lessons/${b.dataset.open}`, { opened: true }); toast("Dars o'quvchilar uchun ochildi"); route(); };
  });
  const an = $('#addNews'); if (an) an.onclick = () => newsForm(gid, route);
  const nt = $('#newTest'); if (nt) nt.onclick = () => testForm(gid);
  $$('[data-coin]').forEach((b) => { b.onclick = () => coinForm(d.students.find((x) => x.id === Number(b.dataset.coin))); });
  const oa = $('#openAll');
  if (oa) oa.onclick = async () => {
    const v = oa.dataset.v === '1';
    if (v && !confirm("Dars rejasidagi barcha darslar o'quvchilarga hoziroq ochiladi. Davom etasizmi?")) return;
    const r = await api('POST', `/api/groups/${gid}/lessons-open`, { opened: v });
    toast(v ? `Barcha darslar ochildi (${r.available} ta)` : "Darslar endi jadval bo'yicha ochiladi"); viewGroup(gid, 'lessons');
  };
  $$('[data-cert]').forEach((b) => {
    b.onclick = async () => {
      const s = d.students.find((x) => x.id === Number(b.dataset.cert));
      if (!confirm(`${s.name} ga «${g.course_title}» kursini tugatganlik sertifikati berilsinmi?`)) return;
      const r = await api('POST', `/api/groups/${gid}/certificates`, { student_id: s.id });
      toast('Sertifikat berildi'); go(`#/cert/${r.code}`);
    };
  });
  bindNewsDelete(route);
  if (u.role !== 'student' && !g.deleted_at) {
    $('#editGroup').onclick = () => groupForm(g);
    $('#editStudents').onclick = () => studentsForm(g, d.students);
    $('#delGroup').onclick = async () => {
      const msg = u.role === 'admin' ? `«${g.name}» guruhi arxivga o'tkaziladi (keyin tiklash mumkin). Davom etasizmi?` : `«${g.name}» guruhi o'chiriladi. Bu haqda administratorga xabar boradi. Davom etasizmi?`;
      if (!confirm(msg)) return;
      await api('DELETE', `/api/groups/${gid}`); toast("Guruh o'chirildi"); go('#/groups');
    };
  }
  const rg = $('#restoreGroup');
  if (rg) rg.onclick = async () => { await api('POST', `/api/groups/${gid}/restore`); toast('Guruh tiklandi'); viewGroup(gid, tab); };
}

// ------------------------------------------------------------------ dars sahifasi
function commentsHtml(list) {
  return `<div class="comments">${list.length ? list.map((c) => `<div class="comment ${c.author === state.user.name ? 'mine' : ''}">${avatar(c.author, 0, 'sm', c.author_role, c.author_avatar)}
    <div><div class="who">${esc(c.author)} · <span class="role-${c.author_role}">${ROLE[c.author_role]}</span> · ${ago(c.created_at)}</div><div class="bubble">${esc(c.text)}</div></div></div>`).join('') : "<div class=\"muted small\">Hozircha izoh yo'q. Savolingiz bo'lsa yozing.</div>"}</div>`;
}

// ------------------------------------------------------------------ fayllar (vazifa va javoblar)
const fmtSize = (n) => (n < 1024 ? `${n} B` : n < 1048576 ? `${Math.round(n / 1024)} KB` : `${(n / 1048576).toFixed(1)} MB`);
const fileExt = (name) => (String(name).split('.').pop() || '').toLowerCase();
const FILE_KIND = { pdf: 'pdf', doc: 'doc', docx: 'doc', rtf: 'doc', odt: 'doc', txt: 'doc', xls: 'xls', xlsx: 'xls', csv: 'xls', ods: 'xls', ppt: 'ppt', pptx: 'ppt', odp: 'ppt', png: 'img', jpg: 'img', jpeg: 'img', gif: 'img', webp: 'img', zip: 'zip', rar: 'zip', '7z': 'zip', mp4: 'vid', webm: 'vid', mp3: 'vid' };
const FILE_ICON = { pdf: 'file', doc: 'file', xls: 'grid', ppt: 'monitor', img: 'camera', zip: 'layers', vid: 'play', code: 'code' };
const fileRow = (f, canDel) => {
  const ext = fileExt(f.name), kind = FILE_KIND[ext] || 'code';
  const viewable = kind === 'img' || ext === 'pdf';
  const thumb = kind === 'img' && f.id ? `<span class="fx fx-thumb"><img src="/api/files/${f.id}?view=1" alt="" loading="lazy"></span>` : `<span class="fx fx-${kind}">${ic(FILE_ICON[kind] || 'file')}<i>${esc(ext.slice(0, 4).toUpperCase())}</i></span>`;
  return `<div class="file-row" data-file="${f.id}">${thumb}
    <div class="grow"><a href="/api/files/${f.id}" class="fname" download title="${esc(f.name)}">${esc(f.name)}</a><div class="s">${esc(ext.toUpperCase())} · ${fmtSize(f.size)}</div></div>
    ${viewable ? `<a class="icon-btn sm" href="/api/files/${f.id}?view=1" target="_blank" rel="noopener" title="Ko'rish">${ic('eye')}</a>` : ''}
    <a class="icon-btn sm" href="/api/files/${f.id}" download title="Yuklab olish">${ic('download')}</a>
    ${canDel ? `<button type="button" class="icon-btn sm danger-h" data-delfile="${f.id}" title="O'chirish">${ic('trash')}</button>` : ''}</div>`;
};
const filesHtml = (files, canDel, id = '') => `<div class="files" ${id ? `id="${id}"` : ''}>${(files || []).map((f) => fileRow(f, canDel)).join('')}</div>`;
const dropzone = (id, label) => `<label class="dropzone" id="${id}"><input type="file" multiple hidden>
  ${ic('upload')}<b>${label}</b><span>yoki faylni shu yerga tashlang · PDF, Word, Excel, rasm, arxiv · 25 MB gacha</span></label>`;

function uploadFile(gid, lid, file, onProgress, endpoint, videoKind) {
  return new Promise((resolve, reject) => {
    const x = new XMLHttpRequest();
    x.open('POST', endpoint || `/api/groups/${gid}/lessons/${lid}/files`);
    x.setRequestHeader('Content-Type', 'application/octet-stream');
    x.setRequestHeader('X-File-Name', encodeURIComponent(file.name));
    x.setRequestHeader('X-File-Type', file.type || 'application/octet-stream');
    if (videoKind) x.setRequestHeader('X-Video-Kind', videoKind);
    x.upload.onprogress = (e) => { if (e.lengthComputable) onProgress(e.loaded / e.total); };
    x.onload = () => {
      let d = {}; try { d = JSON.parse(x.responseText); } catch { /* bo'sh */ }
      if (x.status >= 200 && x.status < 300) resolve(d.file); else reject(new Error(d.error || (x.status === 413 ? (endpoint ? 'Video juda katta (2 GB gacha)' : 'Fayl juda katta (25 MB gacha)') : `Xatolik (${x.status})`)));
    };
    x.onerror = () => reject(new Error('Tarmoq xatosi'));
    x.send(file);
  });
}
function bindDropzone(zoneId, listId, gid, lid) {
  const zone = $(`#${zoneId}`); if (!zone) return;
  const list = $(`#${listId}`);
  const handle = async (files) => {
    for (const file of files) {
      if (file.size > 25 * 1024 * 1024) { toast(`${file.name}: 25 MB dan katta`, true); continue; }
      const row = document.createElement('div');
      row.className = 'file-row uploading';
      row.innerHTML = `<span class="fx fx-code">${esc(fileExt(file.name).slice(0, 4).toUpperCase())}</span><div class="grow"><div class="fname">${esc(file.name)}</div><div class="bar" style="margin-top:6px"><i style="width:0%"></i></div></div>`;
      list.appendChild(row);
      try {
        const f = await uploadFile(gid, lid, file, (p) => { $('.bar i', row).style.width = `${Math.round(p * 100)}%`; });
        row.outerHTML = fileRow(f, true);
        bindFileDelete();
      } catch (e) { row.remove(); toast(`${file.name}: ${e.message}`, true); }
    }
  };
  $('input', zone).onchange = (e) => { handle([...e.target.files]); e.target.value = ''; };
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('over'); handle([...e.dataTransfer.files]); });
}
function bindFileDelete() {
  $$('[data-delfile]').forEach((b) => {
    b.onclick = async () => {
      if (!confirm("Fayl o'chirilsinmi?")) return;
      try { await api('DELETE', `/api/files/${b.dataset.delfile}`); b.closest('.file-row').remove(); toast("Fayl o'chirildi"); } catch (e) { toast(e.message, true); }
    };
  });
}

// ------------------------------------------------------------------ dars videolari
function embedUrl(url) {
  const u = String(url || '');
  let m = u.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{11})/i);
  if (m) return `https://www.youtube-nocookie.com/embed/${m[1]}?rel=0`;
  m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  return null;
}
function taskVideosHtml(list, canEdit) {
  return (list || []).length ? `<div class="vid-list task-vids">${videoPlayers({ lesson: {}, videos: list, canEdit })}</div>` : '';
}
function videoPlayers(d) {
  const parts = [];
  const emb = d.lesson.video_url ? embedUrl(d.lesson.video_url) : null;
  if (emb) parts.push(`<div class="vid-box"><iframe src="${esc(emb)}" title="Dars videosi" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen loading="lazy"></iframe></div>`);
  else if (d.lesson.video_url) parts.push(`<a class="li" href="${esc(d.lesson.video_url)}" target="_blank" rel="noopener">${ic('play')}<div class="grow"><div class="t">Videoni ochish</div><div class="s">${esc(d.lesson.video_url)}</div></div>${ic('external')}</a>`);
  for (const v of d.videos || []) {
    const title = v.title || v.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ');
    parts.push(`<article class="vcard" data-vid="${v.id}">
      <div class="vplayer">
        <video preload="metadata" playsinline controlslist="nodownload" src="/api/videos/${v.id}"></video>
        <button type="button" class="vcover ${v.has_poster ? 'has-poster' : ''}" data-play="${v.id}" aria-label="Videoni boshlash" ${v.has_poster ? `style="background-image:url('/api/videos/${v.id}/poster')"` : ''}>
          <span class="vplay">${ic('play')}</span><span class="vdur" data-dur></span></button>
      </div>
      <div class="vbody">
        <div class="vhead"><h4>${esc(title)}</h4>
          ${d.canEdit ? `<div class="vtools"><button type="button" class="icon-btn sm" data-editvid="${v.id}" title="Izoh va banner">${ic('edit')}</button><button type="button" class="icon-btn sm danger-h" data-delvid="${v.id}" title="O'chirish">${ic('trash')}</button></div>` : ''}</div>
        <div class="vmeta">${ic('play')}Dars videosi${d.canEdit ? ` · ${fmtSize(v.size)}` : ''}</div>
        ${v.description ? `<p class="vdesc">${esc(v.description)}</p>` : (d.canEdit ? `<button type="button" class="vid-add" data-editvid="${v.id}">${ic('plus')}Izoh va banner qo'shish</button>` : '')}
      </div></article>`);
  }
  return parts.join('');
}
function videoCard(d, gid, lid, canEdit) {
  const has = (d.videos && d.videos.length) || d.lesson.video_url;
  if (!canEdit && !has) return '';
  d.canEdit = canEdit;
  window.__lessonVideos = d.videos || [];
  return `<div class="card section vid-card" id="vidCard">${cardHead('play', 'Dars videosi', canEdit ? `<button class="btn sm" id="vidLink">${ic('link')}${d.lesson.video_url ? 'Havolani tahrirlash' : 'YouTube havola'}</button>` : '')}
    <div class="vid-list">${videoPlayers(d)}</div>
    ${canEdit ? `<div id="vidUploads"></div><label class="dropzone" id="vidZone"><input type="file" accept="video/*" hidden>${ic('upload')}<b>Video yuklash</b><span>MP4, WEBM, MOV · 2 GB gacha · o'quvchilar dars ochilganda ko'radi</span></label>` : ''}
    ${canEdit && !has ? '' : ''}</div>`;
}
// banner: 16:9 ga qirqib, 1280x720 JPEG ga siqamiz
function wideJpeg(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const W = 1280, H = 720, c = document.createElement('canvas'); c.width = W; c.height = H;
      const r = Math.max(W / img.width, H / img.height), w = img.width * r, h = img.height * r;
      c.getContext('2d').drawImage(img, (W - w) / 2, (H - h) / 2, w, h);
      URL.revokeObjectURL(img.src); resolve(c.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => reject(new Error("Rasmni o'qib bo'lmadi"));
    img.src = URL.createObjectURL(file);
  });
}
function videoEditForm(vid, reload) {
  const v = (window.__lessonVideos || []).find((x) => x.id === vid) || {};
  let poster;
  modal('Video: izoh va banner', `
    <div class="item-img-pick" id="posterPick" style="aspect-ratio:16/9">${v.has_poster ? `<img src="/api/videos/${vid}/poster?t=${Date.now()}" alt="">` : ic('play')}<span>${ic('camera')}${v.has_poster ? 'Bannerni almashtirish' : 'Banner yuklash'}</span></div>
    ${v.has_poster ? '<label class="switch-row" style="margin:-4px 0 14px"><input type="checkbox" class="switch" name="rmposter"><span><b>Bannerni olib tashlash</b><small>Video o\x27zining birinchi kadrini ko\x27rsatadi</small></span></label>' : ''}
    <label class="f"><span>Sarlavha</span><input name="title" maxlength="200" value="${esc(v.title || '')}" placeholder="${esc((v.name || '').replace(/\.[^.]+$/, ''))}"></label>
    <label class="f"><span>Izoh</span><textarea name="description" style="min-height:120px" placeholder="Videoda nimalar o'rgatiladi, qaysi daqiqada nima bor...">${esc(v.description || '')}</textarea></label>
    <p class="hint">Banner 16:9 o'lchamga avtomatik qirqiladi (1280×720). O'quvchilar videoni bosmaguncha shu rasm ko'rinadi.</p>`,
  async (form, close) => {
    const f = formData(form);
    const p = { title: f.title, description: f.description };
    if (poster) p.poster = poster; else if (f.rmposter) p.poster = null;
    await api('PATCH', `/api/videos/${vid}`, p); close(); toast('Saqlandi'); reload();
  });
  $('#posterPick').onclick = async () => {
    const file = await pickImage(); if (!file) return;
    try { poster = await wideJpeg(file); $('#posterPick').innerHTML = `<img src="${poster}" alt=""><span>${ic('camera')}Almashtirish</span>`; } catch (e) { toast(e.message, true); }
  };
}
function bindPlayers() {
  $$('.vcard').forEach((card) => {
    if (card.dataset.bound) return; card.dataset.bound = '1';
    const vid = $('video', card), cover = $('.vcover', card), dur = $('[data-dur]', card);
    const showDur = () => { const t = Math.round(vid.duration || 0); if (t && isFinite(t)) dur.textContent = `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`; };
    vid.addEventListener('loadedmetadata', showDur); if (vid.readyState >= 1) showDur();
    cover.onclick = () => {
      cover.classList.add('gone'); vid.controls = true;
      const p = vid.play(); if (p) p.catch(() => { /* brauzer avtomatik o'ynatishni to'xtatsa — tugmalar bilan qo'lda */ });
    };
    vid.addEventListener('error', () => { cover.classList.remove('gone'); cover.innerHTML = `<span class="vplay err">${ic('alert')}</span><span class="verr">Videoni ochib bo'lmadi</span>`; });
  });
}
function bindVideoCard(gid, lid, reload) {
  $$('[data-delvid]').forEach((b) => {
    b.onclick = async () => { if (!confirm("Video o'chirilsinmi?")) return; try { await api('DELETE', `/api/videos/${b.dataset.delvid}`); toast("Video o'chirildi"); reload(); } catch (e) { toast(e.message, true); } };
  });
  $$('[data-editvid]').forEach((b) => { b.onclick = () => videoEditForm(Number(b.dataset.editvid), reload); });
  bindPlayers();
  const link = $('#vidLink');
  if (link) link.onclick = () => modal('Video havolasi', `<label class="f"><span>YouTube yoki boshqa video havolasi</span><input name="url" placeholder="https://youtu.be/..." value=""></label>
      <p class="hint">YouTube va Vimeo videolari platformaning o'zida ochiladi. Bo'sh qoldirsangiz — havola o'chiriladi.</p>`,
    async (form, close) => { await api('PUT', `/api/groups/${gid}/lessons/${lid}/video-url`, { url: formData(form).url }); close(); toast('Saqlandi'); reload(); });
  const zone = $('#vidZone'); if (!zone) return;
  const handle = async (files) => {
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024 * 1024) { toast(`${file.name}: 2 GB dan katta`, true); continue; }
      const row = document.createElement('div');
      row.className = 'file-row uploading';
      row.innerHTML = `<span class="fx fx-vid">${ic('play')}</span><div class="grow"><div class="fname">${esc(file.name)}</div><div class="bar" style="margin-top:6px"><i style="width:0%"></i></div><div class="s" data-p>0% · ${fmtSize(file.size)}</div></div>`;
      $('#vidUploads').appendChild(row);
      try {
        await uploadFile(gid, lid, file, (p) => { $('.bar i', row).style.width = `${Math.round(p * 100)}%`; $('[data-p]', row).textContent = `${Math.round(p * 100)}% · ${fmtSize(file.size)}`; }, `/api/groups/${gid}/lessons/${lid}/videos`);
        toast("Video yuklandi — o'quvchilarga xabar yuborildi"); reload(); return;
      } catch (e) { row.remove(); toast(`${file.name}: ${e.message}`, true); }
    }
  };
  $('input', zone).onchange = (e) => { handle([...e.target.files]); e.target.value = ''; };
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('over'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('over'));
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('over'); handle([...e.dataTransfer.files].filter((f) => f.type.startsWith('video/') || /\.(mp4|webm|mov|mkv|m4v)$/i.test(f.name))); });
}

async function viewLesson(gid, lid) {
  const d = await api('GET', `/api/groups/${gid}/lessons/${lid}`);
  const l = d.lesson, g = d.group, u = state.user;
  const head = `<div class="crumbs"><a href="#/groups">${u.role === 'student' ? 'Kurslarim' : 'Guruhlar'}</a>${ic('right')}<a href="#/groups/${gid}">${esc(g.name)}</a>${ic('right')}<span>${esc(l.module_title)}</span></div>
    <div class="page-head"><div><h1>${esc(l.title)}</h1>
      <div class="lesson-meta"><span class="chip">${ic('calendar')} Dars: ${fmtDate(l.date)}</span><span class="chip">${ic('clock')} Muddat: ${fmtDate(l.deadline)}</span>
      ${u.role === 'student' ? `${badge(d.status)} ${['kutilmoqda', 'qaytarilgan', 'bajarilmagan'].includes(d.status) ? deadlineChip(l.deadline) : ''}` : (l.available ? `<span class="badge st-open">${ic('unlock')} O'quvchilarga ochiq</span>${l.opened && l.date > todayStr() ? `<button class="btn sm" id="toggleOpen" data-v="0">${ic('lock')}Yopish</button>` : ''}` : `<span class="badge st-berilmagan">${ic('lock')} ${fmtDate(l.date)} da ochiladi</span><button class="btn sm primary" id="toggleOpen" data-v="1">${ic('unlock')}Hozir ochish</button>`)}</div></div>
      </div>`;
  const nav = `<div class="lesson-nav">${d.prev ? `<a class="btn" href="#/groups/${gid}/lessons/${d.prev.id}">${ic('left')}${esc(d.prev.title)}</a>` : '<span></span>'}
    ${d.next ? `<a class="btn" href="#/groups/${gid}/lessons/${d.next.id}">${esc(d.next.title)}${ic('right')}</a>` : '<span></span>'}</div>`;
  const material = l.url
    ? `<a class="card section mat-row" href="${esc(l.url)}" target="_blank" rel="noopener"><span class="mat-ico">${ic('book')}</span><div class="grow"><b>Dars materiali</b><span>O'qituvchi uchun · yangi oynada ochiladi · o'quvchilarga ko'rinmaydi</span></div><span class="btn sm">${ic('external')}Ochish</span></a>`
    : `<div class="card">${cardHead('book', 'Dars materiali')}${empty(u.role === 'student' && !l.available ? "Dars hali ochilmagan. Dars kuni yoki o'qituvchi ochganda ko'rinadi." : 'Bu dars uchun material hali tayyorlanmagan.', 'lock')}</div>`;

  if (u.role === 'student') {
    const s = d.submission;
    const at = d.attempts || { limit: 0, used: 0, left: null, locked: false };
    const canSubmit = l.available && (!s || s.status !== 'qabul') && !at.locked;
    const usedShown = Math.min(at.used, at.limit);
    const attChip = at.limit ? `<div class="att-meter ${at.locked ? 'bad' : at.left === 1 ? 'warn' : ''}">
        <div class="am-top"><span>${ic('refresh')}Urinishlar</span><b>${at.locked ? 'Tugadi' : `${at.left} ta qoldi`}</b></div>
        <div class="am-seg">${Array.from({ length: Math.min(at.limit, 10) }, (_, i) => `<i class="${i < usedShown ? 'on' : ''}"></i>`).join('')}</div>
        <div class="am-sub">${usedShown} / ${at.limit} ishlatildi</div></div>` : '';
    const tk = d.task;
    const taskBox = tk && (tk.text || tk.files.length || (tk.videos || []).length) ? `<div class="task-box"><div class="fs-title">O'qituvchi bergan vazifa</div>
      ${tk.text ? `<div class="task-text">${esc(tk.text)}</div>` : ''}${taskVideosHtml(tk.videos, false)}${tk.files.length ? filesHtml(tk.files, false) : ''}</div>` : '';
    const subCard = `<div class="card">${cardHead('upload', 'Uyga vazifa', s && s.score !== null ? `<span class="points" style="font-size:1.2rem">${s.score} ball</span>` : '')}
      ${taskBox}
      ${attChip}
      ${s ? `<div class="ans-head"><span class="ans-ico">${ic('upload')}</span><div class="grow"><b>Sizning javobingiz</b><span>${fmtDate(s.submitted_at, true)}</span></div>${badge(s.status)}</div>
        ${s.text ? `<div class="sub-box">${esc(s.text)}</div>` : ''}${s.link ? `<p style="margin-top:8px">${ic('link')} <a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a></p>` : ''}
        ${!canSubmit && d.my_files.length ? filesHtml(d.my_files, false) : ''}
        ${s.feedback ? `<div class="t-fb"><div class="t-fb-h">${ic('message')}O'qituvchi fikri${s.score !== null ? `<span class="score-pill">${s.score}</span>` : ''}</div><p>${esc(s.feedback)}</p></div>` : ''}` : ''}
      ${canSubmit ? `<form id="submitForm" style="margin-top:14px">
        <label class="f"><span>${s ? 'Qayta topshirish (yangi javob)' : 'Javobingiz'}</span><textarea name="text" placeholder="Javob, izoh yoki kod...">${esc(s && s.status === 'qaytarilgan' ? s.text : '')}</textarea></label>
        <label class="f"><span>Havola (GitHub, Google Drive, Docs...)</span><input name="link" placeholder="https://..." value="${esc(s?.link || '')}"></label>
        <div class="f"><span class="f-label">Fayllar</span>${filesHtml(d.my_files, true, 'myFiles')}${dropzone('myZone', 'Fayl biriktirish')}</div>
        <button class="btn primary">${ic('send')}${s ? 'Qayta topshirish' : 'Topshirish'}</button></form>`
        : (!l.available ? empty('Dars ochilgandan keyin vazifa topshirish mumkin', 'lock') : at.locked && s?.status !== 'qabul' ? `<div class="lock-card"><span class="lc-ico">${ic('lock')}</span><b>Topshirishlar soni tugadi</b><p>Vazifani faqat o'qituvchi qayta ocha oladi. Javobingiz tekshiriladi — natija shu yerda ko'rinadi.</p><button type="button" class="btn sm" id="askTeacher">${ic('message')}O'qituvchiga yozish</button></div>` : (s?.status === 'qabul' ? `<div class="done-card">${ic('checkCircle')}<div><b>Vazifa qabul qilindi</b><span>Barakalla! Coin hisobingizga qo'shildi.</span></div></div>` : ''))}</div>`;
    const comCard = `<div class="card">${cardHead('message', "O'qituvchi bilan muloqot")}${commentsHtml(d.comments)}
      <form id="commentForm" class="row" style="flex-wrap:nowrap"><input name="text" placeholder="Savol yoki izoh yozing..." required><button class="btn primary" title="Yuborish">${ic('send')}</button></form></div>`;
    // o'quvchi uchun ilova uslubidagi dars sahifasi
    const daysLeft = l.date ? daysBetween(todayStr(), l.date) : null;
    const sHead = `<a class="back-link" href="#/groups/${gid}">${ic('left')}${esc(g.name)}</a>
      <section class="ls-hero">
        <small>${esc(l.module_title)}${l.num ? ` · ${String(l.num).padStart(2, '0')}-dars` : ''}</small>
        <h1>${esc(l.title)}</h1>
        <div class="ls-chips"><span>${ic('calendar')}${fmtDate(l.date)}</span><span>${ic('clock')}Muddat: ${fmtDate(l.deadline)}</span></div>
        <div class="ls-status">${badge(d.status)}${['kutilmoqda', 'qaytarilgan', 'bajarilmagan'].includes(d.status) ? deadlineChip(l.deadline) : ''}</div>
      </section>`;
    const lockCard = `<div class="ls-lock"><span class="ls-lock-ico">${ic('lock')}</span>
      <b>Dars hali ochilmagan</b>
      <p>${l.date ? `<b>${fmtDate(l.date)}</b> kuni ochiladi${daysLeft > 0 ? ` · ${daysLeft === 1 ? 'ertaga' : daysLeft + ' kundan keyin'}` : ''}. ` : ''}Video va uyga vazifa shu kuni ko'rinadi.</p></div>`;
    const sMaterial = l.url ? `<div class="card ls-mat">${cardHead('book', 'Dars materiali', `<button class="icon-btn sm" id="fullBtn" title="To'liq ekran">${ic('maximize')}</button><a class="icon-btn sm" href="${esc(l.url)}" target="_blank" rel="noopener" title="Yangi oynada">${ic('external')}</a>`)}<iframe class="material" id="material" src="${esc(l.url)}" title="Dars materiali" loading="lazy" allowfullscreen></iframe></div>` : material;
    const sNav = (d.prev || d.next) ? `<div class="ls-nav ${d.prev && d.next ? '' : 'single'}">${d.prev ? `<a href="#/groups/${gid}/lessons/${d.prev.id}">${ic('left')}<div><small>Oldingi dars</small><b>${esc(d.prev.title)}</b></div></a>` : ''}
      ${d.next ? `<a class="nx" href="#/groups/${gid}/lessons/${d.next.id}"><div><small>Keyingi dars</small><b>${esc(d.next.title)}</b></div>${ic('right')}</a>` : ''}</div>` : '';
    layout(sHead + (l.available ? videoCard(d, gid, lid, false) + `<div class="grid half section">${subCard}${comCard}</div>` : lockCard + `<div class="section">${comCard}</div>`) + sNav);
    bindPlayers();
    const at2 = $('#askTeacher'); if (at2) at2.onclick = () => { const inp = $('#commentForm input'); inp.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(() => inp.focus(), 350); };
    bindDropzone('myZone', 'myFiles', gid, lid);
    bindFileDelete();
    const sf = $('#submitForm');
    if (sf) sf.onsubmit = async (e) => {
      e.preventDefault();
      try { await api('POST', `/api/groups/${gid}/lessons/${lid}/submit`, formData(sf)); toast('Vazifa topshirildi'); viewLesson(gid, lid); }
      catch (err) { toast(err.message, true); }
    };
    $('#commentForm').onsubmit = async (e) => {
      e.preventDefault();
      try { await api('POST', `/api/groups/${gid}/lessons/${lid}/comments`, formData(e.target)); viewLesson(gid, lid); }
      catch (err) { toast(err.message, true); }
    };
  } else {
    const present = d.students.filter((s) => s.present).length;
    const att = `<div class="card section">${cardHead('checkCircle', `Davomat <span class="chip">${present}/${d.students.length}</span>`, d.students.length ? `<button class="btn sm" id="allPresent">Hammasi keldi</button><button class="btn sm primary" id="saveAtt">${ic('check')}Saqlash</button>` : '')}
      ${d.students.length ? `<div class="days">${d.students.map((s) => `<label><input type="checkbox" data-att="${s.id}" ${s.present ? 'checked' : ''}> ${esc(s.name)}</label>`).join('')}</div>` : empty("Guruhda o'quvchi yo'q", 'users')}</div>`;
    const order = { tekshirilmoqda: 0, qaytarilgan: 1, qabul: 2 };
    const sorted = [...d.students].sort((a, b) => (order[a.status] ?? 3) - (order[b.status] ?? 3));
    const reviews = sorted.map((s) => `
      <div class="card review ${s.status === 'tekshirilmoqda' ? 'pending' : ''}">
        <div class="row">${avatar(s.name, s.id, 'sm')}<h3>${esc(s.name)}</h3>${badge(s.state)}${s.att && s.att.limit && s.submission_id ? `<span class="att-chip sm ${s.att.locked ? 'bad' : ''}">${ic('refresh')}${s.att.used}/${s.att.limit}</span>` : ''}<span class="spacer"></span>
          <span class="small muted">${s.submitted_at ? fmtDate(s.submitted_at, true) : ''}</span></div>
        ${s.submission_id ? `
          ${s.text ? `<div class="sub-box" style="margin-top:12px">${esc(s.text)}</div>` : ''}
          ${s.link ? `<p style="margin-top:8px">${ic('link')} <a href="${esc(s.link)}" target="_blank" rel="noopener">${esc(s.link)}</a></p>` : ''}
          ${s.files.length ? filesHtml(s.files, false) : ''}
          <div class="ai-box" id="ai-${s.submission_id}">${aiResultHtml(s.ai, s.submission_id)}</div>
          <form class="grade" data-sub="${s.submission_id}" style="margin-top:14px">
            <div class="form-grid">
              <label class="f"><span>Holat</span><select name="status">
                <option value="qabul" ${s.status !== 'qaytarilgan' ? 'selected' : ''}>Qabul qilingan</option>
                <option value="qaytarilgan" ${s.status === 'qaytarilgan' ? 'selected' : ''}>Qaytarilgan (qayta ishlasin)</option>
                <option value="tekshirilmoqda">Tekshirilmoqda</option></select></label>
              <label class="f"><span>Ball (0–100)</span><input name="score" type="number" min="0" max="100" value="${s.score ?? ''}" placeholder="masalan 90"></label>
            </div>
            <label class="f"><span>Fikr-mulohaza</span><textarea name="feedback" style="min-height:70px" placeholder="Nima yaxshi, nimani tuzatish kerak...">${esc(s.feedback || '')}</textarea></label>
            <div class="row"><button class="btn primary sm">${ic('check')}Baholash</button>${s.att && s.att.locked && s.status !== 'qabul' ? `<button type="button" class="btn sm success" data-reopen="${s.submission_id}" title="O'quvchiga yana 1 ta urinish beriladi">${ic('unlock')}Qayta ochish</button>` : ''}<button type="button" class="btn sm" data-com="${s.id}">${ic('message')}Izohlar (${s.comment_count})</button></div>
          </form>` : `<div class="row" style="margin-top:8px"><span class="muted small">Vazifa hali topshirilmagan</span><span class="spacer"></span><button type="button" class="btn sm" data-com="${s.id}">${ic('message')}Izohlar (${s.comment_count})</button></div>`}
        <div class="com-box" id="com-${s.id}"></div>
      </div>`).join('');
    const tk = d.task, hasTask = !!(tk.text || tk.files.length || (tk.videos || []).length);
    const taskCard = `<div class="card section" id="taskCard">${cardHead('clipboard', 'Uyga vazifa', `<button class="btn sm ${hasTask ? '' : 'primary'}" id="editTask">${ic(hasTask ? 'edit' : 'plus')}${hasTask ? 'Tahrirlash' : "Vazifa qo'shish"}</button>`)}
      <div id="taskView">${hasTask ? `${tk.text ? `<div class="task-text">${esc(tk.text)}</div>` : ''}${taskVideosHtml(tk.videos, true)}${filesHtml(tk.files, false)}
        <div class="att-chip" style="margin-top:12px">${ic('refresh')}Topshirish: <b>${(tk.max_attempts ?? tk.group_max) ? `${tk.max_attempts ?? tk.group_max} marta` : 'cheklanmagan'}</b></div>
        ${tk.updated_at ? `<div class="small muted" style="margin-top:10px">Oxirgi o'zgarish: ${fmtDate(tk.updated_at, true)}</div>` : ''}`
        : empty("Bu dars uchun vazifa berilmagan. Vazifa matnini yozing yoki fayl (PDF, Word, rasm...) yuklang — o'quvchilarga bildirishnoma boradi.", 'clipboard')}</div></div>`;
    layout(head + videoCard(d, gid, lid, true) + material + taskCard + att + `<h2 class="sec-title">${ic('inbox')}O'quvchilar javoblari</h2>` + (reviews || empty("Guruhda hali o'quvchi yo'q. O'quvchilar qo'shilgach, ularning javoblari shu yerda chiqadi.", 'users')) + nav);
    bindVideoCard(gid, lid, () => viewLesson(gid, lid));
    $('#editTask').onclick = (ev) => {
      ev.currentTarget.style.display = 'none';
      $('#taskView').innerHTML = `<form id="taskForm">
          <label class="f"><span>Necha marta topshirish mumkin</span><select name="max_attempts"><option value="" ${tk.max_attempts === null || tk.max_attempts === undefined ? 'selected' : ''}>Guruh sozlamasi bo'yicha (${tk.group_max ? tk.group_max + ' marta' : 'cheklanmagan'})</option>${[1, 2, 3, 5].map((n) => `<option value="${n}" ${tk.max_attempts === n ? 'selected' : ''}>${n} marta</option>`).join('')}<option value="0" ${tk.max_attempts === 0 ? 'selected' : ''}>Cheklanmagan</option></select></label>
          <label class="f"><span>Vazifa matni</span><textarea name="text" style="min-height:140px" placeholder="Masalan: 1) Darsdagi misollarni qayta yozing. 2) 5 ta masala yeching (fayl ilova qilingan). Muddat — keyingi darsgacha.">${esc(tk.text || '')}</textarea></label>
          <div class="f"><span class="f-label">Video tushuntirish</span>${taskVideosHtml(tk.videos, true)}<div id="tvUploads"></div><label class="dropzone" id="tvZone"><input type="file" accept="video/*" hidden>${ic('play')}<b>Video yuklash</b><span>Vazifani video orqali tushuntiring · MP4, WEBM, MOV · 2 GB gacha</span></label></div>
          <div class="f"><span class="f-label">Fayllar</span>${filesHtml(tk.files, true, 'taskFiles')}${dropzone('taskZone', 'Fayl yuklash')}</div>
          <div class="row"><button class="btn primary">${ic('check')}Saqlash</button><button type="button" class="btn ghost" id="cancelTask">Bekor qilish</button></div></form>`;
      bindDropzone('taskZone', 'taskFiles', gid, lid);
      bindPlayers(); bindVideoCard(gid, lid, () => viewLesson(gid, lid));
      const tvz = $('#tvZone');
      const tvUp = async (files) => {
        for (const file of files) {
          const row = document.createElement('div'); row.className = 'file-row uploading';
          row.innerHTML = `<span class="fx fx-vid">${ic('play')}</span><div class="grow"><div class="fname">${esc(file.name)}</div><div class="bar" style="margin-top:6px"><i style="width:0%"></i></div></div>`;
          $('#tvUploads').appendChild(row);
          try {
            await uploadFile(gid, lid, file, (p) => { $('.bar i', row).style.width = `${Math.round(p * 100)}%`; }, `/api/groups/${gid}/lessons/${lid}/videos`, 'task');
            row.remove(); toast('Video yuklandi');
            const t = formData($('#taskForm')).text;
            await api('PUT', `/api/groups/${gid}/lessons/${lid}/task`, { text: t }); viewLesson(gid, lid); return;
          } catch (e) { row.remove(); toast(`${file.name}: ${e.message}`, true); }
        }
      };
      $('input', tvz).onchange = (e) => { tvUp([...e.target.files]); e.target.value = ''; };
      tvz.addEventListener('dragover', (e) => { e.preventDefault(); tvz.classList.add('over'); });
      tvz.addEventListener('dragleave', () => tvz.classList.remove('over'));
      tvz.addEventListener('drop', (e) => { e.preventDefault(); tvz.classList.remove('over'); tvUp([...e.dataTransfer.files]); });
      bindFileDelete();
      $('textarea', $('#taskForm')).focus();
      $('#cancelTask').onclick = () => viewLesson(gid, lid);
      $('#taskForm').onsubmit = async (e) => {
        e.preventDefault();
        try { await api('PUT', `/api/groups/${gid}/lessons/${lid}/task`, { text: formData(e.target).text, max_attempts: formData(e.target).max_attempts }); toast('Vazifa saqlandi'); viewLesson(gid, lid); }
        catch (err) { toast(err.message, true); }
      };
    };

    const allP = $('#allPresent'); if (allP) allP.onclick = () => $$('[data-att]').forEach((c) => { c.checked = true; });
    const saveAtt = $('#saveAtt');
    if (saveAtt) saveAtt.onclick = async () => {
      const marks = {}; $$('[data-att]').forEach((c) => { marks[c.dataset.att] = c.checked; });
      try { await api('PUT', `/api/groups/${gid}/lessons/${lid}/attendance`, { marks }); toast('Davomat saqlandi'); } catch (e) { toast(e.message, true); }
    };
    $$('[data-aicheck]').forEach((b) => { b.onclick = () => runAi(Number(b.dataset.aicheck)); });
    $$('[data-aiapply]').forEach((b) => { b.onclick = () => applyAi(Number(b.dataset.aiapply)); });
    $$('[data-reopen]').forEach((b) => {
      b.onclick = async () => { try { await api('POST', `/api/submissions/${b.dataset.reopen}/reopen`, { add: 1 }); toast("Vazifa qayta ochildi: o'quvchiga +1 urinish"); viewLesson(gid, lid); } catch (e) { toast(e.message, true); } };
    });
    $$('form.grade').forEach((f) => {
      f.onsubmit = async (e) => {
        e.preventDefault();
        const v = formData(f);
        try { await api('PATCH', `/api/submissions/${f.dataset.sub}`, { status: v.status, score: v.score === '' ? null : Number(v.score), feedback: v.feedback }); toast('Baho saqlandi'); viewLesson(gid, lid); }
        catch (err) { toast(err.message, true); }
      };
    });
    $$('[data-com]').forEach((b) => {
      b.onclick = async () => {
        const sid = b.dataset.com, box = $(`#com-${sid}`);
        if (box.innerHTML) { box.innerHTML = ''; return; }
        const { comments } = await api('GET', `/api/groups/${gid}/lessons/${lid}/comments/${sid}`);
        box.innerHTML = `<div style="margin-top:14px">${commentsHtml(comments)}<form class="row" style="flex-wrap:nowrap"><input name="text" placeholder="Izoh yozing..." required><button class="btn sm primary">${ic('send')}</button></form></div>`;
        $('form', box).onsubmit = async (e) => {
          e.preventDefault();
          try { await api('POST', `/api/groups/${gid}/lessons/${lid}/comments`, { student_id: Number(sid), text: formData(e.target).text }); box.innerHTML = ''; b.click(); }
          catch (err) { toast(err.message, true); }
        };
      };
    });
  }
  const fb = $('#fullBtn'); if (fb) fb.onclick = () => { const m = $('#material'); if (m && m.requestFullscreen) m.requestFullscreen(); };
  const tg = $('#toggleOpen');
  if (tg) tg.onclick = async () => {
    await api('PATCH', `/api/groups/${gid}/lessons/${lid}`, { opened: tg.dataset.v === '1' });
    toast(tg.dataset.v === '1' ? "Dars o'quvchilar uchun ochildi" : 'Dars yopildi — jadvaldagi sanada ochiladi'); viewLesson(gid, lid);
  };
}

// ------------------------------------------------------------------ kurslar
async function viewCourses() {
  const { courses } = await api('GET', '/api/courses');
  layout(`<div class="page-head"><div><h1>Kurslar</h1><p>O'quv rejalari va darslar</p></div>
    ${state.user.role === 'admin' ? `<button class="btn" id="reimport">${ic('refresh')}Rejalarni yangilash</button>` : ''}</div>
    ${courses.length ? `<div class="grid cols-3">${courses.map((c) => {
      const [cls, icon] = courseStyle(c.slug);
      return `<a class="gcard ${cls}" href="#/courses/${c.id}"><div class="top"><div class="cico">${ic(icon)}</div><div><h3>${esc(c.title)}</h3><div class="meta">${esc(c.subtitle || '')}</div></div></div>
        <div class="foot"><span class="chip">${ic('layers')} ${c.module_count} modul</span><span class="chip">${ic('book')} ${c.lesson_count} dars</span><span class="chip">${ic('users')} ${c.group_count} guruh</span></div></a>`;
    }).join('')}</div>` : empty("Kurslar yo'q", 'book')}`);
  const b = $('#reimport');
  if (b) b.onclick = async () => { const r = await api('POST', '/api/courses/import'); toast(r.summary.join(' | ')); viewCourses(); };
}

async function viewCourse(cid) {
  const { course, modules } = await api('GET', `/api/courses/${cid}`);
  const total = modules.reduce((a, m) => a + m.lessons.length, 0);
  const withMat = modules.reduce((a, m) => a + m.lessons.filter((l) => l.url).length, 0);
  layout(`<div class="crumbs"><a href="#/courses">Kurslar</a>${ic('right')}<span>${esc(course.title)}</span></div>
    <div class="page-head"><div><h1>${esc(course.title)}</h1><p>${esc(course.subtitle || '')}</p></div>
    ${course.plan_url ? `<div class="row"><a class="btn" href="${esc(course.plan_url)}" target="_blank" rel="noopener">${ic('clipboard')}Reja sahifasi</a>
      <button class="btn primary" id="shareReja" title="Login talab qilmaydigan ochiq havola">${ic('link')}HR havolasi</button></div>` : ''}</div>
    ${course.plan_url ? `<div class="card share-reja"><div class="grow"><b>${ic('link')}Ochiq havola (HR uchun)</b><div class="muted small">Bu havola login talab qilmaydi — reja va darslarni istalgan kishi ko'ra oladi. Yechim fayllari ochilmaydi.</div>
      <div class="share-url mono" id="shareUrl">${esc(location.origin + course.plan_url.replace('/m/', '/reja/'))}</div></div>
      <button class="btn" id="copyReja">${ic('copy')}Nusxalash</button></div>` : ''}
    <div class="stats">${stat('violet', 'layers', modules.length, 'Modul')}${stat('blue', 'book', total, 'Dars')}${stat('green', 'file', withMat, 'Tayyor material')}</div>
    ${modules.map((m) => `<div class="card">${cardHead('layers', `${String(m.position).padStart(2, '0')}. ${esc(m.title)}`, `<span class="chip">${m.lessons.length} dars</span>`)}
      <div class="table-wrap"><table>${m.lessons.map((l) => `<tr><td><span class="num">${String(l.num).padStart(2, '0')}</span>${esc(l.title)}${l.tag ? `<span class="tag">${esc(l.tag)}</span>` : ''}
        ${l.week ? `<div class="small muted">${esc(l.week)}${l.day ? ' · ' + esc(l.day) : ''}</div>` : ''}</td>
        <td style="width:1%">${l.url ? `<a class="btn sm" href="${esc(l.url)}" target="_blank" rel="noopener">${ic('external')}Material</a>` : '<span class="muted small nowrap">tayyorlanmoqda</span>'}</td></tr>`).join('')}</table></div></div>`).join('')}`);
  if (course.plan_url) {
    const shareUrl = location.origin + course.plan_url.replace('/m/', '/reja/');
    const copy = () => { (navigator.clipboard ? navigator.clipboard.writeText(shareUrl) : Promise.reject()).then(() => toast('Havola nusxalandi')).catch(() => prompt('Havolani nusxalang:', shareUrl)); };
    const c1 = $('#copyReja'), c2 = $('#shareReja');
    if (c1) c1.onclick = copy;
    if (c2) c2.onclick = copy;
  }
}

// ------------------------------------------------------------------ foydalanuvchilar
async function viewUsers(role = '', q = '') {
  const { users } = await api('GET', `/api/users?role=${role}&q=${encodeURIComponent(q)}`);
  layout(`<div class="page-head"><div><h1>Foydalanuvchilar</h1><p>${users.length} ta</p></div>
    <div class="row"><button class="btn" id="bulkUser">${ic('upload')}Ro'yxatdan qo'shish</button><button class="btn primary" id="newUser">${ic('plus')}Yangi foydalanuvchi</button></div></div>
    <div class="row" style="margin-bottom:16px">
      <div class="tabs" style="margin:0">${[['', 'Hammasi'], ['student', "O'quvchilar"], ['parent', 'Ota-onalar'], ['teacher', "O'qituvchilar"], ['admin', 'Administratorlar'], ...(state.user.is_dev ? [['dev', 'Egasi']] : [])].map(([r, t]) => `<button data-role="${r}" class="${r === role ? 'active' : ''}">${t}</button>`).join('')}</div>
      <span class="spacer"></span><div class="search">${ic('search')}<input id="userQ" placeholder="Ism yoki login..." value="${esc(q)}"></div></div>
    <div class="card table-wrap">${users.length ? `<table><tr><th>Foydalanuvchi</th><th>Rol</th><th>Telefon</th><th>Qo'shilgan</th><th>Holat</th><th></th></tr>
    ${users.map((u) => `<tr><td class="click" data-href="#/students/${u.id}" style="cursor:pointer"><div class="user-cell">${avatar(u.name, u.id, 'sm', u.role, u.avatar)}<div>${esc(u.name)}<div class="small muted mono">${esc(u.login)}</div></div></div></td>
      <td class="role-${u.role}">${ROLE[u.role]}</td><td class="small">${esc(u.phone || '—')}</td><td class="small">${fmtDate(u.created_at)}</td>
      <td>${u.active ? '<span class="chip ok">Faol</span>' : '<span class="chip bad">Bloklangan</span>'}</td>
      <td style="white-space:nowrap;text-align:right"><button class="btn sm" data-edit="${u.id}" title="Tahrirlash">${ic('edit')}</button> ${u.id !== state.user.id ? `<button class="btn sm danger" data-del="${u.id}" title="O'chirish">${ic('trash')}</button>` : ''}</td></tr>`).join('')}</table>` : empty('Hech kim topilmadi', 'search')}</div>`);
  $$('[data-role]').forEach((b) => { b.onclick = () => viewUsers(b.dataset.role, $('#userQ').value); });
  let t; const qi = $('#userQ');
  qi.oninput = () => { clearTimeout(t); t = setTimeout(async () => { await viewUsers(role, qi.value); const n = $('#userQ'); n.focus(); n.setSelectionRange(n.value.length, n.value.length); }, 350); };
  $('#newUser').onclick = () => userForm(null, role);
  $('#bulkUser').onclick = () => bulkForm(role);
  $$('[data-edit]').forEach((b) => { b.onclick = () => userForm(users.find((u) => u.id === Number(b.dataset.edit)), role); });
  $$('[data-del]').forEach((b) => {
    b.onclick = async () => {
      const u = users.find((x) => x.id === Number(b.dataset.del));
      if (!confirm(`${u.name} butunlay o'chiriladi (topshiriqlari bilan). Vaqtincha to'xtatish uchun «bloklash» yaxshiroq. Davom etasizmi?`)) return;
      try { await api('DELETE', `/api/users/${u.id}`); toast("O'chirildi"); viewUsers(role); } catch (e) { toast(e.message, true); }
    };
  });
}

async function userForm(u, currentRole) {
  const [{ users: students }, links] = await Promise.all([api('GET', '/api/users?role=student'), u ? api('GET', `/api/users/${u.id}/links`) : Promise.resolve({ children: [] })]);
  const kids = new Set(links.children.map((c) => c.id));
  const body = `
    <label class="f"><span>Ism-familiya</span><input name="name" required value="${esc(u?.name || '')}" placeholder="Ali Valiyev"></label>
    <div class="form-grid">
      <label class="f"><span>Login</span><input name="login" required value="${esc(u?.login || '')}" ${u ? 'disabled' : ''} placeholder="ali.valiyev"></label>
      <label class="f"><span>Rol</span><select name="role">${Object.entries(ROLE).filter(([r]) => r !== 'dev' || state.user.is_dev).map(([r, t]) => `<option value="${r}" ${(u?.role || currentRole || 'student') === r ? 'selected' : ''}>${t}</option>`).join('')}</select></label>
    </div>
    <div class="form-grid">
      <label class="f"><span>Telefon</span><input name="phone" value="${esc(u?.phone || '')}" placeholder="+998 90 123 45 67"></label>
      <label class="f"><span>${u ? 'Yangi parol (ixtiyoriy)' : 'Parol'}</span><input name="password" ${u ? '' : 'required'} minlength="6" autocomplete="new-password" value="${u ? '' : Math.random().toString(36).slice(2, 10)}"></label>
    </div>
    <div class="f" id="kidsBox"><span class="f-label">Farzandlari (ota-ona uchun)</span><div class="check-list" style="max-height:180px">${students.filter((x) => x.active).map((x) => `<label><input type="checkbox" name="k${x.id}" ${kids.has(x.id) ? 'checked' : ''}> ${avatar(x.name, x.id, 'sm', 'student', x.avatar)} ${esc(x.name)} <span class="muted small">${esc(x.login)}</span></label>`).join('') || '<div class="muted small" style="padding:8px">O\'quvchilar yo\'q</div>'}</div></div>
    ${u ? `<label class="switch-row"><input type="checkbox" class="switch" name="active" ${u.active ? 'checked' : ''}><span><b>Faol</b><small>O'chirilsa — tizimga kira olmaydi</small></span></label>` : '<p class="hint">Parol avtomatik taklif qilindi — xohlasangiz o\'zgartiring.</p>'}`;
  modal(u ? 'Foydalanuvchini tahrirlash' : 'Yangi foydalanuvchi', body, async (form, close) => {
    const f = formData(form);
    const kidIds = Object.keys(f).filter((k) => /^k\d+$/.test(k)).map((k) => Number(k.slice(1)));
    if (u) {
      const p = { name: f.name, role: f.role, phone: f.phone, active: !!f.active };
      if (f.password) p.password = f.password;
      await api('PATCH', `/api/users/${u.id}`, p);
      if (f.role === 'parent') await api('PUT', `/api/users/${u.id}/children`, { student_ids: kidIds });
      close(); toast('Saqlandi');
    } else {
      const cr = await api('POST', '/api/users', f);
      if (f.role === 'parent' && kidIds.length) await api('PUT', `/api/users/${cr.user.id}/children`, { student_ids: kidIds });
      close();
      showCreds([{ name: f.name, login: f.login.toLowerCase(), password: f.password }]);
    }
    viewUsers(currentRole);
  });
  const rs = $('select[name=role]'), kb = $('#kidsBox');
  const syncKids = () => { kb.style.display = rs.value === 'parent' ? '' : 'none'; };
  rs.addEventListener('change', syncKids); syncKids();
}

async function bulkForm(role) {
  const { groups } = await api('GET', '/api/groups');
  modal("Ro'yxatdan qo'shish", `
    <div class="form-grid">
      <label class="f"><span>Rol</span><select name="role"><option value="student" ${role !== 'teacher' ? 'selected' : ''}>O'quvchi</option><option value="teacher" ${role === 'teacher' ? 'selected' : ''}>O'qituvchi</option></select></label>
      <label class="f"><span>Guruhga qo'shish (o'quvchilar)</span><select name="group_id"><option value="">— yo'q —</option>${groups.filter((g) => g.active).map((g) => `<option value="${g.id}">${esc(g.name)}</option>`).join('')}</select></label>
    </div>
    <label class="f"><span>Har bir qatorda bitta odam</span><textarea name="lines" style="min-height:170px" required placeholder="Ali Valiyev&#10;Malika Karimova; malika.k; parol123; +998901234567&#10;Sardor Rahimov"></textarea></label>
    <p class="hint">Format: <code>Ism Familiya; login; parol; telefon</code> — login va parol ixtiyoriy, avtomatik yaratiladi. Excel'dan nusxa olsangiz ham bo'ladi.</p>`,
  async (form, close) => {
    const f = formData(form);
    const r = await api('POST', '/api/users/bulk', { role: f.role, lines: f.lines, group_id: f.group_id ? Number(f.group_id) : null });
    close(); showCreds(r.created); viewUsers(role);
  }, "Qo'shish");
}

function showCreds(list) {
  const text = list.map((c) => `${c.name}\tlogin: ${c.login}\tparol: ${c.password}`).join('\n');
  modal(`${list.length} ta foydalanuvchi yaratildi`, `
    <p class="hint">Login va parollarni hozir nusxalab oling — parollar keyin ko'rsatilmaydi.</p>
    <div class="table-wrap"><table class="creds"><tr><th>Ism</th><th>Login</th><th>Parol</th></tr>${list.map((c) => `<tr><td>${esc(c.name)}</td><td>${esc(c.login)}</td><td>${esc(c.password)}</td></tr>`).join('')}</table></div>
    <button type="button" class="btn" id="copyCreds" style="margin-top:10px">${ic('copy')}Nusxa olish</button>`, null);
  $('#copyCreds').onclick = async () => { try { await navigator.clipboard.writeText(text); toast('Nusxa olindi'); } catch { toast("Nusxa olib bo'lmadi", true); } };
}

// ------------------------------------------------------------------ profil rasmi
function pickImage() {
  return new Promise((resolve) => {
    const inp = document.createElement('input');
    inp.type = 'file'; inp.accept = 'image/jpeg,image/png,image/webp';
    inp.onchange = () => resolve(inp.files[0] || null);
    inp.click();
  });
}
// rasmni 320x320 kvadratga qirqib, JPEG ga siqamiz
function squareJpeg(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const S = 320, c = document.createElement('canvas'); c.width = S; c.height = S;
      const side = Math.min(img.width, img.height);
      c.getContext('2d').drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, S, S);
      URL.revokeObjectURL(img.src); resolve(c.toDataURL('image/jpeg', 0.85));
    };
    img.onerror = () => reject(new Error("Rasmni o'qib bo'lmadi"));
    img.src = URL.createObjectURL(file);
  });
}
function bindAvatarEdit(endpoint, hasPhoto, after) {
  const box = $('#avEdit'); if (!box) return;
  box.insertAdjacentHTML('beforeend', `<button type="button" class="av-btn" title="Rasm yuklash">${ic('camera')}</button>`);
  const actions = $('#avActions');
  if (actions) actions.innerHTML = `<button type="button" class="btn sm" data-av-up>${ic('camera')}${hasPhoto ? 'Rasmni almashtirish' : 'Rasm yuklash'}</button>${hasPhoto ? `<button type="button" class="btn sm ghost" data-av-del>${ic('trash')}O'chirish</button>` : ''}`;
  const upload = async () => {
    const f = await pickImage(); if (!f) return;
    if (f.size > 15 * 1024 * 1024) return toast('Rasm juda katta (15 MB dan kichik bo\x27lsin)', true);
    try { const data = await squareJpeg(f); const r = await api('PUT', endpoint, { data }); toast('Rasm saqlandi'); after(r.avatar); } catch (e) { toast(e.message, true); }
  };
  $$('.av-btn, [data-av-up]').forEach((b) => { b.onclick = upload; });
  const del = $('[data-av-del]');
  if (del) del.onclick = async () => { if (!confirm("Profil rasmi o'chirilsinmi?")) return; await api('PUT', endpoint, { data: null }); toast("Rasm o'chirildi"); after(null); };
}

// ------------------------------------------------------------------ testlar
// Matn formati:  1. Savol?  /  a) variant  /  *b) to'g'ri variant
const LETTERS = 'abcdefghij';
function parseTestText(text) {
  const qs = [];
  let cur = null;
  for (const raw of String(text).split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) continue;
    const opt = line.match(/^(\*)?\s*([a-jA-J])[).]\s+(.+?)\s*(\*)?$/);
    if (opt && cur) {
      if (opt[1] || opt[4]) cur.answer = cur.options.length;
      cur.options.push(opt[3]);
      continue;
    }
    if (!cur || cur.options.length) { cur = { q: '', options: [], answer: -1 }; qs.push(cur); }
    cur.q = (cur.q ? cur.q + '\n' : '') + line.replace(/^\d+\s*[.)]\s*/, '');
  }
  return qs;
}
const testToText = (qs) => qs.map((q, i) => `${i + 1}. ${q.q}\n${q.options.map((o, j) => `${j === q.answer ? '*' : ''}${LETTERS[j]}) ${o}`).join('\n')}`).join('\n\n');

function testForm(gid, t) {
  modal(t ? 'Testni tahrirlash' : 'Yangi test', `
    <label class="f"><span>Test nomi</span><input name="title" required value="${esc(t?.title || '')}" placeholder="Masalan: 1-oy yakuniy imtihoni"></label>
    <div class="form-grid">
      <label class="f"><span>Vaqt (daqiqa)</span><input name="duration_min" type="number" min="1" max="300" value="${t?.duration_min || 20}"></label>
      <label class="f"><span>Holati</span><select name="published"><option value="1" ${t?.published ? 'selected' : ''}>O'quvchilarga e'lon qilish</option><option value="0" ${t && !t.published ? 'selected' : ''}>Qoralama (yashirin)</option></select></label>
    </div>
    <label class="f"><span>Izoh (ixtiyoriy)</span><input name="description" value="${esc(t?.description || '')}" placeholder="Qaysi mavzular bo'yicha"></label>
    <label class="f"><span>Savollar</span><textarea name="questions" class="mono" style="min-height:260px;font-size:.85rem" required placeholder="1. Kompyuterning «miyasi» qaysi qism?&#10;a) Monitor&#10;*b) Protsessor&#10;c) Sichqoncha&#10;&#10;2. Nusxa olish tugmalari?&#10;*a) Ctrl+C&#10;b) Ctrl+V">${esc(t ? testToText(t.questions) : '')}</textarea></label>
    <p class="hint">Har bir savol raqam bilan, variantlar <code>a)</code> <code>b)</code> … bilan; to'g'ri javob oldiga <code>*</code> qo'ying. Savollar orasida bo'sh qator.</p>
    <div id="testPreview" class="hint"></div>`,
  async (form, close) => {
    const f = formData(form);
    const questions = parseTestText(f.questions);
    const payload = { title: f.title, description: f.description, duration_min: Number(f.duration_min), published: f.published === '1', questions };
    if (t) { await api('PATCH', `/api/tests/${t.id}`, payload); close(); toast('Test saqlandi'); route(); }
    else { const r = await api('POST', `/api/groups/${gid}/tests`, payload); close(); toast('Test yaratildi'); go(`#/tests/${r.id}`); }
  });
  const ta = $('textarea[name=questions]'), pv = $('#testPreview');
  const upd = () => {
    const qs = parseTestText(ta.value);
    const bad = qs.map((q, i) => (q.options.length < 2 || q.answer < 0 ? i + 1 : null)).filter(Boolean);
    pv.innerHTML = qs.length ? `${ic('checkCircle')} ${qs.length} ta savol aniqlandi${bad.length ? ` · <span style="color:#fda4af">tekshiring: ${bad.join(', ')}-savol (variant yoki * yo'q)</span>` : ''}` : '';
  };
  ta.oninput = upd; upd();
}

let testTimer;
async function viewTest(tid) {
  clearInterval(testTimer);
  const d = await api('GET', `/api/tests/${tid}`);
  const t = d.test, u = state.user;
  const head = `<div class="crumbs"><a href="#/groups">${u.role === 'student' ? 'Kurslarim' : 'Guruhlar'}</a>${ic('right')}<a href="#/groups/${t.group.id}/tests">${esc(t.group.name)}</a>${ic('right')}<span>Testlar</span></div>
    <div class="page-head"><div><h1>${esc(t.title)}</h1><div class="lesson-meta"><span class="chip">${ic('quiz')} ${t.count} savol</span><span class="chip">${ic('timer')} ${t.duration_min} daqiqa</span>
      ${u.role !== 'student' ? (t.published ? '<span class="chip ok">e\'lon qilingan</span>' : '<span class="chip">qoralama</span>') : ''}</div>${t.description ? `<p style="margin-top:8px">${esc(t.description)}</p>` : ''}</div>
      <div class="row" id="testActions"></div></div>`;
  const reviewHtml = (questions, answers) => questions.map((q, i) => {
    const mine = answers ? answers[i] : null;
    return `<div class="card q-card"><div class="q-num">${i + 1}-savol${answers ? (mine === q.answer ? ` <span class="chip ok">${ic('check')} to'g'ri</span>` : ' <span class="chip bad">noto\'g\'ri</span>') : ''}</div>
      <div class="q-text">${esc(q.q)}</div><div class="opts">${q.options.map((o, j) => `<div class="opt ${j === q.answer ? 'right' : ''} ${answers && mine === j && j !== q.answer ? 'wrong' : ''}">
        <span class="ol">${LETTERS[j].toUpperCase()}</span>${esc(o)}</div>`).join('')}</div></div>`;
  }).join('');

  if (u.role !== 'student') {
    const done = d.attempts.filter((a) => a.finished_at);
    const avg = done.length ? Math.round(done.reduce((s, a) => s + a.score, 0) / done.length) : null;
    layout(head + `<div class="stats">${stat('blue', 'users', `${done.length}/${d.attempts.length}`, 'Topshirdi')}${stat('amber', 'star', avg ?? '—', "O'rtacha natija, %")}
        ${stat('green', 'trophy', done.length ? Math.max(...done.map((a) => a.score)) + '%' : '—', 'Eng yuqori')}${stat('rose', 'alert', done.filter((a) => a.score < 60).length, '60% dan past')}</div>
      <div class="card">${cardHead('chart', 'Natijalar')}
        <div class="table-wrap"><table><tr><th>O'quvchi</th><th>Natija</th><th>To'g'ri</th><th>Topshirilgan</th><th></th></tr>
        ${d.attempts.map((a) => `<tr><td><div class="user-cell">${avatar(a.name, a.student_id, 'sm')}${esc(a.name)}</div></td>
          <td>${a.finished_at ? `<div class="row" style="flex-wrap:nowrap"><div class="bar" style="max-width:140px"><i style="width:${a.score}%"></i></div><b>${a.score}%</b></div>` : (a.started_at ? '<span class="chip warn">yechmoqda</span>' : '<span class="muted">—</span>')}</td>
          <td>${a.finished_at ? `${a.correct}/${a.total}` : '—'}</td><td class="small">${a.finished_at ? fmtDate(a.finished_at, true) : '—'}</td>
          <td style="text-align:right">${a.started_at ? `<button class="btn sm" data-retake="${a.student_id}" title="Qayta topshirishga ruxsat">${ic('refresh')}</button>` : ''}</td></tr>`).join('')}</table></div></div>
      <h2 style="margin:24px 0 12px;display:flex;gap:10px;align-items:center">${ic('clipboard')}Savollar va javoblar</h2>${reviewHtml(t.questions, null)}`);
    $('#testActions').innerHTML = `<button class="btn" id="tPub">${t.published ? `${ic('lock')}Yashirish` : `${ic('send')}E'lon qilish`}</button><button class="btn" id="tEdit">${ic('edit')}Tahrirlash</button><button class="btn danger" id="tDel">${ic('trash')}</button>`;
    $('#tPub').onclick = async () => { await api('PATCH', `/api/tests/${tid}`, { published: !t.published }); toast(t.published ? 'Test yashirildi' : "Test e'lon qilindi"); viewTest(tid); };
    $('#tEdit').onclick = () => testForm(t.group.id, t);
    $('#tDel').onclick = async () => { if (!confirm('Test va barcha natijalar o\'chirilsinmi?')) return; await api('DELETE', `/api/tests/${tid}`); toast("Test o'chirildi"); go(`#/groups/${t.group.id}/tests`); };
    $$('[data-retake]').forEach((b) => { b.onclick = async () => { if (!confirm("Natija o'chiriladi va o'quvchi testni qayta topshira oladi. Davom etasizmi?")) return; await api('DELETE', `/api/tests/${tid}/attempts/${b.dataset.retake}`); toast('Qayta topshirishga ruxsat berildi'); viewTest(tid); }; });
    return;
  }

  const a = d.attempt;
  if (!a) {
    layout(head + `<div class="card" style="text-align:center;padding:40px 20px">${ring(0, 90, ic('quiz'))}
      <h2 style="margin:16px 0 6px">Testga tayyormisiz?</h2><p class="muted">${t.count} ta savol · ${t.duration_min} daqiqa. Boshlaganingizdan keyin vaqt hisoblanadi va testni faqat bir marta topshirasiz.</p>
      <button class="btn primary" id="startTest" style="margin-top:18px;padding:12px 26px">${ic('play')}Testni boshlash</button></div>`);
    $('#startTest').onclick = async () => { await api('POST', `/api/tests/${tid}/start`); viewTest(tid); };
    return;
  }
  if (a.finished_at) {
    const tone = a.score >= 85 ? "A'lo natija!" : a.score >= 60 ? 'Yaxshi natija!' : 'Mavzularni yana takrorlang';
    layout(head + `<div class="card hero">${ring(a.score, 96)}<div class="grow"><h2 style="font-size:1.3rem">${tone}</h2>
        <p class="muted">${a.correct} / ${a.total} ta to'g'ri javob · ${fmtDate(a.finished_at, true)}</p></div></div>
      <h2 style="margin:24px 0 12px;display:flex;gap:10px;align-items:center">${ic('clipboard')}Javoblaringiz tahlili</h2>${reviewHtml(t.questions, a.answers)}`);
    return;
  }
  // test yechilmoqda
  const KEY = `test-${tid}-${u.id}`;
  let answers = [];
  try { answers = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { /* yo'q */ }
  layout(head + `<div class="test-bar card"><span>${ic('timer')}</span><b id="tLeft">--:--</b><div class="bar" style="flex:1"><i id="tProg" style="width:0%"></i></div>
      <span class="small muted" id="tCount"></span><button class="btn primary" id="tSubmit">${ic('send')}Yakunlash</button></div>
    ${t.questions.map((q, i) => `<div class="card q-card"><div class="q-num">${i + 1}-savol</div><div class="q-text">${esc(q.q)}</div>
      <div class="opts">${q.options.map((o, j) => `<label class="opt pick"><input type="radio" name="q${i}" value="${j}" ${answers[i] === j ? 'checked' : ''}><span class="ol">${LETTERS[j].toUpperCase()}</span>${esc(o)}</label>`).join('')}</div></div>`).join('')}
    <div class="row" style="justify-content:flex-end;margin-top:16px"><button class="btn primary" id="tSubmit2">${ic('send')}Testni yakunlash</button></div>`);
  const count = () => { $('#tCount').textContent = `${answers.filter((x) => Number.isInteger(x)).length}/${t.count} javob`; };
  count();
  $$('.opt.pick input').forEach((r) => { r.onchange = () => { answers[Number(r.name.slice(1))] = Number(r.value); try { localStorage.setItem(KEY, JSON.stringify(answers)); } catch { /* jim */ } count(); }; });
  let sent = false;
  const submit = async (auto) => {
    if (sent) return;
    if (!auto && answers.filter((x) => Number.isInteger(x)).length < t.count && !confirm('Barcha savollarga javob berilmagan. Baribir yakunlaysizmi?')) return;
    sent = true; clearInterval(testTimer);
    try { await api('POST', `/api/tests/${tid}/submit`, { answers }); try { localStorage.removeItem(KEY); } catch { /* jim */ } toast(auto ? 'Vaqt tugadi — test topshirildi' : 'Test topshirildi'); viewTest(tid); }
    catch (e) { sent = false; toast(e.message, true); }
  };
  $('#tSubmit').onclick = () => submit(false); $('#tSubmit2').onclick = () => submit(false);
  const total = t.duration_min * 60000;
  const tick = () => {
    if (!$('#tLeft')) return clearInterval(testTimer);
    const left = a.deadline - Date.now();
    if (left <= 0) { $('#tLeft').textContent = '00:00'; return submit(true); }
    $('#tLeft').textContent = `${String(Math.floor(left / 60000)).padStart(2, '0')}:${String(Math.floor((left % 60000) / 1000)).padStart(2, '0')}`;
    $('#tLeft').style.color = left < 60000 ? '#fb7185' : '';
    $('#tProg').style.width = `${100 - (left / total) * 100}%`;
  };
  tick(); testTimer = setInterval(tick, 1000);
}

// ------------------------------------------------------------------ to'lovlar
const METHODS = { naqd: 'Naqd', karta: 'Karta', click: 'Click', payme: 'Payme', boshqa: 'Boshqa' };
async function viewPayments(month) {
  const d = await api('GET', `/api/payments${month ? '?month=' + month : ''}`);
  const tt = d.totals;
  const [y, m] = d.month.split('-').map(Number);
  const shift = (k) => { const dt = new Date(y, m - 1 + k, 1); return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}`; };
  const debtors = d.students.filter((s) => s.debt > 0);
  const maxM = Math.max(1, ...d.months.map((x) => x.total));
  layout(`<div class="page-head"><div><h1>To'lovlar</h1><p>Oylik to'lovlar va qarzdorlar</p></div>
      <div class="row"><a class="btn" href="#/payments/${shift(-1)}">${ic('left')}</a><span class="chip" style="font-size:.9rem;padding:8px 14px">${ic('calendar')} ${monthName(d.month)}</span><a class="btn" href="#/payments/${shift(1)}">${ic('right')}</a>
      <button class="btn primary" id="newPay">${ic('plus')}To'lov qabul qilish</button></div></div>
    <div class="stats">${stat('blue', 'target', moneyVal(tt.expected), 'Kutilayotgan tushum')}${stat('green', 'wallet', moneyVal(tt.received), 'Tushgan')}
      ${stat('rose', 'alert', moneyVal(tt.debt), 'Qarzdorlik', `${tt.debtors} ta o'quvchi`)}${stat('violet', 'chart', `${pct(tt.received, tt.expected)}%`, "Yig'ilish darajasi")}</div>
    <div class="grid two">
      <div class="card">${cardHead('alert', `Qarzdorlar <span class="chip bad">${debtors.length}</span>`)}
        ${debtors.length ? `<div class="table-wrap"><table><tr><th>O'quvchi</th><th>Guruh</th><th>Narx</th><th>To'lagan</th><th>Qarz</th><th></th></tr>
        ${debtors.map((s) => `<tr><td class="click" data-href="#/students/${s.student_id}" style="cursor:pointer"><div class="user-cell">${avatar(s.name, s.student_id, 'sm')}<div>${esc(s.name)}<div class="small muted">${esc(s.phone || '')}</div></div></div></td>
          <td class="small">${esc(s.group_name)}</td><td class="nowrap">${money(s.price)}</td><td class="nowrap">${money(s.paid)}</td><td class="nowrap" style="color:#fda4af;font-weight:600">${money(s.debt)}</td>
          <td><button class="btn sm success" data-pay='${esc(JSON.stringify({ student_id: s.student_id, group_id: s.group_id, amount: s.debt }))}'>${ic('check')}Qabul</button></td></tr>`).join('')}</table></div>`
          : empty(d.students.length ? "Bu oy hamma to'lagan" : "Pullik guruh yo'q. Guruhni tahrirlab «Oylik to'lov»ni kiriting.", 'checkCircle')}</div>
      <div class="card">${cardHead('chart', 'Oylar kesimida')}
        ${d.months.length ? `<div class="list">${d.months.map((x) => `<div class="li"><div class="grow"><div class="t">${monthName(x.month)}</div><div class="bar" style="margin-top:6px"><i style="width:${pct(x.total, maxM)}%"></i></div></div><b class="nowrap">${money(x.total)}</b></div>`).join('')}</div>` : empty("Hali to'lov yo'q", 'wallet')}</div>
    </div>
    <div class="card section">${cardHead('wallet', `${monthName(d.month)} — to'lovlar`, `<span class="muted small">${d.list.length} ta</span>`)}
      ${d.list.length ? `<div class="table-wrap"><table><tr><th>O'quvchi</th><th>Guruh</th><th>Summa</th><th>Usul</th><th>Izoh</th><th>Sana</th><th></th></tr>
      ${d.list.map((p) => `<tr><td>${esc(p.student)}</td><td class="small">${esc(p.group_name || '—')}</td><td class="nowrap"><b>${money(p.amount)}</b></td><td><span class="chip">${METHODS[p.method] || p.method}</span></td>
        <td class="small">${esc(p.note || '')}</td><td class="small">${fmtDate(p.created_at, true)}</td><td style="text-align:right"><button class="btn sm danger" data-delpay="${p.id}">${ic('trash')}</button></td></tr>`).join('')}</table></div>` : empty("Bu oyda to'lov kiritilmagan", 'wallet')}</div>`);
  $('#newPay').onclick = () => paymentForm({ month: d.month }, d.month);
  $$('[data-pay]').forEach((b) => { b.onclick = () => paymentForm({ ...JSON.parse(b.dataset.pay), month: d.month }, d.month); });
  $$('[data-delpay]').forEach((b) => { b.onclick = async () => { if (!confirm("To'lov o'chirilsinmi?")) return; await api('DELETE', `/api/payments/${b.dataset.delpay}`); toast("O'chirildi"); viewPayments(d.month); }; });
}

async function paymentForm(pre, month) {
  const [{ users }, { groups }] = await Promise.all([api('GET', '/api/users?role=student'), api('GET', '/api/groups')]);
  modal("To'lov qabul qilish", `
    <label class="f"><span>O'quvchi</span><select name="student_id" required><option value="">— tanlang —</option>${users.filter((x) => x.active).map((x) => `<option value="${x.id}" ${pre.student_id === x.id ? 'selected' : ''}>${esc(x.name)} (${esc(x.login)})</option>`).join('')}</select></label>
    <label class="f"><span>Guruh</span><select name="group_id"><option value="">—</option>${groups.filter((g) => g.active).map((g) => `<option value="${g.id}" data-price="${g.price || 0}" ${pre.group_id === g.id ? 'selected' : ''}>${esc(g.name)}${g.price ? ' · ' + money(g.price) : ''}</option>`).join('')}</select></label>
    <div class="form-grid">
      <label class="f"><span>Summa (so'm)</span><input name="amount" type="number" min="1" step="1000" required value="${pre.amount || ''}"></label>
      <label class="f"><span>Qaysi oy uchun</span><input name="month" type="month" required value="${esc(pre.month || month)}"></label>
    </div>
    <div class="form-grid">
      <label class="f"><span>To'lov usuli</span><select name="method">${Object.entries(METHODS).map(([k, v]) => `<option value="${k}">${v}</option>`).join('')}</select></label>
      <label class="f"><span>Izoh</span><input name="note" placeholder="ixtiyoriy"></label>
    </div>`,
  async (form, close) => {
    const f = formData(form);
    await api('POST', '/api/payments', { student_id: Number(f.student_id), group_id: f.group_id ? Number(f.group_id) : null, amount: Number(f.amount), month: f.month, method: f.method, note: f.note });
    close(); toast("To'lov qabul qilindi"); route();
  }, 'Qabul qilish');
  const gs = $('select[name=group_id]'), am = $('input[name=amount]');
  gs.onchange = () => { const p = Number(gs.selectedOptions[0]?.dataset.price || 0); if (p && !am.value) am.value = p; };
}

// ------------------------------------------------------------------ o'quvchi profili
function profileSections(p) {
  const u = p.user;
  const groups = p.groups.length ? `<div class="grid cols-3">${p.groups.map((g) => {
    const [cls, icon] = courseStyle(g.slug);
    return `<a class="gcard ${cls}" href="#/groups/${g.id}"><div class="top"><div class="cico">${ic(icon)}</div><div class="grow"><h3>${esc(g.name)}</h3><div class="meta">${esc(g.course_title)}</div></div>${ring(pct(g.accepted, g.total), 60)}</div>
      <div class="row small"><span class="chip">${ic('trophy')} ${g.rank || '—'}/${g.of}-o'rin</span><span class="chip">${ic('star')} ${g.points} ball</span>
        <span class="chip">${ic('checkCircle')} davomat ${g.att.total ? pct(g.att.present, g.att.total) + '%' : '—'}</span>${g.certificate ? `<span class="chip warn">${ic('award')} sertifikat</span>` : ''}</div></a>`;
  }).join('')}</div>` : empty("Guruhga biriktirilmagan", 'users');
  const tests = `<div class="card">${cardHead('quiz', 'Test natijalari')}${p.tests.length ? `<div class="list">${p.tests.map((t) => `<a class="li" href="#/tests/${t.id}"><div class="grow"><div class="t">${esc(t.title)}</div><div class="s">${esc(t.group_name)} · ${fmtDate(t.finished_at, true)}</div></div><span class="points">${t.score}%</span></a>`).join('')}</div>` : empty("Hali test topshirilmagan", 'quiz')}</div>`;
  const certs = p.groups.filter((g) => g.certificate);
  const certCard = certs.length ? `<div class="card">${cardHead('award', 'Sertifikatlar')}<div class="list">${certs.map((g) => `<a class="li" href="#/cert/${esc(g.certificate)}"><div class="ni-ico t-amber">${ic('award')}</div><div class="grow"><div class="t">${esc(g.course_title)}</div><div class="s mono">${esc(g.certificate)}</div></div>${ic('right')}</a>`).join('')}</div></div>` : '';
  let pay = '';
  if (p.payments) {
    const debt = (p.debt || []).filter((x) => x.debt > 0);
    pay = `<div class="card">${cardHead('wallet', "To'lovlar")}
      ${debt.length ? debt.map((x) => `<div class="li" style="border-color:rgba(251,113,133,.4);margin-bottom:8px">${ic('alert')}<div class="grow"><div class="t">Bu oy uchun qarz: ${money(x.debt)}</div><div class="s">${esc(x.group_name)} · oylik ${money(x.price)}</div></div></div>`).join('') : (p.groups.some((g) => g.price) ? `<div class="li" style="margin-bottom:8px">${ic('checkCircle')}<div class="grow t">Bu oy uchun to'langan</div></div>` : '')}
      ${p.payments.length ? `<div class="list">${p.payments.map((x) => `<div class="li"><div class="grow"><div class="t">${monthName(x.month)}</div><div class="s">${esc(x.group_name || '')} · ${METHODS[x.method] || ''} · ${fmtDate(x.created_at)}</div></div><b class="nowrap">${money(x.amount)}</b></div>`).join('')}</div>` : empty("To'lovlar tarixi bo'sh", 'wallet')}</div>`;
  }
  const recent = `<div class="card">${cardHead('upload', "So'nggi topshiriqlar")}${p.recent.length ? `<div class="list">${p.recent.map((r) => `<a class="li" href="#/groups/${r.group_id}/lessons/${r.lesson_id}"><div class="grow"><div class="t">${esc(r.lesson)}</div><div class="s">${esc(r.group_name)} · ${ago(r.submitted_at)}</div></div>${r.score !== null ? `<span class="points">${r.score}</span>` : ''}${badge(r.status)}</a>`).join('')}</div>` : empty("Hali topshiriq yo'q")}</div>`;
  return { u, groups, tests, certCard, pay, recent };
}

async function viewStudent(uid) {
  const p = await api('GET', `/api/users/${uid}/profile`);
  const s = profileSections(p), u = p.user;
  layout(`<div class="crumbs"><a href="${state.user.role === 'admin' ? '#/users' : '#/groups'}">${state.user.role === 'admin' ? 'Foydalanuvchilar' : 'Guruhlar'}</a>${ic('right')}<span>${esc(u.name)}</span></div>
    <div class="card hero"><div class="av-edit" id="avEdit">${avatar(u.name, u.id, 'xl', u.role, u.avatar)}</div>
      <div class="grow"><h1 style="font-size:1.5rem">${esc(u.name)}</h1><div class="row small muted" style="margin-top:4px"><span class="role-${u.role}">${ROLE[u.role]}</span>·<span class="mono">${esc(u.login)}</span>${u.phone ? `·<a href="tel:${esc(u.phone)}">${ic('phone')} ${esc(u.phone)}</a>` : ''}·<span>${fmtDate(u.created_at)} dan</span></div>${state.user.role === 'admin' ? '<div class="row" id="avActions" style="margin-top:10px"></div>' : ''}</div>
      ${u.role === 'student' && state.user.role !== 'parent' ? `<button class="btn" id="coinBtn">${ic('coin')}Coin berish</button>` : ''}${state.user.role === 'admin' && u.role === 'student' ? `<button class="btn primary" id="payBtn">${ic('wallet')}To'lov qabul qilish</button>` : ''}</div>
    <div id="linksBox"></div>
    ${u.role === 'parent' ? '' : `<h2 class="sec-title">${ic('layers')}Guruhlari</h2>${s.groups}`}
    <div class="grid half section">${s.recent}<div>${s.tests}${s.certCard ? `<div style="margin-top:18px">${s.certCard}</div>` : ''}</div></div>
    ${s.pay ? `<div class="section">${s.pay}</div>` : ''}`);
  if (state.user.role === 'admin') bindAvatarEdit(`/api/users/${u.id}/avatar`, !!u.avatar, (url) => { if (u.id === state.user.id) state.user.avatar = url; viewStudent(uid); });
  if (state.user.role === 'admin' && (u.role === 'student' || u.role === 'parent')) {
    const L = await api('GET', `/api/users/${u.id}/links`);
    const list = u.role === 'parent' ? L.children : L.parents;
    $('#linksBox').innerHTML = `<div class="card section">${cardHead('heart', u.role === 'parent' ? 'Farzandlari' : 'Ota-onasi', u.role === 'student' ? `<button class="btn sm primary" id="mkParent">${ic('plus')}Ota-ona hisobini yaratish</button>` : '')}
      ${list.length ? `<div class="list">${list.map((x) => `<a class="li" href="#/students/${x.id}">${avatar(x.name, x.id, 'sm', u.role === 'parent' ? 'student' : 'parent', x.avatar)}<div class="grow"><div class="t">${esc(x.name)}</div><div class="s mono">${esc(x.login)}${x.phone ? ' · ' + esc(x.phone) : ''}</div></div>${ic('right')}</a>`).join('')}</div>`
        : `<div class="muted small">${u.role === 'parent' ? "Farzand bog'lanmagan — «Foydalanuvchilar»da tahrirlab tanlang" : "Ota-ona hisobi yo'q. Tugma bilan yarating — login va parol chiqadi"}</div>`}</div>`;
    const mp = $('#mkParent');
    if (mp) mp.onclick = () => modal('Ota-ona hisobi', `<label class="f"><span>Ota-ona ismi</span><input name="name" placeholder="${esc(u.name)}ning ota-onasi" required></label><label class="f"><span>Telefon</span><input name="phone" placeholder="+998 ..."></label>`,
      async (form, close) => { const r2 = await api('POST', `/api/users/${u.id}/parent`, formData(form)); close(); showCreds([r2.created]); viewStudent(uid); }, 'Yaratish');
  }
  const cb = $('#coinBtn'); if (cb) cb.onclick = () => coinForm(u);
  const pb = $('#payBtn'); if (pb) pb.onclick = () => paymentForm({ student_id: u.id, group_id: p.groups[0]?.id, amount: p.groups[0]?.price || '' }, todayStr().slice(0, 7));
}

// ------------------------------------------------------------------ sertifikat (ochiq sahifa)
async function viewCert(code) {
  let c;
  try { c = (await api('GET', `/api/certificates/${encodeURIComponent(code)}`)).certificate; }
  catch (e) { $('#app').innerHTML = `<div class="login-wrap"><div class="card login">${empty(esc(e.message), 'alert')}<a class="btn" href="#/" style="margin-top:14px">Bosh sahifa</a></div></div>`; return; }
  const d = parseUtc(c.issued_at);
  $('#app').innerHTML = `<div class="cert-wrap">
    <div class="cert-tools no-print"><a class="btn" href="#/">${ic('left')}Platforma</a><button class="btn primary" onclick="window.print()">${ic('printer')}Chop etish / PDF</button></div>
    <div class="cert"><div class="cert-in">
      <img src="/img/yuksalish-logo.png" alt="" class="cert-logo">
      <div class="cert-brand">yuksalish.dev</div>
      <div class="cert-title">SERTIFIKAT</div>
      <div class="cert-sub">Ushbu sertifikat</div>
      <div class="cert-name">${esc(c.student)}</div>
      <div class="cert-text">ga <b>«${esc(c.course)}»</b> kursini (${c.lessons} ta dars) muvaffaqiyatli tamomlagani uchun berildi.</div>
      <div class="cert-foot">
        <div><div class="cert-line">${d.getDate()}-${MONTHS_FULL[d.getMonth()]} ${d.getFullYear()}</div><span>Berilgan sana</span></div>
        <div class="cert-seal">${ic('award')}</div>
        <div><div class="cert-line">${esc(c.teacher || '—')}</div><span>O'qituvchi</span></div>
      </div>
      <div class="cert-code">ID: ${esc(c.code)} · Haqiqiyligini tekshirish: ${esc(location.origin)}/#/cert/${esc(c.code)}</div>
    </div></div></div>`;
}

// ------------------------------------------------------------------ guruhlar arxivi (administrator)
async function viewArchive() {
  const [{ groups }, { groups: act }] = await Promise.all([api('GET', '/api/groups-archive'), api('GET', '/api/groups')]);
  layout(`<div class="page-head"><div><h1>Guruhlar</h1><p>O'chirilgan guruhlar arxivi</p></div></div>
    <div class="tabs"><a href="#/groups">${ic('users')}Faol guruhlar (${act.length})</a><a href="#/groups/archive" class="active">${ic('trash')}Arxiv (${groups.length})</a></div>
    <div class="card">${groups.length ? `<div class="table-wrap"><table><tr><th>Guruh</th><th>O'qituvchi</th><th>Kim o'chirdi</th><th>Qachon</th><th>Ma'lumotlar</th><th></th></tr>
      ${groups.map((g) => `<tr><td class="click" data-href="#/groups/${g.id}" style="cursor:pointer"><b>${esc(g.name)}</b><div class="small muted">${esc(g.course_title)}</div></td>
        <td class="small">${esc(g.teacher_name || '—')}</td>
        <td><div class="user-cell">${avatar(g.deleted_by_name || '?', 0, 'sm', g.deleted_by_role || 'admin')}<div>${esc(g.deleted_by_name || '—')}<div class="small role-${g.deleted_by_role}">${ROLE[g.deleted_by_role] || ''}</div></div></div></td>
        <td class="small">${fmtDate(g.deleted_at, true)}<div class="muted">${ago(g.deleted_at)}</div></td>
        <td class="small">${g.student_count} o'quvchi · ${g.submission_count} topshiriq</td>
        <td class="nowrap" style="text-align:right"><button class="btn sm success" data-restore="${g.id}">${ic('refresh')}Tiklash</button> <button class="btn sm danger" data-purge="${g.id}" title="Butunlay o'chirish">${ic('trash')}</button></td></tr>`).join('')}
      </table></div>` : empty("Arxiv bo'sh — o'chirilgan guruh yo'q", 'trash')}</div>
    <p class="hint" style="margin-top:12px">O'chirilgan guruhning darslari, topshiriqlari, baholari va davomati arxivda saqlanadi. «Tiklash» bosilsa, guruh avvalgi holatiga qaytadi.</p>`);
  $$('[data-restore]').forEach((b) => { b.onclick = async () => { await api('POST', `/api/groups/${b.dataset.restore}/restore`); toast('Guruh tiklandi'); viewArchive(); }; });
  $$('[data-purge]').forEach((b) => {
    b.onclick = async () => {
      const g = groups.find((x) => x.id === Number(b.dataset.purge));
      if (!confirm(`«${g.name}» butunlay o'chiriladi: barcha topshiriqlar, baholar va davomat bilan. Buni qaytarib bo'lmaydi. Davom etasizmi?`)) return;
      await api('DELETE', `/api/groups/${g.id}`); toast("Butunlay o'chirildi"); viewArchive();
    };
  });
}

// ------------------------------------------------------------------ faoliyat tarixi (administrator)
const ACT = {
  create: ['ok', 'yaratdi'], update: ['info', "o'zgartirdi"], delete: ['bad', "o'chirdi"], restore: ['ok', 'tikladi'],
  purge: ['bad', "butunlay o'chirdi"], students: ['info', "o'quvchilarini o'zgartirdi"],
};
const ENT = { group: ['users', 'guruh'], user: ['user', 'foydalanuvchi'], payment: ['wallet', "to'lov"], test: ['quiz', 'test'], certificate: ['award', 'sertifikat'] };
async function viewActivity(role = '', entity = '') {
  const { items } = await api('GET', `/api/activity?role=${role}&entity=${entity}`);
  // kun bo'yicha guruhlash
  const byDay = {};
  for (const it of items) { const d = parseUtc(it.created_at); const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; (byDay[k] = byDay[k] || []).push(it); }
  const dayLabel = (k) => (k === todayStr() ? 'Bugun' : daysBetween(k, todayStr()) === 1 ? 'Kecha' : fmtDate(k));
  layout(`<div class="page-head"><div><h1>Faoliyat tarixi</h1><p>Kim, qachon va nima qilgani</p></div></div>
    <div class="row" style="margin-bottom:16px">
      <div class="tabs" style="margin:0">${[['', 'Hammasi'], ['teacher', "O'qituvchilar"], ['admin', 'Administratorlar']].map(([r, t]) => `<button data-r="${r}" class="${r === role ? 'active' : ''}">${t}</button>`).join('')}</div>
      <span class="spacer"></span>
      <select id="entSel" style="width:auto;min-width:200px"><option value="">Barcha amallar</option>${Object.entries(ENT).map(([k, [, t]]) => `<option value="${k}" ${k === entity ? 'selected' : ''}>${t.replace(/^./, (c) => c.toUpperCase())}lar</option>`).join('')}</select></div>
    ${items.length ? Object.entries(byDay).map(([day, list]) => `<div class="fs-title" style="margin-top:18px">${dayLabel(day)}</div>
      <div class="card" style="padding:8px"><div class="list">${list.map((it) => {
        const [tone, verb] = ACT[it.action] || ['', it.action];
        const [icon, noun] = ENT[it.entity] || ['clock', it.entity];
        const link = it.entity === 'group' && it.entity_id && it.action !== 'purge' ? `#/groups/${it.action === 'delete' ? 'archive' : it.entity_id}` : '';
        return `<${link ? `a href="${link}"` : 'div'} class="li act">${avatar(it.user_name || '?', it.user_id || 0, 'sm', it.user_role || 'admin')}
          <div class="grow"><div class="t"><b>${esc(it.user_name || 'Tizim')}</b> <span class="muted">${noun}</span> ${it.title ? `«${esc(it.title)}»` : ''} <span class="chip ${tone}">${verb}</span></div>
          ${it.details ? `<div class="s">${esc(it.details)}</div>` : ''}</div>
          <span class="act-ico">${ic(icon)}</span><span class="small muted nowrap">${fmtDate(it.created_at, true).split(', ')[1] || ''}</span></${link ? 'a' : 'div'}>`;
      }).join('')}</div></div>`).join('') : empty("Hali faoliyat yozilmagan. Endi guruh, foydalanuvchi, to'lov va testlar bilan qilingan har bir amal shu yerda ko'rinadi.", 'clock')}`);
  $$('[data-r]').forEach((b) => { b.onclick = () => viewActivity(b.dataset.r, $('#entSel').value); });
  $('#entSel').onchange = (e) => viewActivity(role, e.target.value);
}

// ------------------------------------------------------------------ dars jadvali (barcha guruhlar, 4 hafta)
const WEEKDAYS_FULL = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
async function viewSchedule(fromArg, groupFilter = '') {
  // haftaning dushanbasidan boshlaymiz
  const base = new Date((fromArg && /^\d{4}-\d{2}-\d{2}$/.test(fromArg) ? fromArg : todayStr()) + 'T00:00:00');
  base.setDate(base.getDate() - ((base.getDay() + 6) % 7));
  const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const from = ymd(base);
  const shift = (w) => { const d = new Date(base); d.setDate(d.getDate() + w * 7); return ymd(d); };
  const [{ items }, { groups }] = await Promise.all([api('GET', `/api/schedule?from=${from}&days=28`), api('GET', '/api/groups')]);
  const list = groupFilter ? items.filter((x) => String(x.group_id) === String(groupFilter)) : items;
  const end = new Date(base); end.setDate(end.getDate() + 27);
  const byDay = {};
  for (const it of list) (byDay[it.date] = byDay[it.date] || []).push(it);
  const t = todayStr(), u = state.user;

  // haftalar bo'yicha bloklar
  let weeks = '';
  for (let w = 0; w < 4; w++) {
    const ws = new Date(base); ws.setDate(ws.getDate() + w * 7);
    const we = new Date(ws); we.setDate(we.getDate() + 6);
    let days = '';
    for (let i = 0; i < 7; i++) {
      const d = new Date(ws); d.setDate(d.getDate() + i);
      const k = ymd(d), arr = byDay[k] || [];
      if (!arr.length) continue;
      days += `<div class="sched-day ${k === t ? 'is-today' : ''} ${k < t ? 'is-past' : ''}">
        <div class="sched-date"><b>${d.getDate()}</b><span>${WEEKDAYS_FULL[d.getDay()]}</span>${k === t ? '<em>bugun</em>' : ''}</div>
        <div class="list grow">${arr.map((r) => {
          const open = r.opened || r.date <= t;
          return `<a class="li" href="#/groups/${r.group_id}/lessons/${r.lesson_id}">
            <span class="li-time">${ic('clock')}${esc(r.time || '—')}</span>
            <div class="grow"><div class="t"><span class="num">${String(r.num).padStart(2, '0')}</span>${esc(r.lesson)}${r.tag ? `<span class="tag">${esc(r.tag)}</span>` : ''}</div>
              <div class="s">${esc(r.group_name)} · ${esc(r.module_title)}</div></div>
            ${u.role !== 'student' ? (open ? '<span class="chip ok">ochiq</span>' : '<span class="chip">yopiq</span>') : ''}</a>`;
        }).join('')}</div></div>`;
    }
    weeks += `<div class="fs-title" style="margin-top:${w ? 22 : 4}px">${ws.getDate()} ${MONTHS[ws.getMonth()]} — ${we.getDate()} ${MONTHS[we.getMonth()]}${t >= ymd(ws) && t <= ymd(we) ? ' · shu hafta' : ''}</div>
      ${days ? `<div class="card sched-week">${days}</div>` : `<div class="empty small" style="padding:14px">Bu haftada dars yo'q</div>`}`;
  }

  layout(`<div class="page-head"><div><h1>Dars jadvali</h1><p>${base.getDate()} ${MONTHS_FULL[base.getMonth()]} — ${end.getDate()} ${MONTHS_FULL[end.getMonth()]} · ${list.length} ta dars</p></div>
      <div class="row"><a class="btn" href="#/schedule/${shift(-4)}" title="Oldingi 4 hafta">${ic('left')}</a><a class="btn" href="#/schedule">Bugun</a><a class="btn" href="#/schedule/${shift(4)}" title="Keyingi 4 hafta">${ic('right')}</a></div></div>
    ${groups.length > 1 ? `<div class="row" style="margin-bottom:6px"><select id="schedGroup" style="width:auto;min-width:240px"><option value="">Barcha guruhlar</option>${groups.filter((g) => g.active).map((g) => `<option value="${g.id}" ${String(g.id) === String(groupFilter) ? 'selected' : ''}>${esc(g.name)}</option>`).join('')}</select></div>` : ''}
    ${groups.length ? weeks : empty(u.role === 'student' ? 'Siz hali guruhga biriktirilmagansiz' : "Faol guruh yo'q — avval guruh oching", 'calendar')}`);
  const sg = $('#schedGroup'); if (sg) sg.onchange = () => viewSchedule(from, sg.value);
}

// ------------------------------------------------------------------ coinlarim
async function viewCoins() {
  const d = await api('GET', '/api/coins/me');
  state.coins = d.balance;
  const spent = Math.max(0, d.earned - d.balance);
  const RULE = { submission: ['t-green', 'checkCircle', '÷10'], test: ['t-violet', 'quiz', '÷10'], attendance: ['t-blue', 'calendar', '+2'], manual: ['t-amber', 'star', '+1…100'] };
  const groups = {};
  for (const h of d.history) {
    const dt = parseUtc(h.created_at), k = `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
    (groups[k] = groups[k] || []).push(h);
  }
  const dayLabel = (k) => (k === todayStr() ? 'Bugun' : daysBetween(k, todayStr()) === 1 ? 'Kecha' : fmtDate(k));
  const hIcon = (h) => (h.amount < 0 ? ['t-rose', 'bag'] : /Test/.test(h.reason) ? ['t-violet', 'quiz'] : /Darsga/.test(h.reason) ? ['t-blue', 'calendar'] : /Yutuq/.test(h.reason) ? ['t-amber', 'award'] : /Vazifa/.test(h.reason) ? ['t-green', 'checkCircle'] : ['t-amber', 'star']);
  layout(`<section class="cw-hero">
      <div class="cw-top"><span>Balansingiz</span><a href="#/market" class="cw-mk">${ic('gift')}Market</a></div>
      <div class="cw-bal"><span class="cw-coin"></span><b>${Number(d.balance).toLocaleString('ru-RU')}</b><small>coin</small></div>
      <div class="cw-stats"><div><em>Jami yig'ilgan</em><b>+${d.earned}</b></div><div><em>Sarflangan</em><b>${spent ? '−' + spent : 0}</b></div></div>
    </section>
    <div class="set-title">Coin qanday yig'iladi</div>
    <div class="cw-rules">${d.rules.map((r) => { const [tone, icon, val] = RULE[r.key] || ['t-blue', 'coin', '']; return `<div class="cw-rule ${tone}"><span class="cw-ri">${ic(icon)}</span><b>${esc(r.text)}</b><em>${esc(r.value)}</em></div>`; }).join('')}</div>
    <div class="set-title">Tarix</div>
    ${d.history.length ? Object.entries(groups).map(([k, list]) => `<div class="cw-day">${dayLabel(k)}</div><div class="rk-list">${list.map((h) => { const [tone, icon] = hIcon(h); return `<div class="rk-row"><span class="ni-ico ${tone}">${ic(icon)}</span>
        <div class="grow"><div class="t">${esc(h.reason || '')}</div><div class="s">${fmtDate(h.created_at, true).split(', ')[1] || ''}</div></div>
        <b class="cw-amt ${h.amount > 0 ? 'plus' : 'minus'}">${h.amount > 0 ? '+' : '−'}${Math.abs(h.amount)}</b></div>`; }).join('')}</div>`).join('')
      : empty("Hali coin yo'q. Vazifalarni topshiring va darslarga qatnashing!", 'coin')}`);
}

// ------------------------------------------------------------------ market
async function viewMarket(tab = 'items') {
  const d = await api('GET', '/api/market');
  const u = state.user, admin = u.role === 'admin';
  if (u.role === 'student') state.coins = d.balance;
  const ORD = { kutilmoqda: ['warn', 'Kutilmoqda'], berildi: ['ok', 'Topshirildi'], bekor: ['bad', 'Bekor qilindi'] };
  const itemCard = (it) => {
    const left = it.stock === null ? null : Math.max(0, it.stock - it.sold);
    const need = u.role === 'student' ? it.price - d.balance : 0;
    return `<div class="m-item ${!it.active ? 'off' : ''}">
      <div class="m-img">${it.image ? `<img src="${esc(it.image)}" alt="" loading="lazy">` : ic('gift')}</div>
      <div class="m-body"><h3>${esc(it.title)}</h3>${it.description ? `<p>${esc(it.description)}</p>` : ''}
        <div class="m-foot">${coinHtml(it.price)}<span class="small muted">${left === null ? '' : left ? `${left} ta qoldi` : 'tugagan'}</span></div>
        ${u.role === 'student' ? `<button class="btn ${need > 0 || left === 0 ? '' : 'primary'} m-buy" data-buy="${it.id}" ${need > 0 || left === 0 ? 'disabled' : ''}>${left === 0 ? 'Tugagan' : need > 0 ? `Yana ${need} coin kerak` : `${ic('bag')}Sotib olish`}</button>` : ''}
        ${admin ? `<div class="row" style="margin-top:10px">${!it.active ? '<span class="chip">yashirin</span>' : ''}<span class="small muted">${it.sold} ta sotilgan</span><span class="spacer"></span><button class="icon-btn sm" data-edit-item="${it.id}" title="Tahrirlash">${ic('edit')}</button><button class="icon-btn sm danger-h" data-del-item="${it.id}" title="O'chirish">${ic('trash')}</button></div>` : ''}
      </div></div>`;
  };
  const orderRow = (o) => `<div class="li">${admin ? avatar(o.student, o.student_id, 'sm', 'student', o.student_avatar) : `<div class="ni-ico t-amber">${ic('gift')}</div>`}
    <div class="grow"><div class="t">${admin ? `${esc(o.student)} — ` : ''}${esc(o.title)}</div><div class="s">${admin && o.group_name ? esc(o.group_name) + ' · ' : ''}${fmtDate(o.created_at, true)}</div></div>
    ${coinHtml(o.price)}<span class="chip ${ORD[o.status][0]}">${ORD[o.status][1]}</span>
    ${admin && o.status === 'kutilmoqda' ? `<button class="btn sm success" data-ord="${o.id}" data-st="berildi">${ic('check')}Topshirildi</button><button class="btn sm ghost" data-ord="${o.id}" data-st="bekor">Bekor</button>` : ''}</div>`;
  const pendingN = d.orders.filter((o) => o.status === 'kutilmoqda').length;

  let body;
  if (admin && tab === 'orders') {
    body = `<div class="card" style="padding:8px">${d.orders.length ? `<div class="list">${d.orders.map(orderRow).join('')}</div>` : empty("Hali buyurtma yo'q", 'bag')}</div>`;
  } else {
    body = d.items.length ? `${u.role === 'student' ? '<div class="set-title">Sovg\'alar</div>' : ''}<div class="m-grid">${d.items.map(itemCard).join('')}</div>` : (admin ? empty("Marketda mahsulot yo'q. «Mahsulot qo'shish» tugmasini bosing.", 'gift') : `<div class="mk-empty"><div class="mk-empty-ico">${ic('gift')}</div><h3>Sovg'alar tez orada</h3><p>Administrator marketga sovg'alar qo'shganda shu yerda paydo bo'ladi. Hozircha coin yig'ishda davom eting!</p>
      <div class="mk-hints"><a href="#/coins">${ic('coin')}<span>Coin qanday yig'iladi</span>${ic('right')}</a><a href="#/achievements">${ic('award')}<span>Yutuqlar · +10 coin</span>${ic('right')}</a></div></div>`);
    if (u.role === 'student' && d.orders.length) body += `<div class="fs-title" style="margin-top:22px">Buyurtmalarim</div><div class="card" style="padding:8px"><div class="list">${d.orders.map(orderRow).join('')}</div></div>`;
  }
  layout(`${u.role === 'student' ? '' : `<div class="page-head"><div><h1>Market</h1><p>Coin evaziga beriladigan sovg'alar</p></div>
      ${admin ? `<button class="btn primary" id="newItem">${ic('plus')}Mahsulot qo'shish</button>` : ''}</div>`}
    ${u.role === 'student' ? `<section class="mk-hero"><div class="mk-text"><span>Market</span><h1>Coinlaringizni<br>sovg'alarga almashtiring</h1>
      <a href="#/coins" class="mk-bal"><span class="cw-coin sm"></span><b>${Number(d.balance).toLocaleString('ru-RU')}</b><em>coin</em>${ic('right')}</a></div><div class="mk-art">${ic('gift')}</div></section>` : ''}
    ${admin ? `<div class="tabs"><a href="#/market" class="${tab !== 'orders' ? 'active' : ''}">${ic('gift')}Mahsulotlar (${d.items.length})</a><a href="#/market/orders" class="${tab === 'orders' ? 'active' : ''}">${ic('bag')}Buyurtmalar${pendingN ? ` <span class="chip warn">${pendingN}</span>` : ''}</a></div>` : ''}
    ${body}`);

  $$('[data-buy]').forEach((b) => {
    b.onclick = async () => {
      const it = d.items.find((x) => x.id === Number(b.dataset.buy));
      if (!confirm(`«${it.title}» — ${it.price} coin. Sotib olasizmi?`)) return;
      try { const r = await api('POST', '/api/market/buy', { item_id: it.id }); state.coins = r.balance; toast("Buyurtma qabul qilindi! Administrator sovg'ani topshiradi."); viewMarket(); }
      catch (e) { toast(e.message, true); }
    };
  });
  if (admin) {
    $('#newItem').onclick = () => itemForm();
    $$('[data-edit-item]').forEach((b) => { b.onclick = () => itemForm(d.items.find((x) => x.id === Number(b.dataset.editItem))); });
    $$('[data-del-item]').forEach((b) => {
      b.onclick = async () => {
        if (!confirm("Mahsulot o'chirilsinmi? (Sotilgan bo'lsa — yashiriladi)")) return;
        const r = await api('DELETE', `/api/market/items/${b.dataset.delItem}`); toast(r.hidden ? 'Mahsulot yashirildi' : "O'chirildi"); viewMarket(tab);
      };
    });
    $$('[data-ord]').forEach((b) => {
      b.onclick = async () => {
        if (b.dataset.st === 'bekor' && !confirm("Buyurtma bekor qilinadi va coin o'quvchiga qaytariladi. Davom etasizmi?")) return;
        await api('PATCH', `/api/market/orders/${b.dataset.ord}`, { status: b.dataset.st }); toast(b.dataset.st === 'berildi' ? 'Topshirildi deb belgilandi' : 'Bekor qilindi, coin qaytarildi'); viewMarket('orders');
      };
    });
  }
}

function itemForm(it) {
  let image;
  modal(it ? 'Mahsulotni tahrirlash' : "Yangi mahsulot", `
    <div class="item-img-pick" id="imgPick">${it?.image ? `<img src="${esc(it.image)}" alt="">` : ic('gift')}<span>${ic('camera')}Rasm tanlash</span></div>
    <label class="f"><span>Nomi</span><input name="title" required maxlength="120" value="${esc(it?.title || '')}" placeholder="Masalan: Yuksalish futbolkasi"></label>
    <label class="f"><span>Tavsif (ixtiyoriy)</span><input name="description" maxlength="1000" value="${esc(it?.description || '')}" placeholder="O'lchami, rangi..."></label>
    <div class="form-grid">
      <label class="f"><span>Narxi</span><div class="suffix"><input name="price" type="number" min="1" required value="${it?.price || ''}"><em>coin</em></div></label>
      <label class="f"><span>Soni (bo'sh — cheklanmagan)</span><input name="stock" type="number" min="0" value="${it?.stock ?? ''}"></label>
    </div>
    ${it ? `<label class="switch-row"><input type="checkbox" class="switch" name="active" ${it.active ? 'checked' : ''}><span><b>Marketda ko'rinadi</b><small>O'chirilsa o'quvchilar ko'rmaydi</small></span></label>` : ''}`,
  async (form, close) => {
    const f = formData(form);
    const p = { title: f.title, description: f.description, price: Number(f.price), stock: f.stock === '' ? null : Number(f.stock) };
    if (it) p.active = !!f.active;
    if (image !== undefined) p.image = image;
    if (it) await api('PATCH', `/api/market/items/${it.id}`, p); else await api('POST', '/api/market/items', p);
    close(); toast('Saqlandi'); viewMarket();
  }, it ? 'Saqlash' : "Qo'shish");
  $('#imgPick').onclick = async () => {
    const file = await pickImage(); if (!file) return;
    try { image = await squareJpeg(file); $('#imgPick').innerHTML = `<img src="${image}" alt=""><span>${ic('camera')}Almashtirish</span>`; } catch (e) { toast(e.message, true); }
  };
}

// O'qituvchi / administrator: coin berish
function coinForm(student, after) {
  modal(`Coin: ${student.name}`, `
    <div class="form-grid">
      <label class="f"><span>Miqdor</span><select name="sign"><option value="1">+ Berish</option><option value="-1">− Ayirish</option></select></label>
      <label class="f"><span>Coin</span><input name="amount" type="number" min="1" max="100" value="5" required></label>
    </div>
    <div class="quick-amt">${[2, 5, 10, 20].map((n) => `<button type="button" class="btn sm" data-q="${n}">+${n}</button>`).join('')}</div>
    <label class="f"><span>Sabab</span><input name="reason" maxlength="200" placeholder="Masalan: darsda faol qatnashdi" required></label>
    <p class="hint">O'quvchiga bildirishnoma boradi.</p>`,
  async (form, close) => {
    const f = formData(form);
    await api('POST', '/api/coins', { student_id: student.id, amount: Number(f.amount) * Number(f.sign), reason: f.reason });
    close(); toast('Coin saqlandi'); if (after) after();
  }, 'Saqlash');
  $$('[data-q]').forEach((b) => { b.onclick = () => { $('input[name=amount]').value = b.dataset.q; $('select[name=sign]').value = '1'; }; });
}

// ------------------------------------------------------------------ ilovani o'rnatish (PWA)
let installEvt = null;
window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); installEvt = e; const b = $('#installApp'); if (b) b.hidden = false; });
if ('serviceWorker' in navigator) window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js').catch(() => {}); });
const isStandalone = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
function installCard() {
  let hidden = false; try { hidden = localStorage.getItem('yd-install-hide') === '1'; } catch { /* yo'q */ }
  if (isStandalone() || hidden) return '';
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
  return `<div class="install-card" id="installCard"><span class="ic-ico">${ic('smartphone')}</span><div class="grow"><b>Ilovani o'rnating</b>
    <span>${ios ? "«Ulashish» → «Bosh ekranga qo'shish»" : "Bosh ekrandan bir bosishda oching"}</span></div>
    ${ios ? '' : `<button class="btn primary sm" id="installApp" ${installEvt ? '' : 'hidden'}>O'rnatish</button>`}
    <button class="icon-btn sm" id="installHide" title="Yopish">${ic('x')}</button></div>`;
}
function bindInstall() {
  const h = $('#installHide');
  if (h) h.onclick = () => { try { localStorage.setItem('yd-install-hide', '1'); } catch { /* jim */ } $('#installCard').remove(); };
  const b = $('#installApp');
  if (b) b.onclick = async () => { if (!installEvt) return; installEvt.prompt(); await installEvt.userChoice; installEvt = null; b.hidden = true; };
}

// ------------------------------------------------------------------ gamifikatsiya: daraja, seriya, yutuqlar
// Har bir daraja uchun karta dizayni: img/levels/level-N.* bo'lsa — rasm, bo'lmasa — darajaga xos rang
const lvlClass = (n) => `lvl-${Math.max(1, Math.min(10, n))}`;
const lvlStyle = (n) => { const img = state.assets && state.assets.levels[Math.min(n, 10)]; return img ? `style="--lv-img:url('${img}')"` : ''; };
function celebrateLevel(L) {
  const key = `yd-lvl-${state.user.id}`;
  let prev = null; try { prev = Number(localStorage.getItem(key)) || null; localStorage.setItem(key, String(L.level)); } catch { /* jim */ }
  if (!prev || L.level <= prev) return;
  modal('Yangi daraja!', `<div class="lvlup ${lvlClass(L.level)} ${lvlStyle(L.level) ? 'has-img' : ''}" ${lvlStyle(L.level)}><span>${ic('trophy')}</span><b>${L.level}-daraja</b><em>${esc(L.name)}</em></div>
    <p style="text-align:center;margin-top:14px">Tabriklaymiz! Kartangiz yangi dizaynga o'tdi. Davom eting — keyingi darajagacha ${L.next - L.xp} XP.</p>`, null);
}
function levelCard(g, compact) {
  const L = g.level, S = g.streak;
  return `<a class="card level-card ${compact ? 'compact' : ''}" href="#/achievements">
    <div class="lvl-badge"><span>Daraja</span><b>${L.level}</b></div>
    <div class="grow"><div class="lvl-name">${esc(L.name)}</div>
      <div class="xp-bar"><i style="width:${L.pct}%"></i></div>
      <div class="s">${L.xp} / ${L.next} XP · keyingi darajaga ${L.next - L.xp} XP</div></div>
    <div class="streak ${S.today ? 'on' : ''}" title="Ketma-ket faol kunlar">${ic('flame')}<b>${S.current}</b><span>kun</span></div>
    ${compact ? `<div class="badge-mini">${ic('award')}<b>${g.earned_count}</b><span>/${g.badges.length}</span></div>` : ''}</a>`;
}
const badgeHtml = (b) => `<div class="bdg ${b.earned ? 'got' : ''}" title="${esc(b.desc)}">
  <div class="bdg-ico ${state.assets && state.assets.badges[b.key] ? 'has-img' : ''}">${state.assets && state.assets.badges[b.key] ? `<img src="${esc(state.assets.badges[b.key])}" alt="">` : ic(b.icon)}</div><b>${esc(b.title)}</b><span>${esc(b.desc)}</span>
  ${b.earned ? '<em class="chip ok">olindi</em>' : `<div class="bar"><i style="width:${Math.round((b.value / b.goal) * 100)}%"></i></div><small>${b.value} / ${b.goal}</small>`}</div>`;

async function viewAchievements() {
  const g = await api('GET', '/api/game/me');
  refreshUnread();
  const got = g.badges.filter((b) => b.earned), rest = g.badges.filter((b) => !b.earned);
  layout(`<div class="page-head"><div><h1>Yutuqlar</h1><p>Daraja oshiring, seriyani uzmang, nishonlar yig'ing</p></div></div>
    ${levelCard(g)}
    <div class="stats section">
      ${stat('amber', 'flame', `${g.streak.current} kun`, 'Joriy seriya', g.streak.today ? 'bugun faol bo\'ldingiz' : "bugun hali faollik yo'q")}
      ${stat('rose', 'trophy', `${g.streak.best} kun`, 'Eng uzun seriya')}
      ${stat('violet', 'award', `${got.length} / ${g.badges.length}`, 'Nishonlar', `har biri +${g.bonus} coin`)}
    </div>
    ${got.length ? `<div class="fs-title">Olingan nishonlar</div><div class="bdg-grid">${got.map(badgeHtml).join('')}</div>` : ''}
    <div class="fs-title" style="margin-top:20px">Keyingi maqsadlar</div><div class="bdg-grid">${rest.map(badgeHtml).join('') || '<div class="muted">Barcha nishonlar olingan — ajoyib!</div>'}</div>
    <p class="hint" style="margin-top:14px">Seriya — coin olgan ketma-ket kunlar soni (vazifa, test yoki darsga kelish). XP — jami yig'ilgan coinlar.</p>`);
}

// ------------------------------------------------------------------ profil
async function viewProfile() {
  const u = state.user, st = u.role === 'student';
  const [p, g] = st ? await Promise.all([api('GET', `/api/users/${u.id}/profile`).catch(() => null), api('GET', '/api/game/me').catch(() => null)]) : [null, null];
  const row = (icon, label, value, extra = '') => `<div class="set-row" ${extra}><span class="set-ico">${ic(icon)}</span><span class="set-l">${label}</span><span class="set-v">${value}</span></div>`;
  const btnRow = (icon, label, attrs, cls = '', value = '') => `<button type="button" class="set-row ${cls}" ${attrs}><span class="set-ico">${ic(icon)}</span><span class="set-l">${label}</span>${value ? `<span class="set-v">${value}</span>` : ''}${cls.includes('danger') ? '' : `<span class="set-go">${ic('right')}</span>`}</button>`;
  const canInstall = st && !isStandalone();
  const s = p ? profileSections(p) : null;
  layout(`
    <section class="pf-hero ${g ? lvlClass(g.level.level) : ''} ${g && lvlStyle(g.level.level) ? 'has-img' : ''}" ${g ? lvlStyle(g.level.level) : ''}>
      <div class="av-edit pf-av" id="avEdit">${avatar(u.name, u.id, 'xl', u.role, u.avatar)}</div>
      <h1>${esc(u.name)}</h1>
      <div class="pf-sub"><span class="pf-role role-${dispRole(u)}">${ic(ROLE_ICON[dispRole(u)])}${ROLE[dispRole(u)]}</span><span class="pf-login">@${esc(u.login)}</span></div>
      ${g ? `<div class="pf-stats">
        <a href="#/coins">${coinHtml(state.coins ?? 0)}<small>Coin</small></a>
        <a href="#/achievements"><b>${g.level.level}</b><small>Daraja</small></a>
        <a href="#/achievements"><b>${g.earned_count}</b><small>Nishon</small></a>
        <a href="#/achievements" class="${g.streak.today ? 'fire' : ''}"><b>${ic('flame')}${g.streak.current}</b><small>Seriya</small></a></div>` : ''}
    </section>
    <div class="pf-cols">
      <div>
        <div class="set-title">Shaxsiy ma'lumotlar</div>
        <div class="set-group">
          ${row('user', 'Ism', esc(u.name))}
          ${row('key', 'Login', `<span class="mono">${esc(u.login)}</span>`)}
          ${row('phone', 'Telefon', esc(u.phone || '—'))}
          ${row('calendar', "Ro'yxatdan o'tgan", fmtDate(u.created_at))}
        </div>
        <div class="set-title">Hisob</div>
        <div class="set-group">
          ${btnRow('camera', 'Profil rasmi', 'data-av-up', '', u.avatar ? "O'zgartirish" : 'Yuklash')}
          ${u.avatar ? btnRow('trash', "Rasmni o'chirish", 'data-av-del') : ''}
          ${btnRow('lock', "Parolni o'zgartirish", 'id="pwBtn"')}
          ${canInstall ? btnRow('smartphone', "Ilovani o'rnatish", 'id="installRow"', '', /iphone|ipad|ipod/i.test(navigator.userAgent) ? 'Ulashish → Bosh ekran' : '') : ''}
          ${btnRow('logout', 'Chiqish', 'id="logoutRow"', 'danger')}
        </div>
      </div>
      <div>
        ${s && s.pay ? s.pay : ''}
        ${s && s.certCard ? s.certCard : ''}
        ${s ? s.tests : ''}
      </div>
    </div>`);
  bindAvatarEdit('/api/me/avatar', !!u.avatar, (url) => { state.user.avatar = url; viewProfile(); });
  $('#pwBtn').onclick = () => modal("Parolni o'zgartirish", `
      <label class="f"><span>Joriy parol</span><input type="password" name="current" required autocomplete="current-password"></label>
      <label class="f"><span>Yangi parol (kamida 6 belgi)</span><input type="password" name="next" required minlength="6" autocomplete="new-password"></label>`,
    async (form, close) => { await api('POST', '/api/me/password', formData(form)); close(); toast("Parol o'zgartirildi"); });
  $('#logoutRow').onclick = async () => { if (!confirm('Hisobdan chiqasizmi?')) return; await api('POST', '/api/logout').catch(() => {}); state.user = null; go('#/login'); };
  const ir = $('#installRow');
  if (ir) ir.onclick = async () => {
    if (installEvt) { installEvt.prompt(); await installEvt.userChoice; installEvt = null; return; }
    toast(/iphone|ipad|ipod/i.test(navigator.userAgent) ? "Safari: «Ulashish» → «Bosh ekranga qo'shish»" : "Brauzer menyusidan «Ilovani o'rnatish» ni tanlang");
  };
}

// ------------------------------------------------------------------ reyting (umumiy va guruh bo'yicha)
async function viewRating(scope = 'all', gid = '') {
  const d = await api('GET', `/api/leaderboard?scope=${scope}${gid ? '&group_id=' + gid : ''}`);
  const u = state.user, items = d.items;
  const started = items.some((r) => r.earned > 0);
  const me = d.me;
  const ahead = me ? items.filter((r) => r.earned > me.earned) : [];
  const toNext = ahead.length ? ahead[ahead.length - 1].earned - me.earned : 0;
  const medal = (i) => (i < 3 ? `m${i + 1}` : '');
  const groupSel = scope === 'group' && d.groups && d.groups.length > 1 ? `<select id="rgGroup" class="rk-select">${d.groups.map((x) => `<option value="${x.id}" ${d.group && x.id === d.group.id ? 'selected' : ''}>${esc(x.name)}</option>`).join('')}</select>` : '';

  let body;
  if (!items.length) {
    body = empty(scope === 'group' && !d.group ? 'Siz hali guruhga biriktirilmagansiz' : "Reytingda hali o'quvchi yo'q", 'trophy');
  } else if (!started) {
    body = `<div class="rk-empty">
        <div class="rk-empty-ico">${ic('trophy')}</div>
        <h3>Reyting hali boshlanmadi</h3>
        <p>Birinchi coin yig'gan o'quvchi 1-o'ringa chiqadi. Vazifa topshiring, testlarni yeching va darslarga qatnashing.</p>
        ${u.role === 'student' ? `<a class="btn primary" href="#/coins">${ic('coin')}Coin qanday yig'iladi</a>` : ''}
      </div>
      <div class="set-title">Ishtirokchilar · ${items.length}</div>
      <div class="rk-list">${items.map((r) => rkRow(r, '—', u)).join('')}</div>`;
  } else {
    const top = items.slice(0, 3);
    const order = top.length === 3 ? [1, 0, 2] : top.length === 2 ? [1, 0] : [0];
    body = `<section class="rk-hero">
        <div class="rk-podium">${order.map((i) => {
          const r = top[i];
          return `<div class="rk-pod p${i + 1} ${r.id === u.id ? 'is-me' : ''}">
            ${i === 0 ? `<span class="rk-crown">${ic('crown')}</span>` : ''}
            <div class="rk-av">${avatar(r.name, r.id, 'lg', 'student', r.avatar)}<span class="rk-place">${i + 1}</span></div>
            <b>${esc(r.name.split(' ')[0])}</b>${coinHtml(r.earned)}
            <div class="rk-step"></div></div>`;
        }).join('')}</div>
      </section>
      ${u.role === 'student' && me ? `<div class="rk-me">
          <span class="rk-me-pos">${me.rank}<small>o'rin</small></span>
          <div class="grow"><b>${me.rank === 1 ? 'Siz yetakchisiz!' : `Keyingi o'ringacha ${toNext} coin`}</b>
            <span>${me.accepted} ta vazifa qabul qilingan · ${items.length} kishidan</span></div>
          ${coinHtml(me.earned)}</div>` : ''}
      ${items.length > 3 ? `<div class="set-title">Barcha o'rinlar</div><div class="rk-list">${items.slice(3).map((r) => rkRow(r, r.rank, u)).join('')}</div>` : ''}`;
  }
  layout(`<div class="rk-head"><div><h1>Reyting</h1><p>${scope === 'all' ? "Barcha o'quvchilar" : esc(d.group ? d.group.name : 'Guruh')} · yig'ilgan coin bo'yicha</p></div>${groupSel}</div>
    <div class="seg-full"><a href="#/rating" class="${scope === 'all' ? 'active' : ''}">${ic('trophy')}Umumiy</a><a href="#/rating/group" class="${scope === 'group' ? 'active' : ''}">${ic('users')}Guruhim</a></div>
    ${body}
    <p class="hint rk-hint">${ic('alert')}Marketda sarflangan coinlar o'rinni tushirmaydi — hisobga jami yig'ilgani olinadi.</p>`);
  const rg = $('#rgGroup'); if (rg) rg.onchange = () => viewRating('group', rg.value);
}
const rkRow = (r, rank, u) => `<div class="rk-row ${r.id === u.id ? 'is-me' : ''}">
  <span class="rk-n">${rank}</span>${avatar(r.name, r.id, 'sm', 'student', r.avatar)}
  <div class="grow"><div class="t">${esc(r.name)}${r.id === u.id ? ' <span class="you">siz</span>' : ''}</div><div class="s"><span class="lv">${r.level}</span> ${esc(r.group_name || '')}</div></div>
  ${coinHtml(r.earned)}</div>`;

// ------------------------------------------------------------------ AI tekshiruv (Gemini)
const aiCache = {};
function aiResultHtml(res, subId) {
  if (res) aiCache[subId] = res;
  if (!res) return `<button type="button" class="ai-btn" data-aicheck="${subId}">${ic('sparkles')}AI bilan tekshirish</button>`;
  return `<div class="ai-res ${res.verdict === 'qabul' ? 'ok' : 'bad'}">
    <div class="ai-top"><span class="ai-tag">${ic('sparkles')}AI tavsiyasi</span><b class="ai-score">${res.score}<small>/100</small></b>
      <span class="chip ${res.verdict === 'qabul' ? 'ok' : 'bad'}">${res.verdict === 'qabul' ? 'Qabul qilish' : 'Qaytarish'}</span></div>
    <p class="ai-fb">${esc(res.feedback)}</p>
    ${(res.strengths || []).length ? `<div class="ai-l good">${res.strengths.map((x) => `<span>${ic('check')}${esc(x)}</span>`).join('')}</div>` : ''}
    ${(res.issues || []).length ? `<div class="ai-l warn">${res.issues.map((x) => `<span>${ic('alert')}${esc(x)}</span>`).join('')}</div>` : ''}
    ${res.teacher_note ? `<div class="ai-note">${ic('user')}<span>${esc(res.teacher_note)}</span></div>` : ''}
    <div class="row" style="margin-top:10px"><button type="button" class="btn sm primary" data-aiapply="${subId}">${ic('check')}Tavsiyani formaga qo'yish</button>
      <button type="button" class="btn sm ghost" data-aicheck="${subId}">${ic('refresh')}Qayta tekshirish</button><span class="spacer"></span><span class="small muted">${esc(res.model || '')}</span></div></div>`;
}
async function runAi(subId) {
  const box = $(`#ai-${subId}`); if (!box) return;
  box.innerHTML = `<div class="ai-loading"><span class="ai-spin"></span>AI vazifani o'qib, tekshirmoqda…</div>`;
  try {
    const { ai } = await api('POST', `/api/submissions/${subId}/ai-check`);
    box.innerHTML = aiResultHtml(ai, subId);
  } catch (e) { box.innerHTML = aiResultHtml(aiCache[subId] || null, subId); toast(e.message, true); }
  $$('[data-aicheck]', box).forEach((b) => { b.onclick = () => runAi(Number(b.dataset.aicheck)); });
  $$('[data-aiapply]', box).forEach((b) => { b.onclick = () => applyAi(Number(b.dataset.aiapply)); });
}
function applyAi(subId) {
  const res = aiCache[subId]; const f = $(`form.grade[data-sub="${subId}"]`);
  if (!res || !f) return;
  $('select[name=status]', f).value = res.verdict;
  $('input[name=score]', f).value = res.score;
  $('textarea[name=feedback]', f).value = res.feedback;
  f.scrollIntoView({ behavior: 'smooth', block: 'center' });
  toast("AI tavsiyasi formaga qo'yildi — tekshirib «Baholash»ni bosing");
}

async function viewAiSettings() {
  const c = await api('GET', '/api/settings/ai');
  layout(`<div class="page-head"><div><h1>AI sozlamalari</h1><p>Gemini yordamida uyga vazifalarni tekshirish</p></div></div>
    <div class="grid half">
      <div class="card">${cardHead('key', 'Gemini API kaliti')}
        <div class="ai-status ${c.has_key ? 'ok' : ''}">${ic(c.has_key ? 'checkCircle' : 'alert')}<span>${c.has_key ? `Kalit kiritilgan: <b class="mono">${esc(c.key_mask)}</b>${c.from_env ? ' (muhit o\'zgaruvchisidan)' : ''}` : 'Kalit hali kiritilmagan'}</span></div>
        <form id="aiForm">
          <label class="f"><span>${c.has_key ? 'Yangi kalit (almashtirish uchun)' : 'API kalit'}</span><input name="key" type="password" autocomplete="off" placeholder="AIza..."></label>
          <label class="f"><span>Model</span><input name="model" value="${esc(c.model)}" placeholder="${esc(c.default_model)}"></label>
          <p class="hint">Tavsiya: <code>${esc(c.default_model)}</code> — tez va arzon. Yangi modellar chiqsa, nomini shu yerda o'zgartirish mumkin.</p>
          <label class="switch-row"><input type="checkbox" class="switch" name="auto" ${c.auto ? 'checked' : ''}><span><b>Avtomatik tekshirish</b><small>O'quvchi topshirishi bilan AI tekshiradi va o'qituvchiga tavsiya yuboradi</small></span></label>
          <div class="row" style="margin-top:14px"><button class="btn primary">${ic('check')}Saqlash</button><button type="button" class="btn" id="aiTest">${ic('sparkles')}Ulanishni tekshirish</button>
            ${c.has_key && !c.from_env ? '<button type="button" class="btn ghost" id="aiDel">Kalitni o\'chirish</button>' : ''}</div>
        </form></div>
      <div class="card">${cardHead('alert', 'Qanday ishlaydi')}
        <div class="list">
          <div class="li">${ic('key')}<div class="grow"><div class="t">1. Kalit oling</div><div class="s">aistudio.google.com → «Get API key» → kalitni shu yerga qo'ying</div></div></div>
          <div class="li">${ic('sparkles')}<div class="grow"><div class="t">2. «AI bilan tekshirish»</div><div class="s">O'qituvchi dars sahifasida har bir javob ostidagi tugmani bosadi</div></div></div>
          <div class="li">${ic('file')}<div class="grow"><div class="t">3. Nimalar o'qiladi</div><div class="s">Vazifa matni va fayllari, o'quvchi matni, rasm, PDF va kod fayllari (Word/Excel hozircha yo'q)</div></div></div>
          <div class="li">${ic('check')}<div class="grow"><div class="t">4. Yakuniy qaror — o'qituvchida</div><div class="s">AI ball va izoh tavsiya qiladi, tayyor yechimni yozmaydi</div></div></div>
        </div></div>
    </div>`);
  $('#aiForm').onsubmit = async (e) => {
    e.preventDefault(); const f = formData(e.target);
    const p = { model: f.model, auto: !!f.auto }; if (f.key) p.key = f.key;
    try { await api('PUT', '/api/settings/ai', p); toast('Saqlandi'); viewAiSettings(); } catch (err) { toast(err.message, true); }
  };
  $('#aiTest').onclick = async (e) => {
    const b = e.currentTarget; b.disabled = true;
    try { await api('POST', '/api/settings/ai/test'); toast('Gemini bilan ulanish ishlayapti'); } catch (err) { toast(err.message, true); } finally { b.disabled = false; }
  };
  const del = $('#aiDel'); if (del) del.onclick = async () => { if (!confirm("API kalit o'chirilsinmi?")) return; await api('PUT', '/api/settings/ai', { key: '' }); toast("Kalit o'chirildi"); viewAiSettings(); };
}

// guruh ichidagi reyting (asosiy Reyting sahifasi uslubida)
function groupRatingHtml(d, u) {
  const items = d.items || [];
  if (!items.length) return empty("Guruhda hali o'quvchi yo'q", 'trophy');
  const me = d.me;
  const started = items.some((r) => r.earned > 0);
  const ahead = me ? items.filter((r) => r.earned > me.earned) : [];
  const toNext = ahead.length ? ahead[ahead.length - 1].earned - me.earned : 0;
  let top;
  if (started) {
    const t3 = items.slice(0, 3), order = t3.length === 3 ? [1, 0, 2] : t3.length === 2 ? [1, 0] : [0];
    top = `<section class="rk-hero"><div class="rk-podium">${order.map((i) => { const r = t3[i]; return `<div class="rk-pod p${i + 1} ${r.id === u.id ? 'is-me' : ''}">${i === 0 ? `<span class="rk-crown">${ic('crown')}</span>` : ''}
      <div class="rk-av">${avatar(r.name, r.id, 'lg', 'student', r.avatar)}<span class="rk-place">${i + 1}</span></div><b>${esc(r.name.split(' ')[0])}</b>${coinHtml(r.earned)}<div class="rk-step"></div></div>`; }).join('')}</div></section>`;
  } else {
    top = `<div class="rk-empty slim"><div class="rk-empty-ico">${ic('trophy')}</div><h3>Reyting hali boshlanmadi</h3><p>Birinchi coin yig'gan o'quvchi guruhda 1-o'ringa chiqadi.</p></div>`;
  }
  const meCard = u.role === 'student' && me && started ? `<div class="rk-me"><span class="rk-me-pos">${me.rank}<small>o'rin</small></span>
    <div class="grow"><b>${me.rank === 1 ? 'Siz guruhda yetakchisiz!' : `Keyingi o'ringacha ${toNext} coin`}</b><span>${me.accepted} ta vazifa qabul qilingan · ${items.length} kishidan</span></div>${coinHtml(me.earned)}</div>` : '';
  const rest = started ? items.slice(3) : items;
  return top + meCard + (rest.length ? `<div class="set-title">${started ? "Barcha o'rinlar" : `Ishtirokchilar · ${items.length}`}</div><div class="rk-list">${rest.map((r) => rkRow(r, started ? r.rank : '—', u)).join('')}</div>` : '');
}
// ------------------------------------------------------------------ OTA-ONA ILOVASI
const pstate = { kids: null };
async function loadKids(force) {
  if (!pstate.kids || force) pstate.kids = (await api('GET', '/api/parent/children')).children;
  return pstate.kids;
}
function curKid(kids, wanted) {
  let id = wanted;
  if (!id) { try { id = Number(localStorage.getItem('yd-kid')) || null; } catch { /* yo'q */ } }
  const k = kids.find((x) => x.user.id === id) || kids[0];
  if (k) { try { localStorage.setItem('yd-kid', String(k.user.id)); } catch { /* jim */ } }
  return k;
}
const kidSwitch = (kids, cur, path) => (kids.length > 1 ? `<div class="kid-switch">${kids.map((k) => `<a href="${path}/${k.user.id}" class="${k.user.id === cur.user.id ? 'on' : ''}">${avatar(k.user.name, k.user.id, 'sm', 'student', k.user.avatar)}<span>${esc(k.user.name.split(' ')[0])}</span></a>`).join('')}</div>` : '');
const noKids = () => `<div class="onb card"><div class="onb-ico">${ic('heart')}</div><h3>Farzand hali bog'lanmagan</h3>
  <p>O'quv markazi administratori hisobingizni farzandingizga bog'lagach, uning davomati, baholari va to'lovlari shu yerda ko'rinadi.</p></div>`;

async function viewParentHome(wanted) {
  const kids = await loadKids(true);
  const u = state.user;
  if (!kids.length) { layout(`<div class="page-head"><div><h1>${greeting()}, ${esc(u.name.split(' ')[0])}!</h1></div></div>` + noKids()); return; }
  const k = curKid(kids, wanted), ch = k.user, g0 = k.groups[0];
  const L = k.game.level;
  const alerts = [];
  if (k.att.last && k.att.last.present === 0) alerts.push(['bad', 'alert', `Oxirgi darsga kelmadi`, `${fmtDate(k.att.last.date)} · ${esc(k.att.last.title)}`, `#/p/attendance/${ch.id}`]);
  if (k.tasks.overdue) alerts.push(['warn', 'clock', `${k.tasks.overdue} ta vazifa muddati o'tgan`, k.tasks.overdue_list.slice(0, 2).map((x) => esc(x.title)).join(', '), `#/p/tasks/${ch.id}`]);
  if (k.debt) alerts.push(['warn', 'wallet', `To'lov qarzi: ${money(k.debt)}`, `${MONTHS_FULL[new Date().getMonth()]} oyi uchun`, `#/p/pay/${ch.id}`]);
  const nd = k.next ? new Date(k.next.date + 'T00:00:00') : null;
  const kpi = (tone, icon, val, label, href) => `<a class="pk" href="${href}"><span class="pk-ico ${tone}">${ic(icon)}</span><b>${val}</b><em>${label}</em></a>`;
  layout(`${kidSwitch(kids, k, '#/p/home')}
    <section class="hero2 pa-hero ${lvlClass(L.level)} ${lvlStyle(L.level) ? 'has-img' : ''}" ${lvlStyle(L.level)}>
      <div class="hero2-top">
        <div class="av-ring sm">${avatar(ch.name, ch.id, 'md', 'student', ch.avatar)}<span class="av-lvl">${L.level}</span></div>
        <div class="grow"><span class="h2-greet">Farzandingiz</span><h1>${esc(ch.name)}</h1>
          <span class="h2-lvl">${g0 ? esc(g0.course_title) : 'Guruh yo\'q'}</span></div>
      </div>
      <div class="hero2-stats">
        <a href="#/p/tasks/${ch.id}"><b>${ic('trophy')}${k.rank || '—'}</b><small>O'rin</small></a>
        <a href="#/p/tasks/${ch.id}"><b>${ic('star')}${L.level}</b><small>Daraja</small></a>
        <a href="#/p/tasks/${ch.id}"><b>${ic('award')}${k.game.earned_count}</b><small>Nishon</small></a>
        <a href="#/p/tasks/${ch.id}">${coinHtml(k.coins)}<small>Coin</small></a>
      </div>
    </section>
    ${alerts.length ? `<div class="pa-alerts">${alerts.map(([t, icon, title, sub, href]) => `<a class="pa-alert ${t}" href="${href}"><span>${ic(icon)}</span><div class="grow"><b>${title}</b><em>${sub}</em></div>${ic('right')}</a>`).join('')}</div>`
      : `<div class="all-done">${ic('checkCircle')}<div><b>Hammasi joyida</b><span>Darslarga qatnashyapti, qarz va kechikkan vazifa yo'q</span></div></div>`}
    <div class="pk-grid">
      ${kpi('t-green', 'checkCircle', k.att.pct === null ? '—' : k.att.pct + '%', 'Davomat', `#/p/attendance/${ch.id}`)}
      ${kpi('t-blue', 'clipboard', k.tasks.pct === null ? '—' : k.tasks.pct + '%', 'Vazifalar', `#/p/tasks/${ch.id}`)}
      ${kpi('t-violet', 'star', k.tasks.avg ?? '—', "O'rtacha ball", `#/p/tasks/${ch.id}`)}
    </div>
    ${k.next ? `<a class="next-card" href="#/p/attendance/${ch.id}"><div class="nc-date"><span>${WD_SHORT[nd.getDay()]}</span><b>${nd.getDate()}</b><span>${MONTHS[nd.getMonth()]}</span></div>
      <div class="grow"><small>Keyingi dars${k.next.date === todayStr() ? ' · bugun' : ''}</small><div class="t">${esc(k.next.title)}</div><div class="s">${esc(k.next.group_name)}${k.next.time ? ' · ' + esc(k.next.time) : ''}</div></div>${ic('right')}</a>` : ''}
    ${g0 ? `<div class="set-title">O'qituvchi</div><a class="pa-teacher" href="#/p/messages/${ch.id}"><span class="pa-t-av">${avatar(g0.teacher_name || '?', g0.teacher_id || 0, 'md', 'teacher', g0.teacher_avatar)}<i></i></span><div class="grow"><b>${esc(g0.teacher_name || '—')}</b><span>${esc(g0.course_title)} · ${esc(g0.name)}</span></div><span class="pa-t-btn">${ic('message')}</span></a>` : ''}
    ${installCard()}`);
  bindInstall();
}

async function viewParentSection(sec, wanted) {
  const kids = await loadKids();
  if (!kids.length) { layout(noKids()); return; }
  const k = curKid(kids, wanted), ch = k.user;
  const TITLE = { attendance: 'Davomat', tasks: 'Vazifalar va baholar', pay: "To'lovlar", messages: "O'qituvchi bilan" };
  const head = `${kidSwitch(kids, k, '#/p/' + sec)}<div class="pa-head"><h1>${TITLE[sec]}</h1><span>${avatar(ch.name, ch.id, 'sm', 'student', ch.avatar)}${esc(ch.name)}</span></div>`;
  if (sec === 'attendance') {
    const { items } = await api('GET', `/api/parent/child/${ch.id}/attendance`);
    const marked = items.filter((x) => x.present !== null), came = marked.filter((x) => x.present).length, miss = marked.length - came;
    const pctv = marked.length ? Math.round((came / marked.length) * 100) : null;
    const tone = pctv === null ? 'none' : pctv >= 85 ? 'good' : pctv >= 60 ? 'mid' : 'bad';
    const verdict = { none: "Hali davomat belgilanmagan", good: "A'lo! Darslarni qoldirmayapti", mid: "Yaxshi, lekin ba'zi darslar qoldirilgan", bad: "Davomatga e'tibor bering" }[tone];
    const R = 44, C = 2 * Math.PI * R;
    const strip = items.slice(0, 14).reverse();
    // oylar bo'yicha guruhlash
    const months = {};
    for (const x of items) { const k = x.date.slice(0, 7); (months[k] = months[k] || []).push(x); }
    // oylik kalendar: eng oxirgi darsli oy
    const calMonth = (pstate.atMonth && pstate.atKid === ch.id) ? pstate.atMonth : (items[0] ? items[0].date.slice(0, 7) : todayStr().slice(0, 7));
    pstate.atMonth = calMonth; pstate.atKid = ch.id;
    const byDay = {}; for (const x of items) byDay[x.date] = x;
    const [cy, cm] = calMonth.split('-').map(Number);
    const first = new Date(cy, cm - 1, 1), off = (first.getDay() + 6) % 7, dim = new Date(cy, cm, 0).getDate();
    let cells = '';
    for (let i = 0; i < off; i++) cells += '<span class="ac-d e"></span>';
    for (let dd = 1; dd <= dim; dd++) {
      const key = `${calMonth}-${String(dd).padStart(2, '0')}`, x = byDay[key];
      const st = x ? (x.present === null ? 'n' : x.present ? 'y' : 'x') : '';
      cells += `<span class="ac-d ${st} ${key === todayStr() ? 'today' : ''}" ${x ? `title="${esc(x.title)}"` : ''}>${dd}</span>`;
    }
    const shiftM = (n) => { const d2 = new Date(cy, cm - 1 + n, 1); return `${d2.getFullYear()}-${String(d2.getMonth() + 1).padStart(2, '0')}`; };
    layout(`${kidSwitch(kids, k, '#/p/attendance')}
      <section class="ah ah-${tone}">
        <div class="ah-top"><span class="ah-lbl">${ic('checkCircle')}Davomat</span><span class="at-who">${avatar(ch.name, ch.id, 'sm', 'student', ch.avatar)}${esc(ch.name.split(' ')[0])}</span></div>
        <div class="ah-main"><b class="ah-pct">${pctv === null ? '—' : pctv}<small>${pctv === null ? '' : '%'}</small></b>
          <div class="ah-txt"><h2>${verdict}</h2><p>${marked.length ? `${marked.length} ta darsdan ${came} tasiga keldi` : "O'qituvchi belgilagach ko'rinadi"}</p></div></div>
        <div class="ah-bar">${items.length ? `<i class="y" style="flex:${came}"></i><i class="x" style="flex:${miss}"></i><i class="n" style="flex:${items.length - marked.length}"></i>` : '<i class="n" style="flex:1"></i>'}</div>
        <div class="ah-leg"><span><i class="y"></i><b>${came}</b> keldi</span><span><i class="x"></i><b>${miss}</b> kelmadi</span><span><i class="n"></i><b>${items.length - marked.length}</b> kutilmoqda</span></div>
      </section>
      <section class="at-cal">
        <div class="ac-head"><button type="button" class="ac-nav" data-am="${shiftM(-1)}">${ic('left')}</button><b>${monthName(calMonth).replace(/^./, (c) => c.toUpperCase())}</b><button type="button" class="ac-nav" data-am="${shiftM(1)}">${ic('right')}</button></div>
        <div class="ac-grid">${['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((w) => `<span class="ac-w">${w}</span>`).join('')}${cells}</div>
        <div class="ac-leg"><span><i class="y"></i>Keldi</span><span><i class="x"></i>Kelmadi</span><span><i class="n"></i>Belgilanmagan</span></div>
      </section>
      ${items.length ? Object.entries(months).map(([m, list]) => `<div class="set-title">${monthName(m)}</div><div class="rk-list">${list.map((x) => { const d2 = new Date(x.date + 'T00:00:00'); const st = x.present === null ? 'n' : x.present ? 'y' : 'x'; return `<div class="rk-row at-row ${st}">
          <div class="at-date"><b>${d2.getDate()}</b><span>${WD_SHORT[d2.getDay()]}</span></div>
          <div class="grow"><div class="t">${esc(x.title)}</div><div class="s">${esc(x.group_name)}</div></div>
          <span class="at-badge">${st === 'n' ? 'Belgilanmagan' : st === 'y' ? `${ic('check')}Keldi` : `${ic('x')}Kelmadi`}</span></div>`; }).join('')}</div>`).join('')
        : empty("Hali dars bo'lmagan", 'calendar')}`);
    $$('[data-am]').forEach((bt) => { bt.onclick = () => { pstate.atMonth = bt.dataset.am; viewParentSection('attendance', ch.id); }; });
  } else if (sec === 'tasks') {
    const { items, tests } = await api('GET', `/api/parent/child/${ch.id}/tasks`);
    const L = k.game.level;
    layout(head + `<div class="pk-grid">
        <div class="pk"><span class="pk-ico t-green">${ic('checkCircle')}</span><b>${k.tasks.accepted}<small>/${k.tasks.given}</small></b><em>Qabul</em></div>
        <div class="pk"><span class="pk-ico t-rose">${ic('clock')}</span><b>${k.tasks.overdue}</b><em>Kechikkan</em></div>
        <div class="pk"><span class="pk-ico t-violet">${ic('star')}</span><b>${k.tasks.avg ?? '—'}</b><em>O'rtacha</em></div></div>
      <a class="card pa-lvl" href="#/p/tasks/${ch.id}"><span class="lvl-chip">${L.level}<small>daraja</small></span><div class="grow"><b>${esc(L.name)}</b><div class="xp-bar"><i style="width:${L.pct}%"></i></div><span>${L.xp} / ${L.next} XP · ${k.game.earned_count} nishon · ${k.rank ? k.rank + '-o\'rin' : ''}</span></div></a>
      <div class="set-title">Vazifalar</div>
      ${items.length ? `<div class="rk-list">${items.map((x) => `<div class="rk-row pa-task"><div class="grow"><div class="t">${esc(x.title)}</div>
          <div class="s">${fmtDate(x.date)}${x.deadline ? ' · muddat ' + fmtDate(x.deadline) : ''}</div>${x.feedback ? `<div class="pa-fb">${ic('message')}${esc(x.feedback)}</div>` : ''}</div>
          <div class="pa-task-r">${x.score !== null && x.score !== undefined ? `<span class="score-pill">${x.score}</span>` : ''}${badge(x.state)}</div></div>`).join('')}</div>` : empty("Hali vazifa berilmagan", 'clipboard')}
      ${tests.length ? `<div class="set-title">Testlar</div><div class="rk-list">${tests.map((t) => `<div class="rk-row"><span class="ni-ico t-violet">${ic('quiz')}</span><div class="grow"><div class="t">${esc(t.title)}</div><div class="s">${fmtDate(t.finished_at, true)}</div></div><span class="score-pill">${t.score}%</span></div>`).join('')}</div>` : ''}`);
  } else if (sec === 'pay') {
    const { items, debt } = await api('GET', `/api/parent/child/${ch.id}/payments`);
    const owed = debt.reduce((a, x) => a + x.debt, 0), price = debt.reduce((a, x) => a + x.price, 0);
    layout(head + `<section class="pa-pay ${owed ? 'owe' : 'ok'}"><span>${MONTHS_FULL[new Date().getMonth()].replace(/^./, (c) => c.toUpperCase())} oyi</span>
        <b>${owed ? money(owed) : "To'langan"}</b><em>${owed ? `qarzdorlik · oylik ${money(price)}` : price ? `oylik to'lov ${money(price)}` : "Pullik guruh yo'q"}</em></section>
      <div class="set-title">To'lovlar tarixi</div>
      ${items.length ? `<div class="rk-list">${items.map((p) => `<div class="rk-row"><span class="ni-ico t-green">${ic('wallet')}</span><div class="grow"><div class="t">${monthName(p.month)}</div><div class="s">${esc(p.group_name || '')} · ${METHODS[p.method] || ''} · ${fmtDate(p.created_at)}</div></div><b class="nowrap">${money(p.amount)}</b></div>`).join('')}</div>` : empty("To'lovlar hali yo'q", 'wallet')}`);
  } else {
    const d = await api('GET', `/api/parent/child/${ch.id}/messages${wanted && pstate.teacher ? '?teacher=' + pstate.teacher : ''}`);
    if (!d.teacher_id) { layout(head + empty("Farzandingiz hali guruhga qo'shilmagan — o'qituvchi yo'q", 'message')); return; }
    const t = d.teachers.find((x) => x.id === d.teacher_id);
    const chips = (kids.length > 1 ? kids.map((x) => `<a href="#/p/messages/${x.user.id}" class="tg-chip ${x.user.id === ch.id ? 'on' : ''}">${avatar(x.user.name, x.user.id, 'sm', 'student', x.user.avatar)}${esc(x.user.name.split(' ')[0])}</a>`).join('') : '')
      + (d.teachers.length > 1 ? d.teachers.map((x) => `<button type="button" data-t="${x.id}" class="tg-chip t ${x.id === d.teacher_id ? 'on' : ''}">${avatar(x.name, x.id, 'sm', 'teacher', x.avatar)}${esc(x.name.split(' ')[0])}</button>`).join('') : '');
    layout(tgChat({ back: '#/', name: t.name, id: t.id, role: 'teacher', avatar: t.avatar, sub: `o'qituvchi · ${esc(ch.name)} haqida`, chips, items: d.items, empty: `${esc(ch.name)} haqida savolingizni yozing — o'qituvchiga darhol bildirishnoma boradi` }));
    bindTg();
    $$('[data-t]').forEach((b) => { b.onclick = () => { pstate.teacher = Number(b.dataset.t); viewParentSection('messages', ch.id); }; });
    $('#chatForm').onsubmit = async (e) => {
      e.preventDefault();
      try { await api('POST', `/api/parent/child/${ch.id}/messages`, { teacher_id: d.teacher_id, text: formData(e.target).text }); pstate.teacher = d.teacher_id; viewParentSection('messages', ch.id); } catch (err) { toast(err.message, true); }
    };
  }
}
function tgTime(s) { const d = parseUtc(s); return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`; }
function tgDay(s) {
  const d = parseUtc(s), k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  return k === todayStr() ? 'Bugun' : daysBetween(k, todayStr()) === 1 ? 'Kecha' : `${d.getDate()}-${MONTHS_FULL[d.getMonth()]}`;
}
function tgChat(o) {
  let last = '', body = '';
  o.items.forEach((m, i) => {
    const day = tgDay(m.created_at);
    if (day !== last) { body += `<div class="tg-day"><span>${day}</span></div>`; last = day; }
    const mine = m.author_id === state.user.id;
    const next = o.items[i + 1];
    const tail = !next || next.author_id !== m.author_id || tgDay(next.created_at) !== day;
    body += `<div class="tg-msg ${mine ? 'out' : 'in'} ${tail ? 'tail' : ''}"><div class="tg-b">${esc(m.text)}<span class="tg-t">${tgTime(m.created_at)}${mine ? `<i class="tg-ck ${m.read_at ? 'read' : ''}">${m.read_at ? '✓✓' : '✓'}</i>` : ''}</span></div></div>`;
  });
  if (!o.items.length) body = `<div class="tg-empty"><div>${avatar(o.name, o.id, 'lg', o.role, o.avatar)}</div><b>${esc(o.name)}</b><span>${o.empty}</span></div>`;
  return `<section class="tg">
    <header class="tg-head"><a href="${o.back}" class="tg-back" title="Orqaga">${ic('left')}</a>${avatar(o.name, o.id, 'md', o.role, o.avatar)}
      <div class="grow"><b>${esc(o.name)}</b><span>${o.sub}</span></div>${o.phone ? `<a class="tg-call" href="tel:${esc(o.phone)}" title="Qo'ng'iroq">${ic('phone')}</a>` : ''}</header>
    ${o.chips ? `<div class="tg-chips">${o.chips}</div>` : ''}
    <div class="tg-body" id="chatBody">${body}</div>
    <form class="tg-bar" id="chatForm"><textarea name="text" rows="1" placeholder="Xabar" required></textarea><button class="tg-send" title="Yuborish">${ic('send')}</button></form>
  </section>`;
}
function bindTg() {
  document.body.classList.add('chat-open');
  const cb = $('#chatBody'); if (cb) cb.scrollTop = cb.scrollHeight;
  const ta = $('.tg-bar textarea'); if (!ta) return;
  const grow = () => { ta.style.height = 'auto'; ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'; };
  ta.addEventListener('input', grow);
  ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && window.innerWidth > 900) { e.preventDefault(); $('#chatForm').requestSubmit(); } });
}
function chatHtml(items) {
  if (!items.length) return `<div class="chat-empty">${ic('message')}<span>Hozircha xabar yo'q. Savolingizni yozing — o'qituvchiga bildirishnoma boradi.</span></div>`;
  return items.map((m) => `<div class="cmsg ${m.author_id === state.user.id ? 'mine' : ''}"><div class="bubble">${esc(m.text)}</div><span>${ago(m.created_at)}</span></div>`).join('');
}

// O'qituvchi: ota-onalar bilan yozishuvlar
async function viewInbox(pid, sid) {
  if (pid && sid) {
    const d = await api('GET', `/api/inbox/${pid}/${sid}`);
    layout(tgChat({ back: '#/inbox', name: d.parent.name, id: d.parent.id, role: 'parent', avatar: d.parent.avatar, sub: `${esc(d.student.name)}ning ota-onasi`, phone: d.parent.phone, items: d.items, empty: 'Ota-onaga javob yozing' }));
    bindTg();
    $('#chatForm').onsubmit = async (e) => { e.preventDefault(); try { await api('POST', `/api/inbox/${pid}/${sid}`, formData(e.target)); viewInbox(pid, sid); } catch (err) { toast(err.message, true); } };
    return;
  }
  const { threads } = await api('GET', '/api/inbox');
  layout(`<div class="page-head"><div><h1>Ota-onalar</h1><p>Ota-onalardan kelgan xabarlar</p></div></div>
    ${threads.length ? `<div class="rk-list">${threads.map((t) => `<a class="rk-row" href="#/inbox/${t.parent_id}/${t.student_id}">${avatar(t.parent, t.parent_id, 'md', 'parent', t.parent_avatar)}
      <div class="grow"><div class="t">${esc(t.parent)} <span class="muted small">· ${esc(t.student)}</span></div><div class="s">${esc(t.last_text || '')}</div></div>
      <div class="pa-task-r"><span class="small muted">${ago(t.last_at)}</span>${t.unread ? `<span class="cnt">${t.unread}</span>` : ''}</div></a>`).join('')}</div>`
      : empty("Hozircha ota-onalardan xabar yo'q", 'message')}`);
}

// ------------------------------------------------------------------ router
const GROUP_TABS = ['students', 'grades', 'tests', 'rating', 'news'];
async function route() {
  const hash = location.hash || '#/';
  const panel = $('.notif-panel'); if (panel) panel.remove();
  clearInterval(testTimer);
  const certM = hash.match(/^#\/cert\/([\w-]+)$/);
  if (certM) return viewCert(certM[1]);
  if (!state.user && hash !== '#/login') {
    try { state.user = adoptUser((await api('GET', '/api/me')).user); refreshUnread(); } catch { return viewLogin(); }
  }
  if (hash === '#/login') return state.user ? go('#/') : viewLogin();
  if (state.user && !state.assets) { try { state.assets = await api('GET', '/api/assets'); } catch { state.assets = { levels: {}, badges: {} }; } }
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  try {
    const [a, b, c, dd] = parts;
    if (state.user.role === 'parent') {
      if (!parts.length) return await viewParentHome();
      if (a === 'p' && b === 'home') return await viewParentHome(c ? Number(c) : null);
      if (a === 'p' && ['attendance', 'tasks', 'pay', 'messages'].includes(b)) return await viewParentSection(b, c ? Number(c) : null);
    }
    if (a === 'inbox' && state.user.role !== 'student' && state.user.role !== 'parent') return await viewInbox(b ? Number(b) : null, c ? Number(c) : null);
    if (!parts.length) return await viewDashboard();
    if (a === 'groups' && !b) return await viewGroups();
    if (a === 'groups' && b && c === 'lessons' && dd) return await viewLesson(Number(b), Number(dd));
    if (a === 'groups' && b === 'archive' && state.user.role === 'admin') return await viewArchive();
    if (a === 'activity' && state.user.role === 'admin') return await viewActivity();
    if (a === 'ai' && state.user.role === 'admin') return await viewAiSettings();
    if (a === 'groups' && b) return await viewGroup(Number(b), GROUP_TABS.includes(c) ? c : 'lessons');
    if (a === 'courses' && !b && state.user.role !== 'student') return await viewCourses();
    if (a === 'courses' && b && state.user.role !== 'student') return await viewCourse(Number(b));
    if (a === 'users' && state.user.role === 'admin') return await viewUsers();
    if (a === 'news') return await viewNews();
    if (a === 'schedule') return await viewSchedule(b);
    if (a === 'rating') return await viewRating(b === 'group' ? 'group' : 'all');
    if (a === 'market') return await viewMarket(b === 'orders' ? 'orders' : 'items');
    if (a === 'coins' && state.user.role === 'student') return await viewCoins();
    if (a === 'achievements' && state.user.role === 'student') return await viewAchievements();
    if (a === 'tests' && b) return await viewTest(Number(b));
    if (a === 'payments' && state.user.role === 'admin') return await viewPayments(b);
    if (a === 'students' && b) return await viewStudent(Number(b));
    if (a === 'profile') return await viewProfile();
    layout(empty('Sahifa topilmadi. <a href="#/">Bosh sahifa</a>', 'alert'));
  } catch (e) {
    if (state.user) layout(empty(`${esc(e.message)} · <a href="#/">Bosh sahifa</a>`, 'alert'));
  }
}

document.addEventListener('click', (e) => {
  const row = e.target.closest('[data-href]');
  if (row && !e.target.closest('a, button, input, select, textarea')) go(row.dataset.href);
});
window.addEventListener('hashchange', () => { route(); window.scrollTo(0, 0); });
route();
