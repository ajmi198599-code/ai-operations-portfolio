import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#05070b",
        midnight: "#07111f",
        graphite: "#111827",
        platinum: "#d6dde8",
        steel: "#8d99aa",
        gold: "#d4af37",
        amberglass: "rgba(212, 175, 55, 0.16)",
        cyanbeam: "#6ee7f9"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-display)", "Arial", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(212, 175, 55, 0.16)",
        cyan: "0 0 36px rgba(110, 231, 249, 0.14)",
        insetPanel: "inset 0 1px 0 rgba(255,255,255,0.08)"
      },
      backgroundImage: {
        "radial-ops": "radial-gradient(circle at 20% 20%, rgba(110,231,249,0.16), transparent 28%), radial-gradient(circle at 84% 12%, rgba(212,175,55,0.16), transparent 26%), linear-gradient(135deg, #05070b 0%, #07111f 45%, #040508 100%)",
        "panel-line": "linear-gradient(90deg, transparent, rgba(214,221,232,0.18), transparent)"
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "12%": { opacity: "0.6" },
          "100%": { transform: "translateY(120vh)", opacity: "0" }
        },
        drift: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(18px, -22px, 0) scale(1.04)" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.42", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.04)" }
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        scan: "scan 7s linear infinite",
        drift: "drift 11s ease-in-out infinite",
        pulseSoft: "pulseSoft 4.4s ease-in-out infinite",
        orbit: "orbit 28s linear infinite",
        marquee: "marquee 28s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
