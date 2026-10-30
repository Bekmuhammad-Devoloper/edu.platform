/* AI Prompt Engineering — 1-oy: AI va prompt engineering asoslari (1–12-darslar)
 * Masala: [nomi, sharti, namuna (ixtiyoriy)] — shartda `...` -> <code>...</code>
 * Savol: [savol, javob] — javob sahifada yashirin turadi */
module.exports = {
  title: "1-oy: AI va prompt engineering asoslari", short: 'AI asoslari', icon: 'robot', cls: 'ic-oy1',
  weeks: [
    { title: "1-hafta: AI dunyosiga kirish", lessons: [
      {
        n: 1, day: 'Dushanba', title: "AI nima? Qisqacha tarix",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "o'qituvchi yoki ota-ona akkaunti bilan"],
          ['Claude', 'https://claude.ai'],
          ['Gemini', 'https://gemini.google.com'],
        ],
        namuna: `<p>AI yordamchisiga shunday yozib ko'ring:</p>
<pre class="prompt">AI nima ekanini 10 yoshli bolaga, 3 ta oddiy misol bilan tushuntir.
Oxirida bitta qiziqarli fakt qo'sh.</pre>
<p>Javobdan 3 ta yangi narsani AI jurnalingizga yozing.</p>`,
        rubrika: [
          ["«AI atrofimda» — 5 ta to'g'ri misol", 3],
          ["Vaqt chizig'i: 6 sana to'g'ri joylashtirilgan", 3],
          ["AI va odam farqi aniq yozilgan", 2],
          ["AI jurnaliga birinchi yozuv kiritilgan", 2],
        ],
        metod: `Darsni "AI yoki odam?" o'yinidan boshlang: bir nechta rasmni ko'rsatib, ovoz berishni so'rang — bu qiziqish uyg'otadi.
Asosiy g'oya: AI — sehr emas, ko'p ma'lumotdan o'rgangan dastur; u xato qilishi mumkin, qaror esa odamniki.
Eng ko'p uchraydigan xato — o'quvchilar AIga shaxsiy ma'lumot (manzil, telefon) yozishi; buni boshidanoq taqiqlang.`,
        maqsad: "AI nima ekanini, qayerda uchrashini va qanday rivojlanganini tushunish.",
        faoliyat: "AI yaratgan va odam yaratgan rasmlarni solishtirish, AI vs odam muhokamasi.",
        nazariya: `
<h3>Sun'iy intellekt (AI) nima?</h3>
<p><strong>AI (Artificial Intelligence)</strong> — kompyuterga odamga xos ishlarni bajarishni o'rgatish: matnni tushunish, rasmni tanish, savolga javob berish, tarjima qilish, rasm va musiqa yaratish.</p>
<h3>AI har kuni atrofimizda</h3>
<ul>
  <li>Telefon kamerasi yuzni taniydi, rasmni chiroyli qiladi.</li>
  <li>YouTube va TikTok sizga yoqadigan videolarni tavsiya qiladi.</li>
  <li>Google Translate tarjima qiladi, xarita tirbandlikni ko'rsatadi.</li>
  <li>ChatGPT, Claude, Gemini kabi yordamchilar savolga javob beradi, matn yozadi, rasm tahlil qiladi.</li>
</ul>
<h3>Qisqacha tarix</h3>
<pre>1950 — Alan Tyuring: "Mashina fikrlay oladimi?" (Tyuring testi)
1956 — "Sun'iy intellekt" atamasi paydo bo'ldi
1997 — Deep Blue kompyuteri shaxmat chempioni Kasparovni yutdi
2012 — Chuqur o'rganish (deep learning) rasm tanishda yutuqqa erishdi
2016 — AlphaGo go o'yinida jahon chempionini yutdi
2022 — ChatGPT chiqdi: AI bilan oddiy tilda gaplashish ommalashdi
2023–2026 — Claude, Gemini va boshqalar; rasm, ovoz, video ham
            tushunadigan (multimodal) AI, AI agentlar</pre>
<h3>AI va odam</h3>
<ul>
  <li>AI juda tez o'qiydi va yozadi, lekin <strong>xato qilishi mumkin</strong> va o'zi tekshirmaydi.</li>
  <li>AIda his-tuyg'u, shaxsiy tajriba va javobgarlik yo'q — qaror qabul qiluvchi <strong>odam</strong>.</li>
  <li>Eng yaxshi natija: <em>odam + AI</em> birga ishlaganda.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["AI atrofimda", "Kundalik hayotingizda AI ishlatiladigan 5 ta joyni yozing (telefon, ilova, sayt)."],
            ["AI yoki odam?", "O'qituvchi ko'rsatgan 6 ta rasmdan qaysilari AI yaratganini taxmin qiling va sababini yozing."],
            ["Birinchi savol", "AI yordamchisiga (ChatGPT, Claude yoki Gemini) «AI nima? 10 yoshli bolaga tushuntir» deb so'rang va javobdan 3 ta yangi narsani yozing."],
          ],
          orta: [
            ["Vaqt chizig'i", "AI tarixidagi 6 ta muhim sanani vaqt chizig'i (timeline) ko'rinishida daftarga chizing."],
            ["AI vs odam", "AI odamdan yaxshiroq qiladigan 3 ta va odam yaxshiroq qiladigan 3 ta ishni jadvalga yozing. Keyin AIdan shu savolni so'rab, javoblarni solishtiring."],
            ["Savol-javob o'yini", "Juftlikda: biringiz AIdan, ikkinchingiz kitob yoki internetdan bitta savolga javob toping. Qaysi biri tezroq va qaysi biri ishonchliroq?"],
          ],
          qiyin: [
            ["Tyuring testi", "AIdan Tyuring testini tushuntirishni so'rang. Keyin o'zingiz 3 ta savol o'ylab toping: bu savollar yordamida suhbatdosh odammi yoki AI ekanini aniqlash mumkinmi?"],
            ["Muhokama", "«AI odamlarning ishini tortib oladimi?» degan savolga o'z fikringizni 5 jumlada yozing, so'ng AIdan qarshi fikrlarni so'rab, ikkala tomonni solishtiring."],
          ],
        },
        uyga: {
          oson: [
            ["Oilada AI", "Oila a'zolaringiz qaysi AI xizmatlaridan foydalanishini so'rang va ro'yxat qiling."],
            ["AI jurnali", "«AI jurnali» daftarini oching: har kuni AIga bergan bitta savolingiz, javob va unga bahongizni (1–5) yozib boring."],
          ],
          orta: [
            ["Kashfiyot", "AI tarixidagi bitta voqea (Deep Blue, AlphaGo yoki ChatGPT) haqida AIdan so'rang va 5 jumlalik qisqa matn yozing."],
            ["Ikki manba", "Shu voqea sanasini Google orqali tekshiring: AI to'g'ri aytganmi?"],
          ],
          qiyin: [
            ["Kelajak tasavvuri", "10 yildan keyin maktabda AI qanday ishlatilishini tasavvur qilib, 7–8 jumlalik hikoya yozing (o'zingiz yozing, AIdan faqat g'oya so'rashingiz mumkin)."],
            ["Plakat", "«AI nima?» mavzusida bir varaqlik plakat chizing yoki Canva'da tayyorlang."],
          ],
        },
        savollar: [
          ["AI nima?", "Kompyuterga odamga xos ishlarni (tushunish, tanish, javob berish, yaratish) bajarishni o'rgatish."],
          ["ChatGPT qachon chiqdi?", "2022-yil oxirida."],
          ["Tyuring testi nima?", "Suhbatdosh odammi yoki mashinami — ajratib bo'lmasa, mashina «fikrlay oladi» degan sinov g'oyasi."],
          ["AI xato qilishi mumkinmi?", "Ha, shuning uchun muhim javoblar tekshirilishi kerak."],
          ["Kundalik hayotda AIga 2 ta misol?", "Videolar tavsiyasi, tarjimon, kamera yuzni tanishi, chat yordamchilar."],
        ],
      },
      {
        n: 2, day: 'Chorshanba', title: "ChatGPT, Gemini, Claude bilan tanishuv",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
          ['Gemini', 'https://gemini.google.com'],
          ['Perplexity', 'https://www.perplexity.ai', "javobda manbalarni ko'rsatadi"],
          ['NotebookLM', 'https://notebooklm.google.com', "siz yuklagan hujjat asosida javob"],
        ],
        namuna: `<p>Uchala yordamchiga bir xil savolni bering va solishtiring:</p>
<pre class="prompt">Quyosh tizimidagi 8 ta sayyorani Quyoshdan uzoqligi bo'yicha,
har birini 1 jumlada, 10 yoshli bola tushunadigan tilda tanishtir.</pre>
<p>Keyin jadval tuzing: <span class="rol">vosita · tezlik · tushunarlilik · yoqqani (1–5)</span>.</p>`,
        rubrika: [
          ["5+ vosita va kompaniyasi to'g'ri yozilgan", 3],
          ["Taqqoslash jadvali to'liq to'ldirilgan", 4],
          ["Qaysi vosita qaysi ishga mosligi dalil bilan", 3],
        ],
        metod: `Imkon bo'lsa, proyektorda bitta akkauntdan jonli ko'rsating — o'quvchilar birga kuzatadi.
Yosh chegarasini eslating: ko'p xizmatlarda 13+ (ota-ona ruxsati bilan) yoki 18+; sinfda o'qituvchi/ota-ona akkaunti orqali ishlang.
Ovozli rejimni albatta sinab ko'ring — bu o'quvchilarni ayniqsa qiziqtiradi va til mashqiga foydali.`,
        maqsad: "Asosiy AI yordamchilarini bilib olish va ularni solishtira olish.",
        faoliyat: "Har bir vositani brauzerda sinab ko'rish va bir xil savol bo'yicha taqqoslash.",
        nazariya: `
<h3>Mashhur AI yordamchilari (2026)</h3>
<ul>
  <li><strong>ChatGPT</strong> (OpenAI) — chatgpt.com. Matn, rasm yaratish, ovozli suhbat, fayl tahlili.</li>
  <li><strong>Claude</strong> (Anthropic) — claude.ai. Uzun matnlar, tushuntirish, yozish, kod; ehtiyotkor va aniq javoblari bilan mashhur.</li>
  <li><strong>Gemini</strong> (Google) — gemini.google.com. Google xizmatlari (Gmail, Docs, YouTube) bilan bog'langan.</li>
  <li><strong>Microsoft Copilot</strong> — Windows va Office ichida.</li>
  <li><strong>Perplexity</strong> — manbalarni ko'rsatib javob beradigan AI qidiruv.</li>
  <li><strong>NotebookLM</strong> (Google) — o'zingiz yuklagan hujjatlar asosida javob beradi, audio-sharh tayyorlaydi.</li>
</ul>
<h3>Umumiy imkoniyatlar</h3>
<ul>
  <li><strong>Chat</strong> — savol-javob, tushuntirish, matn yozish.</li>
  <li><strong>Fayl va rasm yuklash</strong> — rasmdagi masalani tushuntirish, hujjatni qisqartirish.</li>
  <li><strong>Ovozli rejim</strong> — gaplashib suhbatlashish (til mashqi uchun ajoyib).</li>
  <li><strong>Internetdan qidirish</strong> — yangi ma'lumotlar bilan javob.</li>
</ul>
<h3>Qoidalar</h3>
<ul>
  <li>Ko'p xizmatlarda <strong>yosh chegarasi</strong> bor (ko'pincha 13+ ota-ona ruxsati bilan yoki 18+) — maktab akkaunti yoki ota-ona akkaunti bilan, ularning ruxsati bilan ishlang.</li>
  <li>Shaxsiy ma'lumotlarni (manzil, telefon, parol) yozmang.</li>
  <li>Bir xil savolga turli AI turlicha javob beradi — solishtirish foydali.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Tanishuv", "ChatGPT, Claude va Gemini saytlarini oching (o'qituvchi akkaunti bilan) va har birining bosh sahifasidagi 2 ta imkoniyatni yozing."],
            ["Bir xil savol", "Uchala yordamchiga bir xil savol bering: «Quyosh tizimidagi sayyoralarni qisqacha tanishtir»."],
            ["Ovozli rejim", "Bitta yordamchining ovozli rejimida 1 daqiqa gaplashib ko'ring."],
          ],
          orta: [
            ["Taqqoslash jadvali", "3 ta yordamchi javobini jadvalda solishtiring: tezlik, tushunarlilik, uzunlik, sizga yoqqani (1–5)."],
            ["Manbali javob", "Perplexity'dan bitta savol so'rang va javobdagi manbalarni bosib tekshiring."],
            ["Rasm tahlili", "Darslikdagi biror rasmni (masalan, xarita yoki diagramma) yordamchiga yuklab, «Bu rasmda nima bor?» deb so'rang."],
          ],
          qiyin: [
            ["Mening tanlovim", "Qaysi yordamchi qaysi ish uchun yaxshiroq (o'qish, ijod, qidiruv, til mashqi)? Dalillar bilan 5 jumla yozing."],
            ["NotebookLM", "O'qituvchi bergan bitta matnni NotebookLM'ga yuklab, unga 3 ta savol bering. Oddiy chatdan farqi nima?"],
          ],
        },
        uyga: {
          oson: [
            ["Ro'yxat", "6 ta AI yordamchi va ularni yaratgan kompaniyalarni yozing."],
            ["AI jurnali", "Bugun 2 ta turli yordamchiga bitta savol bering va javoblarini jurnalga yozib solishtiring."],
          ],
          orta: [
            ["Ota-ona bilan", "Ota-onangizga bitta yordamchini ko'rsating va ular uchun foydali savol berib ko'ring."],
            ["Til mashqi", "Ovozli rejimda 5 daqiqa ingliz tilida oddiy suhbat qiling va yangi 5 so'zni yozing."],
          ],
          qiyin: [
            ["Mini-sharh", "Eng yoqqan yordamchingiz haqida «sharh» yozing: imkoniyatlar, afzallik, kamchilik, kimga tavsiya qilasiz."],
            ["Yosh qoidalari", "Bitta AI xizmatining foydalanish shartlaridan yosh cheklovi haqidagi qismni toping va o'z so'zingiz bilan yozing."],
          ],
        },
        savollar: [
          ["3 ta mashhur AI yordamchini va kompaniyasini ayting.", "ChatGPT — OpenAI, Claude — Anthropic, Gemini — Google."],
          ["Perplexity nimasi bilan farq qiladi?", "Javobda manbalarni ko'rsatadi."],
          ["Multimodal degani nima?", "AI matndan tashqari rasm, ovoz, video bilan ham ishlay oladi."],
          ["AI xizmatlarida yosh cheklovi nega bor?", "Bolalar xavfsizligi va shaxsiy ma'lumotlarini himoya qilish uchun."],
          ["Nima uchun bir nechta AIni solishtirish foydali?", "Javoblar turlicha bo'ladi, xatoni topish osonlashadi."],
        ],
      },
      {
        n: 3, day: 'Juma', title: "AI qanday ishlaydi? (Sodda tushuntirish)",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Murakkab tushunchani soddalashtirishga misol:</p>
<pre class="prompt">Neyron tarmoq nima ekanini pitsa tayyorlash misolida,
bosqichma-bosqich va 6-sinf o'quvchisi tushunadigan tilda tushuntir.</pre>`,
        rubrika: [
          ["«Ma'lumot → model → javob» sxemasi to'g'ri chizilgan", 4],
          ["Bola va AI o'rganishi: 3 o'xshashlik topilgan", 3],
          ["AI nega xato qilishi — izohlangan", 3],
        ],
        metod: `"Keyingi so'z o'yini"ni albatta o'ynang — bu LLM ishini eng yaxshi his ettiradi.
Chuqur matematikaga kirmang; maqsad — sezgi (intuitsiya) berish, formulalar emas.
Token tushunchasini o'quvchining ismi necha bo'lakka bo'linishi misolida ko'rsating.`,
        maqsad: "Neyron tarmoq, o'qitish va til modeli haqida oddiy tushuncha olish.",
        faoliyat: "«AI qanday fikrlaydi?» sxemasini chizish.",
        nazariya: `
<h3>AI qanday o'rganadi?</h3>
<p>Bola mushukni ko'p marta ko'rib, mushuk qandayligini o'rganadi. AI ham shunday: unga <strong>juda ko'p misol</strong> (ma'lumot) ko'rsatiladi va u ulardan <strong>qonuniyatlarni</strong> topadi. Bu jarayon <strong>o'qitish (training)</strong> deyiladi.</p>
<h3>Neyron tarmoq</h3>
<p>Miyadagi neyronlardan ilhomlangan matematik tuzilma: kirish → ko'plab qatlamlar → chiqish. Har bir qatlam ma'lumotni biroz «qayta ishlaydi».</p>
<pre>Rasm (piksellar) → [qatlam] → [qatlam] → [qatlam] → "Bu mushuk" (95%)</pre>
<h3>Til modeli (LLM) qanday javob yozadi?</h3>
<ul>
  <li>LLM — <strong>katta til modeli</strong>: internetdagi ulkan matnlar asosida o'qitilgan.</li>
  <li>U javobni <strong>so'zma-so'z (aniqrog'i, token bo'yicha)</strong> yozadi: har safar «keyingi eng mos so'z qaysi?» deb taxmin qiladi.</li>
  <li>Shuning uchun u juda ravon yozadi, lekin ba'zan <strong>ishonch bilan xato</strong> gapiradi (bunga keyin «hallucination» deymiz).</li>
</ul>
<pre>"Osmon rangi ..."  →  ko'k (82%) | moviy (10%) | kulrang (5%) ...</pre>
<h3>Muhim tushunchalar</h3>
<ul>
  <li><strong>Ma'lumot (data)</strong> — AI o'rganadigan misollar.</li>
  <li><strong>Model</strong> — o'qitilgan AI «miyasi».</li>
  <li><strong>Prompt</strong> — modelga beriladigan ko'rsatma yoki savol.</li>
  <li><strong>Kontekst oynasi</strong> — model bir vaqtda «eslab» tura oladigan matn hajmi.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Sxema", "«Ma'lumot → o'qitish → model → prompt → javob» sxemasini chizing va har bir qismni bir jumlada tushuntiring."],
            ["Misol bilan o'rganish", "Bolalar qanday o'rganishi va AI qanday o'rganishi orasidagi 3 ta o'xshashlikni yozing."],
            ["AIdan so'rang", "AIdan «Neyron tarmoqni pitsa misolida tushuntir» deb so'rang va eng yoqqan qismini yozing."],
          ],
          orta: [
            ["Keyingi so'z o'yini", "Juftlikda: biri jumla boshlaydi, ikkinchisi eng mos keyingi so'zni aytadi. 5 ta jumla tuzing. Bu LLM ishiga qanday o'xshaydi?"],
            ["Token", "AIdan «token nima, misol bilan ko'rsat» deb so'rang va o'z ismingiz necha tokenga bo'linishi mumkinligini taxmin qiling."],
            ["Yaxshi va yomon ma'lumot", "Agar AI faqat mushuk rasmlari bilan o'qitilsa, it rasmini ko'rganda nima bo'ladi? Sababini yozing."],
          ],
          qiyin: [
            ["Plakat", "«AI qanday fikrlaydi?» mavzusida rasmli sxema-plakat tayyorlang (qog'ozda yoki Canva'da)."],
            ["Nega xato qiladi?", "LLMning ishlash usulidan kelib chiqib, nega u ba'zan ishonch bilan xato qilishini 4–5 jumlada tushuntiring."],
          ],
        },
        uyga: {
          oson: [
            ["Lug'at", "Ma'lumot, model, o'qitish, prompt, LLM so'zlarini o'z so'zingiz bilan tushuntiring."],
            ["AI jurnali", "AIdan bitta murakkab narsani «oddiy qilib tushuntir» deb so'rang va jurnalga yozing."],
          ],
          orta: [
            ["Oilaga tushuntirish", "Oila a'zoingizga AI qanday o'rganishini sxemangiz bilan tushuntiring va savollarini yozing."],
            ["Tasniflash", "AI rasm tanishni qanday o'rganishini 5 qadamda yozing."],
          ],
          qiyin: [
            ["Quiz", "Shu dars bo'yicha 6 savollik test tuzing (AI yordamida, lekin savollarni o'zingiz tekshirib)."],
            ["Analogiya", "AI o'rganishini o'zingiz o'ylab topgan yangi misol bilan tushuntiring (masalan, futbol yoki oshxona orqali)."],
          ],
        },
        savollar: [
          ["AI qanday o'rganadi?", "Ko'p misollar (ma'lumot) asosida qonuniyatlarni topib — o'qitish orqali."],
          ["Neyron tarmoq nima?", "Miyadan ilhomlangan, ko'p qatlamli matematik tuzilma."],
          ["LLM nima?", "Katta matnlar asosida o'qitilgan katta til modeli."],
          ["LLM javobni qanday yozadi?", "Har qadamda keyingi eng mos so'z yoki tokenni taxmin qilib."],
          ["Prompt nima?", "AIga beriladigan ko'rsatma yoki savol."],
        ],
      },
    ]},

    { title: "2-hafta: Prompt nima va u nima qiladi?", lessons: [
      {
        n: 4, day: 'Dushanba', title: "Prompt tushunchasi va turlari",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Gemini', 'https://gemini.google.com'],
        ],
        namuna: `<p>Bir xil mavzu — yomon va yaxshi prompt:</p>
<pre class="prompt">Yomon:  tarix
Yaxshi: 7-sinf o'quvchisiman. Amir Temur haqida 5 ta asosiy faktni
        sodda tilda, ro'yxat ko'rinishida yoz.</pre>
<p>Yaxshi promptning 4 qismi: <span class="rol">kontekst · vazifa · cheklov · format</span>.</p>`,
        rubrika: [
          ["Prompt turlari to'g'ri ajratilgan", 3],
          ["Yomon prompt 4 qismli qilib qayta yozilgan", 4],
          ["Ikki javob o'rtasidagi farq tahlil qilingan", 3],
        ],
        metod: `Taxtaga 4 qismni (kontekst, vazifa, cheklov, format) yozib qo'ying — butun oy shunga tayanadi.
"Yomondan yaxshiga" mashqini juftlikda bajartiring, so'ng bir nechta juftlik natijasini solishtiring.
Urg'u: aniq prompt = aniq javob; "fikrni o'qing" deb kutmaslik kerak.`,
        maqsad: "Prompt nima ekanini va uning sifati natijaga qanday ta'sir qilishini tushunish.",
        faoliyat: "Yaxshi va yomon prompt namunalarini solishtirish.",
        nazariya: `
<h3>Prompt nima?</h3>
<p><strong>Prompt</strong> — AIga yoziladigan ko'rsatma, savol yoki topshiriq. AI faqat siz yozgan narsani «biladi», shuning uchun <strong>prompt qanchalik aniq bo'lsa, javob shunchalik yaxshi</strong>.</p>
<h3>Prompt turlari</h3>
<ul>
  <li><strong>Savol</strong>: «Nega dengiz suvi sho'r?»</li>
  <li><strong>Buyruq</strong>: «Shu matnni 3 jumlaga qisqartir.»</li>
  <li><strong>Ijodiy</strong>: «Kosmosdagi mushuk haqida she'r yoz.»</li>
  <li><strong>Tahlil</strong>: «Bu ikki matnni solishtir.»</li>
  <li><strong>Suhbat / rol</strong>: «Sen ingliz tili o'qituvchisisan, men bilan mashq qil.»</li>
</ul>
<h3>Yaxshi va yomon prompt</h3>
<pre>Yomon:  tarix
Yaxshi: 7-sinf o'quvchisiman. Amir Temur haqida 5 ta asosiy faktni
        sodda tilda, ro'yxat ko'rinishida yoz.</pre>
<h3>Yaxshi promptning 4 qismi</h3>
<ol>
  <li><strong>Kim uchun / kontekst</strong> — «7-sinf o'quvchisiman».</li>
  <li><strong>Vazifa</strong> — «Amir Temur haqida faktlar yoz».</li>
  <li><strong>Cheklov</strong> — «5 ta, sodda tilda».</li>
  <li><strong>Format</strong> — «ro'yxat ko'rinishida».</li>
</ol>`,
        amaliyot: {
          oson: [
            ["Turlarni ajrating", "O'qituvchi bergan 8 ta promptni turlarga ajrating: savol, buyruq, ijodiy, tahlil, rol."],
            ["Yomondan yaxshiga", "«Futbol» degan promptni 4 qismli yaxshi promptga aylantiring."],
            ["Ikki javob", "«Futbol» va o'zingizning yaxshi promptingizni AIga bering. Javoblar qanday farq qildi?"],
          ],
          orta: [
            ["Format o'zgartirish", "Bitta mavzuni 3 xil formatda so'rang: ro'yxat, jadval, qisqa hikoya."],
            ["Har tur uchun", "Har bir prompt turiga o'z misolingizni yozing va AIda sinang."],
            ["Baholash", "Sinfdoshingizning 3 ta promptini 4 qism bo'yicha baholang (har qism — 1 ball)."],
          ],
          qiyin: [
            ["Prompt jumboq", "AIdan aniq natija (masalan, 5 qatorli, «a» harfi bilan boshlanadigan so'zlar ro'yxati) olish uchun prompt yozing. Necha urinishda chiqdi?"],
            ["Qoidalar varag'i", "«Yaxshi prompt qoidalari» varag'ini tayyorlang: 5 qoida va har biriga misol."],
          ],
        },
        uyga: {
          oson: [
            ["5 ta prompt", "Turli fanlar uchun 5 ta yaxshi prompt yozing (4 qismli)."],
            ["AI jurnali", "Bitta yomon va bitta yaxshi promptni sinab, javoblarni jurnalga yozing."],
          ],
          orta: [
            ["Uy vazifasi yordamchisi", "Bitta fan mavzusini tushunish uchun prompt yozing (javobni ko'chirish uchun emas, tushunish uchun)."],
            ["Format", "Bir xil mavzuni jadval va ro'yxat formatida so'rab, qaysi biri tushunarliroq ekanini yozing."],
          ],
          qiyin: [
            ["Prompt kolleksiyasi", "10 ta foydali prompt «kolleksiyasini» tuzing: maqsadi, matni, natijaga baho."],
            ["Tahlil", "AI javobi yomon chiqqan bitta holatni tahlil qiling: promptda nima yetishmadi?"],
          ],
        },
        savollar: [
          ["Prompt nima?", "AIga beriladigan ko'rsatma, savol yoki topshiriq."],
          ["Yaxshi promptning 4 qismi?", "Kontekst (kim uchun), vazifa, cheklov, format."],
          ["Prompt turlariga misollar?", "Savol, buyruq, ijodiy, tahlil, rol/suhbat."],
          ["Nega «tarix» yomon prompt?", "Juda noaniq: kim uchun, nima kerak, qanday formatda — aytilmagan."],
          ["Format nima uchun muhim?", "Javobni kerakli ko'rinishda (ro'yxat, jadval) olish uchun."],
        ],
      },
      {
        n: 5, day: 'Chorshanba', title: "Birinchi promptlarimni yozamiz",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>O'z-o'zini sinash uchun foydali shablon:</p>
<pre class="prompt">Men 6-sinf o'quvchisiman. "Suvning aylanishi" mavzusida menga
5 ta test savoli ber. Javoblarini darhol berma — eng oxirida,
alohida ro'yxatda yoz, men avval o'zim yechib ko'ray.</pre>`,
        rubrika: [
          ["5 ta aniq prompt yozilgan", 3],
          ["Har javob 4 savol bo'yicha tahlil qilingan", 4],
          ["Promptlar sifati (aniqlik, format)", 3],
        ],
        metod: `Har o'quvchi kamida 5 ta prompt yozsin va javoblarni tahlil jadvaliga joylasin — bu asosiy ko'nikma.
"Javobni oxirida yoz" shabloni o'z-o'zini sinashga o'rgatadi; buni alohida ta'kidlang.
Diqqat: AIdan tayyor uy vazifasini olishga emas, tushunishga yo'naltiring.`,
        maqsad: "Mustaqil ravishda oddiy va aniq prompt yozish.",
        faoliyat: "5 ta savol tuzish va AI javobini tahlil qilish.",
        nazariya: `
<h3>Prompt yozish tartibi</h3>
<ol>
  <li><strong>Maqsadni aniqlang</strong>: menga aniq nima kerak?</li>
  <li><strong>Kontekst bering</strong>: men kimman, nima uchun kerak.</li>
  <li><strong>Vazifani bitta aniq fe'l bilan yozing</strong>: tushuntir, ro'yxat qil, solishtir, qisqartir.</li>
  <li><strong>Cheklov va formatni qo'shing</strong>: nechta, qancha uzunlikda, qanday ko'rinishda.</li>
  <li><strong>Javobni tekshiring</strong>: maqsadga mosmi, to'g'rimi?</li>
</ol>
<h3>Javobni tahlil qilish savollari</h3>
<ul>
  <li>Savolimga javob berildimi?</li>
  <li>Tushunarlimi? Uzunligi mosmi?</li>
  <li>Xato yoki shubhali joy bormi?</li>
  <li>Keyingi safar promptda nimani o'zgartiraman?</li>
</ul>
<h3>Foydali boshlang'ich iboralar</h3>
<pre>"... ni oddiy tilda tushuntir"
"... haqida 5 ta qiziq fakt yoz"
"... va ... ni jadvalda solishtir"
"Shu matnni 3 jumlaga qisqartir: ..."
"Menga ... bo'yicha 5 ta savol ber, javoblarini oxirida yoz"</pre>`,
        amaliyot: {
          oson: [
            ["5 ta savol", "Sevimli mavzuingiz bo'yicha 5 ta aniq prompt yozing va AIga bering."],
            ["Tahlil jadvali", "Har bir javobni 4 savol bo'yicha tahlil qiling (javob berildimi, tushunarlimi, xato bormi, nimani o'zgartiraman)."],
            ["Fe'llar", "Prompt boshida ishlatish mumkin bo'lgan 10 ta fe'l yozing (tushuntir, solishtir ...)."],
          ],
          orta: [
            ["Qisqartirish", "Darslikdan bir abzatsni AIga berib, 2 jumlaga qisqartiring va asl matn bilan solishtiring."],
            ["O'z-o'zini tekshirish", "AIdan bitta mavzu bo'yicha 5 ta test savolini so'rang, javoblarini oxirida yozdiring va avval o'zingiz yeching."],
            ["Juftlik almashinuvi", "Sinfdoshingizga promptingizni bering — u ham AIga beradi. Natijalar bir xilmi?"],
          ],
          qiyin: [
            ["Aniq natija", "AIdan aynan 7 so'zli, ichida «quyosh» so'zi bo'lgan jumla oling. Promptingizni yozing."],
            ["Eng yaxshi prompt", "Guruhda bitta mavzu bo'yicha har kim prompt yozadi; eng yaxshi natija bergan promptni tanlab, nega yaxshi ekanini tushuntiring."],
          ],
        },
        uyga: {
          oson: [
            ["Kundalik promptlar", "Kun davomida foydali bo'lgan 3 ta prompt yozing (dars, sport, oshxona ...)."],
            ["AI jurnali", "Har bir prompt va javobga 1–5 baho qo'yib, jurnalga yozing."],
          ],
          orta: [
            ["Takrorlash kartochkalari", "AI yordamida bir fan mavzusi bo'yicha 10 ta savol-javob kartochkasi tayyorlang va o'zingizni sinang."],
            ["Xato topish", "AI javobida bitta noaniq yoki xato joy toping va qanday tekshirganingizni yozing."],
          ],
          qiyin: [
            ["Mini qo'llanma", "Kichik ukangiz uchun «AIga qanday savol beriladi» degan 5 qadamli qo'llanma yozing."],
            ["Prompt yaxshilash", "Eng yomon natija bergan promptingizni olib, uni yaxshilang va farqni yozing."],
          ],
        },
        savollar: [
          ["Prompt yozishning birinchi qadami?", "Maqsadni aniqlash."],
          ["Javobni qanday tahlil qilamiz?", "Savolga javob berildimi, tushunarlimi, xato bormi, nimani o'zgartirish kerak."],
          ["AIdan test savollarini qanday foydali so'rash mumkin?", "Javoblarni oxirida yozdirib, avval o'zi yechish."],
          ["Nega bir xil prompt turli javob berishi mumkin?", "Model har safar javobni qayta yaratadi, unda tasodifiylik bor."],
        ],
      },
      {
        n: 6, day: 'Juma', title: "Promptni takomillashtirish (iteration)",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Gemini', 'https://gemini.google.com'],
        ],
        namuna: `<p>Bitta promptni 3 bosqichda yaxshilash:</p>
<pre class="prompt">1) Suv haqida yoz
2) Suvning aylanishi haqida yoz
3) 6-sinf uchun suvning aylanishini 4 bosqichda,
   har birini 1 jumlada, ro'yxat qilib tushuntir</pre>
<p>Suhbatni davom ettirish buyruqlari: «soddaroq qil», «qisqaroq qil», «jadval qilib ber».</p>`,
        rubrika: [
          ["3 ta iteratsiya va natijasi yozilgan", 4],
          ["Har bosqichda bitta o'zgarish qilingan", 3],
          ["Qaysi o'zgarish yordam bergani izohlangan", 3],
        ],
        metod: `Asosiy g'oya: birinchi urinish kamdan-kam mukammal bo'ladi — bu normal.
"Har safar bitta narsani o'zgartirish" qoidasini ta'kidlang: shunda qaysi o'zgarish yaxshilaganini bilish mumkin.
"Oldin → keyin" ko'rinishida ko'rsatish natijani yaqqol qiladi.`,
        maqsad: "Promptni bosqichma-bosqich yaxshilash usulini o'rganish.",
        faoliyat: "Bitta promptni 3 marta yaxshilash.",
        nazariya: `
<h3>Iteratsiya nima?</h3>
<p><strong>Iteratsiya</strong> — natijani ko'rib, promptni qayta-qayta yaxshilash. Professional prompt muhandislari ham birinchi urinishda mukammal natija olmaydi.</p>
<pre>Prompt → Javob → Baholash → Yaxshilash → Yangi javob → ...</pre>
<h3>Yaxshilashning ikki yo'li</h3>
<ol>
  <li><strong>Promptni qayta yozish</strong> — yangi chatda, aniqroq qilib.</li>
  <li><strong>Suhbatda davom ettirish</strong> — «qisqaroq qil», «soddaroq tushuntir», «yana 3 ta misol qo'sh», «jadval qilib ber».</li>
</ol>
<h3>Misol</h3>
<pre>1) "Suv haqida yoz"                         → juda umumiy
2) "Suvning aylanishi haqida yoz"            → yaxshiroq, lekin uzun
3) "6-sinf uchun suvning aylanishini 4 ta
    bosqichda, har birini 1 jumlada tushuntir" → aniq va qulay</pre>
<h3>Baholash mezonlari</h3>
<ul>
  <li>To'g'rilik, aniqlik, uzunlik, format, til (kim uchun mos).</li>
  <li>Har iteratsiyadan keyin <em>bitta</em> narsani o'zgartiring — nima yordam berganini bilasiz.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["3 marta", "«Sport haqida yoz» promptini 3 marta yaxshilang. Har versiyani va javobni yozib boring."],
            ["Davom ettirish", "Bitta javobga «soddaroq tushuntir», «qisqaroq qil», «jadval qilib ber» buyruqlarini ketma-ket bering."],
            ["Bitta o'zgarish", "Bir promptda faqat formatni o'zgartirib, javob qanchalik o'zgarganini kuzating."],
          ],
          orta: [
            ["Baholash jadvali", "3 ta iteratsiya natijasini 5 mezon bo'yicha (1–5) baholang."],
            ["Matematika", "Bitta matematik masalaning yechimini tushunarli qilib olish uchun promptni 3 marta yaxshilang."],
            ["Teskari iteratsiya", "Juda batafsil javobni qadam-baqadam qisqartirib, eng qisqa lekin to'g'ri variantga keltiring."],
          ],
          qiyin: [
            ["Maqsadli natija", "O'qituvchi ko'rsatgan namunaviy natijaga (masalan, ma'lum formatdagi jadval) iloji boricha kam iteratsiyada erishing."],
            ["Iteratsiya hikoyasi", "Promptingiz qanday o'zgarganini «oldin → keyin» ko'rinishida slayd yoki plakatda ko'rsating."],
          ],
        },
        uyga: {
          oson: [
            ["Yaxshilash", "Uyda bitta promptni 3 marta yaxshilang va natijani jurnalga yozing."],
            ["Buyruqlar ro'yxati", "Suhbatda javobni yaxshilash uchun ishlatish mumkin bo'lgan 8 ta buyruq yozing."],
          ],
          orta: [
            ["Retsept", "Uydagi mahsulotlar asosida oddiy taom retsepti so'rang va iteratsiya bilan oilangizga mos qiling."],
            ["Kun rejasi", "Dam olish kuni rejasini AI bilan tuzing va 3 marta yaxshilang."],
          ],
          qiyin: [
            ["Oldin va keyin", "Eng yaxshi iteratsiya natijangizni «oldin/keyin» qilib, nimani o'rganganingizni 5 jumlada yozing."],
            ["Qoidalar", "Iteratsiyaning o'zingiz uchun 5 ta qoidasini yozing."],
          ],
        },
        savollar: [
          ["Iteratsiya nima?", "Natijani ko'rib, promptni qayta-qayta yaxshilash."],
          ["Javobni yaxshilashning ikki yo'li?", "Promptni qayta yozish yoki suhbatda qo'shimcha buyruq berish."],
          ["Nega har safar bitta narsani o'zgartirish kerak?", "Qaysi o'zgarish yordam berganini bilish uchun."],
          ["Baholash mezonlariga misollar?", "To'g'rilik, aniqlik, uzunlik, format, til."],
        ],
      },
    ]},

    { title: "3-hafta: Prompt strukturasi", lessons: [
      {
        n: 7, day: 'Dushanba', title: "Rol berish (Role prompting)",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "ovozli rejim — til mashqi uchun"],
          ['Claude', 'https://claude.ai'],
          ['Gemini', 'https://gemini.google.com'],
        ],
        namuna: `<p>Rol + qoida bergan prompt sifatni oshiradi:</p>
