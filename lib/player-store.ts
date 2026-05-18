import { create } from "zustand"

import { howlerEngine } from "@/lib/howler-engine"
import { hasLocalAudio } from "@/lib/soundcloud"
import type { Track } from "@/lib/types"

const VOLUME_STORAGE_KEY = "cezar-player-volume"

function getInitialVolume(): number {
  if (typeof window === "undefined") return 0.8
  const stored = sessionStorage.getItem(VOLUME_STORAGE_KEY)
  if (!stored) return 0.8
  const parsed = Number(stored)
  return Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0.8
}

interface PlayerState {
  currentTrack: Track | null
  queue: Track[]
  queueIndex: number
  isPlaying: boolean
  progress: number
  duration: number
  volume: number

  loadTrack: (track: Track, queue?: Track[]) => void
  togglePlay: () => void
  seek: (progress: number) => void
  setVolume: (volume: number) => void
  playNext: () => void
  playPrev: () => void
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentTrack: null,
  queue: [],
  queueIndex: -1,
  isPlaying: false,
  progress: 0,
  duration: 0,
  volume: getInitialVolume(),

  loadTrack: (track, queue) => {
    const resolvedQueue =
      queue ?? (get().queue.length > 0 ? get().queue : [track])
    const queueIndex = resolvedQueue.findIndex((item) => item.id === track.id)

    set({
      currentTrack: track,
      queue: resolvedQueue,
      queueIndex,
      progress: 0,
      duration: track.duration,
      isPlaying: false,
    })

    if (hasLocalAudio(track)) {
      howlerEngine.load(track.audioSrc, () => {
        get().playNext()
      })
    } else {
      howlerEngine.unload()
    }
  },

  togglePlay: () => {
    const { currentTrack } = get()
    if (!currentTrack) return
    if (!hasLocalAudio(currentTrack)) return
    howlerEngine.togglePlay()
  },

  seek: (progress) => {
    const clamped = Math.min(1, Math.max(0, progress))
    const { duration } = get()
    if (duration <= 0) {
      set({ progress: clamped })
      return
    }
    set({ progress: clamped })
    howlerEngine.seek(clamped * duration)
  },

  setVolume: (volume) => {
    const clamped = Math.min(1, Math.max(0, volume))
    set({ volume: clamped })
    if (typeof window !== "undefined") {
      sessionStorage.setItem(VOLUME_STORAGE_KEY, String(clamped))
    }
    howlerEngine.setVolume(clamped)
  },

  playNext: () => {
    const { queue, queueIndex } = get()
    const next = queue[queueIndex + 1]
    if (next) get().loadTrack(next, queue)
  },

  playPrev: () => {
    const { queue, queueIndex, progress } = get()
    if (progress > 0.05) {
      get().seek(0)
      return
    }
    const prev = queue[queueIndex - 1]
    if (prev) get().loadTrack(prev, queue)
  },
}))
