const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');

const CONFIG = require('./webpack.base');
const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG;

module.exports = {
  devtool: false,
  entry: {
    main: [CLIENT_ENTRY],
    vendor: [
      'babel-polyfill', // fixed ie11 minified problem
      'aphrodite/no-important',
      'isomorphic-cookie',
      'react',
      'react-dom',
      'react-fontawesome',
      'react-google-tag-manager',
      'react-router',
      'react-redux',
      'react-overlays/lib/Modal',
      'react-simple-dfp',
      'react-static-container',
      'redux',
      'redux-thunk',
      'reselect',
      'uuid/v4'
    ]
  },
  output: {
    filename: '[name]_[chunkhash].js',
    chunkFilename: '[name]_[chunkhash].js',
    publicPath: PUBLIC_PATH,
    path: CLIENT_OUTPUT
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '__DEV__': false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js', 2),
    new AssetsPlugin({ filename: 'assets.json' }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          cacheDirectory: true,
          presets: ['es2015', 'react', 'stage-0', 'react-optimize']
        },
        exclude: /(node_modules)/
      }
    ]
  },
  externals: {
    moment: 'moment',
    firebase: 'firebase',
    'video.js': 'videojs'
  }
};
