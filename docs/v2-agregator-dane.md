# v2 - Agregator organizacji per miasto (plan danych)

Research 2026-06-24. Cel: strony pSEO per miasto/gmina/województwo z organizacjami i ofertami wolontariatu. Legalnie, na oficjalnych otwartych danych, BEZ scrapowania portali komercyjnych.

## Architektura bazy
1. Szkielet geograficzny = wykaz OPP z NIW (dane.gov.pl, dataset 4628/171).
   Kolumny: NR KRS, NIP, NAZWA, WOJEWODZTWO, POWIAT, GMINA, MIEJSCOWOSC. ~9700 organizacji, aktualizacja miesięczna.
2. Wzbogacenie = otwarte API KRS (api-krs.ms.gov.pl, dokumentacja prs.ms.gov.pl/krs/openApi, dataset dane.gov.pl 27606).
   Iteracja po KRS z wykazu -> JSON: adres, forma prawna (fundacja/stowarzyszenie), cele/przedmiot działalności, status (odfiltruj likwidacje). Inkrementalna aktualizacja przez usługę "podmioty zmienione danego dnia". Respektuj limity (throttling, cache, retry). Bezpłatne, bez SLA.
3. Opcjonalnie rejestr.io (płatne API KRS) tylko jeśli darmowe API MS niestabilne. Najpierw sprawdzić w ich regulaminie czy wolno republikować.

## Pola
Wyciągniemy: nazwa, KRS, NIP, REGON, forma prawna, adres siedziby (miejscowosc/gmina/powiat/wojewodztwo), cele/przedmiot działalności, status.
NIE wyciągniemy z otwartych źródeł: telefon, e-mail, www, opis "od organizacji", oferty wolontariatu.
Te pozyskać: własny formularz "dodaj/zgłoś organizację lub ofertę" (user-generated, najbezpieczniej) + oficjalny wniosek do NIW o dane z SOW (Korpus Solidarności) jako informacja sektora publicznego.

## Oferty wolontariatu
NIE scrapować ngo.pl / Korpus / Ochotnicy (restrykcyjne regulaminy, prawo sui generis do bazy danych).
Zamiast: (a) własny moduł "dodaj ofertę", (b) wniosek do NIW o SOW, (c) linkowanie zamiast kopiowania.

## Ryzyka i mitigacja
- Prawo sui generis + regulaminy ngo.pl/rejestr.io: bazuj na danych urzędowych (OPP, KRS), nie kopiuj baz portali.
- RODO: dane organizacji bezpieczne; API KRS anonimizuje osoby fizyczne. Nie publikować danych członków zarządów.
- Atrybucja: podawać "dane: KRS / wykaz OPP NIW-CRSO" (wymóg licencji + trust signal).
- Aktualność: pokazywać datę aktualizacji rekordu + formularz zgłoszenia korekty (E-E-A-T).

## Do potwierdzenia przed wdrożeniem
- Aktualny format pliku OPP (PDF vs XLSX/CSV) na dane.gov.pl.
- Regulamin API KRS + dokumentacja endpointów (prs.ms.gov.pl/krs/openApi), limity zapytań.
