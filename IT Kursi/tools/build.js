/*
 * IT kursi (Kompyuter savodxonligi, 3 oy) — reja va dars sahifalarini yig'adi.
 *   Reja:    IT Kursi/index.html          (uslub: Khamidov Reja/Khamidov platformasi — Yuksalish Academy rejasi)
 *   Darslar: IT Kursi/darslar/<N. Mavzu>/index.html   (uslub: Foundation darslari)
 * Kontent:  tools/oy1-kompyuter.js, oy2-internet.js, oy3-davlat.js
 * Ishga tushirish:  node "IT Kursi/tools/build.js"
 */
'use strict';
const fs = require('fs');
const path = require('path');

const IT = path.resolve(__dirname, '..');
const ROOT = path.resolve(IT, '..');
const PLAN_TPL = path.join(ROOT, 'Khamidov Reja/Khamidov platformasi');
const LESSON_ASSETS_SRC = path.join(ROOT, 'Java Script/Foundation/_assets');
const DARSLAR = path.join(IT, 'darslar');

const MONTHS = [
  { n: 1, title: '1-oy: Kompyuter bilimlari', short: 'Kompyuter bilimlari', icon: 'desktop', cls: 'ic-oy1', lessons: require('./oy1-kompyuter') },
  { n: 2, title: "2-oy: Internetdan foydalanish", short: 'Internetdan foydalanish', icon: 'globe', cls: 'ic-oy2', lessons: require('./oy2-internet') },
  { n: 3, title: '3-oy: Davlat xizmatlaridan foydalanish', short: 'Davlat xizmatlari', icon: 'building-columns', cls: 'ic-oy3', lessons: require('./oy3-davlat') },
];
const SOAT = 2;

