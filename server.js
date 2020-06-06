require('newrelic');

require('dotenv').config();

const config = require('config');
const path = require('path');

const express = require('express');
const app = express();

app.env = config.env;
app.heroku = config.heroku;

const logger = require('./handlers/logger');
logger.debug('Overriding "Express" logger');
app.use(require('morgan')('combined', { 'stream': logger.stream }));

const methodOverride = require('method-override');
app.use(methodOverride());

// tell the app to parse HTTP body messages
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ 'extended': true }));

if (app.heroku) {

  app.use(require('express-sslify').HTTPS({ 'trustProtoHeader': true }));

}

app.use(express.static(path.join(__dirname, 'build'), { 'maxAge': '1y' }));

app.get('/*', (req, res) => {

  res.sendFile(path.join(__dirname, 'build', 'index.html'));

});

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
