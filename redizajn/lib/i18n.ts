/**
 * Trojezicni sajt: srpski je primarni, pa engleski i ruski.
 * Tekst stoji ovde da se sekcije ne pune stringovima po komponentama.
 *
 * Ruski nije masinski preveden nego pisan kao za ruskog citaoca: "вы"
 * svuda, i na stranama gde se srpski obraca sa "ti", jer se u ruskom
 * poslovnom tekstu tako pise. Ruska publika su uglavnom ljudi koji zive
 * u Beogradu i Novom Sadu.
 */

export const locales = ["sr", "en", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "sr";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Oznaka za <html lang> i za hreflang. */
export const htmlLang: Record<Locale, string> = {
  sr: "sr-Latn-RS",
  en: "en",
  ru: "ru",
};

/** Oznaka za og:locale. */
export const ogLocale: Record<Locale, string> = {
  sr: "sr_RS",
  en: "en_US",
  ru: "ru_RU",
};

/** Ime svakog jezika na tom jeziku, i kratka oznaka za uzak ekran. */
export const jezici: Record<Locale, { ime: string; kratko: string }> = {
  sr: { ime: "Srpski", kratko: "SR" },
  en: { ime: "English", kratko: "EN" },
  ru: { ime: "Русский", kratko: "RU" },
};

/** Ostali jezici, redom, za prekidac u zaglavlju. */
export function ostali(locale: Locale): Locale[] {
  return locales.filter((l) => l !== locale);
}

/**
 * Kanonska adresa i hreflang za stranu koja postoji na svim jezicima.
 * `putanja` je deo posle jezika, sa kosom crtom ("/svadbe") ili prazan
 * za pocetnu. Na jednom mestu, da nijedna strana ne zaboravi jedan
 * jezik ili x-default.
 */
export function verzije(locale: Locale, putanja = "") {
  return {
    canonical: `/${locale}${putanja}`,
    languages: {
      "sr-Latn-RS": `/sr${putanja}`,
      en: `/en${putanja}`,
      ru: `/ru${putanja}`,
      "x-default": `/sr${putanja}`,
    },
  };
}

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
  nav: { work: string; contact: string; skip: string; jezik: string };
  /** Sitni natpisi koji su ranije stajali kao sr/en grananje u komponentama. */
  ui: {
    glavnaNav: string;
    strane: string;
    privatnost: string;
    nazad: string;
    azurirano: string;
    doprinosioci: string;
    rad: string;
  };
  /**
   * Spisak za podnozje. Kampanjske strane inace ne vise ni na jednom
   * linku sa sajta: stoje u sitemapu, ali ih nista iznutra ne drzi, pa
   * ih pretrazivac obilazi retko. Odavde ih drze oba podnozja.
   */
  strane: { put: string; tekst: string }[];
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
    /** Za svadbe i dogadjaje: datum i mesto umesto roka i tempa. */
    date: string;
    venue: string;
    venueHint: string;
  };
  /** Natpis na WhatsApp dugmetu. */
  whatsapp: string;
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
    nav: { work: "Radovi", contact: "Kontakt", skip: "Pređi na sadržaj", jezik: "Jezik" },
    ui: {
      glavnaNav: "Glavna navigacija",
      strane: "Strane",
      privatnost: "Politika privatnosti",
      nazad: "Nazad na sajt",
      azurirano: "Ažurirano",
      doprinosioci: "doprinosioci",
      rad: "rad",
    },
    strane: [
      { put: "marketing", tekst: "Sadržaj, oglasi i sajt" },
      { put: "reels", tekst: "Sadržaj za mreže" },
      { put: "svadbe", tekst: "Snimanje venčanja" },
      { put: "dogadjaji", tekst: "Događaji i proslave" },
      { put: "radovi", tekst: "Radovi" },
    ],
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
      date: "Datum",
      venue: "Mesto ili sala",
      venueHint: "npr. Novi Sad, restoran…",
    },
    whatsapp: "Pišite na WhatsApp",
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
    nav: { work: "Work", contact: "Contact", skip: "Skip to content", jezik: "Language" },
    ui: {
      glavnaNav: "Main navigation",
      strane: "Pages",
      privatnost: "Privacy policy",
      nazad: "Back to the site",
      azurirano: "Updated",
      doprinosioci: "contributors",
      rad: "work",
    },
    strane: [
      { put: "marketing", tekst: "Content, ads and a website" },
      { put: "reels", tekst: "Social content" },
      { put: "svadbe", tekst: "Wedding films" },
      { put: "dogadjaji", tekst: "Events and parties" },
      { put: "radovi", tekst: "Work" },
    ],
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
      date: "Date",
      venue: "Venue",
      venueHint: "e.g. Novi Sad, a restaurant…",
    },
    whatsapp: "Message us on WhatsApp",
  },
  ru: {
    meta: {
      title: "Popzify — видеопродакшн в Белграде",
      description:
        "Видеосъёмка, съёмка с дрона, монтаж и контент для соцсетей. Белград, работаем по всему региону.",
    },
    hero: {
      headlineBefore: "Снимаем бренды, которые",
      headlineAccent: "запоминаются.",
      headlineAfter: "",
      sub: "Видеопродакшн, съёмка с дрона, монтаж и дизайн для соцсетей. Белград.",
      hint: "Ведите мышью — вы управляете кадром",
    },
    hud: {
      rec: "REC",
      format: "4K · 24 FPS · 180°",
      lens: "ISO 800 · ƒ/2.8",
      geo: "44.8436° N · 20.4123° E",
    },
    klip: { pusti: "Смотреть", pauza: "Пауза", zvuk: "Звук" },
    nav: { work: "Работы", contact: "Контакты", skip: "Перейти к содержанию", jezik: "Язык" },
    ui: {
      glavnaNav: "Основная навигация",
      strane: "Разделы",
      privatnost: "Политика конфиденциальности",
      nazad: "Вернуться на сайт",
      azurirano: "Обновлено",
      doprinosioci: "участники",
      rad: "проект",
    },
    strane: [
      { put: "marketing", tekst: "Контент, реклама и сайт" },
      { put: "reels", tekst: "Контент для соцсетей" },
      { put: "svadbe", tekst: "Свадебная съёмка" },
      { put: "dogadjaji", tekst: "Мероприятия и праздники" },
      { put: "radovi", tekst: "Работы" },
    ],
    form: {
      legend: "Заявка",
      name: "Имя и фамилия",
      phone: "Телефон",
      email: "E-mail",
      optional: "необязательно",
      service: "Что снимаем",
      servicePick: "Выберите",
      services: ["Свадьба", "Мероприятие или выставка", "Бойцовский вечер", "Контент для соцсетей", "Другое"],
      message: "Пара слов о задаче",
      consent: "Я согласен(-на), чтобы Popzify обработал эти данные для ответа на заявку, в соответствии с ",
      consentLink: "политикой конфиденциальности",
      consentAfter: ".",
      submit: "Отправить заявку",
      sending: "Отправляем…",
      ok: "Спасибо! Ответим в течение 24 часов.",
      error: "Не получилось отправить. Позвоните нам: +381 60 5973212 — решим сразу.",
      or: "или напрямую",
      when: "Когда нужно",
      whenOptions: ["Меньше чем через две недели", "В этом месяце", "Через один–три месяца", "Пока только планирую"],
      pace: "Разово или регулярно",
      paceOptions: ["Разово", "Каждый месяц", "Несколько раз в год"],
      date: "Дата",
      venue: "Место или зал",
      venueHint: "например, Нови-Сад, ресторан…",
    },
    whatsapp: "Написать в WhatsApp",
  },
};
