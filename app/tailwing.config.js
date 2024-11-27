
module.exports = {
    content: [
      "./app/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./routes/**/*.{ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          brand: {
            light: "#f7fafc",
            DEFAULT: "#1a202c",
            dark: "#2d3748",
          },
        },
        fontFamily: {
          sans: ["Inter", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  