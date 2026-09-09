import { createFileRoute } from '@tanstack/react-router'

import { PageHeader, RequireRole } from '#/components/admin'
import { PostForm } from '#/components/admin/articles'
import { Skeleton } from '#/components/ui/skeleton'
import { useGetPost } from '#/hooks/post.hooks'

export const Route = createFileRoute('/_dashboard/admin/articles/$postId')({
  component: AdminEditArticle,
})

function AdminEditArticle() {
  const { postId } = Route.useParams()

  return (
    <RequireRole role="ADMIN">
      <EditArticleContent postId={postId} />
    </RequireRole>
  )
}

function EditArticleContent({ postId }: { postId: string }) {
  const postQuery = useGetPost(postId)
  const post = postQuery.data

  if (postQuery.isPending) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground">
          Article introuvable — il a peut-être été supprimé.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Modifier l’article"
        description={post.title}
      />
      <PostForm post={post} />
    </div>
  )
}
