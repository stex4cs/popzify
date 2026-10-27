/**
 * Podaci za HUD prototip crtan PixiJS-om.
 *
 * Tokeni su isti brojevi kao u `constants/theme.ts` aplikacije Correct
 * Score Pro, samo kao heksadecimalni brojevi jer Pixi ne barata CSS
 * nizovima. To je i poenta prototipa: sistem ne zavisi od toga cime se
 * crta — isti tokeni daju isti izgled u DOM-u i na platnu.
 *
 * Igra je izmisljena, ali pravila su stvarna: isplate, verovatnoce i
 * provera stanja racuna rade kako pise. Nista se ne pretvara.
 */

export const T = {
  base: 0x0a0b0f,
  raised: 0x14161f,
  elevated: 0x1e212d,
  overlay: 0x272b3a,

  textPrimary: 0xffffff,
  textSecondary: 0xa8aebf,
  textTertiary: 0x767d91,
  textQuaternary: 0x4e5566,

  brand: 0xff5722,
  brandPressed: 0xf04a18,
  brandTint: 0x462b2b,

  won: 0x3ddc84,
  pending: 0xffb020,
  lost: 0xff5a5a,
  live: 0xff3b3b,
  info: 0x4d9fff,
  purple: 0xc77dff,

  hairline: 0xffffff,
} as const;

export const ALPHA = { hairline: 0.08, subtle: 0.05, strong: 0.16, glass: 0.06 } as const;

export const RADIUS = { sm: 6, md: 10, lg: 14, card: 18, xl: 24, pill: 999 } as const;
export const SPACE = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32 } as const;

/** Simbol na dobošu. `tezina` je relativna ucestalost pri izvlacenju. */
export type Simbol = {
  id: string;
  znak: string;
  boja: number;
  tezina: number;
  /** Isplata za 3, 4 i 5 istih na liniji, kao mnozilac uloga. */
  isplata: [number, number, number];
};

export const SIMBOLI: Simbol[] = [
  { id: "sedam", znak: "7", boja: T.brand, tezina: 3, isplata: [10, 40, 200] },
  { id: "zvezda", znak: "★", boja: T.pending, tezina: 5, isplata: [6, 20, 80] },
  { id: "dijamant", znak: "◆", boja: T.info, tezina: 7, isplata: [4, 12, 50] },
  { id: "pik", znak: "♠", boja: T.purple, tezina: 10, isplata: [2, 6, 25] },
  { id: "srce", znak: "♥", boja: T.lost, tezina: 12, isplata: [1.5, 5, 20] },
  { id: "detelina", znak: "♣", boja: T.won, tezina: 14, isplata: [1, 4, 15] },
  { id: "karo", znak: "♦", boja: T.textSecondary, tezina: 16, isplata: [0.8, 3, 10] },
];

/** Pet linija isplate preko mreze 5x3; svaka je red po dobosu. */
export const LINIJE: number[][] = [
  [1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2],
  [0, 1, 2, 1, 0],
  [2, 1, 0, 1, 2],
];

export const ULOZI = [0.2, 0.5, 1, 2, 5, 10, 20, 50, 100];

export const POCETNO_STANJE = 500;

export const REDOVI = 3;
export const DOBOSI = 5;

/** Ukupna tezina, racunata jednom; izvlacenje je obicno kumulativno. */
const UKUPNO = SIMBOLI.reduce((z, s) => z + s.tezina, 0);

export function izvuci(): Simbol {
  let r = Math.random() * UKUPNO;
  for (const s of SIMBOLI) {
    r -= s.tezina;
    if (r <= 0) return s;
  }
  return SIMBOLI[SIMBOLI.length - 1];
}

export type Pogodak = { linija: number; simbol: Simbol; duzina: number; dobitak: number };

/**
 * Trazi pogotke s leva na desno: linija placa ako prva tri, cetiri ili pet
 * polja nose isti simbol. Tako rade prave masine, pa i provera izgleda isto.
 */
export function proveri(mreza: Simbol[][], ulog: number): Pogodak[] {
  const nadjeni: Pogodak[] = [];
  LINIJE.forEach((linija, i) => {
    const prvi = mreza[0][linija[0]];
    let duzina = 1;
    for (let d = 1; d < DOBOSI; d++) {
      if (mreza[d][linija[d]].id === prvi.id) duzina++;
      else break;
    }
    if (duzina >= 3) {
      const mnozilac = prvi.isplata[duzina - 3];
      nadjeni.push({ linija: i, simbol: prvi, duzina, dobitak: +(ulog * mnozilac).toFixed(2) });
    }
  });
  return nadjeni;
}

export const novac = (n: number) =>
  "€" + n.toLocaleString("en-GB", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
