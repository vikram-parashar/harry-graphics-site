/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        oceanDark: "#17252A",
        oceanWarm: "#2B7A78",
        oceanCool: "#3AAFA9",
        oceanLight: "#DEF2F1",
      },
    },
  },
  plugins: [],
};
