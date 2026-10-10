"use client";

import { useEffect, useRef, useState } from "react";
import { clips } from "@/lib/work";
import { dict, type Locale } from "@/lib/i18n";
import styles from "./kampanja.module.css";

/**
 * Traka vertikalnih snimaka.
 *
 * Nista se ne ucitava unapred: svaki snimak stoji na poster slici dok
 * ga neko ne dotakne. Strana prima placen saobracaj sa telefona, pa
 * prvi prikaz ne sme da kosta sedam snimaka.
 *
 * Misem: prelaz preko snimka ga pusta bez zvuka, kao pregled.
 * Klikom ili dodirom: pusta se sa zvukom, jer je to namera korisnika —
 * i jedino tako pregledac i dozvoljava zvuk. U svakom trenutku svira
 * najvise jedan.
 */
export default function Klipovi({ locale }: { locale: Locale }) {
  const t = dict[locale].klip;
  const videos = useRef(new Map<string, HTMLVideoElement>());
  const [zvucni, setZvucni] = useState<string | null>(null);
  const finePointer = useRef(false);

  useEffect(() => {
    finePointer.current =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const ucitaj = (v: HTMLVideoElement) => {
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
  };

  const stani = (id: string) => {
    const v = videos.current.get(id);
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    v.muted = true;
  };

  const pregled = (id: string) => {
    if (!finePointer.current || zvucni) return;
    const v = videos.current.get(id);
    if (!v) return;
    ucitaj(v);
    v.muted = true;
    v.play().catch(() => {
      /* pregledac odbio: ostaje poster */
    });
  };

  const kraj = (id: string) => {
    if (zvucni === id) return;
    stani(id);
  };

  const prebaci = (id: string) => {
    const v = videos.current.get(id);
    if (!v) return;

    if (zvucni === id) {
      stani(id);
      setZvucni(null);
      return;
    }
    if (zvucni) stani(zvucni);

    ucitaj(v);
    v.muted = false;
    v.play().then(
      () => setZvucni(id),
      () => {
        // Zvuk odbijen: bar neka ide bez njega.
        v.muted = true;
        v.play().catch(() => {});
        setZvucni(id);
      }
    );
  };

  return (
    <ul className={styles.klipovi}>
      {clips.map((c) => {
        const svira = zvucni === c.id;
        return (
          <li key={c.id}>
            <button
              type="button"
              className={styles.klip}
              data-svira={svira || undefined}
              onPointerEnter={(e) => e.pointerType === "mouse" && pregled(c.id)}
              onPointerLeave={(e) => e.pointerType === "mouse" && kraj(c.id)}
              onClick={() => prebaci(c.id)}
              aria-label={`${svira ? t.pauza : t.pusti}: ${c.label[locale]}`}
            >
              <video
                ref={(el) => {
                  if (el) videos.current.set(c.id, el);
                  else videos.current.delete(c.id);
                }}
                data-src={`/radovi/${c.file}.mp4`}
                poster={`/radovi/${c.file}.jpg`}
                muted
                loop
                playsInline
                preload="none"
                tabIndex={-1}
              />
              <span className={styles.znak} aria-hidden="true">
                {svira ? (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
                    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M8 5l11 7-11 7z" fill="currentColor" />
                  </svg>
                )}
              </span>
              {svira && <span className={`${styles.zvuk} mono`}>{t.zvuk}</span>}
            </button>
            <div className={styles.klipTekst}>
              <span>{c.label[locale]}</span>
              <span className="mono">{c.kind[locale]}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
