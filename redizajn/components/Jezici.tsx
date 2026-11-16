import { htmlLang, jezici, ostali, type Locale } from "@/lib/i18n";

/**
 * Prekidac jezika: ista strana na ostalim jezicima.
 *
 * Kratke oznake (EN · RU) umesto punih imena, jer su sada dva linka
 * umesto jednog, a moraju da stanu i u zaglavlje telefona. Puno ime je
 * u `title` i u imenu za citac ekrana, na jeziku na koji link vodi.
 */
export default function Jezici({
  locale,
  putanja = "",
  className,
}: {
  locale: Locale;
  /** Deo adrese posle jezika: "/svadbe", "/radovi/bif", ili prazno. */
  putanja?: string;
  className?: string;
}) {
  return (
    <>
      {ostali(locale).map((l) => (
        <a
          key={l}
          className={className}
          href={`/${l}${putanja}`}
          hrefLang={htmlLang[l]}
          lang={htmlLang[l]}
          title={jezici[l].ime}
          aria-label={jezici[l].ime}
        >
          {jezici[l].kratko}
        </a>
      ))}
    </>
  );
}
