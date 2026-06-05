'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import { Product } from './types';

interface Props {
  products: Product[];
  activeIndex: number;
}

export const ThumbnailCarousel = ({ products, activeIndex }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    if (!track) return;
    const thumbs = track.children;
    if (!thumbs[activeIndex]) return;

    const thumb = thumbs[activeIndex] as HTMLElement;
    const offset = thumb.offsetLeft - (window.innerWidth / 2) + (thumb.offsetWidth / 2);
    gsap.to(track, { x: -offset, duration: 0.35, ease: "power2.out" });
  }, [activeIndex]);

  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-10 z-10 w-[min(92vw,44rem)] h-12 overflow-hidden transition-opacity opacity-0 pointer-events-none group-pinned:opacity-100 group-pinned:pointer-events-auto [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div ref={trackRef} className="flex gap-3 w-max will-change-transform">
        {products.map((p, i) => (
          <button
            key={i}
            className={`w-12 h-12 overflow-hidden border-2 transition-all ${i === activeIndex ? 'border-blue-500 scale-110 opacity-100' : 'border-transparent opacity-45'}`}
          >
            <Image src={p.imageSrc} alt="" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
