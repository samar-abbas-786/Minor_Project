const Course = require("../models/courseSchema");
const Instructions = require("../models/instructionSchema");

const addInstructions = async (req, res) => {
  // console.log(req.body);
  const { instruction, upLoadedBy, courseId } = req.body;
  const {code} = req.query;

  const course = await Course.findById(courseId);
  if (!course) {
    res.status(400).json({ message: "course does not exist" });
  }

  if (!instruction) {
    return res.status(400).json({
      success: false,
      message: "instructions must be an present",
    });
  }
  const createdInstruction = new Instructions({
    instruction,
    upLoadedBy,
    courseId,
    code
  });
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
    let { code } = req.query;
    const getAllInstruction = await Instructions.find({ code: code });
    if (!getAllInstruction) {
      res.status(400).json({ message: "No Instruction Found" });
    }
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
