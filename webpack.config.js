const webpack = require('webpack');
const path = require("path");

module.exports = {
	context: path.resolve(__dirname, './src'),
  target: "electron",
  devtool: 'source-map',
  entry: {
    index: "./main.ts"
  },
  output: {
    path: path.resolve(__dirname, "dest"),
    publicPath: "/public/",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules:[{
      test: /\.(ts)$/,
      loaders:[
        'ts-loader'
      ],
			include: path.join(__dirname, 'src'),
      exclude:["node_modules/*"]
		}]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
  ]
};