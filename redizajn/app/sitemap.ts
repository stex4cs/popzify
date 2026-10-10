import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE = "https://popzify.com";

/** Strane koje postoje na oba jezika. Prazan string je pocetna. */
const PAGES = ["", "/reels", "/svadbe", "/privatnost"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : page === "/privatnost" ? 0.3 : 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${page}`])),
      },
    }))
  );
}
