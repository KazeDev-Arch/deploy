# 06 — Contrats API (server functions, Strapi, auth)

Squelette vivant : documenter ici chaque contrat (server function, endpoint REST, modèle) dès qu'il est défini, pour éviter que client et serveur divergent.

## Server functions (API interne)

Les server functions (toutes les « actions » / requêtes serveur, lecture et écriture) sont exportées depuis **`src/mutations/`**.

> ⚠️ Les functions « Articles (Strapi) » ci-dessous sont **legacy** : la source de vérité des articles est Prisma `Post` (voir `08-decisions-log.md`). Elles seront remplacées par des server functions lisant le modèle `Post`.

### Articles (Strapi)
- `getArticlesData({ page?, category?, query? })` — `GET` — retourne `TStrapiResponseCollection<TArticle>` (pagination `PAGE_SIZE = 3`, tri `createdAt:desc`, populate `cover, author, category`).
- `getArticleByIdData(documentId)` — `GET` — `TStrapiResponseSingle<TArticle>` (populate `cover, author, category, blocks.file, blocks.files`).
- `getArticleBySlugData(slug)` — `GET` — `TStrapiResponseCollection<TArticle>`.

### Posts (Prisma — panneau admin)

- `listPosts()` — `GET` — retourne tous les posts (avec auteur), triés par `updatedAt desc`. Réservé `authorize('article', 'read')`.
- `getPost(id)` — `GET` — retourne un post par id, ou lève « Article introuvable ». Réservé `authorize('article', 'read')`.
- `createPost(input)` — `POST` — Input : `{ title, content, excerpt?, coverImage?, postImages: string[], isPremium, status }` (schéma `#/schemas/post`). Le **slug est généré côté serveur** (titre slugifié + suffixe d'unicité) — il n'est ni saisi ni envoyé par le client. `publishedAt` est posé si `status = PUBLISHED`. Réservé `authorize('article', 'create')`.
- `updatePost(input)` — `POST` — Input : idem `createPost` + `id`. Le **slug n'est jamais modifié** (stabilité des URLs partagées). Réservé `authorize('article', 'update')`.
- `deletePost(id)` — `POST` — supprime le post. Réservé `authorize('article', 'delete')`.

Lié à : modèle Prisma `Post`, exigences « Écriture » de `01-product-requirements.md`.

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
