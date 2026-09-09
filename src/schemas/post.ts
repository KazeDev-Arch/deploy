import { z } from 'zod'

export const postStatusSchema = z.enum(['DRAFT', 'PUBLISHED'])

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, 'Le titre est requis')
    .max(200, 'Le titre ne peut pas dépasser 200 caractères'),
  content: z.string().min(1, 'Le contenu est requis'),
  excerpt: z
    .string()
    .max(300, 'L’extrait ne peut pas dépasser 300 caractères')
    .optional(),
  coverImage: z
    .string()
    .url('L’URL de l’image de couverture est invalide (https://…)')
    .optional(),
  postImages: z
    .array(z.string().url('Une des URL d’images est invalide (https://…)'))
    .default([]),
  isPremium: z.boolean().default(false),
  status: postStatusSchema.default('DRAFT'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const updatePostSchema = createPostSchema.extend({
  id: z.string().min(1, 'Id requis'),
})

export type UpdatePostInput = z.infer<typeof updatePostSchema>
