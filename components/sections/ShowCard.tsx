import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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

  return (
    <Card
      className={cn(
        "border-border/80 bg-card/60",
        muted && "opacity-75 saturate-[0.85]",
      )}
    >
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="font-display text-2xl italic tracking-wide">
              {formatShowDate(show.date)}
            </CardTitle>
            <p className="mt-1 font-sans text-sm font-medium text-foreground">
              {show.venue}
            </p>
          </div>
          <Badge variant={status.variant}>{status.label}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="font-sans text-sm text-muted-foreground">
          {show.city}, {show.state} · {show.country}
        </p>
      </CardContent>
      {!muted && show.status !== "past" && (
        <CardFooter className="gap-3">
          {canBuyTickets ? (
            <a
              href={show.ticketUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants()}
            >
              Comprar ingressos
            </a>
          ) : (
            <span className="font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {show.status === "sold-out" ? "Sem ingressos" : "Em breve"}
            </span>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
