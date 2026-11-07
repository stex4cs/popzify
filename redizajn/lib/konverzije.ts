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

/**
 * Jedan posetilac, jedan upit — u prozoru od pola sata.
 *
 * Covek koji klikne WhatsApp pa posalje i formu nije dva posla. Bez ovoga
 * bi obe platforme ucile na naduvanom broju i trazile publiku koja mnogo
 * klikce, a ne onu koja se javlja.
 *
 * Isti prozor koji GA4 koristi za sesiju. Moglo je i podesavanjem
 * „ONCE_PER_SESSION" u GA4, ali to vazi samo za Google — Meta bi i dalje
 * primala svaki klik kao poseban Lead. Zato se broji ovde, pre slanja.
 */
const PROZOR = 30 * 60 * 1000;
const KLJUC = "popzify_upit";

function vecBrojan(): boolean {
  try {
    const pre = Number(window.localStorage.getItem(KLJUC) || 0);
    return pre > 0 && Date.now() - pre < PROZOR;
  } catch {
    // Zabranjeno skladiste (privatni prozor, blokirani kolacici): radije
    // izbroji dvaput nego da ne izbrojis nijednom.
    return false;
  }
}

function zabelezi() {
  try {
    window.localStorage.setItem(KLJUC, String(Date.now()));
  } catch {
    /* merenje nije bitno za ishod */
  }
}

export function upit(kanal: Kanal, strana?: string) {
  if (typeof window === "undefined") return;
  if (vecBrojan()) return;
  zabelezi();

  const putanja = strana || window.location.pathname;

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
