#!/usr/bin/env node

const USERNAME = process.env.SOUNDCLOUD_USERNAME ?? "cezardolphino"
const RESERVED = new Set([
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

async function main() {
  const profileRes = await fetch(`https://soundcloud.com/${USERNAME}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  })

  if (!profileRes.ok) {
    console.error(`Failed to fetch profile: ${profileRes.status}`)
    process.exit(1)
  }

  const html = await profileRes.text()
  const pattern = new RegExp(`${USERNAME}/([a-z0-9-]+)`, "g")
  const slugs = new Set()

  for (const match of html.matchAll(pattern)) {
    if (!RESERVED.has(match[1])) slugs.add(match[1])
  }

  const tracks = []

  for (const slug of slugs) {
    const url = `https://soundcloud.com/${USERNAME}/${slug}`
    const oembedRes = await fetch(
      `https://soundcloud.com/oembed?url=${encodeURIComponent(url)}&format=json`,
    )
    const oembed = oembedRes.ok ? await oembedRes.json() : {}

    const trackRes = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })
    const trackHtml = trackRes.ok ? await trackRes.text() : ""
    const durationMatch = trackHtml.match(/"duration":(\d+)/)
    const durationMs = durationMatch ? Number(durationMatch[1]) : undefined
    const idMatch = trackHtml.match(/api\.soundcloud\.com\/tracks\/(\d+)/)

    tracks.push({
      id: slug,
      title: oembed.title ?? slug,
      url,
      description: oembed.description ?? null,
      durationSeconds: durationMs ? Math.round(durationMs / 1000) : null,
      soundcloudTrackId: idMatch?.[1] ?? null,
    })
  }

  console.log(JSON.stringify({ username: USERNAME, trackCount: tracks.length, tracks }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
