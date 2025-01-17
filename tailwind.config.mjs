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
        foreground: "var(--foreground)",
      },
      fontFamily: {
        schoolbell: ['"Schoolbell"', "sans-serif"],
        bubblegum: ['"Bubblegum Sans"', "sans-serif"],
        nunito: ['"nunito"', "sans-serif"],
        modak:['"Modak"', 'sans-serif'],
        lucky:['"Luckiest Guy"', 'sans-serif'],
        sniglet:['"Sniglet"', 'sans-serif'],
        jua:['"Jua"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
};
