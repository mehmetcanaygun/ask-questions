/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      Nunito: ["Nunito, sans-serif"],
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "0",
      },
      center: true,
      screens: {
        sm: "600px",
        md: "728px",
        lg: "984px",
        xl: "1240px",
        "2xl": "1496px",
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
