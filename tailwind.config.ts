import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDF6F0",
        gold: "#B8863B",
        maroon: {
          50: "#FBEEF0",
          100: "#F5D6DA",
          200: "#E9AEB5",
          300: "#DA818C",
          400: "#C85662",
          500: "#A83240",
          600: "#7A1F2B",
          700: "#5E1620",
          800: "#451017",
          900: "#2E0A0F",
          950: "#1A0508",
        },
      },
      fontFamily: {
        serif: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
