/**
 * Upit kao konverzija, na jednom mestu.
 *
 * Jedan poziv javlja i Google-u i Meti, pa ne moze da se desi da jedan
 * kanal broji upite a drugi ne. Imena dogadjaja nisu izmisljena:
 *
 *   GA4   `generate_lead`  — preporuceno ime iz Google-ove liste, pa ga
 *                            Google Ads uvozi kao konverziju bez prepravke
 *   Meta  `Lead`           — standardni dogadjaj, isto
 *
 * Za svaki od njih merenje je ugaseno dok nema svog ID-a, pa ovo ne pada
 * ni na sajtu bez ijednog podesenog alata.
 */

import { prati } from "./piksel";
import { dogadjaj } from "./analitika";

/** Odakle je upit krenuo. Forma je jedini kanal sa potvrdjenim ishodom. */
export type Kanal = "forma" | "email" | "telefon" | "whatsapp" | "telegram";

export function upit(kanal: Kanal, strana?: string) {
  const putanja = strana || (typeof window !== "undefined" ? window.location.pathname : "");

  dogadjaj("generate_lead", { kanal, strana: putanja });
  prati("Lead", { content_category: putanja, content_name: kanal });
}

/**
 * Koji kanal nosi dati link, ako ga uopste nosi.
 *
 * Odvojeno od komponente da moze da se proveri bez pregledaca.
 */
export function kanalZaVezu(href: string): Kanal | null {
  const h = href.trim().toLowerCase();
  if (h.startsWith("mailto:")) return "email";
  if (h.startsWith("tel:")) return "telefon";
  if (/(?:^|\/\/|\.)(?:wa\.me|api\.whatsapp\.com)\b/.test(h)) return "whatsapp";
  if (/(?:^|\/\/)(?:www\.)?t\.me\//.test(h)) return "telegram";
  return null;
}
