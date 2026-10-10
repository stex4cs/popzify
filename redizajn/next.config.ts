import type { NextConfig } from "next";

/**
 * Stare adrese sa popzify.com koje posle prelaska na ovaj sajt vise ne
 * postoje. Strane ne prenosimo, ali adrese ne smeju da padnu na 404:
 * na njih vode Google i spoljni linkovi. Zato trajno (308) vode na
 * najblizu novu stranu.
 *
 * Kljuc je bez kose crte i bez .html; oba oblika se prave ispod, jer
 * je stari sajt servirao ciste URL-ove a Google moze da drzi i .html.
 */
const STARE: Record<string, string> = {
  // Usluzne strane: sve su sada delovi /marketing
  videoprodukcija: "/sr/marketing",
  audioprodukcija: "/sr/marketing",
  digitalnimarketing: "/sr/marketing",
  "produkcija-snimanje": "/sr/marketing",
  "izrada-sajtova": "/sr/marketing",
  programiranje: "/sr/marketing",
  ecommerce: "/sr/marketing",
  alatiitehnike: "/sr/marketing",
  projectmenager: "/sr/marketing",
  sales: "/sr/marketing",

  // Radovi: spisak i pojedinacne strane projekata
  projects: "/sr/marketing",
  "project-bif": "/sr/marketing",
  "project-correctscore": "/sr/marketing",
  "project-dukatdesk": "/sr/marketing",
  "project-glitch": "/sr/marketing",
  "project-raateam": "/sr/marketing",

  // Svadbe su dobile svoju stranu
  "snimanje-vencanja": "/sr/svadbe",

  // Ljudi: licnih strana vise nema
  ivanpopovic: "/sr",
  stefanpopovic: "/sr",

  // Politika privatnosti je napisana iznova
  privacypolicy: "/sr/privatnost",
};

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  async redirects() {
    // Strane bez oznake jezika vode na srpsku verziju. Linkovi u
    // oglasima i na vizitkama se pisu kao popzify.com/reels, bez /sr,
    // pa bi inace padali na 404. Nabrojane su izricito, da pravilo ne
    // pokupi /api, /_next i fajlove iz public.
    const bezJezika = ["marketing", "reels", "svadbe", "privatnost"];

    return [
      // Privremeno (307) dok se ne odluci da li ce detekcija jezika ici
      // po Accept-Language zaglavlju.
      { source: "/", destination: "/sr", permanent: false },
      ...bezJezika.map((p) => ({
        source: `/${p}`,
        destination: `/sr/${p}`,
        permanent: false,
      })),

      // Stare adrese: trajno, jer se te strane nikad ne vracaju.
      ...Object.entries(STARE).flatMap(([stara, nova]) => [
        { source: `/${stara}`, destination: nova, permanent: true },
        { source: `/${stara}.html`, destination: nova, permanent: true },
      ]),
      // Stari sajt je imao i /index.html
      { source: "/index.html", destination: "/sr", permanent: true },
    ];
  },
};

export default nextConfig;
