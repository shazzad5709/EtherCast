/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: "#fff",
      black: "#000",
      grey: {
        100: '#f4f5fa',
        300: '#dde0ec',
        500: '#969caa',
        700: '#53565e'
      },
      green: '#1faf2c',
      yellow: '#f7b409',
      red: '#de3232',
      purple: {
        light: '#6c58f7',
        dark: '#4733d2',
      },
      sky: '#7cb2fb',
      cyan: '52b5c9',
      salmon: '#f2a293',
    },
    fontFamily: {
      poppins: ["Poppins", "sans-serif"],
      inter: ["Inter", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
    }, 
    extend: {
      gridTemplateColumns: {
        'custom': '0.5fr 1fr 1fr 0.5fr',
      },
    },
  },
  plugins: [],
}
