"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  // Snimak ekrana telefona je uzi od 9:16; u tom okviru mu je `cover`
  // sekao sedamnaest odsto visine, i to u mrezi, pre nego sto se udje.
  telefon: "720 / 1558",
  desktop: "1600 / 789",
};

/**
 * Nema petlja koja krene tek kad kadar dodje blizu ekrana.
 *
 * Izvor se postavlja u tom trenutku, a ne pri ucitavanju strane: inace
 * bi svako ko do ovog slucaja nikad ne dogura ipak skinuo dva megabajta.
 * Dok se ne ucita, stoji poster, pa se u spisku nista ne pomera.
 */
function Klip({ slika }: { slika: Slika }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const oko = new IntersectionObserver(
      ([u]) => {
        if (u.isIntersecting) {
          if (!v.getAttribute("src")) v.setAttribute("src", slika.video as string);
          void v.play().catch(() => {
            // Pregledac odbio pustanje: poster ostaje, bez greske.
          });
        } else {
          v.pause();
        }
      },
      { rootMargin: "300px" }
    );
    oko.observe(v);
    return () => oko.disconnect();
  }, [slika.video]);

  return (
    <video
      ref={ref}
      poster={slika.file}
      muted
      loop
      playsInline
      preload="none"
      aria-label={slika.alt}
    />
  );
}

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

  // Jedan polozeni kadar nosi ceo red; vise njih ide po dva, inace se
  // slucaj sa cetiri naslovne razvuce u zid od tri hiljade piksela.
  const siroki = slike.filter(
    (s) => s.oblik === "16:9" || s.oblik === "panorama" || s.oblik === "desktop"
  ).length;

  /**
   * Kad su svi kadrovi istog oblika, red se deli na tacan broj njih i
   * sirina se racuna u procentima. Jednaka visina u pikselima ne moze
   * da garantuje tri u redu: izmedju 1240 i 1400 piksela kontejner se
   * suzi pre nego sto se visina promeni, pa treci kadar padne dole.
   */
  const oblici = new Set(slike.map((s) => s.oblik));
  const jednak =
    oblici.size === 1 &&
    !oblici.has("16:9") &&
    !oblici.has("panorama") &&
    !oblici.has("desktop") &&
    slike.length > 1;
  const kolone = Math.min(slike.length, 4);

  return (
    <>
      <ul
        className={styles.mreza}
        data-siroki={siroki > 1 ? "vise" : "jedan"}
        data-red={jednak ? "jednak" : undefined}
        style={jednak ? ({ "--k": kolone } as React.CSSProperties) : undefined}
      >
        {slike.map((s, i) => (
          <li key={s.file} data-oblik={s.oblik}>
            <button
              type="button"
              className={styles.kadar}
              style={{ aspectRatio: ODNOS[s.oblik] }}
              onClick={() => setOtvorena(i)}
              aria-label={`${natpisi.uvecaj} — ${s.alt}`}
            >
              {s.video ? (
                <Klip slika={s} />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={s.file} alt={s.alt} loading="lazy" decoding="async" />
              )}
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
          {slike[otvorena].video ? (
            <video
              src={slike[otvorena].video}
              poster={slike[otvorena].file}
              controls
              autoPlay
              muted
              loop
              playsInline
              aria-label={slike[otvorena].alt}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img src={slike[otvorena].file} alt={slike[otvorena].alt} />
          )}

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
