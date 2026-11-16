import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, locales, ogLocale, verzije, type Locale } from "@/lib/i18n";
import Spisak from "@/components/radovi/Spisak";

const META: Record<Locale, { title: string; description: string }> = {
  sr: {
    title: "Radovi — sajtovi koje smo napravili | Popzify",
    description:
      "Sajtovi, platforme i prodavnice koje je Popzify napravio. Svaki se otvara uživo, sa opisom kako je rešen.",
  },
  en: {
    title: "Work — sites we have built | Popzify",
    description:
      "Sites, platforms and shops built by Popzify. Each one opens live, with a write-up of how it was solved.",
  },
  ru: {
    title: "Работы — сайты, которые мы сделали | Popzify",
    description:
      "Сайты, платформы и интернет-магазины от Popzify. Каждый открывается вживую, с разбором того, как он устроен.",
  },
};

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
  const t = META[locale];
  return {
    title: t.title,
    description: t.description,
    alternates: verzije(locale, "/radovi"),
    openGraph: {
      type: "website",
      siteName: "Popzify",
      title: t.title,
      description: t.description,
      url: `/${locale}/radovi`,
      locale: ogLocale[locale],
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <Spisak locale={locale as Locale} />;
}
