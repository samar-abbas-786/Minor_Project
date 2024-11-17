const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema({
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
  topic: {
    type: String,
  },
  fileName: {
    type: [String],
    required: true,
  },
  Code: {
    type: String,
    required: true,
  },
});

const Content = mongoose.model("Content", contentSchema);
module.exports = Content;
