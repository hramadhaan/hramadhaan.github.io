"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

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
        cardRef.current,
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

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-8 bg-black"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={headingRef}
          className="border-l-4 border-foreground pl-5 mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
            CONTACT
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1]">
            Let&apos;s work
          </h2>
        </div>

        <div
          ref={cardRef}
          className="border-2 border-muted bg-surface p-8 sm:p-12"
        >
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 border-2 border-foreground bg-foreground text-black mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="square"
                strokeLinejoin="miter"
              >
                <rect width="20" height="16" x="2" y="4" rx="0" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-[-0.02em] uppercase mb-2">
              Send me a message
            </h3>
            <p className="text-sm font-medium text-text-secondary mb-8 max-w-md">
              Drop me an email and I&apos;ll get back to you within 24 hours.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md">
              <a
                href="mailto:hanif.ramadhan@example.com"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-foreground bg-foreground px-8 py-4 text-sm font-bold tracking-[0.2em] text-black hover:bg-black hover:text-foreground uppercase"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                EMAIL ME
              </a>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-3">
              {["GH", "LI", "TW"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border-2 border-muted bg-black flex items-center justify-center text-xs font-bold tracking-[0.2em] text-text-muted hover:border-foreground hover:text-foreground uppercase"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
