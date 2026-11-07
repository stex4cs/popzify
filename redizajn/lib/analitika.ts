/**
 * Merenje poseta.
 *
 * ID stoji u NEXT_PUBLIC_GA_ID i prima dva oblika:
 *
 *   G-XXXXXXXXXX    GA4 Measurement ID — gtag ide direktno, bez posrednika
 *   GTM-XXXXXXX     Tag Manager kontejner — ucitava se kontejner, a sta se
 *                   meri podesava se u GTM-u
 *
 * Razlika je bitna: kontejner sam po sebi ne meri nista. Dok se u njemu
 * ne napravi GA4 tag, Analytics ostaje prazan iako skripta uredno radi.
 *
 * Bez ID-a se ne ubacuje nista — nema skripte, nema poziva ka Guglu, i
 * odeljak o analitici u politici privatnosti se ne prikazuje. Isto
 * pravilo kao kod Meta piksela: tekst politike nikad ne tvrdi nesto sto
 * se ne desava.
 *
 * Za razliku od piksela, analitika ide na ceo sajt, jer je pitanje na
 * koje odgovara „sta ljudi ovde otvaraju", a ne „koji oglas je doneo
 * upit".
 */

export const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "").trim();

const JE_GA4 = /^G-[A-Z0-9]{6,}$/i.test(GA_ID);
const JE_GTM = /^GTM-[A-Z0-9]{6,}$/i.test(GA_ID);

export const imaAnalitiku = JE_GA4 || JE_GTM;

/** Koji oblik je podesen; komponenta po tome bira skriptu. */
export const vrsta: "ga4" | "gtm" | null = JE_GA4 ? "ga4" : JE_GTM ? "gtm" : null;

type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: Gtag;
    dataLayer?: unknown[];
  }
}

/**
 * Salje dogadjaj ako merenje postoji. Nikad ne baca: merenje ne sme da
 * obori ono sto korisnik radi.
 *
 * Kroz GTM ide u dataLayer, jer tamo `gtag` ne mora da postoji — okidac
 * se pravi u kontejneru, nad imenom dogadjaja.
 */
export function dogadjaj(ime: string, podaci?: Record<string, unknown>) {
  if (!imaAnalitiku) return;
  try {
    if (vrsta === "gtm") window.dataLayer?.push({ event: ime, ...podaci });
    else window.gtag?.("event", ime, podaci);
  } catch {
    /* merenje nije bitno za ishod */
  }
}