<pre class="prompt">Sen sabrli matematika o'qituvchisisan. Men 6-sinf o'quvchisiman.
Kasrlarni qo'shishni pitsa misolida tushuntir, oxirida 3 ta mashq ber,
javoblarini yozma — avval men yechib ko'ray.</pre>`,
        rubrika: [
          ["Rolli va rolsiz javob farqi yozilgan", 3],
          ["Kamida 5 ta foydali rol va prompti", 4],
          ["«Shifokor» kabi rolga ishonmaslik tushunilgan", 3],
        ],
        metod: `"Imtihon oluvchi" va "ingliz tili suhbatdoshi" rollarini jonli sinab ko'ring — eng foydalilari shu.
Muhim ogohlantirish: rol AIni haqiqiy mutaxassisga aylantirmaydi (sog'liq, pul, huquq — kattalarga).
Tarixiy shaxs roli — o'yin; faktlarni darslik bilan tekshirish shartligini eslating.`,
        maqsad: "AIga rol berib, yanada mos va sifatli javob olish.",
        faoliyat: "AIga «Sen o'qituvchisan» deb rol berish va natijani sinash.",
        nazariya: `
<h3>Rol berish nima?</h3>
<p>Promptda AIga <strong>kim bo'lib javob berishini</strong> aytish: o'qituvchi, sayohat gidi, murabbiy, muharrir. Rol javobning <em>uslubi, darajasi va yo'nalishini</em> o'zgartiradi.</p>
<pre>Sen sabrli matematika o'qituvchisisan. Men 6-sinf o'quvchisiman.
Kasrlarni qo'shishni pitsa misolida tushuntir, oxirida 3 ta mashq ber,
javoblarini yozma — avval men yechib ko'ray.</pre>
<h3>Foydali rollar</h3>
<ul>
  <li><strong>O'qituvchi</strong> — tushuntiradi, mashq beradi.</li>
  <li><strong>Imtihon oluvchi</strong> — savol beradi, javobingizni baholaydi.</li>
  <li><strong>Suhbatdosh</strong> — ingliz tilida gaplashadi, xatolarni tuzatadi.</li>
  <li><strong>Muharrir</strong> — matningizni tekshiradi, takliflar beradi.</li>
  <li><strong>Tarixiy shaxs (o'yin tariqasida)</strong> — masalan, Ulug'bek bo'lib yulduzlar haqida gapiradi (bu fantaziya ekanini unutmang).</li>
</ul>
<h3>Ehtiyot bo'ling</h3>
<p>Rol AIni haqiqiy mutaxassisga aylantirmaydi: «shifokor» rolidagi AI haqiqiy shifokor emas. Sog'liq, pul va huquqiy masalalarda kattalar va mutaxassislarga murojaat qiling.</p>`,
        amaliyot: {
          oson: [
            ["Rolsiz va rolli", "«Fotosintez nima?» savolini avval rolsiz, keyin «Sen biologiya o'qituvchisisan, 5-sinf uchun tushuntir» deb so'rang. Farqni yozing."],
            ["5 ta rol", "Maktab uchun foydali 5 ta rol yozing va har biriga bittadan prompt tuzing."],
            ["Imtihon oluvchi", "AIni «imtihon oluvchi» qilib, sizga 3 ta savol berishini so'rang va javob bering."],
          ],
          orta: [
            ["Ingliz tili suhbatdoshi", "AIga «Sen do'stona ingliz tili suhbatdoshisan, xatolarimni oxirida tuzat» deb rol bering va 6 ta xabar almashing."],
            ["Muharrir", "O'zingiz yozgan 5 jumlali matnni «muharrir» rolidagi AIga tekshirtiring. Qaysi takliflarni qabul qildingiz?"],
            ["Bir mavzu — uch rol", "Bitta mavzuni uch xil rolga (olim, ertakchi, sport sharhlovchisi) tushuntirtiring."],
          ],
          qiyin: [
            ["Rol + qoidalar", "Rolga qo'shimcha qoidalar bering (masalan, «javobni bermay, faqat maslahat ber»). AI qoidaga amal qildimi?"],
            ["Rol o'yini", "Guruhda tarixiy shaxs rolidagi AI bilan «intervyu» o'tkazing va qaysi javoblar faktlarga mos ekanini tekshiring."],
          ],
        },
        uyga: {
          oson: [
            ["Rolli prompt", "Uy vazifangizdagi bitta mavzu uchun rolli prompt yozing va sinang."],
            ["AI jurnali", "Rol berilgan va berilmagan javoblarni jurnalda solishtiring."],
          ],
          orta: [
            ["Shaxsiy murabbiy", "AIni «o'qish murabbiyi» qilib, haftalik o'qish rejangizni tuzing."],
            ["So'z o'yini", "AI bilan «so'z topish» o'yinini o'ynang: u topishmoq aytadi, siz topasiz."],
          ],
          qiyin: [
            ["Rollar kolleksiyasi", "8 ta foydali rol va ularning prompt shablonini tayyorlang."],
            ["Cheklovlar", "Rol bilan ham AI to'g'ri javob bermagan holatni toping va sababini yozing."],
          ],
        },
        savollar: [
          ["Rol berish nima?", "Promptda AIga kim bo'lib javob berishini aytish."],
          ["Rol nimani o'zgartiradi?", "Javob uslubi, darajasi va yo'nalishini."],
          ["O'qish uchun foydali 3 ta rol?", "O'qituvchi, imtihon oluvchi, muharrir yoki suhbatdosh."],
          ["«Shifokor» rolidagi AIga ishonish mumkinmi?", "Yo'q, u haqiqiy mutaxassis emas; muhim masalada mutaxassisga murojaat qilish kerak."],
        ],
      },
      {
        n: 8, day: 'Chorshanba', title: "Kontekst va fon ma'lumot berish",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "fayl va rasm yuklash"],
          ['Claude', 'https://claude.ai', "uzun matn va hujjatlar uchun"],
          ['NotebookLM', 'https://notebooklm.google.com'],
        ],
        namuna: `<p>Kontekst javobni butunlay o'zgartiradi:</p>
<pre class="prompt">Opam 16 yoshda, rasm chizishni va kitob o'qishni yaxshi ko'radi.
Byudjetim 100 000 so'm. 5 ta sovg'a g'oyasini taxminiy narxi bilan ber.</pre>
<p>Matnni ajratib berish: <span class="rol">"""matn shu yerda"""</span> ichida yuboring.</p>`,
        rubrika: [
          ["Kontekstsiz/kontekstli farq ko'rsatilgan", 3],
          ["Auditoriya, maqsad, cheklov belgilangan", 4],
          ["Shaxsiy ma'lumot kiritilmagani", 3],
        ],
        metod: `Bitta vazifani kam → o'rta → to'liq kontekst bilan so'rab, natija qanday yaxshilanishini jonli ko'rsating.
"Unutish sinovi"ni o'tkazing: uzun suhbat oxirida boshidagi ma'lumotni so'rang — AI unutishi mumkin.
Qayta-qayta: kontekstga shaxsiy ma'lumot (manzil, telefon, parol) qo'shilmaydi.`,
        maqsad: "Kontekst javob sifatiga qanday ta'sir qilishini anglash.",
        faoliyat: "Kontekstsiz va kontekstli promptlarni taqqoslash.",
        nazariya: `
<h3>Kontekst nima?</h3>
<p><strong>Kontekst</strong> — AI vazifani to'g'ri bajarishi uchun kerakli fon ma'lumot: siz kimsiz, nima uchun kerak, nimani allaqachon bilasiz, qanday cheklovlar bor.</p>
<pre>Kontekstsiz:  Menga sovg'a g'oyasini ber.
Kontekstli:   Opam 16 yoshda, rasm chizishni va kitob o'qishni yaxshi
              ko'radi. Byudjetim 100 000 so'm. 5 ta sovg'a g'oyasini
              narxi bilan ber.</pre>
<h3>Kontekstga nimalar kiradi?</h3>
<ul>
  <li><strong>Auditoriya</strong>: kim uchun (yosh, sinf, daraja).</li>
  <li><strong>Maqsad</strong>: nima uchun kerak (taqdimot, test, sovg'a).</li>
  <li><strong>Bor ma'lumot</strong>: matn, jadval, rasm — promptga qo'shish yoki fayl yuklash.</li>
  <li><strong>Cheklovlar</strong>: vaqt, byudjet, hajm, til.</li>
</ul>
<h3>Ma'lumotni ajratib berish</h3>
<pre>Quyidagi matnni 3 ta asosiy fikrga qisqartir.
"""
(matn shu yerda)
"""</pre>
<p class="hint">Uzoq suhbatda AI boshidagi gaplarni «unutishi» mumkin — muhim kontekstni qayta eslating yoki yangi chat oching.</p>`,
        amaliyot: {
          oson: [
            ["Kontekstsiz vs kontekstli", "«Kitob tavsiya qil» promptini kontekstsiz va kontekstli (yoshingiz, qiziqishlaringiz) so'rang. Farqni yozing."],
            ["Kontekst qismlari", "O'qituvchi bergan 3 ta promptda auditoriya, maqsad, cheklovni belgilang."],
            ["Sovg'a g'oyasi", "Oila a'zoingiz uchun sovg'a g'oyasini to'liq kontekst bilan so'rang."],
          ],
          orta: [
            ["Matnni ajratib berish", "Darslikdan matnni qo'shtirnoqlar (\"\"\") ichida berib, undan 5 ta savol tuzdiring."],
            ["Fayl yuklash", "Bitta rasm yoki PDF'ni yuklab, unga asoslangan savol bering. Natija oddiy savoldan qanchalik aniq?"],
            ["Unutish sinovi", "Uzun suhbat oxirida boshida aytgan ma'lumotingizni so'rang. AI esladimi?"],
          ],
          qiyin: [
            ["Sayohat rejasi", "Samarqandga 1 kunlik oilaviy sayohat rejasi: kim boradi, byudjet, qiziqishlar, transport — barcha kontekst bilan."],
            ["Kontekst shabloni", "O'zingiz uchun universal kontekst shablonini tuzing va 2 ta turli vazifada sinang."],
          ],
        },
        uyga: {
          oson: [
            ["3 juft prompt", "3 ta kontekstsiz promptni kontekstli qilib qayta yozing."],
            ["AI jurnali", "Kontekst qo'shgandan keyin javob yaxshilangan bitta holatni yozing."],
          ],
          orta: [
            ["Taqdimot rejasi", "Maktab taqdimoti uchun reja so'rang: mavzu, sinf, vaqt (5 daqiqa), slaydlar soni — kontekst bilan."],
            ["Matndan savollar", "Bir paragrafni berib, undan 5 ta savol tuzdiring va o'zingiz javob bering."],
          ],
          qiyin: [
            ["Shaxsiy profil", "AI har safar sizni tushunishi uchun «men haqimda» kontekst matnini yozing (shaxsiy ma'lumotlarsiz: yosh, sinf, qiziqishlar)."],
            ["Tajriba", "Bir vazifani 3 xil kontekst darajasida (kam, o'rta, to'liq) so'rab, natijalarni solishtiring."],
          ],
        },
        savollar: [
          ["Kontekst nima?", "AI vazifani to'g'ri bajarishi uchun kerakli fon ma'lumot."],
          ["Kontekstga nimalar kiradi?", "Auditoriya, maqsad, bor ma'lumot, cheklovlar."],
          ["Matnni promptda qanday ajratib berish mumkin?", "Qo'shtirnoq yoki maxsus belgilar (\"\"\") ichida."],
          ["Uzun suhbatda nima muammo bo'lishi mumkin?", "AI boshidagi ma'lumotni unutishi mumkin."],
          ["Kontekstga nima kiritmaslik kerak?", "Shaxsiy ma'lumotlar: manzil, telefon, parol."],
        ],
      },
      {
        n: 9, day: 'Juma', title: "Aniq ko'rsatmalar berish",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Gemini', 'https://gemini.google.com'],
        ],
        namuna: `<p>O'lchanadigan, formatli ko'rsatma:</p>
<pre class="prompt">O'zbekistonning 4 ta shahri haqida jadval tuz.
Ustunlar: Shahar | Viloyat | Mashhur joy | Qiziq fakt (1 jumla).
Faqat jadvalni yoz, qo'shimcha izoh berma.</pre>
<p>Tekshirish ro'yxati: aniq vazifa · raqamli miqdor · format · kim uchun.</p>`,
        rubrika: [
          ["5 ta noaniq ibora aniq ko'rsatmaga aylantirilgan", 4],
          ["Jadval/ro'yxat kerakli formatda olingan", 3],
          ["Tekshirish ro'yxatidan foydalanilgan", 3],
        ],
        metod: `"Robotga ko'rsatma" o'yini (bir o'quvchi aytadi, ikkinchisi so'zma-so'z bajaradi) aniqlik muhimligini yaqqol ko'rsatadi.
"Nima qilish kerakligini ayt" (taqiqdan ko'ra) tamoyilini urg'ulang.
Namuna berish (bitta misol) formatni eng yaxshi tushuntiradi.`,
        maqsad: "«Aniq buyruq = aniq natija» tamoyilini amalda qo'llash.",
        faoliyat: "Guruhlarda to'g'ri ko'rsatma yozish topshirig'i.",
        nazariya: `
<h3>Aniq ko'rsatma qoidalari</h3>
<ul>
  <li><strong>O'lchanadigan</strong> bo'lsin: «qisqa» emas, «3 jumla»; «bir nechta» emas, «5 ta».</li>
  <li><strong>Nima qilish kerakligini</strong> ayting (nima qilmaslik kerakligidan ko'ra): «oddiy so'zlar ishlat».</li>
  <li><strong>Qadamlarga</strong> bo'ling: «1) ... 2) ... 3) ...».</li>
  <li><strong>Formatni</strong> ko'rsating: jadval ustunlari, sarlavhalar, ro'yxat.</li>
  <li><strong>Namuna</strong> bering — kerakli ko'rinishga misol.</li>
</ul>
<h3>Misol</h3>
<pre>Vazifa: O'zbekistonning 4 ta shahri haqida jadval tuz.
Ustunlar: Shahar | Viloyat | Mashhur joy | Qiziq fakt (1 jumla).
Faqat jadvalni yoz, qo'shimcha izoh berma.</pre>
<h3>Tekshirish ro'yxati</h3>
<ul>
  <li>☐ Nima qilish kerakligi aniq</li>
  <li>☐ Miqdor va uzunlik raqam bilan</li>
  <li>☐ Format ko'rsatilgan</li>
  <li>☐ Kim uchun ekani aytilgan</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Noaniqni aniq qilish", "«Biroz qisqa yoz», «bir nechta misol ber» kabi 5 ta noaniq iborani aniq ko'rsatmaga aylantiring."],
            ["Jadval", "O'zbekistonning 4 ta shahri haqida aniq ustunli jadval so'rang."],
            ["Qadamlar", "«Choy damlash» ko'rsatmasini 5 qadamda yozdiring va natijani tekshiring."],
          ],
          orta: [
            ["Guruh topshirig'i", "Guruhda o'qituvchi bergan natijani (masalan, ma'lum formatdagi ro'yxat) olish uchun ko'rsatma yozing. Qaysi guruh birinchi urinishda erishdi?"],
            ["Namuna bilan", "Kerakli formatga bitta namuna berib, AIdan 5 ta shunday qator yozdiring."],
            ["Faqat natija", "AIdan izohsiz, faqat kerakli natijani (masalan, 10 ta so'z) olish uchun ko'rsatma yozing."],
          ],
          qiyin: [
            ["Robotga ko'rsatma", "Juftlikda: biringiz ko'rsatma yozadi, ikkinchingiz uni so'zma-so'z bajaradi (oddiy rasm chizish). Ko'rsatma qanchalik aniq edi?"],
            ["Murakkab format", "Haftalik dars jadvalingizni AIga aniq format bilan (kunlar, vaqtlar, fanlar) tuzdiring va xatosiz chiqguncha ko'rsatmani aniqlashtiring."],
          ],
        },
        uyga: {
          oson: [
            ["Tekshirish ro'yxati", "Aniq ko'rsatmaning 4 bandli tekshirish ro'yxatini yod oling va 3 ta promptingizni tekshiring."],
            ["AI jurnali", "Aniq ko'rsatma bergan va bermagan holatni solishtirib yozing."],
          ],
          orta: [
            ["Xarid ro'yxati", "Oilaviy xarid ro'yxatini AIga aniq format bilan (mahsulot, miqdor, taxminiy narx) tuzdiring."],
            ["Mashq varag'i", "Bir fan bo'yicha 10 ta mashq tuzdiring: oson-o'rta-qiyin tartibda, javoblarsiz."],
          ],
          qiyin: [
            ["Ko'rsatmalar to'plami", "5 ta turli vazifa uchun «mukammal» ko'rsatma yozing va natijalarini baholang."],
            ["Xato tahlili", "AI ko'rsatmangizni noto'g'ri tushungan holatni toping va ko'rsatmani tuzating."],
          ],
        },
        savollar: [
          ["«Aniq ko'rsatma» qanday bo'ladi?", "O'lchanadigan, qadamlarga bo'lingan, formatli, kim uchun ekani aytilgan."],
          ["«Qisqa yoz» ni qanday aniqroq qilamiz?", "Masalan, «3 jumlada yoz»."],
          ["Namuna berish nima uchun foydali?", "AI kerakli ko'rinishni aniq tushunadi."],
          ["Izohsiz natija olish uchun nima deyish kerak?", "«Faqat natijani yoz, qo'shimcha izoh berma»."],
        ],
      },
    ]},

    { title: "4-hafta: Amaliy mashqlar va test", lessons: [
      {
        n: 10, day: 'Dushanba', title: "Maktab uchun AI: dars tayyorlash",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "o'quv/Study rejimi"],
          ['Claude', 'https://claude.ai'],
          ['NotebookLM', 'https://notebooklm.google.com', "konspekt asosida savol-javob"],
        ],
        namuna: `<p>Sokrat usuli — javobni ko'chirmay tushunish:</p>
