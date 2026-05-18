const NAV_ITEMS = [
  { href: "#musica", label: "Musica" },
  { href: "#sobre", label: "Sobre" },
  { href: "#shows", label: "Shows" },
  { href: "#apoie", label: "Apoie" },
  { href: "#contato", label: "Contato" },
]

export function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border/80 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-6 sm:px-10">
        <a
          href="#hero"
          className="shrink-0 font-display text-xl tracking-[0.08em] text-foreground transition-colors hover:text-primary"
        >
          Cezar Dolphino
        </a>

        <nav
          aria-label="Navegacao principal"
          className="flex flex-1 justify-end gap-3 overflow-x-auto [scrollbar-width:none] sm:gap-5"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground sm:text-xs"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
