"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import { Menu, Pause, Play, X } from "lucide-react"
import { useState } from "react"

import { usePlayerStore } from "@/lib/player-store"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "#sobre", label: "About" },
  { href: "#musica", label: "Music" },
  { href: "#shows", label: "Shows" },
  { href: "#apoie", label: "Support" },
  { href: "#contato", label: "Contact" },
]

const MENU_ITEMS = [
  { href: "#hero", label: "Home" },
  { href: "#musica", label: "Música" },
  { href: "#sobre", label: "Sobre" },
  { href: "#shows", label: "Shows" },
  { href: "#apoie", label: "Apoie" },
  { href: "#contato", label: "Contato" },
]

export function FloatingDock() {
  const [menuOpen, setMenuOpen] = useState(false)
  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const loadTrack = usePlayerStore((state) => state.loadTrack)

  function handlePlay() {
    if (currentTrack) {
      togglePlay()
      return
    }
    import("@/data/tracks").then(({ tracks, featuredTrack }) => {
      loadTrack(featuredTrack ?? tracks[0], tracks)
    })
  }

  return (
    <>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl"
            onClick={() => setMenuOpen(false)}
          >
            <motion.nav
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
              className="flex h-full flex-col items-center justify-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {MENU_ITEMS.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  className="group relative font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-none tracking-[-0.04em] text-foreground/40 transition-colors hover:text-foreground"
                >
                  <span className="absolute -left-10 top-1/2 -translate-y-1/2 font-mono text-xs text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
      >
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-background/85 p-1.5 shadow-[0_18px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="group inline-flex items-center gap-2 rounded-full bg-card/80 px-4 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-card"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? (
              <X className="size-3.5" />
            ) : (
              <Menu className="size-3.5" />
            )}
            Menu
          </button>

          <nav className="hidden items-center md:flex">
            {NAV_ITEMS.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className="relative rounded-full px-3 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <motion.span
                  variants={{
                    rest: { scale: 0 },
                    hover: { scale: 1 },
                  }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute left-1/2 top-1.5 size-1 -translate-x-1/2 rounded-full bg-accent"
                />
                {item.label}
              </motion.a>
            ))}
          </nav>

          <button
            type="button"
            onClick={handlePlay}
            aria-label={isPlaying ? "Pausar" : "Tocar"}
            className={cn(
              "relative ml-1 inline-flex h-11 items-center gap-2 rounded-full bg-accent pl-3 pr-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent-foreground transition-transform hover:scale-[1.02]",
            )}
          >
            <span className="hidden sm:inline">
              {currentTrack ? "Now" : "Play"}{" "}
              <span className="text-accent-foreground/70">music</span>
            </span>
            <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-foreground/15">
              {currentTrack?.coverArt && (
                <Image
                  src={currentTrack.coverArt}
                  alt=""
                  fill
                  className="object-cover opacity-80"
                  sizes="32px"
                />
              )}
              <span className="relative flex size-5 items-center justify-center rounded-full bg-accent-foreground text-accent">
                {isPlaying ? (
                  <Pause className="size-2.5 fill-current" />
                ) : (
                  <Play className="size-2.5 translate-x-[1px] fill-current" />
                )}
              </span>
            </span>
          </button>
        </div>
      </motion.div>
    </>
  )
}
