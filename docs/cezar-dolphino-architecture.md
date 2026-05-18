# Cezar Dolphino — System Architecture Document
**Version 2.0 | Updated: Next.js + Shadcn/ui + Zustand**

---

## 1. Architecture Philosophy

Three principles guide every decision in this system:

- **React Server Components by default** — Next.js App Router renders everything on the server unless it explicitly needs the browser. Static sections (Hero, About, Shows) ship as zero-JS HTML. Only the music player and forms are client components. This gives us the performance of a static site with the ecosystem of a full React app.
- **No backend, no ops** — every dynamic concern (forms, payments, analytics) is delegated to a best-in-class third-party service. No server to maintain, no database to secure, no infra to wake up at 3am for.
- **Content as typed data** — all content (tracks, shows, bio) lives in structured local TypeScript files in Phase 1, and migrates to a headless CMS in Phase 2 without touching a single component.

---

## 2. High-Level System Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│                         BROWSER (Client)                         │
│                                                                  │
│  ┌─────────────────┐  ┌──────────────────┐  ┌────────────────┐  │
│  │  Server-rendered │  │  Client          │  │  Shadcn/ui     │  │
│  │  HTML (RSC)      │  │  Components      │  │  Components    │  │
│  │  Hero, About,    │  │  MusicPlayer,    │  │  Button, Card, │  │
│  │  Shows, Footer   │  │  ContactForm     │  │  Slider, etc.  │  │
│  └─────────────────┘  └──────────────────┘  └────────────────┘  │
└──────────────────────────────┬───────────────────────────────────┘
                               │ HTTPS
┌──────────────────────────────▼───────────────────────────────────┐
│                        VERCEL CDN / EDGE                         │
│                                                                  │
│   Next.js App Router served via Vercel's global edge network     │
│   next/image optimization built-in (WebP/AVIF auto-conversion)  │
│   Environment variables stored securely in Vercel dashboard      │
└──────────────────────────────┬───────────────────────────────────┘
                               │ Build & Deploy
┌──────────────────────────────▼───────────────────────────────────┐
│                       GITHUB REPOSITORY                          │
│                                                                  │
│   main → Production deploy  (cezardolphino.com)                  │
│   dev  → Preview deploy     (*.vercel.app — unique per PR)       │
└──────────────────────────────────────────────────────────────────┘
                               │
          ┌────────────────────┼─────────────────────┐
          │                    │                     │
┌─────────▼──────┐  ┌──────────▼──────┐  ┌──────────▼──────┐
│   FORMSPREE    │  │    KO-FI        │  │   PLAUSIBLE     │
│  Contact form  │  │  Donations +    │  │  Analytics      │
│  → Cezar email │  │  Merch (Ph. 2)  │  │  (LGPD-safe)    │
└────────────────┘  └─────────────────┘  └─────────────────┘
```

---

## 3. Frontend Architecture

### 3.1 Framework: Next.js 14 App Router

Next.js App Router flips the default: every component is a React Server Component (RSC) unless you explicitly opt into the client with `"use client"`. For this site, that means the heavy lifting — page HTML, SEO metadata, data fetching — happens at build time on the server. The browser only runs JavaScript for the music player and the contact form.

```
src/
├── app/
│   ├── layout.tsx            ← Root layout: fonts, Toaster, player slot
│   ├── page.tsx              ← Home: assembles all sections (all RSC)
│   ├── globals.css           ← Shadcn CSS vars overridden with brand tokens
│   │
│   └── (routes — Phase 2)
│       ├── musica/page.tsx
│       ├── shows/page.tsx
│       ├── sobre/page.tsx
│       ├── apoie/page.tsx
│       └── contato/page.tsx
│
├── components/
│   │
│   ├── ui/                   ← Shadcn components (owned source, edit freely)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── slider.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── input.tsx
│   │   ├── textarea.tsx
│   │   ├── select.tsx
│   │   ├── form.tsx
│   │   ├── collapsible.tsx
│   │   ├── alert.tsx
│   │   ├── separator.tsx
│   │   └── sonner.tsx
│   │
│   ├── sections/             ← Page sections (React Server Components)
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Influences.tsx
│   │   ├── Shows.tsx
│   │   ├── Support.tsx
│   │   └── Contact.tsx
│   │
│   ├── player/               ← Music player (Client Components — "use client")
│   │   ├── PlayerBar.tsx     ← Persistent bottom bar
│   │   ├── TrackGrid.tsx     ← Discography grid with filter tabs
│   │   ├── TrackCard.tsx     ← Individual track card
│   │   └── PlayerControls.tsx← Play/Pause/Skip buttons
│   │
│   └── layout/
│       ├── Header.tsx        ← Navigation (RSC — no JS needed)
│       └── Footer.tsx
│
├── lib/
│   ├── player-store.ts       ← Zustand store: global audio state
│   ├── howler-engine.ts      ← Howler.js wrapper: audio lifecycle
│   ├── types.ts              ← Track, Show TypeScript interfaces
│   └── utils.ts              ← formatDuration, formatShowDate helpers
│
├── data/                     ← Phase 1: all content as typed TS/JSON
│   ├── tracks.ts
│   ├── shows.ts
│   └── site-config.ts        ← Artist name, bio, social links, PIX key
│
└── public/
    ├── audio/                ← .mp3 files (Phase 1 only)
    ├── images/               ← Fallback images (Next.js also handles /assets)
    ├── og-image.jpg          ← Open Graph share image
    ├── favicon.ico
    └── robots.txt
