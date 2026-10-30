/* IT kursi — 2-oy: Internetdan foydalanish (9–16-darslar) */
module.exports = [
  {
    n: 9, title: 'Internet tushunchasi, Google qidiruvi',
    maqsad: "Internet qanday ishlashini va Google'da samarali, aniq qidirishni o'rganish.",
    faoliyat: "Aniq so'rovlar bilan qidirish va natijaning ishonchliligini baholash.",
    vositalar: [
      ['Google', 'https://www.google.com'],
      ['Perplexity', 'https://www.perplexity.ai', "AI qidiruv — manba ko'rsatib javob beradi"],
    ],
    namuna: `<p>Aniq qidirish usullari:</p>
<pre class="prompt">"aniq ibora"           qo'shtirnoq — aynan shu iborani qidiradi
ariza namunasi pdf     format bo'yicha
site:gov.uz            faqat shu saytdan
ob-havo Toshkent       to'g'ridan-to'g'ri javob</pre>`,
    rubrika: [
      ["3+ qidirish usuli to'g'ri qo'llangan", 4],
      ["Ma'lumot ishonchli manbadan tekshirilgan", 3],
      ["Reklama va haqiqiy natija farqlangan", 3],
    ],
    metod: `Ko'rsating: birinchi natija har doim eng to'g'ri emas; reklama (Ad) belgisini ajratishni o'rgating.
"Qo'shtirnoq" va "site:" usullari qidiruvni keskin yaxshilaydi — albatta mashq qildiring.`,
    nazariya: `
<h3>Internet nima?</h3>
<p><strong>Internet</strong> — butun dunyodagi kompyuterlar va telefonlarni bog'lovchi ulkan tarmoq. Uning yordamida sayt ko'ramiz, xabar yuboramiz, video tomosha qilamiz.</p>
<ul>
  <li><strong>Brauzer</strong> — saytlarni ochadigan dastur: Google Chrome, Microsoft Edge, Firefox, Opera.</li>
  <li><strong>Sayt manzili (URL)</strong> — masalan <code>https://www.google.com</code>. <code>https</code> — himoyalangan ulanish (qulf belgisi).</li>
  <li><strong>Qidiruv tizimi</strong> — internetdan ma'lumot topish xizmati: Google, Yandex, Bing.</li>
</ul>
<h3>Brauzer bilan ishlash</h3>
<pre>Ctrl + T        — yangi tab
Ctrl + W        — tabni yopish
Ctrl + Shift + T — yopilgan tabni qaytarish
Ctrl + D        — sahifani xatcho'pga (zakladka) qo'shish
Ctrl + H        — tarix (history)
F5              — sahifani yangilash
Ctrl + +/-      — kattalashtirish/kichraytirish</pre>
<h3>Google'da to'g'ri qidirish</h3>
<ul>
  <li>Kalit so'zlarni qisqa va aniq yozing: «Toshkent ob-havo ertaga».</li>
  <li><strong>"qo'shtirnoq"</strong> — aynan shu iborani qidirish: <code>"Alisher Navoiy she'rlari"</code>.</li>
  <li><strong>minus</strong> — so'zni chiqarib tashlash: <code>olma -telefon</code>.</li>
  <li><strong>site:</strong> — faqat bitta saytdan: <code>grant site:uz</code>.</li>
  <li><strong>filetype:</strong> — fayl turi bo'yicha: <code>referat filetype:pdf</code>.</li>
  <li>Bo'limlar: <em>Rasmlar, Video, Yangiliklar, Xaritalar</em>.</li>
</ul>
<h3>Ma'lumotga ishonish mumkinmi?</h3>
<p>Bir nechta manbani solishtiring, rasmiy saytlarga (.uz davlat saytlari, rasmiy tashkilotlar) ko'proq ishoning, sana va muallifga qarang.</p>`,
    amaliyot: {
      oson: [
        ["Brauzer", "Kompyuterdagi brauzerni oching va google.com saytiga kiring."],
        ["Birinchi qidiruv", "Shahringiz ertangi ob-havosini Google orqali toping."],
        ["Tablar", "3 ta yangi tab oching (Ctrl + T), birini yoping va Ctrl + Shift + T bilan qaytaring."],
        ["Rasmlar", "«Registon» so'zi bo'yicha rasmlarni toping."],
      ],
      orta: [
        ["Aniq ibora", "Qo'shtirnoq yordamida Alisher Navoiyning biror she'ridan bir qatorni qidiring."],
        ["Minus", "«Olma» so'zini qidiring, keyin telefon brendi natijalarini minus bilan chiqarib tashlang."],
        ["Xatcho'p", "Foydali bir saytni xatcho'pga qo'shing (Ctrl + D)."],
        ["Xarita", "Google Xaritalar orqali uyingizdan maktabgacha yo'l va vaqtni toping."],
      ],
      qiyin: [
        ["PDF topish", "filetype:pdf yordamida biror fan bo'yicha PDF qo'llanma toping."],
        ["site:", "site: operatori bilan faqat .uz saytlaridan «grant» haqida ma'lumot qidiring."],
        ["Ikki manba", "Bitta savol (masalan, eng baland tog') bo'yicha 2 ta turli saytdan javob toping va solishtiring."],
        ["Tarix", "Brauzer tarixini oching va bugun kirgan saytlaringiz ro'yxatini yozing."],
      ],
    },
    uyga: {
      oson: [
        ["4 ta brauzer", "4 ta brauzer nomini yozing."],
        ["Valyuta kursi", "Bugungi dollar kursini Google orqali toping."],
        ["Mashhur shaxs", "Sevimli yozuvchingiz haqida 3 ta faktni toping."],
        ["Shortcutlar", "Brauzer uchun 5 ta qisqa tugmani yozing."],
      ],
      orta: [
        ["Referat manbalari", "Bitta mavzu bo'yicha 3 ta foydali sayt toping va havolalarini yozing."],
        ["Video dars", "YouTube'dan Excel bo'yicha qisqa video dars toping va undan 3 ta yangi narsa yozing."],
        ["Tarjima qilingan qidiruv", "Bir savolni o'zbekcha va inglizcha qidirib, natijalarni solishtiring."],
      ],
      qiyin: [
        ["Haqiqatmi?", "Internetda tarqalgan bitta «qiziq fakt»ni toping va uni rasmiy manbalar orqali tekshiring."],
        ["Qidiruv operatorlari", "\"\", -, site:, filetype: operatorlarining har biriga o'zingiz misol tuzib, natijasini yozing."],
        ["Sayohat rejasi", "Bir shaharga sayohat uchun: masofa, yo'l vaqti, 3 ta diqqatga sazovor joy va ob-havoni internetdan toping."],
      ],
    },
    savollar: [
      ["Internet nima?", "Dunyodagi kompyuter va qurilmalarni bog'lovchi global tarmoq."],
      ["Brauzer nima? Misollar?", "Saytlarni ochuvchi dastur: Chrome, Edge, Firefox, Opera."],
      ["https dagi «s» nimani bildiradi?", "Himoyalangan (shifrlangan) ulanish."],
      ["Aniq iborani qanday qidiriladi?", "Qo'shtirnoq ichida yozib."],
      ["Faqat PDF fayllarni qanday qidiriladi?", "filetype:pdf operatori bilan."],
      ["Ma'lumot to'g'riligini qanday tekshirish mumkin?", "Bir nechta manbani solishtirish, rasmiy saytlarga qarash, sana va muallifni tekshirish."],
    ],
  },

  {
    n: 10, title: 'Gmail: e-pochta yaratish, fayl biriktirish',
    maqsad: "E-pochta yaratish, xat yozish, fayl biriktirish va hisobni himoyalashni o'rganish.",
    faoliyat: "Rasmiy xat yozib, unga fayl biriktirib yuborish; 2 bosqichli himoyani yoqish.",
    vositalar: [
      ['Gmail', 'https://mail.google.com'],
      ['Google hisob xavfsizligi', 'https://myaccount.google.com/security', "2 bosqichli tasdiqlash"],
    ],
    namuna: `<p>Rasmiy xat tuzilishi:</p>
<pre class="prompt">Kimga (To): manzil@example.com
Mavzu (Subject): Ish o'rni uchun ariza — Ism Familiya
Salom, hurmatli ...
(asosiy matn: qisqa va aniq)
Hurmat bilan, Ism Familiya
[Attach 📎 — rezyume faylini biriktiring]</pre>
<p>Xavfsizlik: Google hisobida <strong>2 bosqichli tasdiqlash</strong>ni yoqing.</p>`,
    rubrika: [
      ["Rasmiy xat to'g'ri tuzilgan (mavzu, salom, imzo)", 4],
      ["Fayl biriktirilib yuborilgan", 3],
      ["2 bosqichli tasdiqlash yoqilgan yoki tushunilgan", 3],
    ],
    metod: `E-pochta — ish va davlat xizmatlari uchun asosiy vosita; rasmiy uslubni o'rgating.
2 bosqichli tasdiqlash (SMS yoki ilova kodi) — hisobni o'g'irlashdan himoyaning eng kuchli usuli; yoqishga yordam bering.`,
    nazariya: `
<h3>Elektron pochta (e-pochta) nima?</h3>
<p>Internet orqali xat, hujjat va fayl yuborish xizmati. Manzil ko'rinishi: <code>ism.familiya@gmail.com</code>. <strong>@</strong> — «at», «kuchukcha» belgisi.</p>
<h3>Gmail akkaunt yaratish</h3>
<ol>
  <li><code>gmail.com</code> → <strong>Akkaunt yaratish</strong>.</li>
  <li>Ism, familiya, tug'ilgan sana kiritiladi.</li>
  <li>Manzil tanlanadi (band bo'lsa — boshqasini).</li>
  <li><strong>Kuchli parol</strong>: kamida 8 belgi, katta va kichik harf, raqam, belgi.</li>
  <li>Telefon raqami — akkauntni tiklash uchun.</li>
</ol>
<p class="hint">Bitta Google akkaunt bilan Gmail, Drive, Docs, YouTube va Play Market ishlaydi.</p>
<h3>Xat yuborish</h3>
<pre>Написать / Yozish
  Kimga (To):   qabul qiluvchi manzili
  Nusxa (Cc):   qo'shimcha qabul qiluvchi
  Mavzu:        xatning qisqa nomi
  Matn:         salomlashish, asosiy fikr, xayrlashish
  📎 Biriktirish: fayl qo'shish (25 MB gacha)
Yuborish</pre>
<h3>Foydali imkoniyatlar</h3>
<ul>
  <li><strong>Javob berish / Hammaga javob / Uzatish (Forward)</strong>.</li>
  <li><strong>Papkalar</strong>: Kiruvchi, Yuborilgan, Qoralamalar, Spam, Savat.</li>
  <li><strong>Yorliqlar (Labels)</strong> va <strong>yulduzcha</strong> — muhim xatlarni ajratish.</li>
  <li><strong>Imzo</strong> — har xat oxiriga avtomatik qo'shiladigan matn.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Manzil tuzilishi", "E-pochta manzili qanday qismlardan iborat ekanini daftarga yozing."],
        ["Kirish", "Gmail akkauntingizga kiring (yo'q bo'lsa — o'qituvchi yordamida yarating)."],
        ["Papkalar", "Gmail'dagi Kiruvchi, Yuborilgan, Spam va Qoralamalar papkalarini toping."],
        ["Birinchi xat", "O'qituvchiga «Salom» mavzusida qisqa xat yuboring."],
      ],
      orta: [
        ["Fayl biriktirish", "Word'da tayyorlagan hujjatingizni xatga biriktirib yuboring."],
        ["Javob berish", "Kelgan xatga javob yozing."],
        ["Uzatish", "Bitta xatni boshqa sinfdoshingizga uzating (Forward)."],
        ["Yulduzcha", "Muhim xatni yulduzcha bilan belgilang va «Yulduzchali» bo'limida toping."],
      ],
      qiyin: [
        ["Rasmiy xat", "Kurs rahbariga rasmiy xat yozing: aniq mavzu, salomlashish, maqsad, xayrlashish, imzo."],
        ["Imzo", "Sozlamalarda o'z imzoingizni yarating (ism, telefon)."],
        ["Bir nechta qabul qiluvchi", "Bitta xatni 3 kishiga yuboring: biri «Kimga», ikkitasi «Nusxa» da."],
        ["Yorliq", "«O'qish» degan yorliq yarating va o'qishga oid xatlarni unga biriktiring."],
      ],
    },
    uyga: {
      oson: [
        ["Kuchli parol", "Kuchli parol qoidalarini yozing va o'zingizga parol o'ylab toping (hech kimga aytmang)."],
        ["Oilaga xat", "Oila a'zongizga salomlashish xatini yuboring."],
        ["Rasm yuborish", "Bitta rasmni xatga biriktirib yuboring."],
        ["Spam", "Spam papkasida nima borligini ko'ring. Spam nima ekanini o'z so'zingiz bilan yozing."],
      ],
      orta: [
        ["Uy vazifasini yuborish", "Excel uy vazifangizni o'qituvchiga to'g'ri mavzu bilan yuboring."],
        ["Qoralama", "Xat yozib, yubormasdan qoralamada qoldiring, keyin davom ettirib yuboring."],
        ["Qidiruv", "Gmail qidiruvi orqali ma'lum bir kishidan kelgan xatlarni toping."],
      ],
      qiyin: [
        ["Katta fayl", "25 MB dan katta faylni Google Drive havolasi orqali yuboring."],
        ["Xat qoidalari", "Rasmiy xat yozishning 6 ta qoidasini yozing va namunaviy xat tuzing."],
        ["Akkaunt xavfsizligi", "Google akkauntida ikki bosqichli tasdiqlash nima ekanini o'rganing va yoqish bosqichlarini yozing."],
      ],
    },
    savollar: [
      ["E-pochta manzilida @ belgisi nimani ajratadi?", "Foydalanuvchi nomini va pochta xizmati domenini (gmail.com)."],
      ["Gmail'da fayl qanday biriktiriladi?", "Xat yozishda qisqich (📎) belgisini bosib."],
      ["Cc maydoni nima uchun?", "Xat nusxasini qo'shimcha qabul qiluvchilarga yuborish uchun."],
      ["Kuchli parol qanday bo'ladi?", "Kamida 8 belgi, katta-kichik harf, raqam va maxsus belgi."],
      ["Spam nima?", "Keraksiz, reklama yoki aldov xatlari."],
      ["Forward nima?", "Kelgan xatni boshqa odamga uzatish."],
    ],
  },

  {
    n: 11, title: "ChatGPT bilan ishlash, foydali savollar berish",
    maqsad: "AI yordamchilaridan kundalik ishlarda to'g'ri va xavfsiz foydalanishni o'rganish.",
    faoliyat: "Aniq savollar berib, javobni tekshirish; xizmat uchun yordam so'rash.",
    vositalar: [
      ['ChatGPT', 'https://chatgpt.com'],
      ['Gemini', 'https://gemini.google.com'],
      ['Claude', 'https://claude.ai'],
    ],
    namuna: `<p>Aniq savol — foydali javob:</p>
<pre class="prompt">Men kichik do'kon egasiman. Mijozlarga SMS orqali chegirma e'lon
qilmoqchiman. 3 ta qisqa, samimiy SMS matnini o'zbek tilida yoz.</pre>
<p>Qoida: shaxsiy ma'lumot (telefon, karta, parol) yozmang; muhim javobni tekshiring.</p>`,
    rubrika: [
      ["Aniq, kontekstli savol yozilgan", 4],
      ["AI javobi hayotiy ishda qo'llangan", 3],
      ["Shaxsiy ma'lumot kiritilmagani", 3],
    ],
    metod: `Kattalar uchun hayotiy misollar bering: xat yozish, e'lon tuzish, reja qilish, tarjima.
Ikki qoidani ta'kidlang: shaxsiy ma'lumot yozmaslik va muhim javobni tekshirish.`,
    nazariya: `
<h3>Sun'iy intellekt yordamchilari</h3>
<p><strong>ChatGPT</strong>, <strong>Claude</strong>, <strong>Gemini</strong> kabi yordamchilar savolga matn ko'rinishida javob beradi: tushuntiradi, misol keltiradi, matn yozishga yordam beradi, tarjima qiladi.</p>
<h3>Yaxshi so'rov (prompt) qanday yoziladi?</h3>
<ul>
  <li><strong>Aniq bo'ling</strong>: «Matematika» emas, «7-sinf uchun kasrlarni qo'shishni 3 ta misol bilan tushuntir».</li>
  <li><strong>Rol bering</strong>: «Sen ingliz tili o'qituvchisisan...».</li>
  <li><strong>Formatni ayting</strong>: «jadval qilib», «5 punktda», «qisqa».</li>
  <li><strong>Davom ettiring</strong>: «yana soddaroq tushuntir», «yana 3 ta misol ber».</li>
</ul>
<pre>Yomon:   ingliz tili
Yaxshi:  Men 9-sinf o'quvchisiman. Present Simple zamonini oddiy
         tilda tushuntir, 5 ta misol va 5 ta mashq ber, javoblarini
         alohida yoz.</pre>
<h3>Qoidalar va ehtiyotkorlik</h3>
<ul>
  <li>Javoblar <strong>xato bo'lishi mumkin</strong> — muhim ma'lumotni boshqa manbadan tekshiring.</li>
  <li><strong>Shaxsiy ma'lumot bermang</strong>: parol, karta raqami, pasport ma'lumotlari.</li>
  <li>Uy vazifasini to'liq ko'chirish emas — <em>tushunish</em> uchun foydalaning.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Birinchi savol", "Yordamchiga o'zingizni qiziqtirgan oddiy savol bering (masalan, «Nega osmon ko'k?»)."],
        ["Soddaroq", "Javobni «10 yoshli bolaga tushuntirgandek qilib yoz» deb qayta so'rang."],
        ["Ro'yxat", "«Kitob o'qishning 5 ta foydasini ro'yxat qilib yoz» deb so'rang."],
        ["Tarjima", "Bir jumlani ingliz tiliga tarjima qildiring."],
      ],
      orta: [
        ["Aniq so'rov", "«Matematika» degan noaniq so'rovni sinf, mavzu va formatni ko'rsatib aniq so'rovga aylantiring va javoblarni solishtiring."],
        ["Rol berish", "«Sen tarix o'qituvchisisan» deb rol berib, Amir Temur haqida 5 ta qisqa fakt so'rang."],
        ["Jadval", "Mevalar va ulardagi vitaminlarni jadval ko'rinishida so'rang."],
        ["Mashqlar", "Ingliz tili bo'yicha 5 ta mashq so'rang va ularni o'zingiz bajaring."],
      ],
      qiyin: [
        ["Tekshirish", "Yordamchidan bitta tarixiy sana so'rang va javobni ikki ishonchli sayt orqali tekshiring."],
        ["Reja", "Bir haftalik o'qish rejasini so'rang va o'zingizga moslab o'zgartiring."],
        ["Xatoni topish", "Yordamchidan qasddan xatoli matn yozdiring (masalan, «matematikada 2+2=5 ekanini isbotla»). U qanday javob berganini tahlil qiling."],
        ["Mustaqil yechim", "Bitta masalani avval o'zingiz yeching, keyin yordamchidan faqat «maslahat» (javobsiz) so'rang."],
      ],
    },
    uyga: {
      oson: [
        ["3 ta savol", "Turli fanlardan 3 ta savol bering va eng foydali javobni yozib oling."],
        ["Qoidalar", "Sun'iy intellekt bilan ishlashning 4 ta xavfsizlik qoidasini yozing."],
        ["So'z boyligi", "10 ta yangi inglizcha so'zni misollar bilan so'rang."],
        ["Qisqartirish", "Uzun matnni 3 jumlaga qisqartirib berishini so'rang."],
      ],
      orta: [
        ["Yaxshi prompt", "3 ta yomon va 3 ta yaxshi so'rov namunasini yozing."],
        ["Test tuzish", "O'tilgan Word darsi bo'yicha 5 savollik test tuzdiring va o'zingiz yeching."],
        ["Xat yozish", "Rasmiy xat qoralamasini yozdiring va uni o'zingiz tahrirlang."],
      ],
      qiyin: [
        ["Loyiha g'oyasi", "Kichik biznes g'oyasi uchun reja so'rang va uni Word hujjatiga aylantiring."],
        ["Solishtirish", "Bitta savolni 2 ta turli yordamchiga (masalan, ChatGPT va Gemini) bering va javoblarni solishtiring."],
        ["Muloqot", "Ingliz tilida 10 ta xabarli suhbat qiling va xatolaringizni tuzatib berishini so'rang."],
      ],
    },
    savollar: [
      ["ChatGPT nima?", "Savollarga matn ko'rinishida javob beradigan sun'iy intellekt yordamchisi."],
      ["Yaxshi so'rovning belgilari?", "Aniq maqsad, kontekst (kim uchun), format va kerak bo'lsa rol."],
      ["Javoblarga to'liq ishonish mumkinmi?", "Yo'q, xato bo'lishi mumkin, muhim ma'lumotni tekshirish kerak."],
      ["Qanday ma'lumotlarni yozmaslik kerak?", "Parol, karta raqami, pasport va boshqa shaxsiy ma'lumotlar."],
      ["Uy vazifasida qanday to'g'ri foydalaniladi?", "Tushuntirish va maslahat olish uchun, javobni ko'chirish uchun emas."],
    ],
  },

  {
    n: 12, title: 'Google Translate, Docs, Drive',
    maqsad: "Google Translate, Docs va Drive bilan tarjima qilish, hujjat yaratish va bulutda saqlashni o'rganish.",
    faoliyat: "Docs'da hujjat yaratib, Drive'ga saqlash va havola orqali ulashish.",
    vositalar: [
      ['Google Translate', 'https://translate.google.com', "matn, rasm, ovoz tarjimasi"],
      ['Google Docs', 'https://docs.google.com'],
      ['Google Drive', 'https://drive.google.com', "bulutli saqlash — o'zi saqlanadi"],
    ],
    namuna: `<pre class="prompt">Tarjima: translate.google.com → tilni tanlang → matn yoki rasm yuklang
Hujjat:  docs.google.com → New → avtomatik saqlanadi
Ulashish: Docs'da Share → "Anyone with the link" → havolani nusxalang</pre>
<p>Bulut (Drive) — fayllar internetda saqlanadi, istalgan qurilmadan ochiladi.</p>`,
    rubrika: [
      ["Tarjima (matn yoki rasm) bajarilgan", 3],
      ["Docs'da hujjat yaratilgan", 3],
      ["Drive'ga saqlanib, havola orqali ulashilgan", 4],
    ],
    metod: `Bulutli saqlashning afzalligini ko'rsating: fayl yo'qolmaydi, istalgan joydan ochiladi.
Ulashishda "ko'rish" va "tahrirlash" ruxsati farqini tushuntiring — maxfiylik uchun muhim.`,
    nazariya: `
<h3>Google Translate</h3>
<ul>
  <li><code>translate.google.com</code> yoki telefon ilovasi.</li>
  <li>Matn, ovoz, rasm (kamera orqali) va butun hujjatni tarjima qiladi.</li>
  <li>Uzun va murakkab jumlalarda xato bo'lishi mumkin — qisqa va aniq jumlalar yaxshiroq.</li>
</ul>
<h3>Google Drive</h3>
<ul>
  <li>Fayllarni <strong>bulutda</strong> (internetda) saqlash: 15 GB bepul.</li>
  <li>Istalgan qurilmadan kirish mumkin, kompyuter buzilsa ham fayl yo'qolmaydi.</li>
  <li><strong>Yuklash</strong>: «+ Yangi» → Fayl yuklash / Papka yuklash.</li>
  <li><strong>Ulashish</strong>: o'ng tugma → Kirish huquqini berish → havola yoki e-pochta; huquqlar: <em>ko'ruvchi, izohlovchi, muharrir</em>.</li>
</ul>
<h3>Google Docs</h3>
<ul>
  <li>Brauzerda ishlaydigan Word'ga o'xshash dastur.</li>
  <li>Avtomatik saqlanadi — «Saqlash» tugmasi kerak emas.</li>
  <li>Bir nechta odam <strong>bir vaqtda</strong> bitta hujjat ustida ishlay oladi.</li>
  <li>Izoh qoldirish, o'zgarishlar tarixi, ovoz bilan yozish (Asboblar → Ovozli yozish).</li>
</ul>
<p class="hint">Google Sheets (Excel'ga o'xshash) va Google Slides (PowerPoint'ga o'xshash) ham shu tarzda ishlaydi.</p>`,
    amaliyot: {
      oson: [
        ["Tarjima", "5 ta jumlani o'zbekchadan inglizchaga tarjima qiling."],
        ["Ovoz bilan", "Telefonda Google Translate'ga ovoz bilan gapirib tarjima qildiring."],
        ["Drive'ga kirish", "Google akkauntingiz bilan Drive'ga kiring va bo'sh joy hajmini toping."],
        ["Fayl yuklash", "Kompyuterdan bitta faylni Drive'ga yuklang."],
      ],
      orta: [
        ["Papka", "Drive'da «IT kursi» papkasini yarating va 1-oy fayllaringizni yuklang."],
        ["Docs hujjat", "Google Docs'da yangi hujjat oching va o'zingiz haqingizda yozing. Saqlash tugmasi bormi?"],
        ["Ulashish", "Docs hujjatingizni sinfdoshingizga «izohlovchi» huquqi bilan ulashing."],
        ["Rasmni tarjima", "Kamera orqali inglizcha yozuvli biror narsani tarjima qiling."],
      ],
      qiyin: [
        ["Birgalikda ishlash", "2–3 kishilik guruhda bitta Docs hujjatida «Bizning sinf» matnini birga yozing."],
        ["Izohlar", "Sinfdoshingiz hujjatiga 3 ta izoh qoldiring va o'z hujjatingizdagi izohlarga javob bering."],
        ["Hujjat tarjimasi", "Butun bir Word hujjatini Google Translate orqali tarjima qiling va natijani tekshiring."],
        ["Versiyalar tarixi", "Docs'da «Versiyalar tarixi» ni ochib, hujjatning oldingi holatini toping."],
      ],
    },
    uyga: {
      oson: [
        ["10 ta so'z", "10 ta so'zni 3 tilga (ingliz, rus, turk) tarjima qilib jadval tuzing."],
        ["Drive afzalliklari", "Bulutda saqlashning 4 ta afzalligini yozing."],
        ["Uy vazifalari papkasi", "Drive'da uy vazifalari uchun papka yarating."],
        ["Docs'da ro'yxat", "Google Docs'da xarid ro'yxatini tuzing."],
      ],
      orta: [
        ["Ovozli yozish", "Docs'ning ovozli yozish funksiyasi bilan 5 jumla yozing va xatolarini tuzating."],
        ["Havola bilan ulashish", "Drive'dagi rasmni «havolaga ega har kim ko'ra oladi» qilib, havolani oilangizga yuboring."],
        ["Sheets", "Google Sheets'da haftalik xarajatlar jadvalini yarating."],
      ],
      qiyin: [
        ["Tarjima sifati", "Bir abzatsni inglizchaga, keyin qaytadan o'zbekchaga tarjima qiling. Ma'no qanchalik o'zgardi? Tahlil yozing."],
        ["Guruh loyihasi", "Google Slides'da guruh bilan 5 slaydli taqdimot tayyorlang."],
        ["Huquqlar", "Ko'ruvchi, izohlovchi va muharrir huquqlari farqini misollar bilan yozing."],
      ],
    },
    savollar: [
      ["Google Drive nima?", "Fayllarni bulutda (internetda) saqlash xizmati."],
      ["Drive'da bepul qancha joy beriladi?", "15 GB."],
      ["Google Docs'ning Word'dan asosiy farqi?", "Brauzerda ishlaydi, avtomatik saqlanadi, bir vaqtda bir nechta kishi ishlay oladi."],
      ["Ulashishda qanday huquqlar bor?", "Ko'ruvchi, izohlovchi, muharrir."],
      ["Google Translate nimalarni tarjima qila oladi?", "Matn, ovoz, rasm va hujjat."],
      ["Tarjima xato bo'lmasligi uchun nima qilish kerak?", "Qisqa va aniq jumlalar yozish, natijani tekshirish."],
    ],
  },

  {
    n: 13, title: 'Resume nima va qanday tuziladi',
    maqsad: "Rezyume (CV) tuzilishini va ish beruvchi e'tibor beradigan qismlarni bilish.",
    faoliyat: "O'z rezyumesining rejasini (bo'limlar bo'yicha) tuzish.",
    vositalar: [
      ['Canva', 'https://www.canva.com', "bepul rezyume shablonlari"],
      ['ChatGPT', 'https://chatgpt.com', "matnni sayqallash"],
    ],
    namuna: `<p>Rezyumening asosiy bo'limlari:</p>
<pre class="prompt">1) Ism-familiya + aloqa (telefon, e-pochta)
2) Qisqacha o'zim haqimda (2–3 jumla)
3) Ish tajribasi (oxirgisidan boshlab)
4) Ta'lim
5) Ko'nikmalar (kompyuter, tillar)
6) Qo'shimcha (sertifikatlar, loyihalar)</pre>`,
    rubrika: [
      ["Barcha asosiy bo'limlar rejaga kiritilgan", 4],
      ["«O'zim haqimda» qismi aniq va qisqa", 3],
      ["Ko'nikmalar rost va o'rinli", 3],
    ],
    metod: `Rezyume — 1 sahifada, aniq va rost bo'lsin; yolg'on ma'lumot keyin muammo tug'diradi.
AIdan matnni sayqallashni so'rash mumkin, lekin ma'lumot o'quvchining o'ziniki bo'lishi shart.`,
    nazariya: `
<h3>Resume (CV) nima?</h3>
<p><strong>Resume</strong> — ish yoki o'qishga topshirishda o'zingizni qisqa tanishtiradigan 1 sahifalik hujjat. Ish beruvchi uni o'rtacha <em>bir necha soniyada</em> ko'rib chiqadi, shuning uchun aniq va tartibli bo'lishi kerak.</p>
<h3>Resume tuzilishi</h3>
<ol>
  <li><strong>Shaxsiy ma'lumotlar</strong>: ism-familiya, telefon, e-pochta, shahar, (ixtiyoriy) rasm.</li>
  <li><strong>Maqsad / o'zim haqimda</strong>: 2–3 jumla — kim siz va nimaga intilasiz.</li>
  <li><strong>Ta'lim</strong>: maktab, kurslar, yillar.</li>
  <li><strong>Tajriba</strong>: ish, amaliyot, ko'ngillilik, loyihalar.</li>
  <li><strong>Ko'nikmalar</strong>: kompyuter (Word, Excel ...), tillar, boshqa.</li>
  <li><strong>Yutuqlar</strong>: olimpiada, sertifikat, mukofot.</li>
</ol>
<h3>Qoidalar</h3>
<ul>
  <li>1 sahifa, toza shrift, imlo xatosiz.</li>
  <li>Professional e-pochta: <code>ali.valiyev@gmail.com</code> (✗ <code>superboy2010@...</code>).</li>
  <li>Yolg'on ma'lumot yozilmaydi.</li>
  <li>Eng yangi tajriba yuqorida turadi.</li>
  <li>PDF formatda yuboriladi.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Bo'limlar", "Resumening 6 ta bo'limini daftarga yozing."],
        ["Shaxsiy ma'lumotlar", "O'z shaxsiy ma'lumotlar qismingizni yozing."],
        ["Professional e-pochta", "O'zingiz uchun professional e-pochta manzili variantini o'ylab toping."],
        ["Namuna", "Internetdan 2 ta resume namunasini toping va ko'rib chiqing."],
      ],
      orta: [
        ["O'zim haqimda", "«O'zim haqimda» qismini 3 jumlada yozing."],
        ["Ta'lim", "Ta'lim bo'limini yozing: maktab, kurslar, yillar."],
        ["Ko'nikmalar", "Kurs davomida o'rgangan ko'nikmalaringizni ro'yxat qiling."],
        ["Yaxshi va yomon", "Ikki namunaviy resume'ni solishtirib, qaysi biri yaxshiroq ekanini 3 sabab bilan yozing."],
      ],
      qiyin: [
        ["Tajriba", "Ish tajribangiz bo'lmasa, loyiha, ko'ngillilik yoki maktab tadbirlarini «Tajriba» sifatida yozing."],
        ["Xatolarni toping", "O'qituvchi bergan xatoli resume'dagi 5 ta xatoni toping."],
        ["Kasbga moslash", "Bitta resume'ni ikki xil ishga (masalan, kassir va ofis yordamchisi) moslab, nimalarni o'zgartirish kerakligini yozing."],
        ["To'liq qoralama", "Barcha bo'limlar bilan resume qoralamasini qog'ozda tuzing."],
      ],
    },
    uyga: {
      oson: [
        ["Qoidalar", "Resume yozishning 5 ta qoidasini yozing."],
        ["Yutuqlar", "Hayotingizdagi 3 ta yutuqni yozing."],
        ["Tillar", "Qaysi tillarni qanday darajada bilishingizni yozing."],
        ["Rasm", "Resume uchun mos rasm qanday bo'lishi kerakligini 3 jumlada yozing."],
      ],
      orta: [
        ["Kuchli tomonlar", "O'zingizning 5 ta kuchli tomoningizni misol bilan yozing."],
        ["Vakansiya", "Internetdan bitta vakansiya toping va talablarini yozing."],
        ["Mos ko'nikmalar", "Topilgan vakansiyaga sizning qaysi ko'nikmalaringiz mos ekanini yozing."],
      ],
      qiyin: [
        ["Do'stga resume", "Oila a'zongiz yoki do'stingiz uchun resume qoralamasini tuzing."],
        ["Motivatsion xat", "Resume bilan yuboriladigan qisqa motivatsion xat yozing (5–6 jumla)."],
        ["Intervyu savollari", "Ish suhbatida beriladigan 5 ta savol va ularga javoblaringizni yozing."],
      ],
    },
    savollar: [
      ["Resume nima?", "Ish yoki o'qishga topshirishda o'zingizni qisqa tanishtiradigan hujjat."],
      ["Resume qancha hajmda bo'lishi kerak?", "Odatda 1 sahifa."],
      ["Resumening asosiy bo'limlari?", "Shaxsiy ma'lumot, o'zim haqimda, ta'lim, tajriba, ko'nikmalar, yutuqlar."],
      ["Qanday e-pochta yozish kerak?", "Ism va familiyadan iborat professional manzil."],
      ["Resume qaysi formatda yuboriladi?", "PDF."],
      ["Tajriba bo'lmasa nima yoziladi?", "Loyihalar, ko'ngillilik, amaliyot, maktab tadbirlari."],
    ],
  },

  {
    n: 14, title: "Word'da professional resume tayyorlash",
    maqsad: "Word yoki Canva'da toza, professional ko'rinishdagi rezyume tayyorlash.",
    faoliyat: "Tayyor shablon asosida o'z rezyumesini to'ldirish va PDF qilish.",
    vositalar: [
      ['Microsoft Word', '', "File → New → Resume shablonlari"],
      ['Canva', 'https://www.canva.com'],
    ],
    namuna: `<pre class="prompt">Word:  File → New → "Resume" qidiring → shablon tanlang → to'ldiring
