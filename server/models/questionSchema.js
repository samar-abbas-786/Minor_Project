const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: [String],
    required: [true, "Please Provide the Question"],
  },
  option: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Please Provide the options"],
  },
  correctOption: {
    type: mongoose.Schema.Types.Mixed,
    required: [true, "Please Provide the correct option"],
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Professor",
    default: "66fbd49b3ada04456682c58e",
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
