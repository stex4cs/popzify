/**
 * Portfolio grafickog dizajna, za pokazivanje klijentima.
 *
 * Stoji izvan `sr`/`en` sistema ostatka sajta: ovde su engleski i ruski,
 * jer se pokazuje klijentima koji ne citaju srpski. Dodavanje ruskog kao
 * punog jezika sajta znacilo bi prevod svega ostalog, a treba samo ovde.
 *
 * Opisi govore sta je dizajn i kako je sklopljen. Nigde ne stoji koliko
 * je nesto „povecalo pregled" ni slicno — ti brojevi se ne znaju.
 */

export type Jezik = "en" | "ru";

type T = Record<Jezik, string>;

/** Oblik kadra; odredjuje koliko slika stane u red i kako se rezerva prostora. */
export type Oblik = "16:9" | "4:5" | "9:16" | "panorama";

export type Slika = { file: string; oblik: Oblik; alt: string };

export type Rad = {
  id: string;
  klijent: T;
  naslov: T;
  opis: T;
  oznake: T[];
  slike: Slika[];
};

export type Projekat = {
  id: string;
  /** Ime brenda se ne prevodi. */
  ime: string;
  grana: T;
  uvod: T;
  radovi: Rad[];
};

const cs = (file: string, oblik: Oblik, alt: string): Slika => ({
  file: `/design/cs/${file}.webp`,
  oblik,
  alt,
});
const ar = (file: string, oblik: Oblik, alt: string): Slika => ({
  file: `/design/arenica/${file}.webp`,
  oblik,
  alt,
});

