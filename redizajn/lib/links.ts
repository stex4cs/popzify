/**
 * Sadrzaj strane /links.
 *
 * Ovo je strana koja se salje, ne strana po kojoj se luta: jedna adresa
 * umesto pet linkova u poruci. Zato je slozena po tome sta onaj ko je
 * otvori trazi — dizajn, rad u kodu, isporuceni sajtovi — a ne po tome
 * kako je sajt interno podeljen.
 *
 * Svaki link nosi recenicu sta je. Gola lista linkova je gora od pet
 * poslatih rucno, jer onda opet neko mora da objasni sta je sta.
 */

export type Veza = {
  naslov: string;
  opis: string;
  url: string;
  oznaka: string;
  /** Slika iz /public/radovi-sajt; samo isporuceni sajtovi je imaju. */
  slika?: string;
  spolja?: boolean;
};

export type Grupa = {
  id: string;
  naslov: string;
  uvod: string;
  veze: Veza[];
};

export const meta = {
  eyebrow: "Everything in one place",
  naslov: "Stefan Popović —",
  naglasak: "the short version.",
  uvod:
    "Creative designer and front-end developer in Belgrade. Advertising creative for betting and casino, " +
    "product design for an app in review on both stores, and sites that are live and taking traffic. " +
    "Each link below says what it is, so you can open only what you came for.",
  rola: "Creative Designer & Social Media Manager · iGaming, Sports Betting & Sports Media",
};

export const grupe: Grupa[] = [
  {
    id: "dizajn",
    naslov: "Design",
    uvod: "Campaign creative, promo banners and daily graphics for betting operators and sports channels.",
    veze: [
      {
        naslov: "Graphic design portfolio",
        opis:
          "Campaign concepts, on-site promo banners, bonus-code creative and broadcast thumbnails — " +
          "built as systems and themed per brand.",
        url: "/design",
        oznaka: "popzify.com/design",
      },
      {
        naslov: "То же, на русском",
        opis: "The same portfolio in Russian, for operators and teams who work in it.",
        url: "/design/ru",
        oznaka: "popzify.com/design/ru",
      },
    ],
  },
  {
    id: "proizvod",
    naslov: "Product and interface",
    uvod: "How the work is thought through, not only how it looks when it is finished.",
    veze: [
      {
        naslov: "Correct Score Pro — UI/UX case study",
        opis:
          "A football predictions app for iOS and Android: five tabs, one component kit, a design token " +
          "system and the flow from opening the app to a locked pick.",
        url: "/ui",
        oznaka: "popzify.com/ui",
      },
      {
        naslov: "Interactive prototypes — PixiJS",
        opis:
          "Two playable things: a casino HUD drawn from the product's own design tokens, and a complete " +
          "five-reel slot with paylines, wilds, free spins and a jackpot. Both run in the browser.",
        url: "/ui/hud",
        oznaka: "popzify.com/ui/hud",
      },
    ],
  },
  {
    id: "sajtovi",
    naslov: "Shipped and live",
    uvod: "Designed and built end to end. Not mockups — open them.",
    veze: [
      {
        naslov: "Correct Score Pro",
        opis: "AI football predictions platform. A page per match, four prediction models, calculators and VIP, in four languages.",
        url: "https://correctscore.pro",
        oznaka: "correctscore.pro",
        slika: "/radovi-sajt/correctscore.webp",
        spolja: true,
      },
      {
        naslov: "DUKAT Private Desk",
        opis: "OTC desk for USDT, EUR and USD. Rates in the hero, the process in four steps, four languages.",
        url: "https://dukatdesk.com",
        oznaka: "dukatdesk.com",
        slika: "/radovi-sajt/dukatdesk.webp",
        spolja: true,
      },
      {
        naslov: "BIF — Balkan Influence Fighting",
        opis: "Influencer boxing event. Tickets in the hero, fighter roster, news and results, stream and merch.",
        url: "https://bif.events",
        oznaka: "bif.events",
        slika: "/radovi-sajt/bif.webp",
        spolja: true,
      },
      {
        naslov: "RAA Team",
        opis: "Hostess, promoter and modeling agency. Ten service categories, set portfolios and a candidate form.",
        url: "https://raateam.vercel.app/en",
        oznaka: "raateam.vercel.app",
        slika: "/radovi-sajt/raateam.webp",
        spolja: true,
      },
      {
        naslov: "GLITCH",
        opis: "Video production and web agency. Four services, a three-step process and contact on one page.",
        url: "https://theglitch.rs",
        oznaka: "theglitch.rs",
        slika: "/radovi-sajt/glitch.webp",
        spolja: true,
      },
    ],
  },
  {
    id: "studio",
    naslov: "The studio",
    uvod: "Popzify is video production and web, run from Belgrade. The design work above is my side of it.",
    veze: [
      {
        naslov: "popzify.com",
        opis: "Studio site — video production, reels, weddings and web. A scroll-driven WebGL scene over real Belgrade geometry, designed and coded by me.",
        url: "/en",
        oznaka: "popzify.com/en",
      },
      {
        naslov: "Na srpskom",
        opis: "Isti sajt, srpska verzija.",
        url: "/sr",
        oznaka: "popzify.com/sr",
      },
    ],
  },
];

export const kontakt = {
  naslov: "Get in touch",
  uvod: "Fastest on WhatsApp or Telegram. Email for anything with files attached.",
};
