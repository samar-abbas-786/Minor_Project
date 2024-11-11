const express = require("express");
const multer = require("multer");
const path = require("path");
const { AddCourses } = require("../controller/courseController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // Adjust path as needed
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Ensure the file field name in the route matches the form data from the frontend
router.post("/addCourses", upload.single("fileUrl"), AddCourses);

module.exports = router;
