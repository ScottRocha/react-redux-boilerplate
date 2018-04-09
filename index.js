const config = require("config");
const path = require("path");

const express = require("express");
const app = express();
app.env = config.util.getEnv("NODE_ENV");

const favicon = require("serve-favicon");
app.use(favicon(path.join(__dirname, "/server/static/favicon/favicon.ico")));

const logger = require("./handlers/logger");
logger.debug("Overriding \"Express\" logger");
app.use(require("morgan")("combined", { "stream": logger.stream }));

const methodOverride = require("method-override");
app.use(methodOverride());

// tell the app to parse HTTP body messages
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ "extended": true }));

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

if (app.env === "production" || app.env === "staging") {

  app.get("*.js", (req, res, next) => {

    req.url = req.url + ".gz";
    res.set("Content-Encoding", "gzip");
    next();

  });

  app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "/client/dist/", "index.html"));

  });

} else {

  const webpack = require("webpack");

  const webpackConfig = require("./webpack.config");
  const compiler = webpack(webpackConfig);

  compiler.plugin("done", () => {

    app.get("*", (req, res) => {

      res.sendFile(path.join(__dirname, "/client/dist/", "index.html"));

    });

  });

  app.use(require("webpack-dev-middleware")(compiler, {
    "publicPath": webpackConfig.output.publicPath,
    "hot": true,
    "stats": {
      "colors": true,
    },
    "watchOptions": {
      "aggregateTimeout": 300,
      "poll": 1000,
    },
  }));

  app.use(require("webpack-hot-middleware")(compiler));

}

const xFrameOptions = require("x-frame-options");
app.use(xFrameOptions());

const xXssProtection = require("x-xss-protection");
app.use(xXssProtection());

const xContentTypeOptions = require("dont-sniff-mimetype");
app.use(xContentTypeOptions());

const fs = require("fs");
fs.readFile(path.join(__dirname, "/server/dist/nonce.key"), (err, nonce) => {

  const contentSecurityPolicy = require("helmet-csp");
  app.use(contentSecurityPolicy({
    "directives": {
      "baseUri": ["'none'"],
      "defaultSrc": ["'self'"],
      "fontSrc": [ "'self'", "fonts.gstatic.com" ],
      "imgSrc": [ "'self'", "data:" ],
      "objectSrc": ["'none'"],
      "sandbox": [ "allow-forms", "allow-same-origin", "allow-scripts" ],
      "scriptSrc": [ "'self'", "www.google-analytics.com" ],
      "styleSrc": [ "'self'", "'nonce-" + (!err ? nonce : config.nonce) + "'", "fonts.googleapis.com" ],
    },
    "setAllHeaders": true,
    "browserSniff": false,
  }));

});

const cors = require("cors");
app.use(cors());

app.listen(config.port, () => {

  logger.info((app.env ? app.env.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "Unknown") + " Express server running on port " + config.port);

});
