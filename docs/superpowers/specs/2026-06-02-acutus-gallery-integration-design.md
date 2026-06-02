# Design Spec: Acutus Gallery Integration
Date: 2026-06-02
Status: Draft

## 1. Overview
Integrate the `DepthGallery` 3D experience as a seamless, pinned section within the Acutus product page (`app/products/acutus/page.tsx`). The goal is to transition the gallery from a standalone page to a controlled section where the user's vertical page scroll drives the 3D depth animation.

## 2. Architecture Shift: Controlled Component
The `DepthGallery` component will be refactored from a "Self-Driving" model to a "Controlled" model.

### 2.1 Refactoring `DepthGallery.tsx`
- **Input Removal**: Remove all internal window listeners for `wheel`, `touchstart`, and `touchmove`.
- **Progress Prop**: Introduce a `progress` prop (range `0.0` to `1.0`).
- **Animation Loop Update**: 
    - The `scrollCurrent` and `scrollTarget` internal state will be replaced by the `progress` prop.
    - The camera position will be calculated as: 
      `camera.position.z = lerp(maxCameraZ, minCameraZ, progress)`
    - Other depth-dependent effects (plane visibility, label updates, background mood) will now trigger based on this synchronized `progress` value.

## 3. Page Integration & Pinning
The gallery will be embedded into the Acutus page flow using GSAP `ScrollTrigger`.

### 3.1 `GallerySection` Wrapper
A new wrapper component (or a section within `AcutusPage`) will manage the pinning and progress tracking.

### 3.2 GSAP Configuration
- **Trigger**: The `GallerySection` element.
- **Start**: `"top top"` (pins when the section reaches the top of the viewport).
- **End**: `"+=300%"` (defines a scroll duration of 3 viewport heights).
- **Pin**: `true` (fixes the gallery in place during the transition).
- **Scrub**: `true` or a small value (e.g., `0.1`) to ensure the 3D movement feels smooth and tied to the scrollbar.

### 3.3 Progress Bridge
Using `useGSAP`, we will track the `ScrollTrigger`'s `progress` value and pass it into the `DepthGallery` component as a prop.

## 4. Visual & UX Refinements
- **Transition Fades**: Implement smooth opacity transitions for labels and background overlays as the user enters and exits the gallery section.
- **Z-Curve Easing**: Apply a slight easing function to the `progress` value before passing it to the camera to make the transition between lenses feel more organic.
- **Responsive Calibration**: Maintain existing responsive logic (`isMobile`, `MOBILE_SCALE`) but ensure the `PLANE_GAP` is optimized for the pinned viewport.

## 5. Success Criteria
- [ ] User can scroll from Hero $\rightarrow$ Gallery $\rightarrow$ HowItWorks without any jumps or "scroll-jacking" feel.
- [ ] The 3D depth animation is perfectly synced with the page scroll.
- [ ] All 11 lenses in the gallery are traversed during the 300% scroll distance.
- [ ] Responsive behavior is preserved across mobile and desktop.
- [ ] No console errors or memory leaks from redundant event listeners.
