const Course = require("../models/courseSchema");
const User = require("../models/userSchema");
const Content = require("../models/contentSchema");
const enrollCourse = require("../models/enrollSchema");
const path = require("path");
const { isValidObjectId } = require("mongoose");
const { log } = require("console");

const AddCourses = async (req, res) => {
  try {
    const { title, Code, addedBy } = req.body;
    console.log("body", req.body);

    if (!isValidObjectId(addedBy)) {
      return res.status(400).json({ message: "Invalid Object ID" });
    }
    console.log("addedBy", addedBy);

    const userExists = await User.findById(addedBy);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }

    const course = await Course.create({
      title,
      Code,
      addedBy,
    });

    res.status(201).json({
      message: "Course added successfully",
      data: course,
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

const myEnrolledCourse = async (req, res) => {
  const { userId, courseId, addedBy } = req.body;

  let user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const courseExists = await Course.findById(courseId);
  if (!courseExists) {
    return res.status(404).json({ message: "Course not found" });
  }

  let enroll = await enrollCourse.create({
    userId,
    courseId,
    addedBy,
  });
  if (enroll) {
    return res.status(200).json({ message: "Enrolled Successfully", enroll });
  } else {
    return res.status(400).json({ message: "Enrollment failed" });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const getCourseinEnroll = await enrollCourse.find({ userId });

    if (!getCourseinEnroll || getCourseinEnroll.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found" });
    }
    console.log(getCourseinEnroll);
    let getAllCourses = [];
    for (let i = 0; i < getCourseinEnroll.length; i++) {
      const getCourse = await Course.findById(getCourseinEnroll[i].courseId);
      getAllCourses.push(getCourse);
    }
    console.log(getAllCourses);

    // const getAllCourses = await Course.findById(getCourseinEnroll);
    return res.status(200).json({
      message: "Enrolled courses retrieved successfully",
      getAllCourses,
    });
  } catch (error) {
    console.error("Error retrieving enrolled courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getEnrollByCourseId = async (req, res) => {
  const { courseId, userId } = req.query;

  try {
    const course = await enrollCourse.find({
      courseId: courseId,
      userId: userId,
    });

    if (course.length === 0) {
      return res
        .status(200)
        .json({ isEnrolled: false, message: "Not enrolled" });
    }

    return res
      .status(200)
      .json({ isEnrolled: true, message: "Enrollment found", course });
  } catch (error) {
    console.error("Error fetching enrollment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  AddCourses,
  listAllCourses,
  singleCourse,
  addContent,
  getContent,
  myEnrolledCourse,
  getEnrolledCourses,
  getEnrollByCourseId,
};
