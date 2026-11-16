import { dict, type Locale } from "@/lib/i18n";
import Jezici from "./Jezici";
import { firma } from "@/lib/privatnost";
import { waVeza, WA_ISPIS } from "@/lib/whatsapp";
import styles from "./okvir.module.css";

/**
 * Zaglavlje i podnozje koje dele sve strane osim pocetne — kampanjske,
 * radovi i politika privatnosti.
 *
 * Stoji na jednom mestu da broj telefona i link ka politici ne mogu da
 * se raziđu izmedju strana.
 */

export function Zaglavlje({
  locale,
  telefon,
  putanja,
}: {
  locale: Locale;
  /** Kako se broj ispisuje; kampanje ga pisu domace, radovi medjunarodno. */
  telefon?: string;
  /** Deo adrese posle jezika ("/svadbe"), da prekidac vodi na istu stranu. */
  putanja: string;
}) {
  const t = dict[locale];

  return (
    <header className={styles.top}>
      <a className={styles.brand} href={`/${locale}`}>
        <b>Pop</b>zify
      </a>
      <div className={styles.desno}>
        <a className="mono" href={`/${locale}/radovi`}>
          {t.nav.work}
        </a>
        <a className={`mono ${styles.tel}`} href={`tel:${firma.telefonIntl}`}>
          {telefon || firma.telefon}
        </a>
        <Jezici locale={locale} putanja={putanja} className="mono" />
      </div>
    </header>
  );
}

export function Podnozje({ locale }: { locale: Locale }) {
  const t = dict[locale];

  return (
    <footer className={styles.foot}>
      {/* Jedini unutrasnji linkovi ka kampanjskim stranama. Bez njih
          vise samo u sitemapu, bez ijedne veze sa ostatkom sajta. */}
      <nav className={styles.strane} aria-label={t.ui.strane}>
        {t.strane.map((x) => (
          <a key={x.put} href={`/${locale}/${x.put}`}>
            {x.tekst}
          </a>
        ))}
      </nav>
      <ul className={styles.veze}>
        <li>
          <a href={`mailto:${firma.email}`}>{firma.email}</a>
        </li>
        <li>
          <a href={`tel:${firma.telefonIntl}`}>{firma.telefon}</a>
        </li>
        <li>
          <a href={waVeza()} target="_blank" rel="noopener">
            WhatsApp {WA_ISPIS}
          </a>
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
          {t.ui.privatnost}
        </a>
      </p>
    </footer>
  );
}
