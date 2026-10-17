import styles from "./privatnost/privatnost.module.css";

/**
 * Nepostojeca strana unutar jezika. Koren aplikacije nema svoj layout —
 * on zivi u [locale] da bi <html lang> pratio jezik — pa potpuno
 * nepoznate putanje hvata Next-ov podrazumevani prikaz.
 */
export default function NotFound() {
  return (
    <main className={styles.page}>
      <article className={styles.doc} style={{ paddingTop: "22vh" }}>
        <p className="mono">404</p>
        <h1 className="display">Ove strane nema.</h1>
        <p className="lead">
          Link je verovatno star ili pogrešno otkucan. Ovo je sve što postoji:
        </p>
        <p className={styles.foot}>
          <a href="/sr">popzify.com</a> · <a href="/sr/privatnost">Politika privatnosti</a>
        </p>
      </article>
    </main>
  );
}
