import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

/**
 * Prijem upita sa kontakt stanice.
 *
 * Nasledjuje ponasanje php/process-lead.php sa starog sajta, uz jednu
 * bitnu razliku: PHP je upit prvo upisivao u data/leads_log.txt i zato
 * je smeo da vrati uspeh i kad posiljka e-maila padne. Ovde takvog
 * fajla nema — serverless instanca nema trajan disk — pa upit postoji
 * samo ako je e-mail stvarno otisao. Kad posiljka padne, vraca se
 * greska i broj telefona, nikad lazan uspeh.
 */

// Node runtime je podrazumevan i ne sme se rucno postavljati dok je
// ukljucen cacheComponents. Nodemailer radi samo na njemu.

const TO = process.env.LEAD_TO || "business@popzify.com";
const PHONE = "060 5973212";

/** Dozvoljeno upita po IP-u u prozoru. Namerno popustljivo: lazno
 *  blokiran covek sa placenog oglasa kosta vise od par visak upita. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 10;

/**
 * Brojac stoji u memoriji instance. Posle hladnog starta pocinje iz
 * nule i ne deli se izmedju instanci, pa je ovo meka zastita — botove
 * hvata honeypot. Za tvrd limit treba zajednicko skladiste (KV).
 */
const hits = new Map<string, number[]>();

function clientIp(req: Request): string {
  const cf = req.headers.get("cf-connecting-ip");
  if (cf) return cf.trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return "0.0.0.0";
}

/** Cisti unos i uklanja prelome reda, da se u zaglavlje e-maila ne moze
 *  ubaciti nova linija. */
function clean(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);
}

/** Kao clean(), ali zadrzava prelome reda — za telo poruke. */
function cleanMultiline(value: unknown, max = 3000): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

function fail(message: string, status: number) {
  return NextResponse.json({ status: "error", message }, { status });
}

function transport() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT || 465);
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  if (!form) return fail("Upit nije stigao u redu. Pokušaj ponovo.", 400);

  // Honeypot: polje je sakriveno od ljudi, popunjavaju ga botovi.
  // Botu vracamo uspeh da ne pokusava ponovo.
  if (clean(form.get("website"))) {
    return NextResponse.json({ status: "success", message: "Upit primljen." });
  }

  const ime = clean(form.get("ime"), 120);
  const telefon = clean(form.get("telefon"), 40);
  const email = clean(form.get("email"), 160);
  const usluga = clean(form.get("usluga"), 120);
  const izvor = clean(form.get("izvor"), 400);
  const poruka = cleanMultiline(form.get("poruka"));
  const saglasnost = !!form.get("saglasnost");

  if (!ime || !telefon) return fail("Upiši ime i broj telefona.", 400);
  if (telefon.replace(/\D/g, "").length < 8) return fail("Broj telefona nije ispravan.", 400);
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return fail("E-mail adresa nije ispravna.", 400);
  if (!saglasnost) return fail("Potrebna je saglasnost za obradu podataka.", 400);

  const ip = clientIp(req);
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    return fail(`Primili smo više upita sa ove veze. Pozovi nas na ${PHONE} i rešavamo odmah.`, 429);
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 500) {
    for (const [key, list] of hits) if (list.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }

  const mailer = transport();
  if (!mailer) {
    console.error("Lead: SMTP nije podesen (SMTP_HOST/SMTP_USER/SMTP_PASS). Upit nije poslat.");
    return fail(`Slanje trenutno ne radi. Pozovi nas na ${PHONE} ili piši na ${TO}.`, 503);
  }

  const vreme = new Date().toLocaleString("sr-RS", { timeZone: "Europe/Belgrade" });
  const red = (k: string, v: string) => `${k.padEnd(10)}${v || "-"}\n`;
  const body =
    `Novi upit sa popzify.com\n` +
    `--------------------------------------------------\n` +
    red("Ime:", ime) +
    red("Telefon:", telefon) +
    red("Email:", email) +
    red("Snimamo:", usluga) +
    red("Izvor:", izvor) +
    `--------------------------------------------------\n` +
    `Poruka:\n${poruka || "(nije uneta)"}\n` +
    `--------------------------------------------------\n` +
    `Vreme: ${vreme} | IP: ${ip}\n`;

  try {
    await mailer.sendMail({
      from: `Popzify sajt <${process.env.SMTP_USER}>`,
      to: TO,
      replyTo: email ? `${ime} <${email}>` : undefined,
      subject: `NOVI UPIT${usluga ? ` (${usluga})` : ""} — ${ime}`,
      text: body,
    });
  } catch (err) {
    // Bez trajnog loga upit bi ovde nestao, zato korisnik mora da sazna.
    console.error("Lead: slanje nije uspelo.", err);
    return fail(`Slanje nije uspelo. Pozovi nas na ${PHONE} i javljamo se odmah.`, 502);
  }

  return NextResponse.json({ status: "success", message: "Upit primljen." });
}
