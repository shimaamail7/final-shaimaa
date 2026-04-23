import { Footer } from "@/components/footer"
import { Navigation } from "./navigation"
import { LenisProvider } from "@/lib/lenis-context"

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <LenisProvider>
      <div className="relative min-h-screen w-full bg-[#f5f5f5]  overflow-hidden ">
        <Navigation />
        <main>{children}</main>
        <Footer />
      </div>
    </LenisProvider>
  )
}
