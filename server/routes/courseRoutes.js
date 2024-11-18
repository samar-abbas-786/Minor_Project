const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  AddCourses,
  listAllCourses,
  singleCourse,
  addContent,
  getContent,
} = require("../controller/courseController");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(file);

    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });
// console.log("fileUrl", fileUrl);

router.post("/addCourses", AddCourses);
router.get("/listAllCourses", listAllCourses);
router.get("/singleCourse/:Code", singleCourse);
router.post("/addContent/:Code", upload.single("fileName"), addContent);
router.get("/getContent/:Code", getContent);

module.exports = router;
