/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        faded: "var(--faded)",
        input: "var(--input)",
        card: "var(--card)",
        "theme-toggle": "var(--theme-toggle)",
        "forecast-toggle": "var(--forecast-toggle)",
        "card-selected": "var(--card-selected)",
        "card-selected-header": "var(--card-selected-header)",
        "card-selected-text": "var(--card-selected-text)",
        "card-selected-text-faded": "var(--card-selected-text-faded)",
      },
    },
  },
  plugins: [],
};
