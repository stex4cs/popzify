import type { Kampanja } from "./kampanje";

/**
 * Svadbe.
 *
 * Obraca se paru u mnozini, kao i stara strana: nije ista publika kao
 * kod reelova i ne zvuci dobro na "ti". Tezina strane je film u 16:9,
 * a ne traka vertikala.
 */

const sr: Kampanja = {
  slug: "svadbe",
  meta: {
    title: "Snimanje venčanja i svadbi, fotograf za venčanje | Popzify",
    description:
      "Snimanje i fotografisanje venčanja u Beogradu, Novom Sadu i celoj Srbiji. Isti tim radi video i fotografiju, uz dron i dve kamere na ceremoniji. Kadrovi isto veče.",
  },
  hero: {
    eyebrow: "Beograd · Novi Sad · cela Srbija",
    title: "Snimanje i fotografisanje",
    accent: "venčanja.",
    sub:
      "Vaš dan, onako kako je bio. Snimamo i fotografišemo venčanja i svadbe, a isti tim radi oboje, pa ne morate da usklađujete dve ekipe koje se ne poznaju. Nekoliko kadrova dobijate isto veče, film i fotografije u roku koji piše u ugovoru.",
    cta: "Proverite da li smo slobodni",
    ctaDrugi: "060 5973212",
    oznake: ["Video i fotografija", "Dron", "Registrovana firma"],
    poster: "/svadbe/poster.webp",
  },
  film: {
    eyebrow: "Film",
    title: "Ovako to",
    accent: "izgleda.",
    p: "Snimak sa jednog venčanja. Pustite sa zvukom, muzika je pola utiska.",
    src: "/svadbe/film.mp4",
    poster: "/svadbe/poster.webp",
    dugme: "Pustite film · sa zvukom",
  },
  dobijate: {
    eyebrow: "Šta dobijate",
    title: "Snimatelj i fotograf za",
    accent: "venčanje.",
    p:
      "Većina parova uzme oboje. Ispadne jeftinije nego dva odvojena angažmana, a na sam dan se snimatelj i fotograf ne sudaraju oko istog kadra.",
    kolone: [
      {
        h: "Video",
        p: "Kratki film sa celog dana, spreman za deljenje.",
        list: [
          "Duža verzija sa ceremonijom i govorima",
          "Vertikalni isečak za Instagram i TikTok",
          "Snimci iz vazduha dronom, ako lokacija dozvoljava",
          "Dve kamere na ceremoniji i prvom plesu",
          "Čist ton govora, ne muzika preko svega",
        ],
      },
      {
        h: "Fotografija",
        p: "Obrađene fotografije sa celog dana.",
        list: [
          "Priprema, ceremonija, portreti, slavlje",
          "Galerija na linku koji šaljete gostima",
          "Nekoliko kadrova isti dan, za objavu",
          "Fajlovi u punoj rezoluciji, bez vodenog žiga",
          "Priprema za album ako ga radite",
        ],
      },
    ],
  },
  galerija: {
    eyebrow: "Iz filma",
    title: "Zaustavljeni",
    accent: "kadrovi.",
    p:
      "Nisu fotografije nego frejmovi iz snimka iznad, ali se po njima vidi kako radimo svetlo i kompoziciju.",
    slike: [
      "/svadbe/s1.webp",
      "/svadbe/s2.webp",
      "/svadbe/s3.webp",
      "/svadbe/s4.webp",
      "/svadbe/s5.webp",
      "/svadbe/s6.webp",
    ],
  },
  koraci: {
    eyebrow: "Kako ide",
    title: "Od poziva do",
    accent: "isporuke.",
    p: "Tri koraka, i nijedan vas ne prekida na sam dan.",
    steps: [
      {
        h: "Provera termina",
        p: "Javite datum i mesto. Isti dan kažemo da li smo slobodni i koliko košta. Cena je jedna i piše šta ulazi u nju.",
      },
      {
        h: "Dogovor pre dana",
        p: "Prođemo raspored i lokacije. Pitamo ko su vam ključni ljudi da ih ne promašimo. Na dan venčanja već znamo gde treba da stojimo.",
      },
      {
        h: "Snimanje i isporuka",
        p: "Ne režiramo vam dan i ne prekidamo ga zbog kadra. Par kadrova dobijate isto veče, ostalo u roku iz ugovora.",
      },
    ],
  },
  paketi: {
    eyebrow: "Paketi",
    title: "Izaberite",
    accent: "obim.",
    p: "Cena zavisi od datuma, lokacije i koliko dugo ostajemo. Javite termin, cifru dobijate istog dana.",
    items: [
      {
        h: "Film",
        p: "Samo video.",
        list: [
          "Kratki film sa celog dana",
          "Duža verzija ceremonije",
          "Vertikalni isečak za mreže",
          "Dron ako lokacija dozvoljava",
          "Dve kamere na ceremoniji",
        ],
      },
      {
        h: "Film i foto",
        p: "Video i fotografija, jedna ekipa.",
        list: [
          "Sve iz paketa Film",
          "Obrađene fotografije sa celog dana",
          "Galerija na linku za goste",
          "Nekoliko kadrova isti dan",
          "Fajlovi u punoj rezoluciji",
          "Jedan dogovor umesto dva",
        ],
      },
      {
        h: "Ceo dan",
        p: "Od priprema do kraja slavlja.",
        list: [
          "Sve iz paketa Film i foto",
          "Pokrivene pripreme kod oboje",
          "Ostajemo do kraja slavlja",
          "Zasebno snimanje portreta",
          "Veći tim na terenu",
          "Priprema za album",
        ],
      },
    ],
    note:
      "U svakom paketu: ugovor i račun · snimljeni materijal ostaje vaš · rezervacija termina uz kaparu.",
  },
  kraj: {
    eyebrow: "Provera termina",
    title: "Recite datum i mesto, pa",
    accent: "dalje.",
    p:
      "Subote u sezoni odu prve. Zato prvo proveravamo da li je vaš datum slobodan, pa onda pričamo o svemu ostalom.",
  },
  pitanja: {
    eyebrow: "Pitanja",
    title: "Ono što nas parovi najčešće",
    accent: "pitaju.",
    p: "Ako nešto nije ovde, pišite na WhatsApp ili pozovite.",
    items: [
      {
        q: "Koliko košta snimanje venčanja?",
        a: "Zavisi od datuma, lokacije i koliko dugo ostajemo. Javite datum i mesto, cifru dobijate istog dana. Cena je jedna i piše šta ulazi u nju.",
      },
      {
        q: "Da li snimate svadbe u Novom Sadu i van Beograda?",
        a: "Da, radimo u Beogradu, Novom Sadu i celoj Srbiji. Javite mesto i u ponudi piše sve, zajedno sa putem ako ga ima.",
      },
      {
        q: "Da li radite i video i fotografiju?",
        a: "Da, isti tim radi oboje. Većina parova uzme oboje, jer ispadne jeftinije od dva odvojena angažmana.",
      },
      {
        q: "Da li snimate dronom?",
        a: "Da, kad lokacija i propisi dozvoljavaju. Snimci iz vazduha ulaze u film.",
      },
      {
        q: "Kada dobijamo film i fotografije?",
        a: "Nekoliko kadrova isto veče, za objavu. Film i fotografije u roku koji piše u ugovoru.",
      },
      {
        q: "Kako se rezerviše termin?",
        a: "Prvo proverimo da li je datum slobodan, pa se termin drži uz kaparu i ugovor.",
      },
    ],
  },
  uslugeIzbor: ["Video", "Video i fotografija", "Samo fotografija", "Još ne znamo"],
  forma: "datum",
  whatsapp: "Zdravo, pišem sa sajta. Zanima me snimanje venčanja. Datum i mesto: ",
};

