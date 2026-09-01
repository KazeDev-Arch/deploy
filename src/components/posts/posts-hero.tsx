import { Clock, Lock } from 'lucide-react'
import { Link } from '@tanstack/react-router'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

import { initials } from '#/data/home.ts'
import { featuredPost, featuredPosts } from '#/data/posts.ts'

/**
 * "À la une" section: one lead article plus a short ranked list of secondary
 * featured stories.
 */
export function PostsHero() {
  return (
    <section className="page-wrap px-4 pt-12 md:pt-16">
      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <article className="flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-border font-medium">
              {featuredPost.category}
            </Badge>
            {featuredPost.premium && <PremiumLabel />}
          </div>

          <Link
            to="/posts/$postId"
            params={{ postId: featuredPost.slug }}
            className="no-underline"
          >
            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl">
              {featuredPost.title}
            </h1>
          </Link>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {featuredPost.dek}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-muted text-xs font-bold text-foreground">
                {initials(featuredPost.author)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold text-foreground">
                {featuredPost.author}
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3" />
                {featuredPost.date} · {featuredPost.readTime} de lecture
              </p>
            </div>
          </div>

          <div className="mt-9">
            <Button size="lg" asChild>
              <Link to="/posts/$postId" params={{ postId: featuredPost.slug }}>
                Lire l’article
              </Link>
            </Button>
          </div>
        </article>

        <aside className="lg:border-l lg:border-border lg:pl-12">
          <SectionTitle>À la une</SectionTitle>

          <ol className="mt-6 divide-y divide-border">
            {featuredPosts.map((post, index) => (
              <li key={post.slug} className="group flex gap-5 py-5 first:pt-0">
                <span className="w-6 shrink-0 whitespace-nowrap text-right text-xl font-bold leading-none text-muted-foreground/50 group-hover:text-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <Link
                    to="/posts/$postId"
                    params={{ postId: post.slug }}
                    className="no-underline"
                  >
                    <h3 className="text-lg font-semibold leading-snug text-foreground">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {post.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                    {post.premium && (
                      <Lock
                        className="size-3"
                        aria-label="Réservé aux abonnés"
                      />
                    )}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="h-4 w-1 rounded-full bg-foreground" />
      <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {children}
      </h2>
    </div>
  )
}

function PremiumLabel() {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
      <Lock className="size-3.5" />
      Réservé aux abonnés
    </span>
  )
}
