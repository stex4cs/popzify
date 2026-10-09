import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,

  async redirects() {
    return [
      // Koren vodi na srpsku verziju. Privremeno (307) dok se ne odluci
      // da li ce detekcija jezika ici po Accept-Language zaglavlju.
      { source: "/", destination: "/sr", permanent: false },
    ];
  },
};

export default nextConfig;
