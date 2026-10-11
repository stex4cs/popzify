import type { Locale } from "./i18n";

/**
 * Radovi: sajtovi koje smo napravili.
 *
 * Stari popzify.com je imao zasebnu stranu po projektu. Te strane se ne
 * prenose, ali sam sadrzaj da — ljudi dolaze bas da vide sajtove, pa su
 * napisane nove u ovom jeziku.
 *
 * Tekst je prenet sa starih strana i preveden. U "ukratko" idu samo
 * cinjenice o samom sajtu — broj jezika, koraka, usluga — nikad
 * izmisljeni poslovni rezultati.
 */

export type Blok = { h: string; p: string };

export type Rad = {
  slug: string;
  ime: string;
  url: string;
  /** Jedna recenica ispod imena. */
  lead: string;
  /** Grana, obim posla, godina. */
  grana: string;
  obim: string;
  godina: string;
  pregled: string;
  izazovUvod: string;
  izazov: string[];
  resenje: Blok[];
  ukratko: { broj: string; sta: string }[];
  /** Imena fajlova u public/radovi-sajt/<slug>/, bez nastavka. */
  slike: string[];
};

type Sadrzaj = Record<Locale, Rad>;

const dukatdesk: Sadrzaj = {
  sr: {
    slug: "dukatdesk",
    ime: "DUKAT Private Desk",
    url: "https://dukatdesk.com",
    lead: "Sajt za privatni desk za otkup i prodaju kriptovaluta, na četiri jezika.",
    grana: "Razmena digitalne imovine (OTC)",
    obim: "Dizajn, izrada sajta, četiri jezika",
    godina: "2025.",
    pregled:
      "DUKAT je privatni desk za razmenu USDT, EUR i USD u većim iznosima. Nema samouslužne platforme ni korisničkih naloga. Klijent pošalje zahtev, desk mu lično odgovori sa kursom, i dogovor se nastavlja preko Telegrama, WhatsApp-a ili pisanog zahteva. Sajt je trebalo da taj model objasni na prvi pogled i da posetioca bez lutanja dovede do zahteva.",
    izazovUvod:
      "Privatni desk se ne prodaje kao menjačnica. Ko menja veći iznos ne traži dugme „kupi“, nego nekoga kome može da veruje. Zato je sajt morao da:",
    izazov: [
      "odmah objasni da nema samouslužne trgovine i da svaki kurs daje čovek,",
      "uliva poverenje mirnim tonom, bez prodajnog pritiska,",
      "radi na četiri jezika, sa verzijama pravilno označenim za pretraživače,",
      "posetioca što kraćim putem dovede do zahteva, preko kanala koji mu je najlakši.",
    ],
    resenje: [
      {
        h: "Ponuda odmah u herou",
        p: "Na samom vrhu stoji mali obrazac: šta imate, šta želite i koliko. To nije kalkulator sa kursom, jer kurs ne postoji dok ga desk ne da. Umesto toga odmah pokazuje kako saradnja izgleda i vodi pravo na Telegram ili WhatsApp.",
      },
      {
        h: "Proces u četiri koraka",
        p: "Zahtev, ponuda, potvrda, realizacija. Svaki korak u jednoj rečenici, da klijent pre prvog kontakta zna tačno šta ga čeka.",
      },
      {
        h: "Četiri jezika, svaki na svojoj adresi",
        p: "Srpski, engleski, nemački i ruski. Verzije su međusobno povezane hreflang oznakama, pa pretraživač svakom posetiocu pokazuje onu na njegovom jeziku.",
      },
    ],
    ukratko: [
      { broj: "4", sta: "jezika, svaki na svojoj adresi" },
      { broj: "3", sta: "valute: USDT, EUR i USD" },
      { broj: "4", sta: "koraka od zahteva do realizacije" },
      { broj: "3", sta: "kanala za kontakt" },
    ],
    slike: ["main", "zahtev", "proces", "valute", "jezici", "mobile"],
  },
  en: {
    slug: "dukatdesk",
    ime: "DUKAT Private Desk",
    url: "https://dukatdesk.com",
    lead: "A site for a private desk buying and selling crypto, in four languages.",
    grana: "Digital asset exchange (OTC)",
    obim: "Design, build, four languages",
    godina: "2025",
    pregled:
      "DUKAT is a private desk for exchanging USDT, EUR and USD in larger amounts. There is no self-service platform and no user accounts. A client sends a request, the desk replies personally with a rate, and the deal continues over Telegram, WhatsApp or a written request. The site had to explain that model at a glance and lead the visitor to a request without wandering.",
    izazovUvod:
      "A private desk is not sold like a bureau de change. Someone moving a larger amount is not looking for a “buy” button but for someone they can trust. So the site had to:",
    izazov: [
      "say immediately that there is no self-service trading and that every rate comes from a person,",
      "build trust with a calm tone, without sales pressure,",
      "work in four languages, with each version properly marked for search engines,",
      "get the visitor to a request by the shortest path, through whichever channel suits them.",
    ],
    resenje: [
      {
        h: "The offer right in the hero",
        p: "At the very top sits a small form: what you have, what you want and how much. It is not a rate calculator, because no rate exists until the desk gives one. Instead it shows immediately what working together looks like and leads straight to Telegram or WhatsApp.",
      },
      {
        h: "The process in four steps",
        p: "Request, quote, confirmation, settlement. Each step in one sentence, so the client knows exactly what is coming before the first contact.",
      },
      {
        h: "Four languages, each on its own address",
        p: "Serbian, English, German and Russian. The versions are linked with hreflang tags, so search engines show each visitor the one in their language.",
      },
    ],
    ukratko: [
      { broj: "4", sta: "languages, each on its own address" },
      { broj: "3", sta: "currencies: USDT, EUR and USD" },
      { broj: "4", sta: "steps from request to settlement" },
      { broj: "3", sta: "contact channels" },
    ],
    slike: ["main", "zahtev", "proces", "valute", "jezici", "mobile"],
  },
};

