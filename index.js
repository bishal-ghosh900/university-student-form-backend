const express = require("express");
const app = express();
const logger = require("./startup/logging");

require("./startup/db")();
require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => logger.info(`connected to port ${port}`));
