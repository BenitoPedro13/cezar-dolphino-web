import { influences, influenceCategories } from "@/data/influences"
import type { Influence } from "@/lib/types"
import { cn } from "@/lib/utils"

const TILE_GRADIENTS: Record<Influence["category"], string> = {
  musica:
    "from-primary/25 via-card to-background",
  cinema:
    "from-secondary/30 via-card to-background",
  literatura:
    "from-muted via-card to-background",
}

function InfluenceTile({ item }: { item: Influence }) {
  return (
    <article
      className={cn(
        "group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-lg border border-border/70 p-4",
        "bg-gradient-to-br transition-colors hover:border-primary/40",
        TILE_GRADIENTS[item.category],
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(rgba(240,230,211,0.05)_1px,transparent_1px)] bg-[size:3px_3px] opacity-40" />
      <p className="relative font-sans text-[0.65rem] uppercase tracking-[0.16em] text-primary/90">
        {
          influenceCategories.find((category) => category.key === item.category)
            ?.label
        }
      </p>
      <h3 className="relative mt-1 font-display text-xl italic text-foreground">
        {item.name}
      </h3>
      {item.note && (
        <p className="relative mt-2 font-sans text-xs leading-relaxed text-muted-foreground">
          {item.note}
        </p>
      )}
    </article>
  )
}

export function InfluencesSection() {
  return (
    <section className="border-b border-border/70 bg-card/40">
      <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-24">
        <p className="font-sans text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Referências
        </p>
        <h2 className="mt-3 font-display text-4xl">Influências</h2>
        <p className="mt-3 max-w-2xl font-sans text-sm text-muted-foreground">
          Um moodboard do que alimenta o som e o olhar — artistas, cinema e
          literatura que habitam o quarto.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {influences.map((item) => (
            <InfluenceTile key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
