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
				red: {
					DEFAULT: "#ef4444",
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444",
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
					950: "#450a0a",
				},
				yellow: {
					DEFAULT: "#eab308",
					50: "#fefce8",
					100: "#fef9c3",
					200: "#fef08a",
					300: "#fde047",
					400: "#facc15",
					500: "#eab308",
					600: "#ca8a04",
					700: "#a16207",
					800: "#854d0e",
					900: "#713f12",
					950: "#422006",
				},
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
				sans: [
					"var(--font-body)",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
				],
			},
		},
	},
	plugins: [],
};

export default config;
