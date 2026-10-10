/**
 * Snimci iz drona nad Beogradom.
 *
 * `alt` i `yaw` nisu procenjeni nego ocitani iz samih fajlova:
 * RelativeAltitude i GimbalYawDegree iz DJI XMP zapisa. Zato svaki
 * snimak u sceni stoji na visini na kojoj je stvarno nastao i okrenut
 * je na stranu na koju je kamera stvarno gledala.
 *
 * GPS je pri obradi skinut, pa vodoravni polozaj nije poznat; snimci se
 * rasporedjuju u krug oko putanje spustanja, po svom azimutu.
 */

export type Aerial = {
  /** Ime bez nastavka; u public/beograd/ stoje <file>.webp i <file>-mali.webp. */
  file: string;
  /** Visina leta u metrima iznad poletanja. */
  alt: number;
  /** Azimut gimbala u stepenima, 0 je sever. */
  yaw: number;
  date: string;
};

/** Poredjani po visini, od najnizeg ka najvisem. */
export const aerials: Aerial[] = [
  { file: "DJI_0282-HDR", alt: 60.4, yaw: -119.3, date: "2026-03-26" },
  { file: "DJI_0287-HDR", alt: 60.4, yaw: -103.1, date: "2026-03-26" },
  { file: "DJI_0293", alt: 60.6, yaw: -103.1, date: "2026-03-26" },
  { file: "DJI_0535-HDR", alt: 62.8, yaw: 94.0, date: "2025-11-16" },
  { file: "DJI_0582", alt: 77.8, yaw: 169.5, date: "2025-11-16" },
  { file: "DJI_0446-HDR", alt: 86.7, yaw: -74.8, date: "2025-11-10" },
  { file: "DJI_0458", alt: 92.7, yaw: 13.9, date: "2025-11-10" },
  { file: "DJI_0459-HDR", alt: 92.7, yaw: 12.9, date: "2025-11-10" },
  { file: "DJI_0564", alt: 95.2, yaw: -138.5, date: "2025-11-16" },
  { file: "DJI_0555-HDR", alt: 98.2, yaw: -153.9, date: "2025-11-16" },
  { file: "DJI_0581", alt: 110.8, yaw: 51.0, date: "2025-11-17" },
  { file: "DJI_0388-HDR-3", alt: 115.3, yaw: -126.5, date: "2025-11-09" },
  { file: "DJI_0393-HDR", alt: 119.3, yaw: 126.7, date: "2025-11-09" },
  { file: "DJI_0470", alt: 120.0, yaw: 127.0, date: "2025-11-10" },
  { file: "DJI_0465-HDR", alt: 120.1, yaw: 147.1, date: "2025-11-10" },
  { file: "DJI_0561", alt: 162.9, yaw: 162.5, date: "2025-11-16" },
  { file: "DJI_0584", alt: 164.5, yaw: -42.4, date: "2025-11-16" },
  { file: "DJI_0550", alt: 196.0, yaw: -152.7, date: "2025-11-16" },
];

export const AERIAL_RATIO = 16 / 9;
