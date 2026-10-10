"use client";

import { useEffect, useRef } from "react";
import { clips } from "@/lib/work";
import type { Locale } from "@/lib/i18n";
import styles from "./kampanja.module.css";

/**
 * Traka vertikalnih snimaka.
 *
 * Nista se ne ucitava unapred: svaki snimak stoji na poster slici dok
 * ne udje u kadar, i pauzira se cim izadje. Strana prima placen
 * saobracaj sa telefona, pa prvi prikaz ne sme da kosta sedam snimaka.
 */
export default function Klipovi({ locale }: { locale: Locale }) {
  const wrap = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const root = wrap.current;
    if (!root) return;
    const videos = Array.from(root.querySelectorAll("video"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (!v.src && v.dataset.src) v.src = v.dataset.src;
            v.play().catch(() => {
              /* pregledac odbio: ostaje poster */
            });
          } else {
            v.pause();
          }
        }
      },
      { threshold: 0.45 }
    );
    videos.forEach((v) => io.observe(v));
    return () => io.disconnect();
  }, []);

  return (
    <ul className={styles.klipovi} ref={wrap}>
      {clips.map((c) => (
        <li key={c.id}>
          <video
            data-src={`/radovi/${c.file}.mp4`}
            poster={`/radovi/${c.file}.jpg`}
            muted
            loop
            playsInline
            preload="none"
            aria-label={c.label[locale]}
          />
          <div className={styles.klipTekst}>
            <span>{c.label[locale]}</span>
            <span className="mono">{c.kind[locale]}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
