/**
 * @format
 * @type {import('tailwindcss').Config}
 */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-top": {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-100px)",
          },
        },
      },

      animation: {
        "slide-top":
          "slide-top 0.9s cubic-bezier(0.600, -0.280, 0.735, 0.045) forwards",
        "slide-top2": "slide-top 0.5s both",
        "fade-in": "fade-in 0.5s",
      },
    },
  },

  plugins: [require("daisyui")],
};
