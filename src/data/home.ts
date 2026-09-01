export type Article = {
  title: string
  dek: string
  category: string
  author: string
  date: string
  readTime: string
  premium: boolean
}

export type TopStory = {
  title: string
  category: string
  readTime: string
  premium: boolean
}

export type Plan = {
  name: string
  price: number
  period: string
  note: string
  featured: boolean
  features: string[]
  savings?: number
}

export const featured: Article = {
  category: 'DevOps',
  title: 'Nous avons divisé notre CI par dix. Voici ce que ça a cassé.',
  dek: 'Réduire un pipeline de 40 minutes à 4 exige plus qu’un cache. Retour sur les régressions, les tests sautés et les déploiements qu’on aurait préféré éviter.',
  author: 'Yves Kouassi',
  date: '18 août 2026',
  readTime: '14 min',
  premium: true,
}

export const topStories: TopStory[] = [
  {
    title: 'Pourquoi vos microservices coûtent plus cher qu’un monolithe',
    category: 'Architecture',
    readTime: '9 min',
    premium: true,
  },
  {
    title: 'Design systems : la vraie raison des échecs',
    category: 'Design',
    readTime: '7 min',
    premium: false,
  },
  {
    title: 'TypeScript : les types qui sauvent des vies',
    category: 'Ingénierie',
    readTime: '6 min',
    premium: false,
  },
  {
    title: 'On-call : survivre à ses premières nuits de garde',
    category: 'DevOps',
    readTime: '8 min',
    premium: true,
  },
]

export const latest: Article[] = [
  {
    title: 'Ce que les container queries ont vraiment changé',
    dek: 'On pensait enfin tenir le Graal du CSS responsive. Bilan après deux ans d’usage réel.',
    category: 'Design',
    author: 'Aïcha Benali',
    date: '17 août 2026',
    readTime: '6 min',
    premium: false,
  },
  {
    title: 'Les index PostgreSQL que vous devriez connaître',
    dek: 'Des index partiels aux GIN, ce que la documentation ne vous dit pas toujours.',
    category: 'Data',
    author: 'Samuel Nkosi',
    date: '16 août 2026',
    readTime: '8 min',
    premium: false,
  },
  {
    title: 'Kubernetes pour les pressés',
    dek: 'Un guide pragmatique pour survivre à votre premier cluster en production.',
    category: 'DevOps',
    author: 'Grâce Nzuzi',
    date: '15 août 2026',
    readTime: '11 min',
    premium: true,
  },
  {
    title: 'Le monorepo est-il mort ? Pas si vite',
    dek: 'Entre monorepo et polyrepos, le vrai coût se joue ailleurs que dans les fichiers.',
    category: 'Ingénierie',
    author: 'Marc Tshibanda',
    date: '14 août 2026',
    readTime: '7 min',
    premium: false,
  },
  {
    title: 'Le design de l’erreur : ce que dit un message d’échec',
    dek: 'Une page 404 ou un crash API sont aussi des choix de design.',
    category: 'Design',
    author: 'Awa Konaté',
    date: '13 août 2026',
    readTime: '5 min',
    premium: true,
  },
  {
    title: 'Observabilité : au-delà des logs',
    dek: 'Traces, métriques et alertes : ce qu’il faut mesurer avant de monitorer.',
    category: 'DevOps',
    author: 'Ibrahim Diallo',
    date: '12 août 2026',
    readTime: '9 min',
    premium: false,
  },
]

export const plans: Plan[] = [
  {
    name: 'Mensuel',
    price: 2500,
    period: 'mois',
    note: 'Sans engagement, annulable à tout moment.',
    featured: false,
    features: [
      'Accès illimité aux articles',
      'Pas de publicités',
      'Sauvegarde de lecture',
      'Partage avec contact',
    ],
  },
  {
    name: 'Annuel',
    price: 25000,
    period: 'an',
    note: 'Deux mois offerts par rapport au tarif mensuel.',
    featured: true,
    features: [
      'Accès illimité aux articles',
      'Pas de publicités',
      'Sauvegarde de lecture',
      'Support prioritaire',
      'Accès aux archives complètes',
      'Export en PDF des articles',
    ],
    savings: 17,
  },
]

export function formatXAF(value: number) {
  return `${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`
}

export function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
