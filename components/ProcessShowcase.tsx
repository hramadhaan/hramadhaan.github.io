"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const PROCESS_STEPS = [
  {
    number: "01",
    title: "DISCOVERY & PLANNING",
    desc: "Understanding requirements, mapping architecture, and defining the roadmap before writing a single line of code.",
    side: "left" as const,
  },
  {
    number: "02",
    title: "DESIGN & PROTOTYPE",
    desc: "Crafting pixel-perfect interfaces, interactive prototypes, and design systems that scale across platforms.",
    side: "right" as const,
  },
  {
    number: "03",
    title: "BUILD & TEST",
    desc: "Writing clean, maintainable code with comprehensive testing — unit, integration, and end-to-end.",
    side: "left" as const,
  },
  {
    number: "04",
    title: "DEPLOY & ITERATE",
    desc: "Shipping to production with CI/CD pipelines, monitoring performance, and iterating based on real feedback.",
    side: "right" as const,
  },
];

// ─── Horizontal Text Marquee (Brutalist) ──────────────────────
function TextMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const distance = track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${distance * 2}`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black border-t-2 border-b-2 border-foreground"
    >
      <div className="flex items-center h-32 sm:h-48 md:h-64">
        <div
          ref={trackRef}
          className="flex items-center gap-16 whitespace-nowrap px-8 will-change-transform"
        >
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl sm:text-6xl md:text-8xl font-bold text-foreground tracking-[-0.03em] uppercase"
            >
              BUILD<span className="text-text-muted"> / </span>DEPLOY
              <span className="text-text-muted"> / </span>ITERATE
              <span className="text-text-muted"> / </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Process Card (Brutalist) ──────────────────────────────────
function ProcessCard({ step }: { step: (typeof PROCESS_STEPS)[number] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const isLeft = step.side === "left";
    const startX = isLeft ? -80 : 80;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { x: startX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, card);
    return () => ctx.revert();
  }, [step.side]);

  return (
    <div
      ref={cardRef}
      className="group relative border-2 border-muted hover:border-foreground bg-surface p-6 sm:p-7"
    >
      <div className="text-5xl font-bold text-text-primary/5 font-mono absolute top-3 right-4 select-none">
        {step.number}
      </div>
      <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-[-0.02em] uppercase mb-3">
        {step.title}
      </h3>
      <p className="text-sm font-medium text-text-secondary leading-relaxed">
        {step.desc}
      </p>
    </div>
  );
}

// ─── Center Illustration (Brutalist) ───────────────────────────
function CenterIllustration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      });
      tl.fromTo(
        leftRef.current,
        { x: -160, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
        0,
      )
        .fromTo(
          rightRef.current,
          { x: 160, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
          0,
        )
        .fromTo(
          centerRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" },
          "-=0.1",
        );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center h-40 sm:h-56 my-8"
    >
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted/30" />

      {/* Left: phone */}
      <div
        ref={leftRef}
        className="absolute left-[15%] sm:left-[25%] w-16 h-16 sm:w-20 sm:h-20 border-2 border-muted bg-black flex items-center justify-center text-foreground will-change-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect width="14" height="20" x="5" y="2" rx="0" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      </div>

      {/* Right: globe */}
      <div
        ref={rightRef}
        className="absolute right-[15%] sm:right-[25%] w-16 h-16 sm:w-20 sm:h-20 border-2 border-muted bg-black flex items-center justify-center text-foreground will-change-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      </div>

      {/* Center: check */}
      <div
        ref={centerRef}
        className="absolute z-10 w-14 h-14 sm:w-16 sm:h-16 border-2 border-foreground bg-black flex items-center justify-center will-change-transform"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
}

// ─── Exported Section ─────────────────────────────────────────
export function ProcessShowcase() {
  const headingRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

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
    <>
      <TextMarquee />

      <section
        id="process"
        ref={sectionRef}
        className="relative py-24 sm:py-32 px-8 bg-black"
      >
        <div className="mx-auto max-w-5xl">
          <div
            ref={headingRef}
            className="border-l-4 border-foreground pl-5 mb-16"
          >
            <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
              PROCESS
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1]">
              How I bring ideas
              <br />
              to production
            </h2>
          </div>

          <CenterIllustration />

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {PROCESS_STEPS.map((step) => (
              <ProcessCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
