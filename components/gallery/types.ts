export interface Product {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  href: string;
}

export interface GalleryState {
  activeIndex: number;
  progress: number;
}
