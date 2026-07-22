import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          950: "#0b2f27",
          900: "#123a30",
          800: "#17483b",
          700: "#1e5a4a",
          100: "#e5eee9",
          50: "#f3f7f5",
        },
        ink: "#17201d",
        mutedText: "#66716d",
        mutedLine: "#d9dfdc",
        cream: "#f5f1e8",
        gold: "#b8945f",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      boxShadow: {
        soft: "0 14px 36px rgba(16, 42, 34, 0.08)",
        strong: "0 20px 60px rgba(16, 42, 34, 0.12)",
        button: "0 12px 30px rgba(23, 72, 59, 0.22)",
        mega: "0 28px 50px rgba(16, 42, 34, 0.12)",
        "map-pin": "0 10px 25px rgba(23, 72, 59, 0.25)",
      },
      fontFamily: {
        serif: ["Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(44px, 7vw, 84px)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        h1: ["clamp(36px, 4.5vw, 62px)", { lineHeight: "1.05", letterSpacing: "-0.025em" }],
        h2: ["clamp(28px, 3vw, 42px)", { lineHeight: "1.1" }],
        h3: ["clamp(24px, 2vw, 32px)", { lineHeight: "1.1" }],
        lead: ["18px", { lineHeight: "1.6" }],
        eyebrow: ["12px", { lineHeight: "1.6", letterSpacing: "0.18em", fontWeight: "800" }],
        button: ["14px", { lineHeight: "1", letterSpacing: "0.02em", fontWeight: "800" }],
      },
      spacing: {
        section: "96px",
        "section-sm": "64px",
        "section-mobile": "58px",
        header: "78px",
        hero: "720px",
        "hero-tablet": "640px",
        "hero-mobile": "auto",
      },
      container: {
        center: true,
        padding: "20px",
        screens: {
          DEFAULT: "min(1180px, calc(100vw - 40px))",
          lg: "min(1180px, calc(100vw - 40px))",
          md: "min(100% - 28px, 720px)",
        },
      },
      maxWidth: {
        container: "1180px",
        "content-page": "760px",
      },
      screens: {
        xs: "560px",
        sm: "640px",
        md: "768px",
        lg: "820px",
        xl: "1080px",
        "2xl": "1280px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "reveal-up": {
          from: { opacity: "0", transform: "translateY(22px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "reveal-up": "reveal-up 0.7s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
