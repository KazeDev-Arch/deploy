/**
 * Mock data for the /posts/ listing page.
 *
 * TEMPLATE — this module stands in for a real data source. In production,
 * articles are served from the Prisma `Post` model (title, slug, content,
 * excerpt, coverImage, isPremium, status, publishedAt) via a `loader` or a
 * server function in `src/data/loaders/`. `views` and `revenue` are not yet
 * persisted and are mocked here to drive the "most read" / "most paid" ranking.
 */

export type Post = {
  slug: string
  title: string
  dek: string
  category: string
  author: string
  date: string
  readTime: string
  premium: boolean
  /** Total views — drives the "Les plus lus" ranking. */
  views: number
  /** Revenue generated (XAF) — drives the "Les plus payés" ranking. */
  revenue: number
}

/** Editorial categories used by the category filter. */
export const categories = [
  'DevOps',
  'Architecture',
  'Design',
  'Ingénierie',
  'Data',
  'Produit',
] as const

export const posts: Post[] = [
  {
    slug: 'nous-avons-divise-notre-ci-par-dix',
    title: 'Nous avons divisé notre CI par dix. Voici ce que ça a cassé.',
    dek: 'Réduire un pipeline de 40 minutes à 4 exige plus qu’un cache. Retour sur les régressions, les tests sautés et les déploiements qu’on aurait préféré éviter.',
    category: 'DevOps',
    author: 'Yves Kouassi',
    date: '31 août 2026',
    readTime: '14 min',
    premium: true,
    views: 18420,
    revenue: 412500,
  },
  {
    slug: 'microservices-plus-chers-quun-monolithe',
    title: 'Pourquoi vos microservices coûtent plus cher qu’un monolithe',
    dek: 'Le coût de l’infrastructure n’est que la partie visible de l’iceberg. La coordination, elle, se paie en heures de senior.',
    category: 'Architecture',
    author: 'Awa Konaté',
    date: '30 août 2026',
    readTime: '9 min',
    premium: true,
    views: 15680,
    revenue: 375000,
  },
  {
    slug: 'design-systems-la-vraie-raison-des-echecs',
    title: 'Design systems : la vraie raison des échecs',
    dek: 'Ce n’est pas la techno qui tue un design system. C’est l’absence de propriétaire et le rythme de gouvernance.',
    category: 'Design',
    author: 'Grâce Nzuzi',
    date: '29 août 2026',
    readTime: '7 min',
    premium: false,
    views: 13120,
    revenue: 0,
  },
  {
    slug: 'typescript-les-types-qui-sauvent-des-vies',
    title: 'TypeScript : les types qui sauvent des vies',
    dek: 'Des types nominaux aux brand types, comment encodage plus strict rime avec moins de bugs en production.',
    category: 'Ingénierie',
    author: 'Samuel Nkosi',
    date: '28 août 2026',
    readTime: '6 min',
    premium: false,
    views: 12040,
    revenue: 0,
  },
  {
    slug: 'on-call-survivre-a-ses-premieres-nuits',
    title: 'On-call : survivre à ses premières nuits de garde',
    dek: 'Une alerte à 3h du matin ne s’improvise pas. Check-lists, escalade et santé mentale : le kit du garde débutant.',
    category: 'DevOps',
    author: 'Ibrahim Diallo',
    date: '27 août 2026',
    readTime: '8 min',
    premium: true,
    views: 9870,
    revenue: 238000,
  },
  {
    slug: 'ce-que-les-container-queries-ont-vraiment-change',
    title: 'Ce que les container queries ont vraiment changé',
    dek: 'On pensait enfin tenir le Graal du CSS responsive. Bilan après deux ans d’usage réel.',
    category: 'Design',
    author: 'Aïcha Benali',
    date: '26 août 2026',
    readTime: '6 min',
    premium: false,
    views: 9210,
    revenue: 0,
  },
  {
    slug: 'les-index-postgresql-que-vous-devriez-connaitre',
    title: 'Les index PostgreSQL que vous devriez connaître',
    dek: 'Des index partiels aux GIN, ce que la documentation ne vous dit pas toujours.',
    category: 'Data',
    author: 'Samuel Nkosi',
    date: '25 août 2026',
    readTime: '8 min',
    premium: false,
    views: 8450,
    revenue: 0,
  },
  {
    slug: 'kubernetes-pour-les-presses',
    title: 'Kubernetes pour les pressés',
    dek: 'Un guide pragmatique pour survivre à votre premier cluster en production.',
    category: 'DevOps',
    author: 'Grâce Nzuzi',
    date: '24 août 2026',
    readTime: '11 min',
    premium: true,
    views: 8020,
    revenue: 196000,
  },
  {
    slug: 'le-monorepo-est-il-mort',
    title: 'Le monorepo est-il mort ? Pas si vite',
    dek: 'Entre monorepo et polyrepos, le vrai coût se joue ailleurs que dans les fichiers.',
    category: 'Ingénierie',
    author: 'Marc Tshibanda',
    date: '23 août 2026',
    readTime: '7 min',
    premium: false,
    views: 7640,
    revenue: 0,
  },
  {
    slug: 'le-design-de-lerreur',
    title: 'Le design de l’erreur : ce que dit un message d’échec',
    dek: 'Une page 404 ou un crash API sont aussi des choix de design.',
    category: 'Design',
    author: 'Awa Konaté',
    date: '22 août 2026',
    readTime: '5 min',
    premium: true,
    views: 6980,
    revenue: 171000,
  },
  {
    slug: 'observabilite-au-dela-des-logs',
    title: 'Observabilité : au-delà des logs',
    dek: 'Traces, métriques et alertes : ce qu’il faut mesurer avant de monitorer.',
    category: 'DevOps',
    author: 'Ibrahim Diallo',
    date: '21 août 2026',
    readTime: '9 min',
    premium: false,
    views: 6100,
    revenue: 0,
  },
  {
    slug: 'mesurer-lengagement',
    title: 'Ce que l’on mesure mal quand on mesure l’engagement',
    dek: 'Les métriques de rétention racontent une histoire. Encore faut-il choisir les bonnes.',
    category: 'Produit',
    author: 'Aïcha Benali',
    date: '20 août 2026',
    readTime: '10 min',
    premium: true,
    views: 5540,
    revenue: 142000,
  },
  {
    slug: 'postgresql-art-du-vacuum',
    title: 'PostgreSQL, l’art du VACUUM et de l’analyse',
    dek: 'Comprendre ce qui se passe sous le capot pour ne plus subir ses pics de charge.',
    category: 'Data',
    author: 'Samuel Nkosi',
    date: '19 août 2026',
    readTime: '12 min',
    premium: false,
    views: 4980,
    revenue: 0,
  },
  {
    slug: 'limites-du-type-driven-development',
    title: 'Les limites du Type-Driven Development',
    dek: 'Quand encoder le domaine dans les types devient un frein au lieu d’un garde-fou.',
    category: 'Ingénierie',
    author: 'Marc Tshibanda',
    date: '18 août 2026',
    readTime: '6 min',
    premium: false,
    views: 4210,
    revenue: 0,
  },
  {
    slug: 'quand-un-cache-devient-une-dette',
    title: 'Quand un cache devient une dette technique',
    dek: 'L’invalidation est un problème de synchronisation, pas de configuration.',
    category: 'Architecture',
    author: 'Yves Kouassi',
    date: '17 août 2026',
    readTime: '8 min',
    premium: true,
    views: 3890,
    revenue: 98000,
  },
  {
    slug: 'accessibilite-au-dela-des-contrastes',
    title: 'Accessibilité : au-delà des contrastes',
    dek: 'Le focus, la hiérarchie et le mouvement comptent autant que les couleurs.',
    category: 'Design',
    author: 'Awa Konaté',
    date: '16 août 2026',
    readTime: '7 min',
    premium: false,
    views: 3120,
    revenue: 0,
  },
]

/** The lead "à la une" article shown large in the hero section. */
export const featuredPost: Post = posts[0]

/** Secondary "à la une" articles shown alongside the lead. */
export const featuredPosts: Post[] = [posts[1], posts[4], posts[11]]

/** Top N articles by views ("Les plus lus"). */
export function mostRead(limit = 5): Post[] {
  return [...posts].sort((a, b) => b.views - a.views).slice(0, limit)
}

/** Top N articles by revenue ("Les plus payés"). */
export function mostPaid(limit = 5): Post[] {
  return [...posts].sort((a, b) => b.revenue - a.revenue).slice(0, limit)
}
