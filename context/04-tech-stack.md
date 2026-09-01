# 04 — Stack technique (confirmé)

## Framework & rendu
- **TanStack Start** (full-stack React, SSR, streaming) — version `latest`.
- **TanStack Router** (routing par fichiers, type-safe).
- **@tanstack/react-router-ssr-query** (intégration SSR de TanStack Query).
- **React 19** / **React DOM 19**.

## Données & état
- **TanStack Query** (fetching, cache, mutations).
- **TanStack Form** (formulaires).
- **TanStack Table** (tableaux).

## Backend & base de données
- **PostgreSQL** via **Prisma 7** + **@prisma/adapter-pg** (client généré dans `src/generated/prisma`).
- **better-auth** (authentification email/mot de passe + `tanstackStartCookies`).
- **Strapi** (headless CMS) via `@strapi/client` — source de contenu éditorial.

## UI & styles
- **Tailwind CSS v4** (`@tailwindcss/vite` + `@tailwindcss/typography` + `tw-animate-css`).
- **shadcn/ui** (base `radix`, style `new-york`, `baseColor` zinc) : `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`, `lucide-react`.
- **react-markdown** + **remark-gfm** (rendu Markdown des articles).

## Validation & types
- **Zod 4** (validation des inputs de server functions, schémas).
- **@t3-oss/env-core** (validation des variables d'env, `src/env.ts`).
- **TypeScript 6** (`strict`, `noUnusedLocals`, `noUnusedParameters`).

## Observabilité
- **Sentry** (`@sentry/tanstackstart-react`).

## Tooling
- **Vite 8**, **ESLint 9** (`@tanstack/eslint-config`), **Prettier 3**.
- **@faker-js/faker** (données de démo/seed), **use-debounce**.

## Scripts utiles
- `npm run dev` — serveur de dev (port 3000).
- `npm run generate-routes` — régénère `routeTree.gen.ts`.
- `npm run build` / `npm run preview` / `npm run start`.
- `npm run lint` / `npm run format` / `npm run check`.
- `npm run db:generate` / `db:push` / `db:migrate` / `db:studio` / `db:seed`.

## À confirmer avec l'utilisateur avant de généraliser
- Fournisseur de paiement : **K-Pay** (`provider: "KPAY"`, devise **XAF**) — confirmer si c'est le seul moyen (pas de Stripe/carte pour l'instant).
- Source de vérité des articles : Strapi vs Prisma `Post` (voir `08-decisions-log.md`).
