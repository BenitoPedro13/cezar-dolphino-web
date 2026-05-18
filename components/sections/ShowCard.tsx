"use client"

import { motion } from "motion/react"
import { ArrowUpRight, MapPin } from "lucide-react"

import type { Show } from "@/lib/types"
import { cn } from "@/lib/utils"

interface ShowCardProps {
  show: Show
  muted?: boolean
}

const STATUS_LABELS: Record<Show["status"], string> = {
  upcoming: "Confirmado",
  "sold-out": "Esgotado",
  tba: "Em breve",
  past: "Realizado",
}

export function ShowCard({ show, muted = false }: ShowCardProps) {
  const canBuyTickets =
    show.status === "upcoming" && Boolean(show.ticketUrl)

  const date = new Date(show.date)
  const day = date.toLocaleDateString("pt-BR", { day: "2-digit" })
  const month = date
    .toLocaleDateString("pt-BR", { month: "short" })
    .replace(".", "")
    .toUpperCase()
  const year = date.getFullYear()

  const Wrapper = canBuyTickets ? motion.a : motion.div
  const wrapperProps = canBuyTickets
    ? { href: show.ticketUrl, target: "_blank", rel: "noreferrer" }
    : {}

  return (
    <Wrapper
      {...wrapperProps}
      whileHover={canBuyTickets ? { backgroundColor: "rgba(255,255,255,0.04)" } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "group grid grid-cols-[80px_1fr_auto] items-center gap-4 border-b border-border/40 py-5 sm:grid-cols-[120px_180px_1fr_auto] sm:gap-8 sm:py-6",
        canBuyTickets && "cursor-pointer",
        muted && "opacity-60",
      )}
    >
      <div className="flex items-baseline gap-2 font-display sm:flex-col sm:items-start sm:gap-1">
        <span className="text-4xl font-bold leading-none tracking-[-0.04em] text-foreground sm:text-5xl">
          {day}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          {month} · {year}
        </span>
      </div>

      <div className="hidden sm:block">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-accent">
          {STATUS_LABELS[show.status]}
        </p>
      </div>

      <div className="min-w-0">
        <h3 className="truncate font-sans text-lg font-medium text-foreground sm:text-xl">
          {show.venue}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          <MapPin className="size-3" />
          {show.city}, {show.state} · {show.country}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {canBuyTickets ? (
          <span className="inline-flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground">
            <span className="hidden sm:inline">Tickets</span>
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background transition-all group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight className="size-3.5" />
            </span>
          </span>
        ) : (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {show.status === "sold-out" ? "Sem ingressos" : "Em breve"}
          </span>
        )}
      </div>
    </Wrapper>
  )
}
