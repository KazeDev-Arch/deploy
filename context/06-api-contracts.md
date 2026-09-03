# 06 — Contrats API (server functions, Strapi, auth)

Squelette vivant : documenter ici chaque contrat (server function, endpoint REST, modèle) dès qu'il est défini, pour éviter que client et serveur divergent.

## Server functions (API interne)

Les server functions (toutes les « actions » / requêtes serveur, lecture et écriture) sont exportées depuis **`src/mutations/`**.

> ⚠️ Les functions « Articles (Strapi) » ci-dessous sont **legacy** : la source de vérité des articles est Prisma `Post` (voir `08-decisions-log.md`). Elles seront remplacées par des server functions lisant le modèle `Post`.

### Articles (Strapi)
- `getArticlesData({ page?, category?, query? })` — `GET` — retourne `TStrapiResponseCollection<TArticle>` (pagination `PAGE_SIZE = 3`, tri `createdAt:desc`, populate `cover, author, category`).
- `getArticleByIdData(documentId)` — `GET` — `TStrapiResponseSingle<TArticle>` (populate `cover, author, category, blocks.file, blocks.files`).
- `getArticleBySlugData(slug)` — `GET` — `TStrapiResponseCollection<TArticle>`.

## Strapi (REST, headless CMS)

- Base : `VITE_STRAPI_URL` (défaut `http://localhost:1337`), chemin `/api`.
- Collection `articles` : filtres `$containsi`, `$eq`, `$or`, `$and` ; tri `createdAt:desc` ; pagination `{ page, pageSize }` ; populate `cover`, `author`, `category`, `blocks.file`, `blocks.files`.
- Types dans `src/types/strapi.ts` (`TArticle`, `TStrapiResponseCollection`, `TStrapiResponseSingle`).

## Authentification (better-auth)

- `src/lib/auth.ts` — instance `betterAuth` (`emailAndPassword` + `tanstackStartCookies`).
- Endpoint route : `src/routes/api/auth/$.ts`.
- Client : `src/lib/auth-client.ts`.

## À documenter au fur et à mesure

- Server functions d'écriture (créer un commentaire, liker, s'abonner, payer) — à ajouter dès qu'elles existent.
- Contrat de paiement K-Pay (checkout, callback/webhook, statuts) — provider confirmé, contrat à documenter.

Format attendu par entrée :

```
### <nom> (method)
Input : { ... }
Output : { ... }
Lié à : <exigence / modèle Prisma>
```
