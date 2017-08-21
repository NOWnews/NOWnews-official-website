const webpack = require('webpack');
const HappyPack = require('happypack');
const fs = require('fs');
const path = require('path');
const babelQuery = {
  cacheDirectory: true,
  presets: ['es2015', 'react', 'stage-0', 'react-optimize']
};
const CONFIG = require('./webpack.base');
const { SERVER_ENTRY, SERVER_OUTPUT, PUBLIC_PATH } = CONFIG;

function getExternals () {
  const nodeModules = fs.readdirSync(path.join(process.cwd(), 'node_modules'));
  return nodeModules.reduce(function (ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {});
}

module.exports = {
  target: 'node',
  devtool: false,
  entry: SERVER_ENTRY,
  output: {
    path: SERVER_OUTPUT,
    filename: 'server.js'
  },
  externals: getExternals(),
  node: {
    __filename: true,
    __dirname: true
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'happypack/loader?id=json'
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        exclude: /(node_modules)/
      }

    ]
  },
  plugins: [
    new webpack.BannerPlugin(
        'require("source-map-support").install();',
        { raw: true, entryOnly: false }
    ),
    new HappyPack({
      id: 'babel',
      loaders: [`babel?${JSON.stringify(babelQuery)}`],
    }),
    new HappyPack({
      id: 'json',
      loaders: ['json'],
    }),
    new webpack.IgnorePlugin(/\.(css|less|scss|svg|png|jpe?g|png)$/),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
