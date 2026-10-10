/**
 * Stanice kroz koje kamera prolazi. Sajt nije niz sekcija nego jedno
 * neprekidno spustanje: iz svemira, kroz atmosferu, nad Beograd, do
 * ulice i ispod nje.
 *
 * Osa je visina, i to u pravim metrima. Jedna jedinica scene je jedan
 * metar, pa visine zgrada iz OpenStreetMap-a ulaze kakve jesu, a kamera
 * moze da stane tacno na visinu na kojoj je snimak iz drona nastao.
 *
 * Tekst stanice je pravi HTML, ne tekstura u 3D sceni, da bi ostao
 * ostar, selektabilan i citljiv za pretrazivace.
 */

import type { Locale } from "./i18n";

export type StationId = "svemir" | "ulazak" | "vazduh" | "grad" | "ispod";

export type Station = {
  id: StationId;
  /** Visina kamere u metrima iznad kote usca. */
  y: number;
  /** Nagib kamere u stepenima; 0 je horizont, negativno gleda nadole. */
  pitch: number;
  /** Azimut kamere u stepenima, isti sistem kao gimbal: 0 je sever. */
  yaw: number;
  /**
   * Gde kamera stoji vodoravno, u metrima od usca Save i Dunava
   * (x je istok, z je jug). Spustanje ne ide na samo usce jer je tamo
   * voda, nego nad Kalemegdan, odakle je i panorama snimljena.
   */
  at: [x: number, z: number];
  /**
   * Gde znak stoji u kadru. Prva dva broja su udeo polovine kadra, pa
   * znak sedi na istom mestu u kompoziciji i na sirokom i na uspravnom
   * ekranu. Treci je rastojanje od kamere u metrima — njime se podesava
   * koliko je znak krupan, jer putuje zajedno sa kamerom.
   */
  mark: [frameX: number, frameY: number, dist: number];
};

export const stations: Station[] = [
  { id: "svemir", y: 9000, pitch: -12, yaw: 248, at: [430, -140], mark: [0, 0.02, 11.3] },
  { id: "ulazak", y: 2600, pitch: -46, yaw: 248, at: [430, -140], mark: [0.3, 0.2, 26] },
  { id: "vazduh", y: 420, pitch: -24, yaw: 288, at: [950, 300], mark: [-0.42, 0.3, 40] },
  { id: "grad", y: 62.8, pitch: -3, yaw: 292, at: [513, -276], mark: [-0.62, -0.42, 52] },
  { id: "ispod", y: -30, pitch: -1, yaw: 292, at: [513, -276], mark: [0.46, 0.34, 46] },
];

/**
 * Visina na kojoj panorama Kalemegdana preuzima kadar. Nije izabrana
 * nego ocitana iz EXIF-a same panorame.
 */
export const PANORAMA_Y = 62.8;

type Copy = {
  eyebrow: string;
  title: string;
  accent: string;
  body: string;
};

export const stationCopy: Record<Locale, Record<Exclude<StationId, "svemir">, Copy>> = {
  sr: {
    ulazak: {
      eyebrow: "Beograd · od 2024.",
      title: "Kamera, montaža i",
      accent: "ritam.",
      body:
        "Snimamo i montiramo za brendove kojima slika mora da radi posao: borilačke večeri, svadbe, sajmovi i sadržaj za mreže. Sony FX3, FPV i gimbal dron, i montaža koja drži ritam.",
    },
    vazduh: {
      eyebrow: "Iz vazduha",
      title: "Kadrovi koji se ne",
      accent: "ponavljaju.",
      body:
        "Svaki snimak ispod stoji na visini na kojoj je stvarno nastao, od šezdeset do dvesta metara. Visina je očitana iz samog fajla, nije procenjena.",
    },
    grad: {
      eyebrow: "Radovi",
      title: "Materijal, ne",
      accent: "obećanja.",
      body: "Snimci sa terena. Svaki kadar je iz posla koji je isporučen.",
    },
    ispod: {
      eyebrow: "Kontakt",
      title: "Recite šta",
      accent: "snimamo.",
      body: "Javite se i vraćamo se sa planom, rokom i cenom u roku od 24 sata.",
    },
  },
  en: {
    ulazak: {
      eyebrow: "Belgrade · since 2024",
      title: "Camera, cut and",
      accent: "rhythm.",
      body:
        "We film and edit for brands whose picture has to do the work: fight nights, weddings, trade fairs and social content. Sony FX3, FPV and gimbal drones, and an edit that holds its rhythm.",
    },
    vazduh: {
      eyebrow: "From the air",
      title: "Frames that do not",
      accent: "repeat.",
      body:
        "Every shot below sits at the altitude it was actually taken from, sixty to two hundred metres. The altitude is read from the file, not guessed.",
    },
    grad: {
      eyebrow: "Work",
      title: "Footage, not",
      accent: "promises.",
      body: "Shot on location. Every frame comes from work that shipped.",
    },
    ispod: {
      eyebrow: "Contact",
      title: "Tell us what",
      accent: "we shoot.",
      body: "Get in touch and we come back with a plan, a timeline and a price within 24 hours.",
    },
  },
};