// ------------------------------------------------------------ helpers
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');
const pad = (n) => String(n).padStart(2, '0');
const enc = (p) => p.split('/').map(encodeURIComponent).join('/');
const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
function folderName(l) {
  const short = l.title.split(" – ")[0].replace(/:/g, " -").replace(/[‘’`]/g, "'").replace(/[\\/:*?"<>|]/g, '').trim();
  return `${l.n}. ${short}`.slice(0, 70).trim();
}
function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const f of fs.readdirSync(src)) {
    const s = path.join(src, f), d = path.join(dst, f);
    if (fs.statSync(s).isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}
function svg(file, cls) {
  let s = fs.readFileSync(path.join(__dirname, 'icons', file + '.svg'), 'utf8').replace(/<!--[\s\S]*?-->/g, '').trim();
  s = s.replace(/<svg\b([^>]*)>/, (a, attrs) => `<svg${attrs.replace(/\s(width|height|class)="[^"]*"/g, '')} fill="currentColor" aria-hidden="true">`);
  return `<span class="ic-fa ${cls}">${s}</span>`;
}

// ------------------------------------------------------------ dars sahifalari
copyDir(LESSON_ASSETS_SRC, path.join(DARSLAR, '_assets'));
fs.writeFileSync(path.join(DARSLAR, '_assets', 'it.css'), `/* IT kursi: boyitilgan dars bloklari */
.panel .dars-info { margin: 4px 0 16px; padding: 12px 16px; border-left: 4px solid #35c7a0; background: rgba(0, 0, 0, 0.45); border-radius: 0 8px 8px 0; }
.panel .dars-info p { margin: 4px 0; }
.panel .dars-info strong { color: #8ff3d6; }
.panel .vositalar { margin: 12px 0 18px; padding: 12px 16px; background: rgba(53, 199, 160, 0.08); border: 1px solid rgba(53, 199, 160, 0.28); border-radius: 10px; }
.panel .vositalar > strong { display: block; color: #8ff3d6; margin-bottom: 6px; }
.panel .vositalar ul { margin: 0; padding-left: 20px; }
.panel .vositalar li { margin: 3px 0; }
.panel .vositalar a { color: #8ff3d6; text-decoration: underline; text-underline-offset: 2px; }
.panel .namuna { margin: 16px 0; padding: 14px 16px; border-left: 4px solid #ffd166; background: rgba(0, 0, 0, 0.42); border-radius: 0 8px 8px 0; }
.panel .namuna h3 { margin: 0 0 8px; color: #ffd166; }
.panel .namuna p { margin: 6px 0; }
.panel pre.prompt { background: rgba(0, 0, 0, 0.55); border: 1px dashed rgba(143, 243, 214, 0.4); color: #dffff5; border-radius: 8px; white-space: pre-wrap; }
.panel .namuna .rol { color: #ffd166; font-weight: 600; }
.panel table.rubrika { width: 100%; border-collapse: collapse; margin: 10px 0; }
.panel table.rubrika th, .panel table.rubrika td { border: 1px solid rgba(255, 255, 255, 0.16); padding: 8px 12px; text-align: left; vertical-align: top; }
.panel table.rubrika th { background: rgba(53, 199, 160, 0.12); color: #cdfff0; }
.panel table.rubrika td:last-child, .panel table.rubrika th:last-child { text-align: center; width: 72px; white-space: nowrap; }
.panel table.rubrika tr.jami td { font-weight: 700; color: #8ff3d6; background: rgba(255, 255, 255, 0.04); }
.panel .metod { padding: 12px 16px; border-left: 4px solid #a78bfa; background: rgba(167, 139, 250, 0.1); border-radius: 0 8px 8px 0; }
.panel .metod p { margin: 6px 0; }
.panel .metod strong { color: #c4b5fd; }
`);

const LEVELS = ['oson', 'orta', 'qiyin'];
function tasks(group, intro) {
  let html = `<p class="hint">${intro}</p>\n<ol class="tasks">\n`;
  for (const key of LEVELS) {
    for (const [title, text, code] of group[key] || []) {
      html += `  <li class="lvl-${key}"><p><strong>${esc(title)}</strong></p><p>${inline(text)}</p>${code ? `<pre>${esc(code)}</pre>` : ''}</li>\n`;
    }
  }
  return html + '</ol>';
}
function savollar(list) {
  return '<ol class="iv">' + list.map(([q, a]) =>
    `<li><p class="q">${esc(q)}</p><details class="answer"><summary>Javobni ko'rish</summary><p>${esc(a)}</p></details></li>`).join('') + '</ol>';
}
function infoBlock(l) {
  if (!l.maqsad && !l.faoliyat) return '';
  return `<div class="dars-info">
${l.maqsad ? `<p><strong>Dars maqsadi:</strong> ${esc(l.maqsad)}</p>` : ''}
${l.faoliyat ? `<p><strong>Asosiy faoliyat:</strong> ${esc(l.faoliyat)}</p>` : ''}
<p><strong>Davomiyligi:</strong> 90 daqiqa (2 soat)</p>
</div>`;
}
function vositalarBlock(list) {
  if (!list || !list.length) return '';
  return `<div class="vositalar"><strong>Kerakli vositalar</strong><ul>${list.map(([name, url, note]) =>
    `<li>${url ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>` : `<strong>${esc(name)}</strong>`}${note ? ` — ${inline(note)}` : ''}</li>`).join('')}</ul></div>`;
}
function namunaBlock(html) {
  return html ? `\n<div class="namuna"><h3>Namuna</h3>\n${html.trim()}\n</div>` : '';
}
function rubrikaBlock(list) {
  if (!list || !list.length) return '';
  const total = list.reduce((a, r) => a + Number(r[1] || 0), 0);
  return `<p class="hint">Ish quyidagi mezonlar bo'yicha baholanadi (jami ${total} ball):</p>
<table class="rubrika"><tr><th>Mezon</th><th>Ball</th></tr>${list.map(([c, p]) =>
    `<tr><td>${inline(c)}</td><td>${p}</td></tr>`).join('')}<tr class="jami"><td>Jami</td><td>${total}</td></tr></table>`;
}
function metodBlock(text) {
  if (!text) return '';
  const paras = String(text).trim().split(/\n+/).map((p) => `<p>${inline(p.trim())}</p>`).join('');
  return `<div class="metod">${paras}</div>`;
}

const SOCIAL = fs.readFileSync(path.join(ROOT, 'Java Script/Foundation/1. Kirish darsi/index.html'), 'utf8')
  .replace(/\r\n/g, '\n').match(/        <div class="social-links">[\s\S]*?\n        <\/div>/)[0];

let pageCount = 0;
for (const m of MONTHS) {
  for (const l of m.lessons) {
    const sections = [
      ['Mavzu', infoBlock(l) + vositalarBlock(l.vositalar) + '\n' + l.nazariya.trim() + namunaBlock(l.namuna)],
      ['Amaliyot', tasks(l.amaliyot, "Har bir topshiriqni kompyuterda bajaring. Natijani o'z papkangizda saqlang.")],
      ['Uyga vazifa', tasks(l.uyga, "Barcha topshiriqlarni ketma-ket bajaring. Oxirgi topshiriqlar qo'shimcha ball uchun.")],
      l.rubrika && l.rubrika.length ? ['Baholash mezoni', rubrikaBlock(l.rubrika)] : null,
      ['Nazorat savollari', savollar(l.savollar)],
      l.metod ? ["O'qituvchi uchun", metodBlock(l.metod)] : null,
    ].filter(Boolean).map(([t, h]) => `                <li>
                    <h2 class="accordion">${t}</h2>
                    <div class="panel">
${h}
                    </div>
                </li>`).join('\n\n');

    const page = `<!DOCTYPE html>
<html lang="uz">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(l.title)}</title>
    <link rel="stylesheet" href="../_assets/style.css">
    <link rel="stylesheet" href="../_assets/foundation.css">
    <link rel="stylesheet" href="../_assets/it.css">
    <link rel="icon" href="../_assets/icons/webinar.gif" type="image/gif">
</head>

<body>
    <div class="content-wrapper">
        <div>
            <h1>${esc(m.short)}</h1>
            <ul>
${sections}
            </ul>
        </div>

${SOCIAL}
    </div>

    <script src="../_assets/script.js"></script>
</body>

</html>
`;
    const dir = path.join(DARSLAR, folderName(l));
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), page.replace(/\n/g, '\r\n'));
    pageCount++;
  }
}

// ------------------------------------------------------------ reja sahifasi
for (const f of ['style.css', 'script.js', 'background.jpg']) fs.copyFileSync(path.join(PLAN_TPL, f), path.join(IT, f));
fs.mkdirSync(path.join(IT, 'icon'), { recursive: true });
for (const f of ['yuksalish-logo.png', 'favicon.png', 'apple-touch-icon.png']) fs.copyFileSync(path.join(PLAN_TPL, 'icon', f), path.join(IT, 'icon', f));
fs.mkdirSync(path.join(IT, 'img'), { recursive: true });
fs.copyFileSync(path.join(PLAN_TPL, 'img/northern_lights.jpg'), path.join(IT, 'img/northern_lights.jpg'));
// oy ikonkalari ranglari (asosiy uslubga qo'shimcha)
fs.appendFileSync(path.join(IT, 'style.css'), `
/* IT kursi: oy ikonkalari ranglari */
.ic-oy1 { color: #00d4ff; }
.ic-oy2 { color: #64ffda; }
.ic-oy3 { color: #ffd166; }
`);

const tpl = fs.readFileSync(path.join(PLAN_TPL, 'index.html'), 'utf8').replace(/\r\n/g, '\n');
const startMark = '            <div class="lessons-container">\n';
const endMark = '        <!-- Social Section -->';
const iStart = tpl.indexOf(startMark) + startMark.length;
const iEnd = tpl.indexOf(endMark);
if (iStart < startMark.length || iEnd < 0) throw new Error('Reja shabloni tuzilmasi topilmadi');
let head = tpl.slice(0, iStart);
const tail = '            </div>\n        </div>\n\n' + tpl.slice(iEnd);

const totalLessons = MONTHS.reduce((a, m) => a + m.lessons.length, 0);
head = head
  .replace(/<title>[^<]*<\/title>/, "<title>Yuksalish Academy - IT kursi</title>")
  .replace(/<p class="subtitle">[^<]*<\/p>/, '<p class="subtitle">IT kursi — Kompyuter savodxonligi (3 oy)</p>')
  .replace(/\n\s*<p class="mentor">[^<]*<\/p>/, '')
  .replace(/<div class="hero-stats">[\s\S]*?<\/div>/, `<div class="hero-stats">
                    <span>${MONTHS.length} oy</span>
                    <span>${totalLessons} dars</span>
                    <span>${totalLessons * SOAT} soat</span>
                </div>`);

const TAGS = { amaliy: ['review', "Amaliy mashg'ulot"], yakuniy: ['imtihon', 'Yakuniy'] };
const modules = MONTHS.map((m) => {
  const items = m.lessons.map((l) => {
    const href = enc('darslar/' + folderName(l) + '/index.html');
    const tag = l.tag ? `<span class="tag ${TAGS[l.tag][0]}">${TAGS[l.tag][1]}</span>` : '';
    return `                            <li class="plan-item"><a class="dars" href="${href}"><span class="plan-num">${pad(l.n)}</span><span class="plan-text">${esc(l.title)}</span>${tag}</a></li>`;
  }).join('\n');
  return `                <div class="lesson" data-module="it-oy-${m.n}">
                    <button class="lesson-trigger" type="button" aria-expanded="false">
                        <div class="lesson-title">
                            <span class="lesson-icon">${svg(m.icon, m.cls)}</span>
                            <span class="lesson-name"><span class="lesson-num">${pad(m.n)}</span>${esc(m.title)}</span>
                        </div>
                        <div class="lesson-right">
                            <span class="lesson-meta">${m.lessons.length} dars · ${m.lessons.length * SOAT} soat</span>
                            <span class="toggle" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg></span>
                        </div>
                    </button>
                    <div class="lesson-content">
                        <div class="lesson-body">
                            <ol class="plan-list">
${items}
                            </ol>
                        </div>
                    </div>
                </div>`;
}).join('\n\n');

fs.writeFileSync(path.join(IT, 'index.html'), (head + modules + '\n' + tail).replace(/\n/g, '\r\n'));

// ------------------------------------------------------------ tekshiruv
const plan = fs.readFileSync(path.join(IT, 'index.html'), 'utf8');
let ok = 0, bad = 0;
for (const mm of plan.matchAll(/href="(darslar\/[^"]+)"/g)) {
  if (fs.existsSync(path.join(IT, decodeURIComponent(mm[1])))) ok++; else { bad++; console.log('YOQ:', mm[1]); }
}
const taskCount = MONTHS.reduce((a, m) => a + m.lessons.reduce((b, l) =>
  b + LEVELS.reduce((c, k) => c + (l.amaliyot[k] || []).length + (l.uyga[k] || []).length, 0), 0), 0);
console.log(`Dars sahifalari: ${pageCount} | reja havolalari: ${ok} ok, ${bad} topilmadi | masalalar: ${taskCount}`);
