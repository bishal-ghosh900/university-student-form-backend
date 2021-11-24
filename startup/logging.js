const winston = require("winston");
const config = require("config");
require("winston-mongodb");

process.on("unhandledRejection", (err) => {
  throw err;
});

const logger = winston.createLogger({
  transports: [
    new winston.transports.MongoDB({
      db: config.get("db"),
      handleExceptions: true,
    }),
    new winston.transports.File({
      filename: "logger.log",
      handleExceptions: true,
    }),
    new winston.transports.Console(),
  ],
});

module.exports = logger;
