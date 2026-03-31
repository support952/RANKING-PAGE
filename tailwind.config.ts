import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f3ff",
          100: "#dfe5ff",
          200: "#b8c4ff",
          300: "#8a9bff",
          400: "#5c6eff",
          500: "#3b4cca",
          600: "#1e2a6e",
          700: "#162050",
          800: "#1E293B",
          900: "#0F172A",
          950: "#080d1a",
        },
        trust: {
          gold: "#C9A84C",
          "gold-light": "#E5D5A0",
          "gold-dark": "#A68B3C",
          green: "#22C55E",
          "green-light": "#86EFAC",
          "green-dark": "#16A34A",
        },
        surface: {
          primary: "#F8FAFC",
          secondary: "#F1F5F9",
          card: "#FFFFFF",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-merriweather)",
          "Georgia",
          "Times New Roman",
          "serif",
        ],
        sans: [
          "var(--font-inter)",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        display: [
          "2.75rem",
          { lineHeight: "1.15", letterSpacing: "-0.02em" },
        ],
        "display-sm": [
          "2rem",
          { lineHeight: "1.2", letterSpacing: "-0.01em" },
        ],
        "heading-lg": [
          "1.5rem",
          { lineHeight: "1.3", letterSpacing: "-0.01em" },
        ],
        heading: ["1.25rem", { lineHeight: "1.4" }],
        "body-lg": ["1.125rem", { lineHeight: "1.6" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.5" }],
        caption: [
          "0.75rem",
          { lineHeight: "1.5", letterSpacing: "0.02em" },
        ],
      },
      boxShadow: {
        card: "0 1px 3px rgba(15, 23, 42, 0.04), 0 4px 12px rgba(15, 23, 42, 0.06)",
        "card-hover":
          "0 4px 12px rgba(15, 23, 42, 0.08), 0 12px 32px rgba(15, 23, 42, 0.10)",
        elevated:
          "0 8px 24px rgba(15, 23, 42, 0.08), 0 20px 48px rgba(15, 23, 42, 0.12)",
        "glow-gold":
          "0 0 20px rgba(201, 168, 76, 0.15), 0 0 40px rgba(201, 168, 76, 0.08)",
        "glow-green":
          "0 0 20px rgba(34, 197, 94, 0.15), 0 0 40px rgba(34, 197, 94, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(201, 168, 76, 0.15)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(201, 168, 76, 0.25)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
