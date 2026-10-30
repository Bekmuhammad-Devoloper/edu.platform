/* AI Prompt Engineering — 2-oy: Ilg'or prompt texnikalari va amaliyot (13–24-darslar) */
module.exports = {
  title: "2-oy: Ilg'or prompt texnikalari va amaliyot", short: "Ilg'or prompt texnikalari", icon: 'wand-magic-sparkles', cls: 'ic-oy2',
  weeks: [
    { title: "5-hafta: Ilg'or prompt texnikalari", lessons: [
      {
        n: 13, day: 'Dushanba', title: "Zero-shot prompting",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Zero-shot — hech qanday misol bermay, to'g'ridan-to'g'ri vazifa berish:</p>
<pre class="prompt">Bu sharhni "ijobiy", "salbiy" yoki "neytral" deb tasnifla.
Faqat bitta so'z bilan javob ber:
"Film juda zerikarli edi, oxirigacha ko'rolmadim."</pre>`,
        rubrika: [
          ["Zero-shot tushunchasi to'g'ri tushuntirilgan", 3],
          ["5 ta zero-shot prompt yozilgan va sinalgan", 4],
          ["Qachon misol kerak bo'lishi aniqlangan", 3],
        ],
        metod: `Zero-shot — eng oddiy usul va ko'p holatda yetarli; aniq ko'rsatma va format bersa, juda yaxshi ishlaydi.
Misol kerak bo'ladigan holatlarni keyingi dars (few-shot) bilan bog'lab qo'ying.`,
        maqsad: "Misolsiz, faqat aniq ko'rsatma bilan natija olish.",
        faoliyat: "5 ta zero-shot prompt yozish va test qilish.",
        nazariya: `
<h3>Zero-shot nima?</h3>
<p><strong>Zero-shot</strong> — AIga <em>hech qanday namuna bermasdan</em>, faqat ko'rsatma bilan vazifa berish. Zamonaviy modellar ko'p oddiy vazifalarni shunday ham yaxshi bajaradi.</p>
<pre>Quyidagi sharhning kayfiyatini aniqla: ijobiy, salbiy yoki neytral.
Faqat bitta so'z bilan javob ber.
Sharh: "Kitob qiziq edi, lekin oxiri zerikarli tugadi."</pre>
<h3>Zero-shot qachon yaxshi ishlaydi?</h3>
<ul>
  <li>Oddiy, keng tarqalgan vazifalar: tarjima, qisqartirish, tasniflash, tushuntirish.</li>
  <li>Natija formati oddiy bo'lganda.</li>
</ul>
<h3>Qachon yetarli emas?</h3>
<ul>
  <li>Maxsus format yoki uslub kerak bo'lsa.</li>
  <li>Sizning shaxsiy qoidalaringiz bo'yicha tasniflash kerak bo'lsa — bunda <strong>few-shot</strong> (keyingi dars) yordam beradi.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Tasniflash", "5 ta gapni «fakt» yoki «fikr» ga ajratuvchi zero-shot prompt yozing."],
            ["Tarjima", "3 ta jumlani zero-shot prompt bilan inglizchaga tarjima qildiring va tekshiring."],
            ["Kayfiyat", "5 ta qisqa sharhning kayfiyatini zero-shot bilan aniqlating."],
          ],
          orta: [
            ["5 ta zero-shot", "Turli vazifalar (qisqartirish, tasniflash, tushuntirish, tarjima, savol tuzish) uchun 5 ta zero-shot prompt yozing va natijani baholang."],
            ["Faqat javob", "AI izohsiz, faqat bitta so'z yoki raqam bilan javob berishi uchun prompt yozing."],
            ["Muvaffaqiyatsizlik", "Zero-shot yaxshi ishlamagan bitta vazifani toping va sababini yozing."],
          ],
          qiyin: [
            ["Murakkab tasniflash", "10 ta hayvonni «uy hayvoni / yovvoyi / suv hayvoni» ga ajrating. Xatolar bo'lsa, faqat ko'rsatmani aniqlashtirish bilan tuzating."],
            ["Solishtirish", "Bir xil zero-shot promptni 2 ta turli AIga bering va aniqligini solishtiring."],
          ],
        },
        uyga: {
          oson: [
            ["3 ta zero-shot", "Uy uchun foydali 3 ta zero-shot prompt yozing va sinang."],
            ["AI jurnali", "Zero-shot natijalarini 1–5 bahoda jurnalga yozing."],
          ],
          orta: [
            ["Fan bo'yicha", "Bir fandan 10 ta atamani zero-shot bilan oddiy tilda tushuntirtiring."],
            ["Xatoni tekshirish", "Natijalardan bittasini darslik bilan tekshiring."],
          ],
          qiyin: [
            ["Chegaralar", "Zero-shot bilan qila olmagan bitta vazifani yozing va keyingi darsda few-shot bilan sinash uchun saqlab qo'ying."],
            ["Shablon", "O'zingiz uchun universal zero-shot shablonini tuzing."],
          ],
        },
        savollar: [
          ["Zero-shot prompting nima?", "Namunasiz, faqat ko'rsatma bilan vazifa berish."],
          ["Zero-shot qachon yaxshi ishlaydi?", "Oddiy, keng tarqalgan vazifalarda va oddiy formatda."],
          ["Zero-shot qachon yetarli emas?", "Maxsus format, uslub yoki shaxsiy qoidalar kerak bo'lganda."],
          ["AI faqat bitta so'z bilan javob berishi uchun nima yozamiz?", "«Faqat bitta so'z bilan javob ber, izoh berma»."],
        ],
      },
      {
        n: 14, day: 'Chorshanba', title: "Few-shot prompting (misollar bilan)",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Few-shot — bir nechta misol berib, namunani "o'rgatish":</p>
<pre class="prompt">So'zni emoji bilan almashtir. Misollar:
quyosh -> ☀️
yurak -> ❤️
mushuk -> 🐱
Endi: yulduz -> ?</pre>`,
        rubrika: [
          ["Few-shot va zero-shot farqi yozilgan", 3],
          ["2–3 misolli few-shot prompt tuzilgan", 4],
          ["Misollar natijani yaxshilagani ko'rsatilgan", 3],
        ],
        metod: `Few-shotni "AIga misol bilan o'rgatish" deb tushuntiring — bu bolalar o'rganishiga o'xshaydi.
2–3 ta aniq, bir xil formatdagi va sifatli misol eng yaxshi ishlaydi.`,
        maqsad: "Namunalar yordamida AI javobining aniqligini oshirish.",
        faoliyat: "3 ta few-shot prompt tuzish va natijani zero-shot bilan solishtirish.",
        nazariya: `
<h3>Few-shot nima?</h3>
<p><strong>Few-shot</strong> — promptga bir nechta (odatda 2–5 ta) <strong>namuna</strong> qo'shish. AI namunadagi qonuniyat va formatni ko'rib, xuddi shunday javob beradi.</p>
<pre>So'zni "mavzu" bo'yicha guruhla.
olma -> meva
sabzi -> sabzavot
nok -> meva
kartoshka -> sabzavot
uzum -> </pre>
<h3>Yaxshi namuna qoidalari</h3>
<ul>
  <li>Namunalar <strong>bir xil formatda</strong> bo'lsin.</li>
  <li><strong>Turli holatlarni</strong> qamrasin (faqat bir xil javoblar emas).</li>
  <li>Namunalar <strong>to'g'ri</strong> bo'lsin — xato namuna xato natija beradi.</li>
  <li>Oxirgi qatorni ochiq qoldiring — AI uni to'ldiradi.</li>
</ul>
<h3>Qayerda foydali?</h3>
<ul>
  <li>O'z uslubingizdagi matn (masalan, sinf gazetasi sarlavhalari).</li>
  <li>Maxsus formatdagi ma'lumot (kartochkalar, jadval qatorlari).</li>
  <li>O'zingiz o'ylab topgan tasniflash qoidalari.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Guruhlash", "Meva/sabzavot namunasidagi few-shot promptni yozing va 5 ta yangi so'z bilan sinang."],
            ["Antonimlar", "3 ta namuna bilan antonim topuvchi few-shot prompt yozing."],
            ["Format", "«So'z — ma'nosi — misol» formatida 2 ta namuna berib, 5 ta yangi so'z kartochkasini yaratting."],
          ],
          orta: [
            ["Zero vs few", "O'tgan darsda zero-shot ishlamagan vazifani few-shot bilan qayta sinab, natijani solishtiring."],
            ["3 ta few-shot", "Turli vazifalar uchun 3 ta few-shot prompt tuzing va natijalarni baholang."],
            ["Xato namuna", "Ataylab bitta xato namuna qo'shib ko'ring — natija qanday o'zgardi?"],
          ],
          qiyin: [
            ["O'z qoidangiz", "O'zingiz o'ylab topgan tasniflash qoidasi (masalan, filmlarni «oilaviy / sarguzasht / o'quv») bo'yicha few-shot prompt yozing."],
            ["Uslub nusxasi", "Sinf gazetasi uchun 3 ta sarlavha namunasini berib, shu uslubda 5 ta yangi sarlavha yaratting."],
          ],
        },
        uyga: {
          oson: [
            ["Kartochkalar", "Ingliz tili so'zlari uchun few-shot bilan 10 ta kartochka yarating."],
            ["AI jurnali", "Zero-shot va few-shot natijalarini solishtirib yozing."],
          ],
          orta: [
            ["Matematika", "2 ta namunali masala bilan AIdan shu turdagi 5 ta yangi masala tuzdiring (javoblarsiz) va yeching."],
            ["Topishmoqlar", "3 ta topishmoq namunasi bilan 5 ta yangi topishmoq yaratting."],
          ],
          qiyin: [
            ["Namunalar sifati", "Namunalar soni (1, 3, 5) natijaga qanday ta'sir qilishini tajriba qilib yozing."],
            ["Shaxsiy uslub", "O'zingiz yozgan 3 ta jumlani namuna qilib, AIdan sizning uslubingizda yozishni so'rang. O'xshadimi?"],
          ],
        },
        savollar: [
          ["Few-shot prompting nima?", "Promptga bir nechta namuna qo'shib, AIga qonuniyat va formatni ko'rsatish."],
          ["Yaxshi namuna qoidalari?", "Bir xil format, turli holatlar, to'g'ri namunalar."],
          ["Few-shot qachon zero-shot'dan yaxshi?", "Maxsus format, uslub yoki o'z qoidalaringiz kerak bo'lganda."],
          ["Xato namuna nimaga olib keladi?", "AI ham xato natija beradi."],
        ],
      },
      {
        n: 15, day: 'Juma', title: "Chain-of-Thought (bosqichma-bosqich fikrlash)",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Bosqichma-bosqich fikrlashni so'rash murakkab masalada aniqlikni oshiradi:</p>
<pre class="prompt">Masalani bosqichma-bosqich yech, har bir qadamni ko'rsat,
yakuniy javobni eng oxirida alohida yoz:
"Do'konda 3 ta daftar 12 000 so'm. 5 ta daftar necha pul turadi?"</pre>`,
        rubrika: [
          ["Chain-of-Thought nima — tushuntirilgan", 3],
          ["Bosqichli fikrlash bilan masala yechilgan", 4],
          ["Oddiy va CoT javob solishtirilgan", 3],
        ],
        metod: `CoT murakkab (matematik, mantiqiy) masalalarda aniqlikni oshiradi; oddiy savolda shart emas.
"Bosqichma-bosqich o'yla" — foydali kalit ibora, lekin natijani baribir tekshirish kerak.`,
        maqsad: "AIdan va o'zidan mantiqiy, bosqichma-bosqich yechim talab qilish.",
        faoliyat: "Matematika masalasini CoT usulida yechish va qadamlarni tekshirish.",
        nazariya: `
<h3>Chain-of-Thought (CoT) nima?</h3>
<p>AIdan javobni darhol emas, <strong>qadam-baqadam fikrlab</strong> chiqarishni so'rash. Murakkab masalalarda xato kamayadi va har bir qadamni <em>tekshirish</em> mumkin bo'ladi.</p>
<pre>Masalani bosqichma-bosqich yech. Har qadamni raqamla va qisqa izohla.
Oxirida javobni alohida qatorda yoz.
Masala: Do'konda daftar 4 500 so'm, ruchka 2 000 so'm. Ali 3 ta daftar
va 2 ta ruchka oldi, 20 000 so'm berdi. Qancha qaytim oladi?</pre>
<h3>Zamonaviy «fikrlovchi» modellar</h3>
<p>2025–2026 yillardagi ko'p modellarda javobdan oldin ichki fikrlaydigan rejimlar bor (masalan, «Thinking», «Reasoning», «Extended thinking»). Ular murakkab masalalarda kuchliroq, lekin baribir <strong>qadamlarni tekshirish</strong> sizning vazifangiz.</p>
<h3>CoT ni o'rganish uchun ishlatish</h3>
<ul>
  <li>«Faqat birinchi qadamni ko'rsat, qolganini men qilaman».</li>
  <li>«Mening yechimimni qadam-baqadam tekshir, xato qadamni ko'rsat».</li>
  <li>«Bu masalani yechish rejasini yoz, hisoblama».</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Oddiy va CoT", "Bitta matnli masalani avval «faqat javob» bilan, keyin CoT bilan so'rang. Farqni yozing."],
            ["Qadamlarni sanash", "CoT javobidagi har qadamni o'zingiz qog'ozda tekshiring."],
            ["Reja", "AIdan masala yechimi rejasini so'rang (hisoblamasdan) va o'zingiz yeching."],
          ],
          orta: [
            ["Mening yechimim", "O'zingiz yechgan masalani AIga berib, qadam-baqadam tekshirtiring."],
            ["Mantiqiy jumboq", "Oddiy mantiqiy jumboqni (masalan, «kim qayerda yashaydi») CoT bilan yechtiring va qadamlarni tekshiring."],
            ["Xato qadam", "AI CoT javobida xato qadam topilsa, uni ko'rsatib tuzattiring."],
          ],
          qiyin: [
            ["Sokrat + CoT", "Murakkab masalani «faqat birinchi qadam» usulida, har qadamni o'zingiz qilib yeching."],
            ["Fikrlovchi rejim", "Agar mavjud bo'lsa, fikrlovchi rejimni yoqib va o'chirib bitta qiyin masalani solishtiring."],
          ],
        },
        uyga: {
          oson: [
            ["3 ta masala", "Darslikdan 3 ta masalani o'zingiz yeching, so'ng CoT bilan tekshirtiring."],
            ["AI jurnali", "CoT yordamida topilgan bitta xatoingizni yozing."],
          ],
          orta: [
            ["Hayotiy masala", "Oila xaridi yoki safar xarajatini CoT bilan hisoblatib, o'zingiz tekshiring."],
            ["Reja yozish", "Fizika yoki geometriyadan bitta masala uchun yechim rejasini oling va mustaqil yeching."],
          ],
          qiyin: [
            ["Jumboq yaratish", "O'zingiz mantiqiy jumboq o'ylab toping va AI uni CoT bilan to'g'ri yecha oladimi — sinab ko'ring."],
            ["Xulosa", "CoT qachon foydali, qachon ortiqcha ekanini 5 jumlada yozing."],
          ],
        },
        savollar: [
          ["Chain-of-Thought nima?", "AIdan javobni qadam-baqadam fikrlab chiqarishni so'rash."],
          ["CoT nima uchun foydali?", "Murakkab masalalarda xato kamayadi va qadamlarni tekshirish mumkin."],
          ["CoTni o'rganish uchun qanday ishlatish mumkin?", "Faqat birinchi qadamni so'rash yoki o'z yechimini tekshirtirish."],
          ["Fikrlovchi modellar xato qilmaydimi?", "Qiladi, qadamlarni baribir tekshirish kerak."],
        ],
      },
    ]},

    { title: "6-hafta: Maxsus sohalar uchun promptlar", lessons: [
      {
        n: 16, day: 'Dushanba', title: "Matematika va fan uchun promptlar",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "rasm yuklab masala tushuntirish"],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<pre class="prompt">Sen matematika o'qituvchisisan. Bu masalada menga javobni berma,
faqat yechish rejasini (qadamlarni) ko'rsat — men o'zim yechaman:
"..."</pre>
<p>Diqqat: AI hisobda ham xato qilishi mumkin — natijani doim tekshiring.</p>`,
        rubrika: [
          ["Fan masalasiga mos prompt yozilgan", 3],
          ["AI yechimi mustaqil tekshirilgan", 4],
          ["Xato topilsa — tuzatilgan", 3],
        ],
        metod: `Qat'iy ta'kidlang: AI hisob-kitobda ham adashadi — javobni mustaqil tekshirish shart.
"Javobni berma, rejani ko'rsat" usuli fan darslarida ham halol, ham o'rgatuvchi.`,
        maqsad: "Ilmiy masala va hodisalar uchun aniq prompt yozish.",
        faoliyat: "Fizika masalasini AIga tushuntirtirish va natijani tekshirish.",
        nazariya: `
<h3>Fan uchun yaxshi prompt</h3>
<ul>
  <li>Sinf va mavzuni ayting: «8-sinf fizika, Nyuton qonunlari».</li>
  <li>Berilganlarni aniq yozing, <strong>birliklar</strong> bilan (m, s, kg).</li>
  <li>Formula va qadamlarni so'rang (CoT).</li>
  <li>Hayotiy misol va <strong>tajriba</strong> g'oyasini so'rang.</li>
</ul>
<pre>Sen 8-sinf fizika o'qituvchisisan. Quyidagi masalani yechish uchun
qaysi formula kerakligini tushuntir va yechim qadamlarini yoz.
Berilgan: m = 2 kg, a = 3 m/s². Topish kerak: F.
Oxirida uydagi oddiy narsalar bilan qilinadigan tajriba g'oyasini ber.</pre>
<h3>Ehtiyot bo'ling</h3>
<ul>
  <li>AI arifmetikada ham xato qilishi mumkin — hisobni kalkulyatorda tekshiring.</li>
  <li>Ilmiy faktlarni darslik yoki ishonchli manba bilan solishtiring.</li>
  <li>Rasm yuklash: grafik, diagramma yoki daftardagi masalani tahlil qildirish mumkin.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Formula", "Bitta fizika formulasini AIdan hayotiy misol bilan tushuntirtiring."],
            ["Birliklar", "Birliklarsiz va birliklar bilan berilgan masalani so'rab, farqni ko'ring."],
            ["Kalkulyator", "AI bergan hisobni kalkulyatorda tekshiring."],
          ],
          orta: [
            ["Fizika masalasi", "Darslikdagi masalani rol + berilganlar + CoT bilan so'rang va natijani o'zingiz tekshiring."],
            ["Diagramma", "Darslikdagi grafik yoki diagramma rasmini yuklab, nimani ko'rsatishini tushuntirtiring."],
            ["Tajriba", "Bitta mavzu bo'yicha uyda xavfsiz qilinadigan tajriba g'oyasini so'rang va reja yozing."],
          ],
          qiyin: [
            ["Xato ovchisi", "AIga ataylab noto'g'ri berilganli masala bering. U xatoni sezdimi?"],
            ["Mavzu xaritasi", "Bitta fan bobidan AI yordamida tushunchalar xaritasini (mind map) tuzing va darslik bilan tekshiring."],
          ],
        },
        uyga: {
          oson: [
            ["Formulalar varag'i", "Bitta bob formulalarini AI bilan jadval qiling va darslik bilan tekshiring."],
            ["AI jurnali", "AI hisobida xato topgan bo'lsangiz, yozing."],
          ],
          orta: [
            ["5 ta masala", "AIdan bir mavzu bo'yicha 5 ta masala (javobsiz) so'rang va yeching."],
            ["Hayotda fan", "Kundalik hayotdagi 3 ta hodisani (masalan, kamalak) AIdan ilmiy tushuntirtiring."],
          ],
          qiyin: [
            ["Tajriba hisoboti", "Darsdagi tajriba g'oyasini kattalar nazoratida bajarib, natijasini yozing."],
            ["Prompt shabloni", "Fan masalalari uchun o'zingizning prompt shabloningizni tuzing."],
          ],
        },
        savollar: [
          ["Fan uchun yaxshi promptda nima bo'lishi kerak?", "Sinf, mavzu, berilganlar birliklar bilan, qadamlar so'rovi."],
          ["AI hisobiga to'liq ishonish mumkinmi?", "Yo'q, kalkulyator bilan tekshirish kerak."],
          ["Rasm yuklash fan darsida qanday foydali?", "Grafik, diagramma yoki masalani tahlil qildirish."],
          ["Ilmiy faktni qanday tekshiramiz?", "Darslik yoki ishonchli manba bilan solishtirib."],
        ],
      },
      {
        n: 17, day: 'Chorshanba', title: "Til va adabiyot uchun promptlar",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "ovozli rejim — suhbat mashqi"],
          ['Gemini', 'https://gemini.google.com'],
          ['Claude', 'https://claude.ai', "insho tahriri uchun"],
        ],
        namuna: `<pre class="prompt">Sen ingliz tili o'qituvchisisan. Men A2 darajadaman.
Men bilan "mening kunim" mavzusida 5 ta xabar almash,
oxirida grammatik xatolarimni ro'yxat qilib tuzat.</pre>
<p>Insho uchun: «javobni o'zing yozma — faqat 3 ta kamchilik va maslahat ber».</p>`,
        rubrika: [
          ["Til mashqi/insho uchun mos prompt", 3],
          ["AI tahririning qaysi maslahatlari qabul qilingani izohlangan", 4],
          ["Matn o'quvchiniki bo'lib qolgani (ko'chirma emas)", 3],
        ],
        metod: `Urg'u: AI insho yozib bermasin — faqat maslahat bersin; aks holda til o'rganilmaydi.
Ovozli rejimda suhbat til darslari uchun eng kuchli vosita — albatta sinang.`,
        maqsad: "Matn tahlili, tarjima va til o'rganishda AIdan foydalanish.",
        faoliyat: "She'r tahlili va AI yordamida tarjima.",
        nazariya: `
<h3>Adabiyot uchun</h3>
<ul>
  <li><strong>Tahlil</strong>: mavzu, g'oya, obrazlar, badiiy vositalar (o'xshatish, jonlantirish).</li>
  <li><strong>Savol berish</strong>: «Shu she'r bo'yicha munozara uchun 5 ta savol tuz».</li>
  <li><strong>Taqqoslash</strong>: ikki asar yoki ikki qahramonni solishtirish.</li>
</ul>
<pre>Quyidagi she'rni 7-sinf o'quvchisi uchun tahlil qil: mavzu, asosiy
g'oya, 2 ta badiiy vosita misol bilan. Fikrlarimni ham so'ra.
"""
(she'r matni)
"""</pre>
<h3>Til o'rganish uchun</h3>
<ul>
  <li><strong>Tarjima + izoh</strong>: «Tarjima qil va murakkab so'zlarni tushuntir».</li>
  <li><strong>Ovozli suhbat</strong> — talaffuz va gapirish mashqi.</li>
  <li><strong>Xatolarni tuzatish</strong>: «Matnimni tekshir, xatolarni ro'yxat qilib tushuntir».</li>
</ul>
<p class="hint">She'r va badiiy matn tarjimasida AI ma'no va ohangni yo'qotishi mumkin. Asl matnni hurmat qiling va tarjimani tahrirlang.</p>`,
        amaliyot: {
          oson: [
            ["She'r tahlili", "Darslikdagi bir she'rni AI bilan tahlil qiling: mavzu, g'oya, badiiy vosita."],
            ["Tarjima", "She'rdan 4 qatorni inglizchaga tarjima qildiring va so'zma-so'z tarjima bilan solishtiring."],
            ["Lug'at", "Matndagi 5 ta notanish so'zni AIdan izohlatib, lug'at tuzing."],
          ],
          orta: [
            ["Munozara savollari", "Bitta asar bo'yicha 5 ta munozara savoli tuzdiring va ulardan biriga o'zingiz javob yozing."],
            ["Matnimni tekshir", "O'zingiz yozgan 6–8 jumlali inshoni AIga tekshirtiring; xatolar ro'yxatini tahlil qiling."],
            ["Ovozli mashq", "Ovozli rejimda 5 daqiqa ingliz tilida biror mavzuda gaplashing."],
          ],
          qiyin: [
            ["Ikki tarjima", "Bitta she'rni ikki AIda tarjima qildirib, qaysi biri ma'noni yaxshiroq saqlaganini asoslang."],
            ["Qahramonlar", "Ikki asar qahramonini AI yordamida jadvalda solishtiring va o'z xulosangizni yozing."],
          ],
        },
        uyga: {
          oson: [
            ["Yangi so'zlar", "Kuniga 10 ta yangi inglizcha so'zni misollar bilan AIdan oling (bir hafta)."],
            ["AI jurnali", "Tarjimadagi bitta xato yoki noaniqlikni yozing."],
          ],
          orta: [
            ["Kitob tahlili", "O'qiyotgan kitobingizdan bir bobni AI bilan muhokama qiling: 3 savol bering."],
            ["Insho rejasi", "Insho uchun reja oling, inshoni esa o'zingiz yozing."],
          ],
          qiyin: [
            ["Ikki tilli she'r", "O'zingiz to'rtlik she'r yozing va AI yordamida ingliz tiliga tarjima qilib, tahrirlang."],
            ["Ovozli kundalik", "3 kun davomida ovozli rejimda 3 daqiqadan ingliz tilida kuningizni gapirib bering va o'sishingizni yozing."],
          ],
        },
        savollar: [
          ["She'r tahlilida nimalarga e'tibor beriladi?", "Mavzu, g'oya, obrazlar, badiiy vositalar."],
          ["Til o'rganishda AIning 3 ta foydasi?", "Tarjima va izoh, ovozli suhbat, xatolarni tuzatish."],
          ["Badiiy tarjimada AI qanday muammoga duch keladi?", "Ma'no va ohangni yo'qotishi mumkin."],
          ["Insho yozishda AIni halol ishlatish?", "Reja va tekshiruv uchun; matnni o'zi yozish."],
        ],
      },
      {
        n: 18, day: 'Juma', title: "Rasm va kreativ kontent uchun promptlar",
        vositalar: [
          ['ChatGPT (rasm)', 'https://chatgpt.com'],
          ['Gemini (rasm)', 'https://gemini.google.com'],
          ['Canva AI', 'https://www.canva.com', "plakat, komiks, dizayn"],
          ['Microsoft Designer', 'https://designer.microsoft.com'],
        ],
        namuna: `<p>Yaxshi rasm prompti — 5 qism: obyekt, uslub, muhit, rang/yorug'lik, detal:</p>
<pre class="prompt">Multfilm uslubidagi rasm: kitob o'qiyotgan kichkina mushuk,
kutubxonada, iliq sariq yorug'lik, yumshoq ranglar, bolalar kitobi uslubi.</pre>
<p>2026-da matndan video ham yaratiladi (masalan, Veo, Sora) — lekin natijani tanqidiy baholang.</p>`,
        rubrika: [
          ["Rasm prompti 5 qismli tuzilgan", 4],
          ["Uslub/muhitni o'zgartirib natijaga ta'siri ko'rsatilgan", 3],
          ["Mualliflik va axloq (kimnidir nusxalamaslik) tushunilgan", 3],
        ],
        metod: `Rasm promptida obyekt + uslub + muhit + yorug'lik strukturasini taxtaga yozib qo'ying.
Axloq: real odamlarning yuzini soxta holatda yaratish yoki birovning asarini nusxalash mumkin emasligini ayting.`,
        maqsad: "Rasm yaratuvchi AIlar uchun tasviriy prompt yozish.",
        faoliyat: "AI rasm yaratuvchisiga prompt berib sinash.",
        nazariya: `
<h3>Rasm yaratuvchi AIlar (2026)</h3>
<ul>
  <li>ChatGPT va Gemini ichidagi rasm yaratish, <strong>Midjourney</strong>, <strong>Adobe Firefly</strong>, <strong>Canva</strong> AI vositalari va boshqalar.</li>
  <li>Ko'p xizmatlarda yosh chegarasi bor — o'qituvchi yoki ota-ona akkaunti bilan ishlang.</li>
</ul>
<h3>Rasm promptining tuzilishi</h3>
<pre>[Obyekt] + [Harakat/holat] + [Joy] + [Uslub] + [Yorug'lik/ranglar] + [Kompozitsiya]

Misol: Qor bilan qoplangan Registon maydoni, kechqurun, issiq chiroqlar,
akvarel uslubida, yumshoq ko'k va oltin ranglar, keng burchakdan ko'rinish</pre>
<h3>Uslub so'zlari</h3>
<ul>
  <li>akvarel, multfilm, 3D, piksel-art, realistik foto, komiks, minimalizm</li>
  <li>yorug'lik: tong, quyosh botishi, neon, yumshoq yorug'lik</li>
</ul>
<h3>Odob va qoidalar</h3>
<ul>
  <li>Real odamlarning soxta rasmlarini yaratmang (deepfake) — bu zarar keltirishi mumkin.</li>
  <li>AI rasmini «haqiqiy foto» deb ko'rsatmang; kerak joyda «AI bilan yaratilgan» deb belgilang.</li>
  <li>Boshqalarning ijodini hurmat qiling.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Oddiy va tasviriy", "«Mushuk» va to'liq tasviriy prompt bilan ikki rasm yarating. Farqni yozing."],
            ["Uslublar", "Bitta mavzuni 3 xil uslubda (akvarel, multfilm, piksel-art) yarating."],
            ["Prompt qismlari", "O'qituvchi bergan rasm promptida 6 ta qismni belgilang."],
          ],
          orta: [
            ["Hikoya sahnasi", "11-darsdagi hikoyangiz uchun 2 ta sahna rasmini yarating."],
            ["Iteratsiya", "Bitta rasmni 3 marta yaxshilang: rang, joy, kompozitsiyani o'zgartirib."],
            ["Teskari prompt", "AIdan biror rasmga qarab uning promptini yozishni so'rang (rasm tahlili orqali), so'ng shu prompt bilan yangi rasm yarating."],
          ],
          qiyin: [
            ["Plakat", "Maktab tadbiri uchun AI rasmi asosida Canva'da plakat tayyorlang (matnni o'zingiz yozing)."],
            ["Odob muhokamasi", "AI rasmlari bilan bog'liq 3 ta xavf (deepfake, mualliflik, aldov) haqida guruhda muhokama qilib, qoidalar yozing."],
          ],
        },
        uyga: {
          oson: [
            ["3 ta rasm", "O'zingizga yoqqan 3 ta mavzuda rasm yarating va promptlarini saqlang."],
            ["AI jurnali", "Eng yaxshi chiqqan rasm promptini jurnalga yozing."],
          ],
          orta: [
            ["Tabriknoma", "Oila a'zoingiz uchun AI rasmli tabriknoma tayyorlang (matn sizniki)."],
            ["Uslub lug'ati", "15 ta uslub va yorug'lik so'zidan lug'at tuzing."],
          ],
          qiyin: [
            ["Mini galereya", "Bitta mavzuda 4 ta rasmdan iborat «galereya» tuzing va har biriga sarlavha yozing."],
            ["AI yoki haqiqiy?", "AI rasmini haqiqiy fotodan ajratishning 5 ta belgisini yozing."],
          ],
        },
        savollar: [
          ["Rasm promptining asosiy qismlari?", "Obyekt, harakat, joy, uslub, yorug'lik/rang, kompozitsiya."],
          ["Deepfake nima va nega xavfli?", "Real odamning soxta tasviri; aldash va zarar yetkazish uchun ishlatilishi mumkin."],
          ["AI rasmini qanday halol ishlatamiz?", "Kerak joyda «AI bilan yaratilgan» deb belgilash, haqiqiy foto deb ko'rsatmaslik."],
          ["Uslub so'zlariga misollar?", "Akvarel, multfilm, 3D, piksel-art, realistik foto."],
        ],
      },
    ]},

    { title: "7-hafta: Xavfsizlik va axloq", lessons: [
      {
        n: 19, day: 'Dushanba', title: "AI xavfsizligi: nimadan ehtiyot bo'lish kerak?",
        vositalar: [
          ['Google', 'https://www.google.com', "ma'lumotni ikki manbadan tekshirish"],
          ['Perplexity', 'https://www.perplexity.ai', "manbali javob"],
        ],
        namuna: `<p>Soxta kontent (deepfake) belgilari va tekshirish:</p>
<pre class="prompt">Bu da'vo rost yoki yolg'onligini qanday tekshirsam bo'ladi?
Qaysi ishonchli manbalardan qidirishim kerak? Ro'yxat qilib ber.</pre>
<p>Qoida: AI yaratgan rasm/video/ovoz haqiqat emasligi mumkin — manbani tekshiring.</p>`,
        rubrika: [
          ["AI xavflari (deepfake, firibgarlik, xato) sanab berilgan", 3],
          ["Tekshirish bo'yicha 3 ta amaliy qadam yozilgan", 4],
          ["Shubhali holatda kattaga aytish qoidasi tushunilgan", 3],
        ],
        metod: `2026-da eng dolzarb xavf — deepfake va AI yordamidagi firibgarlik (soxta ovoz, soxta xabar).
Qoidani o'rnating: pul, parol yoki shoshilinch so'rov kelsa — to'xtab, kattaga ayting.
Muhokama qiling: "AI hamma narsani to'g'ri aytadi" degan ishonch xavfli.`,
        maqsad: "AIning xavflari va cheklovlarini tushunish.",
        faoliyat: "Muhokama: AI qachon xato qiladi va qachon xavfli bo'lishi mumkin?",
        nazariya: `
<h3>AIning cheklovlari</h3>
<ul>
  <li><strong>Xato va o'ylab topish</strong> — ishonch bilan noto'g'ri gapirishi mumkin.</li>
  <li><strong>Eskirgan ma'lumot</strong> — model ma'lum sanagacha o'qitilgan; qidiruvsiz yangiliklarni bilmasligi mumkin.</li>
  <li><strong>Bir tomonlamalik (bias)</strong> — o'qitilgan ma'lumotdagi stereotiplarni takrorlashi mumkin.</li>
  <li><strong>His-tuyg'u yo'q</strong> — u do'st yoki psixolog emas.</li>
</ul>
<h3>Xavfli vaziyatlar</h3>
<ul>
  <li>AI nomidan aldov: soxta ovoz, soxta video (deepfake), «AI bilan pul ishlash» firibgarligi.</li>
  <li>Sog'liq, pul va huquq masalalarida faqat AIga tayanish.</li>
  <li>AI bilan juda ko'p vaqt o'tkazib, odamlar bilan muloqotni kamaytirish.</li>
</ul>
<h3>Oltin qoidalar</h3>
<ol>
  <li>Muhim ma'lumotni har doim tekshiring.</li>
  <li>Shaxsiy ma'lumot bermang.</li>
  <li>Muammo yoki qo'rquv bo'lsa — kattalarga ayting.</li>
  <li>AI — vosita, qaror sizniki.</li>
</ol>`,
        amaliyot: {
          oson: [
            ["4 ta cheklov", "AIning 4 ta cheklovini misol bilan yozing."],
            ["Yangiliklar", "AIdan qidiruvsiz «bugungi yangiliklar» ni so'rang. U nima dedi va nega?"],
            ["Xavfli yoki xavfsiz", "O'qituvchi bergan 8 ta vaziyatni baholang."],
          ],
          orta: [
            ["Bias sinovi", "AIdan «olim», «hamshira», «muhandis» rasmlari yoki tasvirlarini so'rang. Stereotip bormi? Muhokama qiling."],
            ["Muhokama", "Guruhda «AI qachon xato qiladi?» savoliga 5 ta misol to'plang."],
            ["Soxta ovoz", "AI soxta ovoz bilan qo'ng'iroq qilinsa, qanday aniqlash va himoyalanishni yozing."],
          ],
          qiyin: [
            ["Xavfsizlik plakati", "«AIdan xavfsiz foydalanish» plakatini 6 ta qoida bilan tayyorlang."],
            ["Ssenariy", "AI bilan bog'liq bitta xavfli vaziyat ssenariysini yozing va to'g'ri harakatlarni ko'rsating."],
          ],
        },
        uyga: {
          oson: [
            ["Oltin qoidalar", "4 ta oltin qoidani yod oling va oilangizga aytib bering."],
            ["AI jurnali", "AI eskirgan yoki noto'g'ri ma'lumot bergan holatni yozing."],
          ],
          orta: [
            ["Firibgarlik", "«AI bilan tez pul ishlash» reklamalarining 3 ta xavfli belgisini yozing."],
            ["Muvozanat", "Bir haftada AI bilan qancha vaqt o'tkazganingizni hisoblab, sog'lom chegarani belgilang."],
          ],
          qiyin: [
            ["Maqola", "AI xavfsizligi haqida 150 so'zlik maqola yozing (o'zingiz, AIdan faqat tekshiruv)."],
            ["Kattalar uchun", "Buvalaringiz uchun «AI soxta ovozidan ehtiyot bo'ling» eslatmasini tayyorlang."],
          ],
        },
        savollar: [
          ["AIning 3 ta cheklovi?", "Xato qilishi, eskirgan ma'lumot, bir tomonlamalik (bias)."],
          ["Bias nima?", "O'qitilgan ma'lumotdagi stereotip yoki bir tomonlamalikni takrorlash."],
          ["Deepfake bilan bog'liq xavf?", "Soxta ovoz va video orqali aldash."],
          ["Muammo bo'lsa nima qilish kerak?", "Kattalarga aytish."],
        ],
      },
      {
        n: 20, day: 'Chorshanba', title: "Yolg'on ma'lumot va hallucination",
        vositalar: [
          ['Perplexity', 'https://www.perplexity.ai', "manbalarni ko'rsatadi"],
          ['Google', 'https://www.google.com'],
          ['ChatGPT', 'https://chatgpt.com'],
        ],
        namuna: `<p>AIdan manba va ishonch darajasini so'rash:</p>
<pre class="prompt">Bu javobdagi faktlarni qayerdan olding? Har bir fakt uchun
ishonch darajangni (past/o'rta/yuqori) ko'rsat. Aniq bilmasang,
"aniq bilmayman" deb yoz.</pre>`,
        rubrika: [
          ["Hallucination nima — misol bilan tushuntirilgan", 3],
          ["AI xatosini topib, manba bilan tuzatgan", 4],
          ["Qaysi savollarda AIga ishonmaslik kerakligi aniqlangan", 3],
        ],
        metod: `Jonli ko'rsating: AIdan bilarli-bilmasdan savol so'rang (masalan, mavjud bo'lmagan kitob) — u "ishonch bilan" to'qib chiqarishi mumkin.
Xulosa: muhim fakt, sana, iqtibos — doim ikkinchi manbadan tekshiriladi.`,
        maqsad: "AI noto'g'ri yoki o'ylab topilgan javobni tanib olish va tekshirish.",
        faoliyat: "Faktni tekshirish: AI javobini Google va boshqa manbalar bilan solishtirish.",
        nazariya: `
<h3>Hallucination nima?</h3>
<p><strong>Hallucination</strong> — AI <em>mavjud bo'lmagan</em> faktlar, sanalar, kitoblar, iqtiboslar yoki havolalarni ishonch bilan «o'ylab topishi».</p>
<h3>Qachon ko'proq bo'ladi?</h3>
<ul>
  <li>Kam ma'lum mavzular, aniq raqam va sanalar.</li>
  <li>Manba, kitob yoki havola so'raganda.</li>
  <li>Savolda noto'g'ri faraz bo'lsa («Navoiy nechanchi yilda Amerikaga borgan?»).</li>
</ul>
<h3>Fakt tekshirish usullari</h3>
<ol>
  <li><strong>Lateral o'qish</strong> — boshqa ishonchli saytlarda tekshirish.</li>
  <li><strong>Manba so'rash</strong> va havolani <em>ochib</em> ko'rish.</li>
  <li><strong>Bir nechta AI</strong> javobini solishtirish (lekin bu yetarli emas).</li>
  <li>Rasmiy manbalar: darslik, ensiklopediya, rasmiy saytlar.</li>
</ol>
<pre>Foydali prompt: "Agar aniq bilmasang, 'bilmayman' de. Har bir faktga
ishonch darajangni (yuqori/o'rta/past) yoz."</pre>`,
        amaliyot: {
          oson: [
            ["Noto'g'ri faraz", "AIga noto'g'ri farazli savol bering (masalan, «Navoiy qachon Amerikaga borgan?»). U nima dedi?"],
            ["Sana tekshiruvi", "AIdan 3 ta tarixiy sana so'rab, Google va darslik bilan tekshiring."],
            ["Hallucination belgilari", "AI javobida hallucination bo'lishi mumkin bo'lgan 4 ta belgini yozing."],
          ],
          orta: [
            ["Manba ovchisi", "AIdan bitta mavzu bo'yicha 3 ta manba so'rang va har bir havolani ochib tekshiring. Nechtasi haqiqiy?"],
            ["Lateral o'qish", "AI aytgan bitta qiziq faktni 2 ta mustaqil saytda tekshiring."],
            ["Ishonch darajasi", "«Bilmasang ayt, ishonch darajangni yoz» promptini sinab, javob qanday o'zgarganini yozing."],
          ],
          qiyin: [
            ["Fakt-chek jadvali", "AI javobidagi 6 ta faktni jadvalda tekshiring: fakt, manba, to'g'ri/noto'g'ri."],
            ["Hallucination ovi", "Guruhlar AIda hallucination topishga harakat qiladi; topilgan holatlarni va sababini muhokama qiling."],
          ],
        },
        uyga: {
          oson: [
            ["3 ta tekshiruv", "AIdan olingan 3 ta faktni tekshirib, natijani jurnalga yozing."],
            ["Atama", "Hallucination nima ekanini kichik ukangizga tushunarli qilib tushuntiring."],
          ],
          orta: [
            ["Yangiliklar", "Ijtimoiy tarmoqdagi bitta «sensatsion» xabarni 2 ta ishonchli manbada tekshiring."],
            ["Perplexity va chat", "Bitta savolni manbali AI (Perplexity) va oddiy chatda so'rab, ishonchliligini solishtiring."],
          ],
          qiyin: [
            ["Fakt-chek qo'llanma", "«Fakt tekshirishning 5 qadami» qo'llanmasini tayyorlang."],
            ["Tahlil", "Hallucination nega yuz berishini (LLM ishlash usuli bilan bog'lab) 5 jumlada tushuntiring."],
          ],
        },
        savollar: [
          ["Hallucination nima?", "AI mavjud bo'lmagan fakt, manba yoki ma'lumotni ishonch bilan o'ylab topishi."],
          ["Hallucination qachon ko'proq uchraydi?", "Kam ma'lum mavzular, aniq sanalar, manba so'ralganda, noto'g'ri farazli savollarda."],
          ["Lateral o'qish nima?", "Ma'lumotni boshqa ishonchli saytlarda tekshirish."],
          ["AI bergan havolaga ishonish mumkinmi?", "Ochib tekshirmaguncha yo'q."],
        ],
      },
      {
        n: 21, day: 'Juma', title: "Shaxsiy ma'lumotlar va maxfiylik",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "Sozlamalar → ma'lumotlardan foydalanish"],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>AIga YOZILMAYDIGAN narsalar ro'yxati:</p>
<pre class="prompt">Hech qachon yozmang: to'liq ism-familiya, uy manzili, telefon,
parol, karta raqami, pasport/ID, oila a'zolari haqidagi maxfiy ma'lumot,
boshqa odamning suratini uning ruxsatisiz.</pre>`,
        rubrika: [
          ["Yozsa bo'lmaydigan 6+ ma'lumot sanab berilgan", 4],
          ["Haqiqiy ma'lumotni «niqoblash» usuli qo'llangan", 3],
          ["Sozlamalardan maxfiylikni tekshirish bajarilgan", 3],
        ],
        metod: `Amaliy qoida: topshiriqni umumlashtiring — "mening do'stim" o'rniga haqiqiy ism yozmaslik.
Ko'rsating: ko'p AIlarda suhbatni o'qitishga ishlatmaslik sozlamasi bor; uni birga toping.`,
        maqsad: "AIga nimani bermaslik kerakligini va maxfiylik sozlamalarini bilish.",
        faoliyat: "Rolli o'yin: nima yozish mumkin, nima yo'q.",
        nazariya: `
<h3>AIga yozilgan ma'lumot qayerga ketadi?</h3>
<p>Chatga yozgan matn va yuklagan fayllaringiz xizmat serverlarida saqlanishi va ba'zan modelni yaxshilash uchun ishlatilishi mumkin (sozlamalarga bog'liq). Shuning uchun <strong>maxfiy narsani yozmaslik</strong> eng xavfsiz yo'l.</p>
<h3>Hech qachon yozmang</h3>
<ul>
  <li>To'liq ism-familiya bilan birga manzil, maktab, telefon.</li>
  <li>Parollar, SMS kodlar, karta ma'lumotlari.</li>
  <li>Hujjat (pasport, guvohnoma) rasmlari.</li>
  <li>Boshqa odamlarning shaxsiy ma'lumotlari va rasmlari (ruxsatsiz).</li>
</ul>
<h3>Mumkin</h3>
<ul>
  <li>Umumiy savollar, o'quv mavzulari, ijodiy g'oyalar.</li>
  <li>«7-sinf o'quvchisiman» kabi umumiy kontekst.</li>
</ul>
<h3>Sozlamalar</h3>
<ul>
  <li>Chat tarixini o'chirish, «vaqtinchalik chat» rejimi.</li>
  <li>Ma'lumotlarni model o'qitishda ishlatishni o'chirish (xizmatga qarab).</li>
  <li>Xotira (memory) funksiyasini boshqarish.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Mumkin yoki yo'q", "O'qituvchi bergan 10 ta ma'lumotni «AIga yozish mumkin / mumkin emas» ga ajrating."],
            ["Umumiy kontekst", "Shaxsiy ma'lumotsiz, lekin foydali kontekst bilan prompt yozing."],
            ["Sozlamalar", "Bitta AI xizmatining maxfiylik sozlamalarini (o'qituvchi akkauntida) topib, nimalar borligini yozing."],
          ],
          orta: [
            ["Rolli o'yin", "Juftlikda: biri «AI» sifatida shaxsiy ma'lumot so'raydi, ikkinchisi xavfsiz javob beradi."],
            ["Anonimlashtirish", "Shaxsiy ma'lumotli matnni ismlar va raqamlarsiz qilib qayta yozing, keyin AIga bering."],
            ["Rasm qoidalari", "Do'stlaringiz rasmini AIga yuklashdan oldin nima qilish kerak? Qoidalar yozing."],
          ],
          qiyin: [
            ["Maxfiylik siyosati", "Bitta AI xizmatining maxfiylik siyosatidan 3 ta muhim qismni topib, oddiy tilda tushuntiring."],
            ["Sinf qoidalari", "Sinf uchun «AI va maxfiylik» qoidalarining 6 bandli varag'ini tayyorlang."],
          ],
        },
        uyga: {
          oson: [
            ["Ro'yxat", "AIga hech qachon yozmaslik kerak bo'lgan 6 ta ma'lumotni yozing."],
            ["AI jurnali", "Shaxsiy ma'lumotsiz qanday kontekst berganingizga misol yozing."],
          ],
          orta: [
            ["Oilaviy suhbat", "Oilangiz bilan AI va maxfiylik haqida gaplashing va ularning savollarini yozing."],
            ["Tarixni tozalash", "Ota-ona ruxsati bilan AI chat tarixini qanday o'chirishni o'rganing va bosqichlarini yozing."],
          ],
          qiyin: [
            ["Plakat", "«AIga nima yozmaymiz» plakatini tayyorlang."],
            ["Vaziyat tahlili", "Maxfiy ma'lumot AIga yozilib qolsa, nima qilish kerakligini bosqichma-bosqich yozing."],
          ],
        },
        savollar: [
          ["AIga qanday ma'lumotlarni yozmaslik kerak?", "Manzil, telefon, parol, kodlar, karta, hujjatlar, boshqalarning shaxsiy ma'lumotlari."],
          ["Chatga yozgan narsalar qayerda saqlanadi?", "Xizmat serverlarida; ba'zan model yaxshilash uchun ishlatilishi mumkin."],
          ["Maxfiylikni qanday sozlash mumkin?", "Tarixni o'chirish, vaqtinchalik chat, ma'lumotdan o'qitishda foydalanishni o'chirish."],
          ["Anonimlashtirish nima?", "Matndan ism, raqam va shaxsni aniqlovchi ma'lumotlarni olib tashlash."],
        ],
      },
    ]},

    { title: "8-hafta: Loyiha va amaliyot", lessons: [
      {
        n: 22, day: 'Dushanba', title: "Mini-loyiha: AI yordamida maqola yozish", tag: 'loyiha',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai', "reja va tahrir"],
          ['Perplexity', 'https://www.perplexity.ai', "faktlarni manba bilan tekshirish"],
        ],
        namuna: `<p>Maqola rejasini AI bilan tuzish (yozishni o'zingiz qilasiz):</p>
<pre class="prompt">"Sog'lom ovqatlanish" mavzusida 5-sinf uchun maqola rejasini tuz:
sarlavha, kirish, 3 ta asosiy fikr (har biriga 1 misol), xulosa.
Matnni o'zim yozaman — faqat reja ber.</pre>`,
        rubrika: [
          ["Mavzu va reja mustaqil tanlangan", 3],
          ["Asosiy matn o'quvchiniki (AI faqat yordamchi)", 6],
          ["Faktlar manbadan tekshirilgan", 4],
          ["AI hissasi ochiq ko'rsatilgan", 2],
          ["Imlo, tuzilma, ravonlik", 5],
        ],
        metod: `Loyiha 2 darsga mo'ljallangan (maqola + taqdimot). Baho mezoni jami 20 ball.
Qoida: AI reja va tahrir beradi, asosiy matnni o'quvchi yozadi; to'liq ko'chirma qabul qilinmaydi.
Har bir faktni Perplexity yoki Google bilan tekshirishni talab qiling.`,
        maqsad: "AI bilan hamkorlikda halol va sifatli maqola yaratish.",
        faoliyat: "Sevimli mavzuda 300 so'zlik maqola.",
        nazariya: `
<h3>Ish tartibi</h3>
<ol>
  <li><strong>Mavzu tanlash</strong> — o'zingiz qiziqqan mavzu.</li>
  <li><strong>Izlanish</strong> — AI va ishonchli manbalar bilan faktlar to'plash, <em>tekshirish</em>.</li>
  <li><strong>Reja</strong> — kirish, 2–3 asosiy qism, xulosa (AI bilan muhokama).</li>
  <li><strong>Qoralama</strong> — matnni <strong>o'zingiz</strong> yozasiz.</li>
  <li><strong>Tahrir</strong> — AI imlo, ravonlik va tuzilish bo'yicha maslahat beradi.</li>
  <li><strong>Manbalar va AI izohi</strong> — oxirida manbalar va AI qanday yordam bergani.</li>
</ol>
<h3>Baholash</h3>
<ul>
  <li>Faktlar to'g'ri va tekshirilgan (manbalar bor).</li>
  <li>Tuzilish aniq, 280–320 so'z.</li>
  <li>Matn sizning ovozingizda.</li>
  <li>AI hissasi ochiq ko'rsatilgan.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Mavzu", "3 ta mavzu variantini yozing va AI bilan muhokama qilib, bittasini tanlang."],
            ["Savollar", "Maqolangiz javob beradigan 5 ta savolni yozing."],
            ["Reja", "AI bilan kirish, 3 qism va xulosadan iborat reja tuzing."],
          ],
          orta: [
            ["Faktlar", "AIdan 6 ta fakt oling va har birini ishonchli manbada tekshiring."],
            ["Qoralama", "Rejaga ko'ra qoralamani o'zingiz yozing."],
            ["Tahrir", "AIdan «faqat maslahat ber, qayta yozma» deb tahrir takliflarini oling va qaysilarini qabul qilganingizni belgilang."],
          ],
          qiyin: [
            ["Yakuniy matn", "300 so'zlik yakuniy maqolani manbalar va AI izohi bilan tayyorlang."],
            ["Sarlavha va rasm", "Maqola uchun sarlavha variantlari va AI rasmini tayyorlang."],
          ],
        },
        uyga: {
          oson: [
            ["Tugatish", "Maqolani yakunlang va so'zlar sonini tekshiring."],
            ["AI jurnali", "Maqola jarayonida eng foydali bo'lgan promptni yozing."],
          ],
          orta: [
            ["O'qib berish", "Maqolani oila a'zoingizga o'qib bering va fikrini yozing."],
            ["Manbalar", "Manbalar ro'yxatini tartibli yozing (sayt nomi, sarlavha)."],
          ],
          qiyin: [
            ["Ikkinchi versiya", "Fikrlar asosida maqolaning ikkinchi versiyasini tayyorlang."],
            ["Refleksiya", "AI bilan yozish va yolg'iz yozish farqi haqida 6 jumla yozing."],
          ],
        },
        savollar: [
          ["Maqola yozish bosqichlari?", "Mavzu, izlanish, reja, qoralama, tahrir, manbalar va AI izohi."],
          ["Maqolada matnni kim yozadi?", "O'quvchining o'zi; AI maslahat va tahrirda yordam beradi."],
          ["Faktlarni nima qilish kerak?", "Ishonchli manbalar bilan tekshirish."],
          ["AI izohi nima?", "AI qaysi bosqichda va qanday yordam bergani haqida ochiq yozuv."],
        ],
      },
      {
        n: 23, day: 'Chorshanba', title: "Mini-loyiha: AI bilan taqdimot tayyorlash", tag: 'loyiha',
        vositalar: [
          ['Canva', 'https://www.canva.com', "slayd dizayni va shablonlar"],
          ['Gamma', 'https://gamma.app', "matndan avtomatik taqdimot"],
          ['ChatGPT', 'https://chatgpt.com', "slayd matni va tezislar"],
        ],
        namuna: `<pre class="prompt">Maqolam asosida 6 ta slaydlik taqdimot rejasini tuz.
Har slaydga: sarlavha + 3 ta qisqa band (gap emas).
Matnni qisqa va o'qilishi oson qil.</pre>
<p>Dizaynni Canva yoki Gamma'da tayyorlang, matnni o'zingiz tekshiring.</p>`,
        rubrika: [
          ["6–8 slayd, tuzilma mantiqiy", 4],
          ["Slaydlar qisqa, o'qilishi oson (gap emas, tezis)", 4],
          ["Dizayn toza va bir xil uslubda", 4],
          ["Og'zaki taqdimot (ravon, vaqtga mos)", 5],
          ["Savollarga javob", 3],
        ],
        metod: `Taqdimot — loyihaning ikkinchi qismi; og'zaki himoyaga alohida e'tibor bering.
Gamma matndan tez taqdimot yasaydi, lekin matnni o'quvchi o'zi tekshirsin va qisqartirsin.
Qoida: slaydda jumla emas, 3–5 so'zli tezis bo'lsin.`,
        maqsad: "Taqdimot tayyorlashda AI vositalaridan foydalanish.",
        faoliyat: "Canva va AI yordamida slaydlar tayyorlash.",
        nazariya: `
<h3>AI bilan taqdimot</h3>
<ul>
  <li><strong>Reja va matn</strong>: AI slaydlar rejasini taklif qiladi (sarlavha + 3 punkt).</li>
  <li><strong>Dizayn</strong>: Canva, Google Slides, PowerPoint Designer/Copilot — shablon va dizayn takliflari.</li>
  <li><strong>Rasmlar</strong>: AI rasm generatori yoki litsenziyasi ochiq rasmlar.</li>
  <li><strong>Nutq</strong>: AI bilan nutq rejasini tayyorlash va mashq qilish (ovozli rejim).</li>
</ul>
<h3>Yaxshi slayd qoidalari</h3>
<ul>
  <li>1 slayd — 1 fikr, ko'pi bilan 3–4 punkt.</li>
  <li>Katta shrift, kontrast ranglar, sifatli rasm.</li>
  <li>Oxirgi slayd — xulosa va manbalar.</li>
</ul>
<pre>Prompt: Men 8-sinf o'quvchisiman. "22-darsdagi maqolam" asosida
6 slaydli taqdimot rejasini tuz: har slayd uchun sarlavha, 3 ta
qisqa punkt va rasm g'oyasi. Matnni qisqa va sodda qil.</pre>`,
        amaliyot: {
          oson: [
            ["Slaydlar rejasi", "Maqolangiz asosida AI bilan 6 slaydli reja tuzing."],
            ["Shablon", "Canva yoki Google Slides'da mos shablon tanlang."],
            ["Sarlavhalar", "Har slayd sarlavhasini qisqa va qiziq qiling."],
          ],
          orta: [
            ["Matn va rasm", "Har slaydga 3 punkt va mos rasm qo'ying (AI yoki ochiq litsenziyali)."],
            ["Dizayn takliflari", "Platformadagi AI dizayn vositasidan foydalanib, 2 ta variantdan birini tanlang."],
            ["Nutq rejasi", "Har slayd uchun 2–3 jumlalik nutq rejasini AI bilan tayyorlang (gapirishni o'zingiz qilasiz)."],
          ],
          qiyin: [
            ["Mashq", "Ovozli rejimda AIga taqdimotni gapirib bering va «savol beruvchi tomoshabin» rolida savollar so'rang."],
            ["Yakuniy taqdimot", "6 slaydli yakuniy taqdimotni manbalar slaydi bilan tayyorlang."],
          ],
        },
        uyga: {
          oson: [
            ["Tugatish", "Taqdimotni tugating va xatolarini tekshiring."],
            ["AI jurnali", "Taqdimotda AI eng ko'p yordam bergan joyni yozing."],
          ],
          orta: [
            ["Ovozli mashq", "Taqdimotni 3 daqiqada gapirib, telefon bilan yozib oling va tinglang."],
            ["Fikr so'rash", "Oila a'zoingizga ko'rsatib, 2 ta yaxshilash taklifini oling."],
          ],
          qiyin: [
            ["Qiyin savollar", "Taqdimot bo'yicha 5 ta qiyin savolni AIdan so'rab, javoblaringizni tayyorlang."],
            ["Qisqa versiya", "Taqdimotning 1 daqiqalik qisqa versiyasini tayyorlang."],
          ],
        },
        savollar: [
          ["AI taqdimotning qaysi qismlarida yordam beradi?", "Reja, matn, dizayn, rasmlar, nutq mashqi."],
          ["Yaxshi slayd qoidalari?", "1 slayd — 1 fikr, kam matn, katta shrift, sifatli rasm."],
          ["Nutqni kim aytadi?", "O'quvchi; AI faqat tayyorlanishga yordam beradi."],
          ["Oxirgi slaydda nima bo'lishi kerak?", "Xulosa va manbalar."],
        ],
      },
      {
        n: 24, day: 'Juma', title: "2-oy yakuniy baholash", tag: 'test',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Texnikani tanlash topshirig'iga namuna:</p>
<pre class="prompt">Vazifa: 4 ta so'zni "ot/fe'l/sifat" turkumiga ajratish.
Yechim: few-shot — 3 ta misol berib, keyin yangi so'zlarni so'rayman.
(Chunki aniq format kerak, misol bilan tushuntirish osonroq.)</pre>`,
        rubrika: [
          ["Nazariy test (zero/few-shot, CoT, xavfsizlik)", 10],
          ["Vaziyatga mos texnikani tanlab, prompt yozish", 5],
          ["Loyiha sifati (maqola + taqdimot)", 3],
          ["Xavfsizlik va halollik qoidalariga amal", 2],
        ],
        metod: `Baholash: 2-oy texnikalari (zero/few-shot, CoT), xavfsizlik va mini-loyiha birga hisobga olinadi.
Eng muhim ko'nikma — vaziyatga qarab to'g'ri texnikani tanlay olish; buni savolda sinang.`,
        maqsad: "2-oy mavzularini mustahkamlash va baholash.",
        faoliyat: "Guruh taqdimoti va fikr almashish.",
        nazariya: `
<h3>Takrorlash: 2-oy</h3>
<ul>
  <li>Zero-shot, few-shot, chain-of-thought.</li>
  <li>Fan, til va rasm uchun promptlar.</li>
  <li>AI xavfsizligi, hallucination, fakt tekshirish, maxfiylik.</li>
  <li>Mini-loyihalar: maqola va taqdimot.</li>
</ul>
<h3>Baholash tartibi</h3>
<ol>
  <li><strong>Guruh taqdimoti</strong> (har guruh 4 daqiqa): mini-loyihalardan eng yaxshisi.</li>
  <li><strong>Amaliy test</strong>: berilgan vazifalar uchun mos texnikani tanlab prompt yozish.</li>
  <li><strong>Fikr almashish</strong>: «2-oyda nima o'zgardi?»</li>
</ol>
<h3>Baholash mezonlari</h3>
<ul>
  <li>To'g'ri texnika tanlandi (zero/few/CoT).</li>
  <li>Natija tekshirildi, manbalar ko'rsatildi.</li>
  <li>Xavfsizlik va halollik qoidalariga amal qilindi.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Texnikani tanlang", "O'qituvchi bergan 5 ta vazifa uchun zero-shot, few-shot yoki CoT dan mosini tanlang va sababini yozing."],
            ["Atamalar", "Zero-shot, few-shot, CoT, hallucination, bias atamalarini tushuntiring."],
            ["Xavfsizlik", "AI bilan ishlashning 5 ta xavfsizlik qoidasini yozing."],
          ],
          orta: [
            ["Few-shot", "Berilgan vazifa uchun 3 namunali few-shot prompt yozing va natijani ko'rsating."],
            ["CoT", "Berilgan masalani CoT bilan yechtirib, har qadamni tekshiring."],
            ["Fakt-chek", "AI javobidagi 3 ta faktni tekshirib, natijani jadvalda ko'rsating."],
          ],
          qiyin: [
            ["Guruh taqdimoti", "Guruh bilan eng yaxshi mini-loyihani 4 daqiqada taqdim eting."],
            ["Fikr almashish", "Boshqa guruh taqdimotiga 2 ta kuchli tomon va 1 ta taklif yozing."],
          ],
        },
        uyga: {
          oson: [
            ["Xatolar ustida ishlash", "Testdagi xatolaringizni tahlil qilib, to'g'ri javoblarni yozing."],
            ["AI jurnali", "2-oy jurnalidan eng yaxshi 3 ta promptni tanlang."],
          ],
          orta: [
            ["Prompt kitobcha", "Prompt kitobchangizga 2-oy texnikalarini misollar bilan qo'shing."],
            ["Xulosa", "2-oyda nimani o'rgandingiz? 8–10 jumla yozing."],
          ],
          qiyin: [
            ["3-oyga tayyorgarlik", "Qiziqqan kasbingizda AI qanday ishlatilishi haqida AIdan so'rab, qisqa izoh yozing."],
            ["Loyiha g'oyasi", "Yakuniy loyiha uchun 3 ta g'oya yozing."],
          ],
        },
        savollar: [
          ["Zero-shot va few-shot farqi?", "Few-shot'da namunalar beriladi, zero-shot'da yo'q."],
          ["CoT qachon kerak?", "Murakkab, ko'p qadamli masalalarda."],
          ["Hallucination'dan qanday himoyalanamiz?", "Faktlarni ishonchli manbalarda tekshirib."],
          ["AIga nima yozmaslik kerak?", "Shaxsiy va maxfiy ma'lumotlar."],
          ["Rasm promptining asosiy qismlari?", "Obyekt, harakat, joy, uslub, yorug'lik, kompozitsiya."],
        ],
      },
    ]},
  ],
};
