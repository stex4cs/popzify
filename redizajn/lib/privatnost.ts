import type { Locale } from "./i18n";

/**
 * Politika privatnosti.
 *
 * Pisana je po onome sto sajt stvarno radi, ne po sablonu. Stara verzija
 * na popzify.com/privacypolicy je nabrajala naloge, pretplate na bilten
 * i podatke o placanju kojih ovde nema, a u delu za kontakt je nosila
 * tudju adresu i broj telefona iz sablona.
 *
 * Kad kampanjske strane dobiju Meta piksel, ovde mora da se doda odeljak
 * o njemu — pre nego sto piksel prvi put opali.
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

export const azurirano = "10. oktobar 2026.";

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
          "Ono što sam upišeš u formu: ime i prezime, broj telefona, e-mail ako ga ostaviš, šta snimamo i poruku.",
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
          "What you type into the form: your name, phone number, email if you leave one, what we are shooting, and your message.",
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
};
