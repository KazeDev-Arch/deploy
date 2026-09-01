---
name: imprint
description: Utiliser en début de session de travail un peu longue sur le projet Deploy, ou après un long silence dans la conversation, pour se resynchroniser sur l'ensemble du contexte projet avant de commencer à coder. Réduit le risque de repartir sur des hypothèses obsolètes.
---

# Imprint

## Quand l'utiliser

- Début d'une session de travail substantielle (plusieurs fichiers, plusieurs heures prévues)
- Reprise du projet après une pause dans la conversation
- Un nouvel agent/une nouvelle instance reprend le travail sans historique

## Procédure

1. Lire `CLAUDE.md` à la racine.
2. Parcourir rapidement les 9 fichiers de `context/` — au minimum leurs titres/sections pour savoir ce qui existe.
3. Lire en particulier les entrées récentes de `context/08-decisions-log.md` — fichier qui change le plus, reflète les décisions les plus fraîches.
4. Vérifier la stack réelle dans `package.json` et `src/` (TanStack Start, shadcn, Prisma) — le code fait foi sur la doc.
5. Résumer en 3-5 lignes à l'utilisateur ce qu'on a compris de l'état actuel et de la tâche du jour, **avant** de coder — pour corriger une mauvaise compréhension immédiatement.
6. Si un fichier de contexte semble contredire un autre (ou contredire le code), le signaler plutôt que de choisir silencieusement.

## Anti-pattern à éviter

Ne pas sauter cette étape parce que « on connaît déjà le projet » — c'est dans les sessions longues ou reprises que la dérive de contexte s'installe.