```

### 3.2 Rendering Strategy

| Component | Directive | Strategy | Reason |
|---|---|---|---|
| `Hero.tsx` | RSC (default) | Static at build | Never changes, must be instant |
| `About.tsx` | RSC (default) | Static at build | Content rarely changes |
| `Shows.tsx` | RSC (default) | Static + redeploy | Updated when Cezar adds shows |
| `PlayerBar.tsx` | `"use client"` | Client-side | Needs browser audio APIs + Zustand |
| `TrackGrid.tsx` | `"use client"` | Client-side | Tab filter interaction + click handlers |
| `Contact.tsx` wrapper | RSC (default) | Static | Shell is static |
| `ContactForm.tsx` | `"use client"` | Client-side | react-hook-form + fetch POST |
| `Header.tsx` | RSC (default) | Static | Pure anchor links, no JS |
| Plausible script | `<Script>` (next/script) | `afterInteractive` | Never blocks render |

**Key rule:** If it doesn't need `onClick`, `useState`, or browser APIs — it's RSC. If it does — it's the smallest possible client component.

---

## 4. State Management

The app has exactly one piece of global state: **what is playing in the audio player.** Everything else is either server-rendered or local React state inside its component.

### 4.1 Zustand Player Store

```typescript
// lib/player-store.ts
import { create } from 'zustand'
import type { Track } from './types'

interface PlayerState {
  // Data
  currentTrack: Track | null
  queue: Track[]
  queueIndex: number

  // Playback state
  isPlaying: boolean
  progress: number        // 0–1 float, updated on Howler seek tick
  duration: number        // seconds, set when track loads
  volume: number          // 0–1 float

  // Actions
  loadTrack: (track: Track, queue?: Track[]) => void
  togglePlay: () => void
  seek: (progress: number) => void
  setVolume: (volume: number) => void
  playNext: () => void
  playPrev: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  queueIndex: -1,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: 0.8,

  loadTrack: (track, queue) => {
    const resolvedQueue = queue ?? get().queue
    set({
      currentTrack: track,
      queue: resolvedQueue,
      queueIndex: resolvedQueue.findIndex(t => t.id === track.id),
    })
    // Howler engine reacts to currentTrack change via a useEffect in PlayerBar
  },

  togglePlay: () => {
    // Calls howlerEngine.togglePlay() — see Section 5
    set(state => ({ isPlaying: !state.isPlaying }))
  },

