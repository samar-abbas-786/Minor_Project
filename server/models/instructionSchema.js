const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  instruction: {
    type: [String],
    required: [true, "Instruction not included"],
  },
  uploadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // default: "66fbd49b3ada04456682c58e",
  },
  courseId: {
    type: mongoose.Schema.ObjectId,
    ref: "Course",
  },
  Code: {
    type: String,
    ref: "Course",
    required: true,
  },
});

const Instructions = mongoose.model("Instructions", instructionSchema);

module.exports = Instructions;
