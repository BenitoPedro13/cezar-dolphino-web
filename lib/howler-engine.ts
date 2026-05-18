import { Howl } from "howler"

import { usePlayerStore } from "@/lib/player-store"

let howl: Howl | null = null
let progressInterval: ReturnType<typeof setInterval> | null = null
let loadedSrc: string | null = null

function clearProgressInterval() {
  if (progressInterval) {
    clearInterval(progressInterval)
    progressInterval = null
  }
}

function startProgressInterval() {
  clearProgressInterval()
  progressInterval = setInterval(() => {
    if (!howl) return
    const duration = howl.duration()
    if (!duration) return
    const position = howl.seek() as number
    usePlayerStore.setState({ progress: position / duration })
  }, 500)
}

export const howlerEngine = {
  load(src: string, onEnd: () => void) {
    if (howl && loadedSrc === src) {
      howl.play()
      return
    }

    if (howl) {
      howl.unload()
      howl = null
    }

    clearProgressInterval()
    loadedSrc = src

    const { volume } = usePlayerStore.getState()

    howl = new Howl({
      src: [src],
      html5: true,
      volume,
      onload() {
        const duration = howl?.duration() ?? 0
        usePlayerStore.setState({ duration })
      },
      onplay() {
        usePlayerStore.setState({ isPlaying: true })
        startProgressInterval()
      },
      onpause() {
        usePlayerStore.setState({ isPlaying: false })
        clearProgressInterval()
      },
      onend() {
        clearProgressInterval()
        usePlayerStore.setState({ isPlaying: false, progress: 0 })
        onEnd()
      },
      onstop() {
        usePlayerStore.setState({ isPlaying: false })
        clearProgressInterval()
      },
      onloaderror() {
        clearProgressInterval()
        usePlayerStore.setState({ isPlaying: false })
      },
    })

    howl.play()
  },

  togglePlay() {
    if (!howl) return
    if (howl.playing()) {
      howl.pause()
    } else {
      howl.play()
    }
  },

  seek(seconds: number) {
    if (!howl) return
    howl.seek(seconds)
    const duration = howl.duration()
    if (duration > 0) {
      usePlayerStore.setState({ progress: seconds / duration })
    }
  },

  setVolume(volume: number) {
    howl?.volume(volume)
  },

  unload() {
    clearProgressInterval()
    howl?.unload()
    howl = null
    loadedSrc = null
  },
}
