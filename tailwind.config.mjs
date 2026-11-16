import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Paleta de marca (tomada del logo)
        navy: {
          950: "#00001f",
          900: "#010144", // azul institucional
          800: "#0d0d5a",
          700: "#1c1c72",
          600: "#34348c",
        },
        gold: {
          DEFAULT: "#be9f53",
          light: "#d9c48f",
          dark: "#9c8038",
        },
        field: "#2f5d33", // verde del isotipo
        paper: "#f7f4ee", // blanco cálido de fondo
        sand: "#ece6d9",
        line: "#e2dccf",
        // Alias heredados para no romper clases viejas
        "brand-blue": "#010144",
        "brand-gold": "#be9f53",
        "brand-gray": "#e4e4e4",
        "brand-green": "#0a5009",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.9rem, 7.2vw, 6.75rem)", { lineHeight: "0.98", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2.4rem, 5vw, 4.5rem)", { lineHeight: "1.02", letterSpacing: "-0.03em" }],
        "display-md": ["clamp(2rem, 3.6vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.025em" }],
      },
      letterSpacing: {
        eyebrow: "0.22em",
      },
      maxWidth: {
        site: "84rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(1,1,68,0.04), 0 8px 24px -8px rgba(1,1,68,0.10)",
        lift: "0 2px 4px rgba(1,1,68,0.04), 0 24px 48px -16px rgba(1,1,68,0.22)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        "slow-zoom": { from: { transform: "scale(1.12)" }, to: { transform: "scale(1)" } },
        "scroll-dot": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "30%": { opacity: "1" },
          "100%": { transform: "translateY(18px)", opacity: "0" },
        },
        "pop-in": {
          from: { opacity: "0", transform: "translateY(12px) scale(0.97)" },
          to: { opacity: "1", transform: "translateY(0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 1s cubic-bezier(0.16,1,0.3,1) both",
        "fade-in": "fade-in 1.2s ease both",
        marquee: "marquee 40s linear infinite",
        "slow-zoom": "slow-zoom 14s cubic-bezier(0.16,1,0.3,1) both",
        "scroll-dot": "scroll-dot 2s ease-in-out infinite",
        "pop-in": "pop-in 0.35s cubic-bezier(0.16,1,0.3,1) both",
      },
      typography: ({ theme }) => ({
        estudio: {
          css: {
            "--tw-prose-body": "#2b2b3d",
            "--tw-prose-headings": theme("colors.navy.900"),
            "--tw-prose-links": theme("colors.navy.900"),
            "--tw-prose-bold": theme("colors.navy.900"),
            "--tw-prose-quotes": theme("colors.navy.900"),
            "--tw-prose-quote-borders": theme("colors.gold.DEFAULT"),
            "--tw-prose-bullets": theme("colors.gold.DEFAULT"),
            "--tw-prose-counters": theme("colors.gold.dark"),
            "--tw-prose-hr": theme("colors.line"),
            a: { textDecorationColor: theme("colors.gold.DEFAULT"), textUnderlineOffset: "3px" },
            "h2, h3": { fontFamily: theme("fontFamily.serif").join(","), fontWeight: "500" },
            blockquote: { fontFamily: theme("fontFamily.serif").join(","), fontStyle: "italic", fontWeight: "400" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;
