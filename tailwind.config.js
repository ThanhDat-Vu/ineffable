/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        logo: ["Luxurious Script", "cursive"],
      },
      colors: {
        "shiny-gold": "#D4AF37",
        "rich-black": "#010203",
      },
      backgroundImage: {
        "hero-image": "url('/src/assets/images/rum-smoke.jpg')",
      },
      boxShadow: {
        glass: "2px 4px 32px 0px rgba(255, 255, 255, 0.08)",
      },
    },
  },
  plugins: [],
};
