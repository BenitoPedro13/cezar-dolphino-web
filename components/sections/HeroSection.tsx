import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="scroll-mt-24 border-b border-border/70 bg-background"
    >
      <div className="mx-auto flex min-h-[70svh] w-full max-w-6xl flex-col justify-center px-6 py-24 sm:px-10">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Chunk 01 - Esqueleto
        </p>
        <h1 className="mt-4 font-display text-5xl italic tracking-wide sm:text-7xl">
          Cezar Dolphino
        </h1>
        <p className="mt-4 max-w-xl font-sans text-sm text-muted-foreground">
          MPB · Soul · Jazz — Rio de Janeiro
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#musica" className={cn(buttonVariants())}>
            Ouca agora
          </a>
          <a href="#shows" className={cn(buttonVariants({ variant: "ghost" }))}>
            Proximos shows
          </a>
        </div>
      </div>
    </section>
  )
}
