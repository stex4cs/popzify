import type { Kampanja } from "./kampanje";

/**
 * Dogadjaji i proslave.
 *
 * Jedna strana za dve publike — firmu koja pravi korporativnu proslavu,
 * gala vece ili kongres, i porodicu koja slavi rodjendan, punoletstvo
 * ili krstenje — jer je posao isti: jedno vece, ne sme da se ponovi, i
 * snima se bez smetanja.
 *
 * SEO: naslov strane, H1 i naslovi sekcija nose izraze koje ljudi kucaju
 * ("snimanje eventova", "korporativne proslave", "fotograf na dogadjaju",
 * "snimanje rodjendana"), a pesnicka recenica "dogadjaj traje jedno vece,
 * snimak ostaje" prelazi u podnaslov. Odgovori u pitanjima ponavljaju
 * samo ono sto vec pise na strani — cene, rokove i brojeve ne izmisljamo.
 *
 * Dokaz je ESVS Belgrade 2026, gala vece kongresa u Nacionalnoj klasi:
 * isti dogadjaj u 16:9 i kao zaseban rez u 9:16, plus fotografije sa
 * iste veceri. Ime dogadjaja i mesta stoje u samom filmu.
 *
 * Srpski i engleski se obracaju u mnozini, ruski sa "вы".
 */

/**
 * Tri polozene i sest uspravnih: na desktopu red od tri polozene pa dva
 * reda uspravnih, na telefonu polozena preko cele sirine pa par
 * uspravnih. Redosled ovde je onaj za telefon; desktop polozene sam
 * podigne u prvi red.
 */
const fotografije = [
  { src: "/dogadjaji/f1.webp", w: 1400, h: 934 },
  { src: "/dogadjaji/f2.webp", w: 934, h: 1400 },
  { src: "/dogadjaji/f3.webp", w: 934, h: 1400 },
  { src: "/dogadjaji/f4.webp", w: 1400, h: 934 },
  { src: "/dogadjaji/f5.webp", w: 934, h: 1400 },
  { src: "/dogadjaji/f6.webp", w: 934, h: 1400 },
  { src: "/dogadjaji/f7.webp", w: 1400, h: 934 },
  { src: "/dogadjaji/f8.webp", w: 934, h: 1400 },
  { src: "/dogadjaji/f9.webp", w: 934, h: 1400 },
];

const altSr = [
  "Bend uživo na korporativnoj proslavi ESVS Belgrade 2026",
  "Violinistkinja u crvenom odelu na eventu",
  "Performerka u haljini od crvenih ruža",
  "Gosti na terasi pre početka programa",
  "Par u plesu pod crvenim svetlom",
  "Gost u svetlom sakou na podijumu",
  "Dvojica gostiju nazdravljaju",
  "Gošća se smeje na podijumu",
  "Slika na štafelaju, detalj sa večeri",
];

const altEn = [
  "Live band at the ESVS Belgrade 2026 corporate party",
  "Violinist in a red suit at the event",
  "Performer in a dress made of red roses",
  "Guests on the terrace before the programme",
  "A couple dancing under red light",
  "A guest in a light jacket on the dance floor",
  "Two guests raising a glass",
  "A guest laughing on the dance floor",
  "A painting on an easel, a detail from the night",
];

const altRu = [
  "Живая музыка на корпоративе ESVS Belgrade 2026",
  "Скрипачка в красном костюме на мероприятии",
  "Артистка в платье из красных роз",
  "Гости на террасе перед началом программы",
  "Пара танцует в красном свете",
  "Гость в светлом пиджаке на танцполе",
  "Двое гостей поднимают бокалы",
  "Гостья смеётся на танцполе",
  "Картина на мольберте — деталь вечера",
];

