import { firma } from "@/lib/privatnost";
import { dict, type Locale } from "@/lib/i18n";

/**
 * Strukturirani podaci o firmi za pretrazivace. Brojevi su isti oni iz
 * APR-a koji stoje i u politici privatnosti — na jednom mestu, da ne
 * mogu da se raziđu.
 */
export default function Podaci({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://popzify.com/#popzify",
    name: "Popzify",
    legalName: firma.ime,
    description: dict[locale].meta.description,
    url: `https://popzify.com/${locale}`,
    email: firma.email,
    telephone: firma.telefonIntl,
    foundingDate: "2024-02-14",
    taxID: firma.pib,
    vatID: firma.pib,
    identifier: { "@type": "PropertyValue", name: "Maticni broj", value: firma.mb },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Beograd",
      addressRegion: "Zemun",
      addressCountry: "RS",
    },
    areaServed: "RS",
    sameAs: ["https://www.instagram.com/lolipopz.bif/"],
    knowsLanguage: ["sr", "en"],
  };

  return (
    <script
      type="application/ld+json"
      // Sadrzaj je nas, ne korisnicki unos.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
