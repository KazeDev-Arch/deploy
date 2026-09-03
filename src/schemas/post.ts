import { z } from 'zod'

export const postStatusSchema = z.enum(['DRAFT', 'PUBLISHED'])

export const createPostSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(200, 'Titre trop long'),
  slug: z
    .string()
    .min(1, 'Le slug est requis')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug invalide (minuscules, chiffres, tirets)',
    ),
  content: z.string().min(1, 'Le contenu est requis'),
  excerpt: z.string().max(300, 'Extrait trop long').optional(),
  coverImage: z.string().url('URL d’image invalide').optional(),
  postImages: z.array(z.string().url('URL d’image invalide')).default([]),
  isPremium: z.boolean().default(false),
  status: postStatusSchema.default('DRAFT'),
})

export type CreatePostInput = z.infer<typeof createPostSchema>

export const updatePostSchema = createPostSchema.extend({
  id: z.string().min(1, 'Id requis'),
})

export type UpdatePostInput = z.infer<typeof updatePostSchema>