const en: Kampanja = {
  slug: "svadbe",
  meta: {
    title: "Wedding videographer and photographer, Belgrade | Popzify",
    description:
      "One team shoots both video and stills, so you never have to coordinate two crews. A few frames the same evening, the film and photos within the deadline in the contract. Belgrade and all of Serbia.",
  },
  hero: {
    eyebrow: "Belgrade · Novi Sad · all of Serbia",
    title: "Wedding filming and",
    accent: "photography.",
    sub:
      "Your day, the way it was. We film and photograph weddings, and the same team does both, so you never have to coordinate two crews who have never met. You get a few frames the same evening, the film and the photos within the deadline written into the contract.",
    cta: "Check if we are free",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Video and stills", "Drone", "Registered company"],
    poster: "/svadbe/poster.webp",
  },
  film: {
    eyebrow: "The film",
    title: "This is what it",
    accent: "looks like.",
    p: "A film from one wedding. Play it with sound — the music is half of it.",
    src: "/svadbe/film.mp4",
    poster: "/svadbe/poster.webp",
    dugme: "Play the film · with sound",
  },
  dobijate: {
    eyebrow: "What you get",
    title: "A videographer and photographer for your",
    accent: "wedding.",
    p:
      "Most couples take both. It works out cheaper than two separate bookings, and on the day the videographer and the photographer are not fighting over the same frame.",
    kolone: [
      {
        h: "Video",
        p: "A short film of the whole day, ready to share.",
        list: [
          "A longer cut with the ceremony and the speeches",
          "A vertical cut for Instagram and TikTok",
          "Aerial footage, where the location allows it",
          "Two cameras on the ceremony and the first dance",
          "Clean speech audio, not music over everything",
        ],
      },
      {
        h: "Photography",
        p: "Edited photographs from the whole day.",
        list: [
          "Preparations, ceremony, portraits, the party",
          "A gallery on a link you send to guests",
          "A few frames the same day, ready to post",
          "Full-resolution files, no watermark",
          "Album prep if you are making one",
        ],
      },
    ],
  },
  galerija: {
    eyebrow: "From the film",
    title: "Frozen",
    accent: "frames.",
    p:
      "These are not photographs but frames from the film above — they still show how we handle light and composition.",
    slike: [
      "/svadbe/s1.webp",
      "/svadbe/s2.webp",
      "/svadbe/s3.webp",
      "/svadbe/s4.webp",
      "/svadbe/s5.webp",
      "/svadbe/s6.webp",
    ],
  },
  koraci: {
    eyebrow: "How it goes",
    title: "From the call to",
    accent: "delivery.",
    p: "Three steps, and none of them interrupts the day itself.",
    steps: [
      {
        h: "Checking the date",
        p: "Send us the date and the venue. The same day we tell you whether we are free and what it costs. One price, and it says what is included.",
      },
      {
        h: "The talk before",
        p: "We go through the schedule and the locations, and ask who the key people are so we do not miss them. On the day we already know where to stand.",
      },
      {
        h: "Shooting and delivery",
        p: "We do not direct your day and we do not stop it for a shot. A few frames arrive the same evening, the rest within the deadline in the contract.",
      },
    ],
  },
  paketi: {
    eyebrow: "Packages",
    title: "Choose the",
    accent: "scope.",
    p: "The price depends on the date, the location and how long we stay. Send us the date and you have a figure the same day.",
    items: [
      {
        h: "Film",
        p: "Video only.",
        list: [
          "A short film of the whole day",
          "A longer cut of the ceremony",
          "A vertical cut for social",
          "Drone where the location allows",
          "Two cameras on the ceremony",
        ],
      },
      {
        h: "Film and photos",
        p: "Video and stills, one team.",
        list: [
          "Everything in Film",
          "Edited photographs from the whole day",
          "A gallery on a link for guests",
          "A few frames the same day",
          "Full-resolution files",
          "One booking instead of two",
        ],
      },
      {
        h: "The whole day",
        p: "From the preparations to the end of the party.",
        list: [
          "Everything in Film and photos",
          "Preparations covered at both homes",
          "We stay to the end of the party",
          "A separate portrait session",
          "A larger crew on location",
          "Album prep",
        ],
      },
    ],
    note:
      "In every package: contract and invoice · the footage stays yours · the date is held with a deposit.",
  },
  kraj: {
    eyebrow: "Checking the date",
    title: "Tell us the date and the venue, then the",
    accent: "rest.",
    p: "Saturdays in season go first. So we check whether your date is free before talking about anything else.",
  },
  pitanja: {
    eyebrow: "Questions",
    title: "What couples ask us",
    accent: "most.",
    p: "If your question is not here, message us on WhatsApp or call.",
    items: [
      {
        q: "How much does wedding filming cost?",
        a: "It depends on the date, the venue and how long we stay. Send us the date and venue and you have a figure the same day. One price, and it says what is included.",
      },
      {
        q: "Do you film weddings in Novi Sad and outside Belgrade?",
        a: "Yes, we work in Belgrade, Novi Sad and across Serbia. Tell us the venue and the quote covers everything, including travel if there is any.",
      },
      {
        q: "Do you do both video and photos?",
        a: "Yes, the same team does both. Most couples take both, because it works out cheaper than two separate bookings.",
      },
      {
        q: "Do you film with a drone?",
        a: "Yes, where the venue and the rules allow it. The aerial shots go into the film.",
      },
      {
        q: "When do we get the film and the photos?",
        a: "A few frames the same evening, ready to post. The film and the photos within the deadline in the contract.",
      },
      {
        q: "How do we book the date?",
        a: "First we check that the date is free, then it is held with a deposit and a contract.",
      },
    ],
  },
  uslugeIzbor: ["Video", "Video and photos", "Photos only", "Not sure yet"],
  forma: "datum",
  whatsapp: "Hi, I am writing from your website. I would like our wedding filmed. Date and venue: ",
};

