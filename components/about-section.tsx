import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-black ">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative min-h-[50vh] w-full lg:min-h-screen">
          <Image
            src="/eyewear-group.jpg"
            alt="Diverse group of people wearing stylish eyeglasses"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex items-center justify-center bg-black px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-playfair" >
            {/* Tagline */}
            <p style={{
              fontFamily: "var(--font-playfair)",
              fontWeight: 400,
            }} className="mb-6 text-white/70 sm:mb-6 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.11em] leading-[135%] font-playfair font-normal">
              We
              <br />
              Help See
              <br />
              Better
            </p>

            {/* Main Heading */}
            <h2 style={{
              fontFamily: "var(--font-inter)",
            }} className="mb-6 relative z-10 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-bold leading-[98%] tracking-[-0.03em] text-white sm:mb-8 md:mb-10">
              EYEWEAR
              <br />
              PRODUCTS AND
              <br />
              OPHTHALMIC
              <br />
              CARE
              <br />
              SOLUTIONS
            </h2>

            {/* Description */}
            <p
              className="mb-8 max-w-[400px] text-white/70 sm:mb-10 lg:mb-12 text-[13px] sm:text-sm lg:text-base leading-[150%] tracking-[0.02em]"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
              }}
            >
              Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.
            </p>

            {/* CTA Button */}
            <button
              className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-white/80 sm:text-base lg:text-[16px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center bg-white text-black transition-transform group-hover:scale-105">
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              <span>Discover Optika</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
