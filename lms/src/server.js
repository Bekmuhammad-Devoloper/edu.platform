'use strict';
/*
 * Yuksalish Academy LMS — server.
 *   npm install && npm run seed && npm start   ->  http://localhost:3000
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const express = require('express');
const bcrypt = require('bcryptjs');
const { one, all, run, tx, DATA_DIR } = require('./db');
const { importAll, ROOT } = require('./import-courses');
const ai = require('./ai');

const PORT = Number(process.env.PORT) || 3000;
const SESSION_DAYS = 30;
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 'loopback'); // nginx orqasida — haqiqiy IP (kirish urinishlarini cheklash uchun)
app.use(express.json({ limit: '800kb' }));

// ------------------------------------------------------------------ yordamchilar
// mahalliy sana (server kompyuterining vaqt zonasi bo'yicha)
const localDate = (ms = Date.now()) => { const d = new Date(ms); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const today = () => localDate();
const nowIso = () => new Date().toISOString().replace('T', ' ').slice(0, 19);
class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
const fail = (status, message) => { throw new HttpError(status, message); };
const wrap = (fn) => (req, res, next) => { try { const r = fn(req, res, next); if (r !== undefined) res.json(r); } catch (e) { next(e); } };
const str = (v, max = 5000) => (v === undefined || v === null ? '' : String(v).trim().slice(0, max));
const id = (v) => { const n = Number(v); if (!Number.isInteger(n) || n <= 0) fail(400, "Noto'g'ri ID"); return n; };
const isDate = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s || '');
const publicUser = (u) => u && ({ id: u.id, name: u.name, login: u.login, role: u.is_dev ? 'dev' : u.role, phone: u.phone, avatar: u.avatar || null, active: !!u.active, created_at: u.created_at });

// Bildirishnoma: bir yoki bir nechta foydalanuvchiga
function notify(userIds, kind, text, link) {
  for (const uid of [].concat(userIds).filter(Boolean)) {
    run('INSERT INTO notifications (user_id, kind, text, link) VALUES (?,?,?,?)', uid, kind, String(text).slice(0, 300), link || null);
  }
}
const groupStudentIds = (gid) => all('SELECT student_id FROM group_students WHERE group_id = ?', gid).map((r) => r.student_id);
const lessonTitle = (lid) => (one('SELECT title FROM lessons WHERE id = ?', lid) || {}).title || 'Dars';

function parseCookies(header) {
  const out = {};
  for (const part of (header || '').split(';')) {
    const i = part.indexOf('=');
    if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
  }
  return out;
}

// ------------------------------------------------------------------ autentifikatsiya
function loadUser(req) {
  const token = parseCookies(req.headers.cookie).sid;
  if (!token) return null;
  const row = one(`SELECT u.* FROM sessions s JOIN users u ON u.id = s.user_id
                   WHERE s.token = ? AND s.expires_at > datetime('now') AND u.active = 1`, token);
  return row || null;
}
// 'dev' (egasi) — barcha huquqlar bo'yicha administrator kabi ishlaydi, ustiga dev-himoyasi bor.
// Serverdagi barcha tekshiruvlar soddaligi uchun rolni 'admin' ga tenglashtiramiz, asl rolni is_dev bilan saqlaymiz.
app.use((req, res, next) => {
  req.user = loadUser(req);
  if (req.user && req.user.role === 'dev') { req.user.is_dev = true; req.user.role = 'admin'; }
  next();
});
const auth = (...roles) => (req, res, next) => {
  if (!req.user) return next(new HttpError(401, 'Tizimga kiring'));
  if (roles.length && !roles.includes(req.user.role)) return next(new HttpError(403, "Bu bo'lim uchun ruxsat yo'q"));
  next();
};

const attempts = new Map(); // oddiy himoya: 15 daqiqada 10 ta noto'g'ri urinish
app.post('/api/login', wrap((req, res) => {
  const login = str(req.body.login, 100).toLowerCase();
  const password = String(req.body.password || '');
  const key = `${req.ip}|${login}`;
  const a = attempts.get(key) || { n: 0, until: 0 };
  if (a.until > Date.now()) fail(429, "Juda ko'p urinish. 15 daqiqadan keyin qayta urinib ko'ring");
  const user = one('SELECT * FROM users WHERE lower(login) = ?', login);
  if (!user || !user.active || !bcrypt.compareSync(password, user.password_hash)) {
    a.n += 1; if (a.n >= 10) { a.until = Date.now() + 15 * 60 * 1000; a.n = 0; }
    attempts.set(key, a);
    fail(401, "Login yoki parol noto'g'ri");
  }
  attempts.delete(key);
  const token = crypto.randomBytes(32).toString('hex');
  run(`INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, datetime('now', '+${SESSION_DAYS} days'))`, token, user.id);
  run("DELETE FROM sessions WHERE expires_at <= datetime('now')");
  res.setHeader('Set-Cookie', `sid=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_DAYS * 86400}`);
  return { user: publicUser(user) };
}));

app.post('/api/logout', wrap((req, res) => {
  const token = parseCookies(req.headers.cookie).sid;
  if (token) run('DELETE FROM sessions WHERE token = ?', token);
  res.setHeader('Set-Cookie', 'sid=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0');
  return { ok: true };
}));

app.get('/api/me', auth(), wrap((req) => ({ user: publicUser(req.user) })));

app.post('/api/me/password', auth(), wrap((req) => {
  const { current, next: nextPw } = req.body;
  if (!bcrypt.compareSync(String(current || ''), req.user.password_hash)) fail(400, "Joriy parol noto'g'ri");
  if (String(nextPw || '').length < 6) fail(400, "Yangi parol kamida 6 ta belgi bo'lsin");
  run('UPDATE users SET password_hash = ? WHERE id = ?', bcrypt.hashSync(String(nextPw), 10), req.user.id);
  return { ok: true };
}));

// ------------------------------------------------------------------ foydalanuvchilar (administrator)
app.get('/api/users', auth('admin', 'teacher'), wrap((req) => {
  const role = req.user.role === 'teacher' ? 'student' : str(req.query.role, 20);
  const q = `%${str(req.query.q, 100).toLowerCase()}%`;
  const rows = all(`SELECT * FROM users WHERE (? = '' OR role = ?) AND (lower(name) LIKE ? OR lower(login) LIKE ?) ORDER BY role, name`, role, role, q, q);
  return { users: rows.map(publicUser) };
}));

app.post('/api/users', auth('admin'), wrap((req) => {
  const name = str(req.body.name, 120), login = str(req.body.login, 60).toLowerCase(), role = str(req.body.role, 20);
  const password = String(req.body.password || '');
  if (!name || !login) fail(400, 'Ism va login majburiy');
  if (!/^[a-z0-9._-]{3,}$/.test(login)) fail(400, "Login kamida 3 ta belgi: lotin harflari, raqam, . _ -");
  if (!['admin', 'teacher', 'student', 'parent', 'dev'].includes(role)) fail(400, "Rol noto'g'ri");
  if (role === 'dev' && !req.user.is_dev) fail(403, "Dev rolini faqat dev biriktira oladi");
  if (password.length < 6) fail(400, 'Parol kamida 6 ta belgi');
  if (one('SELECT 1 FROM users WHERE lower(login) = ?', login)) fail(409, 'Bu login band');
  const r = run('INSERT INTO users (name, login, password_hash, role, phone) VALUES (?,?,?,?,?)', name, login, bcrypt.hashSync(password, 10), role, str(req.body.phone, 30) || null);
  audit(req.user, 'create', 'user', Number(r.lastInsertRowid), name, `${login} · ${role}`);
  return { user: publicUser(one('SELECT * FROM users WHERE id = ?', r.lastInsertRowid)) };
}));

app.patch('/api/users/:id', auth('admin'), wrap((req) => {
  const uid = id(req.params.id);
  const u = one('SELECT * FROM users WHERE id = ?', uid) || fail(404, 'Foydalanuvchi topilmadi');
  const b = req.body;
  if (u.role === 'dev' && !req.user.is_dev) fail(403, "Dev hisobini faqat dev o'zgartira oladi");
  if (uid === req.user.id && (b.active === false || (b.role && !['admin', 'dev'].includes(b.role)))) fail(400, "O'zingizni bloklay yoki egalik huquqingizni ayira olmaysiz");
  const name = b.name !== undefined ? str(b.name, 120) : u.name;
  const role = b.role !== undefined ? str(b.role, 20) : u.role;
  if (!['admin', 'teacher', 'student', 'parent', 'dev'].includes(role)) fail(400, "Rol noto'g'ri");
  if (role === 'dev' && !req.user.is_dev) fail(403, "Dev rolini faqat dev biriktira oladi");
  const phone = b.phone !== undefined ? (str(b.phone, 30) || null) : u.phone;
  const active = b.active !== undefined ? (b.active ? 1 : 0) : u.active;
  run('UPDATE users SET name=?, role=?, phone=?, active=? WHERE id=?', name || u.name, role, phone, active, uid);
  if (b.password) {
    if (String(b.password).length < 6) fail(400, 'Parol kamida 6 ta belgi');
    run('UPDATE users SET password_hash = ? WHERE id = ?', bcrypt.hashSync(String(b.password), 10), uid);
    run('DELETE FROM sessions WHERE user_id = ?', uid);
  }
  if (!active) run('DELETE FROM sessions WHERE user_id = ?', uid);
  return { user: publicUser(one('SELECT * FROM users WHERE id = ?', uid)) };
}));

app.delete('/api/users/:id', auth('admin'), wrap((req) => {
  const uid = id(req.params.id);
  if (uid === req.user.id) fail(400, "O'zingizni o'chira olmaysiz");
  const du = one('SELECT name, login, role FROM users WHERE id = ?', uid);
  if (du && du.role === 'dev' && !req.user.is_dev) fail(403, "Dev hisobini faqat dev o'chira oladi");
  run('DELETE FROM users WHERE id = ?', uid);
  if (du) audit(req.user, 'delete', 'user', uid, du.name, `${du.login} · ${du.role}`);
  return { ok: true };
}));

// ------------------------------------------------------------------ kurslar
function courseTree(courseId) {
  const course = one('SELECT * FROM courses WHERE id = ?', courseId) || fail(404, 'Kurs topilmadi');
  const modules = all('SELECT * FROM modules WHERE course_id = ? ORDER BY position', courseId);
  const lessons = all('SELECT * FROM lessons WHERE course_id = ? ORDER BY position', courseId);
  for (const m of modules) m.lessons = lessons.filter((l) => l.module_id === m.id);
  return { course, modules };
}

app.get('/api/courses', auth(), wrap((req) => {
  let rows = all(`SELECT c.*, (SELECT count(*) FROM lessons l WHERE l.course_id = c.id) AS lesson_count,
                  (SELECT count(*) FROM modules m WHERE m.course_id = c.id) AS module_count,
                  (SELECT count(*) FROM groups g WHERE g.course_id = c.id AND g.active = 1) AS group_count
                  FROM courses c ORDER BY c.id`);
  if (req.user.role !== 'admin' && !(req.user.role === 'teacher' && req.query.all)) {
    const allowed = new Set(myGroups(req.user).map((g) => g.course_id));
    rows = rows.filter((c) => allowed.has(c.id));
  }
  return { courses: rows };
}));

app.get('/api/courses/:id', auth('teacher', 'admin'), wrap((req) => {
  const cid = id(req.params.id);
  if (req.user.role !== 'admin' && !myGroups(req.user).some((g) => g.course_id === cid)) fail(403, "Bu kursga ruxsat yo'q");
  return courseTree(cid);
}));

app.post('/api/courses/import', auth('admin'), wrap(() => { const s = importAll(); refreshMaterialDirs(); return { summary: s }; }));

// ------------------------------------------------------------------ guruhlar
// Faoliyat tarixi: kim, qachon, nima qildi (administrator ko'radi)
function audit(user, action, entity, entityId, title, details) {
  run('INSERT INTO audit_log (user_id, user_name, user_role, action, entity, entity_id, title, details) VALUES (?,?,?,?,?,?,?,?)',
    user ? user.id : null, user ? user.name : null, user ? user.role : null, action, entity, entityId ?? null, title ?? null, details ?? null);
}
const adminIds = (exceptId) => all("SELECT id FROM users WHERE role IN ('admin','dev') AND active = 1 AND id != ?", exceptId || 0).map((r) => r.id);

function myGroups(user) {
  const base = `SELECT g.*, c.title AS course_title, c.slug, u.name AS teacher_name, cb.name AS created_by_name,
                (SELECT count(*) FROM group_students gs WHERE gs.group_id = g.id) AS student_count
                FROM groups g JOIN courses c ON c.id = g.course_id LEFT JOIN users u ON u.id = g.teacher_id
                LEFT JOIN users cb ON cb.id = g.created_by WHERE g.deleted_at IS NULL`;
  if (user.role === 'admin') return all(`${base} ORDER BY g.active DESC, g.start_date DESC`);
  if (user.role === 'teacher') return all(`${base} AND g.teacher_id = ? ORDER BY g.active DESC, g.start_date DESC`, user.id);
  if (user.role === 'parent') return all(`${base} AND g.id IN (SELECT group_id FROM group_students WHERE student_id IN (SELECT student_id FROM parent_links WHERE parent_id = ?)) ORDER BY g.active DESC, g.start_date DESC`, user.id);
  return all(`${base} AND g.id IN (SELECT group_id FROM group_students WHERE student_id = ?) ORDER BY g.active DESC, g.start_date DESC`, user.id);
}
const parentsOf = (sid) => all('SELECT parent_id FROM parent_links WHERE student_id = ?', sid).map((r) => r.parent_id);
const isChildOf = (parentId, sid) => !!one('SELECT 1 FROM parent_links WHERE parent_id = ? AND student_id = ?', parentId, sid);

function groupFor(user, groupId) {
  const g = one(`SELECT g.*, c.title AS course_title, c.slug, c.plan_url, u.name AS teacher_name FROM groups g
                 JOIN courses c ON c.id = g.course_id LEFT JOIN users u ON u.id = g.teacher_id WHERE g.id = ?`, groupId) || fail(404, 'Guruh topilmadi');
  if (g.deleted_at && user.role !== 'admin') fail(404, "Guruh o'chirilgan");
  if (user.role === 'parent') fail(403, "Ruxsat yo'q");
  if (user.role === 'teacher' && g.teacher_id !== user.id) fail(403, "Bu guruh sizga biriktirilmagan");
  if (user.role === 'student' && !one('SELECT 1 FROM group_students WHERE group_id = ? AND student_id = ?', groupId, user.id)) fail(403, "Siz bu guruhda emassiz");
  if (user.role === 'student') g.plan_url = null; // o'quv reja o'quvchilarga ko'rsatilmaydi
  return g;
}

// Dars jadvali: boshlanish sanasidan hafta kunlari bo'yicha har bir darsga sana; muddat — keyingi dars sanasi
function buildSchedule(groupId, { keepExisting = false } = {}) {
  const g = one('SELECT * FROM groups WHERE id = ?', groupId);
  const days = new Set(g.days.split(',').map(Number).filter((d) => d >= 1 && d <= 7));
  if (!days.size) fail(400, 'Kamida bitta dars kuni tanlang');
  const lessons = all('SELECT id FROM lessons WHERE course_id = ? ORDER BY position', g.course_id);
  const d = new Date(g.start_date + 'T00:00:00Z');
  const dates = [];
  while (dates.length < lessons.length + 1) {
    const wd = d.getUTCDay() === 0 ? 7 : d.getUTCDay();
    if (days.has(wd)) dates.push(d.toISOString().slice(0, 10));
    d.setUTCDate(d.getUTCDate() + 1);
  }
  lessons.forEach((l, i) => {
    const exists = one('SELECT 1 FROM group_lessons WHERE group_id = ? AND lesson_id = ?', groupId, l.id);
    if (exists && keepExisting) return;
    if (exists) run('UPDATE group_lessons SET date = ?, deadline = ? WHERE group_id = ? AND lesson_id = ?', dates[i], dates[i + 1], groupId, l.id);
    else run('INSERT INTO group_lessons (group_id, lesson_id, date, deadline) VALUES (?,?,?,?)', groupId, l.id, dates[i], dates[i + 1]);
  });
}

function validateGroup(b, partial) {
  const out = {};
  if (!partial || b.name !== undefined) { out.name = str(b.name, 120); if (!out.name) fail(400, 'Guruh nomi majburiy'); }
  if (!partial || b.course_id !== undefined) { out.course_id = id(b.course_id); one('SELECT 1 FROM courses WHERE id = ?', out.course_id) || fail(400, 'Kurs topilmadi'); }
  if (b.teacher_id !== undefined) {
    out.teacher_id = b.teacher_id ? id(b.teacher_id) : null;
    if (out.teacher_id && !one("SELECT 1 FROM users WHERE id = ? AND role = 'teacher'", out.teacher_id)) fail(400, "O'qituvchi topilmadi");
  }
  if (!partial || b.start_date !== undefined) { out.start_date = str(b.start_date, 10); if (!isDate(out.start_date)) fail(400, 'Boshlanish sanasi YYYY-MM-DD'); }
  if (!partial || b.days !== undefined) {
    const arr = (Array.isArray(b.days) ? b.days : String(b.days || '').split(',')).map(Number).filter((d) => d >= 1 && d <= 7);
    if (!arr.length) fail(400, 'Kamida bitta dars kuni tanlang');
    out.days = [...new Set(arr)].sort().join(',');
  }
  if (b.time !== undefined) out.time = str(b.time, 5) || null;
  if (b.price !== undefined) {
    out.price = Number(b.price) || 0;
    if (!Number.isInteger(out.price) || out.price < 0) fail(400, "Oylik narx musbat butun son bo'lsin");
  }
  if (b.max_attempts !== undefined) {
    out.max_attempts = Number(b.max_attempts) || 0;
    if (!Number.isInteger(out.max_attempts) || out.max_attempts < 0 || out.max_attempts > 50) fail(400, 'Topshirishlar soni 0 dan 50 gacha (0 — cheklanmagan)');
  }
  if (b.active !== undefined) out.active = b.active ? 1 : 0;
  return out;
}
const DAY_UZ = ['', 'Du', 'Se', 'Chor', 'Pay', 'Ju', 'Sha', 'Yak'];
const groupSummary = (g) => {
  const c = one('SELECT title FROM courses WHERE id = ?', g.course_id);
  return `${c ? c.title : ''} · ${String(g.days).split(',').map((x) => DAY_UZ[+x]).join('/')} ${g.time || ''}`.trim();
};

app.get('/api/groups', auth(), wrap((req) => ({ groups: myGroups(req.user) })));

// O'chirilgan guruhlar arxivi (administrator)
app.get('/api/groups-archive', auth('admin'), wrap(() => ({
  groups: all(`SELECT g.*, c.title AS course_title, c.slug, u.name AS teacher_name, d.name AS deleted_by_name, d.role AS deleted_by_role, cb.name AS created_by_name,
               (SELECT count(*) FROM group_students gs WHERE gs.group_id = g.id) AS student_count,
               (SELECT count(*) FROM submissions s WHERE s.group_id = g.id) AS submission_count
               FROM groups g JOIN courses c ON c.id = g.course_id LEFT JOIN users u ON u.id = g.teacher_id
               LEFT JOIN users d ON d.id = g.deleted_by LEFT JOIN users cb ON cb.id = g.created_by
               WHERE g.deleted_at IS NOT NULL ORDER BY g.deleted_at DESC`),
})));

app.post('/api/groups', auth('admin', 'teacher'), wrap((req) => {
  const body = { ...req.body };
  if (req.user.role === 'teacher') { body.teacher_id = req.user.id; delete body.price; } // o'qituvchi faqat o'zi uchun ochadi, narxni administrator belgilaydi
  const v = validateGroup(body, false);
  const gid = tx(() => {
    const r = run('INSERT INTO groups (name, course_id, teacher_id, start_date, days, time, price, created_by, max_attempts) VALUES (?,?,?,?,?,?,?,?,?)',
      v.name, v.course_id, v.teacher_id ?? null, v.start_date, v.days, v.time ?? null, v.price ?? 0, req.user.id, v.max_attempts ?? 0);
    const newId = Number(r.lastInsertRowid);
    buildSchedule(newId);
    return newId;
  });
  audit(req.user, 'create', 'group', gid, v.name, groupSummary(v));
  if (req.user.role === 'teacher') notify(adminIds(), 'group', `${req.user.name} yangi guruh ochdi: «${v.name}»`, `#/groups/${gid}`);
  return { group: groupFor(req.user, gid) };
}));

app.patch('/api/groups/:id', auth('admin', 'teacher'), wrap((req) => {
  const gid = id(req.params.id);
  const g = groupFor(req.user, gid);
  if (g.deleted_at) fail(400, "Guruh o'chirilgan — avval tiklang");
  const body = { ...req.body };
  if (req.user.role === 'teacher') { delete body.teacher_id; delete body.price; } // narx va o'qituvchini faqat administrator o'zgartiradi
  const v = validateGroup(body, true);
  if (v.course_id && v.course_id !== g.course_id && one('SELECT 1 FROM submissions WHERE group_id = ? LIMIT 1', gid)) fail(400, "Topshirilgan vazifalari bor guruhning kursini o'zgartirib bo'lmaydi");
  tx(() => {
    const fields = Object.keys(v);
    if (fields.length) run(`UPDATE groups SET ${fields.map((f) => `${f} = ?`).join(', ')} WHERE id = ?`, ...fields.map((f) => v[f]), gid);
    if (v.course_id && v.course_id !== g.course_id) run('DELETE FROM group_lessons WHERE group_id = ?', gid);
    if (v.start_date || v.days || v.course_id || req.body.rebuild_schedule) buildSchedule(gid);
  });
  const LBL = { name: 'nomi', course_id: 'kursi', teacher_id: "o'qituvchisi", start_date: 'boshlanish sanasi', days: 'dars kunlari', time: 'vaqti', price: 'narxi', active: 'holati' };
  const changed = Object.keys(v).filter((k) => String(v[k] ?? '') !== String(g[k] ?? '')).map((k) => LBL[k] || k);
  if (changed.length) audit(req.user, 'update', 'group', gid, v.name || g.name, `O'zgardi: ${changed.join(', ')}`);
  return { group: groupFor(req.user, gid) };
}));

// O'chirish — arxivga (ma'lumotlar saqlanadi, administrator tiklay oladi)
app.delete('/api/groups/:id', auth('admin', 'teacher'), wrap((req) => {
  const gid = id(req.params.id);
  const g = groupFor(req.user, gid);
  if (g.deleted_at) {
    // arxivdagi guruhni butunlay o'chirish — faqat administrator
    if (req.user.role !== 'admin') fail(403, "Ruxsat yo'q");
    for (const f of all('SELECT stored FROM attachments WHERE group_id = ?', gid)) fs.rm(path.join(FILE_DIR, f.stored), { force: true }, () => {});
    for (const v of all('SELECT stored FROM lesson_videos WHERE group_id = ?', gid)) fs.rm(path.join(VIDEO_DIR, v.stored), { force: true }, () => {});
    run('DELETE FROM groups WHERE id = ?', gid);
    audit(req.user, 'purge', 'group', gid, g.name, 'Arxivdan butunlay o\'chirildi');
    return { ok: true, purged: true };
  }
  run("UPDATE groups SET deleted_at = datetime('now'), deleted_by = ?, active = 0 WHERE id = ?", req.user.id, gid);
  const n = one('SELECT count(*) AS n FROM group_students WHERE group_id = ?', gid).n;
  audit(req.user, 'delete', 'group', gid, g.name, `${groupSummary(g)} · ${n} o'quvchi`);
  if (req.user.role === 'teacher') notify(adminIds(), 'group', `${req.user.name} «${g.name}» guruhini o'chirdi`, '#/groups/archive');
  return { ok: true };
}));

app.post('/api/groups/:id/restore', auth('admin'), wrap((req) => {
  const gid = id(req.params.id);
  const g = one('SELECT * FROM groups WHERE id = ?', gid) || fail(404, 'Guruh topilmadi');
  if (!g.deleted_at) fail(400, "Guruh o'chirilmagan");
  run('UPDATE groups SET deleted_at = NULL, deleted_by = NULL, active = 1 WHERE id = ?', gid);
  audit(req.user, 'restore', 'group', gid, g.name, 'Arxivdan tiklandi');
  if (g.teacher_id) notify(g.teacher_id, 'group', `«${g.name}» guruhi tiklandi`, `#/groups/${gid}`);
  return { ok: true };
}));

app.put('/api/groups/:id/students', auth('admin', 'teacher'), wrap((req) => {
  const gid = id(req.params.id);
  const g = groupFor(req.user, gid);
  const ids = [...new Set((req.body.student_ids || []).map(id))];
  const before = new Set(all('SELECT student_id FROM group_students WHERE group_id = ?', gid).map((r) => r.student_id));
  tx(() => {
    run('DELETE FROM group_students WHERE group_id = ?', gid);
    for (const sid of ids) {
      if (!one("SELECT 1 FROM users WHERE id = ? AND role = 'student'", sid)) fail(400, `O'quvchi topilmadi: ${sid}`);
      run('INSERT INTO group_students (group_id, student_id) VALUES (?,?)', gid, sid);
    }
  });
  const added = ids.filter((x) => !before.has(x)).length, removed = [...before].filter((x) => !ids.includes(x)).length;
  if (added || removed) audit(req.user, 'students', 'group', gid, g.name, `${added ? `+${added} qo'shildi` : ''}${added && removed ? ', ' : ''}${removed ? `−${removed} chiqarildi` : ''} · jami ${ids.length}`);
  return { ok: true, count: ids.length };
}));

// Faoliyat tarixi (administrator)
app.get('/api/activity', auth('admin'), wrap((req) => {
  const role = str(req.query.role, 20), entity = str(req.query.entity, 20);
  const limit = Math.min(500, Number(req.query.limit) || 200);
  return { items: all(`SELECT * FROM audit_log WHERE (? = '' OR user_role = ?) AND (? = '' OR entity = ?) ORDER BY id DESC LIMIT ?`, role, role, entity, entity, limit) };
}));

// Holat: berilmagan (dars hali ochilmagan) | kutilmoqda (ochiq, muddat o'tmagan) | bajarilmagan (muddat o'tdi)
//        tekshirilmoqda | qaytarilgan | qabul
function lessonState(gl) {
  const t = today();
  const available = !!gl.opened || (!!gl.date && gl.date <= t);
  return { available, overdue: available && !!gl.deadline && gl.deadline < t };
}
function statusOf(gl, sub) {
  if (sub) return sub.status;
  const s = lessonState(gl);
  if (!s.available) return 'berilmagan';
  return s.overdue ? 'bajarilmagan' : 'kutilmoqda';
}

app.get('/api/groups/:id', auth(), wrap((req) => {
  const gid = id(req.params.id);
  const g = groupFor(req.user, gid);
  const lessons = all(`SELECT l.id, l.title, l.num, l.position, l.url, l.week, l.day, l.tag, m.title AS module_title, m.position AS module_position,
                       gl.date, gl.deadline, gl.opened
                       FROM lessons l JOIN modules m ON m.id = l.module_id
                       LEFT JOIN group_lessons gl ON gl.lesson_id = l.id AND gl.group_id = ?
                       WHERE l.course_id = ? ORDER BY l.position`, gid, g.course_id);
  const students = all(`SELECT u.id, u.name, u.login, u.phone, u.avatar FROM group_students gs JOIN users u ON u.id = gs.student_id
                        WHERE gs.group_id = ? ORDER BY u.name`, gid);
  if (req.user.role === 'student') {
    const subs = all('SELECT * FROM submissions WHERE group_id = ? AND student_id = ?', gid, req.user.id);
    const cc = all('SELECT lesson_id, count(*) AS n FROM comments WHERE group_id = ? AND student_id = ? GROUP BY lesson_id', gid, req.user.id);
    for (const l of lessons) {
      const sub = subs.find((s) => s.lesson_id === l.id);
      const st = lessonState(l);
      l.available = st.available;
      l.status = statusOf(l, sub);
      l.submitted_at = sub ? sub.submitted_at : null;
      l.score = sub ? sub.score : null;
      l.comment_count = (cc.find((c) => c.lesson_id === l.id) || { n: 0 }).n;
      l.url = null; // dars materiali o'quvchilarga ko'rsatilmaydi
    }
    const certificate = one('SELECT code, issued_at FROM certificates WHERE group_id = ? AND student_id = ?', gid, req.user.id) || null;
    return { group: g, lessons, certificate };
  }
  const counts = all(`SELECT lesson_id, count(*) AS submitted, sum(status = 'qabul') AS accepted, sum(status = 'tekshirilmoqda') AS pending
                      FROM submissions WHERE group_id = ? GROUP BY lesson_id`, gid);
  for (const l of lessons) {
    const c = counts.find((x) => x.lesson_id === l.id) || { submitted: 0, accepted: 0, pending: 0 };
    Object.assign(l, { submitted: c.submitted, accepted: c.accepted, pending: c.pending }, lessonState(l));
  }
  const progress = all(`SELECT student_id, count(*) AS submitted, sum(status = 'qabul') AS accepted, avg(score) AS avg_score
                        FROM submissions WHERE group_id = ? GROUP BY student_id`, gid);
  const att = all('SELECT student_id, count(*) AS total, sum(present) AS present FROM attendance WHERE group_id = ? GROUP BY student_id', gid);
  const given = lessons.filter((l) => l.available).length;
  for (const s of students) {
    const p = progress.find((x) => x.student_id === s.id) || { submitted: 0, accepted: 0, avg_score: null };
    const a = att.find((x) => x.student_id === s.id) || { total: 0, present: 0 };
    Object.assign(s, { submitted: p.submitted, accepted: p.accepted, avg_score: p.avg_score === null ? null : Math.round(p.avg_score), given, att_total: a.total, att_present: a.present });
    s.certificate = (one('SELECT code FROM certificates WHERE group_id = ? AND student_id = ?', gid, s.id) || {}).code || null;
  }
  return { group: g, lessons, students };
}));

// Jadvalni o'zgartirish (o'qituvchi yoki administrator)
app.patch('/api/groups/:gid/lessons/:lid', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  groupFor(req.user, gid);
  const gl = one('SELECT * FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || fail(404, 'Dars topilmadi');
  const date = req.body.date !== undefined ? str(req.body.date, 10) || null : gl.date;
  const deadline = req.body.deadline !== undefined ? str(req.body.deadline, 10) || null : gl.deadline;
  if ((date && !isDate(date)) || (deadline && !isDate(deadline))) fail(400, 'Sana formati YYYY-MM-DD');
  const opened = req.body.opened !== undefined ? (req.body.opened ? 1 : 0) : gl.opened;
  run('UPDATE group_lessons SET date = ?, deadline = ?, opened = ? WHERE group_id = ? AND lesson_id = ?', date, deadline, opened, gid, lid);
  if (opened && !lessonState(gl).available) notify(groupStudentIds(gid), 'open', `Yangi dars ochildi: ${lessonTitle(lid)}`, `#/groups/${gid}/lessons/${lid}`);
  return { ok: true };
}));

// Topshirish urinishlari: dars chegarasi (bo'lmasa — guruhniki), 0 = cheklanmagan; o'qituvchi qo'shimcha urinish bera oladi
function attemptsInfo(gid, lid, sub) {
  const gl = one('SELECT max_attempts FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || {};
  const g = one('SELECT max_attempts FROM groups WHERE id = ?', gid) || {};
  const base = gl.max_attempts !== null && gl.max_attempts !== undefined ? gl.max_attempts : (g.max_attempts || 0);
  const used = sub ? sub.attempts || 1 : 0;
  const limit = base ? base + (sub ? sub.extra_attempts || 0 : 0) : 0;
  return { used, limit, base, left: limit ? Math.max(0, limit - used) : null, locked: !!limit && used >= limit };
}

// Barcha darslarni birdan ochish yoki jadvalga qaytarish (o'qituvchi / administrator)
app.post('/api/groups/:gid/lessons-open', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid);
  const g = groupFor(req.user, gid);
  const open = req.body.opened ? 1 : 0;
  const count = () => one('SELECT count(*) AS n FROM group_lessons WHERE group_id = ? AND (opened = 1 OR date <= ?)', gid, today()).n;
  const was = count();
  run('UPDATE group_lessons SET opened = ? WHERE group_id = ?', open, gid);
  const now = count();
  audit(req.user, 'update', 'group', gid, g.name, open ? "Barcha darslar o'quvchilarga ochildi" : "Darslar jadval bo'yicha ochiladigan qilindi");
  if (open && now > was) notify(groupStudentIds(gid), 'open', `«${g.name}»: barcha darslar ochildi (${now} ta)`, `#/groups/${gid}`);
  return { ok: true, available: now };
}));

// Jadval: tanlangan kunlar oralig'idagi darslar (har kim o'z guruhlari bo'yicha)
app.get('/api/schedule', auth(), wrap((req) => {
  const from = isDate(req.query.from) ? req.query.from : today();
  const days = Math.min(120, Math.max(1, Number(req.query.days) || 28));
  const to = localDate(new Date(from + 'T00:00:00').getTime() + (days - 1) * 86400000);
  const ids = myGroups(req.user).filter((g) => g.active).map((g) => g.id);
  if (!ids.length) return { from, to, items: [] };
  const items = all(`SELECT gl.date, gl.deadline, gl.opened, l.id AS lesson_id, l.title AS lesson, l.num, l.tag, m.title AS module_title,
                       g.id AS group_id, g.name AS group_name, g.time, c.slug, c.title AS course_title
                     FROM group_lessons gl JOIN groups g ON g.id = gl.group_id JOIN lessons l ON l.id = gl.lesson_id
                     JOIN modules m ON m.id = l.module_id JOIN courses c ON c.id = g.course_id
                     WHERE gl.group_id IN (${ids.map(() => '?').join(',')}) AND gl.date BETWEEN ? AND ?
                     ORDER BY gl.date, g.time, l.position`, ...ids, from, to);
  return { from, to, items };
}));

// ------------------------------------------------------------------ uyga vazifa va fayllar
// kind: 'task' — o'qituvchi yuklagan vazifa fayli; 'submission' — o'quvchi javobiga biriktirgan fayl
const FILE_DIR = path.join(DATA_DIR, 'files');
fs.mkdirSync(FILE_DIR, { recursive: true });
const MAX_FILE = 25 * 1024 * 1024;
const ALLOWED_EXT = /\.(pdf|docx?|xlsx?|pptx?|txt|csv|rtf|odt|ods|odp|zip|rar|7z|png|jpe?g|gif|webp|mp3|mp4|webm|js|ts|py|java|cpp|c|cs|json|sql|html|css|md)$/i;
const filesFor = (gid, lid, kind, ownerId) => all(`SELECT id, name, size, mime, created_at FROM attachments
  WHERE group_id = ? AND lesson_id = ? AND kind = ? AND (? IS NULL OR owner_id = ?) ORDER BY id`, gid, lid, kind, ownerId ?? null, ownerId ?? null);

// Vazifa matni (o'qituvchi / administrator)
app.put('/api/groups/:gid/lessons/:lid/task', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  const g = groupFor(req.user, gid);
  one('SELECT 1 FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || fail(404, 'Dars topilmadi');
  const text = str(req.body.text, 20000) || null;
  const had = one('SELECT task_updated_at FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid).task_updated_at;
  const hasFiles = filesFor(gid, lid, 'task').length > 0;
  run("UPDATE group_lessons SET task_text = ?, task_updated_at = datetime('now') WHERE group_id = ? AND lesson_id = ?", text, gid, lid);
  if (req.body.max_attempts !== undefined) {
    const m = req.body.max_attempts === '' || req.body.max_attempts === null ? null : Number(req.body.max_attempts);
    if (m !== null && (!Number.isInteger(m) || m < 0 || m > 50)) fail(400, 'Topshirishlar soni 0 dan 50 gacha');
    run('UPDATE group_lessons SET max_attempts = ? WHERE group_id = ? AND lesson_id = ?', m, gid, lid);
  }
  if ((text || hasFiles) && !had && req.body.notify !== false) notify(groupStudentIds(gid), 'task', `Yangi uyga vazifa: ${lessonTitle(lid)}`, `#/groups/${gid}/lessons/${lid}`);
  audit(req.user, 'update', 'group', gid, g.name, `«${lessonTitle(lid)}» darsiga vazifa ${text || hasFiles ? 'berildi' : "o'chirildi"}`);
  return { ok: true };
}));

// Fayl yuklash: tanasi — faylning o'zi (raw), nomi X-File-Name sarlavhasida
app.post('/api/groups/:gid/lessons/:lid/files', auth(), express.raw({ type: () => true, limit: MAX_FILE }), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  groupFor(req.user, gid);
  const gl = one('SELECT * FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || fail(404, 'Dars topilmadi');
  const kind = req.user.role === 'student' ? 'submission' : 'task';
  if (kind === 'submission') {
    if (!lessonState(gl).available) fail(400, 'Bu dars hali ochilmagan');
    const sub = one('SELECT * FROM submissions WHERE group_id = ? AND lesson_id = ? AND student_id = ?', gid, lid, req.user.id);
    if (sub && sub.status === 'qabul') fail(400, 'Vazifa allaqachon qabul qilingan');
    if (attemptsInfo(gid, lid, sub).locked) fail(400, "Topshirishlar soni tugagan. O'qituvchi qayta ochishi kerak");
    if (one('SELECT count(*) AS n FROM attachments WHERE group_id = ? AND lesson_id = ? AND kind = ? AND owner_id = ?', gid, lid, kind, req.user.id).n >= 10) fail(400, "Ko'pi bilan 10 ta fayl");
  }
  let name;
  try { name = decodeURIComponent(String(req.headers['x-file-name'] || '')); } catch { name = ''; }
  name = path.basename(name).replace(/[\u0000-\u001f<>:"/\\|?*]/g, '_').slice(0, 160);
  if (!name) fail(400, 'Fayl nomi yo\'q');
  if (!ALLOWED_EXT.test(name)) fail(400, "Bu turdagi fayl qabul qilinmaydi (PDF, Word, Excel, PowerPoint, rasm, arxiv, kod fayllari mumkin)");
  const buf = Buffer.isBuffer(req.body) ? req.body : Buffer.alloc(0);
  if (!buf.length) fail(400, "Fayl bo'sh");
  const stored = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}`;
  fs.writeFileSync(path.join(FILE_DIR, stored), buf);
  const mime = str(req.headers['x-file-type'], 100) || 'application/octet-stream';
  const r = run('INSERT INTO attachments (group_id, lesson_id, kind, owner_id, name, mime, size, stored) VALUES (?,?,?,?,?,?,?,?)',
    gid, lid, kind, req.user.id, name, mime, buf.length, stored);
  return { file: { id: Number(r.lastInsertRowid), name, size: buf.length, mime } };
}));

function fileAccess(user, f) {
  if (user.role === 'admin') return true;
  const g = one('SELECT teacher_id, deleted_at FROM groups WHERE id = ?', f.group_id);
  if (!g) return false;
  if (user.role === 'teacher') return g.teacher_id === user.id;
  if (g.deleted_at) return false;
  if (f.kind === 'submission') return f.owner_id === user.id;
  const gl = one('SELECT * FROM group_lessons WHERE group_id = ? AND lesson_id = ?', f.group_id, f.lesson_id);
  return !!one('SELECT 1 FROM group_students WHERE group_id = ? AND student_id = ?', f.group_id, user.id) && gl && lessonState(gl).available;
}

app.get('/api/files/:id', auth(), (req, res, next) => {
  try {
    const f = one('SELECT * FROM attachments WHERE id = ?', id(req.params.id));
    if (!f || !fileAccess(req.user, f)) return res.status(404).json({ error: 'Fayl topilmadi' });
    const inline = req.query.view && /^(image\/(png|jpeg|gif|webp)|application\/pdf)$/.test(f.mime);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Type', inline ? f.mime : 'application/octet-stream');
    res.setHeader('Content-Disposition', `${inline ? 'inline' : 'attachment'}; filename*=UTF-8''${encodeURIComponent(f.name)}`);
    res.sendFile(path.join(FILE_DIR, f.stored), (err) => { if (err && !res.headersSent) res.status(404).end(); });
  } catch (e) { next(e); }
});

app.delete('/api/files/:id', auth(), wrap((req) => {
  const f = one('SELECT * FROM attachments WHERE id = ?', id(req.params.id)) || fail(404, 'Fayl topilmadi');
  const can = req.user.role === 'admin' || f.owner_id === req.user.id || (req.user.role === 'teacher' && f.kind === 'task' && fileAccess(req.user, f));
  if (!can) fail(403, "Ruxsat yo'q");
  if (f.kind === 'submission') {
    const sub = one('SELECT status FROM submissions WHERE group_id = ? AND lesson_id = ? AND student_id = ?', f.group_id, f.lesson_id, f.owner_id);
    if (sub && sub.status === 'qabul' && req.user.role === 'student') fail(400, "Qabul qilingan vazifa faylini o'chirib bo'lmaydi");
  }
  run('DELETE FROM attachments WHERE id = ?', f.id);
  fs.rm(path.join(FILE_DIR, f.stored), { force: true }, () => {});
  return { ok: true };
}));

// ------------------------------------------------------------------ dars videolari
const VIDEO_DIR = path.join(DATA_DIR, 'videos');
fs.mkdirSync(VIDEO_DIR, { recursive: true });
const MAX_VIDEO = 2 * 1024 * 1024 * 1024; // 2 GB
const VIDEO_EXT = { mp4: 'video/mp4', m4v: 'video/mp4', webm: 'video/webm', mov: 'video/quicktime', mkv: 'video/x-matroska', ogv: 'video/ogg' };
const videosFor = (gid, lid, kind = 'lesson') => all('SELECT id, name, size, mime, created_at, title, description, (poster IS NOT NULL) AS has_poster FROM lesson_videos WHERE group_id = ? AND lesson_id = ? AND kind = ? ORDER BY id', gid, lid, kind);

// Faylni oqim bilan diskka yozamiz (katta videolar xotiraga to'liq olinmaydi)
app.post('/api/groups/:gid/lessons/:lid/videos', auth('teacher', 'admin'), (req, res, next) => {
  let out, stored, done = false;
  const finish = (err, body) => { if (done) return; done = true; if (err) { if (out) out.destroy(); if (stored) fs.rm(path.join(VIDEO_DIR, stored), { force: true }, () => {}); next(err); } else res.json(body); };
  try {
    const gid = id(req.params.gid), lid = id(req.params.lid);
    const g = groupFor(req.user, gid);
    one('SELECT 1 FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || fail(404, 'Dars topilmadi');
    let name;
    try { name = decodeURIComponent(String(req.headers['x-file-name'] || '')); } catch { name = ''; }
    name = path.basename(name).replace(/[\u0000-\u001f<>:"/\\|?*]/g, '_').slice(0, 160);
    const ext = (name.split('.').pop() || '').toLowerCase();
    if (!name || !VIDEO_EXT[ext]) fail(400, 'Video formati: MP4, WEBM, MOV, MKV');
    const len = Number(req.headers['content-length'] || 0);
    if (len > MAX_VIDEO) fail(413, 'Video 2 GB dan katta bo\'lmasin');
    stored = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}.${ext}`;
    out = fs.createWriteStream(path.join(VIDEO_DIR, stored));
    let size = 0;
    req.on('data', (c) => { size += c.length; if (size > MAX_VIDEO) { req.unpipe(out); finish(new HttpError(413, "Video 2 GB dan katta bo'lmasin")); } });
    req.on('aborted', () => finish(new HttpError(400, 'Yuklash uzildi')));
    out.on('error', (e) => finish(e));
    out.on('finish', () => {
      if (done) return;
      if (!size) return finish(new HttpError(400, "Fayl bo'sh"));
      try {
        const vkind = req.headers['x-video-kind'] === 'task' ? 'task' : 'lesson';
        const r = run('INSERT INTO lesson_videos (group_id, lesson_id, name, mime, size, stored, owner_id, kind) VALUES (?,?,?,?,?,?,?,?)', gid, lid, name, VIDEO_EXT[ext], size, stored, req.user.id, vkind);
        notify(groupStudentIds(gid), 'video', vkind === 'task' ? `Uyga vazifaga video tushuntirish: ${lessonTitle(lid)}` : `Dars videosi yuklandi: ${lessonTitle(lid)}`, `#/groups/${gid}/lessons/${lid}`);
        audit(req.user, 'update', 'group', gid, g.name, `«${lessonTitle(lid)}» darsiga video yuklandi`);
        finish(null, { video: { id: Number(r.lastInsertRowid), name, size, mime: VIDEO_EXT[ext] } });
      } catch (e) { finish(e); }
    });
    req.pipe(out);
  } catch (e) { finish(e); }
});

function videoAccess(user, v) {
  if (user.role === 'admin') return true;
  const g = one('SELECT teacher_id, deleted_at FROM groups WHERE id = ?', v.group_id);
  if (!g) return false;
  if (user.role === 'teacher') return g.teacher_id === user.id;
  if (g.deleted_at || !one('SELECT 1 FROM group_students WHERE group_id = ? AND student_id = ?', v.group_id, user.id)) return false;
  const gl = one('SELECT * FROM group_lessons WHERE group_id = ? AND lesson_id = ?', v.group_id, v.lesson_id);
  return !!gl && lessonState(gl).available;
}

// Ko'rish: Range so'rovlarini qo'llab-quvvatlaydi (oldinga/orqaga surish ishlaydi)
app.get('/api/videos/:id', auth(), (req, res, next) => {
  try {
    const v = one('SELECT * FROM lesson_videos WHERE id = ?', id(req.params.id));
    if (!v || !videoAccess(req.user, v)) return res.status(404).json({ error: 'Video topilmadi' });
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Content-Disposition', `inline; filename*=UTF-8''${encodeURIComponent(v.name)}`);
    res.sendFile(path.join(VIDEO_DIR, v.stored), { headers: { 'Content-Type': v.mime }, acceptRanges: true, cacheControl: false }, (err) => { if (err && !res.headersSent) res.status(404).end(); });
  } catch (e) { next(e); }
});

app.delete('/api/videos/:id', auth('teacher', 'admin'), wrap((req) => {
  const v = one('SELECT * FROM lesson_videos WHERE id = ?', id(req.params.id)) || fail(404, 'Video topilmadi');
  if (!videoAccess(req.user, v)) fail(403, "Ruxsat yo'q");
  run('DELETE FROM lesson_videos WHERE id = ?', v.id);
  fs.rm(path.join(VIDEO_DIR, v.stored), { force: true }, () => {});
  if (v.poster) fs.rm(path.join(VIDEO_DIR, v.poster), { force: true }, () => {});
  return { ok: true };
}));

// Video izohi va banneri (muqova rasmi)
app.patch('/api/videos/:id', auth('teacher', 'admin'), wrap((req) => {
  const v = one('SELECT * FROM lesson_videos WHERE id = ?', id(req.params.id)) || fail(404, 'Video topilmadi');
  if (!videoAccess(req.user, v)) fail(403, "Ruxsat yo'q");
  if (req.body.title !== undefined) run('UPDATE lesson_videos SET title = ? WHERE id = ?', str(req.body.title, 200) || null, v.id);
  if (req.body.description !== undefined) run('UPDATE lesson_videos SET description = ? WHERE id = ?', str(req.body.description, 5000) || null, v.id);
  if (req.body.poster !== undefined) {
    if (v.poster) fs.rm(path.join(VIDEO_DIR, v.poster), { force: true }, () => {});
    let name = null;
    if (req.body.poster) {
      const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(req.body.poster));
      if (!m) fail(400, "Rasm formati noto'g'ri (JPG, PNG, WEBP)");
      const buf = Buffer.from(m[2], 'base64');
      if (buf.length > 1.5 * 1024 * 1024) fail(400, 'Banner 1.5 MB dan oshmasin');
      name = `p${v.id}-${Date.now()}.${m[1] === 'jpeg' ? 'jpg' : m[1]}`;
      fs.writeFileSync(path.join(VIDEO_DIR, name), buf);
    }
    run('UPDATE lesson_videos SET poster = ? WHERE id = ?', name, v.id);
  }
  return { ok: true };
}));

app.get('/api/videos/:id/poster', auth(), (req, res, next) => {
  try {
    const v = one('SELECT * FROM lesson_videos WHERE id = ?', id(req.params.id));
    if (!v || !v.poster || !videoAccess(req.user, v)) return res.status(404).end();
    res.sendFile(path.join(VIDEO_DIR, v.poster), { maxAge: '1d' }, (err) => { if (err && !res.headersSent) res.status(404).end(); });
  } catch (e) { next(e); }
});

// YouTube / boshqa video havolasi
app.put('/api/groups/:gid/lessons/:lid/video-url', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  groupFor(req.user, gid);
  one('SELECT 1 FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || fail(404, 'Dars topilmadi');
  const url = str(req.body.url, 500);
  if (url && !/^https?:\/\//i.test(url)) fail(400, 'Havola http:// yoki https:// bilan boshlansin');
  const had = one('SELECT video_url FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid).video_url;
  run('UPDATE group_lessons SET video_url = ? WHERE group_id = ? AND lesson_id = ?', url || null, gid, lid);
  if (url && !had) notify(groupStudentIds(gid), 'video', `Dars videosi qo'shildi: ${lessonTitle(lid)}`, `#/groups/${gid}/lessons/${lid}`);
  return { ok: true };
}));

// Bitta dars: o'quvchi uchun — o'z vazifasi; o'qituvchi uchun — barcha o'quvchilar
app.get('/api/groups/:gid/lessons/:lid', auth(), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  const g = groupFor(req.user, gid);
  const lesson = one(`SELECT l.*, m.title AS module_title, gl.date, gl.deadline, gl.opened, gl.task_text, gl.task_updated_at, gl.video_url, gl.max_attempts FROM lessons l
                      JOIN modules m ON m.id = l.module_id
                      LEFT JOIN group_lessons gl ON gl.lesson_id = l.id AND gl.group_id = ?
                      WHERE l.id = ? AND l.course_id = ?`, gid, lid, g.course_id) || fail(404, 'Dars topilmadi');
  Object.assign(lesson, lessonState(lesson));
  const nav = all('SELECT id, title FROM lessons WHERE course_id = ? ORDER BY position', g.course_id);
  const idx = nav.findIndex((l) => l.id === lid);
  const around = { prev: nav[idx - 1] || null, next: nav[idx + 1] || null };
  const commentsFor = (sid) => all(`SELECT c.id, c.text, c.created_at, u.name AS author, u.role AS author_role, u.avatar AS author_avatar FROM comments c
                                    JOIN users u ON u.id = c.author_id WHERE c.group_id = ? AND c.lesson_id = ? AND c.student_id = ? ORDER BY c.id`, gid, lid, sid);
  if (req.user.role === 'student') {
    lesson.url = null; // dars materiali o'quvchilarga ko'rsatilmaydi
    const sub = one('SELECT * FROM submissions WHERE group_id = ? AND lesson_id = ? AND student_id = ?', gid, lid, req.user.id);
    const task = lesson.available ? { text: lesson.task_text || null, updated_at: lesson.task_updated_at, files: filesFor(gid, lid, 'task'), videos: videosFor(gid, lid, 'task') } : null;
    if (!lesson.available) lesson.video_url = null;
    const videos = lesson.available ? videosFor(gid, lid) : [];
    return { group: g, lesson, ...around, task, videos, my_files: filesFor(gid, lid, 'submission', req.user.id), submission: sub || null, attempts: attemptsInfo(gid, lid, sub), status: statusOf(lesson, sub), comments: commentsFor(req.user.id) };
  }
  const students = all(`SELECT u.id, u.name, s.id AS submission_id, s.text, s.link, s.submitted_at, s.status, s.score, s.feedback, s.graded_at, s.attempts, s.extra_attempts, s.ai_result, s.ai_at,
                        a.present, (SELECT count(*) FROM comments c WHERE c.group_id = ? AND c.lesson_id = ? AND c.student_id = u.id) AS comment_count
                        FROM group_students gs JOIN users u ON u.id = gs.student_id
                        LEFT JOIN submissions s ON s.group_id = gs.group_id AND s.lesson_id = ? AND s.student_id = u.id
                        LEFT JOIN attendance a ON a.group_id = gs.group_id AND a.lesson_id = ? AND a.student_id = u.id
                        WHERE gs.group_id = ? ORDER BY u.name`, gid, lid, lid, lid, gid);
  for (const s of students) s.state = statusOf(lesson, s.submission_id ? { status: s.status } : null);
  for (const s of students) { s.ai = s.ai_result ? JSON.parse(s.ai_result) : null; delete s.ai_result; s.files = filesFor(gid, lid, 'submission', s.id); s.att = attemptsInfo(gid, lid, s.submission_id ? s : null); }
  const gmax = (one('SELECT max_attempts FROM groups WHERE id = ?', gid) || {}).max_attempts || 0;
  const task = { text: lesson.task_text || null, updated_at: lesson.task_updated_at, files: filesFor(gid, lid, 'task'), videos: videosFor(gid, lid, 'task'), max_attempts: lesson.max_attempts, group_max: gmax };
  return { group: g, lesson, ...around, task, videos: videosFor(gid, lid), students };
}));

app.get('/api/groups/:gid/lessons/:lid/comments/:sid', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid), sid = id(req.params.sid);
  groupFor(req.user, gid);
  return { comments: all(`SELECT c.id, c.text, c.created_at, u.name AS author, u.role AS author_role, u.avatar AS author_avatar FROM comments c
                          JOIN users u ON u.id = c.author_id WHERE c.group_id = ? AND c.lesson_id = ? AND c.student_id = ? ORDER BY c.id`, gid, lid, sid) };
}));

// O'quvchi vazifani topshiradi (qayta topshirish — faqat qaytarilgan yoki tekshirilmagan bo'lsa)
app.post('/api/groups/:gid/lessons/:lid/submit', auth('student'), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  groupFor(req.user, gid);
  const gl = one('SELECT * FROM group_lessons WHERE group_id = ? AND lesson_id = ?', gid, lid) || fail(404, 'Dars topilmadi');
  if (!lessonState(gl).available) fail(400, 'Bu dars hali ochilmagan');
  const text = str(req.body.text, 20000), link = str(req.body.link, 500);
  if (!text && !link && !filesFor(gid, lid, 'submission', req.user.id).length) fail(400, 'Javob matni, havola yoki fayl biriktiring');
  if (link && !/^https?:\/\//i.test(link)) fail(400, 'Havola http:// yoki https:// bilan boshlansin');
  const sub = one('SELECT * FROM submissions WHERE group_id = ? AND lesson_id = ? AND student_id = ?', gid, lid, req.user.id);
  if (sub && sub.status === 'qabul') fail(400, 'Vazifa allaqachon qabul qilingan');
  if (attemptsInfo(gid, lid, sub).locked) fail(400, "Topshirishlar soni tugagan. O'qituvchi qayta ochishi kerak");
  if (sub) run(`UPDATE submissions SET text=?, link=?, submitted_at=?, status='tekshirilmoqda', attempts = attempts + 1 WHERE id=?`, text, link || null, nowIso(), sub.id);
  else run('INSERT INTO submissions (group_id, lesson_id, student_id, text, link, submitted_at) VALUES (?,?,?,?,?,?)', gid, lid, req.user.id, text, link || null, nowIso());
  const g = one('SELECT teacher_id FROM groups WHERE id = ?', gid);
  notify(g.teacher_id, 'submit', `${req.user.name} vazifa topshirdi: ${lessonTitle(lid)}`, `#/groups/${gid}/lessons/${lid}`);
  if (ai.aiConfig().auto && ai.aiConfig().key) {
    const sid = one('SELECT id FROM submissions WHERE group_id = ? AND lesson_id = ? AND student_id = ?', gid, lid, req.user.id).id;
    runAiCheck(sid).then((res) => notify(g.teacher_id, 'ai', `AI tekshirdi: ${req.user.name} — ${res.score} ball (${res.verdict === 'qabul' ? 'qabul tavsiya' : 'qaytarish tavsiya'})`, `#/groups/${gid}/lessons/${lid}`)).catch((e) => console.error('AI:', e.message));
  }
  return { ok: true };
}));

// Urinishlar tugaganda o'qituvchi yoki administrator vazifani qayta ochadi (+1 urinish)
app.post('/api/submissions/:id/reopen', auth('teacher', 'admin'), wrap((req) => {
  const sub = one('SELECT * FROM submissions WHERE id = ?', id(req.params.id)) || fail(404, 'Topshiriq topilmadi');
  const g = groupFor(req.user, sub.group_id);
  const add = Math.min(10, Math.max(1, Number(req.body.add) || 1));
  run("UPDATE submissions SET extra_attempts = extra_attempts + ?, status = CASE WHEN status = 'qabul' THEN status ELSE 'qaytarilgan' END WHERE id = ?", add, sub.id);
  notify(sub.student_id, 'grade', `Vazifa qayta ochildi: ${lessonTitle(sub.lesson_id)} (+${add} urinish)`, `#/groups/${sub.group_id}/lessons/${sub.lesson_id}`);
  audit(req.user, 'update', 'group', sub.group_id, g.name, `${(one('SELECT name FROM users WHERE id = ?', sub.student_id) || {}).name}: «${lessonTitle(sub.lesson_id)}» qayta ochildi (+${add})`);
  return { ok: true };
}));

// ------------------------------------------------------------------ AI tekshiruv (Gemini)
async function runAiCheck(subId) {
  const sub = one('SELECT * FROM submissions WHERE id = ?', subId);
  if (!sub) throw new HttpError(404, 'Topshiriq topilmadi');
  const les = one(`SELECT l.title, m.title AS module_title, gl.task_text FROM lessons l JOIN modules m ON m.id = l.module_id
                   JOIN group_lessons gl ON gl.lesson_id = l.id AND gl.group_id = ? WHERE l.id = ?`, sub.group_id, sub.lesson_id) || {};
  const taskFiles = all("SELECT name, size, stored FROM attachments WHERE group_id = ? AND lesson_id = ? AND kind = 'task'", sub.group_id, sub.lesson_id);
  const subFiles = all("SELECT name, size, stored FROM attachments WHERE group_id = ? AND lesson_id = ? AND kind = 'submission' AND owner_id = ?", sub.group_id, sub.lesson_id, sub.student_id);
  const res = await ai.gradeSubmission({ lessonTitle: les.title, moduleTitle: les.module_title, task: les.task_text, taskFiles, sub, subFiles, fileDir: FILE_DIR });
  run("UPDATE submissions SET ai_result = ?, ai_at = datetime('now') WHERE id = ?", JSON.stringify(res), sub.id);
  return res;
}

app.post('/api/submissions/:id/ai-check', auth('teacher', 'admin'), async (req, res, next) => {
  try {
    const sub = one('SELECT * FROM submissions WHERE id = ?', id(req.params.id)) || fail(404, 'Topshiriq topilmadi');
    groupFor(req.user, sub.group_id);
    res.json({ ai: await runAiCheck(sub.id) });
  } catch (e) { next(e); }
});

// AI sozlamalari (faqat administrator; kalit to'liq qaytarilmaydi)
app.get('/api/settings/ai', auth('admin'), wrap(() => {
  const c = ai.aiConfig();
  return { has_key: !!c.key, key_mask: c.key ? c.key.slice(0, 4) + '••••' + c.key.slice(-4) : '', model: c.model, auto: c.auto, default_model: ai.DEFAULT_MODEL,
    from_env: !ai.getSetting('gemini_key') && !!process.env.GEMINI_API_KEY };
}));
app.put('/api/settings/ai', auth('admin'), wrap((req) => {
  if (req.body.key !== undefined) { const k = str(req.body.key, 200); ai.setSetting('gemini_key', k || null); }
  if (req.body.model !== undefined) { const m = str(req.body.model, 80); if (m && !/^[\w.-]+$/.test(m)) fail(400, "Model nomi noto'g'ri"); ai.setSetting('gemini_model', m || null); }
  if (req.body.auto !== undefined) ai.setSetting('ai_auto', req.body.auto ? '1' : '0');
  audit(req.user, 'update', 'settings', null, 'AI sozlamalari', null);
  return { ok: true };
}));
app.post('/api/settings/ai/test', auth('admin'), async (req, res, next) => {
  try { await ai.testKey(ai.aiConfig()); res.json({ ok: true }); }
  catch (e) { next(new HttpError(400, `Ulanib bo'lmadi: ${e.message}`)); }
});

// O'qituvchi baholaydi
app.patch('/api/submissions/:id', auth('teacher', 'admin'), wrap((req) => {
  const sid = id(req.params.id);
  const sub = one('SELECT * FROM submissions WHERE id = ?', sid) || fail(404, 'Topshiriq topilmadi');
  groupFor(req.user, sub.group_id);
  const status = req.body.status !== undefined ? str(req.body.status, 20) : sub.status;
  if (!['tekshirilmoqda', 'qaytarilgan', 'qabul'].includes(status)) fail(400, "Holat noto'g'ri");
  let score = req.body.score !== undefined ? req.body.score : sub.score;
  if (score === '' || score === null) score = null;
  else { score = Number(score); if (!Number.isInteger(score) || score < 0 || score > 100) fail(400, "Ball 0 dan 100 gacha butun son"); }
  const feedback = req.body.feedback !== undefined ? str(req.body.feedback, 5000) || null : sub.feedback;
  run('UPDATE submissions SET status=?, score=?, feedback=?, graded_by=?, graded_at=? WHERE id=?', status, score, feedback, req.user.id, nowIso(), sid);
  syncSubmissionCoins(sid);
  if (status !== 'tekshirilmoqda') {
    const what = status === 'qabul' ? `qabul qilindi${score !== null ? ` (${score} ball)` : ''}` : 'qaytarildi — qayta ishlang';
    notify(sub.student_id, 'grade', `Vazifangiz ${what}: ${lessonTitle(sub.lesson_id)}`, `#/groups/${sub.group_id}/lessons/${sub.lesson_id}`);
    const sn = (one('SELECT name FROM users WHERE id = ?', sub.student_id) || {}).name;
    notify(parentsOf(sub.student_id), 'grade', `${sn}: vazifa ${what} — ${lessonTitle(sub.lesson_id)}`, `#/p/tasks/${sub.student_id}`);
  }
  return { ok: true };
}));

// Izoh (o'quvchi — o'z vazifasiga; o'qituvchi — istalgan o'quvchi vazifasiga)
app.post('/api/groups/:gid/lessons/:lid/comments', auth(), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  groupFor(req.user, gid);
  const studentId = req.user.role === 'student' ? req.user.id : id(req.body.student_id);
  if (!one('SELECT 1 FROM group_students WHERE group_id = ? AND student_id = ?', gid, studentId)) fail(400, "O'quvchi bu guruhda emas");
  const text = str(req.body.text, 3000);
  if (!text) fail(400, "Izoh bo'sh");
  run('INSERT INTO comments (group_id, lesson_id, student_id, author_id, text) VALUES (?,?,?,?,?)', gid, lid, studentId, req.user.id, text);
  const to = req.user.role === 'student' ? one('SELECT teacher_id FROM groups WHERE id = ?', gid).teacher_id : studentId;
  notify(to, 'comment', `${req.user.name}: ${text.slice(0, 80)}`, `#/groups/${gid}/lessons/${lid}`);
  return { ok: true };
}));

// Davomat
app.put('/api/groups/:gid/lessons/:lid/attendance', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid), lid = id(req.params.lid);
  groupFor(req.user, gid);
  const marks = req.body.marks || {};
  const prevAtt = new Set(all('SELECT student_id FROM attendance WHERE group_id = ? AND lesson_id = ? AND present = 0', id(req.params.gid), id(req.params.lid)).map((x) => x.student_id));
  tx(() => {
    for (const [sidRaw, present] of Object.entries(marks)) {
      const sid = id(sidRaw);
      if (!one('SELECT 1 FROM group_students WHERE group_id = ? AND student_id = ?', gid, sid)) continue;
      run(`INSERT INTO attendance (group_id, lesson_id, student_id, present) VALUES (?,?,?,?)
           ON CONFLICT (group_id, lesson_id, student_id) DO UPDATE SET present = excluded.present`, gid, lid, sid, present ? 1 : 0);
      if (!present && !prevAtt.has(sid)) { const sn = (one('SELECT name FROM users WHERE id = ?', sid) || {}).name; notify(parentsOf(sid), 'absent', `${sn} bugungi darsga kelmadi: ${lessonTitle(lid)}`, `#/p/attendance/${sid}`); }
      setCoins(sid, `att:${gid}:${lid}`, present ? 2 : 0, `Darsga keldi: ${lessonTitle(lid)}`, req.user.id);
    }
  });
  return { ok: true };
}));

// ------------------------------------------------------------------ reyting va baholar jurnali
function ranking(gid) {
  const rows = all(`SELECT u.id, u.name, u.avatar,
                      coalesce(sum(CASE WHEN s.status = 'qabul' THEN coalesce(s.score, 0) END), 0) AS points,
                      coalesce(sum(s.status = 'qabul'), 0) AS accepted, count(s.id) AS submitted,
                      round(avg(s.score)) AS avg_score
                    FROM group_students gs JOIN users u ON u.id = gs.student_id
                    LEFT JOIN submissions s ON s.group_id = gs.group_id AND s.student_id = u.id
                    WHERE gs.group_id = ? GROUP BY u.id ORDER BY points DESC, accepted DESC, u.name`, gid);
  rows.forEach((r, i) => { r.rank = i + 1; });
  return rows;
}

function groupStats(g) {
  const t = today();
  const lessons = one('SELECT count(*) AS total, coalesce(sum(opened = 1 OR date <= ?), 0) AS given FROM group_lessons WHERE group_id = ?', t, g.id);
  const s = one(`SELECT coalesce(sum(status = 'tekshirilmoqda'), 0) AS pending, coalesce(sum(status = 'qabul'), 0) AS accepted, round(avg(score)) AS avg_score
                 FROM submissions WHERE group_id = ?`, g.id);
  const students = g.student_count ?? one('SELECT count(*) AS n FROM group_students WHERE group_id = ?', g.id).n;
  const expected = students * lessons.given;
  return {
    total: lessons.total, given: lessons.given, pending: s.pending, avg_score: s.avg_score,
    done_pct: expected ? Math.round((s.accepted / expected) * 100) : 0,
  };
}

app.get('/api/groups/:id/ranking', auth(), wrap((req) => {
  const gid = id(req.params.id);
  groupFor(req.user, gid);
  return { ranking: ranking(gid) };
}));

function gradebook(gid) {
  const g = one('SELECT * FROM groups WHERE id = ?', gid);
  const t = today();
  const lessons = all(`SELECT l.id, l.num, l.title, m.position AS module_position, gl.deadline FROM lessons l JOIN modules m ON m.id = l.module_id
                       JOIN group_lessons gl ON gl.lesson_id = l.id AND gl.group_id = ?
                       WHERE l.course_id = ? AND (gl.opened = 1 OR gl.date <= ?) ORDER BY l.position`, gid, g.course_id, t);
  const students = all('SELECT u.id, u.name FROM group_students gs JOIN users u ON u.id = gs.student_id WHERE gs.group_id = ? ORDER BY u.name', gid);
  const subs = all('SELECT student_id, lesson_id, status, score FROM submissions WHERE group_id = ?', gid);
  const att = all('SELECT student_id, lesson_id, present FROM attendance WHERE group_id = ?', gid);
  for (const s of students) {
    s.cells = {};
    for (const l of lessons) {
      const sub = subs.find((x) => x.student_id === s.id && x.lesson_id === l.id);
      const a = att.find((x) => x.student_id === s.id && x.lesson_id === l.id);
      s.cells[l.id] = {
        status: sub ? sub.status : (l.deadline && l.deadline < t ? 'bajarilmagan' : 'kutilmoqda'),
        score: sub ? sub.score : null, present: a ? a.present : null,
      };
    }
  }
  return { lessons, students };
}

app.get('/api/groups/:id/gradebook', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.id);
  groupFor(req.user, gid);
  return gradebook(gid);
}));

app.get('/api/groups/:id/export.csv', auth('teacher', 'admin'), (req, res, next) => {
  try {
    const gid = id(req.params.id);
    const g = groupFor(req.user, gid);
    const { lessons, students } = gradebook(gid);
    const rank = ranking(gid);
    const q = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const LBL = { qabul: '+', qaytarilgan: 'qaytarilgan', tekshirilmoqda: 'tekshirilmoqda', bajarilmagan: '-', kutilmoqda: '' };
    const lines = [["O'quvchi", ...lessons.map((l) => `${l.module_position}.${l.num} ${l.title}`), 'Jami ball', 'Qabul', "O'rtacha"].map(q).join(';')];
    for (const s of students) {
      const r = rank.find((x) => x.id === s.id) || {};
      lines.push([s.name, ...lessons.map((l) => { const c = s.cells[l.id]; return c.score ?? LBL[c.status]; }), r.points, r.accepted, r.avg_score].map(q).join(';'));
    }
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(g.name)}-baholar.csv`);
    res.send('﻿' + lines.join('\r\n'));
  } catch (e) { next(e); }
});

// ------------------------------------------------------------------ e'lonlar
function visibleAnnouncements(user, groupId, limit = 20) {
  const base = `SELECT a.*, u.name AS author, u.role AS author_role, g.name AS group_name FROM announcements a
                JOIN users u ON u.id = a.author_id LEFT JOIN groups g ON g.id = a.group_id`;
  if (groupId) return all(`${base} WHERE a.group_id = ? OR a.group_id IS NULL ORDER BY a.id DESC LIMIT ?`, groupId, limit);
  if (user.role === 'admin') return all(`${base} ORDER BY a.id DESC LIMIT ?`, limit);
  const ids = myGroups(user).map((g) => g.id);
  const inList = ids.length ? `OR a.group_id IN (${ids.map(() => '?').join(',')})` : '';
  return all(`${base} WHERE a.group_id IS NULL ${inList} ORDER BY a.id DESC LIMIT ?`, ...ids, limit);
}

app.get('/api/announcements', auth(), wrap((req) => {
  const gid = req.query.group_id ? id(req.query.group_id) : null;
  if (gid) groupFor(req.user, gid);
  return { announcements: visibleAnnouncements(req.user, gid) };
}));

app.post('/api/announcements', auth('teacher', 'admin'), wrap((req) => {
  const title = str(req.body.title, 200), text = str(req.body.text, 5000);
  const gid = req.body.group_id ? id(req.body.group_id) : null;
  if (!title) fail(400, "E'lon sarlavhasi majburiy");
  if (!gid && req.user.role !== 'admin') fail(400, 'Guruhni tanlang');
  if (gid) groupFor(req.user, gid);
  run('INSERT INTO announcements (group_id, author_id, title, text) VALUES (?,?,?,?)', gid, req.user.id, title, text || null);
  const to = gid ? [...groupStudentIds(gid), ...groupStudentIds(gid).flatMap(parentsOf)] : all('SELECT id FROM users WHERE active = 1 AND id != ?', req.user.id).map((r) => r.id);
  notify(to, 'announce', `E'lon: ${title}`, gid ? `#/groups/${gid}/news` : '#/');
  return { ok: true };
}));

app.delete('/api/announcements/:id', auth('teacher', 'admin'), wrap((req) => {
  const a = one('SELECT * FROM announcements WHERE id = ?', id(req.params.id)) || fail(404, "E'lon topilmadi");
  if (req.user.role !== 'admin' && a.author_id !== req.user.id) fail(403, "Faqat o'z e'loningizni o'chira olasiz");
  run('DELETE FROM announcements WHERE id = ?', a.id);
  return { ok: true };
}));

// ------------------------------------------------------------------ bildirishnomalar
app.get('/api/notifications', auth(), wrap((req) => ({
  unread: one('SELECT count(*) AS n FROM notifications WHERE user_id = ? AND read = 0', req.user.id).n,
  items: all('SELECT * FROM notifications WHERE user_id = ? ORDER BY id DESC LIMIT 30', req.user.id),
  coins: req.user.role === 'student' ? coinBalance(req.user.id) : null,
})));

app.post('/api/notifications/read', auth(), wrap((req) => {
  if (req.body.id) run('UPDATE notifications SET read = 1 WHERE id = ? AND user_id = ?', id(req.body.id), req.user.id);
  else run('UPDATE notifications SET read = 1 WHERE user_id = ?', req.user.id);
  return { ok: true };
}));

// ------------------------------------------------------------------ ommaviy qo'shish (administrator)
// Har bir qator: "Ism Familiya; login; parol; telefon" — login va parol ixtiyoriy (avtomatik yaratiladi)
function makeLogin(name) {
  const base = name.toLowerCase().replace(/[ʻʼ'`’‘]/g, '').normalize('NFKD').replace(/[^a-z0-9 ]/g, '')
    .trim().split(/\s+/).slice(0, 2).join('.') || 'user';
  const stem = base.length >= 3 ? base : base + '.uz';
  let login = stem, n = 1;
  while (one('SELECT 1 FROM users WHERE lower(login) = ?', login)) login = `${stem}${++n}`;
  return login;
}

app.post('/api/users/bulk', auth('admin'), wrap((req) => {
  const role = str(req.body.role, 20) || 'student';
  if (!['teacher', 'student'].includes(role)) fail(400, "Rol noto'g'ri");
  const gid = req.body.group_id ? id(req.body.group_id) : null;
  if (gid) one('SELECT 1 FROM groups WHERE id = ?', gid) || fail(400, 'Guruh topilmadi');
  const lines = String(req.body.lines || '').split(/\r?\n/).map((l) => l.trim()).filter(Boolean).slice(0, 300);
  if (!lines.length) fail(400, "Ro'yxat bo'sh");
  const created = [];
  tx(() => {
    for (const line of lines) {
      const [nameRaw, loginRaw, pwRaw, phoneRaw] = line.split(/[;\t]/).map((x) => (x || '').trim());
      const name = (nameRaw || '').slice(0, 120);
      if (!name) continue;
      let login = (loginRaw || '').toLowerCase();
      if (login && !/^[a-z0-9._-]{3,}$/.test(login)) fail(400, `Login noto'g'ri: ${login}`);
      if (login && one('SELECT 1 FROM users WHERE lower(login) = ?', login)) fail(409, `Login band: ${login}`);
      if (!login) login = makeLogin(name);
      const password = pwRaw && pwRaw.length >= 6 ? pwRaw : crypto.randomBytes(4).toString('hex');
      const r = run('INSERT INTO users (name, login, password_hash, role, phone) VALUES (?,?,?,?,?)', name, login, bcrypt.hashSync(password, 10), role, phoneRaw || null);
      if (gid && role === 'student') run('INSERT OR IGNORE INTO group_students (group_id, student_id) VALUES (?,?)', gid, Number(r.lastInsertRowid));
      created.push({ name, login, password });
    }
  });
  if (created.length) audit(req.user, 'create', 'user', null, `${created.length} ta foydalanuvchi`, "Ro'yxatdan ommaviy qo'shildi");
  return { created };
}));

// ------------------------------------------------------------------ testlar (imtihonlar)
function parseQuestions(raw) {
  const list = Array.isArray(raw) ? raw : [];
  if (!list.length) fail(400, 'Kamida bitta savol kiriting');
  if (list.length > 100) fail(400, "Ko'pi bilan 100 ta savol");
  return list.map((q, i) => {
    const text = str(q.q, 2000);
    const options = (Array.isArray(q.options) ? q.options : []).map((o) => str(o, 500)).filter(Boolean);
    const answer = Number(q.answer);
    if (!text) fail(400, `${i + 1}-savol matni bo'sh`);
    if (options.length < 2) fail(400, `${i + 1}-savolda kamida 2 ta variant bo'lsin`);
    if (!Number.isInteger(answer) || answer < 0 || answer >= options.length) fail(400, `${i + 1}-savolda to'g'ri javob belgilanmagan (* bilan)`);
    return { q: text, options, answer };
  });
}
const testFor = (user, testId) => {
  const t = one('SELECT * FROM tests WHERE id = ?', testId) || fail(404, 'Test topilmadi');
  groupFor(user, t.group_id);
  if (user.role === 'student' && !t.published) fail(404, 'Test topilmadi');
  t.questions = JSON.parse(t.questions);
  return t;
};
const attemptDeadline = (t, a) => parseUtcMs(a.started_at) + t.duration_min * 60000;
const parseUtcMs = (s) => new Date(String(s).replace(' ', 'T') + 'Z').getTime();

app.get('/api/groups/:id/tests', auth(), wrap((req) => {
  const gid = id(req.params.id);
  groupFor(req.user, gid);
  if (req.user.role === 'student') {
    return { tests: all(`SELECT t.id, t.title, t.description, t.duration_min, t.created_at, json_array_length(t.questions) AS count,
                         a.score, a.finished_at, a.started_at FROM tests t
                         LEFT JOIN test_attempts a ON a.test_id = t.id AND a.student_id = ?
                         WHERE t.group_id = ? AND t.published = 1 ORDER BY t.id DESC`, req.user.id, gid) };
  }
  return { tests: all(`SELECT t.id, t.title, t.description, t.duration_min, t.published, t.created_at, json_array_length(t.questions) AS count,
                       (SELECT count(*) FROM test_attempts a WHERE a.test_id = t.id AND a.finished_at IS NOT NULL) AS done,
                       (SELECT round(avg(score)) FROM test_attempts a WHERE a.test_id = t.id AND a.finished_at IS NOT NULL) AS avg_score
                       FROM tests t WHERE t.group_id = ? ORDER BY t.id DESC`, gid) };
}));

app.post('/api/groups/:id/tests', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.id);
  groupFor(req.user, gid);
  const title = str(req.body.title, 200) || fail(400, 'Test nomi majburiy');
  const duration = Math.min(300, Math.max(1, Number(req.body.duration_min) || 20));
  const questions = parseQuestions(req.body.questions);
  const published = req.body.published ? 1 : 0;
  const r = run('INSERT INTO tests (group_id, title, description, duration_min, questions, published, created_by) VALUES (?,?,?,?,?,?,?)',
    gid, title, str(req.body.description, 2000) || null, duration, JSON.stringify(questions), published, req.user.id);
  audit(req.user, 'create', 'test', Number(r.lastInsertRowid), title, `${questions.length} savol · ${duration} daqiqa`);
  if (published) notify(groupStudentIds(gid), 'test', `Yangi test: ${title}`, `#/tests/${r.lastInsertRowid}`);
  return { id: Number(r.lastInsertRowid) };
}));

app.patch('/api/tests/:id', auth('teacher', 'admin'), wrap((req) => {
  const t = testFor(req.user, id(req.params.id));
  const b = req.body;
  const title = b.title !== undefined ? (str(b.title, 200) || fail(400, 'Test nomi majburiy')) : t.title;
  const duration = b.duration_min !== undefined ? Math.min(300, Math.max(1, Number(b.duration_min) || 20)) : t.duration_min;
  let questions = t.questions;
  if (b.questions !== undefined) {
    if (one('SELECT 1 FROM test_attempts WHERE test_id = ? LIMIT 1', t.id)) fail(400, "Test topshirilgan — savollarni o'zgartirib bo'lmaydi");
    questions = parseQuestions(b.questions);
  }
  const published = b.published !== undefined ? (b.published ? 1 : 0) : t.published;
  run('UPDATE tests SET title=?, description=?, duration_min=?, questions=?, published=? WHERE id=?',
    title, b.description !== undefined ? (str(b.description, 2000) || null) : t.description, duration, JSON.stringify(questions), published, t.id);
  if (published && !t.published) notify(groupStudentIds(t.group_id), 'test', `Yangi test: ${title}`, `#/tests/${t.id}`);
  return { ok: true };
}));

app.delete('/api/tests/:id', auth('teacher', 'admin'), wrap((req) => {
  const t = testFor(req.user, id(req.params.id));
  run('DELETE FROM tests WHERE id = ?', t.id);
  audit(req.user, 'delete', 'test', t.id, t.title, null);
  return { ok: true };
}));

app.get('/api/tests/:id', auth(), wrap((req) => {
  const t = testFor(req.user, id(req.params.id));
  const g = one('SELECT id, name FROM groups WHERE id = ?', t.group_id);
  const base = { id: t.id, title: t.title, description: t.description, duration_min: t.duration_min, published: t.published, count: t.questions.length, group: g };
  if (req.user.role !== 'student') {
    const attempts = all(`SELECT u.id AS student_id, u.name, a.score, a.correct, a.total, a.started_at, a.finished_at
                          FROM group_students gs JOIN users u ON u.id = gs.student_id
                          LEFT JOIN test_attempts a ON a.test_id = ? AND a.student_id = u.id
                          WHERE gs.group_id = ? ORDER BY a.score DESC NULLS LAST, u.name`, t.id, t.group_id);
    return { test: { ...base, questions: t.questions }, attempts };
  }
  const a = one('SELECT * FROM test_attempts WHERE test_id = ? AND student_id = ?', t.id, req.user.id);
  if (!a) return { test: base, attempt: null };
  if (!a.finished_at) {
    return { test: { ...base, questions: t.questions.map(({ q, options }) => ({ q, options })) },
      attempt: { started_at: a.started_at, deadline: attemptDeadline(t, a), answers: JSON.parse(a.answers || '[]') } };
  }
  // tugagan: to'g'ri javoblar bilan
  return { test: { ...base, questions: t.questions }, attempt: { ...a, answers: JSON.parse(a.answers || '[]') } };
}));

app.post('/api/tests/:id/start', auth('student'), wrap((req) => {
  const t = testFor(req.user, id(req.params.id));
  if (!one('SELECT 1 FROM test_attempts WHERE test_id = ? AND student_id = ?', t.id, req.user.id)) {
    run('INSERT INTO test_attempts (test_id, student_id, answers) VALUES (?,?,?)', t.id, req.user.id, '[]');
  }
  return { ok: true };
}));

app.post('/api/tests/:id/submit', auth('student'), wrap((req) => {
  const t = testFor(req.user, id(req.params.id));
  const a = one('SELECT * FROM test_attempts WHERE test_id = ? AND student_id = ?', t.id, req.user.id) || fail(400, 'Avval testni boshlang');
  if (a.finished_at) fail(400, 'Test allaqachon topshirilgan');
  const raw = Array.isArray(req.body.answers) ? req.body.answers : [];
  const answers = t.questions.map((_, i) => (Number.isInteger(raw[i]) ? raw[i] : null));
  const correct = t.questions.filter((q, i) => answers[i] === q.answer).length;
  const score = Math.round((correct / t.questions.length) * 100);
  run('UPDATE test_attempts SET answers=?, correct=?, total=?, score=?, finished_at=? WHERE id=?',
    JSON.stringify(answers), correct, t.questions.length, score, nowIso(), a.id);
  setCoins(req.user.id, `test:${t.id}`, Math.round(score / 10), `Test: ${t.title} (${score}%)`, null);
  const g = one('SELECT teacher_id FROM groups WHERE id = ?', t.group_id);
  notify(g.teacher_id, 'test', `${req.user.name} «${t.title}» testini topshirdi: ${score}%`, `#/tests/${t.id}`);
  return { score, correct, total: t.questions.length };
}));

// O'qituvchi o'quvchiga qayta topshirishga ruxsat beradi
app.delete('/api/tests/:id/attempts/:sid', auth('teacher', 'admin'), wrap((req) => {
  const t = testFor(req.user, id(req.params.id));
  run('DELETE FROM test_attempts WHERE test_id = ? AND student_id = ?', t.id, id(req.params.sid));
  return { ok: true };
}));

// ------------------------------------------------------------------ to'lovlar (administrator)
const monthOk = (m) => /^\d{4}-(0[1-9]|1[0-2])$/.test(m || '');
function paymentSummary(month) {
  // har bir faol guruhdagi o'quvchi uchun: oylik narx va shu oy to'lagani
  const rows = all(`SELECT u.id AS student_id, u.name, u.phone, g.id AS group_id, g.name AS group_name, g.price,
                      coalesce((SELECT sum(amount) FROM payments p WHERE p.student_id = u.id AND p.group_id = g.id AND p.month = ?), 0) AS paid
                    FROM groups g JOIN group_students gs ON gs.group_id = g.id JOIN users u ON u.id = gs.student_id
                    WHERE g.active = 1 AND g.price > 0 AND u.active = 1 ORDER BY g.name, u.name`, month);
  for (const r of rows) r.debt = Math.max(0, r.price - r.paid);
  return rows;
}

app.get('/api/payments', auth('admin'), wrap((req) => {
  const month = monthOk(req.query.month) ? req.query.month : today().slice(0, 7);
  const list = all(`SELECT p.*, u.name AS student, g.name AS group_name, c.name AS cashier FROM payments p
                    JOIN users u ON u.id = p.student_id LEFT JOIN groups g ON g.id = p.group_id LEFT JOIN users c ON c.id = p.created_by
                    WHERE p.month = ? ORDER BY p.id DESC`, month);
  const summary = paymentSummary(month);
  const expected = summary.reduce((a, r) => a + r.price, 0);
  const received = list.reduce((a, p) => a + p.amount, 0);
  const months = all(`SELECT month, sum(amount) AS total FROM payments GROUP BY month ORDER BY month DESC LIMIT 6`).reverse();
  return { month, list, students: summary, totals: { expected, received, debt: summary.reduce((a, r) => a + r.debt, 0), debtors: summary.filter((r) => r.debt > 0).length }, months };
}));

app.post('/api/payments', auth('admin'), wrap((req) => {
  const sid = id(req.body.student_id);
  one("SELECT 1 FROM users WHERE id = ? AND role = 'student'", sid) || fail(400, "O'quvchi topilmadi");
  const gid = req.body.group_id ? id(req.body.group_id) : null;
  const amount = Number(req.body.amount);
  if (!Number.isInteger(amount) || amount <= 0) fail(400, "Summa musbat butun son bo'lsin");
  const month = str(req.body.month, 7);
  if (!monthOk(month)) fail(400, 'Oy YYYY-MM formatida');
  const method = ['naqd', 'karta', 'click', 'payme', 'boshqa'].includes(req.body.method) ? req.body.method : 'naqd';
  run('INSERT INTO payments (student_id, group_id, amount, month, method, note, created_by) VALUES (?,?,?,?,?,?,?)',
    sid, gid, amount, month, method, str(req.body.note, 500) || null, req.user.id);
  audit(req.user, 'create', 'payment', null, (one('SELECT name FROM users WHERE id = ?', sid) || {}).name, `${amount.toLocaleString('ru-RU')} so'm · ${month} · ${method}`);
  notify(sid, 'pay', `To'lov qabul qilindi: ${amount.toLocaleString('ru-RU')} so'm (${month})`, '#/profile');
  notify(parentsOf(sid), 'pay', `To'lov qabul qilindi: ${amount.toLocaleString('ru-RU')} so'm (${month})`, `#/p/pay/${sid}`);
  return { ok: true };
}));

app.delete('/api/payments/:id', auth('admin'), wrap((req) => {
  const p = one('SELECT p.*, u.name FROM payments p JOIN users u ON u.id = p.student_id WHERE p.id = ?', id(req.params.id)) || fail(404, "To'lov topilmadi");
  run('DELETE FROM payments WHERE id = ?', p.id);
  audit(req.user, 'delete', 'payment', p.id, p.name, `${p.amount.toLocaleString('ru-RU')} so'm · ${p.month}`);
  return { ok: true };
}));

// ------------------------------------------------------------------ sertifikatlar
app.post('/api/groups/:gid/certificates', auth('teacher', 'admin'), wrap((req) => {
  const gid = id(req.params.gid);
  groupFor(req.user, gid);
  const sid = id(req.body.student_id);
  if (!one('SELECT 1 FROM group_students WHERE group_id = ? AND student_id = ?', gid, sid)) fail(400, "O'quvchi bu guruhda emas");
  const ex = one('SELECT code FROM certificates WHERE group_id = ? AND student_id = ?', gid, sid);
  if (ex) return { code: ex.code };
  const code = 'YD-' + crypto.randomBytes(4).toString('hex').toUpperCase();
  run('INSERT INTO certificates (code, group_id, student_id, issued_by) VALUES (?,?,?,?)', code, gid, sid, req.user.id);
  audit(req.user, 'create', 'certificate', null, (one('SELECT name FROM users WHERE id = ?', sid) || {}).name, code);
  notify(sid, 'cert', 'Tabriklaymiz! Sizga sertifikat berildi', `#/cert/${code}`);
  return { code };
}));

app.delete('/api/certificates/:code', auth('teacher', 'admin'), wrap((req) => {
  const c = one('SELECT * FROM certificates WHERE code = ?', str(req.params.code, 20)) || fail(404, 'Sertifikat topilmadi');
  groupFor(req.user, c.group_id);
  run('DELETE FROM certificates WHERE id = ?', c.id);
  return { ok: true };
}));

// Ochiq tekshirish: istalgan kishi kod bo'yicha haqiqiyligini ko'ra oladi
app.get('/api/certificates/:code', wrap((req) => {
  const c = one(`SELECT c.code, c.issued_at, u.name AS student, g.name AS group_name, co.title AS course, t.name AS teacher,
                   (SELECT count(*) FROM lessons l WHERE l.course_id = co.id) AS lessons
                 FROM certificates c JOIN users u ON u.id = c.student_id JOIN groups g ON g.id = c.group_id
                 JOIN courses co ON co.id = g.course_id LEFT JOIN users t ON t.id = g.teacher_id WHERE c.code = ?`, str(req.params.code, 20).toUpperCase());
  return { certificate: c || fail(404, 'Bunday sertifikat topilmadi') };
}));

// ------------------------------------------------------------------ o'quvchi profili
app.get('/api/users/:id/profile', auth(), wrap((req) => {
  const uid = id(req.params.id);
  const me = req.user;
  const u = one('SELECT * FROM users WHERE id = ?', uid) || fail(404, 'Foydalanuvchi topilmadi');
  if (me.role === 'student' && me.id !== uid) fail(403, "Ruxsat yo'q");
  if (me.role === 'parent' && !isChildOf(me.id, uid)) fail(403, "Ruxsat yo'q");
  if (me.role === 'teacher' && me.id !== uid && !one(`SELECT 1 FROM group_students gs JOIN groups g ON g.id = gs.group_id WHERE gs.student_id = ? AND g.teacher_id = ?`, uid, me.id)) fail(403, "Bu o'quvchi sizning guruhingizda emas");
  let groups = myGroups(u).filter((g) => me.role !== 'teacher' || g.teacher_id === me.id);
  groups = groups.map((g) => {
    const r = ranking(g.id).find((x) => x.id === uid) || {};
    const att = one('SELECT count(*) AS total, coalesce(sum(present), 0) AS present FROM attendance WHERE group_id = ? AND student_id = ?', g.id, uid);
    const cert = one('SELECT code FROM certificates WHERE group_id = ? AND student_id = ?', g.id, uid);
    return { ...g, ...groupStats(g), rank: r.rank, of: ranking(g.id).length, points: r.points || 0, accepted: r.accepted || 0, my_avg: r.avg_score, att, certificate: cert ? cert.code : null };
  });
  const tests = all(`SELECT t.id, t.title, a.score, a.finished_at, g.name AS group_name FROM test_attempts a JOIN tests t ON t.id = a.test_id
                     JOIN groups g ON g.id = t.group_id WHERE a.student_id = ? AND a.finished_at IS NOT NULL ORDER BY a.finished_at DESC LIMIT 20`, uid);
  const recent = all(`${SUB_SELECT} WHERE s.student_id = ? ORDER BY s.submitted_at DESC LIMIT 10`, uid);
  const out = { user: publicUser(u), groups, tests, recent };
  if (u.role === 'student' && (me.role === 'admin' || me.id === uid || me.role === 'parent')) {
    out.payments = all(`SELECT p.id, p.amount, p.month, p.method, p.note, p.created_at, g.name AS group_name FROM payments p
                        LEFT JOIN groups g ON g.id = p.group_id WHERE p.student_id = ? ORDER BY p.month DESC, p.id DESC LIMIT 24`, uid);
    out.debt = paymentSummary(today().slice(0, 7)).filter((r) => r.student_id === uid);
  }
  return out;
}));

// ------------------------------------------------------------------ coinlar
// Qoidalar: vazifa qabul qilinsa — ball/10 (ball yo'q bo'lsa 5), test — natija/10, darsga kelish — 2.
// Har bir manba (ref) bo'yicha bir marta beriladi; holat o'zgarsa qaytarib olinadi.
const COIN_RULES = [
  { key: 'submission', text: 'Vazifa qabul qilinsa', value: 'ball ÷ 10 (masalan 90 ball → 9 coin)' },
  { key: 'test', text: 'Test topshirilsa', value: 'natija ÷ 10 (100% → 10 coin)' },
  { key: 'attendance', text: 'Darsga kelsa', value: '2 coin' },
  { key: 'manual', text: "O'qituvchi rag'batlantirsa", value: '1–100 coin' },
];
function setCoins(studentId, ref, amount, reason, byId) {
  if (ref) run('DELETE FROM coin_tx WHERE student_id = ? AND ref = ?', studentId, ref);
  if (amount) run('INSERT INTO coin_tx (student_id, amount, reason, ref, created_by) VALUES (?,?,?,?,?)', studentId, amount, reason, ref || null, byId || null);
}
const coinBalance = (sid) => one('SELECT coalesce(sum(amount), 0) AS n FROM coin_tx WHERE student_id = ?', sid).n;
const coinEarned = (sid) => one('SELECT coalesce(sum(amount), 0) AS n FROM coin_tx WHERE student_id = ? AND amount > 0', sid).n;
function syncSubmissionCoins(subId) {
  const s = one('SELECT s.*, l.title FROM submissions s JOIN lessons l ON l.id = s.lesson_id WHERE s.id = ?', subId);
  if (!s) return;
  const amount = s.status === 'qabul' ? (s.score !== null ? Math.max(1, Math.round(s.score / 10)) : 5) : 0;
  setCoins(s.student_id, `sub:${s.id}`, amount, `Vazifa qabul qilindi: ${s.title}`, s.graded_by);
}

app.get('/api/coins/me', auth('student'), wrap((req) => ({
  balance: coinBalance(req.user.id),
  earned: coinEarned(req.user.id),
  history: all('SELECT amount, reason, created_at FROM coin_tx WHERE student_id = ? ORDER BY id DESC LIMIT 40', req.user.id),
  rules: COIN_RULES,
})));

// O'qituvchi / administrator qo'lda coin beradi (yoki ayiradi)
app.post('/api/coins', auth('teacher', 'admin'), wrap((req) => {
  const sid = id(req.body.student_id);
  const st = one("SELECT id, name FROM users WHERE id = ? AND role = 'student'", sid) || fail(404, "O'quvchi topilmadi");
  if (req.user.role === 'teacher' && !one('SELECT 1 FROM group_students gs JOIN groups g ON g.id = gs.group_id WHERE gs.student_id = ? AND g.teacher_id = ? AND g.deleted_at IS NULL', sid, req.user.id)) fail(403, "Bu o'quvchi sizning guruhingizda emas");
  const amount = Number(req.body.amount);
  if (!Number.isInteger(amount) || amount === 0 || amount < -100 || amount > 100) fail(400, "Coin miqdori −100 dan 100 gacha (0 emas)");
  const reason = str(req.body.reason, 200) || (amount > 0 ? "Rag'bat" : 'Jarima');
  if (amount < 0 && coinBalance(sid) + amount < 0) fail(400, "O'quvchida yetarli coin yo'q");
  setCoins(sid, null, amount, `${reason} (${req.user.name})`, req.user.id);
  notify(sid, 'coin', amount > 0 ? `+${amount} coin: ${reason}` : `${amount} coin: ${reason}`, '#/coins');
  audit(req.user, 'create', 'coin', sid, st.name, `${amount > 0 ? '+' : ''}${amount} coin · ${reason}`);
  return { ok: true, balance: coinBalance(sid) };
}));

// ------------------------------------------------------------------ reyting: umumiy va guruh bo'yicha (to'plangan coinlar)
app.get('/api/leaderboard', auth(), wrap((req) => {
  const scope = req.query.scope === 'group' ? 'group' : 'all';
  let gid = req.query.group_id ? id(req.query.group_id) : null;
  if (scope === 'group') {
    if (!gid) gid = (myGroups(req.user).find((g) => g.active) || {}).id || null;
    if (!gid) return { scope, group: null, items: [], me: null };
    groupFor(req.user, gid);
  }
  const rows = all(`SELECT u.id, u.name, u.avatar,
                      coalesce((SELECT sum(amount) FROM coin_tx c WHERE c.student_id = u.id AND c.amount > 0), 0) AS earned,
                      (SELECT count(*) FROM submissions s WHERE s.student_id = u.id AND s.status = 'qabul') AS accepted,
                      (SELECT g.name FROM group_students gs JOIN groups g ON g.id = gs.group_id WHERE gs.student_id = u.id AND g.deleted_at IS NULL ORDER BY g.active DESC LIMIT 1) AS group_name
                    FROM users u WHERE u.role = 'student' AND u.active = 1
                    ${scope === 'group' ? 'AND u.id IN (SELECT student_id FROM group_students WHERE group_id = ?)' : ''}
                    ORDER BY earned DESC, accepted DESC, u.name LIMIT 300`, ...(scope === 'group' ? [gid] : []));
  let prev = null, rank = 0;
  rows.forEach((r, i) => { if (r.earned !== prev) { rank = i + 1; prev = r.earned; } r.rank = rank; r.level = levelOf(r.earned).level; });
  const me = rows.find((r) => r.id === req.user.id) || null;
  const group = gid ? one('SELECT id, name FROM groups WHERE id = ?', gid) : null;
  return { scope, group, items: rows, me, groups: myGroups(req.user).filter((g) => g.active).map((g) => ({ id: g.id, name: g.name })) };
}));

// ------------------------------------------------------------------ market
const MARKET_DIR = path.join(DATA_DIR, 'market');
fs.mkdirSync(MARKET_DIR, { recursive: true });
function saveMarketImage(dataUrl) {
  if (!dataUrl) return null;
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl));
  if (!m) fail(400, "Rasm formati noto'g'ri");
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 600 * 1024) fail(400, 'Rasm 600 KB dan oshmasin');
  const name = `m${Date.now()}-${crypto.randomBytes(4).toString('hex')}.${m[1] === 'jpeg' ? 'jpg' : m[1]}`;
  fs.writeFileSync(path.join(MARKET_DIR, name), buf);
  return `/market-img/${name}`;
}
app.get('/market-img/:file', (req, res) => {
  if (!req.user) return res.status(401).end();
  if (!/^m\d+-[0-9a-f]+\.(jpg|png|webp)$/.test(req.params.file)) return res.status(404).end();
  res.sendFile(path.join(MARKET_DIR, req.params.file), { maxAge: '7d' }, (err) => { if (err && !res.headersSent) res.status(404).end(); });
});

const ORDER_SELECT = `SELECT o.*, i.title, i.image, u.name AS student, u.avatar AS student_avatar,
  (SELECT g.name FROM group_students gs JOIN groups g ON g.id = gs.group_id WHERE gs.student_id = u.id AND g.deleted_at IS NULL LIMIT 1) AS group_name
  FROM market_orders o JOIN market_items i ON i.id = o.item_id JOIN users u ON u.id = o.student_id`;

app.get('/api/market', auth(), wrap((req) => {
  const admin = req.user.role === 'admin';
  const items = all(`SELECT i.*, (SELECT count(*) FROM market_orders o WHERE o.item_id = i.id AND o.status != 'bekor') AS sold
                     FROM market_items i WHERE ${admin ? '1' : 'i.active = 1'} ORDER BY i.active DESC, i.price`);
  if (req.user.role === 'student') {
    return { items, balance: coinBalance(req.user.id), orders: all(`${ORDER_SELECT} WHERE o.student_id = ? ORDER BY o.id DESC LIMIT 30`, req.user.id) };
  }
  return { items, orders: admin ? all(`${ORDER_SELECT} ORDER BY (o.status = 'kutilmoqda') DESC, o.id DESC LIMIT 200`) : [] };
}));

function validateItem(b, partial) {
  const out = {};
  if (!partial || b.title !== undefined) { out.title = str(b.title, 120); if (!out.title) fail(400, 'Mahsulot nomi majburiy'); }
  if (b.description !== undefined) out.description = str(b.description, 1000) || null;
  if (!partial || b.price !== undefined) { out.price = Number(b.price); if (!Number.isInteger(out.price) || out.price < 1 || out.price > 100000) fail(400, "Narx 1 dan 100 000 coin gacha"); }
  if (b.stock !== undefined) { out.stock = b.stock === '' || b.stock === null ? null : Number(b.stock); if (out.stock !== null && (!Number.isInteger(out.stock) || out.stock < 0)) fail(400, "Soni musbat butun son (bo'sh — cheklanmagan)"); }
  if (b.active !== undefined) out.active = b.active ? 1 : 0;
  return out;
}
app.post('/api/market/items', auth('admin'), wrap((req) => {
  const v = validateItem(req.body, false);
  const image = saveMarketImage(req.body.image);
  const r = run('INSERT INTO market_items (title, description, price, stock, image) VALUES (?,?,?,?,?)', v.title, v.description ?? null, v.price, v.stock ?? null, image);
  audit(req.user, 'create', 'market', Number(r.lastInsertRowid), v.title, `${v.price} coin`);
  return { id: Number(r.lastInsertRowid) };
}));
app.patch('/api/market/items/:id', auth('admin'), wrap((req) => {
  const it = one('SELECT * FROM market_items WHERE id = ?', id(req.params.id)) || fail(404, 'Mahsulot topilmadi');
  const v = validateItem(req.body, true);
  if (req.body.image !== undefined) {
    v.image = req.body.image ? saveMarketImage(req.body.image) : null;
    if (it.image) fs.rm(path.join(MARKET_DIR, path.basename(it.image)), { force: true }, () => {});
  }
  const f = Object.keys(v);
  if (f.length) run(`UPDATE market_items SET ${f.map((k) => `${k} = ?`).join(', ')} WHERE id = ?`, ...f.map((k) => v[k]), it.id);
  return { ok: true };
}));
app.delete('/api/market/items/:id', auth('admin'), wrap((req) => {
  const it = one('SELECT * FROM market_items WHERE id = ?', id(req.params.id)) || fail(404, 'Mahsulot topilmadi');
  if (one('SELECT 1 FROM market_orders WHERE item_id = ? LIMIT 1', it.id)) { run('UPDATE market_items SET active = 0 WHERE id = ?', it.id); return { ok: true, hidden: true }; }
  run('DELETE FROM market_items WHERE id = ?', it.id);
  if (it.image) fs.rm(path.join(MARKET_DIR, path.basename(it.image)), { force: true }, () => {});
  return { ok: true };
}));

app.post('/api/market/buy', auth('student'), wrap((req) => {
  const it = one('SELECT * FROM market_items WHERE id = ? AND active = 1', id(req.body.item_id)) || fail(404, 'Mahsulot topilmadi');
  return tx(() => {
    if (it.stock !== null) {
      const sold = one("SELECT count(*) AS n FROM market_orders WHERE item_id = ? AND status != 'bekor'", it.id).n;
      if (sold >= it.stock) fail(400, 'Bu mahsulot tugagan');
    }
    const bal = coinBalance(req.user.id);
    if (bal < it.price) fail(400, `Coin yetarli emas: kerak ${it.price}, sizda ${bal}`);
    const r = run('INSERT INTO market_orders (item_id, student_id, price) VALUES (?,?,?)', it.id, req.user.id, it.price);
    const oid = Number(r.lastInsertRowid);
    setCoins(req.user.id, `order:${oid}`, -it.price, `Market: ${it.title}`, req.user.id);
    notify(adminIds(), 'market', `${req.user.name} «${it.title}» ni sotib oldi (${it.price} coin)`, '#/market');
    return { ok: true, balance: coinBalance(req.user.id) };
  });
}));

app.patch('/api/market/orders/:id', auth('admin'), wrap((req) => {
  const o = one(`${ORDER_SELECT} WHERE o.id = ?`, id(req.params.id)) || fail(404, 'Buyurtma topilmadi');
  const status = str(req.body.status, 20);
  if (!['berildi', 'bekor'].includes(status)) fail(400, "Holat noto'g'ri");
  if (o.status !== 'kutilmoqda') fail(400, "Buyurtma allaqachon ko'rib chiqilgan");
  run("UPDATE market_orders SET status = ?, handled_by = ?, handled_at = datetime('now') WHERE id = ?", status, req.user.id, o.id);
  if (status === 'bekor') setCoins(o.student_id, `order:${o.id}`, 0); // coin qaytariladi
  notify(o.student_id, 'market', status === 'berildi' ? `«${o.title}» sizga topshirildi` : `«${o.title}» buyurtmasi bekor qilindi, ${o.price} coin qaytarildi`, '#/market');
  audit(req.user, 'update', 'market', o.id, o.title, `${o.student}: ${status === 'berildi' ? 'topshirildi' : 'bekor qilindi'}`);
  return { ok: true };
}));

// ------------------------------------------------------------------ gamifikatsiya: daraja, nishonlar, seriya
// XP = jami yig'ilgan coinlar. Daraja n uchun kerak bo'lgan XP: 25 * n * (n - 1)  (1→0, 2→50, 3→150, 4→300 ...)
const LEVEL_NAMES = ['Yangi boshlovchi', 'Izlanuvchi', 'Harakatchan', 'Faol', 'Bilimdon', 'Tajribali', 'Usta', 'Ekspert', 'Ustoz', 'Legenda'];
const xpFor = (lvl) => 25 * lvl * (lvl - 1);
function levelOf(xp) {
  let lvl = 1;
  while (xp >= xpFor(lvl + 1)) lvl++;
  const cur = xpFor(lvl), next = xpFor(lvl + 1);
  return { level: lvl, name: LEVEL_NAMES[Math.min(lvl - 1, LEVEL_NAMES.length - 1)], xp, cur, next, pct: Math.round(((xp - cur) / (next - cur)) * 100) };
}

// Ketma-ket faol kunlar (coin olingan kunlar): bugun yoki kechadan boshlab orqaga
function streakOf(uid) {
  const days = new Set(all("SELECT DISTINCT date(created_at, 'localtime') AS d FROM coin_tx WHERE student_id = ? AND amount > 0 AND created_at >= datetime('now', '-120 days')", uid).map((r) => r.d));
  let n = 0, best = 0, run = 0;
  const day = (k) => localDate(Date.now() - k * 86400000);
  let k = days.has(day(0)) ? 0 : 1;
  while (days.has(day(k))) { n++; k++; }
  // eng uzun seriya (120 kun ichida)
  for (let i = 120; i >= 0; i--) { if (days.has(day(i))) { run++; best = Math.max(best, run); } else run = 0; }
  return { current: n, best, today: days.has(day(0)) };
}

const BADGES = [
  { key: 'first_sub', icon: 'upload', title: 'Birinchi qadam', desc: 'Birinchi vazifani topshiring', goal: 1, stat: 'submitted' },
  { key: 'acc_5', icon: 'checkCircle', title: 'Mehnatkash', desc: '5 ta vazifa qabul qilinsin', goal: 5, stat: 'accepted' },
  { key: 'acc_20', icon: 'award', title: 'Tinimsiz', desc: '20 ta vazifa qabul qilinsin', goal: 20, stat: 'accepted' },
  { key: 'acc_50', icon: 'crown', title: 'Vazifalar qiroli', desc: '50 ta vazifa qabul qilinsin', goal: 50, stat: 'accepted' },
  { key: 'perfect', icon: 'star', title: "A'lochi", desc: 'Vazifadan 100 ball oling', goal: 1, stat: 'perfect' },
  { key: 'test_ace', icon: 'target', title: 'Mergan', desc: 'Testdan 100% natija', goal: 1, stat: 'test100' },
  { key: 'tests_5', icon: 'quiz', title: 'Test ustasi', desc: '5 ta test topshiring', goal: 5, stat: 'tests' },
  { key: 'att_10', icon: 'calendar', title: 'Intizomli', desc: '10 ta darsga qatnashing', goal: 10, stat: 'present' },
  { key: 'streak_3', icon: 'flame', title: 'Olov', desc: '3 kun ketma-ket faol bo\'ling', goal: 3, stat: 'bestStreak' },
  { key: 'streak_7', icon: 'flame', title: 'Haftalik olov', desc: '7 kun ketma-ket faol bo\'ling', goal: 7, stat: 'bestStreak' },
  { key: 'xp_100', icon: 'coin', title: 'Coin yig\'uvchi', desc: '100 coin yig\'ing', goal: 100, stat: 'xp' },
  { key: 'xp_500', icon: 'trophy', title: 'Boy', desc: '500 coin yig\'ing', goal: 500, stat: 'xp' },
  { key: 'top3', icon: 'trophy', title: 'Sovrindor', desc: 'Guruh reytingida top-3 ga kiring', goal: 1, stat: 'top3' },
  { key: 'shopper', icon: 'gift', title: 'Xaridor', desc: 'Marketdan birinchi xarid', goal: 1, stat: 'orders' },
];
const BADGE_BONUS = 10;

function gameOf(uid, { award = true } = {}) {
  const c = (sql, ...p) => one(sql, ...p).n;
  const streak = streakOf(uid);
  const xp = coinEarned(uid);
  const groups = all('SELECT gs.group_id FROM group_students gs JOIN groups g ON g.id = gs.group_id WHERE gs.student_id = ? AND g.deleted_at IS NULL', uid);
  const top3 = groups.some((g) => {
    const r = all(`SELECT u.id, coalesce((SELECT sum(amount) FROM coin_tx c WHERE c.student_id = u.id AND c.amount > 0), 0) AS e
                   FROM group_students gs JOIN users u ON u.id = gs.student_id WHERE gs.group_id = ? ORDER BY e DESC LIMIT 3`, g.group_id);
    return r.some((x) => x.id === uid && x.e > 0);
  }) ? 1 : 0;
  const stats = {
    submitted: c('SELECT count(*) AS n FROM submissions WHERE student_id = ?', uid),
    accepted: c("SELECT count(*) AS n FROM submissions WHERE student_id = ? AND status = 'qabul'", uid),
    perfect: c("SELECT count(*) AS n FROM submissions WHERE student_id = ? AND status = 'qabul' AND score = 100", uid),
    test100: c('SELECT count(*) AS n FROM test_attempts WHERE student_id = ? AND score = 100', uid),
    tests: c('SELECT count(*) AS n FROM test_attempts WHERE student_id = ? AND finished_at IS NOT NULL', uid),
    present: c('SELECT count(*) AS n FROM attendance WHERE student_id = ? AND present = 1', uid),
    bestStreak: streak.best, xp, top3,
    orders: c("SELECT count(*) AS n FROM market_orders WHERE student_id = ? AND status != 'bekor'", uid),
  };
  const got = new Set(all("SELECT ref FROM coin_tx WHERE student_id = ? AND ref LIKE 'badge:%'", uid).map((r) => r.ref.slice(6)));
  const badges = BADGES.map((b) => {
    const val = stats[b.stat] || 0;
    let earned = got.has(b.key);
    if (!earned && val >= b.goal && award) {
      run('INSERT OR IGNORE INTO coin_tx (student_id, amount, reason, ref) VALUES (?,?,?,?)', uid, BADGE_BONUS, `Yutuq: ${b.title}`, `badge:${b.key}`);
      notify(uid, 'badge', `Yangi yutuq: «${b.title}» · +${BADGE_BONUS} coin`, '#/achievements');
      earned = true;
    }
    return { key: b.key, icon: b.icon, title: b.title, desc: b.desc, goal: b.goal, value: Math.min(val, b.goal), earned };
  });
  const lastRef = one("SELECT ref FROM coin_tx WHERE student_id = ? AND ref LIKE 'badge:%' ORDER BY id DESC LIMIT 1", uid);
  const last = lastRef ? badges.find((b) => b.key === lastRef.ref.slice(6)) || null : null;
  return { level: levelOf(coinEarned(uid)), streak, badges, last, earned_count: badges.filter((b) => b.earned).length, bonus: BADGE_BONUS };
}

app.get('/api/game/me', auth('student'), wrap((req) => gameOf(req.user.id)));
app.get('/api/game/:id', auth('teacher', 'admin'), wrap((req) => gameOf(id(req.params.id), { award: false })));

// ------------------------------------------------------------------ ota-ona
// Administrator: ota-onani farzandlarga bog'lash
app.get('/api/users/:id/links', auth('admin'), wrap((req) => {
  const uid = id(req.params.id);
  return {
    children: all('SELECT u.id, u.name, u.login, u.avatar FROM parent_links p JOIN users u ON u.id = p.student_id WHERE p.parent_id = ? ORDER BY u.name', uid),
    parents: all('SELECT u.id, u.name, u.login, u.phone FROM parent_links p JOIN users u ON u.id = p.parent_id WHERE p.student_id = ? ORDER BY u.name', uid),
  };
}));
app.put('/api/users/:id/children', auth('admin'), wrap((req) => {
  const pid = id(req.params.id);
  const p = one("SELECT * FROM users WHERE id = ? AND role = 'parent'", pid) || fail(404, 'Ota-ona topilmadi');
  const ids = [...new Set((req.body.student_ids || []).map(id))];
  tx(() => {
    run('DELETE FROM parent_links WHERE parent_id = ?', pid);
    for (const sid of ids) {
      if (!one("SELECT 1 FROM users WHERE id = ? AND role = 'student'", sid)) fail(400, `O'quvchi topilmadi: ${sid}`);
      run('INSERT INTO parent_links (parent_id, student_id) VALUES (?,?)', pid, sid);
    }
  });
  audit(req.user, 'update', 'user', pid, p.name, `Farzandlar: ${ids.length} ta`);
  return { ok: true };
}));
// Administrator: o'quvchi uchun ota-ona hisobini bir bosishda yaratish
app.post('/api/users/:id/parent', auth('admin'), wrap((req) => {
  const sid = id(req.params.id);
  const st = one("SELECT * FROM users WHERE id = ? AND role = 'student'", sid) || fail(404, "O'quvchi topilmadi");
  const name = str(req.body.name, 120) || `${st.name} (ota-ona)`;
  const base = (st.login + '.ota').replace(/[^a-z0-9._-]/g, '');
  let login = base, n = 1;
  while (one('SELECT 1 FROM users WHERE lower(login) = ?', login)) login = `${base}${++n}`;
  const password = crypto.randomBytes(4).toString('hex');
  const r = run("INSERT INTO users (name, login, password_hash, role, phone) VALUES (?,?,?,'parent',?)", name, login, bcrypt.hashSync(password, 10), str(req.body.phone, 30) || null);
  const pid = Number(r.lastInsertRowid);
  run('INSERT INTO parent_links (parent_id, student_id) VALUES (?,?)', pid, sid);
  audit(req.user, 'create', 'user', pid, name, `Ota-ona · ${st.name}`);
  return { created: { name, login, password } };
}));

const childOr403 = (user, sid) => { if (!isChildOf(user.id, sid)) fail(403, "Bu o'quvchi sizning farzandingiz emas"); };
function childSummary(sid) {
  const u = one('SELECT * FROM users WHERE id = ?', sid);
  const t = today();
  const groups = myGroups(u).filter((g) => g.active);
  const att = one('SELECT count(*) AS total, coalesce(sum(present), 0) AS present FROM attendance WHERE student_id = ?', sid);
  const lastAtt = one(`SELECT a.present, gl.date, l.title FROM attendance a JOIN group_lessons gl ON gl.group_id = a.group_id AND gl.lesson_id = a.lesson_id
                       JOIN lessons l ON l.id = a.lesson_id WHERE a.student_id = ? ORDER BY gl.date DESC LIMIT 1`, sid);
  const given = groups.reduce((a, g) => a + one('SELECT count(*) AS n FROM group_lessons WHERE group_id = ? AND (opened = 1 OR date <= ?)', g.id, t).n, 0);
  const acc = one("SELECT count(*) AS n FROM submissions WHERE student_id = ? AND status = 'qabul'", sid).n;
  const avg = one('SELECT round(avg(score)) AS n FROM submissions WHERE student_id = ? AND score IS NOT NULL', sid).n;
  const overdue = all(`SELECT gl.deadline, l.title, g.id AS group_id, l.id AS lesson_id FROM group_lessons gl JOIN groups g ON g.id = gl.group_id
                       JOIN lessons l ON l.id = gl.lesson_id JOIN group_students gs ON gs.group_id = g.id AND gs.student_id = ?
                       LEFT JOIN submissions s ON s.group_id = g.id AND s.lesson_id = l.id AND s.student_id = gs.student_id
                       WHERE g.active = 1 AND g.deleted_at IS NULL AND (gl.opened = 1 OR gl.date <= ?) AND gl.deadline < ? AND (s.id IS NULL OR s.status = 'qaytarilgan')
                       ORDER BY gl.deadline DESC`, sid, t, t);
  const next = one(`SELECT gl.date, l.title, g.name AS group_name, g.time FROM group_lessons gl JOIN groups g ON g.id = gl.group_id JOIN lessons l ON l.id = gl.lesson_id
                    JOIN group_students gs ON gs.group_id = g.id AND gs.student_id = ? WHERE g.active = 1 AND g.deleted_at IS NULL AND gl.date >= ? ORDER BY gl.date, g.time LIMIT 1`, sid, t);
  const debt = paymentSummary(t.slice(0, 7)).filter((x) => x.student_id === sid).reduce((a, x) => a + x.debt, 0);
  const g0 = groups[0];
  const rk = g0 ? (ranking(g0.id).find((x) => x.id === sid) || {}) : {};
  return {
    user: publicUser(u), groups: groups.map((g) => ({ id: g.id, name: g.name, course_title: g.course_title, slug: g.slug, teacher_name: g.teacher_name, teacher_id: g.teacher_id, teacher_avatar: g.teacher_id ? (one('SELECT avatar FROM users WHERE id = ?', g.teacher_id) || {}).avatar : null, teacher_phone: null, days: g.days, time: g.time })),
    att: { total: att.total, present: att.present, pct: att.total ? Math.round((att.present / att.total) * 100) : null, last: lastAtt || null },
    tasks: { given, accepted: acc, pct: given ? Math.round((acc / given) * 100) : null, avg, overdue: overdue.length, overdue_list: overdue.slice(0, 5) },
    next: next || null, debt, coins: coinBalance(sid), game: gameOf(sid, { award: false }), rank: rk.rank || null, of: g0 ? ranking(g0.id).length : 0,
  };
}

app.get('/api/parent/children', auth('parent'), wrap((req) => ({
  children: all('SELECT student_id FROM parent_links WHERE parent_id = ? ORDER BY student_id', req.user.id).map((x) => childSummary(x.student_id)),
})));

app.get('/api/parent/child/:id/attendance', auth('parent'), wrap((req) => {
  const sid = id(req.params.id); childOr403(req.user, sid);
  return { items: all(`SELECT gl.date, l.title, g.name AS group_name, a.present FROM group_lessons gl JOIN groups g ON g.id = gl.group_id
                       JOIN lessons l ON l.id = gl.lesson_id JOIN group_students gs ON gs.group_id = g.id AND gs.student_id = ?
                       LEFT JOIN attendance a ON a.group_id = g.id AND a.lesson_id = l.id AND a.student_id = gs.student_id
                       WHERE g.deleted_at IS NULL AND (gl.date <= ? OR a.present IS NOT NULL) ORDER BY gl.date DESC LIMIT 60`, sid, today()) };
}));

app.get('/api/parent/child/:id/tasks', auth('parent'), wrap((req) => {
  const sid = id(req.params.id); childOr403(req.user, sid);
  const t = today();
  const rows = all(`SELECT gl.date, gl.deadline, l.title, g.name AS group_name, s.status, s.score, s.feedback, s.submitted_at
                    FROM group_lessons gl JOIN groups g ON g.id = gl.group_id JOIN lessons l ON l.id = gl.lesson_id
                    JOIN group_students gs ON gs.group_id = g.id AND gs.student_id = ?
                    LEFT JOIN submissions s ON s.group_id = g.id AND s.lesson_id = l.id AND s.student_id = gs.student_id
                    WHERE g.deleted_at IS NULL AND (gl.opened = 1 OR gl.date <= ?) ORDER BY gl.date DESC LIMIT 80`, sid, t);
  for (const x of rows) x.state = x.status || (x.deadline && x.deadline < t ? 'bajarilmagan' : 'kutilmoqda');
  const tests = all(`SELECT t.title, a.score, a.finished_at FROM test_attempts a JOIN tests t ON t.id = a.test_id WHERE a.student_id = ? AND a.finished_at IS NOT NULL ORDER BY a.finished_at DESC LIMIT 20`, sid);
  return { items: rows, tests };
}));

app.get('/api/parent/child/:id/payments', auth('parent'), wrap((req) => {
  const sid = id(req.params.id); childOr403(req.user, sid);
  return {
    debt: paymentSummary(today().slice(0, 7)).filter((x) => x.student_id === sid),
    items: all(`SELECT p.amount, p.month, p.method, p.created_at, g.name AS group_name FROM payments p LEFT JOIN groups g ON g.id = p.group_id
                 WHERE p.student_id = ? ORDER BY p.month DESC, p.id DESC LIMIT 36`, sid),
  };
}));

// Ota-ona ↔ o'qituvchi yozishuvi
function threadTeachers(sid) {
  return all(`SELECT DISTINCT u.id, u.name, u.avatar FROM group_students gs JOIN groups g ON g.id = gs.group_id JOIN users u ON u.id = g.teacher_id
               WHERE gs.student_id = ? AND g.deleted_at IS NULL`, sid);
}
const msgList = (pid, sid, tid) => all(`SELECT m.id, m.text, m.created_at, m.read_at, m.author_id, u.name AS author, u.role AS author_role, u.avatar AS author_avatar FROM parent_msgs m
  JOIN users u ON u.id = m.author_id WHERE m.parent_id = ? AND m.student_id = ? AND m.teacher_id = ? ORDER BY m.id`, pid, sid, tid);

app.get('/api/parent/child/:id/messages', auth('parent'), wrap((req) => {
  const sid = id(req.params.id); childOr403(req.user, sid);
  const teachers = threadTeachers(sid);
  const tid = req.query.teacher ? id(req.query.teacher) : (teachers[0] || {}).id;
  if (!tid) return { teachers, teacher_id: null, items: [] };
  if (!teachers.some((t) => t.id === tid)) fail(403, "Bu o'qituvchi farzandingizga dars bermaydi");
  run("UPDATE parent_msgs SET read_at = datetime('now') WHERE parent_id = ? AND student_id = ? AND teacher_id = ? AND author_id != ? AND read_at IS NULL", req.user.id, sid, tid, req.user.id);
  return { teachers, teacher_id: tid, items: msgList(req.user.id, sid, tid) };
}));
app.post('/api/parent/child/:id/messages', auth('parent'), wrap((req) => {
  const sid = id(req.params.id); childOr403(req.user, sid);
  const tid = id(req.body.teacher_id);
  if (!threadTeachers(sid).some((t) => t.id === tid)) fail(403, "Bu o'qituvchi farzandingizga dars bermaydi");
  const text = str(req.body.text, 3000) || fail(400, "Xabar bo'sh");
  run('INSERT INTO parent_msgs (parent_id, student_id, teacher_id, author_id, text) VALUES (?,?,?,?,?)', req.user.id, sid, tid, req.user.id, text);
  const sn = (one('SELECT name FROM users WHERE id = ?', sid) || {}).name;
  notify(tid, 'pmsg', `${req.user.name} (${sn}ning ota-onasi): ${text.slice(0, 80)}`, `#/inbox/${req.user.id}/${sid}`);
  return { ok: true };
}));

// O'qituvchi: ota-onalar bilan yozishuvlar
app.get('/api/inbox', auth('teacher', 'admin'), wrap((req) => ({
  threads: all(`SELECT m.parent_id, m.student_id, p.name AS parent, p.avatar AS parent_avatar, s.name AS student, max(m.id) AS last_id,
                 (SELECT x.text FROM parent_msgs x WHERE x.parent_id = m.parent_id AND x.student_id = m.student_id AND x.teacher_id = m.teacher_id ORDER BY x.id DESC LIMIT 1) AS last_text, max(m.created_at) AS last_at,
                 sum(CASE WHEN m.author_id != ? AND m.read_at IS NULL THEN 1 ELSE 0 END) AS unread
               FROM parent_msgs m JOIN users p ON p.id = m.parent_id JOIN users s ON s.id = m.student_id
               WHERE m.teacher_id = ? GROUP BY m.parent_id, m.student_id ORDER BY last_id DESC`, req.user.id, req.user.id),
})));
app.get('/api/inbox/:pid/:sid', auth('teacher', 'admin'), wrap((req) => {
  const pid = id(req.params.pid), sid = id(req.params.sid);
  const p = one("SELECT id, name, phone, avatar FROM users WHERE id = ? AND role = 'parent'", pid) || fail(404, 'Ota-ona topilmadi');
  const st = one('SELECT id, name, avatar FROM users WHERE id = ?', sid) || fail(404, "O'quvchi topilmadi");
  if (!isChildOf(pid, sid)) fail(404, 'Topilmadi');
  run("UPDATE parent_msgs SET read_at = datetime('now') WHERE parent_id = ? AND student_id = ? AND teacher_id = ? AND author_id != ? AND read_at IS NULL", pid, sid, req.user.id, req.user.id);
  return { parent: p, student: st, items: msgList(pid, sid, req.user.id) };
}));
app.post('/api/inbox/:pid/:sid', auth('teacher', 'admin'), wrap((req) => {
  const pid = id(req.params.pid), sid = id(req.params.sid);
  if (!isChildOf(pid, sid)) fail(404, 'Topilmadi');
  if (req.user.role === 'teacher' && !threadTeachers(sid).some((t) => t.id === req.user.id)) fail(403, "Bu o'quvchi sizning guruhingizda emas");
  const text = str(req.body.text, 3000) || fail(400, "Xabar bo'sh");
  run('INSERT INTO parent_msgs (parent_id, student_id, teacher_id, author_id, text) VALUES (?,?,?,?,?)', pid, sid, req.user.id, req.user.id, text);
  notify(pid, 'pmsg', `${req.user.name}: ${text.slice(0, 80)}`, `#/p/messages/${sid}`);
  return { ok: true };
}));

// ------------------------------------------------------------------ boshqaruv paneli
function activity(where, ...params) {
  const rows = all(`SELECT date(s.submitted_at, 'localtime') AS d, count(*) AS n FROM submissions s JOIN groups g ON g.id = s.group_id
                    WHERE s.submitted_at >= datetime('now', '-15 days') ${where} GROUP BY d`, ...params);
  const out = [];
  for (let i = 13; i >= 0; i--) {
    const d = localDate(Date.now() - i * 86400000);
    out.push({ date: d, n: (rows.find((r) => r.d === d) || { n: 0 }).n });
  }
  return out;
}
const SUB_SELECT = `SELECT s.id, s.submitted_at, s.status, s.score, u.name AS student, u.id AS student_id, u.avatar AS student_avatar, l.title AS lesson, g.name AS group_name, g.id AS group_id, l.id AS lesson_id
                    FROM submissions s JOIN users u ON u.id = s.student_id JOIN lessons l ON l.id = s.lesson_id JOIN groups g ON g.id = s.group_id`;

app.get('/api/dashboard', auth(), wrap((req) => {
  const u = req.user, t = today();
  if (u.role === 'parent') return { parent: true };
  const c = (sql, ...p) => one(sql, ...p).n;
  const groups = myGroups(u).filter((g) => g.active);
  const announcements = visibleAnnouncements(u, null, 4);
  if (u.role === 'admin') {
    const top = all(`SELECT u.id, u.name, g.name AS group_name, sum(coalesce(s.score, 0)) AS points, count(*) AS accepted
                     FROM submissions s JOIN users u ON u.id = s.student_id JOIN groups g ON g.id = s.group_id
                     WHERE s.status = 'qabul' GROUP BY s.student_id, s.group_id ORDER BY points DESC LIMIT 5`);
    return {
      stats: {
        students: c("SELECT count(*) AS n FROM users WHERE role='student' AND active=1"),
        teachers: c("SELECT count(*) AS n FROM users WHERE role='teacher' AND active=1"),
        groups: groups.length,
        courses: c('SELECT count(*) AS n FROM courses'),
        lessons: c('SELECT count(*) AS n FROM lessons'),
        pending: c("SELECT count(*) AS n FROM submissions WHERE status='tekshirilmoqda'"),
        week: c("SELECT count(*) AS n FROM submissions WHERE submitted_at >= date('now', '-6 days')"),
        today: c('SELECT count(*) AS n FROM group_lessons gl JOIN groups g ON g.id = gl.group_id WHERE g.active = 1 AND gl.date = ?', t),
      },
      payments: (() => { const m = t.slice(0, 7); const sm = paymentSummary(m); return { month: m, received: one('SELECT coalesce(sum(amount), 0) AS n FROM payments WHERE month = ?', m).n, debt: sm.reduce((a, r) => a + r.debt, 0), debtors: sm.filter((r) => r.debt > 0).length }; })(),
      activity: activity(''),
      groups: groups.map((g) => ({ ...g, ...groupStats(g) })),
      top,
      recent: all(`${SUB_SELECT} ORDER BY s.submitted_at DESC LIMIT 8`),
      announcements,
    };
  }
  if (u.role === 'teacher') {
    const lessonsOn = (cmp) => all(`SELECT gl.date, gl.opened, l.title AS lesson, l.num, m.title AS module_title, c.slug, g.name AS group_name, g.id AS group_id, l.id AS lesson_id, g.time
                     FROM group_lessons gl JOIN groups g ON g.id = gl.group_id JOIN lessons l ON l.id = gl.lesson_id JOIN modules m ON m.id = l.module_id JOIN courses c ON c.id = g.course_id
                     WHERE g.teacher_id = ? AND g.active = 1 AND gl.date ${cmp} ? ORDER BY gl.date, g.time LIMIT 8`, u.id, t);
    const pending = all(`${SUB_SELECT} WHERE g.teacher_id = ? AND s.status = 'tekshirilmoqda' ORDER BY s.submitted_at LIMIT 30`, u.id);
    return {
      stats: {
        groups: groups.length,
        students: groups.reduce((a, g) => a + g.student_count, 0),
        pending: pending.length,
        week: c("SELECT count(*) AS n FROM submissions s JOIN groups g ON g.id = s.group_id WHERE g.teacher_id = ? AND s.submitted_at >= date('now', '-6 days')", u.id),
      },
      today: lessonsOn('='),
      upcoming: lessonsOn('>'),
      pending,
      activity: activity('AND g.teacher_id = ?', u.id),
      groups: groups.map((g) => ({ ...g, ...groupStats(g) })),
      announcements,
    };
  }
  const courses = groups.map((g) => {
    const r = ranking(g.id);
    const me = r.find((x) => x.id === u.id) || {};
    const next = one(`SELECT gl.date, l.title, l.id FROM group_lessons gl JOIN lessons l ON l.id = gl.lesson_id
                      WHERE gl.group_id = ? AND gl.date >= ? ORDER BY gl.date LIMIT 1`, g.id, t);
    return { ...g, ...groupStats(g), rank: me.rank, of: r.length, points: me.points || 0, accepted: me.accepted || 0, my_avg: me.avg_score, next };
  });
  const todo = all(`SELECT gl.date, gl.deadline, l.title AS lesson, g.name AS group_name, g.id AS group_id, l.id AS lesson_id, s.status
               FROM group_lessons gl JOIN groups g ON g.id = gl.group_id JOIN lessons l ON l.id = gl.lesson_id
               JOIN group_students gs ON gs.group_id = g.id AND gs.student_id = ?
               LEFT JOIN submissions s ON s.group_id = g.id AND s.lesson_id = l.id AND s.student_id = gs.student_id
               WHERE g.active = 1 AND (gl.opened = 1 OR gl.date <= ?) AND (s.id IS NULL OR s.status = 'qaytarilgan')
               ORDER BY gl.deadline LIMIT 12`, u.id, t);
  const my = one(`SELECT coalesce(sum(status='qabul'),0) AS accepted, coalesce(sum(status='tekshirilmoqda'),0) AS pending, round(avg(score)) AS avg_score
                  FROM submissions WHERE student_id = ?`, u.id);
  return {
    game: gameOf(u.id),
    stats: { ...my, overdue: todo.filter((x) => x.deadline && x.deadline < t).length, coins: coinBalance(u.id), earned: coinEarned(u.id) },
    tests: all(`SELECT t.id, t.title, t.duration_min, g.name AS group_name, json_array_length(t.questions) AS count FROM tests t
                JOIN groups g ON g.id = t.group_id JOIN group_students gs ON gs.group_id = g.id AND gs.student_id = ?
                LEFT JOIN test_attempts a ON a.test_id = t.id AND a.student_id = gs.student_id
                WHERE t.published = 1 AND g.active = 1 AND a.finished_at IS NULL ORDER BY t.id DESC`, u.id),
    courses,
    todo,
    graded: all(`SELECT s.status, s.score, s.graded_at, l.title AS lesson, g.id AS group_id, l.id AS lesson_id
                 FROM submissions s JOIN lessons l ON l.id = s.lesson_id JOIN groups g ON g.id = s.group_id
                 WHERE s.student_id = ? AND s.graded_at IS NOT NULL ORDER BY s.graded_at DESC LIMIT 6`, u.id),
    announcements,
  };
}));

// ------------------------------------------------------------------ dars materiallari (/m/...)
// Faqat tizimga kirganlar uchun; faqat dars sahifalari papkalari; yechim fayllari berilmaydi.
let materialDirs = [];
function refreshMaterialDirs() {
  const dirs = new Set();
  for (const r of all('SELECT url FROM lessons WHERE url IS NOT NULL UNION SELECT plan_url FROM courses WHERE plan_url IS NOT NULL')) {
    const rel = decodeURIComponent(r.url.replace(/^\/m\//, ''));
    dirs.add(path.resolve(ROOT, path.dirname(rel)));
  }
  materialDirs = [...dirs];
}
const DENY = /(^|[\\/])(node_modules|\.git|\.vscode|tools|_backup[^\\/]*|masala|misollar|masalalar|homwork|uyga vazifa|database)([\\/]|$)|\.(sql|env|db|sqlite|yaml|yml|md|txt|ts)$|(^|[\\/])\.[^\\/]+$/i;

app.get('/m/*splat', (req, res, next) => {
  if (!req.user) return res.redirect('/#/login');
  let rel;
  try { rel = decodeURIComponent(req.path.slice(3)); } catch { return res.status(400).end(); }
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep)) return res.status(403).end();
  const relFromRoot = path.relative(ROOT, abs);
  // o'quv reja sahifalari faqat o'qituvchi va administrator uchun
  // dars materiallari va o'quv reja — faqat o'qituvchi va administrator uchun
  if (req.user.role === 'student') return res.status(404).send('Topilmadi');
  if (req.user.role === 'student' && all('SELECT plan_url FROM courses WHERE plan_url IS NOT NULL').some((c) => path.resolve(ROOT, decodeURIComponent(c.plan_url.replace(/^\/m\//, ''))) === abs)) return res.status(404).send('Topilmadi');
  const inLessonDir = materialDirs.some((d) => abs === d || abs.startsWith(d + path.sep));
  const inSharedAssets = relFromRoot.split(path.sep).includes('_assets');
  if ((!inLessonDir && !inSharedAssets) || DENY.test(relFromRoot)) return res.status(404).send('Topilmadi');
  let file = abs;
  try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); } catch { return res.status(404).send('Topilmadi'); }
  res.sendFile(file, { dotfiles: 'deny' }, (err) => { if (err && !res.headersSent) res.status(404).send('Topilmadi'); });
});

// ------------------------------------------------------------------ ochiq o'quv rejalari (/reja/...)
// Login shart emas — HR / hamkorlarga ulashish uchun. Yechim fayllari bu yerda ham berilmaydi (DENY).
const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const publicPlanUrl = (planUrl) => (planUrl ? planUrl.replace(/^\/m\//, '/reja/') : null);

// /reja — barcha ochiq rejalar ro'yxati (bitta havola HR uchun)
app.get(['/reja', '/reja/'], (req, res) => {
  const courses = all(`SELECT c.*,
      (SELECT count(*) FROM modules WHERE course_id = c.id) AS mc,
      (SELECT count(*) FROM lessons WHERE course_id = c.id) AS lc
    FROM courses c WHERE c.plan_url IS NOT NULL ORDER BY c.id`);
  const cards = courses.map((c) => `
    <a class="rc" href="${esc(publicPlanUrl(c.plan_url))}">
      <div class="rc-top"><h2>${esc(c.title)}</h2><span class="rc-open">Rejani ochish →</span></div>
      ${c.subtitle ? `<p>${esc(c.subtitle)}</p>` : ''}
      <div class="rc-foot"><span>${c.mc} modul</span><span>${c.lc} dars</span></div>
    </a>`).join('');
  res.type('html').setHeader('Cache-Control', 'public, max-age=300');
  res.send(`<!DOCTYPE html><html lang="uz"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>O'quv rejalari — yuksalish.dev</title>
<meta name="description" content="Yuksalish o'quv markazi kurslari va o'quv rejalari">
<meta name="robots" content="noindex">
<link rel="icon" href="/img/favicon.png" type="image/png">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:"Poppins",system-ui,sans-serif;color:#eef1fb;background:#0f1229;line-height:1.6;min-height:100vh;-webkit-font-smoothing:antialiased}
body::before{content:"";position:fixed;inset:0;z-index:-1;background:radial-gradient(60vw 50vw at 85% -5%,rgba(108,124,255,.25),transparent 60%),radial-gradient(50vw 45vw at -10% 40%,rgba(34,197,139,.14),transparent 60%),linear-gradient(180deg,#121533,#0f1229 60%)}
.wrap{max-width:860px;margin:0 auto;padding:0 20px}
header{display:flex;align-items:center;gap:12px;padding:26px 0}
header img{width:38px;height:38px;object-fit:contain;filter:drop-shadow(0 0 8px rgba(255,255,255,.3))}
header b{font-size:1.2rem;font-weight:700}header b i{color:#f6c343;font-style:normal}
.hero{padding:30px 0 26px}
.hero h1{font-size:clamp(1.9rem,5vw,2.8rem);font-weight:800;letter-spacing:-.02em;line-height:1.1}
.hero p{color:#9aa3c0;margin-top:10px;max-width:560px}
.grid{display:grid;gap:16px;padding-bottom:50px}
.rc{display:block;padding:24px;border-radius:22px;background:rgba(255,255,255,.055);border:1px solid rgba(255,255,255,.09);text-decoration:none;color:inherit;transition:background .2s,transform .15s,border-color .2s}
.rc:hover{background:rgba(255,255,255,.09);border-color:rgba(108,124,255,.4);transform:translateY(-2px)}
.rc-top{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap}
.rc-top h2{font-size:1.3rem;font-weight:700}
.rc-open{color:#7ff0c3;font-weight:600;font-size:.92rem;white-space:nowrap}
.rc p{color:#9aa3c0;margin-top:8px}
.rc-foot{display:flex;gap:10px;margin-top:16px}
.rc-foot span{font-size:.82rem;color:#c7cfe2;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);padding:5px 12px;border-radius:999px}
footer{color:#717899;font-size:.84rem;padding:0 0 34px;text-align:center}
footer a{color:#9aa3c0}
@media(max-width:560px){.rc{padding:20px}.rc-top h2{font-size:1.15rem}}
</style></head><body>
<div class="wrap">
  <header><img src="/img/yuksalish-logo-light.png" alt=""><b>yuksalish<i>.dev</i></b></header>
  <section class="hero"><h1>O'quv rejalari</h1><p>Yuksalish o'quv markazi kurslarining to'liq dastur va dars rejalari.</p></section>
  <div class="grid">${cards || '<p style="color:#9aa3c0">Hozircha reja yo\'q.</p>'}</div>
  <footer>© ${new Date().getFullYear()} yuksalish.dev · <a href="/#/login">Platformaga kirish</a></footer>
</div>
</body></html>`);
});

// /reja/... — reja va dars sahifalari (fayllar), login shart emas
app.get('/reja/*splat', (req, res) => {
  let rel;
  try { rel = decodeURIComponent(req.path.replace(/^\/reja\//, '')); } catch { return res.status(400).end(); }
  const abs = path.resolve(ROOT, rel);
  if (!abs.startsWith(ROOT + path.sep)) return res.status(403).end();
  const relFromRoot = path.relative(ROOT, abs);
  const inLessonDir = materialDirs.some((d) => abs === d || abs.startsWith(d + path.sep));
  const inSharedAssets = relFromRoot.split(path.sep).includes('_assets');
  if ((!inLessonDir && !inSharedAssets) || DENY.test(relFromRoot)) return res.status(404).send('Topilmadi');
  let file = abs;
  try { if (fs.statSync(file).isDirectory()) file = path.join(file, 'index.html'); } catch { return res.status(404).send('Topilmadi'); }
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.sendFile(file, { dotfiles: 'deny' }, (err) => { if (err && !res.headersSent) res.status(404).send('Topilmadi'); });
});

// ------------------------------------------------------------------ profil rasmi
const AVATAR_DIR = path.join(DATA_DIR, 'avatars');
fs.mkdirSync(AVATAR_DIR, { recursive: true });
function setAvatar(uid, dataUrl) {
  const u = one('SELECT avatar FROM users WHERE id = ?', uid) || fail(404, 'Foydalanuvchi topilmadi');
  const removeOld = () => { if (u.avatar) fs.rm(path.join(AVATAR_DIR, path.basename(u.avatar)), { force: true }, () => {}); };
  if (dataUrl === null) { removeOld(); run('UPDATE users SET avatar = NULL WHERE id = ?', uid); return null; }
  const m = /^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/.exec(String(dataUrl || ''));
  if (!m) fail(400, "Rasm formati noto'g'ri (JPG, PNG yoki WEBP)");
  const buf = Buffer.from(m[2], 'base64');
  if (buf.length > 400 * 1024) fail(400, "Rasm hajmi 400 KB dan oshmasin");
  const ok = (m[1] === 'jpeg' && buf[0] === 0xff && buf[1] === 0xd8) || (m[1] === 'png' && buf[0] === 0x89 && buf[1] === 0x50) || (m[1] === 'webp' && buf.slice(8, 12).toString() === 'WEBP');
  if (!ok) fail(400, "Fayl rasm emas");
  const name = `u${uid}-${Date.now()}.${m[1] === 'jpeg' ? 'jpg' : m[1]}`;
  fs.writeFileSync(path.join(AVATAR_DIR, name), buf);
  removeOld();
  const url = `/avatars/${name}`;
  run('UPDATE users SET avatar = ? WHERE id = ?', url, uid);
  return url;
}
app.put('/api/me/avatar', auth(), wrap((req) => ({ avatar: setAvatar(req.user.id, req.body.data ?? null) })));
app.put('/api/users/:id/avatar', auth('admin'), wrap((req) => ({ avatar: setAvatar(id(req.params.id), req.body.data ?? null) })));
app.get('/avatars/:file', (req, res) => {
  if (!req.user) return res.status(401).end();
  if (!/^u\d+-\d+\.(jpg|png|webp)$/.test(req.params.file)) return res.status(404).end();
  res.sendFile(path.join(AVATAR_DIR, req.params.file), { maxAge: '7d' }, (err) => { if (err && !res.headersSent) res.status(404).end(); });
});

// ------------------------------------------------------------------ dizayn rasmlari (daraja fonlari, nishonlar)
// public/img/levels/level-N.(webp|jpg|png) va public/img/badges/<kalit>.(png|webp|svg) qo'yilsa — avtomatik ishlatiladi
const IMG_DIR = path.join(__dirname, '..', 'public', 'img');
app.get('/api/assets', auth(), wrap(() => {
  const list = (dir, re) => { try { return fs.readdirSync(path.join(IMG_DIR, dir)).filter((f) => re.test(f)); } catch { return []; } };
  const levels = {}, badges = {};
  for (const f of list('levels', /^level-(\d+)\.(webp|jpe?g|png)$/i)) levels[Number(/\d+/.exec(f)[0])] = `/img/levels/${f}`;
  for (const f of list('badges', /^[a-z0-9_]+\.(webp|png|svg)$/i)) badges[f.replace(/\.[^.]+$/, '')] = `/img/badges/${f}`;
  return { levels, badges };
}));

// ------------------------------------------------------------------ interfeys (SPA)
// Interfeys fayllariga kontent bo'yicha versiya: app.js/app.css o'zgarsa URL ham o'zgaradi,
// shuning uchun brauzer deploydan keyin eski faylni ko'rsatmaydi (kesh «buzuq ochilish»ining oldini oladi)
// va ayni paytda fayllarni uzoq (immutable) keshlab tezlikni oshiradi.
const PUB_DIR = path.join(__dirname, '..', 'public');
const ASSET_VER = (() => {
  try {
    const h = crypto.createHash('md5');
    for (const f of ['app.js', 'app.css']) h.update(fs.readFileSync(path.join(PUB_DIR, f)));
    return h.digest('hex').slice(0, 10);
  } catch { return String(Date.now()); }
})();
const INDEX_HTML = (() => {
  try {
    return fs.readFileSync(path.join(PUB_DIR, 'index.html'), 'utf8')
      .replace('href="/app.css"', `href="/app.css?v=${ASSET_VER}"`)
      .replace('src="/app.js"', `src="/app.js?v=${ASSET_VER}"`);
  } catch { return null; }
})();
// index.html har doim tarmoqdan (versiyalangan havolalar bilan), fayllarning o'zi uzoq keshda
app.get(['/', '/index.html'], (req, res, next) => {
  if (!INDEX_HTML) return next();
  res.setHeader('Cache-Control', 'no-cache');
  res.type('html').send(INDEX_HTML);
});
app.use(express.static(PUB_DIR, {
  index: 'index.html',
  setHeaders: (res, filePath) => {
    if (/\.(js|css|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|mp4|webm|m4v)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable'); // 1 yil (app.js/css versiya bilan buziladi)
    }
  },
}));
app.use('/api', (req, res) => res.status(404).json({ error: 'Topilmadi' }));

app.use((err, req, res, next) => {
  const status = err.status || 500;
  if (status === 500) console.error(err);
  res.status(status).json({ error: status === 500 ? 'Serverda xatolik' : err.message });
});

// ------------------------------------------------------------------ ishga tushirish
if (require.main === module) {
  const summary = importAll();
  refreshMaterialDirs();
  // coin tizimidan oldingi natijalar uchun bir martalik hisob
  if (!one('SELECT 1 FROM coin_tx LIMIT 1')) {
    tx(() => {
      for (const r of all("SELECT id FROM submissions WHERE status = 'qabul'")) syncSubmissionCoins(r.id);
      for (const r of all('SELECT a.student_id, a.score, t.id, t.title FROM test_attempts a JOIN tests t ON t.id = a.test_id WHERE a.finished_at IS NOT NULL')) setCoins(r.student_id, `test:${r.id}`, Math.round(r.score / 10), `Test: ${r.title} (${r.score}%)`, null);
      for (const r of all('SELECT * FROM attendance WHERE present = 1')) setCoins(r.student_id, `att:${r.group_id}:${r.lesson_id}`, 2, `Darsga keldi: ${lessonTitle(r.lesson_id)}`, null);
    });
  }
  if (!one("SELECT 1 FROM users WHERE role = 'admin'")) {
    console.log("\nAdministrator yo'q. Avval:  npm run seed\n");
  }
  // HOST=127.0.0.1 — faqat nginx orqali (serverda); bo'sh bo'lsa hamma interfeyslar (lokal)
  app.listen(PORT, process.env.HOST || undefined, () => {
    console.log(summary.map((s) => '  ' + s).join('\n'));
    console.log(`\nYuksalish LMS ishlayapti:  http://localhost:${PORT}\n`);
  });
}

module.exports = { app, buildSchedule, refreshMaterialDirs };
