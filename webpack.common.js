const path = require("path");

const fs = require("fs");
const tls = require("tls");
const config = require("config");

const webpack = require("webpack");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

fs.writeFile(path.join(__dirname, "/server/dist/nonce.key"), config.nonce, () => {});

module.exports = {

  "mode": config.util.getEnv("NODE_ENV") === "production" ? "production" : "development",

  "output": {
    "path": path.join(__dirname, "/client/dist"),
    "filename": "[name].[hash].js",
    "chunkFilename": "[name].[hash].js",
    "publicPath": "/dist/",
  },
  "plugins": [
    new CleanWebpackPlugin(["client/dist/*"]),
    new HtmlWebpackPlugin({
      "filename": "index.html",
      "template": path.join(__dirname, "/template/index.hbs"),
      "templateParameters": { "nonce": config.nonce },
      "inject": "body",
      "alwaysWriteToDisk": true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": "'" + (config.util.getEnv("NODE_ENV") !== "production" ? "development" : "production") + "'",
    }),
  ],
  "resolve": {
    "extensions": [ ".js", ".jsx" ],
  },
  "module": {
    "rules": [
      {
        "test": /\.(js|jsx)$/,
        "include": path.join(__dirname, "/client/src"),
        "use": "babel-loader",
      }, {
        "test": /\.json$/,
        "include": path.join(__dirname, "/client/src"),
        "use": "json-loader",
      }, {
        "test": /\.css$/,
        "use": [
          MiniCssExtractPlugin.loader,
          "css-loader",
        ],
      }, {
        "test": /\.(eot|png|svg|ttf|woff(2)?)(\?[a-z0-9]+)?$/,
        "use": "file",
      },
      { "test": /\.html$/, "use": "html-loader" },
      { "test": /\.hbs$/, "use": "handlebars-loader" },
      { "test": /\.(png|jpg|gif)$/, "use": "file-loader" },
    ],
  },
  "node": {
    "dns": "mock",
    "net": "mock",
  },
  "externals": {
    fs,
    tls,
    config,
  },
  "target": "web",

};
