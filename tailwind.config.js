/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          50: '#f4f5fb',
          100: '#e6e8f5',
          200: '#c9cdea',
          300: '#a5aad4',
          400: '#7d84b8',
          500: '#6268a0',
          600: '#4e5286',
          700: '#40436d',
          800: '#37395a',
          900: '#31334d',
          950: '#12122a',
        },
        brand: {
          50: '#f2f1ff',
          100: '#e8e5ff',
          200: '#d4cfff',
          300: '#b5acff',
          400: '#9380ff',
          500: '#7a5ff7',
          600: '#6d5ef5',
          700: '#5840db',
          800: '#4835b0',
          900: '#3c2f8c',
        },
      },
    },
  },
  plugins: [],
}
