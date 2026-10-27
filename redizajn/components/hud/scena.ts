import { Application, Container, Graphics, Text, TextStyle, type Ticker } from "pixi.js";
import {
  ALPHA,
  DOBOSI,
  LINIJE,
  POCETNO_STANJE,
  RADIUS,
  REDOVI,
  SIMBOLI,
  SPACE,
  T,
  ULOZI,
  izvuci,
  novac,
  proveri,
  type Pogodak,
  type Simbol,
} from "@/lib/hud";

/**
 * HUD kazino igre, crtan PixiJS-om.
 *
 * Sve je nacrtano — nema nijedne slike ni sprajta. Simboli su slova u
 * zaobljenim poljima, pa prototip nema zavisnosti i ucitava se odmah.
 *
 * Scena je napisana kao jedna klasa sa jasnim slojevima: `svet` drzi
 * logicki kadar 1000x620 i skalira se u raspolozivi prostor, pa raspored
 * ne mora da racuna sa stvarnim pikselima.
 *
 * Fokus se vodi rucno, listom `fokusabilni`, jer Pixi crta na platnu i
 * nema DOM fokus. Strelice menjaju fokus, Enter aktivira, Esc zatvara —
 * isto kao navigacija dzojstikom kroz meni.
 */

const SIRINA = 1000;
const VISINA = 620;

const font = (size: number, weight: string, boja: number, prored?: number) =>
  new TextStyle({
    fontFamily: "Inter, system-ui, sans-serif",
    fontSize: size,
    fontWeight: weight as TextStyle["fontWeight"],
    fill: boja,
    letterSpacing: prored ?? 0,
  });

type Dugme = {
  cvor: Container;
  pritisni: () => void;
  /** Vrati false kad je dugme trenutno neaktivno, pa fokus preskace. */
  aktivno: () => boolean;
  ime: string;
};

type Stanje = {
  stanjeRacuna: number;
  ulogIndeks: number;
  vrti: boolean;
  auto: number;
  zvuk: boolean;
  turbo: boolean;
  fioka: null | "paytable" | "settings" | "history";
};

export type Izlaz = {
  unisti: () => void;
  platno: HTMLCanvasElement;
};

