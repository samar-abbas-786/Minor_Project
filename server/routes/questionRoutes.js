const {
  addQuestion,
  getAllQuestions,
  submitTest,
} = require("../controller/questionController.js");
const express = require("express");
console.log({ addQuestion, getAllQuestions, submitTest });

const router = express.Router();

router.post("/add", addQuestion);
router.get("/all", getAllQuestions);
router.post("/submit", submitTest);

module.exports = router;
