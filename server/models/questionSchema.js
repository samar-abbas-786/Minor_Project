const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please Provide the Question"],
  },
  options: {
    type: [String],
    required: [true, "Please Provide the options"],
  },
  correctOption: {
    type: String,
    required: [true, "Please Provide the correct option"],
  },
  marks: {
    type: Number,
    required: true,
    default: 1,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  code: {
    type: String,
    ref: "Course",
  },
  // timer: {
  //   type: Number,
  //   required: true,
  // },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
