"use client";

import { useEffect, useRef, useState } from "react";

type Time = "morning" | "day" | "dusk" | "night" | "late";

const SKY: Record<Time, [string, string]> = {
  morning: ["#d9eef5", "#fbe9cf"],
  day: ["#bfe0ef", "#e4f2f6"],
  dusk: ["#f6b48a", "#fde0b8"],
  night: ["#3b3f5c", "#5a5a78"],
  late: ["#24263a", "#3b3f5c"],
};

const LINES: Record<Time, string[]> = {
  morning: ["Good morning! ☕", "Coffee first, then code.", "Click me again 👀"],
  day: ["Hey!", "Need an engineer?", "I like C++ and calm UIs.", "Scroll down, there's more!"],
  dusk: ["Good evening! 🌇", "Shipping one last commit…", "Want to build something?"],
  night: ["Still up? Me too 🌙", "Night = contest time.", "Leave a note below!"],
  late: ["zzz… 💤", "(sleep-talking) …O(n log n)…", "Leave a message, I'll reply in the morning!"],
};

function timeOf(h: number): Time {
  if (h >= 6 && h < 10) return "morning";
  if (h >= 10 && h < 17) return "day";
  if (h >= 17 && h < 20) return "dusk";
  if (h >= 20) return "night";
  return "late";
}

