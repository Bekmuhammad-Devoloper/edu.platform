'use strict';
/*
 * Kurslarni mavjud reja sahifalaridan import qiladi (har safar ishga tushirilganda yangilaydi):
 *   - Khamidov Reja/Khamidov platformasi/index.html  -> NodeJS Backend
 *   - IT Kursi/index.html                            -> IT kursi
 *   - AI Kursi/index.html                            -> AI Prompt Engineering
 * Dars materiallari /m/<loyiha ildiziga nisbatan yo'l> manzilida beriladi (server.js).
 * Mavjud darslar (title + modul bo'yicha) saqlanadi, shuning uchun guruh jadvali va vazifalar o'chmaydi.
 */
const fs = require('fs');
const path = require('path');
const { one, all, run, tx } = require('./db');

const ROOT = path.resolve(__dirname, '..', '..');
const PLANS = [
  { slug: 'nodejs-backend', file: 'Khamidov Reja/Khamidov platformasi/index.html', title: 'NodeJS Backend', subtitle: "Foundation'dan NestJS va Docker'gacha" },
  { slug: 'it-kursi', file: 'IT Kursi/index.html', title: 'IT kursi — Kompyuter savodxonligi', subtitle: '3 oy · 24 dars' },
  { slug: 'ai-prompt', file: 'AI Kursi/index.html', title: 'AI Prompt Engineering', subtitle: "Maktab o'quvchilari uchun · 3 oy · 36 dars" },
];

const strip = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
const toUrl = (abs) => '/m/' + path.relative(ROOT, abs).split(path.sep).map(encodeURIComponent).join('/');

function parsePlan(plan) {
  const file = path.join(ROOT, plan.file);
  if (!fs.existsSync(file)) return null;
  const html = fs.readFileSync(file, 'utf8');
  const dir = path.dirname(file);
  const blocks = html.split('<div class="lesson" data-module=').slice(1);
  const modules = [];
  for (const b of blocks) {
    const nameM = b.match(/<span class="lesson-name">([\s\S]*?)<\/span>\s*<\/div>/);
    const title = strip((nameM ? nameM[1] : '').replace(/<span class="lesson-num">[\s\S]*?<\/span>/, ''));
    const list = (b.match(/<ol class="plan-list">([\s\S]*?)<\/ol>/) || [, ''])[1];
    const lessons = [];
    let week = null;
    const re = /<li class="plan-week">([\s\S]*?)<\/li>|<li class="plan-item[^"]*">([\s\S]*?)<\/li>/g;
    let m;
    while ((m = re.exec(list))) {
      if (m[1] !== undefined) { week = strip(m[1]); continue; }
      const item = m[2];
      const href = (item.match(/<a class="dars" href="([^"]+)"/) || [])[1];
      const text = strip((item.match(/<span class="plan-text">([\s\S]*?)<\/span>/) || [, ''])[1]);
      const tag = strip((item.match(/<span class="tag [^"]*">([\s\S]*?)<\/span>/) || [, ''])[1]) || null;
      const day = strip((item.match(/<span class="plan-day">([\s\S]*?)<\/span>/) || [, ''])[1]) || null;
      let url = null;
      if (href && !/^https?:/.test(href)) {
        const abs = path.resolve(dir, decodeURIComponent(href.split('#')[0]));
        if (fs.existsSync(abs)) url = toUrl(abs);
      }
      lessons.push({ title: text, url, week, day, tag });
    }
    modules.push({ title, lessons });
  }
  return modules;
}

function importAll() {
  const summary = [];
  tx(() => {
    for (const plan of PLANS) {
      const modules = parsePlan(plan);
      if (!modules) { summary.push(`${plan.title}: reja fayli topilmadi (${plan.file})`); continue; }
      let course = one('SELECT * FROM courses WHERE slug = ?', plan.slug);
      const planUrl = toUrl(path.join(ROOT, plan.file));
      if (!course) {
        run('INSERT INTO courses (slug, title, subtitle, plan_url) VALUES (?,?,?,?)', plan.slug, plan.title, plan.subtitle, planUrl);
        course = one('SELECT * FROM courses WHERE slug = ?', plan.slug);
      } else {
        run('UPDATE courses SET plan_url = ? WHERE id = ?', planUrl, course.id);
      }
      let position = 0;
      const keepLessonIds = [];
      modules.forEach((mod, mi) => {
        let dbMod = one('SELECT * FROM modules WHERE course_id = ? AND position = ?', course.id, mi + 1);
        if (!dbMod) {
          run('INSERT INTO modules (course_id, position, title) VALUES (?,?,?)', course.id, mi + 1, mod.title);
          dbMod = one('SELECT * FROM modules WHERE course_id = ? AND position = ?', course.id, mi + 1);
        } else if (dbMod.title !== mod.title) {
          run('UPDATE modules SET title = ? WHERE id = ?', mod.title, dbMod.id);
        }
        mod.lessons.forEach((l, li) => {
          position++;
          const existing = one('SELECT id FROM lessons WHERE module_id = ? AND num = ?', dbMod.id, li + 1);
          if (existing) {
            run('UPDATE lessons SET position=?, title=?, url=?, week=?, day=?, tag=? WHERE id=?', position, l.title, l.url, l.week, l.day, l.tag, existing.id);
            keepLessonIds.push(existing.id);
          } else {
            const r = run('INSERT INTO lessons (course_id, module_id, position, num, title, url, week, day, tag) VALUES (?,?,?,?,?,?,?,?,?)',
              course.id, dbMod.id, position, li + 1, l.title, l.url, l.week, l.day, l.tag);
            keepLessonIds.push(Number(r.lastInsertRowid));
          }
        });
      });
      // rejadan olib tashlangan darslar (guruhlarda ishlatilmagan bo'lsa) o'chiriladi
      const stale = all('SELECT id FROM lessons WHERE course_id = ?', course.id).map((r) => r.id).filter((id) => !keepLessonIds.includes(id));
      for (const id of stale) {
        const used = one('SELECT 1 FROM submissions WHERE lesson_id = ? LIMIT 1', id);
        if (!used) run('DELETE FROM lessons WHERE id = ?', id);
      }
      run('DELETE FROM modules WHERE course_id = ? AND position > ? AND id NOT IN (SELECT module_id FROM lessons)', course.id, modules.length);
      const withUrl = modules.reduce((a, m) => a + m.lessons.filter((l) => l.url).length, 0);
      summary.push(`${plan.title}: ${modules.length} modul, ${position} dars, ${withUrl} ta material`);
    }
  });
  return summary;
}

module.exports = { importAll, ROOT };

if (require.main === module) {
  console.log(importAll().join('\n'));
}
