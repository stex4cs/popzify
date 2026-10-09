"use client";

import { useEffect, useState } from "react";
import { getVariant, setVariant, subscribeVariant, type WorkVariant } from "@/lib/variant";
import styles from "./VariantSwitch.module.css";

const OPTIONS: { id: WorkVariant; sr: string; en: string }[] = [
  { id: "jato", sr: "Jato", en: "Swarm" },
  { id: "traka", sr: "Traka", en: "Strip" },
];

/**
 * Privremeno: biranje varijante stanice Radovi uzivo, da se dve mogu
 * uporediti bez reloada. Ide napolje cim odluka padne.
 */
export default function VariantSwitch({ locale }: { locale: "sr" | "en" }) {
  const [active, setActive] = useState<WorkVariant>("jato");

  useEffect(() => {
    setActive(getVariant());
    return subscribeVariant(setActive);
  }, []);

  return (
    <div className={styles.wrap}>
      <span className="mono">{locale === "sr" ? "Radovi" : "Work"}</span>
      {OPTIONS.map((o) => (
        <button
          key={o.id}
          type="button"
          className={`mono ${styles.btn}`}
          data-on={active === o.id || undefined}
          aria-pressed={active === o.id}
          onClick={() => setVariant(o.id)}
        >
          {locale === "sr" ? o.sr : o.en}
        </button>
      ))}
    </div>
  );
}
