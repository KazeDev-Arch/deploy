import { BookOpen, PenLine, ShieldCheck } from 'lucide-react'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

import { formatXAF, plans } from '#/data/home.ts'
import { cn } from '#/lib/utils.ts'

const reasons = [
  {
    icon: BookOpen,
    title: 'Tout le contenu',
    desc: 'Accès illimité aux articles, dossiers techniques et études de cas.',
  },
  {
    icon: ShieldCheck,
    title: 'Zéro distraction',
    desc: 'Aucune publicité, aucun bandeau. Juste le contenu.',
  },
  {
    icon: PenLine,
    title: 'Une rédaction indépendante',
    desc: 'Votre abonnement finance directement les auteurs.',
  },
]

export function Subscribe() {
  return (
    <section
      id="abonnement"
      className="scroll-mt-20 border-t border-border bg-muted/40"
    >
      <div className="page-wrap px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            S’abonner
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Soutenez une rédaction indépendante
          </h2>
          <p className="mt-4 text-muted-foreground">
            Sans publicité, sans paywall arbitraire. Des articles techniques,
            financés par leurs lecteurs.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-foreground text-background">
                <reason.icon className="size-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {reason.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-7',
                plan.featured
                  ? 'border-foreground bg-card shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]'
                  : 'border-border bg-card'
              )}
            >
              {plan.featured && (
                <Badge className="absolute -top-3 left-7">
                  Le plus avantageux
                </Badge>
              )}
              <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
              <p className="mt-5 flex items-baseline gap-1.5">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {formatXAF(plan.price)}
                </span>
                <span className="text-sm text-muted-foreground">
                  / {plan.period}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{plan.note}</p>
              <Button
                className="mt-7 w-full"
                variant={plan.featured ? 'default' : 'outline'}
              >
                Commencer
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-9 text-center text-sm text-muted-foreground">
          Paiement sécurisé via{' '}
          <span className="font-semibold text-foreground">K-Pay</span> — Mobile
          Money, carte bancaire, PayPal.
        </p>
      </div>
    </section>
  )
}
