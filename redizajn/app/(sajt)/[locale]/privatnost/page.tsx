import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLocale, locales, verzije, type Locale } from "@/lib/i18n";
import Jezici from "@/components/Jezici";
import {
  privatnost,
  azurirano,
  firma,
  pikselOdeljak,
  kolaciciSaPikselom,
  analitikaOdeljak,
  kolaciciSaAnalitikom,
} from "@/lib/privatnost";
import { imaPiksel } from "@/lib/piksel";
import { imaAnalitiku } from "@/lib/analitika";
import styles from "./privatnost.module.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = privatnost[locale];
  return {
    title: `${t.title} — Popzify`,
    description: t.intro,
    alternates: verzije(locale, "/privatnost"),
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = privatnost[locale as Locale];
  const ui = dict[locale as Locale].ui;

  // Piksel se pominje samo kad stvarno postoji, da tekst ne tvrdi
  // nesto sto se ne desava — ni u jednom ni u drugom smeru.
  // Odeljak o kolacicima dobija po jednu recenicu za svaki alat koji je
  // stvarno ukljucen, pa tekst ne tvrdi nista unapred ni u jednom smeru.
  const dopune = [
    imaPiksel ? kolaciciSaPikselom[locale as Locale] : null,
    imaAnalitiku ? kolaciciSaAnalitikom[locale as Locale] : null,
  ].filter((x): x is string => x !== null);

  const naslovKolacica = privatnost[locale as Locale].sections[5].h;
  const sekcije = dopune.length
    ? t.sections.map((s) => (s.h === naslovKolacica ? { ...s, p: [...s.p, ...dopune] } : s))
    : t.sections;

  const dodatni = [
    imaPiksel ? pikselOdeljak[locale as Locale] : null,
    imaAnalitiku ? analitikaOdeljak[locale as Locale] : null,
  ].filter((x): x is (typeof pikselOdeljak)[Locale] => x !== null);

  const sve = dodatni.length
    ? [...sekcije.slice(0, 6), ...dodatni, ...sekcije.slice(6)]
    : sekcije;

  return (
    <main className={styles.page}>
      <header className={styles.top}>
        <a className={styles.brand} href={`/${locale}`}>
          <b>Pop</b>zify
        </a>
        <nav className={styles.nav}>
          <a className="mono" href={`/${locale}`}>
            {ui.nazad}
          </a>
          <Jezici locale={locale as Locale} putanja="/privatnost" className="mono" />
        </nav>
      </header>

      <article className={styles.doc}>
        <p className="mono">{`${ui.azurirano} ${azurirano[locale as Locale]}`}</p>
        <h1 className="display">{t.title}</h1>
        <p className="lead">{t.intro}</p>

        {sve.map((s) => (
          <section key={s.h} className={styles.block}>
            <h2>{s.h}</h2>
            {s.p.map((line) => (
              <p key={line}>{line}</p>
            ))}
            {s.list && (
              <ul>
                {s.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}

        <p className={styles.foot}>
          <a href={`mailto:${firma.email}`}>{firma.email}</a> ·{" "}
          <a href={`tel:${firma.telefonIntl}`}>{firma.telefon}</a>
        </p>
      </article>
    </main>
  );
}
