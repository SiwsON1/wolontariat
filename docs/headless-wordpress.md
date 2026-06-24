# Headless WordPress - status i uruchomienie

Front (Next) czyta tresc przez adapter `ContentSource`. Zrodlo wybiera env:
- `CONTENT_SOURCE=wp` + `WP_GRAPHQL_URL=...` -> headless WordPress (WPGraphQL), `src/lib/wordpress.ts`
- inaczej -> lokalne pliki .md, `src/lib/content.ts` (mock)

## Lokalny WordPress (dowod pipeline, bez Dockera/MySQL)
WP stoi w `~/projekty/wolontariat-wp` (WP core + plugin SQLite + WPGraphQL, baza w SQLite).
- start serwera: `cd ~/projekty/wolontariat-wp && php -d error_reporting=0 -S localhost:8088 wp-router.php`
- wp-admin: http://localhost:8088/wp-admin (admin / admin123)
- GraphQL: POST http://localhost:8088/graphql
- mu-plugin `wp-content/mu-plugins/graphql-extra.php` eksponuje pole `authorName`.

Front z WordPressa: `CONTENT_SOURCE=wp WP_GRAPHQL_URL=http://localhost:8088/graphql npm run dev`

## Produkcja (wolontariat.org.pl)
- Front (Next) -> Vercel, domena `wolontariat.org.pl`.
- WordPress (CMS) -> subdomena `cms.wolontariat.org.pl` na hostingu PHP/MySQL (np. netim.smarthost.pl), WPGraphQL.
- `WP_GRAPHQL_URL=https://cms.wolontariat.org.pl/graphql`, `CONTENT_SOURCE=wp`.
- Publikacja w WP -> webhook -> rebuild/revalidate frontu.

Potrzebne do go-live: domena/DNS (z Aftermarket), cPanel na hostingu pod WP, import repo na Vercel.
