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
    const { code } = req.query;
    console.log(code);

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Course code is required",
      });
    }

    const questions = await Question.find({ code: code });

    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for the provided course code",
      });
    }

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
  const { code } = req.query;

  if (!answers || !code) {
    return res.status(400).json({
      success: false,
      message: "Answers and code are required.",
    });
  }

  try {
    const questions = await Question.find({ code });

    if (!questions.length) {
      return res.status(404).json({
        success: false,
        message: "No questions found for the provided code.",
      });
    }

    let totalMarks = 0;
    let obtainedMarks = 0;

    questions.forEach((question) => {
      totalMarks += question.marks || 0;

      if (answers[question._id] === question.correctOption) {
        obtainedMarks += question.marks || 0;
      }
    });

    return res.status(200).json({
      success: true,
      totalMarks,
      obtainedMarks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};
