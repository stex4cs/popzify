import type { Locale } from "./i18n";

/**
 * Politika privatnosti.
 *
 * Pisana je po onome sto sajt stvarno radi, ne po sablonu. Stara verzija
 * na popzify.com/privacypolicy je nabrajala naloge, pretplate na bilten
 * i podatke o placanju kojih ovde nema, a u delu za kontakt je nosila
 * tudju adresu i broj telefona iz sablona.
 *
 * Odeljak o Meta pikselu i dopuna odeljka o kolacicima ulaze u tekst
 * samo kad je piksel stvarno podesen. Dok ga nema, tekst o kolacicima
 * stoji onakav kakav jeste i ne tvrdi nista unapred. Isto vazi i za
 * odeljak o analitici.
 */

export type Section = { h: string; p: string[]; list?: string[] };

export const firma = {
  ime: "POPZOGRAPHY",
  pib: "114200786",
  mb: "67394909",
  osnovano: "14.02.2024.",
  sediste: "Beograd, Zemun",
  email: "business@popzify.com",
  telefon: "060 5973212",
  telefonIntl: "+381605973212",
};

/** Datum poslednje izmene, ispisan kako se pise na svakom jeziku. */
export const azurirano: Record<Locale, string> = {
  sr: "16. novembar 2026.",
  en: "16 November 2026",
  ru: "16 ноября 2026 г.",
};

