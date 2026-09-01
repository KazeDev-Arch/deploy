# 01 — Exigences produit (Deploy, plateforme de blog)

Résumé opérationnel du produit. En cas de doute sur un détail, demander confirmation plutôt que d'inventer une exigence.

## Ce qui est dans le périmètre

### Lecture
- Lister les articles (accueil : héro + derniers articles, newsletter).
- Détail d'un article (rendu Markdown : rich text, images, citations, sliders).
- **Articles gratuits** lisibles sans compte.
- **Articles premium** réservés aux abonnés actifs.
- Recherche, pagination, filtrage par catégorie.

### Écriture
- Rédaction d'articles par les auteurs (rôle `ADMIN`) — brouillon (`DRAFT`) / publié (`PUBLISHED`).
- Contenu au format **Markdown** + blocs de contenu enrichis (voir Strapi et `src/components/blocks/`).

### Accès payant
- **Plans d'abonnement** (nom, slug, prix, durée en jours, devise XAF).
- **Abonnements** d'un utilisateur à un plan (statut `ACTIVE` / `CANCELED` / `EXPIRED`).
- **Paiement** via K-Pay (Mobile Money), statut `PENDING` → `SUCCEEDED` / `FAILED` / `REFUNDED`.

### Interaction
- **Commentaires** sur un article (utilisateur connecté).
- **Likes** (un par utilisateur et par article).
- **Newsletter / abonnement email** (formulaire d'accueil).

### Compte & authentification
- Email + mot de passe via **better-auth** : inscription (`/signup`), connexion (`/login`), mot de passe oublié (`/forgot-password`).
- Rôles : `ADMIN` (auteur/éditeur) et `CLIENT` (lecteur).

## Hors périmètre (pour l'instant)

- Back-office admin dédié (existe en germe via le rôle `ADMIN`, mais pas d'interface complète).
- Carte bancaire / autres moyens de paiement que K-Pay (à confirmer).
- Internationalisation (i18n) — l'UI est actuellement en français, chaînes en dur (voir `05-coding-conventions.md`).

## Statuts à respecter (vocabulaire stable)

- Article : `DRAFT` → `PUBLISHED`
- Abonnement : `ACTIVE` → `CANCELED` | `EXPIRED`
- Paiement : `PENDING` → `SUCCEEDED` | `FAILED` | `REFUNDED`

## Exigences non-fonctionnelles à garder en tête

- **Transparence du paywall** : jamais de mur de paiement surprise (règle d'or, voir `07-personas-et-principes.md`).
- SSR efficace : chargement serveur des articles via loaders / server functions.
- Type-safety de bout en bout (TanStack Router + server functions + Prisma).
