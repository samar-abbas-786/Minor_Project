const Instructions = require("../models/instructionSchema");
const addInstructions = async (req, res) => {
  console.log(req.body);

  const { instruction, upLoadedBy } = req.body;

  if (!instruction) {
    return res.status(400).json({
      success: false,
      message: "instructions must be an present",
    });
  }
  const createdInstruction = new Instructions({ instruction, upLoadedBy });
  await createdInstruction.save();

  //   Object.assign({}, createdInstructions);

  res.status(200).json({
    success: true,
    message: "Instructions added successfully",
    createdInstruction,
  });
};

const getInstruction = async (req, res) => {
  try {
    const getAllInstruction = await Instructions.find({
      uploadedBy: "66fbd49b3ada04456682c58e",
    });
    res.status(200).json({
      success: true,
      message: "Successfully got Instructions",
      getAllInstruction,
    });
  } catch (error) {
    console.log("error", error);

    res.status(200).json({
      success: false,
      message: "Failed to get Instructions",
    });
  }
};

module.exports = { addInstructions, getInstruction };
