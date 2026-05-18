import { Cormorant_Garamond, Lora, Raleway } from "next/font/google"

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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
})

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
})

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
  weight: ["300", "400", "500", "600"],
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
      className={cn(
        "antialiased",
        cormorant.variable,
        lora.variable,
        raleway.variable,
      )}
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