export const privatnost: Record<Locale, { title: string; intro: string; sections: Section[] }> = {
  sr: {
    title: "Politika privatnosti",
    intro:
      "Ovde piše tačno koje podatke Popzify dobija preko ovog sajta, zašto, gde idu i koliko dugo stoje. Kratko je zato što sajt radi malo stvari sa podacima.",
    sections: [
      {
        h: "Ko obrađuje podatke",
        p: [
          `${firma.ime}, poslovanje registrovano u Agenciji za privredne registre, PIB ${firma.pib}, matični broj ${firma.mb}, osnovano ${firma.osnovano}, sedište ${firma.sediste}.`,
          `Kontakt za sva pitanja o podacima: ${firma.email}, ${firma.telefon}.`,
        ],
      },
      {
        h: "Šta se prikuplja",
        p: ["Samo ono što je potrebno da se odgovori na upit:"],
        list: [
          "Ono što sam upišeš u formu: ime i prezime, broj telefona, e-mail ako ga ostaviš, šta snimamo, datum i mesto ako ih navedeš, i poruku.",
          "Odakle si došao na sajt — adresa stranice sa koje si stigao ili oznake kampanje iz linka.",
          "IP adresa sa koje je upit poslat. Služi samo da se spreči slanje stotinu upita u minutu.",
        ],
      },
      {
        h: "Zašto i po kom osnovu",
        p: [
          "Da bismo ti odgovorili, dogovorili posao i poslali ponudu. Osnov je tvoja saglasnost, koju daješ čekiranjem polja ispod forme. Bez nje se upit ne šalje.",
          "Podaci se ne koriste za slanje reklama niti se prodaju bilo kome.",
        ],
      },
      {
        h: "Gde podaci idu",
        p: [
          `Upit stiže kao običan e-mail na ${firma.email}. Prolazi kroz server za poštu kod našeg hostinga, koji ga prosleđuje — isto kao kad nam pišeš sa svog naloga.`,
          "Sajt ne drži bazu podataka sa upitima. Ako e-mail ne prođe, upit nigde ne ostaje i to ti se odmah kaže, zajedno sa brojem telefona.",
        ],
      },
      {
        h: "Koliko se čuvaju",
        p: [
          "U sandučetu, dok traje prepiska i posao koji iz nje nastane. Kad ti nije potrebno da nam se obratiš ponovo, napiši nam i brišemo.",
        ],
      },
      {
        h: "Kolačići",
        p: [
          "Sajt ne postavlja kolačiće za praćenje i ne meri posete. Jedino što ostaje u tvom pregledaču je podešavanje prikaza, i stoji samo kod tebe — nama ne stiže.",
        ],
      },
      {
        h: "Tvoja prava",
        p: ["Po Zakonu o zaštiti podataka o ličnosti imaš pravo da:"],
        list: [
          "tražiš uvid u to šta imamo o tebi,",
          "tražiš ispravku ili brisanje,",
          "povučeš saglasnost u svakom trenutku, bez obrazloženja,",
          "podneseš pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti, Bulevar kralja Aleksandra 15, Beograd.",
        ],
      },
      {
        h: "Deca",
        p: ["Sajt nije namenjen osobama mlađim od 16 godina i ne tražimo njihove podatke."],
      },
      {
        h: "Izmene",
        p: [
          "Ako se nešto od ovoga promeni, menja se i ovaj tekst, sa novim datumom na vrhu. Ako promena bude veća od kozmetičke, piše šta se promenilo.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy policy",
    intro:
      "This page states exactly what data Popzify receives through this site, why, where it goes and how long it stays. It is short because the site does few things with data.",
    sections: [
      {
        h: "Who processes the data",
        p: [
          `${firma.ime}, registered with the Serbian Business Registers Agency, tax ID ${firma.pib}, registration number ${firma.mb}, established ${firma.osnovano}, registered office ${firma.sediste}, Serbia.`,
          `For anything about your data: ${firma.email}, ${firma.telefonIntl}.`,
        ],
      },
      {
        h: "What is collected",
        p: ["Only what is needed to answer an enquiry:"],
        list: [
          "What you type into the form: your name, phone number, email if you leave one, what we are shooting, the date and venue if you give them, and your message.",
          "Where you came from — the page that referred you, or the campaign tags in the link.",
          "The IP address the enquiry was sent from. It is used only to stop a hundred submissions a minute.",
        ],
      },
      {
        h: "Why, and on what basis",
        p: [
          "To answer you, agree the job and send a quote. The basis is your consent, given by ticking the box under the form. Without it the enquiry is not sent.",
          "The data is not used for advertising and is not sold to anyone.",
        ],
      },
      {
        h: "Where the data goes",
        p: [
          `The enquiry arrives as a plain email at ${firma.email}, through our host's mail server — the same path as any message you would send us yourself.`,
          "The site keeps no database of enquiries. If the email fails, nothing is stored anywhere, and you are told so immediately along with our phone number.",
        ],
      },
      {
        h: "How long it is kept",
        p: [
          "In the mailbox, for as long as the conversation and any work arising from it last. Write to us when you no longer need to reach us and we delete it.",
        ],
      },
      {
        h: "Cookies",
        p: [
          "The site sets no tracking cookies and measures no visits. The only thing left in your browser is a display preference, and it stays on your device — it never reaches us.",
        ],
      },
      {
        h: "Your rights",
        p: ["Under Serbian data protection law you have the right to:"],
        list: [
          "ask what we hold about you,",
          "ask for correction or deletion,",
          "withdraw consent at any time, without giving a reason,",
          "complain to the Commissioner for Information of Public Importance and Personal Data Protection, Bulevar kralja Aleksandra 15, Belgrade.",
        ],
      },
      {
        h: "Children",
        p: ["The site is not intended for anyone under 16 and we do not seek their data."],
      },
      {
        h: "Changes",
        p: [
          "If any of this changes, this text changes with it and carries a new date at the top. If the change is more than cosmetic, it says what changed.",
        ],
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    intro:
      "Здесь точно написано, какие данные Popzify получает через этот сайт, зачем, куда они попадают и сколько хранятся. Текст короткий, потому что сайт мало что делает с данными.",
    sections: [
      {
        h: "Кто обрабатывает данные",
        p: [
          `${firma.ime} — компания, зарегистрированная в Агентстве хозяйственных регистров Сербии, ИНН (PIB) ${firma.pib}, регистрационный номер ${firma.mb}, дата основания ${firma.osnovano}, юридический адрес: Белград, Земун, Сербия.`,
          `По любым вопросам о данных: ${firma.email}, ${firma.telefonIntl}.`,
        ],
      },
      {
        h: "Что мы собираем",
        p: ["Только то, что нужно, чтобы ответить на заявку:"],
        list: [
          "То, что вы сами вводите в форму: имя и фамилию, номер телефона, e-mail (если укажете), что нужно снять, дату и место (если укажете) и сообщение.",
          "Откуда вы пришли на сайт — адрес страницы, с которой был переход, или метки рекламной кампании в ссылке.",
          "IP-адрес, с которого отправлена заявка. Он нужен только для того, чтобы никто не мог отправить сотню заявок в минуту.",
        ],
      },
      {
        h: "Зачем и на каком основании",
        p: [
          "Чтобы ответить вам, договориться о работе и прислать предложение. Основание — ваше согласие: вы даёте его, отмечая галочку под формой. Без него заявка не отправляется.",
          "Данные не используются для рекламных рассылок и никому не продаются.",
        ],
      },
      {
        h: "Куда попадают данные",
        p: [
          `Заявка приходит обычным письмом на ${firma.email} через почтовый сервер нашего хостинга — тем же путём, что и письмо, которое вы отправили бы нам сами.`,
          "Сайт не хранит базу заявок. Если письмо не ушло, заявка нигде не сохраняется — и вы сразу увидите об этом сообщение вместе с нашим номером телефона.",
        ],
      },
      {
        h: "Сколько хранятся",
        p: [
          "В почтовом ящике — пока идёт переписка и работа, которая из неё выросла. Если вам больше не нужно с нами связываться, напишите — и мы всё удалим.",
        ],
      },
      {
        h: "Файлы cookie",
        p: [
          "Сайт не устанавливает cookie для отслеживания и не считает посещения. В браузере остаётся только настройка отображения, и она хранится у вас — к нам она не попадает.",
        ],
      },
      {
        h: "Ваши права",
        p: ["По сербскому закону о защите персональных данных вы вправе:"],
        list: [
          "узнать, какие данные о вас у нас есть;",
          "потребовать их исправить или удалить;",
          "в любой момент отозвать согласие, не объясняя причин;",
          "подать жалобу Уполномоченному по вопросам информации общественного значения и защиты персональных данных: Bulevar kralja Aleksandra 15, Белград.",
        ],
      },
      {
        h: "Дети",
        p: ["Сайт не предназначен для лиц младше 16 лет, и мы не запрашиваем их данные."],
      },
      {
        h: "Изменения",
        p: [
          "Если что-то из этого изменится, изменится и этот текст — с новой датой вверху. Если изменение больше чем косметическое, мы напишем, что именно поменялось.",
        ],
      },
    ],
  },
};

/**
 * Dopuna odeljka o kolacicima kad je piksel ukljucen. Bez nje bi tekst
 * tvrdio da sajt ne postavlja kolacice za pracenje, sto na kampanjskim
 * stranama vise ne bi bilo tacno.
 */
export const kolaciciSaPikselom: Record<Locale, string> = {
  sr: "Sajt nosi i Meta piksel, na svim stranama. On postavlja svoje kolačiće — piše o njemu u odeljku ispod.",
  en: "The site also carries the Meta pixel, on every page. It sets its own cookies — see the section below.",
  ru: "На всех страницах сайта также установлен пиксель Meta. Он ставит собственные cookie — подробнее в разделе ниже.",
};

/**
 * Dopuna odeljka o kolacicima kad je analitika ukljucena. Za razliku od
 * piksela, analitika stoji na celom sajtu, pa recenica mora da kaze bas to.
 */
export const kolaciciSaAnalitikom: Record<Locale, string> = {
  sr: "Sajt koristi i Google Analytics, na svim stranama. On postavlja svoje kolačiće — piše o njemu u odeljku ispod.",
  en: "The site also uses Google Analytics, on every page. It sets its own cookies — see the section below.",
  ru: "На всех страницах сайта также работает Google Analytics. Он ставит собственные cookie — подробнее в разделе ниже.",
};

/** Odeljak o analitici; prikazuje se samo kad je NEXT_PUBLIC_GA_ID podesen. */
export const analitikaOdeljak: Record<Locale, Section> = {
  sr: {
    h: "Google Analytics",
    p: [
      "Sajt koristi Google Analytics 4 da bismo videli koje se strane otvaraju, odakle posetioci dolaze i na čemu se zadržavaju.",
      "Šalje se podatak o poseti: koja strana, koji uređaj i pregledač, približna lokacija na nivou grada i sa kog sajta si stigao. Beleži se i da je poslat upit, i kojim putem — formom, e-mailom, telefonom, WhatsApp-om ili Telegramom. Ne šalju se ni ime, ni e-mail, ni broj telefona, ni tekst poruke iz kontakt forme.",
      "Zašto nam treba: bez toga ne znamo koji deo sajta neko uopšte otvori, pa pišemo i prepravljamo napamet.",
      "Analytics postavlja svoje kolačiće. Možeš ih blokirati u pregledaču ili koristiti Google-ov dodatak za isključivanje Analytics-a; sajt radi normalno i bez njih.",
    ],
  },
  en: {
    h: "Google Analytics",
    p: [
      "This site uses Google Analytics 4 so we can see which pages get opened, where visitors come from and what they stay on.",
      "What is sent is the visit itself: which page, which device and browser, an approximate city-level location and the site you arrived from. It also records that an enquiry was sent and which route it took — the form, email, phone, WhatsApp or Telegram. Your name, email, phone number and the text of a contact message are not sent.",
      "Why we need it: without it we do not know which part of the site anyone actually opens, so we write and rewrite it blind.",
      "Analytics sets its own cookies. You can block them in your browser or use Google's Analytics opt-out add-on; the site works normally without them.",
    ],
  },
  ru: {
    h: "Google Analytics",
    p: [
      "Сайт использует Google Analytics 4, чтобы мы видели, какие страницы открывают, откуда приходят посетители и на чём задерживаются.",
      "Передаются данные о самом посещении: какая страница, какое устройство и браузер, примерное местоположение с точностью до города и с какого сайта вы пришли. Также фиксируется, что заявка отправлена, и каким способом — через форму, e-mail, телефон, WhatsApp или Telegram. Имя, e-mail, номер телефона и текст сообщения из формы не передаются.",
      "Зачем это нужно: без этого мы не знаем, какие разделы сайта вообще открывают, и правим его вслепую.",
      "Analytics ставит собственные cookie. Их можно заблокировать в браузере или установить официальное дополнение Google для отключения Analytics — сайт будет работать как обычно.",
    ],
  },
};

/** Odeljak o pikselu; prikazuje se samo kad je piksel podesen. */
export const pikselOdeljak: Record<Locale, Section> = {
  sr: {
    h: "Meta piksel",
    p: [
      "Sajt nosi Meta piksel na svim stranama. On javlja Meti da je strana otvorena i da li je sa nje poslat upit — kroz formu, ili klikom na e-mail, telefon, WhatsApp ili Telegram.",
      "Meti se ne šalje tvoje ime, broj telefona, e-mail ni tekst poruke — samo da se događaj desio, sa koje strane i kojim putem. Sam upit ide isključivo na našu e-mail adresu.",
      "Zašto nam treba: bez toga ne znamo koji oglas je doneo upit, pa ne znamo ni koliko nas jedan upit košta. Piksel pritom postavlja kolačiće koji te prate i na drugim sajtovima.",
      "Možeš ga isključiti u podešavanjima Facebook ili Instagram naloga, ili blokiranjem kolačića u pregledaču.",
    ],
  },
  en: {
    h: "The Meta pixel",
    p: [
      "The site carries the Meta pixel on every page. It tells Meta that the page was opened and whether an enquiry was sent from it — through the form, or by clicking the email, phone, WhatsApp or Telegram link.",
      "Meta is not sent your name, phone number, email or the text of your message — only that the event happened, which page it came from and which route it took. The enquiry itself goes to our email address and nowhere else.",
      "Why we need it: without it we do not know which ad brought an enquiry, so we do not know what one enquiry costs us. The pixel does set cookies that follow you on other sites.",
      "You can switch it off in your Facebook or Instagram account settings, or by blocking cookies in your browser.",
    ],
  },
  ru: {
    h: "Пиксель Meta",
    p: [
      "На всех страницах сайта установлен пиксель Meta. Он сообщает Meta, что страница открыта и была ли с неё отправлена заявка — через форму или нажатием на e-mail, телефон, WhatsApp или Telegram.",
      "Meta не получает ни вашего имени, ни номера телефона, ни e-mail, ни текста сообщения — только сам факт события, страницу и способ связи. Сама заявка приходит исключительно на наш e-mail.",
      "Зачем это нужно: без этого мы не знаем, какое объявление принесло заявку, а значит — сколько она нам стоит. При этом пиксель ставит cookie, которые отслеживают вас и на других сайтах.",
      "Отключить его можно в настройках аккаунта Facebook или Instagram или заблокировав cookie в браузере.",
    ],
  },
};
