const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  instruction: {
    type: [String],
    required: [true, "Instruction not included"],
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  // courseId: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "Course",
  // },
  code: {
    type: String,
    ref: "Course",
    required: true,
  },
});

const Instructions = mongoose.model("Instructions", instructionSchema);

module.exports = Instructions;
