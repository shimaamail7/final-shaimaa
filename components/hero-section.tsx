import React from 'react';
import { ArrowDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import gsap from 'gsap';
import ArrowButton from './ArrowButton';

interface HeroProps {
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
  eyebrowText: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaHref: string;
  heroSpacer?: boolean;
  ctaClassName?: string;
  textAlign?: 'left' | 'center' | 'right';
}

const HeroBackground = ({ src, alt, position }: { src: string; alt: string; position: string }) => (
  <div className="absolute inset-0 z-0">
    <Image
      src={src}
      alt={alt}
      style={{ objectPosition: position }}
      fill
      className="object-cover"
      priority
      unoptimized
    />
  </div>
);

const HeroSpacer = () => <div className="hidden lg:block" />;

const HeroTextContent = ({
  eyebrowText,
  title,
  description,
  ctaText,
  ctaHref,
  ctaClassName,
  textAlign,
}: Omit<HeroProps, 'imageSrc' | 'imageAlt' | 'imagePosition' | 'heroSpacer'>) => {
  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[textAlign || 'left'];

  return (
    <div className="z-10 flex flex-col justify-center py-8 md:py-0 pl-0 lg:pl-16 lg:py-0">
      <div className={textAlignClass}>
        {eyebrowText && <HeroEyebrow text={eyebrowText} />}
        {title && <HeroTitle>{title}</HeroTitle>}
        {description && <HeroDescription text={description} />}
      </div>
      {ctaText && ctaHref && <HeroCTA text={ctaText} href={ctaHref} className={ctaClassName} />}
    </div>
  );
};

const HeroEyebrow = ({ text }: { text: string }) => (
  <p className="font-playfair text-[10px] md:text-[12px] 2xl:text-[14px] font-normal leading-[1.35] tracking-[0.11em] uppercase mb-4 2xl:mb-8 text-[var(--text-dark)]/70">
    {text}
  </p>
);

const HeroTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="font-inter text-[32px] md:text-[40px] 2xl:text-[64px] font-bold leading-[0.98] tracking-[-0.03em] uppercase mb-4 2xl:mb-8 relative z-10 text-[var(--text-dark)]">
    {children}
  </h1>
);

const HeroDescription = ({ text }: { text: string }) => (
  <p className="font-inter text-[13px] md:text-[16px] 2xl:text-[20px] font-normal leading-[1.5] tracking-[0.02em] mb-8 2xl:mb-8 max-w-md md:max-w-lg lg:max-w-md xl:max-w-lg text-[var(--text-dark)]/70">
    {text}
  </p>
);

const HeroCTA = ({ text, href, className }: { text: string; href: string; className?: string }) => {
  return (
    <ArrowButton
      label={text}
      href={href}
      icon={ArrowDown}
      variant="dark"
      className={className}
    />
  );
};

export function HeroSection({ config = {} }: { config?: Partial<HeroProps> }) {
  const defaultConfig: Required<HeroProps> = {
    imageSrc: '/hero.jpg',
    imageAlt: 'Premium optical lenses showcasing modern eyecare technology',
    imagePosition: '50% 20%',
    eyebrowText: 'Exceptional Optical Solutions',
    title: (
      <>
        HIGH-END
        <br />
        LENSES
        <br />
        FOR MODERN
        <br />
        EYECARE
      </>
    ),
    description: 'Optika delivers to you Premium Digital Lenses and Solutions manufactured to the highest standards.',
    ctaText: 'Learn More',
    ctaHref: '#about',
    heroSpacer: false,
    ctaClassName: '',
    textAlign: 'left',
  };

  const props = { ...defaultConfig, ...config };

  return (
    <section className="lg:px-24 2xl:px-48 relative min-h-screen 2xl:min-h-[70vh] 2xl:h-[70vh] w-full">
      <HeroBackground src={props.imageSrc} alt={props.imageAlt} position={props.imagePosition} />
      <div className="relative mx-auto flex min-h-screen items-end 2xl:items-center 2xl:pt-40 ml-0 px-0 sm:px-8 md:px-16 lg:px-24 xl:px-32 2xl:px-40" style={{ bottom: '15vh' }}>
        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-2">
          {props.heroSpacer && <HeroSpacer />}
          <HeroTextContent
            eyebrowText={props.eyebrowText}
            title={props.title}
            description={props.description}
            ctaText={props.ctaText}
            ctaHref={props.ctaHref}
            ctaClassName={props.ctaClassName}
            textAlign={props.textAlign}
          />
        </div>
      </div>
    </section>
  );
}
