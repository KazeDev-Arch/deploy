---
name: recover
description: Utiliser quand un test échoue de façon répétée, qu'une build casse, ou que l'agent réalise qu'il a dérivé par rapport au plan initial dans le projet Deploy. Empêche d'empiler des correctifs sur de la confusion.
---

# Recover

## Quand l'utiliser

- Un test ou une build échoue une deuxième fois après une première tentative de correction
- L'agent s'aperçoit qu'il a fait des suppositions non vérifiées (ex. sur une lib de `04-tech-stack.md` ou sur la source de vérité des articles) qui se révèlent fausses
- La conversation a dérivé loin du plan posé par `architect`
- `routeTree.gen.ts` ou le client Prisma généré ne reflète plus le code (oubli de régénérer)

## Procédure

1. **Arrêter d'empiler des correctifs.** Ne pas tenter une troisième variation du même correctif sans changer d'approche.
2. Relire le fichier de contexte pertinent (`03-architecture.md`, `04-tech-stack.md`, `06-api-contracts.md` si c'est un contrat qui a divergé).
3. Isoler précisément la portion en échec — réduire au plus petit cas reproductible.
4. Si l'échec vient d'une hypothèse non confirmée (ex. source de vérité des articles Strapi vs Prisma), le dire explicitement à l'utilisateur plutôt que de deviner.
5. Vérifier les causes fréquentes TanStack Start : `routeTree.gen.ts` non régénéré, alias d'import `#/` vs `@/`, server function sans validation d'input, client Prisma non régénéré après changement de schéma.
6. Si le chemin reste flou, demander une instruction précise à l'utilisateur.
7. Une fois résolu, si la cause était une convention ambiguë ou un contexte manquant, utiliser `remember`.

## Anti-pattern à éviter

Ne pas répondre à un échec par un simple « je réessaie » sans diagnostic — chaque tentative doit reposer sur une hypothèse différente et explicite.
