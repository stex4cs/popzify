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

## Šta je trenutno unutra

Četiri klipa isečena iz dva sirova eksporta (FNC borilačke večeri):

| Fajl | Sekcija | Iz čega |
|------|---------|---------|
| `honda-izlazak.mp4` | hero | `honda.mp4`, 3–11s |
| `bojkovic-trening.mp4` | hero | `bojkovic.mp4`, 4–12s |
| `bojkovic-mec.mp4` | galerija | `bojkovic.mp4`, 23–30s |
| `honda-pobeda.mp4` | galerija | `honda.mp4`, 12–19s |

Sirovi eksporti stoje u `_src/` i **nisu u gitu** (desetine MB). Ako ti trebaju
na drugoj mašini, prebaci ih ručno.

## Gde su slotovi

| Slot | Sekcija | Napomena |
|------|---------|----------|
| 1–2  | hero | kreću odmah pri učitavanju — ovde idu dva najjača snimka |
| 3+   | galerija „Ovako to izgleda" | učitavaju se tek kad dođu u vidno polje |

Galerija trenutno ima klasu `reel-grid-2` koja je drži centriranu jer su samo
dva primera. Kad dodaš treći, skini tu klasu sa `<div class="reel-grid ...">`.

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
