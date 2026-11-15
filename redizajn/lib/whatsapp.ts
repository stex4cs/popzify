/**
 * WhatsApp.
 *
 * Poseban broj, ne onaj iz zaglavlja: na WhatsApp-u se javlja drugi
 * telefon. Stoji na jednom mestu da dugme na kampanjama, podnozje i
 * pocetna ne mogu da se raziđu.
 *
 * Merenje ne treba posebno: lib/konverzije prepoznaje svaku wa.me vezu
 * i broji je kao upit, jednom po poseti.
 */

/** Broj u medjunarodnom obliku, bez + i razmaka, kako ga wa.me trazi. */
export const WA_BROJ = "381601484066";

/** Kako se broj ispisuje ljudima. */
export const WA_ISPIS = "060 1484066";

/**
 * Veza koja otvara razgovor, po zelji sa vec upisanom porukom. Poruka
 * kaze sa koje strane covek pise, pa se odmah zna da li je svadba ili
 * rodjendan, bez pitanja nazad.
 */
export function waVeza(poruka?: string): string {
  const osnova = `https://wa.me/${WA_BROJ}`;
  return poruka ? `${osnova}?text=${encodeURIComponent(poruka)}` : osnova;
}
