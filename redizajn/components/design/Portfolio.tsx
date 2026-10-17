import { firma } from "@/lib/privatnost";
import { projekti, tekst, type Jezik } from "@/lib/design";
import Galerija from "./Galerija";
import styles from "./design.module.css";

/**
 * Strana sa portfoliom grafickog dizajna.
 *
 * Stoji izvan `/[locale]` sistema sajta: ovde su engleski i ruski, jer
 * se salje klijentima koji ne citaju srpski. Zato i svoje zaglavlje,
 * sa prebacivanjem izmedju /design i /design/ru.
 *
 * Nema 3D scene namerno. Na ostalim stranama scena nosi stranu; ovde bi
 * se tukla sa radovima, koji su sami po sebi jaki kadrovi.
 */
export default function Portfolio({ jezik }: { jezik: Jezik }) {
  const t = tekst[jezik];
  const drugi = jezik === "en" ? "/design/ru" : "/design";

  return (
    <main className={styles.page}>
      <span className="corner tl" />
      <span className="corner tr" />

      <header className={styles.top}>
        <a className={styles.brand} href={jezik === "en" ? "/en" : "/en"}>
          <b>Pop</b>zify
        </a>
        <div className={styles.desno}>
          <a className="mono" href={`tel:${firma.telefonIntl}`}>
            {firma.telefonIntl}
          </a>
          <a className="mono" href={drugi} hrefLang={jezik === "en" ? "ru" : "en"}>
            {t.jezik}
          </a>
        </div>
      </header>

      <section className={styles.uvod}>
        <p className="mono">{t.eyebrow}</p>
        <h1 className="display">
          {t.naslov} <em className="outline">{t.naglasak}</em>
        </h1>
        <p className="lead">{t.uvod}</p>
      </section>

      {projekti.map((p) => (
        <section key={p.id} className={styles.projekat} id={p.id}>
          <div className={styles.zaglavljeProjekta}>
            <h2 className="display">{p.ime}</h2>
            <p className={`mono ${styles.grana}`}>{p.grana[jezik]}</p>
            <p className={styles.uvodProjekta}>{p.uvod[jezik]}</p>
          </div>

          {p.radovi.map((r, i) => (
            <article key={r.id} className={styles.rad}>
              <div className={styles.opisRada}>
                <p className={`mono ${styles.broj}`}>
                  {String(i + 1).padStart(2, "0")} <span>/ {String(p.radovi.length).padStart(2, "0")}</span>
                </p>
                <p className={`mono ${styles.klijent}`}>{r.klijent[jezik]}</p>
                <h3>{r.naslov[jezik]}</h3>
                <p className={styles.tekstRada}>{r.opis[jezik]}</p>
                <ul className={styles.oznake}>
                  {r.oznake.map((o) => (
                    <li key={o.en} className="mono">
                      {o[jezik]}
                    </li>
                  ))}
                </ul>
              </div>

              <Galerija
                slike={r.slike}
                natpisi={{
                  uvecaj: t.uvecaj,
                  zatvori: t.zatvori,
                  prethodna: t.prethodna,
                  sledeca: t.sledeca,
                }}
              />
            </article>
          ))}
        </section>
      ))}

      <section className={styles.kraj}>
        <h2 className="display">{t.kontaktNaslov}</h2>
        <p className="lead">{t.kontaktP}</p>
        <div className={styles.akcije}>
          <a className={styles.dugme} href={`mailto:${firma.email}`}>
            {t.pisi}
          </a>
          <a className={styles.dugmeTiho} href={`tel:${firma.telefonIntl}`}>
            {t.zovi} {firma.telefonIntl}
          </a>
        </div>
      </section>

      <footer className={styles.foot}>
        <p className="mono">
          {firma.ime} · {firma.sediste} ·{" "}
          <a href="/en">{t.nazad}</a>
        </p>
      </footer>
    </main>
  );
}
