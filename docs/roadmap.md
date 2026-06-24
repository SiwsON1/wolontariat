# Roadmapa - wolontariat.org.pl

## Zrobione
- Wybor i konfiguracja srodowiska: Next.js 16 + headless WordPress, repo, CI/CD, podglad na GitHub Pages.
- System designu (PRODUCT.md, DESIGN.md), design v1 + 3 rundy polish (cieply editorial).
- 10 artykulow blogowych (1200+ slow), brand-safe, bez em-dash.
- Sekcje: Rodzaje wolontariatu, FAQ + schema FAQPage, trust strip redakcyjny.
- Szablony pod SEO: meta/OG/Twitter, canonical, breadcrumb (+schema), prev/next, spis tresci, pasek postepu, Article + BreadcrumbList JSON-LD, kategorie jako landing pages, filtr kategorii na blogu.
- Headless WP udowodniony lokalnie: WP+SQLite+WPGraphQL, adapter WordPressSource, toggle env.

## W toku
- Podstrony pSEO "wolontariat [miasto]" (10 miast) + indeks /wolontariat + link w nawigacji.

## Faza 1 - fundament tresci i SEO (najpierw)
- Senuto: eksport slow "wolontariat [miasto]" i "[typ]" -> wybor miast/tematow pod realny ruch.
- Rozbudowa pSEO: combos miasto + kategoria (/wolontariat/[miasto]/[kategoria]), wzorzec ochotnicy (filtry w URL).
- Wiecej artykulow pod long-tail (z Senuto), wewnetrzne linkowanie artykul <-> miasto.
- sitemap.xml, robots.txt, OG images (statyczne lub generowane).

## Faza 2 - agregator organizacji (dane)
- Pobranie wykazu OPP (NIW, dane.gov.pl) + wzbogacenie z otwartego API KRS.
- Baza organizacji per miasto/kategoria, strony organizacji.
- Filtry w URL (kategoria, miasto, tryb zdalny/stacjonarny) jako landing pages.
- Formularz "zglos organizacje / oferte" (user-generated, brand-safe).

## Faza 3 - go-live na wolontariat.org.pl
- Domena z Aftermarket -> DNS.
- WordPress na cms.wolontariat.org.pl (cPanel netim.smarthost.pl) + WPGraphQL.
- Front na Vercel + domena wolontariat.org.pl.
- Webhook: publikacja w WP -> rebuild / revalidate frontu.

## Faza 4 - monetyzacja i wzrost
- Integracja WhitePress (auto-publikacja artykulow sponsorowanych przez WP).
- Polityka linkow (dofollow z umiarem, miks naturalny).
- Analytics + Google Search Console + monitoring pozycji (seostatystyki/seo-lab).
- E-E-A-T: rozbudowa redakcji, autorzy, aktualizacje dat.
