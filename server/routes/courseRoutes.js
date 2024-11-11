const { AddCourses } = require("../controller/courseController");

const express = require("express");

const router = express.Router();

router.post("/addCourses", AddCourses);
// router.get("/getInstruction", getInstruction);

module.exports = router;
