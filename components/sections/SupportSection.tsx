import { Heart, Sparkles } from "lucide-react"

import { Reveal } from "@/components/motion/Reveal"
import { SectionLabel } from "@/components/motion/SectionLabel"
import { PixCard } from "@/components/sections/PixCard"
import { StreamingLinks } from "@/components/sections/StreamingLinks"
import { siteConfig } from "@/data/site-config"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SupportSection() {
  const kofiUsername =
    process.env.NEXT_PUBLIC_KOFI_USERNAME ?? siteConfig.kofiUsername
  const kofiUrl = `https://ko-fi.com/${kofiUsername}`

  return (
    <section
      id="apoie"
      className="relative scroll-mt-24 overflow-hidden border-b border-border/60 bg-background"
    >
      <div className="pointer-events-none absolute right-0 top-0 -z-0 size-[40vw] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
        <SectionLabel index="05" label="Apoie" />

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight">
              Mantenha
              <span className="block italic text-primary">o quarto aceso.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="max-w-md font-serif text-base italic text-muted-foreground sm:text-lg">
              Cada apoio ajuda a manter novas gravações, ensaios e shows
              acontecendo. Escolha a forma que fizer mais sentido.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          <Reveal direction="left">
            <PixCard />
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-8 backdrop-blur transition-colors hover:border-primary/50">
              <div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex size-10 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Heart className="size-5" />
                  </span>
                  <div className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Ko-fi
                  </div>
                </div>
                <h3 className="mt-6 font-display text-3xl italic text-foreground sm:text-4xl">
                  Apoie com o valor que fizer sentido.
                </h3>
                <p className="mt-3 font-sans text-sm text-muted-foreground">
                  Deixe uma mensagem ou só um café — tudo conta.
                </p>
              </div>
              <a
                href={kofiUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants(),
                  "mt-8 h-12 w-fit gap-2 rounded-full px-7 text-sm uppercase tracking-[0.14em]",
                )}
              >
                <Sparkles className="size-4" />
                Apoiar no Ko-fi
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <StreamingLinks />
        </Reveal>
      </div>
    </section>
  )
}
