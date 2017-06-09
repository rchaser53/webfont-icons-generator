const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');
const path = require("path");

const port = 3000;
const publicPath = `http://localhost:${port}/dist`;

module.exports = {
  target: 'electron-renderer',
  devtool: 'source-map',
  entry: [
    `webpack-dev-server/client?http://localhost:${port}/`,
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src/main.ts')
  ],
  output: {
    publicPath: `http://localhost:${port}/dist/`
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
  ],
  devServer: {
    port,
    publicPath,
    compress: true,
    // noInfo: true,
    stats: 'errors-only',
    inline: true,
    lazy: false,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    contentBase: path.join(__dirname, 'dist'),
    watchOptions: {
      aggregateTimeout: 300,
      poll: 100
    },
    historyApiFallback: {
      verbose: true,
      disableDotRule: false,
    },
    setup() {
      if (process.env.START_HOT) {
        spawn(
          'npm',
          ['run', 'start-hot-renderer'],
          { shell: true, env: process.env, stdio: 'inherit' }
        )
        .on('close', code => process.exit(code))
        .on('error', spawnError => console.error(spawnError));
      }
    }
  }
};