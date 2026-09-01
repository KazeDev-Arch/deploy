# 02 — Design system (noir & blanc, shadcn)

Design **monochrome noir & blanc**, sans couleur de marque. Tout est construit sur les **tokens sémantiques shadcn** (base `zinc`), définis dans `src/styles.css`.

## Primitives shadcn (config `components.json`)

- Style : `new-york`
- Base (primitives) : `radix` (pattern `asChild`, `Slot` de `radix-ui`) — voir `.agents/skills/shadcn/rules/base-vs-radix.md`
- `baseColor` : `zinc`
- Bibliothèque d'icônes : `lucide-react`
- Alias d'import : `#/` (voir `05-coding-conventions.md`)

## Tokens (à utiliser, jamais de valeurs en dur)

| Rôle | Token CSS / classe Tailwind |
|---|---|
| Fond | `--background` / `bg-background` |
| Texte | `--foreground` / `text-foreground` |
| Accent principal (quasi-noir) | `--primary` / `bg-primary`, `text-primary` |
| Texte atténué | `--muted-foreground` / `text-muted-foreground` |
| Surfaces secondaires | `--muted`, `--secondary`, `--accent` |
| Bordures / séparateurs | `--border` / `border-border`, `<Separator>` |
| Destructif (erreur) | `--destructive` / `text-destructive` |

Règle : **aucune couleur codée en dur** (`bg-blue-500`, `text-emerald-600`, `#fff`, etc.). Utiliser les tokens sémantiques. La seule « couleur » autorisée est le contraste noir/blanc obtenu via les tokens.

## Typographie

- Police : **Manrope** (déjà importée dans `src/styles.css` via `--font-sans`).
- Utiliser les tailles/graisses Tailwind standard ; pas de nouvelle police sans confirmation.

## Principes de design

1. **Monochrome** : le contraste (noir/blanc, niveaux de gris) fait le design, pas la couleur.
2. **Composer shadcn, ne pas réinventer** : composer les primitives (`Card`, `Button`, `Badge`, `Tabs`, `Separator`, `Skeleton`...) plutôt que des `<div>` stylés à la main.
3. **Sobriété éditoriale** : c'est une publication tech/design/ingénierie — la typographie et l'espacement priment, pas la décoration.
4. **Respecter les règles shadcn** (`.agents/skills/shadcn/rules/`) : `gap-*` (pas `space-y-*`), `size-*`, `cn()`, `data-icon` pour les icônes, `FieldGroup`/`Field` pour les formulaires, `Skeleton` pour le chargement, `Empty` pour les états vides, etc.

## Nettoyage en cours

Le thème actuel de `src/styles.css` contient encore des couleurs custom « sea/teal » (`--sea-ink`, `--lagoon`, `--palm`, `--sand`...) et des classes décoratives (`.island-shell`, `.feature-card`, `.nav-link`, `.island-kicker`, etc.) héritées d'un template. Pour passer au noir & blanc pur : supprimer ces tokens/classes et ramener les composants à la seule palette sémantique shadcn. Voir `08-decisions-log.md`.
