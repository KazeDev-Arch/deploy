import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ImagePlus, Link2 } from 'lucide-react'
import { toast } from 'sonner'

import { PostEditor } from './post-editor'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { Switch } from '#/components/ui/switch'
import { Textarea } from '#/components/ui/textarea'
import { useCreatePost, useUpdatePost } from '#/hooks/post.hooks'
import type { PostFormPost } from '#/hooks/post.hooks'
import type { CreatePostInput } from '#/schemas/post'

type Status = 'DRAFT' | 'PUBLISHED'

interface PostFormValues {
  title: string
  content: string
  excerpt: string
  coverImage: string
  postImages: string[]
  isPremium: boolean
  status: Status
}

const EMPTY_VALUES: PostFormValues = {
  title: '',
  content: '',
  excerpt: '',
  coverImage: '',
  postImages: [],
  isPremium: false,
  status: 'DRAFT',
}

function toFormValues(post: PostFormPost | null): PostFormValues {
  if (!post) return EMPTY_VALUES
  return {
    title: post.title,
    content: post.content,
    excerpt: post.excerpt ?? '',
    coverImage: post.coverImage ?? '',
    postImages: post.postImages,
    isPremium: post.isPremium,
    status: post.status,
  }
}

/** Erreurs de validation, affichées sous chaque champ concerné. */
type PostFormErrors = Partial<
  Record<'title' | 'content' | 'excerpt' | 'coverImage' | 'postImages', string>
>

const EMPTY_ERRORS: PostFormErrors = {}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

/** Contenu Quill vide : HTML vide ou paragraphe vide par défaut. */
function isEmptyContent(html: string): boolean {
  const text = html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .trim()
  return text.length === 0
}

/**
 * Formulaire d'édition d'article — page entière. Le slug n'est **pas**
 * exposé : il est généré côté serveur à partir du titre (unicité garantie).
 * Les erreurs de validation s'affichent sous chaque champ concerné.
 */
