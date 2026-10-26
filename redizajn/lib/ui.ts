/**
 * Studija slucaja za aplikaciju Correct Score Pro.
 *
 * Stoji odvojeno od `lib/design.ts` jer sluzi drugoj svrsi: oglasi za
 * UI/UX traze dokaz o razmisljanju — tok, sistem komponenti, stanja,
 * ogranicenja — a ne niz lepih kadrova. Zato je i raspored drugaciji:
 * svaki ekran ima svoj tekst pored sebe.
 *
 * Opisi govore o odlukama koje se u samim ekranima vide. Nigde ne stoji
 * da je radjeno testiranje sa korisnicima ni brojevi o ucinku dizajna —
 * to se ne zna. Brojevi na ekranima su podaci koje proizvod prikazuje.
 */

export type Ekran = {
  id: string;
  file: string;
  naslov: string;
  opis: string;
  oznake: string[];
};

export const meta = {
  eyebrow: "UI/UX · Product design",
  naslov: "Correct Score Pro —",
  naglasak: "the app.",
  uvod:
    "A football predictions app for iOS and Android: AI predictions, live scores and a monthly prediction league. " +
    "Five tabs, one component kit, designed to be read in a second on a phone held in one hand.",
  cinjenice: [
    ["Role", "Product design — UX and UI"],
    ["Platform", "iOS and Android"],
    ["Status", "In review on the App Store and Google Play"],
    ["Also", "Web platform live in four languages"],
  ],
  kontekstN: "Context",
  kontekst:
    "Correct Score Pro began as a web platform and a Telegram community of over 7,000 members, publishing " +
    "predictions and odds every day. The app had to carry that daily habit onto a phone: open it, see what is " +
    "on today, read one prediction, make a pick. It is used in the evening, mostly one-handed, often in a dark " +
    "room with a bright screen — so the interface is dark by default, and the one saturated colour in it is " +
    "reserved for what the user is meant to touch.",
};

export const ekrani: Ekran[] = [
  {
    id: "pocetna",
    file: "/design/app/pocetna.webp",
    naslov: "Home — answering one question",
    opis:
      "Everything above the fold answers “what is worth looking at today”. The hero carries the date and what the " +
      "day holds; the three tiles are product proof rather than decoration. Directly under them the date strip and " +
      "the filter chips let the user re-scope the feed without leaving the screen, and a live ticker runs between " +
      "the filters and the list so the page keeps moving while it is being read.",
    oznake: ["Information hierarchy", "Filtering", "Live data"],
  },
  {
    id: "mecevi",
    file: "/design/app/mecevi.webp",
    naslov: "The feed — grouped by competition",
    opis:
      "Matches group by competition, each group collapsible with a count and a favourite star, so a user who " +
      "follows two leagues experiences a two-league app. Every card carries the same furniture in the same order: " +
      "status pill, kick-off, venue, the 1/X/2 row, one primary action. Nothing on the card competes with that action.",
    oznake: ["Progressive disclosure", "Card pattern", "One primary action"],
  },
  {
    id: "liga",
    file: "/design/app/liga.webp",
    naslov: "League — the gamified layer",
    opis:
      "A monthly competition with points, a leaderboard and prizes, carrying the sponsor inside the card rather " +
      "than stuck on top of it. The pick control is a stepper on each side instead of a text field: two taps set a " +
      "scoreline, there is nothing to type and nothing to validate. The lock countdown sits in the same card as the " +
      "decision, and the saved pick stays visible next to the button that changes it.",
    oznake: ["Gamification", "Custom input", "Deadline state", "Sponsor integration"],
  },
  {
    id: "favoriti",
    file: "/design/app/favoriti.webp",
    naslov: "Favourites — the same control, a different state",
    opis:
      "Three segments with live counts. The outcome row is the same 1/X/2 triple used for odds in the feed, here in " +
      "its result state: the winning outcome outlined in green, the other two stepped back. Reusing the control " +
      "instead of drawing a result table means a user already knows how to read it the first time they see it.",
    oznake: ["Component reuse", "States", "Segmented navigation"],
  },
  {
    id: "podesavanja",
    file: "/design/app/podesavanja.webp",
    naslov: "Settings — two row types, nothing more",
    opis:
      "Grouped rows on the same card and divider used across the app. There are only two row types in the whole " +
      "screen — a toggle and a disclosure — so every future setting has an obvious home and the screen cannot drift. " +
      "Section labels sit outside the card, which keeps the groups readable without adding a single line.",
    oznake: ["Design system", "Scalability", "Grouping"],
  },
];

export const sistem = {
  naslov: "One kit across five tabs",
  uvod:
    "The app is built from a small set of parts rather than five designed screens. What repeats is a card, a " +
    "section header, a status pill, a row with a trailing control, a 1/X/2 triple and a fixed tab bar.",
  stavke: [
    [
      "The 1/X/2 triple",
      "Odds in the feed, a result on favourites, a pick in the league. Only the state changes — the geometry, the " +
        "spacing and the reading order stay put.",
    ],
    [
      "The match card",
      "The same order everywhere: competition, status, teams, time and place, the triple, the action. A new context " +
        "fills the same slots instead of inventing a layout.",
    ],
    [
      "The tab bar",
      "Fixed and translucent, so content keeps running underneath and the user never loses the sense that the list " +
        "continues below.",
    ],
    [
      "One accent colour",
      "Orange is reserved for what can be touched or what is currently selected. Green is reserved for live and for " +
        "a won outcome. Nothing decorative uses either.",
    ],
  ],
};

export const ogranicenja = {
  naslov: "Constraints the design had to carry",
  stavke: [
    [
      "Compliance in the layout",
      "The league is adjacent to real-money betting, so “free to play · no purchase · no stake” sits on the card " +
        "itself, with the rules one tap away from the same place — not in a footer nobody opens.",
    ],
    [
      "Live data, so every state exists",
      "Upcoming, live, finished and locked are visible states on the same card. The design had to work when the " +
        "data is still coming, not only when the screenshot is pretty.",
    ],
    [
      "A sponsor that has to fit",
      "The sponsor has a defined place inside the league card. It is part of the composition, which means it can be " +
        "changed or removed without the card falling apart.",
    ],
  ],
};
