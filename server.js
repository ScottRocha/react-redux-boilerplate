const config = require('config');
const path = require('path');

const express = require('express');
const app = express();
app.env = config.util.getEnv('NODE_ENV');

const favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname, '/server/static/favicon/favicon.ico')));

const logger = require('./handlers/logger');
logger.debug('Overriding "Express" logger');
app.use(require('morgan')('combined', { 'stream': logger.stream }));

const methodOverride = require('method-override');
app.use(methodOverride());

// tell the app to parse HTTP body messages
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));

if (app.env === 'production') {

  app.all('*.js', (req, res, next) => {

    req.url += '.gz';

    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');

    next();

  });

  app.use(require('compression')());

}

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API routes
const apiRoutes = require('./server/routes/api');
app.use('/api', upload.fields([]), apiRoutes);
const tokenRoutes = require('./server/routes/token');
app.use('/token', tokenRoutes);

app.use('/', express.static(path.join(__dirname, '/server/static/'), { 'maxAge': '1y' }));
app.use('/dist', express.static(path.join(__dirname, '/client/dist/'), { 'maxAge': '1w' }));

if (app.env === 'production') {

  app.use(require('express-sslify').HTTPS({ 'trustProtoHeader': true }));

}

if (app.env && app.env.startsWith('development') && !app.heroku) {

  const webpack = require('webpack');

  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  compiler.hooks.done.tap('SwishHQ', () => {

    app.get('*', (req, res) => {

      res.sendFile(path.join(__dirname, '/client/dist/', 'index.html'));

    });

  });
  app.use(require('webpack-dev-middleware')(compiler, {
    'publicPath': '/dist/',
    'hot': true,
    'stats': {
      'colors': true,
    },
    'watchOptions': {
      'aggregateTimeout': 300,
      'poll': 1000,
    },
  }));

  app.use(require('webpack-hot-middleware')(compiler));

} else {

  app.get('*', (req, res) => {

    res.sendFile(path.join(__dirname, '/client/dist/', 'index.html'));

  });

}

const xFrameOptions = require('x-frame-options');
app.use(xFrameOptions());

const xXssProtection = require('x-xss-protection');
app.use(xXssProtection());

const xContentTypeOptions = require('dont-sniff-mimetype');
app.use(xContentTypeOptions());

const cors = require('cors');
app.use(cors());

app.listen(config.port, () => {

  logger.info((app.env ? app.env.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'Unknown') + ' Express server running on port ' + config.port);

});