PDF:   File → Save As → format: PDF (ish beruvchiga PDF yuboring)
Canva: "Resume" shablonidan tanlab, ranglarni soddalashtiring</pre>
<p>Qoida: 1 sahifa, bitta shrift oilasi, ko'p rang emas — soddalik professional ko'rinadi.</p>`,
    rubrika: [
      ["Rezyume toza va 1 sahifada", 4],
      ["Barcha bo'limlar to'ldirilgan", 3],
      ["PDF formatida saqlangan", 3],
    ],
    metod: `PDF formati muhim: boshqa kompyuterda ko'rinish buzilmaydi; buni albatta o'rgating.
Soddalik tamoyili: ortiqcha rang va bezak rezyumeni havaskor ko'rsatadi.`,
    nazariya: `
<h3>Word'da resume tayyorlashning ikki yo'li</h3>
<ol>
  <li><strong>Tayyor shablon</strong>: Fayl → Yaratish → qidiruvga «Резюме» / «Resume» yozing → shablon tanlang.</li>
  <li><strong>Noldan</strong>: jadval yordamida ikki ustunli maket yasash.</li>
</ol>
<h3>Ikki ustunli maket (jadval usuli)</h3>
<pre>+----------------------+------------------------------------+
|  RASM                |  ISM FAMILIYA (katta, qalin)       |
|                      |  Lavozim / maqsad                  |
|  ALOQA               |  O'ZIM HAQIMDA                     |
|  telefon             |  ...                               |
|  e-pochta            |  TA'LIM                            |
|  shahar              |  ...                               |
|  KO'NIKMALAR         |  TAJRIBA                           |
|  TILLAR              |  ...                               |
+----------------------+------------------------------------+
Oxirida jadval chegaralarini olib tashlang (Границы → Нет границы)</pre>
<h3>Professional ko'rinish qoidalari</h3>
<ul>
  <li>1–2 ta shrift (masalan, Calibri yoki Arial), sarlavhalar 14–16, matn 11–12.</li>
  <li>1–2 ta asosiy rang, ko'p rang ishlatmang.</li>
  <li>Bo'limlar sarlavhasi bir xil uslubda (qalin, katta harf, ostida chiziq).</li>
  <li>Hoshiyalar (Макет → Поля) — «Узкие» yoki «Обычные».</li>
  <li>Oxirida <strong>PDF</strong> qilib saqlang: <code>Ism_Familiya_Resume.pdf</code>.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Shablon topish", "Word'da Fayl → Yaratish orqali 3 ta resume shablonini toping va ko'rib chiqing."],
        ["Shablon tanlash", "Bitta shablonni tanlab, ichidagi namunaviy matnni ko'rib chiqing."],
        ["Ism", "Shablondagi ism o'rniga o'z ismingizni yozing."],
        ["Saqlash", "Faylni «Ism_Familiya_Resume» nomi bilan saqlang."],
      ],
      orta: [
        ["Aloqa ma'lumotlari", "Telefon, e-pochta va shahar ma'lumotlarini kiriting."],
        ["Bo'limlarni to'ldirish", "«O'zim haqimda», «Ta'lim» va «Ko'nikmalar» bo'limlarini to'ldiring."],
        ["Rasm", "Resume'ga rasmingizni qo'ying va hajmini moslang."],
        ["Rang", "Shablon rangini o'zingizga yoqqan bitta professional rangga o'zgartiring."],
      ],
      qiyin: [
        ["Noldan", "Shablonsiz, jadval yordamida ikki ustunli resume yasang."],
        ["Chegaralarsiz", "Jadval chegaralarini olib tashlab, faqat bo'lim sarlavhalari ostiga chiziq qoldiring."],
        ["Bir sahifa", "Resume aniq 1 sahifaga sig'adigan qilib hoshiya va shrift o'lchamini sozlang."],
        ["PDF", "Resume'ni PDF qilib saqlang va telefonda ochib ko'rinishini tekshiring."],
      ],
    },
    uyga: {
      oson: [
        ["Tugatish", "Darsda boshlagan resume'ni oxiriga yetkazing."],
        ["Imlo", "Resume'dagi imlo xatolarini tekshirib tuzating."],
        ["Shrift", "Resume'da faqat 1–2 xil shrift qolganini tekshiring."],
        ["PDF", "Resume'ni PDF formatda saqlang."],
      ],
      orta: [
        ["Ikkinchi variant", "Boshqa shablon bilan resume'ning ikkinchi variantini tayyorlang va qaysi biri yaxshiroq ekanini yozing."],
        ["Fikr so'rash", "Resume'ni oila a'zoingizga ko'rsating va 3 ta fikrini yozib, kerak bo'lsa tuzating."],
        ["Drive", "Resume PDF'ini Google Drive'ga yuklang."],
      ],
      qiyin: [
        ["Inglizcha resume", "Resume'ning inglizcha variantini tayyorlang (Google Translate'dan foydalanib, keyin tekshirib)."],
        ["Yuborish", "Resume'ni o'qituvchiga to'g'ri mavzu va qisqa xat bilan e-pochta orqali yuboring."],
        ["Portfel", "Kurs davomida tayyorlagan ishlaringizdan (Word, Excel, PPT) portfel papkasini yarating va resume'da havola qoldiring."],
      ],
    },
    savollar: [
      ["Word'da resume shabloni qayerdan topiladi?", "Fayl → Yaratish → qidiruvga «Resume» yoki «Резюме»."],
      ["Ikki ustunli maket qanday yasaladi?", "Jadval yordamida, keyin chegaralar olib tashlanadi."],
      ["Resume'da nechta shrift ishlatish tavsiya etiladi?", "1–2 ta."],
      ["Resume faylini qanday nomlash kerak?", "Masalan, Ism_Familiya_Resume.pdf."],
      ["Nima uchun PDF formatda yuboriladi?", "Har qanday qurilmada ko'rinishi buzilmaydi."],
    ],
  },

  {
    n: 15, title: "Amaliy mashg'ulot: resume tayyorlash", tag: 'amaliy',
    maqsad: "To'liq, ishga tayyor rezyumeni mustaqil tayyorlash va yuborishga tayyorlash.",
    faoliyat: "Rezyumeni yakunlash, PDF qilish va e-pochta xatiga biriktirish.",
    vositalar: [
      ['Word yoki Canva', 'https://www.canva.com'],
      ['Gmail', 'https://mail.google.com'],
      ['ChatGPT', 'https://chatgpt.com', "«o'zim haqimda» qismini sayqallash"],
    ],
    namuna: `<pre class="prompt">1) Rezyumeni to'liq to'ldiring (6 bo'lim)
2) PDF qiling: "Ism_Familiya_rezyume.pdf"
3) Gmail'da ish beruvchiga rasmiy xat yozib, PDF'ni biriktiring
4) O'zingizga ham nusxa yuboring (tekshirish uchun)</pre>`,
    rubrika: [
      ["Rezyume to'liq va professional", 5],
      ["PDF to'g'ri nomlangan", 2],
      ["Rasmiy xat bilan biriktirib yuborilgan", 4],
      ["Mustaqil bajarilgani", 4],
    ],
    metod: `Yakuniy amaliy ish (jami 15 ball): rezyume + PDF + e-pochta zanjirini to'liq bajartiring.
Fayl nomi ham muhim: "rezyume.pdf" emas, "Ism_Familiya_rezyume.pdf".
Imkon bo'lsa, haqiqiy vakansiyaga mos rezyume qildiring — amaliy motivatsiya kuchli.`,
    nazariya: `
<h3>Mashg'ulot maqsadi</h3>
<p>Har bir o'quvchi darsni <strong>tayyor, professional resume PDF</strong> bilan tugatadi va uni e-pochta orqali yuboradi.</p>
<h3>Ish tartibi</h3>
<ol>
  <li>Ma'lumotlarni tayyorlash (qog'ozda): shaxsiy, ta'lim, ko'nikmalar, yutuqlar.</li>
  <li>Word'da resume yaratish (shablon yoki jadval usuli).</li>
  <li>Juftlikda tekshirish: sinfdoshingiz resume'ini tekshirish varaqasi bo'yicha baholaydi.</li>
  <li>Tuzatish va PDF qilib saqlash.</li>
  <li>Google Drive'ga yuklash va o'qituvchiga e-pochta orqali yuborish.</li>
</ol>
<h3>Tekshirish varaqasi</h3>
<ul>
  <li>☐ 1 sahifa</li>
  <li>☐ Aloqa ma'lumotlari to'liq, e-pochta professional</li>
  <li>☐ Barcha bo'limlar bor, eng muhimi yuqorida</li>
  <li>☐ Imlo xatolari yo'q</li>
  <li>☐ 1–2 shrift, 1–2 rang, bir xil uslub</li>
  <li>☐ Fayl nomi to'g'ri, PDF formatda</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Ma'lumotlar varaqasi", "Resume uchun barcha ma'lumotlaringizni qog'ozga yozib chiqing."],
        ["Fayl yaratish", "Word'da resume faylini yarating va to'g'ri nom bilan saqlang."],
        ["Sarlavha qismi", "Ism-familiya, lavozim/maqsad va aloqa qismini tayyorlang."],
        ["Bo'limlar", "Barcha bo'lim sarlavhalarini bir xil uslubda yozing."],
      ],
      orta: [
        ["Matnni to'ldirish", "Barcha bo'limlarni to'ldiring."],
        ["Juftlikda tekshirish", "Sinfdoshingiz resume'ini tekshirish varaqasi bo'yicha baholang va 3 ta tavsiya yozing."],
        ["Tuzatish", "Olingan tavsiyalar asosida resume'ingizni tuzating."],
        ["PDF", "Resume'ni PDF qilib saqlang."],
      ],
      qiyin: [
        ["Drive va havola", "PDF'ni Drive'ga yuklab, ko'rish havolasini oling."],
        ["E-pochta", "O'qituvchiga resume'ni biriktirib, rasmiy xat bilan yuboring."],
        ["Taqdimot", "Resume'ingizni 1 daqiqada taqdim eting: o'zingizni qanday tanishtirasiz?"],
        ["Vakansiyaga moslash", "O'qituvchi bergan vakansiya matniga moslab resume'ingizga 2 ta o'zgartirish kiriting."],
      ],
    },
    uyga: {
      oson: [
        ["Yakuniy tekshiruv", "Resume'ni tekshirish varaqasi bo'yicha qaytadan tekshiring."],
        ["Telefonda", "PDF'ni telefonda ochib, matn o'qilishini tekshiring."],
        ["Nusxa", "Resume'ning Word va PDF variantlarini Drive'da saqlang."],
        ["Bosib chiqarish", "Imkon bo'lsa, resume'ni chop eting."],
      ],
      orta: [
        ["Ikki vakansiya", "Internetdan 2 ta vakansiya toping va har biriga resume'ni qanday moslash kerakligini yozing."],
        ["Motivatsion xat", "Bitta vakansiya uchun qisqa motivatsion xat yozing."],
        ["Fikr", "Resume tayyorlashda eng qiyin qism nima bo'ldi? 4–5 jumla yozing."],
      ],
      qiyin: [
        ["Oila a'zosiga", "Oila a'zoingiz uchun to'liq resume tayyorlab, PDF qilib bering."],
        ["Sinov suhbati", "Do'stingiz bilan 5 savollik sinov ish suhbatini o'tkazing va natijani yozing."],
        ["Onlayn profil", "Ish qidirish saytlaridan birida profil qanday to'ldirilishini o'rganing va bosqichlarini yozing (shaxsiy ma'lumotni joylashtirmasdan)."],
      ],
    },
    savollar: [
      ["Resume tayyor deb qachon aytish mumkin?", "Tekshirish varaqasidagi barcha bandlar bajarilganda."],
      ["Juftlikda tekshirish nima uchun foydali?", "Boshqa odam o'zimiz sezmagan xatolarni ko'radi."],
      ["Resume'ni e-pochtada qanday yuborish kerak?", "Aniq mavzu, qisqa rasmiy xat va PDF biriktirma bilan."],
      ["Vakansiyaga moslash nima?", "Resume'da shu ish uchun muhim ko'nikma va tajribalarni oldinga chiqarish."],
    ],
  },

  {
    n: 16, title: 'Internet xavfsizligi: phishing va himoya',
    maqsad: "Firibgarlik (phishing), kuchli parol, 2 bosqichli himoya va AI-firibgarliklardan saqlanishni o'rganish.",
    faoliyat: "Soxta xabarlarni aniqlash o'yini va parol himoyasini sozlash.",
    vositalar: [
      ['Google Password Manager', 'https://passwords.google.com', "parollarni xavfsiz saqlaydi"],
      ['Google xavfsizlik', 'https://myaccount.google.com/security'],
      ['Have I Been Pwned', 'https://haveibeenpwned.com', "e-pochta sizib chiqqanmi — tekshirish"],
    ],
    namuna: `<p>Firibgarlik (phishing) belgilari va oltin qoidalar:</p>
