import { JiggleText } from "@/components/motion/JiggleText"
import { siteConfig } from "@/data/site-config"

export function Header() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 sm:px-10">
        <a
          href="#hero"
          className="pointer-events-auto inline-flex items-baseline gap-1 font-display text-xl font-bold leading-none tracking-[-0.04em] text-foreground transition-opacity hover:opacity-90"
        >
          <JiggleText
            text={siteConfig.artistName.split(" ")[0]}
            maxRotate={12}
            maxY={4}
            stagger={0.03}
          />
          <span className="text-foreground/40">.</span>
        </a>
        <span className="pointer-events-auto hidden font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground sm:block">
          Rio de Janeiro · MMXXVI
        </span>
      </div>
    </header>
  )
}
