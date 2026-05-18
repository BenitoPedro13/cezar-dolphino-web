import { Marquee } from "@/components/motion/Marquee"

const TERMS = [
  "Dynamic Artist",
  "MPB",
  "Soul",
  "Jazz",
  "Bossa",
  "Cinema Bedroom",
  "Voz & Violão",
  "Rio de Janeiro",
  "Sessões Intimistas",
]

export function MarqueeStrip() {
  return (
    <div className="relative border-y border-border bg-background py-8 sm:py-10">
      <Marquee duration={45}>
        {TERMS.map((term) => (
          <span
            key={term}
            className="flex items-center gap-12 font-display text-[clamp(2.5rem,7vw,6rem)] font-bold leading-none tracking-[-0.04em] text-foreground"
          >
            {term}
            <span aria-hidden className="size-2 rounded-full bg-accent" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
