import { Unbounded, Manrope, JetBrains_Mono } from "next/font/google";
import type { Jezik } from "@/lib/design";

/**
 * Koreni okvir portfolio strana.
 *
 * Engleska i ruska verzija imaju svaka svoj koreni raspored, jer se
 * `<html lang>` ne moze promeniti odozdo, iz strane. Zajednicko im je
 * sve osim te jedne oznake, pa stoji ovde.
 *
 * Cirilica trazi `cyrillic` podskup; bez njega bi ruski tekst pao na
 * sistemski font i strana bi se raspala na pola.
 */

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "700"],
  variable: "--font-unbounded",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "600"],
  variable: "--font-mono",
  display: "swap",
});

export default function Koren({
  jezik,
  children,
}: {
  jezik: Jezik;
  children: React.ReactNode;
}) {
  return (
    <html
      lang={jezik}
      className={`${unbounded.variable} ${manrope.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
