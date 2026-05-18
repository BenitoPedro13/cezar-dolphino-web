export interface Track {
  id: string
  title: string
  album?: string
  year: number
  duration: number
  category: "original" | "cover" | "ao-vivo"
  coverArt: string
  audioSrc: string
  featured?: boolean
  streamingLinks?: {
    soundcloud?: string
    spotify?: string
    youtube?: string
    apple?: string
    deezer?: string
  }
}

export interface Show {
  id: string
  date: string
  venue: string
  city: string
  state: string
  country: string
  ticketUrl?: string
  status: "upcoming" | "sold-out" | "past" | "tba"
}

export interface Influence {
  id: string
  name: string
  category: "musica" | "cinema" | "literatura"
  note?: string
}

export interface SiteConfig {
  artistName: string
  tagline: string
  shortBio: string
  longBio: string
  pullQuote: string
  pressKitUrl?: string
  portraitImage: string
  pixKey: string
  kofiUsername: string
  contactEmail: string
  social: {
    soundcloud?: string
    instagram?: string
    youtube?: string
    spotify?: string
    tiktok?: string
    appleMusic?: string
  }
}
