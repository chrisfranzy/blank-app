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
        brand: {
          50: "#fdf8f0",
          100: "#f9ecdb",
          200: "#f2d5b4",
          300: "#e8b885",
          400: "#d4a574",
          500: "#c4884e",
          600: "#b67340",
          700: "#975b36",
          800: "#7a4a31",
          900: "#643e2b",
        },
      },
    },
  },
  plugins: [],
};

export default config;
