import type { Locale } from "./i18n";
import { svadbe } from "./kampanja-svadbe";
import { marketing } from "./kampanja-marketing";
import { dogadjaji } from "./kampanja-dogadjaji";

/**
 * Kampanjske strane: /reels, kasnije /svadbe i /marketing.
 *
 * Ove strane primaju placen saobracaj, uglavnom sa telefona, pa nose
 * isti jezik kao ostatak sajta ali bez 3D sveta — jedan kadar, pa
 * odmah sadrzaj i forma.
 *
 * Tekst je prenet sa stare popzify.com/reels, gde je vec bio doteran da
 * ne zvuci kao da ga je pisala masina. Nije pisan iznova.
 */

export type Odeljak = { eyebrow: string; title: string; accent: string; p: string };

/** Sekcija koja je samo mreza kartica; koriste je bol, usluge i razlozi. */
export type Mreza = Odeljak & { items: { h: string; p: string }[] };

export type Kampanja = {
  slug: string;
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    title: string;
    accent: string;
    sub: string;
    cta: string;
    ctaDrugi: string;
    oznake: string[];
    /** Slika iza uvoda; bez nje uvod stoji na samoj pozadini. */
    poster?: string;
  };
  /** Film u 16:9. Ucitava se tek na klik, sa zvukom. */
  film?: Odeljak & { src: string; poster: string; dugme: string };
  /**
   * Isti dogadjaj u 9:16, kao zaseban rez za telefon. Stoji pored
   * spiska sta ta verzija donosi, jer je ona sama po sebi argument.
   */
  uspravno?: Odeljak & { src: string; poster: string; dugme: string; stavke: string[] };
  /**
   * Prave fotografije, ne kadrovi iz filma. Dimenzije su tu da se
   * prostor rezervise pre ucitavanja i strana ne skace.
   */
  fotografije?: Odeljak & { slike: { src: string; w: number; h: number; alt: string }[] };
  /** Traka vertikalnih snimaka iz lib/work. */
  klipovi?: Odeljak;
  /** Dve kolone sa tim sta ulazi u posao. */
  dobijate?: Odeljak & { kolone: { h: string; p: string; list: string[] }[] };
  /** Zaustavljeni kadrovi iz filma. */
  galerija?: Odeljak & { slike: string[] };
  bol?: Mreza;
  /** Sta sve radimo. */
  usluge?: Mreza;
  /** Zasto bas mi. */
  razlozi?: Mreza;
  /** Radovi sa linkom na zivi sajt. */
  radovi?: Odeljak & {
    items: { h: string; p: string; url: string; slika: string; interno?: string }[];
  };
  /** Pitanja koja se najcesce ponavljaju. */
  pitanja?: Odeljak & { items: { q: string; a: string }[] };
  /** Logotipi uz koje smo radili. */
  partneri?: { naslov: string; slike: { src: string; ime: string; url?: string }[] };
  /** Ponudjeni izbor u polju "sta snimamo"; bez njega ide opsti spisak. */
  uslugeIzbor?: string[];
  /**
   * Dodatna pitanja u formi. `rok` pita kad treba i koliko cesto (za
   * sadrzaj koji se ponavlja), `datum` pita datum i mesto (za svadbu i
   * dogadjaj, gde je to prvo sto treba da se zna). Podrazumevano `rok`.
   */
  forma?: "rok" | "datum";
  /** Poruka koja je vec upisana kad se otvori WhatsApp. */
  whatsapp?: string;
  koraci: Odeljak & { steps: { h: string; p: string }[] };
  paketi: Odeljak & {
    items: { h: string; p: string; list: string[] }[];
    note: string;
  };
  kraj: Odeljak;
};

