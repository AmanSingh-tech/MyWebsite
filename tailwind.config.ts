import type { Config } from "tailwindcss";

const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: { DEFAULT: "#f7f5f1", deep: "#efebe3" },
        ink: { DEFAULT: "#3c3728", soft: "#6f6855", faint: "#a39c89" },
        sugar: { DEFAULT: "#fea831", soft: "#ffe2b8" },
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
