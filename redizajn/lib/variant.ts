/**
 * Privremeni prekidac izmedju dve varijante stanice Radovi, dok se bira
 * koja ostaje. Kad odluka padne, odlazi i ovaj fajl i dugme u viziru.
 *
 * Stanje stoji van Reacta jer ga cita i WebGL petlja, koja nije u
 * stablu komponenti.
 */

export type WorkVariant = "jato" | "traka";

const KEY = "popzify.radovi";
const subs = new Set<(v: WorkVariant) => void>();
let current: WorkVariant | null = null;

function read(): WorkVariant {
  if (typeof window === "undefined") return "jato";
  const fromUrl = new URLSearchParams(window.location.search).get("radovi");
  if (fromUrl === "jato" || fromUrl === "traka") return fromUrl;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === "jato" || saved === "traka") return saved;
  } catch {
    /* privatni prozor: ostaje podrazumevano */
  }
  return "jato";
}

export function getVariant(): WorkVariant {
  if (current === null) current = read();
  return current;
}

export function setVariant(v: WorkVariant) {
  if (getVariant() === v) return;
  current = v;
  try {
    window.localStorage.setItem(KEY, v);
  } catch {
    /* nije bitno ako ne moze da se zapamti */
  }
  subs.forEach((fn) => fn(v));
}

export function subscribeVariant(fn: (v: WorkVariant) => void) {
  subs.add(fn);
  return () => {
    subs.delete(fn);
  };
}
