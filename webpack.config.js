/* eslint-disable no-process-env */

module.exports = process.env.NODE_ENV === "production" ? require("./webpack." + process.env.NODE_ENV)
  : process.env.NODE_ENV === "staging" ? require("./webpack.staging")
    : process.env.NODE_ENV === "development" ? require("./webpack.development")
      : require("./webpack.local-test");
