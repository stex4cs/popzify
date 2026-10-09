"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis samo uglacava skrol, ne menja nacin skrolovanja: dokument se i
 * dalje skroluje stvarno, pa `window.scrollY`, sidra i tastatura rade.
 * Ako korisnik trazi manje pokreta, ne pali se uopste.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      // Dodir na telefonu ostaje nativan: tamo je inercija vec dobra,
      // a presretanje kvari adresnu traku i pull-to-refresh.
      syncTouch: false,
      // Sidra u navigaciji idu glatko, istom krivom kao i skrol.
      anchors: true,
    });

    let raf = 0;
    const tick = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
