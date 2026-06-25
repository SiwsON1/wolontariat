# wolontariat.org.pl - STATUS (2026-06-25)

Projekt wlasny: portal o wolontariacie pod WhitePress / reklamodawcow. Odzyskana aged domena (.org.pl, 25 lat historii NGO, czysta), kupiona z Aftermarket.

## Architektura (headless, LIVE)
- **Front: Next.js 16** (App Router, Tailwind v4) jako **static export** (`output: export`).
- **CMS: headless WordPress** pod `/cms`, baza **SQLite** (bez MySQL), **WPGraphQL** + **ACF**.
- Blog zasilany z WordPressa przy buildzie. Zrodlo tresci przelacza env `CONTENT_SOURCE=wp` (inaczej mock z plikow .md).
- Hosting: **cyber-folks s32** (`s32.cyber-folks.pl`, IP 195.78.67.71). Tylko FTP.
- Domena: NS przepiete na `ns1/2/3.cyberfolks.pl` (delegacja w rejestrze .pl). Strona LIVE na http://wolontariat.org.pl.

## Dostepy
- FTP + WP admin + IP/NS: **`~/projekty/wolontariat-deploy.md`** (POZA repo, repo jest public, NIE commitowac hasel).
- wp-admin: http://wolontariat.org.pl/cms/wp-admin (login admin, haslo w deploy.md).
- Repo: github.com/SiwsON1/wolontariat (public). GitHub Pages = tylko podglad (basePath /wolontariat), nie produkcja.

## Co jest zrobione
- 24 artykuly (w WP + zrodlowe .md w src/content/posts). Pisane stackiem, brand-safe, bez em-dash.
- 10 podstron miast `/wolontariat/[miasto]` + indeks + wyszukiwarka organizacji (realne dane OPP, 9316 org z wykazu NIW/dane.gov.pl, src/data/organizations.json).
- Strona glowna (hero z ACF WP, sekcje Czego szukasz / Rodzaje / FAQ+schema / Czego szukasz / Zacznij tutaj), /o-nas, /zglos-organizacje, kategorie jako landingi.
- Zdjecia: prawdziwe z Pexels w `public/img/` (mapowanie slug->obraz: src/lib/covers.ts).
- SEO: sitemap.ts, robots.ts, metadata/OG/Twitter, breadcrumb + Article/BreadcrumbList/FAQPage JSON-LD, spis tresci, pasek postepu.

## Deploy / publikacja
- **Rebuild produkcji: `./rebuild.sh`** (build z WP + lftp deploy na cyber-folks). To jest mechanizm po edycji w WP.
- GitHub Actions FTP **NIE dziala** (runnery GitHuba blokuja FTP) - workflow usuniety. Pages workflow (podglad, mock) zostaje.
- Lokalny WordPress (drugi egzemplarz do edycji/sync): `~/projekty/wolontariat-wp` (SQLite, wp-cli.phar). Start: `php -d error_reporting=0 -S localhost:8088 wp-router.php`.

## Workflow dodawania tresci (na teraz)
1. Pisz artykul jako .md w src/content/posts (Codex/stack).
2. Sync do lokalnego WP (re-import wszystkich .md -> wp-cli), upload `.ht.sqlite` na cyber-folks (`/cms/wp-content/database/.ht.sqlite`), usun stare -wal/-shm.
3. `./rebuild.sh`.
(Docelowo: redakcja edytuje wprost w wp-admin, wtedy .md przestaje byc zrodlem prawdy.)

## Gotchas
- Migracja bazy = upload pliku `.ht.sqlite`; jak WP padnie po uploadzie - re-upload czysto + usun `.ht.sqlite-wal`/`-shm`.
- coverImage przy zrodle WP bierze sie z src/lib/covers.ts (WP nie trzyma naszych /img).
- Build pod cyber-folks = ROOT (bez PAGES_BASE_PATH). Pod Pages = `PAGES_BASE_PATH=/wolontariat`.

## TODO / nastepne
- **SSL** - cert Let's Encrypt do wygenerowania w panelu cyber-folks (zglasza klient/ktos z panelem). Bez tego https straszy, http dziala.
- **Pelny automat publikacji** - webhook z WP -> rebuild. Wymaga SFTP/SSH na cyber-folks (FTP z CI zablokowane) albo crona na Macu.
- Zdjecia do biblioteki mediow WP (zeby redakcja zmieniala je z panelu).
- pSEO: combos `/wolontariat/[miasto]/[kategoria]` (wzorzec ochotnicy, filtry w URL), wiecej miast.
- Wzbogacenie organizacji z otwartego API KRS (forma prawna, cele). Plan danych: docs/v2-agregator-dane.md.
- Wiecej tresci long-tail (dane keyword: docs/keyword-research-wroclaw.csv, plan: docs/content-plan.md).
- Design polish kolejnych sekcji, wydajnosc/cache.
