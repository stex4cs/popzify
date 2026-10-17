import type { Metadata } from "next";
import Portfolio from "@/components/design/Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Дизайн-системы для спортивных медиа | Popzify",
  description:
    "Портфолио графического дизайна: ежедневная графика для соцсетей, телевизионные обложки и кампейн-креатив для спортивных медиа и беттинг-брендов.",
  alternates: {
    canonical: "/design/ru",
    languages: { en: "/design", ru: "/design/ru", "x-default": "/design" },
  },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Дизайн-системы для спортивных медиа",
    description:
      "Ежедневная графика, обложки и кампейн-креатив — собраны как шаблоны и выходят в любом формате.",
    locale: "ru_RU",
    url: "/design/ru",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

export default function Strana() {
  return <Portfolio jezik="ru" />;
}