export function PostForm({ post }: { post: PostFormPost | null }) {
  const navigate = useNavigate()
  const [values, setValues] = useState<PostFormValues>(() =>
    toFormValues(post),
  )
  const [errors, setErrors] = useState<PostFormErrors>(EMPTY_ERRORS)
  const [imageUrl, setImageUrl] = useState('')

  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()

  const isEditing = post !== null
  const isPending = createMutation.isPending || updateMutation.isPending

  function set<TKey extends keyof PostFormValues>(
    key: TKey,
    value: PostFormValues[TKey],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
    // L'erreur du champ disparaît dès que l'utilisateur le corrige.
    if (key in errors) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key as keyof PostFormErrors]
        return next
      })
    }
  }

  function goBackToList() {
    void navigate({ to: '/admin/articles' })
  }

  function validate(): PostFormErrors {
    const nextErrors: PostFormErrors = {}

    const title = values.title.trim()
    if (!title) {
      nextErrors.title = 'Le titre est requis.'
    } else if (title.length > 200) {
      nextErrors.title = 'Le titre ne peut pas dépasser 200 caractères.'
    }

    if (isEmptyContent(values.content)) {
      nextErrors.content = 'Le contenu de l’article est requis.'
    }

    if (values.excerpt.trim().length > 300) {
      nextErrors.excerpt =
        'L’extrait ne peut pas dépasser 300 caractères (actuellement ' +
        `${values.excerpt.trim().length}).`
    }

    const cover = values.coverImage.trim()
    if (cover && !isValidHttpUrl(cover)) {
      nextErrors.coverImage =
        'L’URL de l’image de couverture est invalide (elle doit commencer par http:// ou https://).'
    }

    const invalidImage = values.postImages.find(
      (url) => !isValidHttpUrl(url),
    )
    if (invalidImage) {
      nextErrors.postImages = `Une des URL d’images est invalide : ${invalidImage}`
    }

    return nextErrors
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const nextErrors = validate()
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      toast.error('Corrigez les champs signalés avant d’enregistrer.')
      return
    }

    const payload: CreatePostInput = {
      title: values.title.trim(),
      content: values.content,
      excerpt: values.excerpt.trim() || undefined,
      coverImage: values.coverImage.trim() || undefined,
      postImages: values.postImages.filter((url) => url.trim()),
      isPremium: values.isPremium,
      status: values.status,
    }

    const onSuccess = goBackToList

    if (isEditing) {
      updateMutation.mutate(
        { data: { id: post.id, ...payload } },
        { onSuccess },
      )
    } else {
      createMutation.mutate({ data: payload }, { onSuccess })
    }
  }

  function handleAddImage() {
    const url = imageUrl.trim()
    if (!url) {
      setErrors((prev) => ({
        ...prev,
        postImages: 'Renseignez une URL d’image avant de l’ajouter.',
      }))
      return
    }
    if (!isValidHttpUrl(url)) {
      setErrors((prev) => ({
        ...prev,
        postImages:
          'URL d’image invalide : elle doit commencer par http:// ou https://.',
      }))
      return
    }
    if (values.postImages.includes(url)) {
      setErrors((prev) => ({
        ...prev,
        postImages: 'Cette image est déjà dans la galerie.',
      }))
      return
    }
    set('postImages', [...values.postImages, url])
    setImageUrl('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6"
      data-testid="post-form"
    >
      {/* ── Barre d'actions ─────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={goBackToList}
            disabled={isPending}
          >
            <ArrowLeft data-icon="inline-start" />
            Retour
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={goBackToList}
            disabled={isPending}
          >
            Annuler
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending
              ? 'Enregistrement…'
              : isEditing
                ? 'Enregistrer'
                : 'Créer l’article'}
          </Button>
        </div>
      </div>

      {/* ── Colonne principale ─────────────────────────────── */}
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-6">
          {/* Titre + contenu */}
          <Card>
            <CardHeader>
              <CardTitle>Contenu</CardTitle>
              <CardDescription>
                L’adresse (slug) de l’article est générée automatiquement à
                partir du titre lors de l’enregistrement.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-title">Titre</Label>
                <Input
                  id="post-title"
                  value={values.title}
                  onChange={(e) => set('title', e.target.value)}
                  placeholder="Titre de l’article"
                  aria-invalid={Boolean(errors.title)}
                  aria-describedby={
                    errors.title ? 'post-title-error' : undefined
                  }
                />
                {errors.title && (
                  <p
                    id="post-title-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.title}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-content">Article</Label>
                <PostEditor
                  value={values.content}
                  onChange={(content) => set('content', content)}
                  placeholder="Écrivez votre article… utilisez l’icône image pour insérer des visuels au fil du texte."
                  aria-invalid={Boolean(errors.content)}
                  aria-describedby={
                    errors.content ? 'post-content-error' : undefined
                  }
                />
                {errors.content && (
                  <p
                    id="post-content-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.content}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Images du corps d'article */}
          <Card>
            <CardHeader>
              <CardTitle>Images de l’article</CardTitle>
              <CardDescription>
                Insérez directement des images dans le texte via l’icône image
                de la barre d’outils. Ajoutez ici leurs URLs pour garder une
                galerie de référence.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-image">URL de l’image</Label>
                <Input
                  id="post-image"
                  type="url"
                  placeholder="https://…"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value)
                    if (errors.postImages) {
                      setErrors((prev) => ({ ...prev, postImages: undefined }))
                    }
                  }}
                  aria-invalid={Boolean(errors.postImages)}
                  aria-describedby={
                    errors.postImages ? 'post-images-error' : undefined
                  }
                />
                {errors.postImages && (
                  <p
                    id="post-images-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.postImages}
                  </p>
                )}
              </div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImage}
                >
                  <ImagePlus data-icon="inline-start" />
                  Ajouter à la galerie
                </Button>
              </div>
              {values.postImages.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Aucune image ajoutée pour l’instant.
                </p>
              ) : (
                <ul className="flex flex-col gap-1.5">
                  {values.postImages.map((url) => (
                    <li
                      key={url}
                      className="flex items-center justify-between gap-2 rounded-md border px-3 py-2"
                    >
                      <span className="flex min-w-0 items-center gap-2 text-sm">
                        <Link2
                          data-icon="inline-start"
                          className="shrink-0 text-muted-foreground"
                        />
                        <span className="truncate">{url}</span>
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() =>
                          set(
                            'postImages',
                            values.postImages.filter((u) => u !== url),
                          )
                        }
                      >
                        Retirer
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Colonne latérale ───────────────────────────────── */}
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-status">Statut</Label>
                <Select
                  value={values.status}
                  onValueChange={(value) => set('status', value as Status)}
                >
                  <SelectTrigger id="post-status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="DRAFT">Brouillon</SelectItem>
                      <SelectItem value="PUBLISHED">Publié</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <Label htmlFor="post-premium">Article premium</Label>
                  <p className="text-xs text-muted-foreground">
                    Réservé aux abonnés actifs.
                  </p>
                </div>
                <Switch
                  id="post-premium"
                  checked={values.isPremium}
                  onCheckedChange={(checked) => set('isPremium', checked)}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Vitrine</CardTitle>
              <CardDescription>
                Affiché dans les listes d’articles.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-cover">Image de couverture</Label>
                <Input
                  id="post-cover"
                  value={values.coverImage}
                  onChange={(e) => set('coverImage', e.target.value)}
                  placeholder="https://…"
                  type="url"
                  aria-invalid={Boolean(errors.coverImage)}
                  aria-describedby={
                    errors.coverImage ? 'post-cover-error' : undefined
                  }
                />
                {errors.coverImage && (
                  <p
                    id="post-cover-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.coverImage}
                  </p>
                )}
              </div>
              {values.coverImage && !errors.coverImage ? (
                <img
                  src={values.coverImage}
                  alt="Aperçu de l’image de couverture"
                  className="aspect-video w-full rounded-md border object-cover"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground">
                  Aperçu de la couverture
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="post-excerpt">Extrait</Label>
                <Textarea
                  id="post-excerpt"
                  value={values.excerpt}
                  onChange={(e) => set('excerpt', e.target.value)}
                  placeholder="Résumé court affiché dans les listes"
                  className="min-h-20"
                  aria-invalid={Boolean(errors.excerpt)}
                  aria-describedby={
                    errors.excerpt ? 'post-excerpt-error' : undefined
                  }
                />
                {errors.excerpt && (
                  <p
                    id="post-excerpt-error"
                    role="alert"
                    className="text-sm text-destructive"
                  >
                    {errors.excerpt}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  )
}
