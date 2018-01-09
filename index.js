/* eslint-disable no-process-env */

const express = require("express");
const path = require("path");

const app = express();

// const favicon = require("serve-favicon");
// app.use(favicon(path.join(__dirname, "/server/static/favicon/favicon.ico")));

const logger = require("./handlers/logger");
logger.debug("Overriding \"Express\" logger");
app.use(require("morgan")("combined", { "stream": logger.stream }));

const methodOverride = require("method-override");
app.use(methodOverride());

// tell the app to parse HTTP body messages
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }));

const xFrameOptions = require("x-frame-options");
app.use(xFrameOptions());

const xXssProtection = require("x-xss-protection");
app.use(xXssProtection());

const xContentTypeOptions = require("dont-sniff-mimetype");
app.use(xContentTypeOptions());

const contentSecurityPolicy = require("helmet-csp");
app.use(contentSecurityPolicy({
  "directives": {
    "baseUri": ["'none'"],
    "defaultSrc": ["'self'"],
    "scriptSrc": [ "'self'", "'unsafe-inline'", "'unsafe-eval'" ],
    "styleSrc": [ "'self'", "'unsafe-inline'", "fonts.googleapis.com" ],
    "fontSrc": [ "'self'", "fonts.gstatic.com" ],
    "imgSrc": [ "'self'", "data:" ],
    "sandbox": [ "allow-forms", "allow-same-origin", "allow-scripts" ],
    "objectSrc": ["'none'"],
  },
}));

// tell the app to look for static files in these directories
app.use("/", express.static(path.join(__dirname, "/server/static/")));
app.use("/dist", express.static(path.join(__dirname, "/client/dist/")));

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API routes
const apiRoutes = require("./server/routes/api");
app.use("/api", upload.fields([]), apiRoutes);
const tokenRoutes = require("./server/routes/token");
app.use("/token", tokenRoutes);

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "staging") {

  const compression = require("compression");
  app.use(compression());

  app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "/client/dist/", "index.html"));

  });

} else {

  const webpack = require("webpack");

  // const WebpackDevServer = require("webpack-dev-server");
  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  compiler.plugin("done", () => {

    app.get("*", (req, res) => {

      res.sendFile(path.join(__dirname, "/client/dist/", "index.html"));

    });

  });

  app.use(require("webpack-dev-middleware")(compiler, {

    //  noInfo: true,
    "publicPath": webpackConfig.output.publicPath,
    "hot": true,

    //   historyApiFallback: true
  }));

  app.use(require("webpack-hot-middleware")(compiler));

}

const cors = require("cors");
app.use(cors());

app.get("*", (req, res) => {

  res.sendFile(path.join(__dirname, "/client/dist/", "index.html"));

});

const config = require("config");

app.listen(config.port, () => {

  const nodeEnv = process.env.NODE_ENV;
  logger.info((nodeEnv ? nodeEnv.charAt(0).toUpperCase() + nodeEnv.slice(1) : "Local Test") + " Express server running on port " + config.port);

});