  seek: (progress) => {
    set({ progress })
    // Calls howlerEngine.seek(progress * duration)
  },

  setVolume: (volume) => {
    set({ volume })
    // Calls howlerEngine.setVolume(volume)
  },

  playNext: () => {
    const { queue, queueIndex } = get()
    const next = queue[queueIndex + 1]
    if (next) get().loadTrack(next, queue)
  },

  playPrev: () => {
    const { queue, queueIndex } = get()
    const prev = queue[queueIndex - 1]
    if (prev) get().loadTrack(prev, queue)
  },
}))
```

Any client component anywhere in the tree calls `usePlayerStore()` to read or write. The `PlayerBar` at the root layout and the `TrackGrid` deep in the page stay in sync automatically — no prop drilling, no Context, no Redux.

### 4.2 Data Schemas

```typescript
// lib/types.ts

export interface Track {
  id: string                    // "noturno-ao-vivo"
  title: string                 // "Noturno (Ao Vivo)"
  album?: string
  year: number
  duration: number              // seconds
  category: 'original' | 'cover' | 'ao-vivo'
  coverArt: string              // "/images/covers/noturno.jpg"
  audioSrc: string              // "/audio/noturno.mp3" OR Cloudflare R2 URL
  featured?: boolean            // pins to top of TrackGrid
  streamingLinks?: {
    spotify?: string
    youtube?: string
    apple?: string
    deezer?: string
  }
}

export interface Show {
  id: string
  date: string                  // ISO 8601: "2025-09-14"
  venue: string
  city: string
  state: string
  country: string
  ticketUrl?: string
  status: 'upcoming' | 'sold-out' | 'past' | 'tba'
}

export interface SiteConfig {
  artistName: string
  tagline: string
  shortBio: string
  pixKey: string
  kofiUsername: string
  social: {
    instagram?: string
    youtube?: string
    spotify?: string
    tiktok?: string
    appleMusic?: string
  }
}
```

---

## 5. Audio Engine

### 5.1 Howler.js Wrapper

Howler is kept in a singleton module outside of React. The `PlayerBar` component's `useEffect` watches the Zustand store and calls the engine imperatively. This avoids Howler being recreated on re-renders.

```typescript
// lib/howler-engine.ts
import { Howl } from 'howler'
import { usePlayerStore } from './player-store'

let howl: Howl | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null

export const howlerEngine = {
  load(src: string, onEnd: () => void) {
    if (howl) {
      howl.unload()
      if (progressInterval) clearInterval(progressInterval)
    }

    howl = new Howl({
      src: [src],
      html5: true,            // streams instead of buffering entire file
      onload() {
        usePlayerStore.setState({ duration: howl!.duration() })
      },
      onplay() {
        usePlayerStore.setState({ isPlaying: true })
        progressInterval = setInterval(() => {
          if (!howl) return
          const progress = howl.seek() / howl.duration()
          usePlayerStore.setState({ progress })
        }, 500)
      },
      onpause() {
        usePlayerStore.setState({ isPlaying: false })
        if (progressInterval) clearInterval(progressInterval)
      },
      onend() {
        if (progressInterval) clearInterval(progressInterval)
        onEnd()
      },
    })

    howl.play()
  },

  togglePlay() {
    if (!howl) return
    howl.playing() ? howl.pause() : howl.play()
  },

  seek(seconds: number) {
    howl?.seek(seconds)
  },

  setVolume(volume: number) {
    howl?.volume(volume)
  },
}
```

### 5.2 PlayerBar: Connecting Store to Engine

```typescript
// components/player/PlayerBar.tsx
'use client'

import { useEffect } from 'react'
import { usePlayerStore } from '@/lib/player-store'
import { howlerEngine } from '@/lib/howler-engine'
import { Slider } from '@/components/ui/slider'
// ... other imports

