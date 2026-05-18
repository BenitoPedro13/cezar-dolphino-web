import { ImageResponse } from "next/og"

import { siteConfig } from "@/data/site-config"

export const alt = `${siteConfig.artistName} — ${siteConfig.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(160deg, #1f1b16 0%, #3d3830 45%, #2a241c 100%)",
          color: "#e8dcc8",
          fontFamily: "Georgia, 'Times New Roman', serif",
          padding: 48,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "0.06em",
            textAlign: "center",
          }}
        >
          {siteConfig.artistName}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 28,
            opacity: 0.88,
            textAlign: "center",
            maxWidth: 900,
          }}
        >
          {siteConfig.tagline}
        </div>
      </div>
    ),
    { ...size },
  )
}
