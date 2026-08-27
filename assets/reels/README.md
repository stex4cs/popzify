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

Šest klipova isečenih iz tri sirova eksporta:

| Fajl | Sekcija | Iz čega |
|------|---------|---------|
| `honda-izlazak.mp4` | hero | `honda.mp4`, 3–11s |
| `svadba-par.mp4` | hero | `svadba.mp4`, 17–25s |
| `svadba-dron.mp4` | galerija | `svadba.mp4`, 11.5–18.5s |
| `bojkovic-trening.mp4` | galerija | `bojkovic.mp4`, 4–12s |
| `bojkovic-mec.mp4` | galerija | `bojkovic.mp4`, 23–30s |
| `honda-pobeda.mp4` | galerija | `honda.mp4`, 12–19s |

U herou stoje namerno borilačka veče i svadba — najveći raspon odmah,
da posetilac u prve dve sekunde vidi da se ne radi samo jedna stvar.

Sirovi eksporti stoje u `_src/` i **nisu u gitu** (desetine MB). Ako ti trebaju
na drugoj mašini, prebaci ih ručno.

## Gde su slotovi

| Slot | Sekcija | Napomena |
|------|---------|----------|
| 1–2  | hero | kreću odmah pri učitavanju — ovde idu dva najjača snimka |
| 3+   | galerija „Ovako to izgleda" | učitavaju se tek kad dođu u vidno polje |

## Ako je izvor 16:9

`svadba.mp4` je bio 4K landscape. Centralno sečenje radi kad su subjekti
u sredini kadra:

```bash
ffmpeg -ss 17 -i _src/svadba.mp4 -t 8 -an \
  -vf "crop=1215:2160:(iw-1215)/2:0,scale=720:1280" \
  -c:v libx264 -crf 30 -preset slow -pix_fmt yuv420p -movflags +faststart svadba-par.mp4
```

(`1215` je `2160 * 9/16` — visina ostaje puna, širina se seče na vertikalu.)

Probano je i punjenje pozadine zamućenom kopijom, da bi ceo 16:9 kadar
stao unutra — **ne valja**: dve trećine slike je mutna kaša i izgleda
jeftino pored klipova koji pune ceo kadar. Radije biraj deo snimka gde je
kompozicija centrirana, pa seci.

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
