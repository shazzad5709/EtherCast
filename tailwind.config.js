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
        darker: '#2D2085',
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
      keyframes: {
        chatblips: {
          '0%': { opacity: 0, transform: 'scale(0.3)' },
          '50%': { opacity: 1, transform: 'scale(1)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        monitorIn: {
          'from': { opacity: 0, transform: 'translateY(-30px)' },
          'to': { opacity: 1, transform: 'translateY(0)' },
        },
        custompulse: {
          'to': { }
        }
      },
      animation: {
        'dash': 'chatblips 0.5s ease-in-out 2.7s forwards',
        'eth': 'chatblips 0.5s ease-in-out 0.8s forwards',
        'monitor': 'monitorIn 1s ease-in-out forwards',
        'iota': 'chatblips 0.5s ease-in-out 0.8s forwards',
      }
    },
  },
  plugins: [],
}
