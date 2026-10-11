import { type Locale } from "@/lib/i18n";
import { radovi } from "@/lib/radovi";
import { Zaglavlje, Podnozje } from "../Okvir";
import Pozadina3D from "./Pozadina3D";
import styles from "./radovi.module.css";

const TEKST = {
  sr: {
    eyebrow: "Radovi",
    title: "Sajtovi koje smo",
    accent: "napravili.",
    p: "Svaki se otvara uživo, ne kao slika. Klikni na projekat i vidi kako je rešen.",
    otvori: "Otvori sajt",
    vidi: "Vidi projekat",
  },
  en: {
    eyebrow: "Work",
    title: "Sites we have",
    accent: "built.",
    p: "Every one opens live, not as a picture. Click a project to see how it was solved.",
    otvori: "Open the site",
    vidi: "See the project",
  },
} as const;

export default function Spisak({ locale }: { locale: Locale }) {
  const t = TEKST[locale];

  return (
    <main className={styles.page}>
      <Pozadina3D />
      <span className="corner tl" />
      <span className="corner tr" />

      <Zaglavlje locale={locale} drugiJezik={`/${locale === "sr" ? "en" : "sr"}/radovi`} />

      <section className={styles.uvod}>
        <p className="mono">{t.eyebrow}</p>
        <h1 className="display">
          {t.title} <em className="outline">{t.accent}</em>
        </h1>
        <p className="lead">{t.p}</p>
      </section>

      <ul className={styles.spisak}>
        {radovi.map((r) => {
          const rad = r[locale];
          return (
            <li key={rad.slug}>
              <a href={`/${locale}/radovi/${rad.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/radovi-sajt/${rad.slug}/main.webp`}
                  alt={rad.ime}
                  loading="lazy"
                  decoding="async"
                />
                <div className={styles.opis}>
                  <p className="mono">
                    {rad.grana} · {rad.godina}
                  </p>
                  <h2>{rad.ime}</h2>
                  <p>{rad.lead}</p>
                  <span className={`mono ${styles.vidi}`}>{t.vidi}</span>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      <Podnozje locale={locale} />
    </main>
  );
}
