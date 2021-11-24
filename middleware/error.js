const logger = require("../startup/logging");
module.exports = function (ex, req, res, next) {
  logger.info(ex);
  res.status(500).send("Something wrong happened...");
  next();
};
