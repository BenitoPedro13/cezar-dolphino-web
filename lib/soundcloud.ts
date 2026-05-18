const RESERVED_SLUGS = new Set([
  "likes",
  "sets",
  "tracks",
  "comments",
  "followers",
  "following",
  "popular-tracks",
  "reposts",
  "albums",
])

export interface SoundCloudTrackMeta {
  id: string
  title: string
  permalink: string
  url: string
  description?: string
  durationMs?: number
  soundcloudTrackId?: string
}

export function parseTrackSlugsFromProfileHtml(
  html: string,
  username: string,
): string[] {
  const pattern = new RegExp(`${username}/([a-z0-9-]+)`, "g")
  const slugs = new Set<string>()

  for (const match of html.matchAll(pattern)) {
    const slug = match[1]
    if (!RESERVED_SLUGS.has(slug)) slugs.add(slug)
  }

  return [...slugs]
}

export function parseDurationMsFromTrackHtml(html: string): number | undefined {
  const match = html.match(/"duration":(\d+)/)
  if (!match) return undefined
  const value = Number(match[1])
  return Number.isFinite(value) ? value : undefined
}

export function parseSoundcloudTrackIdFromTrackHtml(
  html: string,
): string | undefined {
  const match = html.match(/api\.soundcloud\.com\/tracks\/(\d+)/)
  return match?.[1]
}

export async function fetchSoundCloudProfileTracks(
  username: string,
): Promise<SoundCloudTrackMeta[]> {
  const profileRes = await fetch(`https://soundcloud.com/${username}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
    next: { revalidate: 3600 },
  })

  if (!profileRes.ok) {
    throw new Error(`SoundCloud profile fetch failed: ${profileRes.status}`)
  }

  const profileHtml = await profileRes.text()
  const slugs = parseTrackSlugsFromProfileHtml(profileHtml, username)
  const tracks: SoundCloudTrackMeta[] = []

  for (const slug of slugs) {
    const url = `https://soundcloud.com/${username}/${slug}`
    const oembedRes = await fetch(
      `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`,
      { next: { revalidate: 3600 } },
    )

    let title = slug.replace(/-/g, " ")
    let description: string | undefined

    if (oembedRes.ok) {
      const oembed = (await oembedRes.json()) as {
        title?: string
        description?: string | null
        html?: string
      }
      title = oembed.title ?? title
      description = oembed.description ?? undefined
    }

    const trackRes = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 3600 },
    })
    const trackHtml = trackRes.ok ? await trackRes.text() : ""
    const durationMs = trackHtml
      ? parseDurationMsFromTrackHtml(trackHtml)
      : undefined
    const soundcloudTrackId = trackHtml
      ? parseSoundcloudTrackIdFromTrackHtml(trackHtml)
      : undefined

    tracks.push({
      id: slug,
      title,
      permalink: slug,
      url,
      description,
      durationMs,
      soundcloudTrackId,
    })
  }

  return tracks
}

export function hasLocalAudio(track: { audioSrc?: string }): boolean {
  return Boolean(track.audioSrc && track.audioSrc.trim().length > 0)
}

export function hasSoundCloudStream(track: {
  streamingLinks?: { soundcloud?: string }
}): boolean {
  return Boolean(track.streamingLinks?.soundcloud)
}
