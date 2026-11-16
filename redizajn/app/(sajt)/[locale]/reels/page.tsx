import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocale, verzije, type Locale } from "@/lib/i18n";
import { kampanje } from "@/lib/kampanje";
import Stranica from "@/components/kampanja/Stranica";

const SLUG = "reels";

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
  const k = kampanje[SLUG][locale];
  return {
    title: k.meta.title,
    description: k.meta.description,
    alternates: verzije(locale, `/${SLUG}`),
    openGraph: {
      type: "website",
      siteName: "Popzify",
      title: k.meta.title,
      description: k.meta.description,
      url: `/${locale}/${SLUG}`,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Stranica k={kampanje[SLUG][locale as Locale]} locale={locale as Locale} />;
}
