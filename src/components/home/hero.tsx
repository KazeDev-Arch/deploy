import { Clock, Lock } from 'lucide-react'

import { Avatar, AvatarFallback } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

import { featured, initials, topStories } from '#/data/home.ts'

export function HomeHero() {
  return (
    <section className="page-wrap px-4 pb-6 pt-12 md:pt-20">
      <div className="grid gap-12 lg:grid-cols-[1.55fr_1fr] lg:gap-16">
        <article className="flex flex-col justify-center">
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

          <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {featured.title}
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {featured.dek}
          </p>

          <div className="mt-8 flex items-center gap-3">
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

          <div className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="#abonnement">Lire l’article</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#articles">Parcourir le blog</a>
            </Button>
          </div>
        </article>

        <aside id="a-la-une" className="lg:border-l lg:border-border lg:pl-12">
          <div className="flex items-center gap-2.5">
            <span className="h-4 w-1 rounded-full bg-foreground" />
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              À la une
            </h2>
          </div>

          <ol className="mt-6 divide-y divide-border">
            {topStories.map((story, index) => (
              <li key={story.title} className="group flex gap-5 py-5 first:pt-0">
                <span className="pt-0.5 text-2xl font-bold leading-none text-muted-foreground/60 transition group-hover:text-foreground">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold leading-snug text-foreground">
                    {story.title}
                  </h3>
                  <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {story.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{story.readTime}</span>
                    {story.premium && (
                      <Lock className="size-3" aria-label="Réservé aux abonnés" />
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
