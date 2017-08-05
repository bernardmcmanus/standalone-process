import path from 'path';
import { optimize, BannerPlugin } from 'webpack';

import pkg from './package.json';

const banner = `${pkg.name} - ${pkg.version} - ${new Date().toISOString()}`;

export default {
	node: {
		process: false
	},
	context: path.resolve('.'),
	entry: {
		process: path.resolve('./index.js'),
		'process.min': path.resolve('./index.js'),
		'process-lite': path.resolve('./index-lite.js'),
		'process-lite.min': path.resolve('./index-lite.js')
	},
	output: {
		path: path.resolve('./dist'),
		library: 'process',
		libraryTarget: 'window',
		libraryExport: 'default',
		filename: '[name].js'
	},
	module: {
		loaders: [{
			test: /\.js$/,
			use: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.js$/,
			use: 'imports-loader?process',
			exclude: /node_modules\/process\//
		}]
	},
	plugins: [
		new optimize.UglifyJsPlugin({
			include: /\.min\.js$/,
			comments: false,
			compress: { warnings: false }
		}),
		new BannerPlugin({ banner, entryOnly: true })
	]
};
