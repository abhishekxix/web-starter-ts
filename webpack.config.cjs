const path = require('path');
const dotenv = require('dotenv');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const TerserPlugin = require('terser-webpack-plugin');

dotenv.config();

const buildDirectoryName = 'build';
const buildDirectoryPath = path.resolve(__dirname, buildDirectoryName);
const srcDirectoryName = './src';
const jsOutputDirectoryName = 'js';
const cssOutputDirectoryName = 'css';
const templatesDirectory = './src/templates';

module.exports = function (environment) {
	config = {
		entry: {
			main: `${srcDirectoryName}/main.ts`,
		},
		mode: 'production',
		module: {
			rules: [
				{
					test: /\.(ts|tsx|js|jsx)$/,
					exclude: /node_modules/,
					use: 'ts-loader',
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
						'postcss-loader',
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
				template: `${templatesDirectory}/index.html`,
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
			static: path.resolve(__dirname, buildDirectoryName),
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
