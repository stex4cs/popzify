import { dict, type Locale } from "@/lib/i18n";
import { stationCopy } from "@/lib/stations";
import { clips } from "@/lib/work";
import ContactForm from "./ContactForm";
import styles from "./Stations.module.css";

/**
 * Sloj sa sadrzajem. Serverska komponenta: tekst je obican HTML u izvoru
 * strane, pa je citljiv pretrazivacima i vidljiv bez JavaScripta.
 * Scena se pomera iza njega, ali tekst se skroluje normalno.
 */
export default function Stations({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const c = stationCopy[locale];

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
          <p className="mono">{c.statement.eyebrow}</p>
          <h2 className="display">
            {c.statement.title} <em className="outline">{c.statement.accent}</em>
          </h2>
          <p className="lead">{c.statement.body}</p>
        </div>
      </section>

      <section id="work" className={`${styles.station} ${styles.right}`}>
        <div className={styles.block}>
          <p className="mono">{c.work.eyebrow}</p>
          <h2 className="display">
            {c.work.title} <em className="outline">{c.work.accent}</em>
          </h2>
          <p className="lead">{c.work.body}</p>
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
          <p className="mono">{c.contact.eyebrow}</p>
          <h2 className="display">
            {c.contact.title} <em className="outline">{c.contact.accent}</em>
          </h2>
          <p className="lead">{c.contact.body}</p>
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
        </div>
      </section>
    </div>
  );
}
