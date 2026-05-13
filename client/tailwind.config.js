/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        verse: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c2d3ff",
          300: "#94b1ff",
          400: "#5e81ff",
          500: "#3b5cff",
          600: "#1d32ff",
          700: "#1625e6",
          800: "#1821ba",
          900: "#1a2291",
          950: "#111457",
        },
        ink: {
          50: "#f6f6f7",
          100: "#e9eaeb",
          200: "#d2d4d7",
          300: "#acb0b5",
          400: "#7f858e",
          500: "#5e656f",
          600: "#4b5058",
          700: "#3f4248",
          800: "#36383c",
          900: "#2f3134",
          950: "#1b1c1e",
        },
        energy: {
          neon: "#00f2ff",
          gold: "#f59e0b",
          ruby: "#ef4444",
          emerald: "#10b981",
        }
      },
      fontFamily: {
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 15px rgba(0, 242, 255, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
};
