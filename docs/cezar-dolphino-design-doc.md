# Cezar Dolphino — Website Design Document
**Version 2.0 | Updated: Next.js + Shadcn/ui Stack**

---

## 1. Project Overview

A personal artist website for **Cezar Dolphino** — a Brazilian MPB/Soul/Jazz-Pop singer whose world lives in the tension between vintage warmth and modern cool. The site must feel like stepping into one of his videos: dimly lit, intimate, emotionally resonant. It is not a corporate portfolio. It is a *room* the fan walks into.

**Core Goals:**
- Build and deepen a fanbase (storytelling, music, identity)
- Convert visitors into supporters (donations, merch, stream links)
- Establish credibility for show bookings (press kit, shows calendar, contact)

---

## 2. Brand Identity

### 2.1 Concept: *"Quarto de Cinema"* (Cinema Bedroom)
The brand concept merges Cezar's two dominant aesthetics — the intimate bedroom-pop setting and the cinematic, film-lover's eye. Everything should feel like a still from a slow, beautiful Brazilian indie film. Think *Bacurau* color grading meets *João Gilberto* album covers.

### 2.2 Color Palette

| Role | Name | Hex | CSS Variable | Usage |
|---|---|---|---|---|
| Background | Carvão (Charcoal) | `#1A1612` | `--background` | Main background — deep, warm black |
| Surface | Tabaco | `#2C2218` | `--card` | Cards, panels, player background |
| Accent Primary | Âmbar (Amber) | `#D4882A` | `--primary` | CTA buttons, highlights, active states |
| Accent Secondary | Terracota | `#A0522D` | `--secondary` | Hover states, secondary emphasis |
| Text Primary | Creme | `#F0E6D3` | `--foreground` | All body copy |
| Text Muted | Cinza Quente | `#8C7B6B` | `--muted-foreground` | Subtitles, metadata, placeholders |
| Border | Borda Quente | `#3D2E1E` | `--border` | Card edges, dividers |
| Glow | Luz de Vela | `rgba(212,136,42,0.15)` | `--ring` | Focus rings, ambient hover glow |

> **Important:** These variable names map directly to Shadcn's CSS variable convention. Setting them once in `globals.css` means every Shadcn component — Button, Card, Slider, Dialog — automatically inherits the brand. You never theme after the fact.

**Mood:** Warm candlelight, old film grain, brown whiskey glass, faded vinyl sleeves.

### 2.3 Typography

| Role | Font | Source | Style |
|---|---|---|---|
| Display / Hero | **Cormorant Garamond** | Google Fonts | Italic, Light — poetic, cinematic, editorial |
| Headings | **Cormorant Garamond** | Google Fonts | Semi-Bold — strong but still romantic |
| Body | **Lora** | Google Fonts | Regular — warm serif, excellent readability |
| UI Labels / Nav | **Raleway** | Google Fonts | Light/Medium — clean contrast to serif |
| Accent / Pull Quotes | **Cormorant SC** | Google Fonts | Small-caps — exclusive, LP liner notes feel |

**Typography rules:**
- Headlines always tracked wide in uppercase via `letter-spacing: 0.15em`
- Pull quotes in *italic* Cormorant, large, off-center, overlapping other elements
- Never use Inter, Roboto, or any sans-serif for anything emotional
- Shadcn's default `font-sans` CSS variable overridden to `Raleway` in `tailwind.config.ts`

### 2.4 Visual Language

- **Grain overlay:** Subtle noise/film grain texture on section backgrounds via a fixed PNG overlay at low opacity
- **Photography:** All images treated with a warm sepia-adjacent CSS filter — never full color, never cold
- **Shadows:** Soft, warm amber drop shadows via `shadow-amber-900/50` Tailwind utility
- **Borders:** Hair-thin `1px` lines using `--border` token — like the edge of a vinyl sleeve
- **Motion:** Slow fades and gentle vertical reveals on scroll. Nothing snappy. Everything breathes.
- **Spacing:** Generous. Dark space is the most important design element.
- **Shadcn radius:** Set `--radius` to `0.25rem` globally — refined, slightly sharp, not the default pill shape

---

## 3. Site Architecture

