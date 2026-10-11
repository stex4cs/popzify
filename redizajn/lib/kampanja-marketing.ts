import type { Kampanja } from "./kampanje";

/**
 * Marketing: cela usluga na jednom mestu.
 *
 * Tekst je prenet sa stare popzify.com/marketing. Peto­stepeni kviz sa
 * te strane nije prenet — ponuda besplatne analize koju je on vodio
 * stoji kao izbor u formi.
 *
 * Radovi su prikazani sa linkom na zivi sajt, ne kao slika: lakse je
 * poverovati necemu sto se otvori.
 */

const radoviSlike = {
  dukatdesk: "/radovi-sajt/dukatdesk.webp",
  hotelbali: "/radovi-sajt/hotelbali.webp",
  raateam: "/radovi-sajt/raateam.webp",
  correctscore: "/radovi-sajt/correctscore.webp",
  bif: "/radovi-sajt/bif.webp",
  glitch: "/radovi-sajt/glitch.webp",
};

const partneri = {
  naslov: "Brendovi uz koje smo radili",
  slike: [
    { src: "/partneri/bif.webp", ime: "BIF" },
    { src: "/partneri/arenica.webp", ime: "Arenica", url: "https://www.instagram.com/arenicatv/" },
    { src: "/partneri/arenasport.webp", ime: "Arena Sport" },
    { src: "/partneri/oktagonbet.webp", ime: "Oktagon Bet" },
    { src: "/partneri/primobet.webp", ime: "Primo Bet" },
    { src: "/partneri/soccer.webp", ime: "Soccer" },
  ],
};

