/**
 * Dvojezicni sajt: srpski je primarni, engleski drugi.
 * Tekst stoji ovde da se sekcije ne pune stringovima po komponentama.
 */

export const locales = ["sr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Oznaka za <html lang> i za hreflang. */
export const htmlLang: Record<Locale, string> = {
  sr: "sr-Latn-RS",
  en: "en",
};

type Dict = {
  meta: { title: string; description: string };
  hero: {
    headlineBefore: string;
    headlineAccent: string;
    headlineAfter: string;
    sub: string;
    hint: string;
  };
  hud: { rec: string; format: string; lens: string; geo: string };
};

export const dict: Record<Locale, Dict> = {
  sr: {
    meta: {
      title: "Popzify — video produkcija iz Beograda",
      description:
        "Video produkcija, snimanje dronom, montaža i sadržaj za društvene mreže. Beograd, radimo za ceo region.",
    },
    hero: {
      // Outline akcenat ide na jednu nosecu rec, ne na pomocne.
      headlineBefore: "Snimamo brendove koji se",
      headlineAccent: "pamte.",
      headlineAfter: "",
      sub: "Video produkcija, snimanje dronom, montaža i social dizajn iz Beograda.",
      hint: "Pomeri miša i vodi kadar",
    },
    hud: {
      rec: "REC",
      format: "4K · 24 FPS · 180°",
      lens: "ISO 800 · ƒ/2.8",
      geo: "44.8436° N · 20.4123° E",
    },
  },
  en: {
    meta: {
      title: "Popzify — video production from Belgrade",
      description:
        "Video production, drone cinematography, editing and social design. Based in Belgrade, working across the region.",
    },
    hero: {
      headlineBefore: "We make brands",
      headlineAccent: "pop",
      headlineAfter: "on screen.",
      sub: "Video production, drone cinematography, editing and social design from Belgrade.",
      hint: "Move to direct the shot",
    },
    hud: {
      rec: "REC",
      format: "4K · 24 FPS · 180°",
      lens: "ISO 800 · ƒ/2.8",
      geo: "44.8436° N · 20.4123° E",
    },
  },
};
