"use client";

import { useEffect, useRef } from "react";
import { dict, type Locale } from "@/lib/i18n";
import { stations } from "@/lib/stations";
import styles from "./Frame.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Viziru kadra pripada sve sto ne putuje sa scenom: znak, REC, timecode,
 * nav i oznake uglova. Stoji fiksirano iznad WebGL sloja celim putem.
 */
export default function Frame({ locale }: { locale: Locale }) {
  const t = dict[locale];
  const tcRef = useRef<HTMLSpanElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let lastFrame = -1;

    const tick = (now: number) => {
      // Timecode ide na 24 fps, a DOM se dira samo kad se kadar promeni.
      const f = Math.floor(((now - start) / 1000) * 24);
      if (f !== lastFrame && tcRef.current) {
        lastFrame = f;
        tcRef.current.textContent =
          `${pad(Math.floor(f / 86400))}:${pad(Math.floor(f / 1440) % 60)}` +
          `:${pad(Math.floor(f / 24) % 60)}:${pad(f % 24)}`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      railRef.current?.style.setProperty("--p", String(p));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const other: Locale = locale === "sr" ? "en" : "sr";

  return (
    <div className={styles.frame}>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />

      <header className={styles.top}>
        <a className={styles.brand} href={`/${locale}`}>
          <b>Pop</b>zify
        </a>

        <nav className={styles.nav} aria-label={locale === "sr" ? "Glavna navigacija" : "Main navigation"}>
          <a className="mono" href="#work">
            {t.nav.work}
          </a>
          <a className="mono" href="#contact">
            {t.nav.contact}
          </a>
          <a
            className={`mono ${styles.lang}`}
            href={`/${other}`}
            hrefLang={other}
            lang={other}
            aria-label={t.nav.other}
          >
            {/* Na uskom ekranu puno ime jezika ne stane, ali prekidac ne sme da nestane. */}
            <span className={styles.langLong}>{t.nav.other}</span>
            <span className={styles.langShort} aria-hidden="true">
              {t.nav.otherShort}
            </span>
          </a>
        </nav>
      </header>

      <div className={`${styles.rec} mono`}>
        <span className={styles.dot} />
        <span>{t.hud.rec}</span>
        <span ref={tcRef}>00:00:00:00</span>
      </div>

      <div className={`${styles.meta} mono`}>
        <span>{t.hud.format}</span>
        <span>{t.hud.lens}</span>
        <span>{t.hud.geo}</span>
      </div>

      {/* Traka s desne strane: gde se kadar nalazi na putu. */}
      <div className={styles.rail} ref={railRef} aria-hidden="true">
        {stations.map((s) => (
          <span key={s.id} className={styles.tick} />
        ))}
        <span className={styles.head} />
      </div>
    </div>
  );
}
