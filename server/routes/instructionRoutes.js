const {
  addInstructions,
  getInstruction,
} = require("../controller/instructionController");
const express = require("express");

const router = express.Router();

router.post("/addInstruction", addInstructions);
router.get("/getInstruction", getInstruction);

module.exports = router;