const reelsSr: Kampanja = {
  slug: "reels",
  meta: {
    title: "Sadržaj za mreže — jedan dan snimanja, mesec objava | Popzify",
    description:
      "Dođemo kod tebe, snimimo sve iz jednog dana, i sledećih mesec dana samo gledaš kako izlazi. Montaža, titlovi i objavljivanje su na nama. Beograd i ceo region.",
  },
  hero: {
    eyebrow: "Beograd · Zemun · radimo za ceo region",
    title: "Jedan dan snimanja.",
    accent: "Mesec sadržaja.",
    sub:
      "Dođemo kod tebe, snimimo sve iz jednog dana, i ti sledećih mesec dana samo gledaš kako izlazi. Montaža, titlovi i objavljivanje su na nama.",
    cta: "Hoću snimke za svoj brend",
    ctaDrugi: "060 5973212",
    oznake: ["Sony FX3", "FPV i gimbal dron", "Registrovana firma"],
  },
  bol: {
    eyebrow: "Da pogodimo",
    title: "Znaš da treba da objavljuješ. Samo što uvek ima nešto",
    accent: "preče.",
    p:
      "Prođe mesec, profil stoji prazan, a ti se setiš tek kad vidiš da je konkurencija objavila peti put.",
    items: [
      {
        h: "Nemaš vremena",
        p: "Snimanje, montaža, titlovi i smišljanje teksta pojedu pola radnog dana nedeljno. Ti taj dan već imaš popunjen.",
      },
      {
        h: "Ne znaš šta da snimiš",
        p: "Otvoriš kameru i mozak stane. Ideje koje su delovale dobro u glavi na snimku izgledaju usiljeno.",
      },
      {
        h: "Objaviš, i ništa",
        p: "Dvesta pregleda, od toga polovina tvoji poznanici. Posle par takvih objava normalno je da odustaneš.",
      },
      {
        h: "Telefon nije dovoljan",
        p: "Snimak sa mobilnog se vidi da je sa mobilnog. Neko ko radi lošije od tebe deluje ozbiljnije samo zato što ima bolju sliku.",
      },
      {
        h: "Probao si sa nekim",
        p: "Snimio, uzeo pare, nestao. Ili je snimke poslao posle mesec dana, kad je akcija odavno prošla.",
      },
      {
        h: "Ne znaš da li se isplati",
        p: "Ako niko ne prati brojke, sadržaj je samo trošak. Kad se prati, vidi se koji snimak je doveo mušteriju i po kojoj ceni.",
      },
    ],
  },
  klipovi: {
    eyebrow: "Primeri",
    title: "Ovako to",
    accent: "izgleda.",
    p: "Borilačka veče, sajam, svadba. Različiti povodi, isti način rada. Vertikalno, kratko, spremno za feed.",
  },
  koraci: {
    eyebrow: "Kako ide",
    title: "Jedan dan kod tebe, mesec dana",
    accent: "objava.",
    p: "Četiri koraka, bez iznenađenja na sredini.",
    steps: [
      {
        h: "Dogovor",
        p: "Dvadeset minuta telefonom. Šta prodaješ, ko ti kupuje, gde te konkurencija bije. Iz toga vidimo da li idemo na proces, na ljude ili na proizvod. Ako ti sadržaj trenutno ne treba, reći ćemo ti umesto da uzmemo pare.",
      },
      {
        h: "Priprema",
        p: "Pišemo scenario i listu kadrova pre nego što se kamera upali. Dobiješ spisak šta treba da bude spremno, od prostora do garderobe. Zato jedan dan i bude dovoljan, jer ne izmišljamo na licu mesta.",
      },
      {
        h: "Snimanje",
        p: "Dolazimo sa Sony FX3, svetlom, mikrofonima i dronom ako lokacija traži. Snimamo u blokovima, pa za nekoliko sati imamo materijal za desetine objava. Ne moraš pred kameru ako nećeš, radi se i bez lica.",
      },
      {
        h: "Montaža i objava",
        p: "Montiramo, dodajemo titlove i muziku, pa ti šaljemo na odobrenje. Kad kažeš da može, objavljujemo po planu i pratimo šta je prošlo a šta nije. Sirov materijal ti ostaje, možeš da ga vrtiš i kao oglase.",
      },
    ],
  },
  paketi: {
    eyebrow: "Paketi",
    title: "Izaberi",
    accent: "tempo.",
    p: "Cena zavisi od lokacije, broja snimanja i da li objavljujemo umesto tebe. Javi se, cifru dobijaš za 24 sata.",
    items: [
      {
        h: "Proba",
        p: "Da vidiš kako izgleda pre nego što se vežeš.",
        list: [
          "Jedno snimanje, bez obaveze dalje",
          "Paket vertikalnih snimaka",
          "Montaža, titlovi i muzika",
          "Naslovne slike za feed",
          "Sirovi materijal ti ostaje",
        ],
      },
      {
        h: "Mesečno",
        p: "Za brendove kojima treba stalan priliv sadržaja.",
        list: [
          "Jedan dan snimanja svakog meseca",
          "Sadržaj za ceo mesec objava",
          "Scenario i lista kadrova unapred",
          "Plan objava sa tekstovima",
          "Objavljujemo umesto tebe",
          "Mesečni izveštaj o dometu",
          "Bez vezivanja na godinu dana",
        ],
      },
      {
        h: "Sadržaj i oglasi",
        p: "Kada snimci treba da donesu upite, ne samo preglede.",
        list: [
          "Sve iz paketa Mesečno",
          "Postavka Meta naloga i piksela",
          "Vođenje kampanja i budžeta",
          "Kreative iz istog snimanja",
          "Landing stranica za kampanju",
          "Izveštaj sa cenom po upitu",
        ],
      },
    ],
    note:
      "U svakom paketu: sirovi materijal i nalozi ostaju na tvoje ime · račun i ugovor · jedan sagovornik za sve.",
  },
  kraj: {
    eyebrow: "Upit",
    title: "Reci šta snimamo i kad ti",
    accent: "treba.",
    p: "Odgovaramo u roku od 24 sata, sa planom i cenom. Bez obaveze.",
  },
};

