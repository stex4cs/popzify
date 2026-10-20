import type { Metadata } from "next";
import Portfolio from "@/components/design/Portfolio";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Рекламный креатив для беттинга, казино и спорта | Stefan Popović",
  description:
    "Креативное портфолио: концепции кампаний для казино и беттинг-операторов, ежедневная графика, телевизионные обложки и анимация для спортивных каналов.",
  alternates: {
    canonical: "/design/ru",
    languages: { en: "/design", ru: "/design/ru", "x-default": "/design" },
  },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Рекламный креатив для беттинга, казино и спорта",
    description:
      "Концепции кампаний, ежедневная графика, обложки и анимация — собраны как системы и выходят в любом формате.",
    locale: "ru_RU",
    url: "/design/ru",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

export default function Strana() {
  return <Portfolio jezik="ru" />;
}
