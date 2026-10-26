import { firma } from "@/lib/privatnost";
import { osoba, tekst, veze } from "@/lib/design";
import { desktop, ekrani, meta, ogranicenja, sistem, sistemTokena } from "@/lib/ui";
import Galerija from "./Galerija";
import styles from "./design.module.css";
import ui from "./ui.module.css";

/**
 * Studija slucaja za aplikaciju, odvojena strana od /design.
 *
 * Razlog za odvajanje: oglas za UI/UX trazi dokaz o razmisljanju, a
 * /design pocinje kazino banerima. Ko trazi dizajnera proizvoda ne bi
 * dogurao do aplikacije. Ovako postoji adresa koja se salje bas za te
 * konkurse, a sa /design se stize u jedan klik.
 *
 * Samo engleski: konkursi u ovoj grani idu na engleskom.
 */
export default function Ui() {
  const t = tekst.en;

  return (
    <main className={styles.page}>
      <span className="corner tl" />
      <span className="corner tr" />

      <header className={styles.top}>
        <a className={styles.brand} href="/en">
          <b>Pop</b>zify
        </a>
        <div className={styles.desno}>
          <a className="mono" href="/design">
            Graphic design
          </a>
          <a className="mono" href="#kontakt">
            {t.kontaktVeza}
          </a>
        </div>
      </header>

      <section className={styles.uvod}>
        <div className={styles.uvodTekst}>
          <p className="mono">{meta.eyebrow}</p>
          <h1 className="display">
            {meta.naslov} <em className="outline">{meta.naglasak}</em>
          </h1>
          <p className="lead">{meta.uvod}</p>
          <p className={styles.potpis}>
            <strong>{osoba.ime}</strong>
            <span className="mono">{osoba.uloga.en}</span>
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.foto}
          src={osoba.foto}
          alt={osoba.ime}
          width={720}
          height={864}
          decoding="async"
        />
      </section>

      <section className={ui.cinjenice}>
        {meta.cinjenice.map(([k, v]) => (
          <div key={k}>
            <p className="mono">{k}</p>
            <p>{v}</p>
          </div>
        ))}
      </section>

      <section className={styles.projekat}>
        <div className={styles.zaglavljeProjekta}>
          <p className={`mono ${styles.grana}`}>{meta.kontekstN}</p>
          <p className={styles.uvodProjekta}>{meta.kontekst}</p>
        </div>
      </section>

      {/* Ekran stoji uz svoj tekst, ne ispod njega: citalac uporedjuje
          tvrdnju sa kadrom bez skrolovanja gore-dole. */}
      <div id="ekrani">
        {ekrani.map((e, i) => (
          <section key={e.id} className={ui.ekran}>
            <div className={ui.kadar}>
              <Galerija
                slike={[{ file: e.file, oblik: "telefon", alt: e.naslov }]}
                natpisi={{
                  uvecaj: t.uvecaj,
                  zatvori: t.zatvori,
                  prethodna: t.prethodna,
                  sledeca: t.sledeca,
                }}
              />
            </div>
            <div className={ui.misao}>
              <p className={`mono ${styles.broj}`}>
                {String(i + 1).padStart(2, "0")}{" "}
                <span>/ {String(ekrani.length).padStart(2, "0")}</span>
              </p>
              <h2>{e.naslov}</h2>
              <p className={styles.tekstRada}>{e.opis}</p>
              <ul className={styles.oznake}>
                {e.oznake.map((o) => (
                  <li key={o} className="mono">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </div>

      <section className={styles.projekat}>
        <div className={styles.zaglavljeProjekta}>
          <h2 className="display">{desktop.naslov}</h2>
          <p className={styles.uvodProjekta}>{desktop.uvod}</p>
        </div>

        {desktop.ekrani.map((e) => (
          <article key={e.id} className={ui.siroki}>
            <h3>{e.naslov}</h3>
            <p className={styles.tekstRada}>{e.opis}</p>
            <Galerija
              slike={[{ file: e.file, oblik: "desktop", alt: `${e.naslov} — desktop` }]}
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

      <section className={styles.projekat}>
        <div className={styles.zaglavljeProjekta}>
          <h2 className="display">{sistem.naslov}</h2>
          <p className={styles.uvodProjekta}>{sistem.uvod}</p>
        </div>
        <ul className={ui.parovi}>
          {sistem.stavke.map(([k, v]) => (
            <li key={k}>
              <h3>{k}</h3>
              <p>{v}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.projekat}>
        <div className={styles.zaglavljeProjekta}>
          <h2 className="display">{sistemTokena.naslov}</h2>
          <p className={styles.uvodProjekta}>{sistemTokena.uvod}</p>
          <p className={ui.figmaVeza}>
            <a href={sistemTokena.figmaUrl} target="_blank" rel="noopener">
              {sistemTokena.figma} ↗
            </a>
          </p>
        </div>

        {sistemTokena.grupe.map((g) => (
          <article key={g.id} className={ui.tokeni}>
            <div className={ui.tokeniTekst}>
              <h3>{g.naslov}</h3>
              <p className={styles.tekstRada}>{g.opis}</p>
            </div>
            <ul className={ui.ploce}>
              {g.boje.map(([ime, boja, nota]) => (
                <li key={ime}>
                  <span className={ui.ploca} style={{ background: boja }} aria-hidden="true" />
                  <b className="mono">{ime}</b>
                  <i className="mono">
                    {boja}
                    {nota ? ` · ${nota}` : ""}
                  </i>
                </li>
              ))}
            </ul>
          </article>
        ))}

        <article className={ui.tokeni}>
          <div className={ui.tokeniTekst}>
            <h3>{sistemTokena.skalaNaslov}</h3>
            <p className={styles.tekstRada}>{sistemTokena.skalaOpis}</p>
          </div>
          <ul className={ui.skala}>
            {sistemTokena.skala.map(([ime, mere, font]) => (
              <li key={ime}>
                <b>{ime}</b>
                <span className="mono">{mere}</span>
                <i className="mono">{font}</i>
              </li>
            ))}
          </ul>
          <p className={styles.tekstRada}>{sistemTokena.mreza}</p>
        </article>
      </section>

      <section className={styles.projekat}>
        <div className={styles.zaglavljeProjekta}>
          <h2 className="display">{ogranicenja.naslov}</h2>
        </div>
        <ul className={ui.parovi}>
          {ogranicenja.stavke.map(([k, v]) => (
            <li key={k}>
              <h3>{k}</h3>
              <p>{v}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.kraj} id="kontakt">
        <h2 className="display">{t.kontaktNaslov}</h2>
        <p className="lead">{t.kontaktP}</p>
        <div className={styles.akcije}>
          <a className={styles.dugme} href={`mailto:${firma.email}`}>
            {t.pisi}
          </a>
          <a className={styles.dugmeTiho} href={veze.telegram} target="_blank" rel="noopener">
            {t.telegram}
          </a>
          <a className={styles.dugmeTiho} href="/design">
            Graphic design work
          </a>
        </div>
      </section>

      <footer className={styles.foot}>
        <p className="mono">
          {osoba.ime} · {firma.ime} · {firma.sediste} · <a href="/en">{t.nazad}</a>
        </p>
      </footer>
    </main>
  );
}
