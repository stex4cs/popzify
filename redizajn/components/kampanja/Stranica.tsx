import { dict, type Locale } from "@/lib/i18n";
import type { Kampanja } from "@/lib/kampanje";
import { firma } from "@/lib/privatnost";
import ContactForm from "../ContactForm";
import Klipovi from "./Klipovi";
import styles from "./kampanja.module.css";

/**
 * Kampanjska strana.
 *
 * Isti jezik kao ostatak sajta — vizir, tipografija, paleta — ali bez
 * 3D sveta. Ove strane primaju placen saobracaj sa telefona, gde se
 * dvanaest megabajta scene ne isplati ni na jednom upitu.
 */
export default function Stranica({ k, locale }: { k: Kampanja; locale: Locale }) {
  const t = dict[locale];

  return (
    <main className={styles.page}>
      <span className="corner tl" />
      <span className="corner tr" />

      <header className={styles.top}>
        <a className={styles.brand} href={`/${locale}`}>
          <b>Pop</b>zify
        </a>
        <div className={styles.topDesno}>
          <a className={`mono ${styles.tel}`} href={`tel:${firma.telefonIntl}`}>
            {k.hero.ctaDrugi}
          </a>
          <a
            className="mono"
            href={`/${locale === "sr" ? "en" : "sr"}/${k.slug}`}
            hrefLang={locale === "sr" ? "en" : "sr"}
          >
            {t.nav.other}
          </a>
        </div>
      </header>

      {/* ---------- uvod ---------- */}
      <section className={styles.hero}>
        <p className="mono">{k.hero.eyebrow}</p>
        <h1 className="display">
          {k.hero.title} <em className="outline">{k.hero.accent}</em>
        </h1>
        <p className="lead">{k.hero.sub}</p>
        <div className={styles.akcije}>
          <a className={styles.primarno} href="#upit">
            {k.hero.cta}
          </a>
          <a className={styles.sporedno} href={`tel:${firma.telefonIntl}`}>
            {k.hero.ctaDrugi}
          </a>
        </div>
        <ul className={`${styles.oznake} mono`}>
          {k.hero.oznake.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
      </section>

      {/* ---------- primeri ---------- */}
      <section className={styles.sekcija}>
        <p className="mono">{k.klipovi.eyebrow}</p>
        <h2 className="display">
          {k.klipovi.title} <em className="outline">{k.klipovi.accent}</em>
        </h2>
        <p className="lead">{k.klipovi.p}</p>
        <Klipovi locale={locale} />
      </section>

      {/* ---------- sta te muci ---------- */}
      <section className={styles.sekcija}>
        <p className="mono">{k.bol.eyebrow}</p>
        <h2 className="display">
          {k.bol.title} <em className="outline">{k.bol.accent}</em>
        </h2>
        <p className="lead">{k.bol.intro}</p>
        <ul className={styles.mreza}>
          {k.bol.items.map((i) => (
            <li key={i.h}>
              <h3>{i.h}</h3>
              <p>{i.p}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- kako ide ---------- */}
      <section className={styles.sekcija}>
        <p className="mono">{k.koraci.eyebrow}</p>
        <h2 className="display">
          {k.koraci.title} <em className="outline">{k.koraci.accent}</em>
        </h2>
        <p className="lead">{k.koraci.p}</p>
        <ol className={styles.koraci}>
          {k.koraci.steps.map((s, i) => (
            <li key={s.h}>
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ---------- paketi ---------- */}
      <section className={styles.sekcija}>
        <p className="mono">{k.paketi.eyebrow}</p>
        <h2 className="display">
          {k.paketi.title} <em className="outline">{k.paketi.accent}</em>
        </h2>
        <p className="lead">{k.paketi.p}</p>
        <ul className={styles.paketi}>
          {k.paketi.items.map((pkg) => (
            <li key={pkg.h}>
              <h3>{pkg.h}</h3>
              <p>{pkg.p}</p>
              <ul>
                {pkg.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <p className={`${styles.napomena} mono`}>{k.paketi.note}</p>
      </section>

      {/* ---------- upit ---------- */}
      <section id="upit" className={`${styles.sekcija} ${styles.upit}`}>
        <p className="mono">{k.kraj.eyebrow}</p>
        <h2 className="display">
          {k.kraj.title} <em className="outline">{k.kraj.accent}</em>
        </h2>
        <p className="lead">{k.kraj.p}</p>
        <ContactForm locale={locale} stranica={k.slug} prosireno />
      </section>

      <footer className={styles.foot}>
        <ul className={styles.veze}>
          <li>
            <a href={`mailto:${firma.email}`}>{firma.email}</a>
          </li>
          <li>
            <a href={`tel:${firma.telefonIntl}`}>{firma.telefon}</a>
          </li>
          <li>
            <a href="https://www.instagram.com/lolipopz.bif/" rel="me noopener" target="_blank">
              @lolipopz.bif
            </a>
          </li>
        </ul>
        <p className="mono">
          {firma.ime} · PIB {firma.pib} · MB {firma.mb} · {firma.sediste} ·{" "}
          <a href={`/${locale}/privatnost`}>
            {locale === "sr" ? "Politika privatnosti" : "Privacy policy"}
          </a>
        </p>
      </footer>
    </main>
  );
}
