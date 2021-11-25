const mongoose = require("mongoose");
const config = require("config");
const logger = require("../startup/logging");

module.exports = function () {
  mongoose
    .connect(config.get("db"), {
      useUnifiedTopology: true,
      useUnifiedTopology: true,
    })
    .then(() => logger.info("Mongodb connected..."))
    .catch((ex) => logger.info("Mongodb disconnected...", ex));
};
