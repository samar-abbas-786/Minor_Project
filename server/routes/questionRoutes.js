const { addQuestion } = require("../controller/questionController");
const express = require("express");

const router = express.Router();

router.post("/addQuestion", addQuestion);

module.exports = router;
