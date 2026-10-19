# Yuksalish Academy — O'quv platformasi (LMS)

Rollar: **Administrator**, **O'qituvchi**, **O'quvchi**. Kurslar va darslar mavjud reja sahifalaridan
(`Khamidov Reja`, `IT Kursi`, `AI Kursi`) avtomatik olinadi, dars materiali — siz yasagan dars sahifalari.

## Ishga tushirish

```bash
cd lms
npm install
npm run seed            # administrator yaratadi (parol konsolga chiqadi)
npm run seed -- --demo  # + namunaviy o'qituvchi, 3 o'quvchi va guruh
npm start               # http://localhost:3000
```

Node.js 22.13+ kerak (ichki `node:sqlite`). Baza: `lms/data/lms.db`.
Administrator parolini oldindan berish: `ADMIN_PASSWORD=... npm run seed`. Port: `PORT=8080 npm start`.

## Imkoniyatlar

- **Administrator** — foydalanuvchilar (yaratish, rol, bloklash, parol tiklash), guruhlar (kurs, o'qituvchi,
  boshlanish sanasi, dars kunlari/vaqti → jadval avtomatik), o'quvchilarni guruhga biriktirish, kurslarni qayta import qilish.
- **O'qituvchi** — o'z guruhlari, dars sanasi/muddatini o'zgartirish, darsni oldinroq ochish, davomat,
  topshiriqlarni tekshirish (holat, ball 0–100, fikr), har bir o'quvchi bilan izohlar.
- **O'quvchi** — kurslari, darslar ro'yxati holatlari bilan, dars materiali (dars kuni ochiladi),
  vazifa topshirish (matn + havola), baho va izohlar.

Umumiy: bildirishnomalar (qo'ng'iroq — topshiriq, baho, izoh, e'lon, dars ochilishi), e'lonlar (hammaga yoki guruhga),
baholar jurnali (o'quvchi × dars jadvali) va CSV/Excel eksport, guruh reytingi, faollik grafigi,
ro'yxatdan ommaviy qo'shish (har qatorda `Ism; login; parol; telefon`, login/parol avtomatik).

Testlar: guruh → «Testlar» → «Yangi test». Savollar matn ko'rinishida (`1. Savol?` / `a) variant` / `*b) to'g'ri`),
vaqt chegarasi bilan, avtomatik baholanadi; o'qituvchi natijalarni ko'radi va qayta topshirishga ruxsat bera oladi.
To'lovlar (administrator): guruhga oylik narx kiritiladi → «To'lovlar» sahifasida oy bo'yicha tushum, qarzdorlar, to'lov qabul qilish.
Sertifikatlar: guruh → «O'quvchilar» → «Berish»; chop etiladi/PDF, `/#/cert/<ID>` orqali haqiqiyligi ochiq tekshiriladi.
O'quvchi profili: guruhlar, reyting, davomat, testlar, to'lovlar — bitta sahifada.

Holatlar: Berilmagan → Topshirilmagan → Tekshirilmoqda → Qabul qilingan / Qaytarilgan; muddat o'tsa — Bajarilmagan.

## Xavfsizlik

- Materiallar faqat tizimga kirganlarga `/m/...` orqali beriladi; `Masala`, `Misollar`, `database`,
  `.sql`, `tools`, zaxira papkalar va boshqa yechim fayllari **hech qachon** berilmaydi.
- Reja sahifalari o'zgarsa: «Kurslar» → «Rejalarni qayta import qilish» (yoki serverni qayta ishga tushirish).
