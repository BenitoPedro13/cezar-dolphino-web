"use client"

import { ChevronDown, Download } from "lucide-react"

import { siteConfig } from "@/data/site-config"
import { buttonVariants } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"

export function AboutExtendedBio() {
  return (
    <div className="mt-12 border-t border-border/70 pt-10">
      <Collapsible>
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center justify-between gap-4 py-2 text-left",
            "font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground",
            "transition-colors hover:text-foreground",
            "data-panel-open:text-foreground",
          )}
        >
          Biografia completa
          <ChevronDown className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden data-ending-style:animate-out data-ending-style:fade-out data-starting-style:animate-in data-starting-style:fade-in">
          <div className="space-y-6 pt-2">
            {siteConfig.longBio.split("\n\n").map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-serif text-sm leading-relaxed text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}
            {siteConfig.pressKitUrl ? (
              <a
                href={siteConfig.pressKitUrl}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "outline" }), "gap-2")}
              >
                <Download className="size-4" />
                Baixar press kit
              </a>
            ) : (
              <p className="font-sans text-xs text-muted-foreground">
                Press kit disponível em breve.
              </p>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
