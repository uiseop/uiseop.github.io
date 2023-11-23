const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './src/index.tsx',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				exclude: '/node_modules/',
				loader: 'babel-loader',
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/components'),
			'@hooks': path.resolve(__dirname, 'src/hooks'),
			'@pages': path.resolve(__dirname, 'src/pages'),
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html',
			filename: 'index.html',
		}),
	],
};
