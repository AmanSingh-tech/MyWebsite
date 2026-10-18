"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";

const nav = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#cases", label: "Cases", sub: true },
  { href: "#work", label: "Work", sub: true },
  { href: "#numbers", label: "Numbers", sub: true },
  { href: "#hire", label: "Hire me" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panel.current && !panel.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header>
      {/* Logo + disciplines sit at the top of the page, like a letterhead */}
      <div className="wrap absolute inset-x-0 top-0 z-30 flex pt-5 sm:pt-7">
        <div>
          <a href="#home" className="font-display text-4xl text-ink sm:text-5xl" data-cursor="Top">
            {site.short}
          </a>
          <p className="mt-2 font-display text-sm leading-[1.5] text-ink-soft sm:text-base">
            {site.disciplines.map((d) => (
              <span key={d} className="block">
                {d}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Three-dot button that grows into the menu */}
      <div
        ref={panel}
        className={`fixed right-4 top-5 z-50 overflow-hidden bg-ink text-paper shadow-[0_10px_30px_-12px_rgba(60,55,40,.6)] transition-[width,height,border-radius] duration-500 ease-pop sm:right-8 sm:top-7 ${
          open ? "h-[338px] w-[220px] rounded-[28px]" : "h-14 w-14 rounded-[28px]"
        }`}
      >
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((o) => !o)}
          className="absolute right-0 top-0 z-10 flex h-14 w-14 items-center justify-center"
          data-cursor={open ? "Close" : "Menu"}
        >
          <span className="relative block h-6 w-6">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="absolute left-1/2 top-1/2 h-[6px] rounded-full bg-paper transition-all duration-500 ease-pop"
                style={
                  open
                    ? {
                        width: i === 1 ? 0 : 22,
                        opacity: i === 1 ? 0 : 1,
                        transform: `translate(-50%,-50%) rotate(${i === 0 ? 45 : -45}deg)`,
                        height: 3,
                      }
                    : { width: 6, transform: `translate(calc(-50% + ${(i - 1) * 9}px),-50%)` }
                }
              />
            ))}
          </span>
        </button>

        <nav
          id="site-menu"
          aria-label="Main menu"
          {...({ inert: open ? undefined : "" } as object)}
          className={`px-7 pt-6 font-display transition-opacity duration-300 ${open ? "opacity-100 delay-200" : "opacity-0"}`}
        >
          <ul className="space-y-1.5">
            {nav.map((n) => (
              <li key={n.href} className={n.sub ? "pl-4 text-lg" : "text-2xl"}>
                <a
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="group inline-flex items-center gap-2 hover:text-sugar focus-visible:text-sugar"
                >
                  {n.sub && <span className="h-1.5 w-1.5 rounded-full bg-sugar" aria-hidden="true" />}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.links.resume}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-sugar px-4 py-1.5 text-sm text-ink transition-transform hover:-rotate-2"
          >
            Résumé ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
