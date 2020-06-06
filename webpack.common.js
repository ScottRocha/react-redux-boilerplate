const path = require('path');

const fs = require('fs');
const tls = require('tls');
const config = require('config');

const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

fs.writeFile(path.join(__dirname, '/server/dist/nonce.key'), config.nonce, () => { });

module.exports = {
  'mode': !config.env || config.env.startsWith('development') ? 'development' : 'production',

  'optimization': {
    'concatenateModules': true,
    'noEmitOnErrors': true,
  },

  'output': {
    'path': path.join(__dirname, '/client/dist'),
    'filename': '[name].[hash].js',
    'chunkFilename': '[name].[hash].js',
    'publicPath': '/dist/',
  },
  'plugins': [
    new MiniCssExtractPlugin({
      'filename': '[name].[hash].css',
      'chunkFilename': '[name].[hash].css',
      'ignoreOrder': false,
    }),
    new CleanWebpackPlugin({ 'cleanOnceBeforeBuildPatterns': ['client/dist/*'] }),
    new HtmlWebpackPlugin({
      'filename': 'index.html',
      'template': path.join(__dirname, '/template/index.hbs'),
      'templateParameters': { 'nonce': config.nonce },
      'inject': 'body',
      'alwaysWriteToDisk': true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': "'" + (config.util.getEnv('NODE_ENV') !== 'production' ? 'development' : 'production') + "'",
    }),
  ],
  'resolve': {
    'extensions': [ '.js', '.jsx' ],

    // 'symlinks': false,
    // 'cacheWithContext': false,
    // 'unsafeCache': true,
  },
  'module': {
    'rules': [
      {
        'test': /\.(js|jsx)$/,
        'include': [
          path.join(__dirname, '/client/src'),
          path.join(__dirname, '/node_modules/array-move'),
          path.join(__dirname, '/node_modules/d3-org-chart'),
          path.join(__dirname, '/node_modules/orgchart.js'),
          path.join(__dirname, '/node_modules/react-google-button'),
          path.join(__dirname, '/node_modules/query-string'),
          path.join(__dirname, '/node_modules/split-on-first'),
          path.join(__dirname, '/node_modules/strict-uri-encode'),
        ],
        'use': [
          {
            'loader': 'babel-loader',
            'options': {
              'presets': [ '@babel/preset-env', '@babel/react' ],
            },
          },
        ],
      },
      {
        'test': /\.(sa|sc|c)ss$/,
        'use': [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ],
      },
      { 'test': /\.html$/, 'use': 'html-loader' },
      { 'test': /\.hbs$/, 'use': 'handlebars-loader' },
      { 'test': /\.(eot|gif|jpeg|jpg|png|svg|ttf|woff|woff2)$/, 'use': 'file-loader' },
    ],
  },
  'node': {
    'dns': 'mock',
    'net': 'mock',
  },
  'externals': {
    fs,
    tls,
    config,
  },
  'target': 'web',
};
