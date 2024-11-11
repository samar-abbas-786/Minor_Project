const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  AddCourses,
  listAllCourses,
  singleCourse,
} = require("../controller/courseController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/addCourses", upload.single("fileUrl"), AddCourses);
router.get("/listAllCourses", listAllCourses);
router.get("/singleCourse/:Code", singleCourse);

module.exports = router;
