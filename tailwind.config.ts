import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          500: "#6d5dfc",
          600: "#5848f5",
          700: "#4634db",
          900: "#1b1858"
        }
      }
    }
  },
  plugins: []
};

export default config;
