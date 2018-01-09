const path = require("path");

const webpack = require("webpack");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");

module.exports = merge(common, {

  "devtool": "eval-source-map",

  "plugins": [
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": path.join(__dirname, "/template/index.html"),
      "inject": "head",
      "alwaysWriteToDisk": true,
    }),
    new HtmlWebpackHarddiskPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  // the entry file for the bundle
  "entry": {
    "bundle": [
      path.join(__dirname, "/client/src/app.jsx"),
    ],
  },

});
