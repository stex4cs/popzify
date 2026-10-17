/**
 * Klipovi koji vise u sceni na stanici Radovi.
 *
 * Svi su 720x1280, sedam do osam sekundi, isti materijal koji vec stoji
 * na popzify.com/reels.
 *
 * Nazivi su imena ljudi i dogadjaja koje je klijent potvrdio, ne opisi
 * kategorije: „Marko Bojkovic, FNC" a ne „Borilacki sport". Sta se ne
 * zna, ne izmislja se — opise se ono sto se u kadru vidi.
 */

import type { Locale } from "./i18n";

export type Clip = {
  id: string;
  /** Oba fajla stoje u public/radovi/ pod istim imenom. */
  file: string;
  label: Record<Locale, string>;
  kind: Record<Locale, string>;
};

export const clips: Clip[] = [
  {
    id: "bojkovic-mec",
    file: "bojkovic-mec",
    label: { sr: "Marko Bojković", en: "Marko Bojković" },
    kind: { sr: "FNC, meč", en: "FNC, fight" },
  },
  {
    id: "svadba-dron",
    file: "svadba-dron",
    label: { sr: "Ceremonija iz vazduha", en: "Ceremony from above" },
    kind: { sr: "Dron", en: "Drone" },
  },
  {
    id: "sajam-igre",
    file: "sajam-igre",
    label: { sr: "Belgrade Future Gaming", en: "Belgrade Future Gaming" },
    kind: { sr: "Beogradski sajam", en: "Belgrade Fair" },
  },
  {
    id: "honda-izlazak",
    file: "honda-izlazak",
    label: { sr: "Honda", en: "Honda" },
    kind: { sr: "FNC, izlazak", en: "FNC, walkout" },
  },
  {
    id: "svadba-par",
    file: "svadba-par",
    label: { sr: "Ulazak mladenaca", en: "The couple's entrance" },
    kind: { sr: "Svadba", en: "Wedding" },
  },
  {
    id: "bojkovic-trening",
    file: "bojkovic-trening",
    label: { sr: "Marko Bojković", en: "Marko Bojković" },
    kind: { sr: "Priprema za meč", en: "Fight camp" },
  },
];

/** Odnos stranica panela. Materijal je uspravan, 9:16. */
export const CLIP_RATIO = 9 / 16;
