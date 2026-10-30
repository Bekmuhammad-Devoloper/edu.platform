/* AI Prompt Engineering — 3-oy: Kelajak va amaliy loyihalar (25–36-darslar) */
module.exports = {
  title: "3-oy: Kelajak va amaliy loyihalar", short: 'Kelajak va loyihalar', icon: 'rocket', cls: 'ic-oy3',
  weeks: [
    { title: "9-hafta: AI va kasblar", lessons: [
      {
        n: 25, day: 'Dushanba', title: "AI qaysi kasblarda qo'llaniladi?",
        vositalar: [
          ['Perplexity', 'https://www.perplexity.ai', "kasblar haqida manbali ma'lumot"],
          ['ChatGPT', 'https://chatgpt.com'],
        ],
        namuna: `<pre class="prompt">Men 7-sinf o'quvchisiman. "Shifokor" kasbida AI qayerda yordam beradi
va qaysi qismi baribir odamga qoladi? Oddiy tilda, 5 ta band qilib yoz.</pre>`,
        rubrika: [
          ["5+ kasbda AI qo'llanishi topilgan", 3],
          ["Har kasbda «AI qismi» va «odam qismi» ajratilgan", 4],
          ["Ma'lumot manbadan tekshirilgan", 3],
        ],
        metod: `Asosiy g'oya: AI kasblarni yo'q qilmaydi, balki o'zgartiradi — AIdan foydalana oladigan mutaxassis ustun.
Har o'quvchi o'zi qiziqqan kasbni tadqiq qilsin — bu kelajak rejasi bilan bog'lanadi.`,
        maqsad: "Real hayotda AIning o'rnini va kasblar qanday o'zgarayotganini tushunish.",
        faoliyat: "Video ko'rish va «kasb xaritasi» chizish.",
        nazariya: `
<h3>AI kasblarni qanday o'zgartiryapti?</h3>
<p>AI ko'p kasblarni <strong>yo'q qilmaydi</strong>, balki ulardagi ishlarning bir qismini tezlashtiradi. AIdan foydalana oladigan odam ko'proq ish bajaradi.</p>
<ul>
  <li><strong>Shifokor</strong> — rentgen va tahlillarni tekshirishda yordamchi.</li>
  <li><strong>O'qituvchi</strong> — dars va mashq tayyorlash, individual yordam.</li>
  <li><strong>Dizayner</strong> — g'oya va variantlar yaratish.</li>
  <li><strong>Dasturchi</strong> — kod yozish va xatolarni topish.</li>
  <li><strong>Jurnalist, marketolog</strong> — matn qoralamalari, tahlil.</li>
  <li><strong>Fermer</strong> — dronlar va sensorlar bilan hosilni kuzatish.</li>
</ul>
<h3>Yangi kasblar</h3>
<ul>
  <li>AI muhandisi, ma'lumotlar tahlilchisi, AI xavfsizlik mutaxassisi, AI trener, AI etikasi bo'yicha mutaxassis, prompt va AI integratsiya mutaxassisi.</li>
</ul>
<h3>Kelajakda qadrli ko'nikmalar</h3>
<ul>
  <li>Tanqidiy fikrlash, muloqot, ijodkorlik, jamoada ishlash.</li>
  <li>AI bilan ishlash savodxonligi, ingliz tili, matematika asoslari.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Kasblar ro'yxati", "AI ishlatiladigan 8 ta kasbni yozing va har birida AI qanday yordam berishini bir jumlada tushuntiring."],
            ["Kasb xaritasi", "Markazda «AI», atrofida sohalar va kasblar bo'lgan xarita chizing."],
            ["AI intervyusi", "AIdan «Sen 2035-yildagi o'qituvchisan, kuning qanday o'tadi?» deb so'rang va qiziq qismlarini yozing."],
          ],
          orta: [
            ["Mening kasbim", "Orzu qilgan kasbingizda AI qanday ishlatilishini AIdan so'rang va 2 ta ishonchli manbada tekshiring."],
            ["Ko'nikmalar", "O'sha kasb uchun kerakli 5 ta ko'nikmani va ulardan qaysilarini hozirdan o'rganish mumkinligini yozing."],
            ["Yangi kasblar", "3 ta yangi AI kasbi haqida qisqa ta'rif yozing."],
          ],
          qiyin: [
            ["Munozara", "«AI ko'proq kasb yaratadimi yoki yo'qotadimi?» mavzusida guruh munozarasi: har tomon 3 ta dalil keltiradi."],
            ["Infografika", "Bitta kasbning «AIgacha va AIdan keyin» infografikasini tayyorlang."],
          ],
        },
        uyga: {
          oson: [
            ["Oiladagi kasblar", "Oila a'zolaringiz kasbida AI qanday ishlatilishi mumkinligini ular bilan muhokama qilib yozing."],
            ["AI jurnali", "Kasb haqidagi eng qiziq AI javobini yozing."],
          ],
          orta: [
            ["Kasb kartasi", "Orzu kasbingiz uchun «kasb kartasi»: ta'rif, ko'nikmalar, AI vositalari, qayerda o'qiladi."],
            ["Video", "AI va kasblar haqida qisqa video toping va 5 ta asosiy fikrini yozing."],
          ],
          qiyin: [
            ["Reja", "Orzu kasbingizga yetish uchun 3 yillik o'quv reja tuzing (AI yordamida, lekin o'zingizga moslab)."],
            ["Insho", "«Kelajakdagi kasbim va AI» mavzusida 150 so'zlik insho yozing."],
          ],
        },
        savollar: [
          ["AI kasblarni qanday o'zgartiradi?", "Ishning bir qismini tezlashtiradi; AI bilan ishlay oladiganlar ustunlikka ega bo'ladi."],
          ["AI ishlatiladigan 3 ta kasb?", "Shifokor, o'qituvchi, dizayner, dasturchi va boshqalar."],
          ["Yangi AI kasblariga misollar?", "AI muhandisi, ma'lumotlar tahlilchisi, AI xavfsizlik mutaxassisi."],
          ["Kelajakda qadrli ko'nikmalar?", "Tanqidiy fikrlash, muloqot, ijodkorlik, AI savodxonligi."],
        ],
      },
      {
        n: 26, day: 'Chorshanba', title: "Dasturlash va AIning aloqasi",
        vositalar: [
          ['Scratch', 'https://scratch.mit.edu', "bolalar uchun blokli dasturlash"],
          ['ChatGPT', 'https://chatgpt.com', "kodni tushuntirish"],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<pre class="prompt">Men Scratch'da mushuk harakatlanadigan o'yin qilyapman, lekin
mushuk devordan o'tib ketyapti. Kodimni berma — menga sabab va
tekshirib ko'rishim kerak bo'lgan 3 ta narsani ayt:
"..."</pre>
<p>2026-da katta dasturchilar AI yordamchilari (GitHub Copilot, Cursor, Claude Code) bilan ishlaydi.</p>`,
        rubrika: [
          ["AI dasturlashga qanday yordam berishi tushuntirilgan", 3],
          ["Oddiy loyihada (Scratch/HTML) AIdan maslahat olingan", 4],
          ["Kodni ko'chirmay, tushunib ishlaganini izohlagan", 3],
        ],
        metod: `Maqsad — AIni dasturlashda yordamchi sifatida ko'rsatish, tayyor kod manbai emas.
Scratch yoki oddiy HTML yetarli; "kodni berma, kamchilikni ko'rsat" usulini qo'llang.
Kattalar ishi: AI kod yozishni tezlashtiradi, lekin tekshirish va fikrlash odamniki.`,
        maqsad: "Kod yozishda AI yordami va dasturlash asoslari haqida tushuncha olish.",
        faoliyat: "AIdan oddiy Python kodi yozishni so'rash, uni o'qish va tushunish.",
        nazariya: `
<h3>AI va dasturlash</h3>
<ul>
  <li>AI kod yozadi, tushuntiradi, xatolarni topadi: ChatGPT, Claude, Gemini, GitHub Copilot, Cursor kabi vositalar.</li>
  <li>2025–2026 yillarda <strong>AI agentlar</strong> paydo bo'ldi — ular bir nechta qadamli vazifalarni (kod yozish, ishga tushirish, tuzatish) o'zlari bajaradi.</li>
  <li>Lekin <strong>kodni tushunish</strong> va tekshirish baribir dasturchining ishi.</li>
</ul>
<h3>Birinchi Python kodi</h3>
<pre>ism = input("Ismingiz: ")
yosh = int(input("Yoshingiz: "))
print("Salom,", ism)
print("10 yildan keyin siz", yosh + 10, "yoshda bo'lasiz")</pre>
<h3>Kodni o'rganish uchun promptlar</h3>
<pre>"Shu kodni har qatorini 10 yoshli bolaga tushuntir"
"Bu kodda xato bormi? Tuzatma, faqat qayerdaligini ko'rsat"
"Menga shu kodni o'zgartirish uchun 3 ta kichik topshiriq ber"</pre>
<p class="hint">Kodni sinash uchun onlayn muhitlar: Google Colab, Replit va boshqalar (o'qituvchi yoki ota-ona akkaunti bilan).</p>`,
        amaliyot: {
          oson: [
            ["Kodni o'qish", "Yuqoridagi Python kodini AIdan har qatori bo'yicha tushuntirtiring va o'z so'zingiz bilan yozing."],
            ["Ishga tushirish", "Kodni onlayn muhitda ishga tushiring va natijani yozing."],
            ["Kichik o'zgarish", "Kodga yana bir qator qo'shing: tug'ilgan yilni hisoblasin."],
          ],
          orta: [
            ["Kalkulyator", "AIdan ikki sonni qo'shadigan oddiy Python dasturini so'rang, uni tushunib, ayirish va ko'paytirishni o'zingiz qo'shing."],
            ["Xato topish", "Ataylab xato qilingan kodni AIga «tuzatma, faqat ko'rsat» deb bering va o'zingiz tuzating."],
            ["Topshiriqlar", "AIdan kod bo'yicha 3 ta kichik topshiriq oling va bajaring."],
          ],
          qiyin: [
            ["O'yin", "AI yordamida «son topish» o'yinini yarating; har qatorini tushunganingizni o'qituvchiga tushuntiring."],
            ["Agent nima?", "AI agent va oddiy chat yordamchisining farqini misol bilan yozing."],
          ],
        },
        uyga: {
          oson: [
            ["Lug'at", "print, input, o'zgaruvchi, son, matn so'zlarini AI yordamida tushuntiring."],
            ["AI jurnali", "Kod bo'yicha AIga bergan eng yaxshi savolingizni yozing."],
          ],
          orta: [
            ["Mini dastur", "Yoshingizni so'rab, 18 dan katta yoki kichikligini aytadigan dastur yozing (AI faqat maslahat beradi)."],
            ["Kodni tushuntirish", "AI yozgan kodni oila a'zoingizga tushuntirib bering."],
          ],
          qiyin: [
            ["Ko'paytirish jadvali", "Python'da ko'paytirish jadvalini chiqaradigan dastur yozing va har qatorini izohlang."],
            ["Dasturlash yo'li", "Dasturlashni o'rganish uchun 3 oylik reja tuzing."],
          ],
        },
        savollar: [
          ["AI dasturlashda qanday yordam beradi?", "Kod yozish, tushuntirish, xato topish."],
          ["AI agent nima?", "Bir nechta qadamli vazifani o'zi bajaradigan AI tizimi."],
          ["print va input nima qiladi?", "print — chiqaradi, input — foydalanuvchidan ma'lumot oladi."],
          ["AI yozgan kodni nima qilish kerak?", "O'qish, tushunish va sinab tekshirish."],
        ],
      },
      {
        n: 27, day: 'Juma', title: "Tibbiyot, ta'lim, san'atda AI",
        vositalar: [
          ['Perplexity', 'https://www.perplexity.ai'],
          ['ChatGPT', 'https://chatgpt.com'],
          ['NotebookLM', 'https://notebooklm.google.com', "ta'limda — hujjat asosida o'rganish"],
        ],
        namuna: `<pre class="prompt">Ta'limda AI o'qituvchiga va o'quvchiga qanday yordam beradi?
3 ta foyda va 2 ta xavfni oddiy tilda yoz.</pre>`,
        rubrika: [
          ["3 sohada AI qo'llanishi misol bilan yozilgan", 4],
          ["Har sohada foyda va xavf ajratilgan", 3],
          ["«AI qarorni o'zi qabul qilmaydi» tamoyili tushunilgan", 3],
        ],
        metod: `Muhim xabar: tibbiyot, huquq kabi sohalarda AI — yordamchi, yakuniy qaror mutaxassisniki.
San'atda muallif huquqi va halollik (AI yordamini oshkor qilish) haqida qisqa muhokama o'tkazing.`,
        maqsad: "Turli sohalarda AI imkoniyatlari va cheklovlarini ko'rish.",
        faoliyat: "Guruhlar soha tanlab, AI bilan izlanib taqdimot qiladi.",
        nazariya: `
<h3>Tibbiyot</h3>
<ul>
  <li>Tasvirlarni (rentgen, MRT) tahlil qilishda shifokorga yordam.</li>
  <li>Oqsillar tuzilishini aniqlash (masalan, AlphaFold) — yangi dorilar izlash.</li>
  <li><strong>Lekin</strong>: tashxis va davolash — faqat shifokor qarori.</li>
</ul>
<h3>Ta'lim</h3>
<ul>
  <li>Shaxsiy o'quv yordamchilari, avtomatik mashqlar, til o'rganish.</li>
  <li>Imkoniyati cheklangan o'quvchilar uchun ovozli va matnli yordam.</li>
</ul>
<h3>San'at va ijod</h3>
<ul>
  <li>Rasm, musiqa, video yaratish; dizaynerlar uchun g'oyalar.</li>
  <li>Munozarali savollar: mualliflik huquqi, rassomlar ijodi hurmati.</li>
</ul>
<h3>Boshqa sohalar</h3>
<p>Qishloq xo'jaligi, transport (avtonom mashinalar), ekologiya (ob-havo bashorati), sport (o'yin tahlili).</p>`,
        amaliyot: {
          oson: [
            ["Soha tanlash", "Guruhingiz bilan bitta soha tanlang va unda AI ishlatiladigan 4 ta misol toping."],
            ["Foyda va xavf", "Tanlangan sohada AIning 3 ta foydasi va 2 ta xavfini yozing."],
            ["Manba", "Har misol uchun ishonchli manba toping."],
          ],
          orta: [
            ["Izlanish", "AI (Perplexity yoki chat + qidiruv) bilan sohaga oid 5 ta fakt to'plang va tekshiring."],
            ["Taqdimot rejasi", "4 slaydli taqdimot rejasini tuzing."],
            ["Qiziq misol", "Sohadagi eng qiziq AI loyihasini qisqa hikoya qilib yozing."],
          ],
          qiyin: [
            ["Guruh taqdimoti", "4 daqiqalik taqdimot qiling: soha, misollar, foyda, xavf, xulosa."],
            ["Savol-javob", "Boshqa guruhlarga 2 ta savol bering va ularning savollariga javob bering."],
          ],
        },
        uyga: {
          oson: [
            ["3 ta soha", "3 ta sohada AI qo'llanilishiga bittadan misol yozing."],
            ["AI jurnali", "Bugun bilgan eng hayratlanarli AI qo'llanilishini yozing."],
          ],
          orta: [
            ["Sog'liq qoidasi", "Nima uchun sog'liq masalasida faqat AIga tayanmaslik kerakligini 4 jumlada yozing."],
            ["San'at munozarasi", "«AI rasmi san'atmi?» savoliga o'z fikringizni dalillar bilan yozing."],
          ],
          qiyin: [
            ["Maqola", "Tanlangan soha bo'yicha 200 so'zlik maqola yozing (manbalar bilan)."],
            ["Yangi g'oya", "Maktabingiz yoki shahringiz uchun AI yordam beradigan bitta loyiha g'oyasini tasvirlang."],
          ],
        },
        savollar: [
          ["Tibbiyotda AI qanday yordam beradi?", "Tasvirlarni tahlil qilish, dorilar izlash; qarorni shifokor qiladi."],
          ["Ta'limda AIga misollar?", "Shaxsiy o'quv yordamchilari, til o'rganish, mashqlar."],
          ["San'atda AI bilan bog'liq munozarali savol?", "Mualliflik huquqi va rassomlar ijodini hurmat qilish."],
          ["Yana qaysi sohalarda AI ishlatiladi?", "Qishloq xo'jaligi, transport, ekologiya, sport."],
        ],
      },
    ]},

    { title: "10-hafta: Murakkab prompt strategiyalari", lessons: [
      {
        n: 28, day: 'Dushanba', title: "Tizimli prompt (System prompt) nima?",
        vositalar: [
          ['ChatGPT — Custom GPT', 'https://chatgpt.com', "o'z yordamchingizni yarating"],
          ['Gemini — Gems', 'https://gemini.google.com'],
          ['Claude — Projects', 'https://claude.ai'],
        ],
        namuna: `<p>System prompt — yordamchining «doimiy xarakteri va qoidalari». Shaxsiy o'quv yordamchisi uchun:</p>
<pre class="prompt">Sen mening tarix o'qituvchimsan. Doim 7-sinf darajasida, sodda tilda
gapir. Javobni darhol berma — avval yo'naltiruvchi savol ber. Har
tushuntirishdan keyin 1 ta qisqa mashq taklif qil. Faqat o'zbek tilida yoz.</pre>`,
        rubrika: [
          ["System prompt va oddiy prompt farqi tushunilgan", 3],
          ["Shaxsiy yordamchi uchun system prompt yozilgan", 4],
          ["Custom GPT/Gem/Project sinab ko'rilgan", 3],
        ],
        metod: `Bu zamonaviy va qiziqarli dars: o'quvchilar o'z AI yordamchisini (Custom GPT / Gem / Project) yaratadi.
System prompt — yordamchining xulqi va qoidalari; uni aniq va qisqa yozish muhim.
Akkaunt cheklovi bo'lsa, system promptni oddiy chat boshida yozib sinash ham mumkin.`,
        maqsad: "Tizimli ko'rsatmalar, maxsus yordamchilar va API qanday ishlashini tushunish.",
        faoliyat: "Maxsus yordamchi (Custom GPT, Claude Project yoki Gem) yaratish va API namunasini ko'rish.",
        nazariya: `
<h3>Tizimli prompt nima?</h3>
<p><strong>System prompt</strong> — AIning <em>butun suhbat davomidagi</em> xulq-atvorini belgilaydigan doimiy ko'rsatma: kim ekani, qanday javob berishi, nimani qilmasligi.</p>
<pre>Sen "Matematika do'sti" nomli yordamchisan.
- 6-sinf o'quvchilari bilan gaplashasan.
- Hech qachon to'g'ridan-to'g'ri javob bermaysan, savollar bilan yo'naltirasan.
- Har javob 5 jumladan oshmaydi.
- Mavzudan tashqari savollarga muloyimlik bilan rad javobini berasan.</pre>
<h3>Qayerda ishlatiladi?</h3>
<ul>
  <li><strong>Maxsus yordamchilar</strong>: ChatGPT'da Custom GPT, Claude'da Project, Gemini'da Gem — ko'rsatma va fayllar bilan o'z yordamchingizni yaratish.</li>
  <li><strong>Shaxsiy sozlamalar</strong>: «Custom instructions» — har suhbatda hisobga olinadi.</li>
  <li><strong>API</strong> — dasturchilar AIni o'z ilovasiga ulaydi; system prompt ilova uchun qoidalarni belgilaydi.</li>
</ul>
<pre>API namunasi (tushunish uchun):
system: "Sen qisqa javob beradigan geografiya yordamchisisan."
user:   "Eng uzun daryo qaysi?"</pre>`,
        amaliyot: {
          oson: [
            ["Tuzilma", "Tizimli promptning 4 qismini (kim, kim bilan, qoidalar, cheklovlar) yozing."],
            ["Oddiy va tizimli", "Bitta savolni oddiy chatda va «Matematika do'sti» ko'rsatmasi bilan so'rang. Farqni yozing."],
            ["Qoida sinovi", "Yordamchiga mavzudan tashqari savol bering — qoidaga amal qildimi?"],
          ],
          orta: [
            ["O'z yordamchingiz", "O'qituvchi akkauntida bitta fan uchun maxsus yordamchi yarating (Custom GPT, Claude Project yoki Gem)."],
            ["Fayl qo'shish", "Yordamchiga konspekt yoki darslik bo'limini fayl qilib qo'shing va undan savol bering."],
            ["Sinab ko'rish", "Sinfdoshingiz yordamchingizni 5 ta savol bilan sinasin va xato joylarni yozsin."],
          ],
          qiyin: [
            ["Takomillashtirish", "Sinov natijalariga ko'ra tizimli promptni 2 marta yaxshilang."],
            ["API namunasi", "O'qituvchi ko'rsatgan API namunasida system va user xabarlari farqini tushuntiring."],
          ],
        },
        uyga: {
          oson: [
            ["Ko'rsatma yozish", "Ingliz tili mashqi uchun yordamchining tizimli promptini yozing."],
            ["AI jurnali", "Maxsus yordamchi yaratish tajribangizni yozing."],
          ],
          orta: [
            ["Custom instructions", "O'zingiz uchun shaxsiy ko'rsatmalar matnini yozing (shaxsiy ma'lumotsiz): qanday javob kerak, qanday uslubda."],
            ["Qoidalar", "Bolalar uchun xavfsiz yordamchining 6 ta qoidasini yozing."],
          ],
          qiyin: [
            ["Yordamchilar to'plami", "3 ta turli maqsad uchun tizimli promptlar to'plamini tuzing."],
            ["Taqqoslash", "Bir xil vazifani tizimli prompt bilan va usiz bajarib, natijalarni tahlil qiling."],
          ],
        },
        savollar: [
          ["System prompt nima?", "AIning butun suhbat davomidagi xulq-atvorini belgilovchi doimiy ko'rsatma."],
          ["Maxsus yordamchilarga misollar?", "Custom GPT, Claude Project, Gemini Gem."],
          ["API nima?", "Dasturlarni AIga ulash usuli."],
          ["Tizimli promptning qismlari?", "Rol, auditoriya, qoidalar, cheklovlar."],
        ],
      },
      {
        n: 29, day: 'Chorshanba', title: "Multimodal prompting (matn + rasm + ovoz)",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "rasm, ovoz, fayl"],
          ['Gemini', 'https://gemini.google.com', "kamera va rasm"],
          ['NotebookLM', 'https://notebooklm.google.com', "audio-sharh"],
        ],
        namuna: `<pre class="prompt">(Daftardagi masala rasmini yuklang)
Bu rasmdagi masalaning faqat birinchi qadamini ko'rsat.
Javobni berma — men davom ettiraman.</pre>
<p>Multimodal = AI matn bilan birga rasm, ovoz va faylni ham tushunadi.</p>`,
        rubrika: [
          ["Multimodal tushunchasi misol bilan yozilgan", 3],
          ["Rasm yoki fayl yuklab, sifatli natija olingan", 4],
          ["Ovozli rejim yoki audio-sharh sinalgan", 3],
        ],
        metod: `Eng ta'sirli qism — rasm yuklab savol berish; har o'quvchi bitta rasm bilan sinasin.
Shaxsiy ma'lumotli rasmlar (hujjat, pasport) yuklanmasligini eslating.`,
        maqsad: "Matn, rasm va ovozni birgalikda ishlatish.",
        faoliyat: "Rasm yuklab tavsif va tahlil so'rash mashqi.",
        nazariya: `
<h3>Multimodal AI</h3>
<p>Zamonaviy AI <strong>matn, rasm, ovoz, video va hujjatlarni</strong> tushunadi va yarata oladi.</p>
<ul>
  <li><strong>Rasm → matn</strong>: rasmdagi narsalarni tavsiflash, jadval yoki qo'lyozmani o'qish, diagrammani tushuntirish.</li>
  <li><strong>Matn → rasm</strong>: tasviriy prompt bo'yicha rasm yaratish.</li>
  <li><strong>Ovoz</strong>: ovozli suhbat, talaffuz mashqi, audio-sharhlar (NotebookLM).</li>
  <li><strong>Kamera</strong>: real vaqtda atrofdagi narsani ko'rsatib savol berish (ba'zi ilovalarda).</li>
</ul>
<h3>Rasm bilan yaxshi prompt</h3>
<pre>[rasm yuklangan]
Bu mening geografiya xaritam rasmi. Unda qaysi davlatlar ko'rsatilgan?
Har biri uchun poytaxtini jadvalda yoz. Agar biror joyni aniq ko'ra
olmasang, "aniq emas" deb yoz.</pre>
<p class="hint">Rasmda shaxsiy ma'lumot (hujjat, manzil, boshqalarning yuzi) bo'lmasin.</p>`,
        amaliyot: {
          oson: [
            ["Rasm tavsifi", "Sinfdagi biror narsaning rasmini yuklab, AIdan tavsif so'rang."],
            ["Qo'lyozma", "Daftaringizdagi bir qator qo'lyozmani rasmga olib, matnga aylantiring."],
            ["Ovozli savol", "Ovozli rejimda bitta fan savolini bering."],
          ],
          orta: [
            ["Diagramma", "Darslikdagi diagramma rasmini yuklab, tushuntirish va 3 ta savol so'rang."],
            ["Rasm + vazifa", "Rasm bilan birga aniq vazifa bering (jadval qilib, «aniq emas» qoidasi bilan)."],
            ["Audio-sharh", "NotebookLM'da konspektdan audio-sharh yaratib tinglang (mavjud bo'lsa)."],
          ],
          qiyin: [
            ["Zanjir", "Rasm → tavsif → shu tavsif asosida yangi rasm yaratish. Natijalarni solishtiring."],
            ["Aniqlik sinovi", "Sifati past rasmni yuklab, AI qanchalik aniq ko'rishini tekshiring va xatolarini yozing."],
          ],
        },
        uyga: {
          oson: [
            ["Uydagi narsalar", "Uydagi 3 ta narsaning rasmini (shaxsiy ma'lumotsiz) AIga tavsiflating."],
            ["AI jurnali", "Multimodal mashqlardagi eng foydali natijani yozing."],
          ],
          orta: [
            ["O'simlik yoki hayvon", "Bitta o'simlik rasmini yuklab, turini aniqlating va boshqa manbada tekshiring."],
            ["Talaffuz", "Ovozli rejimda 10 ta qiyin inglizcha so'zni talaffuz qilib, maslahat oling."],
          ],
          qiyin: [
            ["Multimodal loyiha", "Rasm, matn va ovozdan foydalanib, bitta mavzu bo'yicha kichik o'quv materiali tayyorlang."],
            ["Cheklovlar", "Multimodal AI xato qilgan 2 ta holatni yozing va sababini taxmin qiling."],
          ],
        },
        savollar: [
          ["Multimodal AI nima?", "Matn, rasm, ovoz, video va hujjatlar bilan ishlay oladigan AI."],
          ["Rasm bilan ishlashda foydali qoida?", "Aniq vazifa berish va «aniq ko'rmasang, ayt» deb yozish."],
          ["Rasmga nima tushmasligi kerak?", "Shaxsiy ma'lumot: hujjatlar, manzil, boshqalarning yuzi."],
          ["Ovozli rejim nima uchun foydali?", "Gapirish va talaffuz mashqi, tez savol-javob."],
        ],
      },
      {
        n: 30, day: 'Juma', title: "Prompt muhandisi kasbi",
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<p>Prompt muhandisi vazifasini sinash — bir vazifaga "mukammal" ko'rsatma yozish:</p>
<pre class="prompt">Maqsad: istalgan matndan 3 ta kalit fikr + 1 jumlalik xulosa.
Sen tahlilchisan. Chiqishni shunday ber:
• Kalit fikr 1
• Kalit fikr 2
• Kalit fikr 3
Xulosa: ...
Faqat shu formatda yoz.</pre>
<p>2026-da AI agentlar (o'zi bosqichma-bosqich vazifa bajaradigan AI) tobora ko'proq ishlatilmoqda.</p>`,
        rubrika: [
          ["Prompt muhandisi nima qilishi tushuntirilgan", 3],
          ["Bir vazifaga qayta ishlatiladigan shablon yozilgan", 4],
          ["AI agent tushunchasi oddiy tushuntirilgan", 3],
        ],
        metod: `Prompt muhandisligi — real va o'sib borayotgan ko'nikma; uni "AIga aniq topshiriq berish san'ati" deb taqdim eting.
AI agent tushunchasini sodda bering: "o'zi reja tuzib, qadamlarni bajaradigan AI" — kelajak yo'nalishi.`,
        maqsad: "AI bilan bog'liq kasblar haqida ilhom olish va prompt mahoratini sinash.",
        faoliyat: "«Eng yaxshi prompt kim?» musobaqasi.",
        nazariya: `
<h3>Prompt muhandisi kim?</h3>
<p>AI tizimlariga ko'rsatmalar yozadigan, ularni sinab va yaxshilab, AIni ishonchli ishlatadigan mutaxassis. 2026 yilga kelib bu ko'nikma ko'pincha alohida kasb emas, balki <strong>dasturchi, tahlilchi, o'qituvchi, marketolog</strong> va boshqa kasblarning muhim qismi bo'lib qolmoqda.</p>
<h3>Kerakli ko'nikmalar</h3>
<ul>
  <li>Aniq yozish va mantiqiy fikrlash.</li>
  <li>Sinash: bir xil vazifani turli promptlar bilan solishtirish.</li>
  <li>Soha bilimi (tibbiyot, ta'lim, huquq ...).</li>
  <li>AI xavfsizligi va axloqi.</li>
  <li>Asosiy dasturlash va ingliz tili.</li>
</ul>
<h3>Musobaqa qoidalari</h3>
<ol>
  <li>Hammaga bir xil vazifa beriladi.</li>
  <li>Har kim 2 urinishda eng yaxshi promptni yozadi.</li>
  <li>Hakamlar mezonlari: natija sifati, aniqlik, prompt qisqaligi, xavfsizlik.</li>
</ol>`,
        amaliyot: {
          oson: [
            ["Ko'nikmalar", "Prompt mahoratiga kerakli 5 ta ko'nikmani yozing va o'zingizni har biri bo'yicha 1–5 baholang."],
            ["1-tur", "Musobaqa 1-turi: berilgan oddiy vazifa uchun prompt yozing."],
            ["Baholash", "Sinfdoshlaringizning 3 ta promptini mezonlar bo'yicha baholang."],
          ],
          orta: [
            ["2-tur", "Musobaqa 2-turi: few-shot yoki CoT talab qiladigan vazifa uchun prompt yozing."],
            ["Qisqa va kuchli", "Promptingizni natija yomonlashmagan holda iloji boricha qisqartiring."],
            ["Tahlil", "G'olib promptni tahlil qiling: nima uchun yaxshi ishladi?"],
          ],
          qiyin: [
            ["Final", "Final vazifasi: tizimli prompt bilan kichik yordamchi yarating va hakamlar savollariga bardosh beradimi — sinang."],
            ["Mening uslubim", "Kurs davomida o'zingiz uchun shakllangan prompt yozish qoidalarini (5–7 band) yozing."],
          ],
        },
        uyga: {
          oson: [
            ["AI jurnali", "Musobaqadagi eng yaxshi promptingizni jurnalga yozing."],
            ["Kasblar", "Prompt mahorati kerak bo'ladigan 5 ta kasbni yozing."],
          ],
          orta: [
            ["Vakansiyalar", "AI bilan bog'liq 2 ta vakansiya toping va talablarini yozing."],
            ["Mashq", "Uyda bitta vazifani 3 xil texnika bilan bajarib, eng yaxshisini tanlang."],
          ],
          qiyin: [
            ["Portfel", "Kurs davomidagi eng yaxshi 10 ta promptdan portfel tuzing: vazifa, prompt, natija, xulosa."],
            ["Kelajak rejasi", "AI bilan bog'liq qaysi yo'nalishni o'rganmoqchisiz? 6 oylik reja yozing."],
          ],
        },
        savollar: [
          ["Prompt muhandisi nima qiladi?", "AIga ko'rsatmalar yozadi, ularni sinaydi va yaxshilaydi."],
          ["Prompt mahorati uchun kerakli ko'nikmalar?", "Aniq yozish, mantiq, sinash, soha bilimi, xavfsizlik."],
          ["Yaxshi promptni qanday baholaymiz?", "Natija sifati, aniqlik, qisqalik, xavfsizlik."],
          ["2026 yilda prompt mahorati qayerda kerak?", "Ko'p kasblarda: dasturchi, tahlilchi, o'qituvchi, marketolog."],
        ],
      },
    ]},

    { title: "11-hafta: Yakuniy loyiha tayyorlash", lessons: [
      {
        n: 31, day: 'Dushanba', title: "Loyiha tanlash va rejalashtirish", tag: 'loyiha',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com', "g'oya va reja"],
          ['Claude', 'https://claude.ai'],
          ['Canva', 'https://www.canva.com'],
        ],
        namuna: `<p>Yakuniy loyiha g'oyalari: AI yordamchi (Custom GPT), rasmli hikoya/komiks, bilim-boti, maktab muammosiga yechim, mini-tadqiqot.</p>
<pre class="prompt">Men "..." mavzusida yakuniy loyiha qilmoqchiman. 3 ta variant g'oya ber,
har biriga: maqsad, kerakli qadamlar, qanday AI vositasi kerakligi.</pre>`,
        rubrika: [
          ["Loyiha mavzusi aniq va o'quvchiga mos", 3],
          ["Maqsad va natija aniq yozilgan", 3],
          ["3–5 qadamli reja tuzilgan", 4],
        ],
        metod: `Yakuniy loyiha 3 darsga (31–33) + taqdimot (34–35) mo'ljallangan.
Loyiha o'quvchining qiziqishiga mos bo'lsin; AI — vosita, asosiy g'oya va mehnat o'quvchiniki.
Rejani yozma holda talab qiling — bu keyingi darslarni yengillashtiradi.`,
        maqsad: "O'z AI loyihasini tanlash va rejalashtirish.",
        faoliyat: "Mavzu tanlash: maxsus yordamchi (chatbot), maqola yoki jurnal, rasm seriyasi, o'quv materiali.",
        nazariya: `
<h3>Loyiha turlari</h3>
<ul>
  <li><strong>Maxsus yordamchi</strong> — tizimli prompt bilan fan yoki mavzu bo'yicha chatbot (Custom GPT, Claude Project, Gem).</li>
  <li><strong>Maqola yoki sinf jurnali</strong> — AI bilan hamkorlikda yozilgan, manbali maqolalar.</li>
  <li><strong>Rasm seriyasi yoki komiks</strong> — bitta hikoya yoki mavzuda 4–8 ta rasm.</li>
  <li><strong>O'quv materiali</strong> — mavzu bo'yicha qo'llanma, test, kartochkalar, audio-sharh.</li>
</ul>
<h3>Loyiha rejasi</h3>
<ol>
  <li><strong>Muammo/maqsad</strong> — kimga va nima uchun kerak?</li>
  <li><strong>Natija</strong> — oxirida nima bo'ladi?</li>
  <li><strong>Vositalar</strong> — qaysi AI va dasturlar.</li>
  <li><strong>Bosqichlar va muddatlar</strong> — 32-, 33-darslarda nima qilinadi.</li>
  <li><strong>Baholash</strong> — loyiha muvaffaqiyatli ekanini qanday bilamiz?</li>
</ol>`,
        amaliyot: {
          oson: [
            ["G'oyalar", "AIdan 10 ta loyiha g'oyasi so'rang va 3 tasini tanlang."],
            ["Tanlov", "3 ta g'oyani qiziqish, foydalilik va bajarish mumkinligi bo'yicha baholab, bittasini tanlang."],
            ["Maqsad", "Loyihangiz maqsadini 2 jumlada yozing: kimga va nima uchun."],
          ],
          orta: [
            ["Reja", "5 bandli loyiha rejasini to'ldiring."],
            ["Vositalar", "Qaysi AI vositalarini va nima uchun ishlatishingizni yozing."],
            ["Maslahat", "Rejangizni AIga berib, «zaif tomonlarini ko'rsat» deb so'rang va rejani yaxshilang."],
          ],
          qiyin: [
            ["Muvaffaqiyat mezonlari", "Loyihangiz uchun 4 ta aniq baholash mezonini yozing."],
            ["Tasdiq", "Rejangizni o'qituvchiga 1 daqiqada tushuntiring va tasdiqlating."],
          ],
        },
        uyga: {
          oson: [
            ["Material", "Loyiha uchun kerakli ma'lumot va manbalarni to'plashni boshlang."],
            ["AI jurnali", "Loyiha uchun ishlatgan promptlaringizni jurnalga yozib boring."],
          ],
          orta: [
            ["Birinchi qadam", "Rejangizdagi birinchi bosqichni boshlang."],
            ["Foydalanuvchi", "Loyihangizdan foydalanadigan odamdan (sinfdosh, uka) nima kerakligini so'rang."],
          ],
          qiyin: [
            ["Xavflar", "Loyihada nima noto'g'ri ketishi mumkin? 3 ta xavf va yechimini yozing."],
            ["Namuna", "Loyihangizning kichik namunasini (bitta sahifa, bitta rasm yoki 3 savolli sinov) tayyorlang."],
          ],
        },
        savollar: [
          ["Loyiha turlariga misollar?", "Maxsus yordamchi, maqola, rasm seriyasi, o'quv materiali."],
          ["Loyiha rejasining 5 qismi?", "Maqsad, natija, vositalar, bosqichlar, baholash."],
          ["Nima uchun muvaffaqiyat mezonlari kerak?", "Loyiha natijasini aniq baholash uchun."],
          ["Rejani yaxshilashda AIdan qanday foydalanish mumkin?", "Zaif tomonlarni ko'rsatishini so'rash."],
        ],
      },
      {
        n: 32, day: 'Chorshanba', title: "Loyiha ustida ishlash (1-qism)", tag: 'loyiha',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
          ['Perplexity', 'https://www.perplexity.ai', "faktlarni tekshirish"],
        ],
        namuna: `<p>Ishni bosqichlarga bo'ling va har bosqichda AIdan aniq yordam so'rang:</p>
<pre class="prompt">Loyiham: "...". Hozir 2-qadamdaman: "...".
Menga tayyor natija berma — qanday boshlashim va nimaga e'tibor berishim
kerakligini 3 ta maslahat bilan ayt.</pre>`,
        rubrika: [
          ["Rejadagi bosqichlar bo'yicha ish boshlangan", 4],
          ["AIdan maslahat olingan, ko'chirma emas", 3],
          ["Jarayon (nima qilindi) qayd etilgan", 3],
        ],
        metod: `Bu amaliy dars — o'quvchilar ustida ishlaydi, siz yurib maslahat berasiz.
Ko'p uchraydigan xato: AIdan tayyor natija so'rash; "maslahat so'ra, o'zing bajar" qoidasini eslatib turing.`,
        maqsad: "Loyihaning asosiy qismini yaratish.",
        faoliyat: "AI bilan ishlash; o'qituvchi ko'rib chiqadi va maslahat beradi.",
        nazariya: `
<h3>Ish jarayoni</h3>
<ul>
  <li>Rejadagi bosqichlarni ketma-ket bajaring.</li>
  <li>Har bir muhim promptni va natijani <strong>jurnalga</strong> yozing (keyin taqdimotda kerak bo'ladi).</li>
  <li>Faktlarni tekshiring, manbalarni saqlang.</li>
  <li>Ijodiy qismlarni (g'oya, asosiy matn, qarorlar) o'zingiz qiling.</li>
</ul>
<h3>O'qituvchi bilan tekshiruv nuqtasi</h3>
<ul>
  <li>Nima tayyor?</li>
  <li>Qayerda qiyinchilik bor?</li>
  <li>Keyingi darsga nima qolgan?</li>
</ul>
<h3>Loyiha turlari bo'yicha 1-qism</h3>
<ul>
  <li><strong>Yordamchi</strong>: tizimli prompt + 1-sinov.</li>
  <li><strong>Maqola</strong>: izlanish + qoralama.</li>
  <li><strong>Rasm seriyasi</strong>: hikoya rejasi + dastlabki 3–4 rasm.</li>
  <li><strong>O'quv materiali</strong>: tuzilma + asosiy qism.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Ish rejasi", "Bugungi dars uchun 3 ta aniq vazifa yozing."],
            ["Jurnal", "Har bir muhim promptni va natijasini jurnalga yozing."],
            ["Manbalar", "Ishlatgan manbalaringiz ro'yxatini boshlang."],
          ],
          orta: [
            ["Asosiy qism", "Loyiha turi bo'yicha 1-qismni bajaring (yordamchi, maqola, rasmlar yoki material)."],
            ["Tekshiruv", "Faktlarni tekshiring va xatolarni tuzating."],
            ["O'qituvchi bilan", "Tekshiruv nuqtasi savollariga javob bering va maslahatni yozib oling."],
          ],
          qiyin: [
            ["Sinov", "Loyiha qismini bitta sinfdoshingizda sinab ko'ring va fikrini yozing."],
            ["Muammo yechish", "Duch kelgan bitta muammoni iteratsiya yordamida hal qiling va jarayonni yozing."],
          ],
        },
        uyga: {
          oson: [
            ["Davom ettirish", "1-qismni tugatish uchun 30 daqiqa ishlang."],
            ["AI jurnali", "Bugungi eng foydali promptni yozing."],
          ],
          orta: [
            ["Fikr", "Oila a'zoingizga loyihani ko'rsatib, 2 ta fikr oling."],
            ["Ro'yxat", "2-qismda nima qilinishi kerakligini ro'yxat qiling."],
          ],
          qiyin: [
            ["Sifat", "Loyihangizni mezonlar bo'yicha o'zingiz baholang va zaif joyni aniqlang."],
            ["Qo'shimcha", "Loyihaga bitta qo'shimcha element (rasm, test, audio) qo'shish rejasini tuzing."],
          ],
        },
        savollar: [
          ["Loyiha jurnali nima uchun kerak?", "Jarayonni kuzatish va taqdimotda ko'rsatish uchun."],
          ["Loyihaning qaysi qismlarini o'quvchi o'zi qiladi?", "G'oya, asosiy matn, muhim qarorlar."],
          ["Tekshiruv nuqtasida nimalar so'raladi?", "Nima tayyor, qiyinchilik nimada, nima qolgan."],
          ["Sinov nima uchun kerak?", "Haqiqiy foydalanuvchi fikri bilan loyihani yaxshilash uchun."],
        ],
      },
      {
        n: 33, day: 'Juma', title: "Loyiha ustida ishlash (2-qism)", tag: 'loyiha',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai', "tahrir va sayqal"],
          ['Canva', 'https://www.canva.com'],
        ],
        namuna: `<pre class="prompt">Loyiham deyarli tayyor. Quyidagi natijamni ko'rib, mazmunini o'zgartirmay,
3 ta kamchilikni va qanday yaxshilashimni ayt:
"..."</pre>`,
        rubrika: [
          ["Loyiha yakunlangan va ishlaydigan", 5],
          ["AI yordami oshkor va o'rinli", 3],
          ["O'z-o'zini tekshirish (xatolar tuzatilgan)", 2],
        ],
        metod: `Loyihani yakunlash va sayqallash darsi; AIni tahrirchi sifatida ishlatishni o'rgating.
Taqdimotdan oldin har loyiha ishlashini tekshiring (bot javob beradimi, havola ochiladimi va h.k.).`,
        maqsad: "Loyihani takomillashtirish va bezash.",
        faoliyat: "Tengdoshlar baholashi (peer review): do'stlar fikr bildiradi.",
        nazariya: `
<h3>Tengdoshlar baholashi (peer review)</h3>
<p>Sinfdoshlar bir-birining loyihasini mezonlar asosida ko'rib chiqadi. Maqsad — tanqid emas, <strong>yaxshilash</strong>.</p>
<pre>"Ikki yulduz va bir istak" usuli:
⭐ Menga yoqdi: ...
⭐ Menga yoqdi: ...
🙏 Taklifim: ...</pre>
<h3>Baholash mezonlari</h3>
<ul>
  <li>Maqsad aniq va natija foydali.</li>
  <li>AI to'g'ri va halol ishlatilgan, hissasi ko'rsatilgan.</li>
  <li>Ma'lumotlar tekshirilgan, manbalar bor.</li>
  <li>Xavfsizlik va maxfiylik qoidalariga amal qilingan.</li>
  <li>Ko'rinishi tartibli va chiroyli.</li>
</ul>
<h3>Yakunlash</h3>
<ul>
  <li>Fikrlarni ko'rib chiqib, eng muhim 2–3 tasini amalga oshiring.</li>
  <li>Loyihani bezang: sarlavha, rasm, tartib.</li>
  <li>Taqdimot uchun «AI bilan qanday ishladim» bo'limini tayyorlang.</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Peer review", "2 ta sinfdoshingiz loyihasini «ikki yulduz va bir istak» usulida baholang."],
            ["Fikrlarni yig'ish", "Sizning loyihangizga berilgan fikrlarni ro'yxat qiling."],
            ["Tanlov", "Eng muhim 2–3 taklifni tanlang."],
          ],
          orta: [
            ["Takomillashtirish", "Tanlangan takliflarni amalga oshiring."],
            ["Bezash", "Loyihaga sarlavha, rasm va tartibli ko'rinish bering."],
            ["AI hissasi", "«AI bilan qanday ishladim» bo'limini yozing: qaysi vosita, qaysi promptlar, nimani o'zingiz qildingiz."],
          ],
          qiyin: [
            ["Mezonlar bo'yicha tekshiruv", "Loyihani 5 mezon bo'yicha qayta tekshiring va kamchiliklarni tuzating."],
            ["Yakuniy sinov", "Loyihani 2 ta yangi foydalanuvchida sinab, oxirgi tuzatishlarni kiriting."],
          ],
        },
        uyga: {
          oson: [
            ["Yakunlash", "Loyihani to'liq tayyor holga keltiring."],
            ["AI jurnali", "Loyiha davomida o'rgangan 3 ta narsani yozing."],
          ],
          orta: [
            ["Nusxa", "Loyiha fayllarini bitta papkaga to'plab, Drive'ga saqlang."],
            ["Tashakkur", "Fikr bildirgan sinfdoshlaringizga qisqa minnatdorchilik xati yozing."],
          ],
          qiyin: [
            ["Oldin va keyin", "Loyihaning birinchi va oxirgi versiyasini solishtirib, nima yaxshilanganini yozing."],
            ["Taqdimot rejasi", "Yakuniy taqdimot uchun 5 slaydli reja tuzing."],
          ],
        },
        savollar: [
          ["Peer review nima?", "Tengdoshlarning mezonlar asosida bir-birining ishini baholashi."],
          ["«Ikki yulduz va bir istak» usuli?", "Ikkita yoqqan jihat va bitta yaxshilash taklifi."],
          ["Loyihani baholash mezonlariga misollar?", "Aniq maqsad, halol AI foydalanish, tekshirilgan ma'lumot, xavfsizlik, ko'rinish."],
          ["«AI bilan qanday ishladim» bo'limida nima bo'ladi?", "Vositalar, promptlar va o'quvchining o'z hissasi."],
        ],
      },
    ]},

    { title: "12-hafta: Taqdimot va yakunlash", lessons: [
      {
        n: 34, day: 'Dushanba', title: "Taqdimotga tayyorgarlik",
        vositalar: [
          ['Canva', 'https://www.canva.com'],
          ['Gamma', 'https://gamma.app', "matndan taqdimot"],
          ['ChatGPT', 'https://chatgpt.com', "nutq rejasi va savollar"],
        ],
        namuna: `<pre class="prompt">Loyiham haqida 2 daqiqalik og'zaki taqdimot rejasini tuz:
1 ta jalb qiluvchi boshlanish, 3 ta asosiy fikr, 1 ta kuchli yakun.
Shuningdek, tinglovchilar berishi mumkin bo'lgan 3 ta savolni ham yoz.</pre>`,
        rubrika: [
          ["Taqdimot tuzilmasi (boshlanish-mazmun-yakun)", 4],
          ["Slaydlar qisqa va tushunarli", 3],
          ["Bo'lishi mumkin savollarga tayyorgarlik", 3],
        ],
        metod: `Og'zaki ko'nikma — ko'pchilik uchun eng qiyin qism; mashq va repetisiyaga vaqt ajrating.
AIdan "bo'lishi mumkin savollar"ni so'rash o'quvchini ishonchli qiladi.
Eslatma: slaydni o'qib bermaslik, tinglovchiga qarab gapirish.`,
        maqsad: "Loyiha uchun nutq va slaydlarni tayyorlash.",
        faoliyat: "3 daqiqalik nutq mashqi.",
        nazariya: `
<h3>3 daqiqalik taqdimot tuzilishi</h3>
<pre>0:00–0:30  Kirish: men kimman, loyiham nima haqida
0:30–1:15  Muammo va maqsad: kimga, nima uchun kerak
1:15–2:15  Natija: loyihani ko'rsatish (demo)
2:15–2:45  AI bilan qanday ishladim, nimani o'rgandim
2:45–3:00  Xulosa va rahmat</pre>
<h3>Yaxshi nutq maslahatlari</h3>
<ul>
  <li>Tomoshabinga qarab gapiring, sekin va aniq.</li>
  <li>Slayddagi matnni o'qimang — o'z so'zlaringiz bilan.</li>
  <li>Demo oldindan tayyorlangan bo'lsin (internet bo'lmasa — skrinshotlar).</li>
  <li>Savollarga tayyorlaning.</li>
</ul>
<h3>AI bilan mashq</h3>
<pre>Sen maktab hakamlar hay'ati a'zosisan. Men 3 daqiqalik loyiha
taqdimotini gapiraman. Keyin menga 3 ta savol ber va nutqimni
aniqlik, tuzilish va ishonch bo'yicha baholab, 2 ta maslahat ber.</pre>`,
        amaliyot: {
          oson: [
            ["Tuzilma", "3 daqiqalik taqdimot tuzilmasi bo'yicha har bo'lim uchun 2–3 jumla yozing."],
            ["Slaydlar", "5 slaydni tayyorlang yoki tugating."],
            ["Demo", "Loyihangizning demo qismini tayyorlang (zaxira skrinshotlar bilan)."],
          ],
          orta: [
            ["Vaqt", "Nutqni gapirib, vaqtini o'lchang va 3 daqiqaga moslang."],
            ["AI hakam", "AIga «hakam» rolini berib, nutqingizni ovozli rejimda yoki matn sifatida baholating."],
            ["Savollar", "AI bergan savollarga javoblarni tayyorlang."],
          ],
          qiyin: [
            ["Juftlikda mashq", "Sinfdoshingiz oldida gapiring va u 3 mezon bo'yicha baholasin."],
            ["Qiyin savol", "Loyihangiz haqidagi eng qiyin savolni o'zingiz o'ylab toping va javob tayyorlang."],
          ],
        },
        uyga: {
          oson: [
            ["Mashq", "Nutqni uyda 3 marta gapirib mashq qiling."],
            ["AI jurnali", "AI hakam bergan eng foydali maslahatni yozing."],
          ],
          orta: [
            ["Oila oldida", "Taqdimotni oilangizga ko'rsating va savollarini yozing."],
            ["Video", "Nutqingizni telefonga yozib, ko'rib chiqing va 2 ta narsani yaxshilang."],
          ],
          qiyin: [
            ["Tayyorlik ro'yxati", "Taqdimot kuni uchun tayyorlik ro'yxatini tuzing (fayllar, internet, zaxira, vaqt)."],
            ["Ingliz tilida", "Taqdimot kirish qismini ingliz tilida ham tayyorlang."],
          ],
        },
        savollar: [
          ["3 daqiqalik taqdimot qismlari?", "Kirish, muammo va maqsad, natija (demo), AI bilan ishlash, xulosa."],
          ["Slayddagi matnni o'qish kerakmi?", "Yo'q, o'z so'zlari bilan gapirish kerak."],
          ["AI taqdimotga tayyorlanishda qanday yordam beradi?", "Hakam rolida baholash, savollar berish, maslahat."],
          ["Demo uchun zaxira nima?", "Internet bo'lmasa ishlatiladigan skrinshotlar yoki video."],
        ],
      },
      {
        n: 35, day: 'Chorshanba', title: "Yakuniy loyiha taqdimotlari", tag: 'loyiha',
        vositalar: [
          ['Canva', 'https://www.canva.com'],
          ['ChatGPT', 'https://chatgpt.com'],
        ],
        namuna: `<p>Taqdimot kuni tartibi: har o'quvchi 2–3 daqiqa gapiradi, 1 daqiqa savol-javob. Baholash mezoni oldindan ko'rsatiladi.</p>`,
        rubrika: [
          ["Loyiha g'oyasi va foydaliligi", 4],
          ["Bajarilish sifati (ishlaydi, to'liq)", 5],
          ["AIdan to'g'ri va halol foydalanilgani", 4],
          ["Og'zaki taqdimot (ravon, aniq)", 4],
          ["Savollarga javob", 3],
        ],
        metod: `Baholash mezonini (jami 20 ball) o'quvchilarga oldindan bering — bu adolatli va shaffof.
Har taqdimotdan keyin 1 ta kuchli tomon va 1 ta maslahat ayting; ijobiy muhit saqlang.
O'zaro baholash (o'quvchilar bir-biriga ball qo'yishi) qiziqarli va foydali bo'ladi.`,
        maqsad: "O'rganganlarni namoyish qilish.",
        faoliyat: "Har bir o'quvchi o'z loyihasini taqdim etadi.",
        nazariya: `
<h3>Taqdimot kuni tartibi</h3>
<ol>
  <li>Har o'quvchi: 3 daqiqa taqdimot + 1–2 daqiqa savol-javob.</li>
  <li>Tomoshabinlar baholash varag'ini to'ldiradi.</li>
  <li>Oxirida eng yaxshi loyihalar uchun ovoz berish (turli nominatsiyalar).</li>
</ol>
<h3>Baholash varag'i</h3>
<ul>
  <li>Maqsad va natija aniqmi? (1–5)</li>
  <li>AI to'g'ri va halol ishlatilganmi? (1–5)</li>
  <li>Taqdimot tushunarli va qiziqmi? (1–5)</li>
  <li>Savollarga javob bera oldimi? (1–5)</li>
  <li>Bitta yoqqan narsa va bitta taklif.</li>
</ul>
<h3>Nominatsiyalar (misol)</h3>
<p>«Eng foydali loyiha», «Eng ijodiy loyiha», «Eng yaxshi prompt», «Eng yaxshi nutq», «Eng mas'uliyatli AI foydalanuvchi».</p>`,
        amaliyot: {
          oson: [
            ["Tayyorgarlik", "Fayllar va demoni taqdimotdan oldin tekshiring."],
            ["Tinglash", "Boshqa taqdimotlarni tinglab, baholash varag'ini to'ldiring."],
            ["Savol", "Kamida 2 ta taqdimotga savol bering."],
          ],
          orta: [
            ["Taqdimot", "O'z loyihangizni 3 daqiqada taqdim eting."],
            ["Javoblar", "Savollarga aniq va qisqa javob bering."],
            ["Ovoz berish", "Nominatsiyalar bo'yicha ovoz bering va tanlovingizni asoslang."],
          ],
          qiyin: [
            ["Tahlil", "Eng yoqqan 2 ta loyihaning kuchli tomonlarini yozing: ulardan nimani o'rgandingiz?"],
            ["O'z bahoyingiz", "O'z taqdimotingizni baholash varag'i bo'yicha o'zingiz baholang."],
          ],
        },
        uyga: {
          oson: [
            ["AI jurnali", "Taqdimot kuni haqida taassurotlaringizni yozing."],
            ["Fikrlar", "Olgan fikrlarni ro'yxat qiling."],
          ],
          orta: [
            ["Takomillashtirish", "Fikrlar asosida loyihaga 1–2 ta yaxshilash kiriting."],
            ["Ulashish", "Loyihani (shaxsiy ma'lumotsiz) oilangiz bilan ulashing."],
          ],
          qiyin: [
            ["Davomi", "Loyihani kelajakda qanday rivojlantirish mumkinligi haqida reja yozing."],
            ["Refleksiya", "Loyiha davomida AI bilan ishlash haqida 8–10 jumlalik xulosa yozing."],
          ],
        },
        savollar: [
          ["Taqdimot kuni tartibi?", "3 daqiqa taqdimot, savol-javob, baholash varag'i, ovoz berish."],
          ["Baholash varag'idagi mezonlar?", "Maqsad va natija, halol AI foydalanish, tushunarlilik, javoblar."],
          ["Yaxshi savol berish nima uchun muhim?", "Loyihani chuqurroq tushunish va muallifga yordam berish uchun."],
          ["Loyihani ulashishda nimaga e'tibor berish kerak?", "Shaxsiy ma'lumotlar bo'lmasligiga."],
        ],
      },
      {
        n: 36, day: 'Juma', title: "Xulosa, sertifikat va kelajak rejalari", tag: 'yakuniy',
        vositalar: [
          ['ChatGPT', 'https://chatgpt.com'],
          ['Claude', 'https://claude.ai'],
        ],
        namuna: `<pre class="prompt">3 oy davomida AI va prompt engineering o'rgandim. Menga keyingi 3 oy uchun
o'rganishni davom ettirish rejasini tuz: nimani mashq qilay, qanday loyihalar
qilay, qaysi ko'nikmalarni rivojlantiray. Qisqa va amaliy bo'lsin.</pre>`,
        rubrika: [
          ["3 oylik bilim jamlanmasi (prompt kitobcha) tayyor", 4],
          ["Shaxsiy xulosa yozilgan", 3],
          ["Kelajak o'quv rejasi tuzilgan", 3],
        ],
        metod: `Yakuniy dars — bayram: sertifikatlar, eng yaxshi loyihalar, "prompt kitobcha"lar namoyishi.
Har o'quvchiga kelajak rejasi tuzishga yordam bering — o'rganish shu bilan tugamaydi.
Asosiy xulosa: AI — kuchli vosita, lekin fikrlash, halollik va mas'uliyat odamda qoladi.`,
        maqsad: "Kursni yakunlash, natijalarni sarhisob qilish va ilhom berish.",
        faoliyat: "Sertifikat topshirish va fikr almashish.",
        nazariya: `
<h3>Kurs davomida nimalarni o'rgandik?</h3>
<ul>
  <li><strong>1-oy</strong>: AI nima, vositalar, prompt asoslari, rol, kontekst, aniq ko'rsatma, iteratsiya.</li>
  <li><strong>2-oy</strong>: zero-shot, few-shot, CoT, fan, til va rasm promptlari, xavfsizlik, hallucination, maxfiylik.</li>
  <li><strong>3-oy</strong>: AI va kasblar, dasturlash, tizimli prompt, multimodal AI, yakuniy loyiha.</li>
</ul>
<h3>Mas'uliyatli AI foydalanuvchisi qasamyodi</h3>
<ol>
  <li>Men AI javoblarini tekshiraman.</li>
  <li>Men shaxsiy ma'lumotlarimni himoya qilaman.</li>
  <li>Men AIdan halol foydalanaman va uning hissasini yashirmayman.</li>
  <li>Men boshqalarga zarar yetkazish uchun AIdan foydalanmayman.</li>
  <li>Men o'rganishni davom ettiraman — qaror qabul qiluvchi men o'zimman.</li>
</ol>
<h3>Keyingi qadamlar</h3>
<ul>
  <li>AI jurnalini davom ettirish.</li>
  <li>Dasturlash (Python), ingliz tili, matematika.</li>
  <li>Bepul onlayn kurslar va tanlovlar (o'qituvchi tavsiyasi bilan).</li>
</ul>`,
        amaliyot: {
          oson: [
            ["Xotira xaritasi", "Kursdagi barcha mavzulardan xotira xaritasi (mind map) chizing."],
            ["Eng foydali", "Kursdagi eng foydali 3 ta texnikani yozing va nima uchun ekanini tushuntiring."],
            ["Qasamyod", "«Mas'uliyatli AI foydalanuvchisi qasamyodi» ga o'zingizdan yana bitta band qo'shing."],
          ],
          orta: [
            ["Viktorina", "Sinf bilan AI kursi bo'yicha tezkor viktorinada qatnashing."],
            ["Fikr almashish", "Kurs haqida fikringizni ayting: nima yoqdi, nimani o'zgartirardingiz?"],
            ["Maktubi", "Bir yildan keyingi o'zingizga AI va o'qish haqida qisqa xat yozing."],
          ],
          qiyin: [
            ["Kelajak rejasi", "AI bilan bog'liq 6 oylik shaxsiy o'quv reja tuzing: maqsad, manbalar, haftalik vaqt."],
            ["Ustoz bo'lish", "Kichik ukangiz yoki do'stingizga AIdan xavfsiz foydalanishni o'rgatish uchun 10 daqiqalik mini-dars rejasini tuzing."],
          ],
        },
        uyga: {
          oson: [
            ["Sertifikat", "Sertifikatingizni saqlang va portfelga qo'shing."],
            ["AI jurnali", "Jurnalingizdagi eng yaxshi 5 ta yozuvni tanlang."],
          ],
          orta: [
            ["Oilaga o'rgatish", "Oila a'zoingizga kursda o'rgangan bitta prompt texnikasini o'rgating."],
            ["Prompt kitobcha", "Prompt kitobchangizni yakunlang va chiroyli qilib bezang."],
          ],
          qiyin: [
            ["Yozgi loyiha", "Ta'til davomida bajarish mumkin bo'lgan AI loyihasi g'oyasini rejalashtiring."],
            ["Maqola", "«AI kursi meni qanday o'zgartirdi» mavzusida 200 so'zlik maqola yozing."],
          ],
        },
        savollar: [
          ["Kursning 3 ta asosiy prompt texnikasi?", "Rol va kontekst, few-shot, chain-of-thought (va boshqalar)."],
          ["Mas'uliyatli AI foydalanuvchisi qanday bo'ladi?", "Tekshiradi, maxfiylikni saqlaydi, halol foydalanadi, zarar yetkazmaydi."],
          ["Hallucination nima?", "AI mavjud bo'lmagan ma'lumotni o'ylab topishi."],
          ["Tizimli prompt nima?", "AI xulq-atvorini belgilovchi doimiy ko'rsatma."],
          ["Kursdan keyin nimani o'rganish foydali?", "Dasturlash, ingliz tili, matematika va AI jurnalini davom ettirish."],
        ],
      },
    ]},
  ],
};
