/* IT kursi — 1-oy: Kompyuter bilimlari (1–8-darslar)
 * Masala: [nomi, sharti, namuna (ixtiyoriy)] — shartda `...` -> <code>...</code>
 * Savol: [savol, javob] — javob sahifada yashirin turadi */
module.exports = [
  {
    n: 1, title: 'Kompyuter qismlari, Windows asoslari, papkalar va fayllar',
    maqsad: "Kompyuter qismlarini, Windows ish stolini va fayl/papka tizimini bilib olish.",
    faoliyat: "Windows'da papka ochish, nom berish va faylni to'g'ri joyga saqlash.",
    vositalar: [
      ['Windows Fayl menejeri (Explorer)', '', "Win+E tugmalari bilan ochiladi"],
      ['Windows Copilot', 'https://copilot.microsoft.com', "Windows'ga o'rnatilgan AI yordamchi"],
    ],
    namuna: `<p>Yangi papka ochish va fayl saqlash tartibi:</p>
<pre class="prompt">1) Ish stolida bo'sh joyga o'ng tugma → New → Folder
2) Papkaga nom bering: "Mening hujjatlarim"
3) Word'da matn yozing → Ctrl+S → shu papkani tanlang → nom bering → Save</pre>`,
    rubrika: [
      ["Kompyuterning 4+ qismi to'g'ri aytilgan", 3],
      ["Yangi papka ochilgan va nomlangan", 4],
      ["Fayl to'g'ri papkaga saqlangan", 3],
    ],
    metod: `Birinchi dars — qo'rquvni yo'qotish muhim: har bir o'quvchi amallarni o'z kompyuterida bajarsin.
Fayl va papka farqini real misolda ko'rsating (papka — javon, fayl — kitob).
Zamonaviy qo'shimcha: Windows'da Copilot tugmasi borligini ko'rsating, lekin asosiy maqsad — mustaqil ishlash.`,
    nazariya: `
<h3>Kompyuter qanday qismlardan iborat?</h3>
<ul>
  <li><strong>Sistema bloki (yoki noutbuk korpusi)</strong> — kompyuterning "miyasi" shu yerda: protsessor (CPU), operativ xotira (RAM), doimiy xotira (SSD yoki HDD).</li>
  <li><strong>Monitor</strong> — tasvirni ko'rsatadi.</li>
  <li><strong>Klaviatura</strong> — matn va buyruqlarni kiritish uchun.</li>
  <li><strong>Sichqoncha (mouse)</strong> — ekrandagi ko'rsatkichni boshqarish uchun. Chap tugma — tanlash, o'ng tugma — qo'shimcha menyu, g'ildirak — sahifani aylantirish.</li>
  <li><strong>Karnay, quloqchin, mikrofon, veb-kamera, printer</strong> — qo'shimcha qurilmalar.</li>
</ul>
<h3>Windows nima?</h3>
<p><strong>Windows</strong> — operatsion tizim, ya'ni kompyuterni boshqaradigan asosiy dastur. Barcha boshqa dasturlar (Word, Chrome, o'yinlar) Windows ichida ishlaydi.</p>
<ul>
  <li><strong>Ish stoli (Desktop)</strong> — kompyuter yonganda ko'rinadigan asosiy ekran.</li>
  <li><strong>Pusk (Start) tugmasi</strong> — pastki chap burchakdagi Windows belgisi. Dasturlar, sozlamalar va o'chirish shu yerda.</li>
  <li><strong>Vazifalar paneli (Taskbar)</strong> — pastdagi chiziq: ochiq dasturlar, soat, til, ovoz, internet belgisi.</li>
  <li><strong>Oyna (Window)</strong> — har bir dastur oynada ochiladi: yuqori o'ng burchakda <em>yig'ish</em> ( _ ), <em>kattalashtirish</em> ( □ ) va <em>yopish</em> ( × ) tugmalari bor.</li>
</ul>
<h3>Papka va fayl</h3>
<p><strong>Fayl</strong> — saqlangan ma'lumot: matn, rasm, qo'shiq, video. <strong>Papka</strong> — fayllarni tartibli saqlash uchun "quti".</p>
<pre>Fayl nomi:   Uyga vazifa.docx
             |___________| |__|
                 nomi      kengaytma (turi)

.docx — Word hujjati     .xlsx — Excel jadvali   .pptx — taqdimot
.jpg/.png — rasm         .mp3 — musiqa           .mp4 — video
.pdf — hujjat            .zip — arxiv            .exe — dastur</pre>
<h3>Papka yaratish</h3>
<ol>
  <li>Ish stolining bo'sh joyida sichqonchaning <strong>o'ng</strong> tugmasini bosing.</li>
  <li><strong>Yaratish (Создать / New) → Papka</strong> ni tanlang.</li>
  <li>Nom yozing va <strong>Enter</strong> bosing.</li>
</ol>
<p><strong>Provodnik (Fayl boshqaruvchisi / Этот компьютер)</strong> — barcha disk, papka va fayllarni ko'rish uchun dastur. Ochish: vazifalar panelidagi sariq papka belgisi.</p>`,
    amaliyot: {
      oson: [
        ["Qismlarni nomlang", "O'qituvchi ko'rsatgan kompyuter qismlarini daftarga yozing: monitor, klaviatura, sichqoncha, sistema bloki va boshqalar."],
        ["Kompyuterni yoqish", "Kompyuterni to'g'ri yoqing va Windows ish stoli chiqguncha kuting. Pusk tugmasini toping."],
        ["Sichqoncha mashqi", "Ish stolidagi biror belgini bir marta bosib tanlang, ikki marta bosib oching, o'ng tugma bilan menyusini oching."],
        ["Oyna tugmalari", "Istalgan papkani oching. Uni yig'ing, kattalashtiring, kichraytiring va yoping."],
      ],
      orta: [
        ["Birinchi papka", "Ish stolida o'z ismingiz bilan papka yarating (masalan, «Ali Valiyev»)."],
        ["Papka ichida papka", "Ismingiz papkasi ichida 3 ta papka yarating: «Word», «Excel», «Rasmlar»."],
        ["Nomini o'zgartirish", "«Rasmlar» papkasining nomini «Mening rasmlarim» ga o'zgartiring (o'ng tugma → Nomini o'zgartirish)."],
        ["Provodnik", "Provodnikni oching va kompyuterdagi disklar (C:, D:) ni toping. Har birida qancha bo'sh joy borligini yozing."],
      ],
      qiyin: [
        ["Fayl turi", "Kompyuterdan 5 ta turli fayl toping va har birining turini (rasm, matn, video ...) kengaytmasiga qarab aniqlang."],
        ["Tartib", "Quyidagi tuzilmani yarating.", "O'quv/\n  1-oy/\n    Word/\n    Excel/\n    PowerPoint/\n  2-oy/\n  3-oy/"],
        ["Savatcha", "Bitta keraksiz papka yarating, uni o'chiring, so'ng Savatchadan (Корзина) qayta tiklang."],
        ["Kompyuter haqida", "«Bu kompyuter» ustida o'ng tugma → Xususiyatlar orqali protsessor nomi va RAM hajmini toping va yozing."],
      ],
    },
    uyga: {
      oson: [
        ["Qismlar ro'yxati", "Kompyuterning 8 ta qismini yozing va har biri nima uchun kerakligini bir jumlada tushuntiring."],
        ["Kiritish va chiqarish", "Ma'lumot kirituvchi va chiqaruvchi qurilmalarni ikki ustunga ajrating: klaviatura, monitor, sichqoncha, printer, mikrofon, karnay."],
        ["Fayl turlari", "10 ta fayl kengaytmasini yozing va qaysi turdagi fayl ekanini ko'rsating."],
        ["Pusk menyusi", "Pusk menyusidagi 5 ta dasturning nomini yozing."],
      ],
      orta: [
        ["Uy papkalari", "Uydagi kompyuter yoki noutbukda «Maktab» papkasini yarating va ichida fanlar bo'yicha 5 ta papka oching."],
        ["Oyna va papka", "Papka va fayl farqini o'z so'zingiz bilan 3–4 jumlada yozing."],
        ["Kompyuter pasporti", "Uydagi kompyuterning protsessori, RAM hajmi va Windows versiyasini toping."],
      ],
      qiyin: [
        ["Tartibsizlikni tartiblash", "Ish stolidagi barcha fayllarni turiga qarab papkalarga joylashtiring. Oldin va keyin skrinshot oling."],
        ["Qidiruv", "Provodnik qidiruvi orqali kompyuterdagi barcha «.jpg» fayllarni toping. Nechta chiqdi?"],
        ["Tushuntirma", "Kompyuterni bilmaydigan buvangiz yoki buvingizga «papka qanday yaratiladi» ni bosqichma-bosqich yozib bering."],
      ],
    },
    savollar: [
      ["Kompyuterning asosiy qismlarini sanang.", "Sistema bloki (CPU, RAM, SSD/HDD), monitor, klaviatura, sichqoncha."],
      ["Operatsion tizim nima?", "Kompyuterni boshqaradigan asosiy dastur, masalan Windows. Boshqa dasturlar uning ichida ishlaydi."],
      ["Fayl va papkaning farqi nima?", "Fayl — saqlangan ma'lumot (rasm, matn). Papka — fayllarni tartibli saqlaydigan joy."],
      ["Fayl kengaytmasi nima uchun kerak?", "Faylning turini bildiradi va qaysi dastur bilan ochilishini aniqlaydi."],
      ["O'chirilgan fayl qayerga ketadi?", "Savatchaga (Корзина). U yerdan qayta tiklash mumkin."],
      ["Oynaning yuqori o'ng burchagidagi 3 ta tugma nima qiladi?", "Yig'ish, kattalashtirish (yoki kichraytirish) va yopish."],
    ],
  },

  {
    n: 2, title: 'Klaviatura qisqacha tugmalari, fayl boshqaruvi',
    maqsad: "Asosiy klaviatura qisqa tugmalarini va fayllarni nusxalash/ko'chirish/o'chirishni o'rganish.",
    faoliyat: "Ctrl+C/V/Z tugmalari va fayllarni papkalar orasida ko'chirish mashqi.",
    vositalar: [
      ['Windows Fayl menejeri', '', "Win+E"],
    ],
    namuna: `<p>Eng foydali qisqa tugmalar:</p>
<pre class="prompt">Ctrl+C — nusxa olish      Ctrl+V — qo'yish        Ctrl+X — kesish
Ctrl+Z — orqaga qaytarish  Ctrl+S — saqlash        Ctrl+A — hammasini tanlash
Win+E — fayl menejeri      Win+D — ish stoli        PrintScreen — ekran rasmi</pre>`,
    rubrika: [
      ["8+ qisqa tugma to'g'ri ishlatilgan", 4],
      ["Fayl nusxalangan va boshqa papkaga ko'chirilgan", 3],
      ["Keraksiz fayl xavfsiz o'chirilgan (Korzina)", 3],
    ],
    metod: `Qisqa tugmalarni yod oldirish emas, amalda qo'llatish muhim — tezlik mashq bilan keladi.
"O'chirilgan fayl Korzinada turadi" ni ko'rsating — bu xatodan qo'rqmaslikka yordam beradi.`,
    nazariya: `
<h3>Klaviaturadagi muhim tugmalar</h3>
<ul>
  <li><strong>Enter</strong> — tasdiqlash, yangi qator.</li>
  <li><strong>Backspace</strong> — kursordan oldingi belgini o'chiradi; <strong>Delete</strong> — keyingi belgini yoki tanlangan faylni o'chiradi.</li>
  <li><strong>Shift</strong> — bosib turib yozilsa katta harf; <strong>Caps Lock</strong> — doimiy katta harf.</li>
  <li><strong>Space</strong> (probel) — bo'sh joy; <strong>Tab</strong> — keyingi maydonga o'tish.</li>
  <li><strong>Esc</strong> — bekor qilish, chiqish.</li>
  <li><strong>Alt + Shift</strong> (yoki <strong>Win + Space</strong>) — tilni almashtirish.</li>
</ul>
<h3>Eng kerakli qisqa tugmalar (shortcut)</h3>
<pre>Ctrl + C   — nusxa olish (Copy)
Ctrl + X   — kesib olish (Cut)
Ctrl + V   — joylashtirish (Paste)
Ctrl + Z   — oxirgi amalni bekor qilish
Ctrl + Y   — bekor qilinganini qaytarish
Ctrl + A   — hammasini tanlash
Ctrl + S   — saqlash
Ctrl + P   — chop etish
Ctrl + F   — qidirish
Alt + Tab  — ochiq oynalar orasida o'tish
Win + D    — ish stolini ko'rsatish
Win + E    — Provodnikni ochish
Win + L    — kompyuterni qulflash
Win + Shift + S — ekrandan rasm olish (skrinshot)
F2         — fayl nomini o'zgartirish</pre>
<h3>Fayl boshqaruvi</h3>
<ul>
  <li><strong>Nusxalash</strong> — fayl ikki joyda bo'ladi (Ctrl+C → Ctrl+V).</li>
  <li><strong>Ko'chirish</strong> — fayl bir joydan boshqasiga o'tadi (Ctrl+X → Ctrl+V).</li>
  <li><strong>Bir nechta faylni tanlash</strong> — Ctrl ni bosib turib birma-bir bosish; Shift bilan ketma-ket oraliqni tanlash.</li>
  <li><strong>Saralash</strong> — Provodnikda nom, sana, tur yoki hajm bo'yicha tartiblash.</li>
  <li><strong>Arxivlash</strong> — o'ng tugma → «ZIP faylga siqish»: bir nechta faylni bitta faylga jamlash.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Ism-familiya", "Bloknot (Notepad) ni oching va ismingizni katta harf bilan (Shift orqali), familiyangizni Caps Lock orqali yozing."],
        ["Tilni almashtirish", "Bloknotda bir qator o'zbekcha (lotin), bir qator ruscha yozing. Tilni qisqa tugma bilan almashtiring."],
        ["O'chirish", "«Kompyuter» so'zini yozing. Backspace bilan oxirgi 3 harfni, Delete bilan birinchi 3 harfni o'chiring."],
        ["Bekor qilish", "Bir jumla yozib, uni o'chiring va Ctrl + Z bilan qaytaring."],
      ],
      orta: [
        ["Nusxa va joylash", "Bir jumlani Ctrl + C va Ctrl + V bilan 5 marta takrorlang."],
        ["Faylni nusxalash", "Ish stolidagi bitta faylni ismingiz papkasiga nusxalang (asl fayl joyida qolsin)."],
        ["Faylni ko'chirish", "Boshqa faylni Ctrl + X va Ctrl + V bilan ko'chiring. Nusxalashdan farqini kuzating."],
        ["Oynalar orasida", "3 ta dastur oching va Alt + Tab bilan ular orasida o'ting. Win + D bilan ish stoliga chiqing."],
      ],
      qiyin: [
        ["Bir nechta fayl", "Papkadagi 1-, 3- va 5-fayllarni Ctrl yordamida birga tanlab, boshqa papkaga nusxalang."],
        ["Skrinshot", "Win + Shift + S bilan ekranning bir qismini rasmga oling va Paint yoki Word ga joylashtiring."],
        ["Arxiv", "3 ta faylni bitta ZIP arxivga siqing, keyin arxivni ochib (Extract) tekshiring."],
        ["Sichqonchasiz", "Faqat klaviatura bilan: Provodnikni oching (Win + E), papka yarating, nomini o'zgartiring (F2) va yoping."],
      ],
    },
    uyga: {
      oson: [
        ["10 ta shortcut", "10 ta qisqa tugmani yod oling va daftarga yozing."],
        ["Matn yozish", "Bloknotda o'zingiz haqingizda 5 ta jumla yozing va «Men haqimda.txt» nomi bilan saqlang (Ctrl + S)."],
        ["Tugmalar", "Enter, Backspace, Delete, Shift, Caps Lock, Tab, Esc — har biri nima qilishini yozing."],
        ["Ko'r yozish", "Kuniga 10 daqiqa klaviatura trenajyorida (masalan, typing mashqlari saytida) mashq qiling."],
      ],
      orta: [
        ["Nusxa va ko'chirish", "Nusxalash va ko'chirish farqini misol bilan tushuntiring."],
        ["Fayllarni saralash", "Bir papkadagi fayllarni nom, sana va hajm bo'yicha saralab, har safar qaysi fayl birinchi chiqqanini yozing."],
        ["Qidiruv", "Kompyuterdan Ctrl + F (yoki Provodnik qidiruvi) yordamida biror faylni nomi bo'yicha toping."],
      ],
      qiyin: [
        ["Shortcut jadvali", "Word, brauzer va Windows uchun 5 tadan qisqa tugma topib, jadval qiling."],
        ["Tezlik sinovi", "1 daqiqada nechta so'z yoza olishingizni 3 kun davomida o'lchab, natijalarni solishtiring."],
        ["Tartiblash", "«Yuklamalar» (Загрузки) papkasini tartibga keltiring: rasmlar, hujjatlar va boshqalar uchun alohida papkalar yarating."],
      ],
    },
    savollar: [
      ["Backspace va Delete farqi nima?", "Backspace kursordan oldingi belgini, Delete keyingi belgini o'chiradi."],
      ["Ctrl + C va Ctrl + X farqi nima?", "Ctrl + C nusxa oladi (asli qoladi), Ctrl + X kesib oladi (asli joyidan ketadi)."],
      ["Xato qilinganda qaysi tugmalar yordam beradi?", "Ctrl + Z — bekor qilish, Ctrl + Y — qaytarish."],
      ["Ochiq oynalar orasida qanday tez o'tiladi?", "Alt + Tab."],
      ["Skrinshot qanday olinadi?", "Win + Shift + S yoki Print Screen tugmasi."],
      ["Bir nechta faylni qanday tanlash mumkin?", "Ctrl bilan birma-bir, Shift bilan oraliqni, Ctrl + A bilan hammasini."],
    ],
  },

  {
    n: 3, title: 'Word asoslari: matn yozish, formatlash, saqlash',
    maqsad: "Word'da matn yozish, formatlash (shrift, o'lcham, rang) va saqlashni o'rganish.",
    faoliyat: "Qisqa matn yozib, sarlavha va abzatslarni formatlash.",
    vositalar: [
      ['Microsoft Word', '', "Office paketida"],
      ['Google Docs', 'https://docs.google.com', "bepul, brauzerda ishlaydi, o'zi saqlanadi"],
    ],
    namuna: `<p>Matnni formatlash tartibi:</p>
<pre class="prompt">1) Matnni yozing
2) Formatlash kerak bo'lgan qismni sichqoncha bilan belgilang
3) Home bo'limidan: shrift, o'lcham, Bold (Ctrl+B), rang
4) Ctrl+S → nom berib saqlang (masalan, "Birinchi matnim.docx")</pre>`,
    rubrika: [
      ["Matn yozilgan (kamida 5 jumla)", 2],
      ["Sarlavha va matn formatlangan (shrift, o'lcham, Bold)", 4],
      ["Fayl to'g'ri nom bilan saqlangan", 4],
    ],
    metod: `Word bo'lmasa, bepul Google Docs'dan foydalaning — ko'nikmalar bir xil, ustiga o'zi saqlanadi.
