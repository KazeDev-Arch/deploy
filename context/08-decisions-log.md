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

## À confirmer (questions ouvertes)

- **Source de vérité des articles** : Strapi (headless CMS) vs Prisma `Post` (PostgreSQL). Les deux coexistent — `data/loaders/articles.ts` utilise Strapi, le schéma Prisma définit `Post` avec `isPremium`. Décider laquelle porte la lecture et la détermination du premium.
- **Paiement** : K-Pay (XAF) est le seul fournisseur renseigné (`provider: "KPAY"`). Confirmer l'absence de Stripe/carte.