```
cezardolphino.com
│
├── /                  (Home — Hero + all sections, single-page scroll)
├── /musica            (Dedicated Music page — Phase 2)
├── /shows             (Dedicated Shows page — Phase 2)
├── /sobre             (About — Phase 2)
├── /apoie             (Support — Phase 2)
└── /contato           (Contact — Phase 2)
```

**Phase 1 (MVP):** Single-page with anchor scroll (`/#musica`, `/#shows`, etc.). Next.js App Router handles this cleanly — each section has an `id` attribute and the nav links use `href="#section"`.

**Phase 2:** Each section graduates to its own route with full `generateMetadata()` for SEO.

---

## 4. Feature Breakdown

### FEATURE 1 — Hero Section
**Priority: 1 — Build First**

The first impression. A full-screen, immersive experience.

**Elements:**
- Full-screen background: looping short video clip OR high-quality photo, with warm film-grain overlay
- Artist name in large Cormorant Garamond italic
- Single-line tagline in Raleway Light: *"MPB · Soul · Jazz — Rio de Janeiro"*
- Primary CTA: Shadcn `<Button>` in brand amber — **"Ouça agora"** → scrolls to `#musica`
- Secondary CTA: Shadcn `<Button variant="ghost">` — **"Próximos shows"** → scrolls to `#shows`
- Social links row (Instagram, YouTube, Spotify, TikTok) using `lucide-react` icons
- Scroll-down indicator via Tailwind `animate-bounce`

**UX Notes:**
- No auto-playing music — browser policy and respect for the listener
- Video background falls back gracefully to a still photo on mobile via the `<video>` `poster` attribute

---

### FEATURE 2 — Music Player
**Priority: 2 — Core Feature**

The soul of the site. Built on Shadcn's primitives, skinned entirely in the brand, powered by Howler.js.

**2a. Persistent Bottom Player Bar**
- Docked to the bottom of the viewport, always visible once a track is loaded
- Shadcn `Slider` for progress scrubber and volume — amber fill via `--primary` override
- Track info: `next/image` cover art thumbnail + track name + artist name
- Controls with `lucide-react`: `SkipBack`, `Play`/`Pause`, `SkipForward`
- Howler.js manages actual audio playback; Shadcn handles only the visual layer

**2b. Discography / Track Library**
- Grid of Shadcn `Card` components — one per track
- Each card: cover art, title, `Badge` for category, year, duration
- Play button overlay on hover using `Button` with icon
- Filter using Shadcn `Tabs`: *Todos · Originais · Covers · Ao Vivo*
- Clicking a card dispatches to Zustand store → Howler loads and plays the track

**2c. Featured Track**
- Pinned hero card at the top, larger variant of Shadcn `Card`
- Cover art (large), title, blurb, and a prominent play button
- Controlled by a `featured: true` flag in track data — no hardcoding in the component

**2d. Audio Source**
- Phase 1: `.mp3` files served from `/public/audio/` via Next.js static hosting
- Phase 2: Cloudflare R2 — only the `audioSrc` URL in the data changes, zero component work

---

### FEATURE 3 — About Section
**Priority: 3 — Brand Foundation**

**3a. Short Story (Hero Bio)**
- 3–4 sentences, emotional and poetic, written in Cezar's voice
- Large intimate photo in asymmetric CSS Grid layout, text overlapping image slightly

**3b. Influences & Inspirations**
- Visual moodboard grid of artists, films, books
- Artists: Liniker, Melly, Amy Winehouse, João Gilberto, etc.

**3c. Extended Biography**
- Full press bio behind a Shadcn `Collapsible` toggle
- Downloadable Press Kit PDF via `<Button variant="outline">` with `Download` icon

**3d. Pull Quote**
- One powerful sentence in huge italic Cormorant, centered and full-width
- Example: *"Cada música é uma sala que eu construo para o ouvinte entrar."*

---

### FEATURE 4 — Shows & Events
**Priority: 4 — Credibility Builder**

**Elements:**
- Upcoming shows as Shadcn `Card` rows: date, venue, city, ticket `Button` or "Em breve" `Badge`
- Past shows in a collapsible section (Shadcn `Collapsible`), visually muted
- Promoter CTA: *"Quer me ver no seu evento?"* → anchor link to `#contato`
- Empty state via Shadcn `Alert`: *"Fique de olho. Em breve novidades."*

