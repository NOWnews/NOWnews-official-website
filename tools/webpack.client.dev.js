const path = require('path');
const webpack = require('webpack');
const CONFIG = require('./webpack.base');

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG;

module.exports = {
  devtool: 'eval',
  entry: {
    main: [
      'webpack/hot/only-dev-server',
      'webpack-hot-middleware/client',
      CLIENT_ENTRY
    ],
    vendor: [
      'aphrodite/no-important',
      'react',
      'react-dom',
      'react-fontawesome',
      'react-google-tag-manager',
      'react-router',
      'react-redux',
      'react-overlays/lib/Modal',
      'react-simple-dfp',
      'redux'
    ]
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|server)/,
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('develop'),
      '__DEV__': true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin()
  ]
};
