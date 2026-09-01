import { Lock } from 'lucide-react'

import { Avatar, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card'

import { initials, type Article } from '#/data/home.ts'

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Card className="group h-full gap-4 transition hover:border-foreground/30">
      <CardHeader className="gap-3">
        <div className="flex items-center justify-between">
          <Badge variant="secondary" className="font-medium">
            {article.category}
          </Badge>
          {article.premium && (
            <Lock
              className="size-4 text-muted-foreground"
              aria-label="Réservé aux abonnés"
            />
          )}
        </div>
        <CardTitle className="text-xl font-semibold leading-snug">
          {article.title}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-sm leading-relaxed">
          {article.dek}
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-auto flex items-center gap-2.5">
        <Avatar className="size-7">
          <AvatarFallback className="bg-muted text-[10px] font-bold text-muted-foreground">
            {initials(article.author)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{article.author}</span>
          <span className="mx-1.5" aria-hidden="true">
            ·
          </span>
          <span>{article.date}</span>
        </div>
      </CardContent>
    </Card>
  )
}