const correctscore: Sadrzaj = {
  sr: {
    slug: "correctscore",
    ime: "Correct Score Pro",
    url: "https://correctscore.pro",
    lead: "AI platforma za fudbalske prognoze, na četiri jezika.",
    grana: "Sportska analitika",
    obim: "Dizajn i razvoj platforme, četiri jezika",
    godina: "2024 — danas",
    pregled:
      "Correct Score Pro je platforma za prognoze fudbalskih utakmica. Za svaku utakmicu računa verovatne rezultate kombinovanjem Monte Carlo simulacija, Poissonove raspodele i mašinskog učenja, i prikazuje ih uz kvote uživo. Prva verzija bila je sajt sa prognozama i pretplatom. Od tada je prerasla u pun proizvod: dashboard, analize, statistiku modela, kalkulatore, ligu prognoza i VIP članstvo.",
    izazovUvod:
      "Prognoze su pune brojeva, a većina posetilaca samo želi da zna šta će se desiti i koliko je to sigurno. Platforma je morala da:",
    izazov: [
      "svakog dana prikaže mnogo utakmica iz velikog broja liga, a da ekran ostane pregledan,",
      "objasni odakle prognoza dolazi, a ne samo da je ispiše,",
      "ima posebnu stranicu za svaku utakmicu, koju pretraživač može da pronađe,",
      "radi na četiri jezika, za publiku van regiona,",
      "jasno razdvoji besplatan sadržaj od VIP članstva.",
    ],
    resenje: [
      {
        h: "Dashboard sa današnjim utakmicama",
        p: "Početna je pregled dana: izbor datuma, filter liga, omiljeni timovi, utakmice koje tek počinju, uživo i završene, i kvote uz svaku utakmicu.",
      },
      {
        h: "Stranica za svaku utakmicu",
        p: "Za svaku utakmicu nastaje posebna stranica sa prognozom, formom oba tima, prosekom golova i međusobnim duelima. Adrese su čitljive, po ligi, timovima i datumu, pa se svaka utakmica može pronaći u pretrazi.",
      },
      {
        h: "Četiri modela, prikazana javno",
        p: "Stranica statistike pokazuje kako rade Monte Carlo, Poissonova raspodela, mašinsko učenje i kombinovani model, svaki sa svojom preciznošću.",
      },
      {
        h: "Kalkulatori",
        p: "Četiri alata na jednom mestu: value bet, Kelly kriterijum, očekivana vrednost i arbitraža.",
      },
      {
        h: "Četiri jezika, svaki na svojoj adresi",
        p: "Engleski, španski, francuski i portugalski. Verzije su povezane hreflang oznakama.",
      },
    ],
    ukratko: [
      { broj: "4", sta: "modela prognoze" },
      { broj: "4", sta: "kalkulatora na jednom mestu" },
      { broj: "4", sta: "jezika" },
      { broj: "1", sta: "stranica po utakmici" },
    ],
    slike: ["main", "utakmica", "statistika", "analiza", "kalkulator", "jezici", "mobile"],
  },
  en: {
    slug: "correctscore",
    ime: "Correct Score Pro",
    url: "https://correctscore.pro",
    lead: "An AI platform for football predictions, in four languages.",
    grana: "Sports analytics",
    obim: "Platform design and development, four languages",
    godina: "2024 — present",
    pregled:
      "Correct Score Pro predicts football match results. For every match it computes likely scores by combining Monte Carlo simulations, the Poisson distribution and machine learning, and shows them next to live odds. The first version was a site with predictions and a subscription. It has since grown into a full product: a dashboard, analyses, model statistics, calculators, a prediction league and VIP membership.",
    izazovUvod:
      "Predictions are full of numbers, while most visitors only want to know what will happen and how certain it is. The platform had to:",
    izazov: [
      "show many matches from many leagues every day while the screen stays readable,",
      "explain where a prediction comes from, not just print it,",
      "give every match its own page that search engines can find,",
      "work in four languages, for an audience outside the region,",
      "separate free content from VIP membership clearly.",
    ],
    resenje: [
      {
        h: "A dashboard of today's matches",
        p: "The home page is the day at a glance: a date picker, a league filter, favourite teams, matches upcoming, live and finished, with odds next to each.",
      },
      {
        h: "A page per match",
        p: "Every match gets its own page with the prediction, both teams' form, goal averages and head-to-head record. Addresses are readable — by league, teams and date — so each match can be found in search.",
      },
      {
        h: "Four models, shown openly",
        p: "The statistics page shows how Monte Carlo, the Poisson distribution, machine learning and the combined model each perform, with their own accuracy.",
      },
      {
        h: "Calculators",
        p: "Four tools in one place: value bet, the Kelly criterion, expected value and arbitrage.",
      },
      {
        h: "Four languages, each on its own address",
        p: "English, Spanish, French and Portuguese, linked with hreflang tags.",
      },
    ],
    ukratko: [
      { broj: "4", sta: "prediction models" },
      { broj: "4", sta: "calculators in one place" },
      { broj: "4", sta: "languages" },
      { broj: "1", sta: "page per match" },
    ],
    slike: ["main", "utakmica", "statistika", "analiza", "kalkulator", "jezici", "mobile"],
  },
};

