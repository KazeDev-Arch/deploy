# 04 — Stack technique (confirmé)

## Framework & rendu
- **TanStack Start** (full-stack React, SSR, streaming) — version `latest`.
- **TanStack Router** (routing par fichiers, type-safe).
- **@tanstack/react-router-ssr-query** (intégration SSR de TanStack Query).
- **React 19** / **React DOM 19**.

## Données & état
- **TanStack Query** (fetching, cache, mutations via `useServerFn` + `useMutation`).
- **TanStack Form** (formulaires).
- **TanStack Table** (tableaux).

## Backend & base de données
- **PostgreSQL** via **Prisma 7** + **@prisma/adapter-pg** (client généré dans `src/generated/prisma`).
- **better-auth** (authentification email/mot de passe + Google OAuth + `tanstackStartCookies`).
- **Inngest** (background jobs, envoi d'emails OTP).
- **Resend** (envoi d'emails transactionnels).
- **Strapi** (headless CMS) via `@strapi/client` — **legacy** : les articles migrent vers Prisma `Post` (voir `08-decisions-log.md`).

## Paiement
- **K-Pay** (`provider: "KPAY"`) — Mobile Money, devise **XAF**. **Seul moyen de paiement** : pas de Stripe ni de carte bancaire (voir `08-decisions-log.md`).

## UI & styles
- **Tailwind CSS v4** (`@tailwindcss/vite` + `@tailwindcss/typography` + `tw-animate-css`).
- **shadcn/ui** (base `radix`, style `new-york`, `baseColor` zinc) : `class-variance-authority`, `clsx`, `tailwind-merge`, `radix-ui`, `lucide-react`.
- **sonner** (notifications toast, utilisé pour les retours success/error).
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
