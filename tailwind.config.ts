import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        "bg-alt": "var(--color-bg-alt)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",

        primary: "var(--color-text-primary)",
        secondary: "var(--color-text-secondary)",
        inverse: "var(--color-text-inverse)",

        accent: "var(--color-accent)",
        "accent-hover": "var(--color-accent-hover)",
        "accent-dark": "var(--color-accent-dark)",
        "accent-soft": "var(--color-accent-soft)",
        "accent-text": "var(--color-accent-text)",

        success: "var(--color-success)",
        error: "var(--color-error)",
        warning: "var(--color-warning)",

        "dark-bg": "var(--color-dark-bg)",
        "dark-surface": "var(--color-dark-surface)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["48px", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-lg": ["64px", { lineHeight: "1.1", fontWeight: "700" }],
        "hero-sm": ["32px", { lineHeight: "1.15", fontWeight: "700" }],
        section: ["28px", { lineHeight: "1.25", fontWeight: "700" }],
        "section-lg": ["36px", { lineHeight: "1.25", fontWeight: "700" }],
        meta: ["13px", { lineHeight: "1.5" }],
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.2s ease-out",
      },
      boxShadow: {
        card: "0 1px 2px rgba(var(--shadow-ink), 0.04), 0 1px 1px rgba(var(--shadow-ink), 0.03)",
        "card-hover": "0 16px 32px -12px rgba(var(--shadow-ink), 0.16), 0 4px 8px -2px rgba(var(--shadow-ink), 0.06)",
        glow: "0 8px 24px -6px rgba(var(--color-accent-glow), 0.45)",
        "glow-sm": "0 4px 14px -4px rgba(var(--color-accent-glow), 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
