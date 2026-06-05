'use client';
import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Product } from './types';
import { IrisCursor } from './IrisCursor';
import { GalleryBackground } from './GalleryBackground';
import { GalleryViewport } from './GalleryViewport';
import { ThumbnailCarousel } from './ThumbnailCarousel';
import { GalleryProgress } from './GalleryProgress';

gsap.registerPlugin(ScrollTrigger);

const PRODUCTS: Product[] = [
  {
    productNumber: "01",
    title: "Aurora Lamp",
    subtitle: "Ambient lighting",
    description: "Soft gradient glass with dimmable warm-cool LEDs. Designed for bedside and living spaces.",
    imageSrc: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1200&q=80",
    productUrl: "#product-01",
  },
  {
    productNumber: "02",
    title: "Nord Chair",
    subtitle: "Seating",
    description: "Bent oak frame with woven seat. Lightweight profile that works in dining or studio setups.",
    imageSrc: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=1200&q=80",
    productUrl: "#product-02",
  },
  {
    productNumber: "03",
    title: "Ceramic Vase",
    subtitle: "Decor",
    description: "Hand-thrown stoneware with matte glaze. Holds dried botanicals or stands alone as sculpture.",
    imageSrc: "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=1200&q=80",
    productUrl: "#product-03",
  },
  {
    productNumber: "04",
    title: "Linen Throw",
    subtitle: "Textiles",
    description: "Stone-washed European flax in a relaxed weave. Breathable layer for sofas and beds.",
    imageSrc: "https://images.unsplash.com/photo-1584100936595-c0654b55a2b2?w=1200&q=80",
    productUrl: "#product-04",
  },
  {
    productNumber: "05",
    title: "Studio Desk",
    subtitle: "Furniture",
    description: "Powder-coated steel legs and solid ash top. Cable pass-through and modest footprint.",
    imageSrc: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&q=80",
    productUrl: "#product-05",
  },
  {
    productNumber: "06",
    title: "Copper Kettle",
    subtitle: "Kitchen",
    description: "Hammered body with stay-cool handle. Compatible with induction and gas cooktops.",
    imageSrc: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
    productUrl: "#product-06",
  },
  {
    productNumber: "07",
    title: "Wave Speaker",
    subtitle: "Audio",
    description: "Fabric-wrapped cabinet with room-filling stereo. Bluetooth and aux with 18-hour battery.",
    imageSrc: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=1200&q=80",
    productUrl: "#product-07",
  },
  {
    productNumber: "08",
    title: "Field Watch",
    subtitle: "Accessories",
    description: "Sapphire crystal and automatic movement. Water-resistant case with vegetable-tanned strap.",
    imageSrc: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80",
    productUrl: "#product-08",
  },
  {
    productNumber: "09",
    title: "Clay Planter",
    subtitle: "Garden",
    description: "Terracotta with drainage tray. Sized for herbs on windowsills or patio tables.",
    imageSrc: "https://images.unsplash.com/photo-1485955900006-10f4d024d117?w=1200&q=80",
    productUrl: "#product-09",
  },
  {
    productNumber: "10",
    title: "Merino Rug",
    subtitle: "Flooring",
    description: "Low-pile wool in neutral tones. Non-slip backing for hardwood and tile.",
    imageSrc: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80",
    productUrl: "#product-10",
  },
  {
    productNumber: "11",
    title: "Glass Carafe",
    subtitle: "Serveware",
    description: "Borosilicate with silicone base grip. For water, juice, or cold brew service.",
    imageSrc: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=1200&q=80",
    productUrl: "#product-11",
  },
];

export const ScrollProductGallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState({ activeIndex: 0, progress: 0 });

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: \`+=\${(PRODUCTS.length - 1) * 100}%\`,
      pin: true,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const activeIndex = Math.min(PRODUCTS.length - 1, Math.round(progress * (PRODUCTS.length - 1)));
        setState({ progress, activeIndex });
      }
    });
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen w-full overflow-hidden group-pinned">
      <IrisCursor />
      <GalleryBackground
        currentImage={PRODUCTS[state.activeIndex].imageSrc}
        nextImage={PRODUCTS[state.activeIndex + 1]?.imageSrc || PRODUCTS[0].imageSrc}
        activeLayer={Math.floor(state.progress * 10) % 2}
      />
      <div className="relative z-10 h-full flex items-center px-4 xl:px-10 pb-32">
        <GalleryViewport products={PRODUCTS} progress={state.progress} />
      </div>
      <ThumbnailCarousel products={PRODUCTS} activeIndex={state.activeIndex} />
      <GalleryProgress progress={state.progress} />
    </div>
  );
};
