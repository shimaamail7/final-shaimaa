"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Loader } from "@/components/loader"
import { ReelIntro } from "@/components/reel-intro"
import { MainLayout } from "@/components/main-layout"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { DifferenceSection } from "@/components/difference-section"
import { PartnersSection } from "@/components/partners-section"
import { DifferencePartnerWrapper } from "@/components/difference-partner-wrapper"

const LensCategoriesSection = dynamic(() => import("@/components/lens-categories-section").then(mod => mod.LensCategoriesSection))
const SolutionsSection = dynamic(() => import("@/components/solutions-section").then(mod => mod.SolutionsSection))
const ProductsTabsSection = dynamic(() => import("@/components/products-tabs-section").then(mod => mod.ProductsTabsSection))
const WorkflowSection = dynamic(() => import("@/components/workflow").then(mod => mod.WorkflowSection))
const PerformanceSection = dynamic(() => import("@/components/performance-section").then(mod => mod.PerformanceSection))
const CommitmentSection = dynamic(() => import("@/components/commitment-section").then(mod => mod.CommitmentSection))
const FaqSection = dynamic(() => import("@/components/faq-section").then(mod => mod.FaqSection))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection))
export default function Home() {
  const [step, setStep] = useState<'checking' | 'loader-only' | 'reel' | 'fading-out' | 'fading-in' | 'hero'>('checking')

  useEffect(() => {
    if (step === 'loader-only' || step === 'checking') {
      document.body.style.overflow = 'hidden'
    } else if (step === 'hero') {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [step])

  useEffect(() => {
    let isMounted = true

    const performWebGLCheck = async () => {
      // Temporarily silence console.error so Three.js doesn't log its internal failure
      const originalConsoleError = console.error
      console.error = (...args) => {
        const msg = args.join(' ')
        if (msg.includes('WebGL')) return // Swallow the specific error
        originalConsoleError.apply(console, args)
      }

      try {
        // Dynamically import THREE so we don't bloat the initial bundle
        const THREE = await import('three')
        const canvas = document.createElement('canvas')
        
        // Instantiate the EXACT renderer that R3F uses.
        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: "default",
        })
        
        // If it succeeds, free the context immediately
        renderer.dispose()
        const ext = renderer.getContext().getExtension('WEBGL_lose_context')
        if (ext) ext.loseContext()
        
        // Restore console.error before proceeding
        console.error = originalConsoleError
        if (isMounted) setStep('reel')
      } catch (e) {
        // Restore console.error before proceeding
        console.error = originalConsoleError
        // The error is safely swallowed. The user never sees the red overlay!
        if (isMounted) setStep('loader-only')
      }
    }

    performWebGLCheck()


    return () => {
      isMounted = false
    }
  }, [])

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
          ${(step === 'fading-out' || step === 'fading-in' || step === 'checking') ? 'opacity-100' : 'opacity-0'}
          ${step === 'fading-out' ? 'duration-700' : 'duration-1000'}
        `}
      />

      {(step === 'reel' || step === 'fading-out') && (
        <ReelIntro onComplete={handleComplete} />
      )}

      {step === 'loader-only' && (
        <Loader onComplete={() => setStep('hero')} />
      )}

      {(step === 'loader-only' || step === 'fading-in' || step === 'hero') && (
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
