---
name: workflow
description: Utiliser obligatoirement au début de toute tâche d'ingénierie sur Deploy. Analyse la demande, lit le contexte utile et sélectionne de façon autonome les skills projet et externes nécessaires avant toute modification.
---

# Workflow Deploy

## Objectif

Ce skill est le routeur unique du projet. L'utilisateur décrit le résultat attendu ; il ne choisit pas les skills. Sélectionner le plus petit ensemble de skills nécessaire, les lire entièrement puis exécuter la tâche.

## Procédure

1. Identifier le type de travail : feature, correction, refactorisation, diagnostic, revue ou décision.
2. Lire les fichiers `context/` indiqués par `CLAUDE.md`, uniquement lorsqu'ils sont pertinents.
3. Sélectionner les skills du registre ci-dessous et lire leur `SKILL.md` avant d'agir.
4. Appliquer leurs instructions sans contredire les invariants de `CLAUDE.md` et le design system.
5. Exécuter la tâche et réaliser la vérification proportionnée au changement.

## Registre des skills projet

| Déclencheur | Skill à lire |
|---|---|
| Nouvelle feature, route, écran, intégration ou changement structurel | `.claude/architect/SKILL.md` |
| Reprise de session, nouvel agent ou travail long | `.claude/imprint/SKILL.md` |
| Décision durable, convention ou correction utilisateur à conserver | `.claude/remember/SKILL.md` |
| Deux échecs de test/build, ou dérive du plan | `.claude/recover/SKILL.md` |
| Tâche de code non triviale prête à être livrée | `.claude/review/SKILL.md` |

## Registre des skills externes

| Déclencheur | Skill à lire |
|---|---|
| TanStack Query, Router, Form, mutations, cache, routes, search params ou loaders | `.agents/skills/tanstack/SKILL.md` |
| shadcn/ui, composants, styles, composition ou formulaires | `.agents/skills/shadcn/SKILL.md` |
| Page, composant, formulaire, responsive, accessibilité, interaction ou UX | `.agents/skills/ui-ux-pro-max/SKILL.md` |
| Migration Radix UI vers Base UI | `.agents/skills/migrate-radix-to-base/SKILL.md` |

`frontend-design` n'est pas sélectionné automatiquement : son approche peut contredire le design system déjà fixé. Ne l'utiliser que sur demande explicite de refonte visuelle et après avoir imposé le respect de `context/02-design-system.md`.

## Règles de sélection

- Un seul skill peut suffire ; plusieurs skills peuvent être combinés lorsqu'ils couvrent des responsabilités distinctes.
- Préférer le skill le plus spécifique au sujet.
- Vérifier que chaque chemin du registre existe avant de le lire. Si un skill externe manque, le signaler brièvement puis poursuivre avec les règles projet applicables.
- Ne pas charger un skill par habitude, ni appliquer une instruction qui contredit une règle produit, le code existant ou une instruction explicite de l'utilisateur.
