import React from 'react';
import Image from 'next/image';
import ArrowButton from './ArrowButton';
import { useRouter } from 'next/navigation'
 

interface Props {
  id?: string;
  imageSrc: string;
  imageAlt: string;
  tagline: string;
  heading: string;
  description: string;
  buttonLabel: string;
  pageName: string;
  className?: string;
}

const SplitLayoutHero = ({
  id,
  imageSrc,
  imageAlt,
  tagline,
  heading,
  description,
  buttonLabel,
  pageName,
  className = '',
}: Props) => {
  const router = useRouter();

  return (
    <section id={id} className={`relative z-10 w-full bg-black ${className}`} style={{ willChange: 'transform' }}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Left Side - Image */}
        <div className="relative min-h-[50vh] w-full lg:min-h-screen">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            unoptimized
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex lg:ml-[58px] items-center justify-center bg-black px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28">
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-playfair">
            {/* Tagline */}
            <p className="mb-4 md:mb-8 2xl:text-[20px] text-[16px] font-medium leading-[1.36] tracking-[0.11em] text-white/70 font-playfair uppercase whitespace-pre-line">
              {tagline}
            </p>

            {/* Main Heading */}
            <h2 className="relative z-10 mb-4 md:mb-8 font-inter 2xl:text-[64px] text-[40px] font-bold leading-[0.98] tracking-[-0.04em] text-white uppercase whitespace-pre-line">
              {heading}
            </h2>

            {/* Description */}
            <p className="mb-8 md:mb-16 max-w-[400px] font-inter 2xl:text-[20px] text-[16px] font-medium leading-[1.5] tracking-[0.02em] text-white/70">
              {description}
            </p>

            {/* CTA Button */}
            <ArrowButton label={buttonLabel} onClick={() => router.push(`/${pageName}`)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitLayoutHero;
