"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SKILLS", href: "#skills" },
  { label: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.2 },
    );
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled
          ? "bg-black border-b-2 border-muted"
          : "bg-black/95 border-b-2 border-black"
      }`}
    >
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "#hero")}
          className="text-sm font-bold tracking-[0.3em] text-text-primary hover:text-text-secondary uppercase"
        >
          HRA
        </a>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="text-xs font-bold tracking-[0.2em] text-text-secondary hover:text-text-primary uppercase"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="inline-flex items-center border-2 border-foreground bg-transparent px-4 py-2 text-xs font-bold tracking-[0.2em] text-foreground hover:bg-foreground hover:text-black uppercase"
            >
              HIRE ME
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-none ${
              mobileOpen ? "rotate-45 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-none ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-text-primary transition-none ${
              mobileOpen ? "-rotate-45 -translate-y-1" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col border-t-2 border-muted bg-black px-6 pb-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="block py-4 text-sm font-bold tracking-[0.2em] text-text-secondary hover:text-text-primary uppercase border-b border-muted/30"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="pt-4">
            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className="inline-flex items-center border-2 border-foreground bg-transparent px-5 py-2.5 text-sm font-bold tracking-[0.2em] text-foreground hover:bg-foreground hover:text-black uppercase"
            >
              HIRE ME
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
