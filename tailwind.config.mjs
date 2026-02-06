/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        darkbg: "#661361",
        pinkbg: "#CA6446",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        schoolbell: ['"Schoolbell"', "sans-serif"],
        bubblegum: ['"Bubblegum Sans"', "sans-serif"],
        nunito: ['"nunito"', "sans-serif"],
        modak: ['"Modak"', "sans-serif"],
        lucky: ['"Luckiest Guy"', "sans-serif"],
        sniglet: ['"Sniglet"', "sans-serif"],
        jua: ['"Jua"', "sans-serif"],
      },
    },
    keyframes: {
      slowBounce: {
        "0%, 100%": { transform: "translateY(0%)" },
        "50%": { transform: "translateY(-10%)" },
      },
    },
    animation: {
      slowBounce: "slowBounce 3s ease-in-out infinite",
    },
  },
  plugins: [require("tailwindcss-animated")],
};
