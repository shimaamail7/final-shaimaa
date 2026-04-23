"use client"

import { useState, useEffect, useCallback } from "react"
import dynamic from "next/dynamic"
import { SnapScrollProvider } from "@/lib/snap-scroll-context"
import { Loader } from "@/components/loader"

import { PhilosophySection } from "@/components/philosophy-section"
import { CraftSection } from "@/components/craft-section"
import { InnovationSection } from "@/components/innovation-section"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { Logo } from "@/components/logo"
import { WebGLErrorBoundary } from "@/components/webgl-error-boundary"

const GlassesCanvas = dynamic(
  () => import("@/components/glasses-model").then((mod) => mod.GlassesCanvas),
  { ssr: false }
)

function MainContent({ isReady, onComplete }: { isReady: boolean; onComplete: () => void }) {
  return (
    <main id="main-scroll-container" style={{ backgroundColor: "#000000" }}>
      {/* Global black gradient for Philosophy and Innovation */}
      <div id="global-gradient-bg-dark" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ width: '100%', height: '100vh' }}>
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(0, 0, 0)"
          gradientBackgroundEnd="rgb(0, 0, 0)"
          firstColor="221, 74, 255"
          secondColor="221, 74, 255"
          thirdColor="200, 50, 50"

          pointerColor="140, 100, 255"
          blendingValue="screen"
          interactive={false}
        />
      </div>

      {/* Global beige gradient for Craft */}
      <div id="global-gradient-bg-light" className="pointer-events-none fixed inset-0 z-0 overflow-hidden" style={{ width: '100%', height: '100vh', opacity: 0 }}>
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(252, 245, 226)"
          gradientBackgroundEnd="rgb(252, 245, 226)"
          firstColor="180, 100, 255"
          secondColor="255, 120, 80"
          thirdColor="180, 100, 255"
          fourthColor="180, 100, 255"
          pointerColor="140, 100, 255"
          blendingValue="hard-light"
          interactive={false}
        />
      </div>

      {/* Logo */}
      <div className="fixed flex items-center h-16 justify-between w-full  gap-6 top-8 px-6 z-50 md:px-10 lg:px-16 pointer-events-auto">
        <a href="/" aria-label="Home">
          <Logo className="w-20 md:w-28 gs-dynamic-text" fill="currentColor" />
        </a>

        <button
          onClick={onComplete}
          className="font-inter text-xs uppercase tracking-[0.15em] transition-colors duration-300 border border-current px-4 py-1    gs-dynamic-text"
          style={{ color: "currentColor", borderColor: "currentColor" }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = "0.7"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = "1"
          }}
          aria-label="Skip to website"
        >
          Skip
        </button>
      </div>

      <div className="relative" id="philosophy">
        <div className="pointer-events-none fixed left-0 top-0 z-30 h-screen w-full">
          <WebGLErrorBoundary onError={onComplete}>
            <GlassesCanvas
              isVisible={isReady}
              className="h-full w-full"
            />
          </WebGLErrorBoundary>
        </div>

        <PhilosophySection />
      </div>

      <div className="relative" id="craft">
        <CraftSection />
      </div>

      <div className="relative" id="innovation">
        <InnovationSection onComplete={onComplete} />
      </div>

    </main>
  )
}

export function ReelIntro({ onComplete }: { onComplete: () => void }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isScrollLocked, setIsScrollLocked] = useState(true)

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual"
      window.scrollTo(0, 0)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isLoading ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isLoading])

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleReady = useCallback(() => {
    setShowContent(true)
    const lockDuration = window.innerWidth < 768 ? 2400 : 4200
    setTimeout(() => setIsScrollLocked(false), lockDuration)
  }, [])

  return (
    <>
      {isLoading && <Loader onComplete={handleLoadingComplete} onReady={handleReady} />}

      <SnapScrollProvider stageCount={3} locked={isScrollLocked}>
        <div className={`transition-opacity duration-500 ${showContent ? "opacity-100" : "opacity-0"}`}>
          <MainContent isReady={showContent} onComplete={onComplete} />
        </div>
      </SnapScrollProvider>
    </>
  )
}