**Show data shape:**
```typescript
{
  id: string
  date: string           // ISO: "2025-09-14"
  venue: string
  city: string
  state: string
  ticketUrl?: string
  status: 'upcoming' | 'sold-out' | 'past' | 'tba'
}
```

Phase 2: Bandsintown or Songkick API for automated sync.

---

### FEATURE 5 — Support / Apoie
**Priority: 5 — Monetization**

**5a. PIX Donation**
- Copy: *"Gostou do que ouviu? Me pague um café."*
- PIX key in a Shadcn `Card` with copy-to-clipboard `Button` using `navigator.clipboard`
- Confirmation via Shadcn `Sonner` toast: *"Chave PIX copiada!"*

**5b. Ko-fi**
- Custom amber `<Button>` → opens Ko-fi in new tab
- Preferred over iframe embed for cleaner layout control

**5c. Streaming Links**
- Row of Shadcn `<Button variant="ghost">` with platform icons
- Spotify, YouTube Music, Apple Music, Deezer
- Label: *"Ouça nas plataformas e ajude o algoritmo."*

**5d. Merch Teaser + Newsletter**
- Email `Input` + `Button` submission to Mailchimp/Brevo
- Copy: *"Sem spam. Só novidades quando houver."*

---

### FEATURE 6 — Contact / Booking
**Priority: 6 — Professional Layer**

