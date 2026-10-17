import { firma } from "@/lib/privatnost";
import { projekti, tekst, veze, type Jezik } from "@/lib/design";
import Galerija from "./Galerija";
import styles from "./design.module.css";

/** Ikone kanala stoje u kodu: sitne su i ne vrede zahteva ka mrezi. */
const PUTANJE = {
  whatsapp:
    "M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.21-8.23 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.84-.2-.48-.4-.42-.55-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.86.84-.86 2.05s.88 2.38 1 2.54c.12.17 1.73 2.64 4.19 3.7.59.26 1.04.41 1.4.52.59.19 1.12.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.28Z",
  telegram:
    "M21.9 4.3 18.6 19.8c-.25 1.1-.9 1.37-1.82.85l-5.03-3.7-2.43 2.33c-.27.27-.5.5-1.01.5l.36-5.12 9.33-8.43c.4-.36-.09-.56-.63-.2L6.86 12.9 1.9 11.35c-1.08-.34-1.1-1.08.22-1.6L20.5 2.68c.9-.34 1.68.2 1.4 1.62Z",
};

function Ikona({ kanal }: { kanal: keyof typeof PUTANJE }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={PUTANJE[kanal]} fill="currentColor" />
    </svg>
  );
}

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
          <a
            className={styles.dugme}
            href={veze.whatsapp}
            target="_blank"
            rel="noopener"
          >
            <Ikona kanal="whatsapp" />
            {t.vatsap}
          </a>
          <a
            className={styles.dugmeTiho}
            href={veze.telegram}
            target="_blank"
            rel="noopener"
          >
            <Ikona kanal="telegram" />
            {t.telegram}
          </a>
          <a className={styles.dugmeTiho} href={`mailto:${firma.email}`}>
            {t.pisi}
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
