import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        musika: {
          blue: "#0B3D91",
          "blue-light": "#1A5BBF",
          "blue-dark": "#072A66",
          gold: "#D4A017",
          "gold-light": "#F0C040",
          "gold-dark": "#A67C0A",
          cream: "#FFF8E7",
          soil: "#5C4033",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
