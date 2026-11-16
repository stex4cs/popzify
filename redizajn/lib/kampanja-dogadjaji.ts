import type { Kampanja } from "./kampanje";

/**
 * Dogadjaji i proslave.
 *
 * Jedna strana za dve publike — firmu koja pravi gala vece ili kongres i
 * porodicu koja slavi rodjendan, punoletstvo ili krstenje — jer je posao
 * isti: jedno vece, ne sme da se ponovi, i snima se bez smetanja.
 *
 * Dokaz je ESVS Belgrade 2026, gala vece kongresa u Nacionalnoj klasi:
 * isti dogadjaj u 16:9 i kao zaseban rez u 9:16, plus fotografije sa
 * iste veceri. Ime dogadjaja i mesta stoje u samom filmu. Brojeve
 * gostiju i slicno ne navodimo, jer ih ne znamo.
 *
 * Obraca se u mnozini, kao strana za svadbe.
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
  "Bend uživo na bini, ESVS Belgrade 2026",
  "Violinistkinja u crvenom odelu",
  "Performerka u haljini od crvenih ruža",
  "Gosti na terasi pre početka programa",
  "Par u plesu pod crvenim svetlom",
  "Gost u svetlom sakou na podijumu",
  "Dvojica gostiju nazdravljaju",
  "Gošća se smeje na podijumu",
  "Slika na štafelaju, detalj sa večeri",
];

const altEn = [
  "Live band on stage, ESVS Belgrade 2026",
  "Violinist in a red suit",
  "Performer in a dress made of red roses",
  "Guests on the terrace before the programme",
  "A couple dancing under red light",
  "A guest in a light jacket on the dance floor",
  "Two guests raising a glass",
  "A guest laughing on the dance floor",
  "A painting on an easel, a detail from the night",
];

const sr: Kampanja = {
  slug: "dogadjaji",
  meta: {
    title: "Snimanje i fotografisanje događaja i proslava | Popzify",
    description:
      "Gala večeri, kongresi, firmine proslave, rođendani, punoletstva i krštenja. Isti tim radi video i fotografiju, aftermovie dobijate u 16:9 i u 9:16 za mreže. Beograd, Novi Sad i cela Srbija.",
  },
  hero: {
    eyebrow: "Beograd · Novi Sad · cela Srbija",
    title: "Događaj traje jedno veče. Snimak",
    accent: "ostaje.",
    sub:
      "Snimamo i fotografišemo gala večeri, kongrese, firmine proslave, rođendane, punoletstva i krštenja. Isti tim radi i video i fotografiju. Dobijate film za veliki ekran, posebnu verziju za Instagram i fotografije sa cele večeri.",
    cta: "Proverite da li smo slobodni",
    ctaDrugi: "060 5973212",
    oznake: ["Video i fotografija", "16:9 i 9:16", "Registrovana firma"],
    poster: "/dogadjaji/uvod.webp",
  },
  film: {
    eyebrow: "ESVS Belgrade 2026 · Nacionalna klasa",
    title: "Gala veče,",
    accent: "u minutu.",
    p: "Svečano veče kongresa ESVS u Beogradu: večera, bend uživo, ples do kraja. Pustite sa zvukom.",
    src: "/dogadjaji/film.mp4",
    poster: "/dogadjaji/poster.webp",
    dugme: "Pustite film · sa zvukom",
  },
  uspravno: {
    eyebrow: "Isto veče, za telefon",
    title: "I uspravno, za",
    accent: "mreže.",
    p:
      "Od istog materijala pravimo posebnu montažu u 9:16. Nije horizontalni film isečen sa strane, nego drugi rez, sa kadrovima koji rade na telefonu.",
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
    eyebrow: "Fotografije",
    title: "Sa iste",
    accent: "večeri.",
    p:
      "Dok se snimao film, fotograf je radio pored. Ovo su obrađene fotografije, ne kadrovi iz snimka.",
    slike: fotografije.map((f, i) => ({ ...f, alt: altSr[i] })),
  },
  usluge: {
    eyebrow: "Šta snimamo",
    title: "Od kongresa do",
    accent: "punoletstva.",
    p: "Isti način rada za firmu i za porodicu: dođemo na vreme, ne smetamo programu i znamo šta ne sme da se propusti.",
    items: [
      {
        h: "Gala večeri i firmine proslave",
        p: "Svečane večere, godišnjice firme, novogodišnje proslave. Govori, nagrade, bend i ples.",
      },
      {
        h: "Kongresi i konferencije",
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
        h: "Sajmovi i lansiranja",
        p: "Štand, proizvod, posetioci. Snimali smo i na Beogradskom sajmu.",
      },
    ],
  },
  dobijate: {
    eyebrow: "Šta dobijate",
    title: "I film i",
    accent: "fotografije.",
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
  kraj: {
    eyebrow: "Provera termina",
    title: "Recite datum i mesto, pa",
    accent: "dalje.",
    p: "Prvo proveravamo da li je vaš datum slobodan, pa onda pričamo o svemu ostalom. Odgovor stiže istog dana.",
  },
  uslugeIzbor: [
    "Gala veče ili firmina proslava",
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
    title: "Event and party filming and photography | Popzify",
    description:
      "Gala dinners, congresses, company parties, birthdays and christenings. One team shoots both video and stills, and the aftermovie comes in 16:9 and in 9:16 for social. Belgrade, Novi Sad and all of Serbia.",
  },
  hero: {
    eyebrow: "Belgrade · Novi Sad · all of Serbia",
    title: "The event lasts one night. The film",
    accent: "stays.",
    sub:
      "We film and photograph gala dinners, congresses, company parties, birthdays, coming-of-age parties and christenings. The same team does both video and stills. You get a film for the big screen, a separate cut for Instagram and photos from the whole night.",
    cta: "Check if we are free",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Video and stills", "16:9 and 9:16", "Registered company"],
    poster: "/dogadjaji/uvod.webp",
  },
  film: {
    eyebrow: "ESVS Belgrade 2026 · Nacionalna klasa",
    title: "A gala night,",
    accent: "in a minute.",
    p: "The gala evening of the ESVS congress in Belgrade: dinner, a live band, dancing to the end. Play it with sound.",
    src: "/dogadjaji/film.mp4",
    poster: "/dogadjaji/poster.webp",
    dugme: "Play the film · with sound",
  },
  uspravno: {
    eyebrow: "Same night, for the phone",
    title: "And vertical, for",
    accent: "social.",
    p:
      "From the same footage we make a separate 9:16 edit. Not the horizontal film cropped at the sides, but a different cut, with shots that work on a phone.",
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
    eyebrow: "Photos",
    title: "From the same",
    accent: "night.",
    p:
      "While the film was being shot, the photographer worked alongside. These are edited photographs, not frames from the footage.",
    slike: fotografije.map((f, i) => ({ ...f, alt: altEn[i] })),
  },
  usluge: {
    eyebrow: "What we shoot",
    title: "From congresses to",
    accent: "birthdays.",
    p: "The same way of working for a company and for a family: we arrive on time, stay out of the programme's way and know what cannot be missed.",
    items: [
      {
        h: "Gala dinners and company parties",
        p: "Formal dinners, company anniversaries, New Year parties. Speeches, awards, the band and the dancing.",
      },
      {
        h: "Congresses and conferences",
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
        h: "Fairs and launches",
        p: "The stand, the product, the visitors. We have shot at the Belgrade Fair too.",
      },
    ],
  },
  dobijate: {
    eyebrow: "What you get",
    title: "Both the film and the",
    accent: "photos.",
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
  kraj: {
    eyebrow: "Checking the date",
    title: "Tell us the date and the venue, then the",
    accent: "rest.",
    p: "First we check whether your date is free, then we talk about everything else. You hear back the same day.",
  },
  uslugeIzbor: [
    "Gala dinner or company party",
    "Congress or conference",
    "Birthday or 18th",
    "Christening or family celebration",
    "Prom or party",
    "Fair or launch",
    "Something else",
  ],
  forma: "datum",
  whatsapp: "Hi, I am writing from your website. I would like an event filmed. Date and venue: ",
};

export const dogadjaji = { sr, en };
