/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        navy: "#0F172A",
        surface: "#FAF8FF",
        "surface-low": "#F2F3FF",
        "surface-high": "#E2E7FF",
        "surface-variant": "#DAE2FD",
        primary: "#2563EB",
        secondary: "#06B6D4",
        tertiary: "#8B5CF6",
        blue: {
          electric: "#2563EB",
          deep: "#1D4ED8",
          pale: "#EFF6FF"
        },
        cyan: "#06B6D4",
        cloud: "#F8FAFC",
        line: "#E2E8F0",
        mint: "#06B6D4",
        success: "#10B981",
        amber: "#F59E0B",
        danger: "#EF4444"
      },
      boxShadow: {
        soft: "0 30px 90px rgba(15, 23, 42, 0.16)",
        card: "0 4px 20px rgba(15, 23, 42, 0.05)",
        raised: "0 10px 30px rgba(15, 23, 42, 0.08)",
        glow: "0 18px 42px rgba(37, 99, 235, 0.18)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
