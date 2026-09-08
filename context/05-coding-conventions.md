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

## Skills TanStack (référence officielle du projet)

Les bonnes pratiques TanStack vivent dans **`.agents/skills/tanstack/`** — `SKILL.md` (point d'entrée) + `references/` (11 fiches spécialisées). **À consulter avant toute tâche touchant Query, Router, Form, Start (server functions, middleware, SSR) ou Table**, et à respecter : en cas de conflit, la référence TanStack fait foi sur ce fichier.

| Sujet | Référence |
|---|---|
| Query keys / factories | `references/query-keys.md` |
| staleTime, gcTime, invalidation, placeholder/initial data | `references/query-caching.md` |
| Mutations, updates optimistes | `references/query-mutations.md` |
| Prefetching, queries parallèles, infinite queries, cancellation | `references/query-fetch-patterns.md` |
| SSR dehydrate/hydrate, offline networkMode | `references/query-ssr-offline.md` |
| Query error boundaries, select / performance | `references/query-errors-performance.md` |
| Enregistrement du router, typage `from`, routes virtuelles | `references/router-type-and-org.md` |
| Route loaders, ensureQueryData, chargement parallèle | `references/router-data-loading.md` |
| Search params, Link/navigate, route masks, preload | `references/router-search-nav.md` |
| Lazy routes, not-found, route context, auth beforeLoad | `references/router-split-errors-context.md` |
| TanStack Form : hooks, validateurs Zod, champs | `references/form.md` |

Règles transverses du `SKILL.md` (tripwires) :
- **Query** : clés-tableaux incluant toutes les dépendances ; mutations réconciliées via les clés canoniques (update depuis la réponse serveur ou invalidation) ; tout cache write optimiste doit avoir un rollback ; jamais de valeur non sérialisable dans une clé.
- **Router** : enregistrer le type du router ; valider les search params avec `.catch()` (defaults) ; `ensureQueryData` dans les loaders quand Query est couplé ; `throw redirect(...)` et non `return`.
- **Form** : `defaultValues` complets pour l'inférence ; Zod au niveau form/champ ; debounce des validateurs async ; `role="alert"` sur les erreurs de champ ; `preventDefault` au submit.

En complément, le fichier `AGENTS.md` (racine) embarque le catalogue **TanStack Intent** : une commande `npx @tanstack/intent@latest load <id>` à lancer avant d'éditer, pour charger la doc officielle du domaine concerné (devtools, table, router-core, start-core, table-core, etc.). À utiliser quand la tâche sort du périmètre des références ci-dessus.

## Routing (TanStack Router)

- Fichiers de route dans `src/routes/`. Chaque route exporte `Route` via `createFileRoute('<path>')({ ... })`. **Détails et patterns : `.agents/skills/tanstack/references/router-type-and-org.md`, `router-data-loading.md`, `router-search-nav.md`, `router-split-errors-context.md`.**
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

- **Server function** (`createServerFn`) : logique serveur appelable **depuis le client** (fetch, mutations, accès DB). Toujours valider l'input (Zod). **Toutes** les server functions (lecture **et** écriture) vivent **exclusivement** dans `src/mutations/` :

```ts
export const createComment = createServerFn({ method: 'POST' })
  .inputValidator((input: { postId: string; content: string }) => input) // ou un schéma Zod
  .handler(async ({ data }) => {
    // ... logique serveur
  })
```

- Côté composant, ne jamais appeler une server function brute : passer par un hook. **Détails : `.agents/skills/tanstack/references/query-mutations.md` et `query-keys.md`.**
- **Pattern action → hook → composant** : server function dans `mutations/` (logique métier) → hook dédié dans `hooks/` (gestion de l'UI : `useServerFn` + `useQuery`/`useMutation` + toast + navigation + invalidation) → composant (purement présentation).
- **Convention d'appel** : une server function s'appelle avec l'enveloppe `{ data: <input> }` (ex. `mutation.mutate({ data: values })`), **pas** l'input directement — c'est la signature du fetcher retourné par `useServerFn`. En `onSuccess`, l'input se lit dans `variables.data`.

## Pattern 3-fichiers (docs TanStack Start)

Quand une capacité grossit, séparer :

```
src/mutations/users.functions.ts   → createServerFn (importable partout)
src/mutations/users.server.ts      → helpers serveur uniquement (DB, logique interne)
src/schemas/users.ts               → schémas Zod partagés (client-safe)
```

- `.server.ts` n'est importé **que** dans les handlers des server functions.
- Ne pas importer dynamiquement une server function (problèmes de bundler).

## Découpage en couches

- `components/ui/` : primitives shadcn — pas de logique métier.
- `components/<domaine>/` : UI spécifique à un écran/domaine.
- `mutations/` : **toutes** les server functions (`createServerFn`), lecture et écriture. C'est l'unique emplacement des « actions » (requêtes serveur).
- `hooks/` : tous les fichiers `*.hooks.ts` (hooks React, `useQuery`/`useMutation`, custom hooks) — **gestion de l'UI** : toasts, navigation, invalidation de cache.
- `schemas/` : schémas Zod de validation.
- `lib/` : utilitaires purs (pas de logique métier de domaine).
- `integrations/` : wrappers d'intégrations tierces.
- `data/loaders/` : **legacy** (Strapi) — ne plus y ajouter de server function ; migrer vers `mutations/`.
- Ne jamais faire un appel DB/HTTP direct dans un composant — passer par `mutations/` ou `lib/`.

## Règles shadcn (source : `.agents/skills/shadcn/rules/`)

À respecter pour toute UI. Les incontournables :
- **Tokens sémantiques** : `bg-primary`, `text-muted-foreground` — jamais de couleurs brutes.
- **`cn()`** pour les classes conditionnelles (`#/lib/utils`), pas de ternaires de template literal.
- **`gap-*`**, pas `space-x-*`/`space-y-*`. `size-*` quand largeur = hauteur.
- **Formulaires** : `FieldGroup` + `Field` (pas de `div` + `Label`). Validation : `data-invalid` sur le `Field`, `aria-invalid` sur le contrôle. ⚠️ Ces primitives (`FieldGroup`/`Field`/`InputGroup`) ne sont **pas installées** dans ce repo : l'existant utilise des wrappers locaux (`AuthField`/`AuthFieldGroup` dans `components/auth/auth-shell.tsx`) + `Label` + inputs contrôlés, validation côté serveur (Zod) + toast. Le code existant fait foi.
- **Icônes** : `data-icon="inline-start|inline-end"`, pas de classes de taille sur l'icône.
- **`Skeleton`** pour le chargement, **`Empty`** pour les états vides, **`Separator`** (pas `<hr>`), **`Badge`** (pas de `<span>` stylé).
- **`Button` n'a pas `isPending`/`isLoading`** : composer `Spinner` + `data-icon` + `disabled`.
- Base `radix` : pattern `asChild` (pas `render`).

> Vérifier avec `npx shadcn@latest info` les composants réellement installés avant d'en importer un ; ajouter les manquants via `npx shadcn@latest add <composant>`.

## UI/UX : skill `ui-ux-pro-max` (partie visuelle des features)

**`.agents/skills/ui-ux-pro-max/`** couvre la **qualité visuelle et UX** de chaque feature : structure de page, patterns UX (119 guidelines dans `references/quick-reference.md`), anti-patterns, accessibilité, responsive, motion. **Il est déjà adapté au projet** — sa section « Adaptation projet » fait foi — et le **design system ne se redéfinit jamais** (shadcn + monochrome noir & blanc, tokens de `src/styles.css`, cf. `02-design-system.md`).

- **Quand** : toute feature avec une surface visuelle (page, composant, formulaire, états loading/vide/erreur) — suivre le « Workflow feature (Deploy) » du SKILL.md : contextualiser → rechercher les patterns UX → traduire en primitives shadcn → implémenter → UX review.
- **Script** : `python ".agents/skills/ui-ux-pro-max/scripts/search.py" "<query>" --domain ux` (chemin repo ; stack `--stack shadcn` pour l'implémentation ; **pas** de `--persist` — le design system existe déjà).
- **UX review** : avant livraison, repasser les priorités du skill (accessibilité, feedback, responsive, formulaires, navigation) et la checklist `references/pro-rules.md` sur l'écran modifié.
- **Anti-hallucination** : ancrer chaque décision visuelle dans une règle du design system, une recherche du skill ou le code existant ; vérifier les composants réellement installés (`npx shadcn@latest info`) ; ne jamais inventer un composant, une API, une police ou une palette.
- **Priorité en cas de conflit** : design system (`02-design-system.md`) + règles shadcn > recommandations du skill.

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

Tout fichier `*.hooks.ts` (hooks React, queries/mutations TanStack Query, custom hooks) doit vivre dans **`src/hooks/`**, pas colocalisé avec les composants ou les mutations. C'est le hook qui porte la **gestion de l'UI** (toasts, navigation, invalidation de cache) ; le composant reste purement présentation. **Patterns Query/Mutation : `.agents/skills/tanstack/references/query-caching.md`, `query-mutations.md`, `query-fetch-patterns.md`.**

```
src/hooks/auth.hooks.ts      → hooks d'authentification
src/hooks/posts.hooks.ts     → hooks de gestion des articles
src/hooks/comments.hooks.ts  → hooks de gestion des commentaires
```

Règle : un seul endroit pour chercher les hooks, quel que soit le domaine métier.

Toute valeur constante partagée (URLs, seuils, mappings, valeurs par défaut) → un fichier dédié (`src/lib/` ou un module de constantes), pas dans le composant qui l'utilise. Exceptions : constantes purement locales à un composant.

## Checklist avant de livrer

1. **shadcn** — pas de couleur en dur, primitives réutilisées, règles shadcn respectées.
2. **UI/UX** — workflow `ui-ux-pro-max` appliqué (contextualisation, patterns UX) et UX review passée : accessibilité, feedback, responsive, états loading/vide/erreur, paywall explicite.
3. **Typage** — `tsc --noEmit` propre sur les fichiers modifiés.
4. **Hooks** — aucun hook conditionnel.
5. **Data** — pas d'appel DB/HTTP direct dans un composant ; server functions validées.
6. **Généré** — pas d'édition de `routeTree.gen.ts` ni de `generated/prisma/`.
