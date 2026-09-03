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

**Alternative écartée** : utiliser l'adaptateur mémoire de Better Auth pour le développement (ne fonctionne pas avec la génération de schéma).

---

## 2026-09-02 — Création d'un template Admin (dashboard) séparé

**Contexte** : besoin d'une interface d'administration basique (template) séparée du site public. L'admin doit être accessible uniquement aux utilisateurs authentifiés avec le rôle `ADMIN`. Le design doit rester conforme au design system noir & blanc (shadcn) et les composants réutilisables doivent vivre dans `src/components/admin/`.

**Décision** :
- Créer un nouveau segment de routes `src/routes/admin/` contenant `index.tsx`, `articles.tsx`, `settings.tsx`.
- Implémenter un `AdminLayout` (navbar + sidebar) et des composants `AdminNavbar`, `AdminSidebar`, `AdminProtection` dans `src/components/admin/`.
- Protéger l'accès via Better Auth (vérifier rôle `ADMIN`) ; côté serveur ou client selon le besoin, mais l'interface doit rediriger les non-autorisés vers `/auth/login` ou `/`.
- Respecter strictement les tokens shadcn (pas de couleurs codées en dur) et réutiliser les primitives de `src/components/ui/`.

**Alternative écartée** : intégrer l'admin dans le même layout public (risque de fuites d'UI et complexité d'autorisation), ou exposer des routes admin sans protection robuste (inacceptable pour contenu premium et gestion des abonnements).

---

## 2026-09-02 — Fichiers hooks centralisés dans `src/hooks/`

**Contexte** : lors de la refactorisation de l'authentification, les hooks de mutation (`auth.hooks.ts`) ont d'abord été placés à côté des mutations (`src/data/mutations/`). Cela fragmentait la localisation des hooks dans le projet.

**Décision** : tous les fichiers `*.hooks.ts` (hooks React, mutations TanStack Query, custom hooks) doivent vivre dans **`src/hooks/`**, quel que soit le domaine métier. Un seul endroit pour chercher les hooks.

**Alternative écartée** : colocaliser les hooks avec les composants ou les mutations qu'ils utilisent (fragmentation, difficulté à retrouver un hook).

---

## 2026-09-02 — Authentification : Google OAuth + OTP email (Inngest + Resend)

**Contexte** : les formulaires login/signup existants étaient statiques (pas de logique auth). Besoin d'ajouter Google OAuth et de vérifier l'email des nouveaux utilisateurs via OTP.

**Décision** :
- **Google OAuth** : configurer `socialProviders.google` dans Better Auth avec `clientId`/`clientSecret` + `baseURL` obligatoire.
- **OTP email** : flux custom — inscription crée le compte (`emailVerified: false`), génère un code 6 chiffres (10 min), envoie via Inngest → Resend. L'utilisateur vérifie sur `/auth/verify-otp`.
- **Email template** : HTML inline, style monochrome Deploy (noir/blanc, tokens shadcn).
- **Séparation des responsabilités** : server functions (`mutations/auth.ts`) = logique métier ; hooks (`hooks/auth.hooks.ts`) = `useServerFn` + `useMutation` + toast + navigation ; composants = purement présentation.
- **Toasts** : sonner pour les notifications success/error.

**Alternative écartée** :
- Utiliser le plugin OTP built-in de Better Auth (moins de contrôle sur le template email).
- Gérer les erreurs/redirects dans les composants (mélange UI/logique métier).

---

## 2026-09-02 — `runtimeEnv` doit être `process.env` (pas `import.meta.env`)

**Contexte** : avec `@t3-oss/env-core` dans TanStack Start (Vite), les variables serveur (`GOOGLE_CLIENT_ID`, etc.) n'étaient pas lues car `import.meta.env` ne contient que les vars `VITE_`.

**Décision** : `runtimeEnv: process.env` dans `src/env.ts`. En Vite SSR, `process.env` contient toutes les vars (y compris `VITE_`), tandis que `import.meta.env` ne contient que les `VITE_`.

**Alternative écartée** : créer deux instances `createEnv` séparées (une serveur, une client) — surcomplication.

---

## 2026-09-03 — Layouts de route : public séparé du panneau partagé

**Contexte** : le `__root.tsx` rendait Header et Footer pour toutes les routes, y compris l'admin — contraire à la décision du 09-02 (admin séparée du layout public). Besoin d'une zone `/admin/*` sans chrome public, et de pages publiques inchangées.

**Décision** :
- `__root.tsx` ne rend plus que la coquille HTML (devtools, Toaster, Scripts).
- Layout pathless `_public` (`src/routes/_public.tsx` + dossier `_public/`) : Header + Footer autour des pages publiques déplacées (`index`, `about`, `posts/`, `auth/`, `demo/`). URLs inchangées.
- Layout pathless `_dashboard` (`src/routes/_dashboard.tsx` + dossier `_dashboard/admin/`) : panneau partagé client/admin — authentification obligatoire (`DashboardGuard`), coquille shadcn `SidebarProvider` + Navbar persistantes entre les navigations.
- `routeTree.gen.ts` régénéré via `npm run generate-routes` (jamais à la main).

**Alternative écartée** : rendre le chrome public conditionnel dans `__root` selon la route (fragile, pas idiomatique), ou un shell par page (sidebar démontée à chaque navigation).

## 2026-09-03 — Panneau partagé : menus et routes pilotés par permissions

**Contexte** : un seul panneau est partagé par le client (`CLIENT`) et l'admin (`ADMIN`). Certains menus/données sont réservés à l'admin ; `src/lib/permissions.ts` était amorcé mais incomplet.

**Décision** :
- **Permissions** : `src/lib/permissions.ts` complété — énoncé étendu (`article`, `user`, `comment`, `subscription`, `payment`, `settings`), rôles better-auth `adminRole`/`clientRole` (via `createAccessControl`, pour l'enforcement serveur futur) + helper **pur** `canAccess(role, resource, action)` utilisable client et serveur.
- **Menu unique** dans `components/admin/admin-sidebar.tsx` : chaque entrée porte une permission optionnelle (`{ resource, action }`), filtrée par rôle au rendu. Client : « Tableau de bord » uniquement ; Admin : + Articles, Commentaires, Abonnés, Paiements, Réglages.
- **Routes protégées par rôle** : `DashboardGuard` (auth, dans le layout `_dashboard`) et `RequireRole` (par page, ex. `ADMIN`) — pas seulement masquage du menu.
- **Profil en bas de sidebar** (Avatar + DropdownMenu : badge rôle, voir le site, déconnexion) et **Navbar** avec `SidebarTrigger` + cloche de notifications (placeholder).
- Le dashboard d'accueil affiche des données différentes selon le rôle (stats site pour ADMIN, état d'abonnement pour CLIENT) — valeurs d'exemple en attendant les loaders Prisma.
- Composants conservés dans `components/admin/` (décision 09-02), mais `AdminLayout` est désormais la coquille du panneau partagé, pas d'un « back-office admin » exclusif.
- Sessions typées avec le champ `role` : plugin client `inferAdditionalFields<typeof auth>()` dans `src/lib/auth-client.ts`.

**Alternative écartée** : garder l'ancien template (navbar + sidebar maison) et l'ancien `AdminProtection` sans contrôle de rôle (un `CLIENT` aurait pu ouvrir `/admin/articles`), ou dupliquer la logique de permission dans chaque composant.
