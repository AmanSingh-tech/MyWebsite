"use client";

import { useEffect, useState } from "react";

const KEY = "seen-hey";

// Runs before paint (inlined in <head>) so returning visitors never see a flash of the loader.
export const loaderBootScript = `try{if(sessionStorage.getItem("${KEY}"))document.documentElement.classList.add("skip-loader");else document.documentElement.classList.add("is-loading")}catch(e){}`;

export default function Loader() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("show");

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("skip-loader")) {
      setPhase("gone");
      return;
    }
    const t1 = setTimeout(() => setPhase("leave"), 1900);
    const t2 = setTimeout(() => {
      setPhase("gone");
      root.classList.remove("is-loading");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
    }, 2700);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      root.classList.remove("is-loading");
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`loader fixed inset-0 z-[100] flex items-center justify-center bg-paper transition-[transform,border-radius] duration-700 ease-mild ${
        phase === "leave" ? "-translate-y-full rounded-b-[50%]" : ""
      }`}
    >
      <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
        <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden="true">
          <defs>
            <path id="loader-circle" d="M100,100 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
          </defs>
          <text className="fill-sugar font-display" fontSize="13" letterSpacing="3">
            <textPath href="#loader-circle">
              HELLO · NAMASTE · HEY · HOLA · BONJOUR · CIAO · HALLO · KONNICHIWA ·
            </textPath>
          </text>
        </svg>
        <div className="text-center font-display">
          <p className="text-base leading-snug text-ink-soft">
            Don&rsquo;t be shy.
            <br />
            Feel free to say
          </p>
          <p className="mt-1 text-5xl text-ink">&ldquo;Hey!&rdquo;</p>
        </div>
      </div>
    </div>
  );
}
