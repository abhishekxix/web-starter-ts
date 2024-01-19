/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');

dotenv.config({
	path: path.resolve(__dirname, '.env'),
});

const projectDirectoryPath = path.resolve(__dirname, '../');
const buildDirectoryPath = `${projectDirectoryPath}/build`;
const srcDirectoryPath = `${projectDirectoryPath}/src`;
const jsOutputDirectoryName = 'js';
const cssOutputDirectoryName = 'css';
const templatesDirectoryPath = `${srcDirectoryPath}/templates`;
const configDirectoryPath = `${projectDirectoryPath}/config`;

// eslint-disable-next-line func-names
module.exports = function (environment) {
	const config = {
		entry: {
			main: `${srcDirectoryPath}/main.ts`,
		},
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.(ts|tsx|js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'ts-loader',
						options: {
							configFile: `${projectDirectoryPath}/config/tsconfig.json`,
						},
					},
				},
				{
					test: /\.(s(a|c)ss)$/,
					use: [
						MiniCssExtractPlugin.loader,
						{
							loader: 'css-loader',
							options: {
								url: false,
							},
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									config: `${configDirectoryPath}/postcss.config.cjs`,
								},
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sassOptions: {
									outputStyle: 'compressed',
								},
							},
						},
					],
				},
			],
		},
		optimization: {
			removeEmptyChunks: true,
			minimize: true,
			minimizer: [
				new TerserPlugin({
					parallel: true,
					terserOptions: {
						format: {
							comments: false,
						},
					},
					extractComments: false,
				}),
			],
		},
		output: {
			path: buildDirectoryPath,
			filename: `${jsOutputDirectoryName}/[name].js`,
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: `${templatesDirectoryPath}/index.html`,
				filename: 'index.html',
				title: 'TS and SCSS starter',
				chunks: ['main'],
			}),
			new MiniCssExtractPlugin({
				filename: `${cssOutputDirectoryName}/[name].css`,
			}),
		],
		resolve: {
			extensions: ['.ts', 'tsx', '.js', '.jsx', '.json', '.scss', '.css'],
		},
		target: 'web',
	};

	if ('development' in environment) {
		config.devServer = {
			port: process.env.DEV_SERVER_PORT,
			static: {
				directory: buildDirectoryPath,
			},
			open: true,
			hot: true,
			liveReload: false,
		};
		config.devtool = 'source-map';
		config.mode = 'development';
		config.plugins.push(
			new WebpackNotifierPlugin({
				title: 'Build',
				alwaysNotify: true,
			})
		);
	}

	return config;
};