const reelsEn: Kampanja = {
  slug: "reels",
  meta: {
    title: "Social content — one shoot day, a month of posts | Popzify",
    description:
      "We come to you, shoot everything in one day, and for the next month you just watch it go out. Editing, subtitles and posting are on us. Belgrade and the whole region.",
  },
  hero: {
    eyebrow: "Belgrade · Zemun · working across the region",
    title: "One day of shooting.",
    accent: "A month of content.",
    sub:
      "We come to you, shoot everything in a single day, and for the next month you just watch it go out. Editing, subtitles and posting are on us.",
    cta: "I want footage for my brand",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Sony FX3", "FPV and gimbal drone", "Registered company"],
  },
  bol: {
    eyebrow: "Let us guess",
    title: "You know you should be posting. There is always something more",
    accent: "urgent.",
    p:
      "A month goes by, the profile sits empty, and you remember it when you see a competitor post for the fifth time.",
    items: [
      {
        h: "No time",
        p: "Shooting, editing, subtitles and writing captions eat half a working day a week. That day of yours is already full.",
      },
      {
        h: "Nothing to shoot",
        p: "You open the camera and your mind goes blank. Ideas that felt good in your head look forced on camera.",
      },
      {
        h: "You post, and nothing",
        p: "Two hundred views, half of them people you know. After a few of those it is normal to give up.",
      },
      {
        h: "A phone is not enough",
        p: "Phone footage looks like phone footage. Someone doing worse work than you comes across as more serious purely because the picture is better.",
      },
      {
        h: "You tried someone",
        p: "They shot it, took the money, vanished. Or sent the files a month later, long after the promotion was over.",
      },
      {
        h: "You cannot tell if it pays",
        p: "If nobody tracks the numbers, content is just a cost. Tracked, you see which clip brought a customer and at what price.",
      },
    ],
  },
  klipovi: {
    eyebrow: "Examples",
    title: "This is what it",
    accent: "looks like.",
    p: "A fight night, a trade fair, a wedding. Different occasions, the same way of working. Vertical, short, ready for the feed.",
  },
  koraci: {
    eyebrow: "How it goes",
    title: "One day at your place, a month of",
    accent: "posts.",
    p: "Four steps, no surprises halfway through.",
    steps: [
      {
        h: "The call",
        p: "Twenty minutes on the phone. What you sell, who buys it, where competitors beat you. From that we see whether to shoot the process, the people or the product. If you do not need content right now, we will say so instead of taking your money.",
      },
      {
        h: "Prep",
        p: "We write a script and a shot list before the camera is switched on. You get a list of what needs to be ready, from the space to the wardrobe. That is why one day is enough — nothing is improvised on the spot.",
      },
      {
        h: "The shoot",
        p: "We arrive with a Sony FX3, lights, microphones and a drone if the location calls for it. We shoot in blocks, so within a few hours there is material for dozens of posts. You do not have to be on camera if you would rather not.",
      },
      {
        h: "Edit and publish",
        p: "We cut, add subtitles and music, and send it over for approval. Once you say yes, we post on schedule and watch what worked and what did not. The raw footage stays with you and can run as ads too.",
      },
    ],
  },
  paketi: {
    eyebrow: "Packages",
    title: "Pick the",
    accent: "pace.",
    p: "The price depends on the location, the number of shoots and whether we post on your behalf. Get in touch and you have a figure within 24 hours.",
    items: [
      {
        h: "Trial",
        p: "To see what it looks like before committing.",
        list: [
          "One shoot, no obligation after",
          "A set of vertical clips",
          "Editing, subtitles and music",
          "Cover frames for the feed",
          "The raw footage stays with you",
        ],
      },
      {
        h: "Monthly",
        p: "For brands that need a steady flow of content.",
        list: [
          "One shoot day every month",
          "Content for a full month of posts",
          "Script and shot list up front",
          "A posting plan with captions",
          "We post on your behalf",
          "A monthly reach report",
          "No year-long lock-in",
        ],
      },
      {
        h: "Content and ads",
        p: "When the footage has to bring enquiries, not just views.",
        list: [
          "Everything in Monthly",
          "Meta account and pixel setup",
          "Running campaigns and budget",
          "Creatives from the same shoot",
          "A landing page for the campaign",
          "A report with cost per enquiry",
        ],
      },
    ],
    note:
      "In every package: the raw footage and the accounts stay in your name · invoice and contract · one person to talk to.",
  },
  kraj: {
    eyebrow: "Enquiry",
    title: "Tell us what we are shooting and",
    accent: "when.",
    p: "We come back within 24 hours with a plan and a price. No obligation.",
  },
};

