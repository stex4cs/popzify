# Snimci za /reels

Ovde idu vertikalni snimci koji se prikazuju na `popzify.com/reels`.

## Kako se ubacuje

1. Ubaci `.mp4` fajl u ovaj folder, npr. `salon.mp4`.
2. Otvori `reels.html` i upiši putanju u `data-video` odgovarajućeg slota:

```html
<!-- pre -->
<div class="reel" data-video="" data-label="Lepota"><span class="reel-tag">Lepota</span></div>

<!-- posle -->
<div class="reel" data-video="assets/reels/salon.mp4" data-label="Lepota"><span class="reel-tag">Lepota</span></div>
```

To je sve. JS sam ubaci `<video>`, pusti ga bez zvuka u petlji i skloni placeholder.
Tekst u `reel-tag` je ono što piše preko snimka — promeni ga da odgovara snimku.

Opciono, prva slika dok se snimak ne učita:

```html
data-poster="assets/reels/salon.jpg"
```

## Gde su slotovi

| Slot | Sekcija | Napomena |
|------|---------|----------|
| 1–2  | hero | kreću odmah pri učitavanju — ovde idu dva najjača snimka |
| 3–7  | galerija „Ovako to izgleda" | učitavaju se tek kad dođu u vidno polje |

## Format

- **9:16** vertikalno, 720×1280 je sasvim dovoljno (1080 je bacanje podataka na ovoj veličini)
- **do 6 sekundi** — to su petlje, ne ceo Reel
- **bez zvuka** — svejedno se puštaju mutirano, audio je čist višak u fajlu
- **do ~1.5 MB po snimku** — sedam komada mora da stane u razuman budžet stranice

## Priprema fajla

`ffmpeg` je već instaliran na ovoj mašini:

```bash
ffmpeg -i ulaz.mp4 -an -t 6 -vf "scale=720:-2" \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart salon.mp4
```

- `-an` izbacuje audio
- `-t 6` seče na 6 sekundi
- `-movflags +faststart` pomera indeks na početak fajla, bez toga snimak
  ne kreće dok se ceo ne skine — obavezno za web

Provera veličine posle konverzije:

```bash
ls -lh assets/reels/
```
