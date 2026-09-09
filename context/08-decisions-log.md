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

## 2026-09-03 — Toutes les server functions vivent dans `mutations/`

**Contexte** : le code répartissait les server functions entre `src/data/loaders/` (lectures) et `src/mutations/` (écritures), ce qui fragmentait la localisation des « actions » (requêtes serveur). En parallèle, la gestion de l'UI (toasts, navigation, invalidation) risquait de fuiter dans les composants.

**Décision** :
- **Toutes** les server functions (`createServerFn`) — lecture **et** écriture — vivent **exclusivement** dans `src/mutations/`. C'est l'unique emplacement des « actions ».
- La **gestion de l'UI** (wrapping `useServerFn` + `useQuery`/`useMutation`, toasts, navigation, invalidation de cache) est portée par un **hook dédié** dans `src/hooks/` (`<domaine>.hooks.ts`). Le composant reste purement présentation.
- `src/data/loaders/` est marqué **legacy** (Strapi) : ne plus y ajouter de server function, migrer vers `mutations/`.

**Alternative écartée** : garder la séparation lecture/écriture entre `data/loaders/` et `mutations/` (deux endroits pour chercher une server function), ou gérer toasts/navigation directement dans les composants.

## 2026-09-03 — `clientRole` vide : le RBAC ne couvre que la gestion, pas la lecture publique

**Contexte** : `clientRole` était défini comme `article: ['read']`, ce qui rendait `canAccess('CLIENT', 'article', 'read')` vrai et affichait le groupe « Administration › Articles » dans la sidebar pour un `CLIENT` — une entrée qu'il ne peut de toute façon pas ouvrir.

**Décision** : `clientRole = ac.newRole({})`. Le catalogue RBAC de `permissions.ts` régit les capacités de **gestion** du panneau ; la lecture publique des articles (gratuits/premium) est une autre couche (paywall). Un `CLIENT` n'a donc **aucune** capacité de gestion, et ne voit que « Tableau de bord ».

**Alternative écartée** : garder `article.read` sur le client (fuitait dans le menu admin), ou corriger uniquement le menu en exigeant `article.create` (cache le problème au lieu de le résoudre à la source).

## 2026-09-09 — Éditeur d'article : page entière, la modale est supprimée

**Contexte** : la création/édition d'article passait par une modale (`ArticleFormDialog`, `max-w-2xl` avec scroll) — trop étroite pour la rédaction d'un article avec éditeur riche, couverture et images.

**Décision** :
- Pages dédiées `/admin/articles/new` (création) et `/admin/articles/$postId` (édition), composées autour d'un `PostForm` deux colonnes (contenu + barre latérale publication/vitrine).
- La table d'articles navigue vers ces pages ; la modale a été supprimée.
- Les routes sont des fichiers plats : `articles.index.tsx` (liste) + `articles/new.tsx` + `articles/$postId.tsx` (voir convention de nommage dans `05-coding-conventions.md`).

**Alternative écartée** : agrandir la modale (reste exigu pour un éditeur long), ou un éditeur split-screen dans la liste (complexité inutile).

## 2026-09-09 — Contenu des articles : Quill via `react-quill-new`, HTML stocké dans `Post.content`

**Contexte** : les articles sont des contenus éditoriaux avec mise en forme (titres, listes, citations, code) et une ou plusieurs images insérées dans le texte après l'image de couverture. Le `Textarea` Markdown ne suffisait pas. Le paquet d'origine `react-quill` plante avec React 19 (`findDOMNode` supprimé).

**Décision** :
- Dépendance **`react-quill-new`** (fork maintenu, Quill 2, compatible React 19).
- Composant `PostEditor` (`components/admin/articles/`) thème Snow, toolbar bornée aux formats utiles (headers, listes, citation, code-block, lien, **image**).
- Habillage 100 % tokens dans `src/styles.css` (`.post-editor` pour l'éditeur, `.quill-content` pour le rendu public futur) — aucune couleur codée en dur.
- Le HTML Quill est stocké tel quel dans `Post.content` (Prisma).

**Alternative écartée** : conserver Markdown en Textarea (pas d'insertion d'image fluide), ou TipTap/ProseMirror (dépendance plus lourde, non demandée).

## 2026-09-09 — Slug : généré côté serveur, jamais exposé dans l'UI

**Contexte** : l'utilisateur ne doit voir **aucun** champ slug — l'adresse d'un article est un détail technique généré automatiquement à l'insertion.

**Décision** :
- `generateUniqueSlug(title)` dans `src/mutations/post.ts` : `slugify()` (utilitaire `src/lib/slug.ts`, accents français) + suffixe `-2`, `-3`… en cas de collision (unicité testée en base).
- Le slug est retiré des schémas Zod et du formulaire ; `createPost` le calcule seul.
- En **mise à jour**, le slug ne change pas : les URLs déjà partagées restent valides.

**Alternative écartée** : slug éditable côté client avec régénération (expose un détail technique et multiplie les cas d'erreur de validation).

## 2026-09-09 — Validation de formulaires : erreur affichée sous le champ concerné

**Contexte** : les erreurs de validation signalées uniquement par toast ne permettent pas d'identifier le champ en cause, surtout sur un formulaire long.

**Décision** :
- Validation avant submit ; chaque erreur s'affiche **sous son champ** avec un message clair et spécifique (`text-destructive`, `role="alert"`, `aria-invalid`, `aria-describedby`).
- L'erreur du champ disparaît dès que l'utilisateur le corrige ; un toast récapitule (« Corrigez les champs signalés… »).
- Zod côté server function reste le second filet (les messages du schéma servent de référence pour les libellés).

**Alternative écartée** : toast seul (non localisable), ou bloc d'erreurs global en haut du formulaire (obligé de chercher le champ).

## 2026-09-09 — Médias d'articles : R2 public, accès au contenu premium verrouillé

**Contexte** : les images de couverture, de galerie et insérées dans le contenu éditorial seront hébergées dans un bucket Cloudflare R2. La question était de savoir si les médias d'un article premium devaient être privés.

**Décision** : toutes les images sont publiques et servies depuis Cloudflare R2 via une URL stable. Le paywall protège l'accès au contenu de l'article : pour un article premium, un visiteur peut voir la couverture et l'extrait, mais pas le corps de l'article ni les images qui y sont insérées sans abonnement actif.

**Alternative écartée** : rendre les objets R2 privés et générer des URLs signées pour les images premium. Cette complexité n'est pas nécessaire puisque la protection attendue porte sur la lecture de l'article, pas sur la confidentialité intrinsèque de ses fichiers médias.
