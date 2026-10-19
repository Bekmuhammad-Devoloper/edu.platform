'use strict';
/*
 * Boshlang'ich ma'lumotlar:
 *   npm run seed            -> administrator (agar yo'q bo'lsa) + kurslar importi
 *   npm run seed -- --demo  -> qo'shimcha: namunaviy o'qituvchi, 3 o'quvchi va guruh
 * Parollar konsolga chiqariladi — birinchi kirishdan keyin "Profil" bo'limida o'zgartiring.
 */
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { one, run } = require('./db');
const { importAll } = require('./import-courses');
const { buildSchedule } = require('./server');

const pw = () => crypto.randomBytes(5).toString('hex');
const created = [];

function ensureUser(login, name, role, password) {
  const u = one('SELECT id FROM users WHERE login = ?', login);
  if (u) return u.id;
  const r = run('INSERT INTO users (name, login, password_hash, role) VALUES (?,?,?,?)', name, login, bcrypt.hashSync(password, 10), role);
  created.push(`  ${role.padEnd(8)} login: ${login.padEnd(10)} parol: ${password}`);
  return Number(r.lastInsertRowid);
}

console.log(importAll().map((s) => '  ' + s).join('\n'));
ensureUser('admin', 'Administrator', 'admin', process.env.ADMIN_PASSWORD || pw());

if (process.argv.includes('--demo')) {
  const teacher = ensureUser('teacher', "Namuna O'qituvchi", 'teacher', pw());
  const students = [['ali', 'Ali Valiyev'], ['malika', 'Malika Karimova'], ['sardor', 'Sardor Rahimov']]
    .map(([login, name]) => ensureUser(login, name, 'student', pw()));
  const course = one("SELECT id FROM courses WHERE slug = 'it-kursi'") || one('SELECT id FROM courses ORDER BY id LIMIT 1');
  if (course && !one("SELECT 1 FROM groups WHERE name = 'Namuna guruh'")) {
    const start = new Date(); start.setDate(start.getDate() - 14);
    const r = run('INSERT INTO groups (name, course_id, teacher_id, start_date, days, time) VALUES (?,?,?,?,?,?)',
      'Namuna guruh', course.id, teacher, start.toISOString().slice(0, 10), '1,3,5', '14:00');
    const gid = Number(r.lastInsertRowid);
    buildSchedule(gid);
    for (const s of students) run('INSERT INTO group_students (group_id, student_id) VALUES (?,?)', gid, s);
    console.log("  Namuna guruh yaratildi (IT kursi, Du/Chor/Ju, 2 hafta oldin boshlangan)");
  }
}

console.log(created.length ? '\nYangi foydalanuvchilar (parollarni saqlab qo\'ying!):\n' + created.join('\n') : "\nYangi foydalanuvchi yaratilmadi (allaqachon mavjud).");
