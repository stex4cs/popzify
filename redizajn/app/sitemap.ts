import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";

const BASE = "https://popzify.com";

/** Strane koje postoje na oba jezika. Prazan string je pocetna. */
const PAGES = ["", "/privatnost"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return locales.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : 0.4,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${page}`])),
      },
    }))
  );
}
