import type { Kampanja } from "./kampanje";

/**
 * Svadbe.
 *
 * Obraca se paru u mnozini, kao i stara strana: nije ista publika kao
 * kod reelova i ne zvuci dobro na "ti". Tezina strane je film u 16:9,
 * a ne traka vertikala.
 */

const sr: Kampanja = {
  slug: "svadbe",
  meta: {
    title: "Snimanje i fotografisanje venčanja | Popzify",
    description:
      "Isti tim radi i video i fotografiju, pa ne morate da usklađujete dve ekipe. Nekoliko kadrova dobijate isto veče, film i fotografije u roku iz ugovora. Beograd i cela Srbija.",
  },
  hero: {
    eyebrow: "Beograd · cela Srbija",
    title: "Vaš dan, onako kako je",
    accent: "bio.",
    sub:
      "Snimamo i fotografišemo venčanja. Isti tim radi oboje, pa ne morate da usklađujete dve ekipe koje se ne poznaju. Nekoliko kadrova dobijate isto veče, film i fotografije u roku koji piše u ugovoru.",
    cta: "Proverite da li smo slobodni",
    ctaDrugi: "060 5973212",
    oznake: ["Video i fotografija", "Dron", "Registrovana firma"],
    poster: "/svadbe/poster.webp",
  },
  film: {
    eyebrow: "Film",
    title: "Ovako to",
    accent: "izgleda.",
    p: "Snimak sa jednog venčanja. Pustite sa zvukom, muzika je pola utiska.",
    src: "/svadbe/film.mp4",
    poster: "/svadbe/poster.webp",
    dugme: "Pustite film · sa zvukom",
  },
  dobijate: {
    eyebrow: "Šta dobijate",
    title: "I film i",
    accent: "fotografije.",
    p:
      "Većina parova uzme oboje. Ispadne jeftinije nego dva odvojena angažmana, a na sam dan se snimatelj i fotograf ne sudaraju oko istog kadra.",
    kolone: [
      {
        h: "Video",
        p: "Kratki film sa celog dana, spreman za deljenje.",
        list: [
          "Duža verzija sa ceremonijom i govorima",
          "Vertikalni isečak za Instagram i TikTok",
          "Snimci iz vazduha dronom, ako lokacija dozvoljava",
          "Dve kamere na ceremoniji i prvom plesu",
          "Čist ton govora, ne muzika preko svega",
        ],
      },
      {
        h: "Fotografija",
        p: "Obrađene fotografije sa celog dana.",
        list: [
          "Priprema, ceremonija, portreti, slavlje",
          "Galerija na linku koji šaljete gostima",
          "Nekoliko kadrova isti dan, za objavu",
          "Fajlovi u punoj rezoluciji, bez vodenog žiga",
          "Priprema za album ako ga radite",
        ],
      },
    ],
  },
  galerija: {
    eyebrow: "Iz filma",
    title: "Zaustavljeni",
    accent: "kadrovi.",
    p:
      "Nisu fotografije nego frejmovi iz snimka iznad, ali se po njima vidi kako radimo svetlo i kompoziciju.",
    slike: [
      "/svadbe/s1.webp",
      "/svadbe/s2.webp",
      "/svadbe/s3.webp",
      "/svadbe/s4.webp",
      "/svadbe/s5.webp",
      "/svadbe/s6.webp",
    ],
  },
  koraci: {
    eyebrow: "Kako ide",
    title: "Od poziva do",
    accent: "isporuke.",
    p: "Tri koraka, i nijedan vas ne prekida na sam dan.",
    steps: [
      {
        h: "Provera termina",
        p: "Javite datum i mesto. Isti dan kažemo da li smo slobodni i koliko košta. Cena je jedna i piše šta ulazi u nju.",
      },
      {
        h: "Dogovor pre dana",
        p: "Prođemo raspored i lokacije. Pitamo ko su vam ključni ljudi da ih ne promašimo. Na dan venčanja već znamo gde treba da stojimo.",
      },
      {
        h: "Snimanje i isporuka",
        p: "Ne režiramo vam dan i ne prekidamo ga zbog kadra. Par kadrova dobijate isto veče, ostalo u roku iz ugovora.",
      },
    ],
  },
  paketi: {
    eyebrow: "Paketi",
    title: "Izaberite",
    accent: "obim.",
    p: "Cena zavisi od datuma, lokacije i koliko dugo ostajemo. Javite termin, cifru dobijate istog dana.",
    items: [
      {
        h: "Film",
        p: "Samo video.",
        list: [
          "Kratki film sa celog dana",
          "Duža verzija ceremonije",
          "Vertikalni isečak za mreže",
          "Dron ako lokacija dozvoljava",
          "Dve kamere na ceremoniji",
        ],
      },
      {
        h: "Film i foto",
        p: "Video i fotografija, jedna ekipa.",
        list: [
          "Sve iz paketa Film",
          "Obrađene fotografije sa celog dana",
          "Galerija na linku za goste",
          "Nekoliko kadrova isti dan",
          "Fajlovi u punoj rezoluciji",
          "Jedan dogovor umesto dva",
        ],
      },
      {
        h: "Ceo dan",
        p: "Od priprema do kraja slavlja.",
        list: [
          "Sve iz paketa Film i foto",
          "Pokrivene pripreme kod oboje",
          "Ostajemo do kraja slavlja",
          "Zasebno snimanje portreta",
          "Veći tim na terenu",
          "Priprema za album",
        ],
      },
    ],
    note:
      "U svakom paketu: ugovor i račun · snimljeni materijal ostaje vaš · rezervacija termina uz kaparu.",
  },
  kraj: {
    eyebrow: "Provera termina",
    title: "Recite datum i mesto, pa",
    accent: "dalje.",
    p:
      "Subote u sezoni odu prve. Zato prvo proveravamo da li je vaš datum slobodan, pa onda pričamo o svemu ostalom.",
  },
};

