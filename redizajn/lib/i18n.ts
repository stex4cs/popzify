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
  klip: { pusti: string; pauza: string; zvuk: string };
  nav: { work: string; contact: string; skip: string; other: string; otherShort: string };
  form: {
    legend: string;
    name: string;
    phone: string;
    email: string;
    optional: string;
    service: string;
    servicePick: string;
    services: string[];
    message: string;
    consent: string;
    consentLink: string;
    consentAfter: string;
    submit: string;
    sending: string;
    ok: string;
    error: string;
    or: string;
    when: string;
    whenOptions: string[];
    pace: string;
    paceOptions: string[];
  };
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
    klip: { pusti: "Pusti", pauza: "Pauziraj", zvuk: "Zvuk" },
    nav: { work: "Radovi", contact: "Kontakt", skip: "Pređi na sadržaj", other: "English", otherShort: "EN" },
    form: {
      legend: "Upit",
      name: "Ime i prezime",
      phone: "Telefon",
      email: "E-mail",
      optional: "nije obavezno",
      service: "Šta snimamo",
      servicePick: "Izaberi",
      services: ["Svadba", "Događaj ili sajam", "Borilačka veče", "Sadržaj za mreže", "Nešto drugo"],
      message: "Par reči o poslu",
      consent: "Saglasan sam da Popzify obradi ove podatke radi odgovora na upit, u skladu sa ",
      consentLink: "politikom privatnosti",
      consentAfter: ".",
      submit: "Pošalji upit",
      sending: "Šaljem…",
      ok: "Hvala. Javljamo se u roku od 24 sata.",
      error: "Slanje nije uspelo. Pozovi nas na 060 5973212 i rešavamo odmah.",
      or: "ili direktno",
      when: "Kada ti treba",
      whenOptions: ["Za manje od dve nedelje", "Ovaj mesec", "Za jedan do tri meseca", "Još planiram"],
      pace: "Jednom ili redovno",
      paceOptions: ["Jednokratno", "Svakog meseca", "Više puta godišnje"],
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
    klip: { pusti: "Play", pauza: "Pause", zvuk: "Sound" },
    nav: { work: "Work", contact: "Contact", skip: "Skip to content", other: "Srpski", otherShort: "SR" },
    form: {
      legend: "Enquiry",
      name: "Full name",
      phone: "Phone",
      email: "Email",
      optional: "optional",
      service: "What we shoot",
      servicePick: "Pick one",
      services: ["Wedding", "Event or trade fair", "Fight night", "Social content", "Something else"],
      message: "A few words about the job",
      consent: "I agree that Popzify may process this data to answer my enquiry, as set out in the ",
      consentLink: "privacy policy",
      consentAfter: ".",
      submit: "Send enquiry",
      sending: "Sending…",
      ok: "Thanks. We come back within 24 hours.",
      error: "Sending failed. Call us on +381 60 5973212 and we sort it right away.",
      or: "or reach us directly",
      when: "When you need it",
      whenOptions: ["In under two weeks", "This month", "In one to three months", "Still planning"],
      pace: "Once or regularly",
      paceOptions: ["One-off", "Every month", "Several times a year"],
    },
  },
};