<pre class="prompt">Shubhali belgilar: shoshiltiradi ("hoziroq!"), qo'rqitadi, g'alati havola,
imlo xatolari, kutilmagan "yutuq".
Oltin qoidalar:
• SMS/telefondagi KOD (OTP) va parolni HECH KIMGA aytmang
• Havolani bosishdan oldin manzilni tekshiring (click.uz emas, clikk.uz — soxta)
• Har sayt uchun boshqa parol; 2 bosqichli tasdiqlash yoqilsin
• AI soxta ovoz/video yarata oladi — "qarindoshim pul so'rayapti" bo'lsa, qo'ng'iroq qilib tekshiring</pre>`,
    rubrika: [
      ["Phishingning 4+ belgisi aytilgan", 3],
      ["Kuchli parol va 2 bosqichli himoya qo'llangan", 4],
      ["Soxta xabarni aniqlash o'yinida natija", 3],
    ],
    metod: `2026-da eng dolzarb mavzu: AI yordamidagi firibgarlik (soxta ovoz, soxta xabar, deepfake) kuchaygan.
Eng muhim qoida — OTP kod va parolni hech kimga aytmaslik; bankxodim ham so'ramaydi.
Parol menejeri (Google) kuchli parollarni eslab turadi — buni birga sozlang. Soxta xabar o'yinini albatta o'ynang.`,
    nazariya: `
<h3>Phishing (fishing) nima?</h3>
<p><strong>Phishing</strong> — firibgarlar o'zini bank, do'kon, do'st yoki davlat tashkiloti qilib ko'rsatib, parol, karta raqami yoki SMS kodni olishga urinishi.</p>
<h3>Phishing belgilari</h3>
<ul>
  <li>«Shoshiling!», «Akkauntingiz bloklanadi!», «Siz yutdingiz!» kabi qo'rqitish yoki vasvasa.</li>
  <li>Sayt manzili biroz boshqacha: <code>g00gle.com</code>, <code>click-uz-bonus.top</code>.</li>
  <li>Karta raqami, CVV, SMS kod yoki parol so'raladi.</li>
  <li>Noma'lum odamdan kelgan havola yoki fayl (<code>.apk</code>, <code>.exe</code>).</li>
</ul>
<h3>Oltin qoidalar</h3>
<ol>
  <li><strong>SMS kodni hech kimga aytmang</strong> — bank xodimi ham so'ramaydi.</li>
  <li>Har bir sayt uchun <strong>alohida kuchli parol</strong>.</li>
  <li><strong>Ikki bosqichli tasdiqlash</strong> ni yoqing.</li>
  <li>Havolani bosishdan oldin manzilni tekshiring; shubhali bo'lsa — rasmiy ilova yoki saytni o'zingiz oching.</li>
  <li>Dastur va ilovalarni faqat rasmiy do'kondan (Play Market, App Store) o'rnating.</li>
  <li>Shubhali holatda kattalar yoki bank bilan rasmiy raqam orqali bog'laning.</li>
</ol>`,
    amaliyot: {
      oson: [
        ["Phishing nima?", "Phishing nima ekanini o'z so'zingiz bilan 2 jumlada yozing."],
        ["Belgilar", "Phishingning 4 ta belgisini yozing."],
        ["Qulf belgisi", "Brauzerda biror sayt manzili yonidagi qulf belgisini toping va bosib ko'ring."],
        ["SMS kod", "Nima uchun SMS kodni hech kimga aytmaslik kerak? Tushuntiring."],
      ],
      orta: [
        ["Haqiqiy yoki soxta?", "O'qituvchi ko'rsatgan 6 ta xabar namunasini «xavfsiz» va «phishing» ga ajrating."],
        ["Manzilni tekshirish", "Quyidagi manzillardan qaysilari shubhali? Sababini yozing.", "https://www.google.com\nhttps://g00gle-login.com\nhttps://my.gov.uz\nhttps://click-bonus-yutuq.top\nhttps://mail.google.com"],
        ["Kuchli parol", "3 ta kuchli parol namunasini tuzing (o'zingiz ishlatmaydigan)."],
        ["Ikki bosqichli tasdiq", "Google akkauntida ikki bosqichli tasdiqlash qayerda yoqilishini toping."],
      ],
      qiyin: [
        ["Vaziyat", "«Siz 5 mln so'm yutdingiz, kartangiz raqami va SMS kodni yuboring» xabari keldi. Nima qilasiz? Bosqichma-bosqich yozing."],
        ["Firibgar qo'ng'irog'i", "Juftlikda rolli o'yin: biri «bank xodimi» bo'lib kod so'raydi, ikkinchisi to'g'ri javob beradi."],
        ["Xavfsizlik tekshiruvi", "Google akkauntingizda «Xavfsizlik tekshiruvi» (Security Checkup) ni o'tkazing."],
        ["Plakat", "PowerPoint'da «Internetda xavfsiz bo'l» mavzusida 1 slaydli plakat tayyorlang."],
      ],
    },
    uyga: {
      oson: [
        ["6 ta qoida", "Internet xavfsizligining 6 ta qoidasini yozing."],
        ["Oila bilan", "Oilangizga SMS kodni hech kimga aytmaslik kerakligini tushuntiring."],
        ["Parollar", "Bir xil parolni hamma joyda ishlatish nega xavfli? Yozing."],
        ["Rasmiy do'kon", "Ilovalarni qayerdan o'rnatish xavfsiz ekanini yozing."],
      ],
      orta: [
        ["Telefon tekshiruvi", "Telefoningizdagi ilovalar ro'yxatini ko'rib, keraksiz yoki noma'lum ilovalarni toping."],
        ["Xabarlar tahlili", "Telegram yoki SMS'da kelgan 2 ta shubhali xabarni (agar bo'lsa) tahlil qiling — ularga bosmasdan."],
        ["Ikki bosqichli", "Kamida bitta akkauntingizda ikki bosqichli himoyani yoqing."],
      ],
      qiyin: [
        ["Eslatma varaqasi", "Buvalaringiz uchun «Firibgarlardan ehtiyot bo'ling» degan 5 bandli oddiy eslatma tayyorlang."],
        ["Real voqea", "Internetdan O'zbekistondagi bitta firibgarlik holati haqida maqola toping va qanday himoyalanish mumkin edi — yozing."],
        ["Parol menejeri", "Parol menejeri nima ekanini o'rganib, afzallik va kamchiliklarini yozing."],
      ],
    },
    savollar: [
      ["Phishing nima?", "Firibgarlar o'zini ishonchli tashkilot qilib ko'rsatib, parol yoki karta ma'lumotini olishga urinishi."],
      ["Bank xodimi SMS kodni so'rashi mumkinmi?", "Yo'q, hech qachon."],
      ["Shubhali havolani qanday aniqlash mumkin?", "Manzilni diqqat bilan tekshirish: harflar almashgan, notanish domen, https yo'q."],
      ["Ikki bosqichli tasdiqlash nima beradi?", "Parol o'g'irlansa ham, qo'shimcha kodsiz kirib bo'lmaydi."],
      ["Ilovalarni qayerdan o'rnatish kerak?", "Faqat rasmiy do'konlardan: Play Market, App Store."],
      ["Shubhali xabar kelsa nima qilish kerak?", "Havolani bosmaslik, javob bermaslik, kattalar yoki rasmiy raqam orqali tekshirish."],
    ],
  },
];
