import { dict, type Locale } from "@/lib/i18n";
import { stationCopy } from "@/lib/stations";
import { clips } from "@/lib/work";
import { aerials } from "@/lib/vazduh";
import ContactForm from "./ContactForm";
import styles from "./Stations.module.css";

/**
 * Sloj sa sadrzajem. Serverska komponenta: tekst je obican HTML u izvoru
 * strane, pa je citljiv pretrazivacima i vidljiv bez JavaScripta.
 * Scena se spusta iza njega, ali tekst se skroluje normalno.
 *
 * Redosled stanica prati visinu: svemir, ulazak u atmosferu, vazduh nad
 * Beogradom, ulica, pa ispod nje.
 */
export default function Stations({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const c = stationCopy[locale];
  const visine = `${Math.min(...aerials.map((a) => a.alt))}–${Math.max(...aerials.map((a) => a.alt))} m`;

  return (
    <div className={styles.path}>
      <section className={`${styles.station} ${styles.mark}`}>
        <div className={styles.block}>
          <h1 className="display">
            {t.hero.headlineBefore} <em className="outline">{t.hero.headlineAccent}</em>
            {t.hero.headlineAfter && ` ${t.hero.headlineAfter}`}
          </h1>
          <p className="lead">{t.hero.sub}</p>
        </div>
        <p className={`${styles.hint} mono`}>{t.hero.hint}</p>
      </section>

      <section className={`${styles.station} ${styles.left}`}>
        <div className={styles.block}>
          <p className="mono">{c.ulazak.eyebrow}</p>
          <h2 className="display">
            {c.ulazak.title} <em className="outline">{c.ulazak.accent}</em>
          </h2>
          <p className="lead">{c.ulazak.body}</p>
        </div>
      </section>

      <section className={`${styles.station} ${styles.right}`}>
        <div className={styles.block}>
          <p className="mono">
            {c.vazduh.eyebrow} · {visine}
          </p>
          <h2 className="display">
            {c.vazduh.title} <em className="outline">{c.vazduh.accent}</em>
          </h2>
          <p className="lead">{c.vazduh.body}</p>
        </div>
      </section>

      <section id="work" className={`${styles.station} ${styles.left}`}>
        <div className={styles.block}>
          <p className="mono">{c.grad.eyebrow}</p>
          <h2 className="display">
            {c.grad.title} <em className="outline">{c.grad.accent}</em>
          </h2>
          <p className="lead">{c.grad.body}</p>
          {/* Spisak postoji i kad scene nema: panele u 3D sceni prati
              isti materijal, ali naziv i vrsta posla stoje u tekstu. */}
          <ul className={styles.clips}>
            {clips.map((clip) => (
              <li key={clip.id}>
                <span>{clip.label[locale]}</span>
                <span className="mono">{clip.kind[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contact" className={`${styles.station} ${styles.center}`}>
        <div className={styles.block}>
          <p className="mono">{c.ispod.eyebrow}</p>
          <h2 className="display">
            {c.ispod.title} <em className="outline">{c.ispod.accent}</em>
          </h2>
          <p className="lead">{c.ispod.body}</p>
          <ContactForm locale={locale} />
          <p className={`${styles.or} mono`}>{t.form.or}</p>
          <ul className={styles.links}>
            <li>
              <a href="mailto:business@popzify.com">business@popzify.com</a>
            </li>
            <li>
              <a href="tel:+381605973212">060 5973212</a>
            </li>
            <li>
              <a href="https://www.instagram.com/lolipopz.bif/" rel="me noopener" target="_blank">
                @lolipopz.bif
              </a>
            </li>
          </ul>
          <p className={`${styles.credit} mono`}>
            <a href={`/${locale}/privatnost`}>
              {locale === "sr" ? "Politika privatnosti" : "Privacy policy"}
            </a>
          </p>
          {/* Potpis je obaveza licence pod kojom su podaci o gradu. */}
          <p className={`${styles.credit} mono`}>
            Grad: ©{" "}
            <a href="https://www.openstreetmap.org/copyright" rel="noopener" target="_blank">
              OpenStreetMap
            </a>{" "}
            {locale === "sr" ? "doprinosioci" : "contributors"}, ODbL
          </p>
        </div>
      </section>
    </div>
  );
}