export function PlayerBar() {
  const { currentTrack, isPlaying, progress, volume, playNext } = usePlayerStore()

  // When currentTrack changes → load it in Howler
  useEffect(() => {
    if (currentTrack) {
      howlerEngine.load(currentTrack.audioSrc, playNext)
    }
  }, [currentTrack])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border px-4 py-3">
      {/* Track info, controls, Shadcn Slider for progress and volume */}
    </div>
  )
}
```

### 5.3 Audio Source Strategy

```
Phase 1 — Vercel Static Hosting
────────────────────────────────
Files in /public/audio/ served directly by Vercel's CDN.
Free tier: 100GB bandwidth/month.
At ~5MB/track, supports ~20,000 full plays/month.
More than enough for a growing artist.

Phase 2 — Cloudflare R2
────────────────────────
Zero egress cost. $0.015/GB storage.
S3-compatible. Works with any S3 upload tool.
Migration: update audioSrc strings in data/tracks.ts.
No component changes required.
```

---

## 6. Shadcn/ui Integration

### 6.1 Brand Token Override

The entire Shadcn theme is controlled by CSS variables in `globals.css`. Setting these once makes every component brand-correct automatically.

```css
/* app/globals.css */
@layer base {
  :root {
    --background: 25 12% 9%;           /* #1A1612 Carvão */
    --foreground: 35 47% 88%;          /* #F0E6D3 Creme */

    --card: 25 18% 13%;                /* #2C2218 Tabaco */
    --card-foreground: 35 47% 88%;

    --primary: 33 67% 50%;             /* #D4882A Âmbar */
    --primary-foreground: 25 12% 9%;

    --secondary: 20 56% 40%;           /* #A0522D Terracota */
    --secondary-foreground: 35 47% 88%;

    --muted: 25 18% 13%;
    --muted-foreground: 27 13% 49%;    /* #8C7B6B Cinza Quente */

    --border: 22 32% 18%;              /* #3D2E1E Borda Quente */
    --input: 22 32% 18%;
    --ring: 33 67% 50%;               /* Âmbar for focus rings */

    --radius: 0.25rem;                 /* Sharp, refined — not pill-shaped */
  }
}

/* Font assignment */
@layer base {
  body {
    font-family: var(--font-lora), Georgia, serif;
  }
  .font-display {
    font-family: var(--font-cormorant), Georgia, serif;
  }
  .font-ui {
    font-family: var(--font-raleway), system-ui, sans-serif;
  }
}
```

### 6.2 Tailwind Config

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-raleway)', 'system-ui'],
        serif: ['var(--font-lora)', 'Georgia'],
        display: ['var(--font-cormorant)', 'Georgia'],
      },
      colors: {
        // Brand aliases on top of Shadcn's semantic tokens
        carvao: '#1A1612',
        tabaco: '#2C2218',
        ambar: '#D4882A',
        terracota: '#A0522D',
        creme: '#F0E6D3',
        'cinza-quente': '#8C7B6B',
      },
      backgroundImage: {
        'grain': "url('/images/grain.png')",
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
```

### 6.3 Shadcn Init Command

```bash
# Initial setup — run once
npx shadcn@latest init

# Install components as needed
npx shadcn@latest add button card slider tabs badge
npx shadcn@latest add input textarea select form
npx shadcn@latest add collapsible alert separator sonner
```

Each `add` drops the component source into `src/components/ui/`. It is yours to edit — these are not node_modules.

---

## 7. Content Layer

### 7.1 Phase 1 — TypeScript Data Files

Content lives in `src/data/` as typed TypeScript objects. The build reads them at compile time — zero runtime cost, full type safety.

```typescript
// data/tracks.ts
import type { Track } from '@/lib/types'

export const tracks: Track[] = [
  {
    id: 'noturno',
    title: 'Noturno',
    year: 2024,
    duration: 198,
    category: 'original',
    featured: true,
    coverArt: '/images/covers/noturno.jpg',
    audioSrc: '/audio/noturno.mp3',
    streamingLinks: {
      spotify: 'https://open.spotify.com/...',
      youtube: 'https://youtube.com/...',
    },
  },
  // ...
]
```

