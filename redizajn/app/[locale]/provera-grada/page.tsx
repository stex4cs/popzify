import type { Metadata } from "next";
import Pogled from "./Pogled";

// Radna strana, ne sme u pretragu.
export const metadata: Metadata = { robots: { index: false, follow: false } };

// Privremena strana samo da se grad pogleda pre nego sto ude u scenu.
export default function Page() {
  return <Pogled />;
}
