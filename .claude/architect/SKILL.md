---
name: architect
description: Utiliser avant de commencer toute nouvelle fonctionnalité, nouvelle route/écran, ou changement structurel dans le projet Deploy. Empêche l'agent de coder directement sans avoir vérifié la cohérence avec l'architecture, le design system et les exigences existantes.
---

# Architect

## Quand l'utiliser

- Nouvelle fonctionnalité, nouvelle route ou nouvel écran demandé
- Ajout d'une capacité transverse (ex. nouveau module d'accès aux données, nouvelle intégration)
- Toute tâche où plus d'un fichier devra être créé ou modifié

## Procédure

1. Lire `context/01-product-requirements.md` pour vérifier si la fonctionnalité est dans le périmètre (lecture/écriture, premium, abonnement, commentaires, likes, auth).
2. Lire `context/03-architecture.md` pour identifier où le code doit vivre (route dans `src/routes/`, server function dans `src/data/loaders/`, composant dans `src/components/<domaine>/`, primitive dans `src/components/ui/`).
3. Lire `context/05-coding-conventions.md` pour le nommage, les alias (`#/`), le pattern server functions 3-fichiers.
4. Si la fonctionnalité touche l'UI, lire `context/02-design-system.md` **et** `.agents/skills/shadcn/SKILL.md` (+ `rules/`) avant d'écrire le moindre style.
5. Rédiger un plan court (fichiers à créer/modifier, dans quel ordre) et le présenter à l'utilisateur **avant** d'écrire du code, sauf si la tâche est triviale (un seul petit fichier, pattern établi).
6. Si le plan s'écarte d'une convention ou d'une décision du journal (`08-decisions-log.md`), le signaler explicitement plutôt que de trancher silencieusement.

## Points spécifiques TanStack Start à vérifier

- Nouvelle route → bien un fichier `src/routes/...` avec `createFileRoute` (et ne pas éditer `routeTree.gen.ts` à la main).
- Données → `loader` (rendu serveur) vs **server function** (`createServerFn`) pour les appels client ; toujours valider l'input (Zod).
- UI → composer les primitives shadcn existantes avant d'en créer ; vérifier `components/ui/` et `npx shadcn@latest search`.

## Anti-pattern à éviter

Ne pas inventer une nouvelle convention d'architecture parce que « ça semble plus propre » sans vérifier d'abord si un pattern existant (même imparfait) couvre déjà le besoin. La cohérence prime sur l'élégance locale.