export default function Room() {
  const [time, setTime] = useState<Time>("day");
  const [line, setLine] = useState(-1);
  const [hop, setHop] = useState(0);
  const [blink, setBlink] = useState(false);
  const svg = useRef<SVGSVGElement>(null);
  const [look, setLook] = useState({ x: 0, y: 0 });

  const asleep = time === "late";

  useEffect(() => {
    const update = () => setTime(timeOf(new Date().getHours()));
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Blink every few seconds
  useEffect(() => {
    if (asleep) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, 2500 + Math.random() * 3000);
    };
    loop();
    return () => clearTimeout(t);
  }, [asleep]);

  // Eyes follow the pointer
  useEffect(() => {
    if (asleep) return;
    const onMove = (e: PointerEvent) => {
      const r = svg.current?.getBoundingClientRect();
      if (!r) return;
      // eye centre ≈ (170, 168) in a 400×360 viewBox
      const cx = r.left + (170 / 400) * r.width;
      const cy = r.top + (168 / 360) * r.height;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      setLook({ x: (dx / d) * 5 * k, y: (dy / d) * 4 * k });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [asleep]);

  const talk = () => {
    setLine((l) => (l + 1) % LINES[time].length);
    setHop((h) => h + 1);
  };

  const [skyTop, skyBottom] = SKY[time];
  const dark = time === "night" || time === "late";
  const bubble = line >= 0 ? LINES[time][line] : asleep ? "zzz… 💤" : "Psst, click me!";

  return (
    <div className="relative aspect-[10/9] w-full overflow-hidden rounded-[36px] bg-paper-deep sm:rounded-[48px]">
      {/* speech bubble */}
      <div
        key={line}
        className="absolute left-[6%] top-[7%] z-10 max-w-[48%] animate-[float_4s_ease-in-out_infinite] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 font-display text-sm text-ink shadow-[0_8px_24px_-12px_rgba(60,55,40,.45)] sm:text-base"
        aria-live="polite"
      >
        {bubble}
      </div>

      <svg ref={svg} viewBox="0 0 400 360" className="absolute inset-0 h-full w-full" role="img" aria-label="An illustrated character working at a desk">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={skyTop} />
            <stop offset="1" stopColor={skyBottom} />
          </linearGradient>
          <clipPath id="window">
            <rect x="238" y="38" width="128" height="112" rx="20" />
          </clipPath>
        </defs>

        {/* window */}
        <g clipPath="url(#window)">
          <rect x="238" y="38" width="128" height="112" fill="url(#sky)" className="transition-colors" />
          {dark ? (
            <>
              <path d="M332 57a15 15 0 1 0 12 25a12 12 0 1 1-12-25Z" fill="#fff6dc" />
              {[[262, 60], [290, 92], [350, 118], [276, 124], [312, 52]].map(([x, y]) => (
                <circle key={`${x}${y}`} cx={x} cy={y} r="1.6" fill="#fff6dc" opacity=".9" />
              ))}
            </>
          ) : (
            <>
              <circle cx={time === "dusk" ? 300 : 322} cy={time === "dusk" ? 128 : 72} r="16" fill="#fea831" />
              <ellipse cx="275" cy="112" rx="22" ry="8" fill="#fff" opacity=".8" />
              <ellipse cx="290" cy="106" rx="14" ry="8" fill="#fff" opacity=".8" />
            </>
          )}
        </g>
        <rect x="238" y="38" width="128" height="112" rx="20" fill="none" stroke="#3c3728" strokeWidth="6" />
        <path d="M302 38v112M238 94h128" stroke="#3c3728" strokeWidth="4" />

        {/* plant */}
        <g transform="translate(46 168)">
          <path d="M28 40c-18-6-26-24-20-38 12 6 20 20 20 38Z" fill="#7fae7a" />
          <path d="M30 42c4-20 18-32 34-30-2 16-16 28-34 30Z" fill="#94c08c" />
          <path d="M28 44c-2-18 4-34 10-44 8 14 4 32-10 44Z" fill="#6a9a66" />
          <path d="M8 44h46l-6 42H14Z" fill="#c9875a" />
          <rect x="4" y="40" width="54" height="10" rx="5" fill="#b77649" />
        </g>

        {/* character */}
        <g
          key={hop}
          onClick={talk}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), talk())}
          role="button"
          tabIndex={0}
          aria-label="Say hi to the character"
          data-cursor={asleep ? "Shh…" : "Hey!"}
          className="cursor-pointer outline-none [transform-box:fill-box] [transform-origin:50%_100%] motion-safe:animate-[hop_.5s_cubic-bezier(.34,1.56,.64,1)] focus-visible:[filter:drop-shadow(0_0_0_#fea831)_drop-shadow(0_0_6px_#fea831)]"
        >
          {/* body: a soft sugar-drop */}
          <path d="M170 98c40 0 70 40 74 92 3 40-6 74-74 74s-77-34-74-74c4-52 34-92 74-92Z" fill="#fea831" />
          <path d="M170 98c-12 10-14 22-6 30 6-10 10-20 6-30Z" fill="#f08e14" />
          <ellipse cx="136" cy="190" rx="10" ry="6" fill="#ff8a7a" opacity=".55" />
          <ellipse cx="204" cy="190" rx="10" ry="6" fill="#ff8a7a" opacity=".55" />

          {asleep ? (
            <g stroke="#3c3728" strokeWidth="4" strokeLinecap="round" fill="none">
              <path d="M146 170q8 6 16 0" />
              <path d="M178 170q8 6 16 0" />
            </g>
          ) : (
            <g transform={`translate(${look.x} ${look.y})`}>
              <ellipse cx="154" cy="168" rx="7" ry={blink ? 1 : 9} fill="#3c3728" />
              <ellipse cx="186" cy="168" rx="7" ry={blink ? 1 : 9} fill="#3c3728" />
              {!blink && (
                <>
                  <circle cx="156.5" cy="164" r="2.4" fill="#fff" />
                  <circle cx="188.5" cy="164" r="2.4" fill="#fff" />
                </>
              )}
            </g>
          )}
          <path
            d={asleep ? "M164 196q6 3 12 0" : "M160 192q10 10 20 0"}
            stroke="#3c3728"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* desk */}
        <rect x="20" y="254" width="360" height="18" rx="9" fill="#d8c4a0" />
        <rect x="44" y="270" width="14" height="80" rx="6" fill="#c4ad85" />
        <rect x="342" y="270" width="14" height="80" rx="6" fill="#c4ad85" />

        {/* laptop (back of the lid faces us) */}
        <g pointerEvents="none">
          <path d="M118 210h104l8 46H110Z" fill="#3c3728" />
          <circle cx="170" cy="232" r="13" fill="#ffe2b8" />
          <text x="170" y="237" textAnchor="middle" fontSize="12" fontWeight="700" fill="#3c3728" fontFamily="monospace">
            {"</>"}
          </text>
        </g>

        {/* mug */}
        <g transform="translate(272 222)">
          <rect width="28" height="32" rx="6" fill="#f7f5f1" stroke="#3c3728" strokeWidth="3" />
          <path d="M28 8c10 0 10 16 0 16" fill="none" stroke="#3c3728" strokeWidth="3" />
          {!asleep && (
            <path
              d="M10-6c-4-6 4-8 0-14M18-6c-4-6 4-8 0-14"
              stroke="#a39c89"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
              className="animate-[float_3s_ease-in-out_infinite]"
            />
          )}
        </g>

        {/* zzz */}
        {asleep &&
          [0, 0.8, 1.6].map((d) => (
            <text
              key={d}
              x="214"
              y="118"
              fontSize="18"
              className="animate-zzz fill-ink font-display"
              style={{ animationDelay: `${d}s` }}
            >
              z
            </text>
          ))}

        {/* evening dimmer */}
        {dark && <rect width="400" height="360" fill="#1c1a2e" opacity={asleep ? 0.22 : 0.1} pointerEvents="none" />}
      </svg>
    </div>
  );
}
