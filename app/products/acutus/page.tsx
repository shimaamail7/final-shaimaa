import type { Metadata } from "next"
import { useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import HeroSection from "./hero"
import { HowItWorks } from "@/components/HowItWorks"
import AcutusSeriesSection from "./series-section"
import { ContactSection } from "@/components/contact-section"
import ExpandableCardsSection from '@/components/Dialog'
import EmbeddedGallery from '@/components/EmbeddedGallery'
import DepthGallery from "@/app/gallery/DepthGallery"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "ACUTUS | Optika",
  description:
    "Our exclusive range of premium lenses. Premium lenses solutions across three professional lines, built to the highest standards.",
}

export default function AcutusPage() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    ScrollTrigger.create({
      trigger: galleryRef.current,
      start: "top top",
      end: "+=300%",
      pin: true,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    })
  }, { scope: galleryRef })

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />

      <div ref={galleryRef} className="h-screen w-full overflow-hidden">
        <DepthGallery progress={progress} />
      </div>

      <HowItWorks
        title="How It Works"
        tagline="From Prescription to Patient Seamlessly."
        description="Our end-to-end workflow is engineered to minimize friction, reduce error, and ensure every lens meets the highest standards before it reaches your practice."
        steps={[
          "Order Input",
          "Processing & Validation",
          "Lens Customisation",
          "Production",
          "Delivery",
        ]}
        backgroundColor="#D1D1D1"
        ruleColor="rgba(0,0,0,0.35)"
      />
      <ContactSection />
      <Footer />
    </div>
  )
}
