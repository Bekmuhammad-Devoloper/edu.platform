'use strict';
// SQLite (Node.js ichidagi node:sqlite) — alohida baza serveri kerak emas.
const fs = require('fs');
const path = require('path');
const { DatabaseSync } = require('node:sqlite');

const DATA_DIR = path.join(__dirname, '..', 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });
const db = new DatabaseSync(process.env.DB_FILE || path.join(DATA_DIR, 'lms.db'));

db.exec(`
PRAGMA foreign_keys = ON;
PRAGMA journal_mode = WAL;

CREATE TABLE IF NOT EXISTS users (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  name          TEXT NOT NULL,
  login         TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('admin','teacher','student','parent')),
  phone         TEXT,
  active        INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sessions (
  token      TEXT PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  slug     TEXT NOT NULL UNIQUE,
  title    TEXT NOT NULL,
  subtitle TEXT,
  plan_url TEXT
);

CREATE TABLE IF NOT EXISTS modules (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL,
  title     TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lessons (
  id        INTEGER PRIMARY KEY AUTOINCREMENT,
  course_id INTEGER NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  module_id INTEGER NOT NULL REFERENCES modules(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL,          -- kurs bo'yicha umumiy tartib
  num       INTEGER NOT NULL,          -- modul ichidagi raqam
  title     TEXT NOT NULL,
  url       TEXT,                      -- dars materiali (/m/... yo'li) yoki NULL
  week      TEXT,
  day       TEXT,
  tag       TEXT
);

CREATE TABLE IF NOT EXISTS groups (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  start_date TEXT NOT NULL,            -- YYYY-MM-DD
  days       TEXT NOT NULL,            -- hafta kunlari: 1=Du ... 7=Ya, masalan "1,3,5"
  time       TEXT,                     -- "14:00"
  active     INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS group_students (
  group_id   INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);

CREATE TABLE IF NOT EXISTS group_lessons (
  group_id  INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  lesson_id INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  date      TEXT,                      -- dars sanasi
  deadline  TEXT,                      -- uyga vazifa muddati (YYYY-MM-DD, kun oxirigacha)
  opened    INTEGER NOT NULL DEFAULT 0,-- 1 = o'qituvchi ochgan (sanadan qat'i nazar)
  PRIMARY KEY (group_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS submissions (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id     INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  lesson_id    INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  student_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text         TEXT,
  link         TEXT,
  submitted_at TEXT,
  status       TEXT NOT NULL DEFAULT 'tekshirilmoqda'
               CHECK (status IN ('tekshirilmoqda','qaytarilgan','qabul')),
  score        INTEGER,
  feedback     TEXT,
  graded_by    INTEGER REFERENCES users(id) ON DELETE SET NULL,
  graded_at    TEXT,
  UNIQUE (group_id, lesson_id, student_id)
);

CREATE TABLE IF NOT EXISTS comments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id   INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  lesson_id  INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE, -- qaysi o'quvchining vazifasi bo'yicha
  author_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attendance (
  group_id   INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  lesson_id  INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  present    INTEGER NOT NULL,
  PRIMARY KEY (group_id, lesson_id, student_id)
);

CREATE TABLE IF NOT EXISTS announcements (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id   INTEGER REFERENCES groups(id) ON DELETE CASCADE, -- NULL = hammaga
  author_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  text       TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notifications (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL,             -- submit | grade | comment | announce | open
  text       TEXT NOT NULL,
  link       TEXT,
  read       INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS payments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  group_id   INTEGER REFERENCES groups(id) ON DELETE SET NULL,
  amount     INTEGER NOT NULL,            -- so'm
  month      TEXT NOT NULL,               -- YYYY-MM (qaysi oy uchun)
  method     TEXT,                        -- naqd | karta | click | payme | boshqa
  note       TEXT,
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS tests (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id     INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  duration_min INTEGER NOT NULL DEFAULT 20,
  questions    TEXT NOT NULL,             -- JSON: [{q, options:[..], answer: index}]
  published    INTEGER NOT NULL DEFAULT 0,
  created_by   INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS test_attempts (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  test_id     INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  answers     TEXT,                       -- JSON: [index | null]
  correct     INTEGER,
  total       INTEGER,
  score       INTEGER,                    -- foiz
  started_at  TEXT NOT NULL DEFAULT (datetime('now')),
  finished_at TEXT,
  UNIQUE (test_id, student_id)
);

CREATE TABLE IF NOT EXISTS certificates (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  code       TEXT NOT NULL UNIQUE,
  group_id   INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  issued_by  INTEGER REFERENCES users(id) ON DELETE SET NULL,
  issued_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (group_id, student_id)
);

CREATE TABLE IF NOT EXISTS audit_log (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    INTEGER REFERENCES users(id) ON DELETE SET NULL,
  user_name  TEXT,                       -- foydalanuvchi o'chirilsa ham ismi qoladi
  user_role  TEXT,
  action     TEXT NOT NULL,              -- create | update | delete | restore | ...
  entity     TEXT NOT NULL,              -- group | user | payment | test | certificate | students
  entity_id  INTEGER,
  title      TEXT,                       -- masalan guruh nomi
  details    TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS attachments (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id   INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  lesson_id  INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  kind       TEXT NOT NULL CHECK (kind IN ('task','submission')),
  owner_id   INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  mime       TEXT,
  size       INTEGER NOT NULL,
  stored     TEXT NOT NULL,              -- data/files ichidagi nom
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_att ON attachments(group_id, lesson_id, kind, owner_id);

CREATE TABLE IF NOT EXISTS coin_tx (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  amount     INTEGER NOT NULL,           -- + olingan, - sarflangan
  reason     TEXT,
  ref        TEXT,                       -- manba: sub:12 | test:3 | att:1:5 | order:7 (bir marta beriladi)
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE (student_id, ref)
);
CREATE INDEX IF NOT EXISTS idx_coin_student ON coin_tx(student_id);

CREATE TABLE IF NOT EXISTS market_items (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  description TEXT,
  price       INTEGER NOT NULL,          -- coin
  stock       INTEGER,                   -- NULL = cheklanmagan
  image       TEXT,
  active      INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS market_orders (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  item_id    INTEGER NOT NULL REFERENCES market_items(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  price      INTEGER NOT NULL,
  status     TEXT NOT NULL DEFAULT 'kutilmoqda' CHECK (status IN ('kutilmoqda','berildi','bekor')),
  handled_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  handled_at TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS lesson_videos (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  group_id   INTEGER NOT NULL REFERENCES groups(id) ON DELETE CASCADE,
  lesson_id  INTEGER NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  mime       TEXT,
  size       INTEGER NOT NULL,
  stored     TEXT NOT NULL,              -- data/videos ichidagi nom
  owner_id   INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT
);

CREATE TABLE IF NOT EXISTS parent_links (
  parent_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  PRIMARY KEY (parent_id, student_id)
);

CREATE TABLE IF NOT EXISTS parent_msgs (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  parent_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  teacher_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  author_id  INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  text       TEXT NOT NULL,
  read_at    TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
CREATE INDEX IF NOT EXISTS idx_pmsg ON parent_msgs(parent_id, student_id, teacher_id);

CREATE INDEX IF NOT EXISTS idx_pay_month ON payments(month, student_id);
CREATE INDEX IF NOT EXISTS idx_notif_user ON notifications(user_id, read, id);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id, position);
CREATE INDEX IF NOT EXISTS idx_sub_group ON submissions(group_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_comments ON comments(group_id, lesson_id, student_id);
`);

