import type { Show } from "@/lib/types"

export const shows: Show[] = [
  {
    id: "rio-set-2025",
    date: "2025-09-14",
    venue: "Sesc Copacabana",
    city: "Rio de Janeiro",
    state: "RJ",
    country: "Brasil",
    ticketUrl: "https://example.com/ingressos",
    status: "upcoming",
  },
  {
    id: "sp-out-2025",
    date: "2025-10-03",
    venue: "Casa de Francisca",
    city: "São Paulo",
    state: "SP",
    country: "Brasil",
    status: "tba",
  },
  {
    id: "rio-jun-2025",
    date: "2025-06-20",
    venue: "Audio Rebel",
    city: "Rio de Janeiro",
    state: "RJ",
    country: "Brasil",
    status: "past",
  },
]

export const upcomingShows = shows.filter(
  (show) => show.status === "upcoming" || show.status === "tba",
)
