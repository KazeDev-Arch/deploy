# 05 — Conventions de code

Ces conventions sont déduites du code existant et des docs TanStack Start. Si le code déjà écrit contredit une règle ci-dessous, **le code existant fait foi** — mettre à jour ce fichier plutôt que d'imposer la règle ancienne (cf. skill `remember`).

## Langue

- **Code** (variables, fonctions, fichiers, types) : **anglais**.
- **Contenu utilisateur** (copies UI, labels) : **français**. Actuellement en dur dans les composants (pas de couche i18n). Ne pas introduire de texte dans une langue incohérente avec l'UI existante.

## Imports & alias

- Alias canonique : **`#/`** → `./src/*` (configuré dans `package.json` (`imports`) et `tsconfig.json`).
- `@/` est aussi configuré mais **déprécié** : migrer les imports `@/` existants vers `#/`.
- Exemple : `import { cn } from '#/lib/utils'`, `import { Button } from '#/components/ui/button'`.

## Nommage des fichiers

- **kebab-case** pour les fichiers de composants et utilitaires (`article-card.tsx`, `markdown-content.tsx`, `auth-shell.tsx`).
- **Routes** (convention TanStack Router) : `index.tsx`, `about.tsx`, `$postId.tsx` (param dynamique), `$.tsx` (wildcard), dossiers pour les segments (`api/auth/$`).

## Routing (TanStack Router)

- Fichiers de route dans `src/routes/`. Chaque route exporte `Route` via `createFileRoute('<path>')({ ... })`.
- `__root.tsx` = route racine (coquille HTML). `routeTree.gen.ts` est généré — **ne jamais l'éditer** ; régénérer avec `npm run generate-routes`.
- Param dynamique : `$postId.tsx` → `createFileRoute('/posts/$postId')`.
- Le path passé à `createFileRoute` est géré automatiquement ; ne pas le modifier à la main quand on renomme/déplace un fichier.

## Données : loaders vs server functions

- **Loader** (dans le fichier route) : charger les données **côté serveur** au rendu de la route.

```tsx
export const Route = createFileRoute('/articles')({
  loader: async () => {
    const data = await strapiApi.articles.getArticlesData()
    return data
  },
  component: ArticlesPage,
})
```

- **Server function** (`createServerFn`) : logique serveur appelable **depuis le client** (fetch, mutations, accès DB). Toujours valider l'input (Zod) :

```ts
export const createComment = createServerFn({ method: 'POST' })
  .inputValidator((input: { postId: string; content: string }) => input) // ou un schéma Zod
  .handler(async ({ data }) => {
    // ... logique serveur
  })
```

- Côté composant, wrapper une mutation avec `useServerFn()` (TanStack Query) plutôt qu'appeler la server function brute.
- **Pattern mutation** : server function dans `mutations/` (logique métier) → hook dans `hooks/` (`useServerFn` + `useMutation` + toast + navigation) → composant (purement présentation).

## Pattern 3-fichiers (docs TanStack Start)

Quand une capacité grossit, séparer :

```
src/data/loaders/users.functions.ts   → createServerFn (importable partout)
src/data/loaders/users.server.ts      → helpers serveur uniquement (DB, logique interne)
src/data/loaders/schemas.ts           → schémas Zod partagés (client-safe)
```

- `.server.ts` n'est importé **que** dans les handlers des server functions.
- Ne pas importer dynamiquement une server function (problèmes de bundler).

## Découpage en couches

- `components/ui/` : primitives shadcn — pas de logique métier.
- `components/<domaine>/` : UI spécifique à un écran/domaine.
- `data/loaders/` : server functions d'accès aux données.
- `mutations/` : server functions de mutation (écriture, mutations).
- `hooks/` : tous les fichiers `*.hooks.ts` (hooks React, mutations TanStack Query, custom hooks).
- `schemas/` : schémas Zod de validation.
- `lib/` : utilitaires purs (pas de logique métier de domaine).
- `integrations/` : wrappers d'intégrations tierces.
- Ne jamais faire un appel DB/HTTP direct dans un composant — passer par `data/loaders/`, `mutations/` ou `lib/`.

