/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        burgundy: {
          50: '#FCF5F9',
          100: '#F9EBF3',
          200: '#F1CDE0',
          300: '#E8AFCD',
          400: '#D672A7',
          500: '#C43681',
          600: '#B13174',
          700: '#7D2E68',
          800: '#592243',
          900: '#3B172C',
        },
        gold: {
          50: '#FEFBF3',
          100: '#FDF7E7',
          200: '#FAEBB2',
          300: '#F7DF7D',
          400: '#F1C848',
          500: '#D4AF37',
          600: '#BF9621',
          700: '#9F7A1C',
          800: '#7F6116',
          900: '#67500F',
        },
      },
      backgroundImage: {
        'paper-texture': "url('https://images.pexels.com/photos/7190376/pexels-photo-7190376.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
      },
      boxShadow: {
        'elegant': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)',
      },
    },
  },
  plugins: [],
};