**To update content:** edit the TypeScript file, commit, push. Vercel redeploys in ~30 seconds.

### 7.2 Phase 2 — Sanity CMS

```
┌──────────────────┐      ┌──────────────────────┐
│  Sanity Studio   │      │  Sanity Content Lake  │
│  (admin panel at │─────▶│  (hosted DB, GROQ     │
│  studio.cezar..) │      │   queryable API)      │
└──────────────────┘      └──────────┬────────────┘
                                     │ fetch() at build time
                                     ▼
                           ┌──────────────────────┐
                           │   Next.js Build       │
                           │   (generateStatic     │
                           │    Params + fetch)    │
                           └──────────┬────────────┘
                                      │
                                   Vercel

Sanity Webhook → Vercel Deploy Hook URL
(Cezar publishes a show in Studio → site rebuilds in ~60s)
```

**Migration effort from Phase 1 to Phase 2:** replace the `import` statements in data files with `fetch()` calls to Sanity's CDN API. Component code is untouched because the TypeScript interfaces remain identical.

---

## 8. Third-Party Integrations

### 8.1 Formspree — Contact Form

```
User submits form (react-hook-form validates first)
      │
      ▼  fetch POST application/json
      https://formspree.io/f/{FORM_ID}
      │
      ▼  Email delivered
      cezar@... inbox

Client receives 200 → Sonner toast: "Mensagem enviada!"
Client receives 4xx → Sonner toast: "Algo deu errado. Tente novamente."
```

Key details: free tier handles 50 submissions/month, CAPTCHA and spam filtering built-in, zero backend needed.

### 8.2 Ko-fi — Donations

```typescript
// Recommended: custom button → new tab (no iframe quirks)
<Button
  className="bg-primary text-primary-foreground"
  onClick={() => window.open(`https://ko-fi.com/${siteConfig.kofiUsername}`, '_blank')}
>
  Apoiar no Ko-fi
</Button>
```

### 8.3 Plausible — Analytics

```typescript
// app/layout.tsx
import Script from 'next/script'

<Script
  defer
  data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
  src="https://plausible.io/js/script.js"
  strategy="afterInteractive"   // never blocks page render
/>
```

LGPD-compliant: no cookies, no personal data, no consent banner required.

### 8.4 PIX — Copy to Clipboard

```typescript
// Inside Support section client component
const copyPix = async () => {
  await navigator.clipboard.writeText(siteConfig.pixKey)
  toast.success('Chave PIX copiada!', {
    description: 'Cole no seu app de pagamentos.',
  })
}
```

---

## 9. Performance Targets

| Metric | Target | Strategy |
|---|---|---|
| Lighthouse Performance | ≥ 92 | RSC for static sections, minimal client JS |
| First Contentful Paint | < 1.4s | Static generation, Vercel edge CDN |
| Largest Contentful Paint | < 2.5s | `next/image` with `priority` on hero, WebP/AVIF |
| Total Blocking Time | < 100ms | Client components only where needed |
| Cumulative Layout Shift | < 0.05 | Explicit dimensions on all images |
| Audio First Byte | < 300ms | Vercel CDN edge serves static audio assets |

> Note: Next.js ships slightly more JS than Astro for the React runtime (~45KB gzipped). The trade-off is worth it given team familiarity and Shadcn ecosystem access.

---

## 10. CI/CD Pipeline

```
git push origin dev
        │
        ▼
┌───────────────────┐
│      GitHub       │
│   Pull Request    │
└────────┬──────────┘
         │  Vercel GitHub App (auto-triggered on every push)
         ▼
┌───────────────────┐
│  Vercel Preview   │  ← Unique URL: abc123.vercel.app
│  Build + Deploy   │  ← Share with Cezar for review
└────────┬──────────┘
         │  PR approved + merged to main
         ▼
┌───────────────────┐
│  Merge → main     │
└────────┬──────────┘
         │  Auto-deploy (no manual step)
         ▼
