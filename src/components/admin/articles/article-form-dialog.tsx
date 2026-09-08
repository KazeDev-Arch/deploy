import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '#/components/ui/tabs'
import { Textarea } from '#/components/ui/textarea'

import { useCreatePost, useUpdatePost } from '#/hooks/post.hooks'
import type { PostListItem } from '#/hooks/post.hooks'
import type { CreatePostInput } from '#/schemas/post'

type Status = 'DRAFT' | 'PUBLISHED'

interface PostFormValues {
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string
  postImages: string
  isPremium: boolean
  status: Status
}

const EMPTY_VALUES: PostFormValues = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  coverImage: '',
  postImages: '',
  isPremium: false,
  status: 'DRAFT',
}

function toFormValues(post: PostListItem | null): PostFormValues {
  if (!post) return EMPTY_VALUES
  return {
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt ?? '',
    coverImage: post.coverImage ?? '',
    postImages: post.postImages.join('\n'),
    isPremium: post.isPremium,
    status: post.status,
  }
}

interface ArticleFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: PostListItem | null
}

export function ArticleFormDialog({
  open,
  onOpenChange,
  post,
}: ArticleFormDialogProps) {
  const [values, setValues] = useState<PostFormValues>(() => toFormValues(post))

  const createMutation = useCreatePost()
  const updateMutation = useUpdatePost()

  const isEditing = post !== null
  const isPending = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (open) setValues(toFormValues(post))
  }, [open, post])

  function set<TKey extends keyof PostFormValues>(
    key: TKey,
    value: PostFormValues[TKey],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const payload: CreatePostInput = {
      title: values.title,
      slug: values.slug,
      content: values.content,
      excerpt: values.excerpt.trim() || undefined,
      coverImage: values.coverImage.trim() || undefined,
      postImages: values.postImages
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean),
      isPremium: values.isPremium,
      status: values.status,
    }

    if (isEditing) {
      updateMutation.mutate(
        { data: { id: post.id, ...payload } },
        { onSuccess: () => onOpenChange(false) },
      )
    } else {
      createMutation.mutate(
        { data: payload },
        { onSuccess: () => onOpenChange(false) },
      )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier l’article' : 'Nouvel article'}
          </DialogTitle>
          <DialogDescription>
            {isEditing
              ? 'Mettez à jour les champs de l’article.'
              : 'Rédigez un nouvel article au format Markdown.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="post-title">Titre</Label>
              <Input
                id="post-title"
                value={values.title}
                onChange={(e) => set('title', e.target.value)}
                placeholder="Titre de l’article"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="post-slug">Slug</Label>
              <Input
                id="post-slug"
                value={values.slug}
                onChange={(e) => set('slug', e.target.value)}
                placeholder="mon-article"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-content">Contenu</Label>
            <Tabs defaultValue="write">
              <TabsList>
                <TabsTrigger value="write">Rédiger</TabsTrigger>
                <TabsTrigger value="preview">Aperçu</TabsTrigger>
              </TabsList>
              <TabsContent value="write">
                <Textarea
                  id="post-content"
                  value={values.content}
                  onChange={(e) => set('content', e.target.value)}
                  placeholder="Écrivez votre article en Markdown…"
                  className="min-h-64 font-mono text-sm"
                  required
                />
              </TabsContent>
              <TabsContent value="preview">
                <div className="prose prose-zinc min-h-64 max-w-none rounded-md border px-4 py-3 dark:prose-invert">
                  {values.content ? (
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {values.content}
                    </ReactMarkdown>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Rien à prévisualiser.
                    </p>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-excerpt">Extrait</Label>
            <Textarea
              id="post-excerpt"
              value={values.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              placeholder="Résumé court affiché dans les listes (optionnel)"
              className="min-h-20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-cover">Image de couverture (URL)</Label>
            <Input
              id="post-cover"
              value={values.coverImage}
              onChange={(e) => set('coverImage', e.target.value)}
              placeholder="https://… (optionnel)"
              type="url"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="post-images">Images (une URL par ligne)</Label>
            <Textarea
              id="post-images"
              value={values.postImages}
              onChange={(e) => set('postImages', e.target.value)}
              placeholder="https://…"
              className="min-h-20"
            />
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="post-premium"
                checked={values.isPremium}
                onCheckedChange={(checked) => set('isPremium', checked)}
              />
              <Label htmlFor="post-premium">Article premium</Label>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="post-status">Statut</Label>
              <Select
                value={values.status}
                onValueChange={(value) => set('status', value as Status)}
              >
                <SelectTrigger id="post-status" className="w-36">
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
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? 'Enregistrement…'
                : isEditing
                  ? 'Enregistrer'
                  : 'Créer'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
