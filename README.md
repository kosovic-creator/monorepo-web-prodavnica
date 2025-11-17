# Monorepo Web Prodavnica
#upustvo novo
Ovaj monorepo sadrži dvije Next.js aplikacije:
- `apps/client` – glavna prodavnica
- `apps/admin` – admin panel

Za zajednički kod koristi folder `packages/`.

Pokretanje i razvoj:
- Svaka aplikacija ima svoj package.json i može se pokretati nezavisno.
- Monorepo koristi Turborepo za orkestraciju.

Spremno za deployment na Vercel..