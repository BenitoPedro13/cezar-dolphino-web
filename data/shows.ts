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
    id: "bh-nov-2025",
    date: "2025-11-22",
    venue: "Praça da Liberdade",
    city: "Belo Horizonte",
    state: "MG",
    country: "Brasil",
    status: "sold-out",
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
  {
    id: "rio-abr-2025",
    date: "2025-04-12",
    venue: "Teatro Rival Petrobras",
    city: "Rio de Janeiro",
    state: "RJ",
    country: "Brasil",
    status: "past",
  },
]

function sortByDateAsc(list: Show[]) {
  return [...list].sort((a, b) => a.date.localeCompare(b.date))
}

function sortByDateDesc(list: Show[]) {
  return [...list].sort((a, b) => b.date.localeCompare(a.date))
}

export const upcomingShows = sortByDateAsc(
  shows.filter(
    (show) =>
      show.status === "upcoming" ||
      show.status === "tba" ||
      show.status === "sold-out",
  ),
)

export const pastShows = sortByDateDesc(
  shows.filter((show) => show.status === "past"),
)
