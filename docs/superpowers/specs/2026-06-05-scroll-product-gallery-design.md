---
name: scroll-product-gallery-conversion
description: High-fidelity conversion of a vanilla JS scroll gallery to a Next.js component for the Acutus page.
metadata:
  date: 2026-06-05
  type: design-spec
---

# Design Spec: Scroll Product Gallery Conversion

## 1. Purpose & Scope
Convert a high-end, vanilla JavaScript product gallery into a production-grade Next.js component. The gallery features a vertical-scroll-to-horizontal-drive mechanism, an organic "iris" cursor, synchronized thumbnail navigation, and atmospheric background crossfading.

This component will replace the `DepthGallery` in `app/products/acutus/AcutusClient.tsx`.

## 2. Architecture

### 2.1 Component Decomposition
To adhere to SRP and the 15-line function limit, the system is split into:

- **`ScrollProductGallery`**: The orchestrator. Manages `ScrollTrigger` for pinning and drives the overall progress.
- **`IrisCursor`**: A singleton overlay handling mouse tracking and LERP-based movement.
- **`GalleryViewport`**: Manages the horizontal translation of the product track.
- **`ProductSlide`**: Presentational component for individual products.
- **`ThumbnailCarousel`**: A centered, sliding navigation bar that synchronizes with the active slide.
- **`GalleryBackground`**: A dual-layer background system for seamless crossfading of blurred product images.
- **`GalleryProgress`**: A minimal progress indicator linked to the overall scroll progress.

### 2.2 Data Flow
- **State**: A central `activeIndex` and `scrollProgress` (0 to 1) derived from `ScrollTrigger`.
- **Updates**: `ScrollProductGallery` $\rightarrow$ `useGSAP` $\rightarrow$ updates state $\rightarrow$ triggers animations in `GalleryViewport` and `ThumbnailCarousel`.

## 3. Implementation Details

### 3.1 Animation Strategy (GSAP)
- **Pinning**: Use `ScrollTrigger.create` with `pin: true` and an end value of `+=[slideCount * 100]%` to create the vertical-to-horizontal bridge.
- **Track Movement**: The `.gallery-track` will be translated via `xPercent` or `x` based on the total width of all slides minus the viewport.
- **LERP Cursor**: The `IrisCursor` will use a `gsap.ticker` loop to implement linear interpolation:
  - `currentPos += (targetPos - currentPos) * 0.22`
  - This ensures a smooth, organic follow-effect.

### 3.2 Visual Fidelity
- **Color Palette**:
  - Background: `#0c0c0e`
  - Text: `#f4f4f5`
  - Primary Accent (Blue): `#3b82f6`
  - Secondary Accent (Gold): `#e8d5b5`
- **Effects**:
  - Background layers: `filter: blur(48px) saturate(1.2)` with `opacity: 0.55`.
  - Cursor Gradient: Radial gradient from `#60a5fa` $\rightarrow$ `#3b82f6` $\rightarrow$ `#2563eb`.
- **Motion**: All transitions will use `cubic-bezier(0.22, 1, 0.36, 1)` to maintain a high-end "luxury" feel.

## 4. Constraints & Requirements
- **Performance**: Use `next/image` for all product assets with appropriate `priority` for the first two slides.
- **Responsiveness**: Maintain the original's `clamp` values for font sizes and slide widths.
- **Accessibility**: Use `aria-label` on thumbnails and ensure the iris cursor is `aria-hidden="true"`.
- **Clean Code**: 
  - Explicit `interface Props` for every component.
  - No function exceeding 15 lines.
  - Use guard clauses for all edge cases.
