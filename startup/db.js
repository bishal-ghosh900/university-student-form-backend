const mongoose = require("mongoose");
const config = require("config");
const logger = require("../startup/logging");

module.exports = function () {
  mongoose
    .connect(config.get("db"))
    .then(() => logger.info("Mongodb connected..."))
    .catch(() => logger.info("Mongodb disconnected..."));
};
