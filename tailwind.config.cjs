module.exports = {
  plugins: [require("@tailwindcss/aspect-ratio")],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#282828",
        red: "#FF0000",
        gray: "#AAAAAA",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "infinite-slide": "infiniteSlide 8s linear infinite",
      },
      keyframes: {
        infiniteSlide: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        loaderSpinnerOver: {
          "0%": {
            opacity: "1",
            transform: "translate(0, 0)",
          },
          "49.99%": {
            opacity: "1",
            transform: "translate(40px, 0)",
          },
          "50%": {
            opacity: "0",
            transform: "translate(40px, 0)",
          },
          "100%": {
            opacity: "0",
            transform: "translate(0, 0)",
          },
        },
        loaderSpinner: {
          "0%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(40px, 0)" },
          "100%": { transform: "translate(0, 0)" },
        },
      },
    },
  },
};
