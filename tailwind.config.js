/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1.3rem",
          lg: "4rem",
        },
        screens: {
          lg: "1300px",
        },
      },
      colors: {
        main: "rgb(var(--color-main) / <alpha-value>)",
      },
      textColor: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}

