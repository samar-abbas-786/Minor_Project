const Question = require("../models/questionSchema");

exports.addQuestions = async (req, res) => {
  const { questions } = req.body;
  const { code } = req.query;

  if (!questions) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  try {
    const newQuestions = await Question.insertMany(
      questions.map((q) => ({
        ...q,
        code,
      }))
    );

    res.status(201).json({
      success: true,
      message: "Questions added successfully",
      data: newQuestions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

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
