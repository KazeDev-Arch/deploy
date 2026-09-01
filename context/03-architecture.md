# 03 — Architecture (TanStack Start)

Arborescence réelle sous `src/` (à date) :

```
src/
├── routes/                 → routing par fichiers (TanStack Router)
│   ├── __root.tsx          → coquille du document (shell : <html>, Header, Footer, <Scripts>)
│   ├── index.tsx           → accueil
│   ├── about.tsx
│   ├── login.tsx / signup.tsx / forgot-password.tsx
│   └── api/auth/$.ts       → endpoint better-auth
├── router.tsx              → createRouter + intégration SSR Query
├── routeTree.gen.ts        → GÉNÉRÉ (ne pas éditer)
├── components/
│   ├── ui/                 → primitives shadcn (button, card, input, ...)
│   ├── blocks/             → blocs de contenu article (rich-text, media, quote, slider)
│   ├── home/               → sections de l'accueil (hero, latest-articles, subscribe, newsletter)
│   ├── auth/               → UI d'authentification (auth-shell)
│   └── (Header.tsx, Footer.tsx, article-card.tsx, markdown-content.tsx, pagination.tsx, search.tsx, strapi-image.tsx)
├── data/
│   ├── loaders/            → server functions d'accès aux données (articles.ts, index.ts)
│   └── strapi-sdk.ts       → client SDK Strapi
├── integrations/           → intégrations tierces (better-auth/, tanstack-query/)
├── lib/                    → utilitaires (auth.ts, auth-client.ts, utils.ts, strapi-utils.ts)
├── hooks/                  → hooks partagés
├── types/                  → types partagés (strapi.ts, ...)
├── generated/prisma/       → client Prisma GÉNÉRÉ (ne pas éditer)
├── env.ts                  → validation d'env (@t3-oss/env-core)
├── db.ts / database-url.ts → connexion Prisma (adapter PostgreSQL)
└── styles.css              → thème shadcn + tokens (Tailwind v4)
```

## Flux de données (TanStack Start)

1. **Chargement serveur** : `loader` dans le fichier route (`createFileRoute('/...')({ loader })`).
2. **Appels depuis le client** : **server functions** (`createServerFn`) exportées depuis `src/data/loaders/`, appelées via `useServerFn()` ou directement dans les loaders.
3. **Accès base** : Prisma (auth, posts, abonnements, paiements, commentaires, likes) via `src/lib/` et `src/db.ts`.
4. **Contenu éditorial** : Strapi (headless CMS) via `src/data/strapi-sdk.ts` — les articles exposent des **blocs de contenu** rendus par `src/components/blocks/`.

## Où créer un nouveau code (règles)

- **Route** : nouveau fichier dans `src/routes/` (`createFileRoute`), composant colocalisé ou réexporté depuis `components/<domaine>/`.
- **Server function** : `src/data/loaders/<domaine>.ts` (+ export dans `index.ts`) ; pattern 3-fichiers si ça grossit (`.functions.ts` / `.server.ts` / `schemas.ts`).
- **Primitive UI** : `src/components/ui/` (shadcn, via `npx shadcn@latest add ...`).
- **Composant d'écran/domaine** : `src/components/<domaine>/`.
- **Utilitaires** : `src/lib/`.
- **Hooks partagés** : `src/hooks/`.
- **Types partagés** : `src/types/`.
- **Intégration tierce** : `src/integrations/<nom>/`.

## Point d'attention : deux sources de vérité pour les articles

Deux modèles coexistent pour le contenu :
- **Strapi** (headless CMS) — actuellement utilisé par `src/data/loaders/articles.ts` et les routes `demo/strapi.*`.
- **Prisma `Post`** — modèle local avec `isPremium`, `content` (markdown), `status`, `publishedAt`.

À clarifier : quelle est la source de vérité des articles (Strapi vs PostgreSQL) et comment `isPremium` est déterminé. Voir `08-decisions-log.md`. Ne pas introduire une troisième source.
