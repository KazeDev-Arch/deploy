import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { toast } from 'sonner'

import { createPost, deletePost, listPosts, updatePost } from '#/mutations/post'

const POSTS_QUERY_KEY = ['posts'] as const

export type PostListItem = Awaited<ReturnType<typeof listPosts>>[number]

// ───────────────────────────────
// Lecture
// ───────────────────────────────

export function useListPosts() {
  const listPostsFn = useServerFn(listPosts)
  return useQuery({
    queryKey: POSTS_QUERY_KEY,
    queryFn: () => listPostsFn(),
  })
}

// ───────────────────────────────
// Écriture (gestion de l'UI : toasts + invalidation)
// ───────────────────────────────

export function useCreatePost() {
  const queryClient = useQueryClient()
  const createPostFn = useServerFn(createPost)
  return useMutation({
    mutationFn: createPostFn,
    onSuccess: () => {
      toast.success('Article créé !')
      void queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la création')
    },
  })
}

export function useUpdatePost() {
  const queryClient = useQueryClient()
  const updatePostFn = useServerFn(updatePost)
  return useMutation({
    mutationFn: updatePostFn,
    onSuccess: () => {
      toast.success('Article mis à jour !')
      void queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise à jour')
    },
  })
}

export function useDeletePost() {
  const queryClient = useQueryClient()
  const deletePostFn = useServerFn(deletePost)
  return useMutation({
    mutationFn: deletePostFn,
    onSuccess: () => {
      toast.success('Article supprimé.')
      void queryClient.invalidateQueries({ queryKey: POSTS_QUERY_KEY })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la suppression')
    },
  })
}
