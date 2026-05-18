/** URL canônica do site (produção). Sobrescreva com NEXT_PUBLIC_SITE_URL na Vercel. */
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://cezardolphino.com"

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${siteUrl}${normalized}`
}
