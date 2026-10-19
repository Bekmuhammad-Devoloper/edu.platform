# yuksalish.dev — o'quv platformasi

Administrator, o'qituvchi, o'quvchi va ota-ona rollari bo'lgan o'quv markazi platformasi.

- **Kurslar** — NodeJS Backend, IT kursi (kompyuter savodxonligi), AI Prompt Engineering
- **Darslar** — jadval, video, uyga vazifa (matn/video/fayl), topshirish urinishlari, davomat
- **Baholash** — o'qituvchi bahosi + Gemini AI tavsiyasi
- **Gamifikatsiya** — coin, market, daraja, nishonlar, reyting
- **Ota-ona ilovasi** — davomat, baholar, to'lovlar, o'qituvchi bilan chat
- **To'lovlar, sertifikatlar, e'lonlar, bildirishnomalar**, PWA (telefonga o'rnatish)

## Tuzilishi

```
lms/              platforma (Node.js + Express 5 + node:sqlite)
Khamidov Reja/    NodeJS kursi o'quv rejasi
IT Kursi/         IT kursi rejasi va dars sahifalari
AI Kursi/         AI kursi rejasi va dars sahifalari
Java Script/      dars sahifalari (faqat ko'rinadigan qismi — yechimlarsiz)
```

## Ishga tushirish

Node.js 22.13+ kerak.

```bash
cd lms
npm install
npm run seed      # administrator yaratadi, parol konsolga chiqadi
npm start         # http://localhost:3000
```

Batafsil: [lms/README.md](lms/README.md)
