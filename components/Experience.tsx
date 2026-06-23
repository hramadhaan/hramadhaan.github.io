"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface Project {
  company: string;
  role: string;
  duration: string;
  description: string;
  highlights: string[];
  tech: string[];
}

const PROJECTS: Project[] = [
  {
    company: "MISS ACE",
    role: "Mobile Developer",
    duration: "1 YEAR",
    description:
      "Built a consumer-facing mobile app for the Miss ACE beauty and lifestyle platform. Smooth UX across iOS and Android.",
    highlights: [
      "Full mobile app from scratch using modern frameworks",
      "Complex UI animations and transitions",
      "RESTful APIs and real-time features",
      "Cross-platform consistency and performance",
    ],
    tech: ["React Native", "TypeScript", "Redux", "REST APIs", "Firebase"],
  },
  {
    company: "STOREMODE",
    role: "Mobile Developer & Team Lead",
    duration: "2+ YEARS",
    description:
      "Led mobile development for Storemode, an e-commerce platform under ruparupa. Managed a team while shipping features.",
    highlights: [
      "Led and mentored a team of mobile developers",
      "Scalable mobile app architecture",
      "E-commerce: cart, checkout, payments",
      "Cross-team coordination with backend and design",
    ],
    tech: ["Flutter", "Dart", "GetX", "GraphQL", "CI/CD"],
  },
  {
    company: "RUPARUPA",
    role: "Web Developer — CRM Systems",
    duration: "2+ YEARS",
    description:
      "Architected internal CRM systems powering ruparupa's operations. Scalability, data management, workflow automation.",
    highlights: [
      "Full-stack CRM platform handling millions of records",
      "Database schemas and API architectures",
      "Automated business workflows and reporting",
      "Role-based dashboards for multiple departments",
    ],
    tech: ["Next.js", "React", "Node.js", "PostgreSQL", "Prisma", "Docker"],
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative border-2 border-muted hover:border-foreground bg-surface p-6 sm:p-8"
    >
      {/* Top bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-5 border-b-2 border-muted/50">
        <h3 className="text-xl sm:text-2xl font-bold text-foreground tracking-[-0.02em] uppercase">
          {project.company}
        </h3>
        <span className="inline-flex items-center border-2 border-muted px-3 py-1 text-[10px] font-bold tracking-[0.2em] text-text-secondary uppercase font-mono">
          {project.duration}
        </span>
      </div>

      <p className="text-xs font-bold tracking-[0.2em] text-text-muted uppercase mb-3">
        {project.role}
      </p>
      <p className="text-sm font-medium text-text-secondary leading-relaxed mb-5">
        {project.description}
      </p>

      <ul className="space-y-2 mb-6">
        {project.highlights.map((h, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-sm font-medium text-text-secondary"
          >
            <span className="mt-1 block w-1.5 h-1.5 bg-foreground shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="inline-flex items-center border border-muted bg-black px-2.5 py-1 text-xs font-medium text-text-muted font-mono uppercase"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Experience() {
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
    <section
      id="work"
      ref={sectionRef}
      className="relative py-24 sm:py-32 px-8 bg-black"
    >
      <div className="mx-auto max-w-5xl">
        <div
          ref={headingRef}
          className="border-l-4 border-foreground pl-5 mb-16"
        >
          <span className="text-xs font-bold tracking-[0.3em] text-text-secondary uppercase">
            WORK
          </span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-foreground tracking-[-0.02em] uppercase leading-[1.1]">
            Selected experience
          </h2>
        </div>

        <div className="space-y-6">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.company}
              project={project}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
