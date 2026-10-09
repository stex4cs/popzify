/**
 * Klipovi koji vise u sceni na stanici Radovi.
 *
 * Svi su 720x1280, sedam do osam sekundi, isti materijal koji vec stoji
 * na popzify.com/reels. Naziv opisuje sta se vidi u kadru i nista preko
 * toga: nema izmisljenih klijenata ni rezultata.
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
    label: { sr: "Meč", en: "The fight" },
    kind: { sr: "Borilački sport", en: "Combat sports" },
  },
  {
    id: "svadba-dron",
    file: "svadba-dron",
    label: { sr: "Svadba iz vazduha", en: "Wedding from above" },
    kind: { sr: "Dron", en: "Drone" },
  },
  {
    id: "sajam-igre",
    file: "sajam-igre",
    label: { sr: "Sajam igara", en: "Gaming fair" },
    kind: { sr: "Događaj", en: "Event" },
  },
  {
    id: "honda-izlazak",
    file: "honda-izlazak",
    label: { sr: "Honda", en: "Honda" },
    kind: { sr: "Brend", en: "Brand" },
  },
  {
    id: "svadba-par",
    file: "svadba-par",
    label: { sr: "Mladenci", en: "The couple" },
    kind: { sr: "Svadba", en: "Wedding" },
  },
  {
    id: "bojkovic-trening",
    file: "bojkovic-trening",
    label: { sr: "Trening", en: "Training" },
    kind: { sr: "Borilački sport", en: "Combat sports" },
  },
  {
    id: "sajam-stand",
    file: "sajam-stand",
    label: { sr: "Štand", en: "Stand" },
    kind: { sr: "Događaj", en: "Event" },
  },
];

/** Odnos stranica panela. Materijal je uspravan, 9:16. */
export const CLIP_RATIO = 9 / 16;
