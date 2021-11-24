const express = require("express");
const error = require("../middleware/error");
const students = require("../routes/students");
const cors = require("cors");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/students/", students);
  app.use(error);
};