const sr: Kampanja = {
  slug: "marketing",
  meta: {
    title: "Sadržaj, oglasi i sajt — jedna ekipa za sve tri stvari | Popzify",
    description:
      "Snimamo short form sadržaj, vodimo Meta i Google oglase i pravimo sajtove i aplikacije. Bez tri različita majstora koji jedan drugog krive kad nema rezultata. Beograd, od 2024.",
  },
  hero: {
    eyebrow: "Beograd · Zemun · od 2024.",
    title: "Snimci koji se gledaju, oglasi koji prodaju, sajt koji",
    accent: "pretvara.",
    sub:
      "Popzify je jedna ekipa za sve tri stvari: snimamo short form sadržaj, vodimo Meta i Google oglase i pravimo sajtove i aplikacije. Bez tri različita majstora koji jedan drugog krive kad nema rezultata.",
    cta: "Zatraži ponudu",
    ctaDrugi: "060 5973212",
    oznake: ["Sony FX3 · FPV i gimbal dron", "Prva verzija sajta za 24h", "Odgovor na upit za 24h"],
  },
  partneri,
  bol: {
    eyebrow: "Da pogodimo",
    title: "Prepoznaješ li se u nečemu od",
    accent: "ovoga?",
    p: "Ako da, nisi jedini — i nijedna od ovih stvari se ne rešava sama.",
    items: [
      {
        h: "Objaviš, vidi te 200 ljudi",
        p: "I to uglavnom tvoji poznanici. Posle par takvih objava normalno je da odustaneš.",
      },
      {
        h: "Nemaš vremena ni ideju",
        p: "Znaš da treba svaki dan nešto da objaviš, ali taj dan ti je već popunjen poslom.",
      },
      {
        h: "Klikovi stižu, upiti ne",
        p: "Plaćaš oglase, a ne znaš ni koliko te košta jedan upit. Pa ne znaš ni da li se isplati.",
      },
      {
        h: "Tri majstora, nijedan odgovoran",
        p: "Jedan snima, drugi vodi oglase, treći je pravio sajt — i niko ne odgovara za rezultat.",
      },
      {
        h: "Sajt kao iz 2015.",
        p: "Sramota te da pošalješ link, pa ga i ne šalješ. A to je mesto gde oglasi sleću.",
      },
      {
        h: "Konkurencija deluje ozbiljnije",
        p: "Sa slabijom uslugom od tvoje, samo zato što na netu izgleda sređenije.",
      },
    ],
  },
  usluge: {
    eyebrow: "Šta radimo",
    title: "Sadržaj, oglasi i sve što ide",
    accent: "uz to.",
    p: "Možeš da uzmeš jednu stvar ili ceo lanac — od snimanja, preko oglasa, do sajta na koji ti oglasi vode.",
    items: [
      {
        h: "Short form video",
        p: "Reels, TikTok i Shorts — snimanje, montaža, titlovi, muzika i naslovna slika. Jedan dan snimanja, sadržaj za ceo mesec.",
      },
      {
        h: "Spotovi i produkcija",
        p: "Muzički spotovi, korporativni i imidž video, podkasti, snimanje događaja. Sony FX3, FPV i gimbal dron — kadrovi koje telefon ne može da izvuče.",
      },
      {
        h: "Vođenje profila",
        p: "Plan objava, tekstovi, objavljivanje i odgovaranje na poruke. Ti radiš svoj posao, profil radi svoj.",
      },
      {
        h: "Meta i Google oglasi",
        p: "Postavka naloga i piksela, kreative, testiranje i mesečni izveštaj sa brojkama. Znaš koliko te košta jedan upit, ne pucamo naslepo.",
      },
      {
        h: "Sajtovi i prodavnice",
        p: "Sajt po meri, landing stranica za kampanju ili online prodavnica sa plaćanjem karticom. Prva verzija za 24h, bez kupljenih šablona.",
      },
      {
        h: "Web i mobilne aplikacije",
        p: "Platforme sa korisničkim nalozima, bazom i plaćanjima. iOS i Android iz jednog koda, do objave na App Store i Google Play.",
      },
    ],
  },
  radovi: {
    eyebrow: "Radovi",
    title: "Nešto od toga što smo",
    accent: "napravili.",
    p: "Klikni na projekat i otvori ga uživo — ne screenshot, nego sajt koji radi.",
    items: [
      {
        h: "DUKAT Private Desk",
        p: "Privatni desk za otkup i prodaju USDT, EUR i USD. Ponuda odmah u herou, proces u četiri koraka i put do Telegrama bez lutanja.",
        url: "https://dukatdesk.com",
        interno: "/sr/radovi/dukatdesk",
        slika: radoviSlike.dukatdesk,
      },
      {
        h: "Correct Score Pro",
        p: "AI platforma za fudbalske prognoze. Stranica za svaku utakmicu, četiri modela prognoze, kalkulatori i VIP, na četiri jezika.",
        url: "https://correctscore.pro",
        interno: "/sr/radovi/correctscore",
        slika: radoviSlike.correctscore,
      },
      {
        h: "BIF — Balkan Influence Fighting",
        p: "Sajt za influenser boks spektakl. Ulaznice odmah u herou, roster boraca, vesti i rezultati, prenos i porudžbina dresova.",
        url: "https://bif.events",
        interno: "/sr/radovi/bif",
        slika: radoviSlike.bif,
      },
      {
        h: "Bali Mountain Resort",
        p: "Planinski resort iznad doline Lima u Bijelom Polju. Tri jezika, provera dostupnosti i upit za rezervaciju, galerija po godišnjim dobima.",
        url: "https://hotelbali.vercel.app/me",
        interno: "/sr/radovi/hotelbali",
        slika: radoviSlike.hotelbali,
      },
      {
        h: "RAA Team",
        p: "Agencija za hostese, promoterke i modeling. Deset kategorija usluga, portfolio sa setova i formular za prijavu kandidatkinja.",
        url: "https://raateam.vercel.app/sr",
        interno: "/sr/radovi/raateam",
        slika: radoviSlike.raateam,
      },
      {
        h: "GLITCH",
        p: "Agencija za video produkciju i web razvoj. Četiri usluge, proces u tri koraka i kontakt na jednoj stranici.",
        url: "https://theglitch.rs",
        interno: "/sr/radovi/glitch",
        slika: radoviSlike.glitch,
      },
    ],
  },
  koraci: {
    eyebrow: "Kako ide",
    title: "Četiri koraka, bez",
    accent: "iznenađenja.",
    p: "Bez rokova koji se pomeraju u nedogled i bez skrivenih stavki na kraju.",
    steps: [
      {
        h: "Razgovor, 20 minuta, besplatno",
        p: "Telefon ili uživo. Šta ti treba, ko su ti klijenti, šta radi konkurencija, koji je budžet. Iskreno kažemo ako ti nešto ne treba.",
      },
      {
        h: "Plan i ponuda za 24h",
        p: "Dobiješ na papiru šta tačno radimo, koliko košta i kada je gotovo. Bez stavki koje iskoče na kraju.",
      },
      {
        h: "Snimamo i pravimo",
        p: "Jedan dan snimanja daje sadržaj za ceo mesec. Sajt dobija prvu verziju za 24 sata. Vidiš rezultat pre nego što je sve gotovo.",
      },
      {
        h: "Objava i merenje",
        p: "Objavljujemo, puštamo oglase i pratimo brojke. Mesečni izveštaj sa onim što je stvarno donelo upite — i šta menjamo sledeći mesec.",
      },
    ],
  },
  paketi: {
    eyebrow: "Paketi",
    title: "Izaberi otprilike gde",
    accent: "spadaš.",
    p: "Cenu ne lepimo unapred jer mesec snimanja i aplikacija sa bazom nisu isti posao. Reci nam šta ti treba i dobijaš tačnu cenu i rok u roku od 24 sata.",
    items: [
      {
        h: "Sadržaj",
        p: "Za brendove kojima treba stalan priliv snimaka.",
        list: [
          "Paket short form snimaka mesečno",
          "Jedan dan snimanja mesečno kod tebe",
          "Montaža, titlovi, muzika, naslovna",
          "Plan objava i tekstovi",
          "Objavljivanje na Instagram i TikTok",
          "Mesečni izveštaj o dometu",
        ],
      },
      {
        h: "Sadržaj i oglasi",
        p: "Kada snimci treba da donesu upite, ne samo preglede.",
        list: [
          "Sve iz paketa Sadržaj",
          "Postavka Meta i Google naloga i piksela",
          "Vođenje kampanja i budžeta",
          "Kreative za oglase iz istog snimanja",
          "A/B testiranje i praćenje konverzija",
          "Izveštaj sa cenom po upitu",
          "Landing stranica za kampanju",
        ],
      },
      {
        h: "Sajt i aplikacija",
        p: "Za digitalnu kuću u koju sav taj saobraćaj sleće.",
        list: [
          "Sajt po meri ili online prodavnica",
          "Prva verzija za 24 sata",
          "Web ili mobilna aplikacija, iOS i Android",
          "CMS, SEO i brzina 90+",
          "Merenje konverzija povezano sa oglasima",
          "Održavanje i podrška",
        ],
      },
    ],
    note:
      "U svakom paketu: snimljeni materijal, kod, domen i nalozi ostaju na tvoje ime · račun i ugovor · jedan sagovornik za sve · bez vezivanja na godinu dana.",
  },
  razlozi: {
    eyebrow: "Zašto mi",
    title: "Šest razloga da nas ne",
    accent: "preskočiš.",
    p: "Nijedan od njih nije obećanje rezultata — to su stvari koje se mogu proveriti unapred.",
    items: [
      {
        h: "Registrovana firma, ne freelancer sa Instagrama",
        p: "POPZOGRAPHY, PIB 114200786, MB 67394909, osnovana 14.02.2024. Dobijaš ugovor i račun.",
      },
      {
        h: "Jedan sagovornik za sve",
        p: "Snimanje, oglasi i sajt na istom mestu. Nema prebacivanja krivice između tri firme kad nema rezultata.",
      },
      {
        h: "Prava oprema, ne telefon",
        p: "Sony FX3, DJI Avata 2 za FPV i DJI Mini 5 Pro. Kadrovi koje konkurencija ne može da izvuče iz mobilnog.",
      },
      {
        h: "Vidiš pre nego što platiš",
        p: "Prva verzija sajta za 24h, prvi snimci u prvoj nedelji. Ako ti se ne dopadne pravac, znaš na vreme.",
      },
      {
        h: "Pričaš sa onim ko radi",
        p: "Bez posrednika i „prosledio sam kolegi“. Direktan broj, javljamo se isti dan.",
      },
      {
        h: "Sve ostaje tvoje",
        p: "Snimljeni materijal, kod, domen i reklamni nalozi glase na tebe. Možeš da odeš kod bilo koga sutra.",
      },
    ],
  },
  pitanja: {
    eyebrow: "Pitanja",
    title: "Ono što nas najčešće",
    accent: "pitaju.",
    p: "Ako nešto nije ovde, pitaj — odgovaramo isto.",
    items: [
      {
        q: "Koliko košta?",
        a: "Zavisi šta uzimaš. Mesec snimanja, vođenje oglasa i izrada aplikacije su tri različite priče, pa bi svaka cena zalepljena unapred bila laž. Pošalji kratak opis — vraćamo se sa konkretnom cenom i rokom u roku od 24h, bez obaveze.",
      },
      {
        q: "Koliko snimaka dobijam iz jednog dana?",
        a: "Zavisi od paketa i od toga koliko materijala možemo da izvučemo. Kod većine klijenata jedan dan da dovoljno za mesec dana objava. Tačan broj dogovaramo unapred i piše u ugovoru.",
      },
      {
        q: "Moram li ja da se pojavim pred kamerom?",
        a: "Ne moraš. Radi se i bez lica — proizvod, proces, prostor, detalji, animirani tekst. Ako ipak hoćeš da se pojaviš, pomažemo oko toga šta da kažeš i kako da staneš, ne bacamo te pred kameru bez pripreme.",
      },
      {
        q: "Radite samo snimanje ili i oglase?",
        a: "Oboje, i najbolje rade zajedno. Možeš da uzmeš samo snimanje ako oglase već neko vodi, ali onda ne odgovaramo za rezultat kampanje — samo za materijal.",
      },
      {
        q: "Koliko se čeka sajt?",
        a: "Prvu verziju vidiš za 24 sata od razgovora. Jednostavnija landing stranica je gotova za 3–7 dana, veći sajt ili prodavnica 7–21 dan. Aplikacije se rade u fazama i rok dogovaramo posle brifa.",
      },
      {
        q: "Imam star sajt, radite preseljenje?",
        a: "Radimo, i to često. Prebacimo sadržaj bez gubitka Google pozicija, postavimo preusmerenja sa starih adresa i modernizujemo dizajn, brzinu i mobilni prikaz. Ako nemaš pristup starom sajtu, pomažemo i oko toga.",
      },
      {
        q: "Čiji su nalozi i materijal?",
        a: "Tvoji. Reklamni nalog, domen, hosting i sav sirovi materijal glase na tvoje ime i tvoj mejl. Ne držimo klijente kao taoce.",
      },
      {
        q: "Ide li ugovor i račun?",
        a: "Naravno. POPZOGRAPHY je registrovana firma, PIB 114200786, MB 67394909. Za svaki posao ide ugovor sa jasnim obimom, rokom i cenom, i uredan račun.",
      },
      {
        q: "Radite i van Beograda?",
        a: "Radimo za celu Srbiju i inostranstvo. Sve se lepo odradi preko poziva i deljenja ekrana, a ako si u Beogradu ili Zemunu — može i kafa uživo.",
      },
    ],
  },
  uslugeIzbor: [
    "Short form video (Reels / TikTok)",
    "Vođenje profila na mrežama",
    "Meta i Google oglasi",
    "Spot ili korporativni video",
    "Sajt ili online prodavnica",
    "Web ili mobilna aplikacija",
    "Kompletan paket",
    "Besplatna analiza",
    "Nisam siguran, treba mi savet",
  ],
  kraj: {
    eyebrow: "Upit",
    title: "Reci nam šta ti treba i to",
    accent: "je to.",
    p: "Odgovaramo u roku od 24 sata, radnim danima obično mnogo brže. Prvi razgovor je besplatan i ništa te ne obavezuje.",
  },
};

