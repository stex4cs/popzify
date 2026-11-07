import Script from "next/script";
import { GA_ID, imaAnalitiku, vrsta } from "@/lib/analitika";

/**
 * Merenje poseta: GA4 direktno ili preko Tag Managera, zavisno od oblika
 * ID-a u NEXT_PUBLIC_GA_ID. Bez ID-a ne ubacuje nista.
 *
 * `afterInteractive` znaci da se ucitava tek kad strana proradi, pa
 * merenje ne usporava prvi prikaz — na sajtu koji vuce WebGL scenu to
 * nije sitnica.
 *
 * Prelaske izmedju strana ne pratimo rucno: GA4 ih hvata sam, preko
 * „Page changes based on browser history events" u Enhanced measurement,
 * sto je upaljeno po podrazumevanom podesenju. Rucni page_view uz to bi
 * duplirao svaki prikaz.
 */
export default function Analitika() {
  if (!imaAnalitiku) return null;

  if (vrsta === "gtm") {
    return (
      <>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GA_ID}');`}
        </Script>
        <noscript>
          {/* Bez JavaScripta GTM meri kroz okvir, kao i piksel kroz sliku. */}
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GA_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
      </>
    );
  }

  return (
    <>
      <Script
        id="ga-ucitavanje"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script id="ga-podesavanje" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