const bif: Sadrzaj = {
  sr: {
    slug: "bif",
    ime: "BIF — Balkan Influence Fighting",
    url: "https://bif.events",
    lead: "Sajt za prvi balkanski influenser boks spektakl.",
    grana: "Sportski događaji i zabava",
    obim: "Dizajn, izrada sajta, forme i prodaja",
    godina: "2025.",
    pregled:
      "BIF je boks spektakl u kome se u ringu sastaju influenseri sa Balkana. Sajt je glavno mesto za sve oko događaja: ulaznice, borce, vesti i rezultate, prenos, prodaju dresova i saradnju sa sponzorima, na srpskom i engleskom.",
    izazovUvod:
      "Ovakav događaj živi od hajpa pre borbe, a sajt mora da prati sve faze: najavu, prodaju ulaznica, samu borbu i rezultate posle nje. Trebalo je da:",
    izazov: [
      "ulaznice budu na jedan klik, odmah na vrhu,",
      "svaki borac ima profil sa nadimkom i težinskom kategorijom,",
      "vesti, pravila i zvanični rezultati izlaze brzo, uz fotografije,",
      "sponzori vide jasne nivoe partnerstva i imaju direktan put do saradnje,",
      "sve radi na srpskom i engleskom.",
    ],
    resenje: [
      {
        h: "Odbrojavanje i ulaznice u herou",
        p: "Hero najavljuje sledeći BIF sa dugmetom za kupovinu ulaznica i odbrojavanjem do borbe, a odmah ispod stoji trejler.",
      },
      {
        h: "Roster boraca",
        p: "Karusel sa svim borcima: nadimak, ime i težinska kategorija, uz oznaku šampiona.",
      },
      {
        h: "Vesti i rezultati",
        p: "Sekcija za najave, pravila i zvanične rezultate, svaka vest sa datumom i fotografijom.",
      },
      {
        h: "Partnerstva u tri nivoa",
        p: "Glavni, premium i osnovni partner, svaki sa jasno navedenim pogodnostima i dugmetom za kontakt.",
      },
      {
        h: "Prenos, dresovi i kontakt",
        p: "Posebna stranica za PPV prenos, porudžbina zvaničnih dresova kroz formu, kontakt forma sa izborom teme i prijava na newsletter. Forme su zaštićene reCAPTCHA proverom.",
      },
    ],
    ukratko: [
      { broj: "2", sta: "jezika" },
      { broj: "3", sta: "nivoa partnerstva" },
      { broj: "4", sta: "forme: kontakt, dresovi, partnerstvo, newsletter" },
    ],
    slike: ["main", "borci", "vesti", "partnerstvo", "kontakt", "mobile"],
  },
  en: {
    slug: "bif",
    ime: "BIF — Balkan Influence Fighting",
    url: "https://bif.events",
    lead: "A site for the first Balkan influencer boxing event.",
    grana: "Sports events and entertainment",
    obim: "Design, build, forms and sales",
    godina: "2025",
    pregled:
      "BIF is a boxing event where influencers from across the Balkans meet in the ring. The site is the single place for everything around it: tickets, fighters, news and results, the stream, jersey sales and sponsor partnerships, in Serbian and English.",
    izazovUvod:
      "An event like this lives on the hype before the fight, and the site has to follow every phase: the announcement, ticket sales, the fight itself and the results after. It had to:",
    izazov: [
      "put tickets one click away, right at the top,",
      "give every fighter a profile with nickname and weight class,",
      "publish news, rules and official results quickly, with photographs,",
      "show sponsors clear partnership tiers and a direct route to a deal,",
      "work in Serbian and English.",
    ],
    resenje: [
      {
        h: "A countdown and tickets in the hero",
        p: "The hero announces the next BIF with a ticket button and a countdown to the fight, with the trailer right below.",
      },
      {
        h: "The fighter roster",
        p: "A carousel of every fighter: nickname, name and weight class, with a champion marker.",
      },
      {
        h: "News and results",
        p: "A section for announcements, rules and official results, each with a date and a photograph.",
      },
      {
        h: "Partnerships in three tiers",
        p: "Main, premium and basic partner, each with its benefits spelled out and a contact button.",
      },
      {
        h: "Stream, jerseys and contact",
        p: "A dedicated page for the PPV stream, official jersey orders through a form, a contact form with a subject picker and a newsletter sign-up. The forms are protected by reCAPTCHA.",
      },
    ],
    ukratko: [
      { broj: "2", sta: "languages" },
      { broj: "3", sta: "partnership tiers" },
      { broj: "4", sta: "forms: contact, jerseys, partnership, newsletter" },
    ],
    slike: ["main", "borci", "vesti", "partnerstvo", "kontakt", "mobile"],
  },
};

