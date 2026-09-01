# Deploy — Instructions agent

**Deploy** est une plateforme de publication d'articles (blog) construite avec **TanStack Start** (full-stack React, SSR). On y **lit** et **écrit** des articles : la majorité en accès libre, certains réservés aux abonnés payants (**articles premium**). Design : **noir & blanc**, intégralement construit sur **shadcn/ui**.

## Avant de coder quoi que ce soit

1. Lis les fichiers de `context/` pertinents à la tâche (table ci-dessous — pas besoin de tout charger).
2. Utilise le skill `architect` pour toute nouvelle fonctionnalité, nouvelle route ou changement structurel.
3. Utilise `review` avant de considérer une tâche terminée.
4. Si tu es bloqué, qu'un build/test échoue deux fois de suite ou que tu as dérivé du plan, utilise `recover`.
5. Quand une décision durable est prise (convention, choix d'architecture, correction de ma part), utilise `remember`.
6. Au début d'une session longue, utilise `imprint` pour te resynchroniser et valider ta compréhension avec moi.

## Quel fichier de contexte pour quelle tâche

| Tâche | Fichiers à lire |
|---|---|
| Nouvelle route / écran / fonctionnalité | `01-product-requirements`, `02-design-system`, `03-architecture`, `05-coding-conventions` |
| Question UI / couleurs / typo / composants | `02-design-system` + `.agents/skills/shadcn/` |
| Où ranger un fichier, nommage, patterns | `03-architecture`, `05-coding-conventions` |
| Intégration backend / server functions / DB | `04-tech-stack`, `06-api-contracts` |
| Ton, copywriting, décisions UX | `07-personas-et-principes` |
| « Pourquoi on a fait ça comme ça ? » | `08-decisions-log` |
| Terme métier ambigu (premium, abonnement, bloc...) | `09-glossaire` |

## Règle d'or du projet

**Le paywall est explicite, jamais sournois.** Un article premium doit être clairement signalé **avant** le clic (badge, aperçu/teaser, verrou visible) — jamais un mur qui surgit au milieu de la lecture. Le prix et la durée de l'abonnement sont affichés **avant** le paiement, sans frais découverts à la fin. Toute fonctionnalité qui touche au paywall ou à l'accès aux contenus payants est prioritaire, pas une checkbox parmi d'autres.

## Design system — noir & blanc, shadcn

- **Aucune couleur de marque.** Palette monochrome basée sur les tokens sémantiques shadcn (`zinc`) : `--background`, `--foreground`, `--primary` (quasi-noir), `--muted`, `--border`, `--ring`, etc. Voir `02-design-system.md`.
- **Jamais de couleur codée en dur** (`bg-blue-500`, `text-emerald-600`...). Toujours les tokens sémantiques (`bg-primary`, `text-muted-foreground`).
- **Toute l'UI passe par shadcn/ui.** Pour toute interface, lis d'abord `.agents/skills/shadcn/SKILL.md` et ses `rules/` (styling, composition, forms, icons, base-vs-radix). Réutilise les composants de `src/components/ui/` avant d'en créer de nouveaux.
- Le fichier de thème est `src/styles.css` (jamais en créer un autre). Base : `radix`, style `new-york`, `baseColor: zinc`, icônes `lucide-react`.

## Compétences (skills) shadcn

Les règles d'utilisation des composants shadcn vivent dans `.agents/skills/` :
- `.agents/skills/shadcn/` — `SKILL.md` + `rules/` (styling, forms, composition, icons, base-vs-radix, chat).
- `.agents/skills/migrate-radix-to-base/` — migration radix → base (utile seulement si on change de primitive).

À lire **avant** toute tâche d'interface, et à respecter strictement (ex. `FieldGroup`/`Field` pour les formulaires, `data-icon` pour les icônes, `gap-*` plutôt que `space-y-*`, `size-*`, `cn()` pour les classes conditionnelles). Vérifier avec `npx shadcn@latest info` les composants réellement installés avant d'en importer un.

## Stack & conventions TanStack (résumé)

- **TanStack Start** (full-stack React SSR) + **TanStack Router** (routing par fichiers) + **TanStack Query** + **TanStack Form** + **TanStack Table**.
- Routes dans `src/routes/` (routing par fichiers). `src/routes/__root.tsx` = coquille du document (`<html>`, `<HeadContent>`, `<Scripts>`). `src/routeTree.gen.ts` est **généré** — ne jamais l'éditer à la main (`npm run generate-routes`).
- Données : `loader` dans les fichiers de route pour le chargement serveur, **server functions** (`createServerFn`) pour les appels depuis le client. Voir `05-coding-conventions.md` pour le pattern 3-fichiers (`.functions.ts` / `.server.ts` / `schemas.ts`).
- Détail complet : `03-architecture.md`, `04-tech-stack.md`, `05-coding-conventions.md`.

## Emplacement du code applicatif

Le code source vit dans `src/`. Les dossiers `context/` (doc projet), `.claude/skills/` (skills d'orchestration) et `.agents/skills/` (skills shadcn) vivent à la racine du repo, à côté de `src/`.
