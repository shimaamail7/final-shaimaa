import { ArrowRight } from "lucide-react"
import Image from "next/image"

export function PartnersSection() {
  return (
    <section id="partners" className="relative z-30 w-full bg-black" style={{ willChange: "transform" }}>
      <div className="grid h-screen grid-cols-1 grid-rows-2 lg:grid-cols-2  lg:grid-rows-1">
        {/* Left Side - Content */}
        <div className="flex items-center ml-26  h-screen  content-center-safe justify-center  py-16  sm:py-20 md:py-24  lg:py-0  2xl:ml-50">
          <div className="w-full max-w-md  h-screen flex flex-col justify-center   self-center  lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl">
            {/* Tagline */}
            <p
              className="mb-8 font-playfair 2xl:text-[20px] lg:text-[16px] font-medium uppercase leading-[1.36] tracking-[0.11em] text-white/70"
            >
              Hello Head
              <br />
              Safe you
              <br />
              Achieve
            </p>

            {/* Main Heading */}
            <h2
              className="relative z-10 mb-8 font-inter 2xl:text-[64px] text-[40px] lg:text-[48px] font-bold uppercase leading-[0.98] tracking-[-0.04em] text-white"
            >
              PARTNERS
              <br />
              INTEGRATED
              <br />
              SOLUTIONS
            </h2>

            {/* Description */}
            <p
              className="mb-16 max-w-[400px] font-inter text-[20px] lg:text-[16px] font-medium leading-[1.5] tracking-[0.02em] text-white/70"
            >
              Optika supports hundreds and here holds units, ophthalmologists, low vision and vision and integrated specialists. Let Optika be your partner for distribution, marketing, and clinical support, opening new pathways from head safe until your patients live life better.
            </p>

            {/* CTA Button */}
            <button
              className="group cursor-pointer inline-flex w-fit items-center gap-3 font-inter text-[20px] font-normal leading-none tracking-normal text-white transition-colors hover:text-white/80"
            >
              <span className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center  border border-white/30 transition-all group-hover:border-white group-hover:bg-white group-hover:text-black">
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
            priority
          />
        </div>
      </div>
    </section>
  )
}