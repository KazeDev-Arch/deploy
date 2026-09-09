# Deploy — Instructions agent

Deploy est une plateforme de publication d'articles, construite avec TanStack Start. Les articles sont gratuits ou premium ; l'interface est monochrome et repose sur shadcn/ui.

## Démarrage obligatoire

Pour toute tâche d'ingénierie (feature, correction, refactorisation, diagnostic ou revue), charger d'abord le skill `workflow` situé dans `.claude/skills/workflow/`. Il choisit et applique de manière autonome les skills projet et externes nécessaires. L'utilisateur n'a pas à les sélectionner.

Pour une question purement explicative qui ne modifie rien, répondre directement ; ne charger un skill que si sa description correspond clairement.

## Sources de vérité

- `context/` contient les exigences produit, le design system, l'architecture, les conventions et le journal des décisions.
- Le code et les dépendances installées priment sur une documentation devenue obsolète.
- Une instruction explicite de l'utilisateur prime sur les règles générales.

| Besoin | Contexte à lire |
|---|---|
| Feature, route ou changement structurel | `01-product-requirements`, `02-design-system`, `03-architecture`, `05-coding-conventions` |
| Backend, server functions, base de données | `04-tech-stack`, `06-api-contracts` |
| Texte produit ou arbitrage UX | `07-personas-et-principes` |
| Décision historique | `08-decisions-log` |
| Terme métier | `09-glossaire` |

## Invariants produit

- Le paywall est explicite avant le clic : badge, aperçu ou verrou visible. Le prix et la durée sont affichés avant paiement.
- Le design est noir et blanc, fondé sur les tokens sémantiques shadcn. Aucune couleur ou police de marque ne doit être ajoutée sans décision produit explicite.
- `src/routeTree.gen.ts` et `src/generated/prisma/` sont générés : ne jamais les éditer à la main.
