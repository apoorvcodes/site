/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-newsreader)", "ui-serif", "Georgia", "serif"],
        display: ["var(--font-instrument-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "#f6f1e7",
        "paper-deep": "#efe8d8",
        ink: "#1a1714",
        "ink-soft": "#3a342d",
        "ink-mute": "#6b6357",
        rule: "#d8cfbb",
        accent: "#8a2a1a",
      },
      maxWidth: {
        prose: "640px",
        page: "680px",
      },
    },
  },
}
