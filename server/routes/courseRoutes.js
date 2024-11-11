const { AddCourses } = require("../controller/courseController");

const express = require("express");

const router = express.Router();

router.post("/addCourses", AddCourses);

module.exports = router;
