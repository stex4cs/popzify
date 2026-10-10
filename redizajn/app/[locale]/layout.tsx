import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import "../globals.css";
import { dict, htmlLang, isLocale, locales, type Locale } from "@/lib/i18n";

/* Fontovi idu kroz next/font: nema zahteva ka Google-u u runtime-u i nema
   skoka teksta pri ucitavanju. Imena promenljivih prate globals.css. */
const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const m = dict[locale].meta;

  return {
    metadataBase: new URL("https://popzify.com"),
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "sr-Latn-RS": "/sr", en: "/en", "x-default": "/sr" },
    },
    openGraph: {
      type: "website",
      siteName: "Popzify",
      title: m.title,
      description: m.description,
      locale: locale === "sr" ? "sr_RS" : "en_US",
      url: `/${locale}`,
      // Slika se navodi izricito umesto preko imena fajla: u dinamickom
      // segmentu je Next u adresu upisivao "-" umesto jezika, a kad je
      // fajl pomeren u koren, ovaj openGraph blok ju je pregazio.
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/og.jpg"],
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
  themeColor: "#07060d",
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={htmlLang[locale as Locale]} className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
