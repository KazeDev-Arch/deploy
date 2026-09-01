---
name: remember
description: Utiliser quand une décision durable, une convention, ou une correction de l'utilisateur émerge en cours de conversation et mérite d'être conservée pour les sessions futures. Déclencheurs — l'utilisateur dit « retiens que... », corrige une erreur de l'agent, ou une décision d'architecture/design est actée.
---

# Remember

## Quand l'utiliser

- L'utilisateur corrige une erreur de l'agent ou dit de ne plus refaire quelque chose
- Une décision d'architecture, de convention, ou de design est prise en cours de conversation
- Un fichier de contexte s'avère obsolète ou incomplet

## Procédure

1. Identifier si l'information est **durable** (utile en session future) ou seulement contextuelle — ne pas polluer le contexte avec du détail éphémère.
2. Décision d'architecture/produit → ajouter une entrée en bas de `context/08-decisions-log.md` (format Contexte / Décision / Alternative écartée).
3. Correction de convention (nommage, structure, alias) → mettre à jour le fichier concerné (`03-architecture.md` ou `05-coding-conventions.md`) plutôt que de seulement l'ajouter au journal — le journal explique le « pourquoi », le fichier de contexte reste la référence actuelle.
4. Ne jamais réécrire l'historique du journal — uniquement ajouter en fin de fichier.

## Anti-pattern à éviter

Ne pas attendre la fin d'une longue session pour tout consigner d'un coup. Consigner au moment où la décision est prise.
