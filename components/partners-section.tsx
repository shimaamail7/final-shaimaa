import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function PartnersSection() {
  return (
    <section className="w-full">
      <div className="grid h-screen grid-cols-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1">
        {/* Left Side - Content */}
        <div className="flex items-center justify-center bg-black px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            {/* Tagline */}
            <p
              className="mb-6 sm:mb-6 lg:mb-10 text-white/70 text-[9px] sm:text-[10px] lg:text-xs tracking-[0.11em] leading-[135%] font-playfair font-normal"
              style={{ fontFamily: "var(--font-playfair)", fontWeight: 400 }}
            >
              Hello Head
              <br />
              Safe you
              <br />
              Achieve
            </p>

            {/* Main Heading */}
            <h2
              className="mb-6 sm:mb-8 lg:mb-10 relative z-10 text-[32px] sm:text-[40px] md:text-[48px] lg:text-[52px] xl:text-[56px] font-bold leading-[98%] tracking-[-0.03em] text-white"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              PARTNERS
              <br />
              INTEGRATED
              <br />
              SOLUTIONS
            </h2>

            {/* Description */}
            <p
              className="mb-8 max-w-sm sm:mb-10 md:max-w-md lg:mb-12 text-white/70 text-[13px] sm:text-sm lg:text-base leading-[150%] tracking-[0.02em]"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 400 }}
            >
              Optika supports hundreds and here holds units, ophthalmologists, low vision and vision and integrated specialists. Let Optika be your partner for distribution, marketing, and clinical support, opening new pathways from head safe until your patients live life better.
            </p>

            {/* CTA Button */}
            <button
              className="group inline-flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-white/80 sm:text-base lg:text-[16px]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              <span className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded border border-white/30 transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
                <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </span>
              <span>Discover Our Programs</span>
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="relative min-h-[50vh] w-full lg:min-h-screen">
          <Image
            src="/partner.jpg"
            alt="Team collaborating in a modern office space with warm lighting"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