// eski bazalar uchun yangi ustunlar
for (const sql of ['ALTER TABLE groups ADD COLUMN price INTEGER NOT NULL DEFAULT 0', 'ALTER TABLE users ADD COLUMN avatar TEXT', 'ALTER TABLE users ADD COLUMN gender TEXT', 'ALTER TABLE groups ADD COLUMN created_by INTEGER', 'ALTER TABLE groups ADD COLUMN deleted_at TEXT', 'ALTER TABLE groups ADD COLUMN deleted_by INTEGER', 'ALTER TABLE group_lessons ADD COLUMN task_text TEXT', 'ALTER TABLE group_lessons ADD COLUMN task_updated_at TEXT', 'ALTER TABLE group_lessons ADD COLUMN video_url TEXT', 'ALTER TABLE lesson_videos ADD COLUMN title TEXT', 'ALTER TABLE lesson_videos ADD COLUMN description TEXT', 'ALTER TABLE lesson_videos ADD COLUMN poster TEXT', 'ALTER TABLE groups ADD COLUMN max_attempts INTEGER NOT NULL DEFAULT 0', 'ALTER TABLE group_lessons ADD COLUMN max_attempts INTEGER', 'ALTER TABLE submissions ADD COLUMN attempts INTEGER NOT NULL DEFAULT 1', 'ALTER TABLE submissions ADD COLUMN extra_attempts INTEGER NOT NULL DEFAULT 0', "ALTER TABLE lesson_videos ADD COLUMN kind TEXT NOT NULL DEFAULT 'lesson'", 'ALTER TABLE submissions ADD COLUMN ai_result TEXT', 'ALTER TABLE submissions ADD COLUMN ai_at TEXT']) {
  try { db.exec(sql); } catch { /* ustun allaqachon bor */ }
}

