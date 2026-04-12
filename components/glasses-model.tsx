"use client"

import React, { useRef, useLayoutEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, Center } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MODEL_URL = "/AkshtaS%20spetcs2.glb";

// Start fetching the model as soon as the JS module loads (before the
// component even mounts inside the Canvas) — removes the model download
// from the blocking critical path.
useGLTF.preload(MODEL_URL);

// Smooth lerp helper
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// Sine easing for buttery smooth target velocity changes instead of linear stopping
const ease = (x: number) => -(Math.cos(Math.PI * x) - 1) / 2;

function Model({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const { scene } = useGLTF(MODEL_URL);
  const [scale, setScale] = React.useState(0.45);

  useLayoutEffect(() => {
    const handleResize = () => setScale(window.innerWidth < 768 ? 0.25 : 0.45);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useLayoutEffect(() => {
    scene.traverse((child: any) => {
      // Keep the original dark premium styling for the frames, but apply the user's lens material if found
      if (child.isMesh) {
        if (child.material && child.material.name === 'lens') {
          // Transparent glass material requested by the user
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color('#eff1fc'),
            metalness: 0.9,
            roughness: 0.05,
            envMapIntensity: 2.5,
            transparent: true,
            opacity: 0.25,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            side: THREE.DoubleSide,
            depthWrite: false
          });
        } else {
          // Apply premium dark material to the frames like before
          const mat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(0x2a2a3a),
            metalness: 0.85,
            roughness: 0.2,
            envMapIntensity: 1.8,
          });
          child.material = mat;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      }
    });
  }, [scene]);

  return (
    <group ref={groupRef} dispose={null}>
      <Center>
        <primitive object={scene} scale={scale} />
      </Center>
    </group>
  );
}

