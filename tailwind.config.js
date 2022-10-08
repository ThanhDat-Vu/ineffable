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
        glass: "2px 4px 24px 0px rgba(255, 255, 255, 0.08)",
        goldenBorder: "8px 8px 0 0 white, 10px 10px 0 0",
      },
      keyframes: {
        slideIn: {
          "0%": { right: "-100%" },
          "100%": { right: 0 },
        },
        slideOut: {
          "0%": { right: 0 },
          "100%": { right: "-100%" },
        },
      },
      animation: {
        slideIn: "slideIn 0.4s",
        slideOut: "slideOut 0.4s",
      },
    },
  },
  plugins: [],
};
