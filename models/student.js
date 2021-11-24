const Joi = require("joi");
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },

  dept: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  age: {
    type: Number,
    required: true,
    min: 10,
    max: 30,
  },
  location: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
});

const Student = mongoose.model("Student", studentSchema);

function studentValidation(student) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    dept: Joi.string().min(3).max(30).required(),
    age: Joi.number().min(10).max(30).required(),
    location: Joi.string().min(3).max(30).required(),
  });

  return schema.validate(student);
}

module.exports.Student = Student;
module.exports.studentValidation = studentValidation;
