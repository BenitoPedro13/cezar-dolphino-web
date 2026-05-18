import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google"

import "./globals.css"
import { PlausibleAnalytics } from "@/components/analytics/Plausible"
import { SkipLink } from "@/components/layout/SkipLink"
import { JsonLd } from "@/components/seo/JsonLd"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { siteMetadata, siteViewport } from "@/lib/metadata"
import { cn } from "@/lib/utils"

export const metadata = siteMetadata
export const viewport = siteViewport

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn("antialiased", hanken.variable, mono.variable)}
    >
      <body>
        <SkipLink />
        <JsonLd />
        <PlausibleAnalytics />
        <ThemeProvider>
          {children}
          <Toaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
