const { log } = require("console");
const Course = require("../models/courseSchema");
const User = require("../models/userSchema");
const { isValidObjectId } = require("mongoose");

const AddCourses = async (req, res) => {
  try {
    const { title, Code, addedBy, fileUrl } = req.body;
    if (!isValidObjectId(addedBy)) {
      res.status(400).json({ message: "Object Id is not valid" });
    }
    const userExists = await User.findById(addedBy);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.create({
      title,
      Code,
      addedBy,
      fileUrl,
    });

    res
      .status(201)
      .json({ message: "Course added successfully", data: course });
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
