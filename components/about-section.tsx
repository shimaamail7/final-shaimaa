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
        <div className="flex lg:ml-[58px] items-center justify-center bg-black px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-playfair" >
            {/* Tagline */}
            <p
              className="mb-8 2xl:text-[20px] text-[16px] font-medium leading-[1.36] tracking-[0.11em] text-white/70 font-playfair uppercase"
            >
              We
              <br />
              Help See
              <br />
              Better
            </p>

            {/* Main Heading */}
            <h2
              className="relative z-10 mb-8 font-inter 2xl:text-[64px] text-[40px] font-bold leading-[0.98] tracking-[-0.04em] text-white uppercase"
            >
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
              className="mb-16 max-w-[400px] font-inter 2xl:text-[20px] text-[16px] font-medium leading-[1.5] tracking-[0.02em] text-white/70"
            >
              Optika is a Provider and Distributor of Exclusive and advanced Digital Lenses, Ophthalmic care products, and Premium Eyewear Solutions.
            </p>

            {/* CTA Button */}
            <button
              className="group cursor-pointer inline-flex w-fit items-center gap-3 font-inter text-[20px] font-normal leading-none tracking-normal text-white transition-colors hover:text-white/80 hover:bg-black"
            >
              <span className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center bg-white text-black group-hover:border group-hover:text-white group-hover:bg-black/10  grtransition-transform group-hover:scale-105">
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
