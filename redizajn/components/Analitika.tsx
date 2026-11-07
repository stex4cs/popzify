import Script from "next/script";
import { GA_ID, imaAnalitiku } from "@/lib/analitika";

/**
 * Google Analytics 4.
 *
 * Bez podesenog ID-a ne ubacuje nista. `afterInteractive` znaci da se
 * ucitava tek kad strana proradi, pa merenje ne usporava prvi prikaz —
 * na sajtu koji vuce WebGL scenu to nije sitnica.
 *
 * Prelaske izmedju strana ne pratimo rucno: GA4 ih hvata sam, preko
 * „Page changes based on browser history events" u Enhanced measurement,
 * sto je upaljeno po podrazumevanom podesenju. Rucni page_view uz to bi
 * duplirao svaki prikaz.
 */
export default function Analitika() {
  if (!imaAnalitiku) return null;

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
