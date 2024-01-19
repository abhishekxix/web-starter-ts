module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['airbnb', 'plugin:@typescript-eslint/recommended', 'prettier'],
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{ devDependencies: true },
		],
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
	},
	env: {
		browser: true,
	},
	globals: {
		document: true,
	},
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	plugins: ['@typescript-eslint'],
};
