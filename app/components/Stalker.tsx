"use client";

import { useEffect, useRef, useState } from "react";

// Elements opt in with data-cursor="Label"; links/buttons without one get a plain grow.
export default function Stalker() {
  const el = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !calm) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let raf = 0;

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.18;
      pos.y += (target.y - pos.y) * 0.18;
      if (el.current) el.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      setVisible(true);
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor], a, button, summary, label");
      setHovering(!!t);
      setLabel(t?.dataset.cursor ?? null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 72 : hovering ? 36 : 12;

  return (
    <div ref={el} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[90]">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-sugar font-display text-sm text-cocoa mix-blend-multiply dark:mix-blend-normal transition-[width,height,opacity] duration-300 ease-pop"
        style={{ width: size, height: size, opacity: visible ? (hovering && !label ? 0.55 : 1) : 0 }}
      >
        <span className={`whitespace-nowrap transition-opacity duration-200 ${label ? "opacity-100" : "opacity-0"}`}>
          {label}
        </span>
      </div>
    </div>
  );
}
