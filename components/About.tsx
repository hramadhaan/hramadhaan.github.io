"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
      gsap.fromTo(
        contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.15,
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

  const highlights = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <rect width="18" height="18" x="3" y="3" rx="0" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      label: "MOBILE APPS",
      desc: "Native iOS & Android with React Native and Flutter",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" x2="22" y1="12" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
      label: "WEB PLATFORMS",
      desc: "Full-stack apps with Next.js, React, and Node.js",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="square"
          strokeLinejoin="miter"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      label: "TEAM LEAD",
      desc: "Mentoring developers and driving technical decisions",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-8 bg-black"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={headingRef}
          className="border-l-4 border-foreground pl-5 mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
            ABOUT
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1]">
            Building digital
            <br />
            products that work
          </h2>
        </div>

        <div ref={contentRef} className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="space-y-5">
            <p className="text-base sm:text-lg font-medium text-text-secondary leading-relaxed">
              Mobile &amp; Web Developer based in Indonesia. 5+ years of
              hands-on experience. I build performant mobile apps and scalable
              web platforms — pixel-perfect UI to robust backend.
            </p>
            <p className="text-base sm:text-lg font-medium text-text-secondary leading-relaxed">
              From consumer apps like Miss ACE to leading teams on Storemode and
              architecting CRM systems at ruparupa. Clean code. Thoughtful
              architecture. Real impact.
            </p>
          </div>

          <div className="space-y-3">
            {highlights.map((item) => (
              <div
                key={item.label}
                className="flex gap-4 p-5 border-2 border-muted hover:border-foreground bg-surface"
              >
                <div className="shrink-0 w-10 h-10 flex items-center justify-center text-foreground">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.2em] text-foreground uppercase">
                    {item.label}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-muted">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
