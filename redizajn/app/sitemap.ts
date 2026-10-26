import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n";
import { slugovi } from "@/lib/radovi";

const BASE = "https://popzify.com";

/** Strane koje postoje na oba jezika. Prazan string je pocetna. */
const PAGES = [
  "",
  "/marketing",
  "/reels",
  "/svadbe",
  "/radovi",
  ...slugovi.map((s) => `/radovi/${s}`),
  "/privatnost",
];

/**
 * Portfolio dizajna stoji izvan `sr`/`en` sistema: na njemu su engleski
 * i ruski, jer se salje klijentima koji ne citaju srpski.
 */
const DESIGN = { en: `${BASE}/design`, ru: `${BASE}/design/ru` };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const studija = {
    url: `${BASE}/ui`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  };

  const dizajn = Object.values(DESIGN).map((url) => ({
    url,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
    alternates: { languages: DESIGN },
  }));

  return [
    ...dizajn,
    studija,
    ...locales.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${BASE}/${locale}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1 : page === "/privatnost" ? 0.3 : page.startsWith("/radovi/") ? 0.7 : 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}${page}`])),
      },
    }))
  ),
  ];
}