**Elements:**
- Intro: *"Para shows, parcerias e imprensa."*
- Form built with Shadcn `Form`, `Input`, `Textarea`, `Select`, `Button`
- Validation via `react-hook-form` + `zod` (Shadcn's native pattern)
- Fields: Name, Email, Subject dropdown (Show Booking / Press / Collaboration / Other), Message
- Submission via Formspree POST — no backend required
- Direct email as text fallback
- Notice: *"Respondemos em até 3 dias úteis."*

---

## 5. Technical Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | SSR/SSG, SEO-ready, full React ecosystem |
| UI Components | **Shadcn/ui** | Owned source, 100% brandable via CSS vars |
| Styling | **Tailwind CSS v3** | Utility-first, co-owns the brand token system |
| Audio Engine | **Howler.js** | Cross-browser audio, Web Audio API wrapper |
| State Management | **Zustand** | Lightweight global store for player state |
| Form Handling | **react-hook-form + zod** | Shadcn's native validation pattern |
| Icons | **lucide-react** | Ships with Shadcn, consistent language |
| Notifications | **Shadcn Sonner** | Toast for clipboard actions and form feedback |
| Hosting | **Vercel** | Native Next.js platform, free tier, edge CDN |
| Forms Backend | **Formspree** | No-backend contact form → email delivery |
| Donations | **Ko-fi** + PIX | Zero setup, trusted by indie artists |
| Analytics | **Plausible** | Privacy-first, LGPD-compliant, no cookies |
| CMS (Phase 2) | **Sanity.io** | Headless, GROQ queries, webhook auto-deploy |
| Audio CDN (Phase 2) | **Cloudflare R2** | Zero egress cost, S3-compatible |

---

## 6. Page Sections — Scroll Order (MVP)

```
[1] Hero (full screen)
        ↓
[2] Music Player + Discography     ← id="musica"
        ↓
[3] About / Bio + Pull Quote       ← id="sobre"
        ↓
[4] Influences Moodboard
        ↓
[5] Shows                          ← id="shows"
        ↓
[6] Support (PIX + Ko-fi + Links)  ← id="apoie"
        ↓
[7] Newsletter Signup
        ↓
[8] Contact / Booking              ← id="contato"
        ↓
[Footer] Social · Press Kit PDF · © Cezar Dolphino
```

---

## 7. Build Roadmap

### Phase 0 — Brand Sprint (Week 1)
- [ ] Validate color palette with Cezar
- [ ] Override Shadcn CSS variables with brand tokens in `globals.css`
- [ ] Configure `tailwind.config.ts` with custom font families and color scales
- [ ] Collect all assets: photos, audio files, bio text, show dates, links
- [ ] Write all copy in Portuguese (primary) + English (secondary)
- [ ] Design wordmark (Cezar Dolphino in Cormorant SC)

### Phase 1 — MVP Launch (Weeks 2–4)
- [ ] `npx create-next-app@latest` + `npx shadcn@latest init`
- [ ] Install: Howler.js, Zustand, react-hook-form, zod, lucide-react
- [ ] Apply brand tokens to `globals.css` and `tailwind.config.ts`
- [ ] Build `Layout` (Header + Footer + persistent player bar slot)
- [ ] Build Zustand player store + Howler engine
- [ ] Build Hero section
- [ ] Build Music Player (bottom bar + TrackGrid with Shadcn Slider/Card/Tabs)
- [ ] Build About section (asymmetric layout + Collapsible bio)
- [ ] Build Shows section (Card list + empty state Alert)
- [ ] Build Support section (PIX copy + Ko-fi + Sonner toast)
- [ ] Build Contact form (react-hook-form + zod + Formspree)
- [ ] Mobile responsiveness pass (Tailwind `sm:` / `md:` / `lg:` prefixes)
- [ ] Plausible analytics script in `app/layout.tsx`
- [ ] Deploy to Vercel + connect custom domain

### Phase 2 — Growth Layer (Month 2+)
- [ ] Sanity CMS: schemas for Track, Show, Bio
- [ ] Sanity webhook → Vercel deploy hook (publish = auto-redeploy in ~60s)
- [ ] Bandsintown API for shows auto-sync
- [ ] Mailchimp/Brevo newsletter integration
- [ ] Merch store (Printful + Shopify or Gumroad)
- [ ] `generateMetadata()` per page + Open Graph images + sitemap.xml
- [ ] `next-intl` for PT/EN language toggle
- [ ] Migrate audio to Cloudflare R2

---

## 8. Shadcn Component Map

| Section | Shadcn Components Used |
|---|---|
| Hero | `Button` |
| Music Player Bar | `Slider`, `Button` |
| Track Grid | `Card`, `CardContent`, `Badge`, `Tabs`, `Button` |
| About | `Collapsible`, `CollapsibleContent`, `Button` |
| Shows | `Card`, `Badge`, `Button`, `Alert` |
| Support | `Card`, `Button`, `Input` |
| Contact | `Form`, `FormField`, `Input`, `Textarea`, `Select`, `Button` |
| Global | `Sonner` (Toaster), `Separator` |

> All components installed via `npx shadcn@latest add [component]` — source lands in `src/components/ui/` and is fully yours to edit.

---

## 9. Content Checklist (Assets Needed from Cezar)

**Photos**
- [ ] 1–2 high-res performance photos (horizontal, min 1920×1080px, for hero)
- [ ] 1 intimate portrait (vertical or square, for About section)
- [ ] Cover art per track/EP/single (square, min 800×800px)

**Audio**
- [ ] All track `.mp3` files (320kbps preferred) OR SoundCloud/YouTube URLs

**Text**
- [ ] Short bio (3–4 sentences, his voice, in Portuguese)
- [ ] Full press bio (2–3 paragraphs)
- [ ] Upcoming shows list (date, venue, city, ticket URL)
- [ ] One personal quote about his music
- [ ] Press Kit PDF (if available)

**Accounts & Links**
- [ ] Spotify artist URL
- [ ] YouTube channel URL
- [ ] Instagram handle
- [ ] TikTok handle
- [ ] PIX key
- [ ] Ko-fi account (ko-fi.com — free to create)
- [ ] Formspree account (formspree.io — free tier is enough)
- [ ] Plausible account (plausible.io — 30-day free trial)

---

## 10. Design Inspiration References

| Reference | What to borrow |
|---|---|
| Sampha's website | Dark, intimate, music-first layout |
| Novo Amor's site | Warm grain texture, serif typography, emotional photography |
| Liniker's Instagram aesthetic | Brazilian warmth, skin tones, soft shadows |
| Criterion Collection website | Editorial serif type, film grain, dark backgrounds |
| Pre-Noise era Frank Ocean fan sites | Rawness, minimal UI, the music speaks |

---

*Document v2.0 — stack updated to Next.js 14 App Router + Shadcn/ui + Zustand. See companion system architecture document for full technical spec.*