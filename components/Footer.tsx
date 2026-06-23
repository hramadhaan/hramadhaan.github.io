export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-muted bg-black px-6 py-10">
      <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold tracking-[0.3em] text-text-primary uppercase">
            HRA
          </span>
          <span className="h-4 w-px bg-muted" />
          <span className="text-xs font-medium text-text-muted tracking-[0.2em] uppercase">
            &copy; {currentYear}
          </span>
        </div>

        <p className="text-xs font-medium tracking-[0.2em] text-text-muted uppercase">
          NEXT.JS / TAILWIND / GSAP / THREE.JS
        </p>
      </div>
    </footer>
  );
}
