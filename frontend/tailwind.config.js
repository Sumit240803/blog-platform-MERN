/** @type {import('tailwindcss').Config} */
module.exports = {
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
      backgroundImage : {
        "main" : "url('/bg-1.jpg')",
        "login" : "url('/27230.jpg')",
        "contact" : "url('/6939772.jpg')",
        "home" : "url('/home-bg.jpg')",
        "home-2" : "url('/home-2.jpg')",

      }
    },
  },
  plugins: [],
};
