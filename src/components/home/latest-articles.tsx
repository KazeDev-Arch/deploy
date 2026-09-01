import { ArrowRight } from 'lucide-react'

import { ArticleCard } from '../article-card'

import { latest } from '#/data/home.ts'
import { Link } from '@tanstack/react-router'

export function LatestArticles() {
  return (
    <section
      id="articles"
      className="page-wrap scroll-mt-20 px-4 py-16 md:py-24"
    >
      <div className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            La rédaction
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Derniers articles
          </h2>
        </div>
        <Link
          to="/posts"
          className="hidden items-center gap-1 text-sm font-medium text-muted-foreground no-underline transition hover:text-foreground sm:inline-flex"
        >
          Tout lire
          <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {latest.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
    </section>
  )
}
