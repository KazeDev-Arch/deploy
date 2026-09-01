import { Search } from 'lucide-react'

import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

import { categories } from '#/data/posts.ts'

export type PremiumFilter = 'all' | 'free' | 'premium'

interface PostsToolbarProps {
  query: string
  onQueryChange: (value: string) => void
  category: string
  onCategoryChange: (value: string) => void
  premium: PremiumFilter
  onPremiumChange: (value: PremiumFilter) => void
  resultCount: number
}

/**
 * Search input and filters for the articles grid. Controlled component — the
 * route owns the filter state and passes it down.
 */
export function PostsToolbar({
  query,
  onQueryChange,
  category,
  onCategoryChange,
  premium,
  onPremiumChange,
  resultCount,
}: PostsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="relative w-full sm:w-72">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Rechercher un article…"
          className="pl-9"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <Select value={category} onValueChange={onCategoryChange}>
          <SelectTrigger className="min-w-[180px]">
            <SelectValue placeholder="Catégorie" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Toutes les catégories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={premium}
          onValueChange={(value) => onPremiumChange(value as PremiumFilter)}
        >
          <SelectTrigger className="min-w-[140px]">
            <SelectValue placeholder="Accès" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="all">Tous les accès</SelectItem>
              <SelectItem value="free">Gratuit</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <span className="text-sm text-muted-foreground">
          {resultCount} article{resultCount > 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
