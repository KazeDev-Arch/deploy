import { useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, Pencil, Plus, Trash2 } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/components/ui/table'

import type { PostListItem } from '#/hooks/post.hooks'

const PAGE_SIZE = 10

interface ArticlesTableProps {
  data: PostListItem[]
  onCreate: () => void
  onEdit: (post: PostListItem) => void
  onDelete: (post: PostListItem) => void
}

export function ArticlesTable({
  data,
  onCreate,
  onEdit,
  onDelete,
}: ArticlesTableProps) {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return data
    return data.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.slug.toLowerCase().includes(term),
    )
  }, [data, query])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, pageCount)
  const visible = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  )

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setPage(1)
          }}
          placeholder="Rechercher un article…"
          className="max-w-xs"
        />
        <Button size="sm" onClick={onCreate}>
          <Plus data-icon="inline-start" />
          Nouvel article
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Accès</TableHead>
            <TableHead>Mis à jour</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visible.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                Aucun article trouvé.
              </TableCell>
            </TableRow>
          ) : (
            visible.map((post) => (
              <TableRow key={post.id}>
                <TableCell>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-medium">{post.title}</span>
                    <span className="text-xs text-muted-foreground">
                      /{post.slug}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      post.status === 'PUBLISHED' ? 'default' : 'secondary'
                    }
                  >
                    {post.status === 'PUBLISHED' ? 'Publié' : 'Brouillon'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {post.isPremium ? (
                    <Badge variant="outline">Premium</Badge>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Gratuit
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.updatedAt).toLocaleDateString('fr-FR')}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Modifier"
                      onClick={() => onEdit(post)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      aria-label="Supprimer"
                      onClick={() => onDelete(post)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          {filtered.length} article(s)
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
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
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
            disabled={currentPage >= pageCount}
          >
            Suivant
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </div>
    </div>
  )
}