const sr: Kampanja = {
  slug: "dogadjaji",
  meta: {
    title: "Snimanje eventova i korporativnih proslava, Beograd | Popzify",
    description:
      "Snimanje i fotografisanje korporativnih proslava, eventova, kongresa, rođendana i punoletstava u Beogradu i Novom Sadu. Aftermovie u 16:9 i 9:16, fotografije sa cele večeri.",
  },
  hero: {
    eyebrow: "Snimanje događaja · Beograd · Novi Sad",
    title: "Snimanje eventova i",
    accent: "proslava.",
    sub:
      "Događaj traje jedno veče, snimak ostaje. Snimamo i fotografišemo korporativne proslave, gala večeri, kongrese, rođendane, punoletstva i krštenja. Isti tim radi video i fotografiju: dobijate aftermovie za veliki ekran, poseban rez za Instagram i fotografije sa cele večeri.",
    cta: "Proverite da li smo slobodni",
    ctaDrugi: "060 5973212",
    oznake: ["Video i fotografija", "16:9 i 9:16", "Registrovana firma"],
    poster: "/dogadjaji/uvod.webp",
  },
  film: {
    eyebrow: "ESVS Belgrade 2026 · Nacionalna klasa",
    title: "Korporativni event,",
    accent: "u minutu.",
    p: "Svečano veče kongresa ESVS u Beogradu: večera, bend uživo, ples do kraja. Aftermovie od minut, pustite ga sa zvukom.",
    src: "/dogadjaji/film.mp4",
    poster: "/dogadjaji/poster.webp",
    dugme: "Pustite film · sa zvukom",
  },
  uspravno: {
    eyebrow: "Isto veče, za telefon",
    title: "Aftermovie i za",
    accent: "Instagram.",
    p:
      "Od istog materijala pravimo posebnu montažu u 9:16 za Reels, TikTok i storije. Nije horizontalni film isečen sa strane, nego drugi rez, sa kadrovima koji rade na telefonu.",
    src: "/dogadjaji/uspravno.mp4",
    poster: "/dogadjaji/uspravno.webp",
    dugme: "Pustite · sa zvukom",
    stavke: [
      "Film u 16:9 za ekran, sajt i YouTube",
      "Zaseban rez u 9:16 za Instagram, TikTok i storije",
      "Po želji više verzija sa različitom muzikom, birate jednu",
      "Kratki isečci za najavu sledećeg događaja",
    ],
  },
  fotografije: {
    eyebrow: "Fotograf na događaju",
    title: "Fotografije sa iste",
    accent: "večeri.",
    p:
      "Dok se snimao film, fotograf je radio pored. Ovo su obrađene fotografije sa korporativne proslave, ne kadrovi iz snimka.",
    slike: fotografije.map((f, i) => ({ ...f, alt: altSr[i] })),
  },
  usluge: {
    eyebrow: "Šta snimamo",
    title: "Korporativne proslave, eventi i",
    accent: "rođendani.",
    p: "Snimamo i fotografišemo događaje u Beogradu, Novom Sadu i širom Srbije. Isti način rada za firmu i za porodicu: dođemo na vreme, ne smetamo programu i znamo šta ne sme da se propusti.",
    items: [
      {
        h: "Korporativne proslave i gala večeri",
        p: "Svečane večere, godišnjice firme, novogodišnje proslave. Govori, nagrade, bend i ples.",
      },
      {
        h: "Kongresi, konferencije i poslovni eventi",
        p: "Predavanja, paneli, štandovi sponzora i druženje posle. Kratak film za sajt i isečci za mreže.",
      },
      {
        h: "Rođendani i punoletstva",
        p: "Ulazak, torta, zdravice, ekipa na podijumu. Snimak koji ćete puštati i za deset godina.",
      },
      {
        h: "Krštenja i porodična slavlja",
        p: "Mirniji ritam i više ljudi koje treba uhvatiti. Pazimo da niko bitan ne ostane van kadra.",
      },
      {
        h: "Mature i žurke",
        p: "Svetla, muzika, ritam. Vertikalni isečci spremni za Instagram, ne samo dugačak film.",
      },
      {
        h: "Sajmovi i lansiranja proizvoda",
        p: "Štand, proizvod, posetioci. Snimali smo i na Beogradskom sajmu.",
      },
    ],
  },
  dobijate: {
    eyebrow: "Šta dobijate",
    title: "Snimatelj i fotograf,",
    accent: "jedna ekipa.",
    p:
      "Jedna ekipa umesto dve. Snimatelj i fotograf se znaju, ne sudaraju se oko istog kadra i ne morate da ih usklađujete.",
    kolone: [
      {
        h: "Video",
        p: "Aftermovie sa celog događaja.",
        list: [
          "Verzija u 16:9 za ekran, sajt i YouTube",
          "Zaseban rez u 9:16 za mreže",
          "Čist ton govora i zdravica kad su bitni",
          "Dron, ako lokacija i propisi dozvoljavaju",
          "Isečci za najavu sledeće godine",
        ],
      },
      {
        h: "Fotografija",
        p: "Obrađene fotografije sa celog događaja.",
        list: [
          "Atmosfera, gosti, izvođači, detalji",
          "Galerija na linku koji šaljete gostima",
          "Nekoliko fotografija isti dan, za objavu",
          "Fajlovi u punoj rezoluciji, bez vodenog žiga",
          "Portreti govornika po dogovoru",
        ],
      },
    ],
  },
  koraci: {
    eyebrow: "Kako ide",
    title: "Od poziva do",
    accent: "isporuke.",
    p: "Tri koraka, i nijedan ne prekida program.",
    steps: [
      {
        h: "Provera termina",
        p: "Javite datum, mesto i kakav je događaj. Isti dan kažemo da li smo slobodni i koliko košta. Cena je jedna i piše šta ulazi u nju.",
      },
      {
        h: "Dogovor pre događaja",
        p: "Prođemo satnicu: kad su govori, kad kreće bend, ko su ljudi koje ne smemo da promašimo. Ako sponzori ili logo moraju u kadar, znamo to unapred.",
      },
      {
        h: "Snimanje i isporuka",
        p: "Radimo tiho i ne zaustavljamo program zbog kadra. Nekoliko fotografija dobijate isti dan, film i galeriju u roku iz ugovora.",
      },
    ],
  },
  paketi: {
    eyebrow: "Paketi",
    title: "Izaberite",
    accent: "obim.",
    p: "Cena zavisi od datuma, lokacije i koliko događaj traje. Javite termin, cifru dobijate istog dana.",
    items: [
      {
        h: "Foto",
        p: "Samo fotografija.",
        list: [
          "Fotograf na celom događaju",
          "Obrađene fotografije",
          "Galerija na linku za goste",
          "Puna rezolucija, bez vodenog žiga",
        ],
      },
      {
        h: "Film i foto",
        p: "Video i fotografija, jedna ekipa.",
        list: [
          "Sve iz paketa Foto",
          "Aftermovie u 16:9",
          "Zaseban rez u 9:16 za mreže",
          "Nekoliko kadrova isti dan",
          "Jedan dogovor umesto dva",
        ],
      },
      {
        h: "Veliki događaj",
        p: "Kongresi, festivali i događaji u više delova.",
        list: [
          "Sve iz paketa Film i foto",
          "Više dana ili više sala",
          "Veći tim na terenu",
          "Snimci govora i predavanja u celini",
          "Dron ako lokacija dozvoljava",
        ],
      },
    ],
    note: "U svakom paketu: ugovor i račun · snimljeni materijal ostaje vaš · jedan sagovornik za sve.",
  },
  pitanja: {
    eyebrow: "Pitanja",
    title: "Ono što nas najčešće",
    accent: "pitaju.",
    p: "Ako nešto nije ovde, pišite na WhatsApp ili pozovite.",
    items: [
      {
        q: "Koliko košta snimanje korporativne proslave ili eventa?",
        a: "Zavisi od datuma, lokacije, koliko događaj traje i da li uzimate i fotografa. Javite datum i mesto, cenu dobijate istog dana, bez obaveze.",
      },
      {
        q: "Da li snimate eventove u Novom Sadu i van Beograda?",
        a: "Da. Radimo u Beogradu, Novom Sadu i širom Srbije. Javite mesto i u ponudi piše sve, zajedno sa putem ako ga ima.",
      },
      {
        q: "Šta je aftermovie?",
        a: "Kratak film sa događaja, od minut-dva, sa najboljim trenucima i muzikom. Za ESVS Belgrade 2026 napravili smo film od minut u 16:9 i zaseban rez u 9:16 za mreže.",
      },
      {
        q: "Da li radite i video i fotografiju na istom događaju?",
        a: "Da, isti tim radi oboje, pa ne usklađujete dve ekipe. Ako vam treba samo fotograf, i to može.",
      },
      {
        q: "Kada stižu snimci i fotografije?",
        a: "Nekoliko fotografija dobijate isti dan, za objavu. Film i cela galerija stižu u roku koji piše u ugovoru.",
      },
      {
        q: "Snimate li i privatne proslave, rođendane i krštenja?",
        a: "Da. Isti način rada kao za firme: ne prekidamo program, ne režiramo vam veče i pazimo da niko bitan ne ostane van kadra.",
      },
    ],
  },
  kraj: {
    eyebrow: "Provera termina",
    title: "Recite datum i mesto, pa",
    accent: "dalje.",
    p: "Prvo proveravamo da li je vaš datum slobodan, pa onda pričamo o svemu ostalom. Odgovor stiže istog dana.",
  },
  uslugeIzbor: [
    "Korporativna proslava ili gala veče",
    "Kongres ili konferencija",
    "Rođendan ili punoletstvo",
    "Krštenje ili porodično slavlje",
    "Matura ili žurka",
    "Sajam ili lansiranje",
    "Nešto drugo",
  ],
  forma: "datum",
  whatsapp: "Zdravo, pišem sa sajta. Zanima me snimanje događaja. Datum i mesto: ",
};

