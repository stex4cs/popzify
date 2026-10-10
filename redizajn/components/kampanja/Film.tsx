"use client";

import { useRef, useState } from "react";
import styles from "./kampanja.module.css";

/**
 * Film u 16:9.
 *
 * Pet megabajta se ne dira dok neko ne stisne — zato `preload="none"` i
 * poster umesto snimka. Posle stiska se pusta sa zvukom, jer je zvuk
 * pola utiska na svadbenom filmu, i dobija prave kontrole da se moze
 * pauzirati, premotati i otvoriti preko celog ekrana.
 */
export default function Film({
  src,
  poster,
  dugme,
  naslov,
}: {
  src: string;
  poster: string;
  dugme: string;
  naslov: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [krenuo, setKrenuo] = useState(false);

  const pusti = () => {
    const v = ref.current;
    if (!v) return;
    if (!v.src) v.src = src;
    v.muted = false;
    v.controls = true;
    v.play().then(
      () => setKrenuo(true),
      () => {
        // Zvuk odbijen: neka bar ide, korisnik ga ukljuci kontrolama.
        v.muted = true;
        v.play().catch(() => {});
        setKrenuo(true);
      }
    );
  };

  return (
    <div className={styles.film} data-krenuo={krenuo || undefined}>
      <video ref={ref} poster={poster} preload="none" playsInline aria-label={naslov} />
      {!krenuo && (
        <button type="button" className={styles.filmDugme} onClick={pusti}>
          <span className={styles.filmZnak} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path d="M8 5l11 7-11 7z" fill="currentColor" />
            </svg>
          </span>
          <span className="mono">{dugme}</span>
        </button>
      )}
    </div>
  );
}