export async function napraviScenu(domaci: HTMLElement): Promise<Izlaz> {
  const app = new Application();
  await app.init({
    backgroundAlpha: 0,
    antialias: true,
    resolution: Math.min(window.devicePixelRatio || 1, 2),
    autoDensity: true,
    width: SIRINA,
    height: VISINA,
  });
  domaci.appendChild(app.canvas);

  const svet = new Container();
  app.stage.addChild(svet);

  const s: Stanje = {
    stanjeRacuna: POCETNO_STANJE,
    ulogIndeks: 2,
    vrti: false,
    auto: 0,
    zvuk: true,
    turbo: false,
    fioka: null,
  };
  const ulog = () => ULOZI[s.ulogIndeks];

  const fokusabilni: Dugme[] = [];
  let fokus = 0;

  /* ---------------------------------------------------------------- ploca */

  const ploca = (
    x: number,
    y: number,
    w: number,
    h: number,
    boja: number = T.raised,
    r: number = RADIUS.card,
    ivica = true
  ) => {
    const g = new Graphics();
    g.roundRect(0, 0, w, h, r).fill(boja);
    if (ivica) g.roundRect(0.5, 0.5, w - 1, h - 1, r).stroke({ width: 1, color: T.hairline, alpha: ALPHA.hairline });
    g.position.set(x, y);
    return g;
  };

  const pozadina = ploca(0, 0, SIRINA, VISINA, T.base, RADIUS.xl);
  svet.addChild(pozadina);

  /* ------------------------------------------------------------- gornji red */

  const vrh = new Container();
  vrh.position.set(SPACE.xxl, SPACE.xxl);
  svet.addChild(vrh);

  const marka = new Text({ text: "AURUM", style: font(22, "800", T.brand, 2) });
  vrh.addChild(marka);
  const markaSub = new Text({ text: "FIVE REEL · 5 LINES", style: font(9, "700", T.textTertiary, 1.6) });
  markaSub.position.set(1, 27);
  vrh.addChild(markaSub);

  const tablica = (naslov: string, x: number, w = 170) => {
    const c = new Container();
    c.position.set(x, -4);
    const g = ploca(0, 0, w, 48, T.raised, RADIUS.md);
    c.addChild(g);
    const n = new Text({ text: naslov, style: font(9, "700", T.textTertiary, 1.4) });
    n.position.set(14, 9);
    c.addChild(n);
    const v = new Text({ text: "—", style: font(18, "800", T.textPrimary) });
    v.position.set(14, 22);
    c.addChild(v);
    vrh.addChild(c);
    return v;
  };

  const txtStanje = tablica("BALANCE", 300);
  const txtUlog = tablica("BET", 486, 130);
  const txtDobitak = tablica("LAST WIN", 630, 150);

  /* ------------------------------------------------------------------ dobosi */

  const OKVIR_X = SPACE.xxl;
  const OKVIR_Y = 108;
  const OKVIR_W = SIRINA - SPACE.xxl * 2;
  const OKVIR_H = 332;
  svet.addChild(ploca(OKVIR_X, OKVIR_Y, OKVIR_W, OKVIR_H, T.raised));

  const CELIJA_W = 168;
  const CELIJA_H = 96;
  const RAZMAK = 10;
  const mrezaW = DOBOSI * CELIJA_W + (DOBOSI - 1) * RAZMAK;
  const mrezaH = REDOVI * CELIJA_H + (REDOVI - 1) * RAZMAK;
  const MREZA_X = OKVIR_X + (OKVIR_W - mrezaW) / 2;
  const MREZA_Y = OKVIR_Y + (OKVIR_H - mrezaH) / 2;

  type Celija = { kutija: Graphics; znak: Text; sjaj: Graphics };
  const dobosi: Container[] = [];
  const celije: Celija[][] = [];
  let mreza: Simbol[][] = [];

  const maska = new Graphics();
  maska.rect(MREZA_X - 4, MREZA_Y - 4, mrezaW + 8, mrezaH + 8).fill(0xffffff);
  svet.addChild(maska);

  const napraviCeliju = (sim: Simbol) => {
    const c = new Container();
    const kutija = new Graphics();
    kutija.roundRect(0, 0, CELIJA_W, CELIJA_H, RADIUS.md).fill(T.elevated);
    kutija.roundRect(0.5, 0.5, CELIJA_W - 1, CELIJA_H - 1, RADIUS.md)
      .stroke({ width: 1, color: T.hairline, alpha: ALPHA.hairline });
    c.addChild(kutija);

    const sjaj = new Graphics();
    sjaj.roundRect(0, 0, CELIJA_W, CELIJA_H, RADIUS.md).stroke({ width: 2, color: T.brand });
    sjaj.alpha = 0;
    c.addChild(sjaj);

    const znak = new Text({
      text: sim.znak,
      style: font(46, "800", sim.boja),
    });
    znak.anchor.set(0.5);
    znak.position.set(CELIJA_W / 2, CELIJA_H / 2);
    c.addChild(znak);

    return { cvor: c, kutija, znak, sjaj };
  };

  for (let d = 0; d < DOBOSI; d++) {
    const reel = new Container();
    reel.position.set(MREZA_X + d * (CELIJA_W + RAZMAK), MREZA_Y);
    reel.mask = maska;
    svet.addChild(reel);
    dobosi.push(reel);
    celije.push([]);
    mreza.push([]);
    for (let r = 0; r < REDOVI; r++) {
      const sim = izvuci();
      mreza[d].push(sim);
      const { cvor, kutija, znak, sjaj } = napraviCeliju(sim);
      cvor.position.set(0, r * (CELIJA_H + RAZMAK));
      reel.addChild(cvor);
      celije[d].push({ kutija, znak, sjaj });
    }
  }

  /**
   * Objava dobitka sedi na savu između okvira i donje trake, nikad preko
   * polja. Prvo je stajala na sredini doboša i pokrivala tačno one simbole
   * koje igrač gleda kad mu linija plati; ovako se i iznos i upaljena
   * linija čitaju u istom pogledu.
   */
  const objava = new Container();
  objava.position.set(SIRINA / 2, OKVIR_Y + OKVIR_H + 12);
  objava.alpha = 0;
  const objavaPloca = new Graphics();
  objavaPloca.roundRect(-150, -22, 300, 44, RADIUS.pill).fill({ color: T.base, alpha: 0.98 });
  objavaPloca.roundRect(-150, -22, 300, 44, RADIUS.pill).stroke({ width: 2, color: T.won });
  objava.addChild(objavaPloca);
  const objavaNaslov = new Text({ text: "WIN", style: font(10, "700", T.won, 2) });
  objavaNaslov.anchor.set(0, 0.5);
  objavaNaslov.position.set(-120, 0);
  objava.addChild(objavaNaslov);
  const objavaIznos = new Text({ text: "", style: font(24, "800", T.textPrimary) });
  objavaIznos.anchor.set(1, 0.5);
  objavaIznos.position.set(122, 0);
  objava.addChild(objavaIznos);

  /* --------------------------------------------------------------- donji red */

  const dno = new Container();
  dno.position.set(SPACE.xxl, 464);
  svet.addChild(dno);
  const DNO_W = SIRINA - SPACE.xxl * 2;
  dno.addChild(ploca(0, 0, DNO_W, 124, T.raised));

  // Tek sada, da objava stoji iznad trake na koju naleze.
  svet.addChild(objava);

  /** Opsti okrugli/pilule taster sa stanjima, fokusom i pritiskom. */
  const dugme = (
    roditelj: Container,
    opcije: {
      x: number; y: number; w: number; h: number;
      natpis: string; ime: string;
      boja?: number; tekst?: number; r?: number; velicina?: number; tezina?: string;
      naKlik: () => void;
      aktivno?: () => boolean;
    }
  ): Dugme & { osvezi: (natpis?: string, boja?: number) => void } => {
    const c = new Container();
    c.position.set(opcije.x, opcije.y);
    roditelj.addChild(c);

    const r = opcije.r ?? RADIUS.pill;
    const g = new Graphics();
    c.addChild(g);
    const prsten = new Graphics();
    c.addChild(prsten);
    const t = new Text({
      text: opcije.natpis,
      style: font(opcije.velicina ?? 13, opcije.tezina ?? "700", opcije.tekst ?? T.textPrimary, 0.4),
    });
    t.anchor.set(0.5);
    t.position.set(opcije.w / 2, opcije.h / 2);
    c.addChild(t);

    let bojaSad = opcije.boja ?? T.elevated;
    let pritisnut = false;
    let preko = false;

    const crtaj = () => {
      const ziv = opcije.aktivno ? opcije.aktivno() : true;
      g.clear();
      const b = pritisnut ? T.brandPressed : bojaSad;
      g.roundRect(0, 0, opcije.w, opcije.h, Math.min(r, opcije.h / 2)).fill({ color: b, alpha: ziv ? 1 : 0.35 });
      if (bojaSad === T.elevated) {
        g.roundRect(0.5, 0.5, opcije.w - 1, opcije.h - 1, Math.min(r, opcije.h / 2))
          .stroke({ width: 1, color: T.hairline, alpha: preko ? ALPHA.strong : ALPHA.hairline });
      }
      t.alpha = ziv ? 1 : 0.45;
      c.cursor = ziv ? "pointer" : "default";
    };

    const osveziPrsten = (ima: boolean) => {
      prsten.clear();
      if (!ima) return;
      prsten.roundRect(-4, -4, opcije.w + 8, opcije.h + 8, Math.min(r + 4, opcije.h / 2 + 4))
        .stroke({ width: 2, color: T.brand, alpha: 0.9 });
    };

    c.eventMode = "static";
    c.on("pointerover", () => { preko = true; crtaj(); });
    c.on("pointerout", () => { preko = false; pritisnut = false; crtaj(); });
    c.on("pointerdown", () => { pritisnut = true; crtaj(); });
    c.on("pointerup", () => { pritisnut = false; crtaj(); });
    c.on("pointertap", () => {
      if (opcije.aktivno && !opcije.aktivno()) return;
      opcije.naKlik();
    });

    crtaj();

    const d: Dugme & { osvezi: (n?: string, b?: number) => void } = {
      cvor: c,
      ime: opcije.ime,
      pritisni: () => { if (!opcije.aktivno || opcije.aktivno()) opcije.naKlik(); },
      aktivno: () => (opcije.aktivno ? opcije.aktivno() : true),
      osvezi: (natpis?: string, boja?: number) => {
        if (natpis !== undefined) t.text = natpis;
        if (boja !== undefined) bojaSad = boja;
        crtaj();
      },
    };
    (d as unknown as { prsten: (v: boolean) => void }).prsten = osveziPrsten;
    fokusabilni.push(d);
    return d;
  };

  const prstenOd = (d: Dugme) =>
    (d as unknown as { prsten?: (v: boolean) => void }).prsten;

  // ulog
  const natpisUlog = new Text({ text: "BET", style: font(9, "700", T.textTertiary, 1.4) });
  natpisUlog.position.set(24, 22);
  dno.addChild(natpisUlog);

  const manje = dugme(dno, {
    x: 24, y: 42, w: 46, h: 46, natpis: "−", ime: "bet-down",
    velicina: 22, naKlik: () => { s.ulogIndeks = Math.max(0, s.ulogIndeks - 1); osveziVrh(); },
    aktivno: () => !s.vrti && s.ulogIndeks > 0,
  });
  const ulogPrikaz = new Text({ text: "", style: font(17, "800", T.textPrimary) });
  ulogPrikaz.anchor.set(0.5);
  ulogPrikaz.position.set(118, 65);
  dno.addChild(ulogPrikaz);
  const vise = dugme(dno, {
    x: 166, y: 42, w: 46, h: 46, natpis: "+", ime: "bet-up",
    velicina: 22, naKlik: () => { s.ulogIndeks = Math.min(ULOZI.length - 1, s.ulogIndeks + 1); osveziVrh(); },
    aktivno: () => !s.vrti && s.ulogIndeks < ULOZI.length - 1,
  });

  const maks = dugme(dno, {
    x: 228, y: 42, w: 86, h: 46, natpis: "MAX", ime: "bet-max",
    velicina: 11, naKlik: () => { s.ulogIndeks = ULOZI.length - 1; osveziVrh(); },
    aktivno: () => !s.vrti,
  });

  // spin
  const spin = dugme(dno, {
    x: DNO_W / 2 - 92, y: 30, w: 184, h: 64, natpis: "SPIN", ime: "spin",
    boja: T.brand, velicina: 17, tezina: "800",
    naKlik: () => zavrti(),
    aktivno: () => !s.vrti && s.stanjeRacuna >= ulog(),
  });

  // autoplay
  const autoDugme = dugme(dno, {
    x: DNO_W - 330, y: 42, w: 120, h: 46, natpis: "AUTO 10", ime: "auto",
    velicina: 11,
    naKlik: () => {
      if (s.auto > 0) { s.auto = 0; autoDugme.osvezi("AUTO 10"); poruka("Autoplay stopped"); }
      else { s.auto = 10; autoDugme.osvezi("STOP 10"); if (!s.vrti) zavrti(); }
    },
    aktivno: () => s.stanjeRacuna >= ulog() || s.auto > 0,
  });

  const turboDugme = dugme(dno, {
    x: DNO_W - 198, y: 42, w: 92, h: 46, natpis: "TURBO", ime: "turbo",
    velicina: 11,
    naKlik: () => { s.turbo = !s.turbo; turboDugme.osvezi(undefined, s.turbo ? T.brandTint : T.elevated); },
  });

  const meniDugme = dugme(dno, {
    x: DNO_W - 94, y: 42, w: 70, h: 46, natpis: "MENU", ime: "menu",
    velicina: 11,
    naKlik: () => otvoriFioku(s.fioka ? null : "paytable"),
  });

  /* ----------------------------------------------------------------- fioka */

  const FIOKA_W = 380;
  const fioka = new Container();
  fioka.position.set(SIRINA, 0);
  svet.addChild(fioka);

  const fiokaPloca = new Graphics();
  fiokaPloca.roundRect(0, 0, FIOKA_W, VISINA, RADIUS.xl).fill({ color: T.overlay, alpha: 0.98 });
  fiokaPloca.moveTo(0, 0).lineTo(0, VISINA).stroke({ width: 1, color: T.hairline, alpha: ALPHA.strong });
  fioka.addChild(fiokaPloca);

  const fiokaSadrzaj = new Container();
  fiokaSadrzaj.position.set(SPACE.xxl, 92);
  fioka.addChild(fiokaSadrzaj);

  const kartice: ("paytable" | "settings" | "history")[] = ["paytable", "settings", "history"];
  const karticaDugmad: ReturnType<typeof dugme>[] = [];
  kartice.forEach((k, i) => {
    const d = dugme(fioka, {
      x: SPACE.xxl + i * 112, y: 28, w: 104, h: 38,
      natpis: k.toUpperCase(), ime: "tab-" + k, velicina: 10,
      naKlik: () => otvoriFioku(k),
    });
    karticaDugmad.push(d);
  });

  const zatvori = dugme(fioka, {
    x: FIOKA_W - 66, y: 28, w: 42, h: 38, natpis: "✕", ime: "close", velicina: 14,
    naKlik: () => otvoriFioku(null),
  });

  const istorija: { dobitak: number; ulog: number }[] = [];

  const crtajFioku = () => {
    fiokaSadrzaj.removeChildren();
    if (!s.fioka) return;

    const red = (y: number, levo: string, desno: string, bojaDesno: number = T.textPrimary) => {
      const a = new Text({ text: levo, style: font(13, "500", T.textSecondary) });
      a.position.set(0, y);
      fiokaSadrzaj.addChild(a);
      const b = new Text({ text: desno, style: font(13, "700", bojaDesno) });
      b.anchor.set(1, 0);
      b.position.set(FIOKA_W - SPACE.xxl * 2, y);
      fiokaSadrzaj.addChild(b);
      const crta = new Graphics();
      crta.moveTo(0, y + 26).lineTo(FIOKA_W - SPACE.xxl * 2, y + 26)
        .stroke({ width: 1, color: T.hairline, alpha: ALPHA.subtle });
      fiokaSadrzaj.addChild(crta);
    };

    if (s.fioka === "paytable") {
      const n = new Text({ text: "PAYS LEFT TO RIGHT · ×BET", style: font(9, "700", T.textTertiary, 1.4) });
      fiokaSadrzaj.addChild(n);
      SIMBOLI.forEach((sim, i) => {
        const y = 28 + i * 40;
        const z = new Text({ text: sim.znak, style: font(22, "800", sim.boja) });
        z.position.set(0, y - 4);
        fiokaSadrzaj.addChild(z);
        const v = new Text({
          text: `${sim.isplata[0]}×   ${sim.isplata[1]}×   ${sim.isplata[2]}×`,
          style: font(13, "700", T.textPrimary),
        });
        v.anchor.set(1, 0);
        v.position.set(FIOKA_W - SPACE.xxl * 2, y);
        fiokaSadrzaj.addChild(v);
        const crta = new Graphics();
        crta.moveTo(0, y + 26).lineTo(FIOKA_W - SPACE.xxl * 2, y + 26)
          .stroke({ width: 1, color: T.hairline, alpha: ALPHA.subtle });
        fiokaSadrzaj.addChild(crta);
      });
      const nap = new Text({
        text: "Five paylines. Three or more matching symbols from the leftmost reel pay.",
        style: font(11, "400", T.textTertiary),
      });
      nap.position.set(0, 28 + SIMBOLI.length * 40 + 10);
      nap.style.wordWrap = true;
      nap.style.wordWrapWidth = FIOKA_W - SPACE.xxl * 2;
      fiokaSadrzaj.addChild(nap);
    }

    if (s.fioka === "settings") {
      const n = new Text({ text: "SETTINGS", style: font(9, "700", T.textTertiary, 1.4) });
      fiokaSadrzaj.addChild(n);
      red(32, "Sound", s.zvuk ? "ON" : "OFF", s.zvuk ? T.won : T.textTertiary);
      red(76, "Turbo spin", s.turbo ? "ON" : "OFF", s.turbo ? T.won : T.textTertiary);
      red(120, "Paylines", "5 fixed");
      red(164, "Return to player", "96.2%");
      red(208, "Bet range", `${novac(ULOZI[0])} – ${novac(ULOZI[ULOZI.length - 1])}`);
      const nap = new Text({
        text: "Prototype. No money is involved and nothing is wagered.",
        style: font(11, "400", T.textTertiary),
      });
      nap.position.set(0, 252);
      nap.style.wordWrap = true;
      nap.style.wordWrapWidth = FIOKA_W - SPACE.xxl * 2;
      fiokaSadrzaj.addChild(nap);
    }

    if (s.fioka === "history") {
      const n = new Text({ text: "LAST SPINS", style: font(9, "700", T.textTertiary, 1.4) });
      fiokaSadrzaj.addChild(n);
      if (istorija.length === 0) {
        const p = new Text({ text: "No spins yet.", style: font(13, "400", T.textTertiary) });
        p.position.set(0, 32);
        fiokaSadrzaj.addChild(p);
      }
      istorija.slice(0, 11).forEach((h, i) => {
        red(
          32 + i * 40,
          `Bet ${novac(h.ulog)}`,
          h.dobitak > 0 ? "+" + novac(h.dobitak) : "—",
          h.dobitak > 0 ? T.won : T.textTertiary
        );
      });
    }
  };

  let fiokaCilj = SIRINA;
  const otvoriFioku = (k: Stanje["fioka"]) => {
    s.fioka = k;
    fiokaCilj = k ? SIRINA - FIOKA_W : SIRINA;
    karticaDugmad.forEach((d, i) => d.osvezi(undefined, kartice[i] === k ? T.brandTint : T.elevated));
    meniDugme.osvezi(k ? "CLOSE" : "MENU");
    crtajFioku();
    postaviFokus(fokusabilni.findIndex((f) => f.ime === (k ? "tab-" + k : "menu")));
  };

  /* ---------------------------------------------------------------- poruka */

  const toast = new Container();
  toast.position.set(SIRINA / 2, 74);
  toast.alpha = 0;
  svet.addChild(toast);
  const toastPloca = new Graphics();
  toastPloca.roundRect(-150, -18, 300, 36, RADIUS.pill).fill({ color: T.lost, alpha: 0.18 });
  toastPloca.roundRect(-150, -18, 300, 36, RADIUS.pill).stroke({ width: 1, color: T.lost });
  toast.addChild(toastPloca);
  const toastTekst = new Text({ text: "", style: font(12, "700", T.lost, 0.4) });
  toastTekst.anchor.set(0.5);
  toast.addChild(toastTekst);
  let toastDo = 0;
  const poruka = (tekst: string) => {
    toastTekst.text = tekst;
    toastDo = performance.now() + 2200;
  };

  /* ----------------------------------------------------------------- fokus */

  const postaviFokus = (i: number) => {
    if (i < 0) return;
    fokus = i;
    fokusabilni.forEach((d, j) => {
      const p = prstenOd(d);
      if (p) p(j === i && d.aktivno());
    });
  };

  const pomeriFokus = (smer: number) => {
    const n = fokusabilni.length;
    for (let k = 1; k <= n; k++) {
      const i = (fokus + smer * k + n * k) % n;
      const d = fokusabilni[i];
      const uFioci = d.ime.startsWith("tab-") || d.ime === "close";
      if (!d.aktivno()) continue;
      if (s.fioka && !uFioci && d.ime !== "menu") continue;
      if (!s.fioka && uFioci) continue;
      postaviFokus(i);
      return;
    }
  };

  const tipka = (e: KeyboardEvent) => {
    if (["ArrowRight", "ArrowDown"].includes(e.key)) { e.preventDefault(); pomeriFokus(1); }
    else if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); pomeriFokus(-1); }
    else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fokusabilni[fokus]?.pritisni(); }
    else if (e.key === "Escape") { if (s.fioka) otvoriFioku(null); }
  };
  window.addEventListener("keydown", tipka);

  /* ------------------------------------------------------------------ vrtnja */

  type Vrtnja = { do: number; brzina: number; stao: boolean; pomak: number };
  let vrtnje: Vrtnja[] = [];
  let dobitakPrikaz = 0;
  let dobitakCilj = 0;
  let stanjePrikaz = s.stanjeRacuna;
  let pogoci: Pogodak[] = [];
  let objavaDo = 0;

  const osveziVrh = () => {
    txtUlog.text = novac(ulog());
    ulogPrikaz.text = novac(ulog());
    [manje, vise, maks, spin, autoDugme].forEach((d) => d.osvezi());
    postaviFokus(fokus);
  };

  const zavrti = () => {
    if (s.vrti) return;
    if (s.stanjeRacuna < ulog()) { poruka("Insufficient balance"); s.auto = 0; autoDugme.osvezi("AUTO 10"); return; }

    s.stanjeRacuna = +(s.stanjeRacuna - ulog()).toFixed(2);
    s.vrti = true;
    pogoci = [];
    dobitakCilj = 0;
    dobitakPrikaz = 0;
    objava.alpha = 0;
    celije.forEach((k) => k.forEach((c) => { c.sjaj.alpha = 0; }));
    spin.osvezi("SPINNING");
    [manje, vise, maks, spin].forEach((d) => d.osvezi());

    const osnovno = s.turbo ? 420 : 900;
    vrtnje = dobosi.map((_, i) => ({
      do: performance.now() + osnovno + i * (s.turbo ? 90 : 190),
      brzina: 2400 + Math.random() * 400,
      stao: false,
      pomak: 0,
    }));
  };

  const stani = (d: number) => {
    // Novi simboli se upisuju tek kad se dobos zaustavi, pa izvlacenje
    // nikad ne moze da se vidi na pola puta.
    for (let r = 0; r < REDOVI; r++) {
      const sim = izvuci();
      mreza[d][r] = sim;
      const c = celije[d][r];
      c.znak.text = sim.znak;
      c.znak.style.fill = sim.boja;
    }
    dobosi[d].y = MREZA_Y;
  };

  const zavrsi = () => {
    s.vrti = false;
    pogoci = proveri(mreza, ulog());
    const ukupno = +pogoci.reduce((z, p) => z + p.dobitak, 0).toFixed(2);
    istorija.unshift({ dobitak: ukupno, ulog: ulog() });
    if (ukupno > 0) {
      dobitakCilj = ukupno;
      s.stanjeRacuna = +(s.stanjeRacuna + ukupno).toFixed(2);
      objavaIznos.text = novac(ukupno);
      objavaDo = performance.now() + 1500;
      pogoci.forEach((p) => {
        for (let d = 0; d < p.duzina; d++) {
          const c = celije[d][LINIJE[p.linija][d]];
          c.sjaj.alpha = 1;
        }
      });
    }
    txtDobitak.text = ukupno > 0 ? novac(ukupno) : "—";
    txtDobitak.style.fill = ukupno > 0 ? T.won : T.textPrimary;
    spin.osvezi("SPIN");
    [manje, vise, maks, spin, autoDugme].forEach((d) => d.osvezi());
    if (s.fioka === "history") crtajFioku();
    postaviFokus(fokus);

    if (s.auto > 0) {
      s.auto -= 1;
      autoDugme.osvezi(s.auto > 0 ? `STOP ${s.auto}` : "AUTO 10");
      if (s.auto > 0) window.setTimeout(() => zavrti(), s.turbo ? 220 : 620);
    }
  };

  /* ------------------------------------------------------------------ petlja */

  const korak = (tick: Ticker) => {
    const dt = tick.deltaMS / 1000;
    const sad = performance.now();

    // doboši
    if (s.vrti) {
      let svi = true;
      vrtnje.forEach((v, d) => {
        if (v.stao) return;
        svi = false;
        v.pomak += v.brzina * dt;
        const period = CELIJA_H + RAZMAK;
        dobosi[d].y = MREZA_Y + ((v.pomak % period) - period);
        if (sad >= v.do) {
          v.stao = true;
          stani(d);
        }
      });
      if (svi) zavrsi();
    }

    // brojevi se penju, ne skacu
    stanjePrikaz += (s.stanjeRacuna - stanjePrikaz) * (1 - Math.exp(-6 * dt));
    if (Math.abs(stanjePrikaz - s.stanjeRacuna) < 0.01) stanjePrikaz = s.stanjeRacuna;
    txtStanje.text = novac(stanjePrikaz);
    txtStanje.style.fill = s.stanjeRacuna < ulog() ? T.pending : T.textPrimary;

    dobitakPrikaz += (dobitakCilj - dobitakPrikaz) * (1 - Math.exp(-5 * dt));

    // objava dobitka
    const zeljena = sad < objavaDo ? 1 : 0;
    objava.alpha += (zeljena - objava.alpha) * (1 - Math.exp(-9 * dt));
    objava.scale.set(0.96 + objava.alpha * 0.04);

    // pulsiranje pogodaka
    if (pogoci.length) {
      const p = 0.55 + Math.sin(sad / 170) * 0.45;
      pogoci.forEach((h) => {
        for (let d = 0; d < h.duzina; d++) celije[d][LINIJE[h.linija][d]].sjaj.alpha = p;
      });
    }

    // fioka
    fioka.x += (fiokaCilj - fioka.x) * (1 - Math.exp(-11 * dt));

    // poruka
    const t = sad < toastDo ? 1 : 0;
    toast.alpha += (t - toast.alpha) * (1 - Math.exp(-10 * dt));
  };
  app.ticker.add(korak);

  /* ------------------------------------------------------------- skaliranje */

  const skaliraj = () => {
    const w = domaci.clientWidth;
    if (!w) return;
    const k = Math.min(w / SIRINA, 1.25);
    svet.scale.set(k);
    app.renderer.resize(SIRINA * k, VISINA * k);
  };
  const posmatrac = new ResizeObserver(skaliraj);
  posmatrac.observe(domaci);
  skaliraj();

  osveziVrh();
  txtDobitak.text = "—";
  postaviFokus(fokusabilni.findIndex((f) => f.ime === "spin"));
  crtajFioku();

  return {
    platno: app.canvas,
    unisti: () => {
      window.removeEventListener("keydown", tipka);
      posmatrac.disconnect();
      app.ticker.remove(korak);
      app.destroy(true, { children: true });
    },
  };
}
