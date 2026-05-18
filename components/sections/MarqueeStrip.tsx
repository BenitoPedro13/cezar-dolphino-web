import { Marquee } from "@/components/motion/Marquee"

const TERMS = [
  "MPB",
  "Soul",
  "Jazz",
  "Bossa",
  "Cinema bedroom",
  "Voz · Violão",
  "Rio de Janeiro",
  "Sessões intimistas",
]

export function MarqueeStrip() {
  return (
    <div className="relative border-y border-border/60 bg-background py-10">
      <Marquee duration={40}>
        {TERMS.map((term) => (
          <span
            key={term}
            className="flex items-center gap-12 font-display text-5xl italic text-foreground/85 sm:text-7xl"
          >
            {term}
            <span aria-hidden className="size-2 rounded-full bg-primary" />
          </span>
        ))}
      </Marquee>
    </div>
  )
}
