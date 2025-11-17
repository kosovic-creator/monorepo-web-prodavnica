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

## Deploy na Vercel (TurboRepo Monorepo)

1. **Project Root**: Podesi root direktorijum na koren projekta (gde su `package.json` i `turbo.json`).
2. **Build Command**:
   ```sh
   turbo run build
   ```
3. **Output Directory**:
   - Za admin aplikaciju: `apps/admin/.next`
   - Za client aplikaciju: `apps/client/.next`
4. **Monorepo build**: Turbo automatski gradi sve pakete po zavisnostima (`dependsOn: ["^build"]` u `turbo.json`).
5. **Environment Variables**: Ne zaboravi da podesiš sve potrebne varijable (npr. za bazu, auth, cloudinary, itd.) u Vercel dashboardu.

**Napomena:**
- Nema potrebe za custom build skriptama u svakom app paketu, koristi samo Turbo build iz root-a.
- Ako dodaš novi package koji je dependency, Turbo će ga automatski build-ovati pre aplikacija koje ga koriste.

## Lokalni build redosled (admin)

Ako želiš da lokalno izgradiš admin aplikaciju i sve njene zavisnosti bez TurboRepo-a, koristi skriptu:

```sh
sh scripts/build-admin.sh
```

Ova skripta automatski prvo gradi `packages/auth`, pa zatim `apps/admin`.

Za full monorepo build koristi:

```sh
npm run build
```
ili
```sh
npx turbo run build
```

---