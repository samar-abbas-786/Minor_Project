const { log } = require("console");
const Course = require("../models/courseSchema");
const path = require("path");

const AddCourses = async (req, res) => {
  try {
    const { title, Code } = req.body;
    const fileUrl = req.file.filename;

    if (!fileUrl) {
      return res.status(400).json({ message: "PDF file is required" });
    }

    const course = await Course.create({
      title,
      Code,
      fileUrl,
    });

    res.status(200).json({ message: "Course Added", data: course });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding course", error: error.message });
  }
};

const listAllCourses = async (req, res) => {
  let allCourses = await Course.find({});
  res
    .status(200)
    .json({ message: "Succesfully get All Courses", data: allCourses });
};

const singleCourse = async (req, res) => {
  const { Code } = req.params;
  let course = await Course.find({ Code: Code });
  res.status(200).json({ message: "Succesfully get  Course", course });
};

module.exports = { AddCourses, listAllCourses, singleCourse };
