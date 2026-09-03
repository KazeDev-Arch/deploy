import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/posts/$postId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/posts/$postId"!</div>
}
