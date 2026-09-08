import { useEffect, useState } from 'react'

interface OtpCountdownProps {
  expiresInMinutes: number
  onResend: () => void
  isResending: boolean
}

export function OtpCountdown({
  expiresInMinutes,
  onResend,
  isResending,
}: OtpCountdownProps) {
  const [secondsLeft, setSecondsLeft] = useState(expiresInMinutes * 60)

  useEffect(() => {
    if (secondsLeft <= 0) return

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [secondsLeft])

  const minutes = Math.floor(secondsLeft / 60)
  const seconds = secondsLeft % 60
  const isExpired = secondsLeft <= 0

  if (isExpired) {
    return (
      <p className="text-center text-sm text-muted-foreground">
        Le code a expiré.{' '}
        <button
          type="button"
          onClick={onResend}
          disabled={isResending}
          className="font-semibold text-foreground underline-offset-4 transition hover:underline disabled:opacity-50"
        >
          {isResending ? 'Envoi en cours…' : 'Demander un nouveau code'}
        </button>
      </p>
    )
  }

  return (
    <p className="text-center text-sm text-muted-foreground">
      Code valide pendant{' '}
      <span className="font-medium text-foreground">
        {minutes}:{seconds.toString().padStart(2, '0')}
      </span>
    </p>
  )
}
