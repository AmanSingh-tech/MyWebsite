"use client";

import { useEffect, useState } from "react";
import { THEME_KEY as KEY } from "@/lib/boot";

export default function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));

    // Follow the device setting until the visitor picks a theme themselves.
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try {
        if (localStorage.getItem(KEY)) return;
      } catch {}
      document.documentElement.classList.toggle("dark", e.matches);
      setDark(e.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setDark(next);
    try {
      localStorage.setItem(KEY, next ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark ?? undefined}
      data-cursor={dark ? "Light" : "Dark"}
      className="fixed right-[84px] top-5 z-50 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink/10 bg-card text-ink shadow-[0_10px_30px_-14px_rgba(60,55,40,.5)] transition-transform duration-500 ease-pop hover:-rotate-12 sm:right-[104px] sm:top-7"
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
        {/* sun rays fade out and the disc gets a bite taken out to become a moon */}
        <g
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`origin-center transition-all duration-500 ease-pop ${dark ? "scale-50 opacity-0" : "opacity-100"}`}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />
          ))}
        </g>
        <mask id="moon-bite">
          <rect width="24" height="24" fill="#fff" />
          <circle
            cx={dark ? 16.5 : 26}
            cy={dark ? 8 : 2}
            r="6"
            fill="#000"
            className="transition-all duration-500 ease-pop"
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          r={dark ? 8 : 5}
          fill="currentColor"
          mask="url(#moon-bite)"
          className="transition-all duration-500 ease-pop"
        />
      </svg>
    </button>
  );
}
