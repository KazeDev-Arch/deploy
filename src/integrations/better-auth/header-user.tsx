import { authClient } from '#/lib/auth-client'
import { Link } from '@tanstack/react-router'

export default function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession()

  if (isPending) {
    return (
      <div className="h-8 w-8 dark:bg-neutral-800 animate-pulse" />
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2">
        {session.user.image ? (
          <img src={session.user.image} alt="" className="h-8 w-8" />
        ) : (
          <div className="h-8 w-8 dark:bg-neutral-800 flex items-center justify-center">
            <span className="text-xs font-medium dark:text-neutral-400">
              {session.user.name.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        )}
        <button
          onClick={() => {
            void authClient.signOut()
          }}
          className="flex-1 h-9 px-4 text-sm font-medium dark:bg-neutral-900 text-neutral-900 border dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
        >
          Sign out
        </button>
      </div>
    )
  }

  return (
    <Link
      to="/demo/better-auth"
      className="h-9 px-4 text-sm font-medium dark:bg-neutral-900 text-neutral-900 border border-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors inline-flex items-center"
    >
      Sign in
    </Link>
  )
}
