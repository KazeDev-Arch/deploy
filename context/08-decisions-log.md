# 08 — Journal de décisions

Format par entrée : **Contexte / Décision / Alternative écartée**. Toujours ajouter en fin de fichier (jamais réécrire l'historique).

---

## 2026-09-01 — Refonte du socle documentaire vers « Deploy »

**Contexte** : le repo a été converti de l'ancien projet mboago (courses Expo/React Native) vers une plateforme de blog TanStack Start. Les docs `context/`, `CLAUDE.md` et les skills décrivaient encore l'ancien produit.

**Décision** : réécriture complète du socle (`CLAUDE.md`, 5 skills d'orchestration, 9 fichiers `context/`) pour le projet **Deploy** (blog, articles gratuits + premium, design noir & blanc shadcn).

**Alternative écartée** : conserver l'ancien socle et le corriger à la marge.

## 2026-09-01 — Design noir & blanc, intégralement shadcn

**Contexte** : le thème hérité d'un template utilisait une palette « sea/teal » (verts, teal) et des classes décoratives custom.

**Décision** : design monochrome noir & blanc basé uniquement sur les tokens sémantiques shadcn (`zinc`, base `radix`, style `new-york`). Supprimer les tokens/classes custom (`--sea-ink`, `--lagoon`, `--palm`, `.island-shell`, `.feature-card`, `.nav-link`, etc.).

**Alternative écartée** : conserver une couleur d'accent de marque.

## 2026-09-01 — Paiement : K-Pay uniquement

**Contexte** : le schéma Prisma renseignait `provider: "KPAY"` et la devise XAF, avec la question de savoir si d'autres moyens de paiement (Stripe/carte) seraient nécessaires.

**Décision** : **K-Pay est le seul moyen de paiement** (Mobile Money, devise XAF). Pas de Stripe ni de carte bancaire.

**Alternative écartée** : proposer Stripe/carte en plus de K-Pay.

## 2026-09-01 — Source de vérité des articles : Prisma `Post`

**Contexte** : deux modèles coexistaient pour les articles — Strapi (headless CMS, utilisé par `data/loaders/articles.ts` et les routes `demo/strapi.*`) et le modèle Prisma `Post` (avec `isPremium`, `content`, `status`, `publishedAt`).

**Décision** : les articles sont stockés et servis via **Prisma `Post`** (PostgreSQL). Strapi est **legacy** : son SDK, ses loaders, ses types et ses blocs (`components/blocks/`, `demo/strapi.*`) sont à retirer progressivement.

**Alternative écartée** : utiliser Strapi comme source de vérité du contenu.
