'use client'

import HeroSection from "./hero"
import { HowItWorks } from "@/components/HowItWorks"
import { ContactSection } from "@/components/contact-section"
import ScrollProductGallery from "@/components/gallery/ScrollProductGallery"
import { Footer } from "@/components/footer"

export default function AcutusClient() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <ScrollProductGallery />
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
