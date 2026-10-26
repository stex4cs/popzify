import type { Metadata } from "next";
import Ui from "@/components/design/Ui";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "UI/UX case study — Correct Score Pro app | Stefan Popović",
  description:
    "Product design case study: a football predictions app for iOS and Android — information hierarchy, a reusable component kit, gamification and the states live data demands.",
  alternates: { canonical: "/ui" },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "UI/UX case study — Correct Score Pro app",
    description:
      "Five tabs, one component kit: information hierarchy, custom inputs, gamification and live-data states.",
    locale: "en_US",
    url: "/ui",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

export default function Strana() {
  return <Ui />;
}
