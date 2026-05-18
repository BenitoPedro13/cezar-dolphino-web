import type { Influence } from "@/lib/types"

export const influences: Influence[] = [
  { id: "joao-gilberto", name: "João Gilberto", category: "musica", note: "Silêncio e respiração" },
  { id: "liniker", name: "Liniker", category: "musica", note: "Calor brasileiro contemporâneo" },
  { id: "melly", name: "Melly", category: "musica", note: "Voz e presença de palco" },
  { id: "amy-winehouse", name: "Amy Winehouse", category: "musica", note: "Soul cru e confessional" },
  { id: "bacurau", name: "Bacurau", category: "cinema", note: "Luz quente e tensão popular" },
  { id: "criterion", name: "Criterion Collection", category: "cinema", note: "Editorial e grão de filme" },
  { id: "guimaraes-rosa", name: "Guimarães Rosa", category: "literatura", note: "Paisagem sonora do sertão" },
  { id: "clarice", name: "Clarice Lispector", category: "literatura", note: "Intimidade e instante" },
]

export const influenceCategories = [
  { key: "musica" as const, label: "Música" },
  { key: "cinema" as const, label: "Cinema" },
  { key: "literatura" as const, label: "Literatura" },
]