const raateam: Sadrzaj = {
  sr: {
    slug: "raateam",
    ime: "RAA Team",
    url: "https://raateam.vercel.app/sr",
    lead: "Sajt agencije za hostese, promotere i talente, na tri jezika.",
    grana: "Hostese, promocije i talenti",
    obim: "Dizajn, izrada sajta, tri jezika, forme",
    godina: "2025.",
    pregled:
      "RAA Team bira, priprema i vodi ljude koji predstavljaju brendove: hostese, promotere, modele i brand ambasadore na eventima, snimanjima i u noćnom životu. Sajt radi dva posla odjednom. Klijentima pokazuje šta agencija nudi, a talentima daje mesto da se prijave.",
    izazovUvod:
      "Agencija za hostese se lako predstavi jeftino. Ovde je trebalo suprotno, da sajt deluje diskretno i ozbiljno i da:",
    izazov: [
      "prikaže deset različitih vrsta angažmana, od sajmova do protokola,",
      "pokaže stvarne fotografije sa setova i događaja, a ne stock slike,",
      "odvoji upit klijenta od prijave talenta,",
      "radi na srpskom, engleskom i ruskom.",
    ],
    resenje: [
      {
        h: "Deset usluga kao pregledna lista",
        p: "Hostese i promoterke, spotovi i produkcija, eventi i lansiranja, korporativne proslave, casino i gaming, sajmovi i izložbe, modeling i kasting, brand ambasadori, nightlife i klubovi, protokol i VIP usluga. Uz svaku stavku kratko piše šta angažman podrazumeva.",
      },
      {
        h: "Galerija iz produkcije",
        p: "Fotografije sa setova, događaja i VIP programa, pa posetilac odmah vidi nivo angažmana.",
      },
      {
        h: "Proces u četiri koraka",
        p: "Brif, selekcija, priprema i realizacija, svaki korak u par rečenica.",
      },
      {
        h: "Dve vrste saradnje",
        p: "Posebni putevi za klijente i za talente, svaki vodi do svoje forme, pa se upiti ne mešaju.",
      },
      {
        h: "Tri jezika",
        p: "Srpski, engleski i ruski, svaki na svojoj adresi i povezan hreflang oznakama. Osnovna adresa sama preusmerava na srpsku verziju.",
      },
    ],
    ukratko: [
      { broj: "10", sta: "vrsta angažmana" },
      { broj: "3", sta: "jezika" },
      { broj: "4", sta: "koraka saradnje" },
      { broj: "2", sta: "odvojene forme: klijent i talenat" },
    ],
    slike: ["main", "usluge", "produkcija", "proces", "saradnja", "jezici", "mobile"],
  },
  en: {
    slug: "raateam",
    ime: "RAA Team",
    url: "https://raateam.vercel.app/sr",
    lead: "A site for a hostess, promoter and talent agency, in three languages.",
    grana: "Hostesses, promotions and talent",
    obim: "Design, build, three languages, forms",
    godina: "2025",
    pregled:
      "RAA Team selects, prepares and manages the people who represent brands: hostesses, promoters, models and brand ambassadors at events, on shoots and in nightlife. The site does two jobs at once. It shows clients what the agency offers, and gives talent a place to apply.",
    izazovUvod:
      "A hostess agency is easy to present cheaply. Here it had to be the opposite — discreet and serious — and the site had to:",
    izazov: [
      "present ten different kinds of engagement, from trade fairs to protocol duty,",
      "show real photographs from sets and events rather than stock images,",
      "separate a client enquiry from a talent application,",
      "work in Serbian, English and Russian.",
    ],
    resenje: [
      {
        h: "Ten services as a clear list",
        p: "Hostesses and promoters, music videos and production, events and launches, corporate parties, casino and gaming, trade fairs and exhibitions, modelling and casting, brand ambassadors, nightlife and clubs, protocol and VIP service. Each entry says briefly what the engagement involves.",
      },
      {
        h: "A gallery from production",
        p: "Photographs from sets, events and VIP programmes, so a visitor sees the level straight away.",
      },
      {
        h: "The process in four steps",
        p: "Brief, selection, preparation and delivery, each step in a couple of sentences.",
      },
      {
        h: "Two kinds of collaboration",
        p: "Separate routes for clients and for talent, each leading to its own form, so enquiries never mix.",
      },
      {
        h: "Three languages",
        p: "Serbian, English and Russian, each on its own address and linked with hreflang tags. The root address redirects to the Serbian version.",
      },
    ],
    ukratko: [
      { broj: "10", sta: "kinds of engagement" },
      { broj: "3", sta: "languages" },
      { broj: "4", sta: "steps of collaboration" },
      { broj: "2", sta: "separate forms: client and talent" },
    ],
    slike: ["main", "usluge", "produkcija", "proces", "saradnja", "jezici", "mobile"],
  },
};

