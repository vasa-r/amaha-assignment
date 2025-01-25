/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      colors: {
        btnClr: "#4D2FF5",
        subHead: "#8c8c8c",
        lightPur: "#A032FB",
        lighterPur: "#D266F7",
        reviewCard: "#13151B",
        bgColor: "rgba(17, 25, 40, 0.75)",
        border: "rgba(255, 255, 255, 0.125)",
        "main-bg": "#0D0D0F",
        "card-bg": "#333533",
        "light-hover": "#e9ecef",
        "dark-hover": "#1E201E",
        "light-col": "#fbfbfb",
        "priority-low": "#86efac",
        "priority-medium": "#fde047",
        "priority-high": "#f87171",
      },
      boxShadow: {
        price: "rgba(160, 145, 250, 0) 0px 0px 40px 10px",
        card: "0px 4px 6px rgba(255, 255, 255, 0.1)",
        "btm-shd": "rgba(0, 0, 0, 0.1) 0px 1px 1px",
        custom:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        "light-btm": "0px 1px 0px 0px rgba(0, 0, 0, 0.1)",
      },
      animation: {
        border: "border 4s linear infinite",
      },
      keyframes: {
        border: {
          to: { "--border-angle": "360deg" },
        },
      },
      height: {
        "btm-height": "calc(100vh - 72px)",
        "col-container": "calc(100% - 109px)",
      },
      backdropBlur: {
        custom: "16px",
      },
      backdropSaturate: {
        custom: "180%",
      },
    },
  },
  plugins: [],
};
