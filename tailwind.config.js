/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "shiny-gold": "#D4AF37",
        "rich-black": "#010203",
      },
      backgroundImage: {
        "hero-image": "url('/src/assets/images/rum-smoke.jpg')",
      },
    },
  },
  plugins: [],
};
