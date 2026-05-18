"use client"

import { motion } from "motion/react"
import { ArrowUpRight, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import type { Show } from "@/lib/types"
import { cn, formatShowDate } from "@/lib/utils"

const STATUS_CONFIG: Record<
  Show["status"],
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  upcoming: { label: "Confirmado", variant: "default" },
  "sold-out": { label: "Esgotado", variant: "destructive" },
  tba: { label: "Em breve", variant: "secondary" },
  past: { label: "Realizado", variant: "outline" },
}

interface ShowCardProps {
  show: Show
  muted?: boolean
}

export function ShowCard({ show, muted = false }: ShowCardProps) {
  const status = STATUS_CONFIG[show.status]
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
      whileHover={canBuyTickets ? { x: 4 } : undefined}
      transition={{ duration: 0.3 }}
      className={cn(
        "group flex flex-col gap-6 rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur transition-all sm:flex-row sm:items-center sm:gap-10 sm:p-8",
        canBuyTickets &&
          "cursor-pointer hover:border-primary/60 hover:bg-card/60",
        muted && "opacity-70 saturate-[0.8]",
      )}
    >
      <div className="flex shrink-0 items-baseline gap-4 sm:flex-col sm:items-start sm:gap-1">
        <span className="font-display text-6xl leading-none text-foreground sm:text-7xl">
          {day}
        </span>
        <div className="font-sans text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="text-primary">{month}</span> · {year}
        </div>
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={status.variant} className="rounded-full">
            {status.label}
          </Badge>
          <span className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
            {formatShowDate(show.date)}
          </span>
        </div>
        <h3 className="font-display text-2xl italic text-foreground sm:text-3xl">
          {show.venue}
        </h3>
        <p className="flex items-center gap-1.5 font-sans text-sm text-muted-foreground">
          <MapPin className="size-3.5" />
          {show.city}, {show.state} · {show.country}
        </p>
      </div>

      {!muted && show.status !== "past" && (
        <div className="shrink-0">
          {canBuyTickets ? (
            <span className="inline-flex items-center gap-2 font-sans text-sm uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-primary">
              Ingressos
              <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-background transition-transform group-hover:scale-110 group-hover:border-primary">
                <ArrowUpRight className="size-4" />
              </span>
            </span>
          ) : (
            <span className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {show.status === "sold-out" ? "Sem ingressos" : "Em breve"}
            </span>
          )}
        </div>
      )}
    </Wrapper>
  )
}
