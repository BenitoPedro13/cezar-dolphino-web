import type { Track } from "@/lib/types"

/**
 * Catalogo sincronizado com https://soundcloud.com/cezardolphino
 * (1 faixa publica no momento). Para novas faixas: publique no SC e rode
 * `pnpm sync:soundcloud`, ou adicione manualmente aqui.
 */
export const tracks: Track[] = [
  {
    id: "colors-black-pumas-dolphino-cover",
    title: "Colors (Black Pumas) — Dolphino (cover)",
    year: 2024,
    duration: 308,
    category: "cover",
    featured: true,
    coverArt: "/images/hero-poster.svg",
    audioSrc: "/audio/colors-cover.mp3",
    streamingLinks: {
      soundcloud:
        "https://soundcloud.com/cezardolphino/colors-black-pumas-dolphino-cover",
    },
  },
]

export const featuredTrack = tracks.find((track) => track.featured) ?? tracks[0]