const reelsRu: Kampanja = {
  slug: "reels",
  meta: {
    title: "Контент для соцсетей: один день съёмки — месяц публикаций | Popzify",
    description:
      "Приезжаем к вам, за один день снимаем всё нужное, а следующий месяц вы просто смотрите, как выходят публикации. Монтаж, субтитры и публикация — на нас. Белград и весь регион.",
  },
  hero: {
    eyebrow: "Белград · Земун · работаем по всему региону",
    title: "Один день съёмки.",
    accent: "Месяц контента.",
    sub:
      "Приезжаем к вам, за один день снимаем всё, что нужно, а следующий месяц вы просто смотрите, как выходят публикации. Монтаж, субтитры и публикация — на нас.",
    cta: "Хочу видео для своего бренда",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Sony FX3", "FPV-дрон и дрон с подвесом", "Зарегистрированная компания"],
  },
  bol: {
    eyebrow: "Угадаем?",
    title: "Вы знаете, что публиковать нужно. Но всегда находится что-то",
    accent: "важнее.",
    p:
      "Проходит месяц, профиль пустует, а вспоминаете вы о нём, только когда конкуренты выкладывают пятый пост.",
    items: [
      {
        h: "Нет времени",
        p: "Съёмка, монтаж, субтитры и подписи съедают полдня в неделю. А этот день у вас и так расписан.",
      },
      {
        h: "Непонятно, что снимать",
        p: "Открываете камеру — и в голове пусто. Идеи, которые казались отличными, на видео выглядят натянуто.",
      },
      {
        h: "Опубликовали — и тишина",
        p: "Двести просмотров, половина из них — знакомые. После нескольких таких постов руки опускаются, и это нормально.",
      },
      {
        h: "Телефона мало",
        p: "Видео с телефона видно сразу. Тот, кто работает хуже вас, выглядит солиднее только потому, что у него картинка лучше.",
      },
      {
        h: "Уже пробовали с кем-то",
        p: "Снял, взял деньги, пропал. Или прислал материал через месяц, когда акция давно закончилась.",
      },
      {
        h: "Непонятно, окупается ли",
        p: "Если никто не считает цифры, контент — просто расходы. А когда считают, видно, какой ролик привёл клиента и во сколько он обошёлся.",
      },
    ],
  },
  klipovi: {
    eyebrow: "Примеры",
    title: "Вот как это",
    accent: "выглядит.",
    p: "Бойцовский вечер, выставка, свадьба. Поводы разные, подход один. Вертикально, коротко, готово для ленты.",
  },
  koraci: {
    eyebrow: "Как это работает",
    title: "Один день у вас — месяц",
    accent: "публикаций.",
    p: "Четыре шага, без сюрпризов на полпути.",
    steps: [
      {
        h: "Созвон",
        p: "Двадцать минут по телефону: что вы продаёте, кто у вас покупает, где конкуренты вас обходят. Из этого понимаем, что снимать — процесс, людей или продукт. Если контент вам сейчас не нужен, мы так и скажем, а не возьмём деньги.",
      },
      {
        h: "Подготовка",
        p: "Пишем сценарий и список кадров ещё до того, как включится камера. Вы получаете список того, что должно быть готово, — от помещения до одежды. Поэтому одного дня и хватает: на месте ничего не придумываем.",
      },
      {
        h: "Съёмка",
        p: "Приезжаем с Sony FX3, светом, микрофонами и дроном, если локация того требует. Снимаем блоками, так что за несколько часов набирается материал на десятки публикаций. Выходить в кадр не обязательно — можно снимать и без лица.",
      },
      {
        h: "Монтаж и публикация",
        p: "Монтируем, добавляем субтитры и музыку и присылаем на согласование. Когда вы говорите «да», публикуем по плану и следим, что сработало, а что нет. Исходники остаются у вас — их можно крутить и в рекламе.",
      },
    ],
  },
  paketi: {
    eyebrow: "Пакеты",
    title: "Выберите",
    accent: "темп.",
    p: "Цена зависит от локации, количества съёмок и от того, публикуем ли мы за вас. Напишите — цифру получите в течение 24 часов.",
    items: [
      {
        h: "Пробный",
        p: "Чтобы посмотреть, как это выглядит, прежде чем договариваться надолго.",
        list: [
          "Одна съёмка без дальнейших обязательств",
          "Пакет вертикальных роликов",
          "Монтаж, субтитры и музыка",
          "Обложки для ленты",
          "Исходники остаются у вас",
        ],
      },
      {
        h: "Ежемесячный",
        p: "Для брендов, которым нужен постоянный поток контента.",
        list: [
          "Один съёмочный день каждый месяц",
          "Контент на целый месяц публикаций",
          "Сценарий и список кадров заранее",
          "Контент-план с текстами",
          "Публикуем за вас",
          "Ежемесячный отчёт по охватам",
          "Без привязки на год",
        ],
      },
      {
        h: "Контент и реклама",
        p: "Когда ролики должны приносить заявки, а не только просмотры.",
        list: [
          "Всё из пакета «Ежемесячный»",
          "Настройка рекламного кабинета Meta и пикселя",
          "Ведение кампаний и бюджета",
          "Креативы с той же съёмки",
          "Лендинг под кампанию",
          "Отчёт со стоимостью заявки",
        ],
      },
    ],
    note:
      "В каждом пакете: исходники и аккаунты остаются на вас · счёт и договор · один человек на связи по всем вопросам.",
  },
  kraj: {
    eyebrow: "Заявка",
    title: "Расскажите, что снимаем и когда это",
    accent: "нужно.",
    p: "Ответим в течение 24 часов — с планом и ценой. Ни к чему не обязывает.",
  },
};

export const kampanje: Record<string, Record<Locale, Kampanja>> = {
  reels: { sr: reelsSr, en: reelsEn, ru: reelsRu },
  svadbe,
  dogadjaji,
  marketing,
};
