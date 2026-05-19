import type { Metadata } from "next"
import HeroSection from "./hero"
import AcutusHowItWorksSection from "./how-it-works-section"
import AcutusSeriesSection from "./series-section"
import { ContactSection } from "@/components/contact-section"
import ExpandableCardsSection from '@/components/Dialog'
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "ACUTUS | Optika",
  description:
    "Our exclusive range of premium lenses. Premium lenses solutions across three professional lines, built to the highest standards.",
}  

export default function AcutusPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <ExpandableCardsSection />

      <AcutusHowItWorksSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
