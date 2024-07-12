import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      gridTemplateColumns: {
        "2fr-1fr-1fr": "2fr 1fr 1fr",
        "1fr-3fr-1fr-1fr-1fr": "1fr 3fr 1fr 1fr 1fr",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
