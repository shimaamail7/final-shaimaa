"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"

interface LenisContextType {
  lenis: Lenis | null
  isReady: boolean
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  isReady: false,
})

export function useLenis() {
  return useContext(LenisContext)
}

interface LenisProviderProps {
  children: ReactNode
  options?: ConstructorParameters<typeof Lenis>[0]
}

export function LenisProvider({ children, options }: LenisProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const [isReady, setIsReady] = useState(false)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
      ...options,
    })

    // Store in state so consumers always get a stable, non-null reference
    setLenis(instance)
    setIsReady(true)

    function raf(time: number) {
      instance.raf(time)
      rafIdRef.current = requestAnimationFrame(raf)
    }

    rafIdRef.current = requestAnimationFrame(raf)

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
      instance.destroy()
      setLenis(null)
      setIsReady(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <LenisContext.Provider value={{ lenis, isReady }}>
      {children}
    </LenisContext.Provider>
  )
}
