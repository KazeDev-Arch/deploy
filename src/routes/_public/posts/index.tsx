import { useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft, ArrowRight } from 'lucide-react'

import { ArticleCard } from '../../../components/article-card'
import { PostsHero } from '../../../components/posts/posts-hero'
import { PostsRanking } from '../../../components/posts/posts-ranking'
import { PostsToolbar } from '../../../components/posts/posts-toolbar'
import type { PremiumFilter } from '../../../components/posts/posts-toolbar'
import { Button } from '../../../components/ui/button'

import { posts } from '#/data/posts.ts'

const PAGE_SIZE = 9

export const Route = createFileRoute('/_public/posts/')({
  component: PostsPage,
})

function PostsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [premium, setPremium] = useState<PremiumFilter>('all')
  const [page, setPage] = useState(1)

  // TEMPLATE — client-side filtering over mock data. Replace with a `loader`
  // (server-side) or a server function (`src/data/loaders/`) reading Prisma.
  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesQuery =
        term === '' ||
        post.title.toLowerCase().includes(term) ||
        post.dek.toLowerCase().includes(term)
      const matchesCategory = category === 'all' || post.category === category
      const matchesPremium =
        premium === 'all' ||
        (premium === 'premium' ? post.premium : !post.premium)
      return matchesQuery && matchesCategory && matchesPremium
    })
  }, [query, category, premium])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  const resetFilters = () => {
    setQuery('')
    setCategory('all')
    setPremium('all')
    setPage(1)
  }

  return (
    <main>
      <PostsHero />

      <section id="tous-les-articles" className="page-wrap px-4 py-16 md:py-24">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              La rédaction
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tous les articles
            </h2>
          </div>
        </div>

        <PostsToolbar
          query={query}
          onQueryChange={(value) => {
            setQuery(value)
            setPage(1)
          }}
          category={category}
          onCategoryChange={(value) => {
            setCategory(value)
            setPage(1)
          }}
          premium={premium}
          onPremiumChange={(value) => {
            setPremium(value)
            setPage(1)
          }}
          resultCount={filtered.length}
        />

        {filtered.length === 0 ? (
          <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border py-16 text-center">
            <p className="text-lg font-semibold text-foreground">
              Aucun article trouvé
            </p>
            <p className="max-w-md text-sm text-muted-foreground">
              Aucun article ne correspond à votre recherche. Essayez d’autres
              mots-clés ou réinitialisez les filtres.
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Réinitialiser les filtres
            </Button>
          </div>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <Link
                  key={post.slug}
                  to="/posts/$postId"
                  params={{ postId: post.slug }}
                  className="block no-underline"
                >
                  <ArticleCard article={post} />
                </Link>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                disabled={currentPage <= 1}
              >
                <ArrowLeft data-icon="inline-start" />
                Précédent
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {currentPage} / {pageCount}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setPage((current) => Math.min(pageCount, current + 1))
                }
                disabled={currentPage >= pageCount}
              >
                Suivant
                <ArrowRight data-icon="inline-end" />
              </Button>
            </div>
          </>
        )}
      </section>

      <PostsRanking />
    </main>
  )
}
