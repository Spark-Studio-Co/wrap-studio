/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'secondary': '#808080',
        'secondary-dark': '#4A4A4A',
        'secondary-light': '#D3D3D3',
        'primary': '#50C878',
        'primary-dark': '#3CB371',
        'primary-light': '#90EE90',
      },

      fontFamily: {
        'gotham': ['Gotham Pro', 'sans-serif'],
        'mont-alter': ['Montserrat Alternates', 'sans-serif'],
      },
    },
  },
  plugins: [],
};