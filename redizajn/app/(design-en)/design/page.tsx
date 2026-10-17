import type { Metadata } from "next";
import Portfolio from "@/components/design/Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Design systems for sports media | Popzify",
  description:
    "Graphic design portfolio: daily social graphics, broadcast thumbnails and campaign creative for sports media and betting brands.",
  alternates: {
    canonical: "/design",
    languages: { en: "/design", ru: "/design/ru", "x-default": "/design" },
  },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Design systems for sports media",
    description:
      "Daily social graphics, broadcast thumbnails and campaign creative — built as templates, shipped in every format.",
    locale: "en_US",
    url: "/design",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

export default function Strana() {
  return <Portfolio jezik="en" />;
}
