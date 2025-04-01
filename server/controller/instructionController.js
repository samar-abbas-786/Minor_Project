const Course = require("../models/courseSchema");
const Instructions = require("../models/instructionSchema");

const addInstructions = async (req, res) => {
  const { instruction, upLoadedBy, code } = req.body;
  // const { code } = req.query;
  // console.log(req.body.params.code);
  console.log(req.body);

  if (!instruction || !Array.isArray(instruction) || instruction.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Instructions must be an array with at least one instruction",
    });
  }

  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Code is required",
    });
  }

  const createdInstruction = new Instructions({
    instruction,
    upLoadedBy,
    code,
  });

  await createdInstruction.save();

  res.status(200).json({
    success: true,
    message: "Instructions added successfully",
    createdInstruction,
  });
};

const getInstruction = async (req, res) => {
  try {
    let { code } = req.query;
    if (!code) {
      return res.status(400).json({ message: "Code is required" });
    }
    const getAllInstruction = await Instructions.find({ code });
    if (!getAllInstruction || getAllInstruction.length === 0) {
      return res.status(404).json({ message: "No Instruction Found" });
    }
    res.status(200).json({
      success: true,
      message: "Successfully got Instructions",
      getAllInstruction,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      success: false,
      message: "Failed to get Instructions",
    });
  }
};

module.exports = { addInstructions, getInstruction };
