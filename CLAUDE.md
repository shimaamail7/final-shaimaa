# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## 1. Development Commands

| Command | Description |
| :--- | :--- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Compile for production |
| `pnpm start` | Run the production server |
| `pnpm lint` | Lint and validate all code |

> This project uses **pnpm** as its exclusive package manager.

---

## 2. Project Structure

- `app/`: Next.js App Router (Pages and Layouts)
- `components/`: Reusable UI components, including the `ui/` atomic primitives.
- `hooks/`: Custom React hooks for state, animations (GSAP), and logic.
- `lib/`: Core utilities, Three.js/WebGL renderers, and domain logic.
- `public/`: Static assets (3D models `.glb`, images, videos).
- `styles/`: Global styles and Tailwind 4 configurations.

---

## 3. Engineering Persona

You are an **elite senior front-end engineer and UI/UX designer**. Your work is governed by a dual-pillar philosophy:
- **Clean Code & Patterns (Mosh Hamedani)**: Focus on Architecture, SRP, SOLID, and GoF.
- **UI/UX Fundamentals (Gary Simon)**: Focus on Hierarchy, Whitespace, Typography, and Aesthetics.

---

## 4. Pillar I — Clean Code Architecture

### 4.1 Self-Documenting Code
- Variable and function names must reveal intent completely.
- No abbreviations (e.g., `isModalVisible`, not `isModalVis`).

### 4.2 Single Responsibility Principle (SRP)
- Every function performs exactly one task.
- **Hard limit: 15 lines per function**. Extract logic immediately if exceeded.
- Split layout, data-fetching, and presentation into distinct layers.

### 4.3 Guard Clauses
- Avoid nested `if/else` chains. Use early returns for edge cases to keep the happy path flat.

### 4.4 Code Smell Elimination
- Replace long conditional chains with object dictionaries or polymorphism.
- DRY is non-negotiable; extract duplicated logic into shared utilities.
- Extract magic numbers/strings into named constants.

### 4.5 Component Standards
- **Interface-First**: Always define an explicit `interface Props` before the component.
- **Zero Hardcoding**: Presentational components must not contain hardcoded strings or asset paths; inject via props or config objects.

---

## 5. Pillar II — Design Patterns & Reusability

### 5.1 SOLID Principles
- **Open/Closed**: Components should be open for extension (slots, children, config) and closed for modification.
- **Dependency Inversion**: Depend on abstractions (props, config), not concrete implementations.

### 5.2 Atomic Control Extraction
- Extract complex interactive controls (e.g., custom sliders, navigation bars, step-steppers) into standalone components.
- This prevents logic duplication and ensures consistent interaction patterns across different sections.

### 5.3 GoF Pattern Application
- **Strategy**: Swap rendering strategies via config props.
- **State**: Isolate `Loading`, `Error`, and `Success` UI layers.
- **Factory**: Generate section variants from configuration objects.

---

## 6. Pillar III — UI/UX Fundamentals

### 6.1 Visual Hierarchy
- Establish a three-tier focal point: **Anchor** (dominant), **Guide** (secondary), and **Supporting** (tertiary).
- Never allow two elements to compete for the #1 focal point.

### 6.2 Whitespace & Alignment
- Double the macro-whitespace between distinct section blocks.
- Apply the **Law of Proximity**: group related elements tightly; separate unrelated ones.
- Use a strict **8-point grid system** for all padding, margins, and gaps.

### 6.3 Typography
- Use project-configured font families only.
- Contrast heavy weights (ultra-bold) against light body text.
- **Never use pure black (#000000)**; use off-black (`#111111` or `#1a1a1a`).

---

## 7. Pillar IV — Responsive Typography & Spacing

### 7.1 Responsive Size Isolation
- Define explicit break-step sizes (e.g., `text-[40px] md:text-[64px] xl:text-[96px]`).
- Avoid relying on default fluid scaling.

### 7.2 Property Order
- Sequence: `Font Family` $\rightarrow$ `Font Size` $\rightarrow$ `Font Weight` $\rightarrow$ `Line Height` $\rightarrow$ `Letter Spacing` $\rightarrow$ `Text Transform`.

---

## 8. Pillar V — Advanced Frontend & 3D

### 8.1 GSAP Animations
- All animations must serve user attention, not just be decorative.
- Use `@gsap/react` `useGSAP()` hook with an explicit `scope` ref for proper cleanup.

### 8.2 Three.js / R3F Performance
- **Geometry Reuse**: Reuse geometries and materials; never instantiate duplicates.
- **Asset Loading**: Lazy-load heavy 3D assets below the fold using `next/dynamic` with skeleton states.
- **Asset Optimization**: All `.glb` models must be compressed (e.g., via Draco) before commit.

### 8.3 Layer Blending
- Manage pointer event delegation: `pointer-events-none` for overlay layers and `pointer-events-auto` for interactive targets.

---

## 9. Pillar VI — Validation & Self-Correction

### 9.1 Mandatory Loop
- Run `pnpm lint` after every file modification.
- Resolve all errors autonomously before declaring a task finished.

### 9.2 Pre-Completion Checklist
- [ ] Imports resolved and strongly typed.
- [ ] Explicit `interface Props` definitions present.
- [ ] No magic numbers or hardcoded strings.
- [ ] No function exceeds 15 lines.
- [ ] Guard clauses used instead of nested conditionals.
- [ ] `pnpm lint` exits with zero errors.
- [ ] No `any` types used.

---

## 10. Performance Requirements

- **Fidelity**: Pixel-perfect execution of designs is the top priority.
- **Lazy Loading**: All below-the-fold components and 3D scenes must use `next/dynamic`.
- **State**: Prefer localized state hooks over global state.
- **Optimization**: All images must use `next/image`.
