"use client";

import { useRef, useMemo, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// ─── Seeded Pseudo-Random Number Generator (mulberry32) ─────────
// Deterministic & pure — safe for useMemo in React strict mode
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ─── Animated Torus Knot ──────────────────────────────────────
function TorusKnot({
  mousePosition,
  scrollProgress,
}: {
  mousePosition: THREE.Vector2;
  scrollProgress: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireframeRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !wireframeRef.current) return;

    const t = state.clock.getElapsedTime();

    // Gentle auto-rotation
    meshRef.current.rotation.y = t * 0.15 + mousePosition.x * 0.5;
    meshRef.current.rotation.x = t * 0.1 + mousePosition.y * 0.3;
    meshRef.current.rotation.z = Math.sin(t * 0.2) * 0.15;

    // Wireframe matches solid
    wireframeRef.current.rotation.copy(meshRef.current.rotation);

    // Scale pulse based on scroll
    const pulse = 1 + Math.sin(t * 0.8) * 0.03 + scrollProgress * 0.05;
    meshRef.current.scale.setScalar(pulse);
    wireframeRef.current.scale.setScalar(pulse * 1.01);

    // Position shifts based on mouse
    meshRef.current.position.x +=
      (mousePosition.x * 0.4 - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y +=
      (-mousePosition.y * 0.3 - meshRef.current.position.y) * 0.05;
    wireframeRef.current.position.copy(meshRef.current.position);
  });

  return (
    <group>
      {/* Solid inner */}
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1.2, 0.35, 180, 24]} />
        <MeshDistortMaterial
          color="#000000"
          roughness={0.2}
          metalness={0.85}
          distort={0.25}
          speed={1.5}
          emissive="#ffffff"
          emissiveIntensity={0.08}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh ref={wireframeRef}>
        <torusKnotGeometry args={[1.22, 0.36, 160, 20]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

// ─── Floating Orbiting Particles ──────────────────────────────
function OrbitingParticles({
  mousePosition,
}: {
  mousePosition: THREE.Vector2;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const particlesCount = 200;

  const particles = useMemo(() => {
    const rand = mulberry32(42); // fixed seed for determinism
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const radius = 2.5 + rand() * 2.5;

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      sizes[i] = rand() * 2.5 + 0.5;
    }

    return { positions, sizes };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.08 + mousePosition.x * 0.3;
    groupRef.current.rotation.x = t * 0.05 + mousePosition.y * 0.2;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particles.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            args={[particles.sizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#ffffff"
          size={0.025}
          sizeAttenuation
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ─── Inner Ring Particles ─────────────────────────────────────
function RingParticles() {
  const ringRef = useRef<THREE.Points>(null);
  const count = 300;

  const { positions, colors } = useMemo(() => {
    const rand = mulberry32(137); // fixed seed for determinism
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const ringColor = new THREE.Color("#ffffff");
    const darkColor = new THREE.Color("#000000");

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 2.2 + Math.sin(i * 5) * 0.4;
      const y = Math.cos(i * 3.5) * 0.6;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const mixed = ringColor.clone().lerp(darkColor, rand() * 0.6);
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = state.clock.getElapsedTime() * 0.12;
    ringRef.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
  });

  return (
    <points ref={ringRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// ─── Backdrop Glow ─────────────────────────────────────────────
function BackdropGlow() {
  return (
    <mesh position={[0, 0, -3]} scale={6}>
      <planeGeometry />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.01}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ─── Scroll & Mouse Tracker ────────────────────────────────────
function useScrollAndMouse() {
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const scrollRef = useRef(0);
  const targetMouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      scrollRef.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Smooth mouse follow
  useFrame(() => {
    mouseRef.current.lerp(targetMouse.current, 0.08);
  });

  return { mouse: mouseRef, scroll: scrollRef };
}

// ─── Scene Content ─────────────────────────────────────────────
function SceneContent() {
  const { mouse, scroll } = useScrollAndMouse();

  return (
    <>
      <BackdropGlow />
      <ambientLight intensity={0.4} color="#3f3f46" />
      <pointLight position={[3, 2, 3]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-3, -1, -2]} intensity={0.6} color="#3f3f46" />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.3}>
        <TorusKnot
          mousePosition={mouse.current}
          scrollProgress={scroll.current}
        />
      </Float>

      <RingParticles />
      <OrbitingParticles mousePosition={mouse.current} />
    </>
  );
}

// ─── Reduced Motion Fallback ───────────────────────────────────
function ReducedMotionScene() {
  return (
    <group>
      <ambientLight intensity={0.4} color="#3f3f46" />
      <pointLight position={[3, 2, 3]} intensity={1.2} color="#ffffff" />
      <mesh>
        <torusKnotGeometry args={[1.2, 0.35, 120, 16]} />
        <meshStandardMaterial
          color="#000000"
          roughness={0.2}
          metalness={0.85}
          emissive="#ffffff"
          emissiveIntensity={0.05}
        />
      </mesh>
      <mesh>
        <torusKnotGeometry args={[1.22, 0.36, 100, 12]} />
        <meshBasicMaterial
          color="#ffffff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

// ─── Exported Component ────────────────────────────────────────
export function ThreeShowcase() {
  // Use lazy initializer to read media query once, not setState in effect
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  return (
    <section
      id="three-showcase"
      className="relative w-full h-125 sm:h-150 overflow-hidden"
      aria-label="Interactive 3D showcase"
    >
      {/* Gradient fade on edges for seamless blending */}
      <div className="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent z-10 pointer-events-none" />

      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          {reducedMotion ? <ReducedMotionScene /> : <SceneContent />}
        </Suspense>
      </Canvas>
    </section>
  );
}
