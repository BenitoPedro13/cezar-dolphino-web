import { ScrollProgress } from "@/components/motion/ScrollProgress"
import { AppChrome } from "@/components/layout/AppChrome"
import { Footer } from "@/components/layout/Footer"
import { Header } from "@/components/layout/Header"
import { AboutSection } from "@/components/sections/AboutSection"
import { ContactSection } from "@/components/sections/ContactSection"
import { HeroSection } from "@/components/sections/HeroSection"
import { InfluencesSection } from "@/components/sections/InfluencesSection"
import { MarqueeStrip } from "@/components/sections/MarqueeStrip"
import { MoonPhaseSection } from "@/components/sections/MoonPhaseSection"
import { MusicSection } from "@/components/sections/MusicSection"
import { NewsletterSection } from "@/components/sections/NewsletterSection"
import { ShowsSection } from "@/components/sections/ShowsSection"
import { SupportSection } from "@/components/sections/SupportSection"

export default function Page() {
  return (
    <AppChrome>
      <ScrollProgress />
      <Header />
      <main className="min-h-svh bg-background text-foreground">
        <HeroSection />
        <MarqueeStrip />
        <MusicSection />
        <MoonPhaseSection />
        <AboutSection />
        <InfluencesSection />
        <ShowsSection />
        <SupportSection />
        <NewsletterSection />
        <ContactSection />
      </main>
      <Footer />
    </AppChrome>
  )
}
