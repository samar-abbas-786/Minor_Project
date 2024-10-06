const Question = require("../models/questionSchema");

export const addQuestion = async (req, res) => {
  const { question, option, correctOption } = req.body;

  if (!question || !option || !correctOption) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const sampleQuestion = await Question.create({
      question,
      option,
      correctOption,
    });

    res.status(201).json({
      success: true,
      message: "Question added successfully",
      data: sampleQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
