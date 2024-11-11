const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Professor",
    required: true,
    default: "66fbd49b3ada04456682c58e",
  },
  title: {
    type: String,
    required: [true, "Course Must Be Added"],
  },
  Code: {
    type: String,
    unique: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
 
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
