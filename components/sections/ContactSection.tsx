"use client"

import { ArrowDownLeft, Mail } from "lucide-react"

import { motion } from "motion/react"

import { JiggleText } from "@/components/motion/JiggleText"
import { Reveal } from "@/components/motion/Reveal"
import { ContactForm } from "@/components/sections/ContactForm"
import { siteConfig } from "@/data/site-config"

export function ContactSection() {
  return (
    <section
      id="contato"
      className="relative scroll-mt-24 overflow-hidden bg-background"
    >
      <div className="relative mx-auto w-full max-w-7xl px-6 py-32 sm:px-10 sm:py-40">
        <div className="grid items-end gap-x-10 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.24em] text-muted-foreground">
                (Get in
                <br />
                touch)
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <h2 className="flex flex-wrap items-baseline gap-x-6 gap-y-2 font-display text-[clamp(3rem,11vw,9rem)] leading-[0.85] tracking-[-0.05em]">
              <JiggleText
                text="Let's"
                className="font-bold text-foreground"
                maxRotate={10}
              />
              <JiggleText
                text="talk."
                className="font-light text-foreground/40"
                maxRotate={-8}
              />
            </h2>
          </div>

          <div className="flex items-end justify-end lg:col-span-2">
            <motion.a
              href={`mailto:${siteConfig.contactEmail}`}
              aria-label="Enviar email"
              data-cursor-label="Email"
              whileHover={{ scale: 1.08, rotate: -8 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex size-16 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background sm:size-20"
            >
              <ArrowDownLeft className="size-5 transition-transform group-hover:translate-x-[-3px] group-hover:translate-y-[3px] sm:size-6" />
            </motion.a>
          </div>
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 max-w-md font-sans text-base text-muted-foreground">
            Para shows, parcerias e imprensa. Respondemos em até 3 dias úteis.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-16 rounded-md border border-border bg-card/40 p-6 sm:p-10">
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-10 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-card/40">
              <Mail className="size-3.5" />
            </span>
            E-mail direto:{" "}
            <span className="text-foreground">{siteConfig.contactEmail}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
