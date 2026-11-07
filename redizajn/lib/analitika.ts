/**
 * Google Analytics 4.
 *
 * ID stoji u NEXT_PUBLIC_GA_ID. Bez njega se ne ubacuje nista — nema
 * skripte, nema poziva ka Guglu, i odeljak o analitici u politici
 * privatnosti se ne prikazuje. Isto pravilo kao kod Meta piksela: tekst
 * politike nikad ne tvrdi nesto sto se ne desava.
 *
 * Za razliku od piksela, analitika ide na ceo sajt, jer je pitanje na
 * koje odgovara „sta ljudi ovde otvaraju", a ne „koji oglas je doneo
 * upit".
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";

export const imaAnalitiku = /^G-[A-Z0-9]{6,}$/i.test(GA_ID);

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/**
 * Salje dogadjaj ako analitika postoji. Nikad ne baca: merenje ne sme da
 * obori ono sto korisnik radi.
 */
export function dogadjaj(ime: string, podaci?: Record<string, unknown>) {
  if (!imaAnalitiku) return;
  try {
    window.gtag?.("event", ime, podaci);
  } catch {
    /* merenje nije bitno za ishod */
  }
}
