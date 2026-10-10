import { notFound } from "next/navigation";
import World from "@/components/World";
import SmoothScroll from "@/components/SmoothScroll";
import Frame from "@/components/Frame";
import Stations from "@/components/Stations";
import VariantSwitch from "@/components/VariantSwitch";
import Podaci from "@/components/Podaci";
import { dict, isLocale } from "@/lib/i18n";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <a className="skip" href="#work">
        {dict[locale].nav.skip}
      </a>
      <Podaci locale={locale} />
      <World />
      <SmoothScroll />
      <Frame locale={locale} />
      <VariantSwitch locale={locale} />
      <main>
        <Stations locale={locale} />
      </main>
    </>
  );
}
