/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/**/*.{tsx, html}"],
  theme: {
    screens: {},
    extend: {
      backgroundImage: {
        "hero-bg": "url('/bgImage.png')",
        "vs-bg": "url('/redBlueBg.jpg')",
      },
      fontFamily: {
        dela: ["Dela Gothic One", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