const glitch: Sadrzaj = {
  sr: {
    slug: "glitch",
    ime: "GLITCH",
    url: "https://theglitch.rs",
    lead: "Sajt agencije za video produkciju i web razvoj.",
    grana: "Marketing i kreativna produkcija",
    obim: "Dizajn, izrada sajta, kontakt forma",
    godina: "2025.",
    pregled:
      "GLITCH je kreativna agencija iz Beograda koja radi video produkciju, digitalni marketing, sajtove i aplikacije. Sajt je trebalo da na jednoj stranici pokaže sve četiri oblasti i da posetioca dovede do upita, bez lutanja kroz podstranice.",
    izazovUvod:
      "Agencija sa četiri različite usluge lako završi sa sajtom koji ne kaže jasno ništa. Trebalo je da:",
    izazov: [
      "sve četiri usluge stanu na jednu stranicu, a da nijedna ne deluje sporedno,",
      "proces saradnje bude objašnjen pre prvog poziva,",
      "se vidi sa kojim alatima agencija radi,",
      "put do upita bude kratak, sa izborom usluge u formi.",
    ],
    resenje: [
      {
        h: "Četiri usluge u jednom redu",
        p: "Marketing i strategija, video produkcija, web sajtovi i aplikacije, grafički dizajn i brending. Svaka kartica kaže šta konkretno ulazi u uslugu.",
      },
      {
        h: "Proces u tri koraka",
        p: "Kickoff, produkcija i isporuka, svaki korak sa okvirnim rokom i spiskom šta se tačno dešava.",
      },
      {
        h: "Integracije",
        p: "Meta Ads, Google Ads, Stripe, Telegram Ads, Notion i GA4 sa Search Console-om, prikazani kao alati sa kojima se projekti povezuju.",
      },
      {
        h: "Kontakt, pitanja i pravne stranice",
        p: "Forma sa izborom oblasti interesovanja i najčešća pitanja odmah na stranici. Uz to posebne stranice za privatnost, kolačiće, GDPR i uslove korišćenja.",
      },
    ],
    ukratko: [
      { broj: "4", sta: "oblasti usluga" },
      { broj: "3", sta: "koraka saradnje" },
      { broj: "6", sta: "integracija" },
      { broj: "4", sta: "pravne stranice" },
    ],
    slike: ["main", "usluge", "proces", "integracije", "kontakt", "mobile"],
  },
  en: {
    slug: "glitch",
    ime: "GLITCH",
    url: "https://theglitch.rs",
    lead: "A site for a video production and web development agency.",
    grana: "Marketing and creative production",
    obim: "Design, build, contact form",
    godina: "2025",
    pregled:
      "GLITCH is a creative agency from Belgrade doing video production, digital marketing, websites and apps. The site had to show all four areas on a single page and bring the visitor to an enquiry without wandering through subpages.",
    izazovUvod:
      "An agency with four different services easily ends up with a site that says nothing clearly. It had to:",
    izazov: [
      "fit all four services on one page without any of them looking secondary,",
      "explain the process before the first call,",
      "show which tools the agency works with,",
      "keep the path to an enquiry short, with a service picker in the form.",
    ],
    resenje: [
      {
        h: "Four services in one row",
        p: "Marketing and strategy, video production, websites and apps, graphic design and branding. Each card says what concretely goes into the service.",
      },
      {
        h: "The process in three steps",
        p: "Kickoff, production and delivery, each step with a rough timeline and a list of what happens.",
      },
      {
        h: "Integrations",
        p: "Meta Ads, Google Ads, Stripe, Telegram Ads, Notion and GA4 with Search Console, shown as the tools projects connect to.",
      },
      {
        h: "Contact, questions and legal pages",
        p: "A form with an area-of-interest picker and the most common questions right on the page. Plus separate pages for privacy, cookies, GDPR and terms.",
      },
    ],
    ukratko: [
      { broj: "4", sta: "service areas" },
      { broj: "3", sta: "steps of collaboration" },
      { broj: "6", sta: "integrations" },
      { broj: "4", sta: "legal pages" },
    ],
    slike: ["main", "usluge", "proces", "integracije", "kontakt", "mobile"],
  },
};

