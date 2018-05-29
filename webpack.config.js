var path = require("path");
var config = {
	entry: './Client/main.js',

	output: {
	        	path: path.resolve(__dirname, "build"),
        		publicPath: "/",
				filename: 'index.js',
			},

	devServer: {
				contentBase: "./build",
				inline: true,
				port: 4000
			},

module: {
			rules: [ {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			query: {
						presets: ['es2015', 'react']
					}
			}]
		} 

}
module.exports = config;