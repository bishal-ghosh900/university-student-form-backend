const _ = require("lodash");
const { studentValidation, Student } = require("../models/student");
const express = require("express");
const router = express.Router();
const validateIdMiddleware = require("../middleware/validateId");
const asyncErrorHandler = require("../middleware/asyncErrorHandler");
const stduentProperties = ["_id", "name", "dept", "age", "location"];

router.get(
  "/",
  asyncErrorHandler(async (req, res) => {
    const student = await Student.find({}).sort("-_id");
    res.send(student);
  })
);

router.post(
  "/",
  asyncErrorHandler(async (req, res) => {
    const { error } = studentValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = new Student(_.pick(req.body, stduentProperties));
    await student.save();
    res.send(_.pick(student, stduentProperties));
  })
);

router.put(
  "/:id",
  validateIdMiddleware,
  asyncErrorHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return req.status(404).send("student is not available...");

    const { error } = studentValidation(req.body);
    if (error) return req.status(400).send(error.details[0].message);

    const newStudent = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        dept: req.body.dept,
        age: req.body.age,
        location: req.body.location,
      },
      { new: true }
    );
    res.send(_.pick(newStudent, stduentProperties));
  })
);
router.get(
  "/:id",
  validateIdMiddleware,
  asyncErrorHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("student is not available...");

    res.send(_.pick(student, stduentProperties));
  })
);

router.delete(
  "/:id",
  validateIdMiddleware,
  asyncErrorHandler(async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send("student is not available...");

    const deletedStduent = await Student.findByIdAndDelete(req.params.id);
    res.send(_.pick(deletedStduent, stduentProperties));
  })
);

module.exports = router;
