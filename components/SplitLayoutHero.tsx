"use client";

import React from 'react';
import Image from 'next/image';
import ArrowButton from './ArrowButton';
import { useRouter } from 'next/navigation';
import Tagline from './Tagline';
import Headline from './Headline';
import Description from './Description';

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
  reverseLayout?: boolean;
  contentClassName?: string; textSize?: string;
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
  reverseLayout = false,
  contentClassName = '',
  textSize = 'text-[40px]',
}: Props) => {
  const router = useRouter();

  const defaultSpacing = "lg:ml-[58px] px-6 py-16 sm:px-8 sm:py-20 md:px-12 md:py-24 lg:px-16 lg:py-0 xl:px-20 2xl:px-28";
  const wrapperClass = contentClassName || defaultSpacing;

  return (
    <section id={id} className={`relative z-10 w-full bg-black ${className}`} style={{ willChange: 'transform' }}>
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
        {/* Image Side */}
        <div className={`relative min-h-[50vh] w-full lg:min-h-screen ${reverseLayout ? 'lg:order-2' : ''}`}>
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

        {/* Content Side */}
        <div className={`flex items-center justify-center bg-black ${reverseLayout ? 'lg:order-1' : ''} ${wrapperClass}`}>
          <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl font-playfair">
            {/* Tagline */}
            <Tagline theme="dark" className="whitespace-pre-line font-medium leading-[1.36]">
              {tagline}
            </Tagline>

            {/* Main Heading */}
            <Headline as="h2" theme="dark" className="whitespace-pre-line tracking-[-0.04em]">
              {heading}
            </Headline>

            {/* Description */}
            <Description theme="dark" maxWidth="max-w-[400px]" className="mb-8 md:mb-16 font-medium">
              {description}
            </Description>

            {/* CTA Button */}
            <ArrowButton label={buttonLabel} onClick={() => router.push(`/${pageName}`)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SplitLayoutHero;