## Règles shadcn (source : `.agents/skills/shadcn/rules/`)

À respecter pour toute UI. Les incontournables :
- **Tokens sémantiques** : `bg-primary`, `text-muted-foreground` — jamais de couleurs brutes.
- **`cn()`** pour les classes conditionnelles (`#/lib/utils`), pas de ternaires de template literal.
- **`gap-*`**, pas `space-x-*`/`space-y-*`. `size-*` quand largeur = hauteur.
- **Formulaires** : `FieldGroup` + `Field` (pas de `div` + `Label`). Validation : `data-invalid` sur le `Field`, `aria-invalid` sur le contrôle.
- **Icônes** : `data-icon="inline-start|inline-end"`, pas de classes de taille sur l'icône.
- **`Skeleton`** pour le chargement, **`Empty`** pour les états vides, **`Separator`** (pas `<hr>`), **`Badge`** (pas de `<span>` stylé).
- **`Button` n'a pas `isPending`/`isLoading`** : composer `Spinner` + `data-icon` + `disabled`.
- Base `radix` : pattern `asChild` (pas `render`).

> Vérifier avec `npx shadcn@latest info` les composants réellement installés avant d'en importer un ; ajouter les manquants via `npx shadcn@latest add <composant>`.

## Design system

- Pas de couleur/police codée en dur hors des tokens définis dans `02-design-system.md`.
- Réutiliser les primitives de `components/ui/` avant d'en créer de nouvelles.

## Variables d'environnement

- `src/env.ts` utilise `@t3-oss/env-core` avec **`runtimeEnv: process.env`** (pas `import.meta.env`). En Vite SSR, `process.env` contient toutes les vars, `import.meta.env` ne contient que les `VITE_`.
- Vars serveur (`GOOGLE_CLIENT_ID`, `RESEND_API_KEY`, etc.) : dans `server:` du schema, `process.env`.
- Vars client (`VITE_*`) : dans `client:` du schema, lues depuis `process.env` via `clientPrefix: 'VITE_'`.
- Les vars optionnelles utilisent `.optional()` — le serveur démarre sans elles, les fonctionnalités correspondantes sont désactivées.

## Prisma & base de données

- Le client est généré dans `src/generated/prisma` (`prisma generate`) — ne pas éditer.
- Schéma dans `prisma/schema.prisma`. Migrations via `npm run db:migrate`.
- Modifier le schéma → régénérer le client.

## Typage & qualité

- `tsc --noEmit` sans erreur dans les fichiers modifiés.
- Hooks React toujours appelés inconditionnellement.
- `noUnusedLocals`/`noUnusedParameters` activés — pas de code mort.

## Avant d'ajouter une dépendance

Vérifier qu'une lib déjà présente couvre le besoin (`04-tech-stack.md`). Demander confirmation avant d'ajouter une dépendance qui chevauche une capacité existante.

## Hooks

Tout fichier `*.hooks.ts` (hooks React, mutations TanStack Query, custom hooks) doit vivre dans **`src/hooks/`**, pas colocalisé avec les composants ou les mutations.

```
src/hooks/auth.hooks.ts      → hooks d'authentification
src/hooks/posts.hooks.ts     → hooks de gestion des articles
src/hooks/comments.hooks.ts  → hooks de gestion des commentaires
```

Règle : un seul endroit pour chercher les hooks, quel que soit le domaine métier.

Toute valeur constante partagée (URLs, seuils, mappings, valeurs par défaut) → un fichier dédié (`src/lib/` ou un module de constantes), pas dans le composant qui l'utilise. Exceptions : constantes purement locales à un composant.

## Checklist avant de livrer

1. **shadcn** — pas de couleur en dur, primitives réutilisées, règles shadcn respectées.
2. **Typage** — `tsc --noEmit` propre sur les fichiers modifiés.
3. **Hooks** — aucun hook conditionnel.
4. **Data** — pas d'appel DB/HTTP direct dans un composant ; server functions validées.
5. **Généré** — pas d'édition de `routeTree.gen.ts` ni de `generated/prisma/`.
