import { useMemo } from 'react'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'

import { cn } from '#/lib/utils'

/**
 * Éditeur riche Quill (thème Snow) habillé avec les tokens du design system.
 * Wrapper purement présentation : la valeur (HTML) et son changement sont
 * portés par le parent via `value` / `onChange`.
 */
const POST_EDITOR_FORMATS = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'code-block',
  'align',
  'clean',
]

const POST_EDITOR_TOOLBAR: Array<Array<string | object>> = [
  [{ header: [2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ['link', 'image'],
  [{ align: [] }],
  ['clean'],
]

interface PostEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  readOnly?: boolean
  'aria-invalid'?: boolean
  'aria-describedby'?: string
}

export function PostEditor({
  value,
  onChange,
  placeholder,
  className,
  readOnly,
  ...ariaProps
}: PostEditorProps) {
  const modules = useMemo(() => ({ toolbar: POST_EDITOR_TOOLBAR }), [])

  return (
    <div className={cn('post-editor', className)}>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={POST_EDITOR_FORMATS}
        placeholder={placeholder}
        readOnly={readOnly}
        {...ariaProps}
      />
    </div>
  )
}
