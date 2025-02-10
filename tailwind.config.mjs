/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				secondary: '#808080',
				'secondary-dark': '#4A4A4A',
				'secondary-light': '#D3D3D3',
				primary: '#50C878',
				'primary-dark': '#3CB371',
				'primary-light': '#90EE90'
			},
			fontFamily: {
				gotham: [
					'Gotham Pro',
					'sans-serif'
				],
				'mont-alter': [
					'Montserrat Alternates',
					'sans-serif'
				]
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			screens: {
				"1.5xl": "1150px",
				"3xl": "1700px",
				"4xl": "1900px",
				"5xl": "2100px",
				"6xl": "2300px",
				"7xl": "2560px",
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
};