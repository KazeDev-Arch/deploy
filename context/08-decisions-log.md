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

## 2026-09-01 — Refonte hero section et plans d'abonnement

**Contexte** : la hero section originale présentait un article vedette avec un style sobre mais peu distinctif. Les plans d'abonnement listaient uniquement le nom, prix et une petite note, sans détail visuel sur les avantages.

**Décision** : 
- **Hero section** : ajouter un background pattern subtil (SVG dots à opacity 0.02), améliorer la hiérarchie typographique (titre text-7xl, meilleur leading), différencier les CTA avec copywriting plus explicite ("Lire l'article vedette" + "Tous les articles"), augmenter les espacements pour une respiration plus professionnelle, renommer "À la une" → "Tendances".
- **Plans d'abonnement** : enrichir le type `Plan` avec `features: string[]` et `savings?: number`, afficher 4-6 features par plan avec icônes Check, ajouter un badge "Économise X%" sur le plan annuel, améliorer les cards avec une section séparée et ombres subtiles.
- **Design** : maintenir strictement le monochrome noir & blanc (aucune couleur ajoutée), utiliser uniquement les tokens shadcn, utiliser SVG inline pour le pattern (éviter les images externes).

**Alternative écartée** : 
- Ajouter une couleur d'accent pour la hero (violet, bleu, etc.) — va à l'encontre de la décision noir & blanc.
- Utiliser un pattern image (PNG/JPG) au lieu de SVG — moins performant et plus difficile à maintenir.
- Garder les plans épurés sans détail — ne suffisait pas à montrer les différences de valeur entre les niveaux.

## 2026-09-01 — Better Auth : configuration Prisma obligatoire

**Contexte** : Better Auth était importé sans adaptateur de base de données. La commande `npx auth@latest generate` échouait avec l'erreur `memory is not supported` car Better Auth par défaut utilise un adaptateur mémoire.

**Décision** :
- **Configuration** (`src/lib/auth.ts`) : toujours brancher l'adaptateur Prisma via `prismaAdapter(prisma)` dans l'option `database`.
- **Schéma Prisma** : ajouter obligatoirement les trois modèles exigés par Better Auth : `Account` (identités sociales), `Session` (sessions utilisateur), `VerificationToken` (jetons d'auth email).
- **Workflow** : après mise à jour du schéma, toujours exécuter `npm run db:migrate` avant `npx auth@latest generate`.

**Alternative écartée** : utiliser l'adaptateur mémoire de Better Auth pour le développement (ne fonctionne pas avec la généération de schéma).