<pre class="prompt">Sen matematika o'qituvchisisan. Men bu masalani yechmoqchiman: "..."
Javobni aytma. Menga savollar berib, o'zim yechishimga yordam ber.
Xato qilsam, qayerda xato qilganimni ko'rsat.</pre>`,
        rubrika: [
          ["To'g'ri/noto'g'ri foydalanish ajratilgan", 2],
          ["Sokrat usuli bilan masala yechilgan", 4],
          ["AI konspekti darslik bilan tekshirilgan", 4],
        ],
        metod: `Akademik halollikni ochiq muhokama qiling: AI — yordamchi, javob mashinasi emas; ko'chirish o'ziga zarar.
Sokrat usuli promptini hammaga yozdiring va bitta masalada sinang.
Rasm yuklab "faqat birinchi qadamni ko'rsat" usuli uy vazifasida juda foydali.`,
        maqsad: "AIni halol va foydali tarzda o'qishda ishlatish.",
        faoliyat: "AI yordamida matematika masalasining yechim yo'lini izlash (javobni ko'chirmasdan).",
        nazariya: `
<h3>AI — o'qituvchi yordamchisi, javob mashinasi emas</h3>
<ul>
  <li>✅ Tushunmagan mavzuni <strong>oddiy tilda tushuntirish</strong>.</li>
  <li>✅ <strong>Maslahat (hint)</strong> olish: «javobni aytma, birinchi qadamni ko'rsat».</li>
  <li>✅ <strong>Mashq va test</strong> tuzish, o'zini sinash.</li>
  <li>✅ <strong>Konspekt va kartochkalar</strong> tayyorlash.</li>
  <li>❌ Uy vazifasini to'liq ko'chirish — bu <em>akademik halollikka</em> zid va o'zingizga zarar.</li>
</ul>
<h3>Sokrat usuli (savol bilan o'rgatish)</h3>
<pre>Sen matematika o'qituvchisisan. Men bu masalani yechmoqchiman:
"..."
Javobni aytma. Menga savollar berib, o'zim yechishimga yordam ber.
Xato qilsam, qayerda xato qilganimni ko'rsat.</pre>
<h3>Foydali o'quv vositalari</h3>
<ul>
  <li>ChatGPT va Claude'dagi o'quv rejimlari (javob o'rniga bosqichma-bosqich yo'naltiradi).</li>
  <li>NotebookLM — darslik yoki konspektingiz asosida savol-javob va audio-sharh.</li>
  <li>Rasm yuklash — daftardagi masala rasmini yuborib, tushuntirish so'rash.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Ruxsat va taqiq", "AIni o'qishda ishlatishning 4 ta to'g'ri va 3 ta noto'g'ri usulini yozing."],
            ["Tushuntirish", "Tushunmagan bitta mavzuni AIdan «oddiy misol bilan» tushuntirtiring."],
            ["Kartochkalar", "Bir mavzu bo'yicha 8 ta savol-javob kartochkasi tayyorlatib, juftlikda bir-biringizni sinang."],
          ],
          orta: [
            ["Sokrat usuli", "Matematika masalasini Sokrat usuli promptida yeching: AI faqat savol bersin, javobni siz toping."],
            ["Rasm orqali", "Daftardagi masala rasmini yuklab, «faqat birinchi qadamni ko'rsat» deb so'rang."],
            ["Xatoni topish", "O'z yechimingizni AIga berib, «xato bormi, bo'lsa qayerda — tuzatma, faqat ko'rsat» deb so'rang."],
          ],
          qiyin: [
            ["Mavzu konspekti", "Bitta darslik paragrafidan AI yordamida 1 sahifalik konspekt tuzing, keyin uni darslik bilan tekshirib, xatolarni tuzating."],
            ["Shaxsiy mashq to'plami", "Zaif mavzuingiz bo'yicha 10 ta mashq tuzdiring, yeching va javoblaringizni AIga tekshirtiring."],
          ],
        },
        uyga: {
          oson: [
            ["Halollik qoidalari", "AIdan o'qishda foydalanishning 5 ta halollik qoidasini yozing."],
            ["AI jurnali", "Uy vazifasida AIdan faqat maslahat olgan holatingizni yozing."],
          ],
          orta: [
            ["Test tayyorgarligi", "Keyingi nazorat ishiga AI bilan 10 savollik sinov testi tuzing va yeching."],
            ["NotebookLM", "Konspektingizni NotebookLM'ga yuklab, 5 ta savol bering (o'qituvchi yoki ota-ona akkaunti bilan)."],
          ],
          qiyin: [
            ["O'quv rejasi", "Bir oylik o'quv rejasini AI bilan tuzing: zaif mavzular, kunlik vaqt, sinov kunlari."],
            ["Sinfdoshga yordam", "Sinfdoshingizga AI yordamida bitta mavzuni tushuntiring va u tushunganini savollar bilan tekshiring."],
          ],
        },
        savollar: [
          ["AIni o'qishda to'g'ri ishlatishga misollar?", "Tushuntirish, maslahat, mashq va test tuzish, konspekt."],
          ["Sokrat usuli nima?", "AI javob bermay, savollar orqali o'quvchini yechimga yo'naltiradi."],
          ["Uy vazifasini AIdan ko'chirish nima uchun noto'g'ri?", "Akademik halollikka zid va bilim olinmaydi."],
          ["AI konspektini nima qilish kerak?", "Darslik bilan tekshirib, xatolarini tuzatish."],
        ],
      },
      {
        n: 11, day: 'Chorshanba', title: "AI bilan hikoya yozish",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "matn va rasm yaratish"],
          ['Gemini', 'https://gemini.google.com', "rasm yaratish"],
          ['Canva', 'https://www.canva.com', "komiks va plakat uchun"],
        ],
        namuna: `<p>Uslubni saqlab tahrirlash:</p>
