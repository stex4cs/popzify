import { dict, type Locale } from "@/lib/i18n";
import type { Kampanja } from "@/lib/kampanje";
import { firma } from "@/lib/privatnost";
import ContactForm from "../ContactForm";
import Klipovi from "./Klipovi";
import Film from "./Film";
import Piksel from "../Piksel";
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
      <Piksel />
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
      {k.hero.poster && (
        <div
          className={styles.heroSlika}
          style={{ backgroundImage: `url(${k.hero.poster})` }}
          aria-hidden="true"
        />
      )}

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

      {/* ---------- brendovi ---------- */}
      {k.partneri && (
        <section className={styles.partneri} aria-label={k.partneri.naslov}>
          <p className="mono">{k.partneri.naslov}</p>
          <ul>
            {k.partneri.slike.map((o) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <li key={o.src}>
                <img src={o.src} alt={o.ime} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- film ---------- */}
      {k.film && (
        <section className={styles.sekcija}>
          <p className="mono">{k.film.eyebrow}</p>
          <h2 className="display">
            {k.film.title} <em className="outline">{k.film.accent}</em>
          </h2>
          <p className="lead">{k.film.p}</p>
          <Film
            src={k.film.src}
            poster={k.film.poster}
            dugme={k.film.dugme}
            naslov={`${k.film.title} ${k.film.accent}`}
          />
        </section>
      )}

      {/* ---------- primeri ---------- */}
      {k.klipovi && (
        <section className={styles.sekcija}>
          <p className="mono">{k.klipovi.eyebrow}</p>
          <h2 className="display">
            {k.klipovi.title} <em className="outline">{k.klipovi.accent}</em>
          </h2>
          <p className="lead">{k.klipovi.p}</p>
          <Klipovi locale={locale} />
        </section>
      )}

      {/* ---------- sta ulazi u posao ---------- */}
      {k.dobijate && (
        <section className={styles.sekcija}>
          <p className="mono">{k.dobijate.eyebrow}</p>
          <h2 className="display">
            {k.dobijate.title} <em className="outline">{k.dobijate.accent}</em>
          </h2>
          <p className="lead">{k.dobijate.p}</p>
          <ul className={styles.paketi}>
            {k.dobijate.kolone.map((kol) => (
              <li key={kol.h}>
                <h3>{kol.h}</h3>
                <p>{kol.p}</p>
                <ul>
                  {kol.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- zaustavljeni kadrovi ---------- */}
      {k.galerija && (
        <section className={styles.sekcija}>
          <p className="mono">{k.galerija.eyebrow}</p>
          <h2 className="display">
            {k.galerija.title} <em className="outline">{k.galerija.accent}</em>
          </h2>
          <p className="lead">{k.galerija.p}</p>
          <ul className={styles.galerija}>
            {k.galerija.slike.map((src) => (
              <li key={src}>
                {/* Obicna slika: Next bi je optimizovao, ali je vec
                    pripremljena u pravoj velicini i formatu. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- sta te muci ---------- */}
      {k.bol && (
        <section className={styles.sekcija}>
          <p className="mono">{k.bol.eyebrow}</p>
          <h2 className="display">
            {k.bol.title} <em className="outline">{k.bol.accent}</em>
          </h2>
          <p className="lead">{k.bol.p}</p>
          <ul className={styles.mreza}>
            {k.bol.items.map((i) => (
              <li key={i.h}>
                <h3>{i.h}</h3>
                <p>{i.p}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- sta radimo ---------- */}
      {k.usluge && (
        <section className={styles.sekcija}>
          <p className="mono">{k.usluge.eyebrow}</p>
          <h2 className="display">
            {k.usluge.title} <em className="outline">{k.usluge.accent}</em>
          </h2>
          <p className="lead">{k.usluge.p}</p>
          <ul className={styles.mreza}>
            {k.usluge.items.map((i) => (
              <li key={i.h}>
                <h3>{i.h}</h3>
                <p>{i.p}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- radovi ---------- */}
      {k.radovi && (
        <section className={styles.sekcija}>
          <p className="mono">{k.radovi.eyebrow}</p>
          <h2 className="display">
            {k.radovi.title} <em className="outline">{k.radovi.accent}</em>
          </h2>
          <p className="lead">{k.radovi.p}</p>
          <ul className={styles.radovi}>
            {k.radovi.items.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.slika} alt={r.h} loading="lazy" decoding="async" />
                  <h3>{r.h}</h3>
                  <p>{r.p}</p>
                  <span className="mono">{r.url.replace(/^https?:\/\//, "")}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

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

      {/* ---------- zasto mi ---------- */}
      {k.razlozi && (
        <section className={styles.sekcija}>
          <p className="mono">{k.razlozi.eyebrow}</p>
          <h2 className="display">
            {k.razlozi.title} <em className="outline">{k.razlozi.accent}</em>
          </h2>
          <p className="lead">{k.razlozi.p}</p>
          <ul className={styles.mreza}>
            {k.razlozi.items.map((i) => (
              <li key={i.h}>
                <h3>{i.h}</h3>
                <p>{i.p}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* ---------- pitanja ---------- */}
      {k.pitanja && (
        <section className={styles.sekcija}>
          <p className="mono">{k.pitanja.eyebrow}</p>
          <h2 className="display">
            {k.pitanja.title} <em className="outline">{k.pitanja.accent}</em>
          </h2>
          <p className="lead">{k.pitanja.p}</p>
          <div className={styles.pitanja}>
            {k.pitanja.items.map((i) => (
              <details key={i.q}>
                <summary>{i.q}</summary>
                <p>{i.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {/* ---------- upit ---------- */}
      <section id="upit" className={`${styles.sekcija} ${styles.upit}`}>
        <p className="mono">{k.kraj.eyebrow}</p>
        <h2 className="display">
          {k.kraj.title} <em className="outline">{k.kraj.accent}</em>
        </h2>
        <p className="lead">{k.kraj.p}</p>
        <ContactForm locale={locale} stranica={k.slug} prosireno usluge={k.uslugeIzbor} />
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