const en: Kampanja = {
  slug: "svadbe",
  meta: {
    title: "Wedding films and photography | Popzify",
    description:
      "One team shoots both video and stills, so you never have to coordinate two crews. A few frames the same evening, the film and photos within the deadline in the contract. Belgrade and all of Serbia.",
  },
  hero: {
    eyebrow: "Belgrade · all of Serbia",
    title: "Your day, the way it",
    accent: "was.",
    sub:
      "We film and photograph weddings. The same team does both, so you never have to coordinate two crews who have never met. You get a few frames the same evening, the film and the photos within the deadline written into the contract.",
    cta: "Check if we are free",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Video and stills", "Drone", "Registered company"],
    poster: "/svadbe/poster.webp",
  },
  film: {
    eyebrow: "The film",
    title: "This is what it",
    accent: "looks like.",
    p: "A film from one wedding. Play it with sound — the music is half of it.",
    src: "/svadbe/film.mp4",
    poster: "/svadbe/poster.webp",
    dugme: "Play the film · with sound",
  },
  dobijate: {
    eyebrow: "What you get",
    title: "Both the film and the",
    accent: "photos.",
    p:
      "Most couples take both. It works out cheaper than two separate bookings, and on the day the videographer and the photographer are not fighting over the same frame.",
    kolone: [
      {
        h: "Video",
        p: "A short film of the whole day, ready to share.",
        list: [
          "A longer cut with the ceremony and the speeches",
          "A vertical cut for Instagram and TikTok",
          "Aerial footage, where the location allows it",
          "Two cameras on the ceremony and the first dance",
          "Clean speech audio, not music over everything",
        ],
      },
      {
        h: "Photography",
        p: "Edited photographs from the whole day.",
        list: [
          "Preparations, ceremony, portraits, the party",
          "A gallery on a link you send to guests",
          "A few frames the same day, ready to post",
          "Full-resolution files, no watermark",
          "Album prep if you are making one",
        ],
      },
    ],
  },
  galerija: {
    eyebrow: "From the film",
    title: "Frozen",
    accent: "frames.",
    p:
      "These are not photographs but frames from the film above — they still show how we handle light and composition.",
    slike: [
      "/svadbe/s1.webp",
      "/svadbe/s2.webp",
      "/svadbe/s3.webp",
      "/svadbe/s4.webp",
      "/svadbe/s5.webp",
      "/svadbe/s6.webp",
    ],
  },
  koraci: {
    eyebrow: "How it goes",
    title: "From the call to",
    accent: "delivery.",
    p: "Three steps, and none of them interrupts the day itself.",
    steps: [
      {
        h: "Checking the date",
        p: "Send us the date and the venue. The same day we tell you whether we are free and what it costs. One price, and it says what is included.",
      },
      {
        h: "The talk before",
        p: "We go through the schedule and the locations, and ask who the key people are so we do not miss them. On the day we already know where to stand.",
      },
      {
        h: "Shooting and delivery",
        p: "We do not direct your day and we do not stop it for a shot. A few frames arrive the same evening, the rest within the deadline in the contract.",
      },
    ],
  },
  paketi: {
    eyebrow: "Packages",
    title: "Choose the",
    accent: "scope.",
    p: "The price depends on the date, the location and how long we stay. Send us the date and you have a figure the same day.",
    items: [
      {
        h: "Film",
        p: "Video only.",
        list: [
          "A short film of the whole day",
          "A longer cut of the ceremony",
          "A vertical cut for social",
          "Drone where the location allows",
          "Two cameras on the ceremony",
        ],
      },
      {
        h: "Film and photos",
        p: "Video and stills, one team.",
        list: [
          "Everything in Film",
          "Edited photographs from the whole day",
          "A gallery on a link for guests",
          "A few frames the same day",
          "Full-resolution files",
          "One booking instead of two",
        ],
      },
      {
        h: "The whole day",
        p: "From the preparations to the end of the party.",
        list: [
          "Everything in Film and photos",
          "Preparations covered at both homes",
          "We stay to the end of the party",
          "A separate portrait session",
          "A larger crew on location",
          "Album prep",
        ],
      },
    ],
    note:
      "In every package: contract and invoice · the footage stays yours · the date is held with a deposit.",
  },
  kraj: {
    eyebrow: "Checking the date",
    title: "Tell us the date and the venue, then the",
    accent: "rest.",
    p: "Saturdays in season go first. So we check whether your date is free before talking about anything else.",
  },
};

export const svadbe = { sr, en };
