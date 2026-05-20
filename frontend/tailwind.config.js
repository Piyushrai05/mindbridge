/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6C63FF",
        secondary: "#4ECDC4",
        accent: "#FF6B6B",
        background: "#F8F9FE",
        surface: "#FFFFFF",
        "text-primary": "#2D3748",
        "text-secondary": "#718096",
        success: "#48BB78",
        warning: "#ECC94B",
        crisis: "#E53E3E",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};
