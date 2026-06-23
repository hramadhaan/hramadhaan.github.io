"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        roleRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
      )
        .fromTo(
          titleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          "-=0.2",
        )
        .fromTo(
          descRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.3",
        )
        .fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.4 },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-dvh flex items-center bg-black overflow-hidden"
    >
      {/* Brutalist border frame */}
      <div className="absolute inset-4 border-2 border-muted/20 pointer-events-none" />
      <div className="absolute inset-6 border border-muted/10 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-8 py-32">
        {/* Role label */}
        <div ref={roleRef} className="mb-10">
          <div className="flex items-center gap-4">
            <span className="h-0.5 w-12 bg-foreground" />
            <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
              Mobile &amp; Web Developer
            </span>
          </div>
        </div>

        {/* Title — oversized brutalist */}
        <h1
          ref={titleRef}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-foreground tracking-[-0.03em] leading-[0.9] uppercase"
        >
          Hanif
          <br />
          Ramadhan
          <br />
          <span className="text-black bg-foreground px-3 sm:px-6 inline-block">
            Abdillah
          </span>
        </h1>

        {/* Description */}
        <p
          ref={descRef}
          className="mt-10 max-w-xl text-base sm:text-lg font-medium text-text-secondary leading-relaxed"
        >
          5+ years building performant mobile apps and web platforms. No
          bullshit. Just clean code and products that work.
        </p>

        {/* CTA */}
        <div ref={ctaRef} className="mt-12 flex flex-col sm:flex-row gap-4">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 border-2 border-foreground bg-foreground px-8 py-4 text-sm font-bold tracking-[0.2em] text-black hover:bg-black hover:text-foreground uppercase"
          >
            VIEW WORK
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 border-2 border-muted bg-transparent px-8 py-4 text-sm font-bold tracking-[0.2em] text-foreground hover:border-foreground uppercase"
          >
            CONTACT
          </a>
        </div>

        {/* Brutalist stats bar */}
        <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 border-t-2 border-b-2 border-muted">
          {[
            { value: "5+", label: "YEARS" },
            { value: "12+", label: "PROJECTS" },
            { value: "MOBILE", label: "& WEB" },
            { value: "100%", label: "SHIPPED" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-6 border-r-2 border-muted last:border-r-0"
            >
              <div className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] font-bold tracking-[0.3em] text-text-muted uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
