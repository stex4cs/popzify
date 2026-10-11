import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, type Locale } from "@/lib/i18n";
import Spisak from "@/components/radovi/Spisak";

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
  const sr = locale === "sr";
  return {
    title: sr
      ? "Radovi — sajtovi koje smo napravili | Popzify"
      : "Work — sites we have built | Popzify",
    description: sr
      ? "Sajtovi, platforme i prodavnice koje je Popzify napravio. Svaki se otvara uživo, sa opisom kako je rešen."
      : "Sites, platforms and shops built by Popzify. Each one opens live, with a write-up of how it was solved.",
    alternates: {
      canonical: `/${locale}/radovi`,
      languages: { "sr-Latn-RS": "/sr/radovi", en: "/en/radovi", "x-default": "/sr/radovi" },
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Spisak locale={locale as Locale} />;
}
