const path = require('path');

const { createLogger, format, transports } = require('winston');

const errorStackTracerFormat = format((info) => {

  if (info.meta && info.meta instanceof Error) {

    info.message = `${info.message} ${info.meta.stack}`;

  }

  return info;

});

const logger = createLogger({
  'transports': [
    new transports.File({
      'name': 'info',
      'level': 'info',
      'filename': path.join(__dirname, '../logs/all-logs.log'),
      'humanReadableUnhandledException': true,
      'handleExceptions': true,
      'json': true,
      'maxsize': 5242880, // 5MB
      'maxFiles': 5,
      'colorize': false,
    }),
    new transports.File({
      'name': 'warn',
      'level': 'warn',
      'filename': path.join(__dirname, '../logs/warn-logs.log'),
      'humanReadableUnhandledException': true,
      'handleExceptions': true,
      'json': true,
      'maxsize': 5242880, // 5MB
      'maxFiles': 5,
      'colorize': true,
    }),
    new transports.File({
      'name': 'error',
      'level': 'error',
      'filename': path.join(__dirname, '../logs/error-logs.log'),
      'humanReadableUnhandledException': true,
      'handleExceptions': true,
      'json': true,
      'maxsize': 5242880, // 5MB
      'maxFiles': 5,
      'colorize': true,
    }),
    new transports.Console({
      'format': format.combine(
        format.splat(),
        errorStackTracerFormat(),
        format.simple(),
      ),
    }),
  ],
  'exitOnError': false,
});

module.exports = logger;
module.exports.stream = {
  'write'(message) {

    logger.info(message);

  },
};
