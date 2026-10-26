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

/**
 * Isti proizvod na sirokom ekranu.
 *
 * Oglas trazi „consistent experience across desktop and mobile", a bez
 * ovoga je studija bila samo telefon. Nije rastegnut telefon: isti
 * delovi su preslozeni za prostor koji postoji, i to je ono sto se
 * ovde i pokazuje.
 */
export const desktop = {
  naslov: "The same system, with room",
  uvod:
    "The product also runs on the web at correctscore.pro. The desktop build is not the phone stretched: the same " +
    "parts are re-laid for the space there is. The date strip grows from six days to a fortnight, the match stack " +
    "becomes a three-column grid, and a top bar carries the navigation the tab bar carries on the phone. What stays " +
    "identical is the card, the status pill, the accent rules and the reading order inside every card.",
  ekrani: [
    {
      id: "nadzorna",
      file: "/design/web/nadzorna.webp",
      naslov: "Dashboard",
      opis:
        "The same hierarchy as the phone home screen — proof tiles, date strip, filters, then the feed. With the " +
        "width available the feed becomes a three-column grid and the strip shows a fortnight instead of a week, so " +
        "a desktop user plans further ahead without reaching for a second control.",
    },
    {
      id: "analiza",
      file: "/design/web/analiza.webp",
      naslov: "Analysis",
      opis:
        "An editorial layer that only exists where there is room to read it. Match of the day takes a wide card with " +
        "its own image area; the rest of the day's analyses sit underneath and filter by league.",
    },
    {
      id: "mec",
      file: "/design/web/mec.webp",
      naslov: "Match page",
      opis:
        "The depth the phone card links out to: form over the last seven, head-to-head, venue and the players who " +
        "are unavailable. On the phone this is a destination; here it is the page itself.",
    },
    {
      id: "podaci",
      file: "/design/web/podaci.webp",
      naslov: "Predictions and tables",
      opis:
        "Where the width earns itself. Four prediction tiles each with its vote split, then standings and an " +
        "expected-goals table side by side — a comparison the phone would have to turn into a scroll nobody finishes.",
    },
  ],
};

/**
 * Dizajn sistem aplikacije.
 *
 * Vrednosti su prepisane iz `constants/theme.ts` u kodu aplikacije, koji
 * je izvor istine. Komentari uz tokene su takodje odande — oni su ono
 * sto oglas za UI/UX zove „razmisljanje", pa stoje kao obrazlozenja, a
 * ne kao ukras.
 */
export const sistemTokena = {
  naslov: "The system underneath",
  uvod:
    "The app is not styled screen by screen. Colour, type, spacing and radius live in one token file that the " +
    "whole product reads from, and the rules for using them are written next to the values. Below is that file, " +
    "rendered — the same values now also exist as a Figma library so a team can work from them.",
  figma: "Open the Figma library",
  figmaUrl: "https://figma.com/design/3Ugd6UDPmrY0wjkYlBb3HG",
  grupe: [
    {
      id: "dubina",
      naslov: "Elevation ladder",
      opis:
        "Each step up is lighter and reads as closer to the viewer. Never skip a step for emphasis — the ladder is " +
        "what tells the eye how the screen is layered. The neutrals carry a blue cast rather than being pure grey: " +
        "pure grey on OLED reads flat, and the cool cast makes the orange feel warmer by contrast.",
      boje: [
        ["surface/base", "#0A0B0F", "app floor"],
        ["surface/raised", "#14161F", "cards, rows"],
        ["surface/elevated", "#1E212D", "cards on cards"],
        ["surface/overlay", "#272B3A", "sheets, menus"],
      ],
    },
    {
      id: "kontrast",
      naslov: "Text contrast ladder",
      opis:
        "primary and secondary both clear WCAG AA on surface/raised. tertiary is AA for large text only. " +
        "quaternary is decorative — placeholders and disabled states, never information the user actually needs.",
      boje: [
        ["text/primary", "#FFFFFF", "AA"],
        ["text/secondary", "#A8AEBF", "AA"],
        ["text/tertiary", "#767D91", "AA, large only"],
        ["text/quaternary", "#4E5566", "decorative"],
      ],
    },
    {
      id: "brend",
      naslov: "Brand ramp",
      opis:
        "500 is the brand. The ramp exists so hover, pressed and disabled states are picked from a related family " +
        "rather than eyeballed per component. Orange is the only saturated colour on most screens.",
      boje: [
        ["brand/300", "#FF8F65", ""],
        ["brand/400", "#FF6E3D", ""],
        ["brand/500", "#FF5722", "brand"],
        ["brand/600", "#F04A18", "pressed"],
        ["brand/700", "#D13C10", ""],
      ],
    },
    {
      id: "stanja",
      naslov: "Status and market",
      opis:
        "Live deliberately differs from the danger red even though both are red: one is a status, the other an " +
        "alert, and reusing a single red trains users to ignore the alert. Home, draw and away have fixed colours " +
        "so the 1/X/2 columns read the same on every screen.",
      boje: [
        ["status/won", "#3DDC84", ""],
        ["status/pending", "#FFB020", ""],
        ["status/lost", "#FF5A5A", ""],
        ["status/live", "#FF3B3B", "status, not alert"],
        ["market/home", "#4D9FFF", ""],
        ["market/draw", "#A8AEBF", ""],
        ["market/away", "#C77DFF", ""],
      ],
    },
  ],
  skalaNaslov: "Type scale",
  skalaOpis:
    "Sora carries headings and figures; Inter is the workhorse, drawn for screen UI at small sizes. The number " +
    "styles use tabular figures so odds and scores stay aligned in a column and do not jitter when they tick live.",
  skala: [
    ["Display", "32 / 38", "Sora ExtraBold"],
    ["Heading / H1", "26 / 32", "Sora Bold"],
    ["Heading / H2", "21 / 27", "Sora Bold"],
    ["Heading / H3", "17 / 23", "Sora SemiBold"],
    ["Body / Large", "16 / 24", "Inter Regular"],
    ["Body / Base", "14 / 21", "Inter Regular"],
    ["Caption", "12 / 17", "Inter Medium"],
    ["Overline", "11 / 14", "Inter Bold, uppercase"],
    ["Number / Large", "24 / 29", "Inter ExtraBold, tabular"],
    ["Number / Base", "16 / 21", "Inter Bold, tabular"],
  ],
  mreza: "Spacing runs on a 4pt grid — every margin, padding and gap is one of ten steps. Radii are a fixed set, and the card radius is constant across every card in the app, which is a large part of why the UI reads as one system.",
};
