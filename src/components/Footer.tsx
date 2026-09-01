const COLUMNS: { title: string; links: string[] }[] = [
  {
    title: 'Catégories',
    links: ['Ingénierie', 'DevOps', 'Design', 'Architecture', 'Data'],
  },
  {
    title: 'Le blog',
    links: ['À propos', 'La rédaction', 'Contribuer', 'Newsletter'],
  },
  {
    title: 'Légal',
    links: ['Conditions', 'Confidentialité', 'Mentions légales'],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/60">
      <div className="page-wrap grid gap-10 py-14 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2.5">
            <span className="grid size-6 place-items-center rounded-[3px] bg-foreground">
              <span className="h-1.5 w-1.5 rounded-[1px] bg-background" />
            </span>
            <span className="text-lg font-bold text-foreground">Deploy</span>
          </span>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Tech, design & ingénierie. Des articles indépendants, sans
            publicité, financés par leurs lecteurs.
          </p>
        </div>

        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {column.title}
            </h3>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-foreground/80 no-underline transition hover:text-foreground"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="page-wrap flex flex-col items-center justify-between gap-2 py-5 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} Deploy. Tous droits réservés.</p>
          <p>
            Paiements sécurisés via{' '}
            <span className="font-semibold text-foreground">K-Pay</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