┌───────────────────┐
│  Vercel Production│  ← cezardolphino.com
│  Build (≈ 45s)    │
└───────────────────┘
```

**Build steps inside Vercel:**
1. `npm ci` — clean install from lockfile
2. `next build` — TypeScript check + RSC compilation + static generation
3. Image optimization pass
4. Deploy to global CDN (~300 edge nodes)

---

## 11. Security

| Concern | Mitigation |
|---|---|
| Contact form spam | Formspree CAPTCHA + honeypot field |
| Secret leakage | All keys in Vercel env vars, `.env.local` gitignored |
| LGPD compliance | Plausible (no PII), no GA, no cookies |
| Audio hotlinking | `next.config.js` headers: `Referrer-Policy` on `/audio/*` |
| DDoS | Vercel edge handles natively |
| XSS | React escapes all output by default; `zod` validates all form input |
| Dependency vulnerabilities | Dependabot alerts on GitHub + `npm audit` in CI |

No authentication, no database, no user accounts → minimal attack surface by design.

---

## 12. Environment Variables

```bash
# .env.local — never committed to git, set in Vercel dashboard for production

# Formspree
NEXT_PUBLIC_FORMSPREE_ID=xyzabc123

# Plausible
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=cezardolphino.com

# Ko-fi
NEXT_PUBLIC_KOFI_USERNAME=cezardolphino

# Phase 2: Sanity (server-side only — no NEXT_PUBLIC_ prefix)
SANITY_PROJECT_ID=abc123
SANITY_DATASET=production
SANITY_API_TOKEN=sk_prod_...
```

`NEXT_PUBLIC_` variables are exposed to the browser bundle. All others are build-time server-only.

---

## 13. Full Dependency List

```json
{
  "dependencies": {
    "next": "^14.x",
    "react": "^18.x",
    "react-dom": "^18.x",

    "howler": "^2.2.x",
    "zustand": "^4.x",

    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "@hookform/resolvers": "^3.x",

    "lucide-react": "^0.x",
    "class-variance-authority": "^0.x",
    "clsx": "^2.x",
    "tailwind-merge": "^2.x",
    "tailwindcss-animate": "^1.x",

    "next-themes": "^0.x",
    "sonner": "^1.x"
  },
  "devDependencies": {
    "typescript": "^5.x",
    "tailwindcss": "^3.x",
    "postcss": "^8.x",
    "autoprefixer": "^10.x",
    "@types/node": "^20.x",
    "@types/react": "^18.x",
    "@types/howler": "^2.2.x"
  }
}
```

**Estimated client JS bundle (gzipped):**
- React runtime: ~45KB
- Zustand: ~3KB
- Howler.js: ~12KB
- Shadcn components (used subset): ~18KB
- react-hook-form + zod: ~14KB
- **Total: ~92KB** — loaded only for client components; RSC sections ship 0KB JS

---

## 14. Phase Comparison

| Capability | Phase 1 (MVP) | Phase 2 (Growth) |
|---|---|---|
| Hosting | Vercel Free | Vercel Pro (if needed) |
| Audio storage | Vercel static `/public/audio` | Cloudflare R2 |
| Content management | Edit TypeScript files + git push | Sanity Studio (no-code) |
| Shows updates | Edit TypeScript + git push | Sanity publish → auto-redeploy in 60s |
| Contact form | Formspree free (50/mo) | Formspree Pro OR Resend |
| Donations | Ko-fi button + PIX | Ko-fi + Stripe direct |
| Merch | Ko-fi shop link | Shopify Storefront API or Gumroad |
| Shows sync | Manual | Bandsintown API |
| Newsletter | Email input → Mailchimp API | Full Mailchimp automation |
| Analytics | Plausible basic | Plausible + custom goals (play events) |
| SEO | Basic `metadata` object | `generateMetadata()` per page + sitemap |
| Internationalization | PT only | PT + EN via `next-intl` |

---

*Document v2.0 — updated to reflect Next.js 14 App Router + Shadcn/ui + Zustand + Howler.js stack. All Astro and Nano Stores references removed.*
