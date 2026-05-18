import { Heart, Sparkles } from "lucide-react"

import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal } from "@/components/motion/Reveal"
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
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40">
        <div className="grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (Support
                <br />
                the artist)
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <h2 className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-[-0.05em]">
              <JiggleText
                text="Keep"
                className="font-bold text-foreground"
                maxRotate={10}
              />
              <JiggleText
                text="the room"
                className="font-light text-foreground/40"
                maxRotate={-8}
                stagger={0.045}
              />
              <JiggleText
                text="alive."
                className="font-bold text-foreground"
                maxRotate={9}
              />
            </h2>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2">
          <Reveal direction="left">
            <PixCard />
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-border bg-card/40 p-8">
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background text-foreground">
                    <Heart className="size-4" />
                  </span>
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                    (02) Ko-fi
                  </span>
                </div>
                <h3 className="mt-10 font-display text-3xl font-medium leading-[0.95] tracking-[-0.02em] text-foreground sm:text-4xl">
                  Apoie com o valor
                  <span className="block text-foreground/40">
                    que fizer sentido.
                  </span>
                </h3>
                <p className="mt-4 font-sans text-sm text-muted-foreground">
                  Deixe uma mensagem ou só um café — tudo conta.
                </p>
              </div>
              <a
                href={kofiUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants(),
                  "mt-8 h-11 w-fit gap-2 rounded-full bg-foreground px-6 font-mono text-[0.65rem] uppercase tracking-[0.18em] text-background hover:bg-foreground/90",
                )}
              >
                <Sparkles className="size-3.5" />
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
