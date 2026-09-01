---
name: review
description: Utiliser avant de considérer une tâche de code terminée dans le projet Deploy — vérifie la cohérence avec les conventions, le design system et les exigences produit pertinentes avant de livrer.
---

# Review

## Quand l'utiliser

Systématiquement avant de dire « c'est fait » sur une tâche de code non triviale.

## Procédure de vérification

1. **Conventions** — le code respecte-t-il `context/05-coding-conventions.md` (nommage, alias `#/`, découpage en couches, server functions) ?
2. **Design** — si UI : les couleurs/typo viennent-elles de `02-design-system.md` (tokens shadcn, noir & blanc), sans valeur codée en dur ? Les règles shadcn sont-elles respectées (`.agents/skills/shadcn/rules/`) ?
3. **Exigences** — la fonctionnalité couvre-t-elle bien l'exigence visée dans `01-product-requirements.md` ? Rien d'oublié (ex. un état de chargement, un cas d'erreur, un statut manquant) ?
4. **Données** — pas d'appel DB/HTTP direct dans un composant ; server functions validées (Zod) ; pas d'édition de fichiers générés (`routeTree.gen.ts`, `generated/prisma/`).
5. **Type-safety** — `tsc --noEmit` propre sur les fichiers modifiés ; pas de hook conditionnel.
6. **Cohérence journal** — le code contredit-il une décision actée dans `08-decisions-log.md` ?

## Si un écart est trouvé

Ne pas corriger silencieusement en élargissant le scope — signaler l'écart à l'utilisateur et proposer de corriger maintenant ou de le noter pour plus tard (et dans ce cas, `remember` pour le tracer si c'est une dette assumée).
