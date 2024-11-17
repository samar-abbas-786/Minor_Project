const Course = require("../models/courseSchema");
const User = require("../models/userSchema");
const Content = require("../models/contentSchema");
const path = require("path");
const { isValidObjectId } = require("mongoose");

const AddCourses = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { title, Code, addedBy } = req.body;
    const fileUrl = req.file.filename;
    console.log(fileUrl);

    if (!isValidObjectId(addedBy)) {
      return res.status(400).json({ message: "Invalid Object ID" });
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

    res.status(201).json({
      message: "Course added successfully",
      data: course,
      fileUrl: fileUrl,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding course", error: error.message });
  }
};

const addContent = async (req, res) => {
  try {
    const { Code } = req.params;
    const { topic, addedBy, userId } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileName = req.file.filename;

    const courseExists = await Course.findOne({ Code });
    if (!courseExists) {
      return res.status(404).json({ message: "Course not found" });
    }

    const content = await Content.create({
      topic,
      fileName,
      Code,
      addedBy,
      userId,
    });

    res.status(201).json({
      message: "Content added successfully",
      data: content,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding content", error: error.message });
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

const getContent = async (req, res) => {
  const { Code } = req.params;
  if (!Code) {
    res.status(400).json({ message: "Course Does Not Exist" });
  }
  const content = await Content.find({ Code: Code });
  if (!content) {
    res.status(400).json({ message: "No Content Exist for this subject" });
  }
  res.status(200).json({ message: "Content got Successfully", content });
};

module.exports = {
  AddCourses,
  listAllCourses,
  singleCourse,
  addContent,
  getContent,
};