function Scene({ isVisible }: { isVisible?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const fillRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);

  // Target values that GSAP will update based on scroll
  const target = useRef({
    px: -7, py: 1.5, pz: -3,
    rx: 0.4, ry: 0.7, rz: 0,
  });

  const introDone = useRef(false);
  const scrollProgressRef = useRef(0);

  // useFrame: runs every render frame — lerps model toward target
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const m = groupRef.current;
    const t = target.current;

    const DAMPING = 0.02;
    const alpha = 1 - Math.pow(1 - DAMPING, delta * 60);

    m.position.x = lerp(m.position.x, t.px, alpha);
    m.position.y = lerp(m.position.y, t.py, alpha);
    m.position.z = lerp(m.position.z, t.pz, alpha);
    m.rotation.x = lerp(m.rotation.x, t.rx, alpha);
    m.rotation.y = lerp(m.rotation.y, t.ry, alpha);
    m.rotation.z = lerp(m.rotation.z, t.rz, alpha);

    // Extra visual smoothness: tiny ambient floating breathing effect
    // Stop floating entirely during the core Craft and Innovation reading phases
    if ((scrollProgressRef.current < 0.4 || scrollProgressRef.current > 0.6) && scrollProgressRef.current < 0.9) {
      m.position.y += Math.sin(Date.now() * 0.001) * 0.0005;
    }
  });

  useLayoutEffect(() => {
    // ---- Intro Animation (Time-based, on load) ----

    // Initial states for Philosophy texts (hidden left)
    gsap.set('.gs-scene-1-title', { opacity: 0, x: -50 });

    gsap.set('.gs-scene-1-p', { opacity: 0, x: -50 });
    gsap.set('.gs-scene-1-scroll', { opacity: 0, y: 50 });

    // Hidden states for others
    gsap.set('.gs-scene-2-title', { opacity: 0, y: 50 });
    gsap.set('.gs-scene-2-p', { opacity: 0, y: 50 });
    gsap.set('.gs-scene-3-title', { opacity: 0, y: 50 });
    gsap.set('.gs-scene-3-sub', { opacity: 0, y: 50 });
    gsap.set('.gs-scene-3-p', { opacity: 0, y: 50 });



    if (!isVisible) return;

    const isMobile = window.innerWidth < 768;
    const philoPx = isMobile ? -.5 : -1.2;
    const philoPy = isMobile ? -.5 : 0;
    const innovPx = isMobile ? 0.5 : -1;
    const innovPy = isMobile ? 0 : 0;

    // 1. Animate model in from left to center
    // Mobile: shorter duration so the experience feels instant
    const introDuration = isMobile ? 1.2 : 2.5;
    const textDelay = isMobile ? 1.4 : 3.0;
    const textDuration = isMobile ? 0.7 : 1.2;

    gsap.to(target.current, {
      px: philoPx, py: philoPy, pz: 1,
      rx: 0, ry: 0.9, rz: 0,
      duration: introDuration,
      ease: "power3.inOut",
      onComplete: () => { introDone.current = true; }
    });

    // 2. Animate texts in — delay is tuned per device so text arrives right as model settles
    gsap.to(['.gs-scene-1-title', '.gs-scene-1-p'], {
      opacity: 1, x: 0,
      duration: textDuration,
      stagger: 0.12,
      ease: "power3.out",
      delay: textDelay
    });
    gsap.to('.gs-scene-1-scroll', {
      opacity: 0.6, y: 0,
      duration: textDuration,
      delay: textDelay,
      ease: "power3.out"
    });

    // ---- Scroll Timeline ----
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.0,
        onUpdate: (self) => {
          const p = self.progress;
          scrollProgressRef.current = p;

          // Abort intro animation if user starts scrolling immediately
          if (p > 0) introDone.current = true;
          if (!introDone.current) return;

          // Resting Philosophy (0 -> 0.1)
          if (p < 0.1) {
            target.current.px = philoPx;
            target.current.py = philoPy;
            target.current.pz = 1;
            target.current.rx = 0;
            target.current.ry = 0.9;
          }
          // Segment 1: Philosophy -> Craft (0.1 -> 0.4)
          else if (p < 0.4) {
            const t = ease((p - 0.1) / 0.3);
            target.current.px = lerp(philoPx, 0, t);
            target.current.py = lerp(philoPy, -0.8, t);
            target.current.pz = lerp(1, 0.5, t);
            target.current.rx = lerp(0, 0.2, t);
            target.current.ry = lerp(0.9, Math.PI * 2, t);
          }
          // Resting Craft (0.4 -> 0.6)
          else if (p < 0.6) {
            target.current.px = 0;
            target.current.py = -0.8;
            target.current.pz = 0.5;
            target.current.rx = 0.2;
            target.current.ry = Math.PI * 2;
          }
          // Segment 2: Craft -> Innovation (0.6 -> 0.9)
          else if (p < 0.9) {
            const t = ease((p - 0.6) / 0.3);
            target.current.px = lerp(0, innovPx, t);
            target.current.py = lerp(-0.9, innovPy, t);
            target.current.pz = lerp(0.5, 1, t);
            target.current.rx = lerp(0.2, 0.2, t);
            target.current.ry = lerp(Math.PI * 2, Math.PI * 3.8, t);
          }
          // Resting Innovation (0.9 -> 1.0)
          else {
            target.current.px = innovPx;
            target.current.py = innovPy;
            target.current.pz = 1;
            target.current.rx = 0.2;
            target.current.ry = Math.PI * 3.8;
          }
        }
      }
    });

    // Philosophy fade out (0.05 to 0.2)
    tl.to(['.gs-scene-1-title', '.gs-scene-1-p', '.gs-scene-1-scroll'],
      { opacity: 0, y: -30, stagger: 0.03, duration: 0.15, ease: 'power2.in' }, 0.05);

    // Craft fade in (0.35 to 0.5)
    tl.to('.gs-scene-2-title', { opacity: 1, y: 0, duration: 0.15, ease: 'expo.out' }, 0.35);
    tl.to('.gs-scene-2-p', { opacity: 1, y: 0, duration: 0.15, ease: 'expo.out' }, 0.38);

    // Craft fade out (0.55 to 0.70)
    tl.to(['.gs-scene-2-title', '.gs-scene-2-p'],
      { opacity: 0, y: -30, stagger: 0.03, duration: 0.15, ease: 'power2.in' }, 0.55);

    // Innovation fade in (0.91 to 1.0) -> after movement completes at 0.9
    tl.to(['.gs-scene-3-title', '.gs-scene-3-sub', '.gs-scene-3-p', '.gs-scene-3-btn'],
      { opacity: 1, y: 0, stagger: 0.03, duration: 0.09, ease: 'expo.out' }, 0.91);



    // Background color / Global gradient fade-out (Philosophy -> Craft)
    tl.to('#global-gradient-bg-dark', { opacity: 0, ease: 'none', duration: 0.2 }, 0.1);
    tl.to('#global-gradient-bg-light', { opacity: 1, ease: 'none', duration: 0.2 }, 0.1);
    tl.to('#main-scroll-container', { backgroundColor: 'rgb(252, 245, 226)', ease: 'none', duration: 0.2 }, 0.1);
    tl.to('.gs-dynamic-text', { color: '#111827', ease: 'none', duration: 0.2 }, 0.1);
    tl.to('.gs-dynamic-text-light', { color: '#1a1b1d', ease: 'none', duration: 0.2 }, 0.1);

    // Background color / Global gradient fade-in (Craft -> Innovation)
    tl.to('#global-gradient-bg-light', { opacity: 0, ease: 'none', duration: 0.2 }, 0.6);
    tl.to('#global-gradient-bg-dark', { opacity: 1, ease: 'none', duration: 0.2 }, 0.6);
    tl.to('#main-scroll-container', { backgroundColor: '#000000', ease: 'none', duration: 0.2 }, 0.6);
    tl.to('.gs-dynamic-text', { color: '#ffffff', ease: 'none', duration: 0.2 }, 0.6);
    tl.to('.gs-dynamic-text-light', { color: '#9ca3af', ease: 'none', duration: 0.2 }, 0.6);

    // Lighting
    if (ambientRef.current) {
      tl.to(ambientRef.current, { intensity: 0.4, ease: 'none', duration: 0.2 }, 0.1);
      tl.to(ambientRef.current, { intensity: 1.1, ease: 'none', duration: 0.2 }, 0.6);
    }
    if (keyRef.current) {
      tl.to(keyRef.current, { intensity: 2.0, ease: 'none', duration: 0.2 }, 0.1);
      tl.to(keyRef.current, { intensity: 0.9, ease: 'none', duration: 0.2 }, 0.6);
    }
    if (fillRef.current) {
      tl.to(fillRef.current, { intensity: 0.7, ease: 'none', duration: 0.2 }, 0.1);
      tl.to(fillRef.current, { intensity: 1.2, ease: 'none', duration: 0.2 }, 0.6);
    }
    if (rimRef.current) {
      tl.to(rimRef.current, { intensity: 1.4, ease: 'none', duration: 0.2 }, 0.1);
      tl.to(rimRef.current, { intensity: 0.6, ease: 'none', duration: 0.2 }, 0.6);
    }

    return () => { tl.kill(); };
  }, [isVisible]);

  return (
    <>
      <ambientLight ref={ambientRef} intensity={1.1} />
      <directionalLight ref={keyRef} position={[10, 10, 5]} intensity={0.9} />
      <directionalLight ref={fillRef} position={[-10, 10, -5]} intensity={1.2} />
      <directionalLight ref={rimRef} position={[0, -10, -10]} intensity={0.6} />
      <Environment preset="studio" />
      <Model groupRef={groupRef as React.RefObject<THREE.Group>} />
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000" />
    </>
  );
}

// Ensure type compatibility with previous export
export function GlassesCanvas({ isVisible, className }: { isVisible?: boolean; className?: string;[x: string]: any }) {
  // Only show when isVisible is true (during video hero, after a bit)
  return (
    <div className={className} style={{ opacity: isVisible !== false ? 1 : 0, transition: 'opacity 0.6s ease' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <Scene isVisible={isVisible} />
        </Suspense>
      </Canvas>
    </div>
  );
}

