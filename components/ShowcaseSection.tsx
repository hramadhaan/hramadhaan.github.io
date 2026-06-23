"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";

const ThreeShowcase = dynamic(
  () =>
    import("@/components/ThreeShowcase").then((mod) => ({
      default: mod.ThreeShowcase,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-125 sm:h-150 flex items-center justify-center bg-black">
        <span className="text-xs font-bold tracking-[0.3em] text-text-muted uppercase animate-pulse">
          LOADING
        </span>
      </div>
    ),
  },
);

export function ShowcaseSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 sm:py-32 px-8 bg-black">
      <div className="mx-auto max-w-5xl">
        <div
          ref={headingRef}
          className="border-l-4 border-foreground pl-5 mb-12"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
            CRAFT
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1]">
            Engineering meets
            <br />
            creative precision
          </h2>
        </div>
      </div>

      <div className="border-t-2 border-b-2 border-muted">
        <ThreeShowcase />
      </div>
    </section>
  );
}
