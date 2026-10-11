import { dict, type Locale } from "@/lib/i18n";
import { firma } from "@/lib/privatnost";
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
  drugiJezik,
}: {
  locale: Locale;
  /** Kako se broj ispisuje; kampanje ga pisu domace, radovi medjunarodno. */
  telefon?: string;
  /** Adresa iste strane na drugom jeziku. */
  drugiJezik: string;
}) {
  const t = dict[locale];
  const other: Locale = locale === "sr" ? "en" : "sr";

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
        <a className="mono" href={drugiJezik} hrefLang={other} lang={other}>
          {t.nav.other}
        </a>
      </div>
    </header>
  );
}

export function Podnozje({ locale }: { locale: Locale }) {
  return (
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
  );
}
