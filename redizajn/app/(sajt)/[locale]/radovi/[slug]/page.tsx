import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dict, isLocale, locales, ogLocale, verzije, type Locale } from "@/lib/i18n";
import { nadjiRad, slugovi } from "@/lib/radovi";
import Detalj from "@/components/radovi/Detalj";

export function generateStaticParams() {
  return locales.flatMap((locale) => slugovi.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const rad = nadjiRad(slug, locale as Locale);
  if (!rad) return {};
  return {
    title: `${rad.ime} — ${dict[locale].ui.rad} | Popzify`,
    description: rad.lead,
    alternates: verzije(locale, `/radovi/${slug}`),
    openGraph: {
      type: "article",
      siteName: "Popzify",
      title: rad.ime,
      description: rad.lead,
      url: `/${locale}/radovi/${slug}`,
      locale: ogLocale[locale],
      images: [{ url: `/radovi-sajt/${slug}/main.webp`, alt: rad.ime }],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const rad = nadjiRad(slug, locale as Locale);
  if (!rad) notFound();
  return <Detalj rad={rad} locale={locale as Locale} />;
}
