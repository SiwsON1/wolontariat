# DESIGN.md - wolontariat.org.pl

Kierunek: **ciepły, ludzki, redakcyjny (warm editorial)**. Magazyn o ludziach, nie korpo-CSR. Papierowa baza, charakterny serif w nagłówkach, dużo powietrza, prawdziwe ludzkie zdjęcia, subtelny ruch.

## Kolor (OKLCH, neutrale tintowane ciepłem)
Strategia: **Committed** - zieleń jako kolor marki niesie tożsamość, terakota jako ciepły akcent CTA/linków. Bez czystej czerni i bieli. Zero fioletu/neonu/AI-blue.

```css
/* tła / papier */
--paper:        oklch(0.972 0.012 85);   /* ciepły kremowy base */
--paper-raised: oklch(0.988 0.010 85);   /* karty/sekcje wyżej */
--paper-sunken: oklch(0.945 0.016 80);   /* sekcje wgłębione */

/* atrament / tekst */
--ink:          oklch(0.245 0.022 65);   /* ciepła prawie-czerń, tekst */
--ink-soft:     oklch(0.435 0.020 70);   /* tekst drugorzędny */
--ink-faint:    oklch(0.620 0.018 75);   /* podpisy, meta */

/* marka: głęboka zieleń (wolontariat, wzrost, natura, zaufanie) */
--green:        oklch(0.430 0.072 152);
--green-deep:   oklch(0.330 0.060 152);  /* hover/footer */
--green-tint:   oklch(0.945 0.030 152);  /* tła chipów/badge */

/* akcent: terakota/glina (ciepło, ludzkie, CTA + linki) */
--clay:         oklch(0.640 0.130 45);
--clay-deep:    oklch(0.560 0.130 42);   /* hover */
--clay-tint:    oklch(0.945 0.035 55);

--line:         oklch(0.890 0.012 80);   /* hairline bordery 1px */
```

Reguły: akcent (clay) używany oszczędnie, głównie CTA i linki w treści. Zieleń jako kolor sekcji-marki (hero akcenty, footer, kategorie). Cienie tintowane ciepłem, miękkie i szerokie (`0 20px 40px -20px oklch(0.245 0.02 65 / 0.12)`), nie czarne glowy.

## Typografia
- **Display / nagłówki: Fraunces** (variable, optical sizing, ciepły charakterny serif). `tracking` lekko ujemny na dużych. To jest "głos" marki.
- **Body / UI: Geist Sans** (ships z Next). Czysty humanistyczny grotesk pod tekst, nawigację, UI.
- **Tekst artykułu**: Geist Sans 18px, `leading-relaxed`, szerokość max **68ch**. Rozważyć serif (Fraunces soft) na lead/cytaty.
- Skala nagłówków kontrast min. 1.25. H1 hero `clamp(2.6rem, 6vw, 4.75rem)`, nie krzyczy rozmiarem w UI, hierarchia wagą i kolorem.
- Liczby w danych/meta: tabular.

## Layout
- `max-w-[1240px] mx-auto`, padding boczny min `px-5 md:px-8`.
- Hero **asymetryczny** (nie wycentrowany): tekst lewa, foto/kolaż prawa, lub split z nakładką. DESIGN_VARIANCE ~7.
- Siatki przez CSS Grid. **Zakaz 3 równych kart** w rzędzie. Listing artykułów: jeden duży "lead" + asymetryczna siatka (np. 2fr/1fr, masonry-like), nie identyczne kafle.
- Hairline 1px `--line` zamiast ciężkich kart. Karty tylko gdy elewacja niesie hierarchię. Bez zagnieżdżonych kart, bez side-stripe borderów.
- Full-height sekcje: `min-h-[100dvh]`, nigdy `h-screen`.

## Motion (MOTION_INTENSITY ~5)
- Easing: `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`, `--ease-io: cubic-bezier(0.77, 0, 0.175, 1)`. Bez bounce/elastic.
- Animować TYLKO `transform` i `opacity`. Czas UI < 300ms.
- Hero/listing: jeden zorkiestrowany load-in ze staggerem 40-70ms.
- Linki/karty hover: subtelne `translateY(-2px)` + zmiana koloru. `:active scale(0.98)`.
- Zdjęcia w artykule: reveal `clip-path` przy wejściu w viewport (once).
- `prefers-reduced-motion`: zostają opacity/kolor, znika ruch pozycji.
- Hover gate: `@media (hover:hover) and (pointer:fine)`.

## Zdjęcia
Prawdziwe, ludzkie, ciepłe kadry (wolontariat w akcji). Lekki warm grade. Placeholdery dev: `https://picsum.photos/seed/<slug>/1200/800`. Docelowo: bank zdjęć w `public/img/` (do podmiany na realne). Bez stockowego "happy business team". Zero emoji w UI (ikony: Phosphor / inline SVG).

## Komponenty v1
Header (logo serif + nav + CTA "Znajdź wolontariat"), Hero asymetryczny, sekcja "Od czego zacząć" (3 ścieżki: młodzież / dorośli / seniorzy, ale NIE jako 3 równe karty), listing artykułów (lead + asymetryczna siatka), pasek misji/zaufania, blok kategorii, stopka redakcyjna z E-E-A-T (redakcja, źródła, kontakt). Strona artykułu: nagłówek z meta (autor, data, kategoria, czas czytania), lead, treść 68ch, spis treści dłuższych, blok źródeł, powiązane artykuły.
