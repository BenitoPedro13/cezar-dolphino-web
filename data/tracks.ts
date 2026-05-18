import type { Track } from "@/lib/types"

export const tracks: Track[] = [
  {
    id: "noturno",
    title: "Noturno",
    album: "Sessão ao Vivo",
    year: 2024,
    duration: 198,
    category: "ao-vivo",
    featured: true,
    coverArt: "/images/covers/noturno.jpg",
    audioSrc: "/audio/noturno.mp3",
    streamingLinks: {
      spotify: "https://open.spotify.com/track/noturno",
      youtube: "https://youtube.com/watch?v=noturno",
    },
  },
  {
    id: "quarto-escuro",
    title: "Quarto Escuro",
    year: 2023,
    duration: 214,
    category: "original",
    coverArt: "/images/covers/quarto-escuro.jpg",
    audioSrc: "/audio/quarto-escuro.mp3",
    streamingLinks: {
      spotify: "https://open.spotify.com/track/quarto-escuro",
    },
  },
  {
    id: "coracao-de-mel",
    title: "Coração de Mel",
    year: 2022,
    duration: 186,
    category: "cover",
    coverArt: "/images/covers/coracao-de-mel.jpg",
    audioSrc: "/audio/coracao-de-mel.mp3",
  },
]

export const featuredTrack = tracks.find((track) => track.featured) ?? tracks[0]
