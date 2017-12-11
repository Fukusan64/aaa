const path = require('path');
module.exports = {
	entry: './src/main.js',
	output:{
		filename: 'bundle.js',
		path: path.join(__dirname, '/public')
	},
	devtool: 'inline-source-map',
	devServer : {
		port : 3000,
		contentBase: path.join(__dirname, 'public'),
	},
};
