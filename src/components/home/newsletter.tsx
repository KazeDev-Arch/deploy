import { Button } from '../ui/button'
import { Input } from '../ui/input'

export function Newsletter() {
  return (
    <section
      id="newsletter"
      className="page-wrap scroll-mt-20 px-4 pb-24 pt-4"
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-foreground px-6 py-14 text-center sm:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-background/60">
          La lettre du vendredi
        </p>
        <h2 className="mx-auto mt-4 max-w-2xl text-2xl font-bold tracking-tight text-background sm:text-3xl">
          Le meilleur de la semaine tech, dans votre boîte.
        </h2>
        <p className="mt-3 text-sm text-background/70">
          Gratuit. Chaque vendredi matin. Désinscription en un clic.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input
            type="email"
            required
            placeholder="votre@email.com"
            className="border-background/20 bg-background/10 text-background placeholder:text-background/50"
          />
          <Button type="submit" variant="secondary" className="sm:shrink-0">
            S’abonner
          </Button>
        </form>
      </div>
    </section>
  )
}
