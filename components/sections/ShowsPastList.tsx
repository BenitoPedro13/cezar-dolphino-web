"use client"

import { ChevronDown } from "lucide-react"

import { ShowCard } from "@/components/sections/ShowCard"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import type { Show } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ShowsPastListProps {
  shows: Show[]
}

export function ShowsPastList({ shows }: ShowsPastListProps) {
  if (shows.length === 0) return null

  return (
    <div className="mt-12 border-t border-border/70 pt-10">
      <Collapsible>
        <CollapsibleTrigger
          className={cn(
            "group flex w-full items-center justify-between gap-4 py-2 text-left",
            "font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground",
            "transition-colors hover:text-foreground",
          )}
        >
          Shows anteriores ({shows.length})
          <ChevronDown className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-3">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} muted />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}
