import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-sections"
import { ProductFilter } from "@/components/product-filter"
import { AcutusSection } from "@/components/acutus-section"
import { AcutusDescription } from "@/components/acutus-description"
import { ProductGrid } from "@/components/product-grid"
import { SingleVisionSection } from "@/components/single-vision-section"
import { TransitionSection } from "@/components/transition-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <HeroSection />
      <ProductFilter />
      <AcutusSection />
      <AcutusDescription />
      <ProductGrid />
      <SingleVisionSection />
      <TransitionSection /> <ContactSection /> <Footer />
    </main>
  )
}
