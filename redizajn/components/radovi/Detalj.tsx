import { type Locale } from "@/lib/i18n";
import { radovi, type Rad } from "@/lib/radovi";
import { Zaglavlje, Podnozje } from "../Okvir";
import Pozadina3D from "./Pozadina3D";
import styles from "./radovi.module.css";

const TEKST = {
  sr: {
    nazad: "Svi radovi",
    otvori: "Otvori sajt",
    pregled: "Pregled projekta",
    izazov: "Izazov",
    resenje: "Rešenje",
    ukratko: "Ukratko",
    galerija: "Galerija",
    grana: "Grana",
    obim: "Obim posla",
    godina: "Godina",
    dalje: "Sledeći rad",
    cta: "Treba vam ovakav sajt?",
    ctaP: "Javite se i vraćamo se sa planom, rokom i cenom u roku od 24 sata.",
    ctaDugme: "Pošalji upit",
  },
  en: {
    nazad: "All work",
    otvori: "Open the site",
    pregled: "Overview",
    izazov: "The challenge",
    resenje: "The solution",
    ukratko: "At a glance",
    galerija: "Gallery",
    grana: "Industry",
    obim: "Scope",
    godina: "Year",
    dalje: "Next project",
    cta: "Need a site like this?",
    ctaP: "Get in touch and we come back with a plan, a timeline and a price within 24 hours.",
    ctaDugme: "Send an enquiry",
  },
} as const;

export default function Detalj({ rad, locale }: { rad: Rad; locale: Locale }) {
  const t = TEKST[locale];
  const i = radovi.findIndex((r) => r.sr.slug === rad.slug);
  const sledeci = radovi[(i + 1) % radovi.length][locale];

  return (
    <main className={styles.page}>
      <Pozadina3D />
      <span className="corner tl" />
      <span className="corner tr" />

      <Zaglavlje
        locale={locale}
        drugiJezik={`/${locale === "sr" ? "en" : "sr"}/radovi/${rad.slug}`}
      />

      <article>
        <section className={styles.uvod}>
          <p className="mono">
            <a href={`/${locale}/radovi`}>← {t.nazad}</a>
          </p>
          <h1 className="display">{rad.ime}</h1>
          <p className="lead">{rad.lead}</p>
          <a className={styles.dugme} href={rad.url} target="_blank" rel="noopener">
            {t.otvori} ↗
          </a>

          <dl className={styles.meta}>
            <div>
              <dt className="mono">{t.grana}</dt>
              <dd>{rad.grana}</dd>
            </div>
            <div>
              <dt className="mono">{t.obim}</dt>
              <dd>{rad.obim}</dd>
            </div>
            <div>
              <dt className="mono">{t.godina}</dt>
              <dd>{rad.godina}</dd>
            </div>
          </dl>
        </section>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.glavna}
          src={`/radovi-sajt/${rad.slug}/main.webp`}
          alt={rad.ime}
          decoding="async"
        />

        <section className={styles.sekcija}>
          <p className="mono">{t.pregled}</p>
          <p className={styles.vodeci}>{rad.pregled}</p>
        </section>

        <section className={styles.sekcija}>
          <p className="mono">{t.izazov}</p>
          <p className={styles.vodeci}>{rad.izazovUvod}</p>
          <ul className={styles.tacke}>
            {rad.izazov.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </section>

        <section className={styles.sekcija}>
          <p className="mono">{t.resenje}</p>
          <div className={styles.blokovi}>
            {rad.resenje.map((b) => (
              <div key={b.h}>
                <h2>{b.h}</h2>
                <p>{b.p}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.sekcija}>
          <p className="mono">{t.ukratko}</p>
          {/* Samo cinjenice o samom sajtu — broj jezika, koraka, usluga.
              Nikad izmisljeni poslovni rezultati. */}
          <ul className={styles.ukratko}>
            {rad.ukratko.map((u) => (
              <li key={u.sta}>
                <strong className="display">{u.broj}</strong>
                <span>{u.sta}</span>
              </li>
            ))}
          </ul>
        </section>

        {rad.slike.length > 1 && (
          <section className={styles.sekcija}>
            <p className="mono">{t.galerija}</p>
            <ul className={styles.galerija}>
              {rad.slike
                .filter((s) => s !== "main")
                .map((s) => (
                  <li key={s} data-usko={s === "mobile" || undefined}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/radovi-sajt/${rad.slug}/${s}.webp`}
                      alt={`${rad.ime} — ${s}`}
                      loading="lazy"
                      decoding="async"
                    />
                  </li>
                ))}
            </ul>
          </section>
        )}

        <section className={`${styles.sekcija} ${styles.kraj}`}>
          <h2 className="display">{t.cta}</h2>
          <p className="lead">{t.ctaP}</p>
          <div className={styles.krajAkcije}>
            <a className={styles.dugme} href={`/${locale}/marketing#upit`}>
              {t.ctaDugme}
            </a>
            <a className={styles.dugmeTiho} href={`/${locale}/radovi/${sledeci.slug}`}>
              {t.dalje}: {sledeci.ime} →
            </a>
          </div>
        </section>
      </article>

      <Podnozje locale={locale} />
    </main>
  );
}
