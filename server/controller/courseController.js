const Course = require("../models/courseSchema");
const path = require("path");

const AddCourses = async (req, res) => {
  try {
    const { title, Code } = req.body;
    const fileUrl = req.file ? req.file.path : null;

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

module.exports = { AddCourses };
