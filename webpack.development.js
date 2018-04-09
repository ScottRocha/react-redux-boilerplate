const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = merge(common, {

  "devtool": "cheap-module-source-map",

  "plugins": [
    new CircularDependencyPlugin({
      "exclude": /a\.js|node_modules/,
      "failOnError": true,
      "cwd": process.cwd(),
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  // the entry file for the bundle
  "entry": {
    "bundle": [
      path.join(__dirname, "/client/src/app.jsx"),
      "webpack-hot-middleware/client",
    ],
  },

});
