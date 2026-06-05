import { Product } from './types';
import Image from 'next/image';

interface Props {
  product: Product;
  index: number;
}

export const ProductSlide = ({ product, index }: Props) => (
  <article className="flex-none w-[94vw] xl:w-[76rem] grid grid-cols-[1.2fr_0.8fr] gap-8 items-center min-h-[85vh] xl:min-h-[44rem]">
    <div className="relative aspect-[3/4] max-h-[82vh] xl:max-h-[44rem] w-full overflow-hidden group hover:shadow-2xl transition-shadow duration-500">
      <Image
        src={product.imageSrc}
        alt={product.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-2.5"
        priority={index < 2}
      />
    </div>
    <div className="flex flex-col gap-3 p-1">
      <span className="text-xs font-semibold tracking-widest text-blue-500">{product.productNumber}</span>
      <h2 className="text-2xl md:text-4xl xl:text-5xl font-semibold tracking-tight leading-tight">{product.title}</h2>
      <p className="text-sm text-white/60 uppercase tracking-wide">{product.subtitle}</p>
      <p className="text-sm text-white/60 max-w-[28ch] mt-1">{product.description}</p>
      <a href={product.productUrl} className="mt-4 px-7 py-4 bg-black text-white font-semibold text-sm border border-white/10 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] w-fit group/cta">
        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-blue-700 via-blue-500 to-blue-400 transition-transform duration-500 group-hover/cta:translate-x-0 z-[-1]" />
        View product
      </a>
    </div>
  </article>
);
