const mongoose = require("mongoose");

const instructionSchema = new mongoose.Schema({
  instruction: {
    type: [String],
    required: [true, "Instruction not included"],
  },
  upLoadedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "Professor",
  },
});

const Instructions = mongoose.model("Instructions", instructionSchema);

module.exports = Instructions;
