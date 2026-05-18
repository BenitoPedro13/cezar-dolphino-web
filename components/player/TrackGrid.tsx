"use client"

import { useMemo, useState } from "react"

import { TrackCard } from "@/components/player/TrackCard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { featuredTrack, tracks } from "@/data/tracks"
import type { Track } from "@/lib/types"

type FilterKey = "all" | Track["category"]

const FILTERS: { value: FilterKey; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "original", label: "Originais" },
  { value: "cover", label: "Covers" },
  { value: "ao-vivo", label: "Ao vivo" },
]

function filterTracks(filter: FilterKey): Track[] {
  if (filter === "all") return tracks
  return tracks.filter((track) => track.category === filter)
}

export function TrackGrid() {
  const [filter, setFilter] = useState<FilterKey>("all")
  const filteredTracks = useMemo(() => filterTracks(filter), [filter])
  const listTracks = filteredTracks.filter((track) => !track.featured)
  const featured =
    filteredTracks.find((track) => track.featured) ??
    (filter === "all" ? featuredTrack : undefined)

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => setFilter(value as FilterKey)}
      className="mt-8"
    >
      <TabsList className="h-auto flex-wrap gap-1 bg-background/60 p-1">
        {FILTERS.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            className="font-sans text-xs uppercase tracking-[0.12em]"
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {FILTERS.map((item) => (
        <TabsContent key={item.value} value={item.value} className="mt-6">
          {filteredTracks.length === 0 ? (
            <p className="font-sans text-sm text-muted-foreground">
              Nenhuma faixa nesta categoria.
            </p>
          ) : (
            <div className="space-y-6">
              {featured && (
                <TrackCard
                  track={featured}
                  queue={filteredTracks}
                  featured
                />
              )}
              {listTracks.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {listTracks.map((track) => (
                    <TrackCard
                      key={track.id}
                      track={track}
                      queue={filteredTracks}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
}
