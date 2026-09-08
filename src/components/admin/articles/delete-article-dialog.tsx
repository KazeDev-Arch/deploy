import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '#/components/ui/alert-dialog'

import { useDeletePost } from '#/hooks/post.hooks'
import type { PostListItem } from '#/hooks/post.hooks'

interface DeleteArticleDialogProps {
  post: PostListItem | null
  onClose: () => void
}

export function DeleteArticleDialog({
  post,
  onClose,
}: DeleteArticleDialogProps) {
  const deleteMutation = useDeletePost()

  return (
    <AlertDialog
      open={post !== null}
      onOpenChange={(open) => {
        if (!open) onClose()
      }}
    >
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer l’article ?</AlertDialogTitle>
          <AlertDialogDescription>
            « {post?.title} » sera définitivement supprimé. Cette action est
            irréversible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={deleteMutation.isPending}
            onClick={(e) => {
              e.preventDefault()
              if (post) {
                deleteMutation.mutate({ data: post.id }, { onSuccess: onClose })
              }
            }}
          >
            {deleteMutation.isPending ? 'Suppression…' : 'Supprimer'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
