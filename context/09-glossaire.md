# 09 — Glossaire métier

| Terme | Définition |
|---|---|
| Article / Post | Contenu publié sur le blog (titre, slug, contenu Markdown, extrait, image de couverture). Modèle Prisma `Post`. |
| Article premium | Article réservé aux abonnés actifs (`isPremium = true`). Signalé par un badge/verrou **avant** le clic. |
| Abonnement | Lien entre un utilisateur et un plan, avec une durée (`startDate`/`endDate`) et un statut (`ACTIVE`/`CANCELED`/`EXPIRED`). |
| Plan | Offre d'abonnement (nom, slug, prix, durée en jours, devise). Modèle `Plan`. |
| Paiement | Transaction liée à un abonnement (montant, devise XAF, statut `PENDING`→`SUCCEEDED`/`FAILED`/`REFUNDED`, provider K-Pay). |
| K-Pay | Fournisseur de paiement Mobile Money (`provider: "KPAY"`), devise XAF. |
| XAF | Franc CFA d'Afrique centrale — devise des prix des plans. |
| Strapi | Headless CMS **legacy** — source de contenu remplacée par Prisma `Post` (voir `08-decisions-log.md`). |
| Bloc de contenu | Composant structuré d'un article Strapi : `rich-text`, `media`, `quote`, `slider` (rendus par `src/components/blocks/`). |
| Markdown | Format d'écriture des articles (rendu via `react-markdown` + `remark-gfm`). |
| Slug | Identifiant lisible d'un article dans l'URL (unique). |
| Server function | Fonction serveur type-safe (`createServerFn`) appelable depuis le client. |
| Loader | Fonction de chargement de données côté serveur définie dans une route. |
| Rôle | `ADMIN` (auteur/éditeur) ou `CLIENT` (lecteur). |
| `#/` | Alias d'import canonique vers `src/`. |
