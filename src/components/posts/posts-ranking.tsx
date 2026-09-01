import { Lock } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { mostRead } from '#/data/posts.ts'

/**
 * "Les plus lus" ranking: the five most-viewed articles, shown as a single
 * numbered list.
 */
export function PostsRanking() {
  return (
    <section className="page-wrap px-4 py-16 md:py-16">
      <div className="flex items-center gap-2.5">
        <span className="h-4 w-1 rounded-full bg-foreground" />
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Les plus lus
        </h2>
      </div>

      <ol className="mt-6 divide-y divide-border">
        {mostRead(5).map((post, index) => (
          <li key={post.slug} className="flex items-baseline gap-4 py-4">
            <span className="w-6 shrink-0 whitespace-nowrap text-right text-xl font-bold leading-none text-muted-foreground/50 group-hover:text-foreground">
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="min-w-0 flex-1">
              <Link
                to="/posts/$postId"
                params={{ postId: post.slug }}
                className="no-underline"
              >
                <h3 className="truncate text-base font-semibold leading-snug text-foreground">
                  {post.title}
                </h3>
              </Link>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {post.dek}
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {post.category}
                </span>
                {post.premium && (
                  <Lock className="size-3" aria-label="Réservé aux abonnés" />
                )}
              </p>
            </div>

            <span className="shrink-0 whitespace-nowrap text-sm font-semibold text-foreground">
              {post.views.toLocaleString('fr-FR')} lectures
            </span>
          </li>
        ))}
      </ol>
    </section>
  )
}
