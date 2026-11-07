"use client";

import { useEffect } from "react";
import { kanalZaVezu, upit } from "@/lib/konverzije";

/**
 * Broji upite poslate mimo forme: mejl, telefon, WhatsApp, Telegram.
 *
 * Slusa klik na nivou dokumenta umesto da svaki link dobije svoj
 * onClick. Razlog je prakticne prirode: ti linkovi stoje u serverskim
 * komponentama na sedam strana, pa bi svaka morala da postane klijentska
 * samo zbog merenja. Ovako nova veza pocinje da se broji cim se doda,
 * bez ijedne izmene.
 *
 * Hvata se u fazi hvatanja (`capture`), da se dogadjaj izbroji i kad
 * neka komponenta zaustavi dalje sirenje klika.
 */
export default function Konverzije() {
  useEffect(() => {
    const naKlik = (e: MouseEvent) => {
      const cilj = e.target as Element | null;
      const veza = cilj?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!veza) return;

      const kanal = kanalZaVezu(veza.getAttribute("href") || "");
      if (!kanal) return;

      // Ponavljanje ne filtriramo ovde: `upit` vec broji jedan po sesiji,
      // kroz sve kanale, pa bi jos jedan filter samo prikrivao prvi.
      upit(kanal);
    };

    document.addEventListener("click", naKlik, true);
    return () => document.removeEventListener("click", naKlik, true);
  }, []);

  return null;
}
