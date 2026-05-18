import { Heart } from "lucide-react"

import { PixCard } from "@/components/sections/PixCard"
import { StreamingLinks } from "@/components/sections/StreamingLinks"
import { siteConfig } from "@/data/site-config"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function SupportSection() {
  const kofiUrl = `https://ko-fi.com/${siteConfig.kofiUsername}`

  return (
    <section
      id="apoie"
      className="scroll-mt-24 border-b border-border/70 bg-card/40"
    >
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Apoie
        </p>
        <h2 className="mt-3 font-display text-4xl">Apoie o artista</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          Cada apoio ajuda a manter novas gravações, ensaios e shows acontecendo.
          Escolha a forma que fizer mais sentido para você.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <PixCard />
          <Card className="border-border/80 bg-card/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-2xl italic">
                <Heart className="size-5 text-primary" />
                Ko-fi
              </CardTitle>
              <CardDescription>
                Apoie com qualquer valor e deixe uma mensagem.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={kofiUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants(), "w-full sm:w-auto")}
              >
                Apoiar no Ko-fi
              </a>
            </CardContent>
          </Card>
        </div>

        <StreamingLinks />
      </div>
    </section>
  )
}
