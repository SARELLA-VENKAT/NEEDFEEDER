/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        linen: "rgb(var(--linen) / <alpha-value>)",
        antique: "rgb(var(--antique) / <alpha-value>)",
        bronze: "rgb(var(--bronze) / <alpha-value>)",
        sage: "rgb(var(--sage) / <alpha-value>)",
        fog: "rgb(var(--fog) / <alpha-value>)"
      },
      fontFamily: {
        display: ["Libre Baskerville", "serif"],
        serif: ["Source Sans 3", "sans-serif"],
        brand: ["EB Garamond", "serif"]
      },
      boxShadow: {
        soft: "0 12px 35px rgb(var(--shadow) / 0.14)",
        lift: "0 24px 60px rgb(var(--shadow) / 0.22)"
      }
    }
  },
  plugins: []
};
