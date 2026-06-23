"use client";

import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";

const REASONS = [
  {
    num: "01",
    title: "MOBILE & WEB. ONE MIND.",
    desc: "I don't just build apps or websites — I build complete digital experiences. Native mobile and full-stack web, all under one roof. No handoffs, no silos.",
  },
  {
    num: "02",
    title: "PERFORMANCE IS NOT OPTIONAL.",
    desc: "Every millisecond counts. From lazy-loaded assets to tree-shaken bundles, I optimize for speed from day one. Your users feel the difference.",
  },
  {
    num: "03",
    title: "CLEAN CODE. NO EXCUSES.",
    desc: "TypeScript, automated tests, CI/CD pipelines. I write code that other developers thank me for. Maintainable, documented, and built to scale.",
  },
  {
    num: "04",
    title: "DESIGN SYSTEMS THAT SHIP.",
    desc: "Pixel-perfect UI isn't luck — it's systems. I build reusable component libraries and design tokens that keep your product consistent at any scale.",
  },
  {
    num: "05",
    title: "TEAMS, NOT EGOS.",
    desc: "I've led mobile teams, mentored juniors, and collaborated across disciplines. Code review isn't a chore — it's how we all get better.",
  },
];

function ReasonCard({
  reason,
  index,
  registerNumberRef,
}: {
  reason: (typeof REASONS)[number];
  index: number;
  registerNumberRef: (el: HTMLDivElement | null, index: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const numberBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const numBg = numberBgRef.current;
    if (!card || !numBg) return;

    // Register the number element for parent-level parallax
    registerNumberRef(numBg, index);

    const ctx = gsap.context(() => {
      // Card entrance: slides up with depth
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Parallax: large watermark number moves upward as card scrolls through viewport
      gsap.fromTo(
        numBg,
        { y: 30 },
        {
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    }, card);

    return () => ctx.revert();
  }, [index, registerNumberRef]);

  return (
    <div
      ref={cardRef}
      className="group border-2 border-muted hover:border-foreground bg-surface p-6 sm:p-8 md:p-10 relative overflow-hidden"
    >
      {/* Large number background — parallax target */}
      <div
        ref={numberBgRef}
        className="absolute -top-6 -right-4 text-[120px] sm:text-[160px] md:text-[200px] font-bold text-text-primary/[0.02] leading-none select-none font-mono pointer-events-none will-change-transform"
      >
        {reason.num}
      </div>

      <div className="relative flex flex-col md:flex-row md:items-start gap-5 md:gap-10">
        {/* Number on mobile */}
        <span className="md:hidden text-4xl font-bold text-foreground/20 font-mono">
          {reason.num}
        </span>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.2] mb-4">
            {reason.title}
          </h3>
          <p className="text-sm sm:text-base font-medium text-text-secondary leading-relaxed max-w-2xl">
            {reason.desc}
          </p>
        </div>

        {/* Number on desktop */}
        <span className="hidden md:block text-6xl font-bold text-foreground/10 font-mono shrink-0">
          {reason.num}
        </span>
      </div>
    </div>
  );
}

export function WhySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const headingBgRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLDivElement | null)[]>([]);

  const registerNumberRef = useCallback(
    (el: HTMLDivElement | null, index: number) => {
      numberRefs.current[index] = el;
    },
    [],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const headingBg = headingBgRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      gsap.fromTo(
        headingRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Heading background parallax — "WHY" text shifts up slower than heading
      if (headingBg) {
        gsap.fromTo(
          headingBg,
          { y: 40 },
          {
            y: -20,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-8 bg-black overflow-hidden"
    >
      <div className="mx-auto max-w-5xl">
        {/* Heading with parallax background number */}
        <div className="relative mb-16">
          {/* Parallax background "WHY" */}
          <div
            ref={headingBgRef}
            className="absolute -top-16 md:-top-24 -left-4 text-[100px] sm:text-[140px] md:text-[180px] font-bold text-text-primary/[0.015] leading-none select-none font-mono pointer-events-none will-change-transform"
            aria-hidden="true"
          >
            WHY
          </div>

          <div
            ref={headingRef}
            className="relative border-l-4 border-foreground pl-5"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
              WHY
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1] max-w-2xl">
              Why work
              <br />
              <span className="text-text-secondary">with me?</span>
            </h2>
          </div>
        </div>

        {/* Stacked Cards */}
        <div className="space-y-4 md:space-y-6">
          {REASONS.map((reason, index) => (
            <ReasonCard
              key={reason.num}
              reason={reason}
              index={index}
              registerNumberRef={registerNumberRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
