/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0F172A",
        navy: "#0F172A",
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
        card: "0 12px 30px rgba(15, 23, 42, 0.06)",
        raised: "0 22px 55px rgba(15, 23, 42, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