export const projekti: Projekat[] = [
  {
    id: "correct-score",
    ime: "Correct Score Pro",
    grana: {
      en: "Sports predictions · Betting media",
      ru: "Спортивные прогнозы · Беттинг-медиа",
    },
    uvod: {
      en: "Daily social graphics for a football and basketball predictions platform, its broadcast partner Arena Sport and its sponsor Donbet. Everything is built as a template and ships in two native formats.",
      ru: "Ежедневная графика для платформы прогнозов на футбол и баскетбол, её вещательного партнёра Arena Sport и спонсора Donbet. Всё собрано как шаблон и выходит в двух нативных форматах.",
    },
    radovi: [
      {
        id: "thumbnail",
        klijent: { en: "Arena Sport · YouTube", ru: "Arena Sport · YouTube" },
        naslov: {
          en: "EuroLeague Highlights Thumbnails",
          ru: "Обложки хайлайтов Евролиги",
        },
        opis: {
          en: "Broadcast-grade YouTube thumbnails with club crests and channel branding, built to be read at small sizes. One layout, two variants: a player cutout against flat colour, and the same frame opened up to a full-frame action photo.",
          ru: "Обложки для YouTube телевизионного уровня: клубные эмблемы и брендинг канала, с расчётом на то, чтобы читаться в маленьком размере. Одна раскладка, два варианта: вырезанный игрок на плашке и тот же кадр, раскрытый до полноформатного фото.",
        },
        oznake: [
          { en: "Thumbnail", ru: "Обложка" },
          { en: "16:9", ru: "16:9" },
          { en: "Variants", ru: "Варианты" },
        ],
        slike: [
          cs("01_arena-sport_thumbnail_cutout", "16:9", "EuroLeague highlights thumbnail, cutout version"),
          cs("02_arena-sport_thumbnail_action", "16:9", "The same thumbnail with a full-frame action photo"),
        ],
      },
      {
        id: "mec-dana",
        klijent: { en: "Correct Score Pro × Donbet", ru: "Correct Score Pro × Donbet" },
        naslov: { en: "Match of the Day Poster", ru: "Афиша матча дня" },
        opis: {
          en: "Player-led matchday poster in two formats — an Instagram story and a Telegram post — with the odds and the sponsor built into the layout rather than stuck on top.",
          ru: "Афиша матча дня с игроком в главной роли, в двух форматах — сторис в Instagram и пост в Telegram — где коэффициенты и спонсор встроены в раскладку, а не налеплены сверху.",
        },
        oznake: [
          { en: "Poster", ru: "Афиша" },
          { en: "9:16 + 4:5", ru: "9:16 + 4:5" },
          { en: "Sponsor", ru: "Спонсор" },
        ],
        slike: [
          cs("04_match-poster_story", "9:16", "Match of the day poster, Instagram story"),
          cs("05_match-poster_post", "4:5", "Match of the day poster, Telegram post"),
        ],
      },
      {
        id: "dnevna",
        klijent: { en: "Correct Score Pro", ru: "Correct Score Pro" },
        naslov: { en: "Daily Matchday Graphics", ru: "Ежедневная матчевая графика" },
        opis: {
          en: "A templated daily series — fixtures, kick-off times, crests and 1/X/2 odds with the favourite highlighted. Produced every day, across football and basketball.",
          ru: "Ежедневная серия на шаблоне — матчи, время начала, эмблемы и коэффициенты 1/X/2 с выделенным фаворитом. Выходит каждый день, футбол и баскетбол.",
        },
        oznake: [
          { en: "Series", ru: "Серия" },
          { en: "Template", ru: "Шаблон" },
          { en: "Data-driven", ru: "По данным" },
        ],
        slike: [
          cs("06_matchday_champions-league_story", "9:16", "Champions League matchday story"),
          cs("07_matchday_euroleague_story", "9:16", "EuroLeague matchday story"),
          cs("08_matchday_top-matches_story", "9:16", "Top matches of the day story"),
        ],
      },
      {
        id: "teme",
        klijent: { en: "Correct Score Pro", ru: "Correct Score Pro" },
        naslov: { en: "League Editions & Theme System", ru: "Выпуски по лигам и система тем" },
        opis: {
          en: "The same system in distinct looks: a per-league edition with its own visual theme — pitch, ember, stadium and gold — so a feed of daily posts never reads as one repeated image.",
          ru: "Одна система в разных обличьях: отдельный выпуск под каждую лигу со своей темой — газон, угли, стадион и золото, — чтобы лента ежедневных постов не выглядела одной повторённой картинкой.",
        },
        oznake: [
          { en: "Themes", ru: "Темы" },
          { en: "Premier League", ru: "Premier League" },
          { en: "LaLiga", ru: "LaLiga" },
          { en: "Bundesliga", ru: "Bundesliga" },
        ],
        slike: [
          cs("11_league_premier-league_story", "9:16", "Premier League edition"),
          cs("12_league_laliga_story", "9:16", "LaLiga edition"),
          cs("13_league_bundesliga_story", "9:16", "Bundesliga edition"),
          cs("14_league_seriea-ligue1_story", "9:16", "Serie A and Ligue 1 edition"),
        ],
      },
      {
        id: "promo",
        klijent: { en: "Donbet · Sponsor", ru: "Donbet · Спонсор" },
        naslov: { en: "Promo Code Campaign", ru: "Кампания с промокодами" },
        opis: {
          en: "Bonus-code creative for the sponsor: a clear offer hierarchy, the terms where they belong, and a real app screen in the phone mockup instead of a placeholder.",
          ru: "Креатив с бонус-кодами для спонсора: понятная иерархия предложения, условия на своём месте и реальный экран приложения в мокапе телефона вместо заглушки.",
        },
        oznake: [
          { en: "Promo", ru: "Промо" },
          { en: "Campaign", ru: "Кампания" },
          { en: "Mockup", ru: "Мокап" },
        ],
        slike: [
          cs("15_donbet_promo-codes_story", "9:16", "Promo code story"),
          cs("16_donbet_promo-codes_post", "4:5", "Promo code post"),
        ],
      },
      {
        id: "beta",
        klijent: { en: "Correct Score Pro · App", ru: "Correct Score Pro · Приложение" },
        naslov: { en: "Beta Launch Announcement", ru: "Анонс запуска беты" },
        opis: {
          en: "Recruitment creative for the app beta — product screens, what the tester gets, and a single strong call to action.",
          ru: "Креатив для набора в бету приложения — экраны продукта, что получает тестировщик, и один сильный призыв к действию.",
        },
        oznake: [
          { en: "Product", ru: "Продукт" },
          { en: "Launch", ru: "Запуск" },
          { en: "App UI", ru: "UI приложения" },
        ],
        slike: [
          cs("17_app_beta-launch_story", "9:16", "Beta launch story"),
          cs("18_app_beta-launch_post", "4:5", "Beta launch post"),
        ],
      },
      {
        id: "formati",
        klijent: { en: "Correct Score Pro", ru: "Correct Score Pro" },
        naslov: { en: "One Design, Every Channel", ru: "Один дизайн, все каналы" },
        opis: {
          en: "Every piece ships in two native formats — a Telegram post and an Instagram story — with layout, type and spacing re-balanced for each, not cropped from one master.",
          ru: "Каждый материал выходит в двух нативных форматах — пост в Telegram и сторис в Instagram — с пересобранной раскладкой, шрифтом и отступами под каждый, а не обрезкой одного исходника.",
        },
        oznake: [
          { en: "Telegram 4:5", ru: "Telegram 4:5" },
          { en: "Instagram 9:16", ru: "Instagram 9:16" },
        ],
        slike: [
          cs("10_matchday_top-matches-gold_post", "4:5", "Telegram post format"),
          cs("09_matchday_top-matches-gold_story", "9:16", "Instagram story format"),
        ],
      },
    ],
  },

  {
    id: "arenica",
    ime: "Arenica",
    grana: {
      en: "Sports media · Arena Channels Group",
      ru: "Спортивные медиа · Arena Channels Group",
    },
    uvod: {
      en: "Editorial and results graphics for a sports platform covering school and amateur sport. The brand's colour bar runs through every format; each section gets its own badge without leaving the system.",
      ru: "Редакционная и результатная графика для спортивной платформы, которая освещает школьный и любительский спорт. Цветная полоса бренда проходит через каждый формат, а у каждой рубрики свой бейдж — не выходя за рамки системы.",
    },
    radovi: [
      {
        id: "citati",
        klijent: { en: "Arenica · Editorial", ru: "Arenica · Редакция" },
        naslov: { en: "Interview Cards", ru: "Карточки интервью" },
        opis: {
          en: "A quote card per rubric — the athlete's own words, the rubric badge and the brand bar. One template, different sections, and the photograph still carries the post.",
          ru: "Карточка цитаты под каждую рубрику — слова самого спортсмена, бейдж рубрики и фирменная полоса. Один шаблон, разные разделы, и фотография по-прежнему держит пост.",
        },
        oznake: [
          { en: "Editorial", ru: "Редакция" },
          { en: "4:5", ru: "4:5" },
          { en: "Rubrics", ru: "Рубрики" },
        ],
        slike: [
          ar("prica-deninger", "4:5", "Interview card, Priče sa Arenice rubric"),
          ar("prica-topic", "4:5", "Interview card, Šampionski DNK rubric"),
          ar("prica-macura", "4:5", "Interview card, third rubric"),
        ],
      },
      {
        id: "rezultati",
        klijent: { en: "Arenica · League coverage", ru: "Arenica · Освещение лиги" },
        naslov: {
          en: "Results, A Theme Per Municipality",
          ru: "Результаты: своя тема на каждый муниципалитет",
        },
        opis: {
          en: "The school league results template, themed by municipality. The same structure in a different colour reads as its own edition, so a viewer knows whose round they are looking at before reading a word.",
          ru: "Шаблон результатов школьной лиги с темой под каждый муниципалитет. Одна и та же структура в другом цвете читается как отдельный выпуск: зритель понимает, чей это тур, ещё не прочитав ни слова.",
        },
        oznake: [
          { en: "Series", ru: "Серия" },
          { en: "Themes", ru: "Темы" },
          { en: "9:16", ru: "9:16" },
        ],
        slike: [
          ar("liga-boje", "panorama", "Four municipality colour editions side by side"),
          ar("liga-surcin", "9:16", "Results story, Surčin edition"),
        ],
      },
      {
        id: "vesti",
        klijent: { en: "Arenica · News & partners", ru: "Arenica · Новости и партнёры" },
        naslov: { en: "News & Branded Stories", ru: "Новости и брендированные сторис" },
        opis: {
          en: "The news story format: label, photograph, headline, standfirst and one button. The same frame serves the newsroom and a partner's story, so sponsored posts never look like a foreign body in the feed.",
          ru: "Формат новостной сторис: плашка, фотография, заголовок, подзаголовок и одна кнопка. Одна и та же рамка работает и для редакции, и для партнёрского материала, поэтому спонсорские посты не выглядят чужеродно в ленте.",
        },
        oznake: [
          { en: "Story", ru: "Сторис" },
          { en: "9:16", ru: "9:16" },
          { en: "Branded content", ru: "Партнёрский материал" },
        ],
        slike: [
          ar("vest-fairplay", "9:16", "News story, Fair Play league"),
          ar("vest-hellosmile", "9:16", "Branded story for a partner"),
        ],
      },
    ],
  },
];

