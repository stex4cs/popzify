/**
 * Meta piksel.
 *
 * ID stoji u NEXT_PUBLIC_META_PIKSEL_ID. Bez njega se piksel uopste ne
 * ubacuje — nema prazne skripte, nema poziva ka Meti, i odeljak o
 * pikselu u politici privatnosti se ne prikazuje. Tako tekst politike
 * nikad ne tvrdi nesto sto se ne desava.
 *
 * Piksel ide samo na kampanjske strane, jer samo one primaju placen
 * saobracaj. Pocetna i politika privatnosti ga nemaju.
 */

export const PIKSEL_ID = process.env.NEXT_PUBLIC_META_PIKSEL_ID || "";

export const imaPiksel = PIKSEL_ID.length > 0;

type Fbq = (...args: unknown[]) => void;

declare global {
  interface Window {
    fbq?: Fbq;
  }
}

/**
 * Salje dogadjaj ako piksel postoji. Nikad ne baca: merenje ne sme da
 * obori slanje upita.
 */
export function prati(dogadjaj: string, podaci?: Record<string, unknown>) {
  if (!imaPiksel) return;
  try {
    window.fbq?.("track", dogadjaj, podaci);
  } catch {
    /* merenje nije bitno za ishod */
  }
}
