import type { Metadata } from "next";
import { firma } from "@/lib/privatnost";
import { osoba, tekst } from "@/lib/design";
import Hud from "@/components/hud/Hud";
import styles from "@/components/design/design.module.css";
import ui from "@/components/design/ui.module.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://popzify.com"),
  title: "Interactive prototypes — PixiJS | Stefan Popović",
  description:
    "Two playable casino prototypes rendered with PixiJS: a HUD built from the product's design tokens, and a complete five-reel slot with paylines, wilds, free spins and a jackpot.",
  alternates: { canonical: "/ui/hud" },
  openGraph: {
    type: "website",
    siteName: "Popzify",
    title: "Interactive prototypes — PixiJS",
    description:
      "A token-driven casino HUD and a complete five-reel slot, both drawn in PixiJS and both playable in the browser.",
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

const igra = {
  grana: "Second prototype",
  naslov: "Fortune Gems Deluxe — the whole machine",
  adresa: "/igra/index.html",
  uvod:
    "The HUD above is the chrome around a game. This is the game: five reels on weighted strips, " +
    "twenty paylines, a wild that substitutes, a scatter that triggers free spins, four win tiers " +
    "and a jackpot level. Click Spin, or press space.",
  napomena:
    "Play money only — no wagering and no accounts. The declared RTP in the paytable is a configured figure, not a measured one.",
  ceoEkran: "Open full screen",
  crte: [
    ["Reels", "Five reels on weighted strips, stopping right to left with vertical motion blur and a bounce on landing. Turbo halves every duration; space quick-stops a spin in flight."],
    ["Paylines", "Twenty lines, paid right to left from the rightmost reel. Winning lines are drawn over the symbols and the winning cells spark and pulse, so the player can see why they were paid."],
    ["Wild and scatter", "Wild substitutes for every symbol except the scatter and pays on its own. Three or more scatters anywhere award free spins, which is why they are counted across the grid rather than along a line."],
    ["Free spins", "Ten to fifteen spins at a 2× multiplier, retriggerable, with the whole scene tinted for as long as the round lasts and a summary when it ends — the player should never have to wonder which mode they are in."],
    ["Win tiers", "Big, giant, massive and jackpot, chosen by win-to-bet ratio, each with its own overlay, count-up and coin shower. Autoplay stops itself on a feature or a jackpot rather than spinning past it."],
    ["One canvas, one scale", "Authored at 900×640 and scaled as a whole to the viewport, so all five reels survive a phone instead of the layout breaking apart."],
  ] as [string, string][],
};

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
          <p className="mono">Interactive prototypes · PixiJS</p>
          <h1 className="display">
            Casino interfaces, <em className="outline">playable.</em>
          </h1>
          <p className="lead">
            Not mockups and not videos. Two things you can actually play: a HUD drawn from the
            product’s own design tokens, and a complete five-reel slot with paylines, wilds, free
            spins and a jackpot. Both rendered with PixiJS on a canvas.
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

      <section className={styles.projekat} id="igra">
        <div className={styles.zaglavljeProjekta}>
          <p className={`mono ${styles.grana}`}>{igra.grana}</p>
          <h2 className="display">{igra.naslov}</h2>
          <p className={styles.uvodProjekta}>{igra.uvod}</p>
        </div>

        <div className={ui.okvirIgre}>
          {/* Zaseban staticki paket, ucitava se tek kad se dodje do njega:
              grafika i zvuk su nekoliko megabajta i ne smeju da uspore stranu. */}
          <iframe src={igra.adresa} title={igra.naslov} loading="lazy" />
        </div>
        <div className={ui.podIgrom}>
          <p>{igra.napomena}</p>
          <a href={igra.adresa} target="_blank" rel="noopener">
            {igra.ceoEkran} ↗
          </a>
        </div>

        <ul className={ui.parovi}>
          {igra.crte.map(([k, v]) => (
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
          <a className={styles.dugmeTiho} href="/design">
            Graphic design work
          </a>
        </div>
      </section>

      <footer className={styles.foot}>
        <p className="mono">
          {osoba.ime} · {firma.ime} · {firma.sediste} · <a href="/design">Design</a> ·{" "}
          <a href="/ui">UI/UX</a> · <a href="/en">{t.nazad}</a>
        </p>
      </footer>
    </main>
  );
}
