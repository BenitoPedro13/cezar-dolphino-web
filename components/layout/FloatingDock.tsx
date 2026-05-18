"use client"

import Image from "next/image"
import { AnimatePresence, motion } from "motion/react"
import {
  Menu,
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
  X,
} from "lucide-react"
import { useState } from "react"

import { usePlayerStore } from "@/lib/player-store"
import { cn, formatDuration } from "@/lib/utils"

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

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function FloatingDock() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)

  const currentTrack = usePlayerStore((state) => state.currentTrack)
  const isPlaying = usePlayerStore((state) => state.isPlaying)
  const progress = usePlayerStore((state) => state.progress)
  const duration = usePlayerStore((state) => state.duration)
  const togglePlay = usePlayerStore((state) => state.togglePlay)
  const seek = usePlayerStore((state) => state.seek)
  const loadTrack = usePlayerStore((state) => state.loadTrack)
  const playNext = usePlayerStore((state) => state.playNext)
  const playPrev = usePlayerStore((state) => state.playPrev)
  const clearTrack = usePlayerStore((state) => state.clearTrack)

  function handlePlay() {
    if (currentTrack) {
      togglePlay()
      return
    }
    import("@/data/tracks").then(({ tracks, featuredTrack }) => {
      loadTrack(featuredTrack ?? tracks[0], tracks)
    })
  }

  function handleSeek(event: React.MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const ratio = (event.clientX - rect.left) / rect.width
    seek(Math.min(1, Math.max(0, ratio)))
  }

  const hasTrack = Boolean(currentTrack)
  const progressPct = Math.min(100, Math.max(0, progress * 100))

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
              transition={{ duration: 0.6, ease: EASE }}
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
        transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
        className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4 sm:bottom-6"
      >
        <motion.div
          layout
          transition={{ duration: 0.55, ease: EASE }}
          className="pointer-events-auto relative overflow-hidden rounded-3xl border border-white/10 bg-background/40 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl backdrop-saturate-150"
          style={{
            WebkitBackdropFilter: "blur(28px) saturate(150%)",
            backdropFilter: "blur(28px) saturate(150%)",
          }}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.06] to-transparent"
          />

          <div className="relative flex items-center gap-1 p-1.5">
            <AnimatePresence mode="wait" initial={false}>
              {hasTrack ? (
                <motion.div
                  key="player"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-center gap-1"
                >
                  <div className="ml-1 mr-3 hidden items-center gap-2.5 sm:flex">
                    <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-card ring-1 ring-white/10">
                      {currentTrack?.coverArt && (
                        <Image
                          src={currentTrack.coverArt}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="36px"
                        />
                      )}
                    </span>
                    <span className="font-mono text-[0.55rem] uppercase leading-tight tracking-[0.18em] text-muted-foreground">
                      Play
                      <br />
                      <span className="text-foreground">music</span>
                    </span>
                  </div>

                  <PlayerIconButton
                    active={shuffle}
                    onClick={() => setShuffle((v) => !v)}
                    label="Aleatório"
                  >
                    <Shuffle className="size-3.5" />
                  </PlayerIconButton>

                  <PlayerIconButton onClick={playPrev} label="Anterior">
                    <SkipBack className="size-4" />
                  </PlayerIconButton>

                  <button
                    type="button"
                    onClick={handlePlay}
                    aria-label={isPlaying ? "Pausar" : "Tocar"}
                    className="relative inline-flex size-11 items-center justify-center rounded-full bg-foreground text-background transition-transform hover:scale-[1.05]"
                  >
                    {isPlaying ? (
                      <Pause className="size-4 fill-current" />
                    ) : (
                      <Play className="size-4 translate-x-[1px] fill-current" />
                    )}
                  </button>

                  <PlayerIconButton onClick={playNext} label="Próxima">
                    <SkipForward className="size-4" />
                  </PlayerIconButton>

                  <PlayerIconButton
                    active={repeat}
                    onClick={() => setRepeat((v) => !v)}
                    label="Repetir"
                  >
                    <Repeat className="size-3.5" />
                  </PlayerIconButton>

                  <div className="mx-1 h-6 w-px bg-white/10" />

                  <PlayerIconButton onClick={clearTrack} label="Fechar player">
                    <X className="size-3.5" />
                  </PlayerIconButton>
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="flex items-center gap-1"
                >
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 font-sans text-xs uppercase tracking-[0.16em] text-foreground transition-colors hover:bg-white/15"
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
                    aria-label="Tocar música"
                    className="relative ml-1 inline-flex h-11 items-center gap-2 rounded-full bg-accent pl-3 pr-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-accent-foreground transition-transform hover:scale-[1.02]"
                  >
                    <span className="hidden sm:inline">
                      Play <span className="text-accent-foreground/70">music</span>
                    </span>
                    <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-accent-foreground/15">
                      <span className="relative flex size-5 items-center justify-center rounded-full bg-accent-foreground text-accent">
                        <Play className="size-2.5 translate-x-[1px] fill-current" />
                      </span>
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {hasTrack && (
              <motion.button
                key="seekbar"
                type="button"
                onClick={handleSeek}
                aria-label={`Buscar na faixa · ${currentTrack?.title ?? ""} (${formatDuration(duration * progress)} / ${formatDuration(duration)})`}
                title={`${currentTrack?.title ?? ""} — ${formatDuration(duration * progress)} / ${formatDuration(duration)}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="group relative block h-3 w-full"
              >
                <span className="absolute inset-x-4 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-white/15">
                  <span
                    className="block h-full bg-foreground transition-[width] duration-150 ease-linear"
                    style={{ width: `${progressPct}%` }}
                  />
                </span>
                <span
                  className="pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground opacity-0 shadow-[0_0_0_2px_rgba(0,0,0,0.4)] transition-opacity group-hover:opacity-100"
                  style={{
                    left: `calc(16px + ${progressPct}% * (100% - 32px) / 100%)`,
                  }}
                />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}

function PlayerIconButton({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode
  onClick?: () => void
  active?: boolean
  label: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={cn(
        "group relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground",
        active && "text-accent",
      )}
    >
      {children}
    </button>
  )
}
