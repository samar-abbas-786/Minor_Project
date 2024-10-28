const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Professor",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    require: true,
  },
  notice: {
    type: String,
  },
  fileData: {
    type: Buffer,
  },
  filePath: {
    type: String,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
