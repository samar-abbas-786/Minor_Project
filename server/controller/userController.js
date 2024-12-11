const User = require("../models/userSchema.js");
const enrollCourse = require("../models/enrollSchema.js");
const register = async (req, res) => {
  try {
    const { name, email, password, profession } = req.body;
    // console.log(req.body);

    if (!name || !email || !password || !profession) {
      return res.status(400).json({
        message: "Missing Fields",
        description: "Please Provide all the fields",
      });
    }

    const isEmail = await User.findOne({ email });
    if (isEmail) {
      return res.status(400).json({
        message: "User Existed",
        description: "This email is already taken",
      });
    }
    // console.log("Unique", isEmail);

    const user = await User.create({
      name,
      email,
      password,
      profession,
    });
    // console.log(user);

    return res.status(200).json({
      message: "Successfully Registered!!",
      description: `${user.name} registered succesfully`,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Failed",
      description: "There is some issue in signup",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "Failed misirebally",
      description: "Please Provide all the fileds",
    });
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res
      .status(400)
      .json({ message: "Failed", description: "User not found" });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res
      .status(400)
      .json({ message: "Failed", description: "Password Did Not Match" });
  }
  res.status(200).json({
    message: "Success",
    description: `${user.name} successfully Login`,
    user: user,
  });
};

const logout = async (req, res) => {
  res
    .status(201)
    .clearCookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now() + 90 * 60000),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
      description: "",
    });
};

const getUserById = async (req, res) => {
  const { id } = req.query;
  // console.log(id);

  try {
    const user = await User.findById(id);
    // console.log(user);

    if (!user) {
      return res.status(400).json({ message: "No user found" });
    } else {
      res.status(200).json({ message: `User Found with ${id}`, user });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getAllEnrolledStudent = async (req, res) => {
  try {
    const { userId } = req.query;

    const getEnrollDetails = await enrollCourse.find({ addedBy: userId });

    if (!getEnrollDetails || getEnrollDetails.length === 0) {
      return res.status(404).json({ message: "No enrollment records found." });
    }

    const userIds = getEnrollDetails.map((enrollDetail) => enrollDetail.userId);

    const students = await User.find({ _id: { $in: userIds } });

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students found." });
    }

    res.status(200).json({
      message: "Students retrieved successfully",
      students,
    });
  } catch (error) {
    console.error("Error fetching enrolled students:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

// const getUser = (req, res, next) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     user,
//   });
// };
module.exports = {
  login,
  logout,
  register,
  getUserById,
  getAllEnrolledStudent,
};