/**
 * Kanali na kojima se javljaju klijenti sa ove strane. WhatsApp vodi na
 * isti broj koji stoji u zaglavlju, bez plusa i razmaka, kako wa.me
 * trazi.
 */
export const veze = {
  whatsapp: "https://wa.me/381605973212",
  telegram: "https://t.me/correctscore7877",
};

export const tekst = {
  en: {
    eyebrow: "Graphic design",
    naslov: "Design systems for",
    naglasak: "sports media.",
    uvod: "Daily social graphics, broadcast thumbnails and campaign creative — built as templates, themed per edition, and shipped in every format the channel needs.",
    jezik: "Русский",
    nazad: "Popzify",
    kontaktNaslov: "Want this for your brand?",
    kontaktP: "Tell us what you publish and how often. We come back with a plan and a price within 24 hours.",
    pisi: "Email",
    zovi: "Call",
    vatsap: "WhatsApp",
    telegram: "Telegram",
    uvecaj: "Open full size",
    zatvori: "Close",
    prethodna: "Previous",
    sledeca: "Next",
  },
  ru: {
    eyebrow: "Графический дизайн",
    naslov: "Дизайн-системы для",
    naglasak: "спортивных медиа.",
    uvod: "Ежедневная графика для соцсетей, телевизионные обложки и кампейн-креатив — собраны как шаблоны, с темой под каждый выпуск, и отгружаются в любом формате, который нужен каналу.",
    jezik: "English",
    nazad: "Popzify",
    kontaktNaslov: "Хотите так же для своего бренда?",
    kontaktP: "Расскажите, что вы публикуете и как часто. В течение 24 часов вернёмся с планом и ценой.",
    pisi: "Почта",
    zovi: "Позвонить",
    vatsap: "WhatsApp",
    telegram: "Telegram",
    uvecaj: "Открыть в полном размере",
    zatvori: "Закрыть",
    prethodna: "Назад",
    sledeca: "Вперёд",
  },
} as const;
