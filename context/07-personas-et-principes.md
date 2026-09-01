# 07 — Personas & principes UX

« Deploy — Tech, design & ingénierie » : une publication éditoriale pour un public de développeurs, designers et ingénieurs.

## Persona principal : le lecteur

Lit des articles tech/design/ingénierie. Veut du contenu dense et fiable, sans friction. Deux profils :
- **Lecteur libre** : lit les articles gratuits, peut commenter/liker avec un compte.
- **Lecteur abonné** : paie un abonnement pour accéder aux articles premium.

## Persona secondaire : l'auteur / éditeur

Rédige et publie les articles (rôle `ADMIN`). Besoin d'un parcours d'écriture simple (Markdown + blocs), avec brouillon → publication.

## Ton de la marque

Éditorial, précis, sans emphase marketing. Vocabulaire sobre et technique. Pas de fioritures.

## Hiérarchie des principes (arbitrage)

1. **Transparence du paywall** — signaler clairement ce qui est premium **avant** le clic ; prix affiché avant paiement.
2. **Lisibilité** — typographie et espacement soignés (c'est le cœur du produit).
3. **Sobriété monochrome** — le design sert le contenu, pas l'inverse.
4. **Rapidité** — SSR efficace, chargement rapide des articles.

En cas de conflit entre « faire simple » et « être transparent sur le paywall », la transparence gagne toujours.
