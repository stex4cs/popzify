"use client";

import { useCallback, useEffect, useState } from "react";
import type { Slika } from "@/lib/design";
import styles from "./design.module.css";

/**
 * Mreza radova sa uvecanjem.
 *
 * Klijent koji gleda portfolio hoce da vidi detalj — kvotu, uslov,
 * potpis sponzora — a to se u mrezi ne vidi. Klik otvara kadar preko
 * celog ekrana, strelice vode kroz ceo projekat, Esc zatvara.
 *
 * Nema biblioteke: jedan fixed sloj i tri tastera.
 */

const ODNOS: Record<Slika["oblik"], string> = {
  "16:9": "16 / 9",
  "4:5": "4 / 5",
  "9:16": "9 / 16",
  panorama: "1400 / 610",
};

export default function Galerija({
  slike,
  natpisi,
}: {
  slike: Slika[];
  natpisi: { uvecaj: string; zatvori: string; prethodna: string; sledeca: string };
}) {
  const [otvorena, setOtvorena] = useState<number | null>(null);

  const pomeri = useCallback(
    (smer: number) =>
      setOtvorena((i) => (i === null ? i : (i + smer + slike.length) % slike.length)),
    [slike.length]
  );

  useEffect(() => {
    if (otvorena === null) return;
    const tipka = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOtvorena(null);
      else if (e.key === "ArrowRight") pomeri(1);
      else if (e.key === "ArrowLeft") pomeri(-1);
    };
    window.addEventListener("keydown", tipka);
    // Strana iza ne sme da se skroluje dok je kadar preko ekrana.
    const pre = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tipka);
      document.body.style.overflow = pre;
    };
  }, [otvorena, pomeri]);

  return (
    <>
      <ul className={styles.mreza}>
        {slike.map((s, i) => (
          <li key={s.file} data-oblik={s.oblik}>
            <button
              type="button"
              className={styles.kadar}
              style={{ aspectRatio: ODNOS[s.oblik] }}
              onClick={() => setOtvorena(i)}
              aria-label={`${natpisi.uvecaj} — ${s.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.file} alt={s.alt} loading="lazy" decoding="async" />
            </button>
          </li>
        ))}
      </ul>

      {otvorena !== null && (
        <div
          className={styles.preko}
          role="dialog"
          aria-modal="true"
          aria-label={slike[otvorena].alt}
          onClick={() => setOtvorena(null)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={slike[otvorena].file} alt={slike[otvorena].alt} />

          <button
            type="button"
            className={`${styles.krug} ${styles.zatvori}`}
            onClick={() => setOtvorena(null)}
            aria-label={natpisi.zatvori}
          >
            ✕
          </button>
          {slike.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.krug} ${styles.levo}`}
                onClick={(e) => {
                  e.stopPropagation();
                  pomeri(-1);
                }}
                aria-label={natpisi.prethodna}
              >
                ←
              </button>
              <button
                type="button"
                className={`${styles.krug} ${styles.desno}`}
                onClick={(e) => {
                  e.stopPropagation();
                  pomeri(1);
                }}
                aria-label={natpisi.sledeca}
              >
                →
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
