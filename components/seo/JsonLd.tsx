import { siteConfig } from "@/data/site-config"
import { siteUrl } from "@/lib/site"

export function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    name: siteConfig.artistName,
    description: siteConfig.shortBio,
    url: siteUrl,
    genre: ["MPB", "Soul", "Jazz"],
    sameAs: Object.values(siteConfig.social),
    email: siteConfig.contactEmail,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