Formatlashda "oz — ko'p" qoidasi: ortiqcha rang va shrift matnni hunuk qiladi.`,
    nazariya: `
<h3>Microsoft Word nima?</h3>
<p><strong>Word</strong> — matnli hujjatlar (ariza, referat, xat, resume) tayyorlash dasturi. Fayl kengaytmasi — <code>.docx</code>.</p>
<h3>Word oynasi</h3>
<ul>
  <li><strong>Lenta (Ribbon)</strong> — yuqoridagi tab'lar: Главная/Bosh sahifa, Вставка/Qo'shish, Макет/Maket va boshqalar.</li>
  <li><strong>Ish maydoni</strong> — oq varaq, matn shu yerga yoziladi. Miltillovchi chiziq — <em>kursor</em>.</li>
  <li><strong>Holat qatori</strong> — pastda: sahifalar soni, so'zlar soni, masshtab.</li>
</ul>
<h3>Matnni formatlash (Bosh sahifa tab'i)</h3>
<pre>Shrift (masalan, Times New Roman)    Shrift o'lchami (12, 14)
B — qalin (Ctrl + B)    I — kursiv (Ctrl + I)    U — tagiga chizilgan (Ctrl + U)
Matn rangi, belgilash rangi
Tekislash: chapga (Ctrl+L), markazga (Ctrl+E), o'ngga (Ctrl+R), ikki tomonga (Ctrl+J)
Qatorlar oralig'i (1.0, 1.5)
Ro'yxatlar: belgili (•) va raqamli (1, 2, 3)</pre>
<h3>Matnni tanlash</h3>
<ul>
  <li>So'z ustida ikki marta bosish — so'zni tanlaydi.</li>
  <li>Uch marta bosish — butun abzatsni tanlaydi.</li>
  <li>Ctrl + A — butun hujjat.</li>
</ul>
<h3>Saqlash</h3>
<ol>
  <li><strong>Fayl → Saqlash</strong> (yoki Ctrl + S).</li>
  <li>Joyni tanlang (masalan, ismingiz papkasi), nom bering.</li>
  <li><strong>Saqlash</strong> tugmasini bosing. PDF qilib saqlash: <em>Fayl → Saqlash kabi → PDF</em>.</li>
</ol>
<p class="hint">Rasmiy hujjatlar uchun odatda: Times New Roman, 14 pt, qatorlar oralig'i 1.5, matn ikki tomonga tekislanadi.</p>`,
    amaliyot: {
      oson: [
        ["Birinchi hujjat", "Word'ni oching va o'zingiz haqingizda 3 ta jumla yozing."],
        ["Qalin va kursiv", "Ismingizni qalin, tug'ilgan shahringizni kursiv, sevimli faningizni tagiga chizilgan qilib yozing."],
        ["Shrift o'lchami", "«Salom, Word!» jumlasini 10, 16, 24 va 36 o'lchamda yozing."],
        ["Saqlash", "Hujjatni ismingiz papkasiga «1-hujjat» nomi bilan saqlang."],
      ],
      orta: [
        ["Tekislash", "4 ta qator yozing: birinchisi chapga, ikkinchisi markazga, uchinchisi o'ngga, to'rtinchisi (uzun abzats) ikki tomonga tekislansin."],
        ["Rangli matn", "Kamalak ranglarini 7 qatorda yozing, har birini o'z rangida bo'yang."],
        ["Ro'yxatlar", "Kundalik ishlaringizni raqamli ro'yxat, sevimli taomlaringizni belgili ro'yxat qilib yozing."],
        ["Sarlavha", "Hujjat boshiga markazda, qalin, 18 o'lchamli sarlavha qo'ying: «Mening oilam»."],
      ],
      qiyin: [
        ["Ariza", "Maktab direktori nomiga ariza yozing: o'ng yuqorida kimga, markazda «ARIZA», asosiy matn, pastda sana va imzo."],
        ["Rasmiy format", "Bir sahifalik matnni Times New Roman, 14 pt, 1.5 oraliq va ikki tomonga tekislash bilan formatlang."],
        ["PDF", "Hujjatni PDF formatida saqlang va PDF faylni ochib tekshiring."],
        ["Format nusxasi", "«Формат по образцу» (cho'tka belgisi) yordamida bir so'zning formatini boshqa 3 ta so'zga ko'chiring."],
      ],
    },
    uyga: {
      oson: [
        ["She'r", "Sevimli she'ringizni Word'da yozing, sarlavhasini markazga qo'ying."],
        ["Formatlash tugmalari", "Qalin, kursiv, tagiga chizish va tekislash uchun qisqa tugmalarni yozing."],
        ["Uch rang", "Oilangiz a'zolarini yozing, har birini boshqa rangda bo'yang."],
        ["Saqlash", "Hujjatni «Uyga vazifa 3» nomi bilan saqlang."],
      ],
      orta: [
        ["Kun tartibi", "Kun tartibingizni raqamli ro'yxat qilib yozing: vaqt qalin, ish oddiy matnda."],
        ["Xat", "Do'stingizga 2 abzatsli xat yozing: salomlashish, asosiy matn, xayrlashish."],
        ["Belgilash", "Matndagi eng muhim 5 ta so'zni sariq rang bilan belgilang (highlight)."],
      ],
      qiyin: [
        ["Referat titul varag'i", "Referat uchun titul varaq tayyorlang: maktab nomi, mavzu, bajardi, tekshirdi, shahar va yil."],
        ["Tushuntirish xati", "Darsga kelolmagan kun uchun tushuntirish xati yozing (rasmiy formatda)."],
        ["Ikki sahifa", "Sevimli kitobingiz haqida kamida 1 sahifalik matn yozing: sarlavha, 3 abzats, xulosa. Rasmiy formatda bezang."],
      ],
    },
    savollar: [
      ["Word nima uchun ishlatiladi?", "Matnli hujjatlar: ariza, xat, referat, resume tayyorlash uchun."],
      ["Word faylining kengaytmasi qanday?", ".docx"],
      ["Matnni qalin qilish tugmasi?", "Ctrl + B (Bold)."],
      ["Matnni markazga tekislash qanday?", "Ctrl + E yoki Bosh sahifadagi markazlash tugmasi."],
      ["Hujjatni PDF qilib qanday saqlanadi?", "Fayl → Saqlash kabi → fayl turi PDF."],
      ["Rasmiy hujjat uchun odatiy format qanday?", "Times New Roman, 14 pt, qatorlar oralig'i 1.5, ikki tomonga tekislash."],
    ],
  },

  {
    n: 4, title: "Word amaliyoti: jadval qo'shish, rasm qo'yish",
    maqsad: "Word hujjatiga jadval, rasm qo'shish va sahifani chiroyli tartiblashni o'rganish.",
    faoliyat: "Jadval va rasm bilan bitta to'liq hujjat tayyorlash.",
    vositalar: [
      ['Microsoft Word', '', "Insert bo'limi"],
      ['Google Docs', 'https://docs.google.com'],
    ],
    namuna: `<pre class="prompt">Jadval: Insert → Table → kerakli ustun/qator sonini tanlang
Rasm:   Insert → Pictures → fayldan rasm tanlang
Rasmni matnga moslash: rasm ustiga bosing → Layout Options</pre>`,
    rubrika: [
      ["Jadval qo'shilgan va to'ldirilgan", 4],
      ["Rasm qo'shilgan va joylashtirilgan", 3],
      ["Hujjat toza va tartibli ko'rinadi", 3],
    ],
    metod: `Amaliy dars: har o'quvchi o'zi haqida bitta "ma'lumotnoma" hujjatini (jadval + rasm) qilsin.
Rasmni internetdan olayotganda muallif huquqini eslating (bepul rasmlar: unsplash, pixabay).`,
    nazariya: `
<h3>Jadval qo'shish</h3>
<ol>
  <li><strong>Qo'shish (Вставка) → Jadval</strong>.</li>
  <li>Kerakli ustun va qatorlar sonini sichqoncha bilan tanlang (masalan, 3×5).</li>
  <li>Kataklarga matn yozing. Keyingi katakka o'tish — <strong>Tab</strong>.</li>
</ol>
<ul>
  <li><strong>Qator/ustun qo'shish</strong> — o'ng tugma → Qo'shish.</li>
  <li><strong>Kataklarni birlashtirish</strong> — bir nechta katakni tanlab, o'ng tugma → Birlashtirish.</li>
  <li><strong>Jadval dizayni</strong> — tayyor uslublar, chegara va fon rangi.</li>
</ul>
<h3>Rasm qo'yish</h3>
<ol>
  <li><strong>Qo'shish → Rasmlar → Ushbu qurilmadan</strong>.</li>
  <li>Rasmni tanlang va <strong>Qo'shish</strong>.</li>
  <li>Burchaklaridan tortib o'lchamini o'zgartiring (proporsiya saqlanadi).</li>
</ol>
<ul>
  <li><strong>Matnni o'rash (Обтекание текстом)</strong> — rasm atrofida matn qanday turishini belgilaydi: «Kvadrat», «Matn oldidan» va h.k.</li>
  <li><strong>Rasm formati</strong> — ramka, soya, kesish (обрезка).</li>
</ul>
<h3>Boshqa foydali narsalar</h3>
<ul>
  <li><strong>Shakllar</strong> (to'rtburchak, strelka), <strong>SmartArt</strong> (sxemalar), <strong>WordArt</strong> (chiroyli sarlavha).</li>
  <li><strong>Sahifa raqami</strong> — Qo'shish → Sahifa raqami.</li>
  <li><strong>Sarlavha va pastki kolontitul</strong> (Header/Footer) — har sahifada takrorlanadigan matn.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Birinchi jadval", "3 ustun, 4 qatorli jadval yarating: «Ism», «Yosh», «Shahar»."],
        ["To'ldirish", "Jadvalga 3 ta do'stingiz ma'lumotini yozing. Kataklar orasida Tab bilan o'ting."],
        ["Rasm qo'yish", "Hujjatga kompyuterdagi bitta rasmni qo'ying."],
        ["O'lcham", "Qo'yilgan rasmni burchagidan tortib kichraytiring."],
      ],
      orta: [
        ["Dars jadvali", "Haftalik dars jadvalini tuzing: kunlar ustunlarda, darslar qatorlarda."],
        ["Qator qo'shish", "Jadvalga yana 2 ta qator qo'shing va bitta ustunni o'chiring."],
        ["Jadval uslubi", "Jadvalga tayyor uslub tanlang, sarlavha qatorini qalin va rangli qiling."],
        ["Matn va rasm", "Rasm atrofida matn «Kvadrat» bo'yicha joylashadigan qiling."],
      ],
      qiyin: [
        ["Birlashtirish", "Jadvalning birinchi qatoridagi barcha kataklarni birlashtirib, unga sarlavha yozing."],
        ["Narxlar ro'yxati", "Do'kon narxlar jadvali: mahsulot, rasm (kichik), narx. Kamida 4 ta mahsulot."],
        ["Sxema", "SmartArt yordamida oila daraxti yoki kun tartibi sxemasini chizing."],
        ["Sahifa raqamlari", "3 sahifalik hujjat yarating va sahifa raqamlarini pastki markazga qo'ying."],
      ],
    },
    uyga: {
      oson: [
        ["Baholar jadvali", "5 ta fan va choraklik baholaringiz jadvalini tuzing."],
        ["Oilaviy rasm", "Oilangiz haqida 3 jumla yozing va rasm qo'ying."],
        ["Jadval chegarasi", "Jadval chegaralarini qalin va rangli qiling."],
        ["WordArt", "WordArt bilan «Mening sevimli joyim» sarlavhasini yozing."],
      ],
      orta: [
        ["Xarid ro'yxati", "Bozorlik ro'yxati jadvali: mahsulot, miqdor, taxminiy narx."],
        ["Shakllar", "To'rtburchak, doira va strelkalar bilan maktabdan uyga yo'l sxemasini chizing."],
        ["Kolontitul", "Hujjatning yuqori kolontitulida ismingiz, pastida sana tursin."],
      ],
      qiyin: [
        ["Sayohat sahifasi", "O'zbekistonning 3 ta shahri haqida sahifa: har biri uchun rasm va qisqa matn, matn rasm atrofida o'ralgan."],
        ["Taklifnoma", "Tug'ilgan kun taklifnomasi: chiroyli sarlavha, rasm, jadval ichida vaqt va manzil."],
        ["Kitob ro'yxati", "O'qigan 5 ta kitobingiz jadvali: nomi, muallif, muqova rasmi, bahoyingiz (1–5)."],
      ],
    },
    savollar: [
      ["Word'da jadval qanday qo'shiladi?", "Qo'shish (Вставка) → Jadval → ustun va qatorlar sonini tanlash."],
      ["Jadvalda keyingi katakka qanday o'tiladi?", "Tab tugmasi bilan."],
      ["Kataklar qanday birlashtiriladi?", "Kataklarni tanlab, o'ng tugma → Birlashtirish."],
      ["Rasm qanday qo'yiladi?", "Qo'shish → Rasmlar → Ushbu qurilmadan."],
      ["«Matnni o'rash» nima?", "Rasm atrofida matn qanday joylashishini belgilovchi sozlama."],
      ["Sahifa raqami qayerdan qo'yiladi?", "Qo'shish → Sahifa raqami."],
    ],
  },

  {
    n: 5, title: 'Excel asoslari: ustun/qator, formulalar',
    maqsad: "Excel jadvali tuzilishini va oddiy formulalarni (SUM, o'rtacha) o'rganish.",
    faoliyat: "Oddiy hisob-kitob jadvalini yaratib, formulalar bilan to'ldirish.",
    vositalar: [
      ['Microsoft Excel', ''],
      ['Google Sheets', 'https://sheets.google.com', "bepul, brauzerda"],
    ],
    namuna: `<p>Eng kerakli formulalar (har doim <strong>=</strong> bilan boshlanadi):</p>
<pre class="prompt">=A1+B1          ikki katak yig'indisi
=SUM(A1:A10)    ustundagi barcha sonlar yig'indisi
=AVERAGE(A1:A10) o'rtacha qiymat
=A1*B1          ko'paytirish</pre>`,
    rubrika: [
      ["Jadval ustun/qatorlari to'g'ri tuzilgan", 3],
      ["SUM va AVERAGE formulalari ishlatilgan", 4],
      ["Natija to'g'ri hisoblangan", 3],
    ],
    metod: `Formulada = belgisi majburiyligini ta'kidlang — eng ko'p uchraydigan xato shu.
Real misol oling: oylik xarajatlar jadvali — bu kattalar uchun hayotiy foydali.`,
    nazariya: `
<h3>Microsoft Excel nima?</h3>
<p><strong>Excel</strong> — jadvallar va hisob-kitoblar dasturi. Fayl kengaytmasi — <code>.xlsx</code>.</p>
<h3>Asosiy tushunchalar</h3>
<ul>
  <li><strong>Ustun</strong> — harflar bilan belgilanadi: A, B, C, ...</li>
  <li><strong>Qator</strong> — raqamlar bilan: 1, 2, 3, ...</li>
  <li><strong>Katak (yacheyka)</strong> — ustun va qator kesishmasi, manzili masalan <code>B3</code>.</li>
  <li><strong>Varaq (list)</strong> — pastdagi tab'lar; bitta faylda bir nechta varaq bo'lishi mumkin.</li>
</ul>
<h3>Formulalar</h3>
<p>Formula har doim <strong>=</strong> belgisi bilan boshlanadi.</p>
<pre>=A1+B1        qo'shish
=A1-B1        ayirish
=A1*B1        ko'paytirish
=A1/B1        bo'lish
=SUM(A1:A10)      A1 dan A10 gacha yig'indi   (СУММ)
=AVERAGE(A1:A10)  o'rtacha qiymat            (СРЗНАЧ)
=MAX(A1:A10)      eng katta                  (МАКС)
=MIN(A1:A10)      eng kichik                 (МИН)
=COUNT(A1:A10)    sonlar soni                (СЧЁТ)</pre>
<h3>Foydali usullar</h3>
<ul>
  <li><strong>Avtoto'ldirish</strong> — katak burchagidagi kichik kvadratni pastga tortish: formulalar va ketma-ketliklar (1, 2, 3 yoki Dushanba, Seshanba ...) avtomatik davom etadi.</li>
  <li><strong>Ustun kengligi</strong> — ustun harflari orasidagi chiziqni ikki marta bosish.</li>
  <li><strong>Raqam formati</strong> — pul, foiz, sana ko'rinishi.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Kataklar", "A1 ga ismingizni, B1 ga yoshingizni, C1 ga shahringizni yozing."],
        ["Manzil", "D5 katakka «Salom» yozing. Bu katak qaysi ustun va qatorda?"],
        ["Qo'shish", "A1 ga 25, B1 ga 17 yozing. C1 ga ularning yig'indisini formula bilan chiqaring."],
        ["To'rt amal", "Ikki son uchun yig'indi, ayirma, ko'paytma va bo'linmani formulalar bilan hisoblang."],
      ],
      orta: [
        ["SUM", "A1:A10 ga 10 ta son yozing va SUM bilan yig'indisini toping."],
        ["Baholar", "5 ta fan va baholaringizni yozing. AVERAGE bilan o'rtacha bahoni toping."],
        ["MAX va MIN", "Haftalik havo harorati jadvalida eng issiq va eng sovuq kunni MAX va MIN bilan toping."],
        ["Avtoto'ldirish", "A ustunida 1 dan 20 gacha sonlarni, B ustunida hafta kunlarini avtoto'ldirish bilan yozing."],
      ],
      qiyin: [
        ["Xarid hisobi", "Mahsulot, narx, miqdor ustunlari. D ustunida har birining summasi (narx × miqdor), oxirida umumiy summa."],
        ["Foiz", "Narxlar ro'yxatiga 10% chegirmali narx ustunini qo'shing."],
        ["Ko'paytirish jadvali", "1 dan 10 gacha ko'paytirish jadvalini formulalar yordamida yarating."],
        ["Bir nechta varaq", "«Yanvar» va «Fevral» varaqlarida xarajatlar yozing, uchinchi varaqda ikkala oy yig'indisini hisoblang."],
      ],
    },
    uyga: {
      oson: [
        ["Oila jadvali", "Oila a'zolari ismi va yoshi jadvalini tuzing."],
        ["Yig'indi", "5 ta sonning yig'indisini SUM bilan toping."],
        ["Formulalar", "+, −, *, / amallari uchun 4 ta formula yozing."],
        ["Ustun kengligi", "Jadvaldagi barcha ustunlarni matnga moslab kengaytiring."],
      ],
      orta: [
        ["Cho'ntak puli", "Bir haftalik xarajatlaringiz jadvali va haftalik jami summani hisoblang."],
        ["O'rtacha", "Sinfdoshlaringizning 8 ta bahosidan o'rtachasini, eng yuqori va eng past bahoni toping."],
        ["Pul formati", "Narxlar ustunini «so'm» bilan ko'rsatiladigan formatga o'tkazing."],
      ],
      qiyin: [
        ["Kommunal to'lovlar", "3 oylik gaz, svet va suv to'lovlari jadvali: har oy jami va 3 oy jami."],
        ["Jamg'arma rejasi", "Har oy 100 000 so'm yig'ilsa, 12 oy davomida jamg'arma qanday o'sishini formulalar bilan ko'rsating."],
        ["Narx o'zgarishi", "5 ta mahsulotning o'tgan oy va bu oy narxi. Farqi va o'zgarish foizini hisoblang."],
      ],
    },
    savollar: [
      ["Excel nima uchun ishlatiladi?", "Jadvallar va hisob-kitoblar uchun."],
      ["Katak manzili nimadan iborat?", "Ustun harfi va qator raqamidan, masalan B3."],
      ["Formula qaysi belgi bilan boshlanadi?", "= belgisi bilan."],
      ["Yig'indini qaysi funksiya hisoblaydi?", "SUM (СУММ)."],
      ["O'rtacha qiymat funksiyasi?", "AVERAGE (СРЗНАЧ)."],
      ["Avtoto'ldirish nima?", "Katak burchagini tortib, formula yoki ketma-ketlikni avtomatik davom ettirish."],
    ],
  },

  {
    n: 6, title: 'Excel amaliyoti: hisob-kitob jadvali, filtr',
    maqsad: "Excel'da to'liq hisob-kitob jadvali tuzish, saralash (sort) va filtrdan foydalanish.",
    faoliyat: "Oylik byudjet yoki xaridlar jadvalini yaratib, saralash va filtr qo'llash.",
    vositalar: [
      ['Microsoft Excel', ''],
      ['Google Sheets', 'https://sheets.google.com'],
    ],
    namuna: `<pre class="prompt">Saralash: ustunni belgilang → Data → Sort (A→Z yoki kattadan kichikka)
Filtr:    Data → Filter → ustun tepasidagi strelkadan kerakli qiymatni tanlang
Jami:     oxirgi qatorda =SUM(...) bilan umumiy summani chiqaring</pre>`,
    rubrika: [
      ["To'liq jadval tuzilgan (kamida 6 qator)", 3],
      ["Saralash (sort) qo'llangan", 3],
      ["Filtr ishlatilgan va jami hisoblangan", 4],
    ],
    metod: `Hayotiy loyiha bering: oilaviy oylik byudjet yoki do'kon xaridlari jadvali.
Filtr va saralash — Excelning eng foydali, lekin ko'pchilik bilmaydigan imkoniyati; alohida ta'kidlang.`,
    nazariya: `
<h3>Hisob-kitob jadvali qanday tuziladi?</h3>
<ol>
  <li>Birinchi qatorda <strong>sarlavhalar</strong>: Mahsulot, Narx, Miqdor, Summa.</li>
  <li>Keyingi qatorlarda ma'lumotlar.</li>
  <li><strong>Summa</strong> ustunida formula: <code>=B2*C2</code> va pastga avtoto'ldirish.</li>
  <li>Oxirgi qatorda <strong>Jami</strong>: <code>=SUM(D2:D10)</code>.</li>
</ol>
<h3>Jadvalni chiroyli qilish</h3>
<ul>
  <li>Chegaralar (Границы) — barcha kataklar uchun.</li>
  <li>Sarlavha qatori — qalin, fon rangi.</li>
  <li><strong>Jadval sifatida formatlash</strong> — tayyor uslub va avtomatik filtr.</li>
</ul>
<h3>Saralash va filtr</h3>
<ul>
  <li><strong>Saralash</strong> — ma'lumotlarni alifbo yoki son bo'yicha tartiblash (o'sish / kamayish).</li>
  <li><strong>Filtr</strong> — faqat kerakli qatorlarni ko'rsatish. <em>Ma'lumotlar → Filtr</em> — sarlavhalarda strelkalar paydo bo'ladi.</li>
  <li>Masalan: faqat «Toshkent» dagi o'quvchilar yoki faqat 5 baho olganlar.</li>
</ul>
<h3>Shartli formula va formatlash</h3>
<pre>=IF(B2>=60; "O'tdi"; "Yiqildi")     (ЕСЛИ)
Shartli formatlash: Bosh sahifa → Условное форматирование
  masalan, 5 baholarni yashil, 2 baholarni qizil qilish</pre>
<h3>Diagramma</h3>
<p>Ma'lumotlarni tanlab, <strong>Qo'shish → Diagramma</strong> (ustunli, doiraviy, chiziqli).</p>`,
    amaliyot: {
      oson: [
        ["Sarlavhalar", "Do'kon jadvali uchun sarlavhalar yozing: Mahsulot, Narx, Miqdor, Summa. Ularni qalin qiling."],
        ["Ma'lumotlar", "Jadvalga 6 ta mahsulot kiriting."],
        ["Summa", "Summa ustunini formula va avtoto'ldirish bilan to'ldiring."],
        ["Chegaralar", "Jadvalning barcha kataklariga chegara qo'ying."],
      ],
      orta: [
        ["Jami", "Jadval oxirida umumiy summani SUM bilan hisoblang."],
        ["Saralash", "Mahsulotlarni narx bo'yicha qimmatdan arzonga saralang."],
        ["Filtr", "Filtr qo'shing va faqat miqdori 5 dan katta mahsulotlarni ko'rsating."],
        ["Jadval uslubi", "«Jadval sifatida formatlash» bilan tayyor uslub tanlang."],
      ],
      qiyin: [
        ["O'tdi-yiqildi", "10 ta o'quvchi va ballari. IF bilan «O'tdi» (60 va undan yuqori) yoki «Yiqildi» deb yozing."],
        ["Shartli formatlash", "Ballar ustunida 90 dan yuqorilar yashil, 60 dan pastlar qizil bo'lsin."],
        ["Diagramma", "Mahsulotlar summasi bo'yicha ustunli diagramma yarating."],
        ["Shahar filtri", "O'quvchilar jadvaliga «Shahar» ustunini qo'shing va faqat bitta shahar o'quvchilarini filtrlang."],
      ],
    },
    uyga: {
      oson: [
        ["Kitoblar", "O'qigan 8 ta kitobingiz jadvali: nomi, muallif, sahifalar soni."],
        ["Alifbo bo'yicha", "Kitoblarni nomi bo'yicha alifbo tartibida saralang."],
        ["Jami sahifa", "Barcha kitoblardagi jami sahifalar sonini hisoblang."],
        ["Bezash", "Jadval sarlavhasiga fon rangi bering va chegaralar qo'ying."],
      ],
      orta: [
        ["Oylik xarajat", "Bir oylik oila xarajatlari jadvali: sana, nima uchun, summa. Jami va o'rtacha kunlik xarajat."],
        ["Kategoriya filtri", "Xarajatlarga «Kategoriya» (oziq-ovqat, transport, ...) ustunini qo'shing va filtr bilan har birini alohida ko'ring."],
        ["Doiraviy diagramma", "Xarajatlar kategoriyalari bo'yicha doiraviy diagramma yarating."],
      ],
      qiyin: [
        ["Sinf jurnali", "10 o'quvchi, 4 fan. Har o'quvchi uchun o'rtacha ball, IF bilan «A'lochi» (o'rtacha 4.5+) belgisi."],
        ["Eng yaxshi uchlik", "Sinf jurnalini o'rtacha ball bo'yicha saralang va eng yaxshi 3 o'quvchini shartli formatlash bilan ajrating."],
        ["Do'kon hisoboti", "Haftalik savdo jadvali (kun, mahsulot, soni, narxi). Har kun jami, eng ko'p sotilgan mahsulot va chiziqli diagramma."],
      ],
    },
    savollar: [
      ["Saralash va filtr farqi nima?", "Saralash tartibni o'zgartiradi, filtr esa faqat kerakli qatorlarni ko'rsatadi."],
      ["Filtr qayerdan yoqiladi?", "Ma'lumotlar → Filtr."],
      ["IF funksiyasi nima qiladi?", "Shartni tekshiradi va rost/yolg'on holatlar uchun turli natija qaytaradi."],
      ["Shartli formatlash nima?", "Katak qiymatiga qarab uning rangini avtomatik o'zgartirish."],
      ["Diagramma qanday yaratiladi?", "Ma'lumotlarni tanlab, Qo'shish → Diagramma."],
      ["Summa ustuni uchun formula qanday yoziladi?", "Masalan =B2*C2 va pastga avtoto'ldiriladi."],
    ],
  },

  {
    n: 7, title: 'PowerPoint asoslari: slayd, dizayn, animatsiya',
    maqsad: "PowerPoint'da slayd yaratish, dizayn va animatsiya qo'shishni o'rganish.",
    faoliyat: "5 slaydli kichik taqdimot tayyorlash.",
    vositalar: [
      ['Microsoft PowerPoint', ''],
      ['Canva', 'https://www.canva.com', "bepul chiroyli shablonlar"],
      ['Gamma', 'https://gamma.app', "AI yordamida matndan taqdimot"],
    ],
    namuna: `<pre class="prompt">Yangi slayd:   Home → New Slide
Dizayn:        Design → tayyor mavzulardan tanlang
Animatsiya:    obyektni belgilang → Animations → effekt tanlang
Namoyish:      F5 (boshdan) yoki Shift+F5 (shu slayddan)</pre>
<p>Maslahat: bitta slaydda ko'p matn emas, 3–5 so'zli qisqa tezis bo'lsin.</p>`,
    rubrika: [
      ["5 slayd yaratilgan, tuzilma mantiqiy", 4],
      ["Dizayn toza va bir xil uslubda", 3],
      ["Animatsiya o'rinli ishlatilgan", 3],
    ],
    metod: `Ko'p uchraydigan xato — slaydni matnga to'ldirish; "slayd — plakat, gap emas" qoidasini bering.
Zamonaviy qo'shimcha: Canva va Gamma bilan bir xil ishni tezroq va chiroyliroq qilish mumkinligini ko'rsating.`,
    nazariya: `
<h3>PowerPoint nima?</h3>
<p><strong>PowerPoint</strong> — taqdimot (prezentatsiya) tayyorlash dasturi. Fayl kengaytmasi — <code>.pptx</code>.</p>
<h3>Slaydlar bilan ishlash</h3>
<ul>
  <li><strong>Yangi slayd</strong> — Bosh sahifa → Yangi slayd (Ctrl + M).</li>
  <li><strong>Maket (Layout)</strong> — sarlavha slaydi, sarlavha va matn, ikki ustun va h.k.</li>
  <li>Slaydlarni chap paneldan sudrab tartibini o'zgartirish, o'chirish (Delete), nusxalash.</li>
</ul>
<h3>Dizayn</h3>
<ul>
  <li><strong>Dizayn tab'i</strong> — tayyor mavzular (temalar) va rang variantlari.</li>
  <li><strong>Fon</strong> — rang yoki rasm.</li>
  <li>Yaxshi slayd qoidasi: <em>kam matn, katta shrift, bitta asosiy fikr, sifatli rasm</em>.</li>
</ul>
<h3>Animatsiya va o'tishlar</h3>
<ul>
  <li><strong>O'tishlar (Переходы)</strong> — bir slayddan ikkinchisiga o'tish effekti.</li>
  <li><strong>Animatsiya</strong> — slayd ichidagi matn yoki rasmning paydo bo'lishi, harakati.</li>
  <li>Animatsiyani me'yorida ishlating — ko'p bo'lsa chalg'itadi.</li>
</ul>
<h3>Ko'rsatish</h3>
<pre>F5            — boshidan ko'rsatish
Shift + F5    — joriy slayddan
Esc           — ko'rsatishdan chiqish
→ / Probel    — keyingi slayd</pre>`,
    amaliyot: {
      oson: [
        ["Sarlavha slaydi", "Yangi taqdimot oching va sarlavha slaydiga «Mening maktabim» va ismingizni yozing."],
        ["Yangi slaydlar", "Yana 3 ta slayd qo'shing."],
        ["Dizayn", "Dizayn tab'idan mavzu tanlang."],
        ["Ko'rsatish", "F5 bilan taqdimotni ko'rsating va Esc bilan chiqing."],
      ],
      orta: [
        ["Matn va rasm", "Har bir slaydga sarlavha, 3 ta qisqa punkt va rasm qo'ying."],
        ["O'tishlar", "Barcha slaydlarga bir xil o'tish effekti qo'llang."],
        ["Animatsiya", "Ikkinchi slayddagi punktlar birma-bir paydo bo'ladigan animatsiya qo'ying."],
        ["Tartib", "Slaydlar tartibini o'zgartiring, keraksiz birini o'chiring."],
      ],
      qiyin: [
        ["Mavzu bo'yicha taqdimot", "«Mening sevimli hayvonim» mavzusida 5 slaydli taqdimot: sarlavha, 3 ta ma'lumot slaydi, xulosa."],
        ["Jadval va diagramma", "Bitta slaydga jadval, boshqasiga diagramma qo'ying."],
        ["Yagona uslub", "Barcha slaydlarda shrift, rang va joylashuv bir xil bo'lsin."],
        ["Taqdimot qilish", "Tayyorlagan taqdimotingizni sinfga 2 daqiqada gapirib bering."],
      ],
    },
    uyga: {
      oson: [
        ["3 slayd", "«Mening oilam» mavzusida 3 slaydli taqdimot tayyorlang."],
        ["Qisqa tugmalar", "PowerPoint uchun 4 ta qisqa tugmani yozing."],
        ["Fon", "Slayd foniga rasm qo'ying."],
        ["Saqlash", "Taqdimotni ismingiz papkasiga saqlang."],
      ],
      orta: [
        ["Shahrim", "O'z shahringiz haqida 5 slaydli taqdimot: tarixi, mashhur joylari, rasmlar."],
        ["Animatsiya tanlash", "Har slaydga mos animatsiya tanlang, lekin 2 tadan ko'p bo'lmasin."],
        ["Yaxshi slayd qoidalari", "Yaxshi slaydning 5 ta qoidasini yozing."],
      ],
      qiyin: [
        ["Kasb taqdimoti", "Kelajakdagi kasbingiz haqida 7 slaydli taqdimot: nima uchun, qanday bilimlar kerak, qayerda o'qiladi."],
        ["Video bilan", "Taqdimotga qisqa video yoki ovoz qo'shing."],
        ["PDF va ko'rsatish", "Taqdimotni PDF qilib saqlang va oilangizga ko'rsating."],
      ],
    },
    savollar: [
      ["PowerPoint nima uchun kerak?", "Taqdimot (prezentatsiya) tayyorlash uchun."],
      ["Yangi slayd qanday qo'shiladi?", "Bosh sahifa → Yangi slayd yoki Ctrl + M."],
      ["O'tish va animatsiya farqi nima?", "O'tish — slaydlar orasidagi effekt, animatsiya — slayd ichidagi obyektlar effekti."],
      ["Taqdimotni boshidan ko'rsatish tugmasi?", "F5."],
      ["Yaxshi slayd qanday bo'lishi kerak?", "Kam matn, katta shrift, bitta asosiy fikr, sifatli rasm."],
      ["Ko'rsatishdan qanday chiqiladi?", "Esc tugmasi bilan."],
    ],
  },

  {
    n: 8, title: "Amaliy mashg'ulot: Word, Excel, PPT ishlash", tag: 'amaliy',
    maqsad: "Word, Excel va PowerPoint ko'nikmalarini bitta amaliy loyihada birlashtirish.",
    faoliyat: "Tanlangan mavzuda hujjat + jadval + taqdimot tayyorlash.",
    vositalar: [
      ['Microsoft Office', ''],
      ['Google Docs/Sheets/Slides', 'https://drive.google.com', "bepul muqobil"],
      ['Canva', 'https://www.canva.com'],
    ],
    namuna: `<p>Loyiha misoli: "Mening oyligim va xarajatlarim"</p>
<pre class="prompt">1) Word — qisqa tavsif (men kimman, nima haqida)
2) Excel — oylik xarajatlar jadvali + jami (SUM)
3) PowerPoint — 4 slaydda natijani taqdim et</pre>`,
    rubrika: [
      ["Word hujjati tayyor va formatlangan", 3],
      ["Excel jadvali formula bilan ishlaydi", 4],
      ["Taqdimot toza va tushunarli", 3],
      ["Fayllar to'g'ri nomlangan va bitta papkada", 2],
      ["Mustaqil bajarilgani", 3],
    ],
    metod: `Yakuniy amaliy ish — 1-oy ko'nikmalarini baholaydi (jami 15 ball).
Mavzuni o'quvchi o'zi tanlasin (hayotiy, qiziqarli bo'lsin). Vaqtni 3 qismga bo'ling.
Har kim o'z ishini qisqa namoyish qilsa — ishonch va og'zaki ko'nikma rivojlanadi.`,
    nazariya: `
<h3>Mashg'ulot maqsadi</h3>
<p>Birinchi oyda o'rganilgan barcha dasturlarni bitta loyihada birlashtirish: <strong>Word</strong> — hisobot, <strong>Excel</strong> — hisob-kitob, <strong>PowerPoint</strong> — taqdimot.</p>
<h3>Loyiha: «Sinf sayohati»</h3>
<ol>
  <li><strong>Excel</strong>: sayohat xarajatlari jadvali (transport, ovqat, chipta) — har bir o'quvchiga qancha tushadi.</li>
  <li><strong>Word</strong>: sayohat rejasi — sarlavha, kun tartibi (ro'yxat), xarajatlar jadvali, rasm.</li>
  <li><strong>PowerPoint</strong>: 5 slaydli taqdimot — qayerga, nima ko'ramiz, qancha turadi, xulosa.</li>
</ol>
<h3>Baholash mezonlari</h3>
<ul>
  <li>Fayllar to'g'ri nomlangan va bitta papkada saqlangan.</li>
  <li>Excel'da formulalar ishlatilgan (qo'lda hisoblanmagan).</li>
  <li>Word hujjati toza formatlangan: sarlavha, ro'yxat, jadval, rasm.</li>
  <li>Taqdimot qisqa va tushunarli, bir xil uslubda.</li>
</ul>`,
    amaliyot: {
      oson: [
        ["Loyiha papkasi", "«Sinf sayohati» papkasini yarating va unda 3 ta bo'sh fayl oching: Word, Excel, PowerPoint."],
        ["Xarajatlar ro'yxati", "Excel'da xarajat turlari va narxlarini yozing."],
        ["Reja sarlavhasi", "Word'da sarlavha va sayohat sanasini yozing."],
        ["Birinchi slayd", "PowerPoint'da sarlavha slaydini tayyorlang."],
      ],
      orta: [
        ["Jami xarajat", "Excel'da jami xarajatni SUM bilan va bir kishiga tushadigan summani formula bilan hisoblang."],
        ["Kun tartibi", "Word'da sayohat kun tartibini raqamli ro'yxat qilib yozing."],
        ["Jadvalni ko'chirish", "Excel jadvalini nusxalab, Word hujjatiga joylashtiring."],
        ["Rasm", "Word va PowerPoint'ga sayohat joyining rasmini qo'ying."],
      ],
      qiyin: [
        ["Diagramma", "Excel'da xarajatlar bo'yicha doiraviy diagramma yarating va uni taqdimotga qo'ying."],
        ["To'liq taqdimot", "5 slaydli taqdimotni yakunlang: o'tishlar va me'yoriy animatsiya bilan."],
        ["PDF", "Word hujjatini PDF qilib saqlang."],
        ["Himoya", "Loyihangizni 3 daqiqada taqdim eting va savollarga javob bering."],
      ],
    },
    uyga: {
      oson: [
        ["Tekshirish", "Loyiha fayllari ochilishini va to'g'ri nomlanganini tekshiring."],
        ["Xatolar", "Word hujjatidagi imlo xatolarini tuzating."],
        ["Formulalar", "Excel'dagi barcha hisoblar formulada ekanini tekshiring."],
        ["Slaydlar", "Taqdimotdagi matnni qisqartiring: har slaydda 4 punktdan ko'p bo'lmasin."],
      ],
      orta: [
        ["Tug'ilgan kun loyihasi", "Tug'ilgan kun uchun: Excel'da xarajatlar, Word'da taklifnoma, PowerPoint'da 3 slaydli tabrik."],
        ["Arxiv", "Loyiha papkasini ZIP arxivga siqing."],
        ["Fikr", "Qaysi dastur sizga eng oson va qaysi qiyin bo'ldi? 5 jumlada yozing."],
      ],
      qiyin: [
        ["Oilaviy byudjet loyihasi", "Excel'da oylik daromad va xarajatlar, Word'da qisqa tahlil (qayerda tejash mumkin), PowerPoint'da natijalar taqdimoti."],
        ["Diagrammali hisobot", "Word hujjatiga Excel diagrammasini qo'shib, ostiga xulosa yozing."],
        ["O'qituvchiga yuborish", "Loyiha arxivini o'qituvchiga Telegram yoki e-pochta orqali yuboring."],
      ],
    },
    savollar: [
      ["Excel jadvalini Word'ga qanday o'tkaziladi?", "Jadvalni nusxalab (Ctrl + C), Word'ga joylashtirish (Ctrl + V)."],
      ["Nima uchun hisoblarni formula bilan qilish kerak?", "Ma'lumot o'zgarsa natija avtomatik yangilanadi va xato kamayadi."],
      ["Loyiha fayllarini qanday tartibda saqlash kerak?", "Bitta papkada, tushunarli nomlar bilan."],
      ["Bir nechta faylni bitta qilib yuborish usuli?", "ZIP arxiv qilish."],
      ["Yaxshi taqdimotning 3 belgisini ayting.", "Qisqa matn, bir xil uslub, ko'rgazmali rasm yoki diagramma."],
    ],
  },
];
