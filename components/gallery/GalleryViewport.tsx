'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Product } from './types';
import { ProductSlide } from './ProductSlide';

interface Props {
  products: Product[];
  progress: number;
}

export const GalleryViewport = ({ products, progress }: Props) => {
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!trackRef.current) return;
    const totalWidth = trackRef.current.scrollWidth;
    const viewportWidth = window.innerWidth;
    const xTranslate = (totalWidth - viewportWidth) * progress;
    gsap.set(trackRef.current, { x: -xTranslate });
  }, [progress]);

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-16 will-change-transform">
        {products.map((p, i) => <ProductSlide key={i} product={p} index={i} />)}
      </div>
    </div>
  );
};