const hotelbali: Sadrzaj = {
  sr: {
    slug: "hotelbali",
    ime: "Bali Mountain Resort",
    url: "https://hotelbali.vercel.app/me",
    lead: "Sajt planinskog resorta iznad doline Lima, na tri jezika.",
    grana: "Turizam i smeštaj",
    obim: "Dizajn, izrada sajta, tri jezika",
    godina: "2025.",
    pregled:
      "Bali Mountain Resort je planinski resort iznad doline Lima u Bijelom Polju. Sajt pokazuje smeštaj i okolinu, i vodi posetioca do provere dostupnosti i upita za rezervaciju.",
    izazovUvod: "Resort se bira po utisku, a rezerviše po podacima. Sajt je morao oboje:",
    izazov: [
      "pokaže kako mesto izgleda u različitim godišnjim dobima,",
      "da proveru dostupnosti i upit za rezervaciju na jednom mestu,",
      "radi na tri jezika, za goste iz regiona i iz inostranstva.",
    ],
    resenje: [
      {
        h: "Galerija po godišnjim dobima",
        p: "Isto mesto leti i zimi, da gost zna šta dobija u terminu koji bira.",
      },
      {
        h: "Provera dostupnosti i upit",
        p: "Datumi i broj gostiju vode pravo na upit za rezervaciju, bez zaobilaznih koraka.",
      },
      {
        h: "Tri jezika",
        p: "Crnogorski, engleski i ruski, svaki na svojoj adresi.",
      },
    ],
    ukratko: [
      { broj: "3", sta: "jezika" },
      { broj: "4", sta: "godišnja doba u galeriji" },
    ],
    slike: ["main"],
  },
  en: {
    slug: "hotelbali",
    ime: "Bali Mountain Resort",
    url: "https://hotelbali.vercel.app/me",
    lead: "A site for a mountain resort above the Lim valley, in three languages.",
    grana: "Tourism and accommodation",
    obim: "Design, build, three languages",
    godina: "2025",
    pregled:
      "Bali Mountain Resort sits in the mountains above the Lim valley in Bijelo Polje. The site shows the accommodation and the surroundings, and leads the visitor to an availability check and a booking enquiry.",
    izazovUvod: "A resort is chosen on impression and booked on detail. The site had to do both:",
    izazov: [
      "show what the place looks like across the seasons,",
      "put the availability check and the booking enquiry in one place,",
      "work in three languages, for guests from the region and abroad.",
    ],
    resenje: [
      {
        h: "A gallery by season",
        p: "The same place in summer and winter, so a guest knows what they get in the dates they pick.",
      },
      {
        h: "Availability and enquiry",
        p: "Dates and guest numbers lead straight to a booking enquiry, with no detours.",
      },
      {
        h: "Three languages",
        p: "Montenegrin, English and Russian, each on its own address.",
      },
    ],
    ukratko: [
      { broj: "3", sta: "languages" },
      { broj: "4", sta: "seasons in the gallery" },
    ],
    slike: ["main"],
  },
};

/** Redosled na spisku radova. */
export const radovi: Sadrzaj[] = [dukatdesk, correctscore, bif, raateam, glitch, hotelbali];

export function nadjiRad(slug: string, locale: Locale): Rad | undefined {
  return radovi.find((r) => r.sr.slug === slug)?.[locale];
}

export const slugovi = radovi.map((r) => r.sr.slug);
