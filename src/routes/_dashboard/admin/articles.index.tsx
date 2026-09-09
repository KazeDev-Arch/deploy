import { useState } from 'react'
import {
  createFileRoute,
  useNavigate,
} from '@tanstack/react-router'

import { PageHeader, RequireRole } from '#/components/admin'
import { ArticlesTable, DeleteArticleDialog } from '#/components/admin/articles'
import { Skeleton } from '#/components/ui/skeleton'
import { useListPosts } from '#/hooks/post.hooks'
import type { PostListItem } from '#/hooks/post.hooks'

export const Route = createFileRoute('/_dashboard/admin/articles/')({
  component: AdminArticles,
})

function AdminArticles() {
  return (
    <RequireRole role="ADMIN">
      <ArticlesManager />
    </RequireRole>
  )
}

function ArticlesManager() {
  const navigate = useNavigate()
  const listPostsQuery = useListPosts()
  const posts = listPostsQuery.data ?? []

  const [deletingPost, setDeletingPost] = useState<PostListItem | null>(null)

  return (
    <>
      <PageHeader
        title="Articles"
        description="Rédigez, mettez à jour et publiez les articles de la rédaction (brouillon → publié)."
      />

      {listPostsQuery.isPending ? (
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
          <Skeleton className="h-9 w-full" />
        </div>
      ) : (
        <ArticlesTable
          data={posts}
          onCreate={() => void navigate({ to: '/admin/articles/new' })}
          onEdit={(post) =>
            void navigate({ to: '/admin/articles/$postId', params: { postId: post.id } })
          }
          onDelete={(post) => setDeletingPost(post)}
        />
      )}

      <DeleteArticleDialog
        post={deletingPost}
        onClose={() => setDeletingPost(null)}
      />
    </>
  )
}
