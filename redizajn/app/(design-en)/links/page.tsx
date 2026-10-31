import type { Metadata } from "next";
import Linkovi from "@/components/design/Linkovi";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Stefan Popović — all links | Popzify",
  description:
    "One address for everything: graphic design portfolio, UI/UX case study, playable PixiJS prototypes, the sites I have shipped, and how to reach me.",
  alternates: { canonical: "/links" },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Stefan Popović — all links",
    description:
      "Design portfolio, UI/UX case study, playable prototypes and shipped sites, in one place.",
    locale: "en_US",
    url: "/links",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

export default function Strana() {
  return <Linkovi />;
}
