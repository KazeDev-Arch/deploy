import { createServerFn } from '@tanstack/react-start'

import { prisma } from '#/db'
import { authorize } from '#/lib/auth-guard'
import { slugify } from '#/lib/slug'
import { createPostSchema, updatePostSchema } from '#/schemas/post'

// ───────────────────────────────
// Helpers (slug)
// ───────────────────────────────

/**
 * Slug unique garanti : base = titre slugifié ; en cas de collision,
 * suffixe `-2`, `-3`, … Teste l'unicité en base (aucune limite pratique
 * sur le nombre de tests pour des titres réalistes).
 */
async function generateUniqueSlug(title: string, excludeId?: string) {
  const base = slugify(title) || 'article'
  let candidate = base
  let suffix = 1

  // Boucle bornée par sécurité, mais une collision en série est improbable.
  for (let i = 0; i < 100; i++) {
    const existing = await prisma.post.findFirst({
      where: { slug: candidate, ...(excludeId ? { id: { not: excludeId } } : {}) },
      select: { id: true },
    })
    if (!existing) return candidate
    suffix += 1
    candidate = `${base}-${suffix}`
  }
  throw new Error('Impossible de générer un slug unique pour ce titre')
}

// ───────────────────────────────
// Lecture (panneau admin — réservé via `authorize`)
// ───────────────────────────────

export const listPosts = createServerFn({ method: 'GET' }).handler(async () => {
  await authorize('article', 'read')
  return prisma.post.findMany({
    orderBy: { updatedAt: 'desc' },
    include: {
      author: { select: { id: true, name: true, email: true } },
    },
  })
})

export const getPost = createServerFn({ method: 'GET' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await authorize('article', 'read')
    const post = await prisma.post.findUnique({ where: { id } })
    if (!post) throw new Error('Article introuvable')
    return post
  })

// ───────────────────────────────
// Écriture
// ───────────────────────────────

export const createPost = createServerFn({ method: 'POST' })
  .validator(createPostSchema)
  .handler(async ({ data }) => {
    const user = await authorize('article', 'create')
    return prisma.post.create({
      data: {
        title: data.title,
        slug: await generateUniqueSlug(data.title),
        content: data.content,
        excerpt: data.excerpt?.trim() || null,
        coverImage: data.coverImage?.trim() || null,
        postImages: data.postImages,
        isPremium: data.isPremium,
        status: data.status,
        publishedAt: data.status === 'PUBLISHED' ? new Date() : null,
        authorId: user.id,
      },
    })
  })

export const updatePost = createServerFn({ method: 'POST' })
  .validator(updatePostSchema)
  .handler(async ({ data }) => {
    await authorize('article', 'update')
    const { id, ...fields } = data

    const existing = await prisma.post.findUnique({ where: { id } })
    if (!existing) throw new Error('Article introuvable')

    return prisma.post.update({
      where: { id },
      data: {
        title: fields.title,
        // Le slug ne change pas lors d'une mise à jour : les URLs déjà
        // partagées restent valides (les slugs sont stables).
        content: fields.content,
        excerpt: fields.excerpt?.trim() || null,
        coverImage: fields.coverImage?.trim() || null,
        postImages: fields.postImages,
        isPremium: fields.isPremium,
        status: fields.status,
        publishedAt:
          fields.status === 'PUBLISHED'
            ? (existing.publishedAt ?? new Date())
            : null,
      },
    })
  })

export const deletePost = createServerFn({ method: 'POST' })
  .validator((id: string) => id)
  .handler(async ({ data: id }) => {
    await authorize('article', 'delete')
    await prisma.post.delete({ where: { id } })
  })
