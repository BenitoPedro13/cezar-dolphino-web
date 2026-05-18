"use client"

import { motion } from "motion/react"
import { ArrowDown } from "lucide-react"

import { GridBackground } from "@/components/layout/GridBackground"
import { JiggleText } from "@/components/motion/JiggleText"
import { PolaroidFan } from "@/components/motion/PolaroidFan"
import { Squiggle } from "@/components/motion/Squiggle"
import { siteConfig } from "@/data/site-config"

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const SCROLL_TEXT = "SCROLL TO EXPLORE · SCROLL TO EXPLORE · "

export function HeroSection() {
  const [firstName, lastName] = siteConfig.artistName.split(" ")

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-svh w-full items-center justify-center overflow-hidden bg-background"
    >
      <GridBackground />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(255,255,255,0.04) 70%, transparent 90%), repeating-radial-gradient(circle at center, transparent 0, transparent 120px, rgba(255,255,255,0.025) 120px, rgba(255,255,255,0.025) 122px)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: -30, rotate: -10 }}
        animate={{ opacity: 1, x: 0, rotate: -4 }}
        transition={{ duration: 1, delay: 0.9, ease: EASE }}
        className="absolute left-4 top-24 z-10 w-32 sm:left-10 sm:top-32 sm:w-40 lg:w-48"
      >
        <PolaroidFan
          primary={{
            src: siteConfig.portraitImage,
            alt: "Cezar Dolphino ao vivo",
          }}
          extras={[
            { src: siteConfig.portraitImage, alt: "Backstage" },
            { src: siteConfig.portraitImage, alt: "Sessão acústica" },
          ]}
          variant="vertical"
          caption="Empowering Listeners"
          rotate={-4}
        />
        <Squiggle
          delay={1.6}
          className="pointer-events-none absolute -right-12 -top-6 size-32 text-foreground/80 sm:-right-16 sm:size-40"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30, rotate: 10 }}
        animate={{ opacity: 1, x: 0, rotate: 3 }}
        transition={{ duration: 1, delay: 1.2, ease: EASE }}
        className="absolute right-4 top-1/3 z-10 hidden w-44 sm:right-10 sm:block sm:w-52 lg:w-64"
      >
        <PolaroidFan
          primary={{
            src: siteConfig.portraitImage,
            alt: "Cezar Dolphino retrato",
          }}
          extras={[
            { src: siteConfig.portraitImage, alt: "Estúdio" },
            { src: siteConfig.portraitImage, alt: "Palco" },
          ]}
          variant="wide"
          caption="Captivating Audiences"
          rotate={3}
        />
      </motion.div>

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center justify-center gap-6 px-6 py-32 text-center sm:px-10">
        <h1 className="font-display font-bold leading-[0.85] tracking-[-0.06em] text-foreground">
          <span className="block overflow-visible">
            <JiggleText
              text={firstName}
              maxRotate={10}
              maxY={10}
              stagger={0.05}
              className="block text-[clamp(4rem,18vw,18rem)] font-bold leading-[0.85]"
            />
          </span>
          <span className="relative -mt-2 block overflow-visible">
            <JiggleText
              text={lastName}
              maxRotate={-9}
              maxY={8}
              stagger={0.045}
              className="block text-[clamp(4rem,18vw,18rem)] font-light leading-[0.85]"
            />
            <sup className="absolute -right-6 top-2 font-mono text-[clamp(0.75rem,1.2vw,1rem)] font-normal text-foreground/60 sm:-right-10">
              ®
            </sup>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-2 font-sans text-sm uppercase tracking-[0.32em] text-muted-foreground sm:text-base"
        >
          Dynamic · {siteConfig.tagline.split(" — ")[0]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
          className="relative mt-12 flex size-32 items-center justify-center sm:size-40"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 200 200" className="size-full">
              <defs>
                <path
                  id="scroll-circle"
                  d="M 100,100 m -75,0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
                />
              </defs>
              <text
                fontSize="11"
                fontFamily="var(--font-mono)"
                letterSpacing="6"
                className="fill-foreground/85"
              >
                <textPath href="#scroll-circle">
                  {SCROLL_TEXT.repeat(2)}
                </textPath>
              </text>
            </svg>
          </motion.div>

          <motion.a
            href="#musica"
            aria-label="Rolar para descobrir"
            data-cursor-label="Scroll"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex size-12 items-center justify-center rounded-full border border-border bg-card/40 backdrop-blur transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
          >
            <motion.span
              animate={{ y: [-3, 3, -3] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <ArrowDown className="size-4" />
            </motion.span>
          </motion.a>
        </motion.div>
      </div>

      <Squiggle
        delay={2.4}
        className="absolute right-[8%] top-[55%] hidden size-24 text-foreground/50 lg:block"
      />

      <div className="absolute bottom-24 left-6 right-6 flex items-end justify-between font-mono text-[0.6rem] uppercase tracking-[0.24em] text-muted-foreground sm:left-10 sm:right-10">
        <span>
          (Voz · Violão)
          <br />
          <span className="text-foreground/70">Rio de Janeiro</span>
        </span>
        <span className="hidden text-right sm:block">
          MMXXVI
          <br />
          <span className="text-foreground/70">Cinema Bedroom</span>
        </span>
      </div>
    </section>
  )
}
