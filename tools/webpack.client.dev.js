const path = require('path');
const HappyPack = require('happypack');
const webpack = require('webpack');
const CONFIG = require('./webpack.base');

const { CLIENT_ENTRY, CLIENT_OUTPUT, PUBLIC_PATH } = CONFIG;

const babelQuery = {
  cacheDirectory: true,
  presets: ['es2015', 'react', 'stage-0']
};

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
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
    path: CLIENT_OUTPUT
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'happypack/loader?id=eslint',
        exclude: /(node_modules)/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        exclude: /(node_modules|server)/
      }
    ]
  },
  externals: {
    moment: true,
    // #487 使用禾多推播
    // firebase: true,
    'video.js': 'videojs'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('develop'),
      '__DEV__': true
    }),
    new HappyPack({
      id: 'babel',
      loaders: [`babel?${JSON.stringify(babelQuery)}`],
    }),
    new HappyPack({
      id: 'eslint',
      loaders: ['eslint'],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js', 2),
    new webpack.NoErrorsPlugin()
  ]
};
