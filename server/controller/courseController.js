const Course = require("../models/courseSchema");

const AddCourses = async (req, res) => {
  const { title, Code } = req.body;
  const course = await Course.create({
    title,
    Code,
  });
  res.status(200).json({ message: "Course Added", Data: course });

  //   console.log(course);
};
module.exports = { AddCourses };
