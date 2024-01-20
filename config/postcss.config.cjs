/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
const purgeCSS = require('@fullhuman/postcss-purgecss');

module.exports = {
	parser: 'postcss-scss',
	plugins: [
		require('autoprefixer'),
		purgeCSS({ content: ['./src/templates/**/*.html'] }),
	],
};
