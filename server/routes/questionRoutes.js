const {
  addQuestions,
  getAllQuestions,
  submitTest,
} = require("../controller/questionController.js");
const express = require("express");

const router = express.Router();

router.post("/add", addQuestions);
router.get("/all", getAllQuestions);
router.post("/submit", submitTest);

module.exports = router;
