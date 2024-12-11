const mongoose = require("mongoose");
const enrollSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

const enrollCourse = mongoose.model("enrollCourse", enrollSchema);
module.exports = enrollCourse;
