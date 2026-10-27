import type { Metadata } from "next";
import { firma } from "@/lib/privatnost";
import { osoba, tekst } from "@/lib/design";
import Hud from "@/components/hud/Hud";
import styles from "@/components/design/design.module.css";
import ui from "@/components/design/ui.module.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Interactive HUD prototype — PixiJS | Stefan Popović",
  description:
    "A playable casino HUD prototype rendered with PixiJS: five reels, bet steppers, autoplay, a paytable drawer and full keyboard navigation — built from the same design tokens as the product.",
  alternates: { canonical: "/ui/hud" },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Interactive HUD prototype — PixiJS",
    description:
      "Five reels, bet steppers, autoplay, a paytable drawer and keyboard navigation, drawn entirely in PixiJS.",
    locale: "en_US",
    url: "/ui/hud",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Popzify" }],
  },
};

const CRTE = [
  ["Reels and spin", "Five reels with staggered stops, a masked scroll, and symbols written only once a reel lands — the draw is never visible mid-flight. Turbo halves every duration."],
  ["Real rules", "Weighted symbol draw, five fixed paylines, pays left to right from the first reel. Three, four and five of a kind pay different multiples, and the balance is checked before every spin."],
  ["Bet and autoplay", "Stepper with clamped range and a max shortcut, both disabled while the reels move. Autoplay counts down, stops itself when the balance runs out, and can be stopped mid-run."],
  ["Drawer", "Paytable, settings and spin history slide in over the game. Opening it moves focus into the drawer and Escape returns it."],
  ["Controller navigation", "Arrow keys move the focus ring between controls, Enter activates, Escape closes. Focus skips anything currently disabled, which is why the ring never lands on a dead button."],
  ["One token set", "Every colour, radius and spacing value is the same number as in the product's theme file. Nothing here is a one-off — the system renders the same whether the pixels come from the DOM or from a canvas."],
];

export default function Strana() {
  const t = tekst.en;

  return (
    <main className={styles.page}>
      <span className="corner tl" />
      <span className="corner tr" />

      <header className={styles.top}>
        <a className={styles.brand} href="/en">
          <b>Pop</b>zify
        </a>
        <div className={styles.desno}>
          <a className="mono" href="/ui">
            UI/UX case study
          </a>
          <a className="mono" href="/design">
            Graphic design
          </a>
          <a className="mono" href="#kontakt">
            {t.kontaktVeza}
          </a>
        </div>
      </header>

      <section className={styles.uvod}>
        <div className={styles.uvodTekst}>
          <p className="mono">Interactive prototype · PixiJS</p>
          <h1 className="display">
            A casino HUD, <em className="outline">playable.</em>
          </h1>
          <p className="lead">
            Not a mockup and not a video. Five reels, a bet stepper, autoplay, a paytable drawer
            and full keyboard navigation, drawn entirely with PixiJS on a canvas — no images, no
            sprites, no engine. Press space or click Spin.
          </p>
          <p className={styles.potpis}>
            <strong>{osoba.ime}</strong>
            <span className="mono">{osoba.uloga.en}</span>
          </p>
        </div>
      </section>

      <section className={styles.projekat}>
        <Hud />
      </section>

      <section className={styles.projekat}>
        <div className={styles.zaglavljeProjekta}>
          <h2 className="display">What it actually does</h2>
          <p className={styles.uvodProjekta}>
            A prototype earns its name by behaving, not by looking finished. Everything below is
            running — the rules, the states and the edge cases included.
          </p>
        </div>
        <ul className={ui.parovi}>
          {CRTE.map(([k, v]) => (
            <li key={k}>
              <h3>{k}</h3>
              <p>{v}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.kraj} id="kontakt">
        <h2 className="display">{t.kontaktNaslov}</h2>
        <p className="lead">{t.kontaktP}</p>
        <div className={styles.akcije}>
          <a className={styles.dugme} href={`mailto:${firma.email}`}>
            {t.pisi}
          </a>
          <a className={styles.dugmeTiho} href="/ui">
            UI/UX case study
          </a>
        </div>
      </section>

      <footer className={styles.foot}>
        <p className="mono">
          {osoba.ime} · {firma.ime} · {firma.sediste} · <a href="/en">{t.nazad}</a>
        </p>
      </footer>
    </main>
  );
}
