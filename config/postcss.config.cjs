/* eslint-disable @typescript-eslint/no-var-requires */
const autoprefixer = require('autoprefixer');
const purgeCSS = require('@fullhuman/postcss-purgecss');
const tailwindCSS = require('tailwindcss');

module.exports = {
	plugins: [
		'postcss-preset-env',
		tailwindCSS,
		autoprefixer,
		purgeCSS({ content: ['./src/templates/**/*.html'] }),
	],
};
