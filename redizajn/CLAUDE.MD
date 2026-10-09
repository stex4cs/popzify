# Popzify — dizajn sistem i pravila za sajt

Popzify je video produkcija iz Beograda: video, dron snimanje, montaža, social dizajn i reels.
Sajt mora sam da dokaže ono što prodajemo: kinematski, imerzivan, "premium" utisak u stilu
Active Theory / Lusion / Immersive Garden. Ništa ne sme da izgleda kao template.

Referentna implementacija hero sekcije: `design/hero/popzify-hero.html`.
Logo znak: `design/hero/2_play.svg` (P čija je šupljina play trougao, u tankom prstenu).
Svaka nova sekcija mora da izgleda kao da pripada istom svetu kao hero.

---

## Koncept: "vizir kamere"

Ceo sajt je kadar koji snimamo. Posetilac gleda kroz vizir kamere.

- **Uglovi kadra**: tanki L-uglovi (1.5px, `--frame`) u uglovima ekrana. Koriste se i na karticama i video previewima.
- **HUD detalji** su sadržaj, ne ukras: REC tačka, timecode `HH:MM:SS:FF` na 24 fps, oznake kao
  `4K · 24 FPS · 180°`, `ISO 800 · ƒ/2.8`, GPS koordinate lokacije snimanja, broj kadra/take-a.
  Koristi ih za numeraciju projekata (npr. `TAKE 03`, `SC 02 / SH 14`), trajanje videa i lokacije.
- **Play trougao** iz logoa je ponavljajući motiv: hover na video, CTA, tranzicije (video se "otvara" iz trougla).

## Boje (jedini, tamni izgled — nema light teme)

```css
--void:   #07060d;  /* pozadina, svuda */
--ink:    #ecebff;  /* glavni tekst */
--muted:  #8d8bb3;  /* sekundarni tekst, HUD oznake */
--violet: #6366f1;  /* brend akcenat, "Pop" u wordmarku */
--lilac:  #b9a6ff;  /* sjaj, čestice */
--cyan:   #67e8f9;  /* hladni odsjaj, retko */
--rec:    #ff3b5c;  /* SAMO REC tačka i live indikatori */
--frame:  rgba(236,235,255,.55); /* uglovi kadra, tanke linije */
```

- Violet je akcenat, ne pozadina. Nikad velike ljubičaste površine, nikad generički purple→blue gradijent hero.
- Sjaj dolazi iz svetla (bloom, čestice, refleksije), ne iz obojenih kutija.
- Bez belih ili svetlih sekcija.

## Tipografija

- **Unbounded** (500/700): naslovi. Veliki, zbijeni (`letter-spacing: -.02em`, `line-height: ~1.02`).
  Akcenat-reč u naslovu može biti outline (`color: transparent; -webkit-text-stroke: 1px var(--ink)`), max jedna po naslovu.
- **Manrope** (400/600): tekst. Linije do ~45–65 karaktera, `line-height: 1.55`.
- **JetBrains Mono** (400/600): HUD oznake, timecode, metapodaci. 11–12px, UPPERCASE, `letter-spacing: .14em`, `tabular-nums`.
- Ne koristiti Inter, Space Grotesk, Poppins za UI (Poppins je samo u wordmarku logoa).

## 3D / WebGL

- Three.js kao npm paket (ne CDN). Svaka scena u zasebnoj client komponenti sa kompletnim cleanup-om na unmount
  (renderer.dispose, geometrije, materijali, teksture, event listeneri, requestAnimationFrame).
- Materijali iz hero-a: stakleni `MeshPhysicalMaterial` (transmission, iridescence, attenuation ljubičasta),
  hromirani prsten (metalness 1, roughness ~0.14). RoomEnvironment kao env map. Post: UnrealBloomPass + OutputPass.
- Čestice: additive blending, paleta lilac/belo/violet/cyan, lagano plutaju nagore, reaguju na miš.
- Kursor/miš "režira kadar": blaga parallax rotacija, nikad nagla.
- Jedna glavna WebGL scena po strani. Ostale sekcije koriste CSS/GSAP i video, ne nove canvase.
- Mobilni: manje čestica, pixelRatio max 1.5, kamera dalje da sve stane. Uvek testiraj na ~390px širine.
- `prefers-reduced-motion`: usporiti sve animacije na ~25%, isključiti trepćuće elemente.

## Video

- Video je glavni sadržaj sajta. Svaki projekat ima video preview koji kreće na hover (desktop) / u viewportu (mobilni), muted, loop, `playsinline`.
- Formati: 16:9 za desktop, 9:16 za mobilni kad postoji. Ako postoji samo 9:16, na desktopu ide uspravan kadar
  u sredini sa zamućenom i zatamnjenom verzijom istog videa kao pozadinom (nikad prazne crne trake).
- Showreel se otvara iz play trougla logoa (tranzicija sa skrola).
- Uvek poster slika, lazy loading, kompresovani fajlovi (H.264 + WebM/AV1 gde ima smisla).

## Pokret

- Smooth scroll (Lenis) + GSAP ScrollTrigger.
- Jedan orkestriran momenat po sekciji, ne efekti razbacani svuda.
- Easing: `power3.out` / `expo.out`, trajanja 0.6–1.2s. Ništa ne odskače (bez bounce/elastic).
- Sadržaj mora biti vidljiv i bez animacije; animacija kreće iz vidljivog stanja, nikad `opacity: 0` koji čeka observer.

## Layout

- Puni ekran, ivica do ivice, sa marginom kadra `clamp(16px, 3.2vw, 40px)`.
- Asimetrične kompozicije, veliki naslovi uz ivicu kadra, HUD tekst u uglovima. Izbegavati sve-centrirano.
- Bez generičkih kartica sa `rounded-lg` + senka svuda. Radijusi mali (0–6px) ili nikakvi; okvir je "kadar", ne "kartica".
- Numeracija (`01 / 02`) samo kad je sadržaj stvarno niz; inače HUD oznake (TAKE, SC/SH, lokacija).

## Copy

- Kratko, direktno, samouvereno. Aktiv. Bez floskula ("we are passionate about...").
- Konkretno: imena klijenata, lokacije, oprema, brojevi (pregledi, trajanje, broj snimanja).
- Jezik sajta: [upiši: engleski / srpski / oba].

## Kako radimo

- Sekciju po sekciju. Za svaku novu sekciju prvo predloži 2–3 koncepta (kratak opis + šta je "wow" momenat), pa tek onda kod.
- Posle implementacije: pokreni dev server, proveri konzolu, desktop i mobilni prikaz.
- Ako nešto izgleda "templejtovano" ili jeftino, to je bug: popraviti pre nego što se ide dalje.
