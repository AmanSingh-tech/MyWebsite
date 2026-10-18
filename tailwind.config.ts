import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Themed colours are RGB triplets in globals.css so /opacity modifiers still work.
        paper: { DEFAULT: "rgb(var(--paper) / <alpha-value>)", deep: "rgb(var(--paper-deep) / <alpha-value>)" },
        card: "rgb(var(--card) / <alpha-value>)",
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          faint: "rgb(var(--ink-faint) / <alpha-value>)",
        },
        sugar: { DEFAULT: "#fea831", soft: "rgb(var(--sugar-soft) / <alpha-value>)" },
        // Text that sits on orange stays dark in both themes.
        cocoa: "#3c3728",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      transitionTimingFunction: {
        mild: "cubic-bezier(.25,.46,.45,.94)",
        pop: "cubic-bezier(.34,1.56,.64,1)",
      },
      keyframes: {
        spin: { to: { transform: "rotate(360deg)" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-6px)" } },
        zzz: {
          "0%": { opacity: "0", transform: "translate(0,0) scale(.6)" },
          "30%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate(14px,-28px) scale(1.1)" },
        },
      },
      animation: {
        "spin-slow": "spin 9s linear infinite",
        float: "float 4s ease-in-out infinite",
        zzz: "zzz 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
