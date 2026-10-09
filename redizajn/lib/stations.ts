/**
 * Stanice kroz koje kamera prolazi. Sajt nije niz sekcija nego jedan
 * neprekidan kadar: scroll pomera kameru po z osi, a stanice su mesta
 * na tom putu. Svaka stanica ima svoj udeo u ukupnom skrolu.
 *
 * `camZ` je gde kamera stoji kad je ta stanica u fokusu.
 * Tekst stanice je pravi HTML, ne tekstura u 3D sceni, da bi ostao
 * ostar, selektabilan i citljiv za pretrazivace.
 */

import type { Locale } from "./i18n";

export type StationId = "mark" | "statement" | "work" | "contact";

export type Station = {
  id: StationId;
  /** Gde kamera stoji kad je ta stanica u fokusu. */
  camZ: number;
  /**
   * Gde je znak u tom trenutku. Kamera ne prolazi kroz njega nego on
   * odlazi niz hodnik, pa ostaje u kadru celim putem i samo se smanjuje.
   *
   * x i y nisu metri nego udeo polovine kadra na toj dubini, pa znak
   * sedi na istom mestu u kompoziciji i na sirokom i na uspravnom ekranu.
   * Tekst stanice ima svoju stranu, znak drugu.
   */
  mark: [frameX: number, frameY: number, z: number];
};

export const stations: Station[] = [
  { id: "mark", camZ: 10.5, mark: [0, 0.02, 0] },
  { id: "statement", camZ: 7.5, mark: [0.17, 0.05, -14] },
  { id: "work", camZ: 3.0, mark: [-0.23, 0.03, -26] },
  { id: "contact", camZ: -2.0, mark: [-0.46, 0.28, -36] },
];

type Copy = {
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
};

export const stationCopy: Record<Locale, Record<Exclude<StationId, "mark">, Copy>> = {
  sr: {
    statement: {
      eyebrow: "Beograd · od 2024.",
      title: "Kamera, montaža i",
      accent: "ritam.",
      body:
        "Snimamo i montiramo za brendove kojima slika mora da radi posao: borilačke večeri, svadbe, sajmovi i sadržaj za mreže. Sony FX3, FPV i gimbal dron, i montaža koja drži ritam.",
    },
    work: {
      eyebrow: "Radovi",
      title: "Materijal, ne",
      accent: "obećanja.",
      body: "Snimci sa terena. Svaki kadar je iz posla koji je isporučen.",
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Recite šta",
      accent: "snimamo.",
      body: "Javite se i vraćamo se sa planom, rokom i cenom u roku od 24 sata.",
    },
  },
  en: {
    statement: {
      eyebrow: "Belgrade · since 2024",
      title: "Camera, cut and",
      accent: "rhythm.",
      body:
        "We film and edit for brands whose picture has to do the work: fight nights, weddings, trade fairs and social content. Sony FX3, FPV and gimbal drones, and an edit that holds its rhythm.",
    },
    work: {
      eyebrow: "Work",
      title: "Footage, not",
      accent: "promises.",
      body: "Shot on location. Every frame comes from work that shipped.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Tell us what",
      accent: "we shoot.",
      body: "Get in touch and we come back with a plan, a timeline and a price within 24 hours.",
    },
  },
};
