/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#c45a86",
        primaryDark: "#a0496c",
        secondary: "#73c3dd",
        secondaryDark: "#4eaac9",
        success: "#34eda0",
        successDark: "#2dce8b",
        info: "#72c1e5",
        infoDark: "#53afd6",
        danger: "#a82f2f",
        dangerDark: "#9b1d1d",
        light: "#F0F4EF",
        dark: "#19243d",
        darker: "#0D1321",
      },
    },
    fontFamily: {
      Nunito: ["Nunito, sans-serif"],
      RubikGemstones: ["Rubik Gemstones, cursive"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        md: "0",
      },
      center: true,
      screens: {
        sm: "500px",
        md: "600px",
        lg: "800px",
        xl: "800px",
        "2xl": "800px",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "984px",
      xl: "1240px",
      "2xl": "1496px",
    },
  },
  plugins: [],
};
