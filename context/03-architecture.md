# 03 — Architecture (TanStack Start)

Arborescence réelle sous `src/` (à date) :

```
src/
├── routes/                 → routing par fichiers (TanStack Router)
│   ├── __root.tsx          → coquille du document (<html>, <HeadContent>, <Scripts>)
│   ├── _public.tsx         → layout public (Header + Footer)
│   ├── _public/            → index, about, posts/, auth/, demo/
│   ├── _dashboard.tsx      → layout panneau partagé client/admin (auth obligatoire)
│   ├── _dashboard/admin/   → index, articles, comments, subscribers, payments, settings
│   └── api/                → auth/$.ts (better-auth), inngest.ts
├── router.tsx              → createRouter + intégration SSR Query
├── routeTree.gen.ts        → GÉNÉRÉ (ne pas éditer)
├── components/
│   ├── ui/                 → primitives shadcn (button, card, input, ...)
│   ├── blocks/             → blocs de contenu article (rich-text, media, quote, slider)
│   ├── home/               → sections de l'accueil (hero, latest-articles, subscribe, newsletter)
│   ├── auth/               → UI d'authentification (auth-shell)
│   └── (Header.tsx, Footer.tsx, article-card.tsx, markdown-content.tsx, pagination.tsx, search.tsx, strapi-image.tsx)
├── data/
│   ├── loaders/            → LEGACY (Strapi) — ne plus y ajouter de server function
│   └── strapi-sdk.ts       → client SDK Strapi (legacy)
├── mutations/              → TOUTES les server functions (createServerFn), lecture + écriture
├── schemas/                → schémas Zod de validation
├── integrations/           → intégrations tierces (better-auth/, tanstack-query/)
├── lib/                    → utilitaires (auth.ts, auth-client.ts, auth-guard.ts, permissions.ts, utils.ts)
├── hooks/                  → hooks + gestion de l'UI (toasts, navigation, invalidation)
├── types/                  → types partagés (strapi.ts, ...)
├── generated/prisma/       → client Prisma GÉNÉRÉ (ne pas éditer)
├── env.ts                  → validation d'env (@t3-oss/env-core)
├── db.ts / database-url.ts → connexion Prisma (adapter PostgreSQL)
└── styles.css              → thème shadcn + tokens (Tailwind v4)
```

## Flux de données (TanStack Start)

1. **Chargement serveur** : `loader` dans le fichier route (`createFileRoute('/...')({ loader })`).
2. **Appels depuis le client** : **server functions** (`createServerFn`) exportées depuis `src/mutations/`, appelées via `useServerFn()` (wrappées dans un hook de `src/hooks/`).
3. **Accès base** : Prisma (auth, posts, abonnements, paiements, commentaires, likes) via `src/lib/` et `src/db.ts`.
4. **Contenu éditorial** : Strapi (headless CMS) via `src/data/strapi-sdk.ts` — les articles exposent des **blocs de contenu** rendus par `src/components/blocks/`.

## Où créer un nouveau code (règles)

- **Route** : nouveau fichier dans `src/routes/` (`createFileRoute`), composant colocalisé ou réexporté depuis `components/<domaine>/`.
- **Server function** : `src/mutations/<domaine>.ts` (toutes les « actions » / requêtes serveur, lecture et écriture) ; pattern 3-fichiers si ça grossit (`.functions.ts` / `.server.ts` / `schemas.ts` dans `src/schemas/`).
- **Primitive UI** : `src/components/ui/` (shadcn, via `npx shadcn@latest add ...`).
- **Composant d'écran/domaine** : `src/components/<domaine>/`.
- **Utilitaires** : `src/lib/`.
- **Hooks partagés** : `src/hooks/`.
- **Types partagés** : `src/types/`.
- **Intégration tierce** : `src/integrations/<nom>/`.

## Source de vérité : Prisma `Post`

Les articles sont stockés et servis via le modèle **Prisma `Post`** (PostgreSQL) : `title`, `slug`, `content` (markdown), `excerpt`, `coverImage`, `postImages`, `isPremium`, `status`, `publishedAt`.

**Strapi est legacy** : son SDK (`src/data/strapi-sdk.ts`), ses loaders (`src/data/loaders/articles.ts`), ses types (`src/types/strapi.ts`), ses blocs (`src/components/blocks/`) et les routes `demo/strapi.*` sont à retirer progressivement au profit de Prisma. Voir `08-decisions-log.md`. Ne pas introduire une troisième source.
