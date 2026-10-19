'use strict';
/*
 * Gemini yordamida uyga vazifani tekshirish.
 * Kalit va sozlamalar `settings` jadvalida (administrator «AI sozlamalari» sahifasida kiritadi)
 * yoki GEMINI_API_KEY / GEMINI_MODEL muhit o'zgaruvchilaridan olinadi.
 * AI faqat TAVSIYA beradi — yakuniy bahoni o'qituvchi qo'yadi.
 */
const fs = require('fs');
const path = require('path');
const { one, run } = require('./db');

const DEFAULT_MODEL = 'gemini-3.8-flash';
const getSetting = (k) => (one('SELECT value FROM settings WHERE key = ?', k) || {}).value ?? null;
const setSetting = (k, v) => run('INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value', k, v);

function aiConfig() {
  return {
    key: getSetting('gemini_key') || process.env.GEMINI_API_KEY || '',
    model: getSetting('gemini_model') || process.env.GEMINI_MODEL || DEFAULT_MODEL,
    auto: getSetting('ai_auto') === '1',
  };
}

const IMG = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', gif: 'image/gif' };
const TEXT_EXT = /\.(txt|md|csv|json|sql|js|ts|py|java|cpp|c|cs|html|css)$/i;
const MAX_INLINE = 14 * 1024 * 1024; // so'rovdagi fayllar jami hajmi

// Fayllarni Gemini qismlariga aylantiramiz: rasm/PDF — inline, kod/matn — matn sifatida
function fileParts(files, dir, label) {
  const parts = [], skipped = [];
  let total = 0;
  for (const f of files) {
    const ext = (f.name.split('.').pop() || '').toLowerCase();
    const p = path.join(dir, f.stored);
    try {
      if (IMG[ext] || ext === 'pdf') {
        if (total + f.size > MAX_INLINE) { skipped.push(f.name); continue; }
        total += f.size;
        parts.push({ text: `[${label}: ${f.name}]` });
        parts.push({ inline_data: { mime_type: IMG[ext] || 'application/pdf', data: fs.readFileSync(p).toString('base64') } });
      } else if (TEXT_EXT.test(f.name)) {
        parts.push({ text: `[${label}: ${f.name}]\n${fs.readFileSync(p, 'utf8').slice(0, 40000)}` });
      } else skipped.push(f.name);
    } catch { skipped.push(f.name); }
  }
  return { parts, skipped };
}

const SCHEMA = {
  type: 'OBJECT',
  properties: {
    score: { type: 'INTEGER', description: '0-100 ball' },
    verdict: { type: 'STRING', enum: ['qabul', 'qaytarilgan'] },
    feedback: { type: 'STRING', description: "O'quvchiga izoh (o'zbek tilida, lotin yozuvida)" },
    strengths: { type: 'ARRAY', items: { type: 'STRING' } },
    issues: { type: 'ARRAY', items: { type: 'STRING' } },
    teacher_note: { type: 'STRING', description: "O'qituvchi uchun qisqa izoh" },
  },
  required: ['score', 'verdict', 'feedback'],
};

async function callGemini(cfg, parts) {
  if (!cfg.key) { const e = new Error("Gemini API kaliti kiritilmagan. Administrator «AI sozlamalari» bo'limida kiritsin"); e.status = 400; throw e; }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.key },
    body: JSON.stringify({
      contents: [{ role: 'user', parts }],
      generationConfig: { temperature: 0.2, responseMimeType: 'application/json', responseSchema: SCHEMA },
    }),
    signal: AbortSignal.timeout(90000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data.error && data.error.message ? data.error.message : `HTTP ${res.status}`;
    const e = new Error(`Gemini xatosi: ${msg}`); e.status = 502; throw e;
  }
  const text = (((data.candidates || [])[0] || {}).content || { parts: [] }).parts.map((p) => p.text || '').join('');
  try { return JSON.parse(text); } catch { const e = new Error("Gemini javobini o'qib bo'lmadi"); e.status = 502; throw e; }
}

async function gradeSubmission({ lessonTitle, moduleTitle, task, taskFiles, sub, subFiles, fileDir }) {
  const cfg = aiConfig();
  const tf = fileParts(taskFiles || [], fileDir, 'Vazifa fayli');
  const sf = fileParts(subFiles || [], fileDir, "O'quvchi fayli");
  const prompt = `Sen dasturlash o'quv markazida o'qituvchiga yordam beruvchi tajribali tekshiruvchisan.
Vazifani va o'quvchining javobini tekshirib, xolis baho ber.

Dars: ${moduleTitle ? moduleTitle + ' — ' : ''}${lessonTitle}
O'qituvchi bergan vazifa:
${task || "(vazifa matni yo'q — dars mavzusi va fayllarga qarab baholang)"}

O'quvchi javobi (matn):
${sub.text || "(matn yo'q)"}
${sub.link ? `O'quvchi havolasi: ${sub.link} (havola ichini ocha olmaysan — bor-yo'qligini hisobga ol)` : ''}
${sf.skipped.length ? `O'qilmagan fayllar (format qo'llab-quvvatlanmaydi): ${sf.skipped.join(', ')}` : ''}

Qoidalar:
- score: 0–100. Vazifa to'liq va to'g'ri bajarilgan bo'lsa 85–100; asosan to'g'ri, kichik kamchiliklar 70–84; qisman 40–69; deyarli bajarilmagan 0–39.
- verdict: score >= 60 va vazifaning asosiy talablari bajarilgan bo'lsa "qabul", aks holda "qaytarilgan".
- feedback: o'quvchiga, o'zbek tilida (lotin), 3–6 gap, samimiy va aniq: nima yaxshi, nimani tuzatish kerak.
- MUHIM: tayyor yechimni yoki to'g'ri kodni YOZMA — faqat yo'nalish va maslahat ber.
- strengths / issues: qisqa bandlar.
- teacher_note: o'qituvchi uchun 1–2 gap (masalan, ko'chirilganga o'xshasa yoki fayl o'qilmagan bo'lsa).`;
  const parts = [{ text: prompt }, ...tf.parts, ...sf.parts];
  const out = await callGemini(cfg, parts);
  let score = Math.round(Number(out.score));
  if (!Number.isFinite(score)) score = 0;
  score = Math.max(0, Math.min(100, score));
  return {
    score,
    verdict: out.verdict === 'qabul' ? 'qabul' : 'qaytarilgan',
    feedback: String(out.feedback || '').slice(0, 4000),
    strengths: (out.strengths || []).slice(0, 6).map(String),
    issues: (out.issues || []).slice(0, 6).map(String),
    teacher_note: String(out.teacher_note || '').slice(0, 800),
    model: cfg.model,
  };
}

async function testKey(cfg) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(cfg.model)}:generateContent`;
  const res = await fetch(url, {
    method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': cfg.key },
    body: JSON.stringify({ contents: [{ role: 'user', parts: [{ text: 'Faqat "OK" deb javob ber.' }] }] }),
    signal: AbortSignal.timeout(30000),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error && data.error.message ? data.error.message : `HTTP ${res.status}`);
  return true;
}

module.exports = { aiConfig, getSetting, setSetting, gradeSubmission, testKey, DEFAULT_MODEL };
