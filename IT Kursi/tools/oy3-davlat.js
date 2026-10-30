/* IT kursi — 3-oy: Davlat xizmatlaridan foydalanish (17–24-darslar)
 * Eslatma: saytlar va ilovalar interfeysi vaqt o'tishi bilan o'zgarishi mumkin — darsda joriy holatini ko'rsating. */
module.exports = [
  {
    n: 17, title: 'Davlat saytlariga kirish – my.gov.uz nima? Qanday ishlaydi, qanday ma’lumotlarni ko‘rish mumkin',
    maqsad: "Davlat xizmatlari portali (my.gov.uz) nima ekanini va unga qanday kirishni bilib olish.",
    faoliyat: "Portalga kirib, mavjud xizmatlar ro'yxatini ko'rib chiqish.",
    vositalar: [
      ["my.gov.uz", "https://my.gov.uz", "yagona davlat xizmatlari portali"],
      ["One ID", "https://id.egov.uz", "yagona identifikatsiya tizimi"],
    ],
    namuna: `<p>Portalga kirish tartibi:</p>
<pre class="prompt">1) my.gov.uz saytiga kiring
2) "Kirish" -> One ID orqali (telefon/pasport ma'lumotlari bilan)
3) Kerakli xizmatni qidiring (masalan, "ma'lumotnoma")
4) Ariza to'ldiring va yuboring</pre>
<p>Portaldan: ma'lumotnomalar, ro'yxatdan o'tish, ariza berish mumkin.</p>`,
    rubrika: [
      ["my.gov.uz nimaligini tushuntirgan", 3],
      ["Portalga kirib, 3+ xizmatni topgan", 4],
      ["One ID vazifasini bilgan", 3],
    ],
    metod: `Ko'pchilik kattalar bu portaldan foydalanishni bilmaydi — amaliy ko'rsatish juda qadrli.
One ID — bitta login bilan barcha davlat saytlariga kirish; buni tushuntiring.
Diqqat: shaxsiy kabinetga faqat o'z qurilmasida kiring; umumiy kompyuterda "chiqish"ni unutmang.`,
    nazariya: `
<h3>my.gov.uz nima?</h3>
<p><strong>my.gov.uz</strong> — Yagona interaktiv davlat xizmatlari portali. Unda yuzlab davlat xizmatlaridan uydan turib, navbatsiz foydalanish mumkin: ma'lumotnoma olish, ariza berish, to'lov qilish, holatni kuzatish.</p>
<h3>Qanday kiriladi?</h3>
<ul>
  <li><strong>OneID</strong> (id.egov.uz) — yagona identifikatsiya tizimi: bitta login bilan ko'plab davlat saytlariga kirish.</li>
  <li>Kirish usullari: login-parol, elektron raqamli imzo (ERI), mobil ilova orqali va boshqalar.</li>
  <li>Bolalar uchun xizmatlardan odatda <strong>ota-ona akkaunti</strong> orqali foydalaniladi.</li>
</ul>
<h3>Qanday ma'lumot va xizmatlar bor? (misollar)</h3>
<ul>
  <li>Doimiy ro'yxatdan o'tish (propiska) haqida ma'lumot.</li>
  <li>Bolani maktabgacha ta'lim muassasasiga navbatga qo'yish.</li>
  <li>Tug'ilganlik haqidagi guvohnoma nusxasi, ma'lumotnomalar.</li>
  <li>Jarimalar va soliqlarni ko'rish, to'lash.</li>
  <li>Arizaning holatini kuzatish: «Mening arizalarim».</li>
</ul>
<h3>Xavfsizlik</h3>
<ul>
  <li>Manzilni tekshiring: faqat <code>my.gov.uz</code> (soxta o'xshash saytlar bo'lishi mumkin).</li>
  <li>Login-parol va SMS kodni hech kimga bermang.</li>
  <li>Davlat xizmati ko'p hollarda <em>bepul</em> yoki rasmiy to'lov bilan — «tez qilib beraman» degan vositachilarga ishonmang.</li>
</ul>
<p class="hint">Sayt ko'rinishi yangilanib turadi — darsda joriy holatini birga ko'rib chiqing.</p>`,
    amaliyot: {
      oson: [
        ["Saytni ochish", "Brauzerda my.gov.uz saytini oching va manzil to'g'riligini (qulf belgisi, domen) tekshiring."],
        ["Bosh sahifa", "Bosh sahifadagi 5 ta xizmat yoki bo'lim nomini yozing."],
        ["Til", "Sayt tilini o'zbek (lotin), rus va ingliz tillariga almashtirib ko'ring."],
        ["Qidiruv", "Sayt qidiruvi orqali «maktab» so'zi bo'yicha xizmatlarni toping."],
      ],
      orta: [
        ["Kategoriyalar", "Xizmatlar kategoriyalarini ko'rib chiqing va ta'limga oid 3 ta xizmatni yozing."],
        ["Xizmat sahifasi", "Bitta xizmat sahifasini oching: muddati, narxi va kerakli hujjatlarni yozing."],
        ["OneID", "id.egov.uz saytini oching va qanday kirish usullari borligini yozing (ro'yxatdan o'tmasdan)."],
        ["Soxta saytni ajratish", "Quyidagi manzillardan qaysi biri rasmiy? Sababini yozing.", "https://my.gov.uz\nhttps://my-gov-uz.online\nhttps://mygov-xizmat.com"],
      ],
      qiyin: [
        ["Oilaviy xizmatlar", "Oila uchun foydali 5 ta xizmatni toping va har biri nima uchun kerakligini yozing."],
        ["Bosqichlar", "Bitta xizmatni (masalan, ma'lumotnoma olish) olish bosqichlarini 5–6 qadamda yozing."],
        ["Mobil ilova", "Telefon do'konida my.gov.uz ning rasmiy mobil ilovasini toping va rasmiy ekanini qanday tekshirganingizni yozing."],
        ["Taqqoslash", "Xizmatni onlayn va idoraga borib olishning 3 ta afzallik va 1 ta kamchiligini yozing."],
      ],
    },
    uyga: {
      oson: [
        ["Ta'rif", "my.gov.uz nima ekanini 3 jumlada yozing."],
        ["OneID", "OneID nima uchun kerakligini yozing."],
        ["3 ta xizmat", "Portaldagi 3 ta xizmat nomini yozing."],
        ["Xavfsizlik", "Davlat saytlaridan foydalanishda 3 ta xavfsizlik qoidasini yozing."],
      ],
      orta: [
        ["Ota-ona bilan", "Ota-onangiz bilan birga portalni ko'rib chiqing va ularga foydali bitta xizmatni toping."],
        ["Hujjatlar ro'yxati", "Tanlagan xizmat uchun kerakli hujjatlar ro'yxatini yozing."],
        ["Boshqa davlat saytlari", "Yana 3 ta rasmiy davlat sayti nomini toping (.uz domenida) va nima qilishini yozing."],
      ],
      qiyin: [
        ["Yo'riqnoma", "Bitta xizmatdan foydalanish bo'yicha skrinshotli yo'riqnoma tayyorlang (Word yoki PowerPoint), shaxsiy ma'lumotlarni yashirib."],
        ["Afzalliklar taqdimoti", "«Davlat xizmatlari onlayn» mavzusida 4 slaydli taqdimot tayyorlang."],
        ["Firibgarlik", "Davlat xizmati nomidan firibgarlik qilish usullari va ulardan himoyalanishni yozing."],
      ],
    },
    savollar: [
      ["my.gov.uz nima?", "Yagona interaktiv davlat xizmatlari portali."],
      ["OneID nima?", "Bitta login bilan davlat saytlariga kirish imkonini beruvchi yagona identifikatsiya tizimi."],
      ["Portalda qanday xizmatlarga misol keltirasiz?", "Ma'lumotnoma olish, bog'chaga navbat, jarimalarni ko'rish va to'lash."],
      ["Soxta davlat saytini qanday ajratish mumkin?", "Manzilni tekshirish: rasmiy domen (my.gov.uz), https va qulf belgisi."],
      ["Ariza holatini qayerdan ko'rish mumkin?", "Portaldagi «Mening arizalarim» bo'limidan."],
    ],
  },

  {
    n: 18, title: 'Onlayn to‘lovlar – Click, Payme va Uzum Bank nima? Qanday qilib telefonni to‘ldirish va o‘yinlarga pul to‘lash mumkin',
    maqsad: "Click, Payme va Uzum Bank orqali xavfsiz onlayn to'lov qilishni o'rganish.",
    faoliyat: "Telefonni to'ldirish amalini ko'rsatish va to'lov xavfsizligi qoidalari.",
    vositalar: [
      ["Click", "https://click.uz"],
      ["Payme", "https://payme.uz"],
      ["Uzum Bank", "https://uzumbank.uz"],
    ],
    namuna: `<p>Telefonni to'ldirish (misol):</p>
<pre class="prompt">1) Ilovaga kiring (PIN yoki barmoq izi bilan)
2) "To'lov" -> "Mobil aloqa" -> operatorni tanlang
3) Raqam va summani kiriting -> tasdiqlang</pre>
<p><strong>Xavfsizlik:</strong> SMS kod (OTP), karta PIN va CVV ni HECH KIMGA aytmang.</p>`,
    rubrika: [
      ["To'lov ilovasi vazifasini tushungan", 3],
      ["Telefon to'ldirish bosqichlarini bilgan", 3],
      ["Karta xavfsizligi qoidalarini aytgan", 4],
    ],
    metod: `Pul masalasi ehtiyotkorlik talab qiladi; iloji bo'lsa, demo yoki kichik summada ko'rsating.
Eng muhim: OTP kod, CVV va PIN maxfiy; firibgarlar aynan shularni so'raydi.
Ilovaga PIN yoki barmoq izi qo'yishni o'rgating — telefon yo'qolsa himoya bo'ladi.`,
    nazariya: `
<h3>Onlayn to'lov ilovalari</h3>
<p><strong>Click</strong>, <strong>Payme</strong>, <strong>Uzum Bank</strong> — bank kartasi orqali telefondan to'lov qilish ilovalari: mobil aloqa, kommunal xizmatlar, internet, o'qish, jarimalar, do'konlar va boshqalar.</p>
<h3>Qanday ishlaydi?</h3>
<ol>
  <li>Ilova rasmiy do'kondan o'rnatiladi va telefon raqami bilan ro'yxatdan o'tiladi.</li>
  <li>Bank kartasi (Uzcard, Humo) qo'shiladi — bu ko'pincha <strong>ota-onaning</strong> ishi.</li>
  <li>To'lov turini tanlash → ma'lumot kiritish (masalan, telefon raqami) → summa → tasdiqlash.</li>
  <li>To'lovdan keyin <strong>chek</strong> saqlanadi — tarixda ko'rinadi.</li>
</ol>
<h3>Telefon balansini to'ldirish (umumiy tartib)</h3>
<pre>To'lovlar → Mobil aloqa → operatorni tanlash
→ telefon raqamini kiritish → summa → To'lash → tasdiqlash</pre>
<h3>O'yin va ilovalar uchun to'lov</h3>
<ul>
  <li>Faqat <strong>rasmiy</strong> do'kon yoki ilova orqali va <strong>ota-onaning ruxsati</strong> bilan.</li>
  <li>«Tekin almaz/donat» va'da qiladigan saytlar — ko'pincha firibgarlik.</li>
  <li>Karta raqami, amal qilish muddati, CVV va SMS kodni hech kimga bermang.</li>
</ul>
<h3>Xavfsizlik qoidalari</h3>
<ul>
  <li>Ilovaga PIN-kod yoki barmoq izi qo'ying.</li>
  <li>To'lovdan oldin summa va raqamni ikki marta tekshiring.</li>
  <li>Noto'g'ri raqamga pul ketsa — darhol ilova yordam xizmatiga murojaat qiling.</li>
</ul>
<p class="hint">Darsda haqiqiy pul o'tkazilmaydi: ilova menyusi va tartib ko'rib chiqiladi, mashqlar «qog'ozda» bajariladi.</p>`,
    amaliyot: {
      oson: [
        ["3 ta ilova", "Onlayn to'lov ilovalaridan 3 tasini yozing."],
        ["Nimalar uchun?", "Onlayn to'lov qilish mumkin bo'lgan 6 ta xizmatni yozing."],
        ["Rasmiy ilova", "Play Market yoki App Store'da Click ilovasini toping va rasmiy ekanini (ishlab chiqaruvchi, yuklashlar soni) tekshiring."],
        ["Karta turlari", "O'zbekistondagi asosiy bank karta turlarini yozing."],
      ],
      orta: [
        ["Telefonni to'ldirish bosqichlari", "Telefon balansini to'ldirish bosqichlarini qadam-baqadam yozing."],
        ["Chek", "To'lov chekida qanday ma'lumotlar bo'lishini yozing."],
        ["Xavfli so'rovlar", "Ilova yoki «xodim» hech qachon so'ramaydigan 4 ta ma'lumotni yozing."],
        ["Byudjet", "Oyiga 30 000 so'm cho'ntak puli bor: telefon uchun 15 000, qolganini qanday taqsimlaysiz? Excel'da jadval tuzing."],
      ],
      qiyin: [
        ["O'yin donati", "«100% tekin almaz — karta ma'lumotini kiriting» degan saytga duch keldingiz. Nima uchun bu xavfli va nima qilasiz? Yozing."],
        ["Xato raqam", "Pul noto'g'ri raqamga ketdi. Qanday harakat qilasiz? Bosqichma-bosqich yozing."],
        ["Ilovalarni solishtirish", "Click, Payme va Uzum Bank'ni 3 mezon bo'yicha solishtiruvchi jadval tuzing (internetdan ma'lumot olib)."],
        ["Ota-ona nazorati", "Bolaning onlayn xaridlarini ota-ona qanday nazorat qilishi mumkinligi haqida 4 ta tavsiya yozing."],
      ],
    },
    uyga: {
      oson: [
        ["Xavfsizlik qoidalari", "Onlayn to'lovning 5 ta xavfsizlik qoidasini yozing."],
        ["Oila bilan", "Ota-onangizdan ular qaysi to'lov ilovasidan foydalanishini so'rang va nimalarni to'lashini yozing."],
        ["CVV", "CVV kod nima va nega uni hech kimga aytish mumkin emas — yozing."],
        ["PIN-kod", "Ilovaga nima uchun PIN-kod qo'yish kerakligini yozing."],
      ],
      orta: [
        ["Kommunal to'lovlar", "Ota-ona bilan birga kommunal to'lov qanday qilinishini kuzating va bosqichlarini yozing."],
        ["Oylik to'lovlar jadvali", "Oiladagi oylik to'lovlar (telefon, internet, svet ...) jadvalini Excel'da tuzing."],
        ["Keshbek", "Keshbek nima ekanini o'rganing va misol bilan tushuntiring."],
      ],
      qiyin: [
        ["Eslatma", "Kichik ukangiz yoki singlingiz uchun «Onlayn o'yinda pul to'lashdan oldin» degan 5 bandli eslatma tayyorlang."],
        ["Firibgarlik turlari", "Onlayn to'lov bilan bog'liq 3 ta firibgarlik turini toping va himoya usullarini yozing."],
        ["Taqdimot", "«Xavfsiz onlayn to'lov» mavzusida 4 slaydli taqdimot tayyorlang."],
      ],
    },
    savollar: [
      ["Click, Payme va Uzum Bank nima?", "Bank kartasi orqali telefondan to'lov qilish ilovalari."],
      ["Telefon balansi qanday to'ldiriladi?", "To'lovlar → Mobil aloqa → operator → raqam → summa → tasdiqlash."],
      ["Qaysi ma'lumotlarni hech kimga aytmaslik kerak?", "Karta raqami bilan birga muddati, CVV, SMS kod va PIN-kod."],
      ["O'yin uchun to'lovni qanday xavfsiz qilish mumkin?", "Faqat rasmiy do'kon orqali va ota-ona ruxsati bilan."],
      ["To'lov cheki nima uchun kerak?", "To'lov qilinganini isbotlash va muammo bo'lsa murojaat qilish uchun."],
    ],
  },

  {
    n: 19, title: 'Jarimalar va ruxsatnomalar – Ota-onalar mashina jarimalarini qayerdan ko‘rishlari mumkin, haydovchilik hujjatlari haqida qiziqarli ma’lumotlar',
    maqsad: "Yo'l jarimalari va ruxsatnomalarni onlayn ko'rishni bilib olish.",
    faoliyat: "Rasmiy xizmatda jarima bor-yo'qligini tekshirish.",
    vositalar: [
      ["my.gov.uz", "https://my.gov.uz"],
      ["E-jarima", "https://e-jarima.uz", "yo'l harakati jarimalari"],
    ],
    namuna: `<pre class="prompt">1) Tegishli xizmatga kiring (One ID bilan)
2) Avtomobil davlat raqami yoki guvohnoma ma'lumotini kiriting
3) Jarimalar ro'yxatini ko'ring -> onlayn to'lang</pre>`,
    rubrika: [
      ["Jarimani qayerdan ko'rishni bilgan", 4],
      ["Ma'lumotni to'g'ri kiritgan", 3],
      ["Soxta \"jarima\" SMS firibgarligini tanigan", 3],
    ],
    metod: `Dolzarb ogohlantirish: "jarimangiz bor, shu havoladan to'lang" turidagi SMS ko'pincha firibgarlik.
Jarimani faqat rasmiy portaldan tekshiring; havolani bosmasdan, saytga o'zingiz kiring.`,
    nazariya: `
<h3>Jarimalarni qayerdan ko'rish mumkin?</h3>
<ul>
  <li><strong>my.gov.uz</strong> — jarimalar haqidagi xizmatlar bo'limi.</li>
  <li><strong>To'lov ilovalari</strong> (Click, Payme, Uzum Bank va boshqalar) — odatda «Jarimalar» yoki «YHXX jarimalari» bo'limi: avtomobil raqami va texnik pasport ma'lumoti bilan tekshiriladi.</li>
  <li>Ko'pincha jarima haqida <strong>SMS-xabar</strong> ham keladi.</li>
</ul>
<p class="hint">Jarimani o'z vaqtida to'lash ko'pincha chegirma beradi, kechiktirilsa esa qo'shimcha jarima qo'shilishi mumkin — aniq shartlarni rasmiy manbadan tekshiring.</p>
<h3>Haydovchilik hujjatlari</h3>
<ul>
  <li><strong>Haydovchilik guvohnomasi</strong> (prava) — mashina haydash huquqi. Toifalar: A (mototsikl), B (yengil avtomobil), C (yuk mashinasi), D (avtobus) va boshqalar.</li>
  <li><strong>Texnik pasport</strong> — avtomobil hujjati: egasi, rusumi, raqami.</li>
  <li><strong>Sug'urta polisi</strong> — majburiy avtosug'urta.</li>
  <li>Guvohnoma olish uchun avtomaktabda o'qish va nazariy hamda amaliy imtihon topshirish kerak; yengil avtomobil uchun odatda 18 yosh.</li>
</ul>
<h3>Qiziqarli faktlar (yo'l harakati)</h3>
<ul>
  <li>Svetofor ranglari dunyo bo'yicha deyarli bir xil: qizil — to'xta, sariq — tayyorlan, yashil — yur.</li>
  <li>Xavfsizlik kamari jiddiy jarohat xavfini sezilarli darajada kamaytiradi.</li>
  <li>Kameralar tezlik, qizil chiroq va kamar taqmaslikni avtomatik qayd etadi.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Qayerdan?", "Jarimalarni ko'rish mumkin bo'lgan 3 ta joyni yozing."],
        ["Hujjatlar", "Haydovchida bo'lishi kerak bo'lgan 3 ta hujjatni yozing."],
        ["Toifalar", "A, B, C, D toifalari qaysi transport uchun ekanini yozing."],
        ["Svetofor", "Svetofor ranglari va ma'nosini yozing."],
      ],
      orta: [
        ["Ilovada bo'lim", "To'lov ilovasidan birida jarimalar bo'limi qayerda joylashganini toping (ota-ona telefonida, ularning ruxsati bilan)."],
        ["Kerakli ma'lumot", "Jarimani tekshirish uchun qanday ma'lumotlar kerakligini yozing."],
        ["Kamera qoidabuzarliklari", "Kameralar qayd etadigan 4 ta qoidabuzarlikni yozing."],
        ["Prava olish bosqichlari", "Haydovchilik guvohnomasini olish bosqichlarini yozing."],
      ],
      qiyin: [
        ["Rasmiy ma'lumot", "Rasmiy saytlardan jarimani o'z vaqtida to'lash shartlari haqida ma'lumot toping va manbasini ko'rsating."],
        ["Firibgar SMS", "«Sizda jarima bor, to'lash uchun havolaga o'ting» degan SMS haqiqiymi yoki soxta — qanday tekshirasiz? Yozing."],
        ["Xavfsizlik plakati", "«Kamar taq — hayotni saqla» mavzusida Word'da plakat tayyorlang."],
        ["Jadval", "Excel'da jarima turlari (o'qituvchi bergan ro'yxat) va ularning summasini jadval qilib, jami summani hisoblang."],
      ],
    },
    uyga: {
      oson: [
        ["5 ta qoida", "Piyodalar uchun 5 ta yo'l harakati qoidasini yozing."],
        ["Texnik pasport", "Texnik pasportda qanday ma'lumotlar bo'lishini yozing."],
        ["Sug'urta", "Avtosug'urta nima uchun kerakligini yozing."],
        ["Yosh chegarasi", "Mashina haydash uchun yosh chegarasini aniqlang."],
      ],
      orta: [
        ["Ota-ona bilan", "Ota-onangiz bilan birga jarimalarni tekshirish tartibini ko'ring va bosqichlarini yozing (raqamlarni yozmasdan)."],
        ["Avtomaktab", "Shahringizdagi avtomaktab o'qish muddati va narxini internetdan toping."],
        ["Belgilar", "10 ta yo'l belgisini rasmi va ma'nosi bilan Word'da jadval qiling."],
      ],
      qiyin: [
        ["Viktorina", "Yo'l harakati bo'yicha 10 savollik viktorina tuzing (javoblarini alohida varaqda)."],
        ["Taqdimot", "«Yo'lda xavfsizlik» mavzusida 5 slaydli taqdimot tayyorlang."],
        ["Statistika", "Rasmiy manbalardan yo'l-transport hodisalari bo'yicha bitta statistik ma'lumot toping va Excel'da diagramma qiling."],
      ],
    },
    savollar: [
      ["Avtomobil jarimalarini qayerdan ko'rish mumkin?", "my.gov.uz, to'lov ilovalaridagi jarimalar bo'limi, SMS-xabarlar."],
      ["Haydovchining asosiy hujjatlari?", "Haydovchilik guvohnomasi, texnik pasport, sug'urta polisi."],
      ["B toifasi qaysi transport uchun?", "Yengil avtomobil."],
      ["Jarima haqidagi SMS havolasiga darhol bosish kerakmi?", "Yo'q, avval rasmiy ilova yoki sayt orqali tekshirish kerak."],
      ["Xavfsizlik kamari nima uchun muhim?", "Avariya paytida jiddiy jarohat xavfini kamaytiradi."],
    ],
  },

  {
    n: 20, title: 'Maktab va davlat xizmatlari – attestat, baholar, grantlar haqida ma’lumotni qayerdan olish mumkin',
    maqsad: "Attestat, baholar va grantlar haqidagi ma'lumotni onlayn topishni o'rganish.",
    faoliyat: "Emaktab yoki my.gov.uz orqali ta'lim ma'lumotlarini topish.",
    vositalar: [
      ["my.gov.uz", "https://my.gov.uz"],
      ["Emaktab", "https://emaktab.uz", "maktab baholari va kundalik"],
    ],
    namuna: `<pre class="prompt">Baholar/kundalik: emaktab.uz -> ota-ona yoki o'quvchi kabineti
Ma'lumotnoma:     my.gov.uz -> "ta'lim" bo'limidan qidiring</pre>`,
    rubrika: [
      ["Ta'lim xizmatlarini topgan", 4],
      ["Kerakli ma'lumotnomani so'rab ko'rgan", 3],
      ["Ishonchli (rasmiy) saytni tanigan", 3],
    ],
    metod: `Ota-onalar uchun emaktab juda foydali — farzand baholarini kuzatish; kirishga yordam bering.
Rasmiy saytlar odatda .uz va gov belgisiga ega; soxta saytlardan ehtiyot bo'ling.`,
    nazariya: `
<h3>Baholar va kundalik</h3>
<ul>
  <li><strong>Elektron kundalik</strong> — o'quvchi baholari, davomat va uy vazifalari onlayn ko'rinadigan tizim (masalan, <code>emaktab.uz</code>). Login odatda maktabdan beriladi.</li>
  <li>Ota-onalar ham farzandining baholarini kuzatishi mumkin.</li>
</ul>
<h3>Attestat va hujjatlar</h3>
<ul>
  <li><strong>Attestat</strong> — umumiy o'rta ta'limni tugatganlik haqidagi hujjat. 11-sinfdan keyin beriladi.</li>
  <li>Ta'lim hujjatlarining elektron ma'lumotlari va ayrim ma'lumotnomalarni davlat portallari orqali tekshirish mumkin.</li>
</ul>
<h3>Oliy ta'limga kirish va grantlar</h3>
<ul>
  <li><strong>Bilim va malakalarni baholash agentligi</strong> (sobiq DTM) — kirish testlari, ro'yxatdan o'tish va natijalar rasmiy sayti (masalan, <code>uzbmb.uz</code>).</li>
  <li><strong>Davlat granti</strong> — o'qish xarajati davlat tomonidan qoplanadi, eng yuqori ball to'plaganlarga beriladi.</li>
  <li>Xalqaro grantlar va stipendiyalar: universitetlar va xalqaro dasturlarning rasmiy saytlarida e'lon qilinadi.</li>
</ul>
<h3>Real hayotiy misollar</h3>
<ul>
  <li>Choraklik baholarni elektron kundalikda ko'rish.</li>
  <li>Kirish testi kunini va natijasini rasmiy saytdan bilish.</li>
  <li>O'tish ballarini oldingi yillar bilan solishtirib, reja tuzish.</li>
</ul>
<p class="hint">Sayt nomlari va tartiblar o'zgarishi mumkin — har doim eng so'nggi rasmiy ma'lumotga tayaning.</p>`,
    amaliyot: {
      oson: [
        ["Elektron kundalik", "Elektron kundalik nima uchun kerakligini 3 jumlada yozing."],
        ["Attestat", "Attestat nima va qachon beriladi — yozing."],
        ["Grant", "Davlat granti nima ekanini o'z so'zingiz bilan tushuntiring."],
        ["Rasmiy sayt", "Bilim va malakalarni baholash agentligi rasmiy saytini Google orqali toping va manzilini yozing."],
      ],
      orta: [
        ["Kundalikka kirish", "O'z elektron kundalik profilingizga kiring (login bo'lsa) va oxirgi 5 ta bahoingizni yozing."],
        ["Yo'nalish", "Qiziqqan oliy ta'lim yo'nalishingiz uchun qaysi fanlardan test topshirilishini toping."],
        ["O'tish ballari", "Bitta OTM va yo'nalish bo'yicha o'tgan yilgi o'tish ballarini toping."],
        ["Jadval", "Excel'da 3 ta OTM, yo'nalish va o'tish ballari jadvalini tuzing."],
      ],
      qiyin: [
        ["Shaxsiy reja", "Grantga kirish uchun 2 yillik tayyorgarlik rejasini Word'da tuzing: fanlar, kitoblar, haftalik soat."],
        ["Xalqaro stipendiya", "Bitta xalqaro stipendiya dasturi haqida rasmiy saytdan ma'lumot toping: talablari va muddatlari."],
        ["Grafik", "Excel'dagi baholaringiz asosida fanlar bo'yicha o'rtacha ball diagrammasini yarating."],
        ["Manbani tekshirish", "Ijtimoiy tarmoqdagi «grant natijalari» haqidagi xabarni rasmiy saytdan qanday tekshirishni yozing."],
      ],
    },
    uyga: {
      oson: [
        ["3 ta sayt", "Ta'limga oid 3 ta rasmiy sayt nomini va vazifasini yozing."],
        ["Baholar", "Bu chorakdagi baholaringizni jadval qiling."],
        ["Orzu", "Qaysi OTM va yo'nalishda o'qishni xohlaysiz — yozing."],
        ["Grant va kontrakt", "Grant va kontrakt asosida o'qish farqini yozing."],
      ],
      orta: [
        ["Test fanlari", "Tanlagan yo'nalishingiz uchun test fanlari va ularning ball ulushini toping."],
        ["Kalendar", "Kirish jarayonining muhim sanalarini (ro'yxatdan o'tish, test) rasmiy manbadan toping va kalendarga yozing."],
        ["Ota-ona bilan", "Ota-onangizga elektron kundalikda baholarni qanday ko'rishni ko'rsating."],
      ],
      qiyin: [
        ["Taqdimot", "«Mening ta'lim yo'lim» mavzusida 5 slaydli taqdimot: maqsad, yo'nalish, fanlar, reja, motivatsiya."],
        ["Tahlil", "Excel'da 3 yillik o'tish ballari dinamikasini diagramma bilan ko'rsating va xulosa yozing."],
        ["Motivatsion xat", "Xalqaro stipendiya uchun qisqa motivatsion xat qoralamasini yozing."],
      ],
    },
    savollar: [
      ["Elektron kundalik nima beradi?", "Baholar, davomat va uy vazifalarini onlayn ko'rish imkonini."],
      ["Attestat nima?", "Umumiy o'rta ta'limni tugatganlik haqidagi hujjat."],
      ["Davlat granti nima?", "O'qish xarajati davlat tomonidan qoplanadigan o'rin."],
      ["Kirish testlari haqida rasmiy ma'lumot qayerda?", "Bilim va malakalarni baholash agentligining rasmiy saytida."],
      ["Ijtimoiy tarmoqdagi xabarga darhol ishonish kerakmi?", "Yo'q, rasmiy saytdan tekshirish kerak."],
    ],
  },

  {
    n: 21, title: 'Internet xavfsizligi – shaxsiy ma’lumotlarni bermaslik, zararli saytlar va spamdan himoyalanish, parol tanlash o‘yini',
    maqsad: "Shaxsiy ma'lumotni himoyalash, kuchli parol tanlash va zararli saytlardan saqlanishni o'rganish.",
    faoliyat: "Kuchli parol tuzish o'yini va shubhali xabarlarni aniqlash.",
    vositalar: [
      ["Google Password Manager", "https://passwords.google.com", "parollarni xavfsiz saqlaydi"],
      ["Have I Been Pwned", "https://haveibeenpwned.com", "e-pochta sizib chiqqanmi — tekshirish"],
    ],
    namuna: `<p>Kuchli parol qoidasi:</p>
<pre class="prompt">Zaif:   12345, parol, ism1
Kuchli: 3 ta tasodifiy so'z + raqam + belgi
        masalan: Tog'-Olma-Daryo7!
Qoida:  har sayt uchun boshqa parol; hech kimga aytmang</pre>`,
    rubrika: [
      ["Kuchli parol tuzilgan", 3],
      ["Qaysi ma'lumotni bermaslik kerakligini bilgan", 4],
      ["Shubhali xabarni aniqlagan", 3],
    ],
    metod: `Bu dars oilaning barcha a'zolari uchun foydali — bolalar orqali kattalarga ham yetadi.
"Uchta so'z" usuli — eslab qolinadigan, lekin kuchli parol; o'yin tarzida o'rgating.
Takror: SMS kod va parolni hech kimga, hatto "do'st" yoki "bankxodim"ga ham aytmaslik.`,
    nazariya: `
<h3>Shaxsiy ma'lumotlar</h3>
<p>Internetda notanish odamlarga bermaslik kerak bo'lgan ma'lumotlar:</p>
<ul>
  <li>Uy manzili, maktab va sinf, telefon raqami.</li>
  <li>Parollar, SMS kodlar, karta ma'lumotlari.</li>
  <li>Pasport yoki guvohnoma rasmi.</li>
  <li>Uyda kim yo'qligi, qayerga ketayotganingiz (real vaqtda).</li>
</ul>
<h3>Zararli saytlar va spam</h3>
<ul>
  <li><strong>Spam</strong> — keraksiz reklama yoki aldov xabarlari.</li>
  <li><strong>Zararli dastur (virus)</strong> — noma'lum fayllar (<code>.apk</code>, <code>.exe</code>), «tekin o'yin» yoki «kino yuklab olish» saytlari orqali tarqaladi.</li>
  <li>Belgilar: ko'p qalqib chiquvchi oynalar, «Telefoningizda virus bor!» degan qo'rqituvchi yozuvlar, shubhali manzil.</li>
</ul>
<h3>Parol tanlash o'yini — qoidalar</h3>
<pre>Zaif:    123456   qwerty   ali2010   parol
Kuchli:  Olma!Qizil7Daraxt     (uzun, aralash, ma'noli ibora)

Qoida: 12+ belgi, katta va kichik harf, raqam, belgi,
       ism va tug'ilgan sana yo'q, har bir sayt uchun alohida.</pre>
<h3>Agar nimadir noto'g'ri ketsa</h3>
<ul>
  <li>Shubhali xabar yoki tahdid kelsa — <strong>kattalarga ayting</strong>.</li>
  <li>Parol o'g'irlangan bo'lsa — darhol o'zgartiring va ikki bosqichli himoyani yoqing.</li>
  <li>Bezorilik qilganlarni bloklash va shikoyat qilish mumkin.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Shaxsiy ma'lumotlar", "Internetda bermaslik kerak bo'lgan 6 ta ma'lumotni yozing."],
        ["Zaif parollar", "5 ta zaif parol namunasini yozing va nima uchun zaif ekanini tushuntiring."],
        ["Spam", "Spam nima? 2 ta misol yozing."],
        ["Kimga aytamiz?", "Internetda qo'rqitishsa yoki shubhali xabar kelsa, kimga murojaat qilasiz?"],
      ],
      orta: [
        ["Parol o'yini", "Guruhlarga bo'linib, 5 daqiqada eng kuchli, lekin eslab qolish oson parol-iborani o'ylab toping. O'qituvchi qoidalar bo'yicha baholaydi."],
        ["Xavfsizmi?", "O'qituvchi bergan 8 ta vaziyatni «xavfsiz» va «xavfli» ga ajrating."],
        ["Profil sozlamalari", "Telegram'da «Maxfiylik» sozlamalarini oching va telefon raqamingizni kimlar ko'rishini tekshiring."],
        ["Qalqib chiquvchi oyna", "«Telefoningizda 3 ta virus topildi! Tozalash uchun bosing» oynasi chiqsa nima qilasiz?"],
      ],
      qiyin: [
        ["Detektiv", "O'qituvchi bergan 4 ta xabar va sayt skrinshotidagi aldov belgilarini toping va sanab chiqing."],
        ["Parol kuchi", "Parol kuchini tekshiruvchi xizmat yordamida 3 ta namuna parolni (o'zingizniki emas!) solishtiring."],
        ["Rolli o'yin", "Juftlikda: biri o'yinda «do'st» bo'lib manzil va telefon so'raydi, ikkinchisi xavfsiz javob beradi."],
        ["Qoidalar plakati", "Sinf uchun «Internetdagi 7 oltin qoida» plakatini Word yoki PowerPoint'da tayyorlang."],
      ],
    },
    uyga: {
      oson: [
        ["Kuchli parol qoidalari", "Kuchli parolning 5 ta qoidasini yozing."],
        ["Oilaviy suhbat", "Oilangiz bilan internet xavfsizligi haqida gaplashing va ularning fikrini yozing."],
        ["Maxfiylik", "Ijtimoiy tarmoq profilingizda shaxsiy ma'lumotlar yopiqligini tekshiring."],
        ["Spam papkasi", "Pochtangizning spam papkasini ko'rib, qanday xatlar borligini yozing (bosmasdan)."],
      ],
      orta: [
        ["Ikki bosqichli himoya", "Telegram'da «Ikki bosqichli tasdiqlash» (bulutli parol) ni yoqing yoki qanday yoqilishini yozing."],
        ["Ilovalar ruxsatlari", "Telefoningizdagi 3 ta ilovaning ruxsatlarini (kamera, mikrofon, joylashuv) tekshiring."],
        ["Xavfli vaziyatlar", "Internetdagi 5 ta xavfli vaziyat va har birida qanday harakat qilishni yozing."],
      ],
      qiyin: [
        ["Ukaga yo'riqnoma", "Kichik bolalar uchun rasmli «Internetda xavfsiz bo'l» yo'riqnomasini tayyorlang."],
        ["Test", "Internet xavfsizligi bo'yicha 10 savollik test tuzing va oilangizda sinab ko'ring."],
        ["Raqamli iz", "«Raqamli iz» nima ekanini o'rganing va o'z raqamli izingizni kamaytirish uchun 4 ta qadam yozing."],
      ],
    },
    savollar: [
      ["Internetda qanday ma'lumotlarni bermaslik kerak?", "Manzil, telefon, maktab, parol, SMS kod, karta va hujjat ma'lumotlari."],
      ["Kuchli parol qanday bo'ladi?", "Uzun (12+), aralash belgilar, shaxsiy ma'lumotsiz, har sayt uchun alohida."],
      ["«Telefoningizda virus bor» degan oyna chiqsa nima qilish kerak?", "Bosmaslik, oynani yopish, kattalarga aytish."],
      ["Spam nima?", "Keraksiz reklama yoki aldov xabarlari."],
      ["Parol o'g'irlansa nima qilish kerak?", "Darhol parolni o'zgartirish va ikki bosqichli himoyani yoqish."],
    ],
  },

  {
    n: 22, title: 'Telegram va foydali botlar – so‘z o‘rgatuvchi, matematik masala yechuvchi va foydali bilim beruvchi botlarni sinab ko‘rish',
    maqsad: "Telegram va foydali botlardan (so'z o'rgatuvchi, masala yechuvchi, bilim beruvchi) foydalanishni o'rganish.",
    faoliyat: "2-3 ta foydali botni topib, sinab ko'rish.",
    vositalar: [
      ["Telegram", "https://telegram.org"],
      ["ChatGPT", "https://chatgpt.com"],
    ],
    namuna: `<pre class="prompt">Bot topish: Telegram'da yuqoridagi qidiruvga bot nomini yozing
Ishga tushirish: "Start" tugmasini bosing
Namuna botlar: tarjimon, ob-havo, lug'at, matematik yordamchi</pre>
<p>Diqqat: botga karta, parol yoki shaxsiy ma'lumot bermang.</p>`,
    rubrika: [
      ["2+ foydali bot topib sinalgan", 4],
      ["Bot nima qilishini tushuntirgan", 3],
      ["Xavfsizlik qoidasiga amal qilgan", 3],
    ],
    metod: `Botlar amaliy va qiziqarli; har kim bitta foydali botni topib, qisqa taqdim qilsin.
Ogohlantiring: pul yoki "sovg'a" va'da qiladigan botlar ko'pincha firibgar; shaxsiy ma'lumot berilmaydi.`,
    nazariya: `
<h3>Telegram imkoniyatlari</h3>
<ul>
  <li><strong>Chat</strong> — shaxsiy yozishma; <strong>guruh</strong> — ko'p kishilik suhbat; <strong>kanal</strong> — bir tomonlama yangiliklar.</li>
  <li><strong>Saqlangan xabarlar</strong> — o'zingiz uchun eslatma va fayl saqlash joyi.</li>
  <li>Fayl, ovozli xabar, video xabar yuborish; jild (papka)larga ajratish.</li>
</ul>
<h3>Bot nima?</h3>
<p><strong>Bot</strong> — Telegram ichidagi avtomatik dastur. U buyruqlarga javob beradi: so'z o'rgatadi, test beradi, tarjima qiladi, fayl yuklab beradi. Bot nomi odatda <code>bot</code> bilan tugaydi (<code>@...bot</code>).</p>
<h3>Foydali bot turlari</h3>
<ul>
  <li><strong>Til o'rgatuvchi</strong> — har kuni yangi so'zlar, testlar.</li>
  <li><strong>Matematika</strong> — misol yechish bosqichlari, mashqlar.</li>
  <li><strong>Tarjimon</strong>, <strong>lug'at</strong>, <strong>viktorina</strong> botlari.</li>
  <li><strong>Rasmiy botlar</strong> — davlat tashkilotlari va banklarning rasmiy botlari (havolasini rasmiy saytdan oling).</li>
</ul>
<h3>Botdan xavfsiz foydalanish</h3>
<ul>
  <li>Botni bosishdan oldin: kim yaratgan, rasmiy kanal yoki saytda havolasi bormi?</li>
  <li>Bot telefon raqami, karta ma'lumoti yoki kod so'rasa — <strong>to'xtang</strong>.</li>
  <li>«Pul ishlash», «tekin obuna» va'da qiladigan botlardan ehtiyot bo'ling.</li>
  <li>Keraksiz botni to'xtatish: bot chatida <em>Botni to'xtatish va bloklash</em>.</li>
</ul>
<pre>Botlar bilan umumiy buyruqlar:
/start  — boshlash
/help   — yordam
/stop   — to'xtatish (ba'zi botlarda)</pre>`,
    amaliyot: {
      oson: [
        ["Chat, guruh, kanal", "Chat, guruh va kanal farqini yozing."],
        ["Saqlangan xabarlar", "«Saqlangan xabarlar» ga bitta eslatma va bitta rasm saqlang."],
        ["Bot nima?", "Bot nima ekanini 2 jumlada yozing."],
        ["/start", "O'qituvchi ko'rsatgan bitta xavfsiz botni oching va /start bosing."],
      ],
      orta: [
        ["So'z boti", "Til o'rgatuvchi botdan 10 ta yangi so'z o'rganing va daftarga yozing."],
        ["Matematika boti", "Matematik bot yordamida 3 ta misolni yeching — avval o'zingiz, keyin bot bilan tekshiring."],
        ["Jildlar", "Telegram'da «O'qish» jildini yarating va unga o'qishga oid chat va kanallarni qo'shing."],
        ["Bot tekshiruvi", "Botning rasmiy ekanini tekshirishning 3 ta usulini yozing."],
      ],
      qiyin: [
        ["Bot tanlovi", "Uch xil toifadagi (til, matematika, bilim) bittadan botni sinab, Excel'da baholash jadvali tuzing: foydaliligi, qulayligi, reklama ko'pligi (1–5)."],
        ["Xavfli bot", "«Telefon raqamingizni yuboring va 50 000 so'm oling» degan bot. Nima uchun xavfli? Yozing."],
        ["Viktorina", "Telegram guruhida sinfdoshlar bilan «Viktorina» (Quiz) rejimidagi so'rovnoma yarating."],
        ["Bot ro'yxati", "O'qish uchun foydali 5 ta bot va kanal ro'yxatini Word'da tuzing: nomi, nima qiladi, kimga foydali."],
      ],
    },
    uyga: {
      oson: [
        ["Har kuni 10 so'z", "Bir hafta davomida so'z botidan har kuni 10 ta so'z o'rganing."],
        ["Bot buyruqlari", "/start, /help va /stop buyruqlari nima qilishini yozing."],
        ["Bloklash", "Keraksiz botni qanday to'xtatish va bloklashni yozing."],
        ["Kanallar", "O'qishga foydali 2 ta kanalga obuna bo'ling va nomlarini yozing."],
      ],
      orta: [
        ["Haftalik natija", "So'z botidan o'rgangan so'zlaringiz bo'yicha o'zingizga 10 savollik test tuzing."],
        ["Maxfiylik", "Telegram'da profil rasmingiz va raqamingizni kimlar ko'rishini sozlang."],
        ["Oilaga ko'rsatish", "Oila a'zongizga bitta foydali botdan foydalanishni o'rgating."],
      ],
      qiyin: [
        ["Taqdimot", "«Telegram — o'qish quroli» mavzusida 5 slaydli taqdimot tayyorlang."],
        ["Bot qanday ishlaydi?", "Internetdan bot qanday yaratilishi (BotFather) haqida o'qib, qisqa tushuntirish yozing."],
        ["Xavfsizlik eslatmasi", "Botlardan foydalanish bo'yicha 6 bandli xavfsizlik eslatmasini tayyorlang."],
      ],
    },
    savollar: [
      ["Chat, guruh va kanal farqi?", "Chat — shaxsiy, guruh — ko'p kishilik suhbat, kanal — bir tomonlama yangiliklar."],
      ["Bot nima?", "Telegram ichidagi buyruqlarga avtomatik javob beradigan dastur."],
      ["Bot bilan ishlash qaysi buyruq bilan boshlanadi?", "/start."],
      ["Bot telefon raqami yoki karta ma'lumotini so'rasa nima qilish kerak?", "Bermaslik, botni to'xtatish va bloklash."],
      ["Botning rasmiyligini qanday tekshirish mumkin?", "Havolani rasmiy sayt yoki kanaldan olish, yaratuvchini tekshirish."],
    ],
  },

  {
    n: 23, title: 'Amaliy mashg‘ulot – telefon yoki kompyuterda biror xizmatni sinab ko‘rish (masalan, my.gov.uz dan oddiy ma’lumot olish)', tag: 'amaliy',
    maqsad: "O'rganilgan onlayn xizmatlardan birini mustaqil amalda qo'llash.",
    faoliyat: "my.gov.uz, to'lov yoki emaktab xizmatidan birini bajarib ko'rsatish.",
    vositalar: [
      ["my.gov.uz", "https://my.gov.uz"],
      ["Click / Payme", "https://click.uz"],
      ["Emaktab", "https://emaktab.uz"],
    ],
    namuna: `<pre class="prompt">Tanlang va bajaring:
- my.gov.uz dan oddiy ma'lumotnoma so'rash
- telefonni onlayn to'ldirish (kichik summa)
- emaktab'da baholarni ko'rish</pre>`,
    rubrika: [
      ["Xizmat mustaqil bajarilgan", 5],
      ["Bosqichlar to'g'ri ketma-ketlikda", 3],
      ["Xavfsizlik qoidalariga amal qilingan", 4],
      ["Natijani tushuntirib bergan", 3],
    ],
    metod: `Yakuniy amaliy ish (jami 15 ball): har o'quvchi bitta real xizmatni boshidan oxirigacha bajarsin.
Pul bilan bog'liq amalda kichik summa va ehtiyotkorlik; iloji bo'lsa, ota-ona nazoratida.`,
    nazariya: `
<h3>Mashg'ulot maqsadi</h3>
<p>3-oyda o'rganilganlarni amalda sinash: davlat sayti, to'lov ilovasi menyusi, elektron kundalik, Telegram bot — xavfsiz va to'g'ri foydalanish.</p>
<h3>Stansiyalar (guruhlarda navbat bilan)</h3>
<ol>
  <li><strong>my.gov.uz</strong> — xizmatni topish, shartlarini o'qish, kerakli hujjatlar ro'yxatini yozish.</li>
  <li><strong>To'lov ilovasi</strong> — menyuni ko'rish (haqiqiy to'lovsiz): mobil aloqa, kommunal, jarimalar bo'limlari.</li>
  <li><strong>Ta'lim</strong> — elektron kundalik yoki rasmiy ta'lim saytidan ma'lumot topish.</li>
  <li><strong>Xavfsizlik</strong> — soxta sayt va xabarlarni aniqlash topshirig'i.</li>
</ol>
<h3>Natija</h3>
<p>Har bir guruh Word'da qisqa hisobot tayyorlaydi: qaysi xizmatni sinadi, qanday bosqichlardan o'tdi, nimasi qulay, qanday xavflarga e'tibor berish kerak. <strong>Shaxsiy ma'lumotlar hisobotga yozilmaydi.</strong></p>`,
    amaliyot: {
      oson: [
        ["Xizmatni topish", "my.gov.uz'da o'qituvchi aytgan xizmatni toping."],
        ["Shartlar", "Xizmat muddati va narxini yozing."],
        ["Menyu", "To'lov ilovasida «To'lovlar» bo'limidagi 5 ta kategoriyani yozing."],
        ["Rasmiy manzil", "Har bir stansiyadagi sayt yoki ilova rasmiy ekanini tekshiring va qanday tekshirganingizni yozing."],
      ],
      orta: [
        ["Hujjatlar ro'yxati", "Tanlangan davlat xizmati uchun kerakli hujjatlar ro'yxatini yozing."],
        ["Bosqichlar sxemasi", "Xizmatdan foydalanish bosqichlarini Word'da SmartArt sxema qilib chizing."],
        ["Ta'lim ma'lumoti", "Rasmiy ta'lim saytidan kirish jarayoniga oid bitta muhim sanani toping."],
        ["Soxta sayt", "O'qituvchi bergan 5 ta havoladan soxtalarini aniqlang."],
      ],
      qiyin: [
        ["Guruh hisoboti", "Guruh bilan Google Docs'da birgalikda hisobot yozing: xizmat, bosqichlar, qulayliklar, xavflar."],
        ["Yo'riqnoma", "Bitta xizmat uchun skrinshotli yo'riqnoma tayyorlang (shaxsiy ma'lumotlarni yashirib)."],
        ["Taqdimot", "Guruhingiz natijasini 3 slaydda taqdim eting."],
        ["Baholash", "Boshqa guruh hisobotini 3 mezon bo'yicha baholang va tavsiya yozing."],
      ],
    },
    uyga: {
      oson: [
        ["Xulosa", "Mashg'ulotda nimani o'rgandingiz? 5 jumla yozing."],
        ["Oilaga foyda", "Oilangiz uchun eng foydali bo'lgan xizmatni yozing."],
        ["Xatcho'plar", "Rasmiy davlat saytlarini brauzer xatcho'plariga qo'shing."],
        ["Qoidalar", "Davlat xizmatlaridan xavfsiz foydalanishning 4 ta qoidasini yozing."],
      ],
      orta: [
        ["Ota-ona bilan sinov", "Ota-onangiz bilan birga bitta xizmatdan (ularning akkaunti va ruxsati bilan) foydalaning va bosqichlarni yozing."],
        ["Yo'riqnomani yakunlash", "Darsdagi yo'riqnomani PDF qilib yakunlang."],
        ["Drive", "Yo'riqnomani Google Drive'ga yuklab, havolasini o'qituvchiga yuboring."],
      ],
      qiyin: [
        ["Mahalla uchun", "Keksalar uchun «my.gov.uz dan foydalanish» bo'yicha katta shriftli, oddiy tilda yozilgan 1 sahifalik yo'riqnoma tayyorlang."],
        ["Taqqoslash", "Bitta xizmatni onlayn va oflayn olishni vaqt, xarajat va qulaylik bo'yicha jadvalda solishtiring."],
        ["Taklif", "Davlat xizmati saytini yanada qulayroq qilish uchun 3 ta taklif yozing."],
      ],
    },
    savollar: [
      ["Davlat xizmatidan foydalanishdan oldin nimani tekshirish kerak?", "Sayt yoki ilova rasmiy ekanini, xizmat shartlari va kerakli hujjatlarni."],
      ["Hisobotga qanday ma'lumot yozilmaydi?", "Shaxsiy ma'lumotlar: raqamlar, parollar, hujjat ma'lumotlari."],
      ["Guruhda bitta hujjat ustida qanday birga ishlash mumkin?", "Google Docs orqali."],
      ["Yo'riqnoma tayyorlashda skrinshotdagi shaxsiy ma'lumot bilan nima qilinadi?", "Yashiriladi yoki bo'yab tashlanadi."],
    ],
  },

  {
    n: 24, title: 'Yakuniy dars va viktorina – o‘tilgan mavzular bo‘yicha savol-javob, sovg‘alar bilan', tag: 'yakuniy',
    maqsad: "3 oylik bilimlarni mustahkamlash va baholash.",
    faoliyat: "Viktorina (savol-javob) va sertifikat topshirish.",
    vositalar: [
      ["Kahoot", "https://kahoot.com", "viktorina o'yini"],
      ["ChatGPT", "https://chatgpt.com", "savollar tayyorlash"],
    ],
    namuna: `<p>Viktorina mavzulari: kompyuter va Office, internet va e-pochta, AI yordamchilar, davlat xizmatlari, xavfsizlik.</p>
<pre class="prompt">Format: 15-20 savol, jamoaviy yoki yakka
Qo'shimcha: eng faol o'quvchilarga sovg'a va sertifikat</pre>`,
    rubrika: [
      ["Viktorinada faol ishtirok", 5],
      ["Asosiy mavzularni o'zlashtirgani", 5],
      ["Kundalik hayotda qo'llash misolini aytgani", 5],
    ],
    metod: `Yakuniy dars — bayram: Kahoot kabi o'yin bilan viktorina qiziqarli o'tadi.
Har bir o'quvchidan "shu kurs menga qayerda foydali bo'ladi?" degan savolga javob so'rang — bilim hayotga bog'lanadi.
Sertifikat va ijobiy kayfiyat bilan yakunlang.`,
    nazariya: `
<h3>Yakuniy dars tartibi</h3>
<ol>
  <li><strong>Takrorlash</strong> (15 daqiqa) — 3 oy mavzularini qisqa eslash.</li>
  <li><strong>Viktorina</strong> (45 daqiqa) — jamoalar bo'yicha 4 tur.</li>
  <li><strong>Amaliy topshiriq</strong> (30 daqiqa) — tezlikka kichik vazifalar.</li>
  <li><strong>Taqdirlash</strong> — sertifikat va sovg'alar.</li>
</ol>
<h3>Viktorina turlari</h3>
<ul>
  <li><strong>1-tur: Kompyuter va Office</strong> — Windows, qisqa tugmalar, Word, Excel, PowerPoint.</li>
  <li><strong>2-tur: Internet</strong> — Google, Gmail, ChatGPT, Drive, Docs, resume.</li>
  <li><strong>3-tur: Xavfsizlik</strong> — phishing, parollar, shaxsiy ma'lumot, botlar.</li>
  <li><strong>4-tur: Davlat xizmatlari</strong> — my.gov.uz, to'lovlar, jarimalar, ta'lim xizmatlari.</li>
</ul>
<h3>Baholash</h3>
<p>Har to'g'ri javob — 1 ball, tezkor savollar — 2 ball. Eng ko'p ball to'plagan jamoa g'olib. Amaliy topshiriqni birinchi va to'g'ri bajarganlar qo'shimcha ball oladi.</p>`,
    amaliyot: {
      oson: [
        ["Shortcut poygasi", "O'qituvchi aytgan amalning qisqa tugmasini birinchi bo'lib ayting yoki bajaring (nusxa, joylash, bekor qilish, saqlash ...)."],
        ["Papka tuzilmasi", "2 daqiqada «Yakuniy» papkasi va ichida 3 ta papka yarating."],
        ["Kengaytmalar", "10 ta fayl kengaytmasining turini aniqlang."],
        ["Ilovalar", "Oy davomida o'rganilgan 10 ta dastur, sayt yoki ilovani sanab bering."],
      ],
      orta: [
        ["Word topshirig'i", "5 daqiqada: sarlavha, ro'yxat, 2×3 jadval va rasmli hujjat tayyorlang."],
        ["Excel topshirig'i", "5 daqiqada: 5 ta mahsulot, narx, miqdor, summa va jami — formulalar bilan."],
        ["Qidiruv topshirig'i", "Google operatorlari yordamida o'qituvchi bergan ma'lumotni eng tez toping."],
        ["Xavfli yoki xavfsiz", "O'qituvchi o'qib bergan 10 ta vaziyatni tez baholang."],
      ],
      qiyin: [
        ["Mini-taqdimot", "10 daqiqada «Kursda o'rgangan eng foydali narsam» mavzusida 3 slaydli taqdimot tayyorlang va 1 daqiqada gapiring."],
        ["Xat va biriktirma", "Tayyorlagan taqdimotingizni o'qituvchiga to'g'ri mavzu va qisqa matn bilan e-pochtada yuboring."],
        ["Jamoaviy savol", "Jamoangiz boshqa jamoa uchun 3 ta qiyin (lekin adolatli) savol tuzsin."],
        ["Kelajak rejasi", "Kursdan keyin qaysi bilimni chuqurlashtirmoqchisiz? 3 qadamli reja yozing."],
      ],
    },
    uyga: {
      oson: [
        ["Sertifikat", "Olgan sertifikatingizni skaner qilib yoki rasmga olib Drive'ga saqlang."],
        ["Fikr", "Kurs haqida fikringizni 5 jumlada yozing."],
        ["Eng foydali", "Kursdagi eng foydali 3 ta mavzuni yozing."],
        ["Portfel", "Kurs davomida tayyorlagan barcha ishlaringizni bitta papkaga yig'ing."],
      ],
      orta: [
        ["Oilaga o'rgatish", "Oila a'zongizga kursda o'rgangan bitta ko'nikmani o'rgating va natijasini yozing."],
        ["Resume yangilash", "Resume'ingizning «Ko'nikmalar» bo'limiga kursda o'rganganlaringizni qo'shing."],
        ["Keyingi qadam", "Keyingi o'rganmoqchi bo'lgan IT yo'nalishi (dizayn, dasturlash, ...) haqida ma'lumot to'plang."],
      ],
      qiyin: [
        ["Yakuniy loyiha", "«Mening oilam uchun raqamli yordamchi» loyihasi: Word'da yo'riqnoma, Excel'da oilaviy byudjet, PowerPoint'da taqdimot."],
        ["O'z viktorinangiz", "Kurs mavzulari bo'yicha 20 savollik viktorina tuzing (Google Forms yoki Telegram Quiz)."],
        ["Yo'l xaritasi", "6 oylik shaxsiy o'qish yo'l xaritasini Excel'da tuzing: oy, mavzu, manba, natija."],
      ],
    },
    savollar: [
      ["Nusxa olish va joylashtirish tugmalari?", "Ctrl + C va Ctrl + V."],
      ["Excel'da yig'indi funksiyasi?", "SUM (СУММ)."],
      ["PowerPoint'da taqdimotni boshidan ko'rsatish?", "F5."],
      ["Aniq iborani Google'da qanday qidiriladi?", "Qo'shtirnoq ichida."],
      ["Gmail'da fayl qanday yuboriladi?", "Xatga 📎 belgisi orqali biriktirib."],
      ["Phishing nima?", "Firibgarlarning o'zini ishonchli qilib ko'rsatib, ma'lumot o'g'irlashga urinishi."],
      ["SMS kodni kimga aytish mumkin?", "Hech kimga."],
      ["my.gov.uz nima?", "Yagona interaktiv davlat xizmatlari portali."],
      ["Resume qaysi formatda yuboriladi?", "PDF."],
      ["Kuchli parolning belgilari?", "Uzun, aralash belgilar, shaxsiy ma'lumotsiz, har sayt uchun alohida."],
      ["Google Drive'da bepul qancha joy beriladi?", "15 GB."],
      ["Botni qanday ishga tushiriladi?", "/start buyrug'i bilan."],
    ],
  },
];
