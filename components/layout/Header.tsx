"use client"

import { motion, useScroll, useTransform } from "motion/react"

import { siteConfig } from "@/data/site-config"

const NAV_ITEMS = [
  { href: "#musica", label: "Música", index: "01" },
  { href: "#sobre", label: "Sobre", index: "02" },
  { href: "#shows", label: "Shows", index: "04" },
  { href: "#apoie", label: "Apoie", index: "05" },
  { href: "#contato", label: "Contato", index: "07" },
]

export function Header() {
  const { scrollY } = useScroll()
  const headerOpacity = useTransform(scrollY, [0, 80], [0, 1])
  const headerBorder = useTransform(
    scrollY,
    [0, 80],
    ["rgba(0,0,0,0)", "rgba(255,255,255,0.08)"],
  )

  return (
    <motion.header
      style={{ borderBottomColor: headerBorder }}
      className="fixed inset-x-0 top-0 z-50 border-b"
    >
      <motion.div
        style={{ opacity: headerOpacity }}
        className="absolute inset-0 bg-background/80 backdrop-blur-md"
      />
      <div className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-6 sm:h-20 sm:px-10">
        <a
          href="#hero"
          className="group flex shrink-0 items-center gap-2 font-display text-base italic tracking-[0.04em] text-foreground transition-colors hover:text-primary sm:text-lg"
        >
          <span className="inline-flex size-7 items-center justify-center rounded-full border border-border/60 text-[0.65rem] uppercase tracking-[0.18em] text-primary transition-colors group-hover:border-primary">
            CD
          </span>
          {siteConfig.artistName}
        </a>

        <nav
          aria-label="Navegação principal"
          className="hidden flex-1 justify-end gap-1 md:flex"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative flex items-center gap-1.5 rounded-full px-3 py-2 font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="text-[0.6rem] text-primary/70 transition-colors group-hover:text-primary">
                {item.index}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <nav
          aria-label="Navegação principal (compacta)"
          className="flex flex-1 justify-end gap-3 overflow-x-auto [scrollbar-width:none] md:hidden"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="shrink-0 font-sans text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contato"
          className="hidden h-10 shrink-0 items-center gap-2 rounded-full bg-primary px-5 font-sans text-xs uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90 md:inline-flex"
        >
          Conversar
        </a>
      </div>
    </motion.header>
  )
}
