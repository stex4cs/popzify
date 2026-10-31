import { firma } from "@/lib/privatnost";
import { osoba, veze as kanali } from "@/lib/design";
import { grupe, kontakt, meta } from "@/lib/links";
import styles from "./design.module.css";
import l from "./links.module.css";

/**
 * /links — jedna adresa koja zamenjuje pet linkova u poruci.
 *
 * Nema navigacije ka ostalim stranama u zaglavlju: ovo jeste navigacija.
 * Spoljni linkovi se otvaraju u novoj kartici da se strana ne izgubi iza
 * njih, a unutrasnji ostaju u istoj.
 */
export default function Linkovi() {
  return (
    <main className={styles.page}>
      <span className="corner tl" />
      <span className="corner tr" />

      <div className={l.okvir}>
        <section className={l.vrh}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={l.foto}
            src={osoba.foto}
            alt={osoba.ime}
            width={720}
            height={864}
            decoding="async"
          />
          <div className={l.vrhTekst}>
            <p className="mono">{meta.eyebrow}</p>
            <h1 className="display">
              {meta.naslov} <em className="outline">{meta.naglasak}</em>
            </h1>
            <p className={`mono ${l.rola}`}>{meta.rola}</p>
            <p className="lead">{meta.uvod}</p>
          </div>
        </section>

        {grupe.map((grupa) => (
          <section key={grupa.id} className={l.grupa} id={grupa.id}>
            <div className={l.zaglavlje}>
              <h2 className="display">{grupa.naslov}</h2>
              <p>{grupa.uvod}</p>
            </div>

            <ul className={l.spisak}>
              {grupa.veze.map((v) => (
                <li key={v.url}>
                  <a
                    className={l.veza}
                    href={v.url}
                    {...(v.spolja ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    {v.slika ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className={l.slicica}
                        src={v.slika}
                        alt=""
                        width={640}
                        height={400}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : null}
                    <span className={l.telo}>
                      <span className={l.naslovVeze}>{v.naslov}</span>
                      <span className={l.opis}>{v.opis}</span>
                      <span className={`mono ${l.oznaka}`}>{v.oznaka}</span>
                    </span>
                    <span className={l.strelica} aria-hidden="true">
                      {v.spolja ? "↗" : "→"}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className={styles.kraj} id="kontakt">
          <h2 className="display">{kontakt.naslov}</h2>
          <p className="lead">{kontakt.uvod}</p>
          <div className={styles.akcije}>
            <a className={styles.dugme} href={`mailto:${firma.email}`}>
              {firma.email}
            </a>
            <a
              className={styles.dugmeTiho}
              href={kanali.whatsapp}
              target="_blank"
              rel="noopener"
            >
              WhatsApp
            </a>
            <a
              className={styles.dugmeTiho}
              href={kanali.telegram}
              target="_blank"
              rel="noopener"
            >
              Telegram
            </a>
          </div>
        </section>

        <footer className={styles.foot}>
          <p className="mono">
            {osoba.ime} · {firma.ime} · {firma.sediste} · VAT {firma.pib}
          </p>
        </footer>
      </div>
    </main>
  );
}
