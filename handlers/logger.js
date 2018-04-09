const winston = require("winston");
const format = winston.format;

const logger = winston.createLogger({
  "level": "info",
  "format": format.json(),
  "exitOnError": false,
  "transports": [
    new winston.transports.File({
      "name": "info",
      "level": "info",
      "filename": "./logs/all-logs.log",
      "humanReadableUnhandledException": true,
      "handleExceptions": true,
      "maxsize": 5242880, // 5MB
      "maxFiles": 5,
      "colorize": false,
    }),
    new winston.transports.File({
      "name": "warn",
      "level": "warn",
      "filename": "./logs/warn-logs.log",
      "humanReadableUnhandledException": true,
      "handleExceptions": true,
      "maxsize": 5242880, // 5MB
      "maxFiles": 5,
      "colorize": true,
    }),
    new winston.transports.File({
      "name": "error",
      "level": "error",
      "filename": "./logs/error-logs.log",
      "humanReadableUnhandledException": true,
      "handleExceptions": true,
      "maxsize": 5242880, // 5MB
      "maxFiles": 5,
      "colorize": true,
    }),
    new winston.transports.Console({
      "level": "debug",
      "format": format.combine(
        format.colorize(),
        format.timestamp(),
        format.align(),
        format.printf((info) => `${info.timestamp} ${info.level}: ${info.message.trim()}`)
      ),
      "humanReadableUnhandledException": true,
      "handleExceptions": true,
      "colorize": true,
    }),
  ],
});

module.exports = logger;
module.exports.stream = {
  "write"(message) {

    logger.info(message);

  },
};
