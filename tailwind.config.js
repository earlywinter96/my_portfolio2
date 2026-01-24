/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          mono: ['Fira Code', 'Monaco', 'Courier New', 'monospace'],
        },
        animation: {
          'gradient': 'gradient 3s ease infinite',
          'blink': 'blink 1s infinite',
        },
        keyframes: {
          gradient: {
            '0%, 100%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
          },
          blink: {
            '0%, 50%': { opacity: '1' },
            '51%, 100%': { opacity: '0' },
          },
        },
      },
    },
    plugins: [],
  }