const en: Kampanja = {
  slug: "dogadjaji",
  meta: {
    title: "Event and corporate party filming, Belgrade | Popzify",
    description:
      "Filming and photography for corporate parties, events, congresses, birthdays and 18ths in Belgrade and Novi Sad. Aftermovies in 16:9 and 9:16, photos from the whole night.",
  },
  hero: {
    eyebrow: "Event filming · Belgrade · Novi Sad",
    title: "Filming events and",
    accent: "parties.",
    sub:
      "The event lasts one night; the film stays. We film and photograph corporate parties, gala dinners, congresses, birthdays, 18ths and christenings. One crew does video and stills: you get an aftermovie for the big screen, a separate cut for Instagram and photos from the whole night.",
    cta: "Check if we are free",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Video and stills", "16:9 and 9:16", "Registered company"],
    poster: "/dogadjaji/uvod.webp",
  },
  film: {
    eyebrow: "ESVS Belgrade 2026 · Nacionalna klasa",
    title: "A corporate event,",
    accent: "in a minute.",
    p: "The gala evening of the ESVS congress in Belgrade: dinner, a live band, dancing to the end. A one-minute aftermovie — play it with sound.",
    src: "/dogadjaji/film.mp4",
    poster: "/dogadjaji/poster.webp",
    dugme: "Play the film · with sound",
  },
  uspravno: {
    eyebrow: "Same night, for the phone",
    title: "And an aftermovie for",
    accent: "Instagram.",
    p:
      "From the same footage we make a separate 9:16 edit for Reels, TikTok and stories. Not the horizontal film cropped at the sides, but a different cut, with shots that work on a phone.",
    src: "/dogadjaji/uspravno.mp4",
    poster: "/dogadjaji/uspravno.webp",
    dugme: "Play · with sound",
    stavke: [
      "A 16:9 film for screens, the website and YouTube",
      "A separate 9:16 cut for Instagram, TikTok and stories",
      "On request, several versions with different music to pick from",
      "Short clips to announce the next event",
    ],
  },
  fotografije: {
    eyebrow: "Event photography",
    title: "Photos from the same",
    accent: "night.",
    p:
      "While the film was being shot, the photographer worked alongside. These are edited photographs from the corporate party, not frames from the footage.",
    slike: fotografije.map((f, i) => ({ ...f, alt: altEn[i] })),
  },
  usluge: {
    eyebrow: "What we shoot",
    title: "Corporate parties, events and",
    accent: "birthdays.",
    p: "We film and photograph events in Belgrade, Novi Sad and across Serbia. The same way of working for a company and for a family: we arrive on time, stay out of the programme's way and know what cannot be missed.",
    items: [
      {
        h: "Corporate parties and gala dinners",
        p: "Formal dinners, company anniversaries, New Year parties. Speeches, awards, the band and the dancing.",
      },
      {
        h: "Congresses, conferences and business events",
        p: "Talks, panels, sponsor stands and the evening after. A short film for the website and clips for social.",
      },
      {
        h: "Birthdays and 18ths",
        p: "The entrance, the cake, the toasts, the crowd on the dance floor. Footage you will still play in ten years.",
      },
      {
        h: "Christenings and family celebrations",
        p: "A calmer pace and more people to catch. We make sure nobody important ends up out of frame.",
      },
      {
        h: "Proms and parties",
        p: "Lights, music, rhythm. Vertical clips ready for Instagram, not just one long film.",
      },
      {
        h: "Trade fairs and product launches",
        p: "The stand, the product, the visitors. We have shot at the Belgrade Fair too.",
      },
    ],
  },
  dobijate: {
    eyebrow: "What you get",
    title: "Videographer and photographer,",
    accent: "one crew.",
    p:
      "One crew instead of two. The videographer and the photographer know each other, never fight over the same frame, and you do not have to coordinate them.",
    kolone: [
      {
        h: "Video",
        p: "An aftermovie of the whole event.",
        list: [
          "A 16:9 version for screens, the website and YouTube",
          "A separate 9:16 cut for social",
          "Clean audio of speeches and toasts where they matter",
          "Drone, where the location and the rules allow it",
          "Clips to announce next year",
        ],
      },
      {
        h: "Photography",
        p: "Edited photographs from the whole event.",
        list: [
          "Atmosphere, guests, performers, details",
          "A gallery on a link you send to guests",
          "A few photos the same day, ready to post",
          "Full-resolution files, no watermark",
          "Speaker portraits by arrangement",
        ],
      },
    ],
  },
  koraci: {
    eyebrow: "How it goes",
    title: "From the call to",
    accent: "delivery.",
    p: "Three steps, and none of them interrupts the programme.",
    steps: [
      {
        h: "Checking the date",
        p: "Send us the date, the venue and what kind of event it is. The same day we tell you whether we are free and what it costs. One price, and it says what is included.",
      },
      {
        h: "The talk before",
        p: "We go through the schedule: when the speeches are, when the band starts, who we must not miss. If sponsors or a logo have to be in frame, we know it in advance.",
      },
      {
        h: "Shooting and delivery",
        p: "We work quietly and never stop the programme for a shot. A few photos arrive the same day, the film and the gallery within the deadline in the contract.",
      },
    ],
  },
  paketi: {
    eyebrow: "Packages",
    title: "Choose the",
    accent: "scope.",
    p: "The price depends on the date, the location and how long the event runs. Send us the date and you have a figure the same day.",
    items: [
      {
        h: "Photo",
        p: "Stills only.",
        list: [
          "A photographer for the whole event",
          "Edited photographs",
          "A gallery on a link for guests",
          "Full resolution, no watermark",
        ],
      },
      {
        h: "Film and photo",
        p: "Video and stills, one crew.",
        list: [
          "Everything in Photo",
          "A 16:9 aftermovie",
          "A separate 9:16 cut for social",
          "A few frames the same day",
          "One booking instead of two",
        ],
      },
      {
        h: "Large event",
        p: "Congresses, festivals and events in several parts.",
        list: [
          "Everything in Film and photo",
          "Several days or several halls",
          "A larger crew on location",
          "Full recordings of talks and speeches",
          "Drone where the location allows",
        ],
      },
    ],
    note: "In every package: contract and invoice · the footage stays yours · one person to talk to.",
  },
  pitanja: {
    eyebrow: "Questions",
    title: "What people ask us",
    accent: "most.",
    p: "If your question is not here, message us on WhatsApp or call.",
    items: [
      {
        q: "How much does it cost to film a corporate party or event?",
        a: "It depends on the date, the venue, how long the event runs and whether you also want a photographer. Send us the date and venue and you have a price the same day, with no obligation.",
      },
      {
        q: "Do you film events in Novi Sad and outside Belgrade?",
        a: "Yes. We work in Belgrade, Novi Sad and across Serbia. Tell us the venue and the quote covers everything, including travel if there is any.",
      },
      {
        q: "What is an aftermovie?",
        a: "A short film of the event, a minute or two long, with the best moments set to music. For ESVS Belgrade 2026 we made a one-minute film in 16:9 and a separate 9:16 cut for social.",
      },
      {
        q: "Do you do both video and photos at the same event?",
        a: "Yes, the same crew does both, so you are not coordinating two teams. If you only need a photographer, that works too.",
      },
      {
        q: "When do the film and photos arrive?",
        a: "A few photos arrive the same day, ready to post. The film and the full gallery come within the deadline in the contract.",
      },
      {
        q: "Do you also film private parties, birthdays and christenings?",
        a: "Yes. The same way we work for companies: we do not interrupt the programme, we do not direct your night, and we make sure nobody important ends up out of frame.",
      },
    ],
  },
  kraj: {
    eyebrow: "Checking the date",
    title: "Tell us the date and the venue, then the",
    accent: "rest.",
    p: "First we check whether your date is free, then we talk about everything else. You hear back the same day.",
  },
  uslugeIzbor: [
    "Corporate party or gala dinner",
    "Congress or conference",
    "Birthday or 18th",
    "Christening or family celebration",
    "Prom or party",
    "Trade fair or launch",
    "Something else",
  ],
  forma: "datum",
  whatsapp: "Hi, I am writing from your website. I would like an event filmed. Date and venue: ",
};

