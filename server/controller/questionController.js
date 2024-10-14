const Question = require("../models/questionSchema");

// Add a question
exports.addQuestion = async (req, res) => {
  const { question, option, correctOption, marks } = req.body;

  if (!question || !option || !correctOption || !marks) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const newQuestion = await Question.create({
      question,
      option,
      correctOption,
      marks,
    });

    res.status(201).json({
      success: true,
      message: "Question added successfully",
      data: newQuestion,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all questions for students to attempt
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

exports.submitTest = async (req, res) => {
  const { answers } = req.body;
  try {
    const questions = await Question.find();
    let totalMarks = 0;
    let obtainedMarks = 0;

    questions.forEach((question) => {
      totalMarks += question.marks;
      if (answers[question._id] === question.correctOption) {
        obtainedMarks += question.marks;
      }
    });

    res.status(200).json({
      success: true,
      totalMarks,
      obtainedMarks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
