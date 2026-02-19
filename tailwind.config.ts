import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        blush: "#FEEFF3",
        lilac: "#F3EEFF",
        mint: "#EBFBF4",
        pearl: "#F9F8FF",
        ink: "#22223A"
      },
      boxShadow: {
        soft: "0 20px 40px rgba(31, 31, 54, 0.08)",
        glow: "0 10px 30px rgba(255, 181, 215, 0.25)"
      },
      backdropBlur: {
        xs: "2px"
      }
    }
  },
  plugins: []
};

export default config;