<pre class="prompt">Bu abzatsni men yozdim. Uslubimni va fikrimni o'zgartirma —
faqat imlo va ravonlikni yaxshila, 2 ta jumlani qisqartir:
"..."</pre>
<p>Muallif — siz: qahramon, asosiy g'oya va yakun sizniki bo'lsin.</p>`,
        rubrika: [
          ["Hikoya 5 qismli tuzilmaga ega", 3],
          ["Asosiy g'oya o'quvchiniki (AIniki emas)", 4],
          ["AI hissasi ochiq izohlangan", 3],
        ],
        metod: `Ta'kidlang: AI — ijodiy hamkor, lekin muallif o'quvchi; AI yozganini o'ziniki deb topshirish halol emas.
"Navbatma-navbat" usuli (o'quvchi bir abzats, AI bir abzats) hamkorlikni yaxshi ko'rsatadi.
Rasm generatori bilan 1–2 sahna yaratish darsni jonlantiradi.`,
        maqsad: "Ijodiy yozuvda AIni hamkor sifatida ishlatish.",
        faoliyat: "Guruhda AI bilan qisqa hikoya yaratish.",
        nazariya: `
<h3>AI — ijodiy hamkor</h3>
<p>AI g'oya beradi, variantlar taklif qiladi, matnni tahrirlaydi. Lekin <strong>muallif — siz</strong>: qahramonlar, asosiy g'oya va oxirgi tanlov sizniki.</p>
<h3>Hikoya tuzilishi</h3>
<ol>
  <li><strong>Boshlanish</strong> — qahramon va joy.</li>
  <li><strong>Muammo</strong> — nimadir sodir bo'ladi.</li>
  <li><strong>Rivojlanish</strong> — qahramon harakat qiladi.</li>
  <li><strong>Avj nuqta</strong> — eng qiziq lahza.</li>
  <li><strong>Yakun</strong> — muammo hal bo'ladi, xulosa.</li>
</ol>
<h3>Hamkorlik usullari</h3>
<ul>
  <li><strong>G'oya bo'roni</strong>: «Kosmosdagi maktab haqida 10 ta hikoya g'oyasi ber».</li>
  <li><strong>Navbatma-navbat</strong>: siz bir abzats, AI bir abzats yozadi.</li>
  <li><strong>Tahrir</strong>: «Shu abzatsni qiziqroq qil, lekin mening uslubimni saqla».</li>
  <li><strong>Rasm</strong>: hikoya sahnasi uchun rasm yaratish (rasm generatori bilan).</li>
</ul>
<p class="hint">AI yozgan hikoyani o'zingizniki deb tanlovga topshirish — halol emas. AI qo'shgan hissani har doim ayting.</p>`,
        amaliyot: {
          oson: [
            ["G'oya bo'roni", "AIdan 10 ta hikoya g'oyasini so'rang va eng yoqqan 2 tasini tanlang."],
            ["Qahramon", "Hikoya qahramonini o'zingiz o'ylab toping (ism, yosh, xarakter) va AIdan tasvirini boyitishni so'rang."],
            ["Tuzilma", "Tanlangan g'oya uchun 5 qismli tuzilmani (boshlanish ... yakun) o'zingiz yozing."],
          ],
          orta: [
            ["Navbatma-navbat", "Guruhda: siz bir abzats yozasiz, AI davom ettiradi — 6 abzatsgacha."],
            ["Uslubni saqlash", "O'zingiz yozgan abzatsni AIga «uslubimni o'zgartirmay, faqat imlo va ravonlikni yaxshila» deb bering."],
            ["Sarlavha", "Hikoya uchun 5 ta sarlavha variantini so'rab, eng mosini tanlang va sababini ayting."],
          ],
          qiyin: [
            ["Rasmli hikoya", "Hikoyaning 2 ta sahnasi uchun rasm yaratuvchi AIga prompt yozing va rasmlarni hikoyaga qo'shing."],
            ["Mualliflik izohi", "Hikoya oxirida qaysi qismlarni o'zingiz, qaysilarini AI bilan yozganingizni izohlang."],
          ],
        },
        uyga: {
          oson: [
            ["Qisqa hikoya", "AI bilan hamkorlikda 150–200 so'zlik hikoya yozing (asosiy g'oya sizniki)."],
            ["AI jurnali", "Ijodda AI qayerda yordam berdi, qayerda xalaqit berdi — yozing."],
          ],
          orta: [
            ["Ertak", "Kichik ukangiz uchun ertak yozing va unga o'qib bering. Uning fikrini yozing."],
            ["She'r", "Bitta to'rtlik she'rni o'zingiz yozing, AIdan faqat qofiya variantlarini so'rang."],
          ],
          qiyin: [
            ["Komiks", "Hikoyangizdan 4 kadrli komiks yarating (rasmlarni AI bilan, matnni o'zingiz)."],
            ["Taqqoslash", "Bir mavzuda o'zingiz yolg'iz va AI bilan yozgan ikki matnni solishtiring: qaysi biri «sizniki» ko'proq?"],
          ],
        },
        savollar: [
          ["Ijodda AIning roli qanday bo'lishi kerak?", "Hamkor: g'oya va tahrir beradi, muallif esa o'quvchi."],
          ["Hikoyaning 5 qismi?", "Boshlanish, muammo, rivojlanish, avj nuqta, yakun."],
          ["AI bilan yozilgan hikoyani tanlovga topshirishda nima qilish kerak?", "AI hissasini ochiq aytish (tanlov qoidalari ruxsat bersa)."],
          ["Uslubni saqlab tahrir qilish uchun qanday prompt yoziladi?", "«Uslubimni o'zgartirma, faqat imlo va ravonlikni yaxshila»."],
        ],
      },
      {
        n: 12, day: 'Juma', title: "1-oy yakuniy test va muhokama", tag: 'test',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Prompt yozish topshirig'iga namuna (rol + kontekst + ko'rsatma + format):</p>
<pre class="prompt">Sen geografiya o'qituvchisisan. Men 6-sinf o'quvchisiman.
O'zbekistonning 5 ta daryosi bo'yicha jadval tuz:
Daryo | Qayerdan oqadi | Uzunligi (taxminan) | 1 ta qiziq fakt.
Faqat jadvalni yoz.</pre>`,
        rubrika: [
          ["Nazariy test (10 savol)", 10],
          ["Prompt yozish: rol+kontekst+ko'rsatma+format", 5],
          ["Iteratsiya bilan yaxshilash", 3],
          ["Munozarada ishtirok", 2],
        ],
        metod: `Test: 10 nazariy + 10 amaliy, 25 daqiqa; qolgan vaqt — munozara.
Munozara o'quvchilarni fikrlashga undaydi: "AI qachon yordam emas, xalaqit beradi?" degan savol kuchli.
Baholashda tayyor javobni emas, prompt sifatini va mustaqil fikrni qadrlang.`,
        maqsad: "1-oy bilimlarini mustahkamlash va baholash.",
        faoliyat: "20 savollik test va guruh munozarasi.",
        nazariya: `
<h3>Takrorlash: 1-oy mavzulari</h3>
<ul>
  <li>AI nima, tarixi, AI va odam.</li>
  <li>ChatGPT, Claude, Gemini, Copilot, Perplexity, NotebookLM.</li>
  <li>AI qanday ishlaydi: ma'lumot, o'qitish, model, LLM, token.</li>
  <li>Prompt: turlari, 4 qismi, iteratsiya.</li>
  <li>Rol, kontekst, aniq ko'rsatmalar.</li>
  <li>AI o'qishda (halollik, Sokrat usuli) va ijodda.</li>
</ul>
<h3>Test tuzilishi</h3>
<ul>
  <li>20 ta savol: 10 ta nazariy (test), 10 ta amaliy (prompt yozish, promptni baholash).</li>
  <li>Vaqt: 25 daqiqa. Qolgan vaqt — guruh munozarasi.</li>
</ul>
<h3>Munozara savollari</h3>
<ul>
  <li>AI maktabda qanday qoidalar bilan ishlatilishi kerak?</li>
  <li>1-oyda eng foydali bo'lgan prompt texnikasi qaysi?</li>
  <li>AI qachon bizga yordam emas, xalaqit beradi?</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Atamalar", "AI, LLM, prompt, kontekst, iteratsiya, rol so'zlarini bir jumladan tushuntiring."],
            ["Vositalar", "5 ta AI vositasi va ularning asosiy afzalligini yozing."],
            ["Promptni baholang", "O'qituvchi bergan 3 ta promptni 4 qism bo'yicha baholang."],
          ],
          orta: [
            ["Prompt yozing", "Berilgan vaziyat uchun rol + kontekst + aniq ko'rsatma + format bilan prompt yozing."],
            ["Iteratsiya", "Berilgan zaif promptni 2 bosqichda yaxshilang va har bosqichni izohlang."],
            ["Halol foydalanish", "Uy vazifasida AIdan halol foydalanish uchun Sokrat usuli promptini yozing."],
          ],
          qiyin: [
            ["Murakkab topshiriq", "O'qituvchi bergan aniq natija (formatli jadval yoki ro'yxat) uchun prompt yozing va 2 urinishda erishing."],
            ["Munozara", "Guruh munozarasida bitta pozitsiyani dalillar bilan himoya qiling va qarshi fikrga javob bering."],
          ],
        },
        uyga: {
          oson: [
            ["Xatolar ustida ishlash", "Testda xato qilgan savollaringizni qayta o'rganing va to'g'ri javobini yozing."],
            ["AI jurnali", "1-oy jurnalingizdan eng yaxshi 3 ta promptni tanlang."],
          ],
          orta: [
            ["Shaxsiy xulosa", "1-oyda nimani o'rgandingiz? 8–10 jumla yozing."],
            ["Prompt kitobcha", "Eng foydali 10 ta promptingizdan kichik «kitobcha» tuzing."],
          ],
          qiyin: [
            ["Maktab qoidalari", "Sinfingiz uchun «AIdan foydalanish qoidalari» loyihasini (7–8 band) yozing."],
            ["2-oyga tayyorgarlik", "«Few-shot» va «chain-of-thought» nima ekanini AIdan so'rab, qisqa izoh yozing."],
          ],
        },
        savollar: [
          ["LLM qanday javob yozadi?", "Keyingi eng mos so'z yoki tokenni taxmin qilib."],
          ["Yaxshi promptning 4 qismi?", "Kontekst, vazifa, cheklov, format."],
          ["Rol berish nima beradi?", "Javob uslubi va darajasini moslashtiradi."],
          ["Iteratsiya nima?", "Natijaga qarab promptni qayta-qayta yaxshilash."],
          ["AIni o'qishda halol ishlatish usuli?", "Tushuntirish va maslahat olish, Sokrat usuli; javobni ko'chirmaslik."],
          ["Kontekstga nimani kiritmaslik kerak?", "Shaxsiy ma'lumotlar."],
        ],
      },
    ]},
  ],
};
