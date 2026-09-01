import { Clock, Lock } from 'lucide-react'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

import { featured, initials, topStories } from '#/data/home.ts'

export function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 -z-10 bg-background">
        <div className="absolute inset-0 opacity-[0.02]">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dots"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="20" cy="20" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>
      </div>

      <div className="page-wrap px-4 py-16 md:py-24 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
          <article className="flex flex-col justify-center">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="outline" className="border-border font-medium">
                {featured.category}
              </Badge>
              {featured.premium && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                  <Lock className="size-3.5" />
                  Réservé aux abonnés
                </span>
              )}
            </div>

            {/* Headline */}
            <h1 className="mt-6 text-5xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              {featured.title}
            </h1>

            {/* Subheadline */}
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              {featured.dek}
            </p>

            {/* Author info */}
            <div className="mt-10 flex items-center gap-3">
              <Avatar className="size-10">
                <AvatarFallback className="bg-muted text-xs font-bold text-foreground">
                  {initials(featured.author)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {featured.author}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3" />
                  {featured.date} · {featured.readTime} de lecture
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg" asChild className="font-semibold">
                <a href="#abonnement">Lire l'article vedette</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="font-semibold">
                <a href="#articles">Tous les articles</a>
              </Button>
            </div>
          </article>

          {/* Sidebar: Trending */}
          <aside id="a-la-une" className="lg:border-l lg:border-border lg:pl-12">
            <div className="flex items-center gap-2.5">
              <span className="h-4 w-1 rounded-full bg-foreground" />
              <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Tendances
              </h2>
            </div>

            <ol className="mt-6 divide-y divide-border">
              {topStories.map((story, index) => (
                <li
                  key={story.title}
                  className="group flex gap-5 py-5 first:pt-0 transition-colors hover:text-foreground"
                >
                  <span className="w-6 shrink-0 whitespace-nowrap text-right text-xl font-bold leading-none text-muted-foreground/50 group-hover:text-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold leading-snug text-foreground lg:text-base">
                      {story.title}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {story.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{story.readTime}</span>
                      {story.premium && (
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
      </div>
    </section>
  )
}