const ru: Kampanja = {
  slug: "dogadjaji",
  meta: {
    title: "Съёмка мероприятий и корпоративов в Белграде | Popzify",
    description:
      "Видео- и фотосъёмка корпоративов, мероприятий, конгрессов, дней рождения и выпускных в Белграде и Нови-Саде. Aftermovie в 16:9 и 9:16, фотографии со всего вечера.",
  },
  hero: {
    eyebrow: "Съёмка мероприятий · Белград · Нови-Сад",
    title: "Съёмка мероприятий и",
    accent: "праздников.",
    sub:
      "Вечер проходит — видео остаётся. Снимаем и фотографируем корпоративы, гала-ужины, конгрессы, дни рождения, совершеннолетия и крестины. Видео и фото делает одна команда: вы получаете aftermovie для большого экрана, отдельную версию для Instagram и фотографии со всего вечера.",
    cta: "Проверить свободную дату",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Видео и фото", "16:9 и 9:16", "Зарегистрированная компания"],
    poster: "/dogadjaji/uvod.webp",
  },
  film: {
    eyebrow: "ESVS Belgrade 2026 · Nacionalna klasa",
    title: "Корпоратив",
    accent: "за минуту.",
    p: "Гала-вечер конгресса ESVS в Белграде: ужин, живая музыка, танцы до последнего. Минутный aftermovie — смотрите со звуком.",
    src: "/dogadjaji/film.mp4",
    poster: "/dogadjaji/poster.webp",
    dugme: "Смотреть фильм · со звуком",
  },
  uspravno: {
    eyebrow: "Тот же вечер — для телефона",
    title: "И вертикальная версия для",
    accent: "Instagram.",
    p:
      "Из того же материала монтируем отдельный ролик 9:16 для Reels, TikTok и сторис. Это не обрезанный по бокам горизонтальный фильм, а другой монтаж — с кадрами, которые работают на телефоне.",
    src: "/dogadjaji/uspravno.mp4",
    poster: "/dogadjaji/uspravno.webp",
    dugme: "Смотреть · со звуком",
    stavke: [
      "Фильм 16:9 для экрана, сайта и YouTube",
      "Отдельный монтаж 9:16 для Instagram, TikTok и сторис",
      "По желанию — несколько версий с разной музыкой, выбираете одну",
      "Короткие нарезки для анонса следующего мероприятия",
    ],
  },
  fotografije: {
    eyebrow: "Фотограф на мероприятии",
    title: "Фото с того же",
    accent: "вечера.",
    p:
      "Пока снимался фильм, рядом работал фотограф. Это обработанные фотографии с корпоратива, а не кадры из видео.",
    slike: fotografije.map((f, i) => ({ ...f, alt: altRu[i] })),
  },
  usluge: {
    eyebrow: "Что снимаем",
    title: "Корпоративы, мероприятия и",
    accent: "дни рождения.",
    p: "Снимаем и фотографируем мероприятия в Белграде, Нови-Саде и по всей Сербии. Для компании и для семьи работаем одинаково: приезжаем вовремя, не мешаем программе и знаем, что нельзя пропустить.",
    items: [
      {
        h: "Корпоративы и гала-вечера",
        p: "Торжественные ужины, юбилеи компаний, новогодние вечеринки. Речи, награждения, живая музыка и танцы.",
      },
      {
        h: "Конгрессы, конференции и деловые мероприятия",
        p: "Доклады, панели, стенды спонсоров и неформальная часть. Короткий фильм для сайта и нарезки для соцсетей.",
      },
      {
        h: "Дни рождения и совершеннолетие",
        p: "Выход, торт, тосты, друзья на танцполе. Видео, которое вы будете пересматривать и через десять лет.",
      },
      {
        h: "Крестины и семейные праздники",
        p: "Спокойный ритм и много людей, которых важно снять. Следим, чтобы никто из близких не остался за кадром.",
      },
      {
        h: "Выпускные и вечеринки",
        p: "Свет, музыка, ритм. Вертикальные ролики для Instagram, а не только один длинный фильм.",
      },
      {
        h: "Выставки и презентации",
        p: "Стенд, продукт, посетители. Снимали в том числе на Белградской ярмарке.",
      },
    ],
  },
  dobijate: {
    eyebrow: "Что вы получаете",
    title: "Видеограф и фотограф —",
    accent: "одна команда.",
    p:
      "Одна команда вместо двух. Видеограф и фотограф знают друг друга, не спорят за один и тот же кадр, и вам не нужно их координировать.",
    kolone: [
      {
        h: "Видео",
        p: "Aftermovie со всего мероприятия.",
        list: [
          "Версия 16:9 для экрана, сайта и YouTube",
          "Отдельный монтаж 9:16 для соцсетей",
          "Чистый звук речей и тостов, где они важны",
          "Дрон, если площадка и правила позволяют",
          "Нарезки для анонса в следующем году",
        ],
      },
      {
        h: "Фото",
        p: "Обработанные фотографии со всего мероприятия.",
        list: [
          "Атмосфера, гости, артисты, детали",
          "Галерея по ссылке, которую можно разослать гостям",
          "Несколько фото в тот же день — для публикации",
          "Файлы в полном разрешении, без водяных знаков",
          "Портреты спикеров — по договорённости",
        ],
      },
    ],
  },
  koraci: {
    eyebrow: "Как это работает",
    title: "От звонка до",
    accent: "результата.",
    p: "Три шага, и ни один не мешает программе.",
    steps: [
      {
        h: "Проверка даты",
        p: "Напишите дату, место и формат мероприятия. В тот же день скажем, свободны ли мы и сколько это стоит. Цена одна, и в ней прописано, что входит.",
      },
      {
        h: "Обсуждение заранее",
        p: "Проходим тайминг: когда речи, когда начинает играть музыка, кого нельзя пропустить. Если в кадре обязательно должны быть спонсоры или логотип, мы знаем об этом заранее.",
      },
      {
        h: "Съёмка и сдача",
        p: "Работаем тихо и не останавливаем программу ради кадра. Несколько фотографий — в тот же день, фильм и галерея — в срок по договору.",
      },
    ],
  },
  paketi: {
    eyebrow: "Пакеты",
    title: "Выберите",
    accent: "формат.",
    p: "Цена зависит от даты, площадки и продолжительности мероприятия. Напишите дату — стоимость назовём в тот же день.",
    items: [
      {
        h: "Фото",
        p: "Только фотосъёмка.",
        list: [
          "Фотограф на всё мероприятие",
          "Обработанные фотографии",
          "Галерея по ссылке для гостей",
          "Полное разрешение, без водяных знаков",
        ],
      },
      {
        h: "Видео и фото",
        p: "Видео и фото, одна команда.",
        list: [
          "Всё из пакета «Фото»",
          "Aftermovie в 16:9",
          "Отдельный монтаж 9:16 для соцсетей",
          "Несколько кадров в тот же день",
          "Один договор вместо двух",
        ],
      },
      {
        h: "Большое мероприятие",
        p: "Конгрессы, фестивали и мероприятия из нескольких частей.",
        list: [
          "Всё из пакета «Видео и фото»",
          "Несколько дней или залов",
          "Расширенная команда на площадке",
          "Полная запись докладов и выступлений",
          "Дрон, если площадка позволяет",
        ],
      },
    ],
    note: "В каждом пакете: договор и счёт · отснятый материал остаётся у вас · один человек на связи по всем вопросам.",
  },
  pitanja: {
    eyebrow: "Вопросы",
    title: "Что у нас чаще всего",
    accent: "спрашивают.",
    p: "Если вашего вопроса здесь нет — напишите в WhatsApp или позвоните.",
    items: [
      {
        q: "Сколько стоит съёмка корпоратива или мероприятия?",
        a: "Зависит от даты, площадки, продолжительности и от того, нужен ли ещё и фотограф. Напишите дату и место — стоимость назовём в тот же день, без обязательств.",
      },
      {
        q: "Вы снимаете в Нови-Саде и за пределами Белграда?",
        a: "Да. Работаем в Белграде, Нови-Саде и по всей Сербии. Укажите место — в предложении будет всё, включая дорогу, если она нужна.",
      },
      {
        q: "Что такое aftermovie?",
        a: "Короткий фильм о мероприятии на минуту-две: лучшие моменты под музыку. Для ESVS Belgrade 2026 мы сделали минутный фильм в 16:9 и отдельный монтаж 9:16 для соцсетей.",
      },
      {
        q: "Можно заказать и видео, и фото на одно мероприятие?",
        a: "Да, всё делает одна команда, и вам не нужно согласовывать две. Если нужен только фотограф — тоже можно.",
      },
      {
        q: "Когда будут готовы видео и фото?",
        a: "Несколько фотографий — в тот же день, чтобы сразу выложить. Фильм и полная галерея — в срок, указанный в договоре.",
      },
      {
        q: "Снимаете ли вы частные праздники: дни рождения, крестины?",
        a: "Да. Работаем так же, как для компаний: не прерываем программу, не режиссируем ваш вечер и следим, чтобы никто из близких не остался за кадром.",
      },
    ],
  },
  kraj: {
    eyebrow: "Проверка даты",
    title: "Назовите дату и место. Остальное —",
    accent: "потом.",
    p: "Сначала проверим, свободна ли ваша дата, а потом обсудим всё остальное. Ответим в тот же день.",
  },
  uslugeIzbor: [
    "Корпоратив или гала-вечер",
    "Конгресс или конференция",
    "День рождения или совершеннолетие",
    "Крестины или семейный праздник",
    "Выпускной или вечеринка",
    "Выставка или презентация",
    "Другое",
  ],
  forma: "datum",
  whatsapp: "Здравствуйте! Пишу с сайта. Интересует съёмка мероприятия. Дата и место: ",
};

export const dogadjaji = { sr, en, ru };
