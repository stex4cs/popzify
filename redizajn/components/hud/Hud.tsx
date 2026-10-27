"use client";

import { useEffect, useRef } from "react";
import styles from "./hud.module.css";

/**
 * Omotac oko Pixi scene.
 *
 * Scena se uvozi tek u pregledacu (`import()` unutar efekta): Pixi trazi
 * `window` i `document`, pa bi na serveru pukao. Tako i bundle strane
 * ostaje mali dok se do HUD-a ne dodje.
 */
export default function Hud() {
  const domaci = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cvor = domaci.current;
    if (!cvor) return;
    let unisti: (() => void) | null = null;
    let otkazano = false;

    import("./scena").then(async ({ napraviScenu }) => {
      if (otkazano || !cvor) return;
      const izlaz = await napraviScenu(cvor);
      if (otkazano) { izlaz.unisti(); return; }
      unisti = izlaz.unisti;
    });

    return () => {
      otkazano = true;
      if (unisti) unisti();
    };
  }, []);

  return <div className={styles.platno} ref={domaci} aria-label="Casino HUD prototype" />;
}