{
  const row = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'users'").get();
  if (row && !row.sql.includes("'parent'")) {
    const newSql = row.sql
      .replace("CHECK (role IN ('admin','teacher','student'))", "CHECK (role IN ('admin','teacher','student','parent'))")
      .replace(/^CREATE TABLE "?users"?/, 'CREATE TABLE users_new');
    if (!newSql.includes("'parent'") || !newSql.startsWith('CREATE TABLE users_new')) throw new Error('users jadvalini yangilab bo\'lmadi');
    db.exec('PRAGMA foreign_keys = OFF');
    try {
      db.exec('BEGIN');
      db.exec(newSql);
      db.exec('INSERT INTO users_new SELECT * FROM users');
      db.exec('DROP TABLE users');
      db.exec('ALTER TABLE users_new RENAME TO users');
      db.exec('COMMIT');
    } catch (e) { db.exec('ROLLBACK'); throw e; } finally { db.exec('PRAGMA foreign_keys = ON'); }
  }
}

// 'dev' (egasi / dasturchi) rolini qo'shamiz — eng yuqori huquq
{
  const row = db.prepare("SELECT sql FROM sqlite_master WHERE type = 'table' AND name = 'users'").get();
  if (row && !row.sql.includes("'dev'")) {
    const newSql = row.sql
      .replace("CHECK (role IN ('admin','teacher','student','parent'))", "CHECK (role IN ('admin','teacher','student','parent','dev'))")
      .replace(/^CREATE TABLE "?users"?/, 'CREATE TABLE users_new');
    if (!newSql.includes("'dev'") || !newSql.startsWith('CREATE TABLE users_new')) throw new Error('users jadvaliga dev rolini qo\'shib bo\'lmadi');
    db.exec('PRAGMA foreign_keys = OFF');
    try {
      db.exec('BEGIN');
      db.exec(newSql);
      db.exec('INSERT INTO users_new SELECT * FROM users');
      db.exec('DROP TABLE users');
      db.exec('ALTER TABLE users_new RENAME TO users');
      db.exec('COMMIT');
    } catch (e) { db.exec('ROLLBACK'); throw e; } finally { db.exec('PRAGMA foreign_keys = ON'); }
  }
}

// kichik yordamchilar
const one = (sql, ...p) => db.prepare(sql).get(...p);
const all = (sql, ...p) => db.prepare(sql).all(...p);
const run = (sql, ...p) => db.prepare(sql).run(...p);
function tx(fn) {
  db.exec('BEGIN');
  try { const r = fn(); db.exec('COMMIT'); return r; } catch (e) { db.exec('ROLLBACK'); throw e; }
}

module.exports = { db, one, all, run, tx, DATA_DIR };
