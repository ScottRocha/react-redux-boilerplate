/* eslint-disable no-process-env */

const path = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');

const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const common = require('./webpack.common.js');

module.exports = merge.smart(common, {

  'devtool': 'source-map',

  'plugins': [

    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),

    new CompressionPlugin({
      'test': /\.(js|jsx|css|html)$/,
    }),
  ],

  'optimization': {
    'noEmitOnErrors': true,
    'splitChunks': {
      'chunks': 'all',
      'name': true,
    },
    'runtimeChunk': true,
    'minimizer': [
      new UglifyJsPlugin({
        'test': /\.(js|jsx)$/,
        'cache': !process.env.CACHE_DIR || path.join(process.env.CACHE_DIR, '/webpack/'),
        'sourceMap': true,
        'parallel': true,
        'extractComments': true,
        'uglifyOptions': {
          'compress': { 'unused': false },
          'ie8': true,
        },
      }),
    ],
  },

  // the entry file for the bundle
  'entry': {
    'bundle': path.join(__dirname, '/client/src/app.jsx'),
  },

});
