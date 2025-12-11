import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    // "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      md: "768px",
      lg: "1024px",
      xl: "1440px",
      "max-xl": { max: "1439px" },
      "max-lg": { max: "1023px" },
      "max-md": { max: "767px" },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "2rem",
        lg: "2.5rem",
        xl: "5rem",
      },
    },
    extend: {
      colors: {
        primary: "#4D5725",
        olive: "#4D5725",
        orange: "#FF914D",
        brown: "#6B3E0A",
        beige: "#FBF3EC",
        lima: {
          "50": "#f4fbea",
          "100": "#e5f6d1",
          "200": "#cceea8",
          "300": "#abe175",
          "400": "#8bd14a",
          "500": "#70bd2d",
          "600": "#52911f",
          "700": "#3f6f1c",
          "800": "#35591b",
          "900": "#2e4c1b",
          "950": "#16290a",
        },
        black: "#100E0E",
        white: "#FFFFFF",
        gray: {
          50: "#FAFAFA",
          100: "#EFEFF0",
          200: "#DCDEE2",
          300: "#CCCCCC",
          400: "#B3B3B3",
          500: "#999999",
          600: "#686868",
          700: "#595959",
          800: "#262626",
          900: "#000000",
        },
      },
      backgroundImage: {
        "linear-blue":
          "linear-gradient(323.27deg, #2067E3 -41.78%, #2B40B6 97.12%)",
        "linear-gray":
          "linear-gradient(-180deg, rgba(220, 222, 226, 0.7) 0%, rgba(220, 222, 226, 0.03) 100%)",
        "linear-banner":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, #000000 150%)",
        "linear-hero":
          "linear-gradient(90deg, rgba(0, 0, 0, 0.6) 27.18%, rgba(102, 102, 102, 0.6) 102.19%)",
      },
      fontFamily: {
        display: ["Rubik", "sans-serif"],
        sans: ["Inter", "sans-serif", ...defaultTheme.fontFamily.sans],
        // serif: ["August", "sans-serif", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [typography, aspectRatio],
} satisfies Config;

export default config;
