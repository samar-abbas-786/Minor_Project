const {
  addQuestion,
  getAllQuestions,
  submitTest,
} = require("../controller/questionController");
const express = require("express");

const router = express.Router();

router.post("/add", addQuestion);
router.get("/all", getAllQuestions);
router.post("/submit", submitTest);

module.exports = router;
