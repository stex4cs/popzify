import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  async redirects() {
    // Strane bez oznake jezika vode na srpsku verziju. Linkovi u
    // oglasima i na vizitkama se pisu kao popzify.com/reels, bez /sr,
    // pa bi inace padali na 404. Nabrojane su izricito, da pravilo ne
    // pokupi /api, /_next i fajlove iz public.
    const bezJezika = ["reels", "svadbe", "privatnost"];
    return [
      // Privremeno (307) dok se ne odluci da li ce detekcija jezika ici
      // po Accept-Language zaglavlju.
      { source: "/", destination: "/sr", permanent: false },
      ...bezJezika.map((p) => ({
        source: `/${p}`,
        destination: `/sr/${p}`,
        permanent: false,
      })),
    ];
  },
};

export default nextConfig;
