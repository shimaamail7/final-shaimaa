export interface Product {
  productNumber: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  productUrl: string;
}

export interface GalleryState {
  activeIndex: number;
  progress: number;
}
