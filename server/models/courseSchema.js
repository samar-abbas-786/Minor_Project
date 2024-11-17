const mongoose = require("mongoose");
// const { User } = require("./userSchema");
const courseSchema = new mongoose.Schema({
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
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
    type: [String],
    required: true,
  },
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
