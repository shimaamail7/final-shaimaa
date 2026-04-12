"use client"

import { useState } from "react"
import { ReelIntro } from "@/components/reel-intro"
import { MainLayout } from "@/components/main-layout"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { DifferenceSection } from "@/components/difference-section"
import { PartnersSection } from "@/components/partners-section"
import { DifferencePartnerWrapper } from "@/components/difference-partner-wrapper"
import { LensCategoriesSection } from "@/components/lens-categories-section"
import { SolutionsSection } from "@/components/solutions-section"
import { ProductsTabsSection } from "@/components/products-tabs-section"
import { WorkflowSection } from "@/components/workflow"
import { PerformanceSection } from "@/components/performance-section"
import { CommitmentSection } from "@/components/commitment-section"
import { FaqSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
export default function Home() {
  const [step, setStep] = useState<'reel' | 'fading-out' | 'fading-in' | 'hero'>('hero')

  const handleComplete = () => {
    // 1. Fade the screen to black
    setStep('fading-out')

    setTimeout(() => {
      // 2. While screen is black, swap components and reset scroll
      window.scrollTo(0, 0)
      setStep('fading-in')

      // 3. Very brief delay to allow React to mount the Hero DOM, then reveal
      setTimeout(() => {
        setStep('hero')
      }, 50)
    }, 1500)
  }

  return (
    <>
      {/* Cinematic Fade Overlay */}
      <div
        className={`pointer-events-none fixed inset-0 z-[100] bg-black transition-opacity ease-in-out
          ${(step === 'fading-out' || step === 'fading-in') ? 'opacity-100' : 'opacity-0'}
          ${step === 'fading-out' ? 'duration-700' : 'duration-1000'}
        `}
      />

      {(step === 'reel' || step === 'fading-out') && (
        <ReelIntro onComplete={handleComplete} />
      )}

      {(step === 'fading-in' || step === 'hero') && (
        <MainLayout>
          <HeroSection />
          <AboutSection />
          <DifferencePartnerWrapper
            difference={<DifferenceSection />}
            partner={<PartnersSection />}
          />
          <LensCategoriesSection />
          <SolutionsSection />
          <ProductsTabsSection />
          <WorkflowSection />
          <PerformanceSection />
          <CommitmentSection />
          <FaqSection />
          <ContactSection />

        </MainLayout>
      )}
    </>
  )
}
