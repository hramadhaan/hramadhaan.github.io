"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const SKILL_GROUPS = [
  {
    category: "MOBILE",
    skills: [
      "React Native",
      "Flutter",
      "Dart",
      "iOS",
      "Android",
      "Swift",
      "Kotlin",
    ],
  },
  {
    category: "FRONTEND",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux",
      "GetX",
      "HTML/CSS",
    ],
  },
  {
    category: "BACKEND",
    skills: [
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "GraphQL",
      "REST APIs",
      "Firebase",
    ],
  },
  {
    category: "TOOLS",
    skills: ["Git", "Docker", "CI/CD", "Figma", "Jira", "Agile", "Code Review"],
  },
];

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-8 bg-black"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={headingRef}
          className="border-l-4 border-foreground pl-5 mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
            SKILLS
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1]">
            Technologies
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-3 sm:grid-cols-2">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="border-2 border-muted hover:border-foreground bg-surface p-6"
            >
              <h3 className="text-xs font-bold tracking-[0.3em] text-foreground uppercase mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center border border-muted bg-black px-3 py-1.5 text-sm font-medium text-text-secondary hover:text-foreground hover:border-foreground uppercase"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
