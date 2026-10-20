import type { Metadata } from "next";
import Portfolio from "@/components/design/Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Advertising creative for betting, casino and sports | Stefan Popović",
  description:
    "Creative portfolio: campaign concepts for casino and betting operators, daily social graphics, broadcast thumbnails and motion for sports channels.",
  alternates: {
    canonical: "/design",
    languages: { en: "/design", ru: "/design/ru", "x-default": "/design" },
  },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Advertising creative for betting, casino and sports",
    description:
      "Campaign concepts, daily social graphics, broadcast thumbnails and motion — built as systems, shipped in every format.",
    locale: "en_US",
    url: "/design",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

export default function Strana() {
  return <Portfolio jezik="en" />;
}
