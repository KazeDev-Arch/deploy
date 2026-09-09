import { createFileRoute } from '@tanstack/react-router'

import { PageHeader, RequireRole } from '#/components/admin'
import { PostForm } from '#/components/admin/articles'

export const Route = createFileRoute('/_dashboard/admin/articles/new')({
  component: AdminNewArticle,
})

function AdminNewArticle() {
  return (
    <RequireRole role="ADMIN">
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Nouvel article"
          description="Rédigez l’article, ajoutez la couverture puis les images au fil du texte. Le slug est généré depuis le titre."
        />
        <PostForm post={null} />
      </div>
    </RequireRole>
  )
}
