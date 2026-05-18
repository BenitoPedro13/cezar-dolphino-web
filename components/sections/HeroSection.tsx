"use client"

import { motion, useScroll, useTransform, type Variants } from "motion/react"
import { ArrowDown, Globe, Music2, Play } from "lucide-react"
import { useRef } from "react"

import { MagneticButton } from "@/components/motion/MagneticButton"
import { ParallaxBackground } from "@/components/motion/ParallaxBackground"
import { siteConfig } from "@/data/site-config"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const SOCIAL_ITEMS = [
  { key: "soundcloud" as const, label: "SoundCloud", icon: Music2 },
  { key: "instagram" as const, label: "Instagram", icon: Globe },
  { key: "youtube" as const, label: "YouTube", icon: Play },
  { key: "spotify" as const, label: "Spotify", icon: Music2 },
  { key: "tiktok" as const, label: "TikTok", icon: Globe },
]

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: "120%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: EASE },
  },
}

export function HeroSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const socialLinks = SOCIAL_ITEMS.flatMap((item) => {
    const href = siteConfig.social[item.key]
    if (!href) return []
    return [{ ...item, href }]
  })

  const [firstName, lastName] = siteConfig.artistName.split(" ")

  return (
    <section
      id="hero"
      ref={ref}
      className="relative isolate flex min-h-svh w-full flex-col overflow-hidden bg-background"
    >
      <ParallaxBackground />

      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(rgba(240,230,211,0.06)_1px,transparent_1px)] bg-[size:3px_3px] opacity-50" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-background to-transparent" />

      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pb-24 pt-32 sm:px-10 sm:pt-40"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col gap-6"
        >
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 font-sans text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground"
          >
            <span className="size-1.5 animate-pulse rounded-full bg-primary" />
            Rio de Janeiro · MMXXVI
          </motion.div>

          <h1 className="font-display leading-[0.85] tracking-tight">
            <span className="block overflow-hidden">
              <motion.span
                variants={wordVariants}
                className="block text-[clamp(4rem,15vw,16rem)] font-medium italic text-foreground"
              >
                {firstName}
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={wordVariants}
                className="block translate-x-[5%] text-[clamp(4rem,15vw,16rem)] font-light text-primary"
              >
                {lastName}
              </motion.span>
            </span>
          </h1>

          <motion.div
            variants={itemVariants}
            className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
          >
            <p className="max-w-md font-serif text-base italic leading-relaxed text-foreground/85 sm:text-lg">
              {siteConfig.shortBio}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <MagneticButton
                href="#musica"
                className="group h-14 min-w-[180px] rounded-full bg-primary px-7 font-sans text-sm font-medium uppercase tracking-[0.16em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <span className="flex items-center gap-2">
                  <Play className="size-4 fill-current" />
                  Ouça agora
                </span>
              </MagneticButton>

              <MagneticButton
                href="#shows"
                strength={0.18}
                className="h-14 min-w-[180px] rounded-full border border-border bg-card/40 px-7 font-sans text-sm uppercase tracking-[0.16em] text-foreground backdrop-blur transition-colors hover:border-primary hover:text-primary"
              >
                Próximos shows
              </MagneticButton>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-col gap-6 border-t border-border/60 pt-8 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-3">
              {socialLinks.map((item, index) => {
                const Icon = item.icon
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={item.label}
                    whileHover={{ y: -4, scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "group inline-flex size-11 items-center justify-center rounded-full border border-border bg-card/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary",
                      index === 0 && "ml-0",
                    )}
                  >
                    <Icon className="size-4" />
                  </motion.a>
                )
              })}
            </div>

            <a
              href="#musica"
              className="group inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Role para descobrir
              <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full border border-border bg-card/40 transition-colors group-hover:border-primary group-hover:text-primary">
                <motion.span
                  animate={{ y: [0, 18, -18, 0] }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <ArrowDown className="size-3.5" />
                </motion.span>
              </span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