const en: Kampanja = {
  slug: "marketing",
  meta: {
    title: "Content, ads and a website — one team for all three | Popzify",
    description:
      "We shoot short-form content, run Meta and Google ads and build websites and apps. No three separate contractors blaming each other when results do not come. Belgrade, since 2024.",
  },
  hero: {
    eyebrow: "Belgrade · Zemun · since 2024",
    title: "Footage people watch, ads that sell, a site that",
    accent: "converts.",
    sub:
      "Popzify is one team for all three: we shoot short-form content, run Meta and Google ads, and build websites and apps. No three separate contractors blaming each other when results do not come.",
    cta: "Ask for a quote",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Sony FX3 · FPV and gimbal drone", "First site version in 24h", "Reply within 24h"],
  },
  partneri: { naslov: "Brands we have worked with", slike: partneri.slike },
  bol: {
    eyebrow: "Let us guess",
    title: "Does any of this sound",
    accent: "familiar?",
    p: "If so, you are not the only one — and none of it sorts itself out.",
    items: [
      {
        h: "You post, 200 people see it",
        p: "Mostly people you already know. After a few of those it is normal to give up.",
      },
      {
        h: "No time and no idea",
        p: "You know you should post something every day, but that day is already full of actual work.",
      },
      {
        h: "Clicks come, enquiries do not",
        p: "You pay for ads and do not know what one enquiry costs you — so you cannot tell whether it pays.",
      },
      {
        h: "Three contractors, nobody responsible",
        p: "One shoots, another runs the ads, a third built the site — and nobody answers for the result.",
      },
      {
        h: "A site that looks like 2015",
        p: "You are embarrassed to send the link, so you do not. And that is where the ads land.",
      },
      {
        h: "Competitors look more serious",
        p: "With worse service than yours, purely because they look tidier online.",
      },
    ],
  },
  usluge: {
    eyebrow: "What we do",
    title: "Content, ads and everything that goes",
    accent: "with it.",
    p: "Take one piece or the whole chain — from the shoot, through the ads, to the site those ads point at.",
    items: [
      {
        h: "Short-form video",
        p: "Reels, TikTok and Shorts — shooting, editing, subtitles, music and cover frames. One shoot day, content for a whole month.",
      },
      {
        h: "Music videos and production",
        p: "Music videos, corporate and brand film, podcasts, event coverage. Sony FX3, FPV and gimbal drone — frames a phone cannot get.",
      },
      {
        h: "Running the profile",
        p: "A posting plan, captions, publishing and answering messages. You do your job, the profile does its own.",
      },
      {
        h: "Meta and Google ads",
        p: "Account and pixel setup, creatives, testing and a monthly report with numbers. You know what one enquiry costs; we do not shoot blind.",
      },
      {
        h: "Websites and shops",
        p: "A custom site, a campaign landing page or an online shop with card payment. First version in 24h, no bought templates.",
      },
      {
        h: "Web and mobile apps",
        p: "Platforms with user accounts, a database and payments. iOS and Android from one codebase, through to the App Store and Google Play.",
      },
    ],
  },
  radovi: {
    eyebrow: "Work",
    title: "Some of what we have",
    accent: "built.",
    p: "Click a project and open it live — not a screenshot, a site that works.",
    items: [
      {
        h: "DUKAT Private Desk",
        p: "A private desk for buying and selling USDT, EUR and USD. The offer right in the hero, the process in four steps, and a clear path to Telegram.",
        url: "https://dukatdesk.com",
        interno: "/sr/radovi/dukatdesk",
        slika: radoviSlike.dukatdesk,
      },
      {
        h: "Correct Score Pro",
        p: "An AI platform for football predictions. A page per match, four prediction models, calculators and a VIP area, in four languages.",
        url: "https://correctscore.pro",
        interno: "/sr/radovi/correctscore",
        slika: radoviSlike.correctscore,
      },
      {
        h: "BIF — Balkan Influence Fighting",
        p: "A site for an influencer boxing event. Tickets in the hero, the fighter roster, news and results, the stream and jersey orders.",
        url: "https://bif.events",
        interno: "/sr/radovi/bif",
        slika: radoviSlike.bif,
      },
      {
        h: "Bali Mountain Resort",
        p: "A mountain resort above the Lim valley in Bijelo Polje. Three languages, availability checks and booking enquiries, a gallery by season.",
        url: "https://hotelbali.vercel.app/me",
        interno: "/sr/radovi/hotelbali",
        slika: radoviSlike.hotelbali,
      },
      {
        h: "RAA Team",
        p: "An agency for hostesses, promoters and modelling. Ten service categories, a portfolio from sets, and an application form for candidates.",
        url: "https://raateam.vercel.app/sr",
        interno: "/sr/radovi/raateam",
        slika: radoviSlike.raateam,
      },
      {
        h: "GLITCH",
        p: "A video production and web development agency. Four services, a three-step process and contact on one page.",
        url: "https://theglitch.rs",
        interno: "/sr/radovi/glitch",
        slika: radoviSlike.glitch,
      },
    ],
  },
  koraci: {
    eyebrow: "How it goes",
    title: "Four steps, no",
    accent: "surprises.",
    p: "No deadlines that keep moving and no hidden items at the end.",
    steps: [
      {
        h: "A talk, 20 minutes, free",
        p: "Phone or in person. What you need, who your clients are, what competitors do, what the budget is. We say honestly if you do not need something.",
      },
      {
        h: "Plan and quote in 24h",
        p: "You get it on paper: exactly what we do, what it costs and when it is done. Nothing appears at the end.",
      },
      {
        h: "We shoot and build",
        p: "One shoot day gives content for a whole month. The site gets a first version in 24 hours. You see the result before everything is finished.",
      },
      {
        h: "Publishing and measuring",
        p: "We post, run the ads and watch the numbers. A monthly report with what actually brought enquiries — and what we change next month.",
      },
    ],
  },
  paketi: {
    eyebrow: "Packages",
    title: "Pick roughly where you",
    accent: "fit.",
    p: "We do not stick a price up front, because a month of shooting and an app with a database are not the same job. Tell us what you need and you get an exact price and timeline within 24 hours.",
    items: [
      {
        h: "Content",
        p: "For brands that need a steady flow of footage.",
        list: [
          "A set of short-form clips monthly",
          "One shoot day a month at your place",
          "Editing, subtitles, music, cover frames",
          "A posting plan and captions",
          "Publishing to Instagram and TikTok",
          "A monthly reach report",
        ],
      },
      {
        h: "Content and ads",
        p: "When the footage has to bring enquiries, not just views.",
        list: [
          "Everything in Content",
          "Meta and Google account and pixel setup",
          "Running campaigns and budget",
          "Ad creatives from the same shoot",
          "A/B testing and conversion tracking",
          "A report with cost per enquiry",
          "A landing page for the campaign",
        ],
      },
      {
        h: "Site and app",
        p: "For the digital house all that traffic lands in.",
        list: [
          "A custom site or an online shop",
          "First version in 24 hours",
          "A web or mobile app, iOS and Android",
          "CMS, SEO and a 90+ speed score",
          "Conversion tracking wired to the ads",
          "Maintenance and support",
        ],
      },
    ],
    note:
      "In every package: the footage, the code, the domain and the accounts stay in your name · invoice and contract · one person to talk to · no year-long lock-in.",
  },
  razlozi: {
    eyebrow: "Why us",
    title: "Six reasons not to skip",
    accent: "past.",
    p: "None of them is a promise of results — they are things you can check before you pay.",
    items: [
      {
        h: "A registered company, not a freelancer from Instagram",
        p: "POPZOGRAPHY, tax ID 114200786, registration number 67394909, established 14.02.2024. You get a contract and an invoice.",
      },
      {
        h: "One person to talk to",
        p: "Shooting, ads and the site in one place. No blame passed between three companies when results do not come.",
      },
      {
        h: "Real equipment, not a phone",
        p: "Sony FX3, a DJI Avata 2 for FPV and a DJI Mini 5 Pro. Frames competitors cannot pull out of a mobile.",
      },
      {
        h: "You see before you pay",
        p: "First site version in 24h, first clips in the first week. If you do not like the direction, you know in time.",
      },
      {
        h: "You talk to the person doing the work",
        p: "No middlemen and no “I passed it to a colleague”. A direct number, answered the same day.",
      },
      {
        h: "Everything stays yours",
        p: "The footage, the code, the domain and the ad accounts are in your name. You can walk to anyone else tomorrow.",
      },
    ],
  },
  pitanja: {
    eyebrow: "Questions",
    title: "What we get asked",
    accent: "most.",
    p: "If something is not here, ask — the answer comes the same way.",
    items: [
      {
        q: "What does it cost?",
        a: "It depends what you take. A month of shooting, running ads and building an app are three different stories, so any price stuck up front would be a lie. Send a short description — we come back with a concrete price and timeline within 24h, no obligation.",
      },
      {
        q: "How many clips do I get from one day?",
        a: "It depends on the package and how much we can pull out of the day. For most clients one day gives enough for a month of posts. The exact number is agreed up front and written into the contract.",
      },
      {
        q: "Do I have to be on camera?",
        a: "You do not. It works without a face — the product, the process, the space, details, animated text. If you do want to appear, we help with what to say and how to stand; we do not throw you in front of a camera unprepared.",
      },
      {
        q: "Do you only shoot, or run ads too?",
        a: "Both, and they work best together. You can take only the shooting if someone else runs the ads, but then we do not answer for the campaign result — only for the material.",
      },
      {
        q: "How long does a site take?",
        a: "You see the first version 24 hours after the call. A simpler landing page is done in 3–7 days, a bigger site or shop in 7–21 days. Apps are built in phases and the timeline is agreed after the brief.",
      },
      {
        q: "I have an old site — do you migrate?",
        a: "We do, often. We move the content without losing Google positions, set redirects from the old addresses, and modernise the design, speed and mobile layout. If you have lost access to the old site, we help with that too.",
      },
      {
        q: "Whose accounts and footage are they?",
        a: "Yours. The ad account, the domain, the hosting and all raw footage are in your name and your email. We do not hold clients hostage.",
      },
      {
        q: "Is there a contract and an invoice?",
        a: "Of course. POPZOGRAPHY is a registered company, tax ID 114200786, registration number 67394909. Every job comes with a contract stating scope, timeline and price, and a proper invoice.",
      },
      {
        q: "Do you work outside Belgrade?",
        a: "We work across Serbia and abroad. It all runs fine over calls and screen sharing — and if you are in Belgrade or Zemun, coffee in person works too.",
      },
    ],
  },
  uslugeIzbor: [
    "Short-form video (Reels / TikTok)",
    "Running social profiles",
    "Meta and Google ads",
    "Music video or corporate film",
    "Website or online shop",
    "Web or mobile app",
    "The whole package",
    "Free audit",
    "Not sure, I need advice",
  ],
  kraj: {
    eyebrow: "Enquiry",
    title: "Tell us what you need and that",
    accent: "is it.",
    p: "We reply within 24 hours, usually much faster on working days. The first talk is free and commits you to nothing.",
  },
};

export const marketing = { sr, en };