const ru: Kampanja = {
  slug: "svadbe",
  meta: {
    title: "Видеограф и фотограф на свадьбу в Белграде | Popzify",
    description:
      "Видео- и фотосъёмка свадеб в Белграде, Нови-Саде и по всей Сербии. Видео и фото делает одна команда, с дроном и двумя камерами на церемонии. Первые кадры — в тот же вечер.",
  },
  hero: {
    eyebrow: "Белград · Нови-Сад · вся Сербия",
    title: "Видео- и фотосъёмка",
    accent: "свадеб.",
    sub:
      "Ваш день — таким, каким он был. Мы снимаем и фотографируем свадьбы, и всё делает одна команда, так что вам не придётся согласовывать две незнакомые друг с другом группы. Несколько кадров вы получите в тот же вечер, фильм и фотографии — в срок, прописанный в договоре.",
    cta: "Проверить свободную дату",
    ctaDrugi: "+381 60 5973212",
    oznake: ["Видео и фото", "Дрон", "Зарегистрированная компания"],
    poster: "/svadbe/poster.webp",
  },
  film: {
    eyebrow: "Фильм",
    title: "Вот как это",
    accent: "выглядит.",
    p: "Фильм с одной свадьбы. Включите звук — музыка здесь половина впечатления.",
    src: "/svadbe/film.mp4",
    poster: "/svadbe/poster.webp",
    dugme: "Смотреть фильм · со звуком",
  },
  dobijate: {
    eyebrow: "Что вы получаете",
    title: "Видеограф и фотограф на",
    accent: "свадьбу.",
    p:
      "Большинство пар берут и то и другое. Это выходит дешевле, чем два отдельных подрядчика, а в сам день видеограф и фотограф не толкаются за один и тот же кадр.",
    kolone: [
      {
        h: "Видео",
        p: "Короткий фильм обо всём дне, который не стыдно показать.",
        list: [
          "Длинная версия с церемонией и речами",
          "Вертикальная нарезка для Instagram и TikTok",
          "Съёмка с дрона, если площадка позволяет",
          "Две камеры на церемонии и первом танце",
          "Чистый звук речей, а не музыка поверх всего",
        ],
      },
      {
        h: "Фото",
        p: "Обработанные фотографии со всего дня.",
        list: [
          "Сборы, церемония, портреты, праздник",
          "Галерея по ссылке, которую можно отправить гостям",
          "Несколько кадров в тот же день — для публикации",
          "Файлы в полном разрешении, без водяных знаков",
          "Подготовка к альбому, если вы его делаете",
        ],
      },
    ],
  },
  galerija: {
    eyebrow: "Из фильма",
    title: "Застывшие",
    accent: "кадры.",
    p:
      "Это не фотографии, а кадры из фильма выше, но по ним видно, как мы работаем со светом и композицией.",
    slike: [
      "/svadbe/s1.webp",
      "/svadbe/s2.webp",
      "/svadbe/s3.webp",
      "/svadbe/s4.webp",
      "/svadbe/s5.webp",
      "/svadbe/s6.webp",
    ],
  },
  koraci: {
    eyebrow: "Как это работает",
    title: "От звонка до",
    accent: "результата.",
    p: "Три шага, и ни один не отвлекает вас в сам день.",
    steps: [
      {
        h: "Проверка даты",
        p: "Напишите дату и место. В тот же день скажем, свободны ли мы и сколько это стоит. Цена одна, и в ней прописано, что входит.",
      },
      {
        h: "Обсуждение заранее",
        p: "Проходим тайминг и локации, спрашиваем, кто для вас самые важные люди, чтобы их не пропустить. В день свадьбы мы уже знаем, где встать.",
      },
      {
        h: "Съёмка и сдача",
        p: "Мы не режиссируем ваш день и не останавливаем его ради кадра. Несколько кадров — в тот же вечер, остальное — в срок по договору.",
      },
    ],
  },
  paketi: {
    eyebrow: "Пакеты",
    title: "Выберите",
    accent: "формат.",
    p: "Цена зависит от даты, места и того, как долго мы остаёмся. Напишите дату — стоимость назовём в тот же день.",
    items: [
      {
        h: "Фильм",
        p: "Только видео.",
        list: [
          "Короткий фильм обо всём дне",
          "Длинная версия церемонии",
          "Вертикальная нарезка для соцсетей",
          "Дрон, если площадка позволяет",
          "Две камеры на церемонии",
        ],
      },
      {
        h: "Фильм и фото",
        p: "Видео и фото, одна команда.",
        list: [
          "Всё из пакета «Фильм»",
          "Обработанные фотографии со всего дня",
          "Галерея по ссылке для гостей",
          "Несколько кадров в тот же день",
          "Файлы в полном разрешении",
          "Один договор вместо двух",
        ],
      },
      {
        h: "Весь день",
        p: "От сборов до конца праздника.",
        list: [
          "Всё из пакета «Фильм и фото»",
          "Сборы у жениха и у невесты",
          "Остаёмся до конца праздника",
          "Отдельная портретная съёмка",
          "Расширенная команда на площадке",
          "Подготовка к альбому",
        ],
      },
    ],
    note:
      "В каждом пакете: договор и счёт · отснятый материал остаётся у вас · дата бронируется по предоплате.",
  },
  pitanja: {
    eyebrow: "Вопросы",
    title: "Что пары спрашивают",
    accent: "чаще всего.",
    p: "Если вашего вопроса здесь нет — напишите в WhatsApp или позвоните.",
    items: [
      {
        q: "Сколько стоит съёмка свадьбы?",
        a: "Зависит от даты, места и того, как долго мы остаёмся. Напишите дату и место — стоимость назовём в тот же день. Цена одна, и в ней прописано, что входит.",
      },
      {
        q: "Вы снимаете свадьбы в Нови-Саде и за пределами Белграда?",
        a: "Да, работаем в Белграде, Нови-Саде и по всей Сербии. Укажите место — в предложении будет всё, включая дорогу, если она нужна.",
      },
      {
        q: "Вы делаете и видео, и фото?",
        a: "Да, всё делает одна команда. Большинство пар берут и то и другое — это выходит дешевле двух отдельных подрядчиков.",
      },
      {
        q: "Вы снимаете с дрона?",
        a: "Да, если площадка и правила это позволяют. Кадры с высоты входят в фильм.",
      },
      {
        q: "Когда мы получим фильм и фотографии?",
        a: "Несколько кадров — в тот же вечер, чтобы сразу выложить. Фильм и фотографии — в срок, прописанный в договоре.",
      },
      {
        q: "Как забронировать дату?",
        a: "Сначала проверяем, свободна ли дата, затем бронируем её по предоплате и договору.",
      },
    ],
  },
  kraj: {
    eyebrow: "Проверка даты",
    title: "Назовите дату и место. Остальное —",
    accent: "потом.",
    p:
      "Субботы в сезоне разбирают первыми. Поэтому сначала проверяем, свободна ли ваша дата, а уже потом обсуждаем всё остальное.",
  },
  uslugeIzbor: ["Видео", "Видео и фото", "Только фото", "Пока не решили"],
  forma: "datum",
  whatsapp: "Здравствуйте! Пишу с сайта. Интересует съёмка свадьбы. Дата и место: ",
};

export const svadbe = { sr, en, ru };
