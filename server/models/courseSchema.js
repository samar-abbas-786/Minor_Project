const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Professor",
    required: true,
  },
  title: {
    type: String,
    required: [true, "Course Must Be Added"],
  },
  Code: {
    type: String,
    unique: